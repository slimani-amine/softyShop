import { brandRepo } from "../../../../data/repositories/brand.repository";
import {
  UpdateBrandUseCaseType,
  updateBrandUseCase,
} from "../../../../usecases/api/brands/updateBrand.usecase";
import { Request, Response, NextFunction } from "express";

export const updateBrandControllerBase =
  (updateBrandUseCase: UpdateBrandUseCaseType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const brandId = req.params.brandId;
      const brand = await brandRepo.findOne({ where: { id: brandId } });

      const updatePayload = req.body;

      const result = await updateBrandUseCase(brand, updatePayload);

      if (!result) {
        return res.status(404).json({
          message: "Brand not found",
        });
      }

      res.status(201).send({
        message: "Brand updated successfully",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

export const updateBrandController =
  updateBrandControllerBase(updateBrandUseCase);