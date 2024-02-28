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
  
  @Entity({
    name: 'ProductCreator', 
  })
  export class ProductCreatorEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({
      type: 'varchar',
    })
    name: string;
  
    @Column({
      type: 'varchar',
    })
    nationality: string;
  
    @Column({
      type: 'date',
    })
    dateOfBirth: Date;
  
    @ManyToOne(() => ProductEntity, (product) => product.creator)
    @JoinColumn({ name: 'product_id' })
    product: ProductEntity;
  
    @DeleteDateColumn({ name: 'deletedAt' })
    deletedAt: Date;
  
    @CreateDateColumn({ name: 'createdAt' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updatedAt' })
    updatedAt: Date;
  }
  
  export type ProductCreatorWherePayload = WhereEntityOptions<ProductCreatorEntity>;
  export type ProductCreatorUpdateDataPayload = QueryDeepPartialEntity<ProductCreatorEntity>;
  export type ProductCreatorFindPayload = findManyType<ProductCreatorEntity>;
  