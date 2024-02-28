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
  } from 'typeorm';
  import { QueryDeepPartialEntity, WhereEntityOptions, findManyType } from '../../../types/repos';
  import { UserEntity } from './user.entity';
  import { ProductEntity } from './product.entity';
  
  @Entity({
    name: 'Stores', 
  })
  export class StoreEntity {
    @PrimaryGeneratedColumn()
    id: string;
  
    @Column({
      type: 'varchar',
      unique: true,
    })
    storeName: string;

    @Column({
      type: 'varchar',
      unique: true,
    })
    storePhone: string;
  
    @Column({
      type: 'varchar',
    })
    logo: string;
  
    @Column({
      type: 'date',
    })
    foundedAt: Date;
  
    @Column({
      type: 'boolean', 
    })
    isPublished: boolean;
  
    @Column({
      type: 'varchar',
    })
    position: string[];
    
    @Column({
      type: 'varchar',
    })
    socialMediaLinks: string[];
  
    @OneToMany(() => ProductEntity, (product) => product.store)
    products: ProductEntity[];
  
    @ManyToOne(() => UserEntity, (user) => user.store)
    @JoinColumn({ name: 'vendor_id' })
    user: UserEntity;
  
    @DeleteDateColumn({ name: 'deletedAt' })
    deletedAt: Date;
  
    @CreateDateColumn({ name: 'createdAt' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updatedAt' })
    updatedAt: Date;
  }

  
  export type StoresWherePayload = WhereEntityOptions<StoreEntity>;
  export type StoresUpdateDataPayload = QueryDeepPartialEntity<StoreEntity>;
  export type StoresFindPayload = findManyType<StoreEntity>;
  