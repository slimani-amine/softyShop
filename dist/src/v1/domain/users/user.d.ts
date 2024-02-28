import { IStore } from '../store/store';
import { IIdAsNumber, NumberId } from '../types/idAsNumber';
export interface IUser extends IIdAsNumber {
    id: string;
    email: string;
    isVerified: boolean;
    picture?: string;
    username: string;
    password: string;
    role: string;
    phoneNumber?: string;
    confirmation_token: string;
    confirmed_email: boolean;
    store?: IStore;
}
export declare class User extends NumberId implements IUser {
    id: string;
    email: string;
    isVerified: boolean;
    picture: string;
    username: string;
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
        username: string;
        password: string;
        role: string;
        phoneNumber: string;
        confirmation_token: string;
        confirmed_email: boolean;
    });
}
export interface ICreateUserInput {
    id: string;
    email: string;
    isVerified: boolean;
    picture: string;
    username: string;
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
export declare class UserPasswordResetInformation extends NumberId implements IUserPasswordResetInformation {
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
    });
}
export interface ICreateUserPasswordResetInformation {
    token: string;
    userId: string;
    expirationDate: Date;
}
