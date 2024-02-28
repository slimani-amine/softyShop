import { MailUserUseCaseType, mailUserUseCaseBuilder } from './mail.usercase';

export type MailUserPasswordResetUseCaseType = MailUserUseCaseType<{ link: string }>;
export const sendUserPasswordResetMailUseCase: MailUserPasswordResetUseCaseType =
  mailUserUseCaseBuilder({
    subject: 'Reset Your Password',
    template: 'reset-password',
  });
