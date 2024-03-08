"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const idAsNumber_1 = require("../types/idAsNumber");
class Category extends idAsNumber_1.NumberId {
    constructor(payload) {
        super(payload.id);
        this.name = payload.name;
        this.icon = payload.icon;
        this.isPublished = payload.isPublished;
    }
}
exports.Category = Category;
//# sourceMappingURL=category.js.map