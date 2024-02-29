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
  import { UserEntity } from './user.entity';
import { CartEntity } from './cart.entity';
  
  @Entity({
    name: 'PaymentMethod',
  })
  export class PaymentMethodEntity {
    @PrimaryGeneratedColumn()
    id: string;
  
    @Column({
      type: 'varchar',
    })
    name: string;
    
    @Column({
      type: 'varchar',
    })
    icon: string

    @OneToMany(() => CartEntity, (cart) => cart.paymentMethod)
    paymentMethods: CartEntity[];
  
    @DeleteDateColumn({ name: 'deletedAt' })
    deletedAt: Date;
  
    @CreateDateColumn({ name: 'createdAt' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updatedAt' })
    updatedAt: Date;
  }
  
  export type PaymentMethodWherePayload = WhereEntityOptions<PaymentMethodEntity>; 
  export type PaymentMethodUpdateDataPayload = QueryDeepPartialEntity<PaymentMethodEntity>;
  export type PaymentMethodFindPayload = findManyType<PaymentMethodEntity>;
  