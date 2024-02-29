
import { GetOneAddressUseCaseType, getOneAddressUseCase } from '../../../../usecases/api/addresses/getOneAdresse.usecase';
import { NextFunction, Request, Response } from 'express';

export const getOneAddressControllerBase =
  (getOneAddressUseCase: GetOneAddressUseCaseType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await getOneAddressUseCase(req?.params);
      res.status(200).send({
        message: 'Success',
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

export const getOneAddressController = getOneAddressControllerBase(getOneAddressUseCase);