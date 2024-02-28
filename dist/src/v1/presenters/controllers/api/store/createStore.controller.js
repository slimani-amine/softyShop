"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStoreController = exports.createStoreControllerBase = void 0;
const createStore_usecase_1 = require("../../../../usecases/api/store/createStore.usecase");
const createStoreControllerBase = (createStoreUseCase) => async (req, res, next) => {
    try {
        const result = await createStoreUseCase(req === null || req === void 0 ? void 0 : req.body);
        return res.status(201).json({
            message: 'boutique ajouter avec succès',
            data: {
                store: result.store,
            },
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createStoreControllerBase = createStoreControllerBase;
const createStoreController = createStoreControllerBase(createStore_usecase_1.createStoreUseCase);
exports.createStoreController = createStoreController;
//# sourceMappingURL=createStore.controller.js.map