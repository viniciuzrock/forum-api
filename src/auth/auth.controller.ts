import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Prisma } from '@prisma/client';

@Controller('auth')
export class AuthController {
  @Inject()
  private readonly authService: AuthService;

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() body: Prisma.UserCreateInput) {
    return this.authService.signIn(body);
  }
}
