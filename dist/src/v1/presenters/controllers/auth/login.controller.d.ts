import { LoginUseCaseType } from "../../../usecases/auth/login.usecase";
import { Request, Response, NextFunction } from "express";
export declare const loginControllerBase: (loginUseCase: LoginUseCaseType) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const loginController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
