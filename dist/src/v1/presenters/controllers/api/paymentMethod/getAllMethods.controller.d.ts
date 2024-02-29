import { getAllCategoriesUseCaseType } from "../../../../usecases/api/category/getAllCategories.usecase";
import { NextFunction, Request, Response } from "express";
export declare const getAllCategoriesControllerBase: (getAllCategoriesUseCase: getAllCategoriesUseCaseType) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getAllCategoryController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
