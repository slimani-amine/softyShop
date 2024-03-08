"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWishlistsByUserUseCase = exports.getWishlistsByUserUseCaseBase = void 0;
const wishlist_repository_1 = require("../../../data/repositories/wishlist.repository");
const getWishlistsByUserUseCaseBase = (dependencies = {
    wishlistRepo: wishlist_repository_1.wishlistRepo,
}) => async (userId) => {
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
exports.getWishlistsByUserUseCaseBase = getWishlistsByUserUseCaseBase;
exports.getWishlistsByUserUseCase = (0, exports.getWishlistsByUserUseCaseBase)({
    wishlistRepo: wishlist_repository_1.wishlistRepo,
});
//# sourceMappingURL=getUserWishlists.usecase.js.map