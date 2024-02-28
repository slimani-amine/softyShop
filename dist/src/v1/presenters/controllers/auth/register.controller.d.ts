import { RegisterUseCase } from '../../../usecases/auth/register.usecase';
import { Request, Response } from 'express';
declare const registerControllerBase: (registerUserCase: RegisterUseCase) => (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const registerController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export { registerControllerBase, registerController };
export declare const transactionalRegisterController: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: import("express").NextFunction) => Promise<void>;
