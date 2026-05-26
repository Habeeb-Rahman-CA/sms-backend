import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsBoolean,
  IsNotEmpty,
  MaxLength,
} from 'class-validator';

export class CreateSchoolDto {
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

  @ApiPropertyOptional({ example: 'sunrise.edu', description: 'School domain (optional)' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  domain?: string;

  @ApiPropertyOptional({ example: '123 Main Street, City, State', description: 'Physical address' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ example: '+1-555-0100', description: 'Contact phone number' })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;

  @ApiProperty({ example: 'admin@sunrise.edu', description: 'Primary admin email' })
  @IsEmail()
  @MaxLength(100)
  email: string;

  @ApiPropertyOptional({ example: 'https://cdn.example.com/logo.png', description: 'Logo URL or base64 string' })
  @IsOptional()
  @IsString()
  logo?: string;

  @ApiPropertyOptional({ example: true, description: 'Whether the school is active', default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
