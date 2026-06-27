import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateRegisterDto {
  @ApiProperty({ example: 'Sunrise International School', description: 'Full name of the school' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  schoolName: string;

  @ApiProperty({ example: 'SIS001', description: 'Unique school code identifier' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  schoolCode: string;

  @ApiProperty({ example: 'John Doe', description: 'Full name of the primary administrator' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  adminName: string;

  @ApiProperty({ example: 'admin@sunrise.edu', description: 'Primary administrator/school email' })
  @IsEmail()
  @MaxLength(100)
  email: string;

  @ApiPropertyOptional({ example: '+1-555-0100', description: 'Contact phone number' })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;

  @ApiProperty({ example: 'p@ssword123', description: 'Password for the administrator account' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(100)
  password: string;
}
