"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wishlistRepo = exports.wishlistRepoBase = void 0;
const wishlist_entity_1 = require("../orm_models/wishlist.entity");
const wishlist_1 = require("../../domain/wishlist/wishlist");
const connection_1 = require("../connection");
const apiFeatures_util_1 = require("../../utils/querying/apiFeatures.util");
const user_entity_1 = require("../orm_models/user.entity");
const product_entity_1 = require("../orm_models/product.entity");
const exceptions_1 = require("../../core/errors/exceptions");
const wishlistRepoBase = (dbConnection) => ({
    manager: dbConnection.manager,
    async findOne(findData) {
        const wishlist = await this.manager.findOne(wishlist_entity_1.WishlistEntity, findData);
        return this.toDomainWishlist(wishlist);
    },
    async findAll(findData) {
        console.log("🚀 ~ wishlistRepoBase ~ findData:", findData);
        const wishlists = await this.manager.find(wishlist_entity_1.WishlistEntity, findData);
        console.log("🚀 ~ wishlistRepoBase ~ wishlists:", wishlists);
        return wishlists;
    },
    async createWishlist(payload) {
        const user = await this.manager.findOne(user_entity_1.UserEntity, {
            where: { id: parseInt(payload.userId, 10) },
        });
        if (!user) {
            exceptions_1.exceptionService.notFoundException({
                message: "User not found",
            });
        }
        const product = await this.manager.findOne(product_entity_1.ProductEntity, {
            where: { id: payload.productId },
        });
        if (!product) {
            exceptions_1.exceptionService.notFoundException({
                message: "Product not found",
            });
        }
        const wishlist = this.manager.create(wishlist_entity_1.WishlistEntity, {
            user: user,
            product: product,
        });
        const result = await this.manager.save(wishlist_entity_1.WishlistEntity, wishlist);
        return this.toDomainWishlist(result);
    },
    async deleteWishlist(wishlist) {
        const result = await this.manager.softDelete(wishlist_entity_1.WishlistEntity, {
            id: wishlist.id,
        });
        return result !== null ? 1 : 0;
    },
    async findByQuery(queryParams) {
        const result = await apiFeatures_util_1.ApiFeatures.generateSqlQuery(connection_1.default, "wishlists", queryParams, {});
        return {
            docs: this.toDomainWishlists(result.docs),
            meta: result.meta,
        };
    },
    toDomainWishlists(wishlists) {
        const domainWishlists = wishlists.map((prismaWishlist) => this.toDomainWishlist(prismaWishlist));
        return domainWishlists;
    },
    toDomainWishlist(prismaWishlist) {
        if (!prismaWishlist) {
            return null;
        }
        const wishlist = new wishlist_1.Wishlist({
            id: prismaWishlist.id,
        });
        return wishlist;
    },
});
exports.wishlistRepoBase = wishlistRepoBase;
exports.wishlistRepo = (0, exports.wishlistRepoBase)(connection_1.default);
//# sourceMappingURL=wishlist.repository.js.map