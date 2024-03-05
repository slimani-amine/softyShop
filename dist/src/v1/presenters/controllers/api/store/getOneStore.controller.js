"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneStoreController = exports.getOneStoreControllerBase = void 0;
const getOneStore_usecase_1 = require("../../../../usecases/api/store/getOneStore.usecase");
const getOneStoreControllerBase = (getOneStoreUseCase) => async (req, res, next) => {
    try {
        const result = await getOneStoreUseCase(req === null || req === void 0 ? void 0 : req.params);
        res.status(200).send({
            message: "success",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getOneStoreControllerBase = getOneStoreControllerBase;
exports.getOneStoreController = (0, exports.getOneStoreControllerBase)(getOneStore_usecase_1.getOneStoreUseCase);
//# sourceMappingURL=getOneStore.controller.js.map