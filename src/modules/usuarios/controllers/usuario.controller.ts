import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UsuarioService } from '../services/usuario.service';
import { CrearUsuarioDto } from '../dtos/inputs/crear-usuario.dto';
import { RespuestaUsuarioDto } from '../dtos/outputs/respuesta-usuario.dto';

@ApiTags('Usuarios')
@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiResponse({
    status: 201,
    description: 'Usuario creado exitosamente',
    type: RespuestaUsuarioDto,
  })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  crear(
    @Body() crearUsuarioDto: CrearUsuarioDto,
  ): Promise<RespuestaUsuarioDto> {
    return this.usuarioService.crear(crearUsuarioDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener lista de usuarios procesados' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuarios recuperada',
    type: [RespuestaUsuarioDto],
  })
  obtenerTodos(): Promise<RespuestaUsuarioDto[]> {
    return this.usuarioService.obtenerTodos();
  }
}
