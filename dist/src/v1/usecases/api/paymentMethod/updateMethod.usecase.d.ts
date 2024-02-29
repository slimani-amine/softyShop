import { IPaymentMethodRepository } from "../../../data/repositories/paymentMethod.repository";
import { IPaymentMethod } from "../../../domain/paymentMethod/paymentMethod";
export type UpdatePaymentMethodUseCaseType = (paymentMethod: IPaymentMethod, updatePayload: Partial<IPaymentMethod>) => Promise<IPaymentMethod>;
export declare const updatePaymentMethodUseCaseBase: (paymentMethodRepository: IPaymentMethodRepository) => (paymentMethod: IPaymentMethod, updatePayload: Partial<IPaymentMethod>) => Promise<IPaymentMethod>;
export declare const updatePaymentMethodUseCase: UpdatePaymentMethodUseCaseType;
