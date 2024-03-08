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

import { CartProductEntity } from "./cartProduct.entity";
import { OrderEntity } from "./orders.entity";
import { PaymentMethodEntity } from "./paymentMethod.entity";

@Entity({
  name: "Cart",
})
export class CartEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    type: "int",
    default: 0,
  })
  totalQuantity: number;

  @Column({
    type: "int",
    default: 0,
  })
  totalAmount: number;

  @OneToMany(() => CartProductEntity, (wishlist) => wishlist.product)
  cartProducts: CartProductEntity[];

  @OneToMany(() => OrderEntity, (order) => order.cart)
  order: OrderEntity[];

  @DeleteDateColumn({ name: "deletedAt" })
  deletedAt: Date;

  @CreateDateColumn({ name: "createdAt" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updatedAt" })
  updatedAt: Date;
}

export type CartWherePayload = WhereEntityOptions<CartEntity>;
export type CartUpdateDataPayload = QueryDeepPartialEntity<CartEntity>;
export type CartFindPayload = findManyType<CartEntity>;
