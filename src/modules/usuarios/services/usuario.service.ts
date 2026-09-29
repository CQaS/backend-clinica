import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import { RespuestaUsuarioDto } from '../dtos/outputs/respuesta-usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  private mapearARespuestaDto(usuario: Usuario): RespuestaUsuarioDto {
    return {
      id: usuario.id,
      documento: usuario.documento,
      apellidos: usuario.apellidos,
      nombres: usuario.nombres,
      email: usuario.email,
      estado: usuario.estado,
      rol: usuario.rol,
    };
  }

  //No necesita DTO porque es un método interno que devuelve la entidad Usuario directamente "AuthService"
  async buscarPorEmail(email: string): Promise<Usuario | null> {
    const usuario = await this.usuarioRepository.findOne({ where: { email } });
    return usuario || null;
  }

  async obtenerPorId(id: number): Promise<RespuestaUsuarioDto> {
    const usuario = await this.usuarioRepository.findOne({ where: { id } });
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return this.mapearARespuestaDto(usuario);
  }

  async obtenerTodos(): Promise<RespuestaUsuarioDto[]> {
    const usuarios = await this.usuarioRepository.find();
    return usuarios.map((u) => this.mapearARespuestaDto(u));
  }
}
