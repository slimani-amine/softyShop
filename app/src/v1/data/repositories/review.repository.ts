import {
  DataSource,
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  QueryRunner,
} from "typeorm";
import { ReviewsEntity } from "../orm_models/reviews.entity";
import {
  ICreateReviewInput,
  IReview,
  Review,
} from "../../domain/reviews/reviews";
import dataSource from "../connection";
import {
  ApiFeatures,
  QueryResult,
} from "../../utils/querying/apiFeatures.util";
import { UserEntity } from "../orm_models/user.entity";
import { ProductEntity } from "../orm_models/product.entity";

export const reviewRepoBase = (dbConnection: DataSource | QueryRunner) => ({
  manager: dbConnection.manager,

  async findOne(findData: FindOneOptions<ReviewsEntity>): Promise<IReview> {
    const review = await this.manager.findOne(ReviewsEntity, findData);
    return this.toDomainReview(review);
  },

  async findAll(findData: FindManyOptions<ReviewsEntity>): Promise<IReview[]> {
    console.log("🚀 ~ findAll ~ findData:", findData)
    const reviews = await this.manager.find(ReviewsEntity, findData);
    console.log("🚀 ~ findAll ~ reviews:", reviews)
    return this.toDomainReviews(reviews);
  },

  async createReview(payload: ICreateReviewInput): Promise<IReview> {
    const user = await this.manager.findOne(UserEntity, {
      where: { id: parseInt(payload.userId, 10) },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const product = await this.manager.findOne(ProductEntity, {
      where: { id: payload.productId },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    const review = this.manager.create(ReviewsEntity, {
      review: payload.review,
      rating: payload.rating,
      user: user,
      product: product,
    } as DeepPartial<ReviewsEntity>);

    const result = await this.manager.save(ReviewsEntity, review);
    return this.toDomainReview(result);
  },

  async updateReview(
    review: IReview,
    payload: Partial<ReviewsEntity>
  ): Promise<IReview> {
    await this.manager.update(
      ReviewsEntity,
      { id: review.getIdAsNumber() },
      payload
    );
    const updatedReview = await this.manager.findOne(ReviewsEntity, {
      where: { id: review.getIdAsNumber().toString() },
    });
    return this.toDomainReview(updatedReview);
  },

  async deleteReview(review: IReview): Promise<number> {
    const result = await this.manager.softDelete(ReviewsEntity, {
      id: review.id,
    });
    return result !== null ? 1 : 0;
  },

  async deleteMany(payload: Array<number>): Promise<number> {
    const result = await this.manager.softDelete(ReviewsEntity, payload);
    return result.affected;
  },

  async findByQuery(queryParams: {
    [key: string]: string;
  }): Promise<QueryResult<IReview>> {
    const result = await ApiFeatures.generateSqlQuery(
      dataSource,
      "reviews",
      queryParams,
      {}
    );
    return {
      docs: this.toDomainReviews(result.docs),
      meta: result.meta,
    };
  },

  toDomainReviews(reviews: ReviewsEntity[]): IReview[] {
    const domainReviews = reviews.map((prismaReview) =>
      this.toDomainReview(prismaReview)
    );
    return domainReviews;
  },

  toDomainReview(prismaReview: ReviewsEntity): IReview {
    if (!prismaReview) {
      return null;
    }
    const review = new Review({
      id: prismaReview.id,
      review: prismaReview.review,
      rating: prismaReview.rating,
      
    });
    return review;
  },
});

export const reviewRepo = reviewRepoBase(dataSource);

export interface IReviewRepository {
  findOne(findData: FindOneOptions<ReviewsEntity>): Promise<IReview>;
  findAll(findData: FindManyOptions<ReviewsEntity>): Promise<IReview[]>;
  findByQuery(queryParams: {
    [key: string]: string;
  }): Promise<QueryResult<IReview>>;
  createReview(payload: ICreateReviewInput): Promise<IReview>;
  updateReview(
    review: IReview,
    payload: Partial<ReviewsEntity>
  ): Promise<IReview>;
  deleteReview(review: IReview): Promise<number>;
  deleteMany(payload: Array<number>): Promise<number>;
}
