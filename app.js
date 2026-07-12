const express = require("express");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");

const { API_PREFIX, ALLOWED_ORIGINS } = require("./config/constants");
const logger = require("./middleware/logger");
const rateLimiter = require("./middleware/rateLimiter");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
const apiRoute = require("./routes/apiRoute");
const { successResponse } = require("./utils/response");

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        connectSrc: ["'self'"],
        imgSrc: ["'self'", "data:"],
      },
    },
  }),
);
app.use(
  cors({
    origin: ALLOWED_ORIGINS.includes("*") ? true : ALLOWED_ORIGINS,
  }),
);
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

app.get(API_PREFIX, (req, res) => {
  return successResponse(res, 200, "FlyRank BE Task 1 API", {
    name: "FlyRank BE Task 1",
    version: "v1",
    endpoints: [
      "GET /api/v1/health",
      "GET /api/v1/quotes",
      "GET /api/v1/quotes/random",
      "GET /api/v1/quotes/:id",
    ],
  });
});

app.use(API_PREFIX, rateLimiter, apiRoute);
app.use(express.static(path.join(__dirname, "public")));

app.use(notFound);
app.use(errorHandler);

module.exports = app;
