import { IBrandRepository, brandRepo } from "../../../data/repositories/brand.repository";
export type DeleteBrandUseCaseType = (queryParams: {
    [id: string]: any;
}) => Promise<number>;
export declare const deleteBrandUseCaseBase: (dependencies: {
    brandRepo: IBrandRepository;
}) => (queryParams: {
    [id: string]: any;
}) => Promise<number>;
export declare const deleteBrandUseCase: (queryParams: {
    [id: string]: any;
}) => Promise<number>;
