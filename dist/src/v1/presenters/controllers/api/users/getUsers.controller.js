"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersController = exports.getUsersControllerBase = void 0;
const getUsers_usecase_1 = require("../../../../usecases/api/users/getUsers.usecase");
const getUsersControllerBase = (getUsersUseCase) => async (req, res, next) => {
    try {
        const result = await getUsersUseCase(req === null || req === void 0 ? void 0 : req.query);
        return res.status(200).json({
            message: 'succès',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getUsersControllerBase = getUsersControllerBase;
exports.getUsersController = (0, exports.getUsersControllerBase)(getUsers_usecase_1.getUsersUseCase);
//# sourceMappingURL=getUsers.controller.js.map