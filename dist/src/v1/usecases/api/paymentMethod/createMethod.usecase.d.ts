import { ICreatePaymentMethodInput, IPaymentMethod } from "../../../domain/paymentMethod/paymentMethod";
import { IPaymentMethodRepository, paymentMethodRepo } from "../../../data/repositories/paymentMethod.repository";
export type CreateMethodUseCaseType = (payload: ICreatePaymentMethodInput) => Promise<{
    method: IPaymentMethod;
}>;
export declare const createMethodUseCaseBase: (dependencies?: {
    paymentMethodRepo: IPaymentMethodRepository;
}) => CreateMethodUseCaseType;
export declare function validateCreateMethodPayload(payload: ICreatePaymentMethodInput): ICreatePaymentMethodInput;
export declare const createMethodUseCase: CreateMethodUseCaseType;
