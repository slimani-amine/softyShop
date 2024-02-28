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
  import { UserEntity } from './user.entity';
  
  @Entity({
    name: 'PaymentMethod',
  })
  export class PaymentMethodEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({
      type: 'varchar',
    })
    name: string;
    
    @Column({
      type: 'varchar',
    })
    icon: string
  
    @ManyToOne(() => UserEntity, (user) => user.paymentMethods) 
    @JoinColumn({ name: 'admin_id' })
    user: UserEntity;
  
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
  