//holds all our environment variables.
//makes it easier to access them withtheir types.

interface Env {
  PORT: string;
  NODE_ENV: string;
  MONGO_URL: string;
  NODEMAILER_EMAIL: string;
  JWT_SECRET: string;
  JWT_EXPIRES: string;
  REFRESH_TOKEN_EXPIRES: string;
  CLIENT_URL: string;
  ACCESS_KEY_ID: string;
  SECRET_ACCESS_KEY: string;
  BUCKET_NAME: string;
  IMAAGI_KEY: string;
}

export default {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_URL: process.env.MONGO_URL,
  NODEMAILER_EMAIL: process.env.NODEMAILER_EMAIL,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES: process.env.JWT_EXPIRES,
  REFRESH_TOKEN_EXPIRES: process.env.REFRESH_TOKEN_EXPIRES,
  CLIENT_URL: process.env.CLIENT_URL,
  ACCESS_KEY_ID: process.env.ACCESS_KEY_ID,
  SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
  BUCKET_NAME: process.env.BUCKET_NAME,
  IMAAGI_KEY: process.env.IMAAGI_KEY,
} as Env;
