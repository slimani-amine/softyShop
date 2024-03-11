export interface IIdAsNumber {
    id: string;
    getIdAsNumber(): string;
}
export declare class NumberId {
    id: string;
    constructor(id: string);
    getIdAsNumber(): string;
}
