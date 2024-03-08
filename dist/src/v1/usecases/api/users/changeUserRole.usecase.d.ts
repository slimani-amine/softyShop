import { IUsersRepository, usersRepo } from "../../../data/repositories/users.repository";
import { IUser } from "../../../domain/users/user";
export type ChangeUserRoleUseCaseType = (userId: string, payload: Partial<IUser>) => Promise<IUser>;
export declare const changeUserRoleUseCaseBase: (dependencies: {
    usersRepo: IUsersRepository;
}) => (userId: string, payload: Partial<IUser>) => Promise<IUser>;
export declare const changeUserRoleUseCase: ChangeUserRoleUseCaseType;
