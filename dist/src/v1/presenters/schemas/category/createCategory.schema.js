"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const createCategorySchema = zod_1.z.object({
    name: zod_1.z.string().min(1, {
        message: "Le nom de la catégorie est obligatoire",
    }),
    icon: zod_1.z.string().min(1, {
        message: "L'icône de la catégorie est obligatoire",
    }),
});
exports.default = createCategorySchema;
//# sourceMappingURL=createCategory.schema.js.map