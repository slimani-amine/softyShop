import { z } from "zod";

const createStoreSchema = z.object({
  storeName: z.string().min(1, {
    message: "Le nom du boutique est obligatoire",
  }),
  storePhone: z
    .string()
    .min(8, {
      message: "Le telephone du boutique est obligatoire (8 chiffres)",
    })
    .max(8, {
      message: "Le telephone du boutique est obligatoire (8 chiffres)",
    }),
  logo: z.string().min(1, {
    message: "Le logo du boutique est obligatoire",
  }),
  isPublished: z.boolean().optional(),
  position: z.array(z.number()).refine((data) => data.length === 2, {
    message:
      "La position du boutique est obligatoire et doit contenir exactement deux nombres",
  }),
  socialMediaLinks: z.array(z.string()),
  vendor_id: z.string().min(1, {
    message: "L'utilisateur du boutique est obligatoire",
  }),
});

export default createStoreSchema;
