import { DeletePaymentMethodUseCaseType } from "../../../../usecases/api/paymentMethod/deleteMethod.usecase";
import { NextFunction, Request, Response } from "express";
export declare const deletePayementMethodControllerBase: (deletePayementMethodUseCase: DeletePaymentMethodUseCaseType) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const deletePayementMethodController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
