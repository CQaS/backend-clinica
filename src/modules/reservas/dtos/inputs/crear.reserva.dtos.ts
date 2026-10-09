import { IsDateString, IsEnum, IsNotEmpty, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EstadoReserva } from '../../enums/estado-reserva';

export class CrearReservaDto {
    @ApiProperty({ example: '1' })
    @IsDateString()
    @IsNotEmpty()
    idMedico: number;
    
    @ApiProperty({ example: '1' })
    @IsDateString()
    @IsNotEmpty()
    idPaciente: number;
    
    @ApiProperty({ example: '10-10-2026T10:00:00' })
    @IsDateString()
    @IsNotEmpty()
    fechaHora: string;
    
    @ApiProperty({ example: '15000' })
    @IsInt()
    @IsNotEmpty()
    valorConsulta: number;
    
    @ApiProperty({ enum: EstadoReserva, example: EstadoReserva.ACTIVO })
    @IsEnum(EstadoReserva)
    @IsNotEmpty()
    estado: EstadoReserva;

}
