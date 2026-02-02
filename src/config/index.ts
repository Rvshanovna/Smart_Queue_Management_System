import { config } from 'dotenv';
config();

export const envConfig = {
  PORT: Number(process.env.PORT),
  DB_URL: String(process.env.DB_URL),
  TOKEN_KEY: String(process.env.TOKEN_KEY),
  TOKEN_TIME: Number(process.env.TOKEN_SECRET),
  FILE_PATH: String(process.env.FILE_PATH),
  BASE_URL: String(process.env.BASE_URL),
};
