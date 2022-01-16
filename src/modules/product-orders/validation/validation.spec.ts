import { ValidationError } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { DeepPartial } from 'typeorm';
import { combine } from '../../../utils/helpers/combine';
import { CreateOrderDto } from '../dto/create-order.dto';

describe('Validation of the data', () => {
  const examples = {};
  examples['valid'] = JSON.parse(
    readFileSync(resolve('', 'assets', 'valid-orders.json')).toString(),
  );
  examples['invalid'] = JSON.parse(
    readFileSync(resolve('', 'assets', 'invalid-orders.json')).toString(),
  );

  describe('Multitple validations test [OK]', () => {
    it.each(examples['valid'])('%# ok', async (data) => {
      const dto = plainToClass(CreateOrderDto, data);
      const error = await validate(dto);
      expect(error.length).toEqual(0);
    });
  });

  describe('Multitple validations test [expected to fail]', () => {
    it.each(examples['invalid'])('%# %o', async (_, data, errors) => {
      const dto = plainToClass(CreateOrderDto, data);
      const validationErrors = await validate(dto);
      expect(validationErrors.length).toEqual(errors.length);
      checkValidationRecursively(validationErrors, errors);
    });
  });
});

type ExpectedValidationErrors = DeepPartial<ValidationError>;

function checkValidationRecursively(
  validationErrors: ValidationError[],
  expectedErrors: ExpectedValidationErrors[],
) {
  for (const r of combine<ValidationError, ExpectedValidationErrors>(
    validationErrors,
    expectedErrors,
  )) {
    const result = r.arr1;
    const expected = r.arr2;
    expect(result.property).toEqual(expected.property);
    if (result.children && expected.children) {
      checkValidationRecursively(result.children, expected.children);
    }
  }
}
