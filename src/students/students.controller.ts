import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
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
  async findAll() {
    return this.studentsService.findAll();
  }

  @Get(':student_id')
  async findOne(@Param('student_id', ParseIntPipe) student_id: number) {
    return this.studentsService.findOne(student_id);
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
