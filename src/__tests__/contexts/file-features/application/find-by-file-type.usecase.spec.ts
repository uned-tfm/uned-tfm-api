import { mock } from 'jest-mock-extended';
import { UseCase } from '../../../../contexts/shared/application/use-case';
import { FileFeatureRepository } from '../../../../contexts/file-features/domain/contracts/file-feature.repository';
import { FileFeature } from '../../../../contexts/file-features/domain/models/file-feature.entity';
import { FileFeatureBuilder } from '../__mocks__/file-feature.builder';
import { findByFileTypeBuilder } from '../../../../contexts/file-features/application/find-by-file-type.usecase';

describe('Find all file feature by file type data usecase', () => {
  const mockFileFeatureRepository = mock<FileFeatureRepository>();

  let findByFileType: UseCase<void, FileFeature[]>;
  let validFileFeatures: FileFeature[];

  beforeAll(() => {
    validFileFeatures = [FileFeatureBuilder().build()];

    findByFileType = findByFileTypeBuilder({
      fileFeatureRepository: mockFileFeatureRepository
    });
  });

  it('It should return file feature data grouped by file type', async () => {
    mockFileFeatureRepository.findByFileType.mockResolvedValue(validFileFeatures);

    const result = await findByFileType();

    expect(mockFileFeatureRepository.findByFileType).toBeCalled();
    expect(result).not.toBeNull();
    expect(result).toHaveLength(1);
  });
});
