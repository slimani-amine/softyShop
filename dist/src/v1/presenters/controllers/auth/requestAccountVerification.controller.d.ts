import { Request, Response, NextFunction } from 'express';
import { RequestAccountVerificationUseCaseType } from '../../../usecases/auth/requestAccountVerification.usecase';
export declare const requestAccountVerificationControllerBase: (requestUserAccountVerificationUseCase: RequestAccountVerificationUseCaseType) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const requestAccountVerificationController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
