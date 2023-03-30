import { isBoolean, isNil } from '../../utils/type-checkers';
import { FieldValidationError } from '../errors';
import { ValueObject } from './value-object';

export class BooleanValueObject extends ValueObject<{ value: boolean }> {
  get value(): boolean {
    return this.props.value;
  }

  protected constructor(value: boolean) {
    super({ value });
  }

  static create(property: string, value: boolean): BooleanValueObject {
    if (isNil(value)) {
      throw new FieldValidationError(`Property ${property} must be provided`);
    }

    if (!isBoolean(value)) {
      throw new FieldValidationError(`Property ${property} must be a boolean`);
    }

    return new BooleanValueObject(value);
  }

  static createOptional(property: string, value?: boolean): BooleanValueObject | undefined {
    if (isNil(value)) {
      return undefined;
    }

    if (!isBoolean(value)) {
      throw new FieldValidationError(`Property ${property} must be a boolean`);
    }

    return new BooleanValueObject(value);
  }
}
