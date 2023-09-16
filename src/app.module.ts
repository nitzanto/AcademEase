import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { StudentsModule } from './students/students.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, StudentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {
}
