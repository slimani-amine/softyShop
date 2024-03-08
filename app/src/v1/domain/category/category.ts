import { IIdAsNumber, NumberId } from "../types/idAsNumber";

export interface ICategory extends IIdAsNumber {
  id: string;
  name: string;
  icon: string;
  isPublished: boolean;
}

export class Category extends NumberId implements ICategory {
  id: string;
  name: string;
  icon: string;
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  isPublished: boolean;

  constructor(payload: {
    id: string;
    name: string;
    icon: string;
    isPublished: boolean;
  }) {
    super(payload.id);
    this.name = payload.name;
    this.icon = payload.icon;
    this.isPublished = payload.isPublished;
  }
}

export interface ICreateCategoryInput {
  name: string;
  icon: string;
  isPublished: boolean;
}
