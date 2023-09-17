import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager, In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from '../students/entities/student.entity';
import { Course } from '../courses/entities/course.entity';
import { AssignStudentsToCourseDto } from './dto/assign-students-to-course.dto';

@Injectable()
export class StudentCourseService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    private readonly entityManager: EntityManager,
  ) {
  }

  async assignStudentsToCourse(course_name: string, dto: AssignStudentsToCourseDto) {
    // Fetch the course and students from the database
    const { studentIds } = dto;
    const course = await this.courseRepository.findOneBy({ course_name });
    console.log('Course is...:', course);

    const students = await this.studentRepository.find({
      where: {
        student_id: In(studentIds),
      },
    });
    console.log('Students are....:', students);
    if (!course || students.length === 0) {
      // Handle not found errors or empty studentIds array
      return null;
    }

    for (let student of students) {
      if (!student.courses) {
        student.courses = [];
      }

      student.courses.push(course);
      await this.studentRepository.save(student);
    }

    // Assign students to the course
    course.students = students;
    console.log('managed to assign to the course!!!');
    // Save the changes
    await this.entityManager.save(course);
    return course;
  }

  async unAssignStudentsFromCourse(course_name: string, dto: AssignStudentsToCourseDto) {
    const { studentIds } = dto;
    const course = await this.courseRepository.findOneBy({ course_name });

    const students = await this.studentRepository.find({
      where: {
        student_id: In(studentIds),
      },
    });

    for (const student of students) {
      student.courses = student.courses.filter(c => c.course_id !== course.course_id);
      await this.studentRepository.save(student);
    }
  }

}
