import { Request, Response, NextFunction } from "express";

import { storeRepo } from "../../../../data/repositories/store.repository";
import {
  UpdateStoreUseCaseType,
  updateStoreUseCase,
} from "../../../../usecases/api/store/updateStore.usecase";
import { exceptionService } from "../../../../core/errors/exceptions";

export const updateStoreControllerBase =
  (updateStoreUseCase: UpdateStoreUseCaseType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const storeId = req.params.id;
      console.log("🚀 ~ storeId:", storeId);
      const store = await storeRepo.findOne({ where: { id: storeId } });
      console.log("🚀 ~ store:", store);

      if (!store) {
        exceptionService.badRequestException({
          message: "Store not found",
        });
      }

      const updatePayload = req.body;

      const result = await updateStoreUseCase(store, updatePayload);

      res.status(201).send({
        message: "Store updated successfully",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

export const updateStoreController =
  updateStoreControllerBase(updateStoreUseCase);
