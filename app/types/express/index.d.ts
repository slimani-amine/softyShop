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
      email: string;
      role: string;
    }
    export interface User extends RequestUser {}
  }
}
