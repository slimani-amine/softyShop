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
import { UserEntity } from "./user.entity";
import { ProductEntity } from "./product.entity";
import { BrandEntity } from "./productBrand.entity";
import { ProductCreatorEntity } from "./productCreator.entity";

@Entity({
  name: "Stores",
})
export class StoreEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    type: "varchar",
    unique: true,
  })
  storeName: string;

  @Column({
    type: "varchar",
  })
  storePhone: string;

  @Column({
    type: "varchar",
  })
  logo: string;

  @Column({
    type: "boolean",
    default: false,
  })
  isPublished: boolean;

  @Column({
    type: "varchar",
  })
  location: string;

  @Column({
    type: "varchar",
  })
  address: string;

  @Column({
    type: "varchar",
  })
  socialMediaLinks: string;

  @OneToMany(() => ProductEntity, (product) => product.store)
  products: ProductEntity[];

  @OneToMany(() => BrandEntity, (brand) => brand.store)
  brands: BrandEntity[];

  @OneToMany(
    () => ProductCreatorEntity,
    (productCreator) => productCreator.store
  )
  productCreators: ProductCreatorEntity[];

  @ManyToOne(() => UserEntity, (user) => user.store)
  @JoinColumn({ name: "vendor_id" })
  user: UserEntity;

  @DeleteDateColumn({ name: "deletedAt" })
  deletedAt: Date;

  @CreateDateColumn({ name: "createdAt" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updatedAt" })
  updatedAt: Date;
}

export type StoresWherePayload = WhereEntityOptions<StoreEntity>;
export type StoresUpdateDataPayload = QueryDeepPartialEntity<StoreEntity>;
export type StoresFindPayload = findManyType<StoreEntity>;
