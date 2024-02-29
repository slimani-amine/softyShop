import { GetUserAddressesUseCaseType } from "../../../../usecases/api/addresses/getUserAddresses.usecase";
import { NextFunction, Request, Response } from "express";
export declare const getUserAddressesControllerBase: (getUserAddressesUseCase: GetUserAddressesUseCaseType) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getUserAddressesController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
