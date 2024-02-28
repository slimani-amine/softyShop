import { API_BASE_URL } from '../../../../config';
import { Request, Response, NextFunction } from 'express';
export enum FilePathTypes {
  IMAGES = 'images',
}
export const transferFilePathToBodyMiddlewareBuilder =
  (bodyFieldName: string, fileType: FilePathTypes = FilePathTypes.IMAGES) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (req?.file) {
      req.body[bodyFieldName] = API_BASE_URL + '/' + fileType + '/' + req?.file?.filename;
    }
    next();
  };
