import { IsNotEmpty, IsNumber, IsString, Max, Min, MinLength } from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  course_name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(2000)
  @Max(2023)
  year: number;
}
