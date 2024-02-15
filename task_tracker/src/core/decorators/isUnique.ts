import { ValidatorOptions, registerDecorator } from "class-validator";
import { IsUniqueConstraint } from "../validationRules/isUnique";


export type IsUniqueInterface = {
  tableName: string,
  column: string
}

export function IsUnique(options: IsUniqueInterface, validationOptions?: ValidatorOptions) {
  return function(object: any, propertyName: string){
    registerDecorator({
      name: 'isUnique',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [options],
      validator: IsUniqueConstraint
    })
  }
}