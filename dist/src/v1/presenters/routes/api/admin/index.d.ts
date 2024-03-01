import { ControllerType } from "../../../../../types/controller";
export declare function getAdminApiRouter(controllers?: {
    createCategory: ControllerType;
    deleteCategory: ControllerType;
    getCategories: ControllerType;
    updateCategory: ControllerType;
    createPaymentMethod: ControllerType;
    deletePaymentMethod: ControllerType;
    getPaymentMethods: ControllerType;
    updatePaymentMethod: ControllerType;
}): import("express-serve-static-core").Router;
