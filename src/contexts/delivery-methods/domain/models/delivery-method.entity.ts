import { NumberValueObject } from '../../../shared/domain/value-objects/number-value-object';
import { StringValueObject } from '../../../shared/domain/value-objects/string-value-object';
import { Entity, Primitives } from '../../../shared/domain/value-objects/entity';

export type DeliveryMethodProperties = {
  fileType?: StringValueObject;
  malwareType?: StringValueObject;
  country?: StringValueObject;
  deliveryMethod: StringValueObject;
  count: NumberValueObject;
};

export class DeliveryMethod extends Entity<DeliveryMethodProperties> {
  get value(): Primitives<DeliveryMethodProperties> {
    return {
      fileType: this.props.fileType?.value,
      malwareType: this.props.malwareType?.value,
      deliveryMethod: this.props.deliveryMethod.value,
      country: this.props.country?.value,
      count: this.props.count.value
    };
  }

  static create(props: Primitives<DeliveryMethodProperties>): DeliveryMethod {
    return new DeliveryMethod({
      fileType: StringValueObject.createOptional('fileType', props.fileType),
      malwareType: StringValueObject.createOptional('malwareType', props.malwareType),
      country: StringValueObject.createOptional('country', props.country),
      deliveryMethod: StringValueObject.create('deliveryMethod', props.deliveryMethod),
      count: NumberValueObject.create('count', props.count, { minValue: 0 })
    });
  }
}
