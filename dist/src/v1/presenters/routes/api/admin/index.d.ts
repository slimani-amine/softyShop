import { ControllerType } from "../../../../../types/controller";
export declare function getStoresApiRouter(controllers?: {
    createStore: ControllerType;
    getStore: ControllerType;
    deleteStore: ControllerType;
    getOneStore: ControllerType;
    getVendorStores: ControllerType;
    updateStore: ControllerType;
    createCategory: ControllerType;
    deleteCategory: ControllerType;
    getCategories: ControllerType;
    updateCategory: ControllerType;
    createPaymentMethod: ControllerType;
    deletePaymentMethod: ControllerType;
    getPaymentMethods: ControllerType;
    updatePaymentMethod: ControllerType;
}): import("express-serve-static-core").Router;
