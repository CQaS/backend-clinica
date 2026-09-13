import { Body, Controller, Post } from '@nestjs/common';
import { LoginDTO } from '../dtos/input/login.dto';

@Controller('/auth')
export class LoginController {
  constructor() {}

  @Post('/login')
  async login(@Body() dto: LoginDTO): Promise<[accessToken: string]> {
    return [''];
  }
}
