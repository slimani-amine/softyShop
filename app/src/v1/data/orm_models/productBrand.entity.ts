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
  name: "Brands",
})
export class BrandEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    type: "varchar",
  })
  name: string;

  @Column({
    type: "varchar",
  })
  logo: string;

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

export type BrandWherePayload = WhereEntityOptions<BrandEntity>;
export type BrandUpdateDataPayload = QueryDeepPartialEntity<BrandEntity>;
export type BrandFindPayload = findManyType<BrandEntity>;
