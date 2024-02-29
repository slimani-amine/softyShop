import { IIdAsNumber, NumberId } from "../types/idAsNumber";
import { IUser } from "../users/user";

export interface IAddress extends IIdAsNumber {
  id: string;
  address: string;
  city: string;
  state: string;
  zipCode: number;
  user?: IUser;
}

export class Address extends NumberId implements IAddress {
  id: string;
  address: string;
  city: string;
  state: string;
  zipCode: number;
  user?: IUser;

  constructor(payload: {
    id: string;
    address: string;
    city: string;
    state: string;
    zipCode: number;
    user?: IUser;
  }) {
    super(payload.id);
    this.address = payload.address;
    this.city = payload.city;
    this.state = payload.state;
    this.zipCode = payload.zipCode;
    this.user = payload.user;
  }
}

export interface ICreateAddressInput {
  address: string;
  city: string;
  state: string;
  zipCode: number;
  user_id?: number;
}
