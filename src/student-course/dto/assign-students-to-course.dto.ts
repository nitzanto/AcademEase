import { IsInt } from 'class-validator';

export class AssignStudentsToCourseDto {
  @IsInt({ each: true })
  studentIds: number[];
}
