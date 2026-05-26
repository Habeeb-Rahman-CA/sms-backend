import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { School } from './entities/school.entity';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';

@Injectable()
export class SchoolsService {
  constructor(
    @InjectRepository(School)
    private readonly schoolRepo: Repository<School>,
  ) {}

  async create(dto: CreateSchoolDto): Promise<School> {
    const existing = await this.schoolRepo.findOne({
      where: [{ schoolCode: dto.schoolCode }, { email: dto.email }],
    });
    if (existing) {
      throw new ConflictException(
        'A school with this code or email already exists.',
      );
    }
    const school = this.schoolRepo.create(dto);
    return this.schoolRepo.save(school);
  }

  async findAll(): Promise<School[]> {
    return this.schoolRepo.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: number): Promise<School> {
    const school = await this.schoolRepo.findOne({ where: { id } });
    if (!school) {
      throw new NotFoundException(`School with id ${id} not found.`);
    }
    return school;
  }

  async update(id: number, dto: UpdateSchoolDto): Promise<School> {
    const school = await this.findOne(id);

    // Check for uniqueness conflicts with OTHER schools
    if (dto.schoolCode || dto.email) {
      const conditions = [];
      if (dto.schoolCode) conditions.push({ schoolCode: dto.schoolCode });
      if (dto.email) conditions.push({ email: dto.email });

      const conflict = await this.schoolRepo.findOne({
        where: conditions,
      });

      if (conflict && conflict.id !== id) {
        throw new ConflictException(
          'Another school with this code or email already exists.',
        );
      }
    }

    Object.assign(school, dto);
    return this.schoolRepo.save(school);
  }

  async remove(id: number): Promise<{ message: string }> {
    const school = await this.findOne(id);
    await this.schoolRepo.remove(school);
    return { message: `School "${school.schoolName}" deleted successfully.` };
  }

  async toggleActive(id: number): Promise<School> {
    const school = await this.findOne(id);
    school.isActive = !school.isActive;
    return this.schoolRepo.save(school);
  }
}
