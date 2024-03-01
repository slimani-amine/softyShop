import {
  createBrandUseCase,
  createBrandUseCaseType,
} from "../../../../usecases/api/brands/createBrand.usecase";
import { NextFunction, Request, Response } from "express";

const createBrandControllerBase =
  (createBrandUseCase: createBrandUseCaseType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    req.body.store_id = req.params.id;
    try {
      const result = await createBrandUseCase(req?.body);
      console.log("🚀 ~ result:", result)
      return res.status(201).json({
        message: "Brand added successfully",
        data: {
          brand: result.brand,
        },
      });
    } catch (error) {
      next(error);
    }
  };

const createBrandController = createBrandControllerBase(createBrandUseCase);
export { createBrandControllerBase, createBrandController };
