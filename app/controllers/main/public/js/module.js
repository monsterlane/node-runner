
/**
 * Module: Main
 */

define(
	[ '/base/js/module.js' ],
	function( Module ) {

		function MainModule( ) {
			Module.call( this );

			return this;
		}

		MainModule.prototype = Object.create( Module.prototype );

		/* public methods */



		/* bind */

		MainModule.prototype.bind = function( ) {
			Module.prototype.bind.call( this );
		};

		return MainModule;
	}
);
