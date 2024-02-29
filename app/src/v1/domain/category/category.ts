import { IIdAsNumber, NumberId } from "../types/idAsNumber";

export interface ICategory extends IIdAsNumber {
  id: string;
  name: string;
  icon: string;
}

export class Category extends NumberId implements ICategory {
  id: string;
  name: string;
  icon: string;
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;

  constructor(payload: { id: string; name: string; icon: string }) {
    super(payload.id);
    this.name = payload.name;
    this.icon = payload.icon;
  }
}

export interface ICreateCategoryInput {
  name: string;
  icon: string;
}
