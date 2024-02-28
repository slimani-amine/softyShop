"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberId = void 0;
class NumberId {
    constructor(id) {
        this.id = id;
    }
    getIdAsNumber() {
        const result = parseInt(this.id);
        if (isNaN(result)) {
            throw new Error('Id Error');
        }
        return result;
    }
}
exports.NumberId = NumberId;
//# sourceMappingURL=idAsNumber.js.map