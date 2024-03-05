import { Request, Response, NextFunction } from "express";
import { VerifyAccountUseCaseType } from "../../../usecases/auth/verifyAccount.usecase";
export declare const verifyAccountControllerBase: (verifyAccountUseCase: VerifyAccountUseCaseType) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const verifyAccountController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
