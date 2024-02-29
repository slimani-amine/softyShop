import { Request, Response, NextFunction } from "express";
import { UpdatePaymentMethodUseCaseType } from "../../../../usecases/api/paymentMethod/updateMethod.usecase";
export declare const updatepaymentMethodControllerBase: (updatepaymentMethodUseCase: UpdatePaymentMethodUseCaseType) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const updatepaymentMethodController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
