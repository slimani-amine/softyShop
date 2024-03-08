import { z } from "zod";
import { ZodValidationMessageCommon } from "../errors.common";

const publishStoreSchema = z
  .object({
    isPublished: z.boolean().refine((value) => value !== undefined, {
      message:
        "Store publication status must be a boolean value (true or false)",
    }),
  })
  .strict(`${ZodValidationMessageCommon.FIELDS_UNEXPECTED_MESSAGE}`);

export default publishStoreSchema;
