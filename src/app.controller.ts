import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UsuarioProcesado } from './fabrica/fabrica-usuarios.service';

@Controller('api/usuarios')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  obtenerTodos(): Promise<UsuarioProcesado[]> {
    return this.appService.obtenerUsuariosProcesados();
  }
}
