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
import { StoreEntity } from "./store.entity";

@Entity({
  name: "ProductCreator",
})
export class ProductCreatorEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    type: "varchar",
  })
  name: string;

  @OneToMany(() => ProductEntity, (product) => product.brand)
  products: ProductEntity[];

  @ManyToOne(() => StoreEntity, (store) => store.brands)
  @JoinColumn({ name: "store_id" })
  store: StoreEntity;

  @DeleteDateColumn({ name: "deletedAt" })
  deletedAt: Date;

  @CreateDateColumn({ name: "createdAt" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updatedAt" })
  updatedAt: Date;
}

export type ProductCreatorWherePayload =
  WhereEntityOptions<ProductCreatorEntity>;
export type ProductCreatorUpdateDataPayload =
  QueryDeepPartialEntity<ProductCreatorEntity>;
export type ProductCreatorFindPayload = findManyType<ProductCreatorEntity>;
