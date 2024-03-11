import { IProduct } from "../product/product";
import { IIdAsNumber, NumberId } from "../types/idAsNumber";
import { IUser } from "../users/user";
export interface IStore extends IIdAsNumber {
  id: string;
  name: string;
  phoneNumber: string;
  logo: string;
  isPublished: boolean;
  location: string;
  address: string;
  socialMediaLinks: string;
}
export declare class Store extends NumberId implements IStore {
  id: string;
  name: string;
  phoneNumber: string;
  logo: string;
  isPublished: boolean;
  location: string;
  address: string;
  socialMediaLinks: string;
  user?: IUser;
  products?: IProduct[];
  constructor(payload: {
    id: string;
    name: string;
    phoneNumber: string;
    logo: string;
    isPublished: boolean;
    location: string;
    address: string;
    socialMediaLinks: string;
    user?: IUser;
    products?: IProduct[];
  });
}
export interface ICreateStoreInput {
  name: string;
  phoneNumber: string;
  logo: string;
  isPublished: boolean;
  location: string;
  address: string;
  socialMediaLinks: string;
  vendor_id?: string;
}
