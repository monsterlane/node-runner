
/**
 * Module: system
 */

module.exports = {
	name: 'system',
	index: function( req, res, next ) {
		res.render( __dirname + '/views/main' );
	}
};
