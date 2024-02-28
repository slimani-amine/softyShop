import { GetUsersUseCaseType } from '../../../../usecases/api/users/getUsers.usecase';
import { Request, Response, NextFunction } from 'express';
export declare const getUsersControllerBase: (getUsersUseCase: GetUsersUseCaseType) => (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
export declare const getUsersController: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
