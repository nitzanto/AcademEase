import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentCourseService } from './student-course.service';
import { AssignStudentsToCourseDto } from './dto/assign-students-to-course.dto';

@Controller('student-course')
export class StudentCourseController {
  constructor(private readonly studentCourseService: StudentCourseService) {}

  @Post('assign/:course_name')
  async assignStudentsToCourse(
    @Param('course_name') course_name: string,
    @Body() assignStudentsDto: AssignStudentsToCourseDto,
  ) {
    // Call the service to assign students to the course
    const result = await this.studentCourseService.assignStudentsToCourse(
      course_name,
      assignStudentsDto,
    );

    if (result) {
      return {
        message: 'Students assigned to the course successfully.',
      };
    } else {
      return {
        message: 'Course or students not found.',
      };
    }
  }


  @Post('assign/:course_name')
  async unAssignStudentsToCourse(
    @Param('course_name') course_name: string,
    @Body() assignStudentsDto: AssignStudentsToCourseDto,
  ) {
    // Call the service to assign students to the course
    return await this.studentCourseService.unAssignStudentsFromCourse(
      course_name,
      assignStudentsDto,
    );
  }

}
