import { DataSource, FindManyOptions, FindOneOptions, QueryRunner } from "typeorm";
import { ReviewsEntity } from "../orm_models/reviews.entity";
import { ICreateReviewInput, IReview } from "../../domain/reviews/reviews";
import { QueryResult } from "../../utils/querying/apiFeatures.util";
export declare const reviewRepoBase: (dbConnection: DataSource | QueryRunner) => {
    manager: import("typeorm").EntityManager;
    findOne(findData: FindOneOptions<ReviewsEntity>): Promise<IReview>;
    findAll(findData: FindManyOptions<ReviewsEntity>): Promise<IReview[]>;
    createReview(payload: ICreateReviewInput): Promise<IReview>;
    updateReview(review: IReview, payload: Partial<ReviewsEntity>): Promise<IReview>;
    deleteReview(review: IReview): Promise<number>;
    deleteMany(payload: Array<number>): Promise<number>;
    findByQuery(queryParams: {
        [key: string]: string;
    }): Promise<QueryResult<IReview>>;
    toDomainReviews(reviews: ReviewsEntity[]): IReview[];
    toDomainReview(prismaReview: ReviewsEntity): IReview;
};
export declare const reviewRepo: {
    manager: import("typeorm").EntityManager;
    findOne(findData: FindOneOptions<ReviewsEntity>): Promise<IReview>;
    findAll(findData: FindManyOptions<ReviewsEntity>): Promise<IReview[]>;
    createReview(payload: ICreateReviewInput): Promise<IReview>;
    updateReview(review: IReview, payload: Partial<ReviewsEntity>): Promise<IReview>;
    deleteReview(review: IReview): Promise<number>;
    deleteMany(payload: Array<number>): Promise<number>;
    findByQuery(queryParams: {
        [key: string]: string;
    }): Promise<QueryResult<IReview>>;
    toDomainReviews(reviews: ReviewsEntity[]): IReview[];
    toDomainReview(prismaReview: ReviewsEntity): IReview;
};
export interface IReviewRepository {
    findOne(findData: FindOneOptions<ReviewsEntity>): Promise<IReview>;
    findAll(findData: FindManyOptions<ReviewsEntity>): Promise<IReview[]>;
    findByQuery(queryParams: {
        [key: string]: string;
    }): Promise<QueryResult<IReview>>;
    createReview(payload: ICreateReviewInput): Promise<IReview>;
    updateReview(review: IReview, payload: Partial<ReviewsEntity>): Promise<IReview>;
    deleteReview(review: IReview): Promise<number>;
    deleteMany(payload: Array<number>): Promise<number>;
}
