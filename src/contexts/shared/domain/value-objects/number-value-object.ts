import { hasValue, isNil, isNumber } from '../../utils/type-checkers';
import { FieldValidationError } from '../errors';
import { ValueObject } from './value-object';

type NumberValueOptions = { minValue?: number; maxValue?: number };

export class NumberValueObject extends ValueObject<{ value: number }> {
  get value(): number {
    return this.props.value;
  }

  protected constructor(value: number) {
    super({ value });
  }

  static validate(value: number, options?: NumberValueOptions, property?: string): void {
    if (!isNumber(value)) {
      throw new FieldValidationError(`Property ${property} must be a number`);
    }

    if (isNil(options)) {
      return;
    }

    if (hasValue(options.minValue) && value < options.minValue) {
      throw new FieldValidationError(
        `Property ${property} must be greater than ${options.minValue}`
      );
    }

    if (hasValue(options.maxValue) && value > options.maxValue) {
      throw new FieldValidationError(`Property ${property} must be less than ${options.maxValue}`);
    }
  }

  static create(property: string, value: number, options?: NumberValueOptions): NumberValueObject {
    if (isNil(value)) {
      throw new FieldValidationError(`Property ${property} must be provided`);
    }

    NumberValueObject.validate(value, options, property);

    return new NumberValueObject(value);
  }

  static createOptional(
    property: string,
    value?: number,
    options?: NumberValueOptions
  ): NumberValueObject | undefined {
    if (isNil(value)) {
      return undefined;
    }

    NumberValueObject.validate(value, options, property);

    return new NumberValueObject(value);
  }
}
