import {
  ICreatePaymentMethodInput,
  IPaymentMethod,
} from "../../../domain/paymentMethod/paymentMethod";
import { exceptionService } from "../../../core/errors/exceptions";
import { trimAndValidateSchemaPayload } from "../../../utils/validation/validate.schema";
import {
  IPaymentMethodRepository,
  paymentMethodRepo,
} from "../../../data/repositories/paymentMethod.repository";
import createPaymentMethodSchema from "../../../presenters/schemas/payementMethod/createMethod.schema";

export type CreateMethodUseCaseType = (
  payload: ICreatePaymentMethodInput
) => Promise<{ method: IPaymentMethod }>;

export const createMethodUseCaseBase =
  (
    dependencies: {
      paymentMethodRepo: IPaymentMethodRepository;
    } = {
      paymentMethodRepo: paymentMethodRepo,
    }
  ): CreateMethodUseCaseType =>
  async (payload: ICreatePaymentMethodInput) => {
    const methodFound = await dependencies.paymentMethodRepo.findAll({
      where: [{ name: payload.name }],
    });

    if (methodFound.length > 0) {
      exceptionService.badRequestException({
        message: "A Method with the given name already exists",
      });
    }

    validateCreateMethodPayload(payload);
    const methodCreated =
      await dependencies.paymentMethodRepo.createPaymentMethod({
        name: payload.name,
        icon: payload.icon,
      });

    return {
      method: methodCreated,
    };
  };

export function validateCreateMethodPayload(
  payload: ICreatePaymentMethodInput
): ICreatePaymentMethodInput {
  trimAndValidateSchemaPayload<ICreatePaymentMethodInput>(
    createPaymentMethodSchema,
    payload
  ); // Corrected function argument
  return payload;
}

export const createMethodUseCase: CreateMethodUseCaseType =
  createMethodUseCaseBase({
    paymentMethodRepo,
  });
