import { IJwtRefreshPayload } from '../../../usecases/auth/types/jwt.tokens';
import { Request, Response, NextFunction } from 'express';
export declare const isRefreshPermissibledMiddleware: (req: Request, res: Response, next: NextFunction) => void;
export declare const validateRefreshToken: (tokenPayload: IJwtRefreshPayload) => boolean;
