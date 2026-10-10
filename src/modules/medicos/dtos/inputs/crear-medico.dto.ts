import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CrearMedicoDto {
  @ApiProperty({ 
    description: 'ID del usuario asociado', 
    example: 2 
  })
  @IsInt({ message: 'El id_usuario debe ser un entero' })
  @IsNotEmpty({ message: 'El id_usuario es obligatorio' })
  id_usuario: number;

  @ApiProperty({ 
    description: 'Número de matrícula profesional', 
    example: 45678 
  })
  @IsInt({ message: 'La matrícula debe ser un entero' })
  @IsPositive({ message: 'La matrícula debe ser un número positivo' })
  @IsNotEmpty({ message: 'La matrícula es obligatoria' })
  matricula: number;

  @ApiProperty({ 
    description: 'Valor inicial de la consulta', 
    example: 15000 
  })
  @IsInt({ message: 'El valor de la consulta debe ser un entero' })
  @IsPositive({ message: 'El valor de la consulta debe ser positivo' })
  @IsNotEmpty({ message: 'El valor de la consulta es obligatorio' })
  valor_consulta: number;
}