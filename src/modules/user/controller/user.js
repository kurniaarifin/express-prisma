const { prisma } = require('../../../../prisma');
const httpStatus = require('http-status');

const findAll = async (req, res) => {
	let { page = 1, limit = 10 } = req.query;
	// convert page & limit to int
	page = Number(page);
	limit = Number(limit);

	try {
		// TODO: add pagination
		const skip = limit * (page - 1);
		const [ users, count ] = await prisma.$transaction([
			prisma.user.findMany({
				include: {
					profile: {
						select: {
							bio: true
						}
					}
				},
				take: limit,
				skip
			}),
			prisma.user.count()
		]);
		const meta = {
			count,
			page,
			limit
		};
		res.json({ code: httpStatus.OK, message: `Success get user(s)`, data: users, meta });
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
							profile: {
								select: {
									bio: true
								}
							}
						}
					});
				}
			});
		res.json({ code: httpStatus.OK, message: `Success create user`, data: user });
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
							profile: {
								select: {
									bio: true
								}
							}
						}
					});
				}
			});
		res.json({ code: httpStatus.OK, message: `Success updating user with id ${userId}`, data: user });
	} catch (error) {
		res.json({ code: httpStatus.INTERNAL_SERVER_ERROR, message: error });
	}
};

const findOne = async (req, res) => {
	const { userId } = req.params;
	try {
		const user = await prisma.user.findFirst({
			where: {
				id: Number(userId)
			},
			include: {
				profile: {
					select: {
						bio: true
					}
				}
			}
		});
		res.json({ code: httpStatus.OK, message: `Success get user with id ${userId}`,data: user });
	} catch (error) {
		res.json({ code: httpStatus.INTERNAL_SERVER_ERROR, message: error });
	}
};

const destroy = async (req, res) => {
	const { userId } = req.params;
	try {
		// destroy user
		await prisma.user.delete({
			where: {
				id: Number(userId)
			}
		});
		res.json({ code: httpStatus.OK, message: `Success deleting user with id ${userId}`,data: {} });
	} catch (error) {
		console.log(error)
		res.json({ code: httpStatus.OK, message: error });
	}
};

module.exports = {
	findAll,
	create,
	update,
	findOne,
	destroy
};
