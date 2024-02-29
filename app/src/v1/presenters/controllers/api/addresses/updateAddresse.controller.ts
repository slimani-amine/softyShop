import { addressRepo } from "../../../../data/repositories/addresses.repository";
import {
  UpdateAddressUseCaseType,
  updateAddressUseCase,
} from "../../../../usecases/api/addresses/updateAddresse.usecase";
import { Request, Response, NextFunction } from "express";

export const updateAddressControllerBase =
  (updateAddressUseCase: UpdateAddressUseCaseType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const addressId = req.params.addressId;
      const address = await addressRepo.findOne({ where: { id: addressId } });

      const updatePayload = req.body;

      const result = await updateAddressUseCase(address, updatePayload);

      res.status(201).send({
        message: "Address updated successfully",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

export const updateAddressController =
  updateAddressControllerBase(updateAddressUseCase);
