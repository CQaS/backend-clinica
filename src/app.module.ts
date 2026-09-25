import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './modules/usuarios/usuario.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: false,
      //synchronize: true, // Solo para desarrollo, no usar en producción, crea automáticamente las tablas en la base de datos según las entidades definidas en el código.
      ssl: { rejectUnauthorized: false },
    }),
    UsuarioModule,
    AuthModule,
  ],
})
export class AppModule {}
