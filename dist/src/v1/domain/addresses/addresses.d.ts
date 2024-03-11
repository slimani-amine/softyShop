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
export declare class Address extends NumberId implements IAddress {
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
  });
}
export interface ICreateAddressInput {
  address: string;
  city: string;
  state: string;
  zipCode: number;
  user_id?: string;
}
