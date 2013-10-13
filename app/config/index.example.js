
/**
 * App Config
 */

var config = {
	name: 'node-runner',
	server: {
		environment: 'development',
		port: 3000,
		cache: false
	},
	database: {
		type: 'mongo',
		host: '127.0.0.1',
		port: 27017,
		name: 'node-runner'
	}
};

/* bind */

module.exports = config;
