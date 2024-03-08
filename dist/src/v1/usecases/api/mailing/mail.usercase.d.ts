import { IUser } from "../../../domain/users/user";
export type MailUserUseCaseBuilderType = (payload: {
    subject: string;
    template: string;
}) => (user: IUser, context: any) => Promise<boolean>;
export type MailUserUseCaseType<T> = (user: IUser, context: T) => Promise<boolean>;
export declare const mailUserUseCaseBase: () => (payload: {
    subject: string;
    template: string;
}) => (user: IUser, context: any) => Promise<boolean>;
export declare const mailUserUseCaseBuilder: MailUserUseCaseBuilderType;
