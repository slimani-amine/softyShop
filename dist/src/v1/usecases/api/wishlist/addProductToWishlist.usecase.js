"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWishlistUseCase = exports.validateCreateWishlistPayload = exports.createWishlistUseCaseBase = void 0;
const validate_schema_1 = require("../../../utils/validation/validate.schema");
const createWishlist_schema_1 = require("../../../presenters/schemas/wishlist/createWishlist.schema");
const exceptions_1 = require("../../../core/errors/exceptions");
const wishlist_repository_1 = require("../../../data/repositories/wishlist.repository");
const createWishlistUseCaseBase = (dependencies = {
    wishlistRepo: wishlist_repository_1.wishlistRepo,
}) => async (payload) => {
    validateCreateWishlistPayload(payload);
    const wishlistAlsoCreated = await wishlist_repository_1.wishlistRepo.findAll({
        where: {
            product: { id: payload.productId },
        },
    });
    if (wishlistAlsoCreated.length > 0) {
        exceptions_1.exceptionService.notFoundException({
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
exports.createWishlistUseCaseBase = createWishlistUseCaseBase;
function validateCreateWishlistPayload(payload) {
    (0, validate_schema_1.trimAndValidateSchemaPayload)(createWishlist_schema_1.default, payload);
    return payload;
}
exports.validateCreateWishlistPayload = validateCreateWishlistPayload;
exports.createWishlistUseCase = (0, exports.createWishlistUseCaseBase)();
//# sourceMappingURL=addProductToWishlist.usecase.js.map