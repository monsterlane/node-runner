
/**
 * Module: Conduit
 */

requirejs.config({
	'paths': {
		'jquery': '/base/js/jquery.min'
	}
});

define(
	[ 'jquery' ],
	function( $ ) {

		/**
		 * Class: Conduit
		 * @param {Object} parent
		 */

		function Conduit( parent ) {
			this._parent = parent;
			this._xhr = null;

			return this;
		}

		/**
		 * Method: getParent
		 * @return {Object}
		 */

		Conduit.prototype.getParent = function( ) {
			return this._parent;
		};

		/**
		 * Method: ajax
 		 * @param {DOMelement} form
 		 * @param {Function} callback
		 */

		Conduit.prototype.ajax = function( form, callback ) {
			var cb = ( typeof( callback ) == 'function' ) ? callback : function( res ) { },
				self = this;

			this.abort( );

			this._xhr = $.ajax({
				url: form.action,
				type: form.method,
				success: function( res ) {
					self.done( );

					try {
						$.parseJSON( res );
					}
					catch( e ) {
						self.getParent( ).notification({
							type: 'danger',
							message: 'an error has occured'
						});

						return;
					}

					callback( res );
				}
			});
		};

		/**
		 * Method: abort
		 */

		Conduit.prototype.abort = function( ) {
			if ( this._xhr != null ) {
				this._xhr.abort( );
			}
		};

		/**
		 * Method: done
		 */

		Conduit.prototype.done = function( ) {
			this._xhr = null;
		};

		return( Conduit );
	}
);
