import { Primitives } from '../../../../contexts/shared/domain/value-objects/entity';
import {
  FileFeature,
  FileFeatureProperties
} from '../../../../contexts/file-features/domain/models/file-feature.entity';
import {
  FileFeaturePostgresDTO,
  PostgresqlFileFeatureMapper
} from '../../../../contexts/file-features/infrastructure/database/postgresql/postgresql-file-feature.mapper';

interface FileFeatureBuilder {
  build(): FileFeature;
  buildDto(): FileFeaturePostgresDTO;
}

export function FileFeatureBuilder(): FileFeatureBuilder {
  const fileFeature: Primitives<FileFeatureProperties> = {
    malwareType: 'Arkei',
    fileType: 'dll',
    result: 2021
  };

  return {
    build(): FileFeature {
      return FileFeature.create(fileFeature);
    },
    buildDto(): FileFeaturePostgresDTO {
      const mapper = new PostgresqlFileFeatureMapper();
      return mapper.toDto(fileFeature);
    }
  };
}
