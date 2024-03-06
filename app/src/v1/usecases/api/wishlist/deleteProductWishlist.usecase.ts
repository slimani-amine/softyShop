import { exceptionService } from "../../../core/errors/exceptions";
import {
  IWishlistRepository,
  wishlistRepo,
} from "../../../data/repositories/wishlist.repository";

export type DeleteWishlistUseCaseType = (params: {
  [id: string]: any;
}) => Promise<{ success: boolean }>;

export const deleteWishlistUseCaseBase =
  (
    dependencies: {
      wishlistRepo: IWishlistRepository;
    } = {
      wishlistRepo: wishlistRepo,
    }
  ): DeleteWishlistUseCaseType =>
  async (params: { [id: string]: any }) => {
    const wishlist = await dependencies.wishlistRepo.findOne({
      where: { product: { id: params.productId }, user: { id: params.userId } },
    });

    if (!wishlist) {
      exceptionService.notFoundException({
        message: "Wishlist not found",
      });
    }

    const result = await dependencies.wishlistRepo.deleteWishlist(wishlist);

    return {
      success: result === 1,
    };
  };

export const deleteWishlistUseCase: DeleteWishlistUseCaseType =
  deleteWishlistUseCaseBase({
    wishlistRepo,
  });
