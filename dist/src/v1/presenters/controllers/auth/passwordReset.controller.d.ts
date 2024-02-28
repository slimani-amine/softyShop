import { Request, Response, NextFunction } from 'express';
import { PasswordResetUseCaseType } from '../../../usecases/auth/passwordReset.usecase';
export declare const passwordResetControllerBase: (passwordResetUseCase: PasswordResetUseCaseType) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const passwordResetController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
