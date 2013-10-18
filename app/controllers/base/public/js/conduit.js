
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

		function Conduit( parent ) {
			this._parent = parent;
			this._xhr = null;

			return this;
		}

		/* public methods */

		Conduit.prototype.getParent = function( ) {
			return this._parent;
		};

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
							type: 'error',
							message: 'an error has occured'
						});

						return;
					}

					callback( res );
				}
			});
		};

		Conduit.prototype.abort = function( ) {
			if ( this._xhr != null ) {
				this._xhr.abort( );
			}
		};

		Conduit.prototype.done = function( ) {
			this._xhr = null;
		};

		return( Conduit );
	}
);
