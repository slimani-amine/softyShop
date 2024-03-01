import createProductSchema from "../../../presenters/schemas/product/createProduct.schema";
import { exceptionService } from "../../../core/errors/exceptions";
import {
  IProductRepository,
  productRepo,
} from "../../../data/repositories/product.repository";
import { ICreateProductInput, IProduct } from "../../../domain/product/product";
import { trimAndValidateSchemaPayload } from "../../../utils/validation/validate.schema";

export type createProductUseCaseType = (
  payload: ICreateProductInput
) => Promise<{ product: IProduct }>;

export const createProductUseCaseBase =
  (
    dependencies: {
      productRepo: IProductRepository;
    } = {
      productRepo: productRepo,
    }
  ): createProductUseCaseType =>
  async (payload: ICreateProductInput) => {
    validateCreateProductPayload(payload);
    const productCreated = await dependencies.productRepo.createProduct({
      name: payload.name,
      price: payload.price,
      stockNumber: payload.stockNumber,
      publishedAt: new Date(),
      availability: payload.availability,
      isPublished: payload.isPublished,
      isAccepted: payload.isAccepted,
      creatorIds: payload.creatorIds,
      brand_id: payload.brand_id,
      storeId: payload.storeId,
    });

    return {
      product: productCreated,
    };
  };

export function validateCreateProductPayload(
  payload: ICreateProductInput
): ICreateProductInput {
  trimAndValidateSchemaPayload<ICreateProductInput>(
    createProductSchema,
    payload
  );
  return payload;
}

export const createProductUseCase: createProductUseCaseType =
  createProductUseCaseBase({
    productRepo,
  });
