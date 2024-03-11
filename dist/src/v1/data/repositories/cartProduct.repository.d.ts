import { DataSource, QueryRunner, FindOneOptions, FindManyOptions } from "typeorm";
import { CartProductEntity } from "../orm_models/cartProduct.entity";
export declare const cartProductRepoBase: (dbConnection: DataSource | QueryRunner) => {
    manager: import("typeorm").EntityManager;
    findOne(findData: FindOneOptions<CartProductEntity>): Promise<CartProductEntity>;
    findAll(findData: FindManyOptions<CartProductEntity>): Promise<CartProductEntity[]>;
    createCartProduct(payload: {
        quantity: number;
        productId: string;
        cartId: string;
    }): Promise<CartProductEntity>;
    deleteCartProduct(cartProduct: CartProductEntity): Promise<number>;
    updateCartProduct(cartProduct: CartProductEntity, payload: Partial<CartProductEntity>): Promise<any>;
};
export declare const cartProductRepo: {
    manager: import("typeorm").EntityManager;
    findOne(findData: FindOneOptions<CartProductEntity>): Promise<CartProductEntity>;
    findAll(findData: FindManyOptions<CartProductEntity>): Promise<CartProductEntity[]>;
    createCartProduct(payload: {
        quantity: number;
        productId: string;
        cartId: string;
    }): Promise<CartProductEntity>;
    deleteCartProduct(cartProduct: CartProductEntity): Promise<number>;
    updateCartProduct(cartProduct: CartProductEntity, payload: Partial<CartProductEntity>): Promise<any>;
};
export interface ICartProductRepository {
    findOne(findData: FindOneOptions<CartProductEntity>): Promise<CartProductEntity>;
    findAll(findData: FindManyOptions<CartProductEntity>): Promise<CartProductEntity[]>;
    createCartProduct(payload: {
        quantity: number;
        productId: string;
        cartId: string;
    }): Promise<CartProductEntity>;
    deleteCartProduct(cartProduct: CartProductEntity): Promise<number>;
    updateCartProduct(cartProduct: CartProductEntity, payload: Partial<CartProductEntity>): Promise<any>;
}
