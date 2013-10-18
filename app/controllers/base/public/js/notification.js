
/**
 * Module: Notification
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
	[ 'jquery', 'bootstrap' ],
	function( $, Bootstrap ) {

		function Notification( parent, el ) {
			this._parent = parent;

			this._container = el;
			this.$container = $( el );

			return this;
		}

		/* public methods */

		Notification.prototype.getParent = function( ) {
			return this._parent;
		};

		Notification.prototype.message = function( message ) {
			this.$container.alert( );
		};

		return( Notification );
	}
);
