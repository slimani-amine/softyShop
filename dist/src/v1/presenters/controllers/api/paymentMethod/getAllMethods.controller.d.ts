import { getAllPaymentMethodsUseCaseType } from "../../../../usecases/api/paymentMethod/getAllMethods.usecase";
import { NextFunction, Request, Response } from "express";
export declare const getAllPayementMethodsControllerBase: (getAllPayementMethodsUseCase: getAllPaymentMethodsUseCaseType) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getAllPayementMethodsController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
