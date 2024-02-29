import {
  CreateMethodUseCaseType,
  createMethodUseCase,
} from "../../../../usecases/api/paymentMethod/createMethod.usecase";
import { Request, Response, NextFunction } from "express";

export const createMethodControllerBase =
  (createMethodUseCase: CreateMethodUseCaseType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await createMethodUseCase(req.body);

      res.status(201).send({
        message: "Method created successfully",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

export const createMethodController =
  createMethodControllerBase(createMethodUseCase);
