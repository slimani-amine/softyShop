"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const createPaymentMethodSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, {
        message: "Le nom de la méthode de paiement est obligatoire",
    }),
    icon: zod_1.z.string().min(1, {
        message: "L'icône de la méthode de paiement est obligatoire",
    }),
});
exports.default = createPaymentMethodSchema;
//# sourceMappingURL=createMethod.schema.js.map