import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsInt, IsOptional } from 'class-validator';

export class CrearReservaDto {
  @ApiProperty({ example: 1, description: 'ID del médico registrado' })
  @IsInt({ message: 'El idMedico debe ser un número entero' })
  @IsNotEmpty({ message: 'El idMedico no puede estar vacío' })
  idMedico: number;

  @ApiPropertyOptional({
    example: 2,
    description:
      'ID del paciente (Requerido solo si el Administrador reserva por él)',
  })
  @IsOptional()
  @IsInt({ message: 'El idPaciente debe ser un número entero' })
  idPaciente?: number;

  @ApiProperty({
    example: '2026-10-20T10:00:00Z',
    description: 'Fecha y hora del turno en formato ISO',
  })
  @IsDateString(
    {},
    { message: 'La fechaHora debe ser una cadena ISO-8601 válida' },
  )
  @IsNotEmpty({ message: 'La fechaHora no puede estar vacía' })
  fechaHora: string;
}
