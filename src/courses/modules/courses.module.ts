import { Module } from '@nestjs/common';
import { CoursesService } from '../services/courses.service';
import { CoursesController } from '../controllers/courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from '../entities/course.entity';
import { Student } from '../../students/entities/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Course])],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {
}
