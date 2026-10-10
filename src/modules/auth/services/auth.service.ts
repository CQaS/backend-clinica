import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { EstadoUsuario } from '../../usuarios/enums/estado-usuario.enum';
import { LoginDto } from '../dtos/input/login.dto';
import { RespuestaLoginDto } from '../dtos/output/respuesta-login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private readonly JwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<RespuestaLoginDto> {
    const { email, clave } = loginDto;

    const usuario = await this.usuarioRepository.findOne({
      where: { email },
    });

    if (!usuario || usuario.clave !== clave) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    if (usuario.estado !== EstadoUsuario.ACTIVO) {
      throw new UnauthorizedException('El usuario se encuentra dado de baja');
    }

    const payload = {
      sub: usuario.id,
      email: usuario.email,
      rol: usuario.rol,
    };

    return {
      access_token: await this.JwtService.signAsync(payload),
      usuario: {
        id: usuario.id,
        documento: usuario.documento,
        apellidos: usuario.apellidos,
        nombres: usuario.nombres,
        email: usuario.email,
        estado: usuario.estado,
        rol: usuario.rol,
      },
    };
  }
}
