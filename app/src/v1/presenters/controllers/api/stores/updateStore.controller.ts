import { Request, Response, NextFunction } from "express";

import { storeRepo } from "../../../../data/repositories/store.repository";
import {
  UpdateStoreUseCaseType,
  updateStoreUseCase,
} from "../../../../usecases/api/store/updateStore.usecase";
import { exceptionService } from "../../../../core/errors/exceptions";
import { usersRepo } from "../../../../data/repositories/users.repository";

export const updateStoreControllerBase =
  (updateStoreUseCase: UpdateStoreUseCaseType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const storeId = req.params.id;
      const store = await storeRepo.findOne({ where: { id: storeId } });
      const vendor = await usersRepo.findOne({
        where: { id: req.body.vendor_id },
      });

      if (!vendor) {
        exceptionService.notFoundException({
          message: "Vendor not found",
        });
      }

      if (!store) {
        exceptionService.badRequestException({
          message: "Store not found",
        });
      }

      const updatePayload = {
        location: req.body.location,
        address: req.body.address,
        socialMediaLinks: req.body.socialMediaLinks,
        user: { id: req.body.vendor_id },
      };

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
