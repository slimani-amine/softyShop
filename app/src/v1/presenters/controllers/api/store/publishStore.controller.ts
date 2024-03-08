import { Request, Response, NextFunction } from "express";

import { storeRepo } from "../../../../data/repositories/store.repository";
import {
  PublishStoreUseCaseType,
  publishStoreUseCase,
} from "../../../../usecases/api/store/publishStore.usecase";
import { exceptionService } from "../../../../core/errors/exceptions";

export const publishStoreControllerBase =
  (publishStoreUseCase: PublishStoreUseCaseType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const storeId = req.params.id;
      const store = await storeRepo.findOne({ where: { id: storeId } });

      if (!store) {
        exceptionService.badRequestException({
          message: "Store not found",
        });
      }
      const updatePayload = req.body;
      if (store.isPublished === updatePayload.isPublished) {
        exceptionService.badRequestException({
          message: `isPublished already set ${updatePayload.isPublished}`,
        });
      }

      const result = await publishStoreUseCase(store, updatePayload);

      res.status(201).send({
        message: "Store updated successfully",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

export const publishStoreController =
  publishStoreControllerBase(publishStoreUseCase);
