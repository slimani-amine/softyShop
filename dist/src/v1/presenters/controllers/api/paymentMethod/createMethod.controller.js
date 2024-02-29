"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMethodController = exports.createMethodControllerBase = void 0;
const createMethod_usecase_1 = require("../../../../usecases/api/paymentMethod/createMethod.usecase");
const createMethodControllerBase = (createMethodUseCase) => async (req, res, next) => {
    try {
        const result = await createMethodUseCase(req.body);
        res.status(201).send({
            message: "Method created successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.createMethodControllerBase = createMethodControllerBase;
exports.createMethodController = (0, exports.createMethodControllerBase)(createMethod_usecase_1.createMethodUseCase);
//# sourceMappingURL=createMethod.controller.js.map