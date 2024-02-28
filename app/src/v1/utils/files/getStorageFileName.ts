import { Express } from 'express';
export const getStorageFileName = (file: Express.Multer.File) => {
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  const extension = file.originalname.split('.')[file.originalname.split('.').length - 1];
  return uniqueSuffix + '.' + extension;
};
