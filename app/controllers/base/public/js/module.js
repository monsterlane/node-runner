
/**
 * Module: Base
 */

requirejs.config({
	'paths': {
		'jquery': '/base/js/jquery.min',
		'bootstrap': '/base/js/bootstrap.min'
	},
	'shim': {
		'bootstrap': {
			deps: [ 'jquery' ],
			exports: '$.fn.popover'
		}
	},
	enforceDefine: true
});

define(
	[ 'jquery' ],
	function( $ ) {
		function Module( ) {
			this._data = null;
			this._conduit = null;

			return this;
		}

		/* public methods */



		/* bind */

		Module.prototype.bind = function( ) {
			console.log( 'bind from Module' );
		};

		return( Module );
	}
);
