// src/core/data/models/custom-field/client/validators.ts

import { CustomFieldType } from '../../../custom-field';

export const validateCustomFieldName = (name: string): void => {
  if (!name || name.length === 0) {
    throw new Error('Custom field name is required.');
  }
};

export const validateCustomFieldType = (fieldType: CustomFieldType): void => {
  if (!fieldType || fieldType.length === 0) {
    throw new Error('Custom field type is required.');
  }
};
