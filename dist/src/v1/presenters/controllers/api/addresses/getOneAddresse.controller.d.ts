import { GetOneAddressUseCaseType } from '../../../../usecases/api/addresses/getOneAdresse.usecase';
import { NextFunction, Request, Response } from 'express';
export declare const getOneAddressControllerBase: (getOneAddressUseCase: GetOneAddressUseCaseType) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getOneAddressController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
