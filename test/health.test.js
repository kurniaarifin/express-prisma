const request = require('supertest');

const app = require('../index');

describe('Health check!', () => {
	test('GET /', (done) => {
		request(app).get('/').expect('Content-Type', /json/).expect(200).end((err, res) => {
			if (err) return done(err);
			return done();
		});
	});
});
