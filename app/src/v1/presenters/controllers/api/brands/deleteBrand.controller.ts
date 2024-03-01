import {
  DeleteBrandUseCaseType,
  deleteBrandUseCase,
} from "../../../../usecases/api/brands/deleteBrand.usecase";
import { NextFunction, Request, Response } from "express";

export const deleteBrandsControllerBase =
  (deleteBrandUseCase: DeleteBrandUseCaseType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await deleteBrandUseCase(req?.params);
      res.status(200).send({
        message: "Success",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

export const deleteBrandsController =
  deleteBrandsControllerBase(deleteBrandUseCase);
