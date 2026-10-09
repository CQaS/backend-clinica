import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { EstadoReserva } from '../../enums/estado-reserva';

export class CambiarEstadoReservaDto {
    @ApiProperty({ enum: EstadoReserva, example: EstadoReserva.ATENDIDO})

    @IsEnum(EstadoReserva)
    estado: EstadoReserva;
}
