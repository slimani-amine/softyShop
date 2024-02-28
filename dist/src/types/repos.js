"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindOperator = exports.PossibleOrders = void 0;
const typeorm_1 = require("typeorm");
var PossibleOrders;
(function (PossibleOrders) {
    PossibleOrders["DESC"] = "DESC";
    PossibleOrders["ASC"] = "ASC";
})(PossibleOrders || (exports.PossibleOrders = PossibleOrders = {}));
class FindOperator extends typeorm_1.FindOperator {
}
exports.FindOperator = FindOperator;
//# sourceMappingURL=repos.js.map