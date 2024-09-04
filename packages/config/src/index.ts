if (!globalThis.process.env.DB_URL)
  throw new Error("DB_URL env var is not set");

export const DB_URL = globalThis.process.env.DB_URL;
