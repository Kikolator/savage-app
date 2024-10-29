// src/core/services/db-changes-service.ts
import * as admin from 'firebase-admin';
import { DbChangedRecord } from '../data/db-changed-record';
import { FieldValue } from 'firebase-admin/firestore';
// eslint-disable-next-line max-len
import { DbChangedRecordFirestoreModel } from '../data/models/db-changed-record/firestore/db-changed-record-firestore-model';

class DbChangesService {
  private get collectionRef() {
    return admin.firestore().collection('db-changes');
  }

  async addRecord(record: DbChangedRecord): Promise<void> {
    const ref = this.collectionRef.doc();
    const DocumentData = DbChangedRecordFirestoreModel.fromEntity(
      record.copyWith({ recordId: ref.id })
    ).toDocumentData(FieldValue.serverTimestamp());
    await ref.set(DocumentData);
  }

  async getRecords(): Promise<Array<DbChangedRecord>> {
    return (
      await this.collectionRef
        .orderBy(DbChangedRecordFirestoreModel.kDateTime, 'desc')
        .get()
    ).docs.map((doc) =>
      DbChangedRecordFirestoreModel.fromDocumentData(doc.data())
    );
  }
}

export const dbChangesService: DbChangesService = new DbChangesService();
