import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import {
  QueryDeepPartialEntity,
  WhereEntityOptions,
  findManyType,
} from "../../../types/repos";
import { StoreEntity } from "./store.entity";
import { AddressesEntity } from "./addresses.entity";
import ReviewsEntity from "./reviews.entity";
import { WishlistEntity } from "./wishlist.entity";
import { CartEntity } from "./cart.entity";
import { ResetPasswordEntity } from "./resetpassword.entity";
import { OrderEntity } from "./orders.entity";

@Entity({
  name: "Users",
})
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "varchar",
    unique: true,
  })
  email: string;

  @Column({
    type: "varchar",
  })
  firstName: string;

  @Column({
    type: "varchar",
  })
  lastName: string;

  @Column({
    type: "varchar",
  })
  password: string;

  @Column({
    type: "enum",
    enum: ["admin", "vendor", "user"],
    default: "user",
  })
  role: string;

  @Column()
  phoneNumber: string;

  @Column({
    type: "varchar",
    nullable: true,
  })
  confirmation_token: string;

  @Column({
    type: "varchar",
  })
  picture: string;

  @Column({
    type: "boolean",
    default: true,
  })
  confirmed_email: boolean;

  @Column({
    type: "boolean",
    default: true,
  })
  isVerified: boolean;

  @OneToMany(() => ResetPasswordEntity, (resetPassword) => resetPassword.user)
  resetPasswords: ResetPasswordEntity[];

  @OneToMany(() => AddressesEntity, (address) => address.user)
  addresses: AddressesEntity[];

  @OneToMany(() => StoreEntity, (store) => store.user)
  store: StoreEntity[];

  @OneToMany(() => ReviewsEntity, (review) => review.user)
  reviews: ReviewsEntity[];

  @OneToMany(() => WishlistEntity, (wishlist) => wishlist.user)
  wishlist: WishlistEntity[];

  @OneToOne(() => CartEntity)
  @JoinColumn()
  cart: CartEntity;

  @OneToMany(() => OrderEntity, (order) => order.user)
  orders: OrderEntity[];

  @DeleteDateColumn({ name: "deletedAt" })
  deletedAt: Date;

  @CreateDateColumn({ name: "createdAt" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updatedAt" })
  updatedAt: Date;
}

export type UsersWherePayload = WhereEntityOptions<UserEntity>;
export type UsersUpdateDataPayload = QueryDeepPartialEntity<UserEntity>;
export type UsersFindPayload = findManyType<UserEntity>;
