"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const createStoreSchema = zod_1.z.object({
    storeName: zod_1.z.string().min(1, {
        message: "Le nom du boutique est obligatoire",
    }),
    storePhone: zod_1.z
        .string()
        .min(8, {
        message: "Le telephone du boutique est obligatoire (8 chiffres)",
    })
        .max(8, {
        message: "Le telephone du boutique est obligatoire (8 chiffres)",
    }),
    logo: zod_1.z.string().min(1, {
        message: "Le logo du boutique est obligatoire",
    }),
    isPublished: zod_1.z.boolean().optional(),
    position: zod_1.z.array(zod_1.z.string()).refine((data) => data.length === 3, {
        message: "La position du boutique est obligatoire et doit contenir exactement deux nombres",
    }),
    socialMediaLinks: zod_1.z.array(zod_1.z.string()),
    vendor_id: zod_1.z.string().min(1, {
        message: "L'utilisateur du boutique est obligatoire",
    }),
});
exports.default = createStoreSchema;
//# sourceMappingURL=createStore.schema.js.map