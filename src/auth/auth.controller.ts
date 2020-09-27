import { Body, Controller, Post } from '@nestjs/common';
import { IsString } from 'class-validator';
import { AuthService } from './auth.service';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  @IsString()
  password!: string;
}

@ApiTags('auth')
@Controller('login')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  login(@Body() loginRequest: LoginDto) {
    return this.authService.login(loginRequest.password);
  }
}
