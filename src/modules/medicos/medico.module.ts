import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medico } from './entities/medico.entity';
import { MedicosService } from './medicos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Medico])],
  providers: [MedicosService],
  exports: [MedicosService],
})
export class MedicosModule {}