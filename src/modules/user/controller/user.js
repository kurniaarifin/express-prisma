const { prisma } = require('../../../../prisma');

const findAll = async (req, res) => {
	try {
		const users = await prisma.user.findMany({
			include: {
				profile: true
			}
		});
		res.json({ data: users });
	} catch (error) {
		res.json({ message: error });
	}
};

const create = async (req, res) => {
	const { name, email, bio } = req.body;
	try {
		const user = await prisma.user.create({
			data: {
				name,
				email,
				profile: {
					create: { bio }
				}
			}
		});
		res.json({ data: user });
	} catch (error) {
		res.json({ message: error });
	}
};

module.exports = {
	findAll,
	create
};
