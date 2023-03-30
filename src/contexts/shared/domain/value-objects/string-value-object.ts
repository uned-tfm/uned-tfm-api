import { isEmpty, isNil, isString } from '../../utils/type-checkers';
import { FieldValidationError } from '../errors';
import { ValueObject } from './value-object';

export class StringValueObject extends ValueObject<{ value: string }> {
  get value(): string {
    return this.props.value;
  }

  protected constructor(value: string) {
    super({ value });
  }

  static create(property: string, value: string): StringValueObject {
    if (isNil(value)) {
      throw new FieldValidationError(`Property ${property} must be provided`);
    }

    if (!isString(value)) {
      throw new FieldValidationError(`Property ${property} must be a string`);
    }

    if (isEmpty(value)) {
      throw new FieldValidationError(`Property ${property} must be a non-empty string`);
    }

    return new StringValueObject(value);
  }

  static createOptional(property: string, value?: string): StringValueObject | undefined {
    if (isNil(value) || isEmpty(value)) {
      return undefined;
    }

    if (!isString(value)) {
      throw new FieldValidationError(`Property ${property} must be a string`);
    }

    return new StringValueObject(value);
  }
}
