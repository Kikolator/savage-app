import { DocumentData } from 'firebase-admin/firestore';
import { MemberData } from '../../../member-data';

export class MemberDataFirestoreModel extends MemberData {
  static kId = 'id';
  static kUid = 'uid';
  static kMemberVisible = 'member_visible';
  static kMembershipStatus = 'membership_status';
  static kCompanyName = 'company_name';
  static kFirstName = 'first_name';
  static kLastName = 'last_name';
  static kDescription = 'description';
  static kWebsite = 'website';
  static kCompanyEmail = 'company_email';
  static kCompanyPhone = 'company_phone';
  static kPhotoUrl = 'photo_url';

  static fromEntity(entity: MemberData): MemberDataFirestoreModel {
    return Object.assign(MemberDataFirestoreModel.empty(), entity);
  }

  static empty(): MemberDataFirestoreModel {
    return new MemberDataFirestoreModel(
      '',
      '',
      '',
      '',
      false,
      null,
      '',
      '',
      '',
      '',
      '',
      ''
    );
  }

  static fromDocumentData(data: DocumentData): MemberDataFirestoreModel {
    return new MemberDataFirestoreModel(
      data[this.kId],
      data[this.kUid],
      data[this.kFirstName],
      data[this.kLastName],
      data[this.kMemberVisible],
      data[this.kMembershipStatus],
      data[this.kCompanyName],
      data[this.kDescription],
      data[this.kWebsite],
      data[this.kCompanyEmail],
      data[this.kCompanyPhone],
      data[this.kPhotoUrl]
    );
  }
}
