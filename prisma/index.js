// prisma
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// prisma connection validation
const authenticate = (async () => {
	try {
		await prisma.$connect();
	} catch (error) {
		await prisma.$disconnect();
		process.exit(1);
	}
})();

module.exports = {
	authenticate,
  prisma
};
