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
  name: 'SocialMediaLinks',
})
export class SocialMediaLinksEntity {
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

  @Column({
    type: 'varchar',
  })
  link: string;

  @ManyToOne(() => UserEntity, (user) => user.socialMediaLinks)
  @JoinColumn({ name: 'admin_id' })
  user: UserEntity;

  @DeleteDateColumn({ name: 'deletedAt' })
  deletedAt: Date;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;
}

export type socialMediaLinksWherePayload = WhereEntityOptions<SocialMediaLinksEntity>;
export type socialMediaLinksUpdateDataPayload = QueryDeepPartialEntity<SocialMediaLinksEntity>;
export type socialMediaLinksFindPayload = findManyType<SocialMediaLinksEntity>;
