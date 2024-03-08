import { DataSource, FindManyOptions, FindOneOptions, QueryRunner } from "typeorm";
import { WishlistEntity } from "../orm_models/wishlist.entity";
import { ICreateWishlistInput, IWishlist } from "../../domain/wishlist/wishlist";
import { QueryResult } from "../../utils/querying/apiFeatures.util";
export declare const wishlistRepoBase: (dbConnection: DataSource | QueryRunner) => {
    manager: import("typeorm").EntityManager;
    findOne(findData: FindOneOptions<WishlistEntity>): Promise<IWishlist>;
    findAll(findData: FindManyOptions<WishlistEntity>): Promise<any[]>;
    createWishlist(payload: ICreateWishlistInput): Promise<IWishlist>;
    deleteWishlist(wishlist: IWishlist): Promise<number>;
    findByQuery(queryParams: {
        [key: string]: string;
    }): Promise<QueryResult<IWishlist>>;
    toDomainWishlists(wishlists: WishlistEntity[]): IWishlist[];
    toDomainWishlist(prismaWishlist: WishlistEntity): IWishlist;
};
export declare const wishlistRepo: {
    manager: import("typeorm").EntityManager;
    findOne(findData: FindOneOptions<WishlistEntity>): Promise<IWishlist>;
    findAll(findData: FindManyOptions<WishlistEntity>): Promise<any[]>;
    createWishlist(payload: ICreateWishlistInput): Promise<IWishlist>;
    deleteWishlist(wishlist: IWishlist): Promise<number>;
    findByQuery(queryParams: {
        [key: string]: string;
    }): Promise<QueryResult<IWishlist>>;
    toDomainWishlists(wishlists: WishlistEntity[]): IWishlist[];
    toDomainWishlist(prismaWishlist: WishlistEntity): IWishlist;
};
export interface IWishlistRepository {
    findOne(findData: FindOneOptions<WishlistEntity>): Promise<IWishlist>;
    findAll(findData: FindManyOptions<WishlistEntity>): Promise<any[]>;
    findByQuery(queryParams: {
        [key: string]: string;
    }): Promise<QueryResult<IWishlist>>;
    createWishlist(payload: ICreateWishlistInput): Promise<IWishlist>;
    deleteWishlist(wishlist: IWishlist): Promise<number>;
}
