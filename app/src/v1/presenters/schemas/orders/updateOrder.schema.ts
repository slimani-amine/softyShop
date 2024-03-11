import { z } from "zod";

const updateOrderSchema = z.object({
  paymentMethod_id: z.string().min(1, {
    message: "The payment method ID is required.",
  }),
  address_id: z.string().min(1, {
    message: "The address ID is required.",
  }),
});

export default updateOrderSchema;
