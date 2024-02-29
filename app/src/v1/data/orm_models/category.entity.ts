import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import {
  QueryDeepPartialEntity,
  WhereEntityOptions,
  findManyType,
} from "../../../types/repos";
import { ProductEntity } from "./product.entity";

@Entity({
  name: "Category",
})
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    type: "varchar",
  })
  name: string;

  @Column({
    type: "varchar",
  })
  icon: string;

  @OneToMany(() => ProductEntity, (productCategory) => productCategory.name)
  product: ProductEntity[];

  @DeleteDateColumn({ name: "deletedAt" })
  deletedAt: Date;

  @CreateDateColumn({ name: "createdAt" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updatedAt" })
  updatedAt: Date;
}

export type CategoryWherePayload = WhereEntityOptions<CategoryEntity>;
export type CategoryUpdateDataPayload = QueryDeepPartialEntity<CategoryEntity>;
export type CategoryFindPayload = findManyType<CategoryEntity>;
