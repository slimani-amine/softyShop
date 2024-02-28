import { IUserPasswordResetInformationsRepository } from '../../data/repositories/userPasswordResetInformation.repository';
import { IUsersRepository, usersRepo } from '../../data/repositories/users.repository';
import { IUser } from '../../domain/users/user';
import { MailUserPasswordResetUseCaseType, sendUserPasswordResetMailUseCase } from '../api/mailing/sendResetPasswordMail.usecase';
export type RequestPasswordResetUseCaseType = (payload: {
    email: string;
}) => Promise<{
    user: IUser;
}>;
export declare const requestPasswordResetUseCaseBase: (dependencies: {
    usersRepo: IUsersRepository;
    userPasswordResetInformationsRepo: IUserPasswordResetInformationsRepository;
    sendUserPasswordResetMailUseCase: MailUserPasswordResetUseCaseType;
}) => (payload: {
    email: string;
}) => Promise<{
    user: IUser;
}>;
export declare function validatePasswordResetRequestPayload(payload: {
    email: string;
}): boolean;
export declare const requestPasswordResetUseCase: RequestPasswordResetUseCaseType;
