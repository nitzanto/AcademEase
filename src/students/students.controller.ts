import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe, Query, HttpCode, Logger } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';

@Controller('students')
export class StudentsController {
  constructor(
    private readonly studentsService: StudentsService,
  ) {
  }

  @Post()
  @HttpCode(201)
  async create(@Body() createStudentDto: CreateStudentDto): Promise<void> {
    try {
      return this.studentsService.create(createStudentDto);
    } catch (err) {
      throw new Error(`An error occurred while creating students: ${err}`);
    }
  }

  @Get()
  @HttpCode(200)
  async findAll(@Query('year', new ParseIntPipe({ optional: true })) year?: number): Promise<Student[]> {
    try {
      if (year) {
        return this.studentsService.getStudentsCoursesByYear(year);
      } else {
        return this.studentsService.findAll();
      }
    } catch (err) {
      throw new Error(`An error occurred while attempting to find all students: ${err}`);
    }
  }

  @HttpCode(200)
  @Get(':student_id')
  findOne(
    @Param('student_id', ParseIntPipe) student_id: number,
    @Query('year', new ParseIntPipe({ optional: true })) year?: number,
  ): Promise<Student> {
    try {
      if (!year) {
        return this.studentsService.findOne(student_id);

      } else {
        return this.studentsService.getStudentCoursesByYear(student_id, year);
      }
    } catch (err) {
      throw new Error(`An error occurred while find the student: ${err}`);
    }

  }

  @Put(':student_id')
  @HttpCode(204)
  async update(@Param('student_id', ParseIntPipe) student_id: number, @Body() updateStudentDto: UpdateStudentDto): Promise<void> {
    try {
      return this.studentsService.update(student_id, updateStudentDto);
    } catch (err) {
      throw new Error(`An error occurred while updating the student: ${err}`);
    }
  }

  @Delete(':student_id')
  async remove(@Param('student_id', ParseIntPipe) student_id: number): Promise<void> {
    try {
      await this.studentsService.remove(student_id);
    } catch (err) {
      throw new Error(`An error occurred while removing the student: ${err}`);
    }
  }
}
