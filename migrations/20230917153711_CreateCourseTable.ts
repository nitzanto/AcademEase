import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCourseTable20230917153711 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE Course (
                course_id INT AUTO_INCREMENT PRIMARY KEY,
                course_name VARCHAR(255) UNIQUE NOT NULL,
                year INT NOT NULL
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE Course;
        `);
    }
}
