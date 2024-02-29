"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialMediaLinks = void 0;
const idAsNumber_1 = require("../types/idAsNumber");
class SocialMediaLinks extends idAsNumber_1.NumberId {
    constructor(payload) {
        super(payload.id);
        this.name = payload.name;
        this.icon = payload.icon;
        this.link = payload.link;
    }
}
exports.SocialMediaLinks = SocialMediaLinks;
//# sourceMappingURL=links.js.map