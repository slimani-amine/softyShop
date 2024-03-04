import { IUsersRepository, usersRepo } from "../../data/repositories/users.repository";
import { ICreateUserInput, IUser } from "../../domain/users/user";
import { generateAndSendUserAccountVerificationEmail } from "./requestAccountVerification.usecase";
import { CreateUserTokensUseCaseType, createUserTokensUseCase } from "./createUserTokens.usecase";
export type RegisterUseCase = (payload: ICreateUserInput) => Promise<{
    user: IUser;
    accessToken: string;
    refreshToken: string;
}>;
export declare const registerUseCaseBase: (dependencies?: {
    usersRepo: IUsersRepository;
    generateAndSendUserAccountVerificationEmail: typeof generateAndSendUserAccountVerificationEmail;
    createUserTokensUseCase: CreateUserTokensUseCaseType;
}) => RegisterUseCase;
export declare function validateRegisterPayload(payload: ICreateUserInput): ICreateUserInput;
export declare const registerUseCase: RegisterUseCase;
