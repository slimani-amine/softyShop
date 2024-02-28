import { Request, Response, NextFunction } from 'express';
import { UpdateMyProfileUseCaseType } from '../../../usecases/api/users/updateMyProfile.usecase';
export declare const updateMyProfileControllerBase: (updateMyProfileUseCase: UpdateMyProfileUseCaseType) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const updateMyProfileController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
