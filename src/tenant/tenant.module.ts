import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from './entities/class.entity';
import { Section } from './entities/section.entity';
import { Subject } from './entities/subject.entity';
import { Student } from './entities/student.entity';
import { Parent } from './entities/parent.entity';
import { Employee } from './entities/employee.entity';
import { Attendance } from './entities/attendance.entity';
import { Exam } from './entities/exam.entity';
import { ExamMark } from './entities/exam-mark.entity';
import { Fee } from './entities/fee.entity';
import { FeePayment } from './entities/fee-payment.entity';
import { Timetable } from './entities/timetable.entity';
import { Notification } from './entities/notification.entity';
import { AcademicYear } from './entities/academic-year.entity';
import { Designation } from './entities/designation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Class,
      Section,
      Subject,
      Student,
      Parent,
      Employee,
      Attendance,
      Exam,
      ExamMark,
      Fee,
      FeePayment,
      Timetable,
      Notification,
      AcademicYear,
      Designation,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class TenantModule {}
