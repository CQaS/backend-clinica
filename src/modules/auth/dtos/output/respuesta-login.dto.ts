import { ApiProperty } from '@nestjs/swagger';
import { RespuestaUsuarioDto } from '../../../usuarios/dtos/outputs/respuesta-usuario.dto';

export class RespuestaLoginDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'Token JWT',
  })
  access_token: string;

  @ApiProperty({
    type: () => RespuestaUsuarioDto,
    description: 'Datos del usuario autenticado',
  })
  usuario: RespuestaUsuarioDto;
}
