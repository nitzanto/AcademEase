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

  @Post()
  @HttpCode(201)
  async createStudent(@Body() createStudentDto: CreateStudentDto, @Res() res: Response) {
    try {
      await this.studentsService.createStudent(createStudentDto);
      return res.json({ message: 'Student created successfully' });
    } catch (err) {
      res.status(500).json({ message: 'An error occurred while creating the student', error: err.message });
    }
  }

  @Get()
  @HttpCode(200)
  async findAllStudents(
    @Query('year', new ParseIntPipe({ optional: true })) year?: number): Promise<Student[]> {
    try {
      let students: Student[];
      if (year) {
        students = await this.studentsService.getStudentsCoursesByYear(year);
      } else {
        students = await this.studentsService.findAllStudents();
      }

      return students;

    } catch (err) {
      if (err instanceof NotFoundException) {
        throw err;
      }
      throw new Error(`An error occurred while attempting to find all students: ${err}`);
    }
  }

  @HttpCode(200)
  @Get(':student_id')
  async findOneStudent(
    @Param('student_id', ParseIntPipe) student_id: number,
    @Query('year', new ParseIntPipe({ optional: true })) year?: number,
  ): Promise<Student> {
    try {
      if (!year) {
        return await this.studentsService.findOneStudent(student_id);
      } else {
        return await this.studentsService.getStudentCoursesByYear(student_id, year);
      }
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw err;
      }
      throw new Error(`An error occurred while finding the student: ${err}`);
    }

  }

  @Put(':student_id')
  @HttpCode(204)
  async updateStudent(@Param('student_id', ParseIntPipe) student_id: number,
                      @Body() updateStudentDto: UpdateStudentDto,
                      @Res() res: Response) {
    try {
      await this.studentsService.updateStudent(student_id, updateStudentDto);
      return res.json({ message: 'Student updated successfully' });
    } catch (err) {
      res.status(500).json({ message: 'An error occurred while updating the student', error: err.message });
    }
  }

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
