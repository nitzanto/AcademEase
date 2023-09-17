import { Controller, Get, Post, Body, Param, Delete, Put, Res, NotFoundException } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { Response } from 'express';
import { ManageCourseStudentsDto } from './dto/manage-course-students.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {
  }

  @Post()
  async createCourse(@Res() res: Response, @Body() createCourseDto: CreateCourseDto) {
    try {
      await this.coursesService.createCourse(createCourseDto);
      return res.json({ message: `Course created successfully` });
    } catch (err) {
      throw new Error(`Error when attempting to create course, err: ${err}`);
    }
  }

  @Get()
  async findAllCourses(@Res() res:Response) {
    try {
      const courses = await this.coursesService.findAllCourses()
      return res.status(200).json(courses);
    } catch (err) {
      if(err instanceof NotFoundException) {
        throw err;
      }
      return res.status(500).json({ error: `Error when attempting to find courses: ${err.message}` });
    }
  }

  @Get(':course_name')
  async findOneCourse(@Param('course_name') course_name: string , @Res() res:Response){
    try {
      const course = await this.coursesService.findOneCourse(course_name);
      return res.status(200).json(course);
    } catch (err) {
      return res.status(500).json({ error: `Error when attempting to find course ${course_name}: ${err.message}` });
    }
  }

  @Put(':course_name')
  async updateCourse(@Res() res: Response, @Param('course_name') course_name: string, @Body() updateCourseDto: UpdateCourseDto) {
    try {
      await this.coursesService.updateCourse(course_name, updateCourseDto);
      return res.json({ message: `Course: ${course_name} updated successfully` });
    } catch (err) {
      return res.status(500).json({ error: `Error when updating course: ${err.message}` });
    }
  }

  @Delete(':course_name')
  async removeCourse(@Res() res: Response, @Param('course_name') course_name: string) {
    try {
      await this.coursesService.removeCourse(course_name);
      return res.json({ message: `Course: ${course_name} removed successfully` });
    } catch (err) {
      return res.status(500).json({ error: `Error when attempting to remove course: ${err.message}` });
    }
  }


  @Post('assign/:course_name')
  async assignStudentsToCourse(@Res() res: Response, @Param('course_name') course_name: string, @Body() dto: ManageCourseStudentsDto) {
    try {
      await this.coursesService.assignStudentsToCourse(course_name, dto);

      return res.json({ message: `Students assigned successfully to ${course_name}` });

    } catch (err) {
      return res.status(500).json({ error: `Error when attempting to assign students: ${err.message}` });
    }

  }


  @Put('unassign/:course_name')
  async unAssignStudentsToCourse(@Res() res: Response, @Param('course_name') course_name: string, @Body() dto: ManageCourseStudentsDto) {
    try {
      await this.coursesService.unAssignStudentsFromCourse(course_name, dto);

      return res.json({ message: `Students unassigned successfully from ${course_name}` });
    } catch (err) {
      return res.status(500).json({ error: `Error when attempting to un-assign students: ${err.message}` });
    }
  }
}
