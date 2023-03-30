import { FieldValidationError } from '../../../../../contexts/shared/domain/errors';
import { BooleanValueObject } from '../../../../../contexts/shared/domain/value-objects/boolean-value-object';

describe('Boolean Value Object', () => {
  describe('Input validation', () => {
    it('should throw FieldValidationError when value is nil', () => {
      const nilValues: unknown[] = [null, undefined];

      for (const nilValue of nilValues) {
        expect(() => BooleanValueObject.create('test', nilValue as boolean)).toThrow(
          FieldValidationError
        );
      }
    });

    it('should throw FieldValidationError when value is not a boolean', () => {
      const invalidValues: unknown[] = [1, 'a', {}, []];
      for (const invalidValue of invalidValues) {
        expect(() => BooleanValueObject.create('test', invalidValue as boolean)).toThrow(
          FieldValidationError
        );
      }
    });

    it('should create BooleanValueObject when value is valid', () => {
      expect(BooleanValueObject.create('test', true)).toBeInstanceOf(BooleanValueObject);
    });
  });

  describe('value()', () => {
    it('should return the raw value', () => {
      const rawValue = true;
      const vo = BooleanValueObject.create('test', rawValue);
      expect(vo.value).toEqual(rawValue);
    });
  });

  describe('createOpcional()', () => {
    describe('when raw value is undefined', () => {
      it('should return undefined', () => {
        expect(BooleanValueObject.createOptional('test', undefined)).toBeUndefined();
      });
    });

    describe('when raw value is not undefined', () => {
      it('should throw FieldValidationError when value is not a boolean', () => {
        const invalidValues: unknown[] = [1, 'a', {}, []];
        for (const invalidValue of invalidValues) {
          expect(() => BooleanValueObject.createOptional('test', invalidValue as boolean)).toThrow(
            FieldValidationError
          );
        }
      });

      it('should return BooleanValueObject', () => {
        expect(BooleanValueObject.createOptional('test', true)).toBeInstanceOf(BooleanValueObject);
      });
    });
  });
});
