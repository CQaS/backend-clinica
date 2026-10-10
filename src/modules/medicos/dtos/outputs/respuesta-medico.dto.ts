import { ApiProperty } from '@nestjs/swagger';

export class RespuestaMedicoDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 2 })
  id_usuario: number;

  @ApiProperty({ example: 45678 })
  matricula: number;

  @ApiProperty({ example: 15000 })
  valor_consulta: number;
}