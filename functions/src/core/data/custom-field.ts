// src/core/data

export type CustomFieldType = 'Text' | 'Number' | 'Date';

export class CustomField {
  constructor(
    public readonly id: string | undefined,
    public readonly name: string,
    public readonly fieldType: CustomFieldType,
    public readonly createdAt: Date | null,
    public readonly updatedAt: Date | null
  ) {}

  copyWith(data: Partial<Record<keyof CustomField, any>>) {
    return new CustomField(
      data.id ?? this.id,
      data.name ?? this.name,
      data.fieldType ?? this.fieldType,
      data.createdAt ?? this.createdAt,
      data.updatedAt ?? this.updatedAt
    );
  }
}
