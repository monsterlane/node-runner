
/**
 * Module: util
 */

module.exports = {
	extend: function( a, b ) {
		var result = Object.create( a );

		for ( var prop in b ) {
			if ( b.hasOwnProperty( prop ) ) {
				result[ prop ] = b[ prop ];
			}
		}

		return result;
	}
};
