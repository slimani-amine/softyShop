"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMyProfileController = exports.updateMyProfileControllerBase = void 0;
const logger_1 = require("../../../core/logger/logger");
const updateMyProfile_usecase_1 = require("../../../usecases/api/users/updateMyProfile.usecase");
const updateMyProfileControllerBase = (updateMyProfileUseCase) => async (req, res, next) => {
    var _a;
    try {
        logger_1.logger.log('UPDATE MY PROFILE CONTROLLER', `IN UPDATE MY PROFILE CONTROLLER ID ${(_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id}`);
        const result = await updateMyProfileUseCase(req === null || req === void 0 ? void 0 : req.user, req === null || req === void 0 ? void 0 : req.body);
        res.status(201).send({
            message: 'Your profile has been successfully updated',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.updateMyProfileControllerBase = updateMyProfileControllerBase;
exports.updateMyProfileController = (0, exports.updateMyProfileControllerBase)(updateMyProfile_usecase_1.updateMyProfileUseCase);
//# sourceMappingURL=updateMyProfile.controller.js.map