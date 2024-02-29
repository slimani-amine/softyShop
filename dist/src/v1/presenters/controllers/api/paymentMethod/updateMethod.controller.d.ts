import { Request, Response, NextFunction } from "express";
import { UpdateCategoryUseCaseType } from "../../../../usecases/api/category/updateCategory.usecase";
export declare const updatecategoryControllerBase: (updatecategoryUseCase: UpdateCategoryUseCaseType) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const updatecategoryController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
