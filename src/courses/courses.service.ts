import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {

  constructor(
    @InjectRepository(Course)
    private readonly coursesRepository: Repository<Course>,
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
    const course = this.coursesRepository.findOneBy({ course_name });

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
    await this.coursesRepository.remove(course);
  }
}
