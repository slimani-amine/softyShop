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
  name: 'Brand',
})
export class BrandEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
  })
  name: string;

  @ManyToOne(() => ProductEntity, (product) => product.brand)
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @DeleteDateColumn({ name: 'deletedAt' })
  deletedAt: Date;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;
}

export type BrandWherePayload = WhereEntityOptions<BrandEntity>;
export type BrandUpdateDataPayload = QueryDeepPartialEntity<BrandEntity>;
export type BrandFindPayload = findManyType<BrandEntity>;
