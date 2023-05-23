import { FieldValidationError } from '../errors';
import { StringValueObject } from './string-value-object';
import { hasValue, isEmpty, isNil, isString } from '../../utils/type-checkers';

type GenericEnum = { [s: number]: string };

export class EnumValueObject extends StringValueObject {
  static initiate<Enum extends GenericEnum>(
    property: string,
    value: string,
    enumList: Enum
  ): EnumValueObject {
    if (isNil(value)) {
      throw new FieldValidationError(`Property ${property} must be provided`);
    }

    if (!isString(value)) {
      throw new FieldValidationError(`Property ${property} must be a string`);
    }

    if (isEmpty(value)) {
      throw new FieldValidationError(`Property ${property} must be a non-empty string`);
    }

    const isValidType = Object.values<string>(enumList).includes(value);
    if (hasValue(value) && !isValidType) {
      throw new FieldValidationError(
        `Value of StringValueObject must be one of ${Object.values(enumList)}`
      );
    }

    return new EnumValueObject(value);
  }
}
