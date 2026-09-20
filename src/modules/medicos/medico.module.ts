import { Module } from '@nestjs/common';
import { medico } from './entities/medico.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([medico])],
})
export class medicoModule {}