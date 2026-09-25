import { Module } from '@nestjs/common';
import { Reserva } from './entities/reserva.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Reserva])],
})
export class ReservaModule {}
