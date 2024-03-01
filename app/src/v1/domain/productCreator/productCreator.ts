import { IProduct } from "../product/product";
import { IStore } from "../store/store";
import { IIdAsNumber, NumberId } from "../types/idAsNumber";

export interface IProductCreator extends IIdAsNumber {
  id: string;
  name: string;
  store?: IStore;
}

export class ProductCreator extends NumberId implements IProductCreator {
  id: string;
  name: string;
  store?: IStore;

  constructor(payload: { id: string; name: string; store?: IStore }) {
    super(payload.id);
    this.name = payload.name;
    this.store = payload.store;
  }
}

export interface ICreateProductCreatorInput {
  name: string;
  store_id?: string;
}
