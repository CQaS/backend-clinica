import { Module } from '@nestjs/common';
import { Usuario } from './entities/usuario.entity';
import { UsuarioController } from './controllers/usuario.controller';
import { UsuarioService } from './services/usuario.service';
import { FabricaUsuariosService } from './services/fabrica-usuarios.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])],
  controllers: [UsuarioController],
  providers: [UsuarioService, FabricaUsuariosService],
  exports: [UsuarioService, TypeOrmModule],
})
export class UsuarioModule {}
