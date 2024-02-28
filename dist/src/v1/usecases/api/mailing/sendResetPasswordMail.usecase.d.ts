import { MailUserUseCaseType } from './mail.usercase';
export type MailUserPasswordResetUseCaseType = MailUserUseCaseType<{
    link: string;
}>;
export declare const sendUserPasswordResetMailUseCase: MailUserPasswordResetUseCaseType;
