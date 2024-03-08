import {
  DataSource,
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  QueryRunner,
} from "typeorm";
import { CartEntity } from "../orm_models/cart.entity";
import { ICart, Cart } from "../../domain/cart/cart";
import dataSource from "../connection";
import {
  ApiFeatures,
  QueryResult,
} from "../../utils/querying/apiFeatures.util";
import { exceptionService } from "../../core/errors/exceptions";

export const cartRepoBase = (dbConnection: DataSource | QueryRunner) => ({
  manager: dbConnection.manager,

  async findOne(findData: FindOneOptions<CartEntity>): Promise<ICart> {
    const cart = await this.manager.findOne(CartEntity, findData);
    console.log("🚀 ~ findOne ~ cart:", cart);
    return this.toDomainCart(cart);
  },

  async findAll(findData: FindManyOptions<CartEntity>): Promise<any[]> {
    const carts = await this.manager.find(CartEntity, findData);
    return carts;
  },

  async createCart(): Promise<ICart> {
    const cart = this.manager.create(CartEntity);

    const result = await this.manager.save(CartEntity, cart);
    return this.toDomainCart(result);
  },

  async deleteCart(cart: ICart): Promise<number> {
    const result = await this.manager.softDelete(CartEntity, {
      id: cart.id,
    });
    return result !== null ? 1 : 0;
  },

  async findByQuery(queryParams: {
    [key: string]: string;
  }): Promise<QueryResult<ICart>> {
    const result = await ApiFeatures.generateSqlQuery(
      dataSource,
      "cart",
      queryParams,
      {}
    );
    return {
      docs: this.toDomainCarts(result.docs),
      meta: result.meta,
    };
  },

  async updateCart(
    cart: CartEntity,
    payload: Partial<CartEntity>
  ): Promise<ICart> {
    await this.manager.update(
      CartEntity,
      {
        id: cart.id,
      },
      payload
    );
    const updatedCart = await this.manager.findOne(CartEntity, {
      where: {
        id: cart.id,
      },
    });
    return this.toDomainCart(updatedCart);
  },

  toDomainCarts(carts: CartEntity[]): ICart[] {
    const domainCarts = carts.map((prismaCart) =>
      this.toDomainCart(prismaCart)
    );
    return domainCarts;
  },

  toDomainCart(prismaCart: CartEntity): ICart {
    if (!prismaCart) {
      return null;
    }
    const cart = new Cart({
      id: prismaCart.id,
      totalQuantity: prismaCart.totalQuantity,
      totalAmount: prismaCart.totalAmount,
      cartProducts: prismaCart.cartProducts,
    });
    return cart;
  },
});

export const cartRepo = cartRepoBase(dataSource);

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
