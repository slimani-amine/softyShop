import { RefreshUserTokensUseCaseType } from "../../../usecases/auth/refreshTokens.usecase";
import { Request, Response, NextFunction } from "express";
declare const refreshTokensControllerBase: (refreshUserTokensUseCase: RefreshUserTokensUseCaseType) => (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
declare const refreshTokensController: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
export { refreshTokensController, refreshTokensControllerBase };
