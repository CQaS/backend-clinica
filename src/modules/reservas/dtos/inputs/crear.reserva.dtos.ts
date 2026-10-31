import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsInt, IsOptional } from 'class-validator';

export class CrearReservaDto {
  @ApiProperty({ example: 1, description: 'ID del médico registrado' })
  @IsInt({ message: 'El medicoId debe ser un número entero' })
  @IsNotEmpty({ message: 'El medicoId no puede estar vacío' })
  medicoId: number;

  @ApiPropertyOptional({
    example: 2,
    description:
      'ID del paciente (Requerido solo si el Administrador reserva por él)',
  })
  @IsOptional()
  @IsInt({ message: 'El pacienteId debe ser un número entero' })
  pacienteId?: number;

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
