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
}): import("express-serve-static-core").Router;
