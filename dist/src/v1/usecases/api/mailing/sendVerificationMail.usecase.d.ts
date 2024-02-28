import { MailUserUseCaseType } from './mail.usercase';
export type MailUserAccountVerificationUseCaseType = MailUserUseCaseType<{
    link: string;
}>;
export declare const sendUserVerificationMailUseCase: MailUserAccountVerificationUseCaseType;
