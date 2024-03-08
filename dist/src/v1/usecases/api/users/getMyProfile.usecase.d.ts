import { IUsersRepository, usersRepo } from "../../../data/repositories/users.repository";
import { IUser } from "../../../domain/users/user";
import { IRequestUser } from "../../auth/types/IRequestUser";
export type GetMyProfileUseCaseType = (user: IRequestUser) => Promise<IUser>;
export declare const getMyProfileUseCaseBase: (dependencies: {
    usersRepo: IUsersRepository;
}) => (user: IRequestUser) => Promise<IUser>;
export declare const getMyProfileUseCase: GetMyProfileUseCaseType;
