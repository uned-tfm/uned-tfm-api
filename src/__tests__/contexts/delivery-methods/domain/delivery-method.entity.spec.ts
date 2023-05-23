import { Primitives } from '../../../../contexts/shared/domain/value-objects/entity';
import { FieldValidationError } from '../../../../contexts/shared/domain/errors';
import {
  DeliveryMethod,
  DeliveryMethodProperties
} from '../../../../contexts/delivery-methods/domain/models/delivery-method.entity';
import { DeliveryMethodBuilder } from '../__mocks__/delivery-method.builder';

describe('Delivery method entity', () => {
  let validDeliveryMethod: DeliveryMethod;

  beforeAll(() => {
    validDeliveryMethod = DeliveryMethodBuilder().build();
  });

  describe('Input validation', () => {
    it('should throw when is invalid', () => {
      expect(() =>
        DeliveryMethod.create({
          malwareType: 'Arkei',
          fileType: 'dll',
          country: 'ES',
          count: 2021
        } as unknown as Primitives<DeliveryMethodProperties>)
      ).toThrow(FieldValidationError);
    });

    it('should create deliveryMethod when is valid', () => {
      const deliveryMethod = DeliveryMethod.create(validDeliveryMethod.value);
      expect(deliveryMethod).not.toBeNull();
      expect(deliveryMethod).toMatchObject(validDeliveryMethod);
    });
  });
});
