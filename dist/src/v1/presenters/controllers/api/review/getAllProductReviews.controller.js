"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProductReviewsController = exports.getAllProductReviewsControllerBase = void 0;
const getAllProductReviews_usecase_1 = require("../../../../usecases/api/review/getAllProductReviews.usecase");
const getAllProductReviewsControllerBase = (getAllProductReviewsUseCase) => async (req, res, next) => {
    try {
        const productId = req.params.id;
        const result = await getAllProductReviewsUseCase(productId);
        res.status(200).send({
            message: "success",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getAllProductReviewsControllerBase = getAllProductReviewsControllerBase;
exports.getAllProductReviewsController = (0, exports.getAllProductReviewsControllerBase)(getAllProductReviews_usecase_1.getAllProductReviewsUseCase);
//# sourceMappingURL=getAllProductReviews.controller.js.map