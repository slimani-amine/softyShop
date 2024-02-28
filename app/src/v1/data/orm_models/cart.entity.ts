import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { QueryDeepPartialEntity, WhereEntityOptions, findManyType } from '../../../types/repos';

import { CartProductEntity } from './cartProduct.entity';
import { OrderEntity } from './orders.entity';

@Entity({
  name: 'Cart',
})
export class CartEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
  })
  totalQuantity: number;

  @Column({
    type: 'int',
  })
  totalAmount: number;

  @Column()
  address: string;

  @Column({
    type: 'enum',
    enum: ['credit_cart', 'on_delivery'],
  })
  paymentMethod: string;

  @Column({
    type: 'date',
  })
  date: Date;

  @Column({
    type: 'date',
  })
  estimatedDeliveryDate: Date;

  @OneToMany(() => CartProductEntity, (wishlist) => wishlist.product)
  cartProduct: CartProductEntity[];

  @OneToMany(() => OrderEntity, (order) => order.cart)
  order: OrderEntity[];

  @DeleteDateColumn({ name: 'deletedAt' })
  deletedAt: Date;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;
}

export type CartWherePayload = WhereEntityOptions<CartEntity>;
export type CartUpdateDataPayload = QueryDeepPartialEntity<CartEntity>;
export type CartFindPayload = findManyType<CartEntity>;
