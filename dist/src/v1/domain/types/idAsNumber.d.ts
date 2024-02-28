export interface IIdAsNumber {
    id: string;
    getIdAsNumber(): number;
}
export declare class NumberId {
    id: string;
    constructor(id: string);
    getIdAsNumber(): number;
}
