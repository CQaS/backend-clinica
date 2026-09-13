import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import { CrearUsuarioDto } from '../dtos/inputs/crear-usuario.dto';
import { RespuestaUsuarioDto } from '../dtos/outputs/respuesta-usuario.dto';
import { FabricaUsuariosService } from './fabrica-usuarios.service';
import { EstadoUsuario } from '../enums/estado-usuario.enum';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private readonly fabricaUsuariosService: FabricaUsuariosService,
  ) {}

  async crear(crearUsuarioDto: CrearUsuarioDto): Promise<RespuestaUsuarioDto> {
    const nuevoUsuario = this.usuarioRepository.create(crearUsuarioDto);
    const usuarioGuardado = await this.usuarioRepository.save(nuevoUsuario);
    return this.fabricaUsuariosService.procesarUsuario(usuarioGuardado);
  }

  async obtenerTodos(): Promise<RespuestaUsuarioDto[]> {
    const usuarios = await this.usuarioRepository.find();
    return usuarios.map((u) => this.fabricaUsuariosService.procesarUsuario(u));
  }

  async validarLogin(email: string): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { email } });

    if (!usuario || usuario.estado !== EstadoUsuario.ACTIVO) {
      throw new UnauthorizedException(
        'Credenciales inválidas o usuario inactivo',
      );
    }

    return usuario;
  }
}
