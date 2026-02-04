const jest = require('jest');

// test auth middleware
const { authenticateToken } = require('../../middleware/auth');

describe('Auth Middleware', () => {
  let req, res, next;
    beforeEach(() => {
        req = { headers: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        next = jest.fn();
    });

    it('should return 401 if no token is provided', () => {
        authenticateToken(req, res, next);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith('No token provided');
    });
    it('should return 403 if token is invalid', () => {
        req.headers['authorization'] = 'Bearer invalidtoken';
        authenticateToken(req, res, next);
        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.send).toHaveBeenCalledWith('Invalid token');
    });

    // Note: For a valid token test, you would need to generate a valid JWT token
    // using the same secret as in your middleware. This is just a placeholder.
    it('should call next if token is valid', () => {
        const validToken = 'validtoken'; // Replace with actual valid token generation
        req.headers['authorization'] = `Bearer ${validToken}`;
        authenticateToken(req, res, next);
        expect(next).toHaveBeenCalled();
    });
});