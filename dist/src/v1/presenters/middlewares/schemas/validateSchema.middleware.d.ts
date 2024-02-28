import { Request, Response, NextFunction } from 'express';
import { ZodSchema, z } from 'zod';
export declare enum ZODERROR_CODES {
    UNRECOGNIZED_KEYS = "unrecognized_keys"
}
export declare enum VALIDATION_PATHS {
    BODY = "body",
    PARAMS = "params",
    HEADERS = "headers",
    QUERY = "query",
    COOKIES = "cookies"
}
export declare const validateSchemaMiddleware: (schema: ZodSchema, validationPath?: VALIDATION_PATHS) => (req: Request, Res: Response, next: NextFunction) => {};
export declare const ZodIdValidator: (idName: string) => z.ZodObject<{
    [x: string]: z.ZodString;
}, "strip", z.ZodTypeAny, {
    [x: string]: string;
}, {
    [x: string]: string;
}>;
