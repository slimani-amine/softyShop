import { IUsersRepository, usersRepo } from '../../data/repositories/users.repository';
import { IUser } from '../../domain/users/user';
import { CreateUserTokensUseCaseType, createUserTokensUseCase } from './createUserTokens.usecase';
import { ILoginPayload } from '../../domain/auth/login';
export type LoginUseCaseType = (payload: ILoginPayload) => Promise<{
    user: IUser;
    accessToken: string;
    refreshToken: string;
}>;
export declare const loginUseCaseBase: (dependencies: {
    usersRepo: IUsersRepository;
    createUserTokensUseCase: CreateUserTokensUseCaseType;
}) => (loginData: ILoginPayload) => Promise<{
    accessToken: string;
    refreshToken: string;
    user: IUser;
}>;
export declare function validateLoginPayload(payload: ILoginPayload): boolean;
export declare const loginUseCase: LoginUseCaseType;
