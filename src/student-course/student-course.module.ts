import { Module } from '@nestjs/common';
import { StudentCourseService } from './student-course.service';
import { StudentCourseController } from './student-course.controller';
import { Course } from '../courses/entities/course.entity';
import { Student } from '../students/entities/student.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Course])],
  controllers: [StudentCourseController],
  providers: [StudentCourseService],
})
export class StudentCourseModule {}
