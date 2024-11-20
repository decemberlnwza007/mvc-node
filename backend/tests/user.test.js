const request = require('supertest');
const app = require('../app');

describe('User API', () => {
    it('should get all users', async () => {
        const res = await request(app).get('/api/users');
        expect(req.statusCode).toEqual(200);
        expect(req.body).toHaveProperty('users');
    });
});