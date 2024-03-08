import { IWishlistRepository, wishlistRepo } from "../../../data/repositories/wishlist.repository";
export type DeleteWishlistUseCaseType = (params: {
    [id: string]: any;
}) => Promise<{
    success: boolean;
}>;
export declare const deleteWishlistUseCaseBase: (dependencies?: {
    wishlistRepo: IWishlistRepository;
}) => DeleteWishlistUseCaseType;
export declare const deleteWishlistUseCase: DeleteWishlistUseCaseType;
