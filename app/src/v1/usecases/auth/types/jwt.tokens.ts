export interface IJwtPayload {
  iat: number;
  exp?: number;
  user: {
    id: string;
    isVerified: boolean;
    email: string;
    role:string
  };
  iss: string;
  aud: string;
}
export interface IJwtAccessPayload extends IJwtPayload {}
export interface IJwtRefreshPayload extends IJwtPayload {}
