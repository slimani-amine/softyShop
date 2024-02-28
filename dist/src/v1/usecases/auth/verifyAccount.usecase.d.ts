import { IUsersRepository, usersRepo } from '../../data/repositories/users.repository';
import { IVerifyAccountInput } from './types/verifyAccount';
import { IUser } from '../../domain/users/user';
import { CreateUserTokensUseCaseType, createUserTokensUseCase } from './createUserTokens.usecase';
export type VerifyAccountUseCaseType = (payload: IVerifyAccountInput) => Promise<{
    user: IUser;
    accessToken: string;
    refreshToken: string;
}>;
export declare const verifyAccountUseCaseBase: (dependencies?: {
    usersRepo: IUsersRepository;
    createUserTokensUseCase: CreateUserTokensUseCaseType;
}) => VerifyAccountUseCaseType;
export declare function validateVerifyAccountPayload(payload: IVerifyAccountInput): true;
export declare const verifyAccountUseCase: VerifyAccountUseCaseType;
