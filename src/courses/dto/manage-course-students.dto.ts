import { IsInt } from 'class-validator';

export class ManageCourseStudentsDto {
  @IsInt({ each: true })
  studentIds: number[];
}
