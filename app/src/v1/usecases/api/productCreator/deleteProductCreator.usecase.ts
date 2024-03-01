import { exceptionService } from "../../../core/errors/exceptions";
import { IProductCreatorRepository, productCreatorRepo } from "../../../data/repositories/productCreator.repository";
import { IProductCreator } from "../../../domain/productCreator/productCreator";

export type DeleteProductCreatorUseCaseType = (queryParams: {
  [id: string]: any;
}) => Promise<number>;

export const deleteProductCreatorUseCaseBase =
  (dependencies: { productCreatorRepo: IProductCreatorRepository }) =>
  async (queryParams: { [id: string]: any }) => {

    const productCreator = await dependencies.productCreatorRepo.findOne({
      where: { id: queryParams.productCreatorId },
    });

    if (!productCreator) {
      exceptionService.notFoundException({
        message: "Product Creator not found",
      });
    }

    const productCreatorsFound = await dependencies.productCreatorRepo.deleteProductCreator(productCreator);

    return productCreatorsFound;
  };

export const deleteProductCreatorUseCase = deleteProductCreatorUseCaseBase({
  productCreatorRepo,
});