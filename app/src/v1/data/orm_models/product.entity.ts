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
import { StoreEntity } from "./store.entity";
import { ProductCreatorEntity } from "./productCreator.entity";
import { CategoryEntity } from "./category.entity";
import { BrandEntity } from "./productBrand.entity";
import { ReviewsEntity } from "./reviews.entity";
import { WishlistEntity } from "./wishlist.entity";
import { CartProductEntity } from "./cartProduct.entity";

@Entity({
  name: "Products",
})
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    type: "varchar",
    unique: true,
  })
  name: string;

  @Column({
    type: "varchar",
    nullable: true,
  })
  description: string;

  @Column({
    type: "varchar",
  })
  images: string;

  @Column({
    type: "float",
  })
  price: number;

  @Column({
    type: "int",
  })
  stockNumber: number;

  @Column({
    type: "int",
    default: 0,
  })
  discount: number;

  @Column({
    type: "date",
  })
  publishedAt: Date;

  @Column({
    type: "boolean",
    default: true,
  })
  availability: boolean;

  @Column({
    type: "boolean",
    default: false,
  })
  isPublished: boolean;

  @Column({
    type: "boolean",
    default: false,
  })
  isAccepted: boolean;

  @OneToMany(() => ReviewsEntity, (review) => review.product)
  reviews: ReviewsEntity[];

  @OneToMany(() => WishlistEntity, (wishlist) => wishlist.product)
  wishlist: WishlistEntity[];

  @OneToMany(() => CartProductEntity, (cartProduct) => cartProduct.product)
  cartProducts: CartProductEntity[];

  @ManyToOne(() => BrandEntity, (brand) => brand.products)
  @JoinColumn({ name: "brand_id" })
  brand: BrandEntity;

  @ManyToOne(() => ProductCreatorEntity, (creator) => creator.products)
  @JoinColumn({ name: "creator_id" })
  creator: ProductCreatorEntity;

  @ManyToOne(() => StoreEntity, (store) => store.products)
  @JoinColumn({ name: "store_id" })
  store: StoreEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.product)
  @JoinColumn({ name: "category_id" })
  category: CategoryEntity;

  @DeleteDateColumn({ name: "deletedAt" })
  deletedAt: Date;

  @CreateDateColumn({ name: "createdAt" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updatedAt" })
  updatedAt: Date;
}

export type ProductWherePayload = WhereEntityOptions<ProductEntity>;
export type ProductUpdateDataPayload = QueryDeepPartialEntity<ProductEntity>;
export type ProductFindPayload = findManyType<ProductEntity>;
