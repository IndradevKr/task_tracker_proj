import { Injectable } from "@nestjs/common";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { IsUniqueInterface } from "../decorators/isUnique";
import { EntityManager } from "typeorm";

@ValidatorConstraint({name: 'IsUniqueConstraint', async: true})
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly entityManager: EntityManager) {}

  async validate(value: string, args?:ValidationArguments): Promise<boolean> {
    try {
      const {tableName, column}: IsUniqueInterface = args.constraints[0];

      const dataExist = await this.entityManager.getRepository(tableName)
      .createQueryBuilder(tableName)
      .where({[column]: value})
      .getExists()
      return !dataExist;
    }catch(err){
      console.error('Error validating uniqueness:', err);
      return false;
    }
  }

  defaultMessage(args?: ValidationArguments): string {
    const field: string = args.property;
    return `${field} already exists.`
  }
}