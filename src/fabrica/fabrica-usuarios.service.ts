import { Injectable } from '@nestjs/common';
import { UsuarioEntidad, RolesUsuarios } from '../entidades/usuario.entity';

// Interfaz que define la estructura procesada por la fábrica
export interface UsuarioProcesado {
  id: number;
  nombreCompleto: string;
  email: string;
  rol: string;
  mensajeBienvenida: string;
  permisos: string[];
}

@Injectable()
export class FabricaUsuariosServicio {
  crearUsuarioProcesado(usuario: UsuarioEntidad): UsuarioProcesado {
    const nombreCompleto = `${usuario.nombres} ${usuario.apellidos}`;

    switch (usuario.rol) {
      case RolesUsuarios.MEDICO:
        return {
          id: usuario.id,
          nombreCompleto,
          email: usuario.email,
          rol: usuario.rol,
          mensajeBienvenida: `Bienvenido Dr. ${usuario.apellidos}`,
          permisos: ['VER_TURNOS', 'MARCAR_ATENDIDO', 'MARCAR_AUSENTE'],
        };

      case RolesUsuarios.PACIENTE:
        return {
          id: usuario.id,
          nombreCompleto,
          email: usuario.email,
          rol: usuario.rol,
          mensajeBienvenida: `Hola ${usuario.nombres}, gestiona tus turnos`,
          permisos: [
            'RESERVAR_TURNO',
            'LISTAR_TURNOS',
            'CANCELAR_TURNO_PROPIO',
          ],
        };

      case RolesUsuarios.ADMINISTRADOR:
        return {
          id: usuario.id,
          nombreCompleto,
          email: usuario.email,
          rol: usuario.rol,
          mensajeBienvenida: `Panel Administrativo - ${nombreCompleto}`,
          permisos: [
            'RESERVAR_TURNO',
            'LISTAR_TURNOS',
            'CANCELAR_TURNO_ADMIN',
            'MODIFICAR_VALOR_CONSULTA',
          ],
        };

      default:
        throw new Error('Rol de usuario no válido');
    }
  }
}
