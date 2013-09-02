module.exports = function( db ) {
	this.db = db;
};

module.exports.prototype = {
	extend: function( options ) {
		var child = module.exports;

		child.prototype = module.exports.prototype;

		for ( var key in options ) {
			child.prototype[ key ] = options[ key ];
		}

		return child;
	},
	setDb: function( db ) {
		this.db = db;
	},
	collection: function( ) {
		return ( this._collection ) ? this._collection : null;
	}
};
