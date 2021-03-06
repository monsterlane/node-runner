
/**
 * View: Json
 */

var util = require( '../../helpers/util' ),
	Base_view = require( './view' );

function Json_view( res ) {
	Base_view.apply( this, arguments );
};

util.inherits( Json_view, Base_view );

/**
 * Method: render
 */

Json_view.prototype.render = function( def ) {
	var def = def || { };

	if ( typeof def == 'string' ) def = JSON.parse( def );

	this._response.json( def );
};

/* bind */

module.exports = Json_view;
