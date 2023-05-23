import { mock } from 'jest-mock-extended';
import { UseCase } from '../../../../contexts/shared/application/use-case';
import { DeliveryMethodRepository } from '../../../../contexts/delivery-methods/domain/contracts/delivery-method.repository';
import { DeliveryMethod } from '../../../../contexts/delivery-methods/domain/models/delivery-method.entity';
import { DeliveryMethodBuilder } from '../__mocks__/delivery-method.builder';
import { findByCountryBuilder } from '../../../../contexts/delivery-methods/application/find-by-country.usecase';

describe('Find all delivery method data usecase', () => {
  const mockDeliveryMethodRepository = mock<DeliveryMethodRepository>();

  let findByCountry: UseCase<void, DeliveryMethod[]>;
  let validDeliveryMethods: DeliveryMethod[];

  beforeAll(() => {
    validDeliveryMethods = [DeliveryMethodBuilder().build()];

    findByCountry = findByCountryBuilder({
      deliveryMethodRepository: mockDeliveryMethodRepository
    });
  });

  it('It should return delivery method data grouped by country', async () => {
    mockDeliveryMethodRepository.findByCountry.mockResolvedValue(validDeliveryMethods);

    const result = await findByCountry();

    expect(mockDeliveryMethodRepository.findByCountry).toBeCalled();
    expect(result).not.toBeNull();
    expect(result).toHaveLength(1);
  });
});
