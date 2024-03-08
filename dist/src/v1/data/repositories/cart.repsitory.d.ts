import { DataSource, FindManyOptions, FindOneOptions, QueryRunner } from "typeorm";
import { CartEntity } from "../orm_models/cart.entity";
import { ICart } from "../../domain/cart/cart";
import { QueryResult } from "../../utils/querying/apiFeatures.util";
export declare const cartRepoBase: (dbConnection: DataSource | QueryRunner) => {
    manager: import("typeorm").EntityManager;
    findOne(findData: FindOneOptions<CartEntity>): Promise<ICart>;
    findAll(findData: FindManyOptions<CartEntity>): Promise<any[]>;
    createCart(): Promise<ICart>;
    deleteCart(cart: ICart): Promise<number>;
    findByQuery(queryParams: {
        [key: string]: string;
    }): Promise<QueryResult<ICart>>;
    updateCart(cart: CartEntity, payload: Partial<CartEntity>): Promise<ICart>;
    toDomainCarts(carts: CartEntity[]): ICart[];
    toDomainCart(prismaCart: CartEntity): ICart;
};
export declare const cartRepo: {
    manager: import("typeorm").EntityManager;
    findOne(findData: FindOneOptions<CartEntity>): Promise<ICart>;
    findAll(findData: FindManyOptions<CartEntity>): Promise<any[]>;
    createCart(): Promise<ICart>;
    deleteCart(cart: ICart): Promise<number>;
    findByQuery(queryParams: {
        [key: string]: string;
    }): Promise<QueryResult<ICart>>;
    updateCart(cart: CartEntity, payload: Partial<CartEntity>): Promise<ICart>;
    toDomainCarts(carts: CartEntity[]): ICart[];
    toDomainCart(prismaCart: CartEntity): ICart;
};
export interface ICartRepository {
    findOne(findData: FindOneOptions<CartEntity>): Promise<ICart>;
    findAll(findData: FindManyOptions<CartEntity>): Promise<any[]>;
    findByQuery(queryParams: {
        [key: string]: string;
    }): Promise<QueryResult<ICart>>;
    createCart(): Promise<ICart>;
    deleteCart(cart: ICart): Promise<number>;
    updateCart(cart: CartEntity, payload: Partial<CartEntity>): Promise<ICart>;
}
