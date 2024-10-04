// src/core/data

export type CustomFieldType = 'Text' | 'Number' | 'Date';

export class CustomField {
  constructor(
    public readonly id: string | undefined,
    public readonly name: string,
    public readonly fieldType: CustomFieldType,
    public readonly createdAt: Date,
    public readonly updatedAt: Date | null
  ) {}
}
