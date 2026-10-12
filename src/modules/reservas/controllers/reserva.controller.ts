import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { ReservaService } from '../services/reservas.service';
import { CrearReservaDto } from '../dtos/inputs/crear.reserva.dtos';
import { CambiarEstadoReservaDto } from '../dtos/inputs/cambiar.estado.reserva.dtos';

@Controller('reservas')
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) {}

  @Get()
  obtenerTodos() {
    return this.reservaService.obtenerTodos();
  }

  @Post()
  crear(@Body() crearReservaDto: CrearReservaDto) {
    return this.reservaService.crear(crearReservaDto);
  }

  @Patch(':id/cancelar')
  cancelar(@Param('id') id: string) {
    return this.reservaService.cancelarReserva(+id);
  }

  @Patch(':id/estado')
  cambiarEstado(
    @Param('id') id: string,
    @Body() cambiarEstadoReservaDto: CambiarEstadoReservaDto,
  ) {
    return this.reservaService.cambiarEstado(+id, cambiarEstadoReservaDto);
  }
}
