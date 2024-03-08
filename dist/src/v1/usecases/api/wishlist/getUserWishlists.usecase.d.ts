import { IWishlistRepository, wishlistRepo } from "../../../data/repositories/wishlist.repository";
export type GetWishlistsByUserUseCaseType = (userId: number) => Promise<any[]>;
export declare const getWishlistsByUserUseCaseBase: (dependencies?: {
    wishlistRepo: IWishlistRepository;
}) => GetWishlistsByUserUseCaseType;
export declare const getWishlistsByUserUseCase: GetWishlistsByUserUseCaseType;
