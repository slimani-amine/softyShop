import {
  DataSource,
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  QueryRunner,
} from "typeorm";
import { WishlistEntity } from "../orm_models/wishlist.entity";
import {
  ICreateWishlistInput,
  IWishlist,
  Wishlist,
} from "../../domain/wishlist/wishlist";
import dataSource from "../connection";
import {
  ApiFeatures,
  QueryResult,
} from "../../utils/querying/apiFeatures.util";
import { UserEntity } from "../orm_models/user.entity";
import { ProductEntity } from "../orm_models/product.entity";
import { exceptionService } from "../../core/errors/exceptions";

export const wishlistRepoBase = (dbConnection: DataSource | QueryRunner) => ({
  manager: dbConnection.manager,

  async findOne(findData: FindOneOptions<WishlistEntity>): Promise<IWishlist> {
    const wishlist = await this.manager.findOne(WishlistEntity, findData);
    return this.toDomainWishlist(wishlist);
  },

  async findAll(
    findData: FindManyOptions<WishlistEntity>
  ): Promise<any[]> {
    console.log("🚀 ~ wishlistRepoBase ~ findData:", findData)
    const wishlists = await this.manager.find(WishlistEntity, findData);
    console.log("🚀 ~ wishlistRepoBase ~ wishlists:", wishlists)
    return wishlists;
  },

  async createWishlist(payload: ICreateWishlistInput): Promise<IWishlist> {
    const user = await this.manager.findOne(UserEntity, {
      where: { id: payload.userId },
    });

    if (!user) {
      exceptionService.notFoundException({
        message: "User not found",
      });
    }

    const product = await this.manager.findOne(ProductEntity, {
      where: { id: payload.productId },
    });

    if (!product) {
      exceptionService.notFoundException({
        message: "Product not found",
      });
    }

    const wishlist = this.manager.create(WishlistEntity, {
      user: user,
      product: product,
    } as DeepPartial<WishlistEntity>);

    const result = await this.manager.save(WishlistEntity, wishlist);
    return this.toDomainWishlist(result);
  },

  async deleteWishlist(wishlist: IWishlist): Promise<number> {
    const result = await this.manager.softDelete(WishlistEntity, {
      id: wishlist.id,
    });
    return result !== null ? 1 : 0;
  },

  async findByQuery(queryParams: {
    [key: string]: string;
  }): Promise<QueryResult<IWishlist>> {
    const result = await ApiFeatures.generateSqlQuery(
      dataSource,
      "wishlists",
      queryParams,
      {}
    );
    return {
      docs: this.toDomainWishlists(result.docs),
      meta: result.meta,
    };
  },

  toDomainWishlists(wishlists: WishlistEntity[]): IWishlist[] {
    const domainWishlists = wishlists.map((prismaWishlist) =>
      this.toDomainWishlist(prismaWishlist)
    );
    return domainWishlists;
  },

  toDomainWishlist(prismaWishlist: WishlistEntity): IWishlist {
    if (!prismaWishlist) {
      return null;
    }
    const wishlist = new Wishlist({
      id: prismaWishlist.id,
    });
    return wishlist;
  },
});

export const wishlistRepo = wishlistRepoBase(dataSource);

export interface IWishlistRepository {
  findOne(findData: FindOneOptions<WishlistEntity>): Promise<IWishlist>;
  findAll(findData: FindManyOptions<WishlistEntity>): Promise<any[]>;
  findByQuery(queryParams: {
    [key: string]: string;
  }): Promise<QueryResult<IWishlist>>;
  createWishlist(payload: ICreateWishlistInput): Promise<IWishlist>;
  deleteWishlist(wishlist: IWishlist): Promise<number>;
}
