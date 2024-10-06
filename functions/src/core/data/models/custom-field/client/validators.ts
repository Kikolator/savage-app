// src/core/data/models/custom-field/client/validators.ts

import { HttpResponseError } from '../../../../utils/http-response-error';
import { CustomFieldType } from '../../../custom-field';

export const validateCustomFieldName = (name: string): void => {
  if (!name || name.length === 0) {
    throw new HttpResponseError(
      400,
      'BAD_REQUEST',
      'Custom field name is required'
    );
  }
  if (name.includes(' ')) {
    throw new HttpResponseError(
      400,
      'BAD_REQUEST',
      'Custom field name cannot contain spaces'
    );
  }
};

export const validateCustomFieldType = (fieldType: CustomFieldType): void => {
  if (!fieldType || fieldType.length === 0) {
    throw new Error('Custom field type is required.');
  }
};
