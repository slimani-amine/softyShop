import { IProduct } from "../product/product";
import { IIdAsNumber, NumberId } from "../types/idAsNumber";
import { IUser } from "../users/user";
export interface IStore extends IIdAsNumber {
    id: string;
    storeName: string;
    storePhone: string;
    logo: string;
    isPublished: boolean;
    position: string;
    socialMediaLinks: string;
}
export declare class Store extends NumberId implements IStore {
    id: string;
    storeName: string;
    storePhone: string;
    logo: string;
    isPublished: boolean;
    position: string;
    socialMediaLinks: string;
    user?: IUser;
    products?: IProduct[];
    constructor(payload: {
        id: string;
        storeName: string;
        storePhone: string;
        logo: string;
        isPublished: boolean;
        position: string;
        socialMediaLinks: string;
        user?: IUser;
        products?: IProduct[];
    });
}
export interface ICreateStoreInput {
    storeName: string;
    storePhone: string;
    logo: string;
    isPublished: boolean;
    position: string;
    socialMediaLinks: string;
    vendor_id?: string;
}
