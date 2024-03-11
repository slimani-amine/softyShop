import { z } from "zod";

const createStoreSchema = z.object({
  name: z.string().min(4, {
    message: "Le nom du boutique est obligatoire",
  }),
  phoneNumber: z
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
  location: z.array(z.number()).refine((data) => data.length === 2, {
    message:
      "La location du boutique est obligatoire et doit contenir exactement deux nombres",
  }),
  address: z.string().min(4, {
    message: "L'address' du boutique est obligatoire",
  }),
  socialMediaLinks: z.array(z.string()),
  vendor_id: z.string().min(1, {
    message: "L'utilisateur du boutique est obligatoire",
  }),
});

export default createStoreSchema;
