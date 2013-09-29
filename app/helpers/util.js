
var util = require( 'util' );

/* bind */

module.exports = {
	inherits: function( sub, sup ) {
		util.inherits( sub, sup );
	},
	merge: function( obj1, obj2 ) {
		for ( var i in obj2 ) {
			if ( obj1.hasOwnProperty( i ) ) {
				if ( obj2[ i ].constructor == Object ) {
					obj1[ i ] = this.merge( obj1[ i ], obj2[ i ] );
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
	},
	toObject: function( arr ) {
		var obj = { },
			i, len;

		for ( i = 0, len = arr.length; i < len; i++ ) {
			obj[ i ] = arr[ i ];
		}

		return obj;
	}
};
