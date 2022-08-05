// prisma
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// prisma connection validation
const authenticate = (async () => {
	try {
		await prisma.$connect();
		console.log('db connection has been successfully!');
	} catch (error) {
		console.error('db connection failed!', error);
		await prisma.$disconnect();
		process.exit(1);
	}
})();

module.exports = {
	authenticate,
  prisma
};
