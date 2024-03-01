import { IIdAsNumber, NumberId } from "../types/idAsNumber";
export interface IBrand extends IIdAsNumber {
    id: string;
    name: string;
    logo: string;
    product?: IProduct;
}
export declare class Brand extends NumberId implements IBrand {
    id: string;
    name: string;
    logo: string;
    product?: IProduct;
    constructor(payload: {
        id: string;
        name: string;
        logo: string;
        product?: IProduct;
    });
}
export interface ICreateBrandInput {
    name: string;
    logo: string;
    product_id?: string;
}
export interface IProduct {
    id: number;
    logo: string;
    isPublished: boolean;
    position: string;
}
