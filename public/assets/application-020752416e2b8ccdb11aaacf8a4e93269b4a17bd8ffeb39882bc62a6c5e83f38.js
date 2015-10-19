/*!
 * jQuery JavaScript Library v1.11.3
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-04-28T16:19Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.11.3",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];
	nodeType = context.nodeType;

	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	if ( !seed && documentIsHTML ) {

		// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
		if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType !== 1 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;
	parent = doc.defaultView;

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Support tests
	---------------------------------------------------------------------- */
	documentIsHTML = !isXML( doc );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\f]' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery(function() {
	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	// Minified: var a,b,c
	var input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		fragment = document.createDocumentFragment();

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== strundefined ) {
			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		if ( elem.ownerDocument.defaultView.opener ) {
			return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
		}

		return window.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	// Minified: var b,c,d,e,f,g, h,i
	var div, style, a, pixelPositionVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal;

	// Setup
	div = document.createElement( "div" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];
	style = a && a.style;

	// Finish early in limited (non-browser) environments
	if ( !style ) {
		return;
	}

	style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" ||
		style.WebkitBoxSizing === "";

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		// Support: Android 2.3
		reliableMarginRight: function() {
			if ( reliableMarginRightVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		// Minified: var b,c,d,j
		var div, body, container, contents;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = false;
		reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents, null ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		contents = div.getElementsByTagName( "td" );
		contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
		reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		if ( reliableHiddenOffsetsVal ) {
			contents[ 0 ].style.display = "";
			contents[ 1 ].style.display = "none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		}

		body.removeChild( container );
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	// Minified: var a,b,c,d,e
	var input, div, select, a, opt;

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
/* ========================================================================
 * Bootstrap: affix.js v3.3.5
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.5'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: alert.js v3.3.5
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.5'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);
/* ========================================================================
 * Bootstrap: button.js v3.3.5
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.5'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state += 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false
        $parent.find('.active').removeClass('active')
        this.$element.addClass('active')
      } else if ($input.prop('type') == 'checkbox') {
        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
        this.$element.toggleClass('active')
      }
      $input.prop('checked', this.$element.hasClass('active'))
      if (changed) $input.trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
      this.$element.toggleClass('active')
    }
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target)
      if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
      Plugin.call($btn, 'toggle')
      if (!($(e.target).is('input[type="radio"]') || $(e.target).is('input[type="checkbox"]'))) e.preventDefault()
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);
/* ========================================================================
 * Bootstrap: carousel.js v3.3.5
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.5'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: collapse.js v3.3.5
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.5'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: dropdown.js v3.3.5
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.5'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget)
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger('shown.bs.dropdown', relatedTarget)
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);
/* ========================================================================
 * Bootstrap: tab.js v3.3.5
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.3.5'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);
/* ========================================================================
 * Bootstrap: transition.js v3.3.5
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.5
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.5'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: modal.js v3.3.5
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.5'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: tooltip.js v3.3.5
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.5'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      that.$element
        .removeAttr('aria-describedby')
        .trigger('hidden.bs.' + that.type)
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var elOffset  = isBody ? { top: 0, left: 0 } : $element.offset()
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);
/* ========================================================================
 * Bootstrap: popover.js v3.3.5
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.5'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);












PK    ƥGG�o|rs�  ��    canvasjs.min.js�i{�<�;����Mqq�}���LHBB�$����p���L��w$ٖ��n����H��H�F��,ž��a���N��ۼ̄���B�H�:3Õ���F�0�H���b
���I8�q$i�X(i����f8O��}e���U�[,�ϧ��j��f�W��7�h�k�f�g
_""��EW25L}.����"
�»�?�@Ep�#B�.Dȭ+�\����2,�|��j�I�3Q�c�P�L��y^:��lR��>M|���qg�x�����Tܥ` ƶ#{��u�D1&	R<YX�Ъ�� ,r���2ڇ�#Ԧ��]?GxV�!�VR���X���=�!\�·;A�pA$b!�a���(��9�� ��&*��y�D,$@��t`��E��n��N�C�\E�	��ڏ|X�| *��l,HJ$�׿1��8�aq1�2"���$�.�(A���0	FHɌJ,[t���@-�I�KK�`ɄҴ�Tn+���I�r��9�p}n��ط!4���Qd�c��
?d�3
cA)>c�T��T�r��\��<�3l�C�*�C�O �2P�-� L����"Bt�I4ɇ�:d]0U�2�V2T�xs�r�P0���e����ܑ��%e�r����ǹ*�5C���w8�<����=�~�^�Dn��?t锪/�hu(�\���X$"$��D"���?~$�쑩uL]�"�$���$qrޛZpj2����/M�?DKtO�bQ��J�( Pp��=��? _T��SMpX�+��'�W��He��C(�!�4��G���#2[���X�q&��( �r��~��KE9ea��auF�^x��Aʝ!,[U<Lк)�2�x����j�D3ETW���ߠ9�_�S�� $�P�j\	W�e�L}��d�*"XDC�..��J�,�g�b��f��d���L�e`9N�:.5]V��T�*��P5�Cc��0ӕ"��á�&��!paj����&
-�1�P7J�hВd�& ����Czc�˚4�(S�H��u�C㒮�v���0P�)��Α:�*:�x�p����UV�&+�9�U�K�͔�\�c9�g���~t����d� ��C@��&��	�)�M��1N`�
�$�G�}���h�í��|��Q�CLi�o�ّ���b>,�DXE�"�f^����e3\�%��wLU0�]ФMaƿA�r��3��n���S�K�q�,<% J��1� ��ة2ɞ�&��A��cNk�)9�Dm���D�4�J�@2"��=	0>p��g֞�`��h
h<%`�7^,*cC�\r�Y��#����,+���-@�.U�T@�� ("r!����%��$�i
�c��X�Ѧ08g�~c��}�Nemy� �"2�p���������w� �?"M��sL��o��n��L�@|���qy.�c �(J ��`}X-#�|q驥����iE��K�bjL���e�&�${$C�(u�,%���(%)<I�_x~���wW,�%��P]d_�0�G�`O������, ' ����s!N��$U��YXE��'� �?��
�e�`��4/jY�����LʠEB�����8RͲ �@�v��WZ�J����e0N6{��i��$qGJ���5!6@�%6��o
M�K�`� ٧�K"��g�* J��5X�K�S G�S>޺��NN�a�HɧX��`���C	��|�%0��b�ѰՂ<��b2&+Ħ0q��߃0�;TӮ��nQk�< �ă������0/3e��O 8`
P'"/��FA<��M

���eD&h�r���4)�Z��5A�%�u��0d�g�&���ϟ.&|q�PkP_X,��f�Ⱦg݀�f�I8�Ğ���4���2�<Saz�<�R�ua]��������e�N�U�f#D 6�>�n�G0�gO�g�����a�1B�]����{C/P΁�A֌���B@�t5a��l�o8����t̾
���r�7�����Q~r���G/�:�0h��_�,�(�G��Xm��L�E��*����R�Mmn���1*�5
GB�J#��5")��[�!��?Ħ��*b5�8��#��0 �_'���3��BY�YSЧv����'9-Z�*���� l��[u_|���wY]�h�`t�8O0��]%��0,L�!, j��^ks����c(?�./e�
���k{��G���f�/x��)nK*

�0�,1�)*��w���3�2e� ,;
�ĐFq����B6�eA�L
��(��R�a�A�`�"+�	�K5�-y�7i>-�4�}�	�2^�gTQj�Z}���_-+<�����Qu4o�N�.cAwQG(1������B���q"j�;����`p�~��I��1��U�Ȉsu�K%E�E�{
�jޢj��Ë���Ĥ2.�5hV�	:�2��Mq[|�e>��QDR� <>8@��
���oG����k`�dB@���� A�\KsRS�����{5�
�_,6���t�ȩ��4e��
I��̉rb���`�)�[R��B�`�؍���hLa�cX��0��4��cA���Z1WdQ-A u�E@�9ju)��3�j�0�\P���ov���֐�K;�N]�U�4q7a:�6���2Ӧ
�զ���HTP��i�:#0R�6�nQ��Rw��ÂЊ3�f�`�߈�R�� �U����U��?؀�_k�?삠i�))^��u�A�����g�*q�=��;q��@�-��!G�l!:�y�0L<��G��Yx�aV����L��ǈ{�
���-����;�9#��.:-�8W/��*��p`���(ɻ�J�'�7C+�VEkzl��v��=��P�s�	��d�T���,a�e�]�>i���	�V���Jcu0%3���%2anj���ًou��i�m�h�#�Ox���\�@�m����ɃY��C3��!=K��*��L-���^�o ÁK�N�������x҂
�i��}���XdN��|�I>�8g�q���18��!�rڧ���{)Z��� 8X��y�K��ر��xe&`!�ZT#�
�18t�A.�|���LӁ�B�5��-ow�	3lY��V"���EYtfjv#��S��U8ay�I���*�Q	"r���{�w�a�{����z���t�
sx�,�`U5�
��]406��t��A��?E�x���(KS��FZ�������CKSa(閵x�4;����32B
��!_�8�_Qv��e���w�|;�˅1��+��}�v��}�tk�	��
n:rl
��~�߮�B~�D2�<��{Ā�"E�����o�
<��R���x]��0�f�628te]D��P��:���B�\
�l�]�%U§:0R��V�#L���T�4,���� 
EW�?o�)�
 ����'��{��l�&�V�]��[dq�]XJָVVa��$O�4�`-��$g-�
H�	��D�:ƅE<��@�P����T�5������XD�:G�j��D�)��&�T�aX����h`1������jf��&��.w���Ԗ���
��N��+n�H�y^f����F��	����z|��ۧ�	��D�/�!6���I&N��~4Q���}�g��
�xTWQ ;��C�I�6&�Rܚ$���5I\��T�?Q���衃�V?�����R`T�^C�Z�9��b�0|H���}��h`�o��w�
9�.�k����aO�X"/$�}�/dO_�J�΃'2K'R�uJ�g;�8�}ۺ��b�Z�!e;*+�J8�X͊64�K64�°�����L��'�%�$j�Z�������&�-��ߧ{}YȘ�?�Gh��^�8mP����k�� KYm2���D!�{FV���BZ��� �đ=Kc�d?�#DO�Y2"
�+M|��SF��]q4�q��r�^�ЦQT�~^ʭi�ɺ��]��3V�u+ɋ'�\3�˳AX�u��\[���'�.W��Ŭ�����E��_��F���h?�.�2��?�*5ìx��B�Ƈ-�	��`
DMG�6l��8�nG�$D������X߯.B����������B*ؓ����&��}.�M�j����^�:]�kr�7(�9bF�={f��qd�݅��H�[�2�V;��lJ��@
�p�I�����eW�iۢ�ÒB����䐺���5m@�la9�l���5�]sm�>>���1S�?.?��K�m�V=^��r�}��N���t������`�e���v[}�p�f���^�B�W�ahU޲�p(	��#؉޻��ط)E�>M��La�o�3���5�
�Nl�*���kJ�A*U��w�@�a�"��#�!�-�4�w�,�(7Ȳ�����-�E��b��Uζ!� ��.���b$?#�x��ʦ��Xz��O
�qpD��|h_��7w�/7$�w���P/��[7~������!����@��@�-oK�Lg�
I�\?�C���5����8V����ƣ�E��q��/�� ����}�_��O�a�����f0{*�N��@M@����6Rg�*���v�YKFtԔ�I|��[ؓ��b��&�q��*e�R����+�ht�܈���񥆌i����⬥\zn(�p�&�E�0H}͈NS'�	g��t��:�F�ys@k��l���"������i��կ6��@�|�����D_�i�'�M���Ūۄ����9�S�Tߚʹɳ��P�gO�vb�v
Ed��rn����,�]#(Ի�(Y�A��ග�{M�ӱ.6�!�c��Kg�ʌj1�����=1�s23t��0oR��^^ÚC&�|��˄�:tB�d<�|)l4b�@�4�β�$�B�iT�<���r��,��r�^�^W��Z�֡�_[�l�=�n��::��,6�
ȝ�Z��7�v���F�oz<
?�l�s2+�j����V��y��rLa�0�cAo+���Y�Ic�/m@�fT�ݜ6"\�k��.����K��
�癠����>�\�#Tv�P])g$����(��� '��aR��X�~�K��qq�����֡�9�P�G�l��@m�u����ņ�m�_���p��;�Z���C��~��s�,
���M�=���e4:�
�q�?p��&�pޣ��S]J�ªsk*��Ҝuw�Z���>�T`��%�V�e
�s���[*�[n��kzaK*�qNY!EN�d��X����I�~<���T�� '�<����7�91�`���*�>�T g+B���K
�'��ޟB2�Q�j�Xu� ܓ��>$0��1t
��j)�v�Y4�ě�ao�-��P�]LZd�Hf8�JG��xz�oԘ���~`�����ƥ�3)��ogRr�B;�D���)�`�3�A�མݼ��iޠsuv됏�֦�ܤ��	��,{D�C߶��>�9>J�����0Ru�xh
]kN/�)T90�}�ʥ:$�;��V�G�݄��"rE!�Kz�,��Y�a��f�Hpv�O
�Q��xw��C
h��&����
o���t���� Ѝi;��14�Q4X�ˤ�
��f��6���4!(��P��H�*��ke���IZ�`�VB��N��#�D��ܒ�G�	�'q`i��U�`�R�㞹�<*��(� Z���P����!B�j��x1�Ƿ�[���l�8���\:����D ǵ{�`C���l���+u����0�����I��r���ł5�I]5<�3�F�� �Ѹ��V�+P�D��f�L��P���;�j���O���Ӯ6�s
��q�7�3p�6Q�6vLC��Յ�F�Av��4��N�#�4��	:�Q�� ������ o�D�`]I�즩��6����(
y��2F�Z��SUaA��N��dY���Uƚתw�D����4u<K�s�-k�b��|��
>R�_���T4�U�k/8��;���#�ɝ@GCcJ,.�O8�������V�R02)�he:��Jt��2&�TFRu	�w��ʴ X�i<X�dw9>��k���5��f����M�H	|�����V�3��{	ւ��[tti X�e�5ݧ��l���ŀ�x=Y�|p._A�
�c�PfG�	�Fԏ`r�Ձj���+�c�*��BpmJ�-��W��pA���44�v����!á�p�[�$��0�& Ii]�R ������S������+򔄺ù�u]E?�
���T�fX�"�"�(!*(?ʊ�y��� �\���+��0��a��c�u�|>U���:\���
R6�k�ڠ�+mA UE`嚴8T*�a��
@�qD�D�܄>>�e<,.
o������q�T
�QI���d��\=ϧ���t�d5Q�Cz��M%�d��J��#��$ҵ��z>Q� ^<�.Az=w�M�<���%�<���Q��r��ɇ�H���R	ʵ�K�J%c���Je2����M6d�"�ɧ3�O�j�d���j��W��P\:��W�l<�?N ^*�-��7�O�a��r�L~3�R�x���xҡ������\��]�#�������-r<4.
a�8�$<$&�<� �:��)N�+߅�9�LuU>��gM�*����G��2����8T���7V4�����o�)Y��d����,�c/�~G��6Y&&aV>��C���b�nb��/��x����l��|8�)��r�v���
(O
���n;�W"a2�Q>xW�adI�t�6�>�ی�� ~��=�ܦ��"��#��!w��'���{�;�����P�����d�&cV���<��g��˒��P�b
��D�}]ES��t"6���n��/��-�@�l �2������>?ZC���6�sa���6� k��!��Ǧn�N�~�ꊈ�E3��>S��Z4Wh<��gJO���
��Lv���_m�oS�oM?�������?�%3;E�'��_�tV��ף���i�-ŴK?���VM���_�K/�?@���7�W���\�L��D:}��e�r�'3��Z�CWI;�l<�DX�:�|6
t{5%���ۯi�Z�#�g�j�R���G����Pp]�&���{V���������qͻ��'�+Ūo	.���$?=�3������������'��n�X��\�o�y�+���y���ׯ�߾�p�4.
���@��
��g�� n�#'��V�R+=?u����; Z�c��;��?�|������vM0`�O�K&|�
v��#P~G
 �-��
�f���i*D��}��VXT�a��/�[��=a�"B���|�鯇ѿȥ���������Ûy�����G,���Mp�:u$N� ԓ�G������!T��`����yŗ�قv�3 ��յe����W��B�{�+Y� Wd��t�{�\^�F�q�@���8�y=a�x��P�T���O�(SE��#p�̎�qtA��Q�" �bx+���\XOВ��E�4������
�4^px3�r�/�8�T���s����$�X���	
I�v>���<F1d�(�"b�
�EN&O�3S��pMذ��4�)�+IZ8D��)�� ��e��nv�Z={�dY��_lã���GM�\�A�⮸��2t��?'�p�j�N�2�i��3�φ��3P̉~�!�#�4�҆.�%`���w�V��3j6�~ߕ;���e�'�nf�f"��|�0g��H��䉝��%� ��$R�(�i�_8�0��෫:d���p^�������Y�uFV݄j���d�3�
z��``ب�2x��"6��;�vd����JY����t
�s(G4�K�
������?(�{ǀ��ҏ��o�A��}��}� �q�%^ ��.��O`�$}�~�u�c��vm���D"�V���u�;�K�$q3(��[��)G���������O�|v���R{~�>���O�s�����/�d<?�
�M�����p� ~m������$�+���#-�y�����
�K ��3N`��x��߹6�!e��7�XK�i#�>���PɃ��'��g�#G�g�2��O'1 ՈRl/u��|q(+v>���0���M�i'��v��b��Byp�d�B�Y|Ё=��؍�'�p�	`|���.�X�H�ܰ�`�
M9O��8���- 8;��A ��:o��/;&�/��mv�`��(tPA~hW]T�Yt�jM��� ���~��>�%���+� �P�,�f��k��A���6y9fz89�,N���~��h>�5|t���!�$�N5$~A� /G�P"b��g��!�t�响���kQ���ҁĸs��	����i�n��3Bؕ���~��_��/1���WnD�Ē���j���'U�h�N�lA��E
��|u�
�d������X<�J�����+�?@��P�h���C/�~<
�S`��c�����`�����=��b��(�>vC�ǶGqܹA:���z��l���={"8�|�%("�7�hoes��H"��������t������D) ����)]���w�T��+�}�H�����w4��ID��l�{l*!���"��l������u'�E��T���4��p|D��#�qVz.K����5���
�� 3~�_	'��p���偏@��e����ͦ�B{��|�^�/NZ	�\un����*%�G��z8���*�-�]U:w7�Ji�藆#�����x��� ��帙��p�U�}7��&�'�<�&������7��'��ー�&�Q��^�ռ�-!�E�s�.���s]���z�^o�W���Q?mtn;����ic�
c7j��|y�j^6�k��8PKZ}��''�q/+f�dc�.�W��ŰS�h�����޼�xQ�kmVR�n/W_���c4��Ǳ�Y�E�\.3������J������]��ӌv\�ˏW���M�r����8�TO�/����<_W�V�|7��b�q���]��*�^)w����	1U�핮KQ=[���i{S�޼tK��y\��+è�Y�����K��E�Z�̥�9�Uz�h4{6��.���j7��u�~6u6�zf�l�b�L_T楲9�����㻛KIm�ҵ�X�T����U%�|�L��Ȏvf��j��pR����l�"�=k>�'���*?Y��N*ێ'�b���[,өǇe��-�A[K����ϵI�����J��:F�19?�&㩤7әi�%7�Q�~f,�/��L����y'9�ڜ7;��+eU���F�{�pY_o����xv�Z�:��k��?\=�S�R=Y�%.�u�_��/g����H6�gjv��<Lf�U;�Ћ���073J�a4U�WG���qTȏG/Z|ty{q�{�2�u>ۚ<&��ͺ���=����Ͳ/��ʺ��k��J+#
�E��;��R}S2��ܿF�Xz�˦�Zb^O�U�~�;�vYU&�i��ɥT��0��xe�����r�h_�csC��j��Jw�ɥ�2C��2�Ht���H4���:?������Y�m�e6�X�o��Q�B���
xϢ���r#�nF�7@����d��UI�z���3�њ���r�K/$<�;�w��L��h��Y��9-2 Z��Q�z�ߧE�����ţ���i�.�J���Y���P;�k�2jTcK��k�Q���ʰ�V�7ՋqGm�z��Q�;]�^�ne�m{QK��FØ_�}uc<�3'G�/��e��9ۤ���)}\uǧ���Q����Ϗ�g�A�v=���ҩtq~��F�^�%�43:��ި��쨙���*��$sw;�-��|yT;U��r���d�T���˚~�Q+��4��b*9�Ňu�us��6���\��ɏ�c��(u��q��H<�z��b>Je�%r.�\�tq�T˳�>�(�Iip�^6+��T7���t%�����ݳ�aT�.Ƶ���-e�Ae>L�_�ɼ�0r��]�Z��w��t+=o�^n���Eg���nc9����Q_�բ����ME�_W�vjp=K]
���IV����:��n�W�Zj^:�]\�*���YiٽL����ӛ��$�Jq�+���Q26(_����p�'F19}�/����\)+�L~.u���0-�'S�V"~��EM=�<���t}�[���4m���ה�ȗzi%ѻ�u֩AL2^�wӺ1|lͯg�̋3x��q5?}����싒h��hW���yuv�ɫܴ-����Y����f���y�4g��E��E���&Ӭ�%��u.z�﷖�}U�LR�J7->�_����THĤ����]ly{^KJ�U5_�I?d:���&�i\.+ՙ�r�*��g%9Z3�g�w��L�����zs���u���\���X�b��:����ﰿ�.!��(4��~����3���r��֛��&��͞�֚���۬�f�ө�_*���tVj�F�Z���l���aЩt�Z�X�]\�q�}qU뾴�a�����$f���2��qn�����hfs��^�2�T��ab'f9=��6$A;]����"6ۯ��rw�8M�қ�C{���֫�B����Y?�6�u]xX7۹��TLgɤj!�W�4uz�_w��j��$.n�V�R]��b,�.-�����L'zw�&s���.�ǴЬ͖�f檗����3�&�K���el�[�e�g*��t�w�*_H���z�������e����H�������O�^��X\����v�I֫���C��T��K��T;�_ac��R��՚�AIڈRw1?�6�yc�+F�X�:��ص�ꝕ�g��ڸxH�ǯ�Q*}1�HwSQ��*��tsДVb"�_>.�MFht�u��kK�*��[795*��ҹ^���b��:X������Kc��5�;��$��\���n������Ь&�+���v�*��ki��^��D%^��Ƈѩq��o*I!-��N������toF[Zvv7�.:��������My���rO�h唐쏛9c\�������zU���I^�����׻���Rl����h�&�M���j2�۫�`�7��a��%uY��B�z%U�7/g���F������룪%[R=�*���z�j�.�f�x�R���V����?���Rvu,M׭|���uj�^�2_^��9].��n���K�����٩��V�/ճ���z�R�䋗���H���\�F��r�鎥���t�Ȁ�>���e���1�N����8Z��v�_�/������Og"|,S5z`�eWa"l)��ȋ�N�nZSc/��k�m&s��L^�,�#7k�����C�V�2Ʊ1_E3�Dk��MZ�������~��H���{���Ւy|.���Y!����絋nj]����U{��Tҳu{�i'�[U":A���Ĳ[%�D�������ҽ\��ɵ���}=.����L��-5�Ңٽ��ݖ���j��n��
UIv�7Z�Q�Vog��l67������^�zt=n͖\�/N;�]rW�h�R�,S�-߾��Rkv�`^
N��U�Z1qk�zwԙ�L*��X��y�r��Ε��)�Bѳ����DNF����ڏ�µ"�-���>DQ	��U�\�O�Ň�eK��Y�w���\w��p0g0�wр��:�����{L�:Z�3�J,�'!�e�8詻�%��H��b4x`EE�_+�X�����ff��5�(����*
�{�[/�!��L���6<���WDhs{[^\{��Q��^�.��"{���Ʋ%ð-�3
��qjmAr�A6�<�	\��[d�i����9x6�aF���lyK��C��{X;��ʛD��(�mr�S\��Dp"z+���v�����rYz�xh
���] ��̑�~d���v�ʰ�l�꺭ޥ��)�}�i�;m:އ�mk
��f?�F��� �|�m(� �I�޺B��ND��0v�|7�+i� �	=N�������Ud�����Ņ����<F�s#F�qz�vK���iDWoMr��2H/����Z��=�~>0�gA0�N�
�NvG���~V���E�x�$�t������R
���o���l#��(�E�e��5v]d��@e��&��& ��ֆ�'�]�L�?'ǀk.��O�9��	���z���E�׃�h{=G*x��0Խ���eNX������^��L���f'��c��Y�q�,ueb�8�����SGC��v�=�yws��g }�2:o2BR�i.�\�?c���Z@#��j� 
lWҮ;+�Oep]�������{�Zzow�]Y�{�O�r��ڏ����Z��5�^��ʆ���"��ٿ
ʌA~
�:?�S�����C�&v8�wl�ϔ:��";�6x���h��3��ߑu�Sl� 0&А���P��	�hm'�~薺����{��2�P~_��X5�bWwO�@@�s�N��~4�p���K������a���p�)�|b�@ht.��ݳ~��Y�>��}����J�Br=�UQ�f�p�s�>B���E���d_{���<7#��$��!8�>�t����y�^�z����D��\b1�!��j���
�3�$.q���s�����0�J�h��pcxȺB(<#Ͻ]O2����6�x		�8 �'���"����m:L9����3�wK���$�y���%��	��0�"�H���>��p ���vh݂F�Z��9`; ���@����?E��/�dt�;߫���(� ���<�A�9�
�]X�����f�p �bSt�pX7��/�"�V���"�ط�x[�2�j�v�^��"s��4LD��"O�lSxk!b�z�e6 %���}Ch��9ߺ��<3��
�?�i�3�����o�Y��{݃V5����®�cV���,?玠�Ly�Z�LW[_ʘG�l"���x��癡i�
���&��7�p.4,���z��w�T�⁠��Y�m��>>'����<f2��G'���kU�J�@�U,���N���Z����Ô[�O֪F���Z�A���aM��u���ďlϰ�u<�����n�}��>�^G�WY��@��3J��E��eo��=r"��:+� y��ߖ5�q���I+�(_�Ĥ8I����
���b�H��J��,:V��r��x�	vH�5N"}!�J��S�����i��s����_�N��7�#T�O��#�0�(���֭(�t^I��Pص!�H�#�n]/�V�ŕ�m;x����C�"���$kC�|Y�q�;c��U���4�w��w�ǲ[�q�)�"����mu�"oӬa:tl��>��4���#Q_K>��ϟ�u=�I. ��E��B�W�����0a�pad�����7����9!��9�Z� 1|1���Z�{���]�{�ǅ��l�( %@�LV��u����/<��Dh>��Ă��3V�Y�w~5���Y���C��s���̋��_b��o�Ä��ў��X�>�hJ\=$��^-3Q�����n�� ��I�N����'����ۓ�'��9�@�'dB��w������Y�ÀN�]�� z�0��Ֆ�A��O�Ç��$�0E	Ahg{!֌���׆c�NvuK����=���U�[��\8W�")���,F6ћ��1�3�S=%����������k���"x�DP��	��d�B���]����|�n�*��9R �_�J�7'9�h]�J�dV������}��x��_{�<��\��/���椚�9y�\�b�n��^]�.�0��tQ�
�ޓ��,`���V�?\鐯�H��0�\�ܢ�tԖ�~QΰN-�S��eѧ8䒢����lA�FÔ��o��!mωy�GcmQ��S֌��>�a�x?壸mr��)�<�N��	�-�轰���D�Y��|�i%���QOaK%��I��szc0I� 🸂�R
�$��F�A�#�&	
��}�xٲ�ѭ7Se쾩�s`�2v���z��e6������0}��T�������=����i�f��б!�����u4Yl�9a�=4�߅d� ���ώp�(�s��6�A��N���6\Ɂ#�������nʃ
J.��E�-���5��U�I
iaS��1�ӥ�+�~�HvVw����
>�����S��Řϗ��c;[\�b���KOVĿӸ������ZWv�Zތ'.���wy�_,pGyU�/�-Y~I`��w�uzM�O�H�,ձ��O�Z/_�t��s���{��ˮoP߸u\U�w�=�����M+Ds^y�$`Z��T��}lg�1,�"����\�G�w�NDK�)[pE�#1۞N�n<5�����B�)���x��
����r޼�ꅓ��L����
���\�hK�6����l.�x��������O��j-����^�*Iħa�܍�iھ��Xl��,R��Tпb��Ѧ�%v]����ѥX9�(\�$��$���]�����8 ��K�Y7�$MG�O9\�X4��\��@>aѷ6߬%�uw�+�)��S���PT�=�#Y�
�	�ǵ�ۛ�~PA�6�rTzƢu��Dh�aD�.b�-�Nn	r�
xW*|c����v@���\���-��|���M㼈�AX/$�>���q�o�w����+����S��>��ްɪi"Y� ��]h��A8�s�I������������Y����F���k�O�<wf���l�/�ϋ"H�l{�AQ�Y~^���3��2^�99�}�0����I�$#T<�P4RKŴ��f?�k��St)
΂��u��weiS�e���t����6E��GY��yݳ�+���L��v�r�֕.�B�	v�i�U}���NB��~lň�Q[حoꔳ
r��Ai���2�g�s��w��R��I�܌n��u�$�x6�sw�m)���6�����̪�̙L	�?<k����|k�n�M ����N�F�=!�y̀��*�z���߬�P[乺��B�R&T`��x��=�Ww�q
�J'��a0v�����(Cq���.�?�;{W�ܨ���Y��h��JRI�X%����.���H���������9�v-��9����v�?�Sl=rG�������eS�ɢ0a��h@&lc�ב����	�#�������������eQ3�-�>*����"�q~���3�lj��g�5,y�(���������'j���kPM��@�/�hk�v����i�mW�!���#="��
i����?�p��fQ�セ@����K�� ��
�o��Dw)XD�����X��M�uf�o
�䶴����M�g׫�<���bw�5e�z|��~�g�i��mJ�;
A|�{���#ʢ�� x�~?_����V��>G(I�P"V�&�$bB2���w���ns�Bu���w�0����q/�lIIA����2�
���*N|Ԗ�d)�Ju��f�Ͱ�˓u�A�C��H��W0qy��"�W�^��܊�NY�J�P�U���J��㈝��!�
�@g���٬_yՊ��/�Se8�}'�aQiR��Bܐ
�|)�L�i�g�'��Y�mP�m�#^_�F���<��e�?\P.�&Ш�b<D�URL��.0ܩN����^��i@M��<�� �IRr��_op�k���^j�����@Q}pmC ��Z:�+ĳ:ZY%P��*|��t\��A�l��ƒ
�K�XW9��o�F����Jº̫��{���; ;7|J�Q���B
�ME�}V�<9�� ��z8�J�
������7B�_�jʫ�m�d.t�sr�����Y|�����C�"��Pd��;Q��b�4��X>'wH�Xluܢ�֣-�dF?��*6��ܮ�<9�	T����t/<-
5Z"�<��$��)�f�N�6����g��)���B���Kp��?�}��tsr���Ja�AL��l�q'�u���I�✗�9�WD�fkM%��i���0����� ��D;��E4�3�A��r�x��f����i�jJS�t1-R�_b��FVn0��68�:/V�e���O~pE���U����p��œ^��s�AM�F�u_�
_���g Nϙm�9��cc�@g5pG��$.R��������U����0�����)�Mi�(>])�0�y��j�x����4aD��wN#�(�C`a2�O�K�Ɲ����{��_O�M8�=��{4�Q'�?t��q�E�	�;8�8a�0��:'���АYἆ�:S�+��	�����	�C�¹Heʅ�fV8�e�0���|^�
�FVXS	�b.�ƪ�KN(�P9��JXwNHy\�Vy<N.��q9d�U�3��K<.��qz�[x3&WE�ϑi���s�ɭ��e��a�3�� ����@_S+�L�L9�����䔔����y�TC�>*���{h�+?k����^#��?��ڡS�Aq����w�?�z�Jd1��	5h�N@�{nȸ˳���.J䎻�O�n���=+����m����\ݘU�iն\���������9����т2�%�Hv����ҏ��QF�.o'5 �;C��s�<d��}0�q���T>��]jI-Ȁ��d�I
��AFM%􊹰/�� CN��=�	��=A�Q�\ʐ*Q�����5c�k	e�kP�^���QCį�i�צ�kd,�=�d��&e #j�� ���Zq�Q�8Ȑ��2�Od@S혞����d�_1�]=����:9�����X�g�
z����jFU,|p&�92c�b���aS���o��]���=(g~c&e�/Q�74����1ܸ;By7�\��0��~_n|(�?��E���"�Y#��Y����1'�0��^S�5�1��Q�m��#;�)r��(E.2�����B�v��T�nP����	 �v�3�@��*��N�.���tX������_5�	�냙�3����m<����#vq����8`����)A�OQ
�:�<�<V��-�Us4�?��/���j�I�3�%LZ�`-B�K��M{�&�S�(�`�[�]�k4u��#�nʯ"6�\z�6?��D�6�&amn/aҒ�2c�^��+�f�l�ˍ�Ӓ�&���t�Ip��g�����PQ�D��_){^�5��ã�4Z.[o,���x��j��I��U���Dp6<<ݜa'���#��b�¦��0�ލ��*������ܬ�?R�3N�<�
����wʲ�mM�dkM^�,�Kuv��㽺)��������Ĳ4|��Zd���Ϊ��*I����n]J"���1����,��yU��N6$�g}}�Y�j]���0e�P�Z� �-���rq8�]�U�X&c�����|���ڏ��ĭ��L��
��=��|��7��sx�gC����u��� �J3mx\�~�
�<3�jbೢ9bF��X�V�/!P��s=/,=-��(6H�\/6?PR'��-��͢Wک}n�zFqt�f���#�xvv�srX�W���z�e�	Š�7��QY�ASg#A={��R&̐��%���u��ߏ�{�jN�����bo
���{@u\$�܊ϰ�3@<��sN�<4u/;��o��ɉz��b�$�`��Xl��	��2^��S��o�4����8`�=�⊒2C����rF�}f�TO�����K��+yv��
	u���*�r_����fW���^X99�
6����	)��zP55�K
��V�ߖ�|\��S��
���8���j����6?�^���8�h�R��U�)��?h\�����z=w���,NW�"H�{eg��%Aex=�ƞ���R��]�yI�ڮf��
�
7kZ�UZ������e�9�z�M�#_���d��p��ҒS�AÉ_���A����x�o�n�b{����w� �xg� B�w7����v�7��KT���@����-�װ�z�Y�����}�kltJfZvE�����΁�YU���>m�l��}��gx����o��	�MR���pq*Y`���+BJ"�q���]�b#6�ox<��>n1t{F1tRXkS8�)���~!a1"�CԻ
��@�F��A��Qj�4v�:;͟q�T{β�j20�6L|(���)��W<c%��=�7S*,����ߕ.�'����g<��ia�3�a0gX���4ˑ��~��.r���a�Z/��Ɗ�뒮!�b	�Y�x�A0Ÿ��Ă�=m-�ǅ�m��e��x�K 1�T0o�z�1������du���Ax����yZlD�ҽQ#��!�,����_
���,F<g%��f�8|q
T���j���lW/-!� W�ן�ơ9yˉ;���ŠN�=Q=�?��/R���k=`��0HO\�
,��ͤ@k�Y͔�
�E>l��xېh/'pg�i���t�
�����șA	S5��[1�b[A�}�|�e?\_�p�.�!���+v
�8ܒ�Ǜ���N���������){�ܑn�xD�[����1�vG��~�
N�
յ�~^'�Be�����"I �C�]Qr�t&�ȭ+B�[�jW����_;�Si��{!�v���:�o���Bx�����è8*��-@3����4����x�|sf�c�\�}[
"�3{6V�E?��ٌ�Gz�#��%��G����X�?
O#|�n�e�3r��xj�3k���j÷���NZ�6��6��g���K&�"���;�;<}�4$���ޫ������^CR�o�B��ʂ0�A�2G���L�>y��Z�C��fbI�,��	,��P���ߐn�2A���F��JR�Ū
h�B��+k�"=ů�N�>��rf�1nBc��N��[�ǒ�����\m��k��mV��E��$>$	(
�.��(T
92(x��W�G��
ͤ:�U�N�,�|��i:Ȭ�7_���@���iZ��M/�nZ֜�B\�=A3�3;#�3�ShH��30��M!�>@Pl�����s�+ϝ�O�����S�4���E�;��\e��-L�;�"�N]>�
�A�gkj�أB2��Je�D�>���.N'Ϳ�Ƹ<�w�߿�^Wd�!��-v4n�kO�@V��oB���&pܚŮ�B�L��
���۪�]��~��-�����?��p�F�1�ҁ��t�ms���J�L��"�0|������B���)����]����)dUA���d<��x���R8�[lzj��z��+"w��5�7@�]�P��^9ih���R7�F��\Ϊ�  �|\��@��@[��vKکu��uD�5�Q���ߋąvP��2U+�d�#���; �8��[@���ji��-6g�L�*��_\��F-s��	�H��yx<dA�p�����y����,N�g��z4n˔�(`�oc&�"�?�y�֪@�tY������#�b[����畷hK�t���/=�1k_���չ!@Fs��GG�a���-zk�!�[Y�����ѤoX}&Y@���bZ�%�H�j���B��V�2Ã�9db�rm�Ui�ث�d�����?`���<����gx/��Z�;j8�o�]���b�@i��T���:f��>S�d!t��M���i�}{3�ٷ�,��@�8w�` ���T���R��.*9�����&m[�'��*�Ԟ��k���聿��2���Y��-�OBJ�����:?z�q�s�����c��c�7	�^|����ۂX����!av&I�.�W�{��'�<s�A����1<���N��Ϭ3���I� �vF?{	�����f@BIO���oV�kZu�85��H��PzVSe��0ܐ"*`j����9��]dH	.��FO�=ߴ����(%���Ll>@��p��9�Л��S&���f\U�����F��ݞw����y���hJ��X4i�)9�����I��E��7#�x@ �������"��A���C�����̪�A�y@����+f��Vf������"�r�˸ʄ2B�4��.�R�w���*#�����#��rL�X���Yclas����4���$��-E4g�ިz��}Z8����,��+``@��:�Y�e����1��%��>�̨%"$�[*ĺ�����Y���}˲˸i��b��("Ms�y]̘�1�sx�&-�A�
����u�!3�ڳ~#"�Ї��S_�U&�Y�Ц�����u��5���g 4�ږ4��HZb����\$,PA�����lY$.���}>-�Z���U�:�rz���ڏS����l7n�n椥R7
�8��(� �׶&�ͤ���i��٤�!��uH���}{���K��p��"HsG&�]�ZU��  ��j��^��6*Fl���LOs�6���H߁H�8�!�3�RǠd����1��Un�B��VmȽ�h�ع��<-<w����H7�ϕ�2�������{�/�S�ҫ��	%/Ԅ�R`�Y���%u�	oP<�w�
�{�)=�4˞=8�}s������z�]�����S�×�A��B�w����J)�)M�
��d�ʃ�k\7r���v4/~B�̍�;��+앲 ������ײi��9��PM~y��;g��o��9�,[��{�ƹz�Heg�.s˯��<B���kx9]�'l����5����_7�A[�r/�ꃸs~>t��j��*E�.u`1(rt�3�I7����i��i~�K��uVB�T�j	���g��G������)�B�"x���k&(Iӗ�}!��-�h��fK��󥀡�&��=�e����m�����'8G$	���ȗ4�8�
�eR�$p}�)N��jo	dbi9P�"�n����ͱ5�?ST���O|�B� ���z�����j@b%����u����ƣU}VT�SW䲖T:Z��I>S(����
/[�@*}�H6��g������3���H����3�d�
@n������J4��d|1�_l��^`gx+b(�B=���u��C��0�%�1P�$�L�# 
�h��% �|_@�3@�?i@�d3A
88�0� 8��XcZ�����@Er��C�� 5�"��%��kPc�C
�o��|���S����"Q�F��ʔ�Bk�b~z��fR@5��߇H��ϖ%�����z��4xә��7-�ޟW0!oVE�i��fg[�0*CFețeț�aJ��q�L6}���+��z}�̀g��AsF������ ���1h��C0�����'f�1� ���#ޞ���Y	��� B$�����������Cr	0�
`�e�hĵ�q��;�|�S\H��L	���]�q`�� #�R��\8mJ����	t��(g�:��`�B��&.�
L4Wm�u4�ғ���GB�����-E�Pp�{i�
�-y1�t�רi���à�hi��CK�P��K��F�� vZ�������v�А��II!�t�t�Ђ�����p�|���Eɂ�١�;��T�p.ܰ:�W��[��ѲW.�r	��7��waO�ͷ_��Ђ�1%a9��)^���J~�	�@f�&�~Hὺ�A�1`E+��.\D+�x&zm4�a"U ��
��� &R��mE�9�%�����)~!��'Lz;U)ۧՁ��}믈�_��E-����<,J�P���·�W^p�w�̠?ōOʭ�!=^���������vFz���3Go�M^�N߲z�**ްQ�@~�]0�����@�-��{wA�T�/�h$�z�}�}2ݣ0��}l��|z����t���A֡`ZkӾ�,hj5�������ZeV�I��{�KP���2�aybP�r�7�� ��C9�+����y�������M��,�
�r���h
�%��np�z��%U���ڝ~-�h(�&6���p7�ǉVf��"����m���:��
��ѹLe<~[u-_�Yi�̾�DqꄸM�]=��%�k ��bA�fp>-��fx%�:�6L��`���Y���*f���Ca���WY��AL��w�q�`yrR��Ҳ��ݬ�it!�x?	2:i���-A��٠y἞�6�k�����.����Br4g��2�݅m��Y�'5n
�Ԓ���P�d��LPp��	o���|bN)�_����?�I����C� �.
;eE_/<�~<���p����f!J�~W�y�J�!J�3��#�޿ī����}ӧ��6b�5X�bh98����Io<Z�S��˩�5�(��g$95�r�o.3�/[�Ϗ���"*ٕ�y�ܬ�8��HnU�ȷX!��x�з� �=O��R�%Z�PQd�SɎ���}/	wK��~}���z\����}v���PT)"w����hO���0�86R��@(��@(z���9̑[?nY��e��Ü�9Y��sJu&+i�0N*c���F�շ�~g4y畞`�a%���W�G�QNx�10��@@��ʦ(芀� @�~ (>U��u@N��e�Q��1�@����3�s�f�[v)�qC 
c�cC�ƹu���!�o�bv���0��Ban�ߐ�]�ߙ�֡ӥI��N���6�����r� '�Y�Hb''�I�*HJe��I{a�L�Hb�Y}��}����;F���H�\Io<Z�HF�x��s�,c%����R���H�8�c���x���r	#���*;�c$�0�QA���Hg�a7��b�C��I���OP�d��������W��}�AO 
��FL����^��ި���Սl<C�� ��?�:�:����rQ��	F��Pԥ������p��oߟ3�A�x{��9�+����ѽtLf��^��]�]��S޽��µ=�Z��;��5;�y��]�F۽��v�y�ŋn��$���w��9�f�ߛ˫����e�����6�)m�M�Uǝ9>�3�;�v���UL-'3��B��X(t��Nަ�K��xi�bxi��%�p��P;����_�ob�����oV9�tt�?�y�'ignop�Qe<me���	袎�3��V��DN�w�V)�VZ%CQ+
�Z	��x�U+�2=�>zR�[d�9�������h�� �m���#t��MyT��[[er0�B�7��`�X����1��?�����?����G�C����(���;���BQ�7��-8�E�{H�g���Xw�Rj.ۑm���uI�T6���<N��[wb/c�/p�Ƣ�[7��+[N+r+�mN7�]�5�Kw����&>}��13.�G�#����(H5cT�bVd�����6.L�ق��z�_ �z���ߴPc"D��f�ò�x�7#d�1ť� �d���m;s�@BU�̸
U�%�ZԢ��9�sT�>���
��|�
�h���'zYN ^����vz���R?V�r��P��Rh��l�?�1/ݹ�����5��z�����,�Ȅi���l�G�mq�D�A�:iUu'e�6w��S�«h!��|�5��X���o�)L��*��# ܼ#�-������Y�W�:���j4���R��B���3f`�3���` ]7}m�6X��a��w.��tZ��@�tE�-���ig������Xe��ԙ��\9�5��"���2Js:��L�)����dN�ɜ�]��X��Υ7�y�z<l��2x�2��ꜣU�|�BrŘ�%5�c9�-��/Z�@�N�:M�ۑ%S�]y�me�p�`��Z�SfV��lk�@}JNؙ�b�-F�B�;bv��-}�!�2��2�[ <HI�ъ��Gb��]�`�|7���v&HD�.޲��c̬�UӶ����w	�;-�� Z�36�͟$���&��w�Tl����@�� {H���tEօ"��{�ʹ������	_g;�5������l:�/��3���p 0�L�י
�3���:}�Θ�H�΄����L� �ӎ ��"��0��{�l��U�m��nؖ����6Cx�"�]�-��oE����0��f5�7kŽ\:���% �s-`��l�fl(�,��j���R���"��H�w�A��:K��Œ�
}��Cߜa9
 g
 �u��3 ӿ�@�?���1u����U���t�����e@���[5J�*��T���fO
덂�n�����XݥW�cڹ�Ӥ]S��;��߯[�.v����U�{y@��e�r��)`/�+�ѻ�]z�é]�ߩv5��w%��5Guh��̓��Ɲ����K;I��I�s�%t��ջҲ=HYG�,m�f8�r0�#�����n�'��A�$ݙ��k�܄�����C�RV�����5\�-̵zN@K,^�<�m�$p�rŉ|^e>��^*|ڍ��H��7���H`�(������zطC�d���M��N4�FA�a�>�9<�Ƌ���]��xj���,�
�u�R�b;�$.e$��P$a�č��LQ�H��׌z��Hm�s��	��c)ف���ψn�\��/��9���E��txS}�p0��
���m.0� 6-�w���db58�bo�r'�[��Ψr�(��R1o* ʋ�1��se*���c��d,%"h�5���+7@�n�=�T
|�J�SSIg�����il���`�Z#-�#mV7�uM�u16hXm�O'셒W*J��("�"���CS+NNSoT@�Q��RA�	�V�����N1����p�����V�V'�NDX-����A����FB�K�mS��
 �脲)dT��FD�K��i�((�:G��8�~��Z�D[��n�:Os�>a�}:����&��u'iX�x7���d�W���U�ū�x���*��z��S8L��a�N-�e�ܙ�4�?{Z�ɛ,�L��?d?�����V���{+K?�����^��.����[j�&����c:�lP����N���C��>��,s�e��Y� U�.V�
������E�&���&�iv�N��4�Ot�Ȣ��1��
��7(:M�L��AD'���
�Ns��ZR�B�4o�D����eλ�vFX��p.���"rmv�\
��E�M��e���V�k�
�.e���R��~ ��C!s-��v�kr,���ܲ�rm=�H%sM�e�-��"��"ז�\ۮ"W��\�"�1i��nT��F��&��5i��������F�Z�4��F��&��M��5y��
M�R׍(uMڥ��z���r5�z��*і*�[���\���5�%v��ص<��u��/����m݈��O�h�R҄Iy�A	�$/�}M�i;o2��+��%K���w ���a�M;m��"�c����}���<=S����Z�+���H��e��]��ݪ{꽊Q���B<�(�;ӯMa�m~r'��n��2J;��، �qP��[��)3���z�OU��� �u�/_���Yٟ@Z���'��DW�Kz\b����)�pMG�_�?��$��6�����#�qs=Q�̡������}���qAh%���=2���1B�e��o��As
�m'��s�a�h7�q�o�$��i��S�V\�a�i���tt�R��dw�,�$�F��w���{�.��½��W�rs�C�paEi)�P�FpE�jv����v����Xv������t�e�����n�r��=(�]n��hc�-��-��zo���6o���^#)t[�H��FĐ,~��F�fsc�F\e��zR���A_h��q� k�j3���{���x 6��$�ey��H�3�� ڟb��s
�v#��h���#4Pou��e��v����i/i.�ԋ�*�p��C�F��G��%���@��$��������%JK�O�%��m,Q��%��e�g���#����
�ŵ#7��k��PMџy�_�]�3���z��>�������wYG�<��o����:��2\p�Q8��8�IH�`�����6
��9��-u����g�
7���ƚf���F��0�3�����B��"ɡ0�ǡ�?Z��a}r���џ��f�r�����0�VP��#�79g�����T���X��
����q�J|0=���ʮ<.��Gq�>pq��+Gk�q�[�_M���q����Z�9]���"�O/^"uƺr���V�� ��vD�"G]��?>
.9���yB`Ҍ�i��)���tbS�sM'6�	Χ�&���53�~�j��n�$t-<����zG���:�n�n��&�����`���f4P%�z�i�|C���m�}��ĜܿFp�:X��o�׷��|�_a�d�� I�-@�'��5C�|�{��ۑp�7u�s�YC�⼎}7�7cG�ⴏHٜ:]x��ie,�|�@�Z.�W�f�OhCYS8O�BL��$����*73=�P�_����#��߸���ټ���n�u7���nb3��yA�z��b��K�\u�s˕�NR�-Ɏ˴�2ݓ���9w�Ց2߀��R��˴�/�`9 ư:�Cc�iW�K/|%�+i�
���{�C��G0oa��GХ���0t߰�!h�4��X��r�r��	$Oq=�I�H�O4揮�t�9)d�K!��b�Jp��)���G+\UU���L`h�6��T�*J��T�fB)�z�#��*�OU�q,:SC�1#� ��O �dG�.M��y��S��,�]�Xw��t���<��Ŝ�X��0Z���� W<v���j\3�嬾m� ���`��k�����ٯ�E�����А�{���l��?�@nȌ�H�Q�Z��\���>��T�	aDL]��T���Lo%v�q�����_��;o��dU�y�8�i(�6�e:S\2���* Z)�(!3�M��0T��NN��ѝ���$��,\�|hg�VO��G��Vj�a�8[?-���c��t <�\��ry�d�R'\��-��Õ��p�N��c��/�}Nם���^�΢���!]{х:�:��_�+΃|O���9ڕ�q�݈.*.e���#��q�Hf4~����+r�[�i���?�͗�7t��;�)�:��ߊ8�
x�x�7ӛ�S�_����v2�<����"�>�� 7�S���'��|T��mzņo�!�T4�,[��
,Ѭ�2 Yh4��}��>�(t��K�/>�J��n����$u��hu����0 PB$�G�_����&�aط�]��7N��D��H&�3|��Z̾����0�)���)�_�_�*|9;��n[nӨ����r�V:�H��rC�K	�ⓐ��'��	O���q
�W���M�6�F>CµY���3l��ap��4X�h��,�n����i>Ö�C�e��0��0.'ͩ��.T�ݩ<�i[��B�X$�o�ۍ�!A����X��O���4C�O�� zx�p�M�ӛr��&�t��
k&��Vsd��0��e��@��f�Õ���%ɀ�Rr�����G����w8�`�������X�~"�6?�V?h�w�6~"0��Q��x�+b��l��+b
�vd�J�;Ó��C
ݗ�R�Z���X>H$�m�-4?KM&�pkѰ�	m�.:��lO�Nl�Pm���f�� ���k��s�mZ�-���2��uF�3�U�.<�.�������Ԕ1p
gt��sG܅\�c�~��Q�
1�љ%9'�μC8b�vCF�����oolʷ�BB!L�&(K�{�˨~��l2�Q���CD���N�m~����i~����c���G��W�W��Nl��$f(�e90��G�Cb�$��0X��7�����n.���o���n~�s��*�
qpѴ|��`N��/d	>U	奃$b�(���k?��[#Q̟@<��B%�<��O��9`�tM9U�l�T�8,U9'�U�.V-P��Q�*Q�*����+�)��~�Z4"t�� L����s��Ì�J"؆�`[S��
����$�ld!g�9[C��XD��j�W<U�P�a֞�ΕO��`�sE0�/A�Hv�m2�0Y�i�)ɔ�ؿ��ag�m���8�6�"�@��}��m���eΓf�A���4����P�լSsmQ�m}��wl�r��wT�`�<8v�0���	��u�Yk�<������>��]��qoy�b�ҩ*�-l\����;	Wq�Ibֹ�C�$!�z�n~u��H(��	d�����f6/7��E�~�Im
�×1;0��ZE�9-�m�n8��D�?\���s0;y-�H���_B����;�E�)��!�iN�0,cZ�Y�v�onw��7���s�̫|����٩;���~�IIYМk�����-�?c�RF�;{M�쵤�[p�q�ġZ�^��J���_���j&|W��ь���c
vK/�#�K��e�i�����3�Ԯ���d.܂���E[U�#�ZUa3s����z�e+�}�F␤+'�Y`����C'��w&W�5��|��FJP.���A�hƟ��[:W����/ ]�B��(hp���-tj

ִ�� �n�T�W��7��Y��@!�д-f�,�b�z��EӖ�i[D�h�g
͕�b��Щ5�6C�r+9�:��b�f�Q�_�^����=8XX��6��7'��Nm���4�����a%Y����`a
V�~�dƞkSh�M;�EG��8��՗�ij	����-�-0 �L�/
�Rj��*\R�$g���j�-`�d��+بfy��c�MR���j��A���Ap���aog�c�(W��$���8k2S{�W�$b�]��E&_���0���⪪+ŝX|_֕���/D��	������������"��5���9�W�x}�V	Ƙ�DXMb�&�j"�&�aq�^�A�@�^�H9�R��^�f�=8wB�36�w�u��N��=���T���Y��m��db۹ �.j��$k�����L�4;c$����'�Dz5+�[i������^t�Ս��-P؛۰×�r���O�a��8X<
Q������������� l�J1 �����X����rFo�wc�����H�'|��ԥ 9��B$��󩫐aEc��Z��9:1�75ћ�xqΊ�\3��'Zk6i&����v�od�X�dQ�
{� ��Q�_�~�@�~��I!�4���ȴ�=X��ӗKw��717p�Ob�$��S;�^\P���;>j����Ăݐ�� =AV�%�Y%�0*I�0V��O'
�l�~y�G�^~�9��T;L��g��)�)�{%1ei!4�Yk��PT>h�
�����g���`��W	��'�t(CAR���J#�vM#����u����9Lx���{&ì]8��;5�ƪ���\�!8+��ߦ�<Ɠ�>��f!�z��M��I�/
Y�Ћr ��XS2�V�%��@]I�b8~�
ƈ��2�U�o�~N�$��%>+���]�Z#�X#���b�+�������U���KyӾ�Z��}z��`��`��=�ާN��55.0���}ږw�N�G��G�RIܬ7_�I��oR�f����Q�,�	Ɗ^+n�QI�����`�"w��=����-��T�L@����;����ePz�
�,D^���{��映��ބP}������k��ȘҨ�ƨ;�-�ߝ�ҲCw[�_��d��� ���ै,�=!�M�A�&��刺��7U��M��sf1��)p�P���a�l,z�l���`��G|8�LX�����
Q��)&kL��g�tdT�z1�^TCVOH$vƩ2B�j0��3�=�?�%�]�,�fnF�;
8 a3#��笍,�P꼥'����˅W��7���,�d�����xpYL[��睄z� "9/�_L���f}��2�dVK^�;/�~^N��\���������qF�Xsy- Zl�?#���~Y �����s��t��O��@�bs�+�Z��ڬ��r}������g�a�Jo&⍶K���`�hnvF���QN�Ӣ�2%N��=�\�����/��3;�=3je���<��L^	2��_���kv��w_Vl��%�`Zq�/hV1%wѶ
�x߂�~��L�R��8I�j��^�:s{��/'kT%P �����4\�/���{��Ϥ/H}�\�/�k@���.�����c~H�:e�4� G��'��=�g15G����G �,q'X����N��5�H2o�zͭZ/�p�C�X��$K��̖�#i��\ab\*k�\�1�4�-1��J�kV#��Z�di/����"H��nު��ەq��Ql�_ӻ�ֻ�G��̕Ė��d�3�}DҲph�sO3%��r��ކ��9H��H�
���,#�sV=�����U��
|��hy����*��U=B�	���I#��2`�/#�б��~g��r}������p�[���%Z�O�wSh"�������C���y���u+��Ԁ�D���6��
�dEtmd��na�}&U���\\��[�D���[�-��.���A�\��>��Hl��w��	�M\(�믹t�IH���|��>��>@MU!�� #'s5C�6(�2�ӭ��
h�W���k������I�؅%?�ج�-��@Q �du�����{؁������ GR��b�}�}��HV͝������5�����x5�Ʋ�o�q
�]8 t����;��ɖMݭ����o�V.PbC���gsd�^�/�w�tG�����V�w��;��N鑻�y/`�[��w�/���,����m�����Ơ�%�N���	�S�˭���^Н�y���Q�aJ[��;
��)룤3�$��i���.�\�_����mJ�H���������!⹌促N����K�	3s�ݝ+���7
��j��o���=c���"3�6n+�;��� �&;cb8�:mb���_ȷ����b�L�b9^H�5VT�zպ�����A��/H���J���
�L����GЉ|w��/v�9A�zi���G��e����\��,��f,�"�&�hA	�A�9�G�6O�����E�(SЬ��kX����g�<%�L	@f́̂�X�I��LAWvB�LC�Z�~�� Ⱥ-�ߙsD�X���Ew�m�H�h�aȦ�:���q���������~	6�.�>�Y^n��zr�/�χ�$(� =QQ��D�����>��3Ⱦi�m��j8 ��v�$�?�{�k�ؿ&AO��J?�(^��u��s�(s fI*�������J�)�o\��x�/��/�,�*78�����5鴛U/^�m�S\%����Q2��z��X�1�Α�c��bQ:p�Cm�:���f��
�>`��/�T�ά�Ld�]G�&`��Ѧ�_9/�ǽ����#qr�	))Pf���EϞ7�a�)r���װ�G��'��?�e\x>6f7�w����=A��]O���'_���O���²��BZ�� o�&ZH/�]��:׫G�2�Ń��fU�RK~����#0����i&�~-�N-:{T��9�� E`�Җ��޸ZO��3�X�Z����7�U��;z�f
ŉ ^f�$D�3�4�W;����7�t|����J��x����yiMܺz�V����D,6wר�ɷ �~�ڋ�!�w!+�z���H�y3��sX� 4�G~��/�j�v�̯~�n���
0��L���T�a��7+�7�n��qy1�7����/�W���v�1@����*��Z"��ȑ�����SkF�Kr�ܑ'�Ə����~�YH�q �D$,�4(f8�ӣ�ԉ(4h�Q��f\GP�ӛM���%����Y�(\`?×�b�5��0��;��*�%�򥊽K����;�ן�\ȿn���J��F ]�!~x��G�\O�|�1h��!�ET�����%9��c�]w&r�!�L��A���ߕi�]������RUHdW��Ĕ3.��}o�7'>�*������BN�C̴�,FN��R:�\������AfRo��fS����O�O�����O��?���g�4e�1 �
��}�l ���ot�܏�ܣ��&�]��0��Z���I[-��c���!���+C�e$y�,��f+��2**SC�����ܟ����ڳh
�����X8M��u��i��K=I�P%���VÈ���������K�=��UX�s�1x�=�?x���#;J�:�r�{��E}�b�t�$W���H��UW��	!���*������(�ߕ@��`�[�A=�/��O��
z������^	�j����"z��HP�5O�D�i�'|�V�r�&8��z�Z�0:�-��q��T� ;M��rV����1������%g�̕j]��A�� 
b%�(��Hz�Ȓ�;ՠ��
lid��%'�� ��Ԇ�i�./��ƈ3�T�OaB����T»����z�!W����y��3�7<�{֨�zR3�E�h-��B$�~*,��ޫ��%����>k�f�%�jy�ܬG�U���p�^�+�ժ�q]K��`U�Nj��G�	M�\f�q�1˯!����R鄨[Z߮`a��!���+�1��H`��I�%Rs�2�\F^Jg���o��°���.�d�6aP�#*��	��3Qڌ��1��}�ыp.#��|��mn]H��Z�B ܄Z�|�	�,&9�)�eդ�:5 ��$͵}������Տfy��O�����GO���YO?O�<��x
�X�I�@���󡣍�ZT���Qc7$��S��c	x����\ FPZ�n�F��	U������F��%��oor�ό�Q5S)qxZ�Y-8M}�c,��W�G�S+��M�A��^�糘5��OHX�J�j����*�HY[.�����=K'�L�#о�K�_?0T�"��ЫyΊ���~X�Ƥ�G>��U���؁�/
�E��T�/�C�hX�����f�a�C �`)i�\�vb1oY�g7���؅+��i�y����ޣӱ�EՋ���)T�t�D4�4nOL�#�"��!��]�B�o�م{ d�Y����J����Uy+x���xx2X1M�@>دdujǪ�}+Z̺�6�;YU�9�Ǎ�>BRASd2�<�	m����EY�D]�#�W����4�?�q���8�VE�ak�ǘFD�a]�Ǵ���*QH"0�D1ӧ#}�j�Uh�\J�>���qd�$0%��s�#�$���j� o��G�Y������%eɼ���/x�Qԯύ!k��#ݒg��H���Q-����N�
dyy����ekb"m�S�u�-���[w�4�'X��Cԩ����x�j+y��fr ���Ȑz���V�F`�'�� �Lh�ջ��P$�&�!������Au�G��7y ��������
+�53��ta���X��U���$�!���� y�ZN�]Ƈ�ܳȃ~�h���63�
��-����ͱ/ڃ��ėe���A�����?-˂� ���_t!���`��ځ�� /����GY�	�S�Ӟ ��?3S�<{�A���'�5!���o6S�3`(�X�diy��Gbu����7�7�Ǣ�wXL*n[�<�j)�<3 |v�/�s�/�}O9h�Ls��,�_��a�A<3(���Pʃ��M�Х�0f&��hE���Z�/т?"a�O�p���Fj�[�=�S���������(�KX��W�|�%ǋb!6���Nn��V�EJV��rkp�0쌔B|��h�7W�Zw�K۴���q̌�5m����wYN[c���[kQ´cg,��5��	���*��]���IRH�f��ς�ҵ֜,<R�υ����Ӱ�`��?\�͵
��|`�������ڦ�t�ʯ�>�����5)���Y�����#
n� L�^7�|jʠl�����
fP��B�i��������X�X�����O�{�D>E�����e�[cĦ�G�y>�

��~�[/�Pˊ���i]�1A;�p�(х�Hn	�d��K:c��𡍝}���jCr�}
��s���s��1�̯�~Y�%
wAr% L�
a�QS�i�`T����R�S�&]��]���(9?��R���
x��PMmL�6*&51R������*�K��o(v�ƺߌ�>���
�"�Gu9�t��
B��ƃX���eM��˖pf�
]@C�66��3��)��+�х]��KK�F�:��!lC�wKi�5P��Sb�Оf�\�I��è��j��<��]�w�.�j�SMIf.���rpiEK�w�(�?LP�Q5���?�͑�r���f㻚z�3S�U1�A`O�ѧv�r���3�: �>�&K��r����%����-�;ΓU������:��)���
i] �?�@HL
�Lh6u�i�����G���0�7�71��LS��}����u�z�����
}acY#�([�Ǫ�D�r���χ��ݨT���X��_�<Qf�0�LiL�1GJ����?�>g�sG�hG"�U�ao4sOޮ����
�*��:|��i0���	��%4(�eX�Q!�ī����=4g&y����2!F*��	�W�~ß�;.O�Z�#ⷐ6���!������^/�}$�s��|��c2�P�
ŧ�U8��r�4�2���+�W4��c1\�Ŝѣ��]q}�����Zqszdo����ܻgJt�$�k���O�m��
6w A��"Maⶲ�^���^���eZ�8��[�2Y�zy#Om f�A�~b���,����b�STp�jd+�)���"��Y�����f�0���E�6���.���8`%�����13�0�����k�F�s�S�	�v�>t�����i�Q��@C������?=��b�
dٝ��*��G�g��j��gؠJ��J�|sX��D��c瘘��#d;O~㿱���Iq�yR���Kv��<�p��C�a��R~o��&BP� xk����yت?b��(�$��߂�W�4��H����7E���hnj<�aK9:\����m�-R*!�a�H��Dm"�7�T~<X��Z��r����h5�Bc��w}L����q�{Rq�+P��%�OJ���� ��(�;���SJ� ���ݟ����^s
̓�`�]��j���o	���:O_��3���rQ^ߕϾC
~�m8as��;��ho�m�L'��1Ds4�pJ~ m@�΢������ֵh,��?�Z�yUGغh��'��(.j��$��h��h� ���o�kJ�j��|A�n[�I�T/�>���$���nk.�]��=�O���5C2�M�%1O� y��&�J�ʼ��\o����o����v �X�$G
�r�J�^�nh-̻�td���A���x�}�A��4�� 崙=�X�j1n������dTa�#�^���&��z:�f��@"�hY[o� �%F1���9Ml��������z�|��,<����2�C�Э�J��}��d���}�/���Nm�,�Jm~y�V~�Qc�B��ƌ���������z��4�k7ñd�ˑ�MT-mWtM�Si��Rq/�ح���η��<$� ���᫠j���
��Rٶ
N[%,���EP��~��J�a��s�x�^x��wW��w�����_��K�"��*y8��Z�w��C�� �/��Z���ef���\2�|�B�BdegNb�+]E4��k`�WI�։.�䀑��#5`������|���v)F6h�{)��6+Rr����$�X�H)]�t� ����	%D�p�
x ����x:krcs���E����9e��PX����fT����Kt�t��3�� �}�p��\sđ��0�T�1
�z�7B�~�p��3�X�'�3Ư������GP����]����U�h�e���	0�2��촰���(*S9���S0D�tCvM?��`�����2zԇ�$��=2���x�
���~�)"P��.�po^5�d_�h�����C"y��\�ds�n�@>;>;C��X��k�S��%�l��4�1��Lּ��:~�#6�m!� �4$2�ID�E&`Ӄ���l�?wB2�vߌlv��='߉^�r~���!~�"'Fbck��;k�<t_���ki_S��[6�'�Qڗ/դ�	���n�Ol�]�>�;�ʺ�c��,
A|�U跶B������Ã|&�p)%��IL)QL)�SB�۬�S4��HY��XH1����q�!�p��V���o�_���0$�\����� � &�
��)�_h�ln�o����=�־y&�M��ZL����X>%� ʈE�X�E*]�
�a�}^$`�|�v�,j0Sۃ�JD[-F�"j�8�
#[{k���u�?��iߦ���Pp��7/�"�oC?����z}�پ|��f�� ~

M�*�����Y����Uz���Rn�)�j�U��?Q�B�
s�T�3��܄o��[���tH�8��H�8�Z\pFa?��)悔l�cK�+{ߍ @Uo��i�%�岫��B�xYh��
K8~y�_�4�>r�ϙ�7G�}�j�:��:����cZ ��5��
�z%�5bg��^�m��
����:yQ�I�b� gP��@��������`1^H#���~W��&E�u=H��j�Q��m�Y^i����T���YYNBN�3X5e��6r�+ʝ�x��Μ�@O_AM�#���K���ߒ���
h��}���d�u��l>��T5ּ��ś�QE�y%U���K�M����ʇ��5�
d�O:B�fY
[۶�<�'�1��1�Q=�t����.T�!wwz�RgR��E��:��r�6���S���
x?���&x�P+�!i�4��MԁU̜S,��:�Y~޺n�+�%�l�x�����קZ�^�����5P���z>b����i�ײ$S5��}��.1��;5����^N�H�~8����r���0�.��;H"@F%<��5
���<b�N�:l�V	�-�k���6�束�Xn��8L�yR��i]��5��h��J��p���>������Q���6h\���dˮӫ�=O����u;2�8��L�{c�������C`^�72MC�K�Z5�\
�1�'5oE��o���o��
NTǐ�*c�9�����;�ql��)$�ʠ�q��)"��&-D�'���S�Z��S	�$�2o�wH[�4�w��lR�K�o��l?�r$��\�-�Ѱb�����5I�K�!Zw���#ځ�w�s3'�4�l�\k�/�!U% \u1�~�f^K	�B���e�3��R�*�� lT1 os��xSA�U0�痡,��������v�hf��d0��*�`R�����M���H?�����Xg�	�'��u0<�R ���Vvw�����
�z�}�o���ɞY�5�-�B�.���2�1ſ��	��λ�O"�/�ٙ�캱�d@��=���7����⤎��܏��u�W��}���X�sJ�%6��>� 	-��D� ���sR�D'eX�/s�I��1���W���w�����-r�(��W柑�cM���`gb�PW�=��ˣ8B��X�nda���9�l�҉t�ٸ_e&�e�&+$�1��/��1�뽈�������Gnr5OG{�#���w��m����)vKD�I��4���k��隬k�e��=fYR%9����� 	�%�q�M��8� ���7�����0�L��>V	�����)�����%�OCM<M�i�֌�&�&p�!lvgR>�t�wME�E�&���;�Z��HK�H�z1���UgZ�=�6=|�|^=�MѶ&��Y$�HCZ�Y���
��<g��K�;�z�q�arz��^�rn{4mfðy��fˀ��3:^���3�l��XYL)V�]e�
�VB8*	Q��"��
P�Z��k�)�[���R�k[�Z�'U�_�h�f��p�OJK�O���`�	�6;̐Pc�1���>���^g��R��!��lt�C���7�����_~�Kk,�[ޗ��UV�����/�|���UI����a�鄍8{2��Af�/�pV���-���c~���(Mw�������FY�Z���`O�k�L&84�qg�3�?�3����1��6�rːrx�I�2����`0sA�MS��0Se�S�����2�� ��Q��a�w��!�l��Hd:��
=�o��;]X,���
\������%�Ԫ���y���Ԁ���o %���;+�΁D��c?��8��0*�� ̶lБ
G�Ͳ5�e��k.?W`j�N>�w�]|�Cs� �� K�,I����Ne�wY��
�]&a��ے���v��ޕz�s���t$���/_ڦ���g��$6o��X�&nْM,�e'㍻�2v�o�bw�7��Inj�ҙOWi.h;ܔ6[�m������#�F&/�7<{�򪘼�_f��9{�K�GY�T殃�JQQ5O]�ꩫvI릮�o��Z���S�oj��ߛ�ʳ_c>p%����z�������^�����=���(.O/(����B�ϝ_J2��@�_��ڻil>���j?pxt��p�%�p/�JH�¾�^�s��~q�n�O��ʛ,��*I�2��w	����:�����/���,_>0�+(κh�-�z��%X�/$Y�_F��7��{���7�;��U���)�&����&.�u�ة^���4%Z�+�B�6�ns��^̟��O�-�04����u���N�����RC�7O\�'ږ|
&@	��6�@w���c�9��l����0~xF�ޅV�\��0AN��9챛�ҋ��Ǜ�BRu*,����E皅{A������p��Jܷ_{�	�ţ .�3��&=�aH�n�P�D�Y����kQ��o'S�IT�$g�&�t<	���� eO��eg��&�����0�k�[�t���\Q݃2�,�3Ql�U4�22�.�^���B�L��t]���H�1�]C�~��
<葘�@Q{N$�M��u*Ur#� �h��o�H�)#b�-]k���Jb��MX���\9u>�}A6r�L#��
��{W�VZ��X������_�?���Pٟ�)��P���;I$;a�Z��
'��01ˇ���L.��ܖ�
W	��CW�v���]K�`.)kJ�#˼���zs�=���,��W�����i:ĂD����%>Z����Oʝ��bi̬�#���ȣt�wGܔ;�O��P%cE�i��b��4]E��r�����8��M��
~7���]:�x�
`RX�t��Rqڊ7���OP,Ê�z��8lף��:Է��'� �*s
����=�v��K��Zt׍�k�o͗��V�UR�����b�m�l�kc��8x��Z�{t]Z�i�u�t��~��N=AK�����CS_H���+X��O�F?"��3ĥ�A��\���gEot��YT9Jn��	JL�ULQu���6!���
�ֺB�J�k�_�V|c�i�M{㭯�c��/Ch����^^hx����9/���łw��V�WY�P3X1^
�US����Z5�m�����!����%ԱVت��a�VW���P��ר�ҫ���27��5_4/��V�7{H�,\C���B����!U��
�!͟�*�����Z�uw]�PC���s��G�go����G��2��q;�@�A��Y�qT���9<��4�c���D��No����&hheb�MM،��e�&��;3E?K,�;K��LM�4#㱄-���x�}�Up�㛣H��{����� V#;�t��uS3���(������ `�4��=}�A���h�xH�X�R
��؄i3�FH��ѕp�}$!Z,��o&���v�]U=�.w�
���ۄ�~���.0Rٙ���zJG:�uF��äV�v̳�Px��}�m0��
0D�����H�`�8$
�2���o�\�e���U��-�M�>}��C32���^q��Y� b�^ܬN����n�3���z�0�Ga�׽�����o�my!��	Z)%�K���SP+���[C�N������u2z�!�����1e��ʺ�譕�s����1f��̼k�\�l���m,z�^�;��;�2�3�����6��<|z�w�6#w�h:��t֡٭�fwϭ��s�"�G��%�S���Z���!�^�z'��Ez���D�j��C�[��:4�[��ET� �[KR�I��$m�C����`r5�w�c&Q�(:�Ql�@���^
{�Q`[$tyߦ�l�$�b=SKH;��D�u�NӋ�V��L�5PtV�خ�b��Ipop\�*u�t� �6"��TG��W���UH
iE-S���*n��03������R��T���(��,��
yM�b�q�N�����h��5{�f���Q0�_�z�8=m��?����//m���+5L��>������yn6n����Q~|Nv�����` ��x�2����ٹ���|�1HE،���<����]Οَ�gc6�lX0�F�C{�>�5��ӧ�3د�_`<�l�l���$�ҪWx���G��(6�}�.YM�[A
Z�̍�>� N�b"�i��_�Z.��/m����äW|	�ğ��~��#�Ы��i@э���Q�Rm�K��R�V�"�2P���Fnk��������zv�/�d�f��~�/�ͭ��I=���s�:��A�_>ĆQFd���1�{�+�C
�>�j(��D�/+V��D����7u��n*))ҩT j%v�9S�K�r��Vy��[4J�xQ�G�Л{4����ծ�,��&n�wJ�EQ���%ʍ��N`T�d�b5�+"�7En,�m�+�^zi�_�A��~(N��f��aa�Cu�Q�,w���gZ�?1�3� �W䫯�ͯ��I?|ȩ��n8+�����Ѥ��;�D�7�"Ӵ��#r�8r� @ȉB�9�ē�"G��8̕hA-l8�^�>���YI����ԑ$�[�C�`ۍ��f���Q���i�m�����]�w"�s"x!����׼:n��p��B�th���^-;3��
2��9���yn�:����5�Ú��UKg�=��}]�g�t����7 Id�iy�Xu!��\MY����{���2���b2FE�TH$��*�t �kI��I�"�k@�H�>���)�8��R暵ci��Ϭ c<��_�}y���MWk+sJ�H旮Z�y[�<n=s�e��w�S���
KǺ�Oُ�����j(j2����U:�T�����2$k/Hq�-���o�#J,x^zDK�*.rM)D/�/�(
�C"9���ȫ�R�A�R��;zf'`�3��U�z2�1(�0������G̮��=y��p�Q��$B�
L�0N�U+�S��
J"	��?eеנ��uW٤�]�V�;i�_��*�C�7�]4,=20Gt
�C˔�On�I텃��ʫ����F�n<�7Gt������跥O ,�h1�D�x�x�N�Qk��1��NǸhK�ѯ=�@ѳ0��W��(����Q�!����l'�#-@͍@v4�xD�s�XvLǟ����6�}{1��é!;��ͩ\E��5(sB~����I��͛M&ס�Mo��#���m������
?��u�]׭H���]���Heb-��h�K�
��FI
8�" :b[D�ӛ�Y@a�������.rk@J������� ��>_�=�R�q�͆�q4F �?�@GIc�Ά=5ǵ(���ư
�
�ՄGه����%t��ß!���h������eV�;iY'��A�����}�怂��8������&���.y$�*r�9���.��o� �~1��D+|8N`�J�_`I؞��l���jd�g4^�ծi_N~n_�!n���x�#�dq���H�m���it1\T�_�+�L�l��~�؄IS�d����5ȕ�0�O|yI����{�����l2���|�5a��.Շۤq:��L���.i�۸ᳯ�؟gP�����]�>l����Q�x˅�����g�8�ϯ߾�&�2
��t�),$�
g���`8J�Ø������.C�@}��?�9�q��V\S/ι�����z�����8�,�m���/S4�yy�=�
:�|�]J
�Z�����'�bI�����xG����@)Ztd��X�%K����I�Ø�DG)M�0-��O?�\��s�I�J� 
�4|m�D��(ѠIՎ$�W
�~
GXE�j�r����O�-tߍh��M��X7�7��X�Y��ʽ�����_{��hk-1�m�ǹ�$�\�4���l#J{]y�R���|}G��Џ�>;���-���9DmVk=��
L��܀��]JH���\>}��g�{|ә�2
�2�O6�P��>0������Q��^NK޻j���	VJRq�Wa�{M_�0��r4�bf'����?�j���PlElc�'����!�0m�E5-oT5!���W��rM���7��O�X�XL`�X��>kO;o�$�`��'�?�B����-�z�@a�,��i&���\
�WfY�W5���9L�V4�{P�)c��Q~���v��KbA��+���&��S���WHt�2�8Lde��S~ �N�aL�H_Q��c0�<����M��4��hȧ�$��]�oJ�i)��[)#.@
��h�i�
�#-
��>CT��13�g��Bn���()%����2|��
��ֺ���[����
)��Ī���(Ve
u��GI�I2v�a̬%�&�[.�Qq��)�d�"@P��(����~1�a9_�HW��
�FZ �m���l���DKu����S-�AX�ԼP.�$
w��Ӝ<��@q�!���!�E��j�m��=o	��e�zi�� M>L����wn��������x��k�a��Z@- �KV[6"�������ּ4�+g^�K�XE��r�J��-������%�?_N�J�Mګ�J�P�"�OAkR�+f��@�R2�LZ���~d�7��=�p����D�7?�l-�5K �Z�Tc�&`˞ހդ?��s�賱�����Ue%�bI��z7��?��0�!F��j!A��S��s%�R2���0V�Cz��d�[��S_U��4/B���pf�[�I�y�`W��F}��.��xЄ��vx�+r<*�%��� v�V$�]�`�H�Yu,WZ�W%����PY2����
�������ǣ!�2�[�T��RzZ�Ȥ�5R�}L�a�Uc>$�ڱ�[�{��p���VX��Ձ�j�꤇�̘B/V�s�ڬ+����(N�4�@	ȴ�_~��'�(q��0X�dZ�C.���%��"V%*//����j�<�~S��������^�Υ����B���l��_��g���h�-�
@#7i�֩�c6m�k�݊���set�S�-�k_��̕�Y����/��箶��/*X���I�|�6����NE0M>�z�Ͷ+��(��vo_�˔'ao�gO�#6�n�dy�s���UǆXy��n1����3�b|�#� �%�=�/��esl��=ɐ�1��*�IV2��f���LigC1���A��qJ)�a9�kF&LQ4-�EX��Cs��������O!��'��Iq�E	8-�����i������X�#
�^��ƥ2��L��3Stv�ξ�M��*z��#)�\�,�j��`��-�{|���̇�B
m񨅀����0�Pa�����a�[��?n&3z�+1o��p��
��<}Z�ҝ_��Ϩ5:.��"��/��)�!�b��������7�涁�B"����.�&~?Y#ǂ�vI��MC5�8�t�nF�1�ù(k������-������\�I�sʰ�G�����q�T ��Is|��8a�X���fn6p|հ��K�S�>��:Q��FZdZ�� g��
s}PPH����wA�m��nǮ@�$���;�C�,�g>Ne�R��pf�j*���	/�x�������eDJV��x��������Mv�Zݞ`�CG�G�}��:&�[�(����F�	Z�iH7�E��\��4)�p	�m�Ј< �l 5�����K#^�	��<�R�)�;��*s��{�#��	t������8+A
�]��8
o�l�ˉ!�:�WIf��w$
�غF(���F@Xn@g���� �:d��nn�8,4:����$e ���.����*����Шl��Tdφl�|變c��͝M��V4;��P[�L��J��0��.�[sJ��ɷI�� �FR��	q��E��HR[�M�r\֖�f�4�r�X�qa��
�x\�Gī􈸬T�+2H��p-��o�z�k!~\LR�c�ē"�������L�����-�u ��vL/�;�`�>G�i��.��|�JtU���G�g��L�nl��u{e/5ݸ�G�������.� ������
��lT�~kp�f8�f[���)1/����*z�l'��8�nL�	NF�yZ*a�Y�0�P%���	��aXp�ߌjM�}1e�""U�����ɷ����u/|%l�\�(�\3���Hx��C��f� T����⿢<������<�=�����f���qo��	�L��-�}g�L9uZv�!����_Y�GV��~�j,h��][L jm��F�h[��T)���uO޲j�)�j4>S��Ok�r�<��!R<�R[G���p'߿R,PŽN�F�q������3ˮ�6k��
��fg�H�<m�cD��wk5`ű�W�����P-�H� ���u�ӧ5;���m�V��Ś�ιf���n5k�魼_���+d��2��F*/�Q����z�z\^��G���dAG�AE�l���C	LDr�.�dz��I�8�W'��]���"qc�7��&��76���9�uW�&+
��$8��徺�
J�¶�)���>H 7|���P�^�_Z�Z/R�}?� �S@��
TJ�2�u+����,�r~r�uL�Ժ�?��;������)�vZ\�iP��2��2�W�2���*ܐ�m�i� ѹ��̌�xRZ�M��+~��M<�v�n��A2�ES6V9΀��,g�y���3�M.�~u��,�gy򭽞�9��8��ׅ��B�E�ɷAF�~���`�6�μhH3&PZ����#S҇�W#`�m���Zjެ�v�G_~(z뚀~�����6쓎��wv6;K���~������/���s.��g�����Ƴ�>)�L��~�l�75��4| �|f�)໘�����P�Gd$���R�Z�$�G�z\��M �%;M�Մz9�o��=����`��3�^G��v�ʾ�TG�I��3Ƀ\�r��bYe"q�_��c��<џ�>.�G����__��A�%��3�\\�����sB`@
��{�!ȮA�҃�"�
�����3o��J'�3��#�en�LP?6%5���~vX���2Ʒ�C;woG���*�?���H,l/y3L��.
����s�	�Ǧ� �A�U�`p��|A��S�8Gt.�1��9a�����O���jDgߧ}<]�	���hφܼ��EMl���w�V���0�%��Za~�N�Pĳ3�Rs��@��(���Ŷ@/��5+����4��V��Sё�aٓ��d)ਁ�j�#XUK�87

�{��$x�D���i�7�a����;��J�#��ܭN���-��A˴t�21�LU�/1�,��C~l9���fK��'��D�򨀎��)�8Dhs�x� Wt�	���W�e1���"�����\N��\<�����M�.���i����
|�
wA$n�;A�{�ɇrCY�ՖJ���|�&3���P.��DNM���y�q��Y�?���Wt��/vY�b�P��}:��;S��[Sv�)��٠�_�;c�����G��|��\R�݈�ť��5��v���r��DYd�D ���0���>�$�J���W����+s�����ϫ�8w�ѡ�*�i�M�FY����C��XS�2\���i�%Q>uH5N��z�8gv��y"l��̋#ޔI�Čww�/S�l~�O�F�5Z�x�KQ�_ l*�(�<5.Gp
"��G�G���Up���G�8�����	���3P�Y-O�4��,��W$P�(��C�t�l�-�ZUer˶�lPM,+E���T�XN0�P��:�x�<-��a�c��R���'ZkVR�΅}w̄K�(�yL� `�K�,�w/��J��o�Ik\�&�a�&�R=�G�~Dr'PW����Ă��r�� �3~���|t�b�q�yX����E�!����9�a�,�i3?���xH���B�i�$�3%�s7
%�Q�<+ �=|�
�� �R34HuB�hS6���NP�qH+�����O�J�hRM����c���5(T�k�,.�[����9~yw:C�����$�
�b�,��
ʵ��~��h�*�|���^8~~o�ob�l��%wx��f�v`�N�����iD�=IC���<
bv-��Jl&�Z\"֎�X2(m�����zI�F�I�^�� 7�FZ9�.�V��H�ŉY8�\Z�8����\WI���j` /�m�fP�d�6��M�`�x4��q|Z�Y��AK�sy��r������[
��"�!}}���M*S��&�
~�;��m�X��E��v��_����W���K�2+�N�
ʲA��1��װJY�p��z5v��Ġ^�F��	�?�Q/���=-N^Et���p��i�f�]�@>"�b��Ō,x�:������%�P(a�$H���݌�&hH�P�0����:�v4���J$�<Sv�n���$^'�o�Hm�~�$�	�~=J� 	����V����t�,���P���x&����t��(XYt�;g5t|}��`��CV7E{eSp�Z�V1[�]-�E�r�W���.��䭕����*�UF�^�dfE�N�����M�[�bS���v&�����	G4�eFߴm�J�U�
�+�7b㚼0-�IW
*M�M���S,�؛	#�B���*R��͝?���~q�7�=T��[k�$'N���q6���2� �� ��-([v�������b�3�K�7c�O�B�#��:iS���O�����8N����y"�-�G�΁���ڰ��ϔ��KӤ��4�WSt�xy��|�q
1h$�{�h/�ܙ}��6Nx�3�l��\5b<�E{�h٘�U9X���d4� )}Yd<Ipg���L�d�l��:�Q��C�����O&�%{���qݽ�&�f���x�1X,�sk�n�Y����t+��?�3^����H�X�+dMF�єƃ4�!�xk6:����eU9��8m\Yek�_~Q�?�l���Kȳp��#XY�0W��
y��rN�֭��r~F՜t��D�,�<���G�fD�Xl�6��(K�A��|�
 r��)�l�O�%�T�6��t5Y X�z��(;0�|����O�#���1ݴy�Ml(؟Cw\�y�2�ކ��!�%L_����	
�'�'�QOz=�|�\�E�e�� M�Mz#|�c��*�M��������܂F8[�	d��W�X+��V���c���"�a��Ǉ�YI:o�̙?a����K	��p��Ïҿ	Td����w�q��w�Q�����/n3̶)��t��='�x�p�F�cB��p�=P��%R���Y5T���!N	��*RH�=r���abH��Ywvcare��cL�7$U���BU���ZI����j���c��{�B�{�������L�@	"�8���S��!��}"�I,
�VK&�bI�`�VH�W؍7���>����a�.[g�¿�G�z��o���NC�}	�����S�C�7�/��W9�_!Uß�8]�B��*!��׃��C��B�w!���>T
A���UC���B�~A��zH巀��� �Zba�Č?~�Pb�a���e!��ى�"D9մ�6(�*ȁ��h1Qs�� ;�x�g�lv~l�I��l�gF���h��v��T�^6�E���l:Q�h)�/D��3�y��=�au�j�~��~�po#����F3jSg#�-���|�֢���m|E�J�g(���:����D��H5�a>�b��,\(+�B�C�Y��ǬmA���<��AB��p]��õ��^�Pv��m�+߅D��)�����4L�ly.�0 ]~z��������b<�.	�G
ai��&��2@������+�����8<kj�<^<�+'H��5����C5�0
Sy���ؙvӍ���y��>���$AW�z�LH�rkJɂ@r��Ƙ;ָ-���B����05#�`����o���
G��v� ��cen9�O\_~D��7x��c�[�eX=j��W	������+�<��iR��L��dLD�0�.8L���OV�;/���!:���KU�B
5~0_B�x�Y+E)\f�\]
)Z!WT|�U�\�BQ����Xe�h��3ZĊC�ť�ӕ�z�|���(�ڋ61�����o'�3�T�
^�C{�&v����P�:v��H�J�)��,��uK���q��$~/l}Pt4��]hT��(�y��`G�6���
~Ǐ%|,��L�?3q��!���K���qC� �a�RHzި���*7��6���Ԇ6��T��6T��;L�B��Nv"�>�k���|𬑵�����|��'�I�Z��e�c���U�D$����#�>W|@VdE��?-��R�lz�`���C����3e�{+��KS�HOSH�i�;���5�懯%J]�c���H��h���>�������&�>��Jٶp�O��A�.}>n�����܂<J!΅81.�8d��㧷�r/��;�P7��K��t����43Z!L6N����8 �����i�S^[g낌 �5F�cr��6~"����2�a:�;�9P����{�ݾ
z����Ǡ��a�	Sۑ���Cc�̺7
{0yrLA�Ȃ,����)����0�c�3�fI0�̈�:�������j�uղ��:�ݹ��Y6<����Ȋ��3�O�I"�5z =��Q����;��9��.ސo�@c:#���" \����\�f�F��8-���cP�Q6�8è<o��^��x�`
��oJ2���Fo���"Gm�7���/�k1�,KH�x��1#�o�(��u���e3
���jۤ&Ve���<ӍiHA��
u�	��
�� �Z1|y싂^��]{F�J/O�4�Q�������9�a�$��\�Suʩ8X �-���S[��fD3J6޶�b���v�&���4���kz3O̪���&���Y��@Y���̎��,�|%n��bO��-?�����jiA��d���
�5��;����WGoO��x���6_o����	zL�=rQ������yy���ۣ�g<sf&�2���@�}17>���,F/؈���Ҟ#�� -����I��#�I��|��7�}{������m5������a\MD ����n8�{Mˬ�@��/��~Җ�7N_�j����e�[y�;�7������z��5e�O�
�����h��R��i� ?������N0���}
[����Q5QqM�՛�g����'�ZNw���y�ft)���A��ff������@�ugv�oY��Vټ!Ll`6?����1�9rT<��xM����'[�.���=Q��x���R܊�����H��r$H-��)Ŕ�+���ک��cu�1�]�}fA������`��9b�B3%h���g�� cI{�4�R�Zj����dc"�ӈ���0KQ�l�H��`#�/����>���FCoOX
��c<��齷����?0W�>��9�c5���o�-E6��0�����/��C8���O�����9�A���� ������ �����na����������'���l�r��gy~��x�&tt9'<���)F\��� �?��u 86���n�s���N0�����>�$]�:ힿ8;rm~�{�^�3�]��L�3w�^xg ���Q��|�e�1�jә����b��Ġ#�
�����
���d��N��m�,)]�:	l)#Q��c�����]7��zA���R���f�4���v\7��]����?��.)J>��{,Ɂ��?���ݽ� �f�z�{�Eq`<"�/^lwNN8��)&�4gг/��C�1`J���ϏO�EAs蔌+w��O�2	M�9߁�<-�a4��p�������^@��n0M���w���B��˼��y/E�{/𯀤d��sv��^��ONÃ8���;�`#d�l���s�<]�5K���i�h8W0a܅������|�"�0l�ϱ�UF:=�a�0N�y0/S�SF�9=?��Jc�����v��i��1f����������	��'�s�S@�5�4�-Y.���"�=�ۇ#���j@��;�;?��hj:�
D�"�z�5��sƅ����1ю(?��y�V����=ˇ8�?�1x�G*��m�7���i�G�]��=�N��%6�6��0�h�{'�����uq8p���s��%#�??9;���xx�|��="-G,�t$P�';�g"BV����\�B ��6�����Q�9����al~����Ku���ON�"�S���B��hwۍ��W3P��������Xi�����^�ʍ��{�ggy�g>)*�A0fqRJ��9�P��.'{?�v�w!f����^x/��/P��d�� �@�=�l�;CB'q�&�0�2J�9�b���xfJ9=���fr9���x����]�� H2�v8[� hF�4���*�������s5������9�>�p�}`ZqAn|J�j3�U<?�*Z����U��kxt	�������:�(�A}r���%�==rOO!8�q�s��?h�e���aK:��o�6��&�(�)qZ����R9�������;G;{�x�<�?�}�@�A:�j���@�Slw��z�{R�s�h��(m �0B1"Ǯgc���ͨ��D�;{�����FA����
(�R�O�w�O,��D�ށ�i���JϧK`���z K��sAK2ޝ_N.2�E5�(9;1rG���%\�
��]x�: �A���Pd� a���V���	�C���x}r5�e�G�G�����-pbH�N����"�.H��F���&��~r�H^b�� Gb�䝖�����!h�4���| ��Рml�V�@t������
�F]N+���t���a�I��L�Q,��]����P�ʴ`Kz�I������V�<岭Ý���>�e�4�f\Ʒ��wo ��#�H�5�]���l�F�S�/���6�x�k��hh�O�>컃YqF�?�@�g1)��.��}8oG�.Zxp��[쇋,��{��CH�J�u�S�;�T�?���p��D�#>qW�l���-����F`��
]�+��9%�tql����g��X�k�I��P���z
:��T2�|��,���۱67
þ�W��q]X�%��`��(�
ڎ�q�t�h!}�u� ��H��i��܍F�-�ْ��g�������J���sk��c�WO1�f47�&+t���c�X��ߏʭ��_r�R-�r��W�ɜ 4f�1����	��X
O���1B�T��$>�2/���$L��|��}�����D�ө�*�p����	+s("�CQ�\D��XK.��!�u!
�Y����c��� [hn˅KZ"Ro"bq^����g^�^��5
�ВP��r�BJfK�m)s[�Ėb��]�[v	o�%���D'��,[d`n���t���U��"�C�~3���ɛm�l��+s�O,i6�;�ߥ�/��x�x=���,��\|ϗHy��H^-�=�{�#x�C$$�
g�eG���o��F��0�4l���;\�� �gq�5B� �U�+�&�] ����_\F��%�{�k��	��7�G�c�N4�0��m���}��o2,�IyAʁ�)���^t�2�c���|��
�C�i���6�{o��#/��p��}�⽳�Q���[��qF
bcu?��pC�m��8���@���R�.]�5hԝ�0���b���W���Fո�r-!F�SWc���� JF>�n�\eDd�{n 3�9��6��ܵrХ��z�̛���y
poלZ���}�Y_�?E' ˏ�;<��E3k��|%�[�6�n&�2���/�$�^��-�9UVL�����?�5������X���q:9]���n`�Y3���w�)+Q����
�X��Tڜ��v[�Zg8K �pz�]�2��Vc�I��G�=F��nH�Z����q�"N����PnB���?��D�FBKt<j)�Q�k�<ޮ��w��͒�ܵZ�H3��F�eF�|h3a�!X�a*T�\�M/�G�XS����pq�?�aA��z?j\�¢������'������1Pc��W��
�у�\�9Ƹ=d�p��5��߭#c����u�� C�#��2��<�0�z<�iφ��:'��H�~�%ɼ�tM\f��3ɯ\E��-��`�q\�%�d�����Œ9�X�0�y�3ѕ��T���f��1z�(�w%��.VѪj�
���c�{����,��d|S�\��QX�QblJ�T-.��A���f�Y,k���	*y���*��V�DV��a,`�z��C4�#&AﺷB���p"
�k�����u�D��v�OE�;�f��æ�����p�+1?d�6%���&͡�^2��+��"Ƞ�g+�_#`R�\0�GP�}�4�MӜ��$ 9����j6�f�Zg�E`
��(�ԝ�_~)�.�؅�\��nX���ҝ3�uh���6��D������:8�T�Ye�d�S,�U��j$�h�K�-W��]��Ͷ���58C�{'�ƘP�K����#C�k`6t� �NXjy�1�T�n���������*�R�݀�[���[�
�("��xa�S�+��N&l9�����R�G2[�J/�V����d!�����*�A�����v�i�5�n ah6EۏӶ��=�̘�L�d'9ˉF���,��Ӻ�֍l5e��H�� �u�t�c�L�}n=V۽��l��p^�N���O3�^4cЗ}b�� @	N��|�ȭßS��!g��$��[:���ig�M>J�%y����m��	Ͼ��y�_{5x���o
�)��a�>�^$1��m;��}�>�F�>�*�&�#�X|�㎒"����g����W��˭-P��7�ƈ��D��b�ܝ�V�����gv���(2�d:��!S7z�k�Qnx�焸��H�����ޮ1R�7�Q)�o*����xa��ߨ
��D嬵�����L��ʙ+
|`����5�7q*4�G4[>�S~X���(�Ά�ԣ���4x6e@<�$0���9�jˢ]�4��dv[�ɶ�d���6JV&8+޴Zq�Jh�<�ނ} ��*�u��U�� ��5��KS�^�5i�-L�>_!?)7��x�ޗ�u���-�5��+����ص��ysB%mG�����r�":Z��sU<�������� N��Ѡ�X�[�~��
:�ǃ�ˣ�p$)ׁ�zp���G��B� �r�>�:�Qo )7�rpx��u�;ϟ���I�-�������Q����ߖ���ã��a���ŋ����ݕ������j��h�5�`��#kL��t2�0H��Qhg�7|��2���n�7k*�:���<�	};|�Kݖ�ͣ�I&�B��4��(���D�I��#���Ћ�����B�_PK    mF����f   �      instruction.txte˱	�0F�^p��N�)�R\ �	�(8��#���ؤ}|��:DH2<�pP�G�O���aĉ^-k'e�y���̺��:[�B)T-����҂�f�I��PK    ƥGG**U�
�  ��    jquery.canvasjs.min.js�i{�<�;����Mqq�}���LHBB�$����p���L��w$ٖ��n����H��H�F��,ž��a���N��ۼ̄���B�H�:3Õ���F�0�H���b
���I8�q$i�X(i����f8O��}e���U�[,�ϧ��j��f�W��7�h�k�f�g
_""��EW25L}.����"
�»�?�@Ep�#B�.Dȭ+�\����2,�|��j�I�3Q�c�P�L��y^:��lR��>M|���qg�x�����Tܥ` ƶ#{��u�D1&	R<YX�Ъ�� ,r���2ڇ�#Ԧ��]?GxV�!�VR���X���=�!\�·;A�pA$b!�a���(��9�� ��&*��y�D,$@��t`��E��n��N�C�\E�	��ڏ|X�| *��l,HJ$�׿1��8�aq1�2"���$�.�(A���0	FHɌJ,[t���@-�I�KK�`ɄҴ�Tn+���I�r��9�p}n��ط!4���Qd�c��
?d�3
cA)>c�T��T�r��\��<�3l�C�*�C�O �2P�-� L����"Bt�I4ɇ�:d]0U�2�V2T�xs�r�P0���e����ܑ��%e�r����ǹ*�5C���w8�<����=�~�^�Dn��?t锪/�hu(�\���X$"$��D"���?~$�쑩uL]�"�$���$qrޛZpj2����/M�?DKtO�bQ��J�( Pp��=��? _T��SMpX�+��'�W��He��C(�!�4��G���#2[���X�q&��( �r��~��KE9ea��auF�^x��Aʝ!,[U<Lк)�2�x����j�D3ETW���ߠ9�_�S�� $�P�j\	W�e�L}��d�*"XDC�..��J�,�g�b��f��d���L�e`9N�:.5]V��T�*��P5�Cc��0ӕ"��á�&��!paj����&
-�1�P7J�hВd�& ����Czc�˚4�(S�H��u�C㒮�v���0P�)��Α:�*:�x�p����UV�&+�9�U�K�͔�\�c9�g���~t����d� ��C@��&��	�)�M��1N`�
�$�G�}���h�í��|��Q�CLi�o�ّ���b>,�DXE�"�f^����e3\�%��wLU0�]ФMaƿA�r��3��n���S�K�q�,<% J��1� ��ة2ɞ�&��A��cNk�)9�Dm���D�4�J�@2"��=	0>p��g֞�`��h
h<%`�7^,*cC�\r�Y��#����,+���-@�.U�T@�� ("r!����%��$�i
�c��X�Ѧ08g�~c��}�Nemy� �"2�p���������w� �?"M��sL��o��n��L�@|���qy.�c �(J ��`}X-#�|q驥����iE��K�bjL���e�&�${$C�(u�,%���(%)<I�_x~���wW,�%��P]d_�0�G�`O������, ' ����s!N��$U��YXE��'� �?��
�e�`��4/jY�����LʠEB�����8RͲ �@�v��WZ�J����e0N6{��i��$qGJ���5!6@�%6��o
M�K�`� ٧�K"��g�* J��5X�K�S G�S>޺��NN�a�HɧX��`���C	��|�%0��b�ѰՂ<��b2&+Ħ0q��߃0�;TӮ��nQk�< �ă������0/3e��O 8`
P'"/��FA<��M

���eD&h�r���4)�Z��5A�%�u��0d�g�&���ϟ.&|q�PkP_X,��f�Ⱦg݀�f�I8�Ğ���4���2�<Saz�<�R�ua]��������e�N�U�f#D 6�>�n�G0�gO�g�����a�1B�]����{C/P΁�A֌���B@�t5a��l�o8����t̾
���r�7�����Q~r���G/�:�0h��_�,�(�G��Xm��L�E��*����R�Mmn���1*�5
GB�J#��5")��[�!��?Ħ��*b5�8��#��0 �_'���3��BY�YSЧv����'9-Z�*���� l��[u_|���wY]�h�`t�8O0��]%��0,L�!, j��^ks����c(?�./e�
���k{��G���f�/x��)nK*

�0�,1�)*��w���3�2e� ,;
�ĐFq����B6�eA�L
��(��R�a�A�`�"+�	�K5�-y�7i>-�4�}�	�2^�gTQj�Z}���_-+<�����Qu4o�N�.cAwQG(1������B���q"j�;����`p�~��I��1��U�Ȉsu�K%E�E�{
�jޢj��Ë���Ĥ2.�5hV�	:�2��Mq[|�e>��QDR� <>8@��
���oG����k`�dB@���� A�\KsRS�����{5�
�_,6���t�ȩ��4e��
I��̉rb���`�)�[R��B�`�؍���hLa�cX��0��4��cA���Z1WdQ-A u�E@�9ju)��3�j�0�\P���ov���֐�K;�N]�U�4q7a:�6���2Ӧ
�զ���HTP��i�:#0R�6�nQ��Rw��ÂЊ3�f�`�߈�R�� �U����U��?؀�_k�?삠i�))^��u�A�����g�*q�=��;q��@�-��!G�l!:�y�0L<��G��Yx�aV����L��ǈ{�
���-����;�9#��.:-�8W/��*��p`���(ɻ�J�'�7C+�VEkzl��v��=��P�s�	��d�T���,a�e�]�>i���	�V���Jcu0%3���%2anj���ًou��i�m�h�#�Ox���\�@�m����ɃY��C3��!=K��*��L-���^�o ÁK�N�������x҂
�i��}���XdN��|�I>�8g�q���18��!�rڧ���{)Z��� 8X��y�K��ر��xe&`!�ZT#�
�18t�A.�|���LӁ�B�5��-ow�	3lY��V"���EYtfjv#��S��U8ay�I���*�Q	"r���{�w�a�{����z���t�
sx�,�`U5�
��]406��t��A��?E�x���(KS��FZ�������CKSa(閵x�4;����32B
��!_�8�_Qv��e���w�|;�˅1��+��}�v��}�tk�	��
n:rl
��~�߮�B~�D2�<��{Ā�"E�����o�
<��R���x]��0�f�628te]D��P��:���B�\
�l�]�%U§:0R��V�#L���T�4,���� 
EW�?o�)�
 ����'��{��l�&�V�]��[dq�]XJָVVa��$O�4�`-��$g-�
H�	��D�:ƅE<��@�P����T�5������XD�:G�j��D�)��&�T�aX����h`1������jf��&��.w���Ԗ���
��N��+n�H�y^f����F��	����z|��ۧ�	��D�/�!6���I&N��~4Q���}�g��
�xTWQ ;��C�I�6&�Rܚ$���5I\��T�?Q���衃�V?�����R`T�^C�Z�9��b�0|H���}��h`�o��w�
9�.�k����aO�X"/$�}�/dO_�J�΃'2K'R�uJ�g;�8�}ۺ��b�Z�!e;*+�J8�X͊64�K64�°�����L��'�%�$j�Z�������&�-��ߧ{}YȘ�?�Gh��^�8mP����k�� KYm2���D!�{FV���BZ��� �đ=Kc�d?�#DO�Y2"
�+M|��SF��]q4�q��r�^�ЦQT�~^ʭi�ɺ��]��3V�u+ɋ'�\3�˳AX�u��\[���'�.W��Ŭ�����E��_��F���h?�.�2��?�*5ìx��B�Ƈ-�	��`
DMG�6l��8�nG�$D������X߯.B����������B*ؓ����&��}.�M�j����^�:]�kr�7(�9bF�={f��qd�݅��H�[�2�V;��lJ��@
�p�I�����eW�iۢ�ÒB����䐺���5m@�la9�l���5�]sm�>>���1S�?.?��K�m�V=^��r�}��N���t������`�e���v[}�p�f���^�B�W�ahU޲�p(	��#؉޻��ط)E�>M��La�o�3���5�
�Nl�*���kJ�A*U��w�@�a�"��#�!�-�4�w�,�(7Ȳ�����-�E��b��Uζ!� ��.���b$?#�x��ʦ��Xz��O
�qpD��|h_��7w�/7$�w���P/��[7~������!����@��@�-oK�Lg�
I�\?�C���5����8V����ƣ�E��q��/�� ����}�_��O�a�����f0{*�N��@M@����6Rg�*���v�YKFtԔ�I|��[ؓ��b��&�q��*e�R����+�ht�܈���񥆌i����⬥\zn(�p�&�E�0H}͈NS'�	g��t��:�F�ys@k��l���"������i��կ6��@�|�����D_�i�'�M���Ūۄ����9�S�Tߚʹɳ��P�gO�vb�v
Ed��rn����,�]#(Ի�(Y�A��ග�{M�ӱ.6�!�c��Kg�ʌj1�����=1�s23t��0oR��^^ÚC&�|��˄�:tB�d<�|)l4b�@�4�β�$�B�iT�<���r��,��r�^�^W��Z�֡�_[�l�=�n��::��,6�
ȝ�Z��7�v���F�oz<
?�l�s2+�j����V��y��rLa�0�cAo+���Y�Ic�/m@�fT�ݜ6"\�k��.����K��
�癠����>�\�#Tv�P])g$����(��� '��aR��X�~�K��qq�����֡�9�P�G�l��@m�u����ņ�m�_���p��;�Z���C��~��s�,
���M�=���e4:�
�q�?p��&�pޣ��S]J�ªsk*��Ҝuw�Z���>�T`��%�V�e
�s���[*�[n��kzaK*�qNY!EN�d��X����I�~<���T�� '�<����7�91�`���*�>�T g+B���K
�'��ޟB2�Q�j�Xu� ܓ��>$0��1t
��j)�v�Y4�ě�ao�-��P�]LZd�Hf8�JG��xz�oԘ���~`�����ƥ�3)��ogRr�B;�D���)�`�3�A�མݼ��iޠsuv됏�֦�ܤ��	��,{D�C߶��>�9>J�����0Ru�xh
]kN/�)T90�}�ʥ:$�;��V�G�݄��"rE!�Kz�,��Y�a��f�Hpv�O
�Q��xw��C
h��&����
o���t���� Ѝi;��14�Q4X�ˤ�
��f��6���4!(��P��H�*��ke���IZ�`�VB��N��#�D��ܒ�G�	�'q`i��U�`�R�㞹�<*��(� Z���P����!B�j��x1�Ƿ�[���l�8���\:����D ǵ{�`C���l���+u����0�����I��r���ł5�I]5<�3�F�� �Ѹ��V�+P�D��f�L��P���;�j���O���Ӯ6�s
��q�7�3p�6Q�6vLC��Յ�F�Av��4��N�#�4��	:�Q�� ������ o�D�`]I�즩��6����(
y��2F�Z��SUaA��N��dY���Uƚתw�D����4u<K�s�-k�b��|��
>R�_���T4�U�k/8��;���#�ɝ@GCcJ,.�O8�������V�R02)�he:��Jt��2&�TFRu	�w��ʴ X�i<X�dw9>��k���5��f����M�H	|�����V�3��{	ւ��[tti X�e�5ݧ��l���ŀ�x=Y�|p._A�
�c�PfG�	�Fԏ`r�Ձj���+�c�*��BpmJ�-��W��pA���44�v����!á�p�[�$��0�& Ii]�R ������S������+򔄺ù�u]E?�
���T�fX�"�"�(!*(?ʊ�y��� �\���+��0��a��c�u�|>U���:\���
R6�k�ڠ�+mA UE`嚴8T*�a��
@�qD�D�܄>>�e<,.
o������q�T
�QI���d��\=ϧ���t�d5Q�Cz��M%�d��J��#��$ҵ��z>Q� ^<�.Az=w�M�<���%�<���Q��r��ɇ�H���R	ʵ�K�J%c���Je2����M6d�"�ɧ3�O�j�d���j��W��P\:��W�l<�?N ^*�-��7�O�a��r�L~3�R�x���xҡ������\��]�#�������-r<4.
a�8�$<$&�<� �:��)N�+߅�9�LuU>��gM�*����G��2����8T���7V4�����o�)Y��d����,�c/�~G��6Y&&aV>��C���b�nb��/��x����l��|8�)��r�v���
(O
���n;�W"a2�Q>xW�adI�t�6�>�ی�� ~��=�ܦ��"��#��!w��'���{�;�����P�����d�&cV���<��g��˒��P�b
��D�}]ES��t"6���n��/��-�@�l �2������>?ZC���6�sa���6� k��!��Ǧn�N�~�ꊈ�E3��>S��Z4Wh<��gJO���
��Lv���_m�oS�oM?�������?�%3;E�'��_�tV��ף���i�-ŴK?���VM���_�K/�?@���7�W���\�L��D:}��e�r�'3��Z�CWI;�l<�DX�:�|6
t{5%���ۯi�Z�#�g�j�R���G����Pp]�&���{V���������qͻ��'�+Ūo	.���$?=�3������������'��n�X��\�o�y�+���y���ׯ�߾�p�4.
���@��
��g�� n�#'��V�R+=?u����; Z�c��;��?�|������vM0`�O�K&|�
v��#P~G
 �-��
�f���i*D��}��VXT�a��/�[��=a�"B���|�鯇ѿȥ���������Ûy�����G,���Mp�:u$N� ԓ�G������!T��`����yŗ�قv�3 ��յe����W��B�{�+Y� Wd��t�{�\^�F�q�@���8�y=a�x��P�T���O�(SE��#p�̎�qtA��Q�" �bx+���\XOВ��E�4������
�4^px3�r�/�8�T���s����$�X���	
I�v>���<F1d�(�"b�
�EN&O�3S��pMذ��4�)�+IZ8D��)�� ��e��nv�Z={�dY��_lã���GM�\�A�⮸��2t��?'�p�j�N�2�i��3�φ��3P̉~�!�#�4�҆.�%`���w�V��3j6�~ߕ;���e�'�nf�f"��|�0g��H��䉝��%� ��$R�(�i�_8�0��෫:d���p^�������Y�uFV݄j���d�3�
z��``ب�2x��"6��;�vd����JY����t
�s(G4�K�
������?(�{ǀ��ҏ��o�A��}��}� �q�%^ ��.��O`�$}�~�u�c��vm���D"�V���u�;�K�$q3(��[��)G���������O�|v���R{~�>���O�s�����/�d<?�
�M�����p� ~m������$�+���#-�y�����
�K ��3N`��x��߹6�!e��7�XK�i#�>���PɃ��'��g�#G�g�2��O'1 ՈRl/u��|q(+v>���0���M�i'��v��b��Byp�d�B�Y|Ё=��؍�'�p�	`|���.�X�H�ܰ�`�
M9O��8���- 8;��A ��:o��/;&�/��mv�`��(tPA~hW]T�Yt�jM��� ���~��>�%���+� �P�,�f��k��A���6y9fz89�,N���~��h>�5|t���!�$�N5$~A� /G�P"b��g��!�t�响���kQ���ҁĸs��	����i�n��3Bؕ���~��_��/1���WnD�Ē���j���'U�h�N�lA��E
��|u�
�d������X<�J�����+�?@��P�h���C/�~<
�S`��c�����`�����=��b��(�>vC�ǶGqܹA:���z��l���={"8�|�%("�7�hoes��H"��������t������D) ����)]���w�T��+�}�H�����w4��ID��l�{l*!���"��l������u'�E��T���4��p|D��#�qVz.K����5���
�� 3~�_	'��p���偏@��e����ͦ�B{��|�^�/NZ	�\un����*%�G��z8���*�-�]U:w7�Ji�藆#�����x��� ��帙��p�U�}7��&�'�<�&������7��'��ー�&�Q��^�ռ�-!�E�s�.���s]���z�^o�W���Q?mtn;����ic�
c7j��|y�j^6�k��8PKZ}��''�q/+f�dc�.�W��ŰS�h�����޼�xQ�kmVR�n/W_���c4��Ǳ�Y�E�\.3������J������]��ӌv\�ˏW���M�r����8�TO�/����<_W�V�|7��b�q���]��*�^)w����	1U�핮KQ=[���i{S�޼tK��y\��+è�Y�����K��E�Z�̥�9�Uz�h4{6��.���j7��u�~6u6�zf�l�b�L_T楲9�����㻛KIm�ҵ�X�T����U%�|�L��Ȏvf��j��pR����l�"�=k>�'���*?Y��N*ێ'�b���[,өǇe��-�A[K����ϵI�����J��:F�19?�&㩤7әi�%7�Q�~f,�/��L����y'9�ڜ7;��+eU���F�{�pY_o����xv�Z�:��k��?\=�S�R=Y�%.�u�_��/g����H6�gjv��<Lf�U;�Ћ���073J�a4U�WG���qTȏG/Z|ty{q�{�2�u>ۚ<&��ͺ���=����Ͳ/��ʺ��k��J+#
�E��;��R}S2��ܿF�Xz�˦�Zb^O�U�~�;�vYU&�i��ɥT��0��xe�����r�h_�csC��j��Jw�ɥ�2C��2�Ht���H4���:?������Y�m�e6�X�o��Q�B���
xϢ���r#�nF�7@����d��UI�z���3�њ���r�K/$<�;�w��L��h��Y��9-2 Z��Q�z�ߧE�����ţ���i�.�J���Y���P;�k�2jTcK��k�Q���ʰ�V�7ՋqGm�z��Q�;]�^�ne�m{QK��FØ_�}uc<�3'G�/��e��9ۤ���)}\uǧ���Q����Ϗ�g�A�v=���ҩtq~��F�^�%�43:��ި��쨙���*��$sw;�-��|yT;U��r���d�T���˚~�Q+��4��b*9�Ňu�us��6���\��ɏ�c��(u��q��H<�z��b>Je�%r.�\�tq�T˳�>�(�Iip�^6+��T7���t%�����ݳ�aT�.Ƶ���-e�Ae>L�_�ɼ�0r��]�Z��w��t+=o�^n���Eg���nc9����Q_�բ����ME�_W�vjp=K]
���IV����:��n�W�Zj^:�]\�*���YiٽL����ӛ��$�Jq�+���Q26(_����p�'F19}�/����\)+�L~.u���0-�'S�V"~��EM=�<���t}�[���4m���ה�ȗzi%ѻ�u֩AL2^�wӺ1|lͯg�̋3x��q5?}����싒h��hW���yuv�ɫܴ-����Y����f���y�4g��E��E���&Ӭ�%��u.z�﷖�}U�LR�J7->�_����THĤ����]ly{^KJ�U5_�I?d:���&�i\.+ՙ�r�*��g%9Z3�g�w��L�����zs���u���\���X�b��:����ﰿ�.!��(4��~����3���r��֛��&��͞�֚���۬�f�ө�_*���tVj�F�Z���l���aЩt�Z�X�]\�q�}qU뾴�a�����$f���2��qn�����hfs��^�2�T��ab'f9=��6$A;]����"6ۯ��rw�8M�қ�C{���֫�B����Y?�6�u]xX7۹��TLgɤj!�W�4uz�_w��j��$.n�V�R]��b,�.-�����L'zw�&s���.�ǴЬ͖�f檗����3�&�K���el�[�e�g*��t�w�*_H���z�������e����H�������O�^��X\����v�I֫���C��T��K��T;�_ac��R��՚�AIڈRw1?�6�yc�+F�X�:��ص�ꝕ�g��ڸxH�ǯ�Q*}1�HwSQ��*��tsДVb"�_>.�MFht�u��kK�*��[795*��ҹ^���b��:X������Kc��5�;��$��\���n������Ь&�+���v�*��ki��^��D%^��Ƈѩq��o*I!-��N������toF[Zvv7�.:��������My���rO�h唐쏛9c\�������zU���I^�����׻���Rl����h�&�M���j2�۫�`�7��a��%uY��B�z%U�7/g���F������룪%[R=�*���z�j�.�f�x�R���V����?���Rvu,M׭|���uj�^�2_^��9].��n���K�����٩��V�/ճ���z�R�䋗���H���\�F��r�鎥���t�Ȁ�>���e���1�N����8Z��v�_�/������Og"|,S5z`�eWa"l)��ȋ�N�nZSc/��k�m&s��L^�,�#7k�����C�V�2Ʊ1_E3�Dk��MZ�������~��H���{���Ւy|.���Y!����絋nj]����U{��Tҳu{�i'�[U":A���Ĳ[%�D�������ҽ\��ɵ���}=.����L��-5�Ңٽ��ݖ���j��n��
UIv�7Z�Q�Vog��l67������^�zt=n͖\�/N;�]rW�h�R�,S�-߾��Rkv�`^
N��U�Z1qk�zwԙ�L*��X��y�r��Ε��)�Bѳ����DNF����ڏ�µ"�-���>DQ	��U�\�O�Ň�eK��Y�w���\w��p0g0�wр��:�����{L�:Z�3�J,�'!�e�8詻�%��H��b4x`EE�_+�X�����ff��5�(����*
�{�[/�!��L���6<���WDhs{[^\{��Q��^�.��"{���Ʋ%ð-�3
��qjmAr�A6�<�	\��[d�i����9x6�aF���lyK��C��{X;��ʛD��(�mr�S\��Dp"z+���v�����rYz�xh
���] ��̑�~d���v�ʰ�l�꺭ޥ��)�}�i�;m:އ�mk
��f?�F��� �|�m(� �I�޺B��ND��0v�|7�+i� �	=N�������Ud�����Ņ����<F�s#F�qz�vK���iDWoMr��2H/����Z��=�~>0�gA0�N�
�NvG���~V���E�x�$�t������R
���o���l#��(�E�e��5v]d��@e��&��& ��ֆ�'�]�L�?'ǀk.��O�9��	���z���E�׃�h{=G*x��0Խ���eNX������^��L���f'��c��Y�q�,ueb�8�����SGC��v�=�yws��g }�2:o2BR�i.�\�?c���Z@#��j� 
lWҮ;+�Oep]�������{�Zzow�]Y�{�O�r��ڏ����Z��5�^��ʆ���"��ٿ
ʌA~
�:?�S�����C�&v8�wl�ϔ:��";�6x���h��3��ߑu�Sl� 0&А���P��	�hm'�~薺����{��2�P~_��X5�bWwO�@@�s�N��~4�p���K������a���p�)�|b�@ht.��ݳ~��Y�>��}����J�Br=�UQ�f�p�s�>B���E���d_{���<7#��$��!8�>�t����y�^�z����D��\b1�!��j���
�3�$.q���s�����0�J�h��pcxȺB(<#Ͻ]O2����6�x		�8 �'���"����m:L9����3�wK���$�y���%��	��0�"�H���>��p ���vh݂F�Z��9`; ���@����?E��/�dt�;߫���(� ���<�A�9�
�]X�����f�p �bSt�pX7��/�"�V���"�ط�x[�2�j�v�^��"s��4LD��"O�lSxk!b�z�e6 %���}Ch��9ߺ��<3��
�?�i�3�����o�Y��{݃V5����®�cV���,?玠�Ly�Z�LW[_ʘG�l"���x��癡i�
���&��7�p.4,���z��w�T�⁠��Y�m��>>'����<f2��G'���kU�J�@�U,���N���Z����Ô[�O֪F���Z�A���aM��u���ďlϰ�u<�����n�}��>�^G�WY��@��3J��E��eo��=r"��:+� y��ߖ5�q���I+�(_�Ĥ8I����
���b�H��J��,:V��r��x�	vH�5N"}!�J��S�����i��s����_�N��7�#T�O��#�0�(���֭(�t^I��Pص!�H�#�n]/�V�ŕ�m;x����C�"���$kC�|Y�q�;c��U���4�w��w�ǲ[�q�)�"����mu�"oӬa:tl��>��4���#Q_K>��ϟ�u=�I. ��E��B�W�����0a�pad�����7����9!��9�Z� 1|1���Z�{���]�{�ǅ��l�( %@�LV��u����/<��Dh>��Ă��3V�Y�w~5���Y���C��s���̋��_b��o�Ä��ў��X�>�hJ\=$��^-3Q�����n�� ��I�N����'����ۓ�'��9�@�'dB��w������Y�ÀN�]�� z�0��Ֆ�A��O�Ç��$�0E	Ahg{!֌���׆c�NvuK����=���U�[��\8W�")���,F6ћ��1�3�S=%����������k���"x�DP��	��d�B���]����|�n�*��9R �_�J�7'9�h]�J�dV������}��x��_{�<��\��/���椚�9y�\�b�n��^]�.�0��tQ�
�ޓ��,`���V�?\鐯�H��0�\�ܢ�tԖ�~QΰN-�S��eѧ8䒢����lA�FÔ��o��!mωy�GcmQ��S֌��>�a�x?壸mr��)�<�N��	�-�轰���D�Y��|�i%���QOaK%��I��szc0I� 🸂�R
�$��F�A�#�&	
��}�xٲ�ѭ7Se쾩�s`�2v���z��e6������0}��T�������=����i�f��б!�����u4Yl�9a�=4�߅d� ���ώp�(�s��6�A��N���6\Ɂ#�������nʃ
J.��E�-���5��U�I
iaS��1�ӥ�+�~�HvVw����
>�����S��Řϗ��c;[\�b���KOVĿӸ������ZWv�Zތ'.���wy�_,pGyU�/�-Y~I`��w�uzM�O�H�,ձ��O�Z/_�t��s���{��ˮoP߸u\U�w�=�����M+Ds^y�$`Z��T��}lg�1,�"����\�G�w�NDK�)[pE�#1۞N�n<5�����B�)���x��
����r޼�ꅓ��L����
���\�hK�6����l.�x��������O��j-����^�*Iħa�܍�iھ��Xl��,R��Tпb��Ѧ�%v]����ѥX9�(\�$��$���]�����8 ��K�Y7�$MG�O9\�X4��\��@>aѷ6߬%�uw�+�)��S���PT�=�#Y�
�	�ǵ�ۛ�~PA�6�rTzƢu��Dh�aD�.b�-�Nn	r�
xW*|c����v@���\���-��|���M㼈�AX/$�>���q�o�w����+����S��>��ްɪi"Y� ��]h��A8�s�I������������Y����F���k�O�<wf���l�/�ϋ"H�l{�AQ�Y~^���3��2^�99�}�0����I�$#T<�P4RKŴ��f?�k��St)
΂��u��weiS�e���t����6E��GY��yݳ�+���L��v�r�֕.�B�	v�i�U}���NB��~lň�Q[حoꔳ
r��Ai���2�g�s��w��R��I�܌n��u�$�x6�sw�m)���6�����̪�̙L	�?<k����|k�n�M ����N�F�=!�y̀��*�z���߬�P[乺��B�R&T`��x��=�Ww�q
�J'��a0v�����(Cq���.�?�;{W�ܨ���Y��h��JRI�X%����.���H���������9�v-��9����v�?�Sl=rG�������eS�ɢ0a��h@&lc�ב����	�#�������������eQ3�-�>*����"�q~���3�lj��g�5,y�(���������'j���kPM��@�/�hk�v����i�mW�!���#="��
i����?�p��fQ�セ@����K�� ��
�o��Dw)XD�����X��M�uf�o
�䶴����M�g׫�<���bw�5e�z|��~�g�i��mJ�;
A|�{���#ʢ�� x�~?_����V��>G(I�P"V�&�$bB2���w���ns�Bu���w�0����q/�lIIA����2�
���*N|Ԗ�d)�Ju��f�Ͱ�˓u�A�C��H��W0qy��"�W�^��܊�NY�J�P�U���J��㈝��!�
�@g���٬_yՊ��/�Se8�}'�aQiR��Bܐ
�|)�L�i�g�'��Y�mP�m�#^_�F���<��e�?\P.�&Ш�b<D�URL��.0ܩN����^��i@M��<�� �IRr��_op�k���^j�����@Q}pmC ��Z:�+ĳ:ZY%P��*|��t\��A�l��ƒ
�K�XW9��o�F����Jº̫��{���; ;7|J�Q���B
�ME�}V�<9�� ��z8�J�
������7B�_�jʫ�m�d.t�sr�����Y|�����C�"��Pd��;Q��b�4��X>'wH�Xluܢ�֣-�dF?��*6��ܮ�<9�	T����t/<-
5Z"�<��$��)�f�N�6����g��)���B���Kp��?�}��tsr���Ja�AL��l�q'�u���I�✗�9�WD�fkM%��i���0����� ��D;��E4�3�A��r�x��f����i�jJS�t1-R�_b��FVn0��68�:/V�e���O~pE���U����p��œ^��s�AM�F�u_�
_���g Nϙm�9��cc�@g5pG��$.R��������U����0�����)�Mi�(>])�0�y��j�x����4aD��wN#�(�C`a2�O�K�Ɲ����{��_O�M8�=��{4�Q'�?t��q�E�	�;8�8a�0��:'���АYἆ�:S�+��	�����	�C�¹Heʅ�fV8�e�0���|^�
�FVXS	�b.�ƪ�KN(�P9��JXwNHy\�Vy<N.��q9d�U�3��K<.��qz�[x3&WE�ϑi���s�ɭ��e��a�3�� ����@_S+�L�L9�����䔔����y�TC�>*���{h�+?k����^#��?��ڡS�Aq����w�?�z�Jd1��	5h�N@�{nȸ˳���.J䎻�O�n���=+����m����\ݘU�iն\���������9����т2�%�Hv����ҏ��QF�.o'5 �;C��s�<d��}0�q���T>��]jI-Ȁ��d�I
��AFM%􊹰/�� CN��=�	��=A�Q�\ʐ*Q�����5c�k	e�kP�^���QCį�i�צ�kd,�=�d��&e #j�� ���Zq�Q�8Ȑ��2�Od@S혞����d�_1�]=����:9�����X�g�
z����jFU,|p&�92c�b���aS���o��]���=(g~c&e�/Q�74����1ܸ;By7�\��0��~_n|(�?��E���"�Y#��Y����1'�0��^S�5�1��Q�m��#;�)r��(E.2�����B�v��T�nP����	 �v�3�@��*��N�.���tX������_5�	�냙�3����m<����#vq����8`����)A�OQ
�:�<�<V��-�Us4�?��/���j�I�3�%LZ�`-B�K��M{�&�S�(�`�[�]�k4u��#�nʯ"6�\z�6?��D�6�&amn/aҒ�2c�^��+�f�l�ˍ�Ӓ�&���t�Ip��g�����PQ�D��_){^�5��ã�4Z.[o,���x��j��I��U���Dp6<<ݜa'���#��b�¦��0�ލ��*������ܬ�?R�3N�<�
����wʲ�mM�dkM^�,�Kuv��㽺)��������Ĳ4|��Zd���Ϊ��*I����n]J"���1����,��yU��N6$�g}}�Y�j]���0e�P�Z� �-���rq8�]�U�X&c�����|���ڏ��ĭ��L��
��=��|��7��sx�gC����u��� �J3mx\�~�
�<3�jbೢ9bF��X�V�/!P��s=/,=-��(6H�\/6?PR'��-��͢Wک}n�zFqt�f���#�xvv�srX�W���z�e�	Š�7��QY�ASg#A={��R&̐��%���u��ߏ�{�jN�����bo
���{@u\$�܊ϰ�3@<��sN�<4u/;��o��ɉz��b�$�`��Xl��	��2^��S��o�4����8`�=�⊒2C����rF�}f�TO�����K��+yv��
	u���*�r_����fW���^X99�
6����	)��zP55�K
��V�ߖ�|\��S��
���8���j����6?�^���8�h�R��U�)��?h\�����z=w���,NW�"H�{eg��%Aex=�ƞ���R��]�yI�ڮf��
�
7kZ�UZ������e�9�z�M�#_���d��p��ҒS�AÉ_���A����x�o�n�b{����w� �xg� B�w7����v�7��KT���@����-�װ�z�Y�����}�kltJfZvE�����΁�YU���>m�l��}��gx����o��	�MR���pq*Y`���+BJ"�q���]�b#6�ox<��>n1t{F1tRXkS8�)���~!a1"�CԻ
��@�F��A��Qj�4v�:;͟q�T{β�j20�6L|(���)��W<c%��=�7S*,����ߕ.�'����g<��ia�3�a0gX���4ˑ��~��.r���a�Z/��Ɗ�뒮!�b	�Y�x�A0Ÿ��Ă�=m-�ǅ�m��e��x�K 1�T0o�z�1������du���Ax����yZlD�ҽQ#��!�,����_
���,F<g%��f�8|q
T���j���lW/-!� W�ן�ơ9yˉ;���ŠN�=Q=�?��/R���k=`��0HO\�
,��ͤ@k�Y͔�
�E>l��xېh/'pg�i���t�
�����șA	S5��[1�b[A�}�|�e?\_�p�.�!���+v
�8ܒ�Ǜ���N���������){�ܑn�xD�[����1�vG��~�
N�
յ�~^'�Be�����"I �C�]Qr�t&�ȭ+B�[�jW����_;�Si��{!�v���:�o���Bx�����è8*��-@3����4����x�|sf�c�\�}[
"�3{6V�E?��ٌ�Gz�#��%��G����X�?
O#|�n�e�3r��xj�3k���j÷���NZ�6��6��g���K&�"���;�;<}�4$���ޫ������^CR�o�B��ʂ0�A�2G���L�>y��Z�C��fbI�,��	,��P���ߐn�2A���F��JR�Ū
h�B��+k�"=ů�N�>��rf�1nBc��N��[�ǒ�����\m��k��mV��E��$>$	(
�.��(T
92(x��W�G��
ͤ:�U�N�,�|��i:Ȭ�7_���@���iZ��M/�nZ֜�B\�=A3�3;#�3�ShH��30��M!�>@Pl�����s�+ϝ�O�����S�4���E�;��\e��-L�;�"�N]>�
�A�gkj�أB2��Je�D�>���.N'Ϳ�Ƹ<�w�߿�^Wd�!��-v4n�kO�@V��oB���&pܚŮ�B�L��
���۪�]��~��-�����?��p�F�1�ҁ��t�ms���J�L��"�0|������B���)����]����)dUA���d<��x���R8�[lzj��z��+"w��5�7@�]�P��^9ih���R7�F��\Ϊ�  �|\��@��@[��vKکu��uD�5�Q���ߋąvP��2U+�d�#���; �8��[@���ji��-6g�L�*��_\��F-s��	�H��yx<dA�p�����y����,N�g��z4n˔�(`�oc&�"�?�y�֪@�tY������#�b[����畷hK�t���/=�1k_���չ!@Fs��GG�a���-zk�!�[Y�����ѤoX}&Y@���bZ�%�H�j���B��V�2Ã�9db�rm�Ui�ث�d�����?`���<����gx/��Z�;j8�o�]���b�@i��T���:f��>S�d!t��M���i�}{3�ٷ�,��@�8w�` ���T���R��.*9�����&m[�'��*�Ԟ��k���聿��2���Y��-�OBJ�����:?z�q�s�����c��c�7	�^|����ۂX����!av&I�.�W�{��'�<s�A����1<���N��Ϭ3���I� �vF?{	�����f@BIO���oV�kZu�85��H��PzVSe��0ܐ"*`j����9��]dH	.��FO�=ߴ����(%���Ll>@��p��9�Л��S&���f\U�����F��ݞw����y���hJ��X4i�)9�����I��E��7#�x@ �������"��A���C�����̪�A�y@����+f��Vf������"�r�˸ʄ2B�4��.�R�w���*#�����#��rL�X���Yclas����4���$��-E4g�ިz��}Z8����,��+``@��:�Y�e����1��%��>�̨%"$�[*ĺ�����Y���}˲˸i��b��("Ms�y]̘�1�sx�&-�A�
����u�!3�ڳ~#"�Ї��S_�U&�Y�Ц�����u��5���g 4�ږ4��HZb����\$,PA�����lY$.���}>-�Z���U�:�rz���ڏS����l7n�n椥R7
�8��(� �׶&�ͤ���i��٤�!��uH���}{���K��p��"HsG&�]�ZU��  ��j��^��6*Fl���LOs�6���H߁H�8�!�3�RǠd����1��Un�B��VmȽ�h�ع��<-<w����H7�ϕ�2�������{�/�S�ҫ��	%/Ԅ�R`�Y���%u�	oP<�w�
�{�)=�4˞=8�}s������z�]�����S�×�A��B�w����J)�)M�
��d�ʃ�k\7r���v4/~B�̍�;��+앲 ������ײi��9��PM~y��;g��o��9�,[��{�ƹz�Heg�.s˯��<B���kx9]�'l����5����_7�A[�r/�ꃸs~>t��j��*E�.u`1(rt�3�I7����i��i~�K��uVB�T�j	���g��G������)�B�"x���k&(Iӗ�}!��-�h��fK��󥀡�&��=�e����m�����'8G$	���ȗ4�8�
�eR�$p}�)N��jo	dbi9P�"�n����ͱ5�?ST���O|�B� ���z�����j@b%����u����ƣU}VT�SW䲖T:Z��I>S(����
/[�@*}�H6��g������3���H����3�d�
@n������J4��d|1�_l��^`gx+b(�B=���u��C��0�%�1P�$�L�# 
�h��% �|_@�3@�?i@�d3A
88�0� 8��XcZ�����@Er��C�� 5�"��%��kPc�C
�o��|���S����"Q�F��ʔ�Bk�b~z��fR@5��߇H��ϖ%�����z��4xә��7-�ޟW0!oVE�i��fg[�0*CFețeț�aJ��q�L6}���+��z}�̀g��AsF������ ���1h��C0�����'f�1� ���#ޞ���Y	��� B$�����������Cr	0�
`�e�hĵ�q��;�|�S\H��L	���]�q`�� #�R��\8mJ����	t��(g�:��`�B��&.�
L4Wm�u4�ғ���GB�����-E�Pp�{i�
�-y1�t�רi���à�hi��CK�P��K��F�� vZ�������v�А��II!�t�t�Ђ�����p�|���Eɂ�١�;��T�p.ܰ:�W��[��ѲW.�r	��7��waO�ͷ_��Ђ�1%a9��)^���J~�	�@f�&�~Hὺ�A�1`E+��.\D+�x&zm4�a"U ��
��� &R��mE�9�%�����)~!��'Lz;U)ۧՁ��}믈�_��E-����<,J�P���·�W^p�w�̠?ōOʭ�!=^���������vFz���3Go�M^�N߲z�**ްQ�@~�]0�����@�-��{wA�T�/�h$�z�}�}2ݣ0��}l��|z����t���A֡`ZkӾ�,hj5�������ZeV�I��{�KP���2�aybP�r�7�� ��C9�+����y�������M��,�
�r���h
�%��np�z��%U���ڝ~-�h(�&6���p7�ǉVf��"����m���:��
��ѹLe<~[u-_�Yi�̾�DqꄸM�]=��%�k ��bA�fp>-��fx%�:�6L��`���Y���*f���Ca���WY��AL��w�q�`yrR��Ҳ��ݬ�it!�x?	2:i���-A��٠y἞�6�k�����.����Br4g��2�݅m��Y�'5n
�Ԓ���P�d��LPp��	o���|bN)�_����?�I����C� �.
;eE_/<�~<���p����f!J�~W�y�J�!J�3��#�޿ī����}ӧ��6b�5X�bh98����Io<Z�S��˩�5�(��g$95�r�o.3�/[�Ϗ���"*ٕ�y�ܬ�8��HnU�ȷX!��x�з� �=O��R�%Z�PQd�SɎ���}/	wK��~}���z\����}v���PT)"w����hO���0�86R��@(��@(z���9̑[?nY��e��Ü�9Y��sJu&+i�0N*c���F�շ�~g4y畞`�a%���W�G�QNx�10��@@��ʦ(芀� @�~ (>U��u@N��e�Q��1�@����3�s�f�[v)�qC 
c�cC�ƹu���!�o�bv���0��Ban�ߐ�]�ߙ�֡ӥI��N���6�����r� '�Y�Hb''�I�*HJe��I{a�L�Hb�Y}��}����;F���H�\Io<Z�HF�x��s�,c%����R���H�8�c���x���r	#���*;�c$�0�QA���Hg�a7��b�C��I���OP�d��������W��}�AO 
��FL����^��ި���Սl<C�� ��?�:�:����rQ��	F��Pԥ������p��oߟ3�A�x{��9�+����ѽtLf��^��]�]��S޽��µ=�Z��;��5;�y��]�F۽��v�y�ŋn��$���w��9�f�ߛ˫����e�����6�)m�M�Uǝ9>�3�;�v���UL-'3��B��X(t��Nަ�K��xi�bxi��%�p��P;����_�ob�����oV9�tt�?�y�'ignop�Qe<me���	袎�3��V��DN�w�V)�VZ%CQ+
�Z	��x�U+�2=�>zR�[d�9�������h�� �m���#t��MyT��[[er0�B�7��`�X����1��?�����?����G�C����(���;���BQ�7��-8�E�{H�g���Xw�Rj.ۑm���uI�T6���<N��[wb/c�/p�Ƣ�[7��+[N+r+�mN7�]�5�Kw����&>}��13.�G�#����(H5cT�bVd�����6.L�ق��z�_ �z���ߴPc"D��f�ò�x�7#d�1ť� �d���m;s�@BU�̸
U�%�ZԢ��9�sT�>���
��|�
�h���'zYN ^����vz���R?V�r��P��Rh��l�?�1/ݹ�����5��z�����,�Ȅi���l�G�mq�D�A�:iUu'e�6w��S�«h!��|�5��X���o�)L��*��# ܼ#�-������Y�W�:���j4���R��B���3f`�3���` ]7}m�6X��a��w.��tZ��@�tE�-���ig������Xe��ԙ��\9�5��"���2Js:��L�)����dN�ɜ�]��X��Υ7�y�z<l��2x�2��ꜣU�|�BrŘ�%5�c9�-��/Z�@�N�:M�ۑ%S�]y�me�p�`��Z�SfV��lk�@}JNؙ�b�-F�B�;bv��-}�!�2��2�[ <HI�ъ��Gb��]�`�|7���v&HD�.޲��c̬�UӶ����w	�;-�� Z�36�͟$���&��w�Tl����@�� {H���tEօ"��{�ʹ������	_g;�5������l:�/��3���p 0�L�י
�3���:}�Θ�H�΄����L� �ӎ ��"��0��{�l��U�m��nؖ����6Cx�"�]�-��oE����0��f5�7kŽ\:���% �s-`��l�fl(�,��j���R���"��H�w�A��:K��Œ�
}��Cߜa9
 g
 �u��3 ӿ�@�?���1u����U���t�����e@���[5J�*��T���fO
덂�n�����XݥW�cڹ�Ӥ]S��;��߯[�.v����U�{y@��e�r��)`/�+�ѻ�]z�é]�ߩv5��w%��5Guh��̓��Ɲ����K;I��I�s�%t��ջҲ=HYG�,m�f8�r0�#�����n�'��A�$ݙ��k�܄�����C�RV�����5\�-̵zN@K,^�<�m�$p�rŉ|^e>��^*|ڍ��H��7���H`�(������zطC�d���M��N4�FA�a�>�9<�Ƌ���]��xj���,�
�u�R�b;�$.e$��P$a�č��LQ�H��׌z��Hm�s��	��c)ف���ψn�\��/��9���E��txS}�p0��
���m.0� 6-�w���db58�bo�r'�[��Ψr�(��R1o* ʋ�1��se*���c��d,%"h�5���+7@�n�=�T
|�J�SSIg�����il���`�Z#-�#mV7�uM�u16hXm�O'셒W*J��("�"���CS+NNSoT@�Q��RA�	�V�����N1����p�����V�V'�NDX-����A����FB�K�mS��
 �脲)dT��FD�K��i�((�:G��8�~��Z�D[��n�:Os�>a�}:����&��u'iX�x7���d�W���U�ū�x���*��z��S8L��a�N-�e�ܙ�4�?{Z�ɛ,�L��?d?�����V���{+K?�����^��.����[j�&����c:�lP����N���C��>��,s�e��Y� U�.V�
������E�&���&�iv�N��4�Ot�Ȣ��1��
��7(:M�L��AD'���
�Ns��ZR�B�4o�D����eλ�vFX��p.���"rmv�\
��E�M��e���V�k�
�.e���R��~ ��C!s-��v�kr,���ܲ�rm=�H%sM�e�-��"��"ז�\ۮ"W��\�"�1i��nT��F��&��5i��������F�Z�4��F��&��M��5y��
M�R׍(uMڥ��z���r5�z��*і*�[���\���5�%v��ص<��u��/����m݈��O�h�R҄Iy�A	�$/�}M�i;o2��+��%K���w ���a�M;m��"�c����}���<=S����Z�+���H��e��]��ݪ{꽊Q���B<�(�;ӯMa�m~r'��n��2J;��، �qP��[��)3���z�OU��� �u�/_���Yٟ@Z���'��DW�Kz\b����)�pMG�_�?��$��6�����#�qs=Q�̡������}���qAh%���=2���1B�e��o��As
�m'��s�a�h7�q�o�$��i��S�V\�a�i���tt�R��dw�,�$�F��w���{�.��½��W�rs�C�paEi)�P�FpE�jv����v����Xv������t�e�����n�r��=(�]n��hc�-��-��zo���6o���^#)t[�H��FĐ,~��F�fsc�F\e��zR���A_h��q� k�j3���{���x 6��$�ey��H�3�� ڟb��s
�v#��h���#4Pou��e��v����i/i.�ԋ�*�p��C�F��G��%���@��$��������%JK�O�%��m,Q��%��e�g���#����
�ŵ#7��k��PMџy�_�]�3���z��>�������wYG�<��o����:��2\p�Q8��8�IH�`�����6
��9��-u����g�
7���ƚf���F��0�3�����B��"ɡ0�ǡ�?Z��a}r���џ��f�r�����0�VP��#�79g�����T���X��
����q�J|0=���ʮ<.��Gq�>pq��+Gk�q�[�_M���q����Z�9]���"�O/^"uƺr���V�� ��vD�"G]��?>
.9���yB`Ҍ�i��)���tbS�sM'6�	Χ�&���53�~�j��n�$t-<����zG���:�n�n��&�����`���f4P%�z�i�|C���m�}��ĜܿFp�:X��o�׷��|�_a�d�� I�-@�'��5C�|�{��ۑp�7u�s�YC�⼎}7�7cG�ⴏHٜ:]x��ie,�|�@�Z.�W�f�OhCYS8O�BL��$����*73=�P�_����#��߸���ټ���n�u7���nb3��yA�z��b��K�\u�s˕�NR�-Ɏ˴�2ݓ���9w�Ց2߀��R��˴�/�`9 ư:�Cc�iW�K/|%�+i�
���{�C��G0oa��GХ���0t߰�!h�4��X��r�r��	$Oq=�I�H�O4揮�t�9)d�K!��b�Jp��)���G+\UU���L`h�6��T�*J��T�fB)�z�#��*�OU�q,:SC�1#� ��O �dG�.M��y��S��,�]�Xw��t���<��Ŝ�X��0Z���� W<v���j\3�嬾m� ���`��k�����ٯ�E�����А�{���l��?�@nȌ�H�Q�Z��\���>��T�	aDL]��T���Lo%v�q�����_��;o��dU�y�8�i(�6�e:S\2���* Z)�(!3�M��0T��NN��ѝ���$��,\�|hg�VO��G��Vj�a�8[?-���c��t <�\��ry�d�R'\��-��Õ��p�N��c��/�}Nם���^�΢���!]{х:�:��_�+΃|O���9ڕ�q�݈.*.e���#��q�Hf4~����+r�[�i���?�͗�7t��;�)�:��ߊ8�
x�x�7ӛ�S�_����v2�<����"�>�� 7�S���'��|T��mzņo�!�T4�,[��
,Ѭ�2 Yh4��}��>�(t��K�/>�J��n����$u��hu����0 PB$�G�_����&�aط�]��7N��D��H&�3|��Z̾����0�)���)�_�_�*|9;��n[nӨ����r�V:�H��rC�K	�ⓐ��'��	O���q
�W���M�6�F>CµY���3l��ap��4X�h��,�n����i>Ö�C�e��0��0.'ͩ��.T�ݩ<�i[��B�X$�o�ۍ�!A����X��O���4C�O�� zx�p�M�ӛr��&�t��
k&��Vsd��0��e��@��f�Õ���%ɀ�Rr�����G����w8�`�������X�~"�6?�V?h�w�6~"0��Q��x�+b��l��+b
�vd�J�;Ó��C
ݗ�R�Z���X>H$�m�-4?KM&�pkѰ�	m�.:��lO�Nl�Pm���f�� ���k��s�mZ�-���2��uF�3�U�.<�.�������Ԕ1p
gt��sG܅\�c�~��Q�
1�љ%9'�μC8b�vCF�����oolʷ�BB!L�&(K�{�˨~��l2�Q���CD���N�m~����i~����c���G��W�W��Nl��$f(�e90��G�Cb�$��0X��7�����n.���o���n~�s��*�
qpѴ|��`N��/d	>U	奃$b�(���k?��[#Q̟@<��B%�<��O��9`�tM9U�l�T�8,U9'�U�.V-P��Q�*Q�*����+�)��~�Z4"t�� L����s��Ì�J"؆�`[S��
����$�ld!g�9[C��XD��j�W<U�P�a֞�ΕO��`�sE0�/A�Hv�m2�0Y�i�)ɔ�ؿ��ag�m���8�6�"�@��}��m���eΓf�A���4����P�լSsmQ�m}��wl�r��wT�`�<8v�0���	��u�Yk�<������>��]��qoy�b�ҩ*�-l\����;	Wq�Ibֹ�C�$!�z�n~u��H(��	d�����f6/7��E�~�Im
�×1;0��ZE�9-�m�n8��D�?\���s0;y-�H���_B����;�E�)��!�iN�0,cZ�Y�v�onw��7���s�̫|����٩;���~�IIYМk�����-�?c�RF�;{M�쵤�[p�q�ġZ�^��J���_���j&|W��ь���c
vK/�#�K��e�i�����3�Ԯ���d.܂���E[U�#�ZUa3s����z�e+�}�F␤+'�Y`����C'��w&W�5��|��FJP.���A�hƟ��[:W����/ ]�B��(hp���-tj

ִ�� �n�T�W��7��Y��@!�д-f�,�b�z��EӖ�i[D�h�g
͕�b��Щ5�6C�r+9�:��b�f�Q�_�^����=8XX��6��7'��Nm���4�����a%Y����`a
V�~�dƞkSh�M;�EG��8��՗�ij	����-�-0 �L�/
�Rj��*\R�$g���j�-`�d��+بfy��c�MR���j��A���Ap���aog�c�(W��$���8k2S{�W�$b�]��E&_���0���⪪+ŝX|_֕���/D��	������������"��5���9�W�x}�V	Ƙ�DXMb�&�j"�&�aq�^�A�@�^�H9�R��^�f�=8wB�36�w�u��N��=���T���Y��m��db۹ �.j��$k�����L�4;c$����'�Dz5+�[i������^t�Ս��-P؛۰×�r���O�a��8X<
Q������������� l�J1 �����X����rFo�wc�����H�'|��ԥ 9��B$��󩫐aEc��Z��9:1�75ћ�xqΊ�\3��'Zk6i&����v�od�X�dQ�
{� ��Q�_�~�@�~��I!�4���ȴ�=X��ӗKw��717p�Ob�$��S;�^\P���;>j����Ăݐ�� =AV�%�Y%�0*I�0V��O'
�l�~y�G�^~�9��T;L��g��)�)�{%1ei!4�Yk��PT>h�
�����g���`��W	��'�t(CAR���J#�vM#����u����9Lx���{&ì]8��;5�ƪ���\�!8+��ߦ�<Ɠ�>��f!�z��M��I�/
Y�Ћr ��XS2�V�%��@]I�b8~�
ƈ��2�U�o�~N�$��%>+���]�Z#�X#���b�+�������U���KyӾ�Z��}z��`��`��=�ާN��55.0���}ږw�N�G��G�RIܬ7_�I��oR�f����Q�,�	Ɗ^+n�QI�����`�"w��=����-��T�L@����;����ePz�
�,D^���{��映��ބP}������k��ȘҨ�ƨ;�-�ߝ�ҲCw[�_��d��� ���ै,�=!�M�A�&��刺��7U��M��sf1��)p�P���a�l,z�l���`��G|8�LX�����
Q��)&kL��g�tdT�z1�^TCVOH$vƩ2B�j0��3�=�?�%�]�,�fnF�;
8 a3#��笍,�P꼥'����˅W��7���,�d�����xpYL[��睄z� "9/�_L���f}��2�dVK^�;/�~^N��\���������qF�Xsy- Zl�?#���~Y �����s��t��O��@�bs�+�Z��ڬ��r}������g�a�Jo&⍶K���`�hnvF���QN�Ӣ�2%N��=�\�����/��3;�=3je���<��L^	2��_���kv��w_Vl��%�`Zq�/hV1%wѶ
�x߂�~��L�R��8I�j��^�:s{��/'kT%P �����4\�/���{��Ϥ/H}�\�/�k@���.�����c~H�:e�4� G��'��=�g15G����G �,q'X����N��5�H2o�zͭZ/�p�C�X��$K��̖�#i��\ab\*k�\�1�4�-1��J�kV#��Z�di/����"H��nު��ەq��Ql�_ӻ�ֻ�G��̕Ė��d�3�}DҲph�sO3%��r��ކ��9H��H�
���,#�sV=�����U��
|��hy����*��U=B�	���I#��2`�/#�б��~g��r}������p�[���%Z�O�wSh"�������C���y���u+��Ԁ�D���6��
�dEtmd��na�}&U���\\��[�D���[�-��.���A�\��>��Hl��w��	�M\(�믹t�IH���|��>��>@MU!�� #'s5C�6(�2�ӭ��
h�W���k������I�؅%?�ج�-��@Q �du�����{؁������ GR��b�}�}��HV͝������5�����x5�Ʋ�o�q
�]8 t����;��ɖMݭ����o�V.PbC���gsd�^�/�w�tG�����V�w��;��N鑻�y/`�[��w�/���,����m�����Ơ�%�N���	�S�˭���^Н�y���Q�aJ[��;
��)룤3�$��i���.�\�_����mJ�H���������!⹌促N����K�	3s�ݝ+���7
��j��o���=c���"3�6n+�;��� �&;cb8�:mb���_ȷ����b�L�b9^H�5VT�zպ�����A��/H���J���
�L����GЉ|w��/v�9A�zi���G��e����\��,��f,�"�&�hA	�A�9�G�6O�����E�(SЬ��kX����g�<%�L	@f́̂�X�I��LAWvB�LC�Z�~�� Ⱥ-�ߙsD�X���Ew�m�H�h�aȦ�:���q���������~	6�.�>�Y^n��zr�/�χ�$(� =QQ��D�����>��3Ⱦi�m��j8 ��v�$�?�{�k�ؿ&AO��J?�(^��u��s�(s fI*�������J�)�o\��x�/��/�,�*78�����5鴛U/^�m�S\%����Q2��z��X�1�Α�c��bQ:p�Cm�:���f��
�>`��/�T�ά�Ld�]G�&`��Ѧ�_9/�ǽ����#qr�	))Pf���EϞ7�a�)r���װ�G��'��?�e\x>6f7�w����=A��]O���'_���O���²��BZ�� o�&ZH/�]��:׫G�2�Ń��fU�RK~����#0����i&�~-�N-:{T��9�� E`�Җ��޸ZO��3�X�Z����7�U��;z�f
ŉ ^f�$D�3�4�W;����7�t|����J��x����yiMܺz�V����D,6wר�ɷ �~�ڋ�!�w!+�z���H�y3��sX� 4�G~��/�j�v�̯~�n���
0��L���T�a��7+�7�n��qy1�7����/�W���v�1@����*��Z"��ȑ�����SkF�Kr�ܑ'�Ə����~�YH�q �D$,�4(f8�ӣ�ԉ(4h�Q��f\GP�ӛM���%����Y�(\`?×�b�5��0��;��*�%�򥊽K����;�ן�\ȿn���J��F ]�!~x��G�\O�|�1h��!�ET�����%9��c�]w&r�!�L��A���ߕi�]������RUHdW��Ĕ3.��}o�7'>�*������BN�C̴�,FN��R:�\������AfRo��fS����O�O�����O��?���g�4e�1 �
��}�l ���ot�܏�ܣ��&�]��0��Z���I[-��c���!���+C�e$y�,��f+��2**SC�����ܟ����ڳh
�����X8M��u��i��K=I�P%���VÈ���������K�=��UX�s�1x�=�?x���#;J�:�r�{��E}�b�t�$W���H��UW��	!���*������(�ߕ@��`�[�A=�/��O��
z������^	�j����"z��HP�5O�D�i�'|�V�r�&8��z�Z�0:�-��q��T� ;M��rV����1������%g�̕j]��A�� 
b%�(��Hz�Ȓ�;ՠ��
lid��%'�� ��Ԇ�i�./��ƈ3�T�OaB����T»����z�!W����y��3�7<�{֨�zR3�E�h-��B$�~*,��ޫ��%����>k�f�%�jy�ܬG�U���p�^�+�ժ�q]K��`U�Nj��G�	M�\f�q�1˯!����R鄨[Z߮`a��!���+�1��H`��I�%Rs�2�\F^Jg���o��°���.�d�6aP�#*��	��3Qڌ��1��}�ыp.#��|��mn]H��Z�B ܄Z�|�	�,&9�)�eդ�:5 ��$͵}������Տfy��O�����GO���YO?O�<��x
�X�I�@���󡣍�ZT���Qc7$��S��c	x����\ FPZ�n�F��	U������F��%��oor�ό�Q5S)qxZ�Y-8M}�c,��W�G�S+��M�A��^�糘5��OHX�J�j����*�HY[.�����=K'�L�#о�K�_?0T�"��ЫyΊ���~X�Ƥ�G>��U���؁�/
�E��T�/�C�hX�����f�a�C �`)i�\�vb1oY�g7���؅+��i�y����ޣӱ�EՋ���)T�t�D4�4nOL�#�"��!��]�B�o�م{ d�Y����J����Uy+x���xx2X1M�@>دdujǪ�}+Z̺�6�;YU�9�Ǎ�>BRASd2�<�	m����EY�D]�#�W����4�?�q���8�VE�ak�ǘFD�a]�Ǵ���*QH"0�D1ӧ#}�j�Uh�\J�>���qd�$0%��s�#�$���j� o��G�Y������%eɼ���/x�Qԯύ!k��#ݒg��H���Q-����N�
dyy����ekb"m�S�u�-���[w�4�'X��Cԩ����x�j+y��fr ���Ȑz���V�F`�'�� �Lh�ջ��P$�&�!������Au�G��7y ��������
+�53��ta���X��U���$�!���� y�ZN�]Ƈ�ܳȃ~�h���63�
��-����ͱ/ڃ��ėe���A�����?-˂� ���_t!���`��ځ�� /����GY�	�S�Ӟ ��?3S�<{�A���'�5!���o6S�3`(�X�diy��Gbu����7�7�Ǣ�wXL*n[�<�j)�<3 |v�/�s�/�}O9h�Ls��,�_��a�A<3(���Pʃ��M�Х�0f&��hE���Z�/т?"a�O�p���Fj�[�=�S���������(�KX��W�|�%ǋb!6���Nn��V�EJV��rkp�0쌔B|��h�7W�Zw�K۴���q̌�5m����wYN[c���[kQ´cg,��5��	���*��]���IRH�f��ς�ҵ֜,<R�υ����Ӱ�`��?\�͵
��|`�������ڦ�t�ʯ�>�����5)���Y�����#
n� L�^7�|jʠl�����
fP��B�i��������X�X�����O�{�D>E�����e�[cĦ�G�y>�

��~�[/�Pˊ���i]�1A;�p�(х�Hn	�d��K:c��𡍝}���jCr�}
��s���s��1�̯�~Y�%
wAr% L�
a�QS�i�`T����R�S�&]��]���(9?��R���
x��PMmL�6*&51R������*�K��o(v�ƺߌ�>���
�"�Gu9�t��
B��ƃX���eM��˖pf�
]@C�66��3��)��+�х]��KK�F�:��!lC�wKi�5P��Sb�Оf�\�I��è��j��<��]�w�.�j�SMIf.���rpiEK�w�(�?LP�Q5���?�͑�r���f㻚z�3S�U1�A`O�ѧv�r���3�: �>�&K��r����%����-�;ΓU������:��)���
i] �?�@HL
�Lh6u�i�����G���0�7�71��LS��}����u�z�����
}acY#�([�Ǫ�D�r���χ��ݨT���X��_�<Qf�0�LiL�1GJ����?�>g�sG�hG"�U�ao4sOޮ����
�*��:|��i0���	��%4(�eX�Q!�ī����=4g&y����2!F*��	�W�~ß�;.O�Z�#ⷐ6���!������^/�}$�s��|��c2�P�
ŧ�U8��r�4�2���+�W4��c1\�Ŝѣ��]q}�����Zqszdo����ܻgJt�$�k���O�m��
6w A��"Maⶲ�^���^���eZ�8��[�2Y�zy#Om f�A�~b���,����b�STp�jd+�)���"��Y�����f�0���E�6���.���8`%�����13�0�����k�F�s�S�	�v�>t�����i�Q��@C������?=��b�
dٝ��*��G�g��j��gؠJ��J�|sX��D��c瘘��#d;O~㿱���Iq�yR���Kv��<�p��C�a��R~o��&BP� xk����yت?b��(�$��߂�W�4��H����7E���hnj<�aK9:\����m�-R*!�a�H��Dm"�7�T~<X��Z��r����h5�Bc��w}L����q�{Rq�+P��%�OJ���� ��(�;���SJ� ���ݟ����^s
̓�`�]��j���o	���:O_��3���rQ^ߕϾC
~�m8as��;��ho�m�L'��1Ds4�pJ~ m@�΢������ֵh,��?�Z�yUGغh��'��(.j��$��h��h� ���o�kJ�j��|A�n[�I�T/�>���$���nk.�]��=�O���5C2�M�%1O� y��&�J�ʼ��\o����o����v �X�$G
�r�J�^�nh-̻�td���A���x�}�A��4�� 崙=�X�j1n������dTa�#�^���&��z:�f��@"�hY[o� �%F1���9Ml��������z�|��,<����2�C�Э�J��}��d���}�/���Nm�,�Jm~y�V~�Qc�B��ƌ���������z��4�k7ñd�ˑ�MT-mWtM�Si��Rq/�ح���η��<$� ���᫠j���
��Rٶ
N[%,���EP��~��J�a��s�x�^x��wW��w�����_��K�"��*y8��Z�w��C�� �/��Z���ef���\2�|�B�BdegNb�+]E4��k`�WI�։.�䀑��#5`������|���v)F6h�{)��6+Rr����$�X�H)]�t� ����	%D�p�
x ����x:krcs���E����9e��PX����fT����Kt�t��3�� �}�p��\sđ��0�T�1
�z�7B�~�p��3�X�'�3Ư������GP����]����U�h�e���	0�2��촰���(*S9���S0D�tCvM?��`�����2zԇ�$��=2���x�
���~�)"P��.�po^5�d_�h�����C"y��\�ds�n�@>;>;C��X��k�S��%�l��4�1��Lּ��:~�#6�m!� �4$2�ID�E&`Ӄ���l�?wB2�vߌlv��='߉^�r~���!~�"'Fbck��;k�<t_���ki_S��[6�'�Qڗ/դ�	���n�Ol�]�>�;�ʺ�c��,
A|�U跶B������Ã|&�p)%��IL)QL)�SB�۬�S4��HY��XH1����q�!�p��V���o�_���0$�\����� � &�
��)�_h�ln�o����=�־y&�M��ZL����X>%� ʈE�X�E*]�
�a�}^$`�|�v�,j0Sۃ�JD[-F�"j�8�
#[{k���u�?��iߦ���Pp��7/�"�oC?����z}�پ|��f�� ~

M�*�����Y����Uz���Rn�)�j�U��?Q�B�
s�T�3��܄o��[���tH�8��H�8�Z\pFa?��)悔l�cK�+{ߍ @Uo��i�%�岫��B�xYh��
K8~y�_�4�>r�ϙ�7G�}�j�:��:����cZ ��5��
�z%�5bg��^�m��
����:yQ�I�b� gP��@��������`1^H#���~W��&E�u=H��j�Q��m�Y^i����T���YYNBN�3X5e��6r�+ʝ�x��Μ�@O_AM�#���K���ߒ���
h��}���d�u��l>��T5ּ��ś�QE�y%U���K�M����ʇ��5�
d�O:B�fY
[۶�<�'�1��1�Q=�t����.T�!wwz�RgR��E��:��r�6���S���
x?���&x�P+�!i�4��MԁU̜S,��:�Y~޺n�+�%�l�x�����קZ�^�����5P���z>b����i�ײ$S5��}��.1��;5����^N�H�~8����r���0�.��;H"@F%<��5
���<b�N�:l�V	�-�k���6�束�Xn��8L�yR��i]��5��h��J��p���>������Q���6h\���dˮӫ�=O����u;2�8��L�{c�������C`^�72MC�K�Z5�\
�1�'5oE��o���o��
NTǐ�*c�9�����;�ql��)$�ʠ�q��)"��&-D�'���S�Z��S	�$�2o�wH[�4�w��lR�K�o��l?�r$��\�-�Ѱb�����5I�K�!Zw���#ځ�w�s3'�4�l�\k�/�!U% \u1�~�f^K	�B���e�3��R�*�� lT1 os��xSA�U0�痡,��������v�hf��d0��*�`R�����M���H?�����Xg�	�'��u0<�R ���Vvw�����
�z�}�o���ɞY�5�-�B�.���2�1ſ��	��λ�O"�/�ٙ�캱�d@��=���7����⤎��܏��u�W��}���X�sJ�%6��>� 	-��D� ���sR�D'eX�/s�I��1���W���w�����-r�(��W柑�cM���`gb�PW�=��ˣ8B��X�nda���9�l�҉t�ٸ_e&�e�&+$�1��/��1�뽈�������Gnr5OG{�#���w��m����)vKD�I��4���k��隬k�e��=fYR%9����� 	�%�q�M��8� ���7�����0�L��>V	�����)�����%�OCM<M�i�֌�&�&p�!lvgR>�t�wME�E�&���;�Z��HK�H�z1���UgZ�=�6=|�|^=�MѶ&��Y$�HCZ�Y���
��<g��K�;�z�q�arz��^�rn{4mfðy��fˀ��3:^���3�l��XYL)V�]e�
�VB8*	Q��"��
P�Z��k�)�[���R�k[�Z�'U�_�h�f��p�OJK�O���`�	�6;̐Pc�1���>���^g��R��!��lt�C���7�����_~�Kk,�[ޗ��UV�����/�|���UI����a�鄍8{2��Af�/�pV���-���c~���(Mw�������FY�Z���`O�k�L&84�qg�3�?�3����1��6�rːrx�I�2����`0sA�MS��0Se�S�����2�� ��Q��a�w��!�l��Hd:��
=�o��;]X,���
\������%�Ԫ���y���Ԁ���o %���;+�΁D��c?��8��0*�� ̶lБ
G�Ͳ5�e��k.?W`j�N>�w�]|�Cs� �� K�,I����Ne�wY��
�]&a��ے���v��ޕz�s���t$���/_ڦ���g��$6o��X�&nْM,�e'㍻�2v�o�bw�7��Inj�ҙOWi.h;ܔ6[�m������#�F&/�7<{�򪘼�_f��9{�K�GY�T殃�JQQ5O]�ꩫvI릮�o��Z���S�oj��ߛ�ʳ_c>p%����z�������^�����=���(.O/(����B�ϝ_J2��@�_��ڻil>���j?pxt��p�%�p/�JH�¾�^�s��~q�n�O��ʛ,��*I�2��w	����:�����/���,_>0�+(κh�-�z��%X�/$Y�_F��7��{���7�;��U���)�&����&.�u�ة^���4%Z�+�B�6�ns��^̟��O�-�04����u���N�����RC�7O\�'ږ|
&@	��6�@w���c�9��l����0~xF�ޅV�\��0AN��9챛�ҋ��Ǜ�BRu*,����E皅{A������p��Jܷ_{�	�ţ .�3��&=�aH�n�P�D�Y����kQ��o'S�IT�$g�&�t<	���� eO��eg��&�����0�k�[�t���\Q݃2�,�3Ql�U4�22�.�^���B�L��t]���H�1�]C�~��
<葘�@Q{N$�M��u*Ur#� �h��o�H�)#b�-]k���Jb��MX���\9u>�}A6r�L#��
��{W�VZ��X������_�?���Pٟ�)��P���;I$;a�Z��
'��01ˇ���L.��ܖ�
W	��CW�v���]K�`.)kJ�#˼���zs�=���,��W�����i:ĂD����%>Z����Oʝ��bi̬�#���ȣt�wGܔ;�O��P%cE�i��b��4]E��r�����8��M��
~7���]:�x�
`RX�t��Rqڊ7���OP,Ê�z��8lף��:Է��'� �*s
����=�v��K��Zt׍�k�o͗��V�UR�����b�m�l�kc��8x��Z�{t]Z�i�u�t��~��N=AK�����CS_H���+X��O�F?"��3ĥ�A��\���gEot��YT9Jn��	JL�ULQu���6!���
�ֺB�J�k�_�V|c�i�M{㭯�c��/Ch����^^hx����9/���łw��V�WY�P3X1^
�US����Z5�m�����!����%ԱVت��a�VW���P��ר�ҫ���27��5_4/��V�7{H�,\C���B����!U��
�!͟�*�����Z�uw]�PC���s��G�go����G��2��q;�@�A��Y�qT���9<��4�c���D��No����&hheb�MM،��e�&��;3E?K,�;K��LM�4#㱄-���x�}�Up�㛣H��{����� V#;�t��uS3���(������ `�4��=}�A���h�xH�X�R
��؄i3�FH��ѕp�}$!Z,��o&���v�]U=�.w�
���ۄ�~���.0Rٙ���zJG:�uF��äV�v̳�Px��}�m0��
0D�����H�`�8$
�2���o�\�e���U��-�M�>}��C32���^q��Y� b�^ܬN����n�3���z�0�Ga�׽�����o�my!��	Z)%�K���SP+���[C�N������u2z�!�����1e��ʺ�譕�s����1f��̼k�\�l���m,z�^�;��;�2�3�����6��<|z�w�6#w�h:��t֡٭�fwϭ��s�"�G��%�S���Z���!�^�z'��Ez���D�j��C�[��:4�[��ET� �[KR�I��$m�C����`r5�w�c&Q�(:�Ql�@���^
{�Q`[$tyߦ�l�$�b=SKH;��D�u�NӋ�V��L�5PtV�خ�b��Ipop\�*u�t� �6"��TG��W���UH
iE-S���*n��03������R��T���(��,��
yM�b�q�N�����h��5{�f���Q0�_�z�8=m��?����//m���+5L��>������yn6n����Q~|Nv�����` ��x�2����ٹ���|�1HE،���<����]Οَ�gc6�lX0�F�C{�>�5��ӧ�3د�_`<�l�l���$�ҪWx���G��(6�}�.YM�[A
Z�̍�>� N�b"�i��_�Z.��/m����äW|	�ğ��~��#�Ы��i@э���Q�Rm�K��R�V�"�2P���Fnk��������zv�/�d�f��~�/�ͭ��I=���s�:��A�_>ĆQFd���1�{�+�C
�>�j(��D�/+V��D����7u��n*))ҩT j%v�9S�K�r��Vy��[4J�xQ�G�Л{4����ծ�,��&n�wJ�EQ���%ʍ��N`T�d�b5�+"�7En,�m�+�^zi�_�A��~(N��f��aa�Cu�Q�,w���gZ�?1�3� �W䫯�ͯ��I?|ȩ��n8+�����Ѥ��;�D�7�"Ӵ��#r�8r� @ȉB�9�ē�"G��8̕hA-l8�^�>���YI����ԑ$�[�C�`ۍ��f���Q���i�m�����]�w"�s"x!����׼:n��p��B�th���^-;3��
2��9���yn�:����5�Ú��UKg�=��}]�g�t����7 Id�iy�Xu!��\MY����{���2���b2FE�TH$��*�t �kI��I�"�k@�H�>���)�8��R暵ci��Ϭ c<��_�}y���MWk+sJ�H旮Z�y[�<n=s�e��w�S���
KǺ�Oُ�����j(j2����U:�T�����2$k/Hq�-���o�#J,x^zDK�*.rM)D/�/�(
�C"9���ȫ�R�A�R��;zf'`�3��U�z2�1(�0������G̮��=y��p�Q��$B�
L�0N�U+�S��
J"	��?eеנ��uW٤�]�V�;i�_��*�C�7�]4,=20Gt
�C˔�On�I텃��ʫ����F�n<�7Gt������跥O ,�h1�D�x�x�N�Qk��1��NǸhK�ѯ=�@ѳ0��W��(����Q�!����l'�#-@͍@v4�xD�s�XvLǟ����6�}{1��é!;��ͩ\E��5(sB~����I��͛M&ס�Mo��#���m������
?��u�]׭H���]���Heb-��h�K�
��FI
8�" :b[D�ӛ�Y@a�������.rk@J������� ��>_�=�R�q�͆�q4F �?�@GIc�Ά=5ǵ(���ư
�
�ՄGه����%t��ß!���h������eV�;iY'��A�����}�怂��8������&���.y$�*r�9���.��o� �~1��D+|8N`�J�_`I؞��l���jd�g4^�ծi_N~n_�!n���x�#�dq���H�m���it1\T�_�+�L�l��~�؄IS�d����5ȕ�0�O|yI����{�����l2���|�5a��.Շۤq:��L���.i�۸ᳯ�؟gP�����]�>l����Q�x˅�����g�8�ϯ߾�&�2
��t�),$�
g���`8J�Ø������.C�@}��?�9�q��V\S/ι�����z�����8�,�m���/S4�yy�=�
:�|�]J
�Z�����'�bI�����xG����@)Ztd��X�%K����I�Ø�DG)M�0-��O?�\��s�I�J� 
�4|m�D��(ѠIՎ$�W
�~
GXE�j�r����O�-tߍh��M��X7�7��X�Y��ʽ�����_{��hk-1�m�ǹ�$�\�4���l#J{]y�R���|}G��Џ�>;���-���9DmVk=��
L��܀��]JH���\>}��g�{|ә�2
�2�O6�P��>0������Q��^NK޻j���	VJRq�Wa�{M_�0��r4�bf'����?�j���PlElc�'����!�0m�E5-oT5!���W��rM���7��O�X�XL`�X��>kO;o�$�`��'�?�B����-�z�@a�,��i&���\
�WfY�W5���9L�V4�{P�)c��Q~���v��KbA��+���&��S���WHt�2�8Lde��S~ �N�aL�H_Q��c0�<����M��4��hȧ�$��]�oJ�i)��[)#.@
��h�i�
�#-
��>CT��13�g��Bn���()%����2|��
��ֺ���[����
)��Ī���(Ve
u��GI�I2v�a̬%�&�[.�Qq��)�d�"@P��(����~1�a9_�HW��
�FZ �m���l���DKu����S-�AX�ԼP.�$
w��Ӝ<��@q�!���!�E��j�m��=o	��e�zi�� M>L����wn��������x��k�a��Z@- �KV[6"�������ּ4�+g^�K�XE��r�J��-������%�?_N�J�Mګ�J�P�"�OAkR�+f��@�R2�LZ���~d�7��=�p����D�7?�l-�5K �Z�Tc�&`˞ހդ?��s�賱�����Ue%�bI��z7��?��0�!F��j!A��S��s%�R2���0V�Cz��d�[��S_U��4/B���pf�[�I�y�`W��F}��.��xЄ��vx�+r<*�%��� v�V$�]�`�H�Yu,WZ�W%����PY2����
�������ǣ!�2�[�T��RzZ�Ȥ�5R�}L�a�Uc>$�ڱ�[�{��p���VX��Ձ�j�꤇�̘B/V�s�ڬ+����(N�4�@	ȴ�_~��'�(q��0X�dZ�C.���%��"V%*//����j�<�~S��������^�Υ����B���l��_��g���h�-�
@#7i�֩�c6m�k�݊���set�S�-�k_��̕�Y����/��箶��/*X���I�|�6����NE0M>�z�Ͷ+��(��vo_�˔'ao�gO�#6�n�dy�s���UǆXy��n1����3�b|�#� �%�=�/��esl��=ɐ�1��*�IV2��f���LigC1���A��qJ)�a9�kF&LQ4-�EX��Cs��������O!��'��Iq�E	8-�����i������X�#
�^��ƥ2��L��3Stv�ξ�M��*z��#)�\�,�j��`��-�{|���̇�B
m񨅀����0�Pa�����a�[��?n&3z�+1o��p��
��<}Z�ҝ_��Ϩ5:.��"��/��)�!�b��������7�涁�B"����.�&~?Y#ǂ�vI��MC5�8�t�nF�1�ù(k������-������\�I�sʰ�G�����q�T ��Is|��8a�X���fn6p|հ��K�S�>��:Q��FZdZ�� g��
s}PPH����wA�m��nǮ@�$���;�C�,�g>Ne�R��pf�j*���	/�x�������eDJV��x��������Mv�Zݞ`�CG�G�}��:&�[�(����F�	Z�iH7�E��\��4)�p	�m�Ј< �l 5�����K#^�	��<�R�)�;��*s��{�#��	t������8+A
�]��8
o�l�ˉ!�:�WIf��w$
�غF(���F@Xn@g���� �:d��nn�8,4:����$e ���.����*����Шl��Tdφl�|變c��͝M��V4;��P[�L��J��0��.�[sJ��ɷI�� �FR��	q��E��HR[�M�r\֖�f�4�r�X�qa��
�x\�Gī􈸬T�+2H��p-��o�z�k!~\LR�c�ē"�������L�����-�u ��vL/�;�`�>G�i��.��|�JtU���G�g��L�nl��u{e/5ݸ�G�������.� ������
��lT�~kp�f8�f[���)1/����*z�l'��8�nL�	NF�yZ*a�Y�0�P%���	��aXp�ߌjM�}1e�""U�����ɷ����u/|%l�\�(�\3���Hx��C��f� T����⿢<������<�=�����f���qo��	�L��-�}g�L9uZv�!����_Y�GV��~�j,h��][L jm��F�h[��T)���uO޲j�)�j4>S��Ok�r�<��!R<�R[G���p'߿R,PŽN�F�q������3ˮ�6k��
��fg�H�<m�cD��wk5`ű�W�����P-�H� ���u�ӧ5;���m�V��Ś�ιf���n5k�魼_���+d��2��F*/�Q����z�z\^��G���dAG�AE�l���C	LDr�.�dz��I�8�W'��]���"qc�7��&��76���9�uW�&+
��$8��徺�
J�¶�)���>H 7|���P�^�_Z�Z/R�}?� �S@��
TJ�2�u+����,�r~r�uL�Ժ�?��;������)�vZ\�iP��2��2�W�2���*ܐ�m�i� ѹ��̌�xRZ�M��+~��M<�v�n��A2�ES6V9΀��,g�y���3�M.�~u��,�gy򭽞�9��8��ׅ��B�E�ɷAF�~���`�6�μhH3&PZ����#S҇�W#`�m���Zjެ�v�G_~(z뚀~�����6쓎��wv6;K���~������/���s.��g�����Ƴ�>)�L��~�l�75��4| �|f�)໘�����P�Gd$���R�Z�$�G�z\��M �%;M�Մz9�o��=����`��3�^G��v�ʾ�TG�I��3Ƀ\�r��bYe"q�_��c��<џ�>.�G����__��A�%��3�\\�����sB`@
��{�!ȮA�҃�"�
�����3o��J'�3��#�en�LP?6%5���~vX���2Ʒ�C;woG���*�?���H,l/y3L��.
����s�	�Ǧ� �A�U�`p��|A��S�8Gt.�1��9a�����O���jDgߧ}<]�	���hφܼ��EMl���w�V���0�%��Za~�N�Pĳ3�Rs��@��(���Ŷ@/��5+����4��V��Sё�aٓ��d)ਁ�j�#XUK�87

�{��$x�D���i�7�a����;��J�#��ܭN���-��A˴t�21�LU�/1�,��C~l9���fK��'��D�򨀎��)�8Dhs�x� Wt�	���W�e1���"�����\N��\<�����M�.���i����
|�
wA$n�;A�{�ɇrCY�ՖJ���|�&3���P.��DNM���y�q��Y�?���Wt��/vY�b�P��}:��;S��[Sv�)��٠�_�;c�����G��|��\R�݈�ť��5��v���r��DYd�D ���0���>�$�J���W����+s�����ϫ�8w�ѡ�*�i�M�FY����C��XS�2\���i�%Q>uH5N��z�8gv��y"l��̋#ޔI�Čww�/S�l~�O�F�5Z�x�KQ�_ l*�(�<5.Gp
"��G�G���Up���G�8�����	���3P�Y-O�4��,��W$P�(��C�t�l�-�ZUer˶�lPM,+E���T�XN0�P��:�x�<-��a�c��R���'ZkVR�΅}w̄K�(�yL� `�K�,�w/��J��o�Ik\�&�a�&�R=�G�~Dr'PW����Ă��r�� �3~���|t�b�q�yX����E�!����9�a�,�i3?���xH���B�i�$�3%�s7
%�Q�<+ �=|�
�� �R34HuB�hS6���NP�qH+�����O�J�hRM����c���5(T�k�,.�[����9~yw:C�����$�
�b�,��
ʵ��~��h�*�|���^8~~o�ob�l��%wx��f�v`�N�����iD�=IC���<
bv-��Jl&�Z\"֎�X2(m�����zI�F�I�^�� 7�FZ9�.�V��H�ŉY8�\Z�8����\WI���j` /�m�fP�d�6��M�`�x4��q|Z�Y��AK�sy��r������[
��"�!}}���M*S��&�
~�;��m�X��E��v��_����W���K�2+�N�
ʲA��1��װJY�p��z5v��Ġ^�F��	�?�Q/���=-N^Et���p��i�f�]�@>"�b��Ō,x�:������%�P(a�$H���݌�&hH�P�0����:�v4���J$�<Sv�n���$^'�o�Hm�~�$�	�~=J� 	����V����t�,���P���x&����t��(XYt�;g5t|}��`��CV7E{eSp�Z�V1[�]-�E�r�W���.��䭕����*�UF�^�dfE�N�����M�[�bS���v&�����	G4�eFߴm�J�U�
�+�7b㚼0-�IW
*M�M���S,�؛	#�B���*R��͝?���~q�7�=T��[k�$'N���q6���2� �� ��-([v�������b�3�K�7c�O�B�#��:iS���O�����8N����y"�-�G�΁���ڰ��ϔ��KӤ��4�WSt�xy��|�q
1h$�{�h/�ܙ}��6Nx�3�l��\5b<�E{�h٘�U9X���d4� )}Yd<Ipg���L�d�l��:�Q��C�����O&�%{���qݽ�&�f���x�1X,�sk�n�Y����t+��?�3^����H�X�+dMF�єƃ4�!�xk6:����eU9��8m\Yek�_~Q�?�l���Kȳp��#XY�0W��
y��rN�֭��r~F՜t��D�,�<���G�fD�Xl�6��(K�A��|�
 r��)�l�O�%�T�6��t5Y X�z��(;0�|����O�#���1ݴy�Ml(؟Cw\�y�2�ކ��!�%L_����	
�'�'�QOz=�|�\�E�e�� M�Mz#|�c��*�M��������܂F8[�	d��W�X+��V���c���"�a��Ǉ�YI:o�̙?a����K	��p��Ïҿ	Td����w�q��w�Q�����/n3̶)��t��='�x�p�F�cB��p�=P��%R���Y5T���!N	��*RH�=r���abH��Ywvcare��cL�7$U���BU���ZI����j���c��{�B�{�������L�@	"�8���S��!��}"�I,
�VK&�bI�`�VH�W؍7���>����a�.[g�¿�G�z��o���NC�}	�����S�C�7�/��W9�_!Uß�8]�B��*!��׃��C��B�w!���>T
A���UC���B�~A��zH巀��� �Zba�Č?~�Pb�a���e!��ى�"D9մ�6(�*ȁ��h1Qs�� ;�x�g�lv~l�I��l�gF���h��v��T�^6�E���l:Q�h)�/D��3�y��=�au�j�~��~�po#����F3jSg#�-���|�֢���m|E�J�g(���:����D��H5�a>�b��,\(+�B�C�Y��ǬmA���<��AB��p]��õ��^�Pv��m�+߅D��)�����4L�ly.�0 ]~z��������b<�.	�G
ai��&��2@������+�����8<kj�<^<�+'H��5����C5�0
Sy���ؙvӍ���y��>���$AW�z�LH�rkJɂ@r��Ƙ;ָ-���B����05#�`����o���
G��v� ��cen9�O\_~D��7x��c�[�eX=j��W	������+�<��iR��L��dLD�0�.8L���OV�;/���!:���KU�B
5~0_B�x�Y+E)\f�\]
)Z!WT|�U�\�BQ����Xe�h��3ZĊC�ť�ӕ�z�|���(�ڋ61�����o'�3�T�
^�C{�&v����P�:v��H�J�)��,��uK���q��$~/l}Pt4��]hT��(�y��`G�6���
~Ǐ%|,��L�?3q��!���K���qC� �a�RHzި���*7��6���Ԇ6��T��6T��;L�B��Nv"�>�k���|𬑵�����|��'�I�Z��e�c���U�D$����#�>W|@VdE��?-��R�lz�`���C����3e�{+��KS�HOSH�i�;���5�懯%J]�c���H��h���>�������&�>��Jٶp�O��A�.}>n�����܂<J!΅81.�8d��㧷�r/��;�P7��K��t����43Z!L6N����8 �����i�S^[g낌 �5F�cr��6~"����2�a:�;�9P����{�ݾ
z����Ǡ��a�	Sۑ���Cc�̺7
{0yrLA�Ȃ,����)����0�c�3�fI0�̈�:�������j�uղ��:�ݹ��Y6<����Ȋ��3�O�I"�5z =��Q����;��9��.ސo�@c:#���" \����\�f�F��8-���cP�Q6�8è<o��^��x�`
��oJ2���Fo���"Gm�7���/�k1�,KH�x��1#�o�(��u���e3
���jۤ&Ve���<ӍiHA��
u�	��
�� �Z1|y싂^��]{F�J/O�4�Q�������9�a�$��\�Suʩ8X �-���S[��fD3J6޶�b���v�&���4���kz3O̪���&���Y��@Y���̎��,�|%n��bO��-?�����jiA��d���
�5��;����WGoO��x���6_o����	zL�=rQ������yy���ۣ�g<sf&�2���@�}17>���,F/؈���Ҟ#�� -����I��#�I��|��7�}{������m5������a\MD ����n8�{Mˬ�@��/��~Җ�7N_�j����e�[y�;�7������z��5e�O�
�����h��R��i� ?������N0���}
[����Q5QqM�՛�g����'�ZNw���y�ft)���A��ff������@�ugv�oY��Vټ!Ll`6?����1�9rT<��xM����'[�.���=Q��x���R܊�����H��r$H-��)Ŕ�+���ک��cu�1�]�}fA������`��9b�B3%h���g�� cI{�4�R�Zj����dc"�ӈ���0KQ�l�H��`#�/����>���FCoOX
��c<��齷����?0W�>��9�c5���o�-E6��0�����/��C8���O�����9�A���� ������ �����na����������'���l�r��gy~��x�&tt9'<���)F\��� �?��u 86���n�s���N0�����>�$]�:ힿ8;rm~�{�^�3�]��L�3w�^xg ���Q��|�e�1�jә����b��Ġ#�
�����
���d��N��m�,)]�:	l)#Q��c�����]7��zA���R���f�4���v\7��]����?��.)J>��{,Ɂ��?���ݽ� �f�z�{�Eq`<"�/^lwNN8��)&�4gг/��C�1`J���ϏO�EAs蔌+w��O�2	M�9߁�<-�a4��p�������^@��n0M���w���B��˼��y/E�{/𯀤d��sv��^��ONÃ8���;�`#d�l���s�<]�5K���i�h8W0a܅������|�"�0l�ϱ�UF:=�a�0N�y0/S�SF�9=?��Jc�����v��i��1f����������	��'�s�S@�5�4�-Y.���"�=�ۇ#���j@��;�;?��hj:�
D�"�z�5��sƅ����1ю(?��y�V����=ˇ8�?�1x�G*��m�7���i�G�]��=�N��%6�6��0�h�{'�����uq8p���s��%#�??9;���xx�|��="-G,�t$P�';�g"BV����\�B ��6�����Q�9����al~����Ku���ON�"�S���B��hwۍ��W3P��������Xi�����^�ʍ��{�ggy�g>)*�A0fqRJ��9�P��.'{?�v�w!f����^x/��/P��d�� �@�=�l�;CB'q�&�0�2J�9�b���xfJ9=���fr9���x����]�� H2�v8[� hF�4���*�������s5������9�>�p�}`ZqAn|J�j3�U<?�*Z����U��kxt	�������:�(�A}r���%�==rOO!8�q�s��?h�e���aK:��o�6��&�(�)qZ����R9�������;G;{�x�<�?�}�@�A:�j���@�Slw��z�{R�s�h��(m �0B1"Ǯgc���ͨ��D�;{�����FA����
(�R�O�w�O,��D�ށ�i���JϧK`���z K��sAK2ޝ_N.2�E5�(9;1rG���%\�
��]x�: �A���Pd� a���V���	�C���x}r5�e�G�G�����-pbH�N����"�.H��F���&��~r�H^b�� Gb�䝖�����!h�4���| ��Рml�V�@t������
�F]N+���t���a�I��L�Q,��]����P�ʴ`Kz�I������V�<岭Ý���>�e�4�f\Ʒ��wo ��#�H�5�]���l�F�S�/���6�x�k��hh�O�>컃YqF�?�@�g1)��.��}8oG�.Zxp��[쇋,��{��CH�J�u�S�;�T�?���p��D�#>qW�l���-����F`��
]�+��9%�tql����g��X�k�I��P���z
:��T2�|��,���ۑ�6
C��W�H�K���
����1X;N�)]RZH����wر�fBi4�=�=߱��$X�������m5��VBޞ=%_�����Bx���P��!���,��L!��Y�!
���ZT�$��W�QNK�����)�IhL����H"�Bh������^�����	^C�fKع���V�h};V%N�ZΝ�2�"r��sx+��c-��[���W�(�f���O5
��l��->,i�H���Ū���׼���k��%�-�v��̖��Rf���-�,�u��7�޴Kx�=��o�{Y6�@� ׻�$���T��"�÷~S���Qd��T�Օ:�'�
1������������d�9X��������KPeG��j���#Û"!+V@9#MvH�:| 4�� ��ZX�ܑ5;�xW�	Z!0�R�� X94a�🶦����JT.Q9�d|)z`;�>�j��v��Mg�:sx���WrK9GR^�r �@�=T�ݺ��]���.v�s�![Ǵa���{�i� �莱s�L�w"�J>߂v��dk\�������Ml��#u��8���@���R�.]�5hԝ�0���`����TQ^�j�}��0#ϩ���X�}��%#�l7E.eDd��2����J�Ys�Z98�)QWͼ9veVTC��S뮳y�8K��b���`�(�s?��@�9ޢhf�%1_	:jҦ��8Z$8��Ś�X�K�"��6g�jÊ�� ������2��\��x�B�;NaO�Acr�����5�;��N��J�=�hsg�&�R;"��TŪ�V{���)�Ht��s׵ԯ�����C�#LF7���V:}t�E�J��@KA(7�ֹ�E+4�x���[�sT�%��+#��<�w�d%w�V$Ҍ����v��&>Ly�t�J!����~/>� k���.��'�9,���ލ�����"5���/�	x6�J���1S�iz�s��ހV~�c��K�0��5����#C���u��"C�#.����o/<̳��|fCot���c$j�!H�<W��
�d��S)_��f[�u!!�&��-�&sb�[B�ɩ�'wfA��񊮼!���Ynmz� �G��z�.�|-�V�'� �x�?ߡ�&0��J�g0E��+O1��%���H��Ba�n�TD����ŲƼ�������DV�3�ȴ�'����V�ѯ�z1�zW�%n�Q�>Ǣ���	�>]��h��TĿ2jf� 
�#1�1]Wӕ���	𰄶I3h�B&�l)�/2�l�*ɯ0��J.�#l�}oM'i.���Q�z�5{Sa�3�"0��O��F��-ދ���W
Y��nX���ҝ3�:|tq���L�7��P\3�v�@.�lZ�"���+�i.I�[�d��!l�߹y��r��p��n�
�1���d�9ޑ�(!�5	`64!�{',��՘a*l�0�x��
]xo�f����f�x��n��G��H���N��.�3�;1��i�S����y�G�-[�d��|���0z-�Ṡ*�Apʐ%���^
n�� :�*�t���m	+[ڙ>3��9��,��[|֔�Z;��k��VSƸ��_�H7<&����Cu�n�����
g%�T�}}����~�w��� ���K�o�u�sJ�t�ٰ�	l��=9a~w2�� i��ܓ�����'����m���9�Gn�5d#>�ð}09ObpS�v<g{�.�F�9�*�&�#�P|�≒"����g���
���᧣�t�fenD
ō���]�t�G�:�[|���*)�Qd�)��ׇL�a��/M�E�ᥞ��v �"�;��H����M�lsS�o̍&o"�U�ն�Q9k��y�kzJj�r�J�'��z
�M����͖��E�W&�4ʠ�၃z��?$�g���$��/��Ө�,��M#�,�m�m(n�����	Ί7�޸T%�]��������*�u��Uhn�m������^�5R_
�&V߯?�O��D�kި�f~5�o��&�w��C0����<�pIۑ'���N� �/ZDG�|�������z�O��oɌ[�#���h��C�n��~�s�}�������*P^B����A���Z�wu�:�A�(ׁ���d�3�t�>=|��#�
���?��v���,�M�N?c�-��?~x4��n���~�3�Z�?Ț�H����5f�p�[:�]�ւ�(�s��?�t%���n���3kJX�?�ZZ����>ĥ���D��C����#4�uT���DW�

�W�Po?�^,,�Eg���(/��/VI��)0�?OW�$ԛ%��Pg!�^��W�d6_L�1��v`�'��eHD)n:���	n E�P�T����к�7�^���X�wT	����Y|n�q)薣�0���T�!74����Y���R�-ndOFX�f���PK    mF��r       license.txt�R�JC1��ì�&�;wRq!U�R\J����f�$i��;I�`d��9s�W�W06qe��:
��	�	0�c�qO�0�I0`̞":��4*��
0:w�4����\W?�,	��##Ư�l�@&X���&a����J�'{ �Wۜ5��,
peB1UH�[Rx�a��%�`���n�=�<2~6���Tf�CRUC=}��[�m#�����R�ˤFl��O���V�2e�(� �Tq���k��5]�W��cF1a��~�	�rf?/՘��9as������,�?'���8�noٜr��/�,i�7I�3�{o{HW��-�
�����.�mՙ�Sf���B��C���(Z-��Cً�}6�󻫿PK    ��GG�2{8h u    source/canvasjs.js��v���yrN�A!���6�f�$a����/�q�$@6 ,�53��W򘷼�!���@~!U�����ɞ�d������^��?�)����A���PM՘�RI��e�%���i�gҙ<�[=C�ZRi(�)H��a�0&UK���eM����|6{�8*!ג>]�`hI�X<)�Չ>Ֆ ���?�As������h�/L�<�G҅�S'�6Hu]QG�lJcubi�DU��
�����A�_�PU`iH��䠤�Ǫ�Ӏ��s^U�� EOPLg�T7USZ�3	�*�LU���d�}k!4�>�7�(�!�U�4�Q�V��R���;C�@�4��+�z(5�>P[:2g��0�&/4��CR��)�*�<VQv��[��У�� :������`ҋB�QEU�Cu�����.��T��U(0I-�}�ʆ�:�Z�PH���P$Y��Ӭ�>� I�?���_�H��sy4��^E+���Pj�T�m|[��jTlVE�KuXz6��Ē�b���!*E���D} ��`6���umM�&O�-w�����I�ޓ~�)��!ifY�����'�/�L����ٚM��a�
���G�ޛa�8$m�VF*��CT����@�J��R��10�F�lDN�����Ȓ�rU�ԓ<�n*1�&Ԩl���
���]a%c��v�_u�՞u�)�֔F��bJڄ��fJ��6",�1�A��G���h��,��&�����wD�#��n�)��HJ�b��}��9h�'�u}\��ݑ�����j�I�e�&u����Сw���n ��T�ǈM~�,Q�hc���,<��� �GR<��RdKn�PAuyyG1��F $�J�R-Ȑ?�<{P%3EQ'<�P�j�K�獂�����jȠ�s�Z٢ZƌI�.QE�e�*4ޥL�Oj?��4��@-
�_hVV �tL���ښ5RyNeE!ԬfP����ai=yTi�	6�>
�G��/�T,پ��-KS
�
m
AP$��}K��������A�D�4�3ХG�
��cm�"�;Һ�ڷAwL�B`��(��>�X#�����lR�f�h��e�Z�T7G���,���/�ݑ�:SY;tu�h���D5MR�"=(��nLT�)+��F�� �
cـ6��F_�<uj�8P��h��`|W��H�
`��r(��>jkSb�&�ѣQ�2�HHm��6�c�&,�.����Ԛu��Xe����L[�)�L�@�(\�&`����ׄ
�B�ߨ��L����݈04��	÷>W7 fV`�(�����c��!F�|M�x�<<�T��h��~���D[QE��U�:j>`��ZɕJ��&���<������og��m������� �2$�%�2�mA������7�Os#����s_**�Y��%�(���?��B{EH��SD�����|�As�ƴ"1�:M��.L[�o=�>�Cj���K:���nuW�n�������Q��$2C���%0�/t�304���E����0���X��l#�TA[���/T��R�%��"� 	�}�/�T�`�}�
ӑ_HJm� U��	>�;Yh����"�*��7�\֑��d�0��N
�O@�%@ы�d��(��pf�U��- ��s&z�g4�?t&	|��45`ڷ9��/ޙB�F3E}P
�f��\�NG��@�;���+`LH��!c�:{�Nd��o'��U�;�[�ˁ*���ӝ�"�,�C6�4����E�.�Yb��8��t�� ^���8j�
'&��|�t���x�����?>a:����bCb ��5?�-i(�U�+I��a����21�G�<F�[b"$����y�`*��LN&L7o��ॉ41gf����'�U�20�uR[��k[�	��4�k�(�q�����cSy��={C���j�֧��;��1��j@_��Ğ(�i����{\BQȀ�qs��PxE]^��=i
PT��
���F�E$�?�+Cj�		�ޗ��.�1D�`<p�y�>�(����ӧ[�[�;���Iޥ[�P�^�>�RA�\]�$l;��_�8;�I��h�P���=���}�kO�pGu"�G%/Td^���������p�#(�����c���s8�q����m7�EQf�	�/y_�	���В0�@�G�
�����_��ȟ��Ƌ�bNT�*���T��}6��G�[��*�!���Emkc:�'�;Ý�\+�=�h�0G�����V�T5p���MgmB�.�GR��$�J�	F���	�&����mG��;��B=��T6Bՠ	�|�3��wC7�}	�P�(D2�=W�6��[�f����p` "(�x`A���!y�)�Ð=�]�(a���E���#�\�!si�r+�i�r���(ęu�`�������tEE� ��r&�+�Y�� 'VrV'�ӰH�SkJt�6��\U����-u*Â��e�h�:���N�~ȱ�E��C\&,�!�"�����lR�fP��M��Ƨf��5NB�p�R�ƥ)6����"Ԃ���~c6��
�~��NU&�K{83�s���r����'�7(�U�oƘ1e�'Ɔp <H́08�'`�h�j���`\{C|(�4�)p6���wD��L��	Z�R����Y:{���vrY�gWY�Na� L&�;�=˝e�2e��BOD៯|�ǆ:�j�������uW\nd�JV���Ჱ���빒N�����SRMN=���{�Y����Љ�Pz|t���Ó�T��r
U�1�N�l�k�S{���{�(��<S��iN6C6������'��]�0R{���m\a���YC Kǚ0LZ$��d&_)�C�쵔HeR	�5[��r)�J���L)�\�����B�/U��\)���b&)^3�b�Rt��
�|*c�Ӊt<U�_S�\�X��2��`V��3�,1�O���&xq�<J�t̑C�X,�s�k"Y�
��-�ˈ�;%@��R�+���f�d�N�k��D2���
�t W*��͗K��k,����S*��1њ�\)��M咹��7����U2�)d�k,�Ȋ�W*�l:+^��B� X%��XQ�Bɲ�5�K�1ZP��ۅMaaE�"��ji(M�HEi�x9��i�b>V�҂
��i�b��ϸ�
�b����r�<��|&_��VJ��7-VL=���J1��+e�UwZ�R�
�|��^hғ��v5
��E�\��Lz��-�㥤;-���+�H�t&�4�_e�i�EO�c�bœ��beo��鄫آS�4�/=�s�R�W��_�v)܏�����Ķ����"�g��JpoT�8���U�KR�{�Tp��y<W�&�~Myb�����u�]v2IҼ�b��G�5�����Įx��MwU��<����ܹn�_(��F}LƠ�������l|h?ΐ���a�I"s��x���AT�G�]3
���c��#��11X)5��Q(� ��
C�����Kz���*�H��Z��#�P� �b`�+_f�z�Y��q���`�h%[Gڔ���?�)ҽ4�n$v�l�t��hkbW��7��
�Φ�wt$g����,s�m@V-�';b�Fnַ
����F�zk_rH���/!w��r���n��M+� �!�Qc[� Xc�m2����1>�
c|HC�` ��t�&9T�Y�A�6���"��'��m����p��'(��wh��lۤ��]���F�ݬy�9o�it{�x�����Xf�Q��0���`���6���������0p�gN|������!�0�$c���-��O�w��%��I�wM?�u5�7-���;�B�?C�il�g��y����?���M�k��N�(:��(��?&��#r��ٿ���Miؘ4��M���q:���Νip�@� e�)�'�I.[6~��X���[�Y�$K�[	n�߄E��z7�����.(8v�k�Ivտ��Ta�����[�!�'�U84��pa�{ow�Z�>a
����a�,L�&�{�G��N
��qch�6B�F4�;�?$�c�z�
���E> r�C��.1�|	�O �aH��BW]Ғg���BeM���@�`�O[/��sa�=���}���/#�V�0���r4|h�t,N���j�m��
 �#R\��yњTGP+�|6f�
����T�d' 'c��c�jlO!�ɔ������[���&����71̾��X����tK����hYXVa�T@�"����8����GϢ�_v�� F�G�AF!n�BO4� ް�.��p?$9UBy��.�^�!�u�����(��;'.q$�I2���I:�c͝'C%�@L�B�TH�{�T��U�{�	p��>ڲیc6gw59ё8�� ��"�1:�;f�`5���~���b3�w�<���'��e���ݗ޿�;�U���;�+3j�h��ZyaB��ňg�
h{{��R�#
��~AT8nX�L�Z�{��
V0�vH�6�,�c����i#;>�%��s_����%�.DH��'��e��|�h�7����s�4��蟓{i�"���� ��P�~ M9�p�9���_T	wX�U�͏Q�F�%@	O~|��2H/�ķl�|Iu�c�`��D��H�y	�6a�a[�i=o ?%����}6ЗA�rq��&v୬<z�ce�%�A�`>��Gԩt�J���̡����y�JF��B�� Rk��ɉd��j)�#�&#n���lv Gz�LH��wn[^��9	>���@F�8XJ;d�r�\��*�=�p��낣;i�8��Tܬ���K)b����� ���f~�^if�]�29��6�#�h���9C�T�,$w�7��Gܞ�'�7����N�#����z#������@��A���̫R�ϥXP�qp���1�t��JfX�A��&�p�̈́e~�>�����d?'������e�t	��SuIJ�|
�V�݆0���0��Vc�'�����;�tF/��0pQ�b@C)r�$!1��D���/�we��D��0B ʀ�`�� �.�t�>Z�Ǆ=���U���a��b@[��ʅ�3���Τ/Rx��9��u{݈��� o���Oǻ4�.�K��c9;�C4�CKD���Š�{�<��k_�k^�M�A�xÐW5]��*l��~�'{�?D�C��\��c
 ?�AH �M�`qaF�u��q� *"2�0��
�P�:حÞ���%��>\�f�t6��2 o�O(%�뇏%����9aeL�	)�9a��D�b���]���%�HgP"�T���*^0�ъ�4z���R̖`���	LOd��l������!����H�>����mM����&
<^E"�_�'u���� x���)/N�},�"d�/�E-x�C� ;�@T0���@�L/_����f� Qd�����yl�v�`f�󡝑�$��5��0U�/��-�m 8�24��{$5ݔ�pz�A��v;�M����$b��o�4��:�H�#<<yL������kq�~�;�G+�8���b�i�<�r,	$���jBitAY�k���ʧ�z��B�`ί¤ش�2uu��,f\u�̾sߏܫu�.�4���^ �!9����b;pym���k1���է�����<��$��J�3�Q�^AK�X��s&5x�h&D'V��~4������b�v�S��Ԕ?0�f���bd�N���'e5ȑW^��͙�|i�	��e���A��t�CNE������g�{C)�#m��b4�>H�ø������V֡������& 5%�Y�t����3v��ߗ\+��A�Iý:�!�����3  �.O��;��W���rDQ11�/�� ����H �4�
n$�b�O�IL��3�2���C G�d��� �#�q�c-�e<u��|w#.:>2�c�������	���x�xԞ ��V%��LR�}��Z%���%���)�i��a�1�ѡ���5al��i�kS�C�A�f_R�j}6X K����ké.4ӂ�c{ob���
�G{��z`gc�}C��I��	�#G�hNS�ݐdǌAgW��;�'@�&!��Bg��́I������i�#�0��YV _ZW�p�7�̺��Q	��	�G#�T�z¯[��db�g]��^	����ތ��*+��Y�����/Ǘ�O}�R�?�3����/��gLL�Ӈ���/}kӟ�/k�z�u��C����_���>:���/�Ƴ�ҧ���#��C�˷)w�JVǀϿ�d��d\��sG�-X�[�SBl��_=6�J��Un<��@B.��k�/u���j�ɗ����KE�aL���<�h۞�-��bQ�@Ӑ�"_�?�Fw��=�
y���_nڥ=�� ��+�7��{���U��+Yi�MQ��_D~������W�".��M��
>J��&��K�p��#���6!Yu�N�P��r;r�#�[��#�����ߖF�9y���@E�f;qf����
��??�����ت�'$�?� �6G�+�*&�݃��/��
tkY1�W�4�1m!WH�ٶb50�Gc��QG"����"�IS�i���_��� �IPX��\�GQMDTR+��O�Q�'�
��X�B�\(���H�>����n�!�rp�b�'C��%I� �� n�I� :��x�2���N��*�IG\�X��""4O��Ӣ��4vN��Eu8��̅w*��*�G舾�6/�q�Ht�"�c��A�c��������A�z�{�������(�����'q��GB��	�H����	.��8�أ���z�����	b�l����
�I�Oz�70 �h��%z�YW�)\�^&�{��f�%²�3;
��؍t�9�օ?��s;r�F�e���^ny��hf k�(s�G���i��Ĉ�4t���v&A��.N��y�emP&X#"�2���c7՛dcJ7��ߠ+����M�:����%<���
ì�Е8cT+��F�v�
=�N�ix�!�~%8��`�Mdćy�d��k_�a:`�J.�kEd���q���GZ3�=)
�ziN8KtP��,PiA?�ģ�n�IԦ7�|C�`I�I�P\?�O�%*�М�(oHͤd7^y�����>����];�i�M���c�R�\6��tf�s�KL���y,]rm�٫4b��Á[��Gl��JG���v�;�M_[�>dr�-��lGv��1�|s���Ԥ��%��}ST�kx�8���1�N^���J��j�dO�4�* ӾYT�U�����Ї�q l�7�^�Q�K�F�۔�Yb�N6$��Ȉ�g�߉�	�ЪV�X�Y��N�Z�s@	?:5$F��vB�1�z�D_���c�����G�<�?E�����r챕��e
���D��RX�%��!�J+$����~��a�f�8
����Q��	; p���G�n�.iDf�7U��sO��U=�*���	τl����B�Ih*�l����f���eES}&�X(���XKRć����+!��iXx�01Q�
}�2�췩��jNg搊˫�ӂ?��R���gH"�#H�m:�����H���z��dt2se�U��U0�4�ua�� ͺ�˚3y�(�QꑀC
��m�C�My�m˷�\�$c� "Vb�2 ,P����u��_�{�Q<rĒ3�C����Ŝ�'�J
�L�d�9�#$����~:Q-AYb�J	�j�aN�O�D���|(�����8�p��y��!�e�&��m2��
�K=X[T2*	H="��(�~@�˰��+R.���(������u��[/�w�K�=�tjE��f��q���aX\0��wR��p9M���y��8�ly���>G,Ө̲c�$wuc�'pbg\��k�P� ������f��+o�#{�$��MG8����p6�}Krl	��M��X�`��+{O�M�����t�w�����<XK��kf��3W?�T��0��,#!r�EH����[8㵩��Qr��
�uD���]Z�����'����/I�G����3������]'���4OQ���Q���c~���)�@l_�;S�c]�!!.�p@~�v�D�E��Q"�s��'T�=�N[�}�'1�䍇Z�?_򹲂5ku��yt&x ���F�o��ߥT�������ׯBoO� ��>=��ߦ|ڳM����2���W&�[��l|�L���x��{
����8�"T���ʞ��Yx}�dW�#
��|��l�Z�Em���
��{ҏ��y�����F��0���lV��.�B� �3���A%|�K�;|7������J�+��8��5�C���v��r�� �_HAQs�H�d��b���ޯW�г������k
;.ٳ����܀�A��n<�,[P���"�j',������,p�Gm,�	E�3Y�>T ���҉ H�nߔ���d��[b@�T~�	��m��B�'[�x"L]8����oNq�e{��y��#���I�����Q�zϹ�T]�L:�'���S3�#w|<��������v�(,h\�^�ܱu��WK�������k����x��1�u�r�u�5����� l�c�*U� �o���H6{��qo�v55���>�D��#M��@� �'@��%@��95}5��6�Cf,
J>��:Q�}���u��^Ĳi��e���l0e*��=��i�,	�$�g������(��f���-
�P&�E�g��2��(��V� G�E>�Z~����� !1G����08��)��{�UPmc�GƟ��Z�����O`N+$ވ��"c��o �#z� 0оY�>�B\�ϧc�-�Hr�A���bۤ~���r�gf}�b��عJ��Ӫ:�)��2 N�c�uT��?��&�B|�ɛ+%����`:�أC^T��,�\�X`�\�%p��*<e�0�n�ö��@9	aI��
�q�#�2 쒝��:�L�%��5�.9�ʍ����F�@����NW����Fv/�la�'��^������,�����/E4 �#����`�ej�=��#�uI_`/�я�"9{K�Bǀ�F?�D/�
�
�&�de^�B�h����	�����zWLsGD}G<���g]q{��Ԅ�W��\�}��%��>�J�&���WJ4R~9���9�#��#�������+��\V�&<S�����Z(;�����I�5�2N?��)��圳ll�m���~�z;,=�N;a��OY�#�-G�)�~��s\�7�M�	I
}60bi8(�v���(�.�
�|��G^���x��G��]�Q�(�f�2A��x�
DY2z~�
~!��É�
����G�<ژ�٪sJ����!��"��
r=O�AH�>���Ʊ	v�#�!
�Q`��DLa<���1 qӼsZ�
?��88��>�'�_���̴ɉ~�_��Yr?�&���`lr���܅3x/b:���rq5��^w}�C�)<���0��O�r� Z�氶�X�� 1ds�(��O��]��پҦ�,1S�-ȓ�s�Н��d��E�OIJX�q>�!���n�=GA
�	���9g}r"��
E�[+�=��1�8 �+��
��ߐ�}�WOIl8��~��/����fo'�\`L�o�'9!��K�x@�h3��\
�Q5lZ0i����{�w�})P��d��Ot9���{.�Ex��Yo�,�����~D�F
�+�
�'��);��1,��L��!�S�q���fyj�������Ϗ;���<?�& "����[
�m��g흝�?6���6����`��n�׆�<}��E �
�<�E_��^�U+Tf0��%2�X���.�
a�P�b# ��փ�������}"sGx!�ş����?*��獑
}�~a_"%�����I:19� �^��g|��1��ٓ�= ��aԎb���}"�� 3GKB�/5'�ɀ�_�x�\��Oz�.[7��� �J��
�0b�O/K���Z�0����@G�Vu����� H��b̊G��`k�c7��X9U���M���9�o��h�p��{ck]�\�/gZ��@t�l�4����P:Q��V���z1y0Nj��V3zvqR���ּ,^�-����ˢ;�
zu��%��Q'���Dm�,6�����U8����Κ�Y��0�V�����N�:oZ�HTU���i�Y]_,���U^�ez�������Y�+���/���ˋ���:r���Um��k'��F�l�P���F#U����yw����z':8Q�B�|UE��d��S��/���"6(N������]��\�b�R�4��e�Ԙ*F�a<����Y�nM:�N)ɜ�/ˋ\���N�*m��I����H�͗� �荒B��b�������EO�7R��h�P]W��e)[�]�M�l��I��H��x���3���}u\��/s�6�o%3�X|֍��;�E*�p���#�S(k�����3}�Qm8�����Y���N^��Ѥg�S�I����c/���9�<ϖ�}"ީ5Ʒg���r}Voe.�Ș�e�7w���:��zM��Bk4~-������~�Z�&���Ŭ��#�C��9k��ũ�����if���wb}�6�N��bIVg������("�F/��z�����4{/ߦ��\�1~�W��U#u�?�����߽�
M�U�'�F�7�w{�~>{Z��{�uIN�Jcp����y�6��+�Y55����Y�tҺ�O�eeW��٘�%��%�yv/�J/i}��ņټ���/]9����\�]�/��9���y��O-_�Am�\�r��~V9�ߞ&���mz}ߌ���j����n��n�8�4��u�u�ru
��l�T�^_�D��N��Q+׊����X�K�lj�#��us{�<O�:��'��
��
���)jS�kub��u6��ؔ�V�?�Y9�,��o����:���K5�U<�үJ/�rtj]}�ժ/�X�4�i��u�|��j��k�hoO7��E�Aٞ����V3g�gf_[��F��*���xqQ�O����պ��<,���Uy��]�fg��ibP�Y�^���j�p�;?�4:/�N�9+�T+2��\k�|楞�keK��8}{3�.�g�\�r�Rj���N�l�A#��Wi�d�sv�M&�J�~�{]_��5e�>�&�ʃ�P+>�Z՗�Q�܌?$;��z�-}6��/_��Ec8V����&�����^�,���J�T�z�l��-3UbF�������0�{.&rZ��k��+p���r&�H����jp�Z&��y�][������K_�V"����uIm5_��frp5M^���J�R���<(go��d%9+�f�/��d����h_����z��:7/ȍBL)F���K":(^�����7�/Q%u�/$Ϭ�L-��tn�kET�~R�K$�x�2)+�/�k��du��6ZهI�<�*�I+�+tRj�s�i���h�|N�N���1��B1�O�׿�]�N��ժd��x�6�_6��-���\W��I���'�œ���.�h������cg�մ\	�����m��_\e#��~cq����8�*�S���s�v����h�~�z]ܜU����+]��ӭQ�l�m�.���|�(6�%R��S�w���T�%����I�{�������jP����uj�
X����b�3 ��Łn^�
���_m#�����x�Z//���M��Ro���zU�J�Vyx�\z��&�B-�2�D�O��Zi��Z�V�Ui�����ӛ痕�sS6+���Vܴ`$z��
�[�g'�2�G��e�<���'W�c+��O�F6��d�d�2l_��n����*�絓d'�n�7ǯ-}�L�`���]�֫g��C.������z3{��t��i"�{5��k�$yr�_�k�|9S���7�a�X*���M�
�6��,R�έ�N�dg���CJ�W��+}�I�F;�S�:c�
�W��Kg�
ԅ�.=,R��ɲx�+]\U+uxoԕ��H�.*��m�g^]\���I�ݩ7j��ތZ�j�a��o�J�j�n�l&��W�L���T��T�)�������ig��j�hU5�y53h-n�Wz�sZ<��Z��>Q�f_����w;�j�F)wv���e7�-�:-�Zf�u��m��e�n4��Z�k�
gFᥟ�tk�
���%��ڭYa�\��:�H��͝7bЌ��M2ݻ���g�Z�F?���走δ/��~�+�Gb��ļlץ��꾞�G����I�Ί4���vP����3��RUR7�Ź^0��nI/&�DTϚ�B���VV�(T�j���ԫ��vqRο޾f'ݚ�0������e�z�_��JsY�ͻZ{=��?'/JkC�_-{����vr�V��������F��H��Y5~9MSk�jh��u�S\O��2�l!����&�F��Z�F[�Z�y�+.g���
狁u;���z''�r��DI�˳����Jm�_j���������\^,�/�k��v���oZ�y-
N���v��S͇�L3>l��|�r�>i��ϝ�켦�N���̨��:����-y,��^dy��Z��IE�>ǆ��F���^%�9up�x���촖��Sw���J��6��lIG�U�2n�n�^3'�a��[����M������K�e�xf�ϝU���Ui��o��y�TJMW����l3�0g�����4�������d�N��v��������Z�9�����޼޾�������FlT��m�45Ѫ_�Z�\���F�3�� g���ϯ�����]��D���J)6?iuo��J��'�F����M���|���{�rpR�/+�E�XU�/����T
��_�j\q���,�W�D��t�7�B�3M���=A
��  ���� |��x3"��=�w��e��8�2�9J
���S����� dv�b'+ŰS��=ӬB,�D���жi��T��g�q�G�
�ǻ~CO�º���������x�F~oY\�
���t#z��E�v��D:ޤ@C8��ZSWi|�{T��od

�\l4rJ�^dp�d�C��o�&xe��25E�7�
��8�]�=u���{0K��&�qł��`8]�:k�X���<��®Y=WW���UX�"ߊ���<�ɾ��Y�c�oP8���>8A�U�-�&=v��񼰢A���_����"y�ް5U�C��Dc#��Ő|D󊔃_?/�~�MG�G���Kxt��6l �-T��6���t�rT4=�{�E�P:�Uw��/1
��غvr����}:@���g��]�A]WH-^��
C3F�p���J]�A��b9ޔ��s2�+Kb6Ǿ�2@b�%�����d�!{��1�O?_xsn�M�	
Q'
�ߘt��[/��l�����ug+^����:7�K7S�����$�&.a���6��4���mS�2d5�Rp��i~[����XBDM
P���!M�E`�DmqPj��A������Ց<�C�;U��˹�2i��ariɾ���h�w}7�2pwzQ0X����y.o�y�G�wx��@��l�~�W��Ď�5��:OI�-O&�*ib?��J��y����`��@;�T�~�f�b=��ַ	I��
^�M6l�4MH��n-+�R7Ԣ@�C%"��mE-��<���<�`��C�ʢ�U0=i�Zإ4v���J�o�v��.�]� �@^ȾK!��I3 ��[1���V���(�F;~�В�/�	������ ���������a�ݗ�/��z�q�N1'z�n1F��' "���r?�9�N��An�|ڍ��7\�#��.���M���K�����[���7��a�ވ��]����6�t��8
NE��]���\$攜���e���x�6Ba4�������֙�m�ڏ�������G�[`U����8�����.>0F��l�!�Y�`��/_l��}��=��n�j�on��������në��tU�#v�P_g�w	~șl\�M������^�)��i@L>�D���w3&T���7�O<h������J_��W��ꩾ�d��QC-��3�B�\�u_S�� �H�D�	B�>R2u�\�HH1�Hf20��8�~`��}���bz'�
���g`�u�$�"9�o���1kՂO��6c�{�Y|O��M2F��Ж*`|&�4����[!Q���;f�� hZ8c:cv�o�a�~]_��Y�@�ϛ��a� ���C dB�*M��#D��L[�Gmmꀻ�o����(fI%�t���SXG��#v��X�߰-�G�p�<\Əp���,�
��~�D���(}u
V��2�ʕ?�]�:C@�N���Y
w �.x��u��}��UM	�<�|��C.�Y7~�.h�%�����R���M��^��ip�OZ�4��}a���/"������B�Q���������BD���	y�'.�W����;��+��b9�o��
NŢ�<_�f����{J�T��(G�<����ޱ����8�gwۂe�_�1�+�SLX��
���V-G��$��O����6�B�(��!O�e�o���C!��z��8>ᶅߛ+����݀m��	_?܅�g[\yf�@���4o�*"K��`�pF��Р�9yo��>8Y��3�.3��&҇Ԇ�-��ӣ��s+?S��ڱ?�=�GnEE|�Q^Y�(p����/������=?���x/}���
r)s�,�q��V�L���.bMX:�h 07k��>�g����֧�S]����Q�c�k+{�vm�@�M6������ok0O.H�A4�H�Қ�`�VV���o�7�k��v���k��wo����kg3�
��<����q��#	E���@(;����[N�7h	��|�����W��X5TV�4��*~V������S����?;��0S�=� �&�(ˈI)v'�+A��K���$�;nP�>ξ<N��Q�x���w��P�o��t�T��[}�4|���$rT�}��VY����6I�N�e�H��_��l�/���}_6��6������k�;��O}�$�]�	8Cڠ�$�O�)�z����(!
��iae�|��h�o���(�{������f*D��$Y�|�XH�#����p�;4πr.����hv���`G&d @&��pD>�l�tS�Q�=0��� �A�\T��x/gj�^	uL��G
l�4`���
|�� ߺ�Y�
B8d�!;��'7
]�z�Ad�Ā
��.{m����h=��a*LT�I�w)�%wk0���w'����_?��Ͱ�s]��`�a
�I�Y��3N*A1Gy�������Ԅs��5p���$ܳ�o�v<�	|'e�{��%L�_�����Dw��J#{0ɹD�ٹ�Ƿ ��s�Cĝ��� ��K�Y��q}�ÏdJB��O�ո��̊�Xn����!$�2����F��^hs�l7��\;�Y�)�O���m΁��Y}gV^d��˅���,
�;@v@l�{
����*d+g0B�^<��q��jO��݀n �>��/[��݋�N�n�(�9~@N�qA�o̱W�6f�'<��
��ls��2��
��=q�����^��'v
z'6�	� �m��$����!p�(�|�
zG�̻0ccxVn�w���gZ	�$�Q
"�Ɲ�_���'
i�G.��`K�~�"�<��� �nm�,C=��;wS--�x�K�lW/Q[.�o�?\�[r7��U�Wlֻ�Eڈ¥d1;���#���W�4��$�����?1��Q���q���.p|�k0���M�frH�2���[):��������ݥH�X�Ď�H��I|KI�U�cD�W*�z��m���>o4>����UM�9�:*c����PU���
������;F���n
�~[<V�7,�v!L�KEf��c���}�/��m/v����(������.��mdO�踻�2Z��{7���,�-�8|B��5��68�v4���E�x�d c�d+&�F�Xqv����"���-��h�i ��vv�`L���8��Ⴐ�x2�6�r	~;����v�Pp��/�fo�],B"|A���Lj"(��=n��8�}H?-��Kx�n��9vK����	�����ʁ�񓔎�Xhó�;-�՚Pp{|�V�aw4��g�>���]�G�'9������.es2�i�.�����H�F������ޱ�6R?�a	B�\�^�CДCP^ET�VUu�&�v!/�n����۳��ƛ����g��=�����&{|Ŏt;$�I0k<�͟^��=Ir�>HTLA_� ����ïq>�Q��{���%�2=]M1P`$�q>L�|v{�!�=�
��Q~U��䧬��Tw��Օ ���2 �+�̀y���>;�v�_:y�������P #2\.v��	@
��C�o~(�{���]�8�rU�JǊO�4o�I��x�YE����q�r�H�V�@�1��L
)���&���m=���H���WH94��3i���\���.���'wU����S��⟎!��"��:%V�y>�e�
�~?��d�ly?�4����k�;;��w����t����u6�h0����ߨM/��KL��$ޛ&���Av��V��k�#ȿ&�ط��[�
�R�ܛ����=��'7^�.�kX%7�q��mU�vw�>8�Nǻ��
Mc��%����a>o���a0��x�-�\��G�m6����E��1�ٷX|7�dp!3�S�abc(�a�j�ر﵉���7�`i1��R�#Ceq����,TB
!��G���
� �kQ�D�>?�8��bb�椺�͜���9x���m�s����Wi1w�cϷ�gM^�i3"_U:k�;C���Hz�cC���e���u?����.��ܻ���U��s��x���,'�B�;�Իf�x� @l����n����:e>����q�[&GzA���%GhJC&s<͊~�3�P�)O�r� ���|�
K<�[�A/�H�N>]�e"�U���!��P������]cP�u'9(X�L�wU�'��o�A�ɨ@8	/��}]n�������9�Y��J�x�,�>��on'��-d{H;KJ@�x$o��^�%P��������x�RSW9X�/�$�<JL��!*F�h.`م���^�
�L$_�b0s�M("�B�߹d<:�3ei�`o�WN�K����
��m�iǀ�2؍;I�[��RB�"�CG����Q��:Q
67]��V|:WF���(�K9�3���D�;���i��+o���CXb�:`�
���ά�Q�@��^"�(]\J�D��yӹu�[=����ɾm�� ��t,I�#C/�N1�^l�%X�l�C�-��K(��C>A#H)�|��es����þ��J�����/{؂h<��YI*�e��D���zk���1�����'pe���*A����#w��������C�؀y�~{~�oe���W�XjŽ��t��Xb[, mu�ߘ����
h��IH��g֡~�zA��p�[�RvyI�?.���*����/WT؉�+B\T��қ����f�Y3�F~�v֚�A���0���,h�ѣ��a4�*��4���0s�
,�0��v4P^�u��#�cn��
j~b�i��&��~����X��~�
�d��v�v�m��t �)NҔ�R��f��&{l���T�Zk�U�!��#\?٫�X��C�y򋥜�;���r���϶��g�����<}z�b��e���(�ʋ]W�M��
~G8�l���Т+{
�0A����y1�f�k�wf�h���1�z�d�S�,�Z���ůVF^�,Ys���De�}�2O�e�t��s/�rc��#�
�LP��O]�����R�ڸ��FA�O�xW^)��
�R]jcU�����o��B�6:��n��d~`M�6?�5��	�[�����[�-ZO��E�����a����|<I�Ž�/nкmڴ���?�5�5<��:�E���q
/��*���z��D%�Ar�&Hܬ�E5L��8�+�~fM��ً05� ��OO�E#$�K�e�&����c�ռ�|�s״Z�'��g���x�ч; � �t8/V+����5��Х�3J�C ~ɕW�WG_����]���S��JGD�L���}��d�dj��a���J�u��)X���"�	�߼"��Y.�8T�g�
�
�lԁl�?ٷ}�|���'��y9���fNH�������O�;��Lvw�j�בK�D*󡼙�pi�m��D�������Pa����]	$0��W����~��t/tm9	�bd%�����V�7���P$��Aj���i11	Z�d�M���69�������) ��/vO���~��=k�_�WӪ��].���$X�x���!Kѕ�rr^]K�G�i_�F�Ս���tv����ƴG+"�O��zS�3U�3��4Ƹ%^s�ȿ3��6���������iu�8%xvVB-����Mn�|�i)6ʧ`�N��1���]���mZbT�|VC@_A�4Gr'A���6P�e�
z �"bt����)�1���6���Ȱ��͍�l>j�S��nW{q�M��������AMlOl�/J �T��V=�w]5�S�|'���	�&Sv_����l�*y��X�2]�<$�*�i�OnT+�O�%���^�.�=�t�XT�N=0G�+г
�"�������y����kN1���]E��8�R��B�O�P������2K$��?��u��h�j�!�:뉲Ui0�uL�7.,Ә�+c�ؼ�*�W�\�Sm��2�d���цY,�S���`�����U��`����e� A\	��]�E� �
��H���SE�3�j�� ���D� �C���p6�
U9F�z<���1G2��?�0��2�.��x������y^�wu�N.��z�
��j�ވl�U��팱u�mj� ����`e���nD
F�I|k������Ӊ
����fQ���M�vW��<�3

W���z��h5I�_)]��(JO���Tl�D�e�[_�2`��Ң�L[�˓�[��@�0"	2U�N���g�2��6;�ʍ��"M�E�!���x4[\�k�n���z�"}��[�1qP�&��}F�t�
"�$  ����gB�����@�j�E�bLb�G0���]�"�jV�C�$ ���m���(��@��2��T@���:��Le>�[�J��!IP�I�
�/L��%+�X��v]-@D�8o���|�d�t�T���HQt���̞x	+�q$�S�m_�,�w�Ҷ%.=�1ĥϸqp��P�EA+�苏��J�a�܏$�Mپ �@�E�������=�k4���Ѻ4�Y����:�*�m��B�U	֬Ot����v	�kW%�h['�,�I f;�%7��z� m�f9WD#u���D/����S�#oUn�J�b[1^G���kh(QL��e�UX@�F��+t��j���Q��6���
S���e�`��W��N���0�_//لk�<хj���Z�@�K���}.Fw���
�X��)��˩
�[c�鏙�-O�����",���1�/|����]���ct�[���M5�����_�p]��בZ��*8Ӣ_\�>A�����-x��ިϬV��I�
X_#5&sL�`���v���&�?��X����m�z4�[�U�6�ZTg;�>�VI�6��tdHVZl��R^�.��uݞ����+�T���d� |=�[����dR3E"���a���/�b���R��F3P�YZ��{8M��[�Ί�E����+!�
�\�k#_����5Ӽ�o_��
�R��r���f��goup���FX���X.����#�Jr��t���;��\�.Π�%XY~��F�$*:L:{�A����q]�nv�s�Y��|��A�������.�f`��umm�>k>d�N��w����>	�3��M�����u���۸|�P��E���I|�^�\�{;���`M|K��;?�J��}�B�҂�Jm����#���)�hRg���ۅ!�u�ƅ���
��Y���*����t^mꈕ�v��t������c�[��g��`�E/���%"6�
;�A�bb�`'�V5�.�xS���3�*�,�mA��y�� ������n��6�6��.�M�շ� ?6��Z
��ֳXb��g1wW� j�s����w4��M%ޅ�ijҔ��4�Q�����O�H�RǤ��PȞ./)%Ϛ��g��wڍ}��C�7�y�~�1��2�B=�	Gw�:��'b�eG�G�/"����^�P\]�G鬚�M1WE�G4b���5�����s���
E��q%�?^���E�^<�:@��ui�J0=�	wC��ss�X�eU�)��M&d7Ǐ����l�*	��Deߤ-6u���'~g��a�1t�^�f��
���!�6��:wZ�#����m���e�b�_
墣�m���.(�޾E�����bW�l��-q�ą����D��R�N��JvweL�PO`R 1v�����a�,�3���¸gh@�k��ǾA�L�:�s�:vM���+�J1�,�b7:���J��/~��zF�F��R
����:W"X}*W��!D��^�ſ�0"�x��a�0�rp�G	��������O����尦���A+�[a(4��D�B�!�Ը>��u<D	'���)J�z,��<�2|-b^1��z�������ȉju�Z��H���c�"�B�)]v���\n�UZ8Y�u6���'�������j_�TB�#~"2����TܟG��Y��j T��,�ů}-V(��2A��^��"���[��/�wQ]Q2]>�F�Z�
�����m3d���¤C-+���� �2��ß���\�z�9����:;ǉ��o�#d�z7.䗨�9H���x����˼(��O�'?�(�o�6����5\q�cOb�
�]P~웜�P�'m�#Y
�<�����5�"�[5��h�F�;�o�Z��bL-Ę.Z�1]�Q���B�k5��h�F�,E��d�-��Xl8��g�ᰐW�rH�R%����� ����^���GA��q(��	'ɍ�J�x��[o���8�8B��4*��϶�x�HZ%
L;�4�������(ju4չ�s�����	{�!G.�М�P���d@����{l�KD�ɰ�y�+��C����;T��8t2\�L2��;R�����k�V�N�Q gR�K�Cu �ɿ��q��?
sa$�����ʈ�r�Lx,	i����wK��[�Ǻ}���l����/����W	nY�6���Ҳ��jѝ{D�$�-��{��A蒑;-.�)�4}��|͋Lj�YZ`�(�7�2��Y��h>G*�	3q-}>��v�$� �9G�c��{�[3�'��0����h\u��Y�+ ���Я�H���4X}�sko�qe!H'�i���F萶3�-2��`��!�L)~Vy����; ��,Sc���#g��Дv�,嫯�����,}� y�,�9�3͜������8���d>�����7s�r��]uΞ���v�P�����d����J�r����sMX��'�9����|��K]�ﲛԄٸ86.���#�n���� _�ʋ���l2Mj	�$�����+="Q��?�'��7l�
�����7DLC������s��Zt"DЖ��F�O�G`�5�l'�9�����z�Y+q��4ˠq�4yh{-�*hAC'��b/Q#�F���4�����6�j�'�����x^~�~�"��H��^�^�4��A�
n ���&Ѱ��{H�M��*y�~ q�������īA0�W�g��� ;�����3��?ӏ+��=�Cu9�ĩ�%gћ8��.`Ί�C���y�uS�:YZ��?B�V8ot@o����Ʃܪn��Ʃ�q*o����Ʃ�q*o������Ih�R�?���%���14/}��"C�^���w�ubc5
?��<4�|��Q58�M�w�}���{����彴�vD����_��^D�(�f7����~8�9zx�:N3��q�E:��������mǿ�t�O�u�ê����q��{�n/ڿʋ�Z����K�2�И�����/�-�p)�Mt{��K5^�X�w��r��Y�P- �Ȧ������t��1y�貅o��ݓ�����I�qR�<�m��k;)�f����r���a[��b粵����_���':|$gP^~?��YY)�2����߻�Z���o3�Iq�����+ж��^�У��,�����D\��ת��c��M�j ;���6)�~{�J�J_��
�Z�*&�������Zl�Vg熇H`������u�W ���K$+���JpE��rH
>�Lb����(�I;;~�J%���8�C���#�&�p������Ȫ�mU��4�@���`�2qA���_�m�r,בz)���X�-ˋ�~��~�@��28�*D�WQol���׬��,d�;)�����[��t
��x]���̇��ԡ�Jq�~������T�
���5�w�K�۴�SL�M�|�n�@є��ؔQ�ܔ��7�P��\ �1��n�:'� n,��6)���7��b��f�ҫ��z�����k���m
�Hj�P#���؀�,�辴w��R=VCO!@����⣇\,���Uhz/�Z�wY×���<zy���/z!����S���b'/��-�3~*�����r�ǉ5䒕JD��C�1�n�l��&��|�w�?>JG��H<��%��D踫�����0-��*����p�HI0��q2I������B�wҪ{|��k,�D���"�"�)�[�e"�$T��G�f��]QL]����"����w�� ?���O��+���T�A7��$�R�"��_����h	 �A�Om�^+N�a�/����eH���Uz�
|ze����a�w|�v�Ev�U�BX�^�&��^<����k?������}"�����|�0L�u�ya5$��>���D�J2^�GoDSMG�B�e���htZ-G�G}}<����+��`TZ�@�"k]e��ܦ��j:G��Z�A<{��Jg�{�[��y���f�z�&�L<d�<����"��T��D�:�J�D���:/p*�a?�_�n< D��Ѽ(�����T�j�n�Pi@���
�(�����(�)��A"����L�T�}�΁���wh5����"��	�'> �V��w� �V�-!��0Z���?�$��QlWYrk�D�+|'~z0!��~�9Ķ,�Em�bƮ�l7 lU��J[,�;�i8���zm� Q��~Q�����OY�m3�����m@�jU,�E� B����u�e��
�� �B����T?	�2�%ֶ�F�/6
�xÇ[��h}K?��������QH�[�K���r�E��/��C*A[�|LW�>[�PO��c��/�`DI����;UzxT$Jw�|�(>��y�NI��Jp��6�k���+c�/Յ'^�~Y[�5�)�0��"OT��ޒ}R���&bHl�w���USw�=���D�a(�,��u��s�zS@��yW
�@PI֟G]1��M�d�a�]�������3+hA�� MmT�`<��<@�l�4��O{K�\*`A�o��9[�q��$~@�õ���ұh���<P�y���c	��� �JR�Ә4sz,�v���W0	~~Ȯ�}�}���ĈF�`�F `��.�����i�JWG��p�s/�t���ᡎ��߮�����'�1�~Z
�_��k]�P�hMH�8 ϣ�ܱ��m�M&��{�&=7}+�$O��dZd�e�JDm��\���sPV�Y2K'��-\8���r����]�߰}��]��5��Bx.�[�#����� 
�j��r�첏��p7�ʤ,���$��U�1�J���t���:���t@��s��r�d9X�WY���&r�KҤ���b�� ����d�eζΆ��2���3[t*�)mZ^ik���ؕy�gZ8�J��
\m�_��pX��n_kh�ٷ� �:=a�+�!/*�]���-$�@��ƈu��xbg�q�����BF�/����Pk���{��c��n>/ޓo~���:�=yV>�{��,7�%nMq&� <ּų�b�;���$j�~��,�XH���a�L_�������P�$��]�� x綜�����/�Q�N�@0�,��"��E�˕F��E,2���(��h�k�w`�L���p	���~���dŖ�p�s�Te\cI����i���I�5*4��C]`�eծ��^6�&�jc\ugh��'&��>��Bc'Xw��\%�=k�N9�h��iF����>��R{6"��U�R�\�Q"C�{6�k@��{�T&�BI'��<r2{R�>�{�Uƈ��x��p�HI���0�����%2[�n���Q�7�������
�UN{�)M��?��*=s�p���{�(yۃ
�^��*�:(u��f|Ue�a="
�z6*`�ֆ��[�Lƾ*@���P���OrR�Ԡ�k�c'����R�:�r�Ru���T>��=-����c���8఺��:����9��,gv��g"�O�٨�������m"��f��7�
.�i=K��?:��,X�����tȮ2�ސ��&Y�X���)�6����4��ݵ�V�F��"k���W׸J�'W²���!X�ϳ�ؑzD^�:���qs�#���?C8 � p�^�(2�����[�0�����۬��K\Ln�E�L�F��;�[6�����"�1���#�'הv��?��B֦o�MʬoK�h�p�H'J�`��o�X�w8q^��/���-S�ۏ	�d ��9��8bU��|���M
z��V_GE��"������Q�
Q�p�b�K��r/��Hۨ��{�Ē."�g#�ȭj�,��W!������x qR-S���������pGs_��
�< y.!���sl�)�:U��8��Z�e;���2��cm�-�U�O��:9��l*i[_KB?�/������J��������䡺_�U��b6� Հ^a�틖�v�-=hK�f� 6�������@s�:��$���x(��_{z��!a��������P;1,���N��b\D�^WYQ�@�&i}>lz-Sȕ�ą�����Q�0�	�'��h���m�eC��:��TL��L��������slR�����ز1i�(������4jU&��!сI���� ���x������7 �����&v�Ur��VX-+��6m95�nS��VI�㼗o��L��P�DG��Y�J�F��&e=c����IСn7���^��L�]ǟy�|�q�2�q�oŵI��Ԡ�ݼ����f;�?��!�Ѹjp���&;Dw�<��oK��M��y�eb[%&?�f�m�����4�Y!c����L�j:���gc�F�~��1�&���� '�'��q7U���x����`�$L#^��<���G`��BkK�O����q��ͷ0a�I��4)����5��+7�&nkH���\�wgW�z���h�>�@ci�Z�����J��y\��1x6M�oR�ȆO�Q����$�"�)���w��-���;�GG�(:�:Z��u�6[�X�������]'mW�����JJ�);
��G�H��B�Rff�G�����@�F�7�s8Х�8�c�Z�U���M�69�I��B����RѦg{��A�N78��bh�\$��yz���܋v1��I�Bf`� �'#��y�&{	���&��(^�^N@ݦ��)��@3�t�w�0�`]�S���Ǆ?�x���C�s4NS>������Ö�:���y4\i��rHj��2?IV�?ca�E��<�w�		�L��s���{��:kVI8���!#Y�+�sj�.ù�ѱ��T
OAF�"A����>A~�������g3qF[�҈6���{%8�B�J<�y�-��Pp�[$a�2[*#L�!���9h}�^���غ��c�t�rG�-r��n��7��d��L�`�*b`���|�m�M!}6ɐ-IF�+����BGⷦ[��y��y=�
!]n��xa ��w
2�ew;����/�.t�/o�0�����Dⶠ�JU�oh�ޓ�Z������W��s[LSi�I�CYp�~�C�c�;n:'�ŊT����T�@y�"���I���
��O@�B=-���YjYf�Rp��d�{�b����iÛ~(�Ή�7eIQ���<!fNT��W�9K-�bQ��Cɯ�J~�P�צ�����__/,�娅�R��x�rk4;�nNѵ����WW1��_���Ca�'oBB^H'��8����l�t6>Z^N�I6|�.���9���eX�.�f�x�)Q����:̀Ϻ1�v՚�S�;�����D2�S	L�����,�J�	
�%P�.��
8�<z��0�O)
#h����_�h5����𜧒��o��
���v�-�a6-u6�+=�k�C���1�1�]/#'�Z��vʃ��W����z��|~h;��NY�cau��JC�3)G���	.��࿼;'Ծ�װҙ�}wO ��;�+q�QN��t�p�-�d1쑤U�~�)�E2S,�Na��.���h톮si׹� s2�{A��X�r0�Z|ず�1��'�<�ė���q���~ 9�����LZ�T\�N�G�l����u���.��)T�\��gKy�'Y�����_�3�s�����I����o���錓�r��_�^��ʄ]�Ck#�?��bt���/���IL�t���þ���J$�P�3S��7���|ILqH�Q�F�$-ʄh6ʆ�P_.�d���B
͛�\9�"^G�f� �Ա<9}�(�������yql�L�l��(�ɦc���*b(�����9땼���`�~	�yA�$ݕ�-�S�
vá"?��ϓ�U�n<�<;�^�萘]j���;3&_�|uw�˫�zR�osˣU��*��
a@���a�2O����E�Ɉ?��ӗ0Q�[TW��ƫo_5��A�Y�RYS�AeҶ�N���� A��	Bp  ,I_�ۆ�'����\��T���$�d-I7��`�M���f|�nT+�M6��%�7��Hs��n�H �8����[&�rFb�ESD
'�guG
�٭��O���p�i�9�򶌂4���e A�<�J���ǅ�ǆI�I�Z$>��6�DB2��a���O��<8��C�7�ֻ{�JN����~��'�~h��,����Y��yC��^N�~�$�R�֫���x;�\*k�4��S���;�$g������ÿa�F<^��ȻLB��5,��.(��T��wȑ�(��oܐ�'\B�����1�	F�N��D?9JMm!�~"ۀ�&P�d˴�I��e�Z=��1�yP~X��DmMp�knl݋8
�h5C�����8����w���՜G�
S�t�}�<R���yuJ�'�jas���=T�6���%��L�q
�O.ON&U�.Gb8S������S����W^�,�/�+
�e�e����^���=�0T&b���e��(
sv��3��i���Q��>�{o�ӗVt��I<ب���-�0�8��s�"��KJbSqeI��d�ʳ��
��h����
�я�9՘g��F����r9����c�`1��/����g�h����C��ڍV�R�<U3�I�R����Ʒ	���8����c��:U4�9���v�u�[,�s:��3洅I��9�U��-�6>d�ٯ�
��L��ęv�\�뭴 ���t۱���g��m�
7��s�Y�}R���uz��y����C��[�F�:��kEϤ^y�m7�긾8/Ϊ]�@5$�(��R�a QsZd��9c�!BX�t����@���~u�D*�L3�L�
�,WvV��l\�
u�~��9x����
�D0�ҏx���¹�t�LC��(�����M���W<J�W��=X�������똮i;˦�EGk7�;]{���N�!ϭN�˸��gk�B���c����Uf���r�ڳ5�r��������*�@M�ԣ&��9��ךbU�S�TM��6Q[3<Q[W��.6�w}Ӵ'��iv9�-g
Ǎ芳4��9�D�4�$�|�'jn������(�|Ŀ(&�3�l���\��+�(��
K��|�e���K��uΘ�6������s4lM��pY\̌5>�Ɂ��M��a&�_�(���8b��w?r�:q�������u�
�/ƽķF��et!NhM!.��*H���j�A����qJ1��0�]*��>�����h2�}�apHA�Ǔ9��h1�B� �����r�s�x�龿��Z6��;I>�"κ~G���w�b����,�׳Ri�A4���c�TL�BE�HG�
��7�)?_ʜ�]D��ȇ�ȡ�N��&��G�����G�	�#�T��]F��\uJL#��z/$�04�U�d�V��1�M�9ɣ=�P����T�|���th��ߋ?(wϣ����DY.�}�3�~v��L������c�;���e5���?���9���g��p��Ҷ%
F�*���a7j~E�xl�JO�Y��1|�_PR�%�R��e~�Ю��`����k���=�}��\-�$�)oU"�5��j1�3&�FbB�!$Y���D���������t����+����ożء�j��H�L�}~�<���t�/p(\ns��s���i�7;�N�L�2=2��������}���J`����q��)FQ0�Gc���L5��������q�F�p����.,er���,�c2�׺��$[�N����xA]�4��i���ΞftFE��A|r���&㴣����͙�z�?\��J�1����5y_L��g-:�?
��8��}�4�����].nb�[Sִ#�Rñ��f8i%�$[�}gu����O�X��뿔.i+�_S�%��-�ew.��
�Ɇ�g�Y�Y$" k�����i�/2!��)���h[�%M���.��F�VP�^��<邷��]�Av�y���4�~I�������5��m'خ�%OrR8?W�y+���	��
�!�
s�'�F}��)�$���)E�;W4�[[f��{`C#I�!��s8���l����V�c��\��d�]�~�K�f>��r���3/+�-{q���`og'���|����r������z*�V���Nىi7N���,�NQrk�"���e4��k�e��_��I��S�2�����A��*Λ��'���(�������� ���.�^��C�� �ٮ4ɶ!ٰv2{s+�hq��Y���D)wo�b%�J��s,��)^˰�7S��MA�>|�=���N2�
���0D#�j������.�y�h-'ɖ\f^V$���=fo_e���n'�*>�atu���SE���Ϭ�Lk.�,�>\s�\��m�H�϶���=�^���W)����1���3���*w �<Ǖ6[���"�4�Ke�:��\���;va�_&���p���ǀ��ǖ�yFW�A�qϋP�Cn0�G�!7r� 7r� ?���_%�x��Z�p�h@�zB7����+v��)cZ�M�:�L|��&������~�{IW?�z���+Y�W>����\Mh4bG�?I����-�(>�O�Jk�	��>�0����u�����s��.��v�l�M�$I6Ѧ��!8^��$S'}��#Qu�k���,!�Bz&1m#㙿�Q ��J�~�b��هO8Cuv¤MM�T�%-�67r�T,#f�%$뮁�.�K�U�T��U�/�CS,�@
�Cn�ܗ��z��+f[HVR1���G�*�S�~�w�oГ���'���X����w5�]�~W��u��]Tlu�#��n�5�L�y�INF�*��Gdd�hAr�o5�@��n���} nv/��/,#G�m���8P�K�7�y�? �\�^	R?l}��ݾ��?���>a�Ԓ#��J?�'_lxX�g�x!|2w]�,�kn.؂�{א��/�?�z�� i>��e�v!/��%�qqQW_.(�1F�	���@��1��$\oY�[�kp裰��N
��N
5<P*P>��VWtX�J�Z�<�n����-,ZX|�߀�Qn��h��
��k����e�j6ǐ�jv򹉅|	�4�L��G�dEO,�+[=V^8u	v�
8VWSj +mHX�@�����>��$O�B���j��NeD���ų[X$���B��M�°`�� ,'|-�C7�d-�jP��`�.O0{�!��x|�?�3T]=�s�=���+~wx����i<_�+H���s�w��{�[|i��	��b��*��ˡX�He@�·g'Q{��U���owZ&鮇�wH炲�Q
Ub�!�:��}��A)��d�0��q�`�g�Oll���؞Mf'����<�h�]ɱS�lB~��Լ�Ϭ�MZ��sz�r�r��������{��ؿ�,w5{�xU�{/В�����N��(�e�2O��l�9����r���$QaR,$�
M
�Þ�?�3�$�r\��T/�
�@d�)PiuSXy�&�ê�
�"C"�U��b>[Dc�-���;�h�l��x��v��X��g���O�}E ͎�+!���*4��[��N�q�C�7�����J]CU֬��Ht�umK���|]S�:��i
*��켾d��s�:�wʫ����o$�k�����)�qJu�ͫ͠|�s��]�W�i��Z��ZZ����*uI}u9����A��Lrz ���Â ��{�����y��tP��4pu�wO���Գ�E���������첐��b�l&�g��>�N͝;}ӎ�>�b�N���5�q�j�>��KXL�fu���?�w�
a��QR������)��7��Y�.W�ݶŐ�G'K������A�ӷ�����/)u�L��ꑝ���e� ӓbX�$SGrԪ̉�v���Cđ��zܕ@�~�=�py>��T�됦 �GK1�w��7`
���!*�!_� �sz��^��� xY�hv��n�����2_�)�ƅ���rP�{��3ƞ�*
cBF�b�b3�mX����� C'?�P;��
�^��u3hD[	��(�5��Y�fU��U�gLx�Ђ�=��{�ټ���5��^����K n�*s ͊
�g�S��dv�d���R��菎��d�$ hYb�D㐤}��~���-0_��% vkK7D fA/{_�!!�¬Z��)���G�Җ��RY����T�=�
�:\��}��r�#h��p[p'��а�`�=U��O Bi��.��ch{�:�y�E�w�ߞ���B���@o�$�0��5�ϓ����֊7�7{�I���W�������7T�o�Z |2�N�$��||D����W�Ԃ�?��~�{$p�[�[��u^G5���(���M��f
�mQ{�T��fˤs2�"�r��?��owVqv�afsC'��+E+M8C{ft��l����з䂓�8�&q}�{��׶+������9*_t�H�͜}0(�\�~7[&������p�7�Yđ� ��1�h4���K�zyȴ��AZ�i���"�xq�X�6]���М%�+
��`���)���A�� R7@���� ����?�tGWJ�y�����z��w����@�����tn@纠s�:��N'\���t�L�:���Kۋ�\׿��|�#����fN\�
��jdwq�����>n�8��l�  	�ý��s6��v�w�q�`�=���@���p�#��A��K�����@�
���B�p}U�n7�v�n7��+�n7��F�<d�>a�
�|���^�� �> ����}f�=߸$l<���X�jf'S	qqZ^�^��[x?-ɀ#c��5���9g�K���"7P�������7 v`_/�
�o�a7v�a_/�
��+[��\��^�i0��F�;�/Q��1��$k�f�0��_i�ظ4�P��[CTd��)6�6����,���ѥ���9kV��故�^�`Hn �`o �G��4���.Rg���bm��"��$�I�R�@��jy��\��
���/x�@{x.(��|rI ������f�������EHo����pg!��_�.0Y;7�P�ľ�]l�ӭ5b����M.���6a]�7>��*�]u�=���������.�ֽ����Z��ª\u��ܽW���C�W�u���<��a�>�怭A��k}��n�I�E�w�&ɐ.�R��>&@7Z��M@w}{������)��uw�����d
D�Y�EV�C���]ٮ�0}�<�����E,Bb!�P�l

�glg2^��N�4iT�6�'�}|��n0�1bʈi(b�[x)���h);#����D1Ϝ$�9$�8)�_�]o�e�a��%��������D}_buvC���М��IW���
ޗ�l̠1��MA�4����3T\�e�x0P1^�h1�Ō3Z�t�c���bF�-f�xO��8��3���9ۄ�k�|08���f��nf�y���NΝ`ę�}@�Ef64w5c��7x���lhu�����ϵ%�TO�0�Kou�@*A�0<��;ԅ�9�j��x+��c�J�eb}~q�l*L�YV�=E�*5��}&��D·��(�HzP�4�0��t�"�q~�Gi�I���ivx��x�y���V���|(��c�ȱ��F�3�,��P�A9K����'�e��V�˗��ǲ�wV[�b(�R��� d%%E�݃�g�'�
���G�~c���G�x o���@33�LŞkљ@bҰ�-öCm5i_�\B�TQT����Y������V�ܨp��#ڙ^�T�ͧ?��>[���D��Jb���5>��܏b`�R��B}����λ��
����4|���*T���Ayr17L.�A�vǤ<����ҟ!���P��%�V8��1w���:2L��'Bn���c���dbj������F��5'o�����!V�@l��zG=�2��%<�*m�#�,��C>��8�:Ϙ� nM�
�W�&���9�y���W�j�~�c��x���~٩�Ax��7=����0 Nne���e2���3���}2�F�ͣ��~���/���sOH��	��i6l��U��� �8#e��\��)�p>��[mȱ�^6�WS�r�I�.
�O4��3�V�L�hB*Q�q�B�8�ݔ�;���a²�\+�"��d��Q�v���H�"��#��.�ξ����kr������05zV��UF�RxH�(*��"���z�o��E�D"�5�݁I����\6đ��6�"�8[:���f���B.�"L��3L�0-´�"=�ED�TA�ْ݆6��}bB��h�됳�
�e����~VN.:�u
�`�uc$H�Vx��C�U�{-�`?'�h�:C�q�B��n�W�R����T�"���!���]�Ey�r�t{�U�*����N&��Yx0MԄd�^P�%�*� Ba�/1;���O�ҩ�xt�jr;�Nͭ��ђ�|�X�?&z�D9'C��:x��nG���N��)��S||
v��dT��J�8�S�$U����
���:�&�i���^�v���h�I�h�F�i|���?8�1䍗���7��y��ɯ�fM�5�'(�5aքYfM�Ě�o�<�&L�tC�`�K�i#ޅ��t5�ͭ�>���3`�Z�I&���t��1	�$�p �L���$��=�g����x�
�S�}*�O��|�<o�(���t�yE�K;%���	E�����v�Dԥ�X��MTk\{�\]%W�G��G`�AE�.�]
/����ﲸ*�8E�T�1.��|���l�h��r]_�
�A25���b�F|��R�Edaj��GƓ)/��>z���c��?��u:\��FC!3���V�%��~�	�ϴ�FHg�OjN6����,6��dy	����i�c�Y�]����6^l�����8wH�H�i��rv6�iz�TR����*$��L���ņĢ�} ��Xt�D�E%H����#�	�_:���j�� ��R�C�G����
#\2ь��1���K"~���m9��ysd�}As[�j�)��'�/y.��	*PU����^ ɖ��{~e˯n�e@��f���Mi���mi�����o�Ȃ	#��JC'�G`N�
ۮdi�/�>oE.� �4�� ����"��~x����=����8�DR����Bm3�0���"L�0{,p�_����V�!}k�����uq����0��M�:���Rk�xG7l�����&�@��d��1�̥W��q��U�ض��ګ���8�^P�����_���v{�6����g��Ly��۩�KB�q�S>=}I�R]灦n ��� ��� �r�;�߻a`�q����J�G��tM|Q"��b_�����K�-����� �b\�J��uŋ%�s~,h+:�K����/��e�;��(]��AE����Q��TK(ET)�w���	,č�r���/�N=%��bWz�&�n�&�Q7	v��8I��E�ַg�EbG]$�A"؞b	v����L�G�}$B�/��h�G�=$��!qs������y߈m�-|X.�IA"��İR�?�K�g��`zĻ�	�~x@���:x_��P;}M����P�4@���m��]P�	�ײ�6 i���%ׁ��yя�Q��x21����16+�hO@z�kQ�V|�����[�Y�u�]͖��"��Jl�j�T�֣�00]���G��s$��X�V_@���v��T�0NN&��o;�
l��u����*�fr�����X��ϥE�]��0/	MVv���@,�Pj}*��H�뎄�
�0ƒ�B�{�4pgp�g��0�g>�35X��45)g��:�b�O.���a�)|q���J-����r���*u&��'�����p*Qy9	C�����_����&�6��C�r~�ވNr��>�2�Y��.�lc���T6i���2HX䷚i���z6��1x�:���S����נ�e�jV9��N'u
�.�uӮ� d���!�Q�?��
��s���cz�v���#�Er���d���g"Ҟ�е'�T�;����P���������f���f��F�����g3��nf����ps������a���6@A�����saW�Ow#�tv�	|)c`l��X�Hs�l�WP��{m��P���J��9�J�@.��oq���l�K&�&�9�F%'ҍ����-�l<[X�Ǔ��'�ª<^�XTq>�
��A>rBS)��i�ĵ�a��C��;�s����X��a�LTP]̘�bL>~��C�M���G�_��@�J�
̒d��g��ekY
|Z�oM�Vޞ����q�T!A���f�S�ϴ(D]���@��[b���h�I5�8����v�1|D�;����
~�����!�����FU�P~J�����[*t�*�a�f6l
�n��`�bJ3�̎��Qb��d�~�f��|ޮa��e����F8pK���@�����\.�u���m�(1��L�wa�
|�,7t0����$S�8�D��m�`�g$��TEF�뢭X�x܉u����P�
v��AXJ�G����P0�� �P�&���[q�O"ğ{����+Cϭ�H˯H�ɶ�7��?�-�'��Wڟߖ��i���kon���[f ��I씗��C���@�0c�K�։�$��wgW���k�t��&�0���Z������J2��R�~s�n�A�Vt-`D�V@;J��[��v�w�-/����
J��e]/zD��Z(�`G ��
f��-<�+/p�A��[�xSu�!T����.�߆o�gRw>�R�D��0�%H]_ �u��!��ne��V��#�];w�]�jo#��ޅ��������O������=�������v˿�-Խ�iM��$}�.|�.s��#vV�17����&lM��ŶI�Q^������%Q��Ki��]� ��pď���tT_VT.���k1���l�+�>�5���̦�Q��M����6�!`Ъ�����>��^�^;t�Z�V��ftlT�n_F
2ߍ+:W)MSU�t߃�Sm���?���{�><�jdG��[������2��hcRi����#�Tq���奻}w}e?���>��o#v�w �u����h�C;c����5`�^��L6�1�J�m�fNJ����� �.])\�#>�s����:�����w��q�[�{�B�G��|����-I��(������.n����l7Z�k��'��9�F����=^��k�x
�.oϮ�]����btF��U=ƴ2Y��+�c���ل��4��
#� qZ�G2oY���~F��f�!��� ���4=%�I^	�	%�Rd��tq�ҋ�=PWi
���>,�ɥb�o6�tgG�H�WF���JV�A��6f��JO֨�M痠*��[̥������.t\�C��c	E��d1��r�I.c�����6�k�����D��+0Tcܦ~]�j�,����Qip@-���N���/�#�v��`��>ݴ�r�4����V�g;m1i�d>��Mn,u3��<�$7��/���9+v���Xb]#��]eհ�{�C7�
jk,�^b��Wj�3���5�gZ��!kE59S�"���������\�A�~U���:!��N{���~~ǀ�o���
�>��\�sH���������5.��߾ߞGe����v��D�L�S�v�V���ɳ�������U)+dn<���vm�������;��9��#n�8����j`Dg2�o��t��Y���{�|�+tZG���F{��z���R��W�5�vjk����Nm]{�F"7Щ��X�K�X�{CT�;N��t��my�CX��a���*�畐�.#�����Ts7�v�b�\��ݏ�J"<|�c렻�}�ռ�9�Dsq���1ДYєհ�-��E��zM0%;#��(�ҝ.V{����_�R�Q���L�|���J���I��C;qMR�#X�U�@�8����,-��*�*C����Q��M�0�~/�>N�i~D
��.���(~�Ҋe:���&g�q���/��޼n��	��@��<��m�5��i���N�gyҍs��=��=���NejZG�C]^ݻ����_J����q�ȋ5�5��V����)�2�|�Fx�.}��<��O�<#	3j'o���X��
�Zo��B�� R�s��Mƪ�2��5��:%y��2�Ov`6%[����[8�+��B��_D?�!�Aƣ��q���Yf;��D�ԛHmz�YO\I!��M�{�*��.ϢϲD�hv��w�n�Ά���+0���)xy�=�-=�B�P�rfj�hU�qC_�C-�ru'���V�q+������{u�SmL>�k�pv6��z�'|?b�q���ֶY+�ͪ�VR�lU����� ��z�_s�NSg�lr�hL����d�L|����������S6���pyQG��Q���T"���VM?8y��\@�̾�rl6���:�y��L}E�Zp�Ɇz)�[^�W�t��Q^6f�ۏ8�/���N&��4��I��A��'��:9�e�>P`�R�Ք��MR[t���R�g�<�)>��;���Z��Q��!�
&���Ă_n.H����E@J�w�U��� �+��� ������z1���د��5�^����k��i�����; �1Q�0yբ.�?���k��@�j��5��B(=�N�p����6:���؁�Xc��ܶ?�-o����A�%�_t�� (
���/��h	}73s�F �o俿lE�i
�Fg�����[zP��ʳݛA�?�K��k�>
��it{����j��}#�v'�m^F���ʰ��@�=�a ��	�t@�N֭U'z3i7}}�(���a���;��_ˍ��%O:��'c�\�f���6'�4�p�q���T�%-U���?�fJ�L�U)�c}�����ª�&���a�b�Y�l��ۃq��*Ps�}M���I�h��5�?��ڗ~)�F���z��p_��Z���N��p�aɿ����Z�YLynN{�c�W^�9 K����
����ܝ;�E�4����>��HU�6��.�.?���`fX��>G�5�Rǽ���P!�:�?a�7f�)4z�. "C冮f����F��~Xx�	T�8��͠�
]���f���_;�uIԏ���%��%P��{<�k� ����+�Ǉ_o�`�*
����~���>P��o�~��t���׍\������ ��Z�(3��"yhBпq�����iQ��u���	��(�1�9�D�_i��y$��ܠ鍏�d�^�}H��` W�<�O�%;�8!�o��g����z4�����E"�)����\����h�(^ҙj�U�-��k���pvzv1��wٲ�!��g��c�i�`>�O�%���u$��H	�F��ԈV�F$	t��y&b]�?D3�߁�A�>E^�{9��3����.[�.�U���R�r�\f{�5�(�M$���\B`)%8�Ӣ�m�Amf\�F��$}>���̞��Pݬ�}�N�'����
�N�N1�Qm��ۅ�8J��>>5���x�h�X9~��P���l�_�;�2�}'�/���j_v��a?�b��� ㅂ�n>��R��U��*�iRv�a�ǳ���;UA=|�}z��OgcebA�';;qq�֛���AD��J��t��+p��L���'���^d�]0s��gW��s%/J;I�3�&��op��T �%��V3n�z06{��}�^o�
 ���0j@3P%�l�q���Qo6~GS���Ĺq�|x�?�[/>�� �	�� �^��vV�D��^G^��?b'`m�洣� ���t0�������wlba[iB��M�/v���g;Pc}U0��q
uU���'ٟh=��� [i뀮M#��
'��t��Ec\V��(d2;�T�?�:o�C�E@>�-��rOya� 7� 2~��p���M*M~~�0������X{��L1��գ�Ȝ�u��UHJ�xe���Ta������(�x��%.���F�F�gϘ�s)��6Ey�?�Mɒt�Yr��p��a�R��M����ea�0m�l}���I�Zƭ/�*u�ݜ�$�eUQ�Ƽ��f�����QgZM���>���#�)��:��t˅����I�4������?<�4Mq���Q7~�۫ax�	>l�W����	<�N�q��������	�<;�Ղfi;���8�|��������P�("@.D�G�fx�w�+�T��GE��i �*ы`|���ڏ!��.�2J��M�u��N_^�D��,K��;�����Q�@��88���r�ȟа��AbT�̊Qrl���;�?#��L�?�# ���&!\���mf}�}��ӳ�N��k��L�,�6F�8��74O��d�u�Se.g���x>�&=?צ�FV+�/��A��zjN�+�����jс.��4}d�D���8hn|��T�ag��]���o��Ir��;��67���Yg˶����ްy�c.N\�n���g��>Yp��~N���E9��*5�6��~�>�L��{j�3(!0��������q�`�6`LTn��FИ�JD�b��Y*&間�21M�H��D��pz�8]��	J�P^gAN��KbAyk����L�-!�$a�RQ0F]����ɂ�^��{���5��	�%� LQ(�@��c|�WV��EeJVʬ�L�����E�Z𣤅ɒܜ�$����
��n�俌{���oϝ�H�~58
d�Q�;�ݘ���3v]�=�χ�{h��(vc:�� ��\����� �.D��_�����*��S�j�Wi�q9f�)d$
��f�Q�H�]T���4��I
_�;N�Ww����'u��]5�nury�9�7�ٵ�����&z����;� ��<(P-����h+O��
+؈�v��v�C�l;d�p��G�B��������$��L�U
څ���$�)�Yzޟ�`���Az2��qw�f�QS[t�W�a�t����zv񦶇���ã7�mJ/��w�?
-׋��Z�$Ŷ�t��LK@M�q�u���X1 w24eb� �g�q���!�ӋN���';Z�(k�rӹ+�&�E���~E�ˆH��;@�?I:�D��OH�)���u��F ����v̋��$�2P�h�� �h��pTcA����,�T|�BW����ÈlQPy+K� �x��
��a���u��oc7����� Dco�8��D�]zD���M��~?�S:�B�-�������$����y�]�_}
�r�Q4@p|ӡ�t!C��b�`�&0�d����
�?�"&F��Go�V�1 &`/I����_7���MH�d5��F\CޱYc,̢��������<�Ы}�J�	��yQ���) gU��	Ih����SV��P.�Qʥ����vn�?a�}Cy]s,N1o�n��')_?��J��V��e��e	���mo?����� c�K�7��1��?����(V� ��/{�Z����� )׼�U���̍�X����~튉j��yw�Ρ�jO�G�Ӿ=��'	��59�v���ˈt�F��gɯt�oV�SR�Ǥ�T�M9Rb�����z����!�1"׌cu�7�+��$܂��u���ĥЗ΢�x]�Gf�J�\�����xȋ���.�!�p��l�P�)��y~D�݈7���������mi���?��L���P*���sҢv4��y�4+.�U��y�8k%�B���`w����E�����=@�*�ޔwU^1��#��[��{ѧHC:�ԡ�u�|�Y:���M6"�\4��V^&�
�R�C��;�p	܆�[��z�N�ݚA�/z�J}a��|�l���qO}x�� ba�
6�,X�?��_� �r�M�|�TWtN�<_!c>�7����l@��,�OH�cZBu��b6�d��2bৠ;XP;Qp[G�Sk�Y�S��x,O$
���f��4��U%X'jv���C.g�a�*�w�p�r%.�Nm
������*�O���0�Љ������z6Y��Ƣ8ȥa��Z
�N�g:����gpr�l6�<n�$ndXFrÓ
/�=0�m�|?n����ݒ��'nY�:��( ,�C`�N�O!�2Vs��<g��eE���Ă*�RV��2Ns����Rq�.#���Dm�c�����#�A�*�j��ڭ�f�e|�Ɠ�AF��}ϳM�Ց��tR�G~�U%gE-O�CE�s����h���N����p�?�:��p����\e�7��wg����;�`����y����l��^p;0N����r8Tp���)lF��\-�>��X�K{�9H�GJ-�����">0��TZ���B��D�Bo]X-Ҷ[D���$D!��N�j"Z���f)g#Nj>(����>ʚ	���)�;a�<�d������<s#�<6�!ۼH6�h�i{�7���A����&��� x��h�����p^�ث�73������tͺ������8w��z����� ���e�ks>[-)���?@uT��Q�:ܧ ��ż��¢�#~������8��@���Č�j�䚟�f����"T.z�����
���$��"%%s�=��6������H_/�x�D�,kxR�ou>����E�4�b+�����~
g�,RڣKk4lO
w~��
�d;�4������l;�G@��1��1�\٘��V<���
�4���t|UW�
�Fv�8_ �w:_� �q��t)m��)b� ��"4cpq���C�f��X�F�y8hp)�A�{s�DS�]G~T��vn��^aU�=?���R�`u�XM"v��^e��ƙe��N�V��X�K�Ԗ�F���rp����]�V,�2"�g��n0��ϡ	>>�����
ک�@���X�Z�f2R�����O4g�� :�x����"��D� �>zt�zT��#ՠ��a^?5!��X��4qИ�C�{ޒ����-�p����Go��`�t��&�e�Q���e�%�K.0�p�� #l���v�a>
��Ao��<�ym6ѭ�@�ɔ�V���f=����Y�--5͉�E~Z���b��Sh�&#� S��ܬ�R7R�h��3��'�J�`2)Uc��g��S�J�7�>��;l=l�Y���+k�C0�U��|B1J~T��+q��eNB3��zv�&M� ��CY�")������l~�Ai��Fc\1�H�_�AW
/��c��t�RH�i�\u��<�)o�xBa�\:~P��C��
�N쪹6����
Q
'q
Qb3����l4+4��h�q�q�׆��},$
L_4�޶�Y�JV"�X��\�fժڕ���<9�V⑼dӦǛVyZ�X��&uT�4��y�*��E"�b�8�6ͱ��#�m֛������a��$9���:EAɗj�U%����<k�L�-���!�VMY�F��}�8a>S��ywU�A��Ү���.�dn�Bʅ���#�)[>�Jw�����1?�Xx�����}�qn�N��NL��9}�M��D�gz$G*�&��S������K��fRא�c_)�(���[��-��"�e��	�H�\Dk }��(=;�ls�̱@�/�@��B'/."ɗ���������Ǯv�9�tC*�	�",gB0�����L|�/�.���8��Ϫ�2�-�f��E#��Ȏ�L'td܆�|�
l:o}��~��YV��Ż~	�n���H�<��9_��ə�Q:>Ս
N*�k=8&=IX-"u�U6���5m�(-�u�ސ���Q��1$�� ��㩴{�����o��"s��JmJ;wnd��d"��a��U�6�pǘ/�5-��SL*�
��q��jeSz`
�y�Ʀto�]r��0�����T�{W��V
���x�l�\�v��C��-�0��N��/|�&ߝ]������sGZ?i%�V��jw%��Q�X��r�{��"����������:�W�ǩl
����4|i�� rRXfwAi�N�	ԖєK`@ݍ�fo�|F�b�W��,J�t=��� H]��ӫoK��Ϸ�J�|W��[s%D����Ʌ���eA�:��g�G��2�jw�o4(Gb�s��=��&FE�D_�C�L`�c�o s*��9$r�岵e��o����4�5M�x߀Ʊ�����2<:oαݷM�� U\�H�r��'@k�	 ̨�乻�	`�݈R�eqN�m���J�:d�,���J���U��9���;[�3�k�Z�3OҢ�<���PWE$�B��މ���i~>�h��v��ܶt�[�6�����c��������39����PM���C�R���ط2F޸�B���d�u�/���zl)JڀGL!����R������,JW���=�ӐW}|�h�����7�U�ʝ}��$у�Imh��\
6T�'u��
��7��'^~��#,N$�> g�6y���:�����O.��ˡX��;̸m
7P�i��rdE��|��_�U\[�4�R��� jyE��mйg��]�5�Ĺk�
�����P�u�u
[YM$Ѝ
���e���<i'`z`#�:D��`�P��]Ӭ��V�hT�b��۔�'�N��$Ҷj�6�{0H��է�+$se�	�p#�G��?�0;���tg� ��V�6HT5��w��^���*��J/�U	��2,�dRFd��nKp�Xw����
B
�����W�q�4� ~w�ݰ�hP�}@3��qF��zc�+�ʯ9zF�� a��L�V+�s&1@�b:/����AY�D�	�W�TN[�׬^�
W4�\Y��rجn��&ۭ�R������gK��^L�		��]���M[��鸋9o�z��zM:aS�v�
��ߑ�"Q���f����]��stu=�|]�
�*��*�%-��z�-�I7���]��l1�F���_�)�Y2��:���Yd�_�c�@M��0a}�򒸉(��aN��� �����j9��������%CSQ�I���0���
�mv�<%L�����*�ܻ�W2���w[��Y�&3CK�l�����
0)�
��oDu/3ԋ�4WOU8���uݤw��}���Q9��G'��ژ�kf��j��e��^�2��W�
<Vv���NH���NQ�S���=�tRj���Y����EB\����������>v�d�����U6Wo����#At�O�i����e>#"\Ѯ�o�~Y��u�W,{�&��Ha�+���D}�!n�l�`�o�����-�̪q�t'%>�:�!Z��͑����E��G�=L÷�H��w������Ի�%�����rF �#���0ec$:M���]�V5<iBfĨ�;��i�_gk`�N�eK'�FX���kl��7+Q#�%�\�S��1�����x�;>c�V}l��%�Hh�h�Z0�4n괬�\�Bp=�1Ny��\�i���^4A�p��o�(�t9�[й����UD��:�x� �b-5$�*$=WIҾ栶�� �Wi�=�]�l��{���.d���|�.��0�hokx���@6��3�!�S�Ț�s'\����2c��J=SV1)��t=)�����H�U��|��M�ȴu��g�	�1]?�
����s}O�W�v}[�li�;2�k���A?�d
}<E��WM釮
��ޢ���tXQ���!�51^{�����h��
Vo
���AGT<��F��i����7QԿA�e:��F��}P3r�m�������T���Xd�^s��~Ք �b-nh���D�.D���&A�v`���q�Ĉ[2�:ߐ�`�(�b�"�"P�CnyRr|&��A����s�vk~[�i��-��U�FD�p��
�y<�½n;��GM�%jDzpK�!�������p�p��b�G��P/�#
Ҭ�.c9� 
ljDs$��'0Э�6��2H?�R����5�I+�_�[�eH侰U��E�^9���i�
˧a�l^Kw�t����yE�l#h�����B��p�j_x#d;�\���~�b�rQ9c���/LP�[�k�����u�k�[�PC��Zi����aD?;�.8�P0F"f�;�ն�9���q�K�
�>�ѓď�=�D��#�s�k�!]�+v�3��?T7\?YN����Y���}��DE44����;�a}}Ʉ�ش��(�ȹ��d���x�x8�g�?��C��7v`l1ݙ|^�~�Lec'b��"���^߽O����P �^U��)ˬ�o{��N;'�<G���7b�/z��3ڨO��4�������m��ӆ��~����l�BBT
�|ß��yAn���7��c�tQJ�j����&p<\�_�	�S� �$?��A+�l2�N;hK�.g�����軣���R
�txN���ထ����.�d"�=F�� ���Ŝ�=��
���|�̻���n�XN,Zzy�?���H�ޜ#��Ǌ<$l�"�A�� m@t��@$
������9�WL����s���u�;��xi&����R�gR�bC�D������s�o�[M��PRK
���y�/�̳���'��:�%M��ցy>��OƴN�O�G���F�-��W�7�1��q"��AR����s��C�6d�V�e���ev�ۖ��8?�:�L���A�*��3��y�-�J�M��-x��L�����qS��gRKֿ��o�_z�MP/S��3�`����E9^^!P��s}v�)Ƚ�l��pt
d*�A�/�i� �LC��W��Xc�)El=��JӴ �����S@G�ߓ�&IP��z0t�Xc��x�D$���I���R�[�Ojl��j���f���E>�O^]0��K܇n><(�<I�`�S�=�b>_?���LQ2����Ճ�vF�[��wݡy���}Q�K	�mH�
����W�[l����R��{}��CC%Zq��L��0LǄ�0LǪi1�~uq���J���6J�O�� ȗC$�q|C��"���<ds��O�t���n�V��*Y��Kd�Q�^KԓO��aZ�˃i^e�8N}:qm�Y�>��S'�ui���Ƈ�2�O��M�|�QiSE�}Y���h�~4F*�t��+Gv9~|�c���������ޒ���m[�Z2�<�q�X���sR�z�J
N˔�hԛ�N��k��~��C�0e�TY6W��A�W���s~�|�����ϛ�}�R��7[�BYЊ�.ēҿ�1k+�U	�1�
EIeu�qpk+�V��P
N7k��Y��:���T���
�y���U�C�'
(�	smɁ�f0fC���{���K��zT@J���| ��^��L9U�&������x�M����T���vJ�T`jT�~���f>�0�-V��j֛N}�S�~d�=6e<	�z�I�oڿ��l�Q����qo�W��F��1>��v0�="i��K;��O�|��G
X於&�F{9a���6xH�P	�'v�8��5��&�d\�#< ����
?i����Iy�M0���X^iMPC��x>$3����e���t�r>��D�� �]s��[j�-��s���'*̾��LG�E>���.�<\��-�;7���%$>�L�A�M�/ ���u4y�'3⦧���?���B9*��?��yo�l�o�<���n��-���I���w�a�Yy�'�x����}<a�K��}�Oh�:�g��3�|^�M�gp%ZPH+��F/OF�q���'���20~	a<ې�����*��P><�
4��G�����[�.ē&`��CfuF���HP��0*!��qc�rֶe&
�C�P��2��i�2iq4dU�,4)�VP��Bf	�?�/�q �zx�$r
fFA�����T� c}��%geVķ�$�~ W�������ׅ�DCM��(��`+��D-|�;z�U���vV�1̧�Mfb	.FJ�7
RwA�(O~��FO��8�#�c�^r�풿E�u��I�=К6z��H�C�;Hǈ=_��muTA�z���lp{�'<�LԬ�W
���
��A��l</��Ξ�0y��J�$��k�T��t�����tˠ�&��T�%mQĝ��N�rBW.��c D��f���.h���;�
��қ�g4���enJA�[�����������FYVXL�\ϟ?:p?��"+V
�o�H��9�����[Ġs�W�����]<�ȜN����M�_�i��o�����h�����Z�.��ꒆM���<ч�D��ߣ⧤��$g�E��Y���%�X
j���ܚ�p�RJ\�����ͅ����-\�q�K^XE92i=SJ!!T�J����`�V�@<���.��P���Y�rAE��-��&�!�Jg�����4�KMUM�OZ��+�;Ie��^���s��"7��Juu��dsTC{�Z"��#��pRFK:��Fx��,��F��E%V�0�a���8���-P�Ű�눟�ˆ�k�!����Z���q�v���}�*G:���y�,X�Ua�b�)H)��="�h`8=;Q��F��$��<r�_�@n���y�Q5���ۃ���n����r1�X�t
�V��`j�fR��3TywZ����z}�����%�H	���,[���;eZ��Za�c��6<�Yo����/)�\%�P�/x�����D��eu��2��)��ڙ����#���0b��F
����ZY+d)×����T`�Eo�L)�S����d�,� )E�! ��?S ��%���J�E����o%`W�Q1�3u���Qi���k����M�>θ��\��gl�D�|b5�΋��2i�b�7��:���m1�ؙD��x#�:�R,���`�)���l�Fe���o��3R�����e�Ec4J�F	�2�|E�J[�"z
�#d�tځx��ՠ�MV�涍�)7������\�:Z�a:�W�1��6tXkE����r>�k�-��:�6�����.3Y��ձ\:N'hH��:�J���ɷ6Ԉ�&��7UE��jn���*���hg�| ��tmb��FJ;s\b�����"ݗ)`�5*��������<�l�_�6C���<�]-�9E4���-�TWue�`𕀬�;��ϊ:0y��`m���	E�x�H�Q��P���IQ:���{�m��q��FNMd��"�Btո�;�t�)J�T5�l�I5ɍ8;� ;ܱ
��k3I*c��|�JAy�}��'g2�k9N�8���_�yG�)k݊r�1�;���9�M��uӡ��o�bP�ڮ-E5����Rh���%� `�!��)��Gv�r�N�N�p�����,�M��Y��#[y;���1'
� �[�Pdfvfm2���%���gsT�P4kZcЛ�5z��C
j��b���]uT�����h����ܸgT|S�o�|�<�퐜���"9���P�$��IبM�3cfɰ�2z ��
����X���G���h��>f45_�*TC��������Ls���Y�����;��"����|��q��J��w��Om���~�i��u�4Z/�U}FU��p.\7��͔�儎N�ZS�n~�zG!�W����Nt��bg
K�:3ѳpw��'�9�r�t���	p�'xxZ�����p�(��L��f�H�=�Fռh�-[c'�8�P�Ao�Zl�c�	x�����`h~G7�Yp�C�T�w7܄G�#�"���
u��:u4�o�aĖ���7����f
�����v�3��
3q\��*�Ln�fO�����=[���p���2_M�`.m������V�p�[C�Η����e����҇H'����Gac�]w��<a�$Hŀ3��"�ݬT\��nf�^fg���Z�2W�v���]�h�|굍;��z~܈s���Y�#�}D8�g볭VF�r�X��/8�ޛ���'?����P#�X�n��٤N�]SP�J����d�$)UV�|��a$��!�����u�9xX8
�G���cv�M*`Ǚ	�<��1�l�x6��ݟ
VW(�a}����A�Y�(��mͬ\䂨G��?8]C�͉Ud�kN;�,`Œ��ꁪ��KT��v�n�f�i�.PF��e�0ڐ%
B��خ�'�v@����L&n0�?�~87�pI���i�ٺ;�\p㼐�Z�W����⌺"ks,�{�e}�50�G�����?m�,b�|`��u3;sh��!��a�Á-��/�Yo��-,ֺ���� !i�"�P� T1
e����z_pэ�z� �MY�k,ܺ��Z\F�-�����=aѯ��*5��߃ ��
��Vt}-rX�X7���ý�O5�=]���;� j�{�(���h�1�S���xc)�;j}�C����~#O�V��u��2[�dD���}>��b��?�8Z�qN�M��t��s�1��e��D�
�����ɚ�{&v�� ���38J[:�4C�"L9��Qf�����/��X\����{�Td,m��i�P��V�_t�og^]8��I���5{���{�)�-����ނ�K�g�ҙ)^	�Q�sת��E<T��C��y�l��ܽ�µǘ{":]�A(s>�d;օ�Jt$(ܡ�}	�wl�x]��+!�s%�ըW�̌:��LG/ߢ|b[��-��[zH/����[�X��J
Tͮ��0U�S�t&&.�|3O;+���`S�ID�8ֲW����(�]GVh�|[G�I�H 3"��T�� i�H|�tp��!��oFh�ك*Y�6B��
i%'R��>�.����^�i<�>�7q���rY��l�
�]J��5RB��D޷{�Vp�����%SMѡ��M�Y��v*��h6�~Be�X$�J��OQغ���.~�����T��V�։��0%���F�Log��F��!M��Y+��$�uN��	�p8�ȠH`�`�qz��r퓯����Q�1�B�����'����e��l/�eQ���w�Pȴ��f�e����V�+��9{�����������ӳ10ҁ?k��:�8�_���E)|�K�X�dr�1�&S��y��'�F �SM��N����II��'j��<)4%���k_�"9߃~��<s�|ⰉԂa$�0*��7Y����(��
�Q���JV��'���.���V�o���|�=��s^�(J�p�<b��1�A[#�76�R�n�k��Q�tz`���5� �M�����\�Ej;Ӏ�/��>���{��'�s
��E���܀_�r������"{,n��x5��AqC;���0T4���H��ؗ�2*��1���=���R���'@Okə����sF7��nv�G�@[uC��޲���T�c�A~��-���YH	{6���4�>�Q�{��_�����d��g�wxe���F��~V��9l�G�ԾNƵ�:r�9�r�\���g�6���
����4�<~'�餡�k7)��#ZV.ΰ����V��wj֨�dnK��=	"��cV��S��Y�p1I�} �a��/
hDK�T���%E���tx��ow���������=��-��F��*�r�?��� ����Z����.*%�L�Z"���ZB�h�~:���.�����8��\�.�!���{�����j��'���-�J��V/j�Хt�QϪn=\��Y�u�f�\ �J�uR�iيs�
L}
�[ކ!0��L���#��vgF~k�h����_ ��.����[�)�-��_q:߽ ���G��<�y6Y���%w��d)r�琍㣂Q� �d'!��{����70��Ȇ�4��mˬж��V�R��Io��F�8.W���g��Yq� �;�Qb��t��������N�}B��&�>����6'���	ي<��Pk���|�>^��w7�})�Q�M���g>��i�s��Ы���u>�^"��$ձ�2�~�
�b�P ��Eoq��#"���|�_m!`6��� �5�������7���������o�0J��4#}3%�HDvѕ�|uQ��o_�W���`m򰝣�=#/����2y��_�'��hw$q����ɕ�?ƔώG`�#�+Ce���͖��k���5�����m�zs�4���I���9�����X��@q��⡌��8�?v^�q�r��V1i�������8�L��3�fI ���?���St�|x�$�(~`����n�VDxI�s��<ٛ�{����m��8�X`.�Gd�;É�HvN��Lg������Y���(�äV,
xͧ�5��J�ԙ��TN��ΗM�YQcSo�	�e�O-��f���%���oM��v�\䳋!f��_��𖜨l�� S�
�ڹ�	��ϧN����+:��ZB�\g��ѧ���evI���9qV����1�d��_h V-�F1�f��W|
͖�|�[۶�h+��:�B�}�%Y��&��7p��G�I2�Nb��E=�Fٽ}ݹ���s2����y�bs�;�})�oﴱ��/��=�W�\f�۬sTM�P)u���>%��S�VgN�C�#Bj�}�a�����PQ.�E>�?�A�WiIeHvo23��%OHGJ��8��r�U"t&�F��izM����>����
͓ڑ1��ɖF�����<��+WFcy�2ЕF#�T3�)&�,G'S#�3�oA�w��P�� ��4�o�m�32S��>1B&˔Aی^�~Äb�����A��]�.����"i���w�_��̳���-;�cdE,�!��>�[D��C�|n�dD�mwLY���{���
� :����H~��`��|22�>L��
��'���M@�J9A����� 	uet������X���	�SK�3�HM1AL^_T�[JU�C�cœA�&���)Um5�Q�W��Ò�~)�m/��~�.,MP&L�H���9�k��"��҆��,��+�U@h�����2:����AV���q�S�󁾊5�]���ng��:�����*i�
�]�i���Ň���z%l�й�[Q�TY����(_��7ib"+I��ڜ���I��]�B:0�@7[���ߢ�P��2=ƧUA�im�
�b@G|��#7Ws�FZF)�VI�qD�B�	.��4~�^ǌo��Z��&ynV� C��eo��5���7KW�z��'R*P ���W9�~_�����b.
{]3���LpN>�"E>X���d˂YE}:Gd2�A~[p
�S;��r`W
v���:�*�G��#H����&�/�C;�f�x�y0k@�Nl����v���\q�U,��2K�W���$�e�����qϋ��b��m�t1N��SZ[�4�q#lX�%,�5헃Z��+�XK�z6��Ū����#�&kQoY5�ǽ�h/��u�u�;A�qq7��_g�N�ɕ�N����������<���7�H~9�+�A��^�'TQA�
iڞ�ݖ�w��7���4�E!b������֙����O)��!��{r����,k�z�v������Sv�SV{b�k��P�y��]�E����ɯ�R�����Y댚>5j��N�Ed>.��K�|f�CҘ�zd}�̟�4>d���h���=�@ު�/|$x'P柚�5wQ�7=��qK��Q ���� ���#2���4t��������D'�1��Y/��~��fdM(��7J�{@�������)��(�����ơIP�Ua]g������}�}c 4ĭ����z��)�߼!4�w�y�gS5E�9
ڂ>�+�|�.��
8���ib�)�>)!�O��c�)ct
JܸL
�X��Wx���� �DKڐL����@0�ק�H�'��J^)��"<I�B�a��D��$��ޚ1G]K�5��[8��L����z�A�I�A��(:�uxF�Nu�q���F���nڸ僪��?b�x�
�Dћ���$�d��{)b�� ��J����(���	8^��!���u!MJ�B�cϬ�7��l��P���yx<���xƛ���|D�������<�-0Ad�{<�}gd��͕?=#�� �a�:L-k2A�⠝�1��rm���N����(���Q��/
�	w�P�����#����A	��� q�4���W4?��:��u�o��1v(?\�x��U{�7��f]�>@=s9%�#q��"��r���uK�h��e5F��>@���'q\��l2������8��"���J���Q'�H}C��R�,R�(�1#tiϸz	��,i�H�>�j8)N;�={��A���<h6ĳ�X]$g)Ss�4�X��B�f:�g8qh��m����Z6��2�Yc��LPF4�1
����@�~����P��E����c���EfN�]:
&)9�r�����G�&9��ߡ��P[�5i�ۈ�R�_����:*�E-�Ds�Mg�$��R	��V��]�ԣL�G��&C����>��.��@��-�l0��rt�����gɍ�\�|[��M3Mc�V�(��J��;��h
�T�&ƍ�9{���e���?�'���ܫ��	����p���F�!��cq|���Nq\�������N�0D�o�IY����
��j`XLpXX��f�.a��eK��H5,�e�]A����c2�'�h�d���4�B˷<���
�������V�[\�6ۋP�R��-�`�Ě&5ls�}��6�j�8)�Ťb0`��f��i'S�[��q��$&\����"f2!��Iy^o>����ղ�~Pu��Z@�z�$mE娘
�^�*٢�k��e�.�?�>������n��j,�������,���{=�,t ah����m�5���X���
����|�a{2�Ytd��LӍC�JS�<Q���T�b���rrai�F��X�(p�QL��=q�����߉��P�2�I}ݴ�w���R��Z���6��]�/N�_r<�yo���kޞud�N �r9�K���ƱG������6�},��Dv�;���k���S�[���7���'����B�+�n͕����~_e��p�P�Nf��w0�nLV!f���끉�e}H�&�mҜ2
���`��Ⴧkh��=YCU�3�l2�M�S�8=�����k�4���"���l���ǍQ%�0=���E�J1A
`��G���~TL����9r�G��zs�̲�OL3�5�̷���j�z���!�j�?d�ݠ@��	D�6
K8s�UXb�F��e<��k�oӭ�i�@`�њ�cl��i��p�Q��ܷ	N��! �&6J��{�G>NZ	|��9��ǞW���ĭ�Q��)7�?�8�^�?%`�A~l�ʍ�V}��n*�놏H�����uE�&h������ê�2��G��;6�9?y<�<g�dY��jʼǾ��[&�����Y���S��`��MUF����3��g�pXNgc�"i�~ ��4��#�?J��Rzi��|ڭ�o����D�@#�?���z��%؍-����c]�;���|�܋#�6	���o�M���o�#-ꢐ8J3����+��0H�~^K-MUF���.�o.���
��ʙ�(Ν��-�O���'�C��Y�4΁�s'qZ���$��*���sSV��夗���yul
����d��� ��z�]���6�&j��}�V]Ɍ�Y
�������7,�R����9���}���>m�3��D��x�P
J����kGgn��/`�L]�+�����D��f��N�j�2�O|w1��������;ا�A�zr��k�O�Y��@
(iԽ�`��˙E�1�3�܉����c�@����Q�ɧ&\v]L���c:�"N?���r���(�m�NN���<�(�fP%�����g��%qj��������݈4�������w{��������p�vw_yO�?���A<Z݆�:��űv�%r�J��4����*��^y����g�S�fI\&��rȄ1���2�Z*��4���g�p�ʊ2�9���:A�QG�U��X��4a;���
�:@��:!�b
�Q +���Q�1�;7�K�Si{�%&�ɀ���� �2a��qj'�Nnc���>�B��+B�W�q�El#���c�C4�����rq=��i�6+3���B+�%�n;�l����d<ť��N�_su[�|�vۂ���N����9� ^b�c
��Ƌ�K{�
��1S�
}^ w]�ô���f��G$��,1i����2� ��ea@�U�@�F@T��CY��J�=�����Tf���;ጂ�!w��6B��ٯ���sɑ�_N~�y��������|R�K�s����.�S�U�)i��6#vQ}�V1�I��9���<���O{�wP�vs����ހΆ�>/���Q1l��ͺ�6�^o�1bX����v��󏡸��PC0�ְA�����z=�C���X�I�;A�	e�r�ռG4t�ol5���g]��s��h�ܰ��&��=����ƻ>�y0�c0YQ���m�����l�)L�OU�;���s�0��;�����,��ʱ��Z/��sPp��)��\S��-��FD��S(�4Ӫ?�;�F�����~ݑ7v݋���R��Hǥ�t-Gm��t��S�/�]�50��@9O���3�Xe4~L����d�~�	�-t�uM���r�Ga�>p�k5��1�"Ý�@��0��.�ahޭ��0�;zl��ع[�SX�ܜ�f���,�6\ʊ���A����Ð�h�p9��ٹ:���q� �>d7�Lr)
���.�qIi�il ZX�k��w�f�L?q���roR��Vf��P�(���tU�V��RQ�(���65�<�6�
�yq2���[h�M�� {�8����O=��o�2_G�!�`}���d��M���b����c�iI�&mp�4V��psh�]�wl�/� ��$]��7�tJ�ߋrȁ�Dٔi��i�P�S9�Vi�+p���~���MzM�E�[j�@��2	~]������NZ���z;�,��ʊ��r�_���%�����'˚���t�l:���ɵ�xa)�y�b�2t3A����|o
�0]��@�q�=(^��b��-wFF�r��;��O��iX�j��j�dť�L5�(�$��y�7����pV(J���gP0%+_�
��&(��G9Y8�V�p�0'$-]�����q���O >��/>~���y�,>OډOޑ��Q�m���Jf`1ȯ���.��8�pE��oMn�/ϡ�C�����~��N���
������֠Tg%c�﵄��~�#j�Ƞφ�5f�{h��6�۔m���ksp��ƓA9㰚���U5V��تk
|D���yn �uUf;����$Dv���T)W����8�	��ѡj��lRvuԷ��_\Ԛ��2��T�V�Z� �^�vp�Y��Q��U�?����Ʋ����>��NHC�[�������"%�&�U�:Y����o>�`1<˼G�Bh~�| �p�������5k�e�M�0�
ZZ�q�p�@||>���׳j��g�� ɪ�-/��Bo�2>	؍����@�4�@�t�|�&�A��X��f�}r{dΣt�[:O�t�B�|%Z�.<m���y�������r%Ǡ��>�+�V*���藀��5�Th	t��R���g��.H�N����!�vk�v����7ሃ6
{��&�ۨw�X!K�mڿ�?~_C{�p<��CLk�YAay��7�f�.z"o���xp'7��G<���g���[�:�H1,��{^|1��DOW�)Y����}��1uy�5�
�E�����
�f���㿟�I�3;O	�<�q���_%q�D�t�"�z� ES���/捸�4p���n�i�|���J���FfI��IG`#�]����:��k�]#��P����)~gn�ky�<� U��:���%��%]��� ��G�:]��1/����T�)W�����|8�:St�S��y28��̯�f9PH�A��[N�M}���*��7���OȬ�l<�vF�/�&Q%�ޘ���������J����^��m�F̉��*ܫ'�N�7��j�K�}��Z���
3n��:���:�)�����IV\��y��t�����P\b��*G#��J���F�$�����W_s��]�wW��K�~��=z��d�Ƌ@��=zJ���ڻ���	H������׬㬵"gIC��{� yi�,�V��`��6�b����7���/;38�q�E��s����6��tb�q�8x�	��F^B�şb� �5�>�՛
��1Ps������w�xue��RY��|Ǟ����d��59Cd��b�r��l��<6�*���g�YC���uW���M�SC�dd�*h�����~�3�'��
.G�2�ǡ^�;aeno3e`�ř> ~ �*�7=���»c}���ΩK���`�N�+/�T��?8�A�7�i���ֶ|�yc3�!����_���o��e�0_d�����Zv������8���NhC+�A��E�zQp3fw�.�|��>��O�!�!1��������He�%��Eq+�U���:��/��W��0��P����6���	���v�_�sB&����T�/�O�7$����,���c�l{�k�.L4��3���*��P㢞�T:���!�>���m{g�nвݐm��n�����
���º��I�O
۶�mzs��n;��~G����m�`���p�sgi�Y�ϯ���M�L���f;�~E���{̾���<�|ORM��o�-V7�j�qGc5�Tˠ����.wf̤�v;1�<R��(�<Ł
6
���m�\Rl��sdE9�u0�`)�!������W��v߾�����d<�d6�:
5��\�K��?�f'�-��`FE1,laaQ��{+R���Iөp�D�	���Uz��C�겱C2
�s�՚!�9��;Yx�"��2�n|�0#���6�%�6V/|��{g���w����۫��&�7�8� �q+�#�X��`?��-y^�#��ή}�vm�1����{{F��D��|��F4���L<�έ ���\�@�d/��҅���o���ܮ�1:���32�d��K(�>Wt;���=ś�E9b��[�t��ҋ�6в��e0��>֏��[ �)���/J"�������ky
�%����!j�֖I��P<\C��H6�N����&N��#+}a����[FTy��p�{w��=X��/��
7x|?Z�x�!`���z�����g-�/��!w-���F{im=DKy�`X'�qy[4��<&n�ܔ�8|���Mɫ�V��5�#�:��mq�H����4 :[�Լ��p)��(�?�3e�x&L�UE˖��$E0^�KDa�9B9�B�8^����{�;4�`��|W��%&��E�+�a�N��Dղ~%������z�c�`�l�,��Qy���T�����C�O�_\Qܐ��I`�ž��a9�A�*����^=��s�W��d�\�QsZ�\j5�$��G|1z<����a����>-����l��bV�K�̑��0�?H@���R�%Ƨ����,Wb��
~�u��,ة��~���[�>��0Gܰk|	�.>�����V��
���7���zy^94Ԧ諚f���bZ'�w�{O����I���pK�N �~�I7����&�;��c)�.	�p���>qg/j�+o����xMTh�:Q���*��� �A+�6t�ݱ�O��I;TI���jw�Ҟ��8k���l�
�g~y�-�_F����O�8tb�����w��>[�f�D>�z��:��9v�����
���Tj��o
��{��,�܂c��_� �
-yKc���|l�lr&7Q��wp�3�J�8��UT�<֎ +|]��w�ѡ���N��-r���:߭�:�$֙�f���R�?֡�Cd��3��a)E�p��d.�=��ߢ�G>K�*�%�V�v�@�*�^�9��ݷS��)�Mn(j�Bx�m�h#�9镈�%��d�#<���`��b̋g�;PT���,����~q:�����]�~k��\��r��yL�h�y<�F��Q�g�t��������9X/~]g�k����D���/1�d�8��4锨d�)�����iM=��y��V���?`�Y������w8�2R������Q0�76!�X��%�4�y�6 �vD1,�I.��S���,ȝ�9�W�N��Qˉ����oO_iE� a��&�^R��ؖU�H'qo��$�K�7�gF	�ҋ�Ǣ�}�m��Ul���Gq�V��h2��܀+�/.�*�Xq�NV�5�Y+/] ��f�����+����F�,�
�?�v�Ymb�׺0 �v�؆�E���O�=K�B� �l��։����c?��aόX��Y
p9�G�G�s�iX,�7D�Q�t0��Ci����|<��U�xE��\b|�vY��1~H�W�,�~��;�S�`i���>A#A�D��-�W�h���"�	��a���ݖ�0�;�����Ây�:ѿ�9��7(��o6_����ȱڤ5w2�7���	ی��G�9G�Vˏ�
~����-�����p�1�$\E�逤�Sۈ�(D���WPؒУ�a�\����Q������X�?����@�Q�h����i5�����w;k��`Bj�uA�k.�	n�Z��3�������`�Ê2T@D�-���:uhb�=�S��~v(�z;BCޭ���sx��:����b/m��,G��W�-9�k]���>��OO��gd�=�u:=b*�A�����9���7cZ��bZ�1�Ꮧ9�������,I��9�����x02+��]ը��F�l�b��As�*�!>���*��1�UI�
�UO���C
P�s0[J���<"�����&�f�#��lZ����+��%%�Ȧd:fO2�VB�^�Z��:Ni�N�q�?YGq�S��UA�k��w�T�jq�)HE ��BQS`�l�i�+���;�1'��QR�5��?�q�&:|���cGgÛ�����avFI�fj=p.n�s$Zڮ@�"�;6� 	��T9{K ˎ�l#��v�c�%�tTxб��ݛ,q�k{C�I�=�J��͝�!M���w��ƌ�Ω|��Pڂ�u*.��UI���η��������;J飼��<<�j�<qļ��G<�l�Ã�!:3O3�p�T�����^�<�u7��S�|��1�R�<�fL���
�Z�tۇ7:�+�����0�D1��AG�z=�p�A:t����ýD�u�Yi7�A�R����A'R���x�9:���pH$���БT��CGR��{7�Z&�J�w"�+�~/m�{�������h��b����U��d�W����_�fl�A�k�Dg�+��	�W�YK���7]vMzt��;!��wB�5��Dٵ1(:��f������r+�މ��G�2cPޝ�{���g��o�~L�o��z�cGD��8<�~:n�{/]E��BN��� M]W�'��u�����U|���ٌ_�=��"!`�0&�g�}�=|�=����?>��
pe`�Ne�R�`��`�^H�˸���[N2�[B'Kbs��6L���%�b��q:h���!��ǐ�x:m_�[rqq�����z ;^��1�4R����#��r�ѱ�H���G�V$`�:�yi�����R}�t�y�xPշT�8����w0�^] ����z�]���m�m�m߅9�C>.�r�*&���is\����v彂�"�9�+�
tL?,�mÛ�����*�="��$����K4y&W&��yV��2!G�YF�翗����B=w3L�������
G(��"h���pl*��8D$L0>�Ńbo-*��������
���Ml��v}�r�R�p<�v��^��@�;3�f:w�I�����h4���H�r�I��@r7u�i��S�ⳉ��3z�»N[6�^}"Ũ��������R�q�G���z:�J����^z����LK4:��x%꒾�Q��&����>��$��G�
�2�Y�	�?d���w�L��t��uL<O/�
G��2�hU�^Q#�.��$�@��d�����WH�7䪽R<��HQrϩ������n�����F۠&,��r�\c�e?T����b�4�ו�e��fu�+�Z�ؼ#j7�����4*���(��a��Z?�����Eb,������nGϒP��q�;���ǟ�OG����z��ǌ�wCZ���sZ�,��1͏n������p�����}y�*��L!���p7�2�A>���%e6���g�z����Q��-ף�
M�������d*��^7Hwa=
��-�[�ɖ5{�NS5@KO�Y`�}��F�"i���;�7|��PHpx�������G�g�w&���L�.�R����e�ɶ��_+25߶�&3���� ����Q�7Z��lO?ê
�{d��$0�c���yP�q�w83�	Cblr�D�3�kT8�t#\�U%o���  ĠLx�/4":oCPL���rވ��.�ԭ��[��XI���A{w��h 1;�� �4�t�������,�(�%`/�
�
 l�;�SC.�_CU\C՜ #�c?b�%�C6v���{�j2n��8O����C "2��Op4��G�w�$W;G&���7h}���9e52R=�Lv�*�
���TB+50C	G*�M�p��V�?8�i"���2�K4�F�����0~���@�(�x6)
E!�� 6��ȠܭD�Du�f}������D�P��ch3��b�2��Q����e�$Y�v�j>�3lrh�R*�r:��3|�b-\Z�[�9k���gz�5Z7�w�)]�%��J�?I��	�l�))���ǌ���Gܖ�{O~g�Gv�{�"�HD���x�I�Mk�,e�``7(�br���:�T�T��R�4Fr[�`��1H�rwrN���Bϲ9�����ڭ�o�h9_�9���m�`� �ƶ�<�A��&��1���"9x$v<�X�A�t����,��B(�Sy�]����n��gP�rˡZ����9<�~�R���Ã�r:آUF��&���BP>ࢄ(�%���Ⱥ��-b@�~{8�uX|x���O�O�?�)�'�޾!D�Ő`������@�X�M+C_�
�
l�_��^��6P�fL�szF1_�M.��u���A45��֘�WZ��ͪ�
�R��H����������}q6dR�>�KT�A�.yNw�i����>��]���Fu�?�Eֻ��4ђ$H��.�a�At�xee��*��IQ@�C�!"\?6�j�
gTΠ6s�z7#h�+{)��ࡤn�^�T?�^�kʋ�T��]�>Xm�jW �R�$�
��ŕQBq��=v;��R1�q��T�"%\�`�rw>���/�N���=�zeb��u	7�v���0I7_kW'�{�`;�,�IqHs�v��z�����K��K;V���̣�=��{e*���#N�߸;�	�p'1]�\L�6�dXLY\����}���0���~<]����x9yw:�o�3��EՇeXi��$:��v�5���E�{姢����$���E
OO�"G��)��G��g�[��
�d�::ҹ�^�2��3���'��NW����T��M��E/���h������g�����t�h�g�R��f�ރ��eϲK-%,ϧ�&�`��|��O�2�۾�xuڥ�[	öԞA����*����pAːAF���{���4�)1�w:$��z@�i��,�n��"糄�'s�pHqjI�V�x`ȟ��Tqy��c| �����?���[����2|�*�4�i��r��jI7�n쨟�r�"dj x�_�L�ϣ�Q�z�'��	m&D0ɴ��O�(m���)d'k��_�Z��Iv���=RA��ˬ�ˆ<����"VS��'��:����JW~�ot���
�۟� �ҰT	�����(K
��}�i�(��Di���j���q~Y@�
�;y�
>�KTfG��D�QD���o�˂p
�����g��Ϫ�i����/7(p^4�&xkv �Yi�S0�%�+M��s�;��S$����P������b~J�\�<ω�z[�G���V��<�t��ˣS�s��Ѽ�Y�?�#ј�A��5C�MC{�j1��L�����]/��D#���Nٲ�������-m�/���Tcn�t�SV�bF�4ԳWh)��^�^��9�N*��&¥'�e6o�K���~t?a9��0���Vv4<���<onӼ��M�������'S�,l�"�W����>�I�n��ӱB�^Yh�����#@� ,�����5źg����n�V��z�|N#��}@����K�ڋ�.�~��Wls�und��H�`z���K�0
��*��v� MC���t9M��s�K���m�+�.�:y�h]O�/���P��Y��F}{G(��;��K������0?����5�`MK&0�[Y���{2
caR�	�Hщ؈i���E7t
z���Ƞ����[e%�"�����Ť���2��rQ�5��0h�sU��S�c��#k�l-`�ܴd�����ܬ�GHS��LWe���c�i�h2�2t�-
4�dD?�pz���(�ޝ��u�:�y�����a�Ь��sH���a�^~�^�1�@Uyc�����[�����(��&H���H��5Κ�S�aG��8ӥ�]��!�՜���:����ic
QU�vu���+0d:�'��PU�pe��]��?���� k1�������.\���#�{�]铡�N�j�"�t(��#�l�ȶ�w���7�Bs�ė�{�,�T��E$�B�|�j�SD1٪ژ�3]X���oB0j�Q1qD&�3��#�j��lN���J���m�Gnx� ]z��ѷ��|�}�l�4��.�Ɵd�+"<�Yӝ4��S�`�p�7�ܧe��rr�+J�_�T_1ԠG���\��I�4��$���$SX� U�Ƹj�8A�h��VG]�-�F��[�X[��1{�����J�;҉c�yͧIc5��i0�u](.`�5�*g���5�J?tf���\j/�A��8��=�)_�} �(�]���6]��y�P�*���'['�+�6(ƕ*e�V��hn��\|\
qQ�����j�o3���jޮAF�ɸ1������Pm�H�ר)#eD(��f�F:?��Z(���w,ֱDA����dmDx!�aI;D|�"A�x{l:$�w �����
d?��<y�gtg�x���*��{�%�<���(�L��a*��rv§w��O�.̥���\)�
�����:{=P	��h}o��7\�ַ����� ��3<3�DV/U��d��L�2�f9�ֵ�g:��o���kJ����Q�
�ma��2�xþwF��)���c!%p�՛�Q޶��M^N��hD����w��������7��C�h`5�o��
P�p_�7���9�����|L���
�T� �"�4��_xB�L�4�8�$2�$~���]�+�h��[��A�P9v��Α��c
H������'d�Ǔ�Fp6��t+Lb��F>����@�dn��*�n�#߬꟯+b4��
�.��m�%w�E����ty�V<w��LW,{�cc	�#9Y��$2%~"��@�+����g�u�bg�#�U�!A7	h���F쾌VTU9�"4x;���9�n��7�=�/$h�"x��yUV����i�H���g�	^��	��BZ��r�,g��p9:����a`C�������:�����]�iL��d��d�h����46����y�,��z�Uy�ɯ���?ހM�
E�ރ�"<G����8LoV�K�#�%ӕs �N2�fh��l���w��c�	|?�u��f;�r3�mm^ػ������������;r�
H�uPU�V��I�[U(�r�Q�N��q�j�[����X�{mǒ �1<�Uo�����J����U������=��2M6V4�j�*�J�v<U	wV��w/�D�I� =[U�<���Q�կW��Mj����
�u��kh�+5����dy�D//6��o6��o�%��4��o6��զ�%�O����;o'G�?�`�$��lq4Pw:t R3�J�(���
y��)�^�S�
wO��Y�>���K�çz�C5��0�!d�����]m�$u���.���m)���$�)2�y%�G$8 �83��Y�+z�S̜����zFg����������s���SǉH{ �+��HN�#���yES((���	�{Vj�/X��1L;�u��:]���Z��ImL��X���ӆ���%�f��$���/
 zO��Q{�h�ޖ mX���ZOXy�5lIA/�l�@n�������S�	.�>���M�^`��~��w�|7�`�[׆�nK�_V<�&��,�3�jB;�͊���%��\7T����ع*8m��ϸ0��r�����+��D�>Y��Ѿcee���6�]N�6U��T�C����k&����k}��.�P:2p�"��XBȃ}bÜ�$X�����\d
�L�rIG��I�5p�155��ԑ���`�W�e?O�/�E�s�I�7Y,)������j��Ϊ�R�K	��>�l�m0~GQ5k�.V���+��lj�xO��BZ�CSxP�g�cd�Z{��#x�������zx�ɔx�/�tg�c�rr���v� 9��׉8Ӫb�O`�
�#��G$2��4�٧�"5!xB���'4<�Z���I!�S����~����k�x�	`-�_��B�C��߬;�������&`
�5��՛ʚ��Ś̳��m�����@|���@'�D�NM��Ь�?$'�D���3�ʃV��G��t����#�8Y�i���ɯׅV��ߦj^:
 NU�ushHp������T��4������?:���k5�H�X�>^��(���
ty��U���u�Z�=��U��D�SM�/Ν�VW!B����~��*�����hY�\�VbGs���Q�7�VM����< m����Ko�n��wáT�7���
�;�Jbc����降k��G�4�߰E���K��
�۠|��$Ǭ�&ެlV�e=��G���5㓮_����gB�8o��D�
Xw��V��[Q")L��h[�ጯ͈����c�0wN$]Bp�����JU'��\?!�����LS�<�D۶S�V��q��V�`�R�,�F�>��]L��Xۮ��1��,�����)NLv+��Vd�爑mRcw潇I��I�
��ꗕ-���ws6*��_�
�2F%A��Ǘ�xG�ô>���jl�Bp��7�_a/������E�r�
���ak���֛�'��j!2�D������l����z��/܅.�w�]�	;�w��N���Lv��I�1�<#������rh��n�S��	�k
:xc�:m��OU"�bx�W����<��������I�>'���+�7@5�i`������O V<p�r}+�5��
�!/,�l�}֞j��)�R���7�k�ԏ����<�男~��'����������b_�����	��4m��������fl��v3�$ �w?��=�2�9?-��u���:k����5Gyb>�_v�oމ<o�?��L)?[��d���g�R� �#
������D���=�h��D����Y@�K�n����R�����	��.;,5)<���M�׬ɳ��Ut!4��e=	��R�I�i���z�n㜍�/�=+@0q�%��I>�\D�S��T2���	�׊i.v׏r�n��Qlu�#��;���Y�Ǿ�����;ٳ~�(4�o�=J}z��TG]	H����
��l�a����&�_�kVo�z�;�,|m.s�$�-m��`H<	�E>�Q�Ul;3kӸ������kb]�����
���vT�kw��w�j��x?��[j�i����^q���n��U�������B��\�F�hT.312��^�M�Ť7��뛠N"q8����o�c�.��.�y�=l�{�6��t�&��3��M|+�aM�N&��]G
�+��h:�� <��Kg�,�*�;Pyl��Q�ο�m�be6�Qk�6C��L�k/�����p�ø �za������D\�O4��H�v��B�u��b�ض:�c�
)��U�R��¯�WD]���5q�|�Q��¯&�ת�"Ш%sL�񬠒}ۈ*Yw��z5��0���#�0[!̶5���c�E�(Vq�s��T��?X��1���&�|�=8{Ǭ��K*��>�	Bh��AS��W6��� ����kWc�?�Tr�$�*�"7GC��ƒR=f�b
�2���,9aV�i��߿+^<�~{����[������h}�b돛�?���ś��U�b�oU����;�*1 �R�A^����p h
��qOb���vx�����-�n��U�+C��V@�|q� @��
�-P��爲+��"A_��J�i�T�%z��E���Q���5�V�u�8��g`=R�����8�xB�E� �F�ƍ�����Rǜ�L��ޙ��s����Q\��O�e�]��"aTG?��n�v�=�-'�_�r%���pڊ�~�;δ>��>�KP*<��b��|���騤���4k(uM}�p���n&��]NI�NTp��~��~
*���V:�iǭD�@����!� a����tr-MF<���vlog�J[y���k�� Jyn�:�C�����h	�3�*�91��8%��^?OxYL�:7!o�ńs���zL1����t���f7�������nӤ��9��)�|�mǊR��]>�@*GSu)�|&nZbWA`�����j�j(�(�H`��m|!�e����R�ױ��!{����
���
����-�5S&£H't1k�X_��ʘ6�����SqCZ.K	�`Z���c��K��+��-We����7J6��C��f���r�Q?����ID�O"�;*_��C���m�&��w�N��'�d�ZؚFݖk��׶�S�I�a�v�`ͽW߄��H\{��hB؀ߚ5�AH���G� �^Eb��r&w���<���乽}��sS&Ϛ�%&�]�@����T��f%����o�, فnL8�Y:w�~�l�	8�R1N���T:����}�	U�]��E�<���^u�KhR`�I	�b̎�zJQl�ńt�1����	v%Tm����#�ѡ ���q���Eʨ�Z�[{����X,L��W�	T/���Z���p:m�L���H�E��6&}�.t
}#M�p<Vu|�tA2�*�����Mq�m��� ��5P��t�症��{��h��o[O���o����jL�@HGV}�%���v���[�t'��O'4{�.�>C�u�߿��[[AG��krh��kY�؇�&'K�ox"=�r�\�u4�O��l1S���cȒ�M��}���5�*0�!���OU���|.�*B�HyM�����w��B�N�_���u�괱��P���ܻ�x�ϔ�z��08�
<��+;���A�蓐Wy�p!'�
Q
�%=GZ��*�Ί���t������ex�z9��>�YQO����%��M��U���P_Q�A�__
2-끖4h����>� �c���1�۾ p�aKM��l:�<!-���� �n�Ѳ���<R)N�2�=�ۑ�r�1Ȝ�F�
U:V��d,
�v����Y��9���z<�X��g�P��LFC�J׭�/��,��>��'����2Zxg��� ����Xi�/��8�^À��Ao�����K�I����	��+˿�� a����P)P�4��7�]h��+�|�a\�
rYbj"������2�:��R�X��f� ��J�h��I�����e"[I���5j��;jz��
��Z֚
ڔ1���rr�%�d�V0�f�������5T���\�7Sֶ����Ȩ��鞻�~��v��k)�Ћ�'�\Nw���a���ƺ�M�JY�#I*��9!M�d+�ea����0$`{M��xEd�ω���T�?��(zw5�^�	�^�1�m[�9nMx≳��'��'Bv���֪8��n��;�i�s�9�Nx���]p�%�J<:�e���ve�]Ka�j�E3Iw��	j`�LWV�n�O��&���?<e	[��7^g����Ri7#3 �gd�ɘKZ)]�Y�#�˥f�O��RCN��z���^>�kZ���s��&_�$�>YYT�9Lǫ�X�Ņ��ȩ�󼉜���9H���P̟�R)9)�ڋHw(�i)��>�-n#�t�p������?��u4��
f����b��wիƞ�YK:a����}sf��zF�Q������Lި��	� �/����nc׫B|1���{ͺ&��0Ȃ�z���R�69��-�SϞ��|��TF��;\�T�V��Rz���A�֞��(���L�t�{��4�L��5��mo[���<��g4@(��|A�^%*tH3D��.���j�fD��g�N&4i���YC2>�W
�� �4+�|F����ؘ��AC�w{��X܉����k����M����цts=��
�a� C��=y��S���!�!n���9y�3��C��0B>��@��86���e!��e��?!�#+��&��rn�����+~|�2I�%m��铐�4�	������͙�`�mw�:���rg�9 2f�F2���Ew8qt��0ϙr���B��f�wvK!|d��_.F����6��ɐ�x�y~~��@K~�z���w&�!����]�FC�=���KxvxQ��B对\l��&�]^&3�84�z	y���>�[�=�:��23�b��эo^��!.�;�˖�)2�X_9'k<��X�3�!�
(�<�x��R����9�Z�o2� ��o:�7�5;H"~��,?]�;p���X�]�:]��\v�ގ��)�v�/z �_�;�#�_\ȇS0{��R�
|�yl�@*���!�98R,Ks,͔� ��&����}E�]�R0*�u~�����\��0���Dջ��(�z���n��qUD��k���
	ݯ"�-t�iZ˂'I|&���Ԍ�:���^��\�{��ы�� �?��*�%&3��&ܥ��:>c�� &��n��b��\��}��9��`I��45~Yɝ6iQ�uD�(\�~]������
�X�\�)�c��k��XcvQ�+[�W5�,��F/	P�i��P�WG>,���'�����*���_̒#��Vѿ�i�޶)$���j\.F��V��f�vd��kL�t���j���uDR=����	$���AbM�3V�m	��� S9�u��Bq-	�-�ŕ�	� D���v5YW�ш�D;y#�l�l����挶���1m���?
���d>�Q��W��W�ɞ�>z`������o�P����/ƍH6U���=a���)k��U�q�	��鏽l�S�x��3�;д��L��rB�"���
��_&n@x�Q~�9e;��7��^��zϤ��=�.��e�	%�],�-���(�M>눫��aE��U�RI�0D�(�i>�J�6����Q�־�b��:�@Z��-�H���ʺa1@�Y��|1�:�g#D�>��#�`(���b��ڽGd�Ւޒ~���\�o!\��nh����Xlݏ����n[T{�w_An�ŭ�))�V�HO#Ud���'0x��p�
;�����Shwm�zg��:��;��3������b�gɾ'�E�9�a���Z�؊IԒ.�ułu"7�����ȕd$��:�-�E��5�b��'>���27����)��·���<�غ*��:�؃��"�cy%�E?=O�ģ�!��e�N#4��ӛj�%�|Z��FK�.�����({i���A����i���0Y�+v�v���q�]1����H���] �H.�*u��B(��<I���Z:u����L�-�?W��۟�U�jg2��o�ͅ����qW��m��刚�rT�hmTٔ���51k�Fk@�y[*GDK�t��?k�b�a���K�ݘ�@E���9;6�DaAj�&q.�ӺMm]o�Qər'[h�1�Ӈi7��]&J)�l����ļ�8H��^S!F@4ת�d���R4�Q�j
ޛ�k�1�1\�X�8�3��B��:�}S;kC�G̱�O���!� � �~�\�u�ˬ�j�wi+�.���(�k'�Y�1����FU��L�rO�2���ȸa_��N�n;>O:�$J�:�t���72�{��PK    mFm�s��0  T�     source/excanvas.js��v�:�?���H�M���i>��v��]�eYz�DI|׉sm�I�e��<���H�lKv�e/p8d�ml͌F��h$���������ߙLC��h�X��ˬ��������c�r�l������o�Sf���������7�Z��UF�=��W�$oi��5�Bk0 ��؁��z���̭�7[��=2k�S��r�����7m��cO�8�e��5
��E��Z�j6�\��I��A��M����w lGHo�.�g�.
=�X�b(� �u����=�����ЙO�V��Õ�3�3r��w�P
.��$ <(���k?X7{�u���JT��<��{�h�k�߷_?����{�s��{�xs���V��{�w7��U�9��"]�Pd�A����c	&�g*X��3v�P��diO�5�?�BY�Ϝ +7 GD�ufNh��N/d��wso5�n�`ɂ�H�/�7v� J�n�`�Xx~_0;�	�{{�خ5��/��Hu���f��d=B��}e=s�� s=���59�1����f��О?���Yv\g��"��40�Az�?
��ga��)
ǚ2jIv(*֚���^���てl {{�<p�t� ܀�=�.��ZM���e^
A�}�
#��F"�3o���-��gS�YL��;h�@(�C@:xkT��K7�Y7=Pp���=|
(3 ��ȷWJ��� d�|�T�z\�P�	C��
��f���|�}u,^�c�u5��Մ�+�gP_���Ġ>\�>2���O��B�\E��|�1�P��;d�AM��y��c���Y"���lV���>��3�e_}�aBEH��7�w�ͬ`h��%�J�{Qe�JbP�����V��3�*�A�ݕ����@�%a���3�)"��?�����ƙ��� �O�KQ��靜�q-ޒ�e/��_���A+������Ǌ�\�[A1U�Cҽ1V.�G��$��b�{+`�@��t<d���]�PB
:������|����Hh��	P��>ݡ��G#�TAVL��v}f�6��B�#�q��J�'��K�PB&DY.q�R�6aa��:�X�c���x9"�,ߊp��ތY,@���O�*c_	��B|c{���*϶oͬ+�l�e��g5�y��J�v�NR��R	�����TJ�R~�L%i+����Z8k悙��k+I�O@�ٸL�lYW�R�Z��L��=��w� }$��ϡ�O���k��ߞ`U��p8-�o�ȕ?�yT��_�U���1����#��5�B�:�ɜT�t���i1�!��Ԡ\�%���D�=�H�=���>�������{��-Q�ku��u�)�ʜ�����Dmȁ����U�O9	r�}ee�DЕJ��>�+*@o�}����օ���ϭ�kg>��zQ����dWE��(���KXZሲ��'Z]����i!��P���9Qu	���F�p� ?(� X/��H�j�UkPI��UkT��B�Iנq�J�"�̜~��}{f}�E�l�Q&qq(!4xe$qG��
H(��6<�oث)걬D�@X62f��3jƓ�O��ߖԖ(K.�#��3ePaNc:'��s��0�4%�6jy�Ǚ�B���T�-m/Q�Q�V����o��#��V�ril��^���P5�l��`�aٔS����sFVY�9�������[���C�V�k�������?�����sh<����=��ۥ���\@g�ڞ�`���'W�7;��j�Ȟ�6�8���(�$h
2+���?~�OaPR�d��A{>z�a@0e,Ģh�e-M��g�S	�?�@3;8�9C�á�8
 � �m!�Ǡ:��L��f�\����yx�Y�Ӆ#/1ҡ2�@ӒnTF=�BJl��{ڧ�V]�sA�P�_�(G2P��y+�JW�z<'3�0��CX�=��A�7��`�z�O�8���|1uF#6�,Y��\Rt��p��v��X7��/��
?y4^���f%�l\����K�] ����/����TPO��6T�j �B �G��d�P�{�SjY��w�
�1�)n�9�G��h����E��y��Io'�(��M�l�:�y1R�ƣ�l���������'*���G=+3��̡֛RG5���@\��a�F:�g���4^	B ��ܥ*u<�gC�=U���"�n��6L(q!G�K6��PiakRE�D��'@�7���%��4\(#
(4.��/�\�e�I8���}����!����l>o�rG���f9�U:#P�A4p�T�	1%���4QB��`N
Lg��!ҁA�e��`D���	B�C�N�9:Q׳G���ӄi@����Ih%B�Q~�.�K�=ɡGΗ$,�_s��# �F3%A�6&aAIw����/(�r�4���1	���HѴ�����^�>*(���?-l�C/2m0#�#�6���#2�+mu[�|�h�=����bl�k��7�!t���r»�!��I��e�y(nb��;z��5���@�$��Ғ`8V6e�5���jCC�Gق���b(Vf�:s��:�<���hA�{
���^
x\f�fP��u�?��4��&�
���C�*�EI�0��8�{��T�`�i
,<�5C�������܊=���E�(C��wݻ���33���}`69A����T���������!@j�a�`�[�ź�A����\$}�:ta��s�Eq[pϐ׀z��V�K��)�᎕ �u�(�W������nQ���6=�+[�5�Nr<�K�T3eF�;oX�Z�y��wV�ʁ�U�!k�acԞ�
�-��.
�� �!�B��
�(�P�ۡ�!h���3�h�P�L`�*mcv�0v� �`�Ź�h��l|���Y�����NIp�&d�Af��]
[gVD���:��c�D�Hw��]N�0
�iT���fp��p�z���Cgm���K��Gl��dk`�.��͚'�1��
��F�~c�Ey~p� ���#`:���͓
����y��nm ����a�>s��C��ͪՀ��Z
�nf�`��d�ǭ��3b����؝�Y˨�`�p2�*�t�SFլyլ�j�O�ft�
�p�M\��[�>�=��w��w��w���Cd�a��a���wqLڂ�6�;cc��ـ�!��&E���(�3=��Mك���ʄW` \��*��j��K
{Ap���[ϙX�d�#�E��Q��9��ʁ?T=���y�kw�sX����\O ���w�1�P��ի|��:�{��t�ڈ�С'�7�ݶ����C��9�}�ӱ+o��.�G3�5x	XeX���m��!+|���9���U�f
�D���և�X�];��)`��}\��K��?��K���o��_B��]wO5�o��̆.�`N��~�H��n�ˌ�zF�y�q���ђ��[�g�w�9��]�Z��}�sX���̛���NW�[2�srY�0g��u����0�����V��֒���Yy���]��i���a(�~�?��V|�"�60T��+��:9o�4Ϸ]^���qÐ<��KnN�Ώ{]\ฟ8���^?Cߙޜ8�4�u��M�
c�l�� k���!i`�b��Rs�D�0�A���9�3C0&�:9j42@��4�?9�I������̞`(i�uV�=�yfG��'׭���A'����Z���?���a��1�@خd�L$�v�0���Ӷ���g���Y���+k���{v�	&k��?�9`l��"�B�:�n���9�@�P�a^E�h�!�O���&�wf�d'����� ��D5�fＡ��"6�n$�[��@\���V�}��qa$��m�ήuJ��
 ���� �i S/U^g��[3�{�+b��w�`�5)����R��+�Ԏ���ޮ��ξ�U�s5t�Pi�����7��D�F��w�;&�	I��@KK�Yk���24���əFݵ�)���I��6C�S��X[ͣ�?��
6�e`�Č��Z���.���¶�ݳމD�_�u�+�dϢ�D��jt��m���7z�ss�R�����������4�(;
Rj���@qC�j\��`�Μ�vz}3T����������p!c�����9���p1�çg�L�p�/u
u3��h�t}�����8c#g9K��''�fȸ?��aToz�>>���K�����F��������i���2O�O�z��N��<�~�<�������t̀�O���y|v�:�y�y7ϛ�
j�l�L��� t����������CV�%ĵ�
D.��x�N��kk�	����?֕�<0د1 ��>뵴��;_��FÜ�� G�M�6����z�^��띵�&0e���:?3�$�������q�c�:���� ㅨ�~�X�a��X�Ǣ���:���]����|�9�4:�Z�����v���R�tn�L��m
�;�� ;2vG͓s]!pYD���踩�+f��g�Ӗ�>)^�G�MW�B����� L��
�{�Wo ��s���q�jibKu)=M�	St�>6����p�C�}M�<�<ں��
]�T��DOutr�����XHҜ(Z�
��AJ���)
 �xx��G�Ƃv�b�4�^a�)L?s�	3�^��fާh"Ew�xG��C����ʦy���d�2p;<~�L�+|��4i΃q�W��p2�w�r����K��,�
�p��Vӄ��� �
c�V�P��	,
����Ђ��u
��i��S��a��f'�欟\YG��'q�a����%�d�v'*q��yYd.��N��1R-E��dև06�����V�C���U�ᗽ� Nۦj T�*�oeB{�lD����el^��Z��1��Z��z�f��K��KzxҰ~��
�SX#i����)hP4!.j�G�cףt
u3Z
A�r����G{a�ǽ$�N}���"0҂��صc�W��UnB3�_�|���9��~�]������t�D}V�o�ʰbM���'x��D�@���L���O!�\�����4��}(Q�����dnD��0�*e)�%����_�]�K�i�>8 h�؅�.��Myֲ�k�	'�7�"l ��B>ȭ��A5�qJ�H���[b���h٪�;gq��"����B���t�"���ٯ��Q���>T�Wy/H}S$F���D�Jg�0q�M�A�z�q�����A�P�7��f������_�u՚��?��W��+��g%r��K����,K���|ai�8@��Kj��䡠����=�{<n����'R�}�.��x�= H�*�ټG��)���h�)_���k�h��.bM�B��9� va���ǧ����zHG�4p��A��
z`6��3�W���L;�.�{M��3��%��� �U�K��M��G��.��}uCQ��J����|1SQ�+&��#ڿ`�)t/�����\2��t���H�os,���� v��\����&���]�b���Į�g�i�Tj�<�*E֕Y'�l\4J)uuW��_�4lDEo��;z�� HI"�p��g�"d�y)�>��	p�]�Cc�-����OU�M1��q�6���t�3oҲ$��^�_�6+PP�9�#)k��
Y}!��PUn6��<$*�b�#^3r��np��ޤ��
�ú�Kۅ"Pb��=��Q��b-=��yQAwΉ�v�)U?/�0��s9�5���|1�pw�*���qao�� ���<j,:j���VZ���&���2z�{9i;�ϓ�[.5�`�����m�F�o�����+�@%��/�����5/��Ke��,7nﲦ�xM�o�8 ���;�c$��> z�U�j�b�B�;������B�0K��!,�6�9���V�#� U|ٺ�F8U�x�e�q��_�Wr�KH[K�"m=�F-A�� ���AGrlI�`[�v|�)�q��u�^���F�X�&^цģ��ڇK� c~��<O&Au�������t6��Vr$J0���>{*)�B��|�!�t;?]��o`�ۿ(R$&���a�N0��C J��)x\�����M�xy�½M٩�tޮL0���?Y/��%C�� �S/5`� ʔi"����e���q�%X�uw�Fp�i�*����aL� ~Nد$Zz��:��dS���!�,��8�r.� 7�]�¾裭$i�;|�X��L�Y|S�z��"h̴/
����e�CWz��,�o�I�<���7�����b��}P��M�6n�EOv�}Y(�$� ̠t���m4<ҟ�����\5*���hf$a_�H�L��7� �gA$���日�z#�v�L�N�S5j#�J����{�l<���>]I\��:��׸��t�ݷ9��>2 �I��a�&���\9����>�#�D�#v�E'�EY��X����/i��Ĭ�� �N����<LP+ؽ,���K��#��E�W�&r�t�t#��u������0Wp�x�09���5X��ߍ�9�6&��y�A6�% ��?"�7[�f�w�;K_W�Λ&��6����'��B_�2�H.��x�X-+^*
+!L�y�/X�] x�,�K�B{O�?tct`.�~�r�6��=��T�lhE��ju&8�AI�[�m}��kksꆧn��-�me�6�j�
JO-,���.��� y�-����r�cFFs�j��4Y�jR'E;�d�8pè� �� �\l:�*�,O��g�����`�b�A�l^�N�ν����Y���oc^O�]s���mj��8��]�oV��T�i��'Q�b>�~SfP��A
�bԐ�%�)m%TI��ٌ�y�-C�\�
���C�:WS��+���f�Gk�F��X;X��a{�zo>�_;x���	��/�	η�� ��;Ɗ3�`��[��KF�[#��G�lX�qs�Q�pR�!�M��у<ts�P�x��X8oBU9�c�|�u:|����q�@҃k�>��\BŃJGrtƑ����>JH�H?I�f�#0�q��:� 6�Q\$�E
��Ya����5rҙ��4��լ�-���!��H=����X���X�:�(GU��jQG��U�bD*�xft�i�ޑ|ҫ��&/�|!db�� 1�C� �)D��E�~�l�h��Ҝ�y�S���h"c��!�}ArGPx,�#���0ԗ�&�σ���hR��񵮸6��<b�T�y�r�Fn]II�=�����Pu����j���:����_ᔮ�� ���ߚ�
�(\ǘ$�T.�tm�Y&��
, d��� �3�MN��I����#�]��o��&���~k�		�k5��?d=����W�ʂ���D��7�&���7[n���t������5�l�g?S�S�� ��68�|EW�-�b�
AG��+3�{:�3Z�#�k�POu��e27Nfl�u=3Z-��~i;<��tI����RF��J0�]R)��!3uqT��2�2��a�§��A%/��������|����
I:�&�2�H'@��)%>�_+S�S���ғY���Hį�94�L0G_(�T�@ ��
HP@ A��*�@����tV<�=��6g��Y�ҍ��A�0�W4K[wt����Ң'0O9�Z�4+~�n�(u*R�t8"�劜���_��'�	���{>��\�@.ܔ��[0�9\/��	Uq� �k�s9x�c����O��_��m.p�}Q��zJ�髽R��H��U6U��%|�+@�wW{�jc8.�C^"t���� 
|�^�A��{sn����2��������[Z;�֨�8%�׵����79`Jo���W�h*�`
���e���>L�
?щ�X������}~��*����IH�,k�y�
Q���*oXX��s���L��҂���C�{��h��.�h"��So�7	qY�K�(�=3�l�[Mhx/��j���T��f�
T$Q&��-�= ���∭t�͢��#v׈7��0��O�bX�k#�J�,�_c ��v�w��.o*eqU	n��+W-q;.IA����ބ�
c�.V���~ŋ[��nP3�
�1G��Ҝ:l
>n�]����;��(w��w���B�б 5,ʌ6��S��߇����T#�&��!�
!nQ���`a��z/)RRʴX��BY�P��z/ �h�t�H��G�K}k��Ƴ-��j��@(d�T����8����U	b���t/zQ'#!��[\$��\0l1JX�
���v����¡��Ɋ�<m�\���G+�k>&�P#�)�l�
*p��!.��j;��r�8(�i1�Ϙ��+� ��_�J�L�y3Na���5�c�����qꗤ�Ai����7��1:�\����`�T�j��}�y��V�q�uJ����O5'�Ah$�S��Wqe�h�$"����\P��]Q
��'T��޶6	�?��R
�_Ǔ��]g�@u+$PX x�>`G98�����կ��R���� 8_b~�����#gx�.x}~|�sbAVǌ�������.UY԰el���D��b�h��y��m����\�}�O����y_G6�Q��EaF��Z/فp9�2\�0��'�����V�� �"j�0��B^z�N+M��%t�n�ڰ�+/}e� Z`�7@�pG)�;��߿ j<,�ĴI|� �%�m��2�u�Tz�%���IR�_�k�աsƸ�~<r��z�!�l].P����!Į/�.�ZF�}g��ozK�O. �B\�HqE#/Z�"o%0Q9����A/���@�cEn�p����=F "�n��P��Z��������B���&��F�u������_����re�l-�ι�^}�}���Ѽa�;�F��ަ�����Z)<�i`I
갿�����_���_6\��Q/6^����\��:"b(�V��9��
j�? v��5�f���������-��؎Q�V���0�e��u4Up��"���Q�'��Rk�c��7`ߚ�uM�R�k��W��WqA%�	B���9�QT����f"FU	a'�$��J�c'I���T��+�<q�%����z�����o�m��u����YHPkC��R���)K�����w�#v$��i��I�ߐ(N�$��ީL	�h�$���L�E��
�#r��r�r�ߧ�ߛ�E���x�j����G�Ñw�X�.�}N]I��<r�	�Sά�m����K;v�]�t��!����؉��}�����q�O����(r;㬼)�_��T�<�izȀ�K��6yd�#	3eN�'��U�[�z���)쪮��2q�D�$�� �����sL"n�Es\4�������<���	X�,�@` ��:t�A7��_q���РZe�ď���f���&��:,�$�˰b+���M�!=3�P�v"9�/b��f���z�"v�֭�\��)���x���A{�ޝ�����s��չ,�8���_ٳ�bۀ;���\���s���N
� ,�>�pTwS�D˭&�c��*���
;%ʋ��hE���l�
ᨮp��)V��.�~��^�]P�Gd�~OЙrT��h��M������g%g�"i�UV\�o&���)�h@��1K.X��<� �����!�kݞ�.�`#�����$|��m�����"�s�����7a����I/��!�e��3p�^���T��/�u����(<�U3�2�M��	}�Ӕ�	�K�݊��2�؝��P�l
�RLY��)E@�i��^���D��}ήȟpT���X�ڧV�N#8B��Ғ�l.�]]�cEۨRÚ1{�(��#�L�ޅ���2vL"���̈́�W����6>�J�x[��� GD�AG����ڃ�~V95:j̓���k�(��f>���٢�O���������|D��
bQ��e\��ojk�e��6r`j���6��C<��8�"\������m�#��+F]�,n~�V~ ǋۗL�
`��#n:~T!���x������������>���bP�D��È�jF���i���A��@�V�pɊ��WQ�T�xU�(�G2x�i��cѓr���(/I~���/���Wj㼓n��0�a�݁���6m��v١���'M�+$٭�&��C���vfbbl�dܸe>�Zp+���H�}Ȁ�����[�N"0m�֨4�T����������s��T[��t��Fʵ��}J��03�,���a�~���ɻ�a��p7e�Q8��(�(+x��(�	Dp�R���Aɝ���[Kk�[�}���!H��e�
�H����S/��R�7�4�6��tT���'��Ͽ�y[@#�I�zRc�DK�e��A�B-����ܨ�7,�V�T���u�h�"�Y��X�
�7k
{af�!MS:J�܅�Bt�.�7QMM�׬�2 �����p���B��6�{��F�@�;M���*��ʰH��L��HҋW�,�
@�c�V���CIн�EOƛ5qț��C�.r��Z
�n�Sx.��1��m!}�67mgMe��ظKg_���{�
`�
)�x&Qra�
!2�,�x?̔i�?)7l�4F���Ǥr����9g�P��HpG/02@q!I�׭ق_�&�j��(�4EI�\pA9#����}�*��/�6��3~����I���gZƏ6�B�7/�s$����}��s�=�Z�K8��f��L-	�0��
��|�[�dx�7O�j��9�FVE,{VEIm�2קhkA�aHv�|�)���򜂞.&��%�y����W]�s��W�] �^�����䱢��_%%�q�rT�dnr(��;�=u|-�^y+���~��)?�6�* U'��:d���N�ɻD�rTX"�@�;!�?����$��/Y��LX�l�/�n/���C�+�3bcl~V�헾4����9�������U��q�V�x���4�'��@�*`�2��m��l54�l����h6-���BG]��K����>/��U�e��R�kFZ�Z�L8�Ń���4�o�+ �M\�Zkq�N}���5��Qo"2��q��.<�a��d���!��ge��Y/ؕ��M��?|KӼ�2��
{0ю����ĵg�N��?{�-y��-y����bTr��H�%��m�a3�`H_3�y^?X wl�c�i�'��h��/�v	�FGI֤r�2?O���Sm���(�g�q�fM�����x��>.AѬp3#)�;1�MNO�-���,�/���+�j�yѶ�$-\����
���Tvkc�m�pw��[���e������2������m��KL(�@�e['�|��gn[�=�k��|`���
�QW��~��
���S^�6F��E]������ڶڌS9j�g����$�p? C;N?���3C������9��/����B2�Xq�j�G�RѸ���>4m�2�X��l�#���2��2d�v�:���R��_��A��}��]8��e�z�i�i��Z@"?��]A7G��K��J

��[����Ьtp.�h���>-u����v~�7Y�@�y��޴�u����kqW�H��|n�s�̕�X�o�,�;g����a�FޱX�����F�W��!�3�a���2���_U䑎�{mLt�mݒ�<��A��j��x��фʭ���8s�aJ�d'��I�f6��$?3I���b�䗖Hm�g�/�{ �\Ԑ��M�i��� ��g�I���]X2c
B��/r��P4t���)T(nd��j��c�A���x�#Gʚ��H������8�V*wЛ(���t>�k�.b�
1�8�<��� 
���Q����-�t�����c��O����'`!��&O��SK��'��&8>�� ��� �T���9 Y���m�T�_�|b�!w�ß��d��t^�|ړ���ޕnn���m����ozO�7����Ks��`nx�������!+����?�_�t�6��cs-`'%�uFЛ7����Ơ(0��,� G�H׊c�������QBI�T�@����hc������n�D�u�D2�{x��y��8H+��w߾�|�t�����ã�:L@���"ݻ����k	r� ���yپow{��8����~l?�_��{��
��4��]���i?�ܽN���`��wo_��3-���7w���y�����#H���c$�FHi�IJ��$��2�'
%!���o{oڝ(��۝N��A�$L�,��M�U	r�v�p�h������ܹ���o�9�<:��X�f���W�I:��-!�B�<��s0�ʒ�.�\Wh|��l��PK    mFr��I       source/jquery.canvasjs.js�T�n�@}n���(�S��B߈*���� U�Bhc��-�]3��U�2�$~�Y_
HK�xg�3g����{vvvr|OkB��AXH����5ܾ
H;XT��2+x��JH��~�ey�x�Dn�D���w�V����.�Dck��#����q���Ai��[σ��R�h\${e� ��xe
�DN������+BdH��֤�^#劁oJﱮ��pE>Vԁj�����V!8_!8[������|�H� �^����ϼ'�Q}�r�]�(��\�m�܈he>��8BP��J;���!�(�v���t�V����t���.5y��Y�X4�n����(��g���%[�S&��6r��ּ��$A��W��������~�Gp#u���qJ���ňM�fio��Ŏ�~��2���MNg����Π�y�[:k�T��S���G��4���Yx��������G�|xv����,\r7ʉR���t>�rk�dR�2>���8
n���FH2�͠�w�L'�J��$���6h�P8��Bz�L����y2k���N0?(�pJ��Ftw��<���ƾ�O״��}��Oڷ��iN��PK?     ƥGG�o|rs�  ��  $               canvasjs.min.js
         ~�������PK?     mF����f   �    $           ��  instruction.txt
         f���k�����PK?     ƥGG**U�
�  ��  $           3�  jquery.canvasjs.min.js
         ��~���~���PK?     mF��r     $           q� license.txt
         <�e�k�����PK?     ��GG�2{8h u  $           � source/canvasjs.js
         �N��H{c�H{c�PK?     mFm�s��0  T�   $           �� source/excanvas.js
         ���k���e���e�PK?     mFr��I     $           �� source/jquery.canvasjs.js
         ���k���e���e�PK      �  R�   
;
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote], a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not(form button), button[data-confirm]:not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]),textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // making sure that all forms have actual up-to-date token(cached forms contain old one)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.attr('method');
          url = element.attr('action');
          data = element.serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      element.data('ujs:enable-with', element[method]());
      if (replacement !== undefined) {
        element[method](replacement);
      }

      element.prop('disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (typeof element.data('ujs:enable-with') !== 'undefined') element[method](element.data('ujs:enable-with'));
      element.prop('disabled', false);
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var inputs = $(), input, valueToCheck,
          selector = specifiedSelector || 'input,textarea',
          allInputs = form.find(selector);

      allInputs.each(function() {
        input = $(this);
        valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
        if (valueToCheck === nonBlank) {

          // Don't count unchecked required radio if other radio with same name is checked
          if (input.is('input[type=radio]') && allInputs.filter('input[type=radio]:checked[name="' + input.attr('name') + '"]').length) {
            return true; // Skip to next input
          }

          inputs = inputs.add(input);
        }
      });
      return inputs.length ? inputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      element.data('ujs:enable-with', element.html()); // store enabled state
      if (replacement !== undefined) {
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
    },

    // restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:enable-with')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:enable-with')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.buttonDisableSelector, 'ajax:complete', function() {
        rails.enableFormElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
        if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
          return rails.stopEverything(e);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      button.closest('form').data('ujs:submit-button', data);
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:send.rails', function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
(function() {
  var CSRFToken, Click, ComponentUrl, EVENTS, Link, ProgressBar, browserIsntBuggy, browserSupportsCustomEvents, browserSupportsPushState, browserSupportsTurbolinks, bypassOnLoadPopstate, cacheCurrentPage, cacheSize, changePage, clone, constrainPageCacheTo, createDocument, crossOriginRedirect, currentState, enableProgressBar, enableTransitionCache, executeScriptTags, extractTitleAndBody, fetch, fetchHistory, fetchReplacement, historyStateIsDefined, initializeTurbolinks, installDocumentReadyPageEventTriggers, installHistoryChangeHandler, installJqueryAjaxSuccessPageUpdateTrigger, loadedAssets, manuallyTriggerHashChangeForFirefox, pageCache, pageChangePrevented, pagesCached, popCookie, processResponse, progressBar, recallScrollPosition, ref, referer, reflectNewUrl, reflectRedirectedUrl, rememberCurrentState, rememberCurrentUrl, rememberReferer, removeNoscriptTags, requestMethodIsSafe, resetScrollPosition, setAutofocusElement, transitionCacheEnabled, transitionCacheFor, triggerEvent, visit, xhr,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    slice = [].slice,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  pageCache = {};

  cacheSize = 10;

  transitionCacheEnabled = false;

  progressBar = null;

  currentState = null;

  loadedAssets = null;

  referer = null;

  xhr = null;

  EVENTS = {
    BEFORE_CHANGE: 'page:before-change',
    FETCH: 'page:fetch',
    RECEIVE: 'page:receive',
    CHANGE: 'page:change',
    UPDATE: 'page:update',
    LOAD: 'page:load',
    RESTORE: 'page:restore',
    BEFORE_UNLOAD: 'page:before-unload',
    EXPIRE: 'page:expire'
  };

  fetch = function(url) {
    var cachedPage;
    url = new ComponentUrl(url);
    rememberReferer();
    cacheCurrentPage();
    if (progressBar != null) {
      progressBar.start();
    }
    if (transitionCacheEnabled && (cachedPage = transitionCacheFor(url.absolute))) {
      fetchHistory(cachedPage);
      return fetchReplacement(url, null, false);
    } else {
      return fetchReplacement(url, resetScrollPosition);
    }
  };

  transitionCacheFor = function(url) {
    var cachedPage;
    cachedPage = pageCache[url];
    if (cachedPage && !cachedPage.transitionCacheDisabled) {
      return cachedPage;
    }
  };

  enableTransitionCache = function(enable) {
    if (enable == null) {
      enable = true;
    }
    return transitionCacheEnabled = enable;
  };

  enableProgressBar = function(enable) {
    if (enable == null) {
      enable = true;
    }
    if (!browserSupportsTurbolinks) {
      return;
    }
    if (enable) {
      return progressBar != null ? progressBar : progressBar = new ProgressBar('html');
    } else {
      if (progressBar != null) {
        progressBar.uninstall();
      }
      return progressBar = null;
    }
  };

  fetchReplacement = function(url, onLoadFunction, showProgressBar) {
    if (showProgressBar == null) {
      showProgressBar = true;
    }
    triggerEvent(EVENTS.FETCH, {
      url: url.absolute
    });
    if (xhr != null) {
      xhr.abort();
    }
    xhr = new XMLHttpRequest;
    xhr.open('GET', url.withoutHashForIE10compatibility(), true);
    xhr.setRequestHeader('Accept', 'text/html, application/xhtml+xml, application/xml');
    xhr.setRequestHeader('X-XHR-Referer', referer);
    xhr.onload = function() {
      var doc;
      triggerEvent(EVENTS.RECEIVE, {
        url: url.absolute
      });
      if (doc = processResponse()) {
        reflectNewUrl(url);
        reflectRedirectedUrl();
        changePage.apply(null, extractTitleAndBody(doc));
        manuallyTriggerHashChangeForFirefox();
        if (typeof onLoadFunction === "function") {
          onLoadFunction();
        }
        return triggerEvent(EVENTS.LOAD);
      } else {
        return document.location.href = crossOriginRedirect() || url.absolute;
      }
    };
    if (progressBar && showProgressBar) {
      xhr.onprogress = (function(_this) {
        return function(event) {
          var percent;
          percent = event.lengthComputable ? event.loaded / event.total * 100 : progressBar.value + (100 - progressBar.value) / 10;
          return progressBar.advanceTo(percent);
        };
      })(this);
    }
    xhr.onloadend = function() {
      return xhr = null;
    };
    xhr.onerror = function() {
      return document.location.href = url.absolute;
    };
    return xhr.send();
  };

  fetchHistory = function(cachedPage) {
    if (xhr != null) {
      xhr.abort();
    }
    changePage(cachedPage.title, cachedPage.body);
    recallScrollPosition(cachedPage);
    return triggerEvent(EVENTS.RESTORE);
  };

  cacheCurrentPage = function() {
    var currentStateUrl;
    currentStateUrl = new ComponentUrl(currentState.url);
    pageCache[currentStateUrl.absolute] = {
      url: currentStateUrl.relative,
      body: document.body,
      title: document.title,
      positionY: window.pageYOffset,
      positionX: window.pageXOffset,
      cachedAt: new Date().getTime(),
      transitionCacheDisabled: document.querySelector('[data-no-transition-cache]') != null
    };
    return constrainPageCacheTo(cacheSize);
  };

  pagesCached = function(size) {
    if (size == null) {
      size = cacheSize;
    }
    if (/^[\d]+$/.test(size)) {
      return cacheSize = parseInt(size);
    }
  };

  constrainPageCacheTo = function(limit) {
    var cacheTimesRecentFirst, i, key, len, pageCacheKeys, results;
    pageCacheKeys = Object.keys(pageCache);
    cacheTimesRecentFirst = pageCacheKeys.map(function(url) {
      return pageCache[url].cachedAt;
    }).sort(function(a, b) {
      return b - a;
    });
    results = [];
    for (i = 0, len = pageCacheKeys.length; i < len; i++) {
      key = pageCacheKeys[i];
      if (!(pageCache[key].cachedAt <= cacheTimesRecentFirst[limit])) {
        continue;
      }
      triggerEvent(EVENTS.EXPIRE, pageCache[key]);
      results.push(delete pageCache[key]);
    }
    return results;
  };

  changePage = function(title, body, csrfToken, runScripts) {
    triggerEvent(EVENTS.BEFORE_UNLOAD);
    document.title = title;
    document.documentElement.replaceChild(body, document.body);
    if (csrfToken != null) {
      CSRFToken.update(csrfToken);
    }
    setAutofocusElement();
    if (runScripts) {
      executeScriptTags();
    }
    currentState = window.history.state;
    if (progressBar != null) {
      progressBar.done();
    }
    triggerEvent(EVENTS.CHANGE);
    return triggerEvent(EVENTS.UPDATE);
  };

  executeScriptTags = function() {
    var attr, copy, i, j, len, len1, nextSibling, parentNode, ref, ref1, script, scripts;
    scripts = Array.prototype.slice.call(document.body.querySelectorAll('script:not([data-turbolinks-eval="false"])'));
    for (i = 0, len = scripts.length; i < len; i++) {
      script = scripts[i];
      if (!((ref = script.type) === '' || ref === 'text/javascript')) {
        continue;
      }
      copy = document.createElement('script');
      ref1 = script.attributes;
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        attr = ref1[j];
        copy.setAttribute(attr.name, attr.value);
      }
      if (!script.hasAttribute('async')) {
        copy.async = false;
      }
      copy.appendChild(document.createTextNode(script.innerHTML));
      parentNode = script.parentNode, nextSibling = script.nextSibling;
      parentNode.removeChild(script);
      parentNode.insertBefore(copy, nextSibling);
    }
  };

  removeNoscriptTags = function(node) {
    node.innerHTML = node.innerHTML.replace(/<noscript[\S\s]*?<\/noscript>/ig, '');
    return node;
  };

  setAutofocusElement = function() {
    var autofocusElement, list;
    autofocusElement = (list = document.querySelectorAll('input[autofocus], textarea[autofocus]'))[list.length - 1];
    if (autofocusElement && document.activeElement !== autofocusElement) {
      return autofocusElement.focus();
    }
  };

  reflectNewUrl = function(url) {
    if ((url = new ComponentUrl(url)).absolute !== referer) {
      return window.history.pushState({
        turbolinks: true,
        url: url.absolute
      }, '', url.absolute);
    }
  };

  reflectRedirectedUrl = function() {
    var location, preservedHash;
    if (location = xhr.getResponseHeader('X-XHR-Redirected-To')) {
      location = new ComponentUrl(location);
      preservedHash = location.hasNoHash() ? document.location.hash : '';
      return window.history.replaceState(window.history.state, '', location.href + preservedHash);
    }
  };

  crossOriginRedirect = function() {
    var redirect;
    if (((redirect = xhr.getResponseHeader('Location')) != null) && (new ComponentUrl(redirect)).crossOrigin()) {
      return redirect;
    }
  };

  rememberReferer = function() {
    return referer = document.location.href;
  };

  rememberCurrentUrl = function() {
    return window.history.replaceState({
      turbolinks: true,
      url: document.location.href
    }, '', document.location.href);
  };

  rememberCurrentState = function() {
    return currentState = window.history.state;
  };

  manuallyTriggerHashChangeForFirefox = function() {
    var url;
    if (navigator.userAgent.match(/Firefox/) && !(url = new ComponentUrl).hasNoHash()) {
      window.history.replaceState(currentState, '', url.withoutHash());
      return document.location.hash = url.hash;
    }
  };

  recallScrollPosition = function(page) {
    return window.scrollTo(page.positionX, page.positionY);
  };

  resetScrollPosition = function() {
    if (document.location.hash) {
      return document.location.href = document.location.href;
    } else {
      return window.scrollTo(0, 0);
    }
  };

  clone = function(original) {
    var copy, key, value;
    if ((original == null) || typeof original !== 'object') {
      return original;
    }
    copy = new original.constructor();
    for (key in original) {
      value = original[key];
      copy[key] = clone(value);
    }
    return copy;
  };

  popCookie = function(name) {
    var ref, value;
    value = ((ref = document.cookie.match(new RegExp(name + "=(\\w+)"))) != null ? ref[1].toUpperCase() : void 0) || '';
    document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/';
    return value;
  };

  triggerEvent = function(name, data) {
    var event;
    if (typeof Prototype !== 'undefined') {
      Event.fire(document, name, data, true);
    }
    event = document.createEvent('Events');
    if (data) {
      event.data = data;
    }
    event.initEvent(name, true, true);
    return document.dispatchEvent(event);
  };

  pageChangePrevented = function(url) {
    return !triggerEvent(EVENTS.BEFORE_CHANGE, {
      url: url
    });
  };

  processResponse = function() {
    var assetsChanged, clientOrServerError, doc, extractTrackAssets, intersection, validContent;
    clientOrServerError = function() {
      var ref;
      return (400 <= (ref = xhr.status) && ref < 600);
    };
    validContent = function() {
      var contentType;
      return ((contentType = xhr.getResponseHeader('Content-Type')) != null) && contentType.match(/^(?:text\/html|application\/xhtml\+xml|application\/xml)(?:;|$)/);
    };
    extractTrackAssets = function(doc) {
      var i, len, node, ref, results;
      ref = doc.querySelector('head').childNodes;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        node = ref[i];
        if ((typeof node.getAttribute === "function" ? node.getAttribute('data-turbolinks-track') : void 0) != null) {
          results.push(node.getAttribute('src') || node.getAttribute('href'));
        }
      }
      return results;
    };
    assetsChanged = function(doc) {
      var fetchedAssets;
      loadedAssets || (loadedAssets = extractTrackAssets(document));
      fetchedAssets = extractTrackAssets(doc);
      return fetchedAssets.length !== loadedAssets.length || intersection(fetchedAssets, loadedAssets).length !== loadedAssets.length;
    };
    intersection = function(a, b) {
      var i, len, ref, results, value;
      if (a.length > b.length) {
        ref = [b, a], a = ref[0], b = ref[1];
      }
      results = [];
      for (i = 0, len = a.length; i < len; i++) {
        value = a[i];
        if (indexOf.call(b, value) >= 0) {
          results.push(value);
        }
      }
      return results;
    };
    if (!clientOrServerError() && validContent()) {
      doc = createDocument(xhr.responseText);
      if (doc && !assetsChanged(doc)) {
        return doc;
      }
    }
  };

  extractTitleAndBody = function(doc) {
    var title;
    title = doc.querySelector('title');
    return [title != null ? title.textContent : void 0, removeNoscriptTags(doc.querySelector('body')), CSRFToken.get(doc).token, 'runScripts'];
  };

  CSRFToken = {
    get: function(doc) {
      var tag;
      if (doc == null) {
        doc = document;
      }
      return {
        node: tag = doc.querySelector('meta[name="csrf-token"]'),
        token: tag != null ? typeof tag.getAttribute === "function" ? tag.getAttribute('content') : void 0 : void 0
      };
    },
    update: function(latest) {
      var current;
      current = this.get();
      if ((current.token != null) && (latest != null) && current.token !== latest) {
        return current.node.setAttribute('content', latest);
      }
    }
  };

  createDocument = function(html) {
    var doc;
    doc = document.documentElement.cloneNode();
    doc.innerHTML = html;
    doc.head = doc.querySelector('head');
    doc.body = doc.querySelector('body');
    return doc;
  };

  ComponentUrl = (function() {
    function ComponentUrl(original1) {
      this.original = original1 != null ? original1 : document.location.href;
      if (this.original.constructor === ComponentUrl) {
        return this.original;
      }
      this._parse();
    }

    ComponentUrl.prototype.withoutHash = function() {
      return this.href.replace(this.hash, '').replace('#', '');
    };

    ComponentUrl.prototype.withoutHashForIE10compatibility = function() {
      return this.withoutHash();
    };

    ComponentUrl.prototype.hasNoHash = function() {
      return this.hash.length === 0;
    };

    ComponentUrl.prototype.crossOrigin = function() {
      return this.origin !== (new ComponentUrl).origin;
    };

    ComponentUrl.prototype._parse = function() {
      var ref;
      (this.link != null ? this.link : this.link = document.createElement('a')).href = this.original;
      ref = this.link, this.href = ref.href, this.protocol = ref.protocol, this.host = ref.host, this.hostname = ref.hostname, this.port = ref.port, this.pathname = ref.pathname, this.search = ref.search, this.hash = ref.hash;
      this.origin = [this.protocol, '//', this.hostname].join('');
      if (this.port.length !== 0) {
        this.origin += ":" + this.port;
      }
      this.relative = [this.pathname, this.search, this.hash].join('');
      return this.absolute = this.href;
    };

    return ComponentUrl;

  })();

  Link = (function(superClass) {
    extend(Link, superClass);

    Link.HTML_EXTENSIONS = ['html'];

    Link.allowExtensions = function() {
      var extension, extensions, i, len;
      extensions = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      for (i = 0, len = extensions.length; i < len; i++) {
        extension = extensions[i];
        Link.HTML_EXTENSIONS.push(extension);
      }
      return Link.HTML_EXTENSIONS;
    };

    function Link(link1) {
      this.link = link1;
      if (this.link.constructor === Link) {
        return this.link;
      }
      this.original = this.link.href;
      this.originalElement = this.link;
      this.link = this.link.cloneNode(false);
      Link.__super__.constructor.apply(this, arguments);
    }

    Link.prototype.shouldIgnore = function() {
      return this.crossOrigin() || this._anchored() || this._nonHtml() || this._optOut() || this._target();
    };

    Link.prototype._anchored = function() {
      return (this.hash.length > 0 || this.href.charAt(this.href.length - 1) === '#') && (this.withoutHash() === (new ComponentUrl).withoutHash());
    };

    Link.prototype._nonHtml = function() {
      return this.pathname.match(/\.[a-z]+$/g) && !this.pathname.match(new RegExp("\\.(?:" + (Link.HTML_EXTENSIONS.join('|')) + ")?$", 'g'));
    };

    Link.prototype._optOut = function() {
      var ignore, link;
      link = this.originalElement;
      while (!(ignore || link === document)) {
        ignore = link.getAttribute('data-no-turbolink') != null;
        link = link.parentNode;
      }
      return ignore;
    };

    Link.prototype._target = function() {
      return this.link.target.length !== 0;
    };

    return Link;

  })(ComponentUrl);

  Click = (function() {
    Click.installHandlerLast = function(event) {
      if (!event.defaultPrevented) {
        document.removeEventListener('click', Click.handle, false);
        return document.addEventListener('click', Click.handle, false);
      }
    };

    Click.handle = function(event) {
      return new Click(event);
    };

    function Click(event1) {
      this.event = event1;
      if (this.event.defaultPrevented) {
        return;
      }
      this._extractLink();
      if (this._validForTurbolinks()) {
        if (!pageChangePrevented(this.link.absolute)) {
          visit(this.link.href);
        }
        this.event.preventDefault();
      }
    }

    Click.prototype._extractLink = function() {
      var link;
      link = this.event.target;
      while (!(!link.parentNode || link.nodeName === 'A')) {
        link = link.parentNode;
      }
      if (link.nodeName === 'A' && link.href.length !== 0) {
        return this.link = new Link(link);
      }
    };

    Click.prototype._validForTurbolinks = function() {
      return (this.link != null) && !(this.link.shouldIgnore() || this._nonStandardClick());
    };

    Click.prototype._nonStandardClick = function() {
      return this.event.which > 1 || this.event.metaKey || this.event.ctrlKey || this.event.shiftKey || this.event.altKey;
    };

    return Click;

  })();

  ProgressBar = (function() {
    var className;

    className = 'turbolinks-progress-bar';

    function ProgressBar(elementSelector) {
      this.elementSelector = elementSelector;
      this._trickle = bind(this._trickle, this);
      this.value = 0;
      this.content = '';
      this.speed = 300;
      this.opacity = 0.99;
      this.install();
    }

    ProgressBar.prototype.install = function() {
      this.element = document.querySelector(this.elementSelector);
      this.element.classList.add(className);
      this.styleElement = document.createElement('style');
      document.head.appendChild(this.styleElement);
      return this._updateStyle();
    };

    ProgressBar.prototype.uninstall = function() {
      this.element.classList.remove(className);
      return document.head.removeChild(this.styleElement);
    };

    ProgressBar.prototype.start = function() {
      return this.advanceTo(5);
    };

    ProgressBar.prototype.advanceTo = function(value) {
      var ref;
      if ((value > (ref = this.value) && ref <= 100)) {
        this.value = value;
        this._updateStyle();
        if (this.value === 100) {
          return this._stopTrickle();
        } else if (this.value > 0) {
          return this._startTrickle();
        }
      }
    };

    ProgressBar.prototype.done = function() {
      if (this.value > 0) {
        this.advanceTo(100);
        return this._reset();
      }
    };

    ProgressBar.prototype._reset = function() {
      var originalOpacity;
      originalOpacity = this.opacity;
      setTimeout((function(_this) {
        return function() {
          _this.opacity = 0;
          return _this._updateStyle();
        };
      })(this), this.speed / 2);
      return setTimeout((function(_this) {
        return function() {
          _this.value = 0;
          _this.opacity = originalOpacity;
          return _this._withSpeed(0, function() {
            return _this._updateStyle(true);
          });
        };
      })(this), this.speed);
    };

    ProgressBar.prototype._startTrickle = function() {
      if (this.trickling) {
        return;
      }
      this.trickling = true;
      return setTimeout(this._trickle, this.speed);
    };

    ProgressBar.prototype._stopTrickle = function() {
      return delete this.trickling;
    };

    ProgressBar.prototype._trickle = function() {
      if (!this.trickling) {
        return;
      }
      this.advanceTo(this.value + Math.random() / 2);
      return setTimeout(this._trickle, this.speed);
    };

    ProgressBar.prototype._withSpeed = function(speed, fn) {
      var originalSpeed, result;
      originalSpeed = this.speed;
      this.speed = speed;
      result = fn();
      this.speed = originalSpeed;
      return result;
    };

    ProgressBar.prototype._updateStyle = function(forceRepaint) {
      if (forceRepaint == null) {
        forceRepaint = false;
      }
      if (forceRepaint) {
        this._changeContentToForceRepaint();
      }
      return this.styleElement.textContent = this._createCSSRule();
    };

    ProgressBar.prototype._changeContentToForceRepaint = function() {
      return this.content = this.content === '' ? ' ' : '';
    };

    ProgressBar.prototype._createCSSRule = function() {
      return this.elementSelector + "." + className + "::before {\n  content: '" + this.content + "';\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 2000;\n  background-color: #0076ff;\n  height: 3px;\n  opacity: " + this.opacity + ";\n  width: " + this.value + "%;\n  transition: width " + this.speed + "ms ease-out, opacity " + (this.speed / 2) + "ms ease-in;\n  transform: translate3d(0,0,0);\n}";
    };

    return ProgressBar;

  })();

  bypassOnLoadPopstate = function(fn) {
    return setTimeout(fn, 500);
  };

  installDocumentReadyPageEventTriggers = function() {
    return document.addEventListener('DOMContentLoaded', (function() {
      triggerEvent(EVENTS.CHANGE);
      return triggerEvent(EVENTS.UPDATE);
    }), true);
  };

  installJqueryAjaxSuccessPageUpdateTrigger = function() {
    if (typeof jQuery !== 'undefined') {
      return jQuery(document).on('ajaxSuccess', function(event, xhr, settings) {
        if (!jQuery.trim(xhr.responseText)) {
          return;
        }
        return triggerEvent(EVENTS.UPDATE);
      });
    }
  };

  installHistoryChangeHandler = function(event) {
    var cachedPage, ref;
    if ((ref = event.state) != null ? ref.turbolinks : void 0) {
      if (cachedPage = pageCache[(new ComponentUrl(event.state.url)).absolute]) {
        cacheCurrentPage();
        return fetchHistory(cachedPage);
      } else {
        return visit(event.target.location.href);
      }
    }
  };

  initializeTurbolinks = function() {
    rememberCurrentUrl();
    rememberCurrentState();
    document.addEventListener('click', Click.installHandlerLast, true);
    window.addEventListener('hashchange', function(event) {
      rememberCurrentUrl();
      return rememberCurrentState();
    }, false);
    return bypassOnLoadPopstate(function() {
      return window.addEventListener('popstate', installHistoryChangeHandler, false);
    });
  };

  historyStateIsDefined = window.history.state !== void 0 || navigator.userAgent.match(/Firefox\/2[6|7]/);

  browserSupportsPushState = window.history && window.history.pushState && window.history.replaceState && historyStateIsDefined;

  browserIsntBuggy = !navigator.userAgent.match(/CriOS\//);

  requestMethodIsSafe = (ref = popCookie('request_method')) === 'GET' || ref === '';

  browserSupportsTurbolinks = browserSupportsPushState && browserIsntBuggy && requestMethodIsSafe;

  browserSupportsCustomEvents = document.addEventListener && document.createEvent;

  if (browserSupportsCustomEvents) {
    installDocumentReadyPageEventTriggers();
    installJqueryAjaxSuccessPageUpdateTrigger();
  }

  if (browserSupportsTurbolinks) {
    visit = fetch;
    initializeTurbolinks();
  } else {
    visit = function(url) {
      return document.location.href = url;
    };
  }

  this.Turbolinks = {
    visit: visit,
    pagesCached: pagesCached,
    enableTransitionCache: enableTransitionCache,
    enableProgressBar: enableProgressBar,
    allowLinkExtensions: Link.allowExtensions,
    supported: browserSupportsTurbolinks,
    EVENTS: clone(EVENTS)
  };

}).call(this);
(function() {


}).call(this);
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//






