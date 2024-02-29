import { z } from "zod";

const createCategorySchema = z.object({
  name: z.string().min(1, {
    message: "Le nom de la catégorie est obligatoire",
  }),
  icon: z.string().min(1, {
    message: "L'icône de la catégorie est obligatoire",
  }),
});

export default createCategorySchema;
