const express = require("express");
const {
  getHealth,
  getQuotes,
  getRandomQuote,
  getQuoteById,
} = require("../controllers/apiController");

const router = express.Router();

router.get("/health", getHealth);
router.get("/quotes", getQuotes);
router.get("/quotes/random", getRandomQuote);
router.get("/quotes/:id", getQuoteById);

module.exports = router;
