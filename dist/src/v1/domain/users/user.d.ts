import { CartEntity } from "../../data/orm_models/cart.entity";
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
    cart?: CartEntity;
}
export declare class User extends NumberId implements IUser {
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
    cart?: CartEntity;
    constructor(payload: {
        id: string;
        email: string;
        isVerified: boolean;
        picture: string;
        firstName: string;
        lastName: string;
        role: string;
        phoneNumber: string;
        confirmation_token: string;
        confirmed_email: boolean;
        cart?: CartEntity;
    });
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
    cart_id?: string;
}
export interface IUserPasswordResetInformation extends IIdAsNumber {
    id: string;
    token: string;
    userId: string;
    user?: IUser;
    createdAt: Date;
    updatedAt: Date;
    expirationDate: Date;
}
export declare class UserPasswordResetInformation extends NumberId implements IUserPasswordResetInformation {
    id: string;
    token: string;
    userId: string;
    user?: IUser;
    createdAt: Date;
    updatedAt: Date;
    expirationDate: Date;
    constructor(payload: {
        id: string;
        token: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        user?: IUser;
    });
}
export interface ICreateUserPasswordResetInformation {
    token: string;
    userId: string;
    expirationDate: Date;
}
