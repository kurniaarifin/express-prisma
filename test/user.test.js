const request = require('supertest');

const app = require('../index');

describe('User api test', () => {
	test('GET /users', (done) => {
		request(app)
			.get('/users')
			.expect('Content-Type', /json/)
			.expect(200)
			.expect((res) => {
				expect(Array.isArray(res.body.data)).toBe(true);
			})
			.end((err, res) => {
				if (err) return done(err);
				return done();
			});
	});
	test('GET /users/:userId', (done) => {
		request(app)
			.get('/users/7')
			.expect('Content-Type', /json/)
			.expect(200)
			.expect((res) => {
				expect(typeof res.body.data === 'object' && res.body.data !== null).toBe(true);
			})
			.end((err, res) => {
				if (err) return done(err);
				return done();
			});
	});
});
