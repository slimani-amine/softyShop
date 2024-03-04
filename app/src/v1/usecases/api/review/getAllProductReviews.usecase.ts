import { IProduct } from "app/src/v1/domain/product/product";
import { productRepo } from "../../../data/repositories/product.repository";
import {
  IReviewRepository,
  reviewRepo,
} from "../../../data/repositories/review.repository";
import { IReview } from "../../../domain/reviews/reviews";

export type GetAllProductReviewsUseCaseType = (
  productId: string
) => Promise<IReview[]>;

export const getAllProductReviewsUseCaseBase =
  (dependencies: { reviewRepo: IReviewRepository }) =>
  async (productId: string): Promise<IReview[]> => {
    const product = (await productRepo.findOne({
      where: { id: productId },
    })) as any;
    console.log("🚀 ~ product:", product)

    const reviews = await dependencies.reviewRepo.findAll({
      where: { product:product },
    });
    console.log("🚀 ~ reviews:", reviews)

    return reviews;
  };

export const getAllProductReviewsUseCase: GetAllProductReviewsUseCaseType =
  getAllProductReviewsUseCaseBase({
    reviewRepo: reviewRepo,
  });
