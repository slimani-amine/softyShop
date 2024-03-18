import { usersRepo } from "../../../../data/repositories/users.repository";
import {
  createStoreUseCase,
  createStoreUseCaseType,
} from "../../../../usecases/api/store/createStore.usecase";
import { NextFunction, Request, Response } from "express";
import { exceptionService } from "../../../../core/errors/exceptions";

const createStoreControllerBase =
  (createStoreUseCase: createStoreUseCaseType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const vendor = await usersRepo.findOne({
        where: { id: req.body.vendor_id },
      });

      if (!vendor) {
        exceptionService.notFoundException({
          message: "Vendor not found",
        });
      }
      
      const result = await createStoreUseCase(req?.body);
      return res.status(201).json({
        message: "Store Add successfully",
        data: {
          store: result.store,
        },
      });
    } catch (error) {
      next(error);
    }
  };

const createStoreController = createStoreControllerBase(createStoreUseCase);
export { createStoreControllerBase, createStoreController };
