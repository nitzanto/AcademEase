import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe, Query } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {
  }

  @Post()
  async create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Get()
  async findAll(@Query('year', new ParseIntPipe({ optional: true })) year?: number) {
    if (year) {
      return this.studentsService.getStudentsCoursesByYear(year);
    } else {
      return this.studentsService.findAll();
    }
  }

  @Get(':student_id')
  findOne(
    @Param('student_id', ParseIntPipe) student_id: number,
    @Query('year', new ParseIntPipe({ optional: true })) year?: number,
  ) {
    if (!year) {
      return this.studentsService.findOne(student_id);

    } else {
      return this.studentsService.getStudentCoursesByYear(student_id, year);
    }
  }

  @Put(':student_id')
  async update(@Param('student_id', ParseIntPipe) student_id: number, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(student_id, updateStudentDto);
  }

  @Delete(':student_id')
  async remove(@Param('student_id', ParseIntPipe) student_id: number) {
    await this.studentsService.remove(student_id);
  }
}
