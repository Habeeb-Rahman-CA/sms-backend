import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { SchoolsService } from './schools.service';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';

@ApiTags('Schools')
@Controller('schools')
export class SchoolsController {
  constructor(private readonly schoolsService: SchoolsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new school (tenant)' })
  @ApiResponse({ status: 201, description: 'School created successfully.' })
  @ApiResponse({ status: 409, description: 'School code or email already exists.' })
  create(@Body() dto: CreateSchoolDto) {
    return this.schoolsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all schools' })
  @ApiResponse({ status: 200, description: 'List of all schools.' })
  findAll() {
    return this.schoolsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a school by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'School ID' })
  @ApiResponse({ status: 200, description: 'School found.' })
  @ApiResponse({ status: 404, description: 'School not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.schoolsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a school by ID (full update)' })
  @ApiParam({ name: 'id', type: Number, description: 'School ID' })
  @ApiResponse({ status: 200, description: 'School updated successfully.' })
  @ApiResponse({ status: 404, description: 'School not found.' })
  @ApiResponse({ status: 409, description: 'School code or email already exists.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateSchoolDto,
  ) {
    return this.schoolsService.update(id, dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Partially update a school by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'School ID' })
  @ApiResponse({ status: 200, description: 'School updated successfully.' })
  @ApiResponse({ status: 404, description: 'School not found.' })
  @ApiResponse({ status: 409, description: 'School code or email already exists.' })
  patch(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSchoolDto,
  ) {
    return this.schoolsService.update(id, dto);
  }

  @Patch(':id/toggle-active')
  @ApiOperation({ summary: 'Toggle IsActive status of a school' })
  @ApiParam({ name: 'id', type: Number, description: 'School ID' })
  @ApiResponse({ status: 200, description: 'School active status toggled.' })
  toggleActive(@Param('id', ParseIntPipe) id: number) {
    return this.schoolsService.toggleActive(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a school by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'School ID' })
  @ApiResponse({ status: 200, description: 'School deleted successfully.' })
  @ApiResponse({ status: 404, description: 'School not found.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.schoolsService.remove(id);
  }
}
