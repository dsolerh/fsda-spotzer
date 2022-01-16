import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint()
export class CantBeInstanceOf implements ValidatorConstraintInterface {
  validate(value: any, validationArguments?: ValidationArguments): boolean {
    return value && !(value instanceof validationArguments.constraints[0]);
  }
  defaultMessage?(validationArguments?: ValidationArguments): string {
    return `Property ($value) can't be instance of ${validationArguments.constraints[0].name}`;
  }
}
