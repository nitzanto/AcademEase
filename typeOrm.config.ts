
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'nitzan123',
    database: 'task',
    entities: ['src/**/*.entity{.ts,.js}'],
    synchronize: false,
    migrationsTableName: 'migration',
    migrations: ['src/migrations/*.ts'],
};
