// const request = require('supertest');

// const app = require('../../app'); // Adjust the path as necessary

// describe('POST /api/send', () => {
//     const validData = {
//         name: 'John Doe',
//         email: 'john@example.com',
//         phone: '1234567890',
//         message: 'This is a test message.'
//     };
//     it('should send mail and return 200 status', async () => {
//         const response = await request(app)
//             .post('/api/send')
//             .send({...validData})
//         expect(response.statusCode).toBe(200);
//         expect(response.text).toBe('Mail sent successfully');
//     });
//     test('should return 500 status for invalid data', async () => {
//         const response = await request(app)
//             .post('/api/send')
//             .send({ name: '', email: '', phone: '', message: '' })
//         expect(response.statusCode).toBe(500);
//         expect(response.text).toBe('Internal Server Error');
//     });
// })

const request = require("supertest");
const app = require("../../app");

// MOCK NODEMAILER
jest.mock("nodemailer", () => ({
  createTransport: jest.fn(() => ({
    sendMail: jest.fn().mockResolvedValue(true),
  })),
}));

describe("POST /api/send", () => {
  const validData = {
    name: "John Doe",
    email: "johndoe@gmail.com",
    phone: "09012345678",
    message: "This is a test message.",
  };

  it("should send mail and return 200 status", async () => {
    const response = await request(app)
      .post("/api/send")
      .send(validData);

    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("Mail sent successfully");
  });

  it("should return 500 status for invalid data", async () => {
    const response = await request(app)
      .post("/api/send")
      .send({ name: "", email: "", phone: "", message: "" });

    expect(response.statusCode).toBe(500);
    expect(response.text).toBe("All fields are required");
  });
});
