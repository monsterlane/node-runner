
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
	[ 'jquery', './doT.min.js', './conduit.js', './notification.js' ],
	function( $, doT, Conduit, Notification ) {
		'use strict';

		/**
		 * Class: Module
		 */

		function Module( ) {
			this._data = { };
			this._conduit = { };
			this._notify = null;

			return this;
		}

		/**
		 * Method: getData
		 * @return {Object}
		 */

		Module.prototype.getData = function( ) {
			return this._data;
		};

		/**
		 * Method: getConduit
		 * @param {String} name
		 */

		Module.prototype.getConduit = function( name ) {
			if ( !this._conduit.hasOwnProperty( name ) ) {
				this._conduit[ name ] = new Conduit( this );
			}

			return this._conduit[ name ];
		};

		/**
		 * Method: notification
		 * @param {Object} def
		 */

		Module.prototype.notification = function( def ) {
			if ( this._notify.hasContainer( ) === true ) {
				this._notify.message( def );
			}
			else {
				this._notify.modal( def );
			}
		};

		/* bind */

		Module.prototype.bind = function( ) {
			var inline = $( 'div.purpose-notify' );

			this._notify = new Notification( this );

			if ( inline.length > 0 ) {
				this._notify.setContainer( inline[ 0 ] );
			}
		};

		return( Module );
	}
);
