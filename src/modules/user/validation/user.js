const Joi = require('joi');

// validate request body create new user
const create = {
	body: Joi.object()
		.keys({
			name: Joi.string().required(),
			email: Joi.string().required().email(),
			bio: Joi.string().optional()
		})
		.unknown(false)
};

// validate request body on updating user
const update = {
	body: Joi.object()
		.keys({
			name: Joi.string().optional(),
			email: Joi.string().optional().email(),
			bio: Joi.string().optional()
		})
		.unknown(false)
};

module.exports = {
	create,
	update
};
