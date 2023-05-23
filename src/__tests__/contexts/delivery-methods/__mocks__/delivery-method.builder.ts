import { Primitives } from '../../../../contexts/shared/domain/value-objects/entity';
import {
  DeliveryMethod,
  DeliveryMethodProperties
} from '../../../../contexts/delivery-methods/domain/models/delivery-method.entity';
import {
  DeliveryMethodPostgresDTO,
  PostgresqlDeliveryMethodMapper
} from '../../../../contexts/delivery-methods/infrastructure/database/postgresql/postgresql-delivery-method.mapper';

interface DeliveryMethodBuilder {
  build(): DeliveryMethod;
  buildDto(): DeliveryMethodPostgresDTO;
}

export function DeliveryMethodBuilder(): DeliveryMethodBuilder {
  const deliveryMethodKpi: Primitives<DeliveryMethodProperties> = {
    malwareType: 'Arkei',
    fileType: 'dll',
    deliveryMethod: 'email_attachment',
    country: 'ES',
    count: 2021
  };

  return {
    build(): DeliveryMethod {
      return DeliveryMethod.create(deliveryMethodKpi);
    },
    buildDto(): DeliveryMethodPostgresDTO {
      const mapper = new PostgresqlDeliveryMethodMapper();
      return mapper.toDto(deliveryMethodKpi);
    }
  };
}
