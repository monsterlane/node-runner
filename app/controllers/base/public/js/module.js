
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
	[ 'jquery', './conduit.js', './notification.js' ],
	function( $, Conduit, Notification ) {
		function Module( ) {
			this._data = { };
			this._conduit = { };
			this._notify = null;

			return this;
		}

		/* public methods */

		Module.prototype.getData = function( ) {
			return this._data;
		};

		Module.prototype.getConduit = function( name ) {
			if ( !this._conduit.hasOwnProperty( name ) ) {
				this._conduit[ name ] = new Conduit( this );
			}

			return this._conduit[ name ];
		};

		Module.prototype.notification = function( message ) {
			if ( this._notify != null ) {
				this._notify.message( message );
			}
			else {
				alert( message );
			}
		};

		/* bind */

		Module.prototype.bind = function( ) {
			var notify = $( 'div.purpose-notify' );

			if ( notify.length > 0 ) {
				this._notify = new Notification( this, notify[ 0 ] );
			}
		};

		return( Module );
	}
);
