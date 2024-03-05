"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReviewController = exports.deleteReviewControllerBase = void 0;
const deleteReview_usecase_1 = require("../../../../usecases/api/review/deleteReview.usecase");
const deleteReviewControllerBase = (deleteReviewUseCase) => async (req, res, next) => {
    try {
        const result = await deleteReviewUseCase(req === null || req === void 0 ? void 0 : req.params);
        res.status(200).send({
            message: "success",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.deleteReviewControllerBase = deleteReviewControllerBase;
exports.deleteReviewController = (0, exports.deleteReviewControllerBase)(deleteReview_usecase_1.deleteReviewUseCase);
//# sourceMappingURL=deleteReview.controller.js.map