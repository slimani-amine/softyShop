import { IProductCreator } from "app/src/v1/domain/productCreator/productCreator";
import { IProductCreatorRepository } from "../../../data/repositories/productCreator.repository";
export type UpdateProductCreatorUseCaseType = (productCreator: IProductCreator, updatePayload: Partial<IProductCreator>) => Promise<IProductCreator | null>;
export declare const updateProductCreatorUseCaseBase: (productCreatorRepository: IProductCreatorRepository) => (productCreator: IProductCreator, updatePayload: Partial<IProductCreator>) => Promise<IProductCreator>;
export declare const updateProductCreatorUseCase: UpdateProductCreatorUseCaseType;
