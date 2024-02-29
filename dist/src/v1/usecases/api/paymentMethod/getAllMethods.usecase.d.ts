import { QueryResult } from "../../../utils/querying/apiFeatures.util";
import { IPaymentMethodRepository, paymentMethodRepo } from "../../../data/repositories/paymentMethod.repository";
import { IPaymentMethod } from "../../../domain/paymentMethod/paymentMethod";
export type getAllPaymentMethodsUseCaseType = (queryParams: {
    [key: string]: any;
}) => Promise<QueryResult<IPaymentMethod>>;
export declare const getAllPaymentMethodsUseCaseBase: (dependencies: {
    paymentMethodRepo: IPaymentMethodRepository;
}) => (queryParams: {
    [key: string]: any;
}) => Promise<QueryResult<IPaymentMethod>>;
export declare const getAllPaymentMethodsUseCase: (queryParams: {
    [key: string]: any;
}) => Promise<QueryResult<IPaymentMethod>>;
