import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reserva } from '../entities/reserva.entity';
import { Medico } from '../../medicos/entities/medico.entity';
import { CrearReservaDto } from '../dtos/inputs/crear.reserva.dtos';
import { CambiarEstadoReservaDto } from '../dtos/inputs/cambiar.estado.reserva.dtos';
import { RespuestaReservaDto } from '../dtos/outputs/respuesta.reserva.dtos';
import { EstadoReserva } from '../enums/estado-reserva';

@Injectable()
export class ReservaService {
  constructor(
    @InjectRepository(Reserva)
    private readonly reservaRepository: Repository<Reserva>,
    @InjectRepository(Medico)
    private readonly medicoRepository: Repository<Medico>,
  ) {}

  async crear(
    dto: CrearReservaDto,
    usuarioAuth: { id: number; rol: string },
  ): Promise<RespuestaReservaDto> {
    const idPaciente =
      usuarioAuth.rol === 'PACIENTE' ? usuarioAuth.id : dto.idPaciente;

    if (!idPaciente) {
      throw new BadRequestException(
        'Debe especificar el idPaciente para crear la reserva',
      );
    }

    const medico = await this.medicoRepository.findOne({
      where: { id: dto.idMedico },
    });

    if (!medico) {
      throw new NotFoundException(
        `Médico con ID ${dto.idMedico} no encontrado`,
      );
    }

    const fechaTurno = new Date(dto.fechaHora);
    const ahora = new Date();

    if (fechaTurno <= ahora) {
      throw new BadRequestException('La fecha del turno debe ser futura');
    }

    const maxDias = 30 * 24 * 60 * 60 * 1000;
    if (fechaTurno.getTime() - ahora.getTime() > maxDias) {
      throw new BadRequestException(
        'Las reservas no pueden superar los 30 días de anticipación',
      );
    }

    const hora = fechaTurno.getHours();
    if (hora < 8 || hora >= 16) {
      throw new BadRequestException(
        'Los turnos solo se pueden agendar entre las 08:00 y las 16:00 hs',
      );
    }

    if (fechaTurno.getMinutes() !== 0 || fechaTurno.getSeconds() !== 0) {
      throw new BadRequestException(
        'Los turnos deben solicitarse en horas exactas (ej. 09:00, 10:00)',
      );
    }

    const reservaExistente = await this.reservaRepository.findOne({
      where: {
        idMedico: dto.idMedico,
        fechaHora: fechaTurno,
        estado: EstadoReserva.ACTIVO,
      },
    });

    if (reservaExistente) {
      throw new BadRequestException(
        'El médico ya posee un turno asignado en la fecha y hora seleccionadas',
      );
    }

    const nuevaReserva = this.reservaRepository.create({
      idMedico: dto.idMedico,
      idPaciente: idPaciente,
      fechaHora: fechaTurno,
      valorConsulta: medico.valorConsulta,
      estado: EstadoReserva.ACTIVO,
    });

    const guardada = await this.reservaRepository.save(nuevaReserva);
    return this.mapearARespuestaDto(guardada);
  }

  async obtenerTodas(
    usuarioAuth: { id: number; rol: string },
    fecha?: string,
  ): Promise<RespuestaReservaDto[]> {
    const query = this.reservaRepository
      .createQueryBuilder('reserva')
      .leftJoinAndSelect('reserva.medico', 'medico')
      .leftJoinAndSelect('medico.usuario', 'usuarioMedico')
      .leftJoinAndSelect('reserva.paciente', 'paciente');

    if (usuarioAuth.rol === 'PACIENTE') {
      query.andWhere('reserva.idPaciente = :idPaciente', {
        idPaciente: usuarioAuth.id,
      });
    } else if (usuarioAuth.rol === 'MEDICO') {
      query.andWhere('medico.idUsuario = :idUsuarioMedico', {
        idUsuarioMedico: usuarioAuth.id,
      });
    }

    if (fecha) {
      query.andWhere('DATE(reserva.fechaHora) = DATE(:fecha)', { fecha });
    }

    const reservas = await query.getMany();
    return reservas.map((r) => this.mapearARespuestaDto(r));
  }

  async cancelarReserva(
    id: number,
    usuarioAuth: { id: number; rol: string },
  ): Promise<RespuestaReservaDto> {
    const reserva = await this.reservaRepository.findOne({ where: { id } });

    if (!reserva) {
      throw new NotFoundException(`Reserva con ID ${id} no encontrada`);
    }

    if (reserva.estado !== EstadoReserva.ACTIVO) {
      throw new BadRequestException('Solo se pueden cancelar reservas activas');
    }

    if (usuarioAuth.rol === 'PACIENTE') {
      if (reserva.idPaciente !== usuarioAuth.id) {
        throw new ForbiddenException(
          'No tienes permiso para cancelar esta reserva',
        );
      }

      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      const fechaCita = new Date(reserva.fechaHora);
      fechaCita.setHours(0, 0, 0, 0);

      if (fechaCita <= hoy) {
        throw new BadRequestException(
          'Los pacientes solo pueden cancelar turnos hasta el día anterior',
        );
      }
    }

    reserva.estado = EstadoReserva.CANCELADO;
    const cancelada = await this.reservaRepository.save(reserva);
    return this.mapearARespuestaDto(cancelada);
  }

  async cambiarEstado(
    id: number,
    dto: CambiarEstadoReservaDto,
  ): Promise<RespuestaReservaDto> {
    const reserva = await this.reservaRepository.findOne({ where: { id } });

    if (!reserva) {
      throw new NotFoundException(`Reserva con ID ${id} no encontrada`);
    }

    reserva.estado = dto.estado;
    const actualizada = await this.reservaRepository.save(reserva);
    return this.mapearARespuestaDto(actualizada);
  }

  private mapearARespuestaDto(reserva: Reserva): RespuestaReservaDto {
    return {
      id: reserva.id,
      idMedico: reserva.idMedico,
      idPaciente: reserva.idPaciente,
      fechaHora: reserva.fechaHora,
      valorConsulta: Number(reserva.valorConsulta),
      estado: reserva.estado,
      nombreMedico: reserva.medico?.usuario
        ? `${reserva.medico.usuario.apellidos}, ${reserva.medico.usuario.nombres}`
        : undefined,
      nombrePaciente: reserva.paciente
        ? `${reserva.paciente.apellidos}, ${reserva.paciente.nombres}`
        : undefined,
    };
  }
}
