import { FieldValidationError } from '../../../../../contexts/shared/domain/errors';
import { EnumValueObject } from '../../../../../contexts/shared/domain/value-objects/enum-value-object';

describe('Enum Value Object', () => {
  enum TEST_ENUM {
    TEST = 'test'
  }
  describe('Input validation', () => {
    it('should throw FieldValidationError when value is nil', () => {
      const nilValues: unknown[] = [null, undefined];

      for (const nilValue of nilValues) {
        expect(() => EnumValueObject.initiate('test', nilValue as string, TEST_ENUM)).toThrow(
          FieldValidationError
        );
      }
    });

    it('should throw FieldValidationError when value is not a string', () => {
      const invalidValues: unknown[] = [1, {}, []];
      for (const invalidValue of invalidValues) {
        expect(() => EnumValueObject.initiate('test', invalidValue as string, TEST_ENUM)).toThrow(
          FieldValidationError
        );
      }
    });

    it('should throw FieldValidationError when value is not contained in the provided enum', () => {
      const invalidValues: unknown[] = ['OTHER_TYPE'];
      for (const invalidValue of invalidValues) {
        expect(() => EnumValueObject.initiate('test', invalidValue as string, TEST_ENUM)).toThrow(
          FieldValidationError
        );
      }
    });

    it('should create EnumValueObject when value is valid', () => {
      expect(EnumValueObject.initiate('test', 'test', TEST_ENUM)).toBeInstanceOf(EnumValueObject);
    });
  });
});
