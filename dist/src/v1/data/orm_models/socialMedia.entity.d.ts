import { QueryDeepPartialEntity, WhereEntityOptions, findManyType } from '../../../types/repos';
import { UserEntity } from './user.entity';
import { StoreEntity } from './store.entity';
export declare class SocialMediaLinksEntity {
    id: string;
    name: string;
    icon: string;
    link: string;
    user: UserEntity;
    store: StoreEntity;
    deletedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
export type socialMediaLinksWherePayload = WhereEntityOptions<SocialMediaLinksEntity>;
export type socialMediaLinksUpdateDataPayload = QueryDeepPartialEntity<SocialMediaLinksEntity>;
export type socialMediaLinksFindPayload = findManyType<SocialMediaLinksEntity>;
