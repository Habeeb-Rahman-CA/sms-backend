import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Authenticate a user with email and password' })
  @ApiResponse({ status: 200, description: 'Sign in successful.' })
  @ApiResponse({ status: 401, description: 'Invalid credentials.' })
  signIn(@Body() dto: SignInDto) {
    return this.authService.signIn(dto);
  }
}
