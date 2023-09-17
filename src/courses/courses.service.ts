import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, In, Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { Student } from '../students/entities/student.entity';
import { ManageCourseStudentsDto } from './dto/manage-course-students.dto';

@Injectable()
export class CoursesService {

  constructor(
    @InjectRepository(Course)
    private readonly coursesRepository: Repository<Course>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    private readonly entityManager: EntityManager) {
  }

  async createCourse(createCourseDto: CreateCourseDto): Promise<void> {
    const course = new Course(createCourseDto);
    await this.entityManager.save(course);
  }

  async findAllCourses(): Promise<Course[]> {
    return await this.coursesRepository.find({});
  }

  async findOneCourse(course_name: string): Promise<Course> {
    const course = await this.coursesRepository.findOneBy({ course_name });

    if (!course) {
      throw new NotFoundException(`Couldn't find the course: ${course_name}`);
    }
    return course;
  }

  async updateCourse(course_name: string, updateCourseDto: UpdateCourseDto): Promise<void> {
    const existingCourse = await this.findOneCourse(course_name);
    Object.assign(existingCourse, updateCourseDto);
    await this.coursesRepository.save(existingCourse);
  }

  async removeCourse(course_name: string): Promise<void> {
    const course = await this.findOneCourse(course_name);
    await this.coursesRepository.remove(course)
  }


  async assignStudentsToCourse(course_name: string, dto: ManageCourseStudentsDto): Promise<void> {
    const { course, students } = await this.getStudentsAndCourse(course_name, dto);

    if (!course || students.length === 0) {
      return null;
    }

    for (let student of students) {
      student.courses.push(course);
      await this.studentRepository.save(student);
    }
  }

  async unAssignStudentsFromCourse(course_name: string, dto: ManageCourseStudentsDto): Promise<void> {
    const { course, students } = await this.getStudentsAndCourse(course_name, dto);

    for (let student of students) {
      if (student.courses) {
        student.courses = student.courses.filter(c => c.course_id !== course.course_id);
        await this.studentRepository.save(student);
      }

      if (course.students) {
        course.students = course.students.filter(s => s.student_id !== student.student_id);
        await this.coursesRepository.save(course);
      }
    }
  }

  async getStudentsAndCourse(course_name: string, dto: ManageCourseStudentsDto): Promise<{
    course: Course;
    students: Student[]
  }> {

    const { studentIds } = dto;
    const course = await this.coursesRepository.findOneBy({ course_name });

    const students = await this.studentRepository.find({
      where: {
        student_id: In(studentIds),
      },
      relations: ['courses'],
    });

    return { course, students };
  }
}
