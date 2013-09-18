
/*
===============================================================================
Class: Module
===============================================================================
*/

if ( window.hasOwnProperty( 'app' ) == false ) window.app = { };

app.Module = function( ) {
	this._model = null;
	this._conduit = null;
	this._perf = null;
};

/**
 * Method: construct
 * Acts as a constructor and should be called to create a global instance
 */

app.Module.prototype.construct = function( ) {
	this._perf = [ ];
	this._model = [ ];
};

/**
 * Method: getData
 * Returns the data for aKey from the model
 * @param {String} aKey
 * @return {Object}
 */

app.Module.prototype.getData = function( aKey ) {
	if ( this._model.hasOwnProperty( aKey ) ) {
		return this._model[ aKey ];
	}

	return false;
};

/**
 * Method: setData
 * Sets the model data for aKey to aData
 * @param {String} aKey
 * @param {Object} aData
 */

app.Module.prototype.setData = function( aKey, aData ) {
	this._model[ aKey ] = aData;
};

/**
 * Method: ajax
 * Provides a single request conduit for ajax calls
 * @param {Object} aOptions
 */

app.Module.prototype.ajax = function( aOptions ) {
	if ( this._conduit != null ) {
		this._conduit.abort( );
	}

	this._conduit = $.ajax( aOptions );
};

/**
 * Method: abort
 * Aborts any requets going through the conduit
 */

app.Module.prototype.abort = function( ) {
	if ( this._conduit != null ) {
		this._conduit.abort( );
	}
};

/**
 * Method: time
 * Creates a timer to log an execution duration
 * @param {String} aName
 */

app.Module.prototype.time = function( aName ) {
	this._perf[ aName ] = {
		start_time: new Date( ).getTime( ),
		end_time: null,
		elapsed: null
	};
};

/**
 * Method: elapsed
 * Logs the duration of a timer to the console
 * @param {String} aName
 */

app.Module.prototype.elapsed = function( aName ) {
	var diff,
		h, m, s, ms;

	if ( aName in this._perf ) {
		this._perf[ aName ].end_time = new Date( ).getTime( );

		diff = this._perf[ aName ].end_time - this._perf[ aName ].start_time;
		s = diff / 1000;
		ms = Math.floor( diff % 1000 );
		m = s / 60;
		s = Math.floor( s % 60 );
		h = m / 60;
		m = Math.floor( m % 60 );
		h = Math.floor( h % 24 );

		this._perf[ aName ].elapsed = app.pad( h, 2 ) + ':' + app.pad( m, 2 ) + ':' + app.pad( s, 2 ) + '.' + ms;

		console.log( aName + ' took ' + this._perf[ aName ].elapsed );
	}
	else {
		console.log( 'No timer with key ' + aName + ' exists!' );
	}
};
