import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { QueryDeepPartialEntity, WhereEntityOptions, findManyType } from '../../../types/repos';
import { ProductEntity } from './product.entity';
import { CartEntity } from './cart.entity';
  
  @Entity({
    name: 'CartProduct',
  })
  export class CartProductEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({
      type: 'int',
    })
    quantity: number;
  
    @ManyToOne(() => ProductEntity, (product) => product.cartProduct)
    @JoinColumn({ name: 'product_id' })
    product: ProductEntity;

    @ManyToOne(() => CartEntity, (cart) => cart.cartProduct)
    @JoinColumn({ name: 'cart_id' })
    cart: CartEntity;
  
    @DeleteDateColumn({ name: 'deletedAt' })
    deletedAt: Date;
  
    @CreateDateColumn({ name: 'createdAt' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updatedAt' })
    updatedAt: Date;
  }
  
  export type CartProductWherePayload = WhereEntityOptions<CartProductEntity>;
  export type CartProductUpdateDataPayload = QueryDeepPartialEntity<CartProductEntity>;
  export type CartProductFindPayload = findManyType<CartProductEntity>;
  