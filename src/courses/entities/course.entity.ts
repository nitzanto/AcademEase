import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Student } from '../../students/entities/student.entity';

@Entity("Course")
export class Course {
  @PrimaryGeneratedColumn()
  course_id: number;

  @Column({ type: 'varchar', unique: true })
  course_name: string;

  @Column()
  year: number;

  @ManyToMany(() => Student, (student) => student.courses)
  @JoinTable({
    name: 'Student_Courses',
    joinColumn: {
      name: 'course_id',
      referencedColumnName: 'course_id',
    },
    inverseJoinColumn: {
      name: 'student_id',
      referencedColumnName: 'student_id',
    },
  })
  students: Student[];

  constructor(course: Partial<Course>) {
    Object.assign(this, course);
  }
}
