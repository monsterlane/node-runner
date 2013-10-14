
/**
 * Module: Login
 */

define(
	[ '/base/js/module.js' ],
	function( Module ) {

		function LoginModule( ) {
			Module.call( this );

			return this;
		}

		LoginModule.prototype = Object.create( Module.prototype );

		/* public methods */



		/* bind */

		LoginModule.prototype.bind = function( ) {
			Module.prototype.bind.call( this );

			console.log( 'bind from LoginModule' );
		};

		return LoginModule;
	}
);
