
/**
 * View: Base
 */

function Base_view( ) {
	this._response = null;
};

/**
 * Method: construct
 */

Base_view.prototype.construct = function( res ) {
	this._response = res;
};

/**
 * Method: _defaults
 * @param {Object} obj1
 * @param {Object} obj2
 */

Base_view.prototype._defaults = function( obj1, obj2 ) {
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
};

/**
 * Method: render
 */

Base_view.prototype.render = function( def ) { };

/* */

module.exports = Base_view;
