"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const createStoreSchema = zod_1.z.object({
    storeName: zod_1.z.string().min(1, {
        message: 'Le nom du boutique est obligatoire',
    }),
    logo: zod_1.z.string().min(1, {
        message: 'Le logo du boutique est obligatoire',
    }),
    foundedAt: zod_1.z.string().min(1, {
        message: 'La date de création du boutique est obligatoire',
    }),
    isPublished: zod_1.z.boolean(),
    position: zod_1.z.string().min(1, {
        message: 'La position du boutique est obligatoire',
    }),
    socialMediaLinks: zod_1.z.string(),
    vendor_id: zod_1.z.string().min(1, {
        message: "L'utilisateur du boutique est obligatoire",
    }),
});
exports.default = createStoreSchema;
//# sourceMappingURL=createStore.schema.js.map