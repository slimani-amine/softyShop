import { IIdAsNumber, NumberId } from "../types/idAsNumber";

export interface IPaymentMethod extends IIdAsNumber {
  id: string;
  name: string;
}

export class PaymentMethod extends NumberId implements IPaymentMethod {
  id: string;
  name: string;
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;

  constructor(payload: { id: string; name: string }) {
    super(payload.id);
    this.name = payload.name;
  }
}

export interface ICreatePaymentMethodInput {
  name: string;
}
