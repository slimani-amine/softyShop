import { z } from "zod";

const createPaymentMethodSchema = z.object({
  name: z.string().min(1, {
    message: "Le nom de la méthode de paiement est obligatoire",
  }),
  icon: z.string().min(1, {
    message: "L'icône de la méthode de paiement est obligatoire",
  }),
});

export default createPaymentMethodSchema;
