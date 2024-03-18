import { getVendorStoresUseCase } from "../../../usecases/api/store/getVendorStores.usecase";
import { Request, Response, NextFunction } from "express";

export const myStoreMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const storeId = req.params.id;
  const userId = req.user.id;
  const role = req.user?.role;
  if (role !== "vendor") next();
  try {
    const myStores = await getVendorStoresUseCase({ userId });
    const isStoreInMyStores = myStores.some((store) => {
      return store.id == storeId;
    });

    if (!isStoreInMyStores && role !== "admin") {
      return res.status(403).json({
        message: "You do not have access to this store.",
      });
    }

    next();
  } catch (err) {
    throw err;
  }
};
