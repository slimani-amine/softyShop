import { Request, Response, NextFunction } from 'express';
import { RequestPasswordResetUseCaseType } from '../../../usecases/auth/requestPasswordReset.usecase';
export declare const requestPasswordResetControllerBase: (requestUserPasswordResetUseCase: RequestPasswordResetUseCaseType) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const requestPasswordResetController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
