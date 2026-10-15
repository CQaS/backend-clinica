import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medico } from './entities/medico.entity';
import { MedicoService } from './services/medico.service';
import { MedicoController } from './controllers/medico.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Medico])],
  controllers: [MedicoController],
  providers: [MedicoService],
  exports: [MedicoService, TypeOrmModule],
})
export class MedicosModule {}
