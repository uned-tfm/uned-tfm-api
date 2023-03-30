import { FieldValidationError } from '../../../../../contexts/shared/domain/errors';
import { StringValueObject } from '../../../../../contexts/shared/domain/value-objects/string-value-object';

describe('String Value Object', () => {
  describe('Input validation', () => {
    it('should throw FieldValidationError when value is nil', () => {
      const nilValues: unknown[] = [null, undefined];

      for (const nilValue of nilValues) {
        expect(() => StringValueObject.create('test', nilValue as string)).toThrow(
          FieldValidationError
        );
      }
    });

    it('should throw FieldValidationError when value is not a string', () => {
      const invalidValues: unknown[] = [1, true];
      for (const invalidValue of invalidValues) {
        expect(() => StringValueObject.create('test', invalidValue as string)).toThrow(
          FieldValidationError
        );
      }
    });

    it('should throw FieldValidationError when value is empty', () => {
      expect(() => StringValueObject.create('test', '')).toThrow(FieldValidationError);
    });

    it('should create StringValueObject when value is valid', () => {
      expect(StringValueObject.create('test', 'valid_value')).toBeInstanceOf(StringValueObject);
    });
  });

  describe('value()', () => {
    it('should return the raw value', () => {
      const rawValue = 'valid_value';
      const vo = StringValueObject.create('test', rawValue);
      expect(vo.value).toEqual(rawValue);
    });
  });

  describe('createOpcional()', () => {
    describe('when raw value is undefined', () => {
      it('should return undefined', () => {
        expect(StringValueObject.createOptional('test', undefined)).toBeUndefined();
      });
    });

    describe('when raw value is not undefined', () => {
      it('should throw FieldValidationError when value is not a string', () => {
        const invalidValues: unknown[] = [1, true];
        for (const invalidValue of invalidValues) {
          expect(() => StringValueObject.createOptional('test', invalidValue as string)).toThrow(
            FieldValidationError
          );
        }
      });

      it('should return StringValueObject', () => {
        expect(StringValueObject.createOptional('test', 'valid_value')).toBeInstanceOf(
          StringValueObject
        );
      });
    });
  });
});
