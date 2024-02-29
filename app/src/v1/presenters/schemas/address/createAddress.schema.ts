import { z } from "zod";

const createAddressSchema = z.object({
  address: z.string().min(1, {
    message: "The address is required",
  }),
  city: z.string().min(1, {
    message: "The city is required",
  }),
  state: z.string().min(1, {
    message: "The state is required",
  }),
  zipCode: z.number(),
  user_id: z.string().min(1, {
    message: "The user is required",
  }),
});

export default createAddressSchema;
