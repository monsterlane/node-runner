
/**
 * View: Html
 */

var util = require( 'util' ),
	fs = require( 'fs' ),
	async = require( 'async' ),
	dot = require( 'dot' ),
	Base_view = require( './view' );

function Html_view( ) {
	Base_view.apply( this, arguments );
}

util.inherits( Html_view, Base_view );

/**
 * Method: template
 */

Html_view.prototype.template = function( path, def, callback ) {
	var def = def || { };

	fs.readFile( process.argv[ 1 ].replace( /\/[^\/]*$/, path ), 'utf8', function( err, data ) {
		var tpl, str;

		if ( err ) {
			callback( new Error( err ), null );
		}
		else {
			tpl = dot.compile( data );
			str = tpl( def );

			callback( null, str );
		}
	});
};

/**
 * Method: render
 */

Html_view.prototype.render = function(  ) {
	var body = body || '',
		self = this;

	async.parallel([
		function( callback ) {
			self._getDocumentHeader( { }, function( err, content ) {
				callback( null, content );
			});
		},
		function( callback ) {
			self._getDocumentFooter( { }, function( err, content ) {
				callback( null, content );
			});
		}
	], function( err, results ) {
		if ( err ) throw Error( err );

		self._response.render( __dirname + '/../base/views/document', {
			header: results[ 0 ],
			body: body,
			footer: results[ 1 ]
		});
	});
};

/* bind */

module.exports = Html_view;
