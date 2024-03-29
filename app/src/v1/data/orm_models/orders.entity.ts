import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import {
  QueryDeepPartialEntity,
  WhereEntityOptions,
  findManyType,
} from "../../../types/repos";
import { CartEntity } from "./cart.entity";
import { PaymentMethodEntity } from "./paymentMethod.entity";
import { AddressesEntity } from "./addresses.entity";
import { UserEntity } from "./user.entity";

@Entity({
  name: "Orders",
})
export class OrderEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "date",
  })
  estimatedDeliveryDate: Date;

  @Column({
    type: "boolean",
    default: false,
  })
  isPaied: Date;

  @Column({
    type: "enum",
    enum: ["processing", "on_delivery", "livered", "cancelled"],
    default: "processing",
  })
  status: string;

  @ManyToOne(() => PaymentMethodEntity, (paymentMethod) => paymentMethod.order)
  @JoinColumn({ name: "paymentMethod_id" })
  paymentMethod: PaymentMethodEntity;

  @ManyToOne(() => UserEntity, (user) => user.wishlist)
  @JoinColumn({ name: "user_id" })
  user: UserEntity;

  @ManyToOne(() => AddressesEntity, (addresses) => addresses.order)
  @JoinColumn({ name: "address_id" })
  address: AddressesEntity;

  @ManyToOne(() => CartEntity, (cart) => cart.order)
  @JoinColumn({ name: "cart_id" })
  cart: CartEntity;

  @DeleteDateColumn({ name: "deletedAt" })
  deletedAt: Date;

  @CreateDateColumn({ name: "createdAt" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updatedAt" })
  updatedAt: Date;
}

export type OrderWherePayload = WhereEntityOptions<OrderEntity>;
export type OrderUpdateDataPayload = QueryDeepPartialEntity<OrderEntity>;
export type OrderFindPayload = findManyType<OrderEntity>;
