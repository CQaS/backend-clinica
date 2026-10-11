import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MedicoService } from '../services/medico.service';
import { RespuestaMedicoDto } from '../dtos/outputs/respuesta-medico.dto';

@ApiTags('Medicos')
@Controller('medicos')
export class MedicoController {
constructor(private readonly medicoService: MedicoService) {}

@Get()
@ApiOperation({ summary: 'Obtener lista de medicos' })
@ApiResponse({ status: 200, type: [RespuestaMedicoDto] })
@ApiResponse({ status: 404, description: 'No se encontraron medicos' })
async obtenerTodos(): Promise<RespuestaMedicoDto[]> {
    return await this.medicoService.obtenerTodos();
}

@Get(':id')
@ApiOperation({ summary: 'Obtener medico por ID' })
@ApiResponse({ status: 200, type: RespuestaMedicoDto })
@ApiResponse({ status: 404, description: 'Medico no encontrado' })
async obtenerPorId(@Param('id', ParseIntPipe) id: number) {
    return await this.medicoService.obtenerPorId(id);
}
}