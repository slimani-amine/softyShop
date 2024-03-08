import { ControllerType } from "../../../../../types/controller";
export declare function getUsersApiRouter(controllers?: {
    getUsers: ControllerType;
    updateMyProfileController: ControllerType;
    getMeController: ControllerType;
    createAddress: ControllerType;
    deleteAddress: ControllerType;
    userAddresses: ControllerType;
    oneAdress: ControllerType;
    updateAddress: ControllerType;
    changeUserRole: ControllerType;
}): import("express-serve-static-core").Router;
