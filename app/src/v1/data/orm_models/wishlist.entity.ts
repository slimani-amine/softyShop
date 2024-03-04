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
  name: 'Wishlist',
})
export class WishlistEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.reviews)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => ProductEntity, (product) => product.reviews)
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @DeleteDateColumn({ name: 'deletedAt' })
  deletedAt: Date;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;
}

export type WishlistWherePayload = WhereEntityOptions<WishlistEntity>;
export type WishlistUpdateDataPayload = QueryDeepPartialEntity<WishlistEntity>;
export type WishlistFindPayload = findManyType<WishlistEntity>;
