import { IUserPasswordResetInformationsRepository } from '../../data/repositories/userPasswordResetInformation.repository';
import { IUsersRepository, usersRepo } from '../../data/repositories/users.repository';
import { IUser } from '../../domain/users/user';
export type PasswordResetPayload = {
    newPassword: string;
    verifyNewPassword: string;
    token: string;
};
export type PasswordResetUseCaseType = (payload: PasswordResetPayload) => Promise<{
    user: IUser;
}>;
export declare const passwordResetUseCaseBase: (dependencies: {
    usersRepo: IUsersRepository;
    userPasswordResetInformationsRepo: IUserPasswordResetInformationsRepository;
}) => (payload: PasswordResetPayload) => Promise<{
    user: IUser;
}>;
export declare function validatePasswordResetPayload(payload: PasswordResetPayload): boolean;
export declare const passwordResetUseCase: PasswordResetUseCaseType;
