import { UseCase } from '../../shared/application/use-case';
import { DeliveryMethodRepository } from '../domain/contracts/delivery-method.repository';
import { DeliveryMethod } from '../domain/models/delivery-method.entity';

export function findByFileTypeBuilder({
  deliveryMethodRepository
}: {
  deliveryMethodRepository: DeliveryMethodRepository;
}): UseCase<void, DeliveryMethod[]> {
  return async function findByFileType(): Promise<DeliveryMethod[]> {
    return deliveryMethodRepository.findByFileType();
  };
}
