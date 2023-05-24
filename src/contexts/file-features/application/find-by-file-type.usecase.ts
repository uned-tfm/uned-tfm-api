import { UseCase } from '../../shared/application/use-case';
import { FileFeatureRepository } from '../domain/contracts/file-feature.repository';
import { FileFeature } from '../domain/models/file-feature.entity';

export function findByFileTypeBuilder({
  fileFeatureRepository
}: {
  fileFeatureRepository: FileFeatureRepository;
}): UseCase<void, FileFeature[]> {
  return async function findByFileType(): Promise<FileFeature[]> {
    return fileFeatureRepository.findByFileType();
  };
}
