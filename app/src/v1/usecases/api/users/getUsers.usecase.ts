import { IUsersRepository, usersRepo } from '../../../data/repositories/users.repository';
import { QueryResult } from '../../../utils/querying/apiFeatures.util';
import { IUser } from '../../../domain/users/user';

export type GetUsersUseCaseType = (queryParams: {
  [key: string]: any;
}) => Promise<QueryResult<IUser>>;

export const getUsersUseCaseBase =
  (dependencies: { usersRepo: IUsersRepository }) =>
  async (queryParams: { [key: string]: any }) => {
    const result = await dependencies.usersRepo.findByQuery(queryParams);
    return result;
  };

export const getUsersUseCase = getUsersUseCaseBase({ usersRepo: usersRepo });
