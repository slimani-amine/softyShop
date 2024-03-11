"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReviewController = exports.createReviewControllerBase = void 0;
const createReview_usecase_1 = require("../../../../usecases/api/review/createReview.usecase");
const createReviewControllerBase = (createReviewUseCase) => async (req, res, next) => {
    req.body.userId = req.user.id;
    try {
        const result = await createReviewUseCase(req.body);
        res.status(201).send({
            message: "Review created successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.createReviewControllerBase = createReviewControllerBase;
exports.createReviewController = (0, exports.createReviewControllerBase)(createReview_usecase_1.createReviewUseCase);
//# sourceMappingURL=createReview.controller.js.map