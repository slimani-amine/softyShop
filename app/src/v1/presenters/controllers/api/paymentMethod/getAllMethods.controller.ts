
import { getAllPaymentMethodsUseCase, getAllPaymentMethodsUseCaseType } from "../../../../usecases/api/paymentMethod/getAllMethods.usecase";
import { NextFunction, Request, Response } from "express";

export const getAllPayementMethodsControllerBase =
  (getAllPayementMethodsUseCase: getAllPaymentMethodsUseCaseType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await getAllPayementMethodsUseCase(req?.query);
      res.status(200).send({
        message: "success",
        data: result.docs,
      });
    } catch (err) {
      next(err);
    }
  };

export const getAllPayementMethodsController = getAllPayementMethodsControllerBase(
  getAllPaymentMethodsUseCase
);
