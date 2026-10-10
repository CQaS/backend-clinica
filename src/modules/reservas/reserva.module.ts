import { Module } from '@nestjs/common';
import { Reserva } from './entities/reserva.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservaService } from './services/reservas.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reserva])],
  providers: [ReservaService],
  exports: [ReservaService],
})
export class ReservaModule {}
