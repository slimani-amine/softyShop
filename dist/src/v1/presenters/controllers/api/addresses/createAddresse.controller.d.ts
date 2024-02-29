import { createAddressUseCaseType } from "../../../../usecases/api/addresses/createAddresse.usecase";
import { NextFunction, Request, Response } from "express";
declare const createAddressControllerBase: (createAddressUseCase: createAddressUseCaseType) => (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
declare const createAddressController: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
export { createAddressControllerBase, createAddressController };
