const { prisma } = require('../../../../prisma');
const httpStatus = require('http-status');

const findAll = async (req, res) => {
	try {
		// find user(s) with profile
		const users = await prisma.user.findMany({
			include: {
				profile: true
			}
		});
		res.json({ code: httpStatus.OK, data: users });
	} catch (error) {
		res.json({ code: httpStatus.INTERNAL_SERVER_ERROR, message: error });
	}
};

const create = async (req, res) => {
	const { name, email, bio } = req.body;
	try {
		// create user & user profile
		const user = await prisma.user
			.create({
				data: {
					name,
					email,
					profile: {
						create: { bio }
					}
				}
			})
			.then(async (result) => {
				if (result) {
					return await prisma.user.findFirst({
						where: {
							id: result.id
						},
						include: {
							profile: true
						}
					});
				}
			});
		res.json({ code: httpStatus.OK, data: user });
	} catch (error) {
		res.json({ code: httpStatus.INTERNAL_SERVER_ERROR, message: error });
	}
};

const update = async (req, res) => {
	const { userId } = req.params;
	const { name, email, bio } = req.body;
	try {
		const user = await prisma.user
			.update({
				where: {
					id: Number(userId)
				},
				data: {
					name,
					email
				}
			})
			.then(async (result) => {
				// update user profile:bio if success updating user && request body:bio exist
				if (result) {
					if (bio)
						await prisma.profile.update({
							where: {
								userId: Number(userId)
							},
							data: {
								bio
							}
						});
					// return updated user with profile
					return await prisma.user.findUnique({
						where: {
							id: Number(userId)
						},
						include: {
							profile: true
						}
					});
				}
			});
		res.json({ code: httpStatus.OK, data: user });
	} catch (error) {
		res.json({ code: httpStatus.INTERNAL_SERVER_ERROR, message: error });
	}
};

module.exports = {
	findAll,
	create,
	update
};
