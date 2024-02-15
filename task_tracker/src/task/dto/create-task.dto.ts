import { IsNotEmpty, IsString } from "class-validator";
import { IsUnique } from "../../core/decorators/isUnique";
import { StatusType } from "../entities/task.entity";

export class CreateTaskDto {

    @IsNotEmpty({message: 'Task name is required.'})
    @IsString()
    @IsUnique({tableName: 'tasks', column: 'name'})
    name: string;

    @IsNotEmpty()
    @IsString()
    status: StatusType;
}
