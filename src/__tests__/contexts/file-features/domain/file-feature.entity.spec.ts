import { Primitives } from '../../../../contexts/shared/domain/value-objects/entity';
import { FieldValidationError } from '../../../../contexts/shared/domain/errors';
import {
  FileFeature,
  FileFeatureProperties
} from '../../../../contexts/file-features/domain/models/file-feature.entity';
import { FileFeatureBuilder } from '../__mocks__/file-feature.builder';

describe('File feature entity', () => {
  let validFileFeature: FileFeature;

  beforeAll(() => {
    validFileFeature = FileFeatureBuilder().build();
  });

  describe('Input validation', () => {
    it('should throw when is invalid', () => {
      expect(() =>
        FileFeature.create({
          malwareType: 'Arkei',
          fileType: 'dll'
        } as unknown as Primitives<FileFeatureProperties>)
      ).toThrow(FieldValidationError);
    });

    it('should create file fetaure when is valid', () => {
      const fileFetaure = FileFeature.create(validFileFeature.value);
      expect(fileFetaure).not.toBeNull();
      expect(fileFetaure).toMatchObject(validFileFeature);
    });
  });
});
