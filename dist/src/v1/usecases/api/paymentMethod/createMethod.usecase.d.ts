import { ICreatePaymentMethodInput, IPaymentMethod } from "../../../domain/paymentMethod/paymentMethod";
import { IPaymentMethodRepository } from "../../../data/repositories/paymentMethod.repository";
export type CreateMethodUseCaseType = (payload: ICreatePaymentMethodInput) => Promise<{
    method: IPaymentMethod;
}>;
export declare const createMethodUseCaseBase: (dependencies?: {
    methodRepo: IPaymentMethodRepository;
}) => CreateMethodUseCaseType;
export declare function validateCreateMethodPayload(payload: ICreatePaymentMethodInput): ICreatePaymentMethodInput;
export declare const createMethodUseCase: CreateMethodUseCaseType;
