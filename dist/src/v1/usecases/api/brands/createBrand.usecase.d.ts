import { IBrand, ICreateBrandInput } from "../../../domain/brand/brand";
import { IBrandRepository, brandRepo } from "../../../data/repositories/brand.repository";
export type createBrandUseCaseType = (payload: ICreateBrandInput) => Promise<{
    brand: IBrand;
}>;
export declare const createBrandUseCaseBase: (dependencies?: {
    brandRepo: IBrandRepository;
}) => createBrandUseCaseType;
export declare function validateCreateBrandPayload(payload: ICreateBrandInput): ICreateBrandInput;
export declare const createBrandUseCase: createBrandUseCaseType;
