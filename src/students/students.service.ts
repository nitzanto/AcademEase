import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { EntityManager, Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentsRepository: Repository<Student>,
    private readonly entityManager: EntityManager) {
  }

  async create(createStudentDto: CreateStudentDto) {
    const student = new Student(createStudentDto);
    await this.entityManager.save(student);
  }

  async findAll() {
    return await this.studentsRepository.find({});
  }

  findOne(student_id: number) {
    return this.studentsRepository.findOneBy({student_id});
  }

  async update(student_id: number, updateStudentDto: UpdateStudentDto) {
    await this.studentsRepository.update(student_id, updateStudentDto);
  }

  async remove(student_id: number) {
    return this.studentsRepository.delete(student_id);
  }
}
