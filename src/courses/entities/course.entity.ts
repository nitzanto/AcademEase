import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Student } from '../../students/entities/student.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  course_id: number;

  @Column({ type: 'varchar', unique: true })
  course_name: string;

  @Column()
  year: number;

  @ManyToMany(() => Student, student => student.courses)
  @JoinTable()
  students: Student[];

  constructor(course: Partial<Course>) {
    Object.assign(this, course);
  }
}
