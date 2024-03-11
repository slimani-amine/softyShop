"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAddressController = exports.createAddressControllerBase = void 0;
const createAddresse_usecase_1 = require("../../../../usecases/api/addresses/createAddresse.usecase");
const createAddressControllerBase = (createAddressUseCase) => async (req, res, next) => {
    req.body.user_id = req.user.id;
    try {
        const result = await createAddressUseCase(req === null || req === void 0 ? void 0 : req.body);
        return res.status(201).json({
            message: "Address added successfully",
            data: {
                address: result.address,
            },
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createAddressControllerBase = createAddressControllerBase;
const createAddressController = createAddressControllerBase(createAddresse_usecase_1.createAddressUseCase);
exports.createAddressController = createAddressController;
//# sourceMappingURL=createAddresse.controller.js.map