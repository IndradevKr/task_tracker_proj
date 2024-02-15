import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task/entities/task.entity';
import { IsUniqueConstraint } from './core/validationRules/isUnique';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db/sql',
      synchronize: true,
      entities: [Task],
    }),
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService, IsUniqueConstraint],
})
export class AppModule {}
