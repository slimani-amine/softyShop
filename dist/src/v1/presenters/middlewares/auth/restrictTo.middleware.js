"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restrictToMiddleware = void 0;
const exceptions_1 = require("../../../core/errors/exceptions");
const restrictToMiddleware = (...roles) => (req, res, next) => {
    try {
        if (!roles.includes(req.user.role)) {
            exceptions_1.exceptionService.unauthorizedException({
                message: `You Not Have Role to access this`,
            });
        }
        next();
    }
    catch (err) {
        throw err;
    }
};
exports.restrictToMiddleware = restrictToMiddleware;
//# sourceMappingURL=restrictTo.middleware.js.map