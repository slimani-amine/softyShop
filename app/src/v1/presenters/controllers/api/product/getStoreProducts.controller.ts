import { getVendorStoresUseCase, GetVendorStoresUseCaseType } from "../../../../usecases/api/store/getVendorStores.usecase";
import { NextFunction, Request, Response } from "express";

export const getVendorStoresControllerBase =
  (getVendorStoresUseCase: GetVendorStoresUseCaseType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req?.params);

    // Assuming req.user.id is a string
    const userId = req.user.id;

    try {
      const result = await getVendorStoresUseCase({ userId });
      res.status(200).send({
        message: "success",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };

export const getVendorStoresController = getVendorStoresControllerBase(
  getVendorStoresUseCase
);
