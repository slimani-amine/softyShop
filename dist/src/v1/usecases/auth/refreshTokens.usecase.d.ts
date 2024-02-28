import { IUsersRepository, usersRepo } from '../../data/repositories/users.repository';
import { IUser } from '../../domain/users/user';
import { IRequestUser } from './types/IRequestUser';
export type RefreshUserTokensUseCaseType = (payload: IRequestUser) => Promise<{
    accessToken: string;
    refreshToken: string;
    user: IUser;
}>;
export declare const refreshUserTokensUseCaseBase: (dependencies?: {
    usersRepo: IUsersRepository;
}) => RefreshUserTokensUseCaseType;
export declare const refreshUserTokensUseCase: RefreshUserTokensUseCaseType;
