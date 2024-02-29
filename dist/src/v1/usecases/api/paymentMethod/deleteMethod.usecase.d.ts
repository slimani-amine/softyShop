import { IPaymentMethodRepository, paymentMethodRepo } from "../../../data/repositories/paymentMethod.repository";
export type DeletePaymentMethodUseCaseType = (params: {
    [id: string]: any;
}) => Promise<{
    success: boolean;
}>;
export declare const deletePaymentMethodUseCaseBase: (dependencies?: {
    paymentMethodRepo: IPaymentMethodRepository;
}) => DeletePaymentMethodUseCaseType;
export declare const deletePaymentMethodUseCase: DeletePaymentMethodUseCaseType;
