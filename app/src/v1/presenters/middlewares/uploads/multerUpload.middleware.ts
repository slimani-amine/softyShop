import * as multer from 'multer';
import { imagesStorage } from '../../filesStorage/multer/multer.storages';

const DEFAULT_MULTER_OPTIONS = {
  limits: {
    fileSize: 15_000_000,
  },
};

export const multerImageUpload = multer({
  ...DEFAULT_MULTER_OPTIONS,
  storage: imagesStorage,
});
