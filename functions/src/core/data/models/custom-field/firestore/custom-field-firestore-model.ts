// src/core/data/models/custom-field/firestore/custom-field-firestore-model.ts

import { DocumentData, FieldValue, Timestamp } from 'firebase-admin/firestore';
import { CustomField, CustomFieldType } from '../../../custom-field';

export class CustomFieldFirestoreModel extends CustomField {
  static kId = 'id';
  static kName = 'name';
  static kFieldType = 'fieldType';
  static kCreatedAt = 'createdAt';
  static kUpdatedAt = 'updatedAt';

  fromEntitiy(customField: CustomField): CustomFieldFirestoreModel {
    return Object.assign(CustomFieldFirestoreModel.empty(), customField);
  }

  static empty(): CustomFieldFirestoreModel {
    return new CustomFieldFirestoreModel(
      '',
      '',
      '' as CustomFieldType,
      new Date(),
      null
    );
  }

  toDocumentData(
    customFieldId?: string,
    createdAt?: Timestamp | FieldValue,
    updatedAt?: Timestamp | FieldValue
  ) {
    return {
      [CustomFieldFirestoreModel.kId]: customFieldId ?? this.id,
      [CustomFieldFirestoreModel.kName]: this.name,
      [CustomFieldFirestoreModel.kFieldType]: this.fieldType,
      [CustomFieldFirestoreModel.kCreatedAt]: createdAt ?? this.createdAt,
      [CustomFieldFirestoreModel.kUpdatedAt]: updatedAt ?? this.updatedAt,
    };
  }

  fromDocumentData(data: DocumentData): CustomFieldFirestoreModel {
    return new CustomFieldFirestoreModel(
      data[CustomFieldFirestoreModel.kId] as string,
      data[CustomFieldFirestoreModel.kName] as string,
      data[CustomFieldFirestoreModel.kFieldType] as CustomFieldType,
      (data[CustomFieldFirestoreModel.kCreatedAt] as Timestamp).toDate(),
      (data[CustomFieldFirestoreModel.kUpdatedAt] as Timestamp).toDate()
    );
  }
}
