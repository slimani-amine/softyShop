"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeUserRoleController = exports.changeUserRoleControllerBase = void 0;
const logger_1 = require("../../../../core/logger/logger");
const changeUserRole_usecase_1 = require("../../../../usecases/api/users/changeUserRole.usecase");
const changeUserRoleControllerBase = (changeUserRoleUseCase) => async (req, res, next) => {
    const userId = req.params.id;
    if (!userId)
        return;
    try {
        logger_1.logger.log("CHANGE USER ROLE", `UPDATE USER ${userId}`);
        const result = await changeUserRoleUseCase(userId, req === null || req === void 0 ? void 0 : req.body);
        res.status(201).send({
            message: "Your profile has been successfully updated",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.changeUserRoleControllerBase = changeUserRoleControllerBase;
exports.changeUserRoleController = (0, exports.changeUserRoleControllerBase)(changeUserRole_usecase_1.changeUserRoleUseCase);
//# sourceMappingURL=changeUserRole.controller.js.map