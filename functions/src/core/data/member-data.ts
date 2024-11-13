export class MemberData {
  constructor(
    public readonly id: string,
    public readonly uid: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly memberVisible: boolean,
    public readonly membershipStatus: 'active' | 'inactive' | null,
    public readonly companyName: string | null,
    public readonly description: string | null,
    public readonly website: string | null,
    public readonly companyEmail: string | null,
    public readonly companyPhone: string | null,
    public readonly photoUrl: string | null
  ) {}
}
