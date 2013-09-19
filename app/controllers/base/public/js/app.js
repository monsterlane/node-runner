
/*
===============================================================================
Class: app
===============================================================================
*/

if ( window.hasOwnProperty( 'app' ) == false ) window.app = { };

/**
 * Method: extend
 * Mimics classical inheritance
 * @param {Class} sub
 * @param {Class} sup
 */

app.extend = function( sub, sup ) {
	sub.prototype = new sup( sup );
	sub.prototype.constructor = sub;
	sub._superClass = sup;
	sub._superProto = sup.prototype;
};

/**
 * Method: pad
 * Pads a string with leading characters
 * @param {String} str
 * @param {Int} len
 * @param {String} char
 */

app.pad = function( str, len, char ) {
	var c = char || 0,
		s = str + '';

	return ( s.length >= len ) ? s : new Array( len - s.length + 1 ).join( c ) + s;
};
