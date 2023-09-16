import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  course_id: number;

  @Column({ unique: true })
  course_name: string;

  @Column()
  year: number;

  constructor(course: Partial<Course>) {
    Object.assign(this, course);
  }
}
