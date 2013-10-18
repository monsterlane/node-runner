
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

		Notification.prototype.message = function( def ) {
			var def = $.extend( true, {
					type: 'info',
					message: 'Notification!',
					dismissable: true
				}, def ),
				div, btn;

			div = document.createElement( 'div' );
			div.setAttribute( 'class', 'alert alert-' + def.type );
			div.innerHTML = '<strong>' + def.type + ':</strong> ' + def.message;

			if ( def.dismissable == true ) {
				btn = document.createElement( 'button' );
				btn.setAttribute( 'type', 'button' );
				btn.setAttribute( 'class', 'close' );
				btn.setAttribute( 'data-dismiss', 'alert' );
				btn.setAttribute( 'aria-hidden', true );
				btn.innerHTML = '&times;';

				div.appendChild( btn );
			}

			this.$container.empty( );
			this._container.appendChild( div );
			this.$container.alert( );
		};

		return( Notification );
	}
);
