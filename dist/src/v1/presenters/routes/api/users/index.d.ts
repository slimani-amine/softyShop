import { ControllerType } from '../../../../../types/controller';
export declare function getUsersApiRouter(controllers?: {
    getUsers: ControllerType;
    updateMyProfileController: ControllerType;
    getMeController: ControllerType;
}): import("express-serve-static-core").Router;
