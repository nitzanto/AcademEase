import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Course } from '../../courses/entities/course.entity';

@Entity("Student")
export class Student {
  @PrimaryGeneratedColumn()
  student_id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  address: string;

  @ManyToMany(() => Course, (course) => course.students)
  @JoinTable({
    name: 'Student_Courses',
    joinColumn: {
      name: 'student_id',
      referencedColumnName: 'student_id',
    },
    inverseJoinColumn: {
      name: 'course_id',
      referencedColumnName: 'course_id',
    },
  })
  courses: Course[];


  constructor(student: Partial<Student>) {
    Object.assign(this, student);
  }
}
