import { IProductCreator, ICreateProductCreatorInput } from "../../../domain/productCreator/productCreator";
import { IProductCreatorRepository, productCreatorRepo } from "../../../data/repositories/productCreator.repository";
export type createProductCreatorUseCaseType = (payload: ICreateProductCreatorInput) => Promise<{
    productCreator: IProductCreator;
}>;
export declare const createProductCreatorUseCaseBase: (dependencies?: {
    productCreatorRepo: IProductCreatorRepository;
}) => createProductCreatorUseCaseType;
export declare function validateCreateProductCreatorPayload(payload: ICreateProductCreatorInput): ICreateProductCreatorInput;
export declare const createProductCreatorUseCase: createProductCreatorUseCaseType;
