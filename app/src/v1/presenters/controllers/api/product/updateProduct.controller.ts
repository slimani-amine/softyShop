import { Request, Response, NextFunction } from "express";
import { productRepo } from "../../../../data/repositories/product.repository";
import {
  UpdateProductUseCaseType,
  updateProductUseCase,
} from "../../../../usecases/api/product/updateProduct.usecase";

export const updateProductControllerBase =
  (updateProductUseCase: UpdateProductUseCaseType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productId = req.params.productId;
      const product = await productRepo.findOne({ where: { id: productId } });

      const updatePayload = req.body;

      const result = await updateProductUseCase(product, updatePayload);

      res.status(201).send({
        message: "Product updated successfully",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

export const updateProductController =
  updateProductControllerBase(updateProductUseCase);