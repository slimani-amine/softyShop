import { z } from "zod";

const createReviewSchema = z.object({
  review: z.string().min(1, {
    message: "The review content is required",
  }),
  rating: z.number().min(0).max(5, {
    message: "The rating should be between 0 and 5",
  }),
  userId: z.string().min(1, {
    message: "The user ID is required",
  }),
  productId: z.string().min(1, {
    message: "The product ID is required",
  }),
});

export default createReviewSchema;
