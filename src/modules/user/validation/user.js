const Joi = require('joi');

const create = {
	body: Joi.object()
		.keys({
			name: Joi.string().required(),
			email: Joi.string().required().email()
		})
		.unknown(false)
};

module.exports = {
	create
};
