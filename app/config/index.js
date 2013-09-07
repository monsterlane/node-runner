
var config = {
	environment: 'development',
	viewEngine: 'dot',
	viewExtension: 'html',
	server: {
		development: {
			port: 3000,
			database: {
				type: 'mongo',
				host: '127.0.0.1',
				port: 27017
			}
		},
		staging: {
			port: 4000,
			database: {
				type: 'mongo',
				host: '127.0.0.1',
				port: 27017
			}
		},
		production: {
			port: 5000,
			database: {
				type: 'mongo',
				host: '127.0.0.1',
				port: 27017
			}
		}
	}
};

module.exports = function( mode ) {
	var t;

	if ( ( t = mode || process.argv[ 2 ] ) != null ) {
		config.environment = t;
	}

	return config;
};
