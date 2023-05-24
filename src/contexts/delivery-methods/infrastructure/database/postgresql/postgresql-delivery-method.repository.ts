import { DatabaseConnector } from '../../../../shared/domain/contracts/database-connector';
import { Pool } from 'pg';

import { isEmpty, isNil } from '../../../../shared/utils/type-checkers';
import { DeliveryMethodRepository } from '../../../domain/contracts/delivery-method.repository';
import {
  DeliveryMethodPostgresDTO,
  PostgresqlDeliveryMethodMapper
} from './postgresql-delivery-method.mapper';
import { DeliveryMethod } from '../../../domain/models/delivery-method.entity';

export function postgresqlDeliveryMethodRepositoryBuilder({
  databaseConnector
}: {
  databaseConnector: DatabaseConnector<Pool>;
}): DeliveryMethodRepository {
  const mapper = new PostgresqlDeliveryMethodMapper();

  async function find(sql: string, params: number[] = []): Promise<DeliveryMethod[]> {
    const pool = await databaseConnector.getConnection();
    const result = await pool.query<DeliveryMethodPostgresDTO>(sql, params);

    if (isNil(result.rows) || isEmpty(result.rows)) {
      return [];
    }

    return result.rows.map((deliveryMethod: DeliveryMethodPostgresDTO) =>
      mapper.fromDTO(deliveryMethod)
    );
  }

  return {
    async findByCountry(): Promise<DeliveryMethod[]> {
      return find(
        'select country, delivery_method, count(*) from malware.malware_data_filtered GROUP BY country, delivery_method ORDER BY country asc, count(*) desc'
      );
    },
    async findByMalwareType(): Promise<DeliveryMethod[]> {
      return find(
        'select malware_type, delivery_method, count(*) from malware.malware_data_filtered GROUP BY malware_type, delivery_method ORDER BY malware_type asc, count(*) desc'
      );
    },
    async findByFileType(): Promise<DeliveryMethod[]> {
      return find(
        'select file_type, delivery_method, count(*) from malware.malware_data_filtered GROUP BY file_type, delivery_method ORDER BY file_type asc, count(*) desc'
      );
    }
  };
}
