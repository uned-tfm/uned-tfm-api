import { DatabaseConnector } from '../../../../shared/domain/contracts/database-connector';
import { Pool } from 'pg';

import { isEmpty, isNil } from '../../../../shared/utils/type-checkers';
import { FileFeature } from '../../../domain/models/file-feature.entity';
import { FileFeatureRepository } from '../../../domain/contracts/file-feature.repository';
import {
  FileFeaturePostgresDTO,
  PostgresqlFileFeatureMapper
} from './postgresql-file-feature.mapper';

export function postgresqlFileFeatureRepositoryBuilder({
  databaseConnector
}: {
  databaseConnector: DatabaseConnector<Pool>;
}): FileFeatureRepository {
  const mapper = new PostgresqlFileFeatureMapper();

  async function find(sql: string, params: number[] = []): Promise<FileFeature[]> {
    const pool = await databaseConnector.getConnection();
    const result = await pool.query<FileFeaturePostgresDTO>(sql, params);

    if (isNil(result.rows) || isEmpty(result.rows)) {
      return [];
    }

    return result.rows.map((fileFeature: FileFeaturePostgresDTO) => mapper.fromDTO(fileFeature));
  }

  return {
    async findAvgByMalwareType(): Promise<FileFeature[]> {
      return find(
        'select malware_type, avg(file_size) as result from malware.malware_data_filtered GROUP BY malware_type ORDER BY malware_type asc, avg(file_size) desc'
      );
    },
    async findAvgByFileType(): Promise<FileFeature[]> {
      return find(
        'select file_type, avg(file_size) as result from malware.malware_data_filtered GROUP BY file_type ORDER BY file_type asc, avg(file_size) desc'
      );
    },
    async findByFileType(): Promise<FileFeature[]> {
      return find(
        'select file_type, count(*) as result from malware.malware_data_filtered GROUP BY file_type ORDER BY count(*) desc'
      );
    },
    async findByMalwareAndFileType(): Promise<FileFeature[]> {
      return find(
        'select malware_type, file_type, count(*) as result from malware.malware_data_filtered GROUP BY malware_type, file_type ORDER BY malware_type asc, count(*) desc'
      );
    }
  };
}
