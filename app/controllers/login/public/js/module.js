
/**
 * Module: Login
 */

define(
	[ '/base/js/module.js' ],
	function( Module ) {
		'use strict';

		function LoginModule( ) {
			Module.call( this );

			return this;
		}

		LoginModule.prototype = Object.create( Module.prototype );

		/* public methods */



		/* bind */

		LoginModule.prototype.bind = function( ) {
			Module.prototype.bind.call( this );

			var form = document.getElementById( 'nrLoginForm' ),
				self = this;

			$( '#nrLoginSubmitButton' ).on( 'click', function( evt ) {
				evt.preventDefault( );

				self.getConduit( 'main' ).ajax( form, function( res ) {
					var res = $.parseJSON( res );

					console.log( res );
				});
			});
		};

		return LoginModule;
	}
);
