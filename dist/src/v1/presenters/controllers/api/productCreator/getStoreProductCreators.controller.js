"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStoreProductCreatorController = exports.getStoreProductCreatorControllerBase = void 0;
const getStoreProductCreators_usecase_1 = require("../../../../usecases/api/productCreator/getStoreProductCreators.usecase");
const getStoreProductCreatorControllerBase = (getStoreProductCreatorUseCase) => async (req, res, next) => {
    const storeId = req.params.id;
    try {
        const result = await getStoreProductCreatorUseCase({ storeId });
        res.status(200).send({
            message: "Success",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getStoreProductCreatorControllerBase = getStoreProductCreatorControllerBase;
exports.getStoreProductCreatorController = (0, exports.getStoreProductCreatorControllerBase)(getStoreProductCreators_usecase_1.getStoreProductCreatorUseCase);
//# sourceMappingURL=getStoreProductCreators.controller.js.map