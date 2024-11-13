// src/core/data/invoice-data.ts

export class InvoiceData {
  constructor(
    public readonly id: string,
    public readonly isDefault: boolean,
    public readonly uid: string,
    public readonly name: string,
    public readonly nif: string | null,
    public readonly vat: string | null,
    public readonly email: string | null,
    public readonly phone: string | null,
    public readonly addressLine1: string,
    public readonly addressLine2: string | null,
    public readonly postalCode: string,
    public readonly city: string,
    public readonly province: string,
    public readonly country: string
  ) {}
}
