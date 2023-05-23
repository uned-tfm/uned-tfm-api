export class PostgresMapper<
  DomainEntity extends Record<string, unknown>,
  DtoEntity extends Record<string, unknown>
> {
  protected domainFields: string[];
  protected dtoFields: string[];

  constructor(dictionary: Record<keyof DomainEntity, string>) {
    this.domainFields = Object.keys(dictionary);
    this.dtoFields = Object.values(dictionary);
  }

  protected toDto(entity: DomainEntity): DtoEntity {
    return this.domainFields.reduce((dto: Record<string, unknown>, key: string, index: number) => {
      dto[this.dtoFields[index]] = entity[key];
      return dto;
    }, {}) as DtoEntity;
  }

  protected fromDto(dto: DtoEntity): DomainEntity {
    return this.dtoFields.reduce((entity: Record<string, unknown>, key: string, index: number) => {
      entity[this.domainFields[index]] = dto[key];
      return entity;
    }, {}) as DomainEntity;
  }
}
