
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
		'use strict';

		/**
		 * Class: Notification
		 * @param {Object} parent
		 */

		function Notification( parent ) {
			this._parent = parent;
			this._inline = null;
			this.$inline = null;

			return this;
		}

		/**
		 * Method: setContainer
		 * @param {DOMelement} el
		 */

		Notification.prototype.setContainer = function( el ) {
			this._inline = el;
			this.$inline = $( el );
		};

		/**
		 * Method: hasContainer
		 * @return {Bool}
		 */

		Notification.prototype.hasContainer = function( ) {
			return !!this._inline;
		};

		/**
		 * Method: getParent
		 * @return {Object}
		 */

		Notification.prototype.getParent = function( ) {
			return this._parent;
		};

		/**
		 * Method: message
		 * @param {Object} def
		 */

		Notification.prototype.message = function( def ) {
			var msg = $.extend( true, {
					type: 'info',
					message: 'message'
				}, def ),
				frag = document.createDocumentFragment( ),
				div, btn;

			div = document.createElement( 'div' );
			div.setAttribute( 'class', 'alert alert-' + msg.type );
			div.innerHTML = '<strong>' + msg.type + ':</strong> ' + msg.message;
			frag.appendChild( div );

			btn = document.createElement( 'button' );
			btn.setAttribute( 'type', 'button' );
			btn.setAttribute( 'class', 'close' );
			btn.setAttribute( 'data-dismiss', 'alert' );
			btn.setAttribute( 'aria-hidden', true );
			btn.innerHTML = '&times;';
			div.appendChild( btn );

			this.$inline.empty( );
			this._inline.appendChild( frag );
			this.$inline.alert( );
		};

		/**
		 * Method: modal
		 * @param {Object} def
		 */

		Notification.prototype.modal = function( def ) {
			var frm = $.extend( true, {
					title: 'Notification',
					message: 'message'
				}, def ),
				frag = document.createDocumentFragment( ),
				modal, dialog, content,
				header, hclose, h4,
				body, p,
				footer, fclose;

			modal = document.createElement( 'div' );
			modal.setAttribute( 'class', 'modal fade' );
			modal.setAttribute( 'tabindex', '-1' );
			modal.setAttribute( 'role', 'dialog' );
			modal.setAttribute( 'aria-hidden', true );
			frag.appendChild( modal );

			dialog = document.createElement( 'div' );
			dialog.setAttribute( 'class', 'modal-dialog' );
			modal.appendChild( dialog );

			content = document.createElement( 'div' );
			content.setAttribute( 'class', 'modal-content' );
			dialog.appendChild( content );

			header = document.createElement( 'div' );
			header.setAttribute( 'class', 'modal-header' );
			content.appendChild( header );

			hclose = document.createElement( 'button' );
			hclose.setAttribute( 'type', 'button' );
			hclose.setAttribute( 'class', 'close' );
			hclose.setAttribute( 'data-dismiss', 'modal' );
			hclose.setAttribute( 'aria-hidden', true );
			hclose.innerHTML = '&times;';
			header.appendChild( hclose );

			h4 = document.createElement( 'h4' );
			h4.innerHTML = frm.type;
			header.appendChild( h4 );

			body = document.createElement( 'div' );
			body.setAttribute( 'class', 'modal-body' );
			content.appendChild( body );

			p = document.createElement( 'p' );
			p.innerHTML = frm.message;
			body.appendChild( p );

			footer = document.createElement( 'div' );
			footer.setAttribute( 'class', 'modal-footer' );
			content.appendChild( footer );

			fclose = document.createElement( 'button' );
			fclose.setAttribute( 'type', 'button' );
			fclose.setAttribute( 'class', 'btn btn-primary' );
			fclose.setAttribute( 'data-dismiss', 'modal' );
			fclose.innerHTML = 'Close';
			footer.appendChild( fclose );

			document.body.appendChild( frag );

			$( modal ).modal( ).on( 'hidden.bs.modal', function( ) {
				$( this ).remove( );
			});
		};

		return( Notification );
	}
);
