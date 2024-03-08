"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMeController = exports.getMeControllerBase = void 0;
const logger_1 = require("../../../core/logger/logger");
const getMyProfile_usecase_1 = require("../../../usecases/api/users/getMyProfile.usecase");
const getMeControllerBase = (getMyProfileUseCase) => async (req, res, next) => {
    var _a;
    try {
        logger_1.logger.log('GET ME CONTROLLER', `IN GET ME CONTROLLER ID ${(_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id}`);
        const result = await getMyProfileUseCase(req === null || req === void 0 ? void 0 : req.user);
        res.status(200).send({
            message: 'success',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getMeControllerBase = getMeControllerBase;
exports.getMeController = (0, exports.getMeControllerBase)(getMyProfile_usecase_1.getMyProfileUseCase);
//# sourceMappingURL=getMe.controller.js.map