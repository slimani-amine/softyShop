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
  phoneNumber: z
    .string()
    .min(8, {
      message: "The phone number 8 numbers",
    })
    .max(8, {
      message: "The phone number 8 numbers",
    })
    .optional(),
});

export default createAddressSchema;
