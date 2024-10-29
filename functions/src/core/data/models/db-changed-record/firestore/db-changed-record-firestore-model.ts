// src/core/data/models/db-changed-record/
// firestore/db-changed-record-firestore-model.ts

import { DocumentData, FieldValue, Timestamp } from 'firebase-admin/firestore';
import { DbChangedRecord } from '../../../db-changed-record';

export class DbChangedRecordFirestoreModel extends DbChangedRecord {
  static kRecordId = 'record_id';
  static kCode = 'code';
  static kDescription = 'description';
  static kUid = 'uid';
  static kDateTime = 'date_time';

  static fromEntity(entity: DbChangedRecord): DbChangedRecordFirestoreModel {
    return Object.assign(DbChangedRecordFirestoreModel.empty(), entity);
  }

  static empty(): DbChangedRecordFirestoreModel {
    return new DbChangedRecordFirestoreModel('', '', '');
  }

  static fromDocumentData(data: DocumentData): DbChangedRecordFirestoreModel {
    return new DbChangedRecordFirestoreModel(
      data[DbChangedRecordFirestoreModel.kCode],
      data[DbChangedRecordFirestoreModel.kDescription],
      data[DbChangedRecordFirestoreModel.kUid],
      data[DbChangedRecordFirestoreModel.kRecordId],
      (data[DbChangedRecordFirestoreModel.kDateTime] as Timestamp).toDate()
    );
  }

  toDocumentData(dateTime: FieldValue | Date) {
    return {
      [DbChangedRecordFirestoreModel.kRecordId]: this.recordId,
      [DbChangedRecordFirestoreModel.kCode]: this.code,
      [DbChangedRecordFirestoreModel.kDescription]: this.description,
      [DbChangedRecordFirestoreModel.kUid]: this.uid,
      [DbChangedRecordFirestoreModel.kDateTime]:
        dateTime instanceof FieldValue
          ? dateTime
          : Timestamp.fromDate(dateTime ?? this.dateTime),
    };
  }
}
