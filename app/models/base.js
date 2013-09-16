
/**
 * Model: Base
 */

function Base( ) {
	this._db = null;
	this._collection = null;
};

/**
 * Method: _construct
 * @param {Object} db
 */

Base.prototype._construct = function( db ) {
	this.setDatabase( db );
};

/**
 * Method: setDatabase
 * @param {Object} db
 */

Base.prototype.setDatabase = function( db ) {
	this._db = db;
};

/**
 * Method: setCollection
 * @param {String} collection
 */

Base.prototype.setCollection = function( collection ) {
	this._collection = this._db.collection( collection );
};

/**
 * Method: collection
 * @return {Object}
 */

Base.prototype.getCollection = function( ) {
	return this._collection;
};

/* */

module.exports = Base;
