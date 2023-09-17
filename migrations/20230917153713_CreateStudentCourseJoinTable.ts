import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateStudentCourseJoinTable20230917153713 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE student_course (
                student_id INT NOT NULL,
                course_id INT NOT NULL,
                PRIMARY KEY (student_id, course_id),
                FOREIGN KEY (student_id) REFERENCES Student(student_id) ON DELETE CASCADE,
                FOREIGN KEY (course_id) REFERENCES Course(course_id) ON DELETE CASCADE
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE student_course;
        `);
    }
}
