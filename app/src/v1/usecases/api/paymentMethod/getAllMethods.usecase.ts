import { QueryResult } from "../../../utils/querying/apiFeatures.util";
import {
  IPaymentMethodRepository,
  paymentMethodRepo,
} from "../../../data/repositories/paymentMethod.repository";
import { IPaymentMethod } from "../../../domain/paymentMethod/paymentMethod";

export type getAllPaymentMethodsUseCaseType = (queryParams: {
  [key: string]: any;
}) => Promise<QueryResult<IPaymentMethod>>;

export const getAllPaymentMethodsUseCaseBase =
  (dependencies: { paymentMethodRepo: IPaymentMethodRepository }) =>
  async (queryParams: { [key: string]: any }) => {
    const paymentMethodsFound =
      await dependencies.paymentMethodRepo.findByQuery(queryParams);

    return paymentMethodsFound;
  };

export const getAllPaymentMethodsUseCase = getAllPaymentMethodsUseCaseBase({
  paymentMethodRepo: paymentMethodRepo,
});