import { z } from "zod";
import { ZodValidationMessageCommon } from "../errors.common";

const updateStoreSchema = z
  .object({
    name: z.union([
      z.string().min(2, {
        message: "Store name must be a string with at least 2 characters",
      }),
      z.undefined(),
    ]),
    phoneNumber: z.union([
      z.string().min(8, {
        message: "Store phone must be a string with at least 8 characters",
      }),
      z.undefined(),
    ]),
    logo: z.union([
      z.string().min(2, {
        message: "Store logo must be a string with at least 2 characters",
      }),
      z.undefined(),
    ]),
    location: z.union([
      z.array(z.number()).refine((data) => data.length === 2, {
        message: "Store location must contain exactly two numbers",
      }),
      z.undefined(),
    ]),
    address: z.union([
      z.string().min(4, {
        message: "Store address must be a string with at least 4 characters",
      }),
      z.undefined(),
    ]),
    socialMediaLinks: z.union([z.array(z.string()), z.undefined()]),
    vendor_id: z.union([
      z.string().min(1, {
        message: "Vendor ID must be a string with at least 1 character",
      }),
      z.undefined(),
    ]),
  })
  .strict(`${ZodValidationMessageCommon.FIELDS_UNEXPECTED_MESSAGE}`)
  .refine(
    (data) =>
      data?.name ||
      data?.phoneNumber ||
      data?.logo ||
      data?.location ||
      data?.socialMediaLinks ||
      data?.vendor_id,
    {
      message: "At least one field should be provided for updating the profile",
    }
  );

export default updateStoreSchema;
