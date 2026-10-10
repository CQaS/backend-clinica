import { ApiProperty } from '@nestjs/swagger';
import { Rol } from '../../enums/rol.enum';
import { EstadoUsuario } from '../../enums/estado-usuario.enum';

export class RespuestaUsuarioDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: '12345678' })
  documento: string;

  @ApiProperty({ example: 'Pérez' })
  apellidos: string;

  @ApiProperty({ example: 'Juan' })
  nombres: string;

  @ApiProperty({ example: 'juan.perez@email.com' })
  email: string;

  @ApiProperty({ enum: EstadoUsuario, example: EstadoUsuario.ACTIVO })
  estado: EstadoUsuario;

  @ApiProperty({ enum: Rol, example: Rol.PACIENTE })
  rol: Rol;
}
