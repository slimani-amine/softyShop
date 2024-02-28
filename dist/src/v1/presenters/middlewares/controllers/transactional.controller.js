"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionalController = exports.makeTransactionalController = void 0;
const connection_1 = require("../../../data/connection");
const makeTransactionalController = (dbDataSource) => (fn) => async (req, res, next) => {
    try {
        await dbDataSource.transaction(async (tx) => {
            const func = fn(tx.queryRunner);
            await Promise.resolve(func(req, res, next));
        });
    }
    catch (err) {
        next(err);
    }
};
exports.makeTransactionalController = makeTransactionalController;
exports.transactionalController = (0, exports.makeTransactionalController)(connection_1.dataSource);
//# sourceMappingURL=transactional.controller.js.map