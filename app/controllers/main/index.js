
/**
 * Module: main
 */

var util = require( './../system/util' );

module.exports = util.extend(
	require( './../system/index' ),
	{
		name: 'main'
	}
);
