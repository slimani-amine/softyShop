import { IIdAsNumber, NumberId } from "../types/idAsNumber";
export interface ICategory extends IIdAsNumber {
    id: string;
    name: string;
    icon: string;
}
export declare class Category extends NumberId implements ICategory {
    id: string;
    name: string;
    icon: string;
    deletedAt: Date;
    createdAt: Date;
    updatedAt: Date;
    constructor(payload: {
        id: string;
        name: string;
        icon: string;
    });
}
export interface ICreateCategoryInput {
    name: string;
    icon: string;
}
