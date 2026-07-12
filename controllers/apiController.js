const os = require("os");
const quotes = require("../data/quotes");
const { successResponse, errorResponse } = require("../utils/response");
const { NODE_ENV, API_VERSION } = require("../config/constants");

const getHealth = (req, res) => {
  const healthData = {
    status: "healthy",
    uptimeSeconds: Number(process.uptime().toFixed(2)),
    timestamp: new Date().toISOString(),
    environment: NODE_ENV,
    apiVersion: API_VERSION,
    host: os.hostname(),
    memoryUsageMB: Number((process.memoryUsage().rss / 1024 / 1024).toFixed(2)),
  };

  return successResponse(res, 200, "Server is healthy", healthData);
};

const getQuotes = (req, res) => {
  const { category, limit } = req.query;

  let result = quotes;

  if (category) {
    result = result.filter(
      (quote) =>
        quote.category.toLowerCase() === String(category).toLowerCase(),
    );
  }

  if (limit) {
    const parsedLimit = Number(limit);
    if (Number.isNaN(parsedLimit) || parsedLimit <= 0) {
      return errorResponse(
        res,
        400,
        'Query param "limit" must be a positive number',
      );
    }
    result = result.slice(0, parsedLimit);
  }

  return successResponse(res, 200, "Quotes retrieved successfully", result, {
    count: result.length,
    total: quotes.length,
  });
};

const getRandomQuote = (req, res) => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  return successResponse(
    res,
    200,
    "Random quote retrieved successfully",
    quote,
  );
};

const getQuoteById = (req, res) => {
  const { id } = req.params;
  const parsedId = Number(id);

  if (Number.isNaN(parsedId)) {
    return errorResponse(res, 400, "Quote id must be a number");
  }

  const quote = quotes.find((item) => item.id === parsedId);

  if (!quote) {
    return errorResponse(res, 404, `Quote with id ${parsedId} not found`);
  }

  return successResponse(res, 200, "Quote retrieved successfully", quote);
};

module.exports = {
  getHealth,
  getQuotes,
  getRandomQuote,
  getQuoteById,
};
