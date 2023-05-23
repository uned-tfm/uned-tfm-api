import { mock } from 'jest-mock-extended';
import { UseCase } from '../../../../contexts/shared/application/use-case';
import { DeliveryMethodRepository } from '../../../../contexts/delivery-methods/domain/contracts/delivery-method.repository';
import { DeliveryMethod } from '../../../../contexts/delivery-methods/domain/models/delivery-method.entity';
import { DeliveryMethodBuilder } from '../__mocks__/delivery-method.builder';
import { findByFileTypeBuilder } from '../../../../contexts/delivery-methods/application/find-by-file-type.usecase';

describe('Find all delivery method by file type data usecase', () => {
  const mockDeliveryMethodRepository = mock<DeliveryMethodRepository>();

  let findByFileType: UseCase<void, DeliveryMethod[]>;
  let validDeliveryMethods: DeliveryMethod[];

  beforeAll(() => {
    validDeliveryMethods = [DeliveryMethodBuilder().build()];

    findByFileType = findByFileTypeBuilder({
      deliveryMethodRepository: mockDeliveryMethodRepository
    });
  });

  it('It should return delivery method data grouped by file type', async () => {
    mockDeliveryMethodRepository.findByFileType.mockResolvedValue(validDeliveryMethods);

    const result = await findByFileType();

    expect(mockDeliveryMethodRepository.findByFileType).toBeCalled();
    expect(result).not.toBeNull();
    expect(result).toHaveLength(1);
  });
});
