import { IUsersRepository, usersRepo } from "../../data/repositories/users.repository";
import { IUser } from "../../domain/users/user";
import { IRequestUser } from "./types/IRequestUser";
export type RequestAccountVerificationUseCaseType = (payload: IRequestUser) => Promise<{
    user: IUser;
}>;
export declare const requestAccountVerificationUseCaseBase: (dependencies: {
    usersRepo: IUsersRepository;
    generateAndSendUserAccountVerificationEmail: (user: IUser, usersRepo: IUsersRepository) => Promise<string>;
}) => (user: IRequestUser) => Promise<{
    user: IUser;
}>;
export declare function generateAndSendUserAccountVerificationEmail(user: IUser, usersRepo: IUsersRepository): Promise<string>;
export declare const requestAccountVerificationUseCase: RequestAccountVerificationUseCaseType;
