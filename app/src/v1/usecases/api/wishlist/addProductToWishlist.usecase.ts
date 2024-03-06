import {
  ICreateWishlistInput,
  IWishlist,
} from "../../../domain/wishlist/wishlist";
import { trimAndValidateSchemaPayload } from "../../../utils/validation/validate.schema";
import createWishlistSchema from "../../../presenters/schemas/wishlist/createWishlist.schema";
import {
  IWishlistRepository,
  wishlistRepo,
} from "../../../data/repositories/wishlist.repository";
import { exceptionService } from "../../../core/errors/exceptions";

export type CreateWishlistUseCaseType = (
  payload: ICreateWishlistInput
) => Promise<{ wishlist: IWishlist }>;

export const createWishlistUseCaseBase =
  (
    dependencies: {
      wishlistRepo: IWishlistRepository;
    } = {
      wishlistRepo: wishlistRepo,
    }
  ): CreateWishlistUseCaseType =>
  async (payload: ICreateWishlistInput) => {
    validateCreateWishlistPayload(payload);

    const wishlistAlsoCreated = await wishlistRepo.findAll({
      where: {
        product: { id: payload.productId },
      },
    });

    if (wishlistAlsoCreated.length > 0) {
      exceptionService.notFoundException({
        message: "This product Already in the wishlist ",
      });
    }

    const wishlistCreated = await dependencies.wishlistRepo.createWishlist({
      userId: payload.userId,
      productId: payload.productId,
    });

    return {
      wishlist: wishlistCreated,
    };
  };

export function validateCreateWishlistPayload(
  payload: ICreateWishlistInput
): ICreateWishlistInput {
  trimAndValidateSchemaPayload<ICreateWishlistInput>(
    createWishlistSchema,
    payload
  );
  return payload;
}

export const createWishlistUseCase: CreateWishlistUseCaseType =
  createWishlistUseCaseBase();
