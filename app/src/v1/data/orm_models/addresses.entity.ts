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
import { OrderEntity } from "./orders.entity";

@Entity({
  name: "Addresses",
})
export class AddressesEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    type: "varchar",
  })
  address: string;

  @Column({
    type: "varchar",
  })
  phoneNumber: string;

  @Column({
    type: "varchar",
  })
  city: string;

  @Column({
    type: "varchar",
  })
  state: string;

  @Column({
    type: "int",
  })
  zipCode: number;

  @ManyToOne(() => UserEntity, (user) => user.addresses)
  @JoinColumn({ name: "user_id" })
  user: UserEntity;

  @OneToMany(() => OrderEntity, (cart) => cart.paymentMethod)
  order: OrderEntity[];

  @DeleteDateColumn({ name: "deletedAt" })
  deletedAt: Date;

  @CreateDateColumn({ name: "createdAt" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updatedAt" })
  updatedAt: Date;
}

export type AddressesWherePayload = WhereEntityOptions<AddressesEntity>;
export type AddressesUpdateDataPayload =
  QueryDeepPartialEntity<AddressesEntity>;
export type AddressesFindPayload = findManyType<AddressesEntity>;
