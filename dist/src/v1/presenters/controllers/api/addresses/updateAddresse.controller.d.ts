import { UpdateAddressUseCaseType } from "../../../../usecases/api/addresses/updateAddresse.usecase";
import { Request, Response, NextFunction } from "express";
export declare const updateAddressControllerBase: (updateAddressUseCase: UpdateAddressUseCaseType) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const updateAddressController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
