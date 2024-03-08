import { Request, Response, NextFunction } from 'express';
export declare const setDefaultProductImageIfNotGiven: (bodyFieldName: string) => (req: Request, res: Response, next: NextFunction) => void;
