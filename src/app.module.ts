import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './modules/usuarios/usuario.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const urlConexion = configService.get<string>('DATABASE_URL');

        return {
          type: 'postgres',
          ...(urlConexion
            ? { url: urlConexion }
            : {
                host: configService.get<string>('DB_HOST'),
                port: parseInt(
                  configService.get<string>('DB_PORT') || '5432',
                  10,
                ),
                username: configService.get<string>('DB_USERNAME'),
                password: configService.get<string>('DB_PASSWORD'),
                database: configService.get<string>('DB_NAME'),
              }),
          autoLoadEntities: true,
          synchronize: false,
          logging: configService.get<string>('DB_LOGGING') === 'true',
          logger: 'advanced-console',
          ssl:
            urlConexion || configService.get<string>('DB_SSL') === 'true'
              ? { rejectUnauthorized: false }
              : false,
        };
      },
    }),
    UsuarioModule,
    AuthModule,
  ],
})
export class AppModule {}
