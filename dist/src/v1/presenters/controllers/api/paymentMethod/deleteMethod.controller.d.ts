import { DeleteCategoryUseCaseType } from "../../../../usecases/api/category/deleteCategory.usecase";
import { NextFunction, Request, Response } from "express";
export declare const deleteCategoryControllerBase: (deleteCategoryUseCase: DeleteCategoryUseCaseType) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const deleteCategoryController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
