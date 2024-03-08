import {
  GetUserAddressesUseCaseType,
  getUserAddressesUseCase,
} from "../../../../usecases/api/addresses/getUserAddresses.usecase";
import { NextFunction, Request, Response } from "express";

export const getUserAddressesControllerBase =
  (getUserAddressesUseCase: GetUserAddressesUseCaseType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.id;
    console.log("🚀 ~ userId:", userId)

    try {
      const result = await getUserAddressesUseCase({ userId });
      res.status(200).send({
        message: "Success",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

export const getUserAddressesController = getUserAddressesControllerBase(
  getUserAddressesUseCase
);
