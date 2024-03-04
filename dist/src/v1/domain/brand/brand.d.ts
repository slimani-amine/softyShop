import { IStore } from "../store/store";
import { IIdAsNumber, NumberId } from "../types/idAsNumber";
export interface IBrand extends IIdAsNumber {
    id: string;
    name: string;
    logo: string;
    store?: IStore;
}
export declare class Brand extends NumberId implements IBrand {
    id: string;
    name: string;
    logo: string;
    store?: IStore;
    constructor(payload: {
        id: string;
        name: string;
        logo: string;
        store?: IStore;
    });
}
export interface ICreateBrandInput {
    name: string;
    logo: string;
    store_id?: string;
}
