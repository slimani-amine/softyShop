import { DeleteBrandUseCaseType } from "../../../../usecases/api/brands/deleteBrand.usecase";
import { NextFunction, Request, Response } from "express";
export declare const deleteBrandControllerBase: (deleteBrandUseCase: DeleteBrandUseCaseType) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const deleteBrandController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
