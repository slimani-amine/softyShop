import { z } from 'zod';

const createStoreSchema = z.object({
  storeName: z.string().min(1, {
    message: 'Le nom du boutique est obligatoire',
  }),
  logo: z.string().min(1, {
    message: 'Le logo du boutique est obligatoire',
  }),
  foundedAt: z.string().min(1, {
    message: 'La date de création du boutique est obligatoire',
  }),
  isPublished: z.boolean(),
  position: z.string().min(1, {
    message: 'La position du boutique est obligatoire',
  }),
  socialMediaLinks: z.string(),
  vendor_id: z.string().min(1, {
    message: "L'utilisateur du boutique est obligatoire",
  }),
});

export default createStoreSchema;
