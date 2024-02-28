import { logger } from '../../../core/logger/logger';
import { Request, Response, NextFunction } from 'express';
import { TOKENS_INFO } from '../../../../config';

export const logoutControllerBase =
  () => async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.log('LOGOUT CONTROLLER', `IN LOGOUT EMAIl ${req?.user.id}`);
      res.clearCookie(TOKENS_INFO.ACCESS_TOKEN_COOKIE_NAME);
      res.clearCookie(TOKENS_INFO.REFRESH_TOKEN_COOKIE_NAME);
      res.status(200).send({
        message: 'déconnecté avec succès',
        data: {},
      });
    } catch (err) {
      next(err);
    }
  };

export const logoutController = logoutControllerBase();
