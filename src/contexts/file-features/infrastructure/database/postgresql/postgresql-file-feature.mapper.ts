import { PostgresMapper } from '../../../../shared/infrastructure/postgresql/postgresql-mapper';
import { Primitives } from '../../../../shared/domain/value-objects/entity';
import { FileFeature, FileFeatureProperties } from '../../../domain/models/file-feature.entity';

export type FileFeaturePostgresDTO = {
  malware_type?: string;
  file_type?: string;
  result: string;
};

export class PostgresqlFileFeatureMapper extends PostgresMapper<
  Primitives<FileFeatureProperties>,
  FileFeaturePostgresDTO
> {
  private static DICTIONARY: Record<
    keyof Primitives<FileFeatureProperties>,
    keyof FileFeaturePostgresDTO
  > = {
    malwareType: 'malware_type',
    fileType: 'file_type',
    result: 'result'
  };

  constructor() {
    super(PostgresqlFileFeatureMapper.DICTIONARY);
  }

  toDto(entity: Primitives<FileFeatureProperties>): FileFeaturePostgresDTO {
    return super.toDto(entity);
  }

  fromDTO(dto: FileFeaturePostgresDTO): FileFeature {
    return FileFeature.create({
      ...super.fromDto(dto),
      result: parseInt(dto.result)
    });
  }
}
