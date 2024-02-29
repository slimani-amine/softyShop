import { GetVendorStoresUseCaseType } from "../../../../usecases/api/store/getVendorStores.usecase";
import { NextFunction, Request, Response } from "express";
export declare const getVendorStoresControllerBase: (getVendorStoresUseCase: GetVendorStoresUseCaseType) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getVendorStoresController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
