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
import { ProductEntity } from './product.entity';
  
  @Entity({
    name: 'Reviews',
  })
  export class ReviewsEntity {
    @PrimaryGeneratedColumn()
    id: string;
  
    @Column({
      type: 'varchar',
    })
    review: string;
  
    @Column({
      type: 'int',
    })
    rating: number;
  
    @ManyToOne(() => UserEntity, (user) => user.reviews)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @ManyToOne(() => ProductEntity, (product) => product.review)
    @JoinColumn({ name: 'product_id' })
    product: ProductEntity;
  
    @DeleteDateColumn({ name: 'deletedAt' })
    deletedAt: Date;
  
    @CreateDateColumn({ name: 'createdAt' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updatedAt' })
    updatedAt: Date;
  }
  
  export type ReviewsWherePayload = WhereEntityOptions<ReviewsEntity>;
  export type ReviewsUpdateDataPayload = QueryDeepPartialEntity<ReviewsEntity>;
  export type ReviewsFindPayload = findManyType<ReviewsEntity>;
  