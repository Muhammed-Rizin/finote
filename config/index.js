export const PORT = process.env.PORT || 4000;
export const DATABASE_URL = process.env.DATABASE_URL;

export const CLIENT_URL = process.env.CLIENT_URL;
export const ORIGINS = ["http://localhost:3000"];

export const ACCESS_TOKEN = {
  SECRET: process.env.ACCESS_TOKEN_SECRET,
  EXPIRATION: process.env.ACCESS_TOKEN_EXPIRATION,
  MAX_AGE: 0.5 * 60 * 1000,
};

export const REFRESH_TOKEN = {
  SECRET: process.env.REFRESH_TOKEN_SECRET,
  EXPIRATION: process.env.REFRESH_TOKEN_EXPIRATION,
  MAX_AGE: 30 * 24 * 60 * 60 * 1000,
};

export const TYPES = { INCOME: 1, EXPENSE: 2 };
