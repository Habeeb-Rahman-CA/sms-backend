import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class SignInDto {
  @ApiProperty({ example: 'admin@sms.edu', description: 'Email address or username' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  identifier: string;

  @ApiProperty({ example: 'p@ssword123', description: 'Account password' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  password: string;
}
