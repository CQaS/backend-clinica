import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrearReservaDto } from '../dtos/inputs/crear.reserva.dtos';
import { EstadoReserva } from '../enums/estado-reserva';
import { CambiarEstadoReservaDto } from '../dtos/inputs/cambiar.estado.reserva.dtos';
import { Reserva } from '../entities/reserva.entity';

@Injectable()
export class ReservaService {
  constructor(
    @InjectRepository(Reserva)
    private readonly reservaRepository: Repository<Reserva>,
  ) {}

  async crear(crearReservaDto: CrearReservaDto): Promise<Reserva> {
    const nuevaReserva = this.reservaRepository.create(crearReservaDto);
    return await this.reservaRepository.save(nuevaReserva);
  }

  async obtenerTodos(): Promise<Reserva[]> {
    return await this.reservaRepository.find();
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

async cambiarEstado(id: number, CambiarEstadoReservaDto: CambiarEstadoReservaDto): Promise<Reserva> {
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
