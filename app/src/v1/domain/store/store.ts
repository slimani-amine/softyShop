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

export class Store extends NumberId implements IStore {
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
  }) {
    super(payload.id);
    this.name = payload.name;
    this.logo = payload.logo;
    this.isPublished = payload.isPublished;
    this.location = payload.location;
    this.address = payload.address;
    this.socialMediaLinks = payload.socialMediaLinks;
    this.user = payload.user;
    this.products = payload.products;
  }
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
