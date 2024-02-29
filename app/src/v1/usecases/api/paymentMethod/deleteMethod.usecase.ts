


  import { exceptionService } from "../../../core/errors/exceptions";
import {
  IPaymentMethodRepository,
  paymentMethodRepo,
} from "../../../data/repositories/paymentMethod.repository";

export type DeletePaymentMethodUseCaseType = (params: {
  [id: string]: any;
}) => Promise<{ success: boolean }>;

export const deletePaymentMethodUseCaseBase =
  (
    dependencies: {
      paymentMethodRepo: IPaymentMethodRepository;
    } = {
      paymentMethodRepo: paymentMethodRepo,
    }
  ): DeletePaymentMethodUseCaseType =>
  async (params: { [id: string]: any }) => {
    const paymentMethod = await dependencies.paymentMethodRepo.findOne({
      where: { id: params.id },
    });

    if (!paymentMethod) {
      exceptionService.notFoundException({
        message: "Payment Method not found",
      });
    }

    const result =
      await dependencies.paymentMethodRepo.deletePaymentMethod(paymentMethod);

    return {
      success: result === 1,
    };
  };

export const deletePaymentMethodUseCase: DeletePaymentMethodUseCaseType =
  deletePaymentMethodUseCaseBase({
    paymentMethodRepo,
  });
