
/**
 * Model: Base_model
 */

function Base_model( db ) {
	this.db = db;
	this._collection = null;
};

/**
 * Method: setDatabase
 * @param {Object} db
 */

Base_model.prototype.setDatabase = function( db ) {
	this.db = db;
};

/**
 * Method: collection
 * @return {Object}
 */

Base_model.prototype.collection = function( ) {
	return ( this._collection ) ? this._collection : null;
};

/* */

module.exports = Base_model;
