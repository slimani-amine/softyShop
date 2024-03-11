import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import {
  QueryDeepPartialEntity,
  WhereEntityOptions,
  findManyType,
} from "../../../types/repos";
import { OrderEntity } from "./orders.entity";

@Entity({
  name: "PaymentMethods",
})
export class PaymentMethodEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    type: "varchar",
  })
  name: string;

  @OneToMany(() => OrderEntity, (cart) => cart.paymentMethod)
  order: OrderEntity[];

  @DeleteDateColumn({ name: "deletedAt" })
  deletedAt: Date;

  @CreateDateColumn({ name: "createdAt" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updatedAt" })
  updatedAt: Date;
}

export type PaymentMethodWherePayload = WhereEntityOptions<PaymentMethodEntity>;
export type PaymentMethodUpdateDataPayload =
  QueryDeepPartialEntity<PaymentMethodEntity>;
export type PaymentMethodFindPayload = findManyType<PaymentMethodEntity>;
