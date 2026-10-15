import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Query,
  Req,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { ReservaService } from '../services/reservas.service';
import { CrearReservaDto } from '../dtos/inputs/crear.reserva.dtos';
import { CambiarEstadoReservaDto } from '../dtos/inputs/cambiar.estado.reserva.dtos';
import { RespuestaReservaDto } from '../dtos/outputs/respuesta.reserva.dtos';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';

@ApiTags('reservas')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('reservas')
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) {}

  @Post()
  @Roles('ADMINISTRADOR', 'PACIENTE')
  @ApiOperation({ summary: 'Solicitar una nueva reserva de turno médico' })
  @ApiResponse({ status: 201, type: RespuestaReservaDto })
  async crear(
    @Body() dto: CrearReservaDto,
    @Req() req: any,
  ): Promise<RespuestaReservaDto> {
    const usuarioAuth = req['usuario'];
    return await this.reservaService.crear(dto, usuarioAuth);
  }

  @Get()
  @Roles('ADMINISTRADOR', 'PACIENTE', 'MEDICO')
  @ApiOperation({
    summary: 'Listar reservas según el rol del usuario autenticado',
  })
  @ApiQuery({
    name: 'fecha',
    required: false,
    description: 'Filtrar por fecha YYYY-MM-DD',
  })
  @ApiResponse({ status: 200, type: [RespuestaReservaDto] })
  async obtenerTodas(
    @Req() req: any,
    @Query('fecha') fecha?: string,
  ): Promise<RespuestaReservaDto[]> {
    const usuarioAuth = req['usuario'];
    return await this.reservaService.obtenerTodas(usuarioAuth, fecha);
  }

  @Patch(':id/cancelar')
  @Roles('ADMINISTRADOR', 'PACIENTE')
  @ApiOperation({ summary: 'Cancelar una reserva activa' })
  @ApiResponse({ status: 200, type: RespuestaReservaDto })
  async cancelar(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: any,
  ): Promise<RespuestaReservaDto> {
    const usuarioAuth = req['usuario'];
    return await this.reservaService.cancelarReserva(id, usuarioAuth);
  }

  @Patch(':id/estado')
  @Roles('MEDICO', 'ADMINISTRADOR')
  @ApiOperation({ summary: 'Marcar estado de reserva como ATENDIDO o AUSENTE' })
  @ApiResponse({ status: 200, type: RespuestaReservaDto })
  async cambiarEstado(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CambiarEstadoReservaDto,
  ): Promise<RespuestaReservaDto> {
    return await this.reservaService.cambiarEstado(id, dto);
  }
}
