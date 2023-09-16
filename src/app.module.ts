import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { StudentsModule } from './students/students.module';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, StudentsModule, CoursesModule],
  controllers: [],
  providers: [],
})
export class AppModule {
}
