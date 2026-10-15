import { Medico } from './../medicos/entities/medico.entity';
import { Module } from '@nestjs/common';
import { Reserva } from './entities/reserva.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservaService } from './services/reservas.service';
import { ReservaController } from './controllers/reserva.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Reserva, Medico])],
  controllers: [ReservaController],
  providers: [ReservaService],
  exports: [ReservaService],
})
export class ReservaModule {}
