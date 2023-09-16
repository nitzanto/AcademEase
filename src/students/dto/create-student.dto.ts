import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  firstname: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  lastname: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  address: string;
}
