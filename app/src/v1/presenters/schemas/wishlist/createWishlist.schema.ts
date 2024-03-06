import { z } from "zod";

const createWishlistSchema = z.object({
  productId: z.string().min(1, {
    message: "The product ID is required",
  }),
});

export default createWishlistSchema;
