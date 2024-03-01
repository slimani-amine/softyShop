import { UpdateBrandUseCaseType } from "../../../../usecases/api/brands/updateBrand.usecase";
import { Request, Response, NextFunction } from "express";
export declare const updateBrandControllerBase: (updateBrandUseCase: UpdateBrandUseCaseType) => (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
export declare const updateBrandController: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
