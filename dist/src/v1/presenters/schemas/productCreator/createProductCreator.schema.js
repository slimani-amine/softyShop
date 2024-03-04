"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const createProductCreatorSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, {
        message: "The name of the product creator is required",
    }),
});
exports.default = createProductCreatorSchema;
//# sourceMappingURL=createProductCreator.schema.js.map