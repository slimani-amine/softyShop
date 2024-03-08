import { resolve } from "path";

export const ENVIRONMENT = process.env.NODE_ENV;
export const PORT = process.env.SERVER_PORT;
export const API_BASE_URL = process.env.API_BASE_URL;
export const DOCS_API_BASE_URL = process.env.DOCS_API_BASE_URL;
export const CORS_URL = process.env.CORS_URL;

export const JWT_KEYS = {
  SECRET_KEY: process.env.JWT_SECRET_KEY,
  PUBLIC_KEY: process.env.JWT_PUBLIC_KEY,
};
export const STATIC_FILES_PATH = resolve(__dirname, "../../../images");
export const DEFAULT_USER_PROFILE_PICTURE_LINK =
  API_BASE_URL + "/images/default.png";

export const DEFAULT_PRODUCT_IMAGE_LINK =
  API_BASE_URL + "/images/defaultProduct.png";
export const TOKENS_INFO = {
  ACCESS_TOKEN_VALIDATION_PERIOD: process.env.ACCESS_TOKEN_VALIDITY_PERIOD,
  REFRESH_TOKEN_VALIDATION_PERIOD: process.env.REFRESH_TOKEN_VALIDITY_PERIOD,
  ISSUER: process.env.TOKEN_ISSUER || "SoftyShopTeam",
  AUDIENCE: process.env.TOKEN_AUDIENCE || "SoftyShopTeam",
  REFRESH_TOKEN_COOKIE_NAME: process.env.JWT_REFRESH_COOKIE_NAME,
  ACCESS_TOKEN_COOKIE_NAME: process.env.JWT_ACCESS_COOKIE_NAME,
  REFRESH_TOKEN_EXPIRATION_IN_MILLISECONDS: parseInt(
    process.env.REFRESH_TOKEN_EXPIRATION_IN_MILLISECONDS
  ),
  ACCESS_TOKEN_EXPIRATION_IN_MILLISECONDS: parseInt(
    process.env.ACCESS_TOKEN_EXPIRATION_IN_MILLISECONDS
  ),
};
export const MAILING_CONFIG = {
  EMAIL: process.env.EMAIL,
  PWD: process.env.EMAIL_PWD,
  SENDER: process.env.EMAIL_SENDER,
  TEST_EMAIL_RECEIVER: process.env.TEST_EMAIL_RECEIVER,
};
export const FRONT_END_BASE_URL = process.env.FRONT_BASE_URL;
