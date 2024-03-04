import { ControllerType } from "../../../../../types/controller";
export declare function getStoresApiRouter(controllers?: {
    createStore: ControllerType;
    getStore: ControllerType;
    deleteStore: ControllerType;
    getOneStore: ControllerType;
    getVendorStores: ControllerType;
    updateStore: ControllerType;
    createProduct: ControllerType;
    getAllProducts: ControllerType;
    getStoreProduct: ControllerType;
    getOneProduct: ControllerType;
    deleteProduct: ControllerType;
    updateProduct: ControllerType;
    createBrand: ControllerType;
    getStoreBrands: ControllerType;
    deleteBrand: ControllerType;
    updateBrand: ControllerType;
    createProductCreator: ControllerType;
    getStoreProductCreators: ControllerType;
    deleteProductCreator: ControllerType;
    updateProductCreator: ControllerType;
}): import("express-serve-static-core").Router;
