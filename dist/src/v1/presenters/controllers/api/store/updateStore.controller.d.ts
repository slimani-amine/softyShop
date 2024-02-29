import { Request, Response, NextFunction } from "express";
import { UpdateStoreUseCaseType } from "../../../../usecases/api/store/updateStore.usecase";
export declare const updateStoreControllerBase: (updateStoreUseCase: UpdateStoreUseCaseType) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const updateStoreController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
