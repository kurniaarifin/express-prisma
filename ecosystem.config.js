module.exports = {
	apps: [
		{
			name: 'prisma api',
			script: 'index.js',
			env: {
				NODE_ENV: 'development'
			},
			env_production: {
				NODE_ENV: 'production'
			}
		}
	]
};
