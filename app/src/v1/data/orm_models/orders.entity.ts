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
import { CartEntity } from "./cart.entity";
import { PaymentMethodEntity } from "./paymentMethod.entity";

@Entity({
  name: "Order",
})
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  address: string;

  @Column({
    type: "date",
  })
  date: Date;

  @Column({
    type: "date",
  })
  estimatedDeliveryDate: Date;

  @ManyToOne(
    () => PaymentMethodEntity,
    (paymentMethod) => paymentMethod.paymentMethods
  )
  @JoinColumn({ name: "paymentMethod_id" })
  paymentMethod: PaymentMethodEntity;

  @Column({
    type: "enum",
    enum: ["processing", "on_delivery", "livered", "cancelled"],
    default: "processing",
  })
  status: string;

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
