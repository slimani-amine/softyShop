"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWishlistController = exports.deleteWishlistControllerBase = void 0;
const deleteProductWishlist_usecase_1 = require("../../../../usecases/api/wishlist/deleteProductWishlist.usecase");
const deleteWishlistControllerBase = (deleteWishlistUseCase) => async (req, res, next) => {
    try {
        const result = await deleteWishlistUseCase(req === null || req === void 0 ? void 0 : req.params);
        res.status(200).send({
            message: "success",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.deleteWishlistControllerBase = deleteWishlistControllerBase;
exports.deleteWishlistController = (0, exports.deleteWishlistControllerBase)(deleteProductWishlist_usecase_1.deleteWishlistUseCase);
//# sourceMappingURL=deleteProductWishlist.controller.js.map