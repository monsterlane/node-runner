
/**
 * Module: system
 */

var util = require( 'util' );

function System( ) {
	this.name = 'System';
}

System.prototype.run = function( req, res, next ) {
	next ? next( ) : '';
};

System.prototype.index = function( req, res, next ) {
	res.render( __dirname + '/../system/views/main' );

	next ? next( ) : '';
};

module.exports = System;
