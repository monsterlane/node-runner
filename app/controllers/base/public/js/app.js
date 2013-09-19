
/*
===============================================================================
Class: app
===============================================================================
*/

if ( window.hasOwnProperty( 'app' ) == false ) window.app = { };

/**
 * Method: extend
 * Mimics classical inheritance
 * @param {Class} aSubClass
 * @param {Class} aSuperClass
 */

app.extend = function( aSubClass, aSuperClass ) {
	aSubClass.prototype = new aSuperClass( aSuperClass );
	aSubClass.prototype.constructor = aSubClass;
	aSubClass._superClass = aSuperClass;
	aSubClass._superProto = aSuperClass.prototype;
};

/**
 * Method: pad
 * Pads a string with leading characters
 * @param {String} aString
 * @param {Int} aLength
 * @param {String} aCharacter
 */

app.pad = function( aString, aLength, aCharacter ) {
	var c = aCharacter || 0,
		s = aString + '';

	return ( s.length >= aLength ) ? s : new Array( aLength - s.length + 1 ).join( c ) + s;
};
