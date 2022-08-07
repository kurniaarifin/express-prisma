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
	const updatePayload = {
		name: 'updating user has been successfully'
	};
	test('PUT /users/:userId', (done) => {
		request(app)
			.put('/users/2')
			.expect('Content-Type', /json/)
			.send(updatePayload)
			.expect(200)
			.expect((res) => {
				// expect returned data is object
				expect(typeof res.body.data === 'object' && res.body.data !== null).toBe(true);
				// expect returned data:name sama as update payload name
				expect(res.body.data.name === updatePayload.name).toBe(true);
			})
			.end((err, res) => {
				if (err) return done(err);
				return done();
			});
	});
	test('DELETE /users/:userId', (done) => {
		request(app)
			.delete('/users/2')
			.expect('Content-Type', /json/)
			.expect(200)
			.expect((res) => {
				// expect returned data is object
				expect(typeof res.body.data === 'object' && res.body.data !== null).toBe(true);
			})
			.end((err, res) => {
				if (err) return done(err);
				return done();
			});
	});
});
