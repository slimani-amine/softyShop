"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneAddressController = exports.getOneAddressControllerBase = void 0;
const getOneAdresse_usecase_1 = require("../../../../usecases/api/addresses/getOneAdresse.usecase");
const getOneAddressControllerBase = (getOneAddressUseCase) => async (req, res, next) => {
    try {
        const result = await getOneAddressUseCase(req === null || req === void 0 ? void 0 : req.params);
        res.status(200).send({
            message: 'Success',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getOneAddressControllerBase = getOneAddressControllerBase;
exports.getOneAddressController = (0, exports.getOneAddressControllerBase)(getOneAdresse_usecase_1.getOneAddressUseCase);
//# sourceMappingURL=getOneAddresse.controller.js.map