import { Module } from '@nestjs/common';
import { Medico } from './entities/medico.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Medico])],
})
export class MedicoModule {}
