import { IUser } from "../../domain/users/user";
export type CreateUserTokensUseCaseType = (payload: IUser) => Promise<{
    accessToken: string;
    refreshToken: string;
}>;
export declare const createUserTokensUseCaseBase: () => CreateUserTokensUseCaseType;
export declare const createUserAccessToken: (user: IUser) => string;
export declare const createUserRefreshToken: (user: IUser) => string;
export declare const createUserTokensUseCase: CreateUserTokensUseCaseType;
