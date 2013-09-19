
var util = require( 'util' );

/* bind */

module.exports = {
	inherits: function( sub, sup, proto ) {
		util.inherits( sub, sup );

		if ( typeof proto !== 'undefined' ) {
			Object.keys( proto ).forEach( function( key ) {
				sub.prototype[ key ] = proto[ key ];
			});
		}
	},
	merge: function( obj1, obj2 ) {
		for ( var i in obj2 ) {
			if ( obj1.hasOwnProperty( i ) ) {
				if ( obj2[ i ].constructor == Object ) {
					obj1[ i ] = this._defaults( obj1[ i ], obj2[ i ] );
				}
				else {
					obj1[ i ] = obj2[ i ];
				}
			}
			else {
				obj1[ i ] = obj2[ i ];
			}
		}

		return obj1;
	}
};