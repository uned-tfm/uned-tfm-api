import { NumberValueObject } from '../../../shared/domain/value-objects/number-value-object';
import { Entity, Primitives } from '../../../shared/domain/value-objects/entity';
import { StringValueObject } from '../../../shared/domain/value-objects/string-value-object';

export type FileFeatureProperties = {
  fileType?: StringValueObject;
  malwareType?: StringValueObject;
  result: NumberValueObject;
};

export class FileFeature extends Entity<FileFeatureProperties> {
  get value(): Primitives<FileFeatureProperties> {
    return {
      fileType: this.props.fileType.value,
      malwareType: this.props.malwareType.value,
      result: this.props.result.value
    };
  }

  static create(props: Primitives<FileFeatureProperties>): FileFeature {
    return new FileFeature({
      fileType: StringValueObject.createOptional('fileType', props.fileType),
      malwareType: StringValueObject.createOptional('malwareType', props.malwareType),
      result: NumberValueObject.create('result', props.result, { minValue: 0 })
    });
  }
}
