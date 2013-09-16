
/**
 * Model: Base
 */

function Base( ) {
	this._db = null;
	this._collection = null;
};

/**
 * Method: setDatabase
 * @param {Object} db
 */

Base.prototype.setDatabase = function( db ) {
	this._db = db;

	if ( typeof this._collection == 'string' ) {
		this._collection = this._db.collection( this._collection );
	}
};

/**
 * Method: collection
 * @return {Object}
 */

Base.prototype.getCollection = function( ) {
	return this._collection;
};

/* bind */

module.exports = Base;
