import { z } from "zod";

const createProductCreatorSchema = z.object({
  name: z.string().min(1, {
    message: "The name of the product creator is required",
  }),
});

export default createProductCreatorSchema;
