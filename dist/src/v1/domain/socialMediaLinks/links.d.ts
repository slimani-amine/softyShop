import { NumberId } from "../types/idAsNumber";
export interface ISocialMediaLink {
    id: string;
    name: string;
    icon: string;
    link: string;
}
export declare class SocialMediaLinks extends NumberId implements ISocialMediaLink {
    id: string;
    name: string;
    icon: string;
    link: string;
    constructor(payload: {
        id: string;
        name: string;
        icon: string;
        link: string;
    });
}
export interface ISocialMediaLinkInput {
    name: string;
    icon: string;
    link: string;
}
