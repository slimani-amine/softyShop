// to make the file a module and avoid the TypeScript error
export {};
declare global {
  export namespace Express {
    export interface Request {
      user?: User;
      now: number;
    }
    export interface RequestUser {
      id?: string;
      isVerified: boolean;
      role: string;
      cartId?: string;
    }
    export interface User extends RequestUser {}
  }
}
