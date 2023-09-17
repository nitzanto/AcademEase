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
    private readonly entityManager: EntityManager,
  ) {
  }

  async create(createStudentDto: CreateStudentDto): Promise<void> {
    const student = new Student(createStudentDto);
    await this.entityManager.save(student);
  }


  async findAll(): Promise<Student[]> {
    const students = await this.studentsRepository.find({ relations: ['courses'] });
    if (!students) {
      throw new NotFoundException('Couldnt find students');
    }
    return students;
  }

  async findOne(student_id: number): Promise<Student> {
    const student = await this.studentsRepository.findOne({
      where: { student_id },
      relations: ['courses'],
    });

    if (!student) {
      throw new NotFoundException(`Couldnt find student with ID: ${student_id}`);
    }

    return student;
  }

  async update(student_id: number, updateStudentDto: UpdateStudentDto): Promise<void> {
    await this.studentsRepository.update(student_id, updateStudentDto);
  }

  async remove(student_id: number): Promise<void> {
    const student = await this.findOne(student_id);

    student.courses = [];
    await this.studentsRepository.save(student);

    await this.studentsRepository.remove(student);
  }

  async getStudentCoursesByYear(student_id: number, year: number): Promise<Student> {
    const student = await this.findOne(student_id);

    student.courses = student.courses.filter(course => course.year === year);

    return student;
  }


  async getStudentsCoursesByYear(year: number): Promise<Student[]> {
    const students = await this.findAll();

    // Filter courses for each student by the specified year
    students.forEach(student => {
      student.courses = student.courses.filter(course => course.year === year);
    });


    return students;
  }

}
