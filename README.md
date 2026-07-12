# FlyRank BE Task 1
**FlyRank BE Task 1** is a production-styled Express.js REST API built for the FlyRank Backend AI Engineering internship (BE-01). It goes beyond a minimal two-endpoint exercise, implementing a versioned API with structured responses, centralized error handling, rate limiting, security middleware, request logging, automated tests, and CI — all in a clean, scalable folder structure.

---

# Architecture
FlyRank BE Task 1 follows a **Layered MVC-style Architecture**, separating routing, business logic, middleware, and utilities for clarity and maintainability.

| Layer | Responsibility |
|---|---|
| Routes | Defines and maps API endpoints to controllers |
| Controllers | Handles request logic and shapes responses |
| Middleware | Logging, rate limiting, error handling, security |
| Data | In-memory dataset powering the quotes resource |
| Utils | Response formatting and async error wrapping |
| Config | Centralized environment and constants management |

---

# API Design
The API follows REST conventions with explicit versioning under `/api/v1`, consistent JSON envelopes for every response, and standard HTTP status codes for success and failure states.

---

# Features
## Core Endpoints
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/v1` | API metadata and available endpoints |
| GET | `/api/v1/health` | Server health, uptime, memory, environment |
| GET | `/api/v1/quotes` | List quotes, filterable by category and limit |
| GET | `/api/v1/quotes/random` | Fetch one random quote |
| GET | `/api/v1/quotes/:id` | Fetch a single quote by id |

## Engineering & Reliability
| Capability | Description |
|---|---|
| Security Headers | Helmet-based HTTP header hardening |
| CORS Control | Configurable allowed origins via environment variables |
| Rate Limiting | IP-based request throttling with custom JSON error responses |
| Centralized Error Handling | Single source of truth for error formatting and logging |
| Structured Logging | Per-request method, path, status, and latency logging |
| Graceful Shutdown | Clean process termination on SIGINT/SIGTERM with forced timeout |
| Automated Testing | Jest + Supertest coverage for all endpoints and edge cases |
| CI Pipeline | GitHub Actions running the test suite on every push |
| Containerized | Dockerfile included for portable deployment |

---

# Workflow
```text
Client Request
      ↓
Security & CORS Middleware
      ↓
Request Logger
      ↓
Rate Limiter
      ↓
Route → Controller
      ↓
Structured JSON Response
      ↓
Centralized Error Handler (on failure)
```

---

# Tech Stack
| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js 5 |
| Security | Helmet, CORS |
| Performance | Compression |
| Reliability | express-rate-limit |
| Testing | Jest, Supertest |
| CI/CD | GitHub Actions |
| Containerization | Docker |

---

# Getting Started
```bash
git clone https://github.com/ASHHADgit87/FlyRank-BE-Task1.git
cd FlyRank-BE-Task1
npm install
copy .env.example .env
npm run dev
```

Server runs at `http://localhost:5000`.

---

# Testing
```bash
npm test
```

---

# Live Demo


---

# Creator & Developer
**Muhammad Ashhadullah Zaheer**
LinkedIn: https://www.linkedin.com/in/muhammad-ashhadullah-zaheer-41194a340/
