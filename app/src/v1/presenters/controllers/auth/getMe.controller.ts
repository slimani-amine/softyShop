import { logger } from '../../../core/logger/logger';
import { Request, Response, NextFunction } from 'express';
import {
  GetMyProfileUseCaseType,
  getMyProfileUseCase,
} from '../../../usecases/api/users/getMyProfile.usecase';

export const getMeControllerBase =
  (getMyProfileUseCase: GetMyProfileUseCaseType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.log('GET ME CONTROLLER', `IN GET ME CONTROLLER ID ${req?.user?.id}`);
      const result = await getMyProfileUseCase(req?.user);
      res.status(200).send({
        message: 'succès',
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

export const getMeController = getMeControllerBase(getMyProfileUseCase);
