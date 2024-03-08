"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWishlistUseCase = exports.deleteWishlistUseCaseBase = void 0;
const exceptions_1 = require("../../../core/errors/exceptions");
const wishlist_repository_1 = require("../../../data/repositories/wishlist.repository");
const deleteWishlistUseCaseBase = (dependencies = {
    wishlistRepo: wishlist_repository_1.wishlistRepo,
}) => async (params) => {
    const wishlist = await dependencies.wishlistRepo.findOne({
        where: { product: { id: params.productId }, user: { id: params.userId } },
    });
    if (!wishlist) {
        exceptions_1.exceptionService.notFoundException({
            message: "Wishlist not found",
        });
    }
    const result = await dependencies.wishlistRepo.deleteWishlist(wishlist);
    return {
        success: result === 1,
    };
};
exports.deleteWishlistUseCaseBase = deleteWishlistUseCaseBase;
exports.deleteWishlistUseCase = (0, exports.deleteWishlistUseCaseBase)({
    wishlistRepo: wishlist_repository_1.wishlistRepo,
});
//# sourceMappingURL=deleteProductWishlist.usecase.js.map