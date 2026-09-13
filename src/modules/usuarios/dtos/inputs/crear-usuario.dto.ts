import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Rol } from '../../enums/rol.enum';
import { EstadoUsuario } from '../../enums/estado-usuario.enum';

export class CrearUsuarioDto {
  @ApiProperty({ example: '12345678' })
  @IsString()
  @IsNotEmpty()
  documento: string;

  @ApiProperty({ example: 'Pérez' })
  @IsString()
  @IsNotEmpty()
  apellidos: string;

  @ApiProperty({ example: 'Juan' })
  @IsString()
  @IsNotEmpty()
  nombres: string;

  @ApiProperty({ example: 'juan.perez@email.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'ClaveSegura123' })
  @IsString()
  @IsNotEmpty()
  clave: string;

  @ApiProperty({ enum: EstadoUsuario, example: EstadoUsuario.ACTIVO })
  @IsEnum(EstadoUsuario)
  @IsNotEmpty()
  estado: EstadoUsuario;

  @ApiProperty({ enum: Rol, example: Rol.PACIENTE })
  @IsEnum(Rol)
  @IsNotEmpty()
  rol: Rol;
}
