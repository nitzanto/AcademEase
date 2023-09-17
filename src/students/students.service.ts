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

  async create(createStudentDto: CreateStudentDto) {
    const student = new Student(createStudentDto);
    await this.entityManager.save(student);
  }

  async findAll() {
    return await this.studentsRepository.find({ relations: ['courses'] });
  }

  findOne(student_id: number) {
    return this.studentsRepository.findOne({
      where: { student_id },
      relations: ['courses'], // Load the student's courses
    });
  }

  async update(student_id: number, updateStudentDto: UpdateStudentDto) {
    await this.studentsRepository.update(student_id, updateStudentDto);
  }

  async remove(student_id: number) {
    // Find the student by ID
    const student = await this.findOne(student_id);

    student.courses = [];
    await this.studentsRepository.save(student);

    // Now, delete the student
    await this.studentsRepository.remove(student);
  }

  async getStudentCoursesByYear(student_id: number, year: number): Promise<Student> {
    const student = await this.studentsRepository.findOne({
      where: { student_id },
      relations: ['courses'], // Load the student's courses
    });

    console.log('Thats the student with courses: ', student);

    if (!student) {
      throw new NotFoundException(`Student with ID ${student_id} not found`);
    }

    // Filter courses by the specified year
    student.courses = student.courses.filter(course => course.year === year);

    return student;
  }


  async getStudentsCoursesByYear(year: number) {
    const students = await this.studentsRepository.find({
      where: {},
      relations: ['courses'],
    });


    // Filter courses for each student by the specified year
    students.forEach(student => {
      student.courses = student.courses.filter(course => course.year === year);
    });


    return students;
  }

}
