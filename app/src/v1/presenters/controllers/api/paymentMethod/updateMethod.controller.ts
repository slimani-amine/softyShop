import { Request, Response, NextFunction } from "express";

import { paymentMethodRepo } from "../../../../data/repositories/paymentMethod.repository";
import {
  UpdatePaymentMethodUseCaseType,
  updatePaymentMethodUseCase,
} from "../../../../usecases/api/paymentMethod/updateMethod.usecase";
import { exceptionService } from "../../../../core/errors/exceptions";

export const updatepaymentMethodControllerBase =
  (updatepaymentMethodUseCase: UpdatePaymentMethodUseCaseType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const paymentMethodId = req.params.paymentMethodId;
      const paymentMethod = await paymentMethodRepo.findOne({
        where: { id: paymentMethodId },
      });
      if (!paymentMethod) {
        exceptionService.notFoundException({
          message: "No payment method found with id " + paymentMethodId,
        });
      }

      const updatePayload = req.body;

      const result = await updatepaymentMethodUseCase(
        paymentMethod,
        updatePayload
      );

      res.status(201).send({
        message: "paymentMethod updated successfully",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

export const updatepaymentMethodController = updatepaymentMethodControllerBase(
  updatePaymentMethodUseCase
);
