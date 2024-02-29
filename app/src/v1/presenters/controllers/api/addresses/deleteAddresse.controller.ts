import {
  DeleteAddressUseCaseType,
  deleteAddressUseCase,
} from "../../../../usecases/api/addresses/deleteAddresse.usecase";
import { NextFunction, Request, Response } from "express";

export const deleteAddressesControllerBase =
  (deleteAddressUseCase: DeleteAddressUseCaseType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await deleteAddressUseCase(req?.params);
      res.status(200).send({
        message: "Success",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

export const deleteAddressesController =
  deleteAddressesControllerBase(deleteAddressUseCase);
