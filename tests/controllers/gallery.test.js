const request = require("supertest");
const app = require("../../app");

// for fetching images
describe("GET /gallery", () => {
    // test for fetching images
  it("should fetch gallery images with pagination", async () => {
    const res = await request(app).get("/gallery?limit=10&offset=0");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
  // error from fetching images
  it("should handle errors when fetching gallery images", async () => {
    const res = await request(app).get("/gallery?limit=-1&offset=-1");
    expect(res.statusCode).toEqual(500);
  });
});

// for adding image to the db
describe("POST /gallery", () => {
    // test for adding image to the db
  it("should add an image to the gallery", async () => {
    const res = await request(app)
      .post("/gallery")
      .send({
        imageUrl: "https://example.com/image.jpg",
        publicId: "example_image",
      });
    expect(res.statusCode).toEqual(200);
  });
  // post without authentication
  it("should return 401 if no token is provided", async () => {
    const res = await request(app)
      .post("/gallery")
      .send({
        imageUrl: "https://example.com/image.jpg",
        publicId: "example_image",
      });
    expect(res.statusCode).toEqual(401);
  });
});

// for deleting an image from the db
describe("DELETE /gallery/:id", () => {
    // test for deleting an image from the db
  it("should delete an image from the gallery", async () => {
    const res = await request(app).delete("/gallery/example_image");
    expect(res.statusCode).toEqual(200);
  });

  //   it should have errors when deleting an image
  it("should handle errors when deleting an image", async () => {
    const res = await request(app).delete("/gallery/invalid_id");
    expect(res.statusCode).toEqual(500);
  });
});
