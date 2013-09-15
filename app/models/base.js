
/**
 * Model: Base_model
 */

function Base_model( ) {
	this._db = null;
	this._collection = null;
};

/**
 * Method: _construct
 * @param {Object} db
 */

Base_model.prototype._construct = function( db ) {
	this.setDatabase( db );
};

/**
 * Method: setDatabase
 * @param {Object} db
 */

Base_model.prototype.setDatabase = function( db ) {
	this._db = db;
};

/**
 * Method: setCollection
 * @param {String} collection
 */

Base_model.prototype.setCollection = function( collection ) {
	this._collection = this._db.collection( collection );
};

/**
 * Method: collection
 * @return {Object}
 */

Base_model.prototype.getCollection = function( ) {
	return this._collection;
};

/* */

module.exports = Base_model;
