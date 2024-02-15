import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';
import { Task } from './entities/task.entity';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  createTask(@Body() createTaskData: CreateTaskDto) {
    return this.taskService.create(createTaskData);
  }

  @Get()
  getAllTasks(@Paginate() query: PaginateQuery): Promise<Paginated<Task>> {
    return this.taskService.findAll(query);
  }

  @Put(':id')
  updateTask(@Param('id') id: string, @Body() updateTaskData: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskData);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    return this.taskService.delete(id);
  }
}
