import { ICreateWishlistInput, IWishlist } from "../../../domain/wishlist/wishlist";
import { IWishlistRepository, wishlistRepo } from "../../../data/repositories/wishlist.repository";
export type CreateWishlistUseCaseType = (payload: ICreateWishlistInput) => Promise<{
    wishlist: IWishlist;
}>;
export declare const createWishlistUseCaseBase: (dependencies?: {
    wishlistRepo: IWishlistRepository;
}) => CreateWishlistUseCaseType;
export declare function validateCreateWishlistPayload(payload: ICreateWishlistInput): ICreateWishlistInput;
export declare const createWishlistUseCase: CreateWishlistUseCaseType;
