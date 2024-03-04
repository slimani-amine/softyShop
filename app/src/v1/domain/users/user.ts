import { IStore } from "../store/store";
import { IIdAsNumber, NumberId } from "../types/idAsNumber";

export interface IUser extends IIdAsNumber {
  id: string;
  email: string;
  isVerified: boolean;
  picture?: string;
  firstName: string;
  lastName: string;
  password: string;
  role: string;
  phoneNumber?: string;
  confirmation_token: string;
  confirmed_email: boolean;
  store?: IStore;
}

export class User extends NumberId implements IUser {
  id: string;
  email: string;
  isVerified: boolean;
  picture: string;
  firstName: string;
  lastName: string;
  password: string;
  role: string;
  phoneNumber: string;
  confirmation_token: string;
  confirmed_email: boolean;

  constructor(payload: {
    id: string;
    email: string;
    isVerified: boolean;
    picture: string;
    firstName: string;
    lastName: string;
    password: string;
    role: string;
    phoneNumber: string;
    confirmation_token: string;
    confirmed_email: boolean;
  }) {
    super(payload.id);
    this.email = payload.email;
    this.isVerified = payload.isVerified;
    this.picture = payload.picture;
    this.firstName = payload.firstName;
    this.lastName = payload.lastName;
    this.password = payload.password;
    this.role = payload.role;
    this.phoneNumber = payload.phoneNumber;
    this.confirmation_token = payload.confirmation_token;
    this.confirmed_email = payload.confirmed_email;
  }
}

export interface ICreateUserInput {
  id: string;
  email: string;
  isVerified: boolean;
  picture: string;
  firstName: string;
  lastName: string;
  password: string;
  role: string;
  phoneNumber: string;
  confirmation_token: string;
  confirmed_email: boolean;
}

export interface IUserPasswordResetInformation extends IIdAsNumber {
  id: string;
  token: string;
  userId: number;
  user?: IUser;
  createdAt: Date;
  updatedAt: Date;
  expirationDate: Date;
}

export class UserPasswordResetInformation
  extends NumberId
  implements IUserPasswordResetInformation
{
  id: string;
  token: string;
  userId: number;
  user?: IUser;
  createdAt: Date;
  updatedAt: Date;
  expirationDate: Date;

  constructor(payload: {
    id: string;
    token: string;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
    user?: IUser;
  }) {
    super(payload.id);
    this.token = payload.token;
    this.userId = payload.userId;
    this.createdAt = payload.createdAt;
    this.updatedAt = payload.updatedAt;
    this.user = payload.user;
  }
}

export interface ICreateUserPasswordResetInformation {
  token: string;
  userId: string;
  expirationDate: Date;
}
