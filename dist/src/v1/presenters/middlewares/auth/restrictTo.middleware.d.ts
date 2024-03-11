import { Request, Response, NextFunction } from "express";
export declare const restrictToMiddleware: (...roles: any[]) => (req: Request, res: Response, next: NextFunction) => void;
