import { Controller, Get } from '@nestjs/common';

@Controller('login')
export class AuthController {
  @Get('')
  login() {
    return null;
  }
}
