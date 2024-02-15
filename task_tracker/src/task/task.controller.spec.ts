import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { StatusType } from './entities/task.entity';

describe('TaskController', () => {
  let controller: TaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: TaskService,
          useValue: {
            create: jest.fn().mockReturnValue(true),
            update: jest.fn().mockReturnValue(true),
            delete: jest.fn().mockReturnValue(true),
            taskDetail: jest.fn().mockReturnValue({
              id: 'valid-id',
              name: 'write blog',
              status: 'inProgress',
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<TaskController>(TaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create task should be defined', () => {
    expect(controller.createTask).toBeDefined();
  });

  it('task creation', () => {
    const mockdata = {
      name: 'read book',
      status: 'todo' as StatusType,
    };
    expect(controller.createTask(mockdata)).toBe(true);
  });

  it('task creation', () => {
    const mockdata = {
      name: 'read book',
      status: 'todo' as StatusType,
    };
    expect(controller.createTask(mockdata)).toBe(true);
  });

  it('update task should be defined', () => {
    expect(controller.updateTask).toBeDefined();
  });

  it('task should be updated', () => {
    const id = '12345';
    const mockdata = {
      status: 'inProgress' as StatusType,
    };
    expect(controller.updateTask(id, mockdata)).toBe(true);
  });

  it('delete task should be defined', () => {
    expect(controller.deleteTask).toBeDefined();
  });

  it('task should be deleted', () => {
    const id = '12345';
    expect(controller.deleteTask(id)).toBe(true);
  });
});
