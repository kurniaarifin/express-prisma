const { prisma } = require('../../../../prisma');

const findAll = async (req, res) => {
	try {
		const users = await prisma.user.findMany();
		res.json({ data: users });
	} catch (error) {
		res.json({ message: error });
	}
};

module.exports = {
	findAll
};
