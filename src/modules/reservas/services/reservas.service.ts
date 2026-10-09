import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reserva } from './entities/reserva.entity';
import { CrearReservaDto } from '../dtos/inputs/crear.reserva.dtos';
import { RespuestaReservaDto } from '../dtos/outputs/respuesta.reserva.dtos';
import { EstadoReserva } from '../enums/estado-reserva';
import { CambiarEstadoReservaDto } from '../dtos/inputs/cambiar.estado.reserva.dtos';
import { reserva } from '../entities/reserva.entity';

@Injectable()
export class ReservaService {
  constructor(
    @InjectRepository(Reserva)
    private readonly reservaRepository: Repository<Reserva>,
  ) {}

  async crear(crearReservaDto: CrearReservaDto): Promise<RespuestaReservaDto> {
    const nuevaReserva = this.reservaRepository.create(crearReservaDto);
    const reservaGuardada = await this.reservaRepository.save(nuevaReserva);
    
    return reservaGuardada;
  }

  async obtenerTodos(): Promise<RespuestaReservaDto[]> {
    const reservas = await this.reservaRepository.find();

    return reservas;
  }

  async cancelarReserva(id: number): Promise<Reserva> {
    const reserva = await this.reservaRepository.findOneBy({id});

    if (!reserva || reserva.estado !== EstadoReserva.ACTIVO) {
      throw new UnauthorizedException(
        'Credenciales inválidas o reserva inactiva',
      );
    }

    reserva.estado = EstadoReserva.CANCELADO;
    return await this.reservaRepository.save(reserva);

}

async cambiarEstado(id: number, CambiarEstadoReservaDto: CambiarEstadoReservaDto): Promise<reserva> {
    const reserva = await this.reservaRepository.findOneBy({id});

    if (!reserva) {
      throw new UnauthorizedException(
        'Reserva inexistente',
      );
    }

    reserva.estado = CambiarEstadoReservaDto.estado;
    return await this.reservaRepository.save(reserva);
}
}
