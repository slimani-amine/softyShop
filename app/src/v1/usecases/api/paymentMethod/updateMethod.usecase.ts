import {
  IPaymentMethodRepository,
  paymentMethodRepo,
} from "../../../data/repositories/paymentMethod.repository";
import { IPaymentMethod } from "../../../domain/paymentMethod/paymentMethod";

export type UpdatePaymentMethodUseCaseType = (
  paymentMethod: IPaymentMethod,
  updatePayload: Partial<IPaymentMethod>
) => Promise<IPaymentMethod>;

export const updatePaymentMethodUseCaseBase =
  (paymentMethodRepository: IPaymentMethodRepository) =>
  async (paymentMethod: IPaymentMethod, updatePayload: Partial<IPaymentMethod>) => {
    const updatedPaymentMethod = await paymentMethodRepository.updatePaymentMethod(
      paymentMethod,
      updatePayload
    );
    return updatedPaymentMethod;
  };

export const updatePaymentMethodUseCase: UpdatePaymentMethodUseCaseType =
  updatePaymentMethodUseCaseBase(paymentMethodRepo);