import { CreateCategoryUseCaseType } from "../../../../usecases/api/category/createCategory.usecase";
import { Request, Response, NextFunction } from "express";
export declare const createCategoryControllerBase: (createCategoryUseCase: CreateCategoryUseCaseType) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const createCategoryController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
