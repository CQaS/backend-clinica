import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ActualizarValorConsultaDto {
  @ApiProperty({ 
    description: 'Nuevo valor de la consulta médica', 
    example: 18000 
  })
  @IsInt({ message: 'El valor de la consulta debe ser un número entero' })
  @IsPositive({ message: 'El valor de la consulta debe ser mayor a cero' })
  @IsNotEmpty({ message: 'El valor de la consulta no puede estar vacío' })
  valor_consulta: number;
}