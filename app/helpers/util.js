
/* bind */

module.exports = {
	inherits: function( sub, sup ) {
		sub.prototype = new sup( sup );
		sub.prototype.constructor = sub;
		sub._superClass = sup;
		sub._superProto = sup.prototype;
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
	}
};
