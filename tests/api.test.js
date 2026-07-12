const request = require("supertest");
const app = require("../app");

describe("Health Endpoint", () => {
  it("should return 200 and healthy status", async () => {
    const res = await request(app).get("/api/v1/health");
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe("healthy");
  });
});

describe("Quotes Endpoints", () => {
  it("should return a list of quotes", async () => {
    const res = await request(app).get("/api/v1/quotes");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it("should return a filtered list by category", async () => {
    const res = await request(app).get("/api/v1/quotes?category=engineering");
    expect(res.statusCode).toBe(200);
    res.body.data.forEach((quote) => {
      expect(quote.category).toBe("engineering");
    });
  });

  it("should return a random quote", async () => {
    const res = await request(app).get("/api/v1/quotes/random");
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveProperty("text");
  });

  it("should return a single quote by id", async () => {
    const res = await request(app).get("/api/v1/quotes/1");
    expect(res.statusCode).toBe(200);
    expect(res.body.data.id).toBe(1);
  });

  it("should return 404 for a non-existent quote id", async () => {
    const res = await request(app).get("/api/v1/quotes/999");
    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
  });

  it("should return 400 for an invalid limit", async () => {
    const res = await request(app).get("/api/v1/quotes?limit=-1");
    expect(res.statusCode).toBe(400);
  });
});

describe("404 Handler", () => {
  it("should return 404 for unknown routes", async () => {
    const res = await request(app).get("/api/v1/unknown-route");
    expect(res.statusCode).toBe(404);
  });
});
