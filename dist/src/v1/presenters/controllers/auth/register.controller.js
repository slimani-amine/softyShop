"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionalRegisterController = exports.registerController = exports.registerControllerBase = void 0;
const register_usecase_1 = require("../../../usecases/auth/register.usecase");
const transactional_controller_1 = require("../../middlewares/controllers/transactional.controller");
const users_repository_1 = require("../../../data/repositories/users.repository");
const requestAccountVerification_usecase_1 = require("../../../usecases/auth/requestAccountVerification.usecase");
const createUserTokens_usecase_1 = require("../../../usecases/auth/createUserTokens.usecase");
const registerControllerBase = (registerUserCase) => async (req, res) => {
    const result = await registerUserCase(req === null || req === void 0 ? void 0 : req.body);
    console.log('🚀 ~ result:', result);
    return res.status(201).json({
        message: 'inscrit avec succès',
        data: {
            user: result.user,
            accessToken: result.accessToken,
        },
    });
};
exports.registerControllerBase = registerControllerBase;
const registerController = registerControllerBase(register_usecase_1.registerUseCase);
exports.registerController = registerController;
exports.transactionalRegisterController = (0, transactional_controller_1.transactionalController)((tx) => {
    const transactionalUsersRepo = (0, users_repository_1.usersRepoBase)(tx);
    return registerControllerBase((0, register_usecase_1.registerUseCaseBase)({
        createUserTokensUseCase: createUserTokens_usecase_1.createUserTokensUseCase,
        usersRepo: transactionalUsersRepo,
        generateAndSendUserAccountVerificationEmail: requestAccountVerification_usecase_1.generateAndSendUserAccountVerificationEmail,
    }));
});
//# sourceMappingURL=register.controller.js.map