import {
  Controller,
  Get,
  Patch,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { MedicoService } from '../services/medico.service';
import { ActualizarValorConsultaDto } from '../dtos/inputs/actualizar-valor-consulta.dto';
import { RespuestaMedicoDto } from '../dtos/outputs/respuesta-medico.dto';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { AuthGuard } from '../../auth/guards/auth.guard';

@ApiTags('médicos')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('medicos')
export class MedicoController {
  constructor(private readonly medicoService: MedicoService) {}

  @Get()
  @Roles('ADMINISTRADOR', 'PACIENTE', 'MEDICO')
  @ApiOperation({ summary: 'Obtener la lista de todos los médicos' })
  @ApiResponse({ status: 200, type: [RespuestaMedicoDto] })
  async obtenerTodos(): Promise<RespuestaMedicoDto[]> {
    return await this.medicoService.obtenerTodos();
  }

  @Get(':id')
  @Roles('ADMINISTRADOR', 'PACIENTE', 'MEDICO')
  @ApiOperation({ summary: 'Obtener un médico por su ID' })
  @ApiResponse({ status: 200, type: RespuestaMedicoDto })
  @ApiResponse({ status: 404, description: 'Médico no encontrado' })
  async obtenerPorId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<RespuestaMedicoDto> {
    return await this.medicoService.obtenerPorId(id);
  }

  @Patch(':id/valor-consulta')
  @Roles('ADMINISTRADOR')
  @ApiOperation({
    summary: 'Actualizar el valor de la consulta médica (Solo Administrador)',
  })
  @ApiResponse({ status: 200, type: RespuestaMedicoDto })
  @ApiResponse({ status: 404, description: 'Médico no encontrado' })
  async actualizarValorConsulta(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ActualizarValorConsultaDto,
  ): Promise<RespuestaMedicoDto> {
    return await this.medicoService.actualizarValorConsulta(id, dto);
  }
}
