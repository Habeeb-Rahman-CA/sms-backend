import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { School } from './entities/school.entity';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { CreateRegisterDto } from './dto/create-register.dto';
import { CryptoHelper } from '../helpers/crypto.helper';
import { User } from '../users/entities/user.entity';
import { Role } from '../roles/entities/role.entity';
import { UserRole } from '../users/entities/user-role.entity';
import { Designation } from '../tenant/entities/designation.entity';
import { Employee } from '../tenant/entities/employee.entity';

@Injectable()
export class SchoolsService {
  constructor(
    @InjectRepository(School)
    private readonly schoolRepo: Repository<School>,
    private readonly dataSource: DataSource,
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

  async register(dto: CreateRegisterDto): Promise<{ message: string; school: School }> {
    // 1. Check if school code or email conflicts exist
    const existingSchool = await this.schoolRepo.findOne({
      where: [{ schoolCode: dto.schoolCode }, { email: dto.email }],
    });
    if (existingSchool) {
      throw new ConflictException('A school with this code or email already exists.');
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Check user email
      const existingUser = await queryRunner.manager.findOne(User, {
        where: { email: dto.email },
      });
      if (existingUser) {
        throw new ConflictException('A user with this email already exists.');
      }

      // Create school
      const school = queryRunner.manager.create(School, {
        schoolName: dto.schoolName,
        schoolCode: dto.schoolCode,
        email: dto.email,
        phone: dto.phone,
        isActive: true,
      });
      const savedSchool = await queryRunner.manager.save(school);

      // Get or create Role 'Admin'
      let adminRole = await queryRunner.manager.findOne(Role, {
        where: { name: 'Admin' },
      });
      if (!adminRole) {
        adminRole = queryRunner.manager.create(Role, { name: 'Admin' });
        adminRole = await queryRunner.manager.save(Role, adminRole);
      }

      // Hash password
      const hashedPassword = await CryptoHelper.hashPassword(dto.password);

      // Create User
      const user = queryRunner.manager.create(User, {
        name: dto.adminName,
        email: dto.email,
        password: hashedPassword,
        isActive: true,
      });
      const savedUser = await queryRunner.manager.save(user);

      // Create UserRole junction
      const userRole = queryRunner.manager.create(UserRole, {
        userid: savedUser.id,
        roleid: adminRole.id,
      });
      await queryRunner.manager.save(UserRole, userRole);

      // Create Designation 'Administrator' for the school
      const designation = queryRunner.manager.create(Designation, {
        schoolId: savedSchool.id,
        designationName: 'Administrator',
      });
      const savedDesignation = await queryRunner.manager.save(Designation, designation);

      // Create Employee
      const employee = queryRunner.manager.create(Employee, {
        schoolId: savedSchool.id,
        userId: savedUser.id,
        employeeCode: `EMP-${savedSchool.schoolCode}-001`,
        designationId: savedDesignation.id,
        phone: dto.phone,
      });
      await queryRunner.manager.save(Employee, employee);

      await queryRunner.commitTransaction();

      return {
        message: 'School account created successfully.',
        school: savedSchool,
      };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
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
