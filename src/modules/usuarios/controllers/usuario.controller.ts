import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsuarioService } from '../services/usuario.service';
import { RespuestaUsuarioDto } from '../dtos/outputs/respuesta-usuario.dto';

@ApiTags('Usuarios')
@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener lista de usuarios' })
  @ApiResponse({ status: 200, type: [RespuestaUsuarioDto] })
  async obtenerTodos(): Promise<RespuestaUsuarioDto[]> {
    return await this.usuarioService.obtenerTodos();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener usuario por ID' })
  @ApiResponse({ status: 200, type: RespuestaUsuarioDto })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async obtenerPorId(@Param('id', ParseIntPipe) id: number) {
    return await this.usuarioService.obtenerPorId(id);
  }
}
