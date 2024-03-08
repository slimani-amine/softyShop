import { IUsersRepository, usersRepo } from "../../../data/repositories/users.repository";
import { IUser } from "../../../domain/users/user";
import { IRequestUser } from "../../auth/types/IRequestUser";
export type UpdateMyProfileUseCaseType = (user: IRequestUser, payload: Partial<IUser>) => Promise<IUser>;
export declare const updateMyProfileUseCaseBase: (dependencies: {
    usersRepo: IUsersRepository;
}) => (user: IRequestUser, payload: Partial<IUser>) => Promise<IUser>;
export declare const updateMyProfileUseCase: UpdateMyProfileUseCaseType;
