import { PostgresMapper } from '../../../../shared/infrastructure/postgresql/postgresql-mapper';
import { Primitives } from '../../../../shared/domain/value-objects/entity';
import {
  DeliveryMethod,
  DeliveryMethodProperties
} from '../../../domain/models/delivery-method.entity';

export type DeliveryMethodPostgresDTO = {
  malware_type?: string;
  delivery_method: string;
  file_type?: string;
  country?: string;
  count: string;
};

export class PostgresqlDeliveryMethodMapper extends PostgresMapper<
  Primitives<DeliveryMethodProperties>,
  DeliveryMethodPostgresDTO
> {
  private static DICTIONARY: Record<
    keyof Primitives<DeliveryMethodProperties>,
    keyof DeliveryMethodPostgresDTO
  > = {
    malwareType: 'malware_type',
    fileType: 'file_type',
    deliveryMethod: 'delivery_method',
    country: 'country',
    count: 'count'
  };

  constructor() {
    super(PostgresqlDeliveryMethodMapper.DICTIONARY);
  }

  toDto(entity: Primitives<DeliveryMethodProperties>): DeliveryMethodPostgresDTO {
    return super.toDto(entity);
  }

  fromDTO(dto: DeliveryMethodPostgresDTO): DeliveryMethod {
    return DeliveryMethod.create({
      ...super.fromDto(dto),
      count: parseInt(dto.count)
    });
  }
}
