import { Request, Response, NextFunction } from 'express';
import { GetMyProfileUseCaseType } from '../../../usecases/api/users/getMyProfile.usecase';
export declare const getMeControllerBase: (getMyProfileUseCase: GetMyProfileUseCaseType) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getMeController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
