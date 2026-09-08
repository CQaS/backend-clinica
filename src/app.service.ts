import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioEntidad } from './entidades/usuario.entity';
import {
  FabricaUsuariosServicio,
  UsuarioProcesado,
} from './fabrica/fabrica-usuarios.service';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(UsuarioEntidad)
    private readonly usuarioRepositorio: Repository<UsuarioEntidad>,
    private readonly fabricaUsuariosServicio: FabricaUsuariosServicio,
  ) {}

  async obtenerUsuariosProcesados(): Promise<UsuarioProcesado[]> {
    const usuariosBD = await this.usuarioRepositorio.find();
    return usuariosBD.map((usuario) =>
      this.fabricaUsuariosServicio.crearUsuarioProcesado(usuario),
    );
  }
}
