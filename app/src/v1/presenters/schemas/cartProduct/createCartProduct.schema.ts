import { z } from "zod";

const createCartProductSchema = z.object({
  productId: z.string().min(1, {
    message: "Product ID is required",
  }),
  quantity: z.number().int().min(1, {
    message: "Quantity must be a positive integer",
  }),
});

export default createCartProductSchema;
