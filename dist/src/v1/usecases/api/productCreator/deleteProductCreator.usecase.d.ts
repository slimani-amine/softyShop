import { IProductCreatorRepository, productCreatorRepo } from "../../../data/repositories/productCreator.repository";
export type DeleteProductCreatorUseCaseType = (queryParams: {
    [id: string]: any;
}) => Promise<number>;
export declare const deleteProductCreatorUseCaseBase: (dependencies: {
    productCreatorRepo: IProductCreatorRepository;
}) => (queryParams: {
    [id: string]: any;
}) => Promise<number>;
export declare const deleteProductCreatorUseCase: (queryParams: {
    [id: string]: any;
}) => Promise<number>;
