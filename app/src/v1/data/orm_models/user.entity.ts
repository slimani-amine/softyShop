import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { QueryDeepPartialEntity, WhereEntityOptions, findManyType } from '../../../types/repos';
import { StoreEntity } from './store.entity';
import { PaymentMethodEntity } from './paymentMethod.entity';
import { AddressesEntity } from './addresses.entity';
import { ReviewsEntity } from './reviews.entity';
import { WishlistEntity } from './wishlist.entity';
import { CartEntity } from './cart.entity';
import { ResetPasswordEntity } from './resetpassword.entity';
import { SocialMediaLinksEntity } from './socialMedia.entity';

@Entity({
  name: 'Users',
})
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
  })
  username: string;

  @Column({
    type: 'varchar',
  })
  password: string;

  @Column({
    type: 'enum',
    enum: ['admin', 'vendor', 'user'],
  })
  role: string;

  @Column()
  phoneNumber: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  confirmation_token: string;

  @Column({
    type: 'varchar',
  })
  picture: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  confirmed_email: boolean;

  @Column({
    type: 'boolean',
    default: true,
  })
  isVerified: boolean;

  @OneToMany(() => ResetPasswordEntity, (resetPassword) => resetPassword.user)
  resetPasswords: ResetPasswordEntity[];

  @OneToMany(() => PaymentMethodEntity, (paymentMethod) => paymentMethod.user)
  paymentMethods: PaymentMethodEntity[];

  @OneToMany(() => SocialMediaLinksEntity, (socialMediaLinks) => socialMediaLinks.user)
  socialMediaLinks: SocialMediaLinksEntity[];

  @OneToMany(() => AddressesEntity, (address) => address.user)
  addresses: AddressesEntity[];

  @OneToMany(() => StoreEntity, (store) => store.user)
  store: StoreEntity[];

  @OneToMany(() => ReviewsEntity, (review) => review.user)
  reviews: ReviewsEntity[];

  @OneToMany(() => WishlistEntity, (wishlist) => wishlist.user)
  wishlist: WishlistEntity[];

  @OneToOne(() => CartEntity)
  @JoinColumn()
  cart: CartEntity;

  @DeleteDateColumn({ name: 'deletedAt' })
  deletedAt: Date;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;
}

export type UsersWherePayload = WhereEntityOptions<UserEntity>;
export type UsersUpdateDataPayload = QueryDeepPartialEntity<UserEntity>;
export type UsersFindPayload = findManyType<UserEntity>;
