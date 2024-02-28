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
  name: 'Category',
})
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
  })
  name: string;

  @Column({
    type: 'varchar',
  })
  icon: string;

  @ManyToOne(() => ProductEntity, (product) => product.category)
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @DeleteDateColumn({ name: 'deletedAt' })
  deletedAt: Date;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;
}

export type CategoryWherePayload = WhereEntityOptions<CategoryEntity>;
export type CategoryUpdateDataPayload = QueryDeepPartialEntity<CategoryEntity>;
export type CategoryFindPayload = findManyType<CategoryEntity>;