import { ApiProperty } from '@nestjs/swagger';
import { EstadoReserva } from '../../enums/estado-reserva';

export class RespuestaReservaDto {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: '1' })
    idMedico: number;
    
    @ApiProperty({ example: '1' })
    idPaciente: number;
    
    @ApiProperty({ example: '10-10-2026T10:00:00' })
    fechaHora: string;
    
    @ApiProperty({ example: '15000' })
    valorConsulta: number;
    
    @ApiProperty({ enum: EstadoReserva, example: EstadoReserva.ACTIVO })
    estado: EstadoReserva;

    
    @ApiProperty({ example: ['SOLICITAR_RESERVA', 'VER_MIS_RESERVAS'], type: [String] })
    permisos: string[];
}
