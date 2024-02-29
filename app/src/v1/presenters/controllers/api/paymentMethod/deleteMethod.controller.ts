import {
  DeletePaymentMethodUseCaseType,
  deletePaymentMethodUseCase,
} from "../../../../usecases/api/paymentMethod/deleteMethod.usecase";
import { NextFunction, Request, Response } from "express";

export const deletePayementMethodControllerBase =
  (deletePayementMethodUseCase: DeletePaymentMethodUseCaseType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await deletePayementMethodUseCase(req?.params);
      res.status(200).send({
        message: "success",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

export const deletePayementMethodController =
  deletePayementMethodControllerBase(deletePaymentMethodUseCase);
