import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusType, Task } from './entities/task.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import {
  PaginateConfig,
  PaginateQuery,
  Paginated,
  paginate,
} from 'nestjs-paginate';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
  ) {}

  async validateStatus(status: string): Promise<boolean> {
    const allowedStatuses: StatusType[] = ['todo', 'completed'];
    return allowedStatuses.includes(status as StatusType);
  }

  async checkTaskInTodo(name: string): Promise<boolean> {
    const dataExist = await this.tasksRepository
      .createQueryBuilder('tasks')
      .where('tasks.name = :name and tasks.status = :status', {
        name,
        status: 'todo',
      })
      .getExists();
    return dataExist;
  }

  async create(createTaskData: CreateTaskDto): Promise<boolean> {
    const validationStatus = await this.validateStatus(createTaskData.status);
    if (!validationStatus) {
      throw new BadRequestException('Invalid status provided');
    }
    const taskInTodo = await this.checkTaskInTodo(
      createTaskData.name.toLowerCase(),
    );
    if (taskInTodo) {
      throw new BadRequestException('Task is already in todo');
    }
    const status = await this.tasksRepository.save(createTaskData);
    return !!status;
  }

  async findAll(query: PaginateQuery): Promise<Paginated<Task>> {
    const config: PaginateConfig<Task> = {
      sortableColumns: ['name', 'createdAt'],
      defaultSortBy: [['createdAt', 'ASC']],
      select: ['id', 'name', 'status'],
      defaultLimit: 10,
    };
    return paginate(query, this.tasksRepository, config);
  }

  async taskDetail(val: FindOptionsWhere<Task>): Promise<Task> {
    return this.tasksRepository.findOneBy(val);
  }

  async update(id: string, updateTaskData: UpdateTaskDto): Promise<boolean> {
    const res = await this.taskDetail({ id });
    if (!res) {
      throw new NotFoundException('Task not found');
    }

    if (updateTaskData?.status) {
      const validationStatus = await this.validateStatus(
        updateTaskData?.status,
      );
      if (!validationStatus) {
        delete updateTaskData?.status;
        throw new BadRequestException('Invalid status provided');
      }
    }

    const status = await this.tasksRepository.update(id, updateTaskData);
    return !!status;
  }

  async delete(id: string): Promise<boolean> {
    const res = await this.taskDetail({ id });
    if (!res) {
      throw new NotFoundException('Task not found');
    }
    const status = await this.tasksRepository.delete(id);
    return !!status;
  }
}
