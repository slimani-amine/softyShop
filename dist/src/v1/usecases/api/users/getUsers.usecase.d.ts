import { IUsersRepository, usersRepo } from '../../../data/repositories/users.repository';
import { QueryResult } from '../../../utils/querying/apiFeatures.util';
import { IUser } from '../../../domain/users/user';
export type GetUsersUseCaseType = (queryParams: {
    [key: string]: any;
}) => Promise<QueryResult<IUser>>;
export declare const getUsersUseCaseBase: (dependencies: {
    usersRepo: IUsersRepository;
}) => (queryParams: {
    [key: string]: any;
}) => Promise<QueryResult<IUser>>;
export declare const getUsersUseCase: (queryParams: {
    [key: string]: any;
}) => Promise<QueryResult<IUser>>;
