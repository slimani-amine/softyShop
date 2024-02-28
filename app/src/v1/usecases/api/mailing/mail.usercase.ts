import { logger } from '../../../core/logger/logger';
import { ENVIRONMENT, MAILING_CONFIG } from '../../../../config';
import { exceptionService } from '../../../core/errors/exceptions';
import { IUser } from '../../../domain/users/user';
import * as nodemailer from 'nodemailer';
import * as hbs from 'nodemailer-express-handlebars';
import { Options } from 'nodemailer/lib/mailer';
import * as path from 'path';
import { UNKNOWN_MAILING_ERROR_MESSAGE } from '../../../domain/mailing/errors';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT),
  secure: process.env.EMAIL_SECURE === 'true' ? true : false,
  auth: {
    user: MAILING_CONFIG.EMAIL,
    pass: MAILING_CONFIG.PWD,
  },
  tls: { rejectUnauthorized: false },
});
const handlebarOptions: hbs.NodemailerExpressHandlebarsOptions = {
  viewEngine: {
    partialsDir: path.resolve(__dirname, './views/'),
    defaultLayout: false,
  },
  viewPath: path.resolve(__dirname, './views/'),
};
transporter.use('compile', hbs(handlebarOptions));

export type MailUserUseCaseBuilderType = (payload: {
  subject: string;
  template: string;
}) => (user: IUser, context: any) => Promise<boolean>;
export type MailUserUseCaseType<T> = (user: IUser, context: T) => Promise<boolean>;

export const mailUserUseCaseBase =
  () => (payload: { subject: string; template: string }) => async (user: IUser, context: any) => {
    try {
      const email =
        ENVIRONMENT === 'production'
          ? user.email
          : MAILING_CONFIG.TEST_EMAIL_RECEIVER === 'ACTUAL_EMAIL'
            ? user.email
            : MAILING_CONFIG.TEST_EMAIL_RECEIVER;

      await transporter.sendMail({
        from: MAILING_CONFIG.SENDER,
        to: email,
        subject: payload.subject,
        template: payload.template,
        context: context,
      } as Options);

      return true;
    } catch (err) {
      console.log(err);
      if (err instanceof Error) {
        logger.error('MAILING', err.message);
      }
      exceptionService.internalException({
        message: UNKNOWN_MAILING_ERROR_MESSAGE,
      });
    }
  };

export const mailUserUseCaseBuilder: MailUserUseCaseBuilderType = mailUserUseCaseBase();
