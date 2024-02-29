import { IJwtAccessPayload } from "../../../usecases/auth/types/jwt.tokens";
import { Request, Response, NextFunction } from "express";
export declare const isAuthentictedMiddleware: (req: Request, res: Response, next: NextFunction) => void;
export declare const isAuthentictedMiddlewareNoVerificationNeeded: (req: Request, res: Response, next: NextFunction) => void;
export declare const validateAccessToken: (tokenPayload: IJwtAccessPayload) => boolean;
