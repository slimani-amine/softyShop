import { ZodSchema } from 'zod';
export declare const VALIDATION_ERROR_MESSAGE = "Validation Error";
export declare const INTERNAL_SERVER_ERROR_MESSAGE = "Server Error";
export declare const trimAndValidateSchemaPayload: <T>(schema: ZodSchema, payload: T) => T;
export declare const trimStringValues: <T>(data: T) => T;
export declare const validatePayloadSchema: <T>(schema: ZodSchema, payload: T) => {};
