import { productRepo } from "../../../data/repositories/product.repository";
import {
  IWishlistRepository,
  wishlistRepo,
} from "../../../data/repositories/wishlist.repository";

export type GetWishlistsByUserUseCaseType = (userId: number) => Promise<any[]>;

export const getWishlistsByUserUseCaseBase =
  (
    dependencies: {
      wishlistRepo: IWishlistRepository;
    } = {
      wishlistRepo: wishlistRepo,
    }
  ): GetWishlistsByUserUseCaseType =>
  async (userId: number) => {
    const wishlists = await dependencies.wishlistRepo.findAll({
      relations: {
        product: true,
        user: true,
      },
      where: {
        user: { id: userId },
      },
    });

    const wishlistProducts = wishlists.map((wishlist) => {
      return wishlist.product;
    });

    return wishlistProducts;
  };

export const getWishlistsByUserUseCase: GetWishlistsByUserUseCaseType =
  getWishlistsByUserUseCaseBase({
    wishlistRepo,
  });
