import { Request, Response, NextFunction } from 'express';
export declare const logoutControllerBase: () => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const logoutController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
