import { IProduct } from "../product/product";
import { IStore } from "../store/store";
import { IIdAsNumber, NumberId } from "../types/idAsNumber";

export interface IBrand extends IIdAsNumber {
    id: string;
    name: string;
    logo: string;
    store?: IStore;
  }
  
  export class Brand extends NumberId implements IBrand {
    id: string;
    name: string;
    logo: string;
    store?: IStore;
  
    constructor(payload: {
      id: string;
      name: string;
      logo: string;
      store?: IStore;
    }) {
      super(payload.id);
      this.name = payload.name;
      this.logo = payload.logo;
      this.store = payload.store;
    }
  }
  
  export interface ICreateBrandInput {
    name: string;
    logo: string;
    store_id?: string;
  }
  