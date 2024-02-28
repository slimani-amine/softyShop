import { NextFunction, Request, Response } from 'express';
export declare const createHandleErrorMiddleware: () => (err: Error, req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>>;
export declare const handleErrorMiddleware: (err: Error, req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>>;
