import {
  DataSource,
  QueryRunner,
  FindOneOptions,
  FindManyOptions,
  DeepPartial,
} from "typeorm";
import { CartProductEntity } from "../orm_models/cartProduct.entity";
import { ProductEntity } from "../orm_models/product.entity";
import { CartEntity } from "../orm_models/cart.entity";
import { exceptionService } from "../../core/errors/exceptions";
import dataSource from "../connection";
import { cartRepo } from "./cart.repsitory";

export const cartProductRepoBase = (
  dbConnection: DataSource | QueryRunner
) => ({
  manager: dbConnection.manager,

  async findOne(
    findData: FindOneOptions<CartProductEntity>
  ): Promise<CartProductEntity> {
    const cartProduct = await this.manager.findOne(CartProductEntity, findData);
    return cartProduct;
  },

  async findAll(
    findData: FindManyOptions<CartProductEntity>
  ): Promise<CartProductEntity[]> {
    const cartProducts = await this.manager.find(CartProductEntity, findData);
    return cartProducts;
  },

  async createCartProduct(payload: {
    quantity: number;
    productId: string;
    cartId: string;
  }): Promise<CartProductEntity> {
    const product = await this.manager.findOne(ProductEntity, {
      where: { id: payload.productId },
    });

    if (!product) {
      exceptionService.notFoundException({
        message: "Product not found",
      });
    }

    const cart = await this.manager.findOne(CartEntity, {
      where: { id: payload.cartId },
    });

    if (!cart) {
      exceptionService.notFoundException({
        message: "Cart not found",
      });
    }
    const sommeQuantities = payload.quantity * 1 + cart.totalQuantity * 1;
    const sommePrice = product.price * 1 + cart.totalAmount * 1;

    await cartRepo.updateCart(cart, {
      totalQuantity: sommeQuantities,
      totalAmount: sommePrice,
    });

    const cartProduct = this.manager.create(CartProductEntity, {
      quantity: payload.quantity,
      product: product,
      cart: cart,
    } as DeepPartial<CartProductEntity>);

    const result = await this.manager.save(CartProductEntity, cartProduct);
    console.log("🚀 ~ cartProductRepoBase ~ result:", result);
    return result;
  },

  async deleteCartProduct(cartProduct: CartProductEntity): Promise<number> {
    // const sommeQuantities = payload.quantity * 1 + cart.totalQuantity * 1;
    // const sommePrice = product.price * 1 + cart.totalAmount * 1;

    // await cartRepo.updateCart(cart, {
    //   totalQuantity: sommeQuantities,
    //   totalAmount: sommePrice,
    // });
    const result = await this.manager.softDelete(CartProductEntity, {
      id: cartProduct.id,
    });
    return result !== null ? 1 : 0;
  },
});

export const cartProductRepo = cartProductRepoBase(dataSource);

export interface ICartProductRepository {
  findOne(
    findData: FindOneOptions<CartProductEntity>
  ): Promise<CartProductEntity>;
  findAll(
    findData: FindManyOptions<CartProductEntity>
  ): Promise<CartProductEntity[]>;
  createCartProduct(payload: {
    quantity: number;
    productId: string;
    cartId: string;
  }): Promise<CartProductEntity>;
  deleteCartProduct(cartProduct: CartProductEntity): Promise<number>;
}
