"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const errors_common_1 = require("../errors.common");
const publishStoreSchema = zod_1.z
    .object({
    isPublished: zod_1.z.boolean().refine((value) => value !== undefined, {
        message: "Store publication status must be a boolean value (true or false)",
    }),
})
    .strict(`${errors_common_1.ZodValidationMessageCommon.FIELDS_UNEXPECTED_MESSAGE}`);
exports.default = publishStoreSchema;
//# sourceMappingURL=publish.schema.js.map