import { Controller, Post, Body, HttpCode, HttpStatus, Inject,} from '@nestjs/common';
import { AuthService } from './auth.service';
import {Prisma } from 'generated/prisma/client';

@Controller('auth')
export class AuthController {
  @Inject()
  private readonly authService: AuthService 
  

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  create(@Body() body: Prisma.UserCreateInput ) {
    
    return this.authService.signin(body);
  }

}
