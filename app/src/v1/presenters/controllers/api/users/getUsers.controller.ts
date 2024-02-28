import {
  GetUsersUseCaseType,
  getUsersUseCase,
} from '../../../../usecases/api/users/getUsers.usecase';
import { Request, Response, NextFunction } from 'express';

export const getUsersControllerBase =
  (getUsersUseCase: GetUsersUseCaseType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await getUsersUseCase(req?.query);
      return res.status(200).json({
        message: 'succès',
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

export const getUsersController = getUsersControllerBase(getUsersUseCase);
