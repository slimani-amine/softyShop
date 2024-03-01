import { IIdAsNumber, NumberId } from "../types/idAsNumber";

export interface IBrand extends IIdAsNumber {
    id: string;
    name: string;
    logo: string;
    product?: IProduct;
  }
  
  export class Brand extends NumberId implements IBrand {
    id: string;
    name: string;
    logo: string;
    product?: IProduct;
  
    constructor(payload: {
      id: string;
      name: string;
      logo: string;
      product?: IProduct;
    }) {
      super(payload.id);
      this.name = payload.name;
      this.logo = payload.logo;
      this.product = payload.product;
    }
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