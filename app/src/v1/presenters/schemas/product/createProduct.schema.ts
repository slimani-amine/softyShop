import { z } from "zod";

const createProductSchema = z.object({
  name: z.string().min(1, {
    message: "The name of the product is required",
  }),
  price: z.number().min(0, {
    message: "The price of the product should be greater than or equal to 0",
  }),
  stockNumber: z.number().min(0, {
    message:
      "The stock number of the product should be greater than or equal to 0",
  }),
  isPublished: z.boolean().optional(),
  brand_id: z.string().min(1, {
    message: "The brand of the product is required",
  }),
  creators: z.array(z.string()),
});

export default createProductSchema;
