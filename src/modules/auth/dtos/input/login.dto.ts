import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
  @ApiProperty()
  @IsString()
  @IsEmail()
  @IsNotEmpty({ message: 'Email es requerido' })
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Password es requerido' })
  password: string;
}
