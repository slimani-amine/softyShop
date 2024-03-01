import { exceptionService } from "../../../core/errors/exceptions";
import {
  IProductCreatorRepository,
  productCreatorRepo,
} from "../../../data/repositories/productCreator.repository";
import { IProductCreator } from "../../../domain/productCreator/productCreator";

export type GetStoreProductCreatorUseCaseType = (queryParams: {
  storeId: string;
}) => Promise<IProductCreator[]>;

export const getStoreProductCreatorUseCaseBase =
  (dependencies: { productCreatorRepo: IProductCreatorRepository }) =>
  async (queryParams: {
    storeId: string;
  }): Promise<IProductCreator[]> => {
    const storeId = queryParams;
    const StoreProductCreators =
      (await dependencies.productCreatorRepo.getStoreProductCreators(
        storeId
      )) as any;

    return StoreProductCreators;
  };

export const getStoreProductCreatorUseCase = getStoreProductCreatorUseCaseBase({
  productCreatorRepo,
});
