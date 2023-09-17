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
  async create(@Res() res: Response, @Body() createCourseDto: CreateCourseDto) {
    try {
      await this.coursesService.createCourse(createCourseDto);
      return res.json({ message: `Course created successfully` });
    } catch (err) {
      throw new Error(`Error when attempting to create course, err: ${err}`);
    }
  }

  @Get()
  async findAll(): Promise<Course[]> {
    try {
      return await this.coursesService.findAllCourses();
    } catch (err) {
      if(err instanceof NotFoundException) {
        throw err;
      }
      throw new Error(`Error when attempting to find all courses, err: ${err}`);
    }
  }

  @Get(':course_name')
  async findOne(@Param('course_name') course_name: string): Promise<Course> {
    try {
      return await this.coursesService.findOneCourse(course_name);
    } catch (err) {
      if(err instanceof NotFoundException) {
        throw err;
      }
      throw new Error(`Error when attempting to find course ${course_name}, err: ${err}`);
    }
  }

  @Put(':course_name')
  async update(@Res() res: Response, @Param('course_name') course_name: string, @Body() updateCourseDto: UpdateCourseDto) {
    try {
      await this.coursesService.updateCourse(course_name, updateCourseDto);
      return res.json({ message: `Course: ${course_name} updated successfully` });
    } catch (err) {
      throw new Error(`Error when updating course ${course_name}, err: ${err}`);
    }
  }

  @Delete(':course_name')
  async remove(@Res() res: Response, @Param('course_name') course_name: string) {
    try {
      await this.coursesService.removeCourse(course_name);
      return res.json({ message: `Course: ${course_name} removed successfully` });
    } catch (err) {
      throw new Error(`Error when removing course ${course_name}, err: ${err}`);
    }
  }


  @Post('assign/:course_name')
  async assignStudentsToCourse(@Res() res: Response, @Param('course_name') course_name: string, @Body() dto: ManageCourseStudentsDto) {
    try {
      await this.coursesService.assignStudentsToCourse(course_name, dto);

      return res.json({ message: `Students assigned successfully to ${course_name}` });

    } catch (err) {
      throw new Error(`Error when attempting to assign students, err: ${err}`);
    }

  }


  @Put('unassign/:course_name')
  async unAssignStudentsToCourse(@Res() res: Response, @Param('course_name') course_name: string, @Body() dto: ManageCourseStudentsDto) {
    try {
      await this.coursesService.unAssignStudentsFromCourse(course_name, dto);

      return res.json({ message: `Students unassigned successfully from ${course_name}` });
    } catch (err) {
      throw new Error(`Error when attempting to un-assign students, err: ${err}`);
    }
  }
}
