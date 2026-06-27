import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CryptoHelper } from '../helpers/crypto.helper';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async signIn(dto: SignInDto): Promise<{ message: string; user: Partial<User> }> {
    // Find user by email (identifier)
    const user = await this.userRepo.findOne({
      where: { email: dto.identifier.toLowerCase().trim() },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials. Please check your email and password.');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('This account has been deactivated. Please contact support.');
    }

    // Verify password
    const passwordValid = await CryptoHelper.comparePassword(dto.password, user.password!);
    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials. Please check your email and password.');
    }

    // Return user info (never return raw password)
    const { password: _pw, ...safeUser } = user;

    return {
      message: 'Sign in successful.',
      user: safeUser,
    };
  }
}
