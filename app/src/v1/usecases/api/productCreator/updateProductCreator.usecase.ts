import { IProductCreator } from "app/src/v1/domain/productCreator/productCreator";
import {
  IProductCreatorRepository,
  productCreatorRepo,
} from "../../../data/repositories/productCreator.repository";

export type UpdateProductCreatorUseCaseType = (
  productCreator: IProductCreator,
  updatePayload: Partial<IProductCreator>
) => Promise<IProductCreator | null>;

export const updateProductCreatorUseCaseBase =
  (productCreatorRepository: IProductCreatorRepository) =>
  async (
    productCreator: IProductCreator,
    updatePayload: Partial<IProductCreator>
  ) => {
    console.log("🚀 ~ updatePayload:", updatePayload);

    const updatedProductCreator =
      await productCreatorRepository.updateProductCreator(
        productCreator,
        updatePayload as any
      );

    return updatedProductCreator;
  };

export const updateProductCreatorUseCase: UpdateProductCreatorUseCaseType =
  updateProductCreatorUseCaseBase(productCreatorRepo);
