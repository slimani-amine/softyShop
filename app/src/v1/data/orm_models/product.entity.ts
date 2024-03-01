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

  @Column()
  price: number;

  @Column()
  stockNumber: number;

  @Column({
    type: "date",
  })
  publishedAt: Date;

  @Column()
  availability: boolean;

  @Column()
  isPublished: boolean;

  @OneToMany(
    () => ProductCreatorEntity,
    (productCreator) => productCreator.name
  )
  creator: ProductCreatorEntity[];

  @OneToMany(() => BrandEntity, (productCretor) => productCretor.name)
  brand: BrandEntity[];

  @OneToMany(() => ReviewsEntity, (review) => review.product)
  review: ReviewsEntity[];

  @OneToMany(() => WishlistEntity, (wishlist) => wishlist.product)
  wishlist: WishlistEntity[];

  @OneToMany(() => CartProductEntity, (cartProduct) => cartProduct.product)
  cartProduct: CartProductEntity[];

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
