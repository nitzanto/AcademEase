import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
  Query,
  HttpCode,
  Res, NotFoundException,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import { Response } from 'express';

@Controller('students')
export class StudentsController {
  constructor(
    private readonly studentsService: StudentsService,
  ) {
  }

  @HttpCode(201)
  @Post()
  async createStudent(@Body() createStudentDto: CreateStudentDto, @Res() res: Response) {
    try {
      await this.studentsService.createStudent(createStudentDto);
      return res.json({ message: 'Student created successfully' });
    } catch (err) {
      res.status(500).json({ message: 'An error occurred while creating the student', error: err.message });
    }
  }


  @HttpCode(200)
  @Get()
  async findAllStudents(
    @Res() res: Response,
    @Query('year', new ParseIntPipe({ optional: true })) year?: number) {
    try {
      let students: Student[];
      if (year) {
        students = await this.studentsService.getStudentsCoursesByYear(year);
      } else {
        students = await this.studentsService.findAllStudents();
      }

      return res.json(students);

    } catch (err) {
      if (err instanceof NotFoundException) {
        throw err;
      }

      return res.status(500).json({ error: `An error occurred while attempting to find all students: ${err.message}` });
    }
  }

  @HttpCode(200)
  @Get(':student_id')
  async findOneStudent(
    @Res() res: Response,
    @Param('student_id', ParseIntPipe) student_id: number,
    @Query('year', new ParseIntPipe({ optional: true })) year?: number,
  ) {
    try {
      let student: Student;
      if (!year) {
        student = await this.studentsService.findOneStudent(student_id);
      } else {
        student = await this.studentsService.getStudentCoursesByYear(student_id, year);
      }

      return res.json(student);
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw err;
      }
      return res.status(500).json({ error: `An error occurred while finding the student: ${err.message}` });
    }
  }

  @HttpCode(200)
  @Put(':student_id')
  async updateStudent(
    @Param('student_id', ParseIntPipe) student_id: number,
    @Body() updateStudentDto: UpdateStudentDto,
    @Res() res: Response) {
    try {
      await this.studentsService.updateStudent(student_id, updateStudentDto);
      return res.json({ message: 'Student updated successfully' });
    } catch (err) {
      res.status(500).json({ message: 'An error occurred while updating the student', error: err.message });
    }
  }

  @HttpCode(204)
  @Delete(':student_id')
  async removeStudent(@Res() res: Response, @Param('student_id', ParseIntPipe) student_id: number) {
    try {
      await this.studentsService.removeStudent(student_id);
      return res.json({ message: 'Student removed successfully' });
    } catch (err) {
      throw new Error(`An error occurred while removing the student: ${err}`);
    }
  }
}
