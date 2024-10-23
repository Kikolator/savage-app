// src/core/data/user.ts

export class User {
  constructor(
    public readonly uid: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly contactEmail: string,
    public readonly contactPhone: string,
    public readonly dateOfBirth: Date,
    public readonly photoUrl: string,
    public readonly membershipStatus: string,
    public readonly membershipTypes: string,
    public readonly availableCredits: number,
    public readonly joinedAt: Date,
    public readonly memberDataId: string,
    public readonly requestInvoice: boolean,
    public readonly invoiceData: string,
    public readonly checkedIn: boolean
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  copyWith(data: Partial<Record<keyof User, any>>) {
    return new User(
      data.uid ?? this.uid,
      data.firstName ?? this.firstName,
      data.lastName ?? this.lastName,
      data.dateOfBirth ?? this.dateOfBirth,
      data.contactEmail ?? this.contactEmail,
      data.contactPhone ?? this.contactPhone,
      data.photoUrl ?? this.photoUrl,
      data.membershipStatus ?? this.membershipStatus,
      data.membershipTypes ?? this.membershipTypes,
      data.availableCredits ?? this.availableCredits,
      data.joinedAt ?? this.joinedAt,
      data.memberDataId ?? this.memberDataId,
      data.requestInvoice ?? this.requestInvoice,
      data.invoiceData ?? this.invoiceData,
      data.checkedIn ?? this.checkedIn
    );
  }
}
