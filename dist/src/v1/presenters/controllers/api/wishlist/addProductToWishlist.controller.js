"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWishlistController = exports.createWishlistControllerBase = void 0;
const addProductToWishlist_usecase_1 = require("../../../../usecases/api/wishlist/addProductToWishlist.usecase");
const createWishlistControllerBase = (createWishlistUseCase) => async (req, res, next) => {
    try {
        req.body.userId = req.params.userId;
        const result = await createWishlistUseCase(req.body);
        res.status(201).send({
            message: "Wishlist created successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.createWishlistControllerBase = createWishlistControllerBase;
exports.createWishlistController = (0, exports.createWishlistControllerBase)(addProductToWishlist_usecase_1.createWishlistUseCase);
//# sourceMappingURL=addProductToWishlist.controller.js.map