import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const rolesRequeridos = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!rolesRequeridos || rolesRequeridos.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const usuario = request['usuario'];

    if (!usuario || !usuario.rol) {
      throw new ForbiddenException('No posees un rol válido asignado');
    }

    const tieneRolPermitido = rolesRequeridos.includes(usuario.rol);

    if (!tieneRolPermitido) {
      throw new ForbiddenException(
        `Acceso denegado: Se requiere alguno de los siguientes roles [${rolesRequeridos.join(', ')}]`,
      );
    }

    return true;
  }
}
