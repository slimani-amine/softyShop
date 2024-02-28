import { logger } from '../../../core/logger/logger';
import { Request, Response, NextFunction } from 'express';
import {
  UpdateMyProfileUseCaseType,
  updateMyProfileUseCase,
} from '../../../usecases/api/users/updateMyProfile.usecase';

export const updateMyProfileControllerBase =
  (updateMyProfileUseCase: UpdateMyProfileUseCaseType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.log(
        'UPDATE MY PROFILE CONTROLLER',
        `IN UPDATE MY PROFILE CONTROLLER ID ${req?.user?.id}`,
      );

      const result = await updateMyProfileUseCase(req?.user, req?.body);

      res.status(201).send({
        message: 'votre profil a été mis à jour avec succès',
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

export const updateMyProfileController = updateMyProfileControllerBase(updateMyProfileUseCase);
