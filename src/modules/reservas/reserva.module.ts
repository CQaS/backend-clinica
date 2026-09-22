import { Module } from '@nestjs/common';
import { reserva } from './entities/reserva.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([reserva])],
})
export class reservaModule {}