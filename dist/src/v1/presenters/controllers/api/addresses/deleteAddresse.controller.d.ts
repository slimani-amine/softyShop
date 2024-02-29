import { DeleteAddressUseCaseType } from "../../../../usecases/api/addresses/deleteAddresse.usecase";
import { NextFunction, Request, Response } from "express";
export declare const deleteAddressesControllerBase: (deleteAddressUseCase: DeleteAddressUseCaseType) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const deleteAddressesController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
