import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(password: string) {
    if (
      !(await compare(
        password,
        this.configService.get<string>('PASSWORD_HASH')!,
      ))
    ) {
      throw new UnauthorizedException('Wrong password');
    }

    return {jwt: this.jwtService.sign({})};
  }
}
