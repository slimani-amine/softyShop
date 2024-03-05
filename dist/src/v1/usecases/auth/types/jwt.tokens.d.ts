export interface IJwtPayload {
    iat: number;
    exp?: number;
    isVerified: boolean;
    sub: string;
    role: string;
    iss: string;
    aud: string;
}
export interface IJwtAccessPayload extends IJwtPayload {
}
export interface IJwtRefreshPayload extends IJwtPayload {
}
