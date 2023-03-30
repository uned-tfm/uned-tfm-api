import { FieldValidationError } from '../../../../../contexts/shared/domain/errors';
import { NumberValueObject } from '../../../../../contexts/shared/domain/value-objects/number-value-object';

describe('Number Value Object', () => {
  describe('Input validation', () => {
    it('should throw FieldValidationError when value is nil', () => {
      const nilValues: unknown[] = [null, undefined];

      for (const nilValue of nilValues) {
        expect(() => NumberValueObject.create('test', nilValue as number)).toThrow(
          FieldValidationError
        );
      }
    });

    it('should throw FieldValidationError when value is not a number', () => {
      const invalidValues: unknown[] = [true, '', 'a', {}, []];
      for (const invalidValue of invalidValues) {
        expect(() => NumberValueObject.create('test', invalidValue as number)).toThrow(
          FieldValidationError
        );
      }
    });
    it('should throw FieldValidationError when value is less than 1', () => {
      expect(() => NumberValueObject.create('test', 0, { minValue: 1 })).toThrow(
        FieldValidationError
      );
    });

    it('should throw FieldValidationError when value is greater than 1', () => {
      expect(() => NumberValueObject.create('test', 2, { maxValue: 1 })).toThrow(
        FieldValidationError
      );
    });

    it('should throw FieldValidationError when value is less than 1', () => {
      expect(() => NumberValueObject.create('test', 0, { minValue: 1 })).toThrow(
        FieldValidationError
      );
    });

    it('should throw FieldValidationError when value is greater than 1', () => {
      expect(() => NumberValueObject.create('test', 2, { maxValue: 1 })).toThrow(
        FieldValidationError
      );
    });

    it('should create NumberValueObject when value is valid', () => {
      expect(NumberValueObject.create('test', 1)).toBeInstanceOf(NumberValueObject);
    });
  });

  describe('value()', () => {
    it('should return the raw value', () => {
      const rawValue = 10;
      const vo = NumberValueObject.create('test', rawValue);
      expect(vo.value).toEqual(rawValue);
    });
  });

  describe('createOpcional()', () => {
    describe('when raw value is undefined', () => {
      it('should return undefined', () => {
        expect(NumberValueObject.createOptional('test', undefined)).toBeUndefined();
      });
    });

    describe('when raw value is not undefined', () => {
      it('should throw FieldValidationError when value is not a number', () => {
        const invalidValues: unknown[] = [true, '', 'a', {}, []];
        for (const invalidValue of invalidValues) {
          expect(() => NumberValueObject.createOptional('test', invalidValue as number)).toThrow(
            FieldValidationError
          );
        }
      });
      it('should throw FieldValidationError when value is less than 1', () => {
        expect(() => NumberValueObject.createOptional('test', 0, { minValue: 1 })).toThrow(
          FieldValidationError
        );
      });

      it('should throw FieldValidationError when value is greater than 1', () => {
        expect(() => NumberValueObject.createOptional('test', 2, { maxValue: 1 })).toThrow(
          FieldValidationError
        );
      });

      it('should throw FieldValidationError when value is less than 1', () => {
        expect(() => NumberValueObject.createOptional('test', 0, { minValue: 1 })).toThrow(
          FieldValidationError
        );
      });

      it('should throw FieldValidationError when value is greater than 1', () => {
        expect(() => NumberValueObject.createOptional('test', 2, { maxValue: 1 })).toThrow(
          FieldValidationError
        );
      });

      it('should return NumberValueObject', () => {
        expect(NumberValueObject.createOptional('test', 2)).toBeInstanceOf(NumberValueObject);
      });
    });
  });
});
