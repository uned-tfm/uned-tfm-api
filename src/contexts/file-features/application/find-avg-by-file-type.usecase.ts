import { UseCase } from '../../shared/application/use-case';
import { FileFeatureRepository } from '../domain/contracts/file-feature.repository';
import { FileFeature } from '../domain/models/file-feature.entity';

export function findAvgByFileTypeBuilder({
  fileFeatureRepository
}: {
  fileFeatureRepository: FileFeatureRepository;
}): UseCase<void, FileFeature[]> {
  return async function findAvgByFileType(): Promise<FileFeature[]> {
    return fileFeatureRepository.findAvgByFileType();
  };
}
