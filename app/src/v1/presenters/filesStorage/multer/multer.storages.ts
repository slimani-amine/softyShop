import { STATIC_FILES_PATH } from '../../../../config';
import { getStorageFileName } from '../../../utils/files/getStorageFileName';
import * as multer from 'multer';
import { join } from 'path';

const getMulterStorage = (destinationPath: string) => {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
      const newFileName = getStorageFileName(file);
      cb(null, newFileName);
    },
  });
};

export const imagesStorage = getMulterStorage(join(STATIC_FILES_PATH, '/images'));
