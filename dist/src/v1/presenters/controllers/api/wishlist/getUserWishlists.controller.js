"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWishlistsByUserController = exports.getWishlistsByUserControllerBase = void 0;
const getUserWishlists_usecase_1 = require("../../../../usecases/api/wishlist/getUserWishlists.usecase");
const getWishlistsByUserControllerBase = (getWishlistsByUserUseCase) => async (req, res, next) => {
    try {
        const userId = req.user.id;
        const result = await getWishlistsByUserUseCase(userId);
        res.status(200).send({
            message: "success",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getWishlistsByUserControllerBase = getWishlistsByUserControllerBase;
exports.getWishlistsByUserController = (0, exports.getWishlistsByUserControllerBase)(getUserWishlists_usecase_1.getWishlistsByUserUseCase);
//# sourceMappingURL=getUserWishlists.controller.js.map