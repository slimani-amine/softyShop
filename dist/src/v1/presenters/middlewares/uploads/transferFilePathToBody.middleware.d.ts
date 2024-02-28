import { Request, Response, NextFunction } from 'express';
export declare enum FilePathTypes {
    IMAGES = "images"
}
export declare const transferFilePathToBodyMiddlewareBuilder: (bodyFieldName: string, fileType?: FilePathTypes) => (req: Request, res: Response, next: NextFunction) => void;
