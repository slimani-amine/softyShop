import { z } from "zod";

const createBrandSchema = z.object({
  name: z.string().min(1, {
    message: "The name of the brand is required",
  }),
  logo: z.string().min(1, {
    message: "The logo of the brand is required",
  }),
  productId: z.number().min(1, {
    message: "The product ID is required",
  }),
});

export default createBrandSchema;
