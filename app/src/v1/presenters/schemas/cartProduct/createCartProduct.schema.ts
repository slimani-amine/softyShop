import { z } from "zod";

const createCartProductSchema = z.object({
  productId: z.string().min(1, {
    message: "Product ID is required",
  }),
  cartId: z.string().min(1, {
    message: "Cart ID is required",
  }),
});

export default createCartProductSchema;
