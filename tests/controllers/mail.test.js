const request = require('supertest');

const app = require('../../index'); // Adjust the path as necessary

describe('POST /api/send', () => {
    const validData = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
        message: 'This is a test message.'
    };
    it('should send mail and return 200 status', async () => {
        const response = await request(app)
            .post('/api/send')
            .send({...validData})
            .expect(res => {
                expect(res.statusCode).toBe(200);
                expect(res.text).toBe('Mail sent successfully');
            });
    })
    test('should return 400 status for invalid data', async () => {
        const response = await request(app)
            .post('/api/send')
            .send({ name: '', email: '', phone: '', message: '' })
            .expect(res => {
                expect(res.statusCode).toBe(500);
                expect(res.text).toBe('Internal Server Error');
            });
    });
})