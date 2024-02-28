import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { QueryDeepPartialEntity, findManyType, WhereEntityOptions } from '../../../types/repos';

@Entity({
  name: 'ResetPasswords',
})
export class ResetPasswordEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
  })
  token: string;

  @Column({
    type: 'int',
  })
  user_id: number;

  @ManyToOne(() => UserEntity, (user) => user.resetPasswords)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({
    type: 'datetime',
  })
  expirationDate: Date;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;
}
export type ResetPasswordWherePayload = WhereEntityOptions<ResetPasswordEntity>;
export type ResetPasswordUpadteDataPayload = QueryDeepPartialEntity<ResetPasswordEntity>;
export type ResetPasswordFindPayload = findManyType<ResetPasswordEntity>;
