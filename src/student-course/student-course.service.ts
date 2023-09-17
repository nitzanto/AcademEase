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
  ) {
  }

  async assignStudentsToCourse(course_name: string, dto: AssignStudentsToCourseDto) {
    // Fetch the course and students from the database
    const { course , students } = await this.getStudentsAndCourse(course_name, dto);

    if (!course || students.length === 0) {
      // Handle not found errors or empty studentIds array
      return null;
    }

    for (let student of students) {
      student.courses.push(course);
      await this.studentRepository.save(student);
    }

    // Assign students to the course
    course.students = students;
    // Save the changes
    await this.courseRepository.save(course);
    return course;
  }

  async unAssignStudentsFromCourse(course_name: string, dto: AssignStudentsToCourseDto): Promise<void> {
    // handle if student doesnt exist within that course
    const { course , students } = await this.getStudentsAndCourse(course_name, dto);

    for (let student of students) {
      if (student.courses) {
        // Filter out the course to be unassigned from the student's courses
        student.courses = student.courses.filter(c => c.course_id !== course.course_id);
        // Save the changes to update the student's courses
        await this.studentRepository.save(student);
      }

      if (course.students) {
        // Filter out the student from the course's students
        course.students = course.students.filter(s => s.student_id !== student.student_id);
        // Save the changes to update the course's students
        await this.courseRepository.save(course);
      }
    }
  }

  async getStudentsAndCourse(course_name: string, dto: AssignStudentsToCourseDto): Promise<{ course: Course; students: Student[] }> {

    const { studentIds } = dto;
    const course = await this.courseRepository.findOneBy({ course_name });

    const students = await this.studentRepository.find({
      where: {
        student_id: In(studentIds),
      },
      relations: ['courses'], // Load the students' courses
    });

    return { course, students };
  }

}
