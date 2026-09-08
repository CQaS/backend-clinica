import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntidad } from './entidades/usuario.entity';
import { FabricaUsuariosServicio } from './fabrica/fabrica-usuarios.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [UsuarioEntidad],
      synchronize: false, // En falso porque ya creamos la tabla en Neon
      ssl: { rejectUnauthorized: false },
    }),
    TypeOrmModule.forFeature([UsuarioEntidad]),
  ],
  controllers: [AppController],
  providers: [AppService, FabricaUsuariosServicio],
})
export class AppModule {}
