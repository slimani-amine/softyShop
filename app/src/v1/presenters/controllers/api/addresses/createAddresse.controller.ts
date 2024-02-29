import {
  createAddressUseCase,
  createAddressUseCaseType,
} from "../../../../usecases/api/addresses/createAddresse.usecase";
import { NextFunction, Request, Response } from "express";

const createAddressControllerBase =
  (createAddressUseCase: createAddressUseCaseType) =>
  async (req: Request, res: Response, next: NextFunction) => {    
    try {
      const result = await createAddressUseCase(req?.body);
      return res.status(201).json({
        message: "Address added successfully",
        data: {
          address: result.address,
        },
      });
    } catch (error) {
      next(error);
    }
  };

const createAddressController =
  createAddressControllerBase(createAddressUseCase);
export { createAddressControllerBase, createAddressController };
