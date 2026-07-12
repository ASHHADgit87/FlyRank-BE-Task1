require("dotenv").config();

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";
const API_VERSION = "v1";
const API_PREFIX = `/api/${API_VERSION}`;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 100;
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["*"];

module.exports = {
  PORT,
  NODE_ENV,
  API_VERSION,
  API_PREFIX,
  RATE_LIMIT_WINDOW_MS,
  RATE_LIMIT_MAX,
  ALLOWED_ORIGINS,
};
