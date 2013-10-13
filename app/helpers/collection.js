
/**
 * Class: Collection
 */

function Collection( ) {
	this.options = [ ];
};

/**
 * Method: get
 * @param {String} path
 * @return {Object}
 */

Collection.prototype.get = function( path ) {
	var path = path.split( '.' ),
		key = this.options,
		i, len;

	for ( i = 0, len = path.length; i < len; i++ ) {
		if ( !key.hasOwnProperty( path[ i ] ) ) {
			return null;
		}

		key = key[ path[ i ] ];
	}

	return key;
};

/**
 * Method: set
 * @param {String} path
 * @param {Object} value
 */

Collection.prototype.set = function( path, value ) {
	var path = path.split( '.' ),
		key = this.options,
		i, len;

	for ( i = 0, len = path.length; i < len; i++ ) {
		if ( !key.hasOwnProperty( path[ i ] ) ) {
			key[ path[ i ] ] = ( i + 1 < len ) ? { } : value;
		}

		key = key[ path[ i ] ];
	}
};

/* bind */

module.exports = Collection;
