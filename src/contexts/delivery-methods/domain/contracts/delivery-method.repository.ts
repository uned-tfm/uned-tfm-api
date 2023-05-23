import { DeliveryMethod } from '../models/delivery-method.entity';

export interface DeliveryMethodRepository {
  findByCountry(): Promise<DeliveryMethod[]>;
  findByMalwareType(): Promise<DeliveryMethod[]>;
  findByFileType(): Promise<DeliveryMethod[]>;
}
