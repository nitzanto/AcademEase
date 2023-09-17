import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Course } from '../../courses/entities/course.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  student_id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  address: string;

  @ManyToMany(() => Course, { cascade: true, onDelete: 'CASCADE'  })
  @JoinTable()
  courses: Course[];

  constructor(student: Partial<Student>) {
    Object.assign(this, student);
  }
}
