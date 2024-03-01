import { IBrand } from "app/src/v1/domain/brand/brand";
import { IBrandRepository } from "../../../data/repositories/brand.repository";
export type UpdateBrandUseCaseType = (brand: IBrand, updatePayload: Partial<IBrand>) => Promise<IBrand | null>;
export declare const updateBrandUseCaseBase: (brandRepository: IBrandRepository) => (brand: IBrand, updatePayload: Partial<IBrand>) => Promise<IBrand>;
export declare const updateBrandUseCase: UpdateBrandUseCaseType;
