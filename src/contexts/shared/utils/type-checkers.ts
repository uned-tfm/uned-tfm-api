export function isNil(value: unknown): value is undefined | null | typeof NaN {
  return value === undefined || value === null;
}

export function hasValue(value: unknown): value is NonNullable<unknown> {
  return !isNil(value);
}

export function isEmptyString(value: unknown): value is string {
  return typeof value === 'string' && isEmpty(value);
}

export function isEmpty<T>(value: string | T[]): boolean {
  return value.length === 0;
}

export function isObjectEmpty<T>(obj: T): boolean {
  return Object.keys(obj).length === 0;
}

export function isDate(value: unknown): value is Date {
  return value instanceof Date;
}

export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}
