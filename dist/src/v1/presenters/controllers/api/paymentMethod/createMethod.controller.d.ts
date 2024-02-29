import { CreateMethodUseCaseType } from "../../../../usecases/api/paymentMethod/createMethod.usecase";
import { Request, Response, NextFunction } from "express";
export declare const createMethodControllerBase: (createMethodUseCase: CreateMethodUseCaseType) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const createMethodController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
