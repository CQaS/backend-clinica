import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medico } from '../entities/medico.entity';
import { ActualizarValorConsultaDto } from '../dtos/inputs/actualizar-valor-consulta.dto';
import { RespuestaMedicoDto } from '../dtos/outputs/respuesta-medico.dto';

@Injectable()
export class MedicoService {
  constructor(
    @InjectRepository(Medico)
    private readonly medicoRepository: Repository<Medico>,
  ) {}

  async obtenerTodos(): Promise<RespuestaMedicoDto[]> {
    const medicos = await this.medicoRepository.find({
      relations: ['usuario'],
    });

    return medicos.map((medico) => this.mapearARespuestaDto(medico));
  }

  async obtenerPorId(id: number): Promise<RespuestaMedicoDto> {
    const medico = await this.medicoRepository.findOne({
      where: { id },
      relations: ['usuario'],
    });

    if (!medico) {
      throw new NotFoundException(`Médico con ID ${id} no encontrado`);
    }

    return this.mapearARespuestaDto(medico);
  }

  async actualizarValorConsulta(
    id: number,
    dto: ActualizarValorConsultaDto,
  ): Promise<RespuestaMedicoDto> {
    const medico = await this.medicoRepository.findOne({
      where: { id },
      relations: ['usuario'],
    });

    if (!medico) {
      throw new NotFoundException(`Médico con ID ${id} no encontrado`);
    }

    medico.valorConsulta = dto.valorConsulta;
    const medicoActualizado = await this.medicoRepository.save(medico);

    return this.mapearARespuestaDto(medicoActualizado);
  }

  async obtenerPorUsuarioId(idUsuario: number): Promise<Medico> {
    const medico = await this.medicoRepository.findOne({
      where: { idUsuario },
      relations: ['usuario'],
    });

    if (!medico) {
      throw new NotFoundException(
        `No se encontró perfil de médico asociado al usuario ID ${idUsuario}`,
      );
    }

    return medico;
  }

  // Método privado para mapear la entidad a DTO de salida
  private mapearARespuestaDto(medico: Medico): RespuestaMedicoDto {
    return {
      id: medico.id,
      id_usuario: medico.idUsuario,
      matricula: medico.matricula,
      valor_consulta: medico.valorConsulta,
      apellidos: medico.usuario?.apellidos,
      nombres: medico.usuario?.nombres,
      email: medico.usuario?.email,
    };
  }
}
