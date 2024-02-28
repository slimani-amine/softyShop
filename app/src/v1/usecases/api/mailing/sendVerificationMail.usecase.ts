import { MailUserUseCaseType, mailUserUseCaseBuilder } from './mail.usercase';

export type MailUserAccountVerificationUseCaseType = MailUserUseCaseType<{ link: string }>;
export const sendUserVerificationMailUseCase: MailUserAccountVerificationUseCaseType =
  mailUserUseCaseBuilder({
    subject: 'Verify Your Email',
    template: 'verification',
  });
