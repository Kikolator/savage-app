// src/core/data/models/custom-field/client/custom-field-client-model.ts

import { CustomField, CustomFieldType } from '../../../custom-field';
import { validateCustomFieldName, validateCustomFieldType } from './validators';

export class CustomFieldClientModel extends CustomField {
  static kId = 'id';
  static kName = 'name';
  static kFieldType = 'fieldType';
  static kCreatedAtMillisecondsSinceEpoch = 'createdAtMilisecondsSinceEpoch';
  static kUpdatedAtMillisecondsSinceEpoch = 'updatedAtMilisecondsSinceEpoch';

  static fromEntity(customField: CustomField): CustomFieldClientModel {
    return Object.assign(CustomFieldClientModel.empty(), customField);
  }

  static empty(): CustomFieldClientModel {
    return new CustomFieldClientModel(
      '',
      '',
      '' as CustomFieldType,
      new Date(),
      null
    );
  }

  private static _validate(body: any): void {
    validateCustomFieldName(body[CustomFieldClientModel.kName]);
    validateCustomFieldType(body[CustomFieldClientModel.kFieldType]);
  }

  static validate(body: any): CustomFieldClientModel {
    this._validate(body);
    return new CustomFieldClientModel(
      undefined,
      body[CustomFieldClientModel.kName],
      body[CustomFieldClientModel.kFieldType],
      body[CustomFieldClientModel.kCreatedAtMillisecondsSinceEpoch] ??
        new Date(),
      body[CustomFieldClientModel.kUpdatedAtMillisecondsSinceEpoch] ?? null
    );
  }
}
