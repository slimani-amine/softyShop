import { ChangeUserRoleUseCaseType } from "../../../../usecases/api/users/changeUserRole.usecase";
import { NextFunction, Request, Response } from "express";
export declare const changeUserRoleControllerBase: (changeUserRoleUseCase: ChangeUserRoleUseCaseType) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const changeUserRoleController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
