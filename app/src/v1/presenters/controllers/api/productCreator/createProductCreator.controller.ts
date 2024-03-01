import {
  createProductCreatorUseCase,
  createProductCreatorUseCaseType,
} from "../../../../usecases/api/productCreator/createProductCreator.usecase";
import { NextFunction, Request, Response } from "express";

export const createProductCreatorControllerBase =
  (createProductCreatorUseCase: createProductCreatorUseCaseType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    req.body.store_id = req.params.id;
    try {
      const result = await createProductCreatorUseCase(req?.body);
      return res.status(201).json({
        message: "Product Creator added successfully",
        data: {
          productCreator: result.productCreator,
        },
      });
    } catch (error) {
      next(error);
    }
  };

export const createProductCreatorController =
  createProductCreatorControllerBase(createProductCreatorUseCase);
