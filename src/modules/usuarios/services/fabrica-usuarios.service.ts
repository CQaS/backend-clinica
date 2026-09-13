import { Injectable } from '@nestjs/common';
import { Rol } from '../enums/rol.enum';
import { Usuario } from '../entities/usuario.entity';
import { RespuestaUsuarioDto } from '../dtos/outputs/respuesta-usuario.dto';

@Injectable()
export class FabricaUsuariosService {
  procesarUsuario(usuario: Usuario): RespuestaUsuarioDto {
    let mensajeBienvenida = '';
    let permisos: string[] = [];

    switch (usuario.rol) {
      case Rol.MEDICO:
        mensajeBienvenida = `Bienvenido Dr. ${usuario.nombres} ${usuario.apellidos}`;
        permisos = ['VER_TURNOS', 'MARCAR_ATENDIDO', 'MARCAR_AUSENTE'];
        break;
      case Rol.PACIENTE:
        mensajeBienvenida = `Hola ${usuario.nombres} ${usuario.apellidos}, bienvenido a tu portal`;
        permisos = ['RESERVAR_TURNO', 'LISTAR_TURNOS', 'CANCELAR_TURNO'];
        break;
      case Rol.ADMINISTRADOR:
        mensajeBienvenida = `Panel de administración - Hola ${usuario.nombres}`;
        permisos = [
          'RESERVAR_TURNO',
          'LISTAR_TURNOS',
          'CANCELAR_TURNO',
          'MODIFICAR_VALOR_CONSULTA',
        ];
        break;
    }

    return {
      id: usuario.id,
      documento: usuario.documento,
      apellidos: usuario.apellidos,
      nombres: usuario.nombres,
      email: usuario.email,
      estado: usuario.estado,
      rol: usuario.rol,
      mensajeBienvenida,
      permisos,
    };
  }
}
