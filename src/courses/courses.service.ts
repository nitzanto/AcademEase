import { Injectable } from '@nestjs/common';
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
  async create(createCourseDto: CreateCourseDto) {
    const course = new Course(createCourseDto);
    await this.entityManager.save(course);
  }

  async findAll() {
    return await this.coursesRepository.find({});
  }

  async findOne(course_name: string) {
    return this.coursesRepository.findOneBy({course_name});
  }

  async update(course_name: string, updateCourseDto: UpdateCourseDto) {
    await this.coursesRepository.update(course_name, updateCourseDto);
  }

  async remove(course_name: string) {
    await this.coursesRepository.delete(course_name);
  }
}
