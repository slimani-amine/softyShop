import { Request, Response, NextFunction } from "express";
import { PublishStoreUseCaseType } from "../../../../usecases/api/store/publishStore.usecase";
export declare const publishStoreControllerBase: (publishStoreUseCase: PublishStoreUseCaseType) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const publishStoreController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
