const Joi = require('joi');
const _ = require('lodash');

const validate = (schema) => (req, res, next) => {
	const validSchema = _.pick(schema, [ 'body', 'params', 'query' ]);
	const obj = _.pick(req, Object.keys(validSchema));
	const { error } = Joi.compile(validSchema).prefs({ errors: { label: 'key' }, abortEarly: false }).validate(obj);
	if (error == null) {
		next();
	} else {
		const { details } = error;
		const message = details.map((i) => i.message).join(',');
		res.status(422).json({ message });
	}
};

module.exports = validate;
