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












PK    Æ¥GGÌo|rsÔ  ÷    canvasjs.min.jsÜi{Ú<ò;¿‚úİMqqÂ}êæáLHBB€$›İÇàp˜ØæLòßw$Ù– én÷ìû¶H£ÑHF£‘,Å¾…ÂaºŒóNø¬Û¼Ì„ÂçÂBèHº:3Ã•¡ ›Fø0¼Håâá²b
šæ¬‹I8ç‹q$i“X(i³µ®†f8O¤Â}eªÍÔUè[,éÏ§’©jÓûfÃWÙ7áh¦k¦f®g
_""²EW25L}.™šÎ"
†Â»°?Â@Ep•#B¡.DÈ­+æ\Ÿ†§Ê2,Ò|¦€jÄIì3QÇcÕP L™áy^:ÅlR¨>M|ÙÈ×qgéx±¡¨éÜTÜ¥` Æ¶#{¨ÍuîD1&	R<YX»Ğª‚© ,r–Š2Ú‡•#Ô¦æĞ]?GxVĞ!·VR·ƒŒXŸÇ=€!\ôÂ·;A pA$b!èa‰ÿ’(ÆÆ9á˜ à&*ûšyñD,$@ÆÊt`¿‹E’ãn“–N˜Cˆ\Eü	‰†Ú|X»| *éÊl,HJ$ö×¿1¾Å8†aq1¨2"û‹ã$Ş.«(A§˜Ğ0	FHÉŒJ,[tÚÍ«@-ÎIÑKK¯`É„Ò´ùTn+’ÉÛIĞr‰“9…p}nÈÍØ·!4İªÆQd¬c®Ç
?d‹3
cA)>c‹TúêTÁr‡Ä\ë‡€<à3lçCê½*›C¾O ¢2P§-õ L´…ÒÕ"BtÀI4É‡ø:d]0U©2×V2Tÿxs ràP0³ƒÃe Ÿ€Ü‘›ä%eør¢ÚìÉÇ¹*5C±˜¬w8Á<ïŒò=Â~Ğ^DníÎ?té”ª/íhu(­\‚ÈX$"$²¹D"›³?~$²ì‘©uL]"á$Œ‘Í$qrŞ›Zpj2“´¸/Mä“?DKtOĞbQ äJ©( Pp…‚=š˜? _TŠºSMpXÄ+ë¨'óWó‰¨ÀHeßßC(ÿ!Ÿ4ÅG’¢#2[À‘şXƒq&“á( ´r”‡~‘¿KE9ea¸ÊauF^x’ŸAÊ!,[U<LĞº)2—xéı™júD3ETW™¢Ìß 9ø_‰Sø… $‹Pj\	W…eßL}ıúd¦*"XDCƒ..†ÇJß,Äg«bØÔf…Ãdş ØLe`9Nš:.5]VôÂT›*ÅåP5•Ccª¦0Ó•"’ÔÃ¡‚&Í©!pajö˜Ö&
-†1ÈP7J×hĞ’d„& ƒªÿ¥CzcÀËš4Ÿ(SóHÔäu±Cã’®€v¯‹0P—)¨ºÎ‘:*:²x†p©ïÏÓUVæ•&+¦9¬UœK˜Í”©\ªc9Òg‹ Ã~t¤¢dÕ »æC@¼ƒ&‡’	ò)ÎM †1N`‹
$«GÈ}¤õûhÃ­„Â|¤ÄQæCLi²oÙ‘­Äšb>,ĞDXEÔ"îf^ù°äÆe3\º%ùéwLU0†]Ğ¤MaÆ¿Aç«ráé™3†šn¢¤ÂSŠKØqÍ,<% J“„1¸ ˜¦Ø©2É„&œÆA‚cNkÓ)9ïDm¤¼ƒD¡4ÁJü@2"ñ¾Æ=	0>pû˜gÖó`´¢h
h<%`Ş7^,*cCÁ\ræY—¾#£“ñ,+Á¨-@„.UÃT@ÀØ ("r!Èğşş%ÁÚ$§i
Òc²X„Ñ¦08gê„~càı}©Nemy¤ ¤"2øp¨ªô…ùØäı€÷w‡ ä?"M¹ÆsLÈoÀènéÚL‹@|À–”qy.Šc ÿ(J ±`}X-#¥|qé©¥£§ÀÄiEôÀKÈbjL„ô“e–&¹${$C¬(u¬,%è£ô©(%)<IÏ_x~¢éçwW,ï‰%’ÏP]d_‰0¬Gö`O„§øó÷ï‰, ' ‡ßäs!NëÚ$U¥³YXEùÄ'á¹ Á?³ï´
êe¬`–³4/jY´—²‚LÊ EB—–Š8RÍ² @‡vÀÊWZêJ·«ßße0N6{İiÚî$qGJ¢Øà5!6@ëŒ%6™Äo
MÍKÑ`ç Ù§ÑK"ÖÏg* J¤Á5XöK„S GÉS>ŞºÔÒNNÖaÀHÉ§X¥±`ÇØµC	­ç|è%0‚b„Ñ°Õ‚<ıÛb2&+Ä¦0qÔßßƒ0˜;TÓ®ÄnQk·< ÓÄƒƒ™š£Ì0/3e€ÊO 8`
P'"/ŒŠFA<¶ÓM

ˆÛöeD&h´rƒ¼4)Z˜5Aæ%ˆu¥Ï0d‘gş&…éÏŸ.&|q˜PkP_X,âûf«È¾gİ€†fáI8ÜÄ¿Ñâ4›æğ2‚<Sazä†<¢RÒua]÷û ûú–‚e¹N»U§f#D 6‚>únãG0ÎgO£g¾×˜‹aí1B]»ÈÓğ™{C/PÎöAÖŒ¥§ÂB@t5a¡àl¨o8¤¶¬ùtÌ¾
°¶‰rØ7×Çü“ÌQ~r„›ÏG/š:0h¬Å_«,è(«G®ÅXï møL…E•Â*™ùúÏRôMmn°¤1*–5
GB®J#†ƒ5")–‹[ÿ!˜ó?Ä¦°…*b5“8ñÅ#¸¶0 û_'¥ˆ3ÿBY‹YSĞ§v‹µ™Ó'9-Zê*ŒßÕÉ lèÿ[u_|äÇwY]üh`t˜8O0í°†ì]%Œû0,Lå°!, j‚Í^ksÊ–˜ßc(?ã./eğ
…¿k{ø‰GŸíÜfØ/xÕ)nK*

’0Ğ,1µ)*ŞÒw¶¹Ì3º2eº ,;
ÛÄFqØõ—áB6†eAóL
’Ò(™üR’aÔAò`Ô"+œ	ÖK5±-yô7i>-¤4¦}í	´2^™gTQjèZ}‚×Ğ_-+<‘óú«İQu4oáN€.cAwQG(1èÊ÷¡¡úBà‘üq"jñ;ğ÷–á¸`p¼~ŸíI„Î1ÔöU§ÈˆsuóK%E¼E±{
›jŞ¢jÔÈÃ‹¾¿ÉÄ¤2.”5hV›	:Ø2‰ıMq[|²e>ôöQDR÷ <>8@ÿ‚
Á¢åoG¬ÜÚ•k`dB@Ôï×ñ A­\KsRS»³¹ƒ{5Û
¨_,6˜°õtçÈ©èñ4eæ”
IˆŒÌ‰rbıü“`ì)¡[R¦ B“`ùØÁšĞhLa cXÕÉ0…‘4ğ¿ècA•ÉìZ1WdQ-A u¨E@…9ju)ˆÊ3Òjš0íª\PÜÁìovµ¹¥Ö±K;šN]ÄU£4q7a:µ6Á¶‹2Ó¦
¥Õ¦º¤µHTP¬«iã®:#0Rä6ÎnQ£ÂRw¥¦Ã‚ĞŠ3å±f–`àßˆ™RÀ’ U¢çÖèŸU…Ğ?Ø€‚_kÇ?ì‚ i))^‘¯uøAüŠøº†gì*q™=Î;q”ë@±-òº!G˜l!:ñ£yÛ0L<œ¼GŒ‰Yx‚aV¿û©ÀLõ¸Çˆ{Ò
””å-…ğå¶Ã;Ë9#¨û.:-•8W/’Ø*Á‡p`àã(É»êJä'ú7C+ˆVEkzl¸­vÛİ=Òó‰P¸sÂ	‹²dí†Tìöí´,aŞeØ]¹>iˆÛè»	íV’­¯Jcu0%3åÏĞ%2anj€ûşÙ‹ouËiåm·h–#Ox²Ğá\ @ËmãÁ¢«ÉƒYÛëC3Ûå!=K¡ş*ÅÂL-Ãæ^o ÃKßNÄ£”‘şŠxÒ‚
§iŸä€}‡ÌÙXdNÖ|šI>ú8g°q²‹18¹ñ!ÜrÚ§ş™Ê{)ZÅç× 8Xÿíy·KƒËØ±ÖÆxe&`!ZT#Ö
Æ18t¡A.’|ô·ùLÓ”B²5õ‚-ow›	3lYøœV"¸ŸÔEYtfjv#×åS¸U8ayÄIèºÊ*ËQ	"rÿü›{®wÏaë¤{ùàªÛzœ³†t‡
sxâ,Ï`U5æ
Àİ]406Úûtæ³ßA­½?E§xü•(KS™ÎFZ››Ÿ¢¼“ÌCKSa(é–µxÂ4;¤ŠÚ¶32B
›Ö!_Ù8í_QvòÚe“Şıw•|;³Ë…1ğï+¶‚}ÓvÑ}¶tkƒ	­Â
n:rl
Úã~æß®B~…D2ü<¿µ{Ä€ğ"EŒ÷ÙÜÛoÁ
<¢¯R†´x]Úä0‘fñ628te]DªşP†“:öü“Bè¶\
òlÜ]Î%UÂ§:0RáÂV´#LğíT•4,é°üãÂ 
EWû?o«)ˆ
 şÃÄ'‘{“álÿ&ëVí]•ø[dqë]XJÖ¸VVa¥½$OÃ4ø`-íå$g-Ò
HŞ	ºŠD”:Æ…E<‡ó£@ˆP…àËˆTã5¸†¼ŞøÑXD¾:G–jºD)…&¼TÍaX•ÃÌ×h`1ıÊÀ‹jf¸&š¯.wŠÜÔ–‡×Ş
äÈN˜½+nïHÇy^f¥£ÙÜFĞÆ	ÙàÁz|ˆ£Û§‡	ØÑD¾/ô!6àû³I&Nú…~4Q”ì}¶g˜õ
ÂxTWQ ;€ßCáI6&ÆRÜš$®­Ä5I\ãÄTä?Qàá¾·è¡ƒ¶V?‚ÿÅR`Tÿ^CÈZ¯9ûùb‘0|H†‚İ}h`Ùo‘øwŞ
9Â.‘kğßÿ™aOÄX"/$ì}ˆ/dO_ƒJúÎƒ'2K'RÁuJ£g;´8…}Ûº‚übÀZÛ!e;*+¾J8îXÍŠ64ÉK64é¸Â°ú¹–¤ùLµİ'ƒ%š$jàZø€ °ˆ§&´-§„ß§{}YÈ˜¿?ØGh÷Ç^¢8mPªª›kØ° KYm2ÊæöD!…{FV‚ŠµBZ°• çÄ‘=Kc÷d?ÿ#DOèY2"
û+M|»°SF”’]q4úqÕérÒ^‹Ğ¦QTİ~^Ê­iÍÉº’Æ]¤°3VÌu+É‹'Â\3‹Ë³AXè·u±Ö\[¿«¤'¿.Wş‹Å¬—ıÌêÌEó_¡ÃFÎŞãh?Ë.•2Êî?Ã*5Ã¬x½ëBÃÆ‡-¢	õæ`
DMGÎ6lƒ8“nG$Dá×ØôïêXß¯.Bûõ…ÅàÀÍæã¢B*Ø“‹öúÌ&³½}.şMËj»§ö^«:]õkrö7(Ğ9bFæ={f™â½qdñ£İ…–íH[¨2ÌV;¥‘lJ Ã@
˜pÒIá¨‹·’eWµiÛ¢ùÃ’B»ğ†ŒäºóÁâ5m@Ğla9¶lçØå5ê]sm‹>>Á›­1SÙ?.?ÊÀKËmÁV=^˜rŠ}¨äNŒ°Ÿt¦î”Ï”`Öe•Öév[}¯p¡fü£ú^ B…WŒahUŞ²p(	¤#Ø‰Ş»ÕÓØ·)Eâ>M…öLaïoë3¢íü5„
‡Nl¡*Ëœ—kJèA*UµßwĞ@¡a±"çÕ#Û!”-4Øwô,†(7È²—ÆÑÀÀ-ƒEËÖbˆãUÎ¶!÷ ì.Ü…Ÿb$?# xö÷Ê¦ü´Xz°ÙO
‹qpDø€|h_±İ7wà/7$»w¿ğèP/Øò[7~àƒ®Êİ!øÿ¦À@«ç¼@—-oK¸Lg©
I³\?ŸCÉş£5Ò”¦8VñşœÊÆ£ğ—Eâqü»/ıà ™‹ÿà}Ğ_üOäa…“ÿ§²f0{*ÌN»‘@M@¦¼½6Rg—*ğ­²v¥YKFtÔ”ä§I|èé™[Ø“›bğå&«qäÖ*eÜRèàƒ­+¹htçÜˆöÊÉñ¥†Œi±¶èàâ¬¥\zn(äp¸&¦E0H}ÍˆNS'ó	gâñºt»Š:‚FÜys@k’ül“Ï"âŠµã«æ§Ëúi³…Õ¯6›ä@ß|ºİÂê“íD_»iÊ'ÛM±áòÅªÛ„ğâàÀ9ŠSìTßšÊ¹É³¬»P”gO¡vbÄv
Ed·¦rnòÖáÈ,é]#(Ô»‘(Y÷A¢±à¶œÇ{MõÓ±.6!‡cØÊKgçÊŒj1—Š³‡²=1s23t˜ñ0oRàâ^^ÃšC&£|ãË„æ:tBçd<Â|)l4b¤@¡4¿Î²±$éB§iTÈ<˜‡şr¹­,Áír÷^Ë^W·öZ¥Ö¡ _[ïlé=Ën˜ë::Äï,6ğ
ÈäZ›À7ƒv÷úÎF¡oz<
?ğ ”lï—s2+âj­€¿İVŸÎyºšrLaâ0æcAo+ ‡÷YÀIcà/m@ÍfT¶İœ6"\«k¡.û­˜µKêÉ
Úç™ ±íûŞ>Ù\à#Tv³P])g$Áùˆ­(À®µ '÷ĞaR‡àXú~·K…¥qqüÕÏñĞÖ¡í9‘P¤GÏl¦ú@måu®¨³°Å†ªmò_¾üìp½‹;°ZáßğCáØ~™¸sú,
Á¦M¬=¸Â—’e4:È
ªq€?pªà&ÆpŞ£„œS]J‡Âªsk*‘„ÒœuwÓZ«Ô>ÙT`ì%ÇV¡e
¼sæàØ[*è[n†ÃkzaK*§qNY!EN«dêêX¹ úöI©~<€‡†T‡‚ 'æ<‡ı¹…7ç³91—`ƒ¸™*È>ÁT g+B¶ïÇK
ª'ÃÙŞŸB2ÎQ‡jÔXu• Ü“ş±>$0«Ä1t
àj)ùvÏY4âÄ›¶ao©-ÈêPü]LZdíHf8äJG¼œxzÄoÔ˜ª¬Ø~`ï‡¼¸¿Æ¥Ÿ3)‘şogRr“B;¸D·…·)È`3”Aæà½˜İ¼‘şiŞ suvë×Ö¦ĞÜ¤çÔ	áÃ,{D…Cß¶é•>®9>JÍÖâşã0RuÔxh
]kN/¼)T90ö}ŠÊ¥:$¤;§¤VÄGÕİ„íâ"rE!ÑKzÅ,ãíYÚaÄñfÛHpvæO
ÄQàÂxw¾¸C
hŸ«&˜ùá
o–¹ît¸Íæ Ği;›¼14™Q4X÷Ë¤¦
ÒĞf¨µ6¢¯…4!(ÚÔPˆ“H*ûkeƒ¾IZ€`éVB°ôNÀÎ#ÕDƒã–Ü’ˆGÊ	È'q`iõÕUÎ`ó¾Ráã¹¬<*º†(™ Z—ØãPÈàˆ§!BÅjË†x1èÇ·ë³[¹¦¬l¥8ú€\:ÇıùˆD Çµ{˜`C´”lû”+u€À÷Ì0ÇØÑÂÎI°Ér€ÆíÅ‚5€I]5<«3œFœí– ÒÑ¸­±V—+PöDÔğf§L…¨P¹«ñ;¤j‹ O·—×Ó®6Ãs
İÀqÍ7Ô3pœ6Q6vLC¨ÇÕ…ªFÏAvìÜ4æìN¬#Ú4éšî	:ÃQ”à ´Óüü¢Ğ o¬DŸ`]Iƒì¦©Ş6‰áöß(
y’‚2F’ZÀ†SUaA‚ıNîÏdY¢•ÕUÆš×ªwíD¹†•­4u<KÙs¦-káb€ş|¶ú
>Rô_«ÁT4ÓUŞk/8ø×;à›ğ™¢#£É@GCcJ,.‹O8Üô‘¢£Ú¡VR02)‚he:»ïJtúÃ2&´TFRu	w˜øÊ´ XÆi<XÚdw9>«Ík±ù¬5—¥f£«¸MŸH	|¼ÎñŞVè¨3ü¥{	Ö‚‡÷[tti X‚eâ5İ§Éßlğş¾Å€ûx=YÜ|p._Aá
ÎcªPfG™	°FÔ`rÕj±™+cÈ*óåBpmJ¢-ÆÇW¬¥pAŒàÀ44áv€°õ­!Ã¡ïpÏ[§$©‘0œ& Ii]ùR €¶Ì×€æS„›şé‚ıŞ+ò”„ºÃ¹u]E?Ú
æ¾ÃTÁfXë"›"†(!*(?ÊŠòy²à¼ ÿ\˜ÎÈ+¢0²¤a¸Êcáuø|>UàŸñ:\šæ†š
R6ákğÚ ß+mA UEÂ`åš´8T*•a—€
@ôqD‘DÔÜ„>>€e<,.
o¼ãß˜©ìq­T
ÿQI¦³édø\=Ï§Ãä³åtâ¥d5Q©Cz¾œM%Âd«åJ­ş#“Ì$Òµğéz>Q® ^<›.Az=wœMç<íÙå%¡<¿ÏÄQşãr¹œÉ‡ÿH¦ÊõR	Êµè¤K¥J%cÓÿ‘Je2ù²‡®M6dó•"ÍÉ§3ğOäjùdàåãjšÏWóP\:ŸÊWl<Ÿ?N ^*›-åà7Oæ²a°–r¹L~3åRªxÉããxÒ¡øüæòÉã\ÜÃ]î#¦‚íÇÚæ-r<4.
a8Ë$<$&°<ª Ğ:î×)Ná+ß…à9ÛLuU>©”gM–*¡ÿ¼ºGÔÆ2³ÍÑá8Tˆ“ä7V4´¥¦‰ìo©)Yú–dÙÀÒí,şc/½~G£ì6Y&î¿Š&aV>°ìC‡èÉbÉnbÿñ/ ’x™ãûòlµÌ|8Ô)äër¬vÏÔò
(O
ß×ån;‡W"a2™Q>xWadIútÄ6³>¿ÛŒşø ~çä=Ü¦Ğå"À“#¼¤!w‰‹'îê¹Ç{Ò;ŠğæİÿPñ‰ô§‹ıdÌ&cVˆ‘ã<‡ÿgí‘ûË’ôÅPåb
³Dá}]ES´²t"6ÉÀÍn¢ê/Ù¹ï—†-Ê@Æl à2ÿñûëãÇ>?ZC»†ë6sa§”ù6 kÿá!›úÇ¦n¬N¨~éêŠˆ¾E3ÃÍ>SÆñZ4Wh<€¸gJOş–‰
úÿLvÌô¡_mÁoSÍoM?‹ã´òëóû?¡%3;Eø'¦õ_×tV¹…×£çş¡iŞ-Å´K?İŸÑVM°³Ñ_K/›?@©¬ù7âW¢›Ë\èL£©D:}œ­eÈrÒ'3ÇÉZ–CWI;°l<DXº: |6
t{5%ˆˆ‘Û¯iÎZš#×gÓjÔR¾ÛGô¯û÷Pp]×&©ù{VØÜ– ‚øµqÍ»¾Ñ'·+Åªo	.ıñŞ$?=ò3„ŸäÇûù™ƒüôá'õñn’X—ü\¼o˜yú+óüyÿúô×¯Ïß¾Æpò·4.
ş´›@æÿ
…ÿgüÜ nâ#'…§V³R+=?uª­çî; Zàcí«Ò;Ü‡?õ|¯À¸×áÔvM0`üOßK&|ƒ
vÇÄ#P~G
 ï-†›
êfÀ†Ñi*Dó´Ù}¿íVXTŞaôù/ò[úƒ=aÿ"Bÿ„ú|ìé¯‡Ñ¿È¥ÃÇçØÀ¾óĞ¸Ã›yó£“Ñö‰ÜG,—ŒÌMp”:u$N· Ô“¢Gö¼¯è¥!TÓ`ÃÂğyÅ—¶Ù‚v®3 œ”Õµe¸³æ¬ğW³¸B¶{à+Yß Wd ©t®{æ\^F—qÍ@šå ü8Õy=a xÈÁP€TÎà‡O£(SEô#pŠÌ¯qtA¢¸Q°" ûbx+¾Ì­\XOĞ’€ÈEú4·°ˆ ğ
Ô4^px3ƒr/8·Tø™s‹£àù$ŞXªğÁ	
Ièv>¦Ê¬<F1d(ì"bÀ
­EN&Oæ3Sø˜Â›pMØ°¦‹4€)ñ¦+IZ8DÜğ)…÷ şeÄúnvÅZ={˜dY›¢_lÃ£ÕèíGM±\ÊAõâ®¸´2tÀå?'’pójÒNº2Øi´ğ3šÏ†œ¹3PÌ‰~´!æ#Å4ğÒ†.Ì%`ÚıŞwàV»ç¬3j6½~ß•;ˆçæeÿ'¸nfšf"ù£|Â0gŒH ä‰Şõ%— µå$R›(¹i§_8É0şñà·«:d­¯³p^û‰‹áöY„uFVİ„j‘ÙØdà3î
z¢î``Ø¨ë2x„û"6–;ùvd¼ˆìÎJY¼ù³£t
üs(G4­Kë
¾ıÖ¼Øğ?(¡{Ç€°ÌÒáíoŞA¿ö}ù‚}‘ ¼qò%^ •.ÅÇO`$}À~´uÿc€“vm‚ôÑD"òV¯‰¬uÑ;ìKó$q3(‚¡[ÆèŸ)G°à¯ÑÔÃ€»ŠíOñ|vËû“R{~Š>ƒ¢ïOÜsôéèùı/ód<?Š
ĞMµ¨áÎËp¡ ~máûĞş¬Ã$×+ˆüÔ#-âyüÍş÷
’K ù3N`ûßxøØß¹6œ!e‘´7”XKÑi#˜>”‹ÃPÉƒ«„'Ñé·gÈ#G¥gÚ2‚ìO'1 ÕˆRl/u¦Æ|q(+v>ÿŠ“0ÍÀ™M¡i'‘ùvîÃbşÀBypàdBßY|Ğ=…ÈØı' p¶	`|¼âó·.¹Xè»HœÜ°Ì`í
M9O£á8‹«†- 8;ÜçA ûì:o³‚/;&¨/û¶mvÄ`ÔØ(tPA~hW]TYt†jMÊø› ş•ò~Âÿ>²%ƒˆÅ+– ›Pê,åf™»kÁ÷AàŸğ»6y9fz89Œ,Néêô~Ìâh>Å5|t©íá!®$†N5$~Aê /G˜P"bªùgÄñ!„tôå“ÌâçkQô˜‚ÒÄ¸s±ó	¤ôš i¢n¶êŒ3BØ•´­Ì~°Ì_–È/1Ï‘WnDöÄ’¿“ÈjğÊÃ'U h™N‘lAâßE
şÊ|u†
Šd¾ºÆâ×àX<ÕJÁÀ¦‚¡+ã?@±§Pèh¢¡ñC/ˆ~<
ÃS`·Öcü¹¬º`³öƒ…=‰¥b€Ÿ(ú>vCäÇ¶GqÜ¹A:ëïèzëêl¸ç={"8€|Ü%("ø7óhoesá÷H"ÿÏô•üù¾òt•—¢‘ÈàD) ©¨ëû)]ÑÓ×wâ°T£+æ}ïH„ë’‡÷w4êœèID¤Èl‡{l*!¬ä°"ßºlŸÁ—†‡‚u'½Eê¾T’Úó§Â‰4»‰p|D„ã#øqVz.KìûÈñ5áŞÇ
¸ 3~ƒ_	'ø‘p¥ÔÁå@ŞĞe×ÖÿÍ¦ûB{õ®|İ^Æ/NZ	ş\un‡µÛ„*%ôGª”z8°Ôã*ú-Ÿ]U:w7JiĞè—†#§—úxËÚ ²®å¸™ˆÆp†U¼}7Œß&'ò™<”&·¥›ûö¢7¹´'ãõãƒ¼&æ¦Q»ê^ÍÕ¼¡-!ÓE»sÛ.ßÕÔs]îÅÔz¢^oöW›åôQ?mtn;íØùåic¨
c7jûª|y¿j^6îk£¥8PKZ} İ''Ãq/+f½dcÜ.·WåÎÅ°SºhŒÆ÷çíŞ¼ùxQªkmVR…n/W_´ÍÉc4¦ÈÇ±ÍYûEÙ\.3‹Øõ±œÏJóÇÓÇÙä¶]êËÓŒv\íËW—³—Môr£¶ëÆ8ÛTOã/­îùæ±<_WõVº|7‰·b¥qüÒÓ]­œ*Ë^)w±®Œ£	1U½í•®KQ=[Æ•Òi{S¾Ş¼tKµëy\ª¤+Ã¨YÅÎô™¬K“E£ZïÌ¥¦9íUz•h4{6¹ª.óõ‹j7•®uõ~6u6×zf±lbƒL_Tæ¥²9¨ÄÓ÷£ã»›KIm¶Òµ³XªTßÔôöU%×|ßLà›Èvfœ¶jÉÔpRÓÊ÷Ñlâ"›=k>Ô'æâ*?Y«ã‡N*Û'æbô¢ß[,Ó©Ç‡e¯ú-A[K’šÕÏµI¢ÇÔáäJë×:F¹19?å&ã©¤7Ó™iæ¼%7ñQé~f,¢/ó•ğLô­Éİy'9¿Úœ7;ÙÇ+eU‰ËÑF®{ÿpY_o’£ÎãxvßZ”:ãÉk©«?\=ôSõR=Y%.çuµ_ÃÀ/gåö¼ÓH6–gjv¼™<LfÙU;ÿĞ‹÷ÕÆ073JËa4UŸWGí³›»—qTÈG/Z|ty{q–{î2Úu>Ûš<&êİÍº•¾ˆ=œ±Í²/ŞçÊºªÎkİÓJ+#
Eé¸œ;«ÇR}S2¹ÖÜ¿FÍXz¿Ë¦´Zb^OãUµ~;›vî›³YU&ä•i´çÉ¥T¾Ù0Î„xe”Ñà’ĞrËh_ÍcsCâÇjâÂJw›É¥™2C½ı2¿HtûéÕH4¦«å:?¸èçä‹æİYò¦mÜe6íX¥o®çQáB¸ÅÑ
xÏ¢­îær#½nF×7@­ÍÕÏdõõUIÆzİô¦3ó˜ÑšËõ¢rœK/$<š;·w×í‹L¥×hğÈY«ş9-2 Z¤¼Q¦züß§EÎï°©«õÅ£’íòió.¶JïéóYÿ¢ÒP;å‹kíº2jTcKäúk£QÕâÉÊ°¡Vò7Õ‹qGm¤z¯í²Q¾;]Ş^•neµm{QK››FÃ˜_œ}uc<è3'Gó/“åeµ¿9Û¤¦—×)}\uÇ§ëêàQ½¿®ÌÏ—gÉAåv=½©ê±Ò©tq~¥÷Få^ù%¯43:™ŸŞ¨±ãì¨™¾ïä*±î$sw;È-‡çƒ|yT;UÚérµ××d£T½´²Ëš~Q+¦±4æçb*9”Å‡uşus™é6äÉæ\ÉÚc£ü(uê£ÓqéÂH<¦z•‘b>Je¸%r.Ü\tqÜTË³²>œ(¹Iip›^6+‹™T7ª£×t%“®ÖïÚİ³ãaTÍ.Æµ¸¹-e“Ae>Læ_ÊÉ¼Ú0råÆ]åZ÷w«Ùt+=o•^n»ëÁEg•¬Énc9šú£ã›Q_Õ¢ëæıÙMEé´_W±vjp=K]
›¾ĞIVÒåÌà¬:¨ænW©Zj^:Ë]\Í*©ÒÙYiÙ½L×ÏÍãÓ›ü¢$´Jq¹+‰«×Q26(_–›¢p¬'F19}Ù/¥ÎÍå\)+ÍL~.u¢Šü0-İ'SËV"~•äEM=®<¨›ît}•[Üã4mœÅä×”™È—zi%Ñ»ìuÖ©AL2^’wÓº1|lÍ¯gĞÌ‹3x²å¶q5?}Éõàùì‹’hİßhW­óãyuv¡É«Ü´-ª÷úéYùô¡¤fª·ê«y³4gÒıEü¶Eó¸¯&Ó¬İ%ıåu.z×ï·–§}UÈLRéJ7->Ì_‡øÍTHÄ¤ÓæÕë]ly{^KJ›U5_¹I?d:ãÜù&×i\.+Õ™ørÑ*·›g%9Z3Òg÷w™ÎL–’Ëü¨zsÚÏò³u¬ùĞ\šÙãXıb“Ş:êÑñÊï°¿È.!ëÜ(4ãê~ğûæ«3ìå¾ørœèÖ›ÕÕ&“»ÍŞÖš„ĞÛ¬›f¥Ó©ï_*ÍÆtVj¤FÃZìæÌläöèaĞ©tòZçX™]\ªq­}qUë¾´…a»öš¼è$f›³Ú2ÅÒqnšÙÈÓãhfs¾ê^2‹Tëúab'f9=—ˆ6$A;]†İë†"6Û¯›ërwÑ8MõÒ›îC{òÚÑÖ«ŒBóüú¬Y?Ÿ6ó±—u]xX7Û¹ÓìTLgÉ¤j!•Wõ4uzÑ_wíãj¶Ü$.nÃV¹R]ÀåŠb,™.-òêü¶·L'zwÆ&sš›¯.¤Ç´Ğ¬Í–§fæª—º‹õÄ3ã&«K¥³ëelÔ[©e©g*Ët¿wº*_H•Ëëz­§ô¦Üê™õe­»ºëHÆõåõè¢ÔêOİ^³ÕX\ÖõÎğvÜIÖ«“üCû¬TÙÔK÷ãT;¹_ac§å²RºîÕšÓAIÚˆRw1?ë­6ƒyc«+FûXÉ:ËÛØµÖê•Ïgƒ…Ú¸xHÖÇ¯¹Q*}1œHwSQµ*ùó‡tsĞ”Vb"‘_>.åMFhtéu•»kKÚ*×Ô[795*šÒ¹^õ£bã¸ó:X‚°‡ßíÌKcùò5İ;–$Ø\ş¢‡n”–·©ŒôĞ¬&Î+ú­vª*Ãñki“í^•ıD%^½ˆÆ‡Ñ©qÕÒo*I!-¾NÆÕãÑõ©toF[Zvv7¨.:«ş¹ĞÕåôíMy¡•ŒrO¬hå”ì›9c\Š·óêÚÌê¥zU©¶ÄI^¹îÎî–§Õã×»×ÜôRlÓÉÈhİ&ÎMÄóáj2“Û«º`Ü7º›aöá%uYÙèBâz%U“7/gêéİFõ¯ÛÓæë£ª%[R=™*•åózâj–.·fæxİR³÷›V¯¼™?ÂÛ¹Rvu,M×­|÷µ‹uj^û2_^ÍÇ9].–ónšËßK§§ÂñÙ©œéVç/Õ³ùµÒz¸RÏä‹—ûÁãH‘±º\ÅFæ«ør·é¥—ÛÎtÑÈ€á>¾½›eïãñ1ÛNÛúìõ8Z»ëv_º/½Òü¢¡ÍOg"|,S5z`öeWa"l)ººÈ‹éNünZSc/ñák·m&s×ÉL^Ü,ç#7käšıôıÍC£V•2Æ±1_E3ÑDk¬MZùÛë×ìéâ~ØèH«¾Ü{¹­µÕ’y|.çÓçY!‘İôóçµ‹nj]™ä‰ÛU{‘¯TÒ³u{¸i'æ·[U":AşªÄ²[%–DµÿÒü÷©ÄÒ½\»ëÉµ«õã}=.ÜÏõöL¼¿-5«Ò¢Ù½…¿İ–±¸Åjº×nîÚ
UIvš7Z©Q®Vog±‡l67ÈççÇ×Ã^ïzt=nÍ–\‰/N;â]rW´h…Rı,S¾-ß¾¯ıRkv÷`^
N«ıU­Z1qkãzwÔ™ßL*æã£X£Ïy»r–õÎ•³á)ğBÑ³ıŞÖDNFÎòà¬ÄÚÍÂµ"œ-ˆµŞ>DQ	şñUŠ\äOêÅ‡î†eKŞ×Y¬w†¶À\w„Ğp0g0ÅwÑ€ŒÎ:«Àà²ß{LÁ:Zï3íJ,’'!ñe¹8è©»·%èÕHğŠb4x`EEø_+¥X×ı ¸ıffÑÀ5†(îá¹ûÚ*
ö{ß[/ô!ÛâL‡€Ã6<Œ„ÄWDhs{[^\{¼õQ²^ö.ª–"{¥ÀÆ²%Ã°-°3
ºÊqjmArªA6<•	\Íô[dÕiŸ¾ğû9x6°aFŒŒlyKŒöCşş{X;ÒÈÊ›D®ô(Àmr‘S\×ßDp"z+ªã½v×Õõ¾årYz·xh
·åí] ‹´Ì‘»~d“ƒvŞÊ°ùl½êº­Ş¥ñ¸æ)Ì}²iÇ;m:Ş‡·mk
»şf?³FŸŞÅ  |—m(À ùIñ´ŞºBƒ­ND—Ç0v|7â+i¬ É	=NÕãö§áÁâUdÎÕØâÜÅ…¿¹µ»<F€s#FüqzğvKùÚƒiDWoMrü2H/ÿËÇÚZ´ï£=»~>0ÖgA0N¾
ë™NvGãÈ×~V¢çÑEüx$øt¥…°•˜ÿR
›ªÎo…‚ğl#ê¹è(îEÁe†¼5v]d¿‡@eü®&ğî& ÜõÖ†ó'Ë]ãLœ?'Ç€k.ğÀOğ9š	À‚ë€zö¶ÃEÇ×ƒh{=G*x‰¢0Ô½àÏ÷eNX™ƒíãÃõ^’İL¼«áf'…şcüÄYí‚qä,uebá8±º‡«ÎSGC¸ívÇ=¼ywsæäg }2:o2BRği.ú\œ?c°ûşZ@#¶ßjû 
lWÒ®;+¹Oep]ö¸³ôŞîÒ{¿Zzowé¡]Y’{ÊOşr’ûÚ¥î÷êZ±º5‚^‹òÊ†à•Ú"ÄíÙ¿
ÊŒA~
èŒ:?‘S‘ŒöƒC¿&v8‹wlØÏ”:€€";ñ6xûÃÈhÇ×3ñÙß‘uíSlä 0&Ğ…êÜPØß	Ûhm'¨~è–º·šŞÊ{Å±2üP~_öó¥X5óbWwOÛ@@«sƒN€»~4¶p³æÊK§¨ÅüäÔaÏşŒp™)Š|bâ@ht.¦°İ³~­ñYğ>şæ}ÔùıİJ®Br=ŞUQïfâpÿsÄ>BÎÒËE·áÓd_{Ëã‘<7#¸ë$ç !8Ö>ğtœÕø‡yİ^z±¶öûDİÿ\b1˜!øî–j¿»µ
ı3¯$.q¤š‡søšçØè…0ôJšh›ípcxÈºB(<#Ï½]O2â“Á·6‡x		É8 ì'ÓÂñ"¹¤çã«mÂ†:L9ƒ´´ï•3ÿwKï•Šöµ$áyÈİş%©	øó¬0º"¿H×‡ä>ğp ºˆêvhİ‚F†Z®áš9`; €ú›@¤ÿÈã?E¦Ú/†dt÷;ß«‰Åê(Ç ÙõŒ<˜Aı9·
Ş]Xº‹Øøıfó–p ãbSt¿pX7¹®/Ù"ÈVˆ¨å"ÇØ·ßx[‹2“jÖvÎ^¨…"sóÓ4LD‰¼"OélSxk!bßzõe6 %˜‚‚}Chş›9ßºúå<3›ş
ã?œiÊ3½£õàÀo³Y“°{İƒV5¡­‹ÉÂ®cVí³ü¾,?ç ƒLyëZLW[_Ê˜Gìl"ïÁåƒxƒÁç™¡iÎ
±˜ı&º7Æp.4,†ŞûzÉñwâTÜâ ùĞYÊm´ª>>'îúÿı<f2û“G'‡ˆçkUğ©Jÿ@¡U,úòøN´ˆ¨ZøüÃÃ”[ØOÖªFªåZİAµ¸õaM›˜uÒíÑÄlÏ°u<¬Š½ÌÊnã}‚å´>°^GÖWYä@ò‡×3J°ºEãøeo•±=r"¸:+Ğ y¾ûß–5ıqóíI+„(_™Ä¤8I¡–á
óâÎbÏHÖ‰J,:VrùÖx§	vH¿5N"}!âJäğSéŒ®ƒiÛ™s£¡Ãã_¾N£Ş7ˆ#TÓO¼Ñ#ò†0ì(”œ»Ö­(¶t^IÅÈPØµ!ÉHñ#­n]/ŒV¨Å•ëm;xı²ªÍCø"´‚æ$kC€|YÚqÛ;c«ÚU½®Ã4…wì§Ùw°Ç²[şq½)º"·±¾ämuô"oÓ¬a:tlªÒ>‹µ4ô•Î#Q_K>ÕàÏŸåu=×I. ğ½ÑEäBÇWüëğƒ©0aä padŒ°ôñ7ì¬£¯¯9!âÚ9·ZÊ 1|1­ó–ÒZ›{Óïá]×{ğ®Ç…’¤lú( %@ëLVñu©­¿‚/<÷›Dh>’ùÄ‚ç†ğ3VğYÀw~5ó²•Y¤İÎC¶»s³ÖñÌ‹¶ã_b»oæ„Ã„õÂÑ·Xû>éhJ\=$À»^-3Qâ‘¢“Än–œ ¿IöNÔÓöª'‰´ûÏÛ“í'†Ÿ9«@ş'dBûé°w´ÌÄÏÅYÃ€Nš]€³ zˆ0‰Õ–ŒA°‰OìƒÃ‡î$â0E	Ahg{!ÖŒº†Å×†c‰NvuKüù¹°=©àéU«[©\8W®")Šüƒ,F6Ñ›•½1«3¿S=%²ˆŠ„ïğõ‰¸kÄçÙ"xèDPÈÌ	ªédüB«ôÅ]âû»§|†n¤*¸´9R Ù_ïJŞ7'9¥h]’JŞdVëÎ¿ªŒâ}éÍx¢ğ_{Ú<‰\€Á/›Ğãæ¤šğ¢9yñ\„bñnö×^]ı.º0ßÚtQï§
ÌŞ“ÊÛ,`´ı„VÊ?\é¯ÖH–¸0£\˜Ü¢ÖtÔ–ÿ~QÎ°N-‘SüŸeÑ§8ä’¢©ˆşólÂœAFÃ”˜˜oø•!mÏ‰yãGcmQìãSÖŒ…§>£aÀx?å£¸mrö)ì©<ßN˜¯	Î-áƒè½°­ëÂD¿Y¬Æ|Çi% ³æQOaK%…­I¡‚szc0IØ ğŸ¸‚®R
£$×ÔFÓAÏ#„&	
ÀÙ}ÓxÙ²ÂÑ­7Seì¾©Çs`Æ2v½ü³z—®e6øş–åµí0}¢‰T¾×ì°Ùå¡=‚óşşi¹f¢Ğ±!ç¾õƒûÂu4YlÇ9aÈ=4‰ß…dñ€ à†“Ïpº(Âs›6ëA³ĞNçü‹6\É#öóÃüàà·ŒnÊƒ
J.ÈŞE-¸¨5¡İUüI
iaSâ÷1æÓ¥’+ì~ÎHvVwŸçËÎ
>ì¯à©àƒSÁßÅ˜Ï—‹ºc;[\İbˆ²ˆKOVÄ¿Ó¸÷àƒƒ­®ZWv§ZŞŒ'.ÿËÂwyÉ_,pGyUá/Ô-Y~I`÷íwÊuzMÀOÏH°,Õ±”€OÉZ/_Òtèÿs¥ïï{°èË®oPß¸u\U²wç=îúàá©ÂM+Ds^yÔ$`Z¾ÂT²å}lgÂ1,‘"©·›å\ÈGÁw¸NDKÆ)[pEœ#1ÛN¶n<5¼ÄğöB¡)èÎâxÙÒ
ŠˆÏãrŞ¼öê…“ö´L‚µ³Õ
›¡ä‘\èhK¡6‚ËÁşl.xºûÅ˜»ÁğğO¨Öj-ÄØ‰Á^º*IÄ§a·ÜïiÚ¾¦XlÁ¡,RûŸTĞ¿b•ÔÑ¦Ë%v]•¦–ÏÑ¥X9ª(\Á$·‡$ôµ¡]±º®€Í8 ²ÎKŸY7±$MG—O9\‹X4ˆ\À‚@>aÑ·6ß¬%´uwÏ+ñ)èİSê¹PTà=Ó#Y–
ô	–Çµ¾Û›È~PAõ6ÖrTzÆ¢u·ĞDh¾aDú.bà-¹Nn	rã
xW*|cÃõ‰ÿv@®ş°\ù¶…- Î|˜·‘Mã¼ˆèAX/$À>¶èøqÄoÔw»²Ñ®+ßÎÄ¤SäÙ>š°Ş°Éªi"Y· Äë§]h°¤A8Øs·IªÓÙ×™®ßö·ÅÉàYÄíÌãFÂÙük¿Oå<wfàÂÎl†/ÃÏ‹"Hîl{¹AQüY~^”……3’•2^ó99¼}0®µœŞI$#T<ËP4RKÅ´œ©f?–k•½St)
Î‚ãŸÅu­ÙweiSše´­tŠ¼¯Û6EïøGYç³yİ³¢+¿ÈüLŸò¦ªvÊrçÖ•.ßBç	vÀi´U}öáÃNB¢Ï~lÅˆì¥Q[Ø­oê”³
r±¥Ai‚‹Ä2êgäs¢øwÙÙR™öIãÜŒn»Úu$ãx6ÚswÖm)’Æ6¸ÂğŞÚÌªÿÌ™L	?<kºî´²|k°n¨M ·¦½N¦FÙ=!öyÍ€‰à*Úz‚¸ß¬ÇP[ä¹ºá„B·R&T`§xŠô=ØWw˜q
æ…J'¸Äa0vÜÙÂçè(Cqæı‚.‚?ÿ;{WºÜ¨„ÿóY¥â‚häÈJRIÀX%ç¾ï»öâ.–„ìH±ıîéæ„¼ÒÆ9ªv-˜‹9»¿î™é®vĞ?êSl=rG¥ö¬ˆŠ‡®eS°É¢0a¼h@&lcÓ×‘É²Á¸	©#‘ıèÓòì¬¡‚µëeQ3ï-ò¸>*·Â×À"âq~ÈïÒ3ºlj÷Œgú5,y•(ù¼œ‚ş¶‹ëÈ'jØÎÙkPMõ€@¿/Øhk¤v€ƒ¥¥iømWŒ!´ëØ#="ˆô
iµÜÿÃ?€p–âfQÿã‚»@¬‹ÿÂK§ê Œ×
 o®şDw)XD§•ú±X›ßMò½ufÔo
İä¶´¹ÿ œMò¡g×««<äÛÙbwñ5eôz|«¿~‡gßi÷¤mJí;
A|Â{§Ìı#Ê¢»Ï xå~?_¿ô”½V²ç>G(Ií’P"Vó&ñ$bB2Ìñâ³wğ Éns†Buƒ«Èwï0“Íòèq/á½lIIA˜ËáÚ2¹
‚±Ö*N|Ô–ˆd)âJuÚşfİÍ°¡Ë“uŸAİC¹îH­·W0qyıé"´W¶^£êÜŠíNY…J°Pî¦U®¢ J´ùãˆá!¿
Ê@g’íØÙ¬_yÕŠ¾¡/ıSe8ú}'ÔaQiRØñªBÜ
À|)´L¯iÁgš'Ì¥Y¯mP•m×#^_ÎF´¨Î<¿šeŸ?\P.Î&Ğ¨œb<DõURL…õ.0Ü©NÊëıô^¿ÿi@Mì<¦ó µIRrêÔ_opÉké¡ÉÙ^jÌğ‚ª@Q}pmC ÑZ:®+Ä³:ZY%P‘â*|ê­Ät\èäA…lÉÃÆ’
úKàXW9íãoŠFš®àJÂºÌ«®ë{–¤ù; ;7|J‰QÅòöB
şMEø}Væ<9¡® Š±z8ÔJÄ
‰¡šèùŒ7B‡_…jÊ«©m¼d.tªsròÌ¥‘Y|µ”€¦ÅCü"èPdñÍ;Q¹b‘4ééX>'wHæXluÜ¢—Ö£-üdF?Ùå*6Ûï—Ü®Ù<9©	T÷¡ÆÒt/<-
5Z"í<®·$íÜ)Şf¯Nñ6ûÕû–gÜİ)ûòB›âì²Kp¢Å?ü}ñütsr¢•·JaêALˆlæq'øu¸–ĞIÀâœ—Á9ËWDífkM%ôŠ¹Ëi¬ÚØ0±ÀÊ“˜ úÖD;¡¶E4€3ªAİÀr‚xô°fôƒÂói‘jJS…t1-RÑ_bû¿FVn0¿68Ã:/VeÅŠĞO~pEˆ¢ÆUîŠ÷…p ³Å“^æËsÃAM¿F¦u_›
_³ğº¯œg NÏ™mª9¤™ccË@g5pGÜï$.R ¼‰äŒû¡‰U¦Ó“ú0„‚¢ËŞ)«MiÁ(>])ß0òy…÷jØxé“ğŞ4aD•¥wN#¬(½C`a2ğ’OÖKëÆùš²{Ìã_OæM8Â=û»{4ÿQ'Æ?tÁ·qÂEÉ	ç;8á8aœ0Ã¤:'œ«œĞYá¼†®:Sı+ìÆ	—ûäŸÂ	C°Â¹HeÊ…ä fV8¯e…0—ä|^Ã
“FVXS	½b.¿ÆªKN(§P9¡í„JXwNHy\ÂVy<N.§äq9dÉU—3®“K<.¯áqz™[x3&WEÄÏ‘iİç¦üsœÉ­€ÉeŒÉa£3Æä ”‰Îä–@_S+åL®L9““«ÖÆä””œÉ˜Çy§TCÅ>*½Å{hõ+?k¡àÂ^#æÁ?ô©Ú¡SAq´‹ÿÍwó?ºzğJd1™	5hŸN@¹{nÈ¸Ë³ˆ§à.Jä»¿OänÂÛÙ=+¸İÓmÁªº±\İ˜U÷iÕ¶\€Îà‰àøãŸ‚Œ9Òù¹Ñ‚2æ%ÊHv ŒùóÒ¾ÒQFÒ.o'5 £;Cıï€Œ¼sŸ<dë}0”q‘ˆT>£ü]jI-È€©ìdçI
ÈÈAFM%ôŠ¹°/ªê CN¡‚=Ú	•°=A†Qø\Ê*Q½¦¤¢Œ5cûk	e¬kP†^æËQCÄ¯‘iİ×¦ükd,=¤d¤&e #j™é ‰ìÊZqQ®8È«Ö2ä”Od@Sí˜¡ÁÜÌdà_1©]=ï¸“€:9ìø½÷ØXºg–
zøà½÷ÀjFU,|p&Ä92c¦b¤§¹aSú×ïoÒÜ]´©¿=(g~c&eÉ/Qä74™ÿ‘ÿ1Ü¸;By7î\íÇ0ãî¬~_n|(‘?ş»Eşø‘"¿Y#óÃY˜¡œ1'Ä0¥Ğ^S²5é1 ÕQámä«#;Ÿ)rÑä(E.2¢£ªÀB›v¢±TšnPÿ¿–¡	 Ìv«3˜@íÂ*ŒşNÎ.©âªtXÕÁ‹Éú—_5—	¾ëƒ™‰3î¥ÏĞm<ßÌı#vqÂÁ ¸8Â`š³æ¬à)A«OQ
«:ö<³<VÔÔ-ªUs4¦?ñ»/¿ÑÎjèI¤3í%LZ’`-B÷K³ÇM{ô&äS(ù`¼[„]åk4uîá#ënÊ¯"6´\z°6?«¯DÓ6·&amn/aÒ’Õ2c¥^õŒ+f³löË¨Ó’&ªŸ“t²Ipºêg»–¸¾PQùD“Ï_){^•5äûÃ£å4Z.[o,–ŠxÍîj¦úI¢ĞUÓĞóDp6<<İœa'Á¨Ã#ÜbØÂ¦çø0¢Şàé*°Š®´®›Ü¬¯?Rˆ3Në<ï
÷­á°ìwÊ²¨mM³dkM^÷,éKuvÚåã½º)¸÷µ£üõ“¿Ä²4|ÀïZd­÷èÎª”è*I¾ÇãÒn]J"¥Ûõ1¥ü³,«ğyUˆÄN6$‰g}}ƒYùj]Úñ™‘ú0e˜PZö á-€»âŒrq8]ÃUóX&c¸¸í‘âÄ|şÇÕÚÍòÄ­ïÁLïÑ
Ñë=›…|ùı7×ôsx»gCù½êÄu°ç £J3mx\~•
Ì<3°jbà³¢9bFş¡X¾V‡/!P­Ãs=/,=-ëÌ(6H»\/6?PR'·»-í¸¨ÌÍ¢WÚ©}nó°²zFqtÜf«“¡#ğxvvîsrXôW¨ôÎzµeœ	Å ®7·€QY®ASg#A={û¼R&ÌàÔ%ÎıÕu’ÜßÀ{µjNƒŒ‹ûbo
»¥¥{@u\$½ÜŠÏ°¾3@<¾‡sNŒ<4u/;•o©ëÉ‰z¸ßbë$ÿ`åÍXlƒï	Â¢2^¥øS‘Â‡îoÍ4»Íì®Ş8`Ï=¼âŠ’2C‚àërF¬}f¿TO¿Â³çùKõô+yvÆÿ
	u¥±ì*Œr_ ¦¦äfW‹›„^X99©
6…ä°ù	)•ÓzP55ºK
‰•VÁß–Ï|\ÑÕSïè
’¬é8ãÃêj†¦§ü6?‚^áÄÂ8‡h€RûUŠ)‘£?h\ãìËÿız=wïêÔ,NWèª"Hö{egÉØ%Aex=â“ÆÔìáRÔÆ]šyIµÚ®f  
¿
7kZUZ®›»ıæÓeî9µzMš#_ù•¡d³ŒpÅğÒ’SæAÃ‰_ÔóAşˆ¯üxºoºnñb{§ÓÒâwè ¼xgŞ BÚw7§Å €vÁ7ŞÊKTÖ“Š@€ä×æ-®×°å¢z Y…€‚òğ}–kltJfZvE§¦×Á¶Î YU­ú´>mâl¨æ™}àôgxÜŞéşo¹Ñ	±MR¶ìÄpq*Y`ÉèŸÆ+BJ"‡qÈà”]Èb#6îŒox<ÇÇ>n1t{F1tRXkS8Î)ÆğÙ~!a1"õCÔ»
×å@¶FëèAÓèQjÑ4v¶:;ÍŸq§T{Î²¶j206L|(—³ìƒ)€‰W<c%ù•=Å7S*,Ÿ‡•Ãß•.ï'‹Óæşg<ğiaÛ3úa0gX‰ª§4Ë‘°‡~ïó™.rŞßëa§Z/™ÆŠõë’®!³b	ßYİxùA0Å¸îİÄ‚­=m-ûÇ…îmôöe Ãx…K 1ÔT0oàzµ1º £ªºduµ±·AxÖ¿…øyZlDêÒ½Q#Ïà«!Ô,†Ìúİ_
ÁŞé©,F<g%ùäf²8|q
T‘øê¾j¬ÙîlW/-!ñ» WË×Ÿ¿Æ¡9yË‰;¢–­Å N=Q=½? ñ/RëÁ£k=`µæ0HO\Ò
,µÍ¤@kıYÍ”¶
ÃE>l×ÎxÛh/'pgµi·¶œtè
Šõ”àÍÈ™A	S5õÈ[1¡b[A®}§|ãe?\_˜pş.œ!ùğÙ+v
í8Ü’®Ç›•‡¹Nşÿ˜ëš¡²æÔ){ğÜ‘n®xD×[ø¹›1¹vG©ü~²
NÛ
Õµ‚~^'àBeŸµ’²’"I ÿC—]Qrët&¥È­+Bê[°jWÃÀƒÙ_;÷SiúÂ€½{!½v Ìã:¶oïÌÇBx¾´—Š½Ã¨8*ñğ-@3èõ4´Šê©Æxå|sf‡c•\ô}[
"Û3{6V‰E?ĞèÙŒôGz‰#²é%ôG¤„„X½?
O#|nÜe½3r½òxjÁ3k“ÏõjÃ·î ¸NZÌ6í”ï6¨ÚgÉõÔK&É"öˆ±;;<}‡4$ãÊñŞ«“áäòòİ^CR®oàBúêÊ‚0 A§2GƒšL>y•ïZ¤Cç¯fbI‡,áÆ	,ïİP†ˆêßnÈ2A¶¢F®ÑJRÅÅª
hıBµˆ+kÓ"=Å¯’N­>ÉÈrfø1nBc¡İNà”[„Ç’³¡Û×ß\mÂä‡kº»mV²ˆEÒæ$>$	(
Ï.Òâ(T
92(x…ÁWùG¨€
Í¤:ØUN°,ª|¯Èi:È¬ó7_¯Şõ@‚ñÜiZš˜M/’nZÖœõB\=A3“3;#ğ3²ShHÌÏ30ıM!í>@Plñ›‹–¸sì+ÏáO‚ºŸŠS”4º¿Eú;ª¶\eÓª-LÍ;–"şN]>¢
öAœgkjÚØ£B2üâJeİD£>üú.N'Í¿é˜Æ¸<ìw·ß¿¾^WdÌ!ö¼-v4nÍkOµ@V‘¶oBìù´&pÜšÅ®ËBL¹­
¸˜îÛª‘]—Ç~Ûö-ˆ½à±û¶?ª¯p’FÉ1åÒ¥²tÌmsêî´íJèL˜Ò" 0|±‘š²ÜB˜øÉ)ûåœò]àûûÊ)dUA–ºæµd<‚áx´÷íR8Ô[lzjìúzí+"wÏÖ5¬7@İ]ëPŠõ^9ihƒÉÈR7şFáë¬\ÎªÂ‡Ñ  ’|\ë˜@¨”@[²ÖvKÚ©uº•uDš5ÅQ…ëİß‹Ä…vPµû2U+†dÿ#ø»è; ¤8‰«[@ÔÏájiàì-6gúLÊ*××_\ÿF-sœƒ	ÉHŠÇyx<dAôˆpŸù‰«yØÁŒ–,N¢gùˆz4nË”é™(`½oc&†"ôŒ?ÓyßÖª@ÎtY–ØÙ¡œô#Ôb[–•œåç•·hK¾tïáÊ/=¹1k_ôñäÕ¹!@FsåøGG¥a™Å-zk©!Š[Y­‰·–ÕÑ¤oX}&Y@Ïú›bZ±%­H‰jÔõÁBºVî2Ãƒò9dbğrm©Ui¶Ø«´d¡¿Ÿ‡Û?`­¹<¥¿¤ègx/è”Z»;j8Şoæ–]Ÿ¤´b»@i¿¨TşóÕ:f¸¯>Sãd!t‚ÈM´¤¾i¨}{3—Ù·ş,×ã@ç8w†` ëõà¡TÍÈë©Rœ´.*9Ï×š­é&m[®'ÂÕ*¤ÔÜÊk„Ûè¿’”2¾Y’-üOBJ„Ğ¾ı:?z…q…sÓÕøí×cû¢cè7	í^|½ºúˆÛ‚X‡öà½!av&Iá.ÊWÎ{Ùá'Ô<sôA¢‚‚Û1<–”ÙNèËÏ¬3úÂÊIá¹ ÅvF?{	…úµ§f@BIOÓĞËoVákZuŠ85ÂÔHŠ¤PzVSe¶¿0Ü"*`jõ¤…²9¿Õ]dH	.„ŞFO°=ß´—°½Ø(%ğãÚLl>@øpÜÿ9ÚĞ››S&†§Úf\Uğ¾¬»½FÌòİw³¾î€y«’ùhJÿX4i¹)9¯¨§‡ßI¬½E²¡7#²x@ …ªÏà‘Ã"˜Aè†¥C¤‡çùØÌªÛAÙy@çóË+f•’Vfıè±Äúÿ"ÄrêË¸Ê„2BÚ4¹….ÿR±wµÅ*#¢¨Šà‘#Œ¡rLêX¦¢ëYclas™ıø4£¹Ü$€š-E4g¶Ş¨z¸¦}Z8ëí–Á,ˆ®+``@¯Ñ:ôYçe¼ô¯°1éş%±>ıÌ¨%"$É[*Äº¯ª¬±Y­™Ğ}Ë²Ë¸i±Øbëä("Msèy]Ì˜Ü1¡sx£&-¤A¶
°ÿ’Öu±!3«Ú³~#"–Ğ‡ü–S_ÆU&”Y˜Ğ¦ÉéĞÎôuµ5°ÎÑg 4¢Ú–4°¶HZbè´¢¹\$,PA³¥ˆ¦ÌlY$.­Ş}>-›ZœU®:Ûrz¨¼òÚS¸ïÆÈl7n·næ¤¥R7
¡8¿¾(Æ Ì×¶&™Í¤ºıçiäá§Ù¤Œ!²‰uHÀğÒ}{ã¼˜Kü¡pŒó"HsG&’]ÜZUı¥  ĞÅjªÕ^¸­6*Fl¹ôàLOsï6¬üàHßHÁ8¼!ü3œRÇ dµ£â1Ö¤UnB´íVmÈ½Òh©Ø¹†È<-<w˜šŠ¢H7¢Ï•2Úå×Á°‘á{û/‡SÊÒ«ù…	%/Ô„²R`åYàÔô%uí	oP<¸wì
²{¼)=¢4Ë=8÷}s÷úòõêz²]™¼óÆòSªÃ—”AšB™w˜üûºJ))M
Ùíd’ÊƒÌk\7r²Âıv4/~BòÌå;›ò+ì•² òÌÌÎÕë×²i˜ì¢9ŞÛPM~yı;g ¥o­á9Ş,[‹›{àÆ¹z³Hegà.sË¯°ı<Bğ…kx9]•'lû­É¨5ƒ×Ö_7³A[âr/Áêƒ¸s~>tÒòjú®*Eº.u`1(rt«3òI7© ˜öi¾„i~ØK¢ÌuVBÍTçj	ĞÚg¸áGŸç÷÷«±)ÍBà"x¬ğ‡k&(IÓ—â}!-Ìhª‚fK‚çó¥€¡ë&¯½=Êe÷§«¤mµ°ÊÅı'8G$	ïå…ßÈ—4¸8é
ıeRİ$p}Ë)N±ƒjo	dbi9P•"ìnƒò¨¿ÆÍ±5ö?ST‘üêO|ÆB© ŒÒôz…ş¤·Šj@b%¼°©Äu÷÷‘ôÆ£U}VT¨SWä²–T:Z›ÁI>S(Õ¦’‘
/[ÿ@*}¢H6ûÇgöàŒµœú3áÃìHôàáá3êd†
@nŒ½åëëÄJ4‘å”d|1İ_lŞ¹^`gx+b(ØB=ÊıƒuÇÿC‰”0Œ%ş1PâŸ$óL# 
ãhˆâ% Š|_@‘3@‘?i@±d3A
88Ş0 8–­XcZù‡ƒöä@Er‹´C¥ 5–"ÔÈ%¨‘kPc©C
çoÔ|Â‚ÆSÁİàÆ"QÁFùüÊ”¸Bk£b~zğÕfR@5½½ß‡HçéÏ–%¬âà€zª¾4xÓ™öİ7-üŞŸW0!oVEæiÿŒfg[ú0*CFeÈ›eÈ›Â–ÃaJƒq¼L6}íÍß+¿Öz}…Ì€g¤ŒAsF‹„²ÿù¥ ïÀ€1hŒ¾C0úÊÔÀµ'f€1¬ £¯Æ#Ş™µÆY	£ºæ B$¢Ÿ“è¹©âÀ¸¬úCr	0ú
`ŒeÀhÄµˆqîÆ;ã|åS\HıÄL	ÓÍá]Œq`Œë #ÔRŒ¾\8mJÅş	tÀ¸(g·:¶Ğ`âB„‰&.
L4WmŠu4İÒ“€‚‹GBÁ¥ï÷Õ-E­Ppõ{iÇ
Š-y1ÏtÔ×¨iâèäÃ ×hiÂèCK³P¡“K¯‹Fì¿ vZ¨Šš…‚œâvä´ĞÓƒII!Òt’tğĞ‚‘ü—Š‘pª|¢òç†EÉ‚ÌÙ¡Ã;‰ÌTîp.Ü°:ÀWĞõ[µëÑ²W.˜r	€à7øãwaOéÍ·_¯öĞ‚1%a9Ô)^‰¦ãJ~ë	·@fğ&Ş~Há½ºøAÛ1`E+éĞ.\D+x&zm4âa"U Şí
¼‰ü &RõàmE¿9€%ÿá»ıÑë)~!á'Lz;U)Û§Õ¥¨}ë¯ˆß_ñèE-„åğ“ë<,J˜P‚ù‚Î‡W^p…w†Ì ?ÅOÊ­!=^ä§ËúûõõÂ’™vFz«ÙÔ3Go¿M^áNß²zÇ**Ş°Q¼@~ ]0ïÔ¡Òá@î-„„{wA¥TÏ/§h$z }è}2İ£0·ö}lù´|z‘µt¡÷AÖ¡`ZkÓ¾Ã,hj5¤ç­ÖêÇçZeVÕI¿Ì{äKPµ˜¥2ØaybP®r˜7ì†ğ İ¦C9¸+ëƒùyéÈçğô½×M©•,â
¯rìªú¶h
æ%ÖÖnpz™–%U—½ŠÚ~-¼h(¿&6·Úêƒp7¹Ç‰Vf˜‘"‹Š„m™í³‹„:³ø
à›Ñ¹Le<~[u-_ØYiËÌ¾ÁDqê„¸Mø]=Úö%Ÿk æâ™bAÂfp>-—ßfx%´:è6LÊÑ`€ÿÙY±‹”*fˆÒßCaïÁ…WY¬¤AL°Œw–q»`yrRŠ•Ò²·Öİ¬«it!Íx?	2:iöí-AÎÜÙ yá¼À6ÓkòŞİ¬×.‡ÎúøBr4gÌê2Îİ…mæÈYĞ'5n
¯Ô’¶ÏÒPùdÌíLPp„¯	o¥˜é|bN)ì_’œø…?æI«ÏÂÑCö .
;eE_/<è~<“…æp‡ĞìÃf!JÍ~W©y®JÍ!JÍ3”š#¼Ş¿Ä«ûùÔä}Ó§´â“6b¡5X´bh98ö² šIo<Z•S³ÇË©Ì5·(§Âg$95ãrê¬o.3„/[›ÏÈÎÙ"*Ù•y„Ü¬ã8ƒ‹HnUÈ·X!ô¡xıĞ·– ¨=Oèñ“¹R®%ZPQdÃSÉñÛï}/	wKÃğ~}³şöz\‘‰½†}v¸÷ïPT)"wø÷£¨hO¥€§0È86Rì@(Ü©@(zœó€9Ì‘[?nYİäe¸†Ãœì9Y¹©sJu&+iÉ0N*cƒ‚å´FïÕ·Ş~g4yç•`¯a%š ØW¿GâQNx•10äï@@şşÊ¦(èŠ€ö @ş~ (>U€æu@Né¤e­Qøã1‰@Ç’‰›3”sËf‹[v)·qC 
cücCîÆ¹uƒƒ!î¦oŞbvÏ’Î0é“BanÜßØ]Àß™Ö¡Ó¥IüÑN½–6€¤¨ï„ÜrÌ 'ûY•Hb''ËI¤*HJeíI{a¤LÅHb¤Y}Œì}‚ìı¶;Fâí­ÅHØ\Io<ZÅHFúx”s–,c%øœ„•R•ÀHÕ8cè‘x„†‘r	#ÅäÖ*;‘c$•0ÒQAÒÓÇHgÃa7˜ôb×CşÇIÿ˜ôOP½dœ„Ÿ”¡’®úW€¡}ÔAO 
™èFLõ‰ ˆ^‰•Ş¨‰·ì¡Õl<Cıã ”ñ?†:†:„‚ÉûrQ”Ñ	Fı×PÔ¥·êœ›pƒîoßŸ3²AÇx{İ‹9È+êğ ë©ìÑ½tLfìÊ^òİ]ó]İÕSŞ½‹ºÂµ=ĞZ×Í;£Ü5;áyÌî]äFÛ½‹švï¨yğÅ‹nØå$ª½ä¸wæ·9·fªß›Ë«½¹òúe…™Œ ‰6î)mÎM½UÇ9>Ş3ì;ÂºvêºíÌUL-'3«ìB”X(tçµNŞ¦ÂK¿Èxióbxi£à%ãp€©P;ı­¸é_¢ob¬÷¥ãoV9½tt³?¸yÉ'ignopÓQe<meÔèæ	è¢½3·—Vé•DNÜw¹V)ÜVZ%CQ+
¨Z	şÎxâU+İ2=¨>zR¤[då9²òÙ÷¤»©hÛÔ óm×‰Š#tĞMyT¡[[er0ÄB¡7ÿ‰`èX¨óşÛ1áñ?Úıàñ?ú‡íÍGÄCÿ‚½¹(êŸ¢ö;ïıŸBQİ7áş-8êEÎ{Hág›¬ÄXwêRj.Û‘mæÀöuIÛT6›Ü<N†ã[wb/c©/pÜÆ¢Í[7¤Ç+[N+r+¼mN7ô]º5èKw£çâú&>}Ó13.ÒGå#ô‘ (H5cT¶bVd©™ƒ‘â6.LûÙ‚ÆÓzù_ Özõ¾§ß´Pc"DÁ±f†Ã² x®7#dŠ1Å¥Ã İd„Òm;s“@BU±Ì¸
UÅ%ªZÔ¢ªø9™sT…>ŒÑ÷
öÃ|§
˜h«‹'zYN ^Œ¥¼™vz†¶ıR?VôrÏäP££Rh€ïl·?‰1/İ¹À˜Ó×æ5ŒÙz©˜§¹”,ûÈ„i§Ÿ¹lÆGÉmq£D¿AŸ:iUu'e€6w“ßSĞÂ«h!€Ú| 5òÇXµ¡Åo­)Lıß*‡«# Ü¼#À-ğíò“ÚÚYßWÖ:ö·±j4°‰´RÊŞB†±3f`3™ÂÀ` ]7}mô6X„‘a°ùw.£ÅtZü£@‹tE‹-¦€±ig¸ïÂ›¬ÜXeå¦Ô™ï½\9¯5§“"…¡Æ2Js:ä LĞ)ÂÊÎídNçÉœÎ]ÌéXÎ¶Î¥7­yñz<l¥î2xã2—Ğêœ£UÚ|¡BrÅ˜Î%5¦c9²-¨/ZìŒ@ÿN»:M¶Û‘%SÓ]yæme‚pÚ`‚°ZÁSfVşlkñ@}JNØ™¢bÊ-FªB–;bv‹‡-}•!£2äÍ2„[ <HIÑŠ¹GbîÜ]¶`î|7æÎæv&HD‹.Ş²‡ícÌ¬ÑUÓ¶ç›°w	—;-¸¼ Z¢36úÍŸ$ôÉ&”şw˜TlØÆÿû@û {H÷ätEÖ…"‘â{ªÊ¹…š©øš²	_g;ñ5ä›‡µál:Ğ/Šµ3¯³âp 0ÊL†×™
¯3¯Óğ:}ºÎ˜ÍH´Î„û–›ŒL ²Ó »Ô"¯0¡Í{£lªÈUñm¶ßnØ–òæÑğ6Cx›"¼]-¿ßoE“‘Œ¡0ª÷f5¸7kÅ½\:­ƒ¾%  s-`î¥ål€fl(Å,ÂÊjˆĞ÷R€¾—"ôİHĞw£AßË:K’ĞÅ’¤
}³ÃCßœa9
 g
 ˜u‚€3 Ó¿@ğ?¯ÃÅ1u«ÆÿÊU¦ü÷t«ÆÿĞïe@¿§¦[5Jå*¹ÕT†õfO
ë‚şnüªXİ¥W½cÚ¹¥Ó¤]Sè½;Åßß¯[í.vìã…îÊU{y@åêer•é)`/İ+©Ñ»’]z×Ã©]Éß©v5©w%‹Ş5GuhİëÍƒõ¯Æô„…ÆK;I¾IÑs‘%t–ÖÕ»Ò²=HYGŠ,mƒf8à©r0#¬´áìàn'ÒÙAé$İ™’”kó“—Ü„ßÀ¼ƒÊC·RVÜİÓŞÊ5\í-ÌµzN@K,^Š<øm÷$p·rÅ‰|^e>Îˆ^*|Ú‰ÔHº¿7·²´H`Ñ(‘çÀÚÍÏzØ·CÓd‚ğ–MëåN4ïFAa§>³9<‹Æ‹¸–Ï]ªÿxjŸŸÓ,Ş
ÑuâRÂb;ı$.e$§ä–P$aüÄ éLQÄHÄ ×ŒzòæHmøs¤è	Ù¡c)Ùü’ıÏˆnğ\ââ/Ùã9óÃÓEÃÜtxS}Íp0ğ
¸—Îm.0Ù 6-Œw³Á‡db58Ébo‘r'Æ[¸’Î¨rõ(‹ÎR1o* Ê‹å1•Ãse*âÔå»cç·åd,%"hÉ5’àê+7@ƒnŠ=ÄT
|˜J»SSIg±ÅÚÓil‚·¼`’Z#-õ#mV7ĞuM«u16hXm»O'ì…’W*J®ı("ç"çùÃCS+NNSoT@½QĞôRAÓ	”V‡¦™ŸîN1±ÍÈÀp…«©«çV§V'¬NDX-”Ã¶®Aí¤öˆÃFBÖKémS²—
 Ûè„²)dTöFDÙK²i((Ø:GÙü8í~‹µZ§D[§¤n:Os>aö}:·û—Ä&–¯u'iX®x7®¤dñˆ›W•åÃUóÅ«½xõâ†*ëŠÖzÙÍS8LÌåa®N-¥e³Ü™’4‰?{ZÄÉ›,âL´Ÿ?d?¥ŸÉéçV„½¹{+K?·ªôÃˆ^êï¹.ıä‚ô“[j¤&ıìÛÆc:„lPüñİÉNÉÇßCòá>–’,sæºeÃäY¹ UÏ.Vã•
·‹”•è†E”&‚ ¿&¼ivÉN¢è4ÙOtšÈ¢Óä1¢Ó
£7(:Mê°L°ÉAD'ã²Ó
ÊNs·öZRÜBƒ4oÔD¢Ò§ÔeÎ»ñvFX¹şp.ˆÿ‡"rmvŠ\
‰•E®MƒÈe°ÌËV™kÒ
ã.e™ë÷R•¹~ Ê÷C!s-•Àv™kr,·”°Ü²Ärm=¦H%sMše®-‹ä"×ä"×–‰\Û®"W®Š\“"—1i–¹nT™ëF‘¹&šÌ5i—¹Â™‹áû°FæZ¾4™ëF’²&ÒÛM½Ì5y‘
M‹R×(uMÚ¥®Ûz©«Ër5øz­–*Ñ–*©[ªÎÓ\ª¥Ø5Ù%v…šØµ<ŠØu©ë/ö®¼¹mİˆÿÏO‘húRÒ„IyéA	Ö$/é}Mi;o2’+’–%K¶’è»w ‰“Ôa»M;mçÅ"îc±øíØ}·‰¢<=SÚœÖZ‹+‘«ÕHêÃe›´]¶‰İª{ê½ŠQ¼ù­B<Ğ(¿;Ó¯Mam~r'ìónÙë2J;úÏØŒ qP¹å[Éç)3º’íz²OUğ©ƒÈì uÑ/_¬®™YÙŸ@Zº¡ü'¹¹DWÃKz\b²€Ÿø)ÆpMG•_æ?ü’$âõ6û±¼¾ëº#Éqs=QõÌ¡²‘×°ö}æÿ¬qAh%¡˜Î=2¼Œ§1Bñe¤Ôo³ØAs
±m'Ìâs÷aóh7ØqªoÅ$ƒÙi’ÁS¸V\aœiµ¡é·tt¡RêúdwÉ,â$¯FÁÚw“şÚ{å.ûïÂ½½W•rsÓCÖpaEi)‰PşFpEßjv¡ìêòvêâ‘ĞXvüÃĞü˜¾tÜeÂìï–§™nİr ¼=(—]n±ıhcã-ÀÒ-ãìzo»˜µ6oáÿ–^#)t[ŞHßòFÄ,~ÙæFÚfsc†F\e´©zRìóÄA_høÖq£ k¾j3¨ÒØ{çÙÙx 6ËÂ$ıeyœÁHö3’ã ÚŸbœƒs
²v#´§hÎÿÚ#4Poue·v¼ø¬Úi/i.ÁÔ‹–*›p€«CËFªÂG²à%¡×@è$»İÀÁÒÀ¥Š%JK”Oˆ%Êÿm,Q%œ¼eógû¸¾#çíûş
»Åµ#7ÈÇkÿ—PMÑŸyì_ß]õ3øÿz“†>«ºŞÀü×ÔwYGÚ<Õ›o„†‚æ:àè¾2\pÀQ8ºü8ïIH£`šÛø€6
ø¿9ÆÄ-u´áäÊgÙ
7òóáÆšï‹²f«ÔàFşïƒ0È3›ôÙ¾¾Bä¸"É¡0ÑÇ¡Ç?Z»Êa}rĞËÑŸìëfğr à”ñ¬¤0îVPùñ#“79g¤”à¦TİÑÌXÀğ
—ºÒøqàJ|0=‰«ôÊ®<.º Gqà>pqàş+Gkİqß[ú_MßØ÷q„°ÖÂZÆ9]ëø "‡O/^"uÂÆºrèÏÿVí±¡ îÖvD»"G]‘¯?>
.9öôÓyB`ÒŒÜiØä)ì£ÖótbSÂ„sM'6å	Î§·&ÂÛÂ53³~ùjŸänı$t-<úˆŸzG¼ã:Önên£Ä&‰–‡—`¡¼ûf4P%z§i|C•²mã}æñÄœÜ¿Fpò:X’ûoñ×·ÁÂ|¬_ad¯İ Iô-@Ü'ÑÙ5Cò|ë{±ØÛ‘pœ7u›s²YCæâ¼}7Ø7cGıâ´HÙœ:]xÏÒie,•|Ì@®Z.¹Wó“fÁOhCYS8O»BLóò$¨«ŒÏ*73=şP_¼ÕÑ#±Öß¸£¿âÙ¼œÍèn¬u7–»ìnb3¥ëyAïzÇbª Kê\usË•€NR¶-ÉË´2İ“…’É9w°Õ‘2ß€ŠÇRƒË´À/Ñ`9 Æ°:îCcôiW¢K/|%Ñ+i¹
½õİ{°CòG0oa¶šGĞ¥×ğ˜†À0tß°Ó!hü4òˆóXÉÃr–r«Ç	$Oq=˜IçH¯O4æ®tŠ9)d®K!óãœb¢Jp®‹)Îÿ®G+\UUª¶ŞL`hó6¡ÇT‹*JÑÌTŠfB)šz²#…®*„OUèq,:SCê1#‡ »ÄO »dGÊ.M»åy¢ËSøñ,Ï]¸Xw¹ótæİş<—ŞÅœ¿Xùì0ZïÅÏ W<vææÕj\3Éå¬¾m ¯Á`­÷kšŸ†ì×Ù¯Eö¦ºµ±Ğà®{ƒ»îlÏü?€@nÈŒ¹HˆQƒZ¡º\÷ığ»>Âã‚Tœ	aDL]ìÃT±‡¡Lo%våqº´±¬˜_§»;o‚dUy®8Âi(ó’6ëe:S\2ØÓô‡* Z)€(!3Mˆ0TöNNííÑĞÙ$˜ì,\È|hgŸVOíşG–Vjè“aá8[?-—ïcë¶t <¸\êàry¸dí¾R'\€-÷Ã•Ûıp©N×óc®/ÿ}N×Çôº^ÁÎ¢‚Å!]{Ñ…::Ÿò_ä+Îƒ|OàÉŞ9Ú•ıqä—İˆ.*.eòì€#€qÔHf4~¨ëøä+rŸ[ñi¢¹?ŞÍ—Ú7tï;Ş)„:ßğßŠ8ª
xµx–7Ó›ˆSÃ_¦“ù¤v2â<­§Ãî">©§ 7ÚS¼ñ'¤ˆ|T¼ÙmzÅ†oµ!÷T4˜,[íğ
,Ñ¬ñ2 Yh4ú}êù>ú(tØáKè/>J´n·ËãÜ$uôÁhu›çÑö0 PB$G¾_÷Á‰&‹aØ·”]•7N”¸D‰ÛH&º3|¨­ZÌ¾Ùÿ‡œ0 )‰³ı)Ì_Î_Î*|9;Á¨n[nÓ¨îŒàèÂŸ³r‹V:ûH–„rC»K	„â“åÁ'ıé	Oúçûq
ûWªšÖMÙ6ÏF>CÂµY“ä3l¡Àapªø4X°h»Õ,Ún•£Öåi>Ã–êCşe«Ï0´Œ0.'Í©Áš.T§İ©<i[¨­BßX$¢oøÛ¾!A¾¶X„ßOâÿà4C¸Oâş zxp´MŞÓ›rª€&¡t«¼
k&ûåVsdöë0şÛe­Ë@Ë¹f­Ã•¢š’%É€ÒRr¶¦ËÓGœªşw8`°§ñ±°ø‰X˜~"–6?ËV?h«wœ6~"0ù®Q§êxå+b§¼lßã+b
ìvdáˆJ­;Ã“Å­C
İ—ÅRùZ´º²X>H$Ñmœ-4?KM&épkÑ°	m–.:øÀlONlÖPmÖÍÁf¡„ šÅık£•s‡mZ¦-äôÃ2“uF¢3ºUãŒ.<äŒ.äşÏÂÃÎèÔ”1p
gt‘éŒsGÜ…\õcÇ~ŒêQòº
1œÑ™%9'’Î¼C8bãvCF’“·›ïoolÊ·BB!L&(KÙ{ÏË¨~ìØl2ÿQ‡¼®CDï¥¤N‘m~œÈÆèi~¤¤ö¤cçÓåG¼áWËWåïNl¹$f(Îe90¥óG³Cbà$Àœ0X‚Ÿ7·¥æÖn.‰€‹oæâÖn~ºs“¹*Î
qpÑ´|¼à`N—ß/d	>U	å¥ƒ$b‘(âßîk?¢[#QÌŸ@<öÉB%ë<…‘Oèá9`ñtM9UälæªTµ8,U9'‰U™.V-P¬ÊQ¬*Q¬*öãÕ÷+É)Æå~˜Z4"tÙÁ LÁæ¦¶¡s«„ÃŒÁJ"Ø†‹`[SÈá
”…œ$äld!g«9[CÈÙXD°®jÛW<UãPƒaÖ…Î•O¯‹`ósE0»/A¨Hvæm2Ÿ0YØiï)É”ÁØ¿ÇÉagµm¨¶­8Ø6Ó"Æ@ñÀ}ŠmĞûÈeÎ“fŒAÉÒ‰4¤õëPï³Õ¬SsmQŞm}÷wlrİìwT›`ò<8vş0ÓÄı	ìÁu’Yk¨<ëÓá‡ş·Ş>¬ñ]¨üqoy•b“Ò©*à-l\£çî—;	WqıIbÖ¹çC¸$!¡zãn~u›öH(¡’	dÖÈøóõf6/7·¬EĞ~¹Im
ĞÃ—1;0óÁZEÎ9-åmÓn8õÙDó?\¥Çs0;y-—HÿÅğ_B¤İÁß;áEî®†½)Íá!™iNÀ0,cZÄYËv§onwÆş7€ŒsÌ«|–§°üÙ©;»÷À~îIIYĞœkáşÀ“½-“?cØRFÓ;{M­ìµ¤œ[púq½Ä¡Z«^°ÓJ«¶Ì_²¿¤j&|W¿ĞÑŒµ–©c
vK/#¦K˜ÅeÆiÅ×½º3ûÔ®œ¤d.Ü‚…µ®E[U‹#«ZUa3s–­úôzãe+š}¤Fâ¤+'èY`ÿîö¼C'¨ğw&W›5…Ÿ|üFJP.ñàŸA°hÆŸÓû[:W‚ş€/ ]ØB•´(hp£¨©-tj

Ö´ÖĞ ­nĞTÙWäİ7ÅY¤Ş@!íĞ´-fÚ,Úb´z„EÓ–ˆi[D°h‰g
Í•·b°Ğ©5‹6Cr+9×:µ†b¹f¨Qî_™^€¦Öà©=8XXƒÍ6£å7'µ„NmÁÂ4ü³°¸Êa%Yƒ§öà`a
VÊ~ØdÆkShÆM;â‚EG¾8Æç•Õ—†ij	œÚƒ…-¥-0 ÃL¯/
®Rjıë*\R$g¦©–jª-`ìd°ã‡+Ø¨fyÊŞcßMRòñjø“A­‚Apóıêaog±c¥(Wşò$“áÙ8k2S{òWŸ$b¨]„‚E&_Î·¦0¶£®âªª+ÅX|_Ö•úÛ/Dø¤	÷· àğ„ğÈ®ÿ‰Ì"½ƒ5÷Ğ÷9¼W«x}ÑV	Æ˜ÕDXMb¯&j"¨&•aqµ^ÎAí@¥^€H9¡R±Ó^f·=8wBĞ36¯wùu¼ N™Ş=û¹»T¥ƒÏY½ôm¬ƒdbÛ¹ É.jåÃ$k¸¡•Ÿ’Lğ4;c$óëÕÕ'øDz5+Ş[i«·ƒ“¢^t¶Õ±¿-PØ›Û°Ã—örÃèãO–a’€8X<
Qˆ·ƒŞíõ²·÷ìóõ² l³J1 àöŒ¦èXÎëÛÀrFo¾wcÿÎû¦şH†'|ñâÔ¥ 9€ÀB$´çó©«aEc¯¡ZŸ—9:1ñ75Ñ›½xqÎŠ‚\3¸¶'Zk6i&«÷ƒ·v¿od•X¼dQ—
{« ÒğQ¿_ ~¿@ı~ÅÁI!Ş4‰ŠĞÈ´Š=Xˆ¸Ó—Kwúê717p±Ob$Á‰S;ì¡^\PğúÇ;>jñõÚÅÄ‚İ™’ =AV¹%ÏY%÷0*Iš0V’öO'
Çlò~yßGŸ^~ê9¶öT;Lµógç)™)Ë{%1ei!4ƒYk¸ğ ­PT>h«
³×êû¡g­™Ç`íãW	ı¼'©t(CARªâèJ#ÕvM#òËíõuşç«åË9Lx“ş{&Ã¬]8ŒÁ;5¡Æªåñß\ˆ!8+•à°ß¦Ù<Æ“×>¢Úf!ŸzòÒM¹–I¨/
Y½Ğ‹r öŞXS2ÌVé%Ş¡@]Ib8~ÿ
ÆˆöØ2éU´o¡~Nø$Öø%>+°²Ğ]ŸZ#ê‡X#’ ¢b°+Ç‹˜ö®ÊõU’ş²KyÓ¾½Z¾–}zûñ`Úù`åˆ=öŞ§NÒÇ55.0½¶Ì}Ú–wçN©G±¥GÜRIÜ¬7_âI±ÄoR‘fç¶¤¤Q‰,¶	ÆŠ^+n“QI¨†Úé`Ü"w’Ö=´è‚-¯¯T´L@ÛèÎé;®”ûePzå
ã,D^Åš{ôÄæ˜ ·Ş„P}¶¬»ğÀ²kËèÈ˜Ò¨¥Æ¨;ã¬-£ß±Ò²Cw[ò_¶ôdšö“ îÏÄà¥ˆ,Ä=!¦MŒA«&óÓåˆº¡û7U°÷Mı‹sf1±Ï)pÄP›ÀÔa‚l,zÑl’˜Ñ`›äG|8¸LX‚…¡ùÔ
Q£ø)&kLÛ´g›tdTÀz1Æ^TCVOH$vÆ©2B¡j0®‰3Ã=»?¼%ó]Œ,ØfnFğ;
8 a3#œÖç¬,şPê¼¥'‚öøË…Wµ7² »,¿dÿ•ğÿÁxpYL[²÷ç„zé "9/«_LÍ´ïf}÷Ü2ĞdVK^¿;/Ö~^N¿¸\°–Ÿ›½¿ğÆí¹‹qFğŸXsy- Zl¬?#Á¼~Y ì„õÒı³s—tÃöO§Ù@çbs—+ïœZ¤¥Ú¬¿„r}©¦²ª‡£g¬a÷Jo&â¶Kš´ë—`ğhnvF´‡“QN–Ó¢ß2%N²À=“\»›“÷ì/ìÜ3;Ä=3je™É<µÂL^	2«Â_³ãøkv£Èw_VlÕ÷%Í`Zq·/hV1%wÑ¶
–xß‚¤~¦ÂLôRĞó8I†jÑÒ^£:s{¤è/'kT%P é•ï¿Ÿ¹4\ç/šãâ{ïÒÏ¤/H}¸\¦/úk@îî²ï.ú™ÇşÀc~HÑ:e°4‡ G ½'ıƒ=é»g15G‚®˜ØG ú,q'X°¾ãN ò5²H2oÑzÍ­Z/ päCßX°‰$KøÀÌ–ä#i€÷\ab\*k¸\Ø1ü4£-1ıá›JÅkV#ÿ¥ZÏdi/ÍãôÑ"HßànŞªŒ›Û•qóĞQlé_Ó»…Ö»“Gº´Ì•Ä–—Úd3ˆ}DÒ²phÑsO3%†rµÉŞ†å¨Ÿ9H÷öH®
óöµ,# sV=”èÖë §U­ƒ
|Úşhyÿìíê*ÌÛU=Bö	ùİ¦I#¨è2`í/#ÄĞ±‡ê~g¤Òr}ùò¼şùâ…õpæ[¨ª›%Zè®OèwSh"æİõ¹Š‚ûCúï³Îyèîâ–u+„„Ô€‡DŠäĞ6ÕÈ
ĞdEtmd„³naÇ}&U‰Øñ\\‰˜[¯DìëÙ[‘-éî.¹ãèAÜ\¾ó>¯øHláÏw…ı	àM\(Ğë¯¹tõIHÈïé|€š>ˆš>@MU!şú #'s5C‚6(Õ2šÓ­ïï¡
hæ§WîÖºkïâı˜·„I÷Ø…%?§Ø¬–-Ïı@Q …duÂîÈ{Ø®ìÀï•Øÿ GR«Äb©}÷}ÿçˆHVÍ¥šğÁÕÜ5Õìá¶Ğx5ßÆ²¨oØq
ó]8 tù“‹¹;èÉ–Mİ­Üô®•oÛV.PbCÈóÃgsd€^á¯/øw¯tGáô‹´Ê… VœwïÏ;´ËNé‘»˜y/`Å[‹éwÓ/ÑÃä,–ç‚·mÀµ¼¥Æ ­%ØN‚©ì	êSÚË­¡¡½^Ğ‰y½¹ØQüaJ[Ûú;
úˆ)ë£¤3µ$ìÌi²ûò¥.ç\Œ_„øãîmJ«HçõĞöŸ²‰¢!â¹Œä¿ƒN¦ƒ‰‘K¥	3sòİ+¦Œü7
ï†çjúoÒğ‰=c—Í”"3…6n+Ş;ºØ¦ µ&;cb8Ë:mbø¥Ô_È·¬ˆÄbLğb9^Hø5VT³zÕºñ”È ì¼AÙÍ/H½¾J‹êÓ
†L—¾ÛËGĞ‰|w•¡/vœ9AÆzi÷¹±GŞòe­Çò°Ã\—«,¸f,º"Æ&¤hA	ÿA¤9ÄG˜6OğúŒ÷†E­(SĞ¬´ŠkX“º™Œgæ<%¸L	@fÌÌ‚ÏXIÊàLAWvB©LC®Zˆ~ÕÍ Èº-§ß™sDàXº¥ÊEwÆm«HµhßaÈ¦­:¿»ºqëÀù«öêÚäÁ~	6Ñ.·>üY^nğÏzrÛ/§Ï‡Ü$(¦ =QQÒD¥µ‹èœÄ>íò3È¾i¬mÕôj8 ¯Ùv‹$À?ã{ğkÏØ¿&AO¸ÎJ?œ(^±„uÔŞså›(s fI*ËÃİõ¦¹ğ¼J×)®o\İæxëŸ/èó/™,ó‡*78Ùæª¸±5é´›U/^ØmñS\%ÔõQ2®¨z½‰Xğº1¥Î‘•cˆ•bQ:p£Cm:­šfîñ
ç>`¤êŸ/T•Î¬ÔLdÔ]Gˆ&`§¹Ñ¦ã_9/¤Ç½–Äğé#qrå®	))Pf¡ÙÌEÏ7¸a¬)ráË×°¤GùÒ'¹§?â¶e\x>6f7¿wø½Ãï=A–¢]O¶å–×'_ìø„OšŸãÂ²Šï˜BZ» o„&ZH/º]Áı:×«G—2¬ÅƒõåfU¹RK~ ‚úÍ#0ú¯¶i&Ì~-´N-:{T™œ9¤¡ E`ˆÒ–äçŞ¸ZOÀğ¨3ÅXèZÜıºõ7ÙU ä;z®f
Å‰ ^fÀ$Dò3Ú4ê»W;Ú ¶7æt|•¾¯JÁãµxñô§¤yiMÜºzÕVÎàœæD,6w×¨øÉ· ¸~¨Ú‹®!ãw!+òzõ’ÿHİy3¹æsXâ 4³G~™ö/şjvÿÌ¯~ánÁÖ
0¢şLşÈÈT„aµï7+ö7§nÊ×qy1¤7À–¬¾/ÂWÙåè©vÁ1@£±±ï*·ûZ"¤È‘¶“Ããç€SkF¥Kr§Ü‘'ˆÆ¿‹—~©YHêq ‹D$,»4(f8¶Ó£³Ô‰(4h¡Qø¿f\GPÕÓ›Mº¾ı%÷ÿ©¤Yñ(\`?Ã—ëbé5ÒÃ0¥ë;‘²*”%ÿò¥Š½K£ÅÕí;Ó×Ÿº\È¿n‰—¤J»æF ]¹!~xıêGÍ\Oé|–1h ô!àET±ıı%9Øëc’]w&rš!èLÆøAÕïñß•i]­°ÿ„›RUHdWÖñ•Ä”3.øü}o€7'>*ô¢ëÛÛëBNÈCÌ´ü,FN‰ßR:Î\¤ƒ¯°±AfRo¯ôfSşñ¼şôOèOÿÈşôïO¿¥?³ôög«4e1 š
æ…İ}Çl ÙÕñ»¡ot™ÜêÜ£¾Ñ&Ì]Çï0ŞÂZ¬—ÊI[-­ãc¨×º!ë íß+CÅe$yŒ,­ f+¨­2**SCª·ûñïÜŸ“ŞøçÚ³h
¡„ÕëşX8MàûuŠçiãúK=IÃP%¤ºìVÃˆ«õû«Õí®ò¦èKê=©èUX®sØ1xä=Á?x¤ïë#;JÍ:™rª{üşE}ób¬t¡$Wøªá¬Hƒ„UW°€	!ŞğÃ*®İªÓÕ(“ß•@ÀÆ`İ[ÙA=·/¥ãOšÊ
zşâˆì„§¾^	Ìj«Øê"z“ÄHP‹5O©DÂi'|ïVár™&8“ìzîZ¾0:£-‰àq£ÁTº ;M¨èrVı•‡œ1´ƒù›Äµ%gÀÌ•j]ÈÙAò¨Û 
b%†(ƒÆHzÆÈ’°;Õ ‚¬
lidå%'ìÈ ©¬Ô†ği¨./„íÆˆ3ºTËOaB•±¡æTÂ»¯®ïzÈ!Wúô¬y‚Î3Ş7<‡{Ö¨µzR3´Eîh-ÖÖB$Í~*,—ÿŞ«İÀ%Œ×Ûñ>kfô%ßjy‡Ü¬GèU•±×p½^µ+öÕªq]KÖî`U×NjåÃG’	MÇ\f˜q©1Ë¯!¯›øøRé„¨[Zß®`aÏü!ò×+œ1óøH`ÓãIä%Rsí2†\F^Jgı¡¬oñ²Â°±¶Î.d¢6aPŞ#*È	«®3QÚŒ¨1„ğ}ùÑ‹p.#®ª|‰ömn]HäüZçB Ü„Zº|ş	Ò,&9¢)ò¬eÕ¤Å:5 ±é$Íµ}ø¾´šŸ¸Õfyè–•O±ºÓÎäGO¼°âYO?OØ<âÔx
ÉX¼IÆ@½ÊÔó¡£¬ZTßîÆQc7$S’Õc	x´Îâğ\ FPZ¤nÆF£ê	Uª¹‡”ŒFÕô%ı¦oorœÏŒÉQ5S)qxZôY-8M}µc,®îW¢GªS+“¯M†AĞÑ^Ïç³˜5¦ÔOHX‚JàjÓ¦´ï*©HY[.¿ Àå=K'ã¨L˜#Ğ¾ıKû_?0T¯"ÒóĞ«yï‡¨ÎŠ˜í¼ö~XÿÆ¤åG>üÓUŸ–ØĞ/
ûE¡şTÎ/ÖC½hX€©…æÍfÆaÅC Â`)iŠ\€vb1oYğg7äşÒØ…+©ài¹y·˜³Ş£Ó±ÊEÕ‹µŒ„)T÷tºD4ö4nOLŒ#é–"¬›!·ò]ËBıoûÙ…{ dÀYıĞó°»ğJ»–ËúUy+x•Õáxx2X1Mè@>Ø¯dujÇªö}+ZÌºª6Ø;YUõ9·Ç¤>BRASd2 <	mìŒÿşEY€D]#ˆW”ÊÙ4·?€qšåµ8±VE„ak€Ç˜FD„a]€Ç´›°*QH"0©D1Ó§#}ÃjŸUhò‚\J›>™¦å‚qdù$0%¶­sş#Û$çÊj o«GïYíÌÄå¼Ê‘%eÉ¼ ³°/xQÔ¯Ï!kÇ#İ’gşH¬¬î„Q-˜ôÅŞN€
dyyù²Ãóekb"mÙS¥u²-Çíî·[wœ4£'X„ŞCÔ©÷ŠïÓx¡j+y‹´fr àÍÈzÖıîVğF`¡'µâ ×LhˆÕ»¡¸P$¿&‰!ú£ÍÙ÷ AuùGÏ™7y óÁıÄşİÑş
+Û53½•taâáöXÛúU…­»$!åùÒó yãZN¥]Æ‡ÍÜ³Èƒ~³h—Êò63ï«
„û-£¨ŒŒÍ±/ÚƒŠÄÄ—eÎçAˆ°şÉÖ?-Ë‚º ı‚¥_t!²§Æ`ïÚ„¿ /¡´„ÂGY	SêÓ š¢?3S¥<{®A’©ò…'±5!™o6Sõ3`(âXödiy¢Gbu•Øğ7§7üÇ¢ášwXL*n[Ø<Ãj)Ğ<3 |võ/°sÀ/„}O9h°LsÄË,á‹_áÆa™A<3(èáÚPÊƒå¿üMèˆĞ¥™0f&•°hE¹”ŞZä/Ñ‚?"a¿O³p“ßşFj‹[µ=S“¢é¢…©ø¨á(ğKX´W¦|å%Ç‹b!6‹™²NnµÛV†EJVÚĞrkp–0ìŒ”B|éòhÒ7WŒZwÏKÛ´àıøqÌŒá5m’µÖäwYN[cš¤’[kQÂ´cg,ˆ5—	ûÉğ*øÕ]Üà›IRHÂf»ÅÏ‚äÒµÖœ,<RÒÏ… ø’ÈÓ°â`¶À?\ÊÍµ
ÓÏ|`‰˜œà†ààÚ¦ÑtæÊ¯Ö>§°ŠÂğ5)¬£†Y¹’¨ôÄ#
n· Lä^7·|jî²¡Ê lÑáôÆä
fPàÇB­i˜¼¼ŒåàëXàXİ¶º§üOĞ{ßD>EÔÖ¢ííeá[Â‚cÄ¦ºG‚y>ş

êÚ~“[/İPËŠ‡õ¾i]ï­1A;pÌ(Ñ…ÂHn	ì¼dÓÉK:cƒ‡ğ¡}ùòÔjCr²}
–¤s…Îs¶§1œÌ¯ï~Yò%
wAr% Lä
aÛQSÁi¨`Tûçƒ¸­RôS‘&]ÿ®]ÔÎó(9?İRàÀÖ
xáŠçPMmL£6*&51R’™˜‰›¨*Kœo(vøÆºßŒ‹>½ŸÃ
—"ÄGu9²tç
B™­ÆƒX‚áòeMˆÖË–pfŒ
]@Cô66÷ˆ3åò)ê«+™Ñ…]ÅÓKKÒFê:ô²!lC‘wKiÿ5P¼SbªĞfè\I½•eÌ€ÕÒjñó<…¡]ıw†.Ñj»SMIf.®•rpiEKÒw»(Î?LPÎQ5µ’ñ?ÄÍ‘­råàfã»šzã3S·U1ÓA`OçÑ§véræåô3ñ: á»>&KÎ÷rÈúº%¢‰ƒ½-‘;Î“U îì…Á­¾:íú)ëÃù
i] ä?¶@HL
±Lh6u»iË˜»°ÍG²¡î0é7µ71ìLSØË}½’”Ğuãz¥Òÿş¥
}acY#é([¬ÇªDÄr‘õ­Ï‡Æâªİ¨TƒíXúç_™<Qf“0ÉLiL×1GJ»ô¨?¤>gºsGÔhG"æU­ao4sOŞ®“šå×
¸*ºù:|úói0„é¤À	–Î%4(‚eXÈQ!°Ä«„ú¾=4g&y¸®Œÿ2!F*Óå	–W¹~ÃŸŠ;.OıZÒ#â·6ù²«!¦ä¥°¯ú±^/Ì}$²sŠê|’«c2çP¹
Å§´U8Ÿr¾4Ÿ2¡­+W4ñ£ñ†c1\üÅœÑ£à]q}åÀœšZqszdo¬ŞÑßÜ»gJtÄ$‚k ˆ¤OâƒmœÓ
6w A£Ã"Maâ¶²˜^å®Æã^ıÄ„eZØ8†ï[Ø2Yùzy#Om fõA~bÖÚì,Ùô©¥bÅSTpójd+°)”²"ººYñÁ¯Ôôf˜0æ«íÁEç6úˆ .Ûğè8`%È†æõ×13Š0í¸öëkˆF¿s‘Sñ–	ßvâ>t¡ÅšÕòˆi¢QÇÏ@Cı­Ëãø?=–çbÚ
dÙÒ*íÄGÇg‡´jÇ£gØ J„´Jƒ|sXöÈDûîcç˜˜§Î#d;O~ã¿±œ§ÍIqÚyRŒ‡ÁKv¸»<úp—C×a­õR~oª’&BPŞ xk€À¯şyØª?b£ş(Ú$©Øß‚ëWá4ÌŞHÌÂøè‹7EÙãÎhnj<ÄaK9:\¥¡œômõ-R*!·a¼H“ïDm"ğ7¢T~<XÕˆZúÖr‡ƒ¥h5Bcö¸w}L¸ºçqı{RqÊ+P‚°%àOJ¯ë‹é½ òí(Ô;óÎSJ† ¥ÈûİŸîØİÜ^s
Ì“‹`ş]ıjíá×o	áÌã:O_æ×3·÷—rQ^ß•Ï¾C
~†m8as•¿;°çhomL'Ñ1Ds4…pJ~ m@ûÎ¢•õÍÖ›ÕÖµh,Åç?¾ZÅyUGØºhî'–(.j£é$âÒhËàhµ ğööoÚkJÔjÏè¿|Aün[ïIÕT/Ù>«ç÷$±õnk.ø]ø»=áO”¥»5C2§MÂ%1Oô yğÊ&íJó¶Ê¼ÄÊ\oî÷öæ£o´û¾v Xç$G
ÌrÛJò^ånh-Ì»¼tdà‘–AüêÊxì}A½Ù4÷Ó ï§•=ûX¯j1nÀ·ŸÄèïdTa»#^†€Œ&ñËz:ğf£È@"¢hY[o¢ ˜%F1É¤¹9MléÒ÷±¥ğîz²|ñÿ,<Õüöà2ïC•Ğ­ËJâÆ}Ôúd Éğ}¤/ÈÀÒNmõ,‹Jm~yV~¦Qc£BŠ›ÆŒø‚¸“öÿ®½ƒzùÇ4†k7Ã±dÕË‘ÈMT-mWtMÊSi»”Rq/ıØ­¿±ƒÎ··è£<$» ½íìá« jœ¶
ÀÅRÙ¶
N[%,‚òøEP˜Õ~™àJ›a¶õsÃxÖ^xŸ×wW·ñœw›ßöŠñ‘_½üKìŠ"ĞÜ*y8îÈZ’w¶‘CŞ• –/¼¤ZôÀ‡ef–ŞÇ\2»|ğBãBdegNbÓ+]E4“ïk`—WI™Ö‰.µä€‘€¦#5`ŞŞãÎÛÆ|íóáv)F6hù{)Çâ6+Rr„¡Ÿ$öXµH)]ƒtæ şÖí	%Dpµ
x ø–ÜÒx:krcsÇÀÇEñÈÀ‚9e¸™PXÌ›‹ÁfT„•àKtåtÆø3ğæ ÷}¬pö\sÄ‘†ä0°TĞ1
ãzÆ7B“~êp£3ŒX†'À3Æ¯ÊÁÖØ½íGPü¹ËÓ]²®©åU½h”eÍåÇ	0‡2Ä²ì´°˜»¹(*S9ÁÀŞS0D tCvM?ëÜ`şù÷³Ù2zÔ‡¤$„ï=2¸¼ÁxŸ
±°Ô~·)"PŠ¹.Úpo^5d_ÿhàÃì‡×ØC"y­µ\…dsè¨n@>;>;CøŞXäÃkÔS’õ%­lƒ¯4ö1œÜLÖ¼÷˜:~‰#6¹m!ç 4$2¨ID¡E&`Óƒı„‘l¡?wB2­vßŒlv‘='ß‰^Ûr~ù¢í!~µ"'FbckûÖ;ká<t_éûÚki_S†å[6®'÷QÚ—/Õ¤°	àöınàOlö]Ã>´;–Êºëc‰¬,
A|ÛUè·¶B¿ÂéØÃàÃƒ|&p)%¯¤IL)QL)ÏSB†Û¬î†S4¹ÛHYÊÂXH1Öøßæq²!¿p¥ĞV×À˜oÑ_©£Ê0$©\Æê¨Šù ù & 
‚Å)î”_hßln¤o›œ’‰=éÖ¾y&ñMøÍZL¥ÜÎ×X>%… ÊˆEîXä‹E*]æ
¿aæ}^$`¥|óv­,j0SÛƒ¹JD[-F…"jÚ8¢
#[{kÓÀÿuİ?“í£iß¦ÌåÚPp£7/¡"îoC?ßÿÇòz}…Ù¾|Áûf¸ñ ~

M»*¡Îú€¾Yºü²ÀUz‡ÏØRn±)újàU‰?Q»B³
s’TÅ3ãÜÜ„o§Ö[“òıtH¯8ûãšH«8·Z\pFa?¾‚)ï¨½lØcKÿ+{ß @UoäªøiÔ%î¤å²«óÚBŠxYhÌá
K8~y_Ï4¾>räÏ™Õ7G–}ò¬j“:ºˆ:¦ĞÁécZ ¸ã£5˜´
á­z%®5bgÕÜ^Õmèâ
È÷×:yQæIıbå gPÿ„@ûİÀ–¡è`1^H#Üî°è~W¢ñ&E„u=HÁjÏQ¶ØmØY^iÎĞÅ÷Tı¬¡YYNBNå3X5eõñ6rÃ+Ê x“ÃÎœâ¬@O_AMˆ#î Ö×K¥õ‚ß’­€å
hïŞ}öµŞdğuÜıl>´æT5Ö¼ˆªÅ›·QE´y%UµßK­MÛ®ãÓÊ‡¼œ5
dúO:B’fY
[Û¶¾<È'˜1ÃÏ1µQ=îtÒÜÊó.T!wwzÏRgR’öEÂõÃ:šÁr±6ÎòĞS…àò
x?°„Ê&xÔP+£!i¯4şÌMÔUÌœS,ÃÕ:ıY~Şºnä+é%ùl’xÿË×Ìù×§Z½^¼ÎÿÂê5PğàĞz>bï…ìÅæ‹i×²$S5§»}êó.1ïß;5øŒõ^N³HÓ~8æòêÂrö¸0â.ªˆ;H"@F%<°‹5
‰Ÿ†<b¾N‰:lûV	è-Ìk˜Ãê†6¯æŸÁXnšƒ8L»yRõ°i]¡Œ5‘ªhˆøJ¸ßpäøï¯>¶¾ÕàŞşQ©Ñâ´6h\ıÜdË®Ó«¹=Oºşİøu;2ë8œÄL÷{c½ÍÜñÁ«C`^ó72MCéK¢Z5©\
ì1‹'5oEÅçoØğúo£
NTÇ›*cŒ9ÏçÉÑ¯;ƒql¥)$¢Ê ÆqÀö)"ìõ&-DÂ'¹¦’S§Z¢’S	¨$á2o¬wH[á4ùw“ÉlR²K‰oËÊl?Õr$­Ì\’-íÑ°båº¬µÆ5I±K†!Zwî´–µ#ÚåwÄs3'Ñ4ªlü\kÃ/Ï!U% \u1~æf^K	®BİÜÑeø3ùùRŠ*åÒ lT1 os©‚xSA¦U0êç—¡,„÷‡ƒ©°„övŒhfóœâd0ëÏ*·`R‹ÃŒÁÊMÔæâ¡H?¬æÂÏõXg¶	¯'¶àu0<ÂR œâıVvwÖÜÆÍğ
î¼z×}©oôÎûÉY¢5§-ªB”.€“ß2…1Å¿ÉÌ	—òÎ»ºO"½/¬Ù™Öìº±Íd@«½=‰Îí°7õÛÈâ¤ÏüÜìu¬W¦µ}ÖÕëXíµsJ·%6ÃÕ>× 	-ÿîºDÃ À¯ÆsRäD'eXÔ/süIÎ¢1ŞÎÖW²„wŠ¨Ÿï„Õ-r¾(ÿÌWæŸ‘£cMâùë`gbìPW‚=“´Ë£8BÅÁX­nda¸ÄÆ9ÑlïÒ‰t®Ù¸_e&ïeÁ&+$Ñ1¬/¡ø1ºë½ˆí½ˆí½ˆí½ˆëãèGnr5OG{«#÷­±wìımÛÆÿù)vKD²Iù‡4­ŸŸk¶¦éš¬k–eù=fYR%9¶êú»ï 	€%Úqºî‘‡M€Ã8à óğ7Í«„åè0ÒLùØ>V	äó´ĞÓÆ)Ãî„ÉÃè%ŠOCM<Müi€ÖŒÄ&Â&pÁ!lvgR>ätªwMEûE˜&·ŠÙ;êšZßİHKİH«z1 ³¢UgZü=à·6=|¶|^=ÜMÑ¶&ÌÜY$äHCZğYš¥
²‡<gÀ´K„;Æz“q‘arz“^÷rn{4mfÃ°yíë§fË€úÉ3:^¢µ3–lõÊXYL)V›]e˜
‰VB8*	Q²à"é—Ù
PÌZ€ÖkÜ)²[íÆÍR×k[Z·'Uó_Ùh€f¡ñp¸OJKğ§O·÷Œ`«	¹6;ÌPc«1·Ñß>ÈğÀ^gÆçR£á!Åçlt»Cúô7³ü¦íß_~éKk,ó[Ş—¦ŠUV©¢­ Õ/İ|”†ŠUIÔÂËÑaõé„8{2ôîAf¾/ÓpV±åÊ-ğ€¦c~Œ–ã(Mw·ŠéäÓßìFYİZ€©Ü`Ošk›L&84îqg†3Ü?ä3”¬Ğë1Š¥6êrËrxïI2µ›ª¢`0sA‚MS™Ş0SeS™°‹’¡2Öä ŞÌQ£ÿaÎwü¦!·l†•Hd:şš
=¨oáï;]X,İ€ù
\øü»„Ü%æÔª™Çy˜²ìÔ€¿…Äo %­Öï;+ºÎDÚàc?¬í²8Ûê0*ÂÚ Ì¶lĞ‘
GãÍ²5ä¤eµ¾k.?W`jµN>´wı]|ËCsÁ µÑ K€,IßèûàNeówYèí
¯]&a„šÛ’ÅìvÙÜŞ•zÕs‚Üé“t$š’ó/_Ú¦ËİĞg½®$6oâÊXó&nÙ’M,¹e'ã»¸2vµo°bw”7ÌInÂŠjáÒ™OWi.h;Ü”6[Œmë˜Êéä†®#ıF&/ë7<{ıòª˜¼Ú_fò²î9{µK³GY÷Tæ®ƒšJQQ5O]íê©«vIë¦®ÖoêòZŞãÌSÖoj¢úß›§Ê³_c>p%ùĞéÅzäùåÿÓË^–Êô²¬=½ˆ©(.O/(©­òìBâÏ_J2´ı@é_œûÚ»il>¼²Äj?pxté®Êp”%¹p/ïJHé¾Â¾²^¼séŞ~qùnıOøåÊ›,Ö*IŞ2÷™w	ÿÆÂ‡Šø:Şú¿ˆÿ/ñ­ºŞú,_>0÷+(Îºhí´-ÑzÉú%X­/$YÛ_F²–7àÊ{•åİ7Ã;ÈUüü¦)·&ò‡ß°‹&.ŸuÊØ©^ªø¯4%Z³+²Bì6£ns­ö^ÌŸ“ŒO¦-ï04”ÜöºuĞ§¿N¦œ––§RC¥7O\’'Ú–|
&@	Áø6ü@wø¿ãcï9ùØlèıÛú0~xFŞ…V\ëû0ANª·9ì±›Ò‹¨ÄÇ›ËBRu*,€ÕûöEçš…{Aà–¥â¸Èp²½JÜ·_{çˆ	ÓÅ£ .è3èü&=©aHÜn©PéD¬YŸ‰ÙkQ¯Ço'SõITš$gè&ít<	Š—†é eO½–egãÄ&ÙĞüì»é0‰k•[Ït˜Îï\Qİƒ2´,“3QlÄU4°22ˆ.ª^˜€BŒLØ§t]ª›ßHŠ1Œ]CÔ~Æı
<è‘˜„@Q{N$ÀM…Øu*Ur#Ã ¿hŠÜoÊH´)#bº-]k§¹âJbÔMX®Öá°\9u>Ã}A6rŞL#†Õ
ŞÆ{W¸VZôÏX†ğŠÉ×ïš_²?ÇìPÙŸ«)–ìPœŠ±;I$;a“ZÔİ
'¼¤01Ë‡‡ÂL.éâÜ–„
W	ù¬CWúvÓş…]KÖ`.)kJåŠ#Ë¼ÊÑØzsŞ=Õñú,äıWµ‰£ªÕi:Ä‚D²ƒ¹Ÿ%>ZŸ»Æ­OÊÇÆbiÌ¬î#²ªÈ£t¹wGÜ”;¢O´P%cEçi’²b­«4]EªšrÄïö®æ8³ôMı‰
~7™¶ó]:ûxÇ
`RX‘t–öRqÚŠ7šÔìOP,ÃŠözØñ½8l×£µØ:Ô·«©'Ø ƒ*s
é½ÈËâ=ùv‚ç«KÊíZt×ªkoÍ—œ®V­UR¡ë»ŒïÖbímâlÕkc­î8x€üZğ{t]ZğiÎuîtø~ àN=AK‚ıè½ÙCS_H§¦ˆ+X‹OºF?"òõ3Ä¥ÕAõá\«ßØgEot£°YT9Jn˜Š	JL¸ULQu¸³¹6!¸±€
œÖºBıJÑk _©V|cŸi¯M{ã­¯“c±õ/Chü ½ë‹^^hx«ñÆ9/šòÑÅ‚w‚VˆWYîP3X1^
óƒUS£Úğ›Z5»mÏ÷œè!Å•Ò%Ô±VØª©ùaÎVWÌóÛP±ø×¨ØÒ«²ƒ•27¤–5_4/ëæVÍ7{H„,\CŸĞáB½Êì÷!U“Ì
ö!ÍŸÁ*¥ç¥ğZœuw]÷PCÖİ÷s±¾GØgoí«¹µ†G™°2Ù¬q;÷@úAŸ»YÄqT˜ƒÃ9<¥Ñ4òˆc‚†¼D¨ÄNoŠØË…&hhebèMMØŒåãeòº& Ÿ;3E?K,ö;K‰¬LM·4#ã±„-ëÛì‚x¯}ÙUp¸ã›£HÒÂ{ªí°ïìñ V#;ãtØëuS3Ü÷€(ˆ……ƒô“ `ì4ôÈ=}ıAí˜İÒh¿xHÿX¿R
ççØ„i3³FHœ®Ñ•p´}$!Z,ÃÄo&÷êÓvÖ]U=‡.wí
üÂ§Û„Î~Áà¾à¤.0RÙ™±»ézJG:ÙuFñãÃ¤VÆvÌ³ºPxåõ}¨m0ÔÎ
0Dğ„™³šHá`Ä8$
×2®µŠoË\ëeèâÑU’ş-M>}¸C32’‹í^qùˆY« b¼^Ü¬NŒ¶¢˜nâ3µ›æz•0–Gaì›×½åô¶ä“o—my!íü	Z)%íKØÙÎSP+Ûñû[CÎNŒ»†Œ»u2z®!§çÖÉÚ1eíÔÊºëšè­•ÕsÍ×ÊÜ1fîÔÌ¼kÌ\‡l«¿µm,z»^Ñ;ÆÌ;õ2ï3ïÖËÜô6–›<|zÅwº6#w«h:µĞtÖ¡Ù­…fwÏ­…Çs×"ªGå­%©S¤ÎZ’¶ë!Ú^‹z'©«EzïçÙDÅj¡é¬C³[Íî:4[ç®ET Ë[KR§Iµ$m×C´½öü`r5»w¿c&Q©(:«Ql×@±½Å^
{«Q`[$tyß¦°lÈ$šb=SKH;ëì¬D€u¸NÓ‹ûVÂÆL¢5PtV£Ø®b»…Ipopïš°\¢*utÖ Ù6"±êTGÁ²W‡”½UH
iE-Sªó¼Ç*nŠé03ÅìøŠæRßãT¼ñ™(˜å,‘·
yMäbÛqßN·áê÷ãh’¢5{¶fçËÌQ0ì_½zÕ8=m¼ƒ?¯¿ö//mŸ×ˆ+5L³Û>ïåûåÄòyn6nîŸˆçùQ~|Nv¡÷¬õ` íÕxû2óéèÁÙ¹ó€ìş|Î1HEØŒ–¼•<Ğëõ]ÎŸÙğgc6ŒlX0—FC{>¬5ãÊÓ§Æ3Ø¯º_`<šl™lŒªÂ$ŞÒªWxØäñG³‰(6Â}é£.YM“[A
ZµÌ‡>‡ Në»b"³i¯ê§_ÊZ.ÙØ/mÈìÃÜÃ¤W|	¡ÄŸ÷Ø~‘Œ#¡Ğ«—‹i@Ñ¶†QüRmÃK£üRÚVõ"º2PÎô™Fnk½•»†¹ğÖÂzvê/Ùd•fçÿ~ó/šÍ­û°I=»ùãsÉ:Óï¥Ağ_>Ä†QFd´“Ç1Å{õ+ÂC
²>ùj(´ØDÂ/+VÏó¤D›à—7u¡än*))Ò©T j%vº9S×Kïr“ËVy´¹[4JñxQ½G£Ğ›{4Šà–®Õ®Û,·Ô&n‰wJºEQ¸¯Ğ%Ê­èN`Tìd»b5¾+" 7En,Çm„+Ş^zi‘_âA¯“~(N¾ëfª¤aa«Cu Q´,w³³¡gZ«?1¯3ª öWä«¯ÜÍ¯¾²I?|È©ï°Ïn8+ÕÉĞğÑ¤ßì;üDÎ7ß"Ó´˜å#rà8r¦ @È‰BÛ9ˆÄ“ø"GÔî°8Ì•hA-l8ì^Ğ>§ùYI¦¤ªÔ‘$¤[ùCÛ`Ûóófù“ÕQ®®âi£møÙñŸÃÏ]w"´s"x!ÜÙĞÊ×¼:nñôp™ÓB«thù¾Ä^-;3ªØ
2†9¯Êêyn‹:”­ô´5íÃšõîUKgÇ= ì}]‰gŞt€ÙÙğ7 IdÀiyìXu!“«\MY±Öçóº{ ¡î2Òáğb2FETH$®™*ét ­kIâøI÷"òk@ÎHÌ>–Å)”8İûRæšµciŒ¸Ï¬ c<Œå_²}yîçÖMWk+sJ—Hæ—®Zóy[ç<n=sŸe®©wSòªú
KÇºŠOÙ¼ÄÇëÔj(j2’¤ø‹U:“Tç í½‚°ê2$k/Hq½-åÍòo›#J,x^zDKº*.rM)D/ª/£(
C"9õü…È«´RÊA¾RÒú;zf'`£3Ÿ™Uµz2¥1(Á0•ªÁ ÚûGÌ®Ÿ–=yäÏpåQıÑ$BÓ
LÀ0N„U+á™SÂš
J"	Ôî?eĞµ× ¢òuWÙ¤ê¹]îVÆ;iØ_áô„*÷Cù7é]4,=20Gt
·CË””On›Ií…ƒ•¤Ê«ü›¤FŠn<Ò7Gt‚¢ó–”ôœ è·¥O ,ºh1óDÂxÿxÿN€QkÒø1İÍNÇ¸hKÄÑ¯=—@Ñ³0™ÄW—Ø(ü“³QŠ!˜”‡Ÿl'Ğ#-@Í@v4íxDçs›XvLÇŸèüŸó6«}{1™ŒÃ©!;‘Í©\EóÉ5(sB~Œ’ÁáI¢ÉÍ›M&×¡íMoø¿#şÏúmº„ıİôœ
?¿±u¹]×­H’çÓ]†ğ°ÚHeb- á³h¢KÚ
şìFI
8İ" :b[DîºÓ›àY@a‰€İŞÖÒÙ.rk@Jõ¿ˆÒ½ß ¦„>_Ú=îR¦q½Í†¤q4F ?¤@GIcÎ†=5Çµ(š¿§Æ°
ù
»Õ„GÙ‡À°«”%t””ÃŸ!¡·Ãh±ÌŸßøÊeVğ;iY'ùØAü¿ì ÿ‡}¤æ€‚ûĞ8¾˜¿ê³Î¾&şŒ.y$Ğ*rõ9êÎî.Éşo¾ ä~1šD+|8N`øJÓ_`IØãÅlµëjdµg4^ÍÕ®i_N~n_Í!nÒxá#ÿdqƒÅåH‹m¨Ñ×it1\TÇ_Î+ãLğlı²~Ø„ISÌd°ñÂ…ê5È•ş0ñO|yIûéÛÏ{À›¯†ñl2Ÿô›|Ü5aÕË.Õ‡Û¤q:œ¥Lî„Şö.i°Û¸á³¯öØŸgP„ÃøäÙ]Ã>l¼¡—ÓQÚxË…ÅÁŒ¦ÃgÅ8ÃÏ¯ß¾ú&¤2
ºætø),$í
góÅÉ`8JÌÃ˜÷Ó÷¬›Â.C’@}š¸?¾9ÉqÒéV\S/Î¹»ÓäòåzäÈş¯é8•,Ùmüùâ/S4yyÇ=Ì
:|ç¼]J
½Z‚…¦¬„'»bI°Åß§¬xG£µ¢@)Ztd£ X„%K‹Ñæ÷IÀÃ˜·DG)M’0-ÏÒO?‚\„½sÄI»JÊ 
•4|m¢D‡”(Ñ IÕ$üW
ï·~
GXE¡jØrÊÄ—üOª-tßhÌæMç¬X7Ë7×ÀXÛYº¿Ê½ÇûÜæŒÖ_{ôƒhk-1ÙmÍÇ¹«$ø\¯4äÉôl#J{]y¥Rà›´|}GÑºĞÍ>;ĞÃ-¦°·9DmVk=–ş
L»éÜ€…ˆ]JH–áÚ\>}šğg¯{|Ó™í2
¢2şO6çPŸ¦>0³¥ÉÅËçQşÉ^NKŞ»j½µ¦	VJRqÃWa¯{M_¼0ÆÀr4å”bf'àƒ‰?Ñj³›ëPlElc'ºšÁô!“0m›E5-oT5!‡ğ¶ÏW‡‘rM±´7ıÓOéXŞXL`ÖXÜà>kO;oğ$—`•™'Ñ?ÓBÓ÷½Î-‹zÍ@a­,âÎi&ğÆÄ\
‘WfYïW5ƒÌÅ9L‰V4³{PÊ)c»ÕQ~ÛãÂvî¶¬KbA¶ê+êåÜ&¥±S‘ØİWHtæ28Ldeæï«S~ ÚNˆÂ“aLÄH_Qéåc0Ô<×õ¹™M§ê4ÓähÈ§™$ÛÏ]ÓoJÀi)…µ[)#.@
ËàhÅi²
«#-
ÔÁ>CT†¾13ågşBnå“Á()%§£Ìâ2|Ë
ÚéÖºéÖ[†€“’
)¯³Äª¡ÕÒ(Ve
u“àGI¥I2vÆaÌ¬%Ì&ƒ[.ËQq‰‹)¤d×"@P”Ë(êê·Û~1ßa9_ùHW¿Õ
úFZ î°m°ÒlÂãòDKu®§÷éS-ËAX‡Ô¼P.¡$
w¬ÅÓœ<®ã@qÁ!çÍÔ!šE…ûj¶mÒÏ=o	¥øe¶ziŞ‹ M>LÈÙäßwn‹Ë¹Üé«âúx±k¥a®²Z@- ±KV[6"ô´ŠöšÙòÖ¼4’+g^œK¿XE «rÓJÜö-»¸ú¶ÉÊ%¶?_N®JöMÚ«‘J¦Pİ"ÀOAkR¸+f©Š@™R2LZ‚–Ó~dà7éâ=Æp±ñûÊD‚7?¬l-é5K ÇZ Tcº&`ËŞ€Õ¤?ÉúsÖè³±€ğâÊà®Ue%íbI±z7“›?ºÆ0ä!F¦êj!A·SÙ¼s%ÉR2èÛÂ0V…Cz‡æˆd¸[ûöS_UÒÁ4/B†»…pfò[…IîyÈ`Wú¹F}†ò.¦‹xĞ„‰ìvx˜+r<* %“«ş vªV$é]`­HÑYu,WZW%É¡º‰PY2§ƒÆá
ªÂÃĞí³Ç£!´2÷[ŞT±ÕRzZ÷È¤í5Rî¦}LÙaªUc>$•Ú±ã[{¨€pö•¡VX¬Õ¼jÚê¤‡ê²Ì˜B/VsÉÚ¬+êëè†(N‚4ô@	È´_~‘ö'¹(q‘¾0XdZC.ÊÑÅ%ÄÚ"V%*//¬õÉøjÃ<€~S£ù£â×”™í^ÂÎ¥ù¦ôïBî»»l³_«ÒgôÂøh§-Ï
@#7iîÖ©µc6m‡kµİŠİÈsetšSñ-ñk_·ÓÌ•öY¶€ï³É/³Œç®¶›/*X±¢†IÚ|â6Š‹“×NE0M>¡zğÍ¶+Àª(‘³vo_³Ë”'aoÂgOà#6£nödy¤s°ÕÍUÇ†XyÁƒn1ßÀÌß3±b|¬#Ã %‘=¢/”esl¢é”=ÉÖ1°¥*¯IV2‡¦fø€–LigC1”§ÃA¯ÆqJ)­a9êkF&LQ4-…EXğÄCs«ìïœ§°ë¥ˆ§O!Âœ£É'²IqÓE	8-§Å†²Ãi¢„ùÂ€¬¶¤X×#
â^’Æ¥2ô¡¼L“°3Stv‘Î¾›M¦à*z£Ù#)²\Š,¸j”à`¸™-§{|†ÃğÌ‡çB
mñ¨…€¸¯ÎÙ0—Pa¿¼“çÿaÓ[”ã?n&3zÍ+1o¾ïpˆÑ
Õé<}Z£Ò_¥­Ï¨5:.‹®"àå/ÒÇ)û!¾bãû¶¬ª´ƒ7îæ¶ŞB"¼Ï¨¯.Ç&~?Y#Ç‚¶vIÊúMC5Ø8ÂŠ¤t¿nF²1ñ«Ã¹(k—®à’¯ü-âø¸„Ó½\µIäsÊ°óG’àƒ—ÈqóT ŸãIs|˜é8aŸX¡Ïãfn6p|Õ°¬òK¡Sˆ>‰õ:Qç­ÎFZdZœù g¤
s}PPH¤ûÜÏwA«m·ÖnÇ®@ó‹$¢—;Cä,¸g>NeîRŞÖpfj*œõ±	/±xàƒŸ–³‰©eDJV°x†¡ÀÍû¡ÜøMv¶Zİ`£CGÁGÌ}ìè:&”[Ã(ĞÊĞÔF“	ZÓiH7…Eš©\Òë4)p	³m÷Ğˆ< Íl 5³§¾èK#^ò	·<ÀRß)Ä;·€*súà{À#ªÅ	t²ŒòâíÔ8+A
á]¦Ä8
oÙlàË‰!³:è·WIf§w$
ØºF(´¥¯F@Xn@gëùû É:dŠínnò8,4:ô—ŞÊ$e ®èò.Äƒè*ÑÀ¦­Ğ¨l”TdÏ†lŞ|è®ŠcßíÍMñÁV4;„ÏP[L±ÆJ—×0´ç.ì–[sJ“ÔÉ·I’Ã µFR“ã	qŞÏEÖÃHR[MÚr\Ö–ã¢f—4ãrÆXêqa²
Úx\©GÄ«ôˆ¸¬T€+2H²Ëp-‹Óo•zªk!~\LRøc¿Ä“"¿ğí˜³ÆâLî³¿ÛÏø–Ë-ûu äğvL/Ó;ÿ`“>GóiÀŞ.ïì|ôJtUÿÓêGàg¥Â™›Lï±nlÿ­u{e/5İ¸¨G—’ãÍÏÿ. ‹ÜÉŞ¥í
šµlTé~kpïf8ˆf[‡¯§)1/·‹üŒ*z¤l'‘ä8ÒnLĞ	NF“yZ*a›YÜ0ŠP%†ÙÙ	¸aXpõßŒjM™}1e¶""U…¶‡˜³É·¡¯¨u/|%lù\ê(›\3ú§­HxŒŠC‹êfŞ TÍ¤ª‰â¿¢<Ï—õ–Å<¯=°òÿÿÑfüÿŒqo·š	×L»ö-û}gûL9uZvã!ŠÀ„Ô_YíGV¬‚~ğ›j,h”ü][L jm¿ĞFÅh[ë×T)şíÍuOŞ²j)¦j4>S×øOkrë<¶ş!R<šR[G°¸’p'ß¿R,PÅ½NõFªqƒõ¯ìÂŞ3Ë®î6k¥Ù
àÆfgŞHé<mÃcD¤Áwk5`Å±²W“Ÿ×üÑP-îH· âôçuÀÓ§5;À²ëµm­V«ÑÅšâÎ¹fÜÔïn5kÜé­¼_Òö´+dêå2¸¡F*/¼Q°©­İz‡z\^êäGãäídAGŸAEël¦ÒâC	LDr­.édzèêIè’8„W'³]å»éø"qcˆ7ˆĞ&‰Ç76—Œ‚9óuWã&+
…×$8ÁŞå¾ºø
JâÂ¶Ç)©´¨>H 7|Ã¯ãP¹^È_Z¶Z/R}?ü àS@­°
TJê2Éu+¶•ü”,°r~r§uL¥Ôº‡?êÅ;‰Ÿ‡’ì‘)övZ\ÑiPŸà2Öó2ÿW¢2ˆ Ã*Üİm“iÉ Ñ¹‘¶ÌŒÍxRZÓM–´+~ûÒM<ÍvèœnÏÏA2¹ES6V9Î€ªÇ,gáŒy±ÓÌ3˜M.ä~u¾¡,gyò­½£9Òê8ÒÍ×…êæBÎEØÉ·AFÀ~£ƒ‹`Ì6åÎ¼hH3&PZ˜üµÙ#SÒ‡ã€W#`¤mùÀòZjŞ¬˜v€G_~(zëš€~îÿÁå6ì“Òûwv6;K’¶ş~»¹Ñıûİ/öû€s.û—gïÿñìÃÆ³­>)¼LúÌ~†l©75²€4| –|fç)à»˜ÀÉŸ†P´Gd$¶Óïš¦˜R²ZÙ$åG”z\æáM é%;M¼Õ„z9Ÿoüı=üÈ¶œ`€·3ò^GŠ€väÊ¾€TGœI¾€3Éƒ\¬r¬bYe"qº_üöcó°<ÑŸü>.İG¼Ñæ€Î__ÅA†%´¸3£\\ÆÆø˜ÇsB`@
ÂÁ{ú!È®AÅÒƒ™"É
£¼ÛçÛ3oƒıJ'ƒ3Úà#ÅenµLP?6%5ıœ’~vX±”¯2Æ·ÁC;woGÿ×*Š?“àÂH,l/y3LÜô.
Êü¬ğs­	èÇ¦” ¬A€U¤`pšÕ|A¡¾SÒ8Gt.1¾Ä9aò´ŞÌæÆOÃòøjDgß§}<]ù	•²«hÏ†Ü¼—§EMlîòËw˜V”ÁÇ0×%”çZa~ùN¦PÄ³3RsãĞ@öæ(Ñò«ñÅ¶@/é5+µæøê¯4¬­V©‘SÑ‘«aÙ“ßÉd)à¨®jÅ#XUKˆ87

{ıò’$xÍD¿¼Íiá7·a€˜İü;«®JË#˜ÉÜ­NÂ˜è-“ÒAË´tĞ21´LU…/1´,Â‚„³C~l9¼½ñ±fK«–'öûDç§ò¨€Îï)É8Dhs¤xô WtÅ	¾ÏÎWße1ãÄÍ"¼Ù€\Nòë\<×æÛù§Mò.÷•Şi¯ÈšŒ
|Á
wA$nğ;A©{ É‡rCY¿Õ–Jµ–’|¡&3µßıP.ó¹DNM–æÓy‰q»«Y?¾¹Wt“ß/vY±b»P«Á}:“˜;SËÉ[Sv®)ÖØÙ Ö_š;cŒ¥G è|’\R–İˆäÅ¥ÉëŒ5æÚv¼†Ëráä—DYdÂôD “Â0¬Æ÷>Æ$€J˜âWĞùŸš+s…¹©ãó«Ï«³8wÕÑ¡•*íiÕMFYİ”·C¼¾XS±2\Ñø€i¡%Q>uH5NŞ˜z¸8gv¨y"lÈòÌ‹#Ş”I¦ÄŒwwú/SŒl~§OŸFÙ5ZéxŞKQ¤_ l*ã(è£<5.Gp
"ÿÂGàG¸ì’Up›·ÛGû8Ÿ¤âë	ßø¡3P¸Y-OÒ4ÂÃ,§ãW$PÅ(ÔÌC’tÕlª-áZUerË¶®lPM,+E‚ÁåTØXN0»P³œ:‰xÃ<-øÄaîcŠşRûß'ZkVRÊÎ…}wÌ„KÂ(øyLÂ `ÇKé,€w/ôÛJ‚ÓoÙIk\ú&a­&íR=GŞ~Dr'PW¼ëïÇÄ‚ĞärŠ †3~‡¢|tôbóqÎyXŒœ†½EÓ!±ÙÀ9ÉaÌ,“i3?Ö·•xH›Ñí€Bïiá$Ì3%Äs7
%ªQÅ<+ ¢=|ñƒ
ñà ¦R34HuB²hS6‡£šNP¨qH+›¨«ƒ¿OºJç¸hRMÊˆıcóß5(T“k¢,.ú[‰‘íÜ9~yw:CÆè¼$Õ
êb…,èõ
ÊµÄÑ~¿ªhœ*ü|ı²¢^8~~o—obªlŠø%wx§Šf¦v`ÀNø˜ƒóäiDÓ=IC…é<
bv-„ùJl&ìZ\"Ö‰X2(m§”ÄßzIèFâI·^‚Œ 7ÿFZ9¥.V¢¶H«Å‰Y8ı\Zƒ8»‹èÀ\WIç•”j` /‘mèfPÎd–6‘ÄMÀ`ñx4ÆÚq|Z§Y¸¶AK„syîßrî§‡Üÿ[
´"–!}}µøóM*S·ã&İ
~µ;m¶X™¼E©vƒâ_øù¡W–ÚÈK¥2+°N–
Ê²A“ü1¼•×°JY‰p’Íz5vÄ‚Ä ^Fü¢	¥?ˆQ/¡ôº=-N^Et¾ÊÅp‹ëiİfœ]î@>"±bÂÅŒ,x÷:¿ÃßŞøî%ÚP(aœ$HÉÌÒİŒ&hHÓPã0î¢ÁûÌ:Ùv4¢¨J$…<Sv·nş´·$^'­oÀHmÄ~¦$Õ	µ~=JÁ 	–À‘™VÙìœÚütï,„¶ŒP¬‡Äx&‚áú·t„Æ(XYt«;g5t|}¢ò`ºµCV7E{eSpÌZ¶V1[©]-™E’rÒWò.¬Ëä­•¨ÕÊä*…UF ^¢dfE´NÄèèœğMó[šbS…Äòv&†Š×Á”	G4¼eFß´mJåUî
’+†7bãš¼0-€IW
*MïM’¾ÁS,÷Ø›	#BšË‰*Rõ˜Í?êã×~qƒ7³=TÈç[kÅ$'NÂŠÆÄÖq6¹¶ÿ2¾ Õã† ¢ñ-([v•ˆŠöŠò¬b3ÊKÌ7càOıBï‚#ºÉ:iS¸íOŞæş¦Û8NÔ¸ş·y"ü-‡GôÎ¹ÖÚÚ°ô†Ï”á¼KÓ¤±˜4æWStÑxy¶÷|¿q
1h$ğ{½h/§Ü™}ï¿í6Nxæ3Ül¼›\5b<ËE{éhÙ˜±U9X°Áİd4š )}Yd<Ipg®±„LÉdülÑ§:“Q’çCíçèÃ‚O&Ó%{€ Ñqİ½Æ&f—ãx³1X,¦skñnöYğúåÖt+½™?¥3^ğ ù¶HÇXß+dMFáÑ”Æƒ4‹!xk6:›®µ±eU9õç8m\Yekå_~QØ?ûlüïKÈ³pø#XY´0Wü‰
yö¿rNÊÖ­¯¸r~FÕœtò÷D²,²<Š¾µGËfDúXlË6‹ù(KÇAòÌ|Ó
 r¿û)ìlÛOé%çT 6ƒşt5Y Xâz¸(;0Ê|½ÃÏÇO—#¨·„1İ´yŒMl(ØŸCw\Òyû2óŞ†Şô!Ä%L_ığêÛ	
è'È'«QOz=è|ñ«\ˆE¹eåÍ MáMz#|˜c‚¶*ãM¤‰ï¾Àˆ…ÖÜ‚F8[æ³	d‚‡WĞX+øèVœ¢ò‡cöó" a­ÃÇ‡ƒYI:oşÌ™?aÛßúÙK	¾Œp§öÃÒ¿	Tdš‚ùõwéq•ÊwÆQ°€À¢°/n3Ì¶)Üİt”½='ˆx£pİFÙcBßÃpÄ=Páè%R¼ÊëY5T˜–Û!N	¯×*RH¤=r¡ÓÂabH‰™Ywvcare€¼cL­7$UáëBU¥¥ŠZIÕèÀÔjŸæcüı{×BÈ{´ÍğßğõáƒL¼@	"Š8„ÜÌSûö!¸¿}"‹I,
ÒVK&ï…°úbI`âVHÁWØ7ĞÎş>ıÄ†ßaï.[gÈÂ¿ã…GÊzÊoáíæ„NCš}	ØÁÆÒüSó‹Cå7À/‡ğW9„_!UÃŸÊ8]ÍBªòî¡‚*!÷º×ƒ÷C‹ê€B‚w!ÕÃ÷>T
Aœ¶ĞUC‡şBÊ~AıÇzHå·€£ñ› ¤Zba‘ÄŒ?~©PbŞaŒˆ†e!Œ‘Ù‰–"D9Õ´É6(¹*È¡…h1QsÍù ;›x—g™lv~lçIåÛlôgF™ÁéhÑÜvœT‡^6³E’”³l:QÒh)½/D„ª3èy–Å=ŒauÒjŞ~´Û~ïpo#îÒÖŞF3jSg#ö-ï° |ÜÖ¢š­m|E™Jüg(ûü:Óî¾ÆóD¬ÍH5¡a>Ÿbíá,\(+ìB…CšYÚúÇ¬mAÏÎñ<êØAB®üp]Ÿ¨Ãµ¶Á^£PvÆïm§+ß…D±Í)ÍÓóÑ4Lìly.î·0 ]~zÖì—ù‘…¶b<Û.	ÌG
ai˜“&£·2@¼½çşşƒ+ÂŒ¹èÒ8<kj©<^<Š+'H‹±5–»ğïC5Ó0
Syœ¤¼Ø™vÓ¦‡ïy§­>ØÛú$AWízŞLH¹rkJÉ‚@röÙÆ˜;Ö¸-ëÓûB‹õ­05#Ö`²½¢ğoÀ 
G„üvî à ÷cen9ÉO\_~Dğï7xõc˜[„eX=jëW	”ÂƒúŠú+ù<“êiRğÚLÊdLDÛ0¥.8LºŞÆOVğ©‘;/Å¡ğ!:·™KUB
5~0_B¥x³Y+E)\fÑ\]
)Z!WT|»U˜\¥BQ¥©´¤Xeïhùù3ZÄŠC¦Å¥³Ó•ÏzÅ|ŞÎº( Ú‹61²³‘ŒÓo'Ì3T
^C{–&vË öÄPè:v¡ˆH°JÊ)ûÆ,¬ÊuK¡¯‡q®ğ$~/l}Pt4î›]hTğí(ıy˜Î`GÍ6‰§Ş
~Ç%|,á£ÃLà?3qã÷!¸„ŸKØİÊqCé —a RHzŞ¨¶µ*7£“6à‹µÔ†6¯’T›Ô6TİÁ;LÑB´¦Nv"Å>àkŸ•‚|ğ¬‘µ¼ıšåü|Öø'ÖI”ZŠˆeƒc„ƒ£U¥D$€®‹é#÷>W|@VdE‘Œ?-†ÉRòlzÃ`¬²êC¢ÆÖá3e¦{+»›KSµHOSH¢iä;¡ı5Ææ‡¯%J]ûcöòH»æh Â>ü¼‚ÿ—¡Ç&´>º¡JÙ¶pÊOÛAˆ.}>nõ‚¾–ğ•Ü‚<J!Î…81.Ä8dÀÀã§·ïr/…â;ÍP7ê›Kø½t¶„õæ43Z!L6Nàµ÷8 ¯ª…ñ¢išS^[gë‚Œ „5F¬cr±ö6~"Öåğû2¼a:Å;äŠ9Pšµ—ä’{ğİ¾
z™»¥ùÇ ·òa™	SÛ‘ø¸ÃCc½Ìº7
{0yrLAØÈ‚,ÎÄâå)‘¹Â0ÆcŠ3ĞfI0ËÌˆÈ:ƒƒÏâøŠ jã²uÕ²áå:á–İ¹ÃãY6<¯ØÍÈŠ¢Ã3îOƒI"î5z =çìQÀßëü;…ä9 £.Şoâ@c:#‹ÓÆ" \ßûÎğ\ˆfñFÀ€8-™¬çcP“Q6’8Ã¨<o½ì^À­xĞ`
âëoJ2ÔÖÅFo£ÇĞ"Gm7’„/šk1¥,KHŞxğñ1#Áo¦(ää¸uˆ©ée3
¾ƒüjÛ¤&Ve¨ºñ<ÓiHAíª
uû	ôİ
¼ ÿZ1|yì‹‚^†ê]{F–J/Oã‰4¦Q”›Ÿ³‚ä›ğ9ĞaÂ$ˆ•\•SuÊ©8X Ö-„âñS[îĞfD3J6Ş¶ bÃÊÊvÔ&»ÎÔ4ÎôÙkz3OÌªËìã&û˜¹Y”ø@Y”ÛæÌª›,â¥|%nÀbO™ã-?„üòÕØjiAûÌdÃÌÄ
´5í·ï¾;ûøêå›WGoO¾şxöı÷6_oÄâôË	zL²=rQÈüòÛ¾yyúñÍÛ£·g<sf&Š2Ë˜ı@²}17>‡Ûü,F/ØˆøŠ´Ò#ó·á -¼ÌÂãI›ƒ#IØç|ø7ï¾}{ô£ úó²Åm5¼­™²şÁa\MD ÿº³òn8Ê{MË¬ç@…ú/ì•Ğ~Ò–í7N_¿jœİÄé”e³[y;±7ì¹€™„©zäğ5eáOá
¤š“ˆÂh„RŒùi¶ ?…Âú§­N0¦Ÿ†}
[ØìÔÙQ5QqMçÕ›—gæû¿'›ZNw‹ßêyÍft)Ÿğ‹AÁëffÊæéşŞâ@ñugvÀoY²€VÙ¼!Ll`6?ûÄà“1ã¨9rT<ÀùxM‹µñ‘à'[”.–‰¦=QÈüxù–óµRÜŠ½°¼ŒHÜÃr$H-)Å”å+¡ĞúÚ© ÷cuå‹1¶]®}fAÍêş£±…`âŞ9béB3%hŸ×Üg¾ø cI{Ã4éRİZj´®úÔdc"ÁÓˆ–•ñŠˆ0KQÂl¶Hæ·á`#ê/¬š²Ÿ>¡ªFCoOX
³˜c<øé½··‘´?0WÂ>âí9­c5ÈÛëoá-E6€0üåºçûè/—C8¸„®Oøèìøô9€A¾¤€ ÏÁ³îé ¾šñ¼Ü×naáİóİÓĞô£áü'ıülçr°Így~Ããx&tt9'<áñÉ)F\áõ° Ü?êŸu 86‚ğÑnç¨sá«Ùî½N0ãéÙñş>Ó$]ˆ:í¿8;rm~ì{–^Í3â]œÀLã3wö^xg ›ÌèˆQñü|×eá1®jÓ™À¸·ób÷ì”GÌ‡#¬
 ÛÇÊÂ
 ËùdŒØN¼m„,)]Ñ:	l)#Qııc©ú¸]7±zA­öÜR«ÿÿf 4åÙ÷v\7‡“]èÅ±?ßØ.)J>Ší{,É·‹?¥Öİİ½ã šfÌzê{‚Eq`<"™/^lwNN8–Ü)&³4gĞ³/öC×1`J³‚öÏOöEAsè”Œ+wö·O2	MĞ9ß¿<-Âa4ÁÚpÎüäìÔãğœ­^@‹n0M§Óá˜w¦·óB€æË¼»y/Eù{/ğ¯€¤d’ôsvñÎ^¸˜ONÃƒ8Œõ;ø`#d¶lœş£s <]•5K§³Œiûh8W0aÜ…†÷»òìû|ô"ç0l§Ï±íUF:=‚aƒ0Nï¾y0/SÜSF9=?ÇÀJc™¤×Ùàv´ÈiïÅ1f°‹é˜÷öÉéîÉî	‡õ'ØsÈS@º5ü4™-Y.‡³"â=ÛÛ‡#ú‰j@æØ;Û;?’ hj:Ë
Dì"üzœ5Íó“sÆ…£˜°†1Ñ(?˜×yìV©Óı³=Ë‡8¯?Š1xÆG*‡åm—7ôĞÑi‡Gç]ôÂ=ƒN–À%6õ6şå0ÙhÇ{'€åÃ¨uq8p¨÷¸s”Á%#î??9;ÏÀêxxş|ÿÅ="-G,Òt$P»';§g"BVşœ±Ú\æB öé6«ö˜…‘Q±9¥ü€îal~™‚ßëKuª€çµON±"SäöæBäøhwÛƒ§W3P°±‰·Ÿ»§ÇXi¥í“ãíç^¡ÊçÇ{ûggyÌg>)*ÏA0fqRJ ´9õPˆñ.'{?÷v÷w!f˜ŒÎò^x/»/P³»d“ò Â@€=ñlú;CB'qŒ&è0‚2Jÿ9‘bàôìxfJ9=ßÅÖfr9™Ñõxÿ¬í¤ˆä£]×Í H2Âv8[— hFÀ4……š*ÎÎÎö±‹s5äû¦¶ĞÑ9¤>ãpµ}`ZqAn|J—j3åU<?…*ZÓô¶éU¯Çkxt	êİ“û»ÛÀ:Ù(A}rÁÑÕ%¢==rOO!8¹qsîã?hÛe¦ÀìaK:Êæoï6úœ&É(å)qZÚÙõ€R9öİçŒ;G;{Ğxê<Û?Ş}Î@óA:âjôÍ€@‹Slw·Ózõ{R™sïh—É(m ƒ0B1"Ç®gcó«ÈÍ¨¬ØDÛ;{ûĞÊÔøFA‹Šı‚
(˜RÏO¡wÁO,ƒ¸DßŞºiƒšùJÏ§K`“Ööz KÆè sAK2Ş_N.2ÕE5—(9;1rG¬¯á%\ò
şø]xš: êA•±ç®Pd¿ aÈõVÈÓ	¥Cş¸Êx}r5ƒeÕG°G ›üüß-pbHÂNéÌşÚ"å.HäÁFŠò¦&æ~ræŒH^bõ® Gbåªä–­ı¥Ş!h‰4€Ìş| ÉçĞ ml„Vá@tŸ¤¤‡Ÿœ
¨F]N+Úáƒï³tğ…øaºIğúLœQ,Á¹]…¯÷PõÊ´`Kz£IÁ ­Ã¨¼VÇ<å²­Ã»ŒÎ>¹eÛ4­f\Æ·µÍwo ²ˆ#ïHŒ5Ä]…ĞÜlñFøSÀ/İõº6šxìkŠhhëOÍ>ì»ƒYqF­?Š@Ğg1)¤“.„}8oG°.Zxp¸³[ì‡‹,„¦{ÀÄCHÊJˆuãSÆ;ĞT„?¯áÇp‹ïDù#>qWëlœğ-ş±¼ÃF`§¿
]‹+‡Ü9%òtqlµú ©g¯±X¾k¥IâP©î‘z
:ø’T2€|®ª,şÕÛ±67
Ã¾÷W”Üq]Xº%åİ`¸Ò(°
Úçq»tÉh!}u° ıïH–ÛiÆãÜF’-ùÙ’œëgÜÿ¿µ­óÒJğéÙskò˜Ìc—WO1¿f47”&+t‘çÆc„X¦†ßÊ­À…_r‰R-ªrÊùW—Éœ 4f¡1åéõ	â¥ĞX
O¿§ª1BíT¬à$>ö2/÷æŞ$Lğú|¾Í}¨·ÂØDëÓ©°*±p¢óÕÂ	+s("İCQï\D¿åXK.áã!úu!
¿Yõığc÷Ñ [hnË…KZ"Ro"bq^øøÜüg^‰^Çã5
ŞĞ’P–r·BJfKÉm)s[ÊÄ–b–ğ¦]Â[v	oÛ%¼óÊD'ö½,[d`n€ãİt×çÒU¿æ"ƒC§~3óİçÉ›m–lˆ«+súO,i6Ä;å¦ß¥É/ğÁxëx= ı,À‹\|Ï—HyªüH^-ğ=Ó{Ä#xÓC$$Ã
gØeG‘À†o€€F‚€0„4l…•;\³ı gq•5BË ¡UÊ+‡&ì] şóÖ–_\FåŒÊ%Š{àkÑÛ	öÁ7£G¶cÔN40À“mæğä}…¿o2,åIyAÊ”)÷Ğğ^të2ŠcÑóëº|Øæ
ôCòiƒÚı6Œ{oäÊ#/ÀÄpŒ}åâ½³ÁQòÅ´[“¬qF
bcu?šØpC‡mÀª8«ÅÆ@Í¢³RÛ.]è5hÔû0®Ôèœb©”©Wš¢¼FÕ¸ûr-!FSWc±öû JF>ÙnŠ\eDd¾{n 3å9²•6³æÜµrĞ¥§’zŞÌ›—³¢y
po×œZ÷Í}ÆY_‹?E' Ëò;<Èñ–E3k•Ä|%è[“6n&Ñ2Á¹Œ/Ö$Æ^¹Ù-¶9UVLİÀ—Ìı?¯5‰…§‚åXÂÚÜq:9]“ËØn`ĞY3¹·©w²)+Qş§›š
ºX³öTÚœÙ«v[í±Zg8K ÑpzÌ]×2¿‚VcçIÿœGª=F˜ŒnH—ZéôÖÉqÂ"N––‚PnB­’´?­°DãFBKt<j)ÏQµk–<Ş®òwóŞÍ’—ÜµZ‘H3ÚşFÛeF›|h3aä!XÓa*T„\ùM/÷Gñ™XSş„¤÷pq…?ÏaA™z?j\¦Â¢‹Ôü®¾ğ'àÙÈËÔû1Pc¢âWÓô
ç†Ñƒ‘\ù9Æ¸=dÈp¥Û5§õß­#c½Œíu—û Cï#®ø2‰¨<ğ0÷z<¶iÏ†Ñè:'ÍÇHÔ~À%É¼¯tM\f¤3É¯\E·-Œº`¥q\º%Ğd®¯Øá–ĞÅ’9üXÃ0 y×3Ñ•òïTÕÖfôĞ1z¤(©w% Ò.VÑªj†
‰§øcğ{‘ä×†,À¯d|S¤\¾òQXQblJ‹T-.æëAõ âfÜY,kÄ‰ø	*yÁÍ*Ç™VóDV¼a,`ızâC4¯#&Aïº·Bå­î“p"
ÏkœĞÏáÓuîDàv›OEü;§fòÃ¦’‘˜ğ®çp§+1?d¢6%ÀÍú&Í¡ğ’^2æ+¦¾"È “g+“_#`Rá•\0†GP¢}ï4šMÓœ±$ 9§òõšj6ñfÂZg E`
ŸÄ(Ô¼_~)ü.ÍØ…­\¡¢nX›™ÉÒ3‰uhëâ—6áÁDş‚ÚšÁ:8ã¹T²YeŠd¦S,¯U§¹j$Áh‰K’-W†°]çöÍ¶ÊÒÃ58C»{'€Æ˜PçKïÏÉ÷#CÔk`6t‘ õNXjy«1ÃTØnÿàäñºğşŞ*ÍR¥İ€²[¼Üé[·
Ê("ĞÔxa´Sá¤+ìŒÙN&l9¨ÔÄÏRäG2[¶J/ÉVÓù´ãd!ôš½¹ *A°Ëà’ãvÂi¯5Şn ah6EÛÓ¶„•=íÌ˜ÆLãd'9Ë‰F‘ŠÂš,­µÓº¹Öl5eŒ‹H˜Á ğu‰tÃc‚L€}n=VÛ½ñ¶ïl¯Üp^òNÅÚ×O3Ú^4cĞ—}b»Ê @	N½¤|ÃÈ­ÃŸSÒÒ!gÃŞ$ ‚[:¹ÄüigèM>Jí%yÀúÊÜmø	Ï¾¡ÄyÛ_{5xÎà‘o
Ä)íÅaØ>š^$1„©m;³}ú>¨Fã>¼*õ&÷#áX|Şã’"°ÑÀgŸáèW ğË­-P³’7¢Æˆ¢ÆD»b×ÜâV¦ãŸgv”Ò(2Êd:Åõ!S7zàkÓQnx©ç„¸„¶H¸„„ÈúŞ®1Rî7şQ)œo*…øÆÜxa’¡ß¨
¯ÔDå¬µßçå×ôLšáÊ™+
|`Ÿø§ê5ô7q*4G4[>üS~X™„³(ƒÎ†ºÔ£ø¡4x6e@<–$0üù»9jË¢]Ş4âğdv[´É¶£d¸ÉÎ6JV&8+Ş´Zq©Jh‡<±Ş‚} í¤‘ë*çušôUäÜ ßÈ5í¦KSÿ^‡5i¾-L¬>_!?)7•¡x¢Ş—˜uøÍğ¾-®5¾+åƒ«ÿØµüÀysB%mG‡™‚’¿rÓ":Z” sU<ÄïìõŞûï¤· NÊÃÑ ğX£[€~Òï
:ƒî“·ÇƒŞË£Şp$)×òzp‰÷»Gû½Bß ´rï>é:İQo )7rpx¼×u;ÏŸ¾îíIü-Âïîõõ»QÿğÀ¢ß–ôÑñ£Ã£ÂÜaÌğèÅ‹ÃÁˆÓİ•’†½ãÎjñğhÄ5ó‘`û­#kLá·t2»0H­×Qhg¿7|Ñé2³®n·7k*±:€µ´<ï	};|ŒKİ–²Í£I&B‚è4†ë(û·öD—I…ç#ÔÀë‡Ğ‹…§¹è¬ñB—_PK    mFÆìÎèf   ‹      instruction.txteË±	€0Fá^p‡¿N‘)ÄR\ ê‰	ñ‚¹(8›…#¹‚ØØ¤}|ï¹î:DH2<˜pP–G¿O„ÑğaÄ‰^-k'eñy×íÏÌºíË:[ÊB)T-š¶ÿíÒ‚´fëI ÔPK    Æ¥GG**Uˆ
Õ  ‚     jquery.canvasjs.min.jsÜi{Ú<ò;¿‚úİMqqÂ}êæáLHBB€$›İÇàp˜ØæLòßw$Ù– én÷ìû¶H£ÑHF£‘,Å¾…ÂaºŒóNø¬Û¼Ì„ÂçÂBèHº:3Ã•¡ ›Fø0¼Håâá²b
šæ¬‹I8ç‹q$i“X(i³µ®†f8O¤Â}eªÍÔUè[,éÏ§’©jÓûfÃWÙ7áh¦k¦f®g
_""²EW25L}.™šÎ"
†Â»°?Â@Ep•#B¡.DÈ­+æ\Ÿ†§Ê2,Ò|¦€jÄIì3QÇcÕP L™áy^:ÅlR¨>M|ÙÈ×qgéx±¡¨éÜTÜ¥` Æ¶#{¨ÍuîD1&	R<YX»Ğª‚© ,r–Š2Ú‡•#Ô¦æĞ]?GxVĞ!·VR·ƒŒXŸÇ=€!\ôÂ·;A pA$b!èa‰ÿ’(ÆÆ9á˜ à&*ûšyñD,$@ÆÊt`¿‹E’ãn“–N˜Cˆ\Eü	‰†Ú|X»| *éÊl,HJ$ö×¿1¾Å8†aq1¨2"û‹ã$Ş.«(A§˜Ğ0	FHÉŒJ,[tÚÍ«@-ÎIÑKK¯`É„Ò´ùTn+’ÉÛIĞr‰“9…p}nÈÍØ·!4İªÆQd¬c®Ç
?d‹3
cA)>c‹TúêTÁr‡Ä\ë‡€<à3lçCê½*›C¾O ¢2P§-õ L´…ÒÕ"BtÀI4É‡ø:d]0U©2×V2Tÿxs ràP0³ƒÃe Ÿ€Ü‘›ä%eør¢ÚìÉÇ¹*5C±˜¬w8Á<ïŒò=Â~Ğ^DníÎ?té”ª/íhu(­\‚ÈX$"$²¹D"›³?~$²ì‘©uL]"á$Œ‘Í$qrŞ›Zpj2“´¸/Mä“?DKtOĞbQ äJ©( Pp…‚=š˜? _TŠºSMpXÄ+ë¨'óWó‰¨ÀHeßßC(ÿ!Ÿ4ÅG’¢#2[À‘şXƒq&“á( ´r”‡~‘¿KE9ea¸ÊauF^x’ŸAÊ!,[U<LĞº)2—xéı™júD3ETW™¢Ìß 9ø_‰Sø… $‹Pj\	W…eßL}ıúd¦*"XDCƒ..†ÇJß,Äg«bØÔf…Ãdş ØLe`9Nš:.5]VôÂT›*ÅåP5•Ccª¦0Ó•"’ÔÃ¡‚&Í©!pajö˜Ö&
-†1ÈP7J×hĞ’d„& ƒªÿ¥CzcÀËš4Ÿ(SóHÔäu±Cã’®€v¯‹0P—)¨ºÎ‘:*:²x†p©ïÏÓUVæ•&+¦9¬UœK˜Í”©\ªc9Òg‹ Ã~t¤¢dÕ »æC@¼ƒ&‡’	ò)ÎM †1N`‹
$«GÈ}¤õûhÃ­„Â|¤ÄQæCLi²oÙ‘­Äšb>,ĞDXEÔ"îf^ù°äÆe3\º%ùéwLU0†]Ğ¤MaÆ¿Aç«ráé™3†šn¢¤ÂSŠKØqÍ,<% J“„1¸ ˜¦Ø©2É„&œÆA‚cNkÓ)9ïDm¤¼ƒD¡4ÁJü@2"ñ¾Æ=	0>pû˜gÖó`´¢h
h<%`Ş7^,*cCÁ\ræY—¾#£“ñ,+Á¨-@„.UÃT@ÀØ ("r!Èğşş%ÁÚ$§i
Òc²X„Ñ¦08gê„~càı}©Nemy¤ ¤"2øp¨ªô…ùØäı€÷w‡ ä?"M¹ÆsLÈoÀènéÚL‹@|À–”qy.Šc ÿ(J ±`}X-#¥|qé©¥£§ÀÄiEôÀKÈbjL„ô“e–&¹${$C¬(u¬,%è£ô©(%)<IÏ_x~¢éçwW,ï‰%’ÏP]d_‰0¬Gö`O„§øó÷ï‰, ' ‡ßäs!NëÚ$U¥³YXEùÄ'á¹ Á?³ï´
êe¬`–³4/jY´—²‚LÊ EB—–Š8RÍ² @‡vÀÊWZêJ·«ßße0N6{İiÚî$qGJ¢Øà5!6@ëŒ%6™Äo
MÍKÑ`ç Ù§ÑK"ÖÏg* J¤Á5XöK„S GÉS>ŞºÔÒNNÖaÀHÉ§X¥±`ÇØµC	­ç|è%0‚b„Ñ°Õ‚<ıÛb2&+Ä¦0qÔßßƒ0˜;TÓ®ÄnQk·< ÓÄƒƒ™š£Ì0/3e€ÊO 8`
P'"/ŒŠFA<¶ÓM

ˆÛöeD&h´rƒ¼4)Z˜5Aæ%ˆu¥Ï0d‘gş&…éÏŸ.&|q˜PkP_X,âûf«È¾gİ€†fáI8ÜÄ¿Ñâ4›æğ2‚<Sazä†<¢RÒua]÷û ûú–‚e¹N»U§f#D 6‚>únãG0ÎgO£g¾×˜‹aí1B]»ÈÓğ™{C/PÎöAÖŒ¥§ÂB@t5a¡àl¨o8¤¶¬ùtÌ¾
°¶‰rØ7×Çü“ÌQ~r„›ÏG/š:0h¬Å_«,è(«G®ÅXï møL…E•Â*™ùúÏRôMmn°¤1*–5
GB®J#†ƒ5")–‹[ÿ!˜ó?Ä¦°…*b5“8ñÅ#¸¶0 û_'¥ˆ3ÿBY‹YSĞ§v‹µ™Ó'9-Zê*ŒßÕÉ lèÿ[u_|äÇwY]üh`t˜8O0í°†ì]%Œû0,Lå°!, j‚Í^ksÊ–˜ßc(?ã./eğ
…¿k{ø‰GŸíÜfØ/xÕ)nK*

’0Ğ,1µ)*ŞÒw¶¹Ì3º2eº ,;
ÛÄFqØõ—áB6†eAóL
’Ò(™üR’aÔAò`Ô"+œ	ÖK5±-yô7i>-¤4¦}í	´2^™gTQjèZ}‚×Ğ_-+<‘óú«İQu4oáN€.cAwQG(1èÊ÷¡¡úBà‘üq"jñ;ğ÷–á¸`p¼~ŸíI„Î1ÔöU§ÈˆsuóK%E¼E±{
›jŞ¢jÔÈÃ‹¾¿ÉÄ¤2.”5hV›	:Ø2‰ıMq[|²e>ôöQDR÷ <>8@ÿ‚
Á¢åoG¬ÜÚ•k`dB@Ôï×ñ A­\KsRS»³¹ƒ{5Û
¨_,6˜°õtçÈ©èñ4eæ”
IˆŒÌ‰rbıü“`ì)¡[R¦ B“`ùØÁšĞhLa cXÕÉ0…‘4ğ¿ècA•ÉìZ1WdQ-A u¨E@…9ju)ˆÊ3Òjš0íª\PÜÁìovµ¹¥Ö±K;šN]ÄU£4q7a:µ6Á¶‹2Ó¦
¥Õ¦º¤µHTP¬«iã®:#0Rä6ÎnQ£ÂRw¥¦Ã‚ĞŠ3å±f–`àßˆ™RÀ’ U¢çÖèŸU…Ğ?Ø€‚_kÇ?ì‚ i))^‘¯uøAüŠøº†gì*q™=Î;q”ë@±-òº!G˜l!:ñ£yÛ0L<œ¼GŒ‰Yx‚aV¿û©ÀLõ¸Çˆ{Ò
””å-…ğå¶Ã;Ë9#¨û.:-•8W/’Ø*Á‡p`àã(É»êJä'ú7C+ˆVEkzl¸­vÛİ=Òó‰P¸sÂ	‹²dí†Tìöí´,aŞeØ]¹>iˆÛè»	íV’­¯Jcu0%3åÏĞ%2anj€ûşÙ‹ouËiåm·h–#Ox²Ğá\ @ËmãÁ¢«ÉƒYÛëC3Ûå!=K¡ş*ÅÂL-Ãæ^o ÃKßNÄ£”‘şŠxÒ‚
§iŸä€}‡ÌÙXdNÖ|šI>ú8g°q²‹18¹ñ!ÜrÚ§ş™Ê{)ZÅç× 8Xÿíy·KƒËØ±ÖÆxe&`!ZT#Ö
Æ18t¡A.’|ô·ùLÓ”B²5õ‚-ow›	3lYøœV"¸ŸÔEYtfjv#×åS¸U8ayÄIèºÊ*ËQ	"rÿü›{®wÏaë¤{ùàªÛzœ³†t‡
sxâ,Ï`U5æ
Àİ]406Úûtæ³ßA­½?E§xü•(KS™ÎFZ››Ÿ¢¼“ÌCKSa(é–µxÂ4;¤ŠÚ¶32B
›Ö!_Ù8í_QvòÚe“Şıw•|;³Ë…1ğï+¶‚}ÓvÑ}¶tkƒ	­Â
n:rl
Úã~æß®B~…D2ü<¿µ{Ä€ğ"EŒ÷ÙÜÛoÁ
<¢¯R†´x]Úä0‘fñ628te]DªşP†“:öü“Bè¶\
òlÜ]Î%UÂ§:0RáÂV´#LğíT•4,é°üãÂ 
EWû?o«)ˆ
 şÃÄ'‘{“álÿ&ëVí]•ø[dqë]XJÖ¸VVa¥½$OÃ4ø`-íå$g-Ò
HŞ	ºŠD”:Æ…E<‡ó£@ˆP…àËˆTã5¸†¼ŞøÑXD¾:G–jºD)…&¼TÍaX•ÃÌ×h`1ıÊÀ‹jf¸&š¯.wŠÜÔ–‡×Ş
äÈN˜½+nïHÇy^f¥£ÙÜFĞÆ	ÙàÁz|ˆ£Û§‡	ØÑD¾/ô!6àû³I&Nú…~4Q”ì}¶g˜õ
ÂxTWQ ;€ßCáI6&ÆRÜš$®­Ä5I\ãÄTä?Qàá¾·è¡ƒ¶V?‚ÿÅR`Tÿ^CÈZ¯9ûùb‘0|H†‚İ}h`Ùo‘øwŞ
9Â.‘kğßÿ™aOÄX"/$ì}ˆ/dO_ƒJúÎƒ'2K'RÁuJ£g;´8…}Ûº‚übÀZÛ!e;*+¾J8îXÍŠ64ÉK64é¸Â°ú¹–¤ùLµİ'ƒ%š$jàZø€ °ˆ§&´-§„ß§{}YÈ˜¿?ØGh÷Ç^¢8mPªª›kØ° KYm2ÊæöD!…{FV‚ŠµBZ°• çÄ‘=Kc÷d?ÿ#DOèY2"
û+M|»°SF”’]q4úqÕérÒ^‹Ğ¦QTİ~^Ê­iÍÉº’Æ]¤°3VÌu+É‹'Â\3‹Ë³AXè·u±Ö\[¿«¤'¿.Wş‹Å¬—ıÌêÌEó_¡ÃFÎŞãh?Ë.•2Êî?Ã*5Ã¬x½ëBÃÆ‡-¢	õæ`
DMGÎ6lƒ8“nG$Dá×ØôïêXß¯.Bûõ…ÅàÀÍæã¢B*Ø“‹öúÌ&³½}.şMËj»§ö^«:]õkrö7(Ğ9bFæ={f™â½qdñ£İ…–íH[¨2ÌV;¥‘lJ Ã@
˜pÒIá¨‹·’eWµiÛ¢ùÃ’B»ğ†ŒäºóÁâ5m@Ğla9¶lçØå5ê]sm‹>>Á›­1SÙ?.?ÊÀKËmÁV=^˜rŠ}¨äNŒ°Ÿt¦î”Ï”`Öe•Öév[}¯p¡fü£ú^ B…WŒahUŞ²p(	¤#Ø‰Ş»ÕÓØ·)Eâ>M…öLaïoë3¢íü5„
‡Nl¡*Ëœ—kJèA*UµßwĞ@¡a±"çÕ#Û!”-4Øwô,†(7È²—ÆÑÀÀ-ƒEËÖbˆãUÎ¶!÷ ì.Ü…Ÿb$?# xö÷Ê¦ü´Xz°ÙO
‹qpDø€|h_±İ7wà/7$»w¿ğèP/Øò[7~àƒ®Êİ!øÿ¦À@«ç¼@—-oK¸Lg©
I³\?ŸCÉş£5Ò”¦8VñşœÊÆ£ğ—Eâqü»/ıà ™‹ÿà}Ğ_üOäa…“ÿ§²f0{*ÌN»‘@M@¦¼½6Rg—*ğ­²v¥YKFtÔ”ä§I|èé™[Ø“›bğå&«qäÖ*eÜRèàƒ­+¹htçÜˆöÊÉñ¥†Œi±¶èàâ¬¥\zn(äp¸&¦E0H}ÍˆNS'ó	gâñºt»Š:‚FÜys@k’ül“Ï"âŠµã«æ§Ëúi³…Õ¯6›ä@ß|ºİÂê“íD_»iÊ'ÛM±áòÅªÛ„ğâàÀ9ŠSìTßšÊ¹É³¬»P”gO¡vbÄv
Ed·¦rnòÖáÈ,é]#(Ô»‘(Y÷A¢±à¶œÇ{MõÓ±.6!‡cØÊKgçÊŒj1—Š³‡²=1s23t˜ñ0oRàâ^^ÃšC&£|ãË„æ:tBçd<Â|)l4b¤@¡4¿Î²±$éB§iTÈ<˜‡şr¹­,Áír÷^Ë^W·öZ¥Ö¡ _[ïlé=Ën˜ë::Äï,6ğ
ÈäZ›À7ƒv÷úÎF¡oz<
?ğ ”lï—s2+âj­€¿İVŸÎyºšrLaâ0æcAo+ ‡÷YÀIcà/m@ÍfT¶İœ6"\«k¡.û­˜µKêÉ
Úç™ ±íûŞ>Ù\à#Tv³P])g$Áùˆ­(À®µ '÷ĞaR‡àXú~·K…¥qqüÕÏñĞÖ¡í9‘P¤GÏl¦ú@måu®¨³°Å†ªmò_¾üìp½‹;°ZáßğCáØ~™¸sú,
Á¦M¬=¸Â—’e4:È
ªq€?pªà&ÆpŞ£„œS]J‡Âªsk*‘„ÒœuwÓZ«Ô>ÙT`ì%ÇV¡e
¼sæàØ[*è[n†ÃkzaK*§qNY!EN«dêêX¹ úöI©~<€‡†T‡‚ 'æ<‡ı¹…7ç³91—`ƒ¸™*È>ÁT g+B¶ïÇK
ª'ÃÙŞŸB2ÎQ‡jÔXu• Ü“ş±>$0«Ä1t
àj)ùvÏY4âÄ›¶ao©-ÈêPü]LZdíHf8äJG¼œxzÄoÔ˜ª¬Ø~`ï‡¼¸¿Æ¥Ÿ3)‘şogRr“B;¸D·…·)È`3”Aæà½˜İ¼‘şiŞ suvë×Ö¦ĞÜ¤çÔ	áÃ,{D…Cß¶é•>®9>JÍÖâşã0RuÔxh
]kN/¼)T90ö}ŠÊ¥:$¤;§¤VÄGÕİ„íâ"rE!ÑKzÅ,ãíYÚaÄñfÛHpvæO
ÄQàÂxw¾¸C
hŸ«&˜ùá
o–¹ît¸Íæ Ği;›¼14™Q4X÷Ë¤¦
ÒĞf¨µ6¢¯…4!(ÚÔPˆ“H*ûkeƒ¾IZ€`éVB°ôNÀÎ#ÕDƒã–Ü’ˆGÊ	È'q`iõÕUÎ`ó¾Ráã¹¬<*º†(™ Z—ØãPÈàˆ§!BÅjË†x1èÇ·ë³[¹¦¬l¥8ú€\:ÇıùˆD Çµ{˜`C´”lû”+u€À÷Ì0ÇØÑÂÎI°Ér€ÆíÅ‚5€I]5<«3œFœí– ÒÑ¸­±V—+PöDÔğf§L…¨P¹«ñ;¤j‹ O·—×Ó®6Ãs
İÀqÍ7Ô3pœ6Q6vLC¨ÇÕ…ªFÏAvìÜ4æìN¬#Ú4éšî	:ÃQ”à ´Óüü¢Ğ o¬DŸ`]Iƒì¦©Ş6‰áöß(
y’‚2F’ZÀ†SUaA‚ıNîÏdY¢•ÕUÆš×ªwíD¹†•­4u<KÙs¦-káb€ş|¶ú
>Rô_«ÁT4ÓUŞk/8ø×;à›ğ™¢#£É@GCcJ,.‹O8Üô‘¢£Ú¡VR02)‚he:»ïJtúÃ2&´TFRu	w˜øÊ´ XÆi<XÚdw9>«Ík±ù¬5—¥f£«¸MŸH	|¼ÎñŞVè¨3ü¥{	Ö‚‡÷[tti X‚eâ5İ§Éßlğş¾Å€ûx=YÜ|p._Aá
ÎcªPfG™	°FÔ`rÕj±™+cÈ*óåBpmJ¢-ÆÇW¬¥pAŒàÀ44áv€°õ­!Ã¡ïpÏ[§$©‘0œ& Ii]ùR €¶Ì×€æS„›şé‚ıŞ+ò”„ºÃ¹u]E?Ú
æ¾ÃTÁfXë"›"†(!*(?ÊŠòy²à¼ ÿ\˜ÎÈ+¢0²¤a¸Êcáuø|>UàŸñ:\šæ†š
R6ákğÚ ß+mA UEÂ`åš´8T*•a—€
@ôqD‘DÔÜ„>>€e<,.
o¼ãß˜©ìq­T
ÿQI¦³édø\=Ï§Ãä³åtâ¥d5Q©Cz¾œM%Âd«åJ­ş#“Ì$Òµğéz>Q® ^<›.Az=wœMç<íÙå%¡<¿ÏÄQşãr¹œÉ‡ÿH¦ÊõR	Êµè¤K¥J%cÓÿ‘Je2ù²‡®M6dó•"ÍÉ§3ğOäjùdàåãjšÏWóP\:ŸÊWl<Ÿ?N ^*›-åà7Oæ²a°–r¹L~3åRªxÉããxÒ¡øüæòÉã\ÜÃ]î#¦‚íÇÚæ-r<4.
a8Ë$<$&°<ª Ğ:î×)Ná+ß…à9ÛLuU>©”gM–*¡ÿ¼ºGÔÆ2³ÍÑá8Tˆ“ä7V4´¥¦‰ìo©)Yú–dÙÀÒí,şc/½~G£ì6Y&î¿Š&aV>°ìC‡èÉbÉnbÿñ/ ’x™ãûòlµÌ|8Ô)äër¬vÏÔò
(O
ß×ån;‡W"a2™Q>xWadIútÄ6³>¿ÛŒşø ~çä=Ü¦Ğå"À“#¼¤!w‰‹'îê¹Ç{Ò;ŠğæİÿPñ‰ô§‹ıdÌ&cVˆ‘ã<‡ÿgí‘ûË’ôÅPåb
³Dá}]ES´²t"6ÉÀÍn¢ê/Ù¹ï—†-Ê@Æl à2ÿñûëãÇ>?ZC»†ë6sa§”ù6 kÿá!›úÇ¦n¬N¨~éêŠˆ¾E3ÃÍ>SÆñZ4Wh<€¸gJOş–‰
úÿLvÌô¡_mÁoSÍoM?‹ã´òëóû?¡%3;Eø'¦õ_×tV¹…×£çş¡iŞ-Å´K?İŸÑVM°³Ñ_K/›?@©¬ù7âW¢›Ë\èL£©D:}œ­eÈrÒ'3ÇÉZ–CWI;°l<DXº: |6
t{5%ˆˆ‘Û¯iÎZš#×gÓjÔR¾ÛGô¯û÷Pp]×&©ù{VØÜ– ‚øµqÍ»¾Ñ'·+Åªo	.ıñŞ$?=ò3„ŸäÇûù™ƒüôá'õñn’X—ü\¼o˜yú+óüyÿúô×¯Ïß¾Æpò·4.
ş´›@æÿ
…ÿgüÜ nâ#'…§V³R+=?uª­çî; Zàcí«Ò;Ü‡?õ|¯À¸×áÔvM0`üOßK&|ƒ
vÇÄ#P~G
 ï-†›
êfÀ†Ñi*Dó´Ù}¿íVXTŞaôù/ò[úƒ=aÿ"Bÿ„ú|ìé¯‡Ñ¿È¥ÃÇçØÀ¾óĞ¸Ã›yó£“Ñö‰ÜG,—ŒÌMp”:u$N· Ô“¢Gö¼¯è¥!TÓ`ÃÂğyÅ—¶Ù‚v®3 œ”Õµe¸³æ¬ğW³¸B¶{à+Yß Wd ©t®{æ\^F—qÍ@šå ü8Õy=a xÈÁP€TÎà‡O£(SEô#pŠÌ¯qtA¢¸Q°" ûbx+¾Ì­\XOĞ’€ÈEú4·°ˆ ğ
Ô4^px3ƒr/8·Tø™s‹£àù$ŞXªğÁ	
Ièv>¦Ê¬<F1d(ì"bÀ
­EN&Oæ3Sø˜Â›pMØ°¦‹4€)ñ¦+IZ8DÜğ)…÷ şeÄúnvÅZ={˜dY›¢_lÃ£ÕèíGM±\ÊAõâ®¸´2tÀå?'’pójÒNº2Øi´ğ3šÏ†œ¹3PÌ‰~´!æ#Å4ğÒ†.Ì%`ÚıŞwàV»ç¬3j6½~ß•;ˆçæeÿ'¸nfšf"ù£|Â0gŒH ä‰Şõ%— µå$R›(¹i§_8É0şñà·«:d­¯³p^û‰‹áöY„uFVİ„j‘ÙØdà3î
z¢î``Ø¨ë2x„û"6–;ùvd¼ˆìÎJY¼ù³£t
üs(G4­Kë
¾ıÖ¼Øğ?(¡{Ç€°ÌÒáíoŞA¿ö}ù‚}‘ ¼qò%^ •.ÅÇO`$}À~´uÿc€“vm‚ôÑD"òV¯‰¬uÑ;ìKó$q3(‚¡[ÆèŸ)G°à¯ÑÔÃ€»ŠíOñ|vËû“R{~Š>ƒ¢ïOÜsôéèùı/ód<?Š
ĞMµ¨áÎËp¡ ~máûĞş¬Ã$×+ˆüÔ#-âyüÍş÷
’K ù3N`ûßxøØß¹6œ!e‘´7”XKÑi#˜>”‹ÃPÉƒ«„'Ñé·gÈ#G¥gÚ2‚ìO'1 ÕˆRl/u¦Æ|q(+v>ÿŠ“0ÍÀ™M¡i'‘ùvîÃbşÀBypàdBßY|Ğ=…ÈØı' p¶	`|¼âó·.¹Xè»HœÜ°Ì`í
M9O£á8‹«†- 8;ÜçA ûì:o³‚/;&¨/û¶mvÄ`ÔØ(tPA~hW]TYt†jMÊø› ş•ò~Âÿ>²%ƒˆÅ+– ›Pê,åf™»kÁ÷AàŸğ»6y9fz89Œ,Néêô~Ìâh>Å5|t©íá!®$†N5$~Aê /G˜P"bªùgÄñ!„tôå“ÌâçkQô˜‚ÒÄ¸s±ó	¤ôš i¢n¶êŒ3BØ•´­Ì~°Ì_–È/1Ï‘WnDöÄ’¿“ÈjğÊÃ'U h™N‘lAâßE
şÊ|u†
Šd¾ºÆâ×àX<ÕJÁÀ¦‚¡+ã?@±§Pèh¢¡ñC/ˆ~<
ÃS`·Öcü¹¬º`³öƒ…=‰¥b€Ÿ(ú>vCäÇ¶GqÜ¹A:ëïèzëêl¸ç={"8€|Ü%("ø7óhoesá÷H"ÿÏô•üù¾òt•—¢‘ÈàD) ©¨ëû)]ÑÓ×wâ°T£+æ}ïH„ë’‡÷w4êœèID¤Èl‡{l*!¬ä°"ßºlŸÁ—†‡‚u'½Eê¾T’Úó§Â‰4»‰p|D„ã#øqVz.KìûÈñ5áŞÇ
¸ 3~ƒ_	'ø‘p¥ÔÁå@ŞĞe×ÖÿÍ¦ûB{õ®|İ^Æ/NZ	ş\un‡µÛ„*%ôGª”z8°Ôã*ú-Ÿ]U:w7JiĞè—†#§—úxËÚ ²®å¸™ˆÆp†U¼}7Œß&'ò™<”&·¥›ûö¢7¹´'ãõãƒ¼&æ¦Q»ê^ÍÕ¼¡-!ÓE»sÛ.ßÕÔs]îÅÔz¢^oöW›åôQ?mtn;íØùåic¨
c7jûª|y¿j^6îk£¥8PKZ} İ''Ãq/+f½dcÜ.·WåÎÅ°SºhŒÆ÷çíŞ¼ùxQªkmVR…n/W_´ÍÉc4¦ÈÇ±ÍYûEÙ\.3‹Øõ±œÏJóÇÓÇÙä¶]êËÓŒv\íËW—³—Môr£¶ëÆ8ÛTOã/­îùæ±<_WõVº|7‰·b¥qüÒÓ]­œ*Ë^)w±®Œ£	1U½í•®KQ=[Æ•Òi{S¾Ş¼tKµëy\ª¤+Ã¨YÅÎô™¬K“E£ZïÌ¥¦9íUz•h4{6¹ª.óõ‹j7•®uõ~6u6×zf±lbƒL_Tæ¥²9¨ÄÓ÷£ã»›KIm¶Òµ³XªTßÔôöU%×|ßLà›Èvfœ¶jÉÔpRÓÊ÷Ñlâ"›=k>Ô'æâ*?Y«ã‡N*Û'æbô¢ß[,Ó©Ç‡e¯ú-A[K’šÕÏµI¢ÇÔáäJë×:F¹19?å&ã©¤7Ó™iæ¼%7ñQé~f,¢/ó•ğLô­Éİy'9¿Úœ7;ÙÇ+eU‰ËÑF®{ÿpY_o’£ÎãxvßZ”:ãÉk©«?\=ôSõR=Y%.çuµ_ÃÀ/gåö¼ÓH6–gjv¼™<LfÙU;ÿĞ‹÷ÕÆ073JËa4UŸWGí³›»—qTÈG/Z|ty{q–{î2Úu>Ûš<&êİÍº•¾ˆ=œ±Í²/ŞçÊºªÎkİÓJ+#
Eé¸œ;«ÇR}S2¹ÖÜ¿FÍXz¿Ë¦´Zb^OãUµ~;›vî›³YU&ä•i´çÉ¥T¾Ù0Î„xe”Ñà’ĞrËh_ÍcsCâÇjâÂJw›É¥™2C½ı2¿HtûéÕH4¦«å:?¸èçä‹æİYò¦mÜe6íX¥o®çQáB¸ÅÑ
xÏ¢­îær#½nF×7@­ÍÕÏdõõUIÆzİô¦3ó˜ÑšËõ¢rœK/$<š;·w×í‹L¥×hğÈY«ş9-2 Z¤¼Q¦züß§EÎï°©«õÅ£’íòió.¶JïéóYÿ¢ÒP;å‹kíº2jTcKäúk£QÕâÉÊ°¡Vò7Õ‹qGm¤z¯í²Q¾;]Ş^•neµm{QK››FÃ˜_œ}uc<è3'Gó/“åeµ¿9Û¤¦—×)}\uÇ§ëêàQ½¿®ÌÏ—gÉAåv=½©ê±Ò©tq~¥÷Få^ù%¯43:™ŸŞ¨±ãì¨™¾ïä*±î$sw;È-‡çƒ|yT;UÚérµ××d£T½´²Ëš~Q+¦±4æçb*9”Å‡uşus™é6äÉæ\ÉÚc£ü(uê£ÓqéÂH<¦z•‘b>Je¸%r.Ü\tqÜTË³²>œ(¹Iip›^6+‹™T7ª£×t%“®ÖïÚİ³ãaTÍ.Æµ¸¹-e“Ae>Læ_ÊÉ¼Ú0råÆ]åZ÷w«Ùt+=o•^n»ëÁEg•¬Énc9šú£ã›Q_Õ¢ëæıÙMEé´_W±vjp=K]
›¾ĞIVÒåÌà¬:¨ænW©Zj^:Ë]\Í*©ÒÙYiÙ½L×ÏÍãÓ›ü¢$´Jq¹+‰«×Q26(_–›¢p¬'F19}Ù/¥ÎÍå\)+ÍL~.u¢Šü0-İ'SËV"~•äEM=®<¨›ît}•[Üã4mœÅä×”™È—zi%Ñ»ìuÖ©AL2^’wÓº1|lÍ¯gĞÌ‹3x²å¶q5?}Éõàùì‹’hİßhW­óãyuv¡É«Ü´-ª÷úéYùô¡¤fª·ê«y³4gÒıEü¶Eó¸¯&Ó¬İ%ıåu.z×ï·–§}UÈLRéJ7->Ì_‡øÍTHÄ¤ÓæÕë]ly{^KJ›U5_¹I?d:ãÜù&×i\.+Õ™ørÑ*·›g%9Z3Òg÷w™ÎL–’Ëü¨zsÚÏò³u¬ùĞ\šÙãXıb“Ş:êÑñÊï°¿È.!ëÜ(4ãê~ğûæ«3ìå¾ørœèÖ›ÕÕ&“»ÍŞÖš„ĞÛ¬›f¥Ó©ï_*ÍÆtVj¤FÃZìæÌläöèaĞ©tòZçX™]\ªq­}qUë¾´…a»öš¼è$f›³Ú2ÅÒqnšÙÈÓãhfs¾ê^2‹Tëúab'f9=—ˆ6$A;]†İë†"6Û¯›ërwÑ8MõÒ›îC{òÚÑÖ«ŒBóüú¬Y?Ÿ6ó±—u]xX7Û¹ÓìTLgÉ¤j!•Wõ4uzÑ_wíãj¶Ü$.nÃV¹R]ÀåŠb,™.-òêü¶·L'zwÆ&sš›¯.¤Ç´Ğ¬Í–§fæª—º‹õÄ3ã&«K¥³ëelÔ[©e©g*Ët¿wº*_H•Ëëz­§ô¦Üê™õe­»ºëHÆõåõè¢ÔêOİ^³ÕX\ÖõÎğvÜIÖ«“üCû¬TÙÔK÷ãT;¹_ac§å²RºîÕšÓAIÚˆRw1?ë­6ƒyc«+FûXÉ:ËÛØµÖê•Ïgƒ…Ú¸xHÖÇ¯¹Q*}1œHwSQµ*ùó‡tsĞ”Vb"‘_>.åMFhtéu•»kKÚ*×Ô[795*šÒ¹^õ£bã¸ó:X‚°‡ßíÌKcùò5İ;–$Ø\ş¢‡n”–·©ŒôĞ¬&Î+ú­vª*Ãñki“í^•ıD%^½ˆÆ‡Ñ©qÕÒo*I!-¾NÆÕãÑõ©toF[Zvv7¨.:«ş¹ĞÕåôíMy¡•ŒrO¬hå”ì›9c\Š·óêÚÌê¥zU©¶ÄI^¹îÎî–§Õã×»×ÜôRlÓÉÈhİ&ÎMÄóáj2“Û«º`Ü7º›aöá%uYÙèBâz%U“7/gêéİFõ¯ÛÓæë£ª%[R=™*•åózâj–.·fæxİR³÷›V¯¼™?ÂÛ¹Rvu,M×­|÷µ‹uj^û2_^ÍÇ9].–ónšËßK§§ÂñÙ©œéVç/Õ³ùµÒz¸RÏä‹—ûÁãH‘±º\ÅFæ«ør·é¥—ÛÎtÑÈ€á>¾½›eïãñ1ÛNÛúìõ8Z»ëv_º/½Òü¢¡ÍOg"|,S5z`öeWa"l)ººÈ‹éNünZSc/ñák·m&s×ÉL^Ü,ç#7käšıôıÍC£V•2Æ±1_E3ÑDk¬MZùÛë×ìéâ~ØèH«¾Ü{¹­µÕ’y|.çÓçY!‘İôóçµ‹nj]™ä‰ÛU{‘¯TÒ³u{¸i'æ·[U":AşªÄ²[%–DµÿÒü÷©ÄÒ½\»ëÉµ«õã}=.ÜÏõöL¼¿-5«Ò¢Ù½…¿İ–±¸Åjº×nîÚ
UIvš7Z©Q®Vog±‡l67ÈççÇ×Ã^ïzt=nÍ–\‰/N;â]rW´h…Rı,S¾-ß¾¯ıRkv÷`^
N«ıU­Z1qkãzwÔ™ßL*æã£X£Ïy»r–õÎ•³á)ğBÑ³ıŞÖDNFÎòà¬ÄÚÍÂµ"œ-ˆµŞ>DQ	şñUŠ\äOêÅ‡î†eKŞ×Y¬w†¶À\w„Ğp0g0ÅwÑ€ŒÎ:«Àà²ß{LÁ:Zï3íJ,’'!ñe¹8è©»·%èÕHğŠb4x`EEø_+¥X×ı ¸ıffÑÀ5†(îá¹ûÚ*
ö{ß[/ô!ÛâL‡€Ã6<Œ„ÄWDhs{[^\{¼õQ²^ö.ª–"{¥ÀÆ²%Ã°-°3
ºÊqjmArªA6<•	\Íô[dÕiŸ¾ğû9x6°aFŒŒlyKŒöCşş{X;ÒÈÊ›D®ô(Àmr‘S\×ßDp"z+ªã½v×Õõ¾årYz·xh
·åí] ‹´Ì‘»~d“ƒvŞÊ°ùl½êº­Ş¥ñ¸æ)Ì}²iÇ;m:Ş‡·mk
»şf?³FŸŞÅ  |—m(À ùIñ´ŞºBƒ­ND—Ç0v|7â+i¬ É	=NÕãö§áÁâUdÎÕØâÜÅ…¿¹µ»<F€s#FüqzğvKùÚƒiDWoMrü2H/ÿËÇÚZ´ï£=»~>0ÖgA0N¾
ë™NvGãÈ×~V¢çÑEüx$øt¥…°•˜ÿR
›ªÎo…‚ğl#ê¹è(îEÁe†¼5v]d¿‡@eü®&ğî& ÜõÖ†ó'Ë]ãLœ?'Ç€k.ğÀOğ9š	À‚ë€zö¶ÃEÇ×ƒh{=G*x‰¢0Ô½àÏ÷eNX™ƒíãÃõ^’İL¼«áf'…şcüÄYí‚qä,uebá8±º‡«ÎSGC¸ívÇ=¼ywsæäg }2:o2BRği.ú\œ?c°ûşZ@#¶ßjû 
lWÒ®;+¹Oep]ö¸³ôŞîÒ{¿Zzowé¡]Y’{ÊOşr’ûÚ¥î÷êZ±º5‚^‹òÊ†à•Ú"ÄíÙ¿
ÊŒA~
èŒ:?‘S‘ŒöƒC¿&v8‹wlØÏ”:€€";ñ6xûÃÈhÇ×3ñÙß‘uíSlä 0&Ğ…êÜPØß	Ûhm'¨~è–º·šŞÊ{Å±2üP~_öó¥X5óbWwOÛ@@«sƒN€»~4¶p³æÊK§¨ÅüäÔaÏşŒp™)Š|bâ@ht.¦°İ³~­ñYğ>şæ}ÔùıİJ®Br=ŞUQïfâpÿsÄ>BÎÒËE·áÓd_{Ëã‘<7#¸ë$ç !8Ö>ğtœÕø‡yİ^z±¶öûDİÿ\b1˜!øî–j¿»µ
ı3¯$.q¤š‡søšçØè…0ôJšh›ípcxÈºB(<#Ï½]O2â“Á·6‡x		É8 ì'ÓÂñ"¹¤çã«mÂ†:L9ƒ´´ï•3ÿwKï•Šöµ$áyÈİş%©	øó¬0º"¿H×‡ä>ğp ºˆêvhİ‚F†Z®áš9`; €ú›@¤ÿÈã?E¦Ú/†dt÷;ß«‰Åê(Ç ÙõŒ<˜Aı9·
Ş]Xº‹Øøıfó–p ãbSt¿pX7¹®/Ù"ÈVˆ¨å"ÇØ·ßx[‹2“jÖvÎ^¨…"sóÓ4LD‰¼"OélSxk!bßzõe6 %˜‚‚}Chş›9ßºúå<3›ş
ã?œiÊ3½£õàÀo³Y“°{İƒV5¡­‹ÉÂ®cVí³ü¾,?ç ƒLyëZLW[_Ê˜Gìl"ïÁåƒxƒÁç™¡iÎ
±˜ı&º7Æp.4,†ŞûzÉñwâTÜâ ùĞYÊm´ª>>'îúÿı<f2û“G'‡ˆçkUğ©Jÿ@¡U,úòøN´ˆ¨ZøüÃÃ”[ØOÖªFªåZİAµ¸õaM›˜uÒíÑÄlÏ°u<¬Š½ÌÊnã}‚å´>°^GÖWYä@ò‡×3J°ºEãøeo•±=r"¸:+Ğ y¾ûß–5ıqóíI+„(_™Ä¤8I¡–á
óâÎbÏHÖ‰J,:VrùÖx§	vH¿5N"}!âJäğSéŒ®ƒiÛ™s£¡Ãã_¾N£Ş7ˆ#TÓO¼Ñ#ò†0ì(”œ»Ö­(¶t^IÅÈPØµ!ÉHñ#­n]/ŒV¨Å•ëm;xı²ªÍCø"´‚æ$kC€|YÚqÛ;c«ÚU½®Ã4…wì§Ùw°Ç²[şq½)º"·±¾ämuô"oÓ¬a:tlªÒ>‹µ4ô•Î#Q_K>ÕàÏŸåu=×I. ğ½ÑEäBÇWüëğƒ©0aä padŒ°ôñ7ì¬£¯¯9!âÚ9·ZÊ 1|1­ó–ÒZ›{Óïá]×{ğ®Ç…’¤lú( %@ëLVñu©­¿‚/<÷›Dh>’ùÄ‚ç†ğ3VğYÀw~5ó²•Y¤İÎC¶»s³ÖñÌ‹¶ã_b»oæ„Ã„õÂÑ·Xû>éhJ\=$À»^-3Qâ‘¢“Än–œ ¿IöNÔÓöª'‰´ûÏÛ“í'†Ÿ9«@ş'dBûé°w´ÌÄÏÅYÃ€Nš]€³ zˆ0‰Õ–ŒA°‰OìƒÃ‡î$â0E	Ahg{!ÖŒº†Å×†c‰NvuKüù¹°=©àéU«[©\8W®")Šüƒ,F6Ñ›•½1«3¿S=%²ˆŠ„ïğõ‰¸kÄçÙ"xèDPÈÌ	ªédüB«ôÅ]âû»§|†n¤*¸´9R Ù_ïJŞ7'9¥h]’JŞdVëÎ¿ªŒâ}éÍx¢ğ_{Ú<‰\€Á/›Ğãæ¤šğ¢9yñ\„bñnö×^]ı.º0ßÚtQï§
ÌŞ“ÊÛ,`´ı„VÊ?\é¯ÖH–¸0£\˜Ü¢ÖtÔ–ÿ~QÎ°N-‘SüŸeÑ§8ä’¢©ˆşólÂœAFÃ”˜˜oø•!mÏ‰yãGcmQìãSÖŒ…§>£aÀx?å£¸mrö)ì©<ßN˜¯	Î-áƒè½°­ëÂD¿Y¬Æ|Çi% ³æQOaK%…­I¡‚szc0IØ ğŸ¸‚®R
£$×ÔFÓAÏ#„&	
ÀÙ}ÓxÙ²ÂÑ­7Seì¾©Çs`Æ2v½ü³z—®e6øş–åµí0}¢‰T¾×ì°Ùå¡=‚óşşi¹f¢Ğ±!ç¾õƒûÂu4YlÇ9aÈ=4‰ß…dñ€ à†“Ïpº(Âs›6ëA³ĞNçü‹6\É#öóÃüàà·ŒnÊƒ
J.ÈŞE-¸¨5¡İUüI
iaSâ÷1æÓ¥’+ì~ÎHvVwŸçËÎ
>ì¯à©àƒSÁßÅ˜Ï—‹ºc;[\İbˆ²ˆKOVÄ¿Ó¸÷àƒƒ­®ZWv§ZŞŒ'.ÿËÂwyÉ_,pGyUá/Ô-Y~I`÷íwÊuzMÀOÏH°,Õ±”€OÉZ/_Òtèÿs¥ïï{°èË®oPß¸u\U²wç=îúàá©ÂM+Ds^yÔ$`Z¾ÂT²å}lgÂ1,‘"©·›å\ÈGÁw¸NDKÆ)[pEœ#1ÛN¶n<5¼ÄğöB¡)èÎâxÙÒ
ŠˆÏãrŞ¼öê…“ö´L‚µ³Õ
›¡ä‘\èhK¡6‚ËÁşl.xºûÅ˜»ÁğğO¨Öj-ÄØ‰Á^º*IÄ§a·ÜïiÚ¾¦XlÁ¡,RûŸTĞ¿b•ÔÑ¦Ë%v]•¦–ÏÑ¥X9ª(\Á$·‡$ôµ¡]±º®€Í8 ²ÎKŸY7±$MG—O9\‹X4ˆ\À‚@>aÑ·6ß¬%´uwÏ+ñ)èİSê¹PTà=Ó#Y–
ô	–Çµ¾Û›È~PAõ6ÖrTzÆ¢u·ĞDh¾aDú.bà-¹Nn	rã
xW*|cÃõ‰ÿv@®ş°\ù¶…- Î|˜·‘Mã¼ˆèAX/$À>¶èøqÄoÔw»²Ñ®+ßÎÄ¤SäÙ>š°Ş°Éªi"Y· Äë§]h°¤A8Øs·IªÓÙ×™®ßö·ÅÉàYÄíÌãFÂÙük¿Oå<wfàÂÎl†/ÃÏ‹"Hîl{¹AQüY~^”……3’•2^ó99¼}0®µœŞI$#T<ËP4RKÅ´œ©f?–k•½St)
Î‚ãŸÅu­ÙweiSše´­tŠ¼¯Û6EïøGYç³yİ³¢+¿ÈüLŸò¦ªvÊrçÖ•.ßBç	vÀi´U}öáÃNB¢Ï~lÅˆì¥Q[Ø­oê”³
r±¥Ai‚‹Ä2êgäs¢øwÙÙR™öIãÜŒn»Úu$ãx6ÚswÖm)’Æ6¸ÂğŞÚÌªÿÌ™L	?<kºî´²|k°n¨M ·¦½N¦FÙ=!öyÍ€‰à*Úz‚¸ß¬ÇP[ä¹ºá„B·R&T`§xŠô=ØWw˜q
æ…J'¸Äa0vÜÙÂçè(Cqæı‚.‚?ÿ;{WºÜ¨„ÿóY¥â‚häÈJRIÀX%ç¾ï»öâ.–„ìH±ıîéæ„¼ÒÆ9ªv-˜‹9»¿î™é®vĞ?êSl=rG¥ö¬ˆŠ‡®eS°É¢0a¼h@&lcÓ×‘É²Á¸	©#‘ıèÓòì¬¡‚µëeQ3ï-ò¸>*·Â×À"âq~ÈïÒ3ºlj÷Œgú5,y•(ù¼œ‚ş¶‹ëÈ'jØÎÙkPMõ€@¿/Øhk¤v€ƒ¥¥iømWŒ!´ëØ#="ˆô
iµÜÿÃ?€p–âfQÿã‚»@¬‹ÿÂK§ê Œ×
 o®şDw)XD§•ú±X›ßMò½ufÔo
İä¶´¹ÿ œMò¡g×««<äÛÙbwñ5eôz|«¿~‡gßi÷¤mJí;
A|Â{§Ìı#Ê¢»Ï xå~?_¿ô”½V²ç>G(Ií’P"Vó&ñ$bB2Ìñâ³wğ Éns†Buƒ«Èwï0“Íòèq/á½lIIA˜ËáÚ2¹
‚±Ö*N|Ô–ˆd)âJuÚşfİÍ°¡Ë“uŸAİC¹îH­·W0qyıé"´W¶^£êÜŠíNY…J°Pî¦U®¢ J´ùãˆá!¿
Ê@g’íØÙ¬_yÕŠ¾¡/ıSe8ú}'ÔaQiRØñªBÜ
À|)´L¯iÁgš'Ì¥Y¯mP•m×#^_ÎF´¨Î<¿šeŸ?\P.Î&Ğ¨œb<DõURL…õ.0Ü©NÊëıô^¿ÿi@Mì<¦ó µIRrêÔ_opÉké¡ÉÙ^jÌğ‚ª@Q}pmC ÑZ:®+Ä³:ZY%P‘â*|ê­Ät\èäA…lÉÃÆ’
úKàXW9íãoŠFš®àJÂºÌ«®ë{–¤ù; ;7|J‰QÅòöB
şMEø}Væ<9¡® Š±z8ÔJÄ
‰¡šèùŒ7B‡_…jÊ«©m¼d.tªsròÌ¥‘Y|µ”€¦ÅCü"èPdñÍ;Q¹b‘4ééX>'wHæXluÜ¢—Ö£-üdF?Ùå*6Ûï—Ü®Ù<9©	T÷¡ÆÒt/<-
5Z"í<®·$íÜ)Şf¯Nñ6ûÕû–gÜİ)ûòB›âì²Kp¢Å?ü}ñütsr¢•·JaêALˆlæq'øu¸–ĞIÀâœ—Á9ËWDífkM%ôŠ¹Ëi¬ÚØ0±ÀÊ“˜ úÖD;¡¶E4€3ªAİÀr‚xô°fôƒÂói‘jJS…t1-RÑ_bû¿FVn0¿68Ã:/VeÅŠĞO~pEˆ¢ÆUîŠ÷…p ³Å“^æËsÃAM¿F¦u_›
_³ğº¯œg NÏ™mª9¤™ccË@g5pGÜï$.R ¼‰äŒû¡‰U¦Ó“ú0„‚¢ËŞ)«MiÁ(>])ß0òy…÷jØxé“ğŞ4aD•¥wN#¬(½C`a2ğ’OÖKëÆùš²{Ìã_OæM8Â=û»{4ÿQ'Æ?tÁ·qÂEÉ	ç;8á8aœ0Ã¤:'œ«œĞYá¼†®:Sı+ìÆ	—ûäŸÂ	C°Â¹HeÊ…ä fV8¯e…0—ä|^Ã
“FVXS	½b.¿ÆªKN(§P9¡í„JXwNHy\ÂVy<N.§äq9dÉU—3®“K<.¯áqz™[x3&WEÄÏ‘iİç¦üsœÉ­€ÉeŒÉa£3Æä ”‰Îä–@_S+åL®L9““«ÖÆä””œÉ˜Çy§TCÅ>*½Å{hõ+?k¡àÂ^#æÁ?ô©Ú¡SAq´‹ÿÍwó?ºzğJd1™	5hŸN@¹{nÈ¸Ë³ˆ§à.Jä»¿OänÂÛÙ=+¸İÓmÁªº±\İ˜U÷iÕ¶\€Îà‰àøãŸ‚Œ9Òù¹Ñ‚2æ%ÊHv ŒùóÒ¾ÒQFÒ.o'5 £;Cıï€Œ¼sŸ<dë}0”q‘ˆT>£ü]jI-È€©ìdçI
ÈÈAFM%ôŠ¹°/ªê CN¡‚=Ú	•°=A†Qø\Ê*Q½¦¤¢Œ5cûk	e¬kP†^æËQCÄ¯‘iİ×¦ükd,=¤d¤&e #j™é ‰ìÊZqQ®8È«Ö2ä”Od@Sí˜¡ÁÜÌdà_1©]=ï¸“€:9ìø½÷ØXºg–
zøà½÷ÀjFU,|p&Ä92c¦b¤§¹aSú×ïoÒÜ]´©¿=(g~c&eÉ/Qä74™ÿ‘ÿ1Ü¸;By7î\íÇ0ãî¬~_n|(‘?ş»Eşø‘"¿Y#óÃY˜¡œ1'Ä0¥Ğ^S²5é1 ÕQámä«#;Ÿ)rÑä(E.2¢£ªÀB›v¢±TšnPÿ¿–¡	 Ìv«3˜@íÂ*ŒşNÎ.©âªtXÕÁ‹Éú—_5—	¾ëƒ™‰3î¥ÏĞm<ßÌı#vqÂÁ ¸8Â`š³æ¬à)A«OQ
«:ö<³<VÔÔ-ªUs4¦?ñ»/¿ÑÎjèI¤3í%LZ’`-B÷K³ÇM{ô&äS(ù`¼[„]åk4uîá#ënÊ¯"6´\z°6?«¯DÓ6·&amn/aÒ’Õ2c¥^õŒ+f³löË¨Ó’&ªŸ“t²Ipºêg»–¸¾PQùD“Ï_){^•5äûÃ£å4Z.[o,–ŠxÍîj¦úI¢ĞUÓĞóDp6<<İœa'Á¨Ã#ÜbØÂ¦çø0¢Şàé*°Š®´®›Ü¬¯?Rˆ3Në<ï
÷­á°ìwÊ²¨mM³dkM^÷,éKuvÚåã½º)¸÷µ£üõ“¿Ä²4|ÀïZd­÷èÎª”è*I¾ÇãÒn]J"¥Ûõ1¥ü³,«ğyUˆÄN6$‰g}}ƒYùj]Úñ™‘ú0e˜PZö á-€»âŒrq8]ÃUóX&c¸¸í‘âÄ|şÇÕÚÍòÄ­ïÁLïÑ
Ñë=›…|ùı7×ôsx»gCù½êÄu°ç £J3mx\~•
Ì<3°jbà³¢9bFş¡X¾V‡/!P­Ãs=/,=-ëÌ(6H»\/6?PR'·»-í¸¨ÌÍ¢WÚ©}nó°²zFqtÜf«“¡#ğxvvîsrXôW¨ôÎzµeœ	Å ®7·€QY®ASg#A={û¼R&ÌàÔ%ÎıÕu’ÜßÀ{µjNƒŒ‹ûbo
»¥¥{@u\$½ÜŠÏ°¾3@<¾‡sNŒ<4u/;•o©ëÉ‰z¸ßbë$ÿ`åÍXlƒï	Â¢2^¥øS‘Â‡îoÍ4»Íì®Ş8`Ï=¼âŠ’2C‚àërF¬}f¿TO¿Â³çùKõô+yvÆÿ
	u¥±ì*Œr_ ¦¦äfW‹›„^X99©
6…ä°ù	)•ÓzP55ºK
‰•VÁß–Ï|\ÑÕSïè
’¬é8ãÃêj†¦§ü6?‚^áÄÂ8‡h€RûUŠ)‘£?h\ãìËÿız=wïêÔ,NWèª"Hö{egÉØ%Aex=â“ÆÔìáRÔÆ]šyIµÚ®f  
¿
7kZUZ®›»ıæÓeî9µzMš#_ù•¡d³ŒpÅğÒ’SæAÃ‰_ÔóAşˆ¯üxºoºnñb{§ÓÒâwè ¼xgŞ BÚw7§Å €vÁ7ŞÊKTÖ“Š@€ä×æ-®×°å¢z Y…€‚òğ}–kltJfZvE§¦×Á¶Î YU­ú´>mâl¨æ™}àôgxÜŞéşo¹Ñ	±MR¶ìÄpq*Y`ÉèŸÆ+BJ"‡qÈà”]Èb#6îŒox<ÇÇ>n1t{F1tRXkS8Î)ÆğÙ~!a1"õCÔ»
×å@¶FëèAÓèQjÑ4v¶:;ÍŸq§T{Î²¶j206L|(—³ìƒ)€‰W<c%ù•=Å7S*,Ÿ‡•Ãß•.ï'‹Óæşg<ğiaÛ3úa0gX‰ª§4Ë‘°‡~ïó™.rŞßëa§Z/™ÆŠõë’®!³b	ßYİxùA0Å¸îİÄ‚­=m-ûÇ…îmôöe Ãx…K 1ÔT0oàzµ1º £ªºduµ±·AxÖ¿…øyZlDêÒ½Q#Ïà«!Ô,†Ìúİ_
ÁŞé©,F<g%ùäf²8|q
T‘øê¾j¬ÙîlW/-!ñ» WË×Ÿ¿Æ¡9yË‰;¢–­Å N=Q=½? ñ/RëÁ£k=`µæ0HO\Ò
,µÍ¤@kıYÍ”¶
ÃE>l×ÎxÛh/'pgµi·¶œtè
Šõ”àÍÈ™A	S5õÈ[1¡b[A®}§|ãe?\_˜pş.œ!ùğÙ+v
í8Ü’®Ç›•‡¹Nşÿ˜ëš¡²æÔ){ğÜ‘n®xD×[ø¹›1¹vG©ü~²
NÛ
Õµ‚~^'àBeŸµ’²’"I ÿC—]Qrët&¥È­+Bê[°jWÃÀƒÙ_;÷SiúÂ€½{!½v Ìã:¶oïÌÇBx¾´—Š½Ã¨8*ñğ-@3èõ4´Šê©Æxå|sf‡c•\ô}[
"Û3{6V‰E?ĞèÙŒôGz‰#²é%ôG¤„„X½?
O#|nÜe½3r½òxjÁ3k“ÏõjÃ·î ¸NZÌ6í”ï6¨ÚgÉõÔK&É"öˆ±;;<}‡4$ãÊñŞ«“áäòòİ^CR®oàBúêÊ‚0 A§2GƒšL>y•ïZ¤Cç¯fbI‡,áÆ	,ïİP†ˆêßnÈ2A¶¢F®ÑJRÅÅª
hıBµˆ+kÓ"=Å¯’N­>ÉÈrfø1nBc¡İNà”[„Ç’³¡Û×ß\mÂä‡kº»mV²ˆEÒæ$>$	(
Ï.Òâ(T
92(x…ÁWùG¨€
Í¤:ØUN°,ª|¯Èi:È¬ó7_¯Şõ@‚ñÜiZš˜M/’nZÖœõB\=A3“3;#ğ3²ShHÌÏ30ıM!í>@Plñ›‹–¸sì+ÏáO‚ºŸŠS”4º¿Eú;ª¶\eÓª-LÍ;–"şN]>¢
öAœgkjÚØ£B2üâJeİD£>üú.N'Í¿é˜Æ¸<ìw·ß¿¾^WdÌ!ö¼-v4nÍkOµ@V‘¶oBìù´&pÜšÅ®ËBL¹­
¸˜îÛª‘]—Ç~Ûö-ˆ½à±û¶?ª¯p’FÉ1åÒ¥²tÌmsêî´íJèL˜Ò" 0|±‘š²ÜB˜øÉ)ûåœò]àûûÊ)dUA–ºæµd<‚áx´÷íR8Ô[lzjìúzí+"wÏÖ5¬7@İ]ëPŠõ^9ihƒÉÈR7şFáë¬\ÎªÂ‡Ñ  ’|\ë˜@¨”@[²ÖvKÚ©uº•uDš5ÅQ…ëİß‹Ä…vPµû2U+†dÿ#ø»è; ¤8‰«[@ÔÏájiàì-6gúLÊ*××_\ÿF-sœƒ	ÉHŠÇyx<dAôˆpŸù‰«yØÁŒ–,N¢gùˆz4nË”é™(`½oc&†"ôŒ?ÓyßÖª@ÎtY–ØÙ¡œô#Ôb[–•œåç•·hK¾tïáÊ/=¹1k_ôñäÕ¹!@FsåøGG¥a™Å-zk©!Š[Y­‰·–ÕÑ¤oX}&Y@Ïú›bZ±%­H‰jÔõÁBºVî2Ãƒò9dbğrm©Ui¶Ø«´d¡¿Ÿ‡Û?`­¹<¥¿¤ègx/è”Z»;j8Şoæ–]Ÿ¤´b»@i¿¨TşóÕ:f¸¯>Sãd!t‚ÈM´¤¾i¨}{3—Ù·ş,×ã@ç8w†` ëõà¡TÍÈë©Rœ´.*9Ï×š­é&m[®'ÂÕ*¤ÔÜÊk„Ûè¿’”2¾Y’-üOBJ„Ğ¾ı:?z…q…sÓÕøí×cû¢cè7	í^|½ºúˆÛ‚X‡öà½!av&Iá.ÊWÎ{Ùá'Ô<sôA¢‚‚Û1<–”ÙNèËÏ¬3úÂÊIá¹ ÅvF?{	…úµ§f@BIOÓĞËoVákZuŠ85ÂÔHŠ¤PzVSe¶¿0Ü"*`jõ¤…²9¿Õ]dH	.„ŞFO°=ß´—°½Ø(%ğãÚLl>@øpÜÿ9ÚĞ››S&†§Úf\Uğ¾¬»½FÌòİw³¾î€y«’ùhJÿX4i¹)9¯¨§‡ßI¬½E²¡7#²x@ …ªÏà‘Ã"˜Aè†¥C¤‡çùØÌªÛAÙy@çóË+f•’Vfıè±Äúÿ"ÄrêË¸Ê„2BÚ4¹….ÿR±wµÅ*#¢¨Šà‘#Œ¡rLêX¦¢ëYclas™ıø4£¹Ü$€š-E4g¶Ş¨z¸¦}Z8ëí–Á,ˆ®+``@¯Ñ:ôYçe¼ô¯°1éş%±>ıÌ¨%"$É[*Äº¯ª¬±Y­™Ğ}Ë²Ë¸i±Øbëä("Msèy]Ì˜Ü1¡sx£&-¤A¶
°ÿ’Öu±!3«Ú³~#"–Ğ‡ü–S_ÆU&”Y˜Ğ¦ÉéĞÎôuµ5°ÎÑg 4¢Ú–4°¶HZbè´¢¹\$,PA³¥ˆ¦ÌlY$.­Ş}>-›ZœU®:Ûrz¨¼òÚS¸ïÆÈl7n·næ¤¥R7
¡8¿¾(Æ Ì×¶&™Í¤ºıçiäá§Ù¤Œ!²‰uHÀğÒ}{ã¼˜Kü¡pŒó"HsG&’]ÜZUı¥  ĞÅjªÕ^¸­6*Fl¹ôàLOsï6¬üàHßHÁ8¼!ü3œRÇ dµ£â1Ö¤UnB´íVmÈ½Òh©Ø¹†È<-<w˜šŠ¢H7¢Ï•2Úå×Á°‘á{û/‡SÊÒ«ù…	%/Ô„²R`åYàÔô%uí	oP<¸wì
²{¼)=¢4Ë=8÷}s÷úòõêz²]™¼óÆòSªÃ—”AšB™w˜üûºJ))M
Ùíd’ÊƒÌk\7r²Âıv4/~BòÌå;›ò+ì•² òÌÌÎÕë×²i˜ì¢9ŞÛPM~yı;g ¥o­á9Ş,[‹›{àÆ¹z³Hegà.sË¯°ı<Bğ…kx9]•'lû­É¨5ƒ×Ö_7³A[âr/Áêƒ¸s~>tÒòjú®*Eº.u`1(rt«3òI7© ˜öi¾„i~ØK¢ÌuVBÍTçj	ĞÚg¸áGŸç÷÷«±)ÍBà"x¬ğ‡k&(IÓ—â}!-Ìhª‚fK‚çó¥€¡ë&¯½=Êe÷§«¤mµ°ÊÅı'8G$	ïå…ßÈ—4¸8é
ıeRİ$p}Ë)N±ƒjo	dbi9P•"ìnƒò¨¿ÆÍ±5ö?ST‘üêO|ÆB© ŒÒôz…ş¤·Šj@b%¼°©Äu÷÷‘ôÆ£U}VT¨SWä²–T:Z›ÁI>S(Õ¦’‘
/[ÿ@*}¢H6ûÇgöàŒµœú3áÃìHôàáá3êd†
@nŒ½åëëÄJ4‘å”d|1İ_lŞ¹^`gx+b(ØB=ÊıƒuÇÿC‰”0Œ%ş1PâŸ$óL# 
ãhˆâ% Š|_@‘3@‘?i@±d3A
88Ş0 8–­XcZù‡ƒöä@Er‹´C¥ 5–"ÔÈ%¨‘kPc©C
çoÔ|Â‚ÆSÁİàÆ"QÁFùüÊ”¸Bk£b~zğÕfR@5½½ß‡HçéÏ–%¬âà€zª¾4xÓ™öİ7-üŞŸW0!oVEæiÿŒfg[ú0*CFeÈ›eÈ›Â–ÃaJƒq¼L6}íÍß+¿Öz}…Ì€g¤ŒAsF‹„²ÿù¥ ïÀ€1hŒ¾C0úÊÔÀµ'f€1¬ £¯Æ#Ş™µÆY	£ºæ B$¢Ÿ“è¹©âÀ¸¬úCr	0ú
`ŒeÀhÄµˆqîÆ;ã|åS\HıÄL	ÓÍá]Œq`Œë #ÔRŒ¾\8mJÅş	tÀ¸(g·:¶Ğ`âB„‰&.
L4WmŠu4İÒ“€‚‹GBÁ¥ï÷Õ-E­Ppõ{iÇ
Š-y1ÏtÔ×¨iâèäÃ ×hiÂèCK³P¡“K¯‹Fì¿ vZ¨Šš…‚œâvä´ĞÓƒII!Òt’tğĞ‚‘ü—Š‘pª|¢òç†EÉ‚ÌÙ¡Ã;‰ÌTîp.Ü°:ÀWĞõ[µëÑ²W.˜r	€à7øãwaOéÍ·_¯öĞ‚1%a9Ô)^‰¦ãJ~ë	·@fğ&Ş~Há½ºøAÛ1`E+éĞ.\D+x&zm4âa"U Şí
¼‰ü &RõàmE¿9€%ÿá»ıÑë)~!á'Lz;U)Û§Õ¥¨}ë¯ˆß_ñèE-„åğ“ë<,J˜P‚ù‚Î‡W^p…w†Ì ?ÅOÊ­!=^ä§ËúûõõÂ’™vFz«ÙÔ3Go¿M^áNß²zÇ**Ş°Q¼@~ ]0ïÔ¡Òá@î-„„{wA¥TÏ/§h$z }è}2İ£0·ö}lù´|z‘µt¡÷AÖ¡`ZkÓ¾Ã,hj5¤ç­ÖêÇçZeVÕI¿Ì{äKPµ˜¥2ØaybP®r˜7ì†ğ İ¦C9¸+ëƒùyéÈçğô½×M©•,â
¯rìªú¶h
æ%ÖÖnpz™–%U—½ŠÚ~-¼h(¿&6·Úêƒp7¹Ç‰Vf˜‘"‹Š„m™í³‹„:³ø
à›Ñ¹Le<~[u-_ØYiËÌ¾ÁDqê„¸Mø]=Úö%Ÿk æâ™bAÂfp>-—ßfx%´:è6LÊÑ`€ÿÙY±‹”*fˆÒßCaïÁ…WY¬¤AL°Œw–q»`yrRŠ•Ò²·Öİ¬«it!Íx?	2:iöí-AÎÜÙ yá¼À6ÓkòŞİ¬×.‡ÎúøBr4gÌê2Îİ…mæÈYĞ'5n
¯Ô’¶ÏÒPùdÌíLPp„¯	o¥˜é|bN)ì_’œø…?æI«ÏÂÑCö .
;eE_/<è~<“…æp‡ĞìÃf!JÍ~W©y®JÍ!JÍ3”š#¼Ş¿Ä«ûùÔä}Ó§´â“6b¡5X´bh98ö² šIo<Z•S³ÇË©Ì5·(§Âg$95ãrê¬o.3„/[›ÏÈÎÙ"*Ù•y„Ü¬ã8ƒ‹HnUÈ·X!ô¡xıĞ·– ¨=Oèñ“¹R®%ZPQdÃSÉñÛï}/	wKÃğ~}³şöz\‘‰½†}v¸÷ïPT)"wø÷£¨hO¥€§0È86Rì@(Ü©@(zœó€9Ì‘[?nYİäe¸†Ãœì9Y¹©sJu&+iÉ0N*cƒ‚å´FïÕ·Ş~g4yç•`¯a%š ØW¿GâQNx•10äï@@şşÊ¦(èŠ€ö @ş~ (>U€æu@Né¤e­Qøã1‰@Ç’‰›3”sËf‹[v)·qC 
cücCîÆ¹uƒƒ!î¦oŞbvÏ’Î0é“BanÜßØ]Àß™Ö¡Ó¥IüÑN½–6€¤¨ï„ÜrÌ 'ûY•Hb''ËI¤*HJeíI{a¤LÅHb¤Y}Œì}‚ìı¶;Fâí­ÅHØ\Io<ZÅHFúx”s–,c%øœ„•R•ÀHÕ8cè‘x„†‘r	#ÅäÖ*;‘c$•0ÒQAÒÓÇHgÃa7˜ôb×CşÇIÿ˜ôOP½dœ„Ÿ”¡’®úW€¡}ÔAO 
™èFLõ‰ ˆ^‰•Ş¨‰·ì¡Õl<Cıã ”ñ?†:†:„‚ÉûrQ”Ñ	Fı×PÔ¥·êœ›pƒîoßŸ3²AÇx{İ‹9È+êğ ë©ìÑ½tLfìÊ^òİ]ó]İÕSŞ½‹ºÂµ=ĞZ×Í;£Ü5;áyÌî]äFÛ½‹švï¨yğÅ‹nØå$ª½ä¸wæ·9·fªß›Ë«½¹òúe…™Œ ‰6î)mÎM½UÇ9>Ş3ì;ÂºvêºíÌUL-'3«ìB”X(tçµNŞ¦ÂK¿Èxióbxi£à%ãp€©P;ı­¸é_¢ob¬÷¥ãoV9½tt³?¸yÉ'ignopÓQe<meÔèæ	è¢½3·—Vé•DNÜw¹V)ÜVZ%CQ+
¨Z	şÎxâU+İ2=¨>zR¤[då9²òÙ÷¤»©hÛÔ óm×‰Š#tĞMyT¡[[er0ÄB¡7ÿ‰`èX¨óşÛ1áñ?Úıàñ?ú‡íÍGÄCÿ‚½¹(êŸ¢ö;ïıŸBQİ7áş-8êEÎ{Hág›¬ÄXwêRj.Û‘mæÀöuIÛT6›Ü<N†ã[wb/c©/pÜÆ¢Í[7¤Ç+[N+r+¼mN7ô]º5èKw£çâú&>}Ó13.ÒGå#ô‘ (H5cT¶bVd©™ƒ‘â6.LûÙ‚ÆÓzù_ Özõ¾§ß´Pc"DÁ±f†Ã² x®7#dŠ1Å¥Ã İd„Òm;s“@BU±Ì¸
UÅ%ªZÔ¢ªø9™sT…>ŒÑ÷
öÃ|§
˜h«‹'zYN ^Œ¥¼™vz†¶ıR?VôrÏäP££Rh€ïl·?‰1/İ¹À˜Ó×æ5ŒÙz©˜§¹”,ûÈ„i§Ÿ¹lÆGÉmq£D¿AŸ:iUu'e€6w“ßSĞÂ«h!€Ú| 5òÇXµ¡Åo­)Lıß*‡«# Ü¼#À-ğíò“ÚÚYßWÖ:ö·±j4°‰´RÊŞB†±3f`3™ÂÀ` ]7}mô6X„‘a°ùw.£ÅtZü£@‹tE‹-¦€±ig¸ïÂ›¬ÜXeå¦Ô™ï½\9¯5§“"…¡Æ2Js:ä LĞ)ÂÊÎídNçÉœÎ]ÌéXÎ¶Î¥7­yñz<l¥î2xã2—Ğêœ£UÚ|¡BrÅ˜Î%5¦c9²-¨/ZìŒ@ÿN»:M¶Û‘%SÓ]yæme‚pÚ`‚°ZÁSfVşlkñ@}JNØ™¢bÊ-FªB–;bv‹‡-}•!£2äÍ2„[ <HIÑŠ¹GbîÜ]¶`î|7æÎæv&HD‹.Ş²‡ícÌ¬ÑUÓ¶ç›°w	—;-¸¼ Z¢36úÍŸ$ôÉ&”şw˜TlØÆÿû@û {H÷ätEÖ…"‘â{ªÊ¹…š©øš²	_g;ñ5ä›‡µál:Ğ/Šµ3¯³âp 0ÊL†×™
¯3¯Óğ:}ºÎ˜ÍH´Î„û–›ŒL ²Ó »Ô"¯0¡Í{£lªÈUñm¶ßnØ–òæÑğ6Cx›"¼]-¿ßoE“‘Œ¡0ª÷f5¸7kÅ½\:­ƒ¾%  s-`î¥ål€fl(Å,ÂÊjˆĞ÷R€¾—"ôİHĞw£AßË:K’ĞÅ’¤
}³ÃCßœa9
 g
 ˜u‚€3 Ó¿@ğ?¯ÃÅ1u«ÆÿÊU¦ü÷t«ÆÿĞïe@¿§¦[5Jå*¹ÕT†õfO
ë‚şnüªXİ¥W½cÚ¹¥Ó¤]Sè½;Åßß¯[í.vìã…îÊU{y@åêer•é)`/İ+©Ñ»’]z×Ã©]Éß©v5©w%‹Ş5GuhİëÍƒõ¯Æô„…ÆK;I¾IÑs‘%t–ÖÕ»Ò²=HYGŠ,mƒf8à©r0#¬´áìàn'ÒÙAé$İ™’”kó“—Ü„ßÀ¼ƒÊC·RVÜİÓŞÊ5\í-ÌµzN@K,^Š<øm÷$p·rÅ‰|^e>Îˆ^*|Ú‰ÔHº¿7·²´H`Ñ(‘çÀÚÍÏzØ·CÓd‚ğ–MëåN4ïFAa§>³9<‹Æ‹¸–Ï]ªÿxjŸŸÓ,Ş
ÑuâRÂb;ı$.e$§ä–P$aüÄ éLQÄHÄ ×ŒzòæHmøs¤è	Ù¡c)Ùü’ıÏˆnğ\ââ/Ùã9óÃÓEÃÜtxS}Íp0ğ
¸—Îm.0Ù 6-Œw³Á‡db58Ébo‘r'Æ[¸’Î¨rõ(‹ÎR1o* Ê‹å1•Ãse*âÔå»cç·åd,%"hÉ5’àê+7@ƒnŠ=ÄT
|˜J»SSIg±ÅÚÓil‚·¼`’Z#-õ#mV7ĞuM«u16hXm»O'ì…’W*J®ı("ç"çùÃCS+NNSoT@½QĞôRAÓ	”V‡¦™ŸîN1±ÍÈÀp…«©«çV§V'¬NDX-”Ã¶®Aí¤öˆÃFBÖKémS²—
 Ûè„²)dTöFDÙK²i((Ø:GÙü8í~‹µZ§D[§¤n:Os>aö}:·û—Ä&–¯u'iX®x7®¤dñˆ›W•åÃUóÅ«½xõâ†*ëŠÖzÙÍS8LÌåa®N-¥e³Ü™’4‰?{ZÄÉ›,âL´Ÿ?d?¥ŸÉéçV„½¹{+K?·ªôÃˆ^êï¹.ıä‚ô“[j¤&ıìÛÆc:„lPüñİÉNÉÇßCòá>–’,sæºeÃäY¹ UÏ.Vã•
·‹”•è†E”&‚ ¿&¼ivÉN¢è4ÙOtšÈ¢Óä1¢Ó
£7(:Mê°L°ÉAD'ã²Ó
ÊNs·öZRÜBƒ4oÔD¢Ò§ÔeÎ»ñvFX¹şp.ˆÿ‡"rmvŠ\
‰•E®MƒÈe°ÌËV™kÒ
ã.e™ë÷R•¹~ Ê÷C!s-•Àv™kr,·”°Ü²Ärm=¦H%sMše®-‹ä"×ä"×–‰\Û®"W®Š\“"—1i–¹nT™ëF‘¹&šÌ5i—¹Â™‹áû°FæZ¾4™ëF’²&ÒÛM½Ì5y‘
M‹R×(uMÚ¥®Ûz©«Ër5øz­–*Ñ–*©[ªÎÓ\ª¥Ø5Ù%v…šØµ<ŠØu©ë/ö®¼¹mİˆÿÏO‘húRÒ„IyéA	Ö$/é}Mi;o2’+’–%K¶’è»w ‰“Ôa»M;mçÅ"îc±øíØ}·‰¢<=SÚœÖZ‹+‘«ÕHêÃe›´]¶‰İª{ê½ŠQ¼ù­B<Ğ(¿;Ó¯Mam~r'ìónÙë2J;úÏØŒ qP¹å[Éç)3º’íz²OUğ©ƒÈì uÑ/_¬®™YÙŸ@Zº¡ü'¹¹DWÃKz\b²€Ÿø)ÆpMG•_æ?ü’$âõ6û±¼¾ëº#Éqs=QõÌ¡²‘×°ö}æÿ¬qAh%¡˜Î=2¼Œ§1Bñe¤Ôo³ØAs
±m'Ìâs÷aóh7ØqªoÅ$ƒÙi’ÁS¸V\aœiµ¡é·tt¡RêúdwÉ,â$¯FÁÚw“şÚ{å.ûïÂ½½W•rsÓCÖpaEi)‰PşFpEßjv¡ìêòvêâ‘ĞXvüÃĞü˜¾tÜeÂìï–§™nİr ¼=(—]n±ıhcã-ÀÒ-ãìzo»˜µ6oáÿ–^#)t[ŞHßòFÄ,~ÙæFÚfsc†F\e´©zRìóÄA_høÖq£ k¾j3¨ÒØ{çÙÙx 6ËÂ$ıeyœÁHö3’ã ÚŸbœƒs
²v#´§hÎÿÚ#4Poue·v¼ø¬Úi/i.ÁÔ‹–*›p€«CËFªÂG²à%¡×@è$»İÀÁÒÀ¥Š%JK”Oˆ%Êÿm,Q%œ¼eógû¸¾#çíûş
»Åµ#7ÈÇkÿ—PMÑŸyì_ß]õ3øÿz“†>«ºŞÀü×ÔwYGÚ<Õ›o„†‚æ:àè¾2\pÀQ8ºü8ïIH£`šÛø€6
ø¿9ÆÄ-u´áäÊgÙ
7òóáÆšï‹²f«ÔàFşïƒ0È3›ôÙ¾¾Bä¸"É¡0ÑÇ¡Ç?Z»Êa}rĞËÑŸìëfğr à”ñ¬¤0îVPùñ#“79g¤”à¦TİÑÌXÀğ
—ºÒøqàJ|0=‰«ôÊ®<.º Gqà>pqàş+Gkİqß[ú_MßØ÷q„°ÖÂZÆ9]ëø "‡O/^"uÂÆºrèÏÿVí±¡ îÖvD»"G]‘¯?>
.9öôÓyB`ÒŒÜiØä)ì£ÖótbSÂ„sM'6å	Î§·&ÂÛÂ53³~ùjŸänı$t-<úˆŸzG¼ã:Önên£Ä&‰–‡—`¡¼ûf4P%z§i|C•²mã}æñÄœÜ¿Fpò:X’ûoñ×·ÁÂ|¬_ad¯İ Iô-@Ü'ÑÙ5Cò|ë{±ØÛ‘pœ7u›s²YCæâ¼}7Ø7cGıâ´HÙœ:]xÏÒie,•|Ì@®Z.¹Wó“fÁOhCYS8O»BLóò$¨«ŒÏ*73=şP_¼ÕÑ#±Öß¸£¿âÙ¼œÍèn¬u7–»ìnb3¥ëyAïzÇbª Kê\usË•€NR¶-ÉË´2İ“…’É9w°Õ‘2ß€ŠÇRƒË´À/Ñ`9 Æ°:îCcôiW¢K/|%Ñ+i¹
½õİ{°CòG0oa¶šGĞ¥×ğ˜†À0tß°Ó!hü4òˆóXÉÃr–r«Ç	$Oq=˜IçH¯O4æ®tŠ9)d®K!óãœb¢Jp®‹)Îÿ®G+\UUª¶ŞL`hó6¡ÇT‹*JÑÌTŠfB)šz²#…®*„OUèq,:SCê1#‡ »ÄO »dGÊ.M»åy¢ËSøñ,Ï]¸Xw¹ótæİş<—ŞÅœ¿Xùì0ZïÅÏ W<vææÕj\3Éå¬¾m ¯Á`­÷kšŸ†ì×Ù¯Eö¦ºµ±Ğà®{ƒ»îlÏü?€@nÈŒ¹HˆQƒZ¡º\÷ığ»>Âã‚Tœ	aDL]ìÃT±‡¡Lo%våqº´±¬˜_§»;o‚dUy®8Âi(ó’6ëe:S\2ØÓô‡* Z)€(!3Mˆ0TöNNííÑĞÙ$˜ì,\È|hgŸVOíşG–Vjè“aá8[?-—ïcë¶t <¸\êàry¸dí¾R'\€-÷Ã•Ûıp©N×óc®/ÿ}N×Çôº^ÁÎ¢‚Å!]{Ñ…::Ÿò_ä+Îƒ|OàÉŞ9Ú•ıqä—İˆ.*.eòì€#€qÔHf4~¨ëøä+rŸ[ñi¢¹?ŞÍ—Ú7tï;Ş)„:ßğßŠ8ª
xµx–7Ó›ˆSÃ_¦“ù¤v2â<­§Ãî">©§ 7ÚS¼ñ'¤ˆ|T¼ÙmzÅ†oµ!÷T4˜,[íğ
,Ñ¬ñ2 Yh4ú}êù>ú(tØáKè/>J´n·ËãÜ$uôÁhu›çÑö0 PB$G¾_÷Á‰&‹aØ·”]•7N”¸D‰ÛH&º3|¨­ZÌ¾Ùÿ‡œ0 )‰³ı)Ì_Î_Î*|9;Á¨n[nÓ¨îŒàèÂŸ³r‹V:ûH–„rC»K	„â“åÁ'ıé	Oúçûq
ûWªšÖMÙ6ÏF>CÂµY“ä3l¡Àapªø4X°h»Õ,Ún•£Öåi>Ã–êCşe«Ï0´Œ0.'Í©Áš.T§İ©<i[¨­BßX$¢oøÛ¾!A¾¶X„ßOâÿà4C¸Oâş zxp´MŞÓ›rª€&¡t«¼
k&ûåVsdöë0şÛe­Ë@Ë¹f­Ã•¢š’%É€ÒRr¶¦ËÓGœªşw8`°§ñ±°ø‰X˜~"–6?ËV?h«wœ6~"0ù®Q§êxå+b§¼lßã+b
ìvdáˆJ­;Ã“Å­C
İ—ÅRùZ´º²X>H$Ñmœ-4?KM&épkÑ°	m–.:øÀlONlÖPmÖÍÁf¡„ šÅık£•s‡mZ¦-äôÃ2“uF¢3ºUãŒ.<äŒ.äşÏÂÃÎèÔ”1p
gt‘éŒsGÜ…\õcÇ~ŒêQòº
1œÑ™%9'’Î¼C8bãvCF’“·›ïoolÊ·BB!L&(KÙ{ÏË¨~ìØl2ÿQ‡¼®CDï¥¤N‘m~œÈÆèi~¤¤ö¤cçÓåG¼áWËWåïNl¹$f(Îe90¥óG³Cbà$Àœ0X‚Ÿ7·¥æÖn.‰€‹oæâÖn~ºs“¹*Î
qpÑ´|¼à`N—ß/d	>U	å¥ƒ$b‘(âßîk?¢[#QÌŸ@<öÉB%ë<…‘Oèá9`ñtM9UälæªTµ8,U9'‰U™.V-P¬ÊQ¬*Q¬*öãÕ÷+É)Æå~˜Z4"tÙÁ LÁæ¦¶¡s«„ÃŒÁJ"Ø†‹`[SÈá
”…œ$äld!g«9[CÈÙXD°®jÛW<UãPƒaÖ…Î•O¯‹`ósE0»/A¨Hvæm2Ÿ0YØiï)É”ÁØ¿ÇÉagµm¨¶­8Ø6Ó"Æ@ñÀ}ŠmĞûÈeÎ“fŒAÉÒ‰4¤õëPï³Õ¬SsmQŞm}÷wlrİìwT›`ò<8vş0ÓÄı	ìÁu’Yk¨<ëÓá‡ş·Ş>¬ñ]¨üqoy•b“Ò©*à-l\£çî—;	WqıIbÖ¹çC¸$!¡zãn~u›öH(¡’	dÖÈøóõf6/7·¬EĞ~¹Im
ĞÃ—1;0óÁZEÎ9-åmÓn8õÙDó?\¥Çs0;y-—HÿÅğ_B¤İÁß;áEî®†½)Íá!™iNÀ0,cZÄYËv§onwÆş7€ŒsÌ«|–§°üÙ©;»÷À~îIIYĞœkáşÀ“½-“?cØRFÓ;{M­ìµ¤œ[púq½Ä¡Z«^°ÓJ«¶Ì_²¿¤j&|W¿ĞÑŒµ–©c
vK/#¦K˜ÅeÆiÅ×½º3ûÔ®œ¤d.Ü‚…µ®E[U‹#«ZUa3s–­úôzãe+š}¤Fâ¤+'èY`ÿîö¼C'¨ğw&W›5…Ÿ|üFJP.ñàŸA°hÆŸÓû[:W‚ş€/ ]ØB•´(hp£¨©-tj

Ö´ÖĞ ­nĞTÙWäİ7ÅY¤Ş@!íĞ´-fÚ,Úb´z„EÓ–ˆi[D°h‰g
Í•·b°Ğ©5‹6Cr+9×:µ†b¹f¨Qî_™^€¦Öà©=8XXƒÍ6£å7'µ„NmÁÂ4ü³°¸Êa%Yƒ§öà`a
VÊ~ØdÆkShÆM;â‚EG¾8Æç•Õ—†ij	œÚƒ…-¥-0 ÃL¯/
®Rjıë*\R$g¦©–jª-`ìd°ã‡+Ø¨fyÊŞcßMRòñjø“A­‚Apóıêaog±c¥(Wşò$“áÙ8k2S{òWŸ$b¨]„‚E&_Î·¦0¶£®âªª+ÅX|_Ö•úÛ/Dø¤	÷· àğ„ğÈ®ÿ‰Ì"½ƒ5÷Ğ÷9¼W«x}ÑV	Æ˜ÕDXMb¯&j"¨&•aqµ^ÎAí@¥^€H9¡R±Ó^f·=8wBĞ36¯wùu¼ N™Ş=û¹»T¥ƒÏY½ôm¬ƒdbÛ¹ É.jåÃ$k¸¡•Ÿ’Lğ4;c$óëÕÕ'øDz5+Ş[i«·ƒ“¢^t¶Õ±¿-PØ›Û°Ã—örÃèãO–a’€8X<
Qˆ·ƒŞíõ²·÷ìóõ² l³J1 àöŒ¦èXÎëÛÀrFo¾wcÿÎû¦şH†'|ñâÔ¥ 9€ÀB$´çó©«aEc¯¡ZŸ—9:1ñ75Ñ›½xqÎŠ‚\3¸¶'Zk6i&«÷ƒ·v¿od•X¼dQ—
{« ÒğQ¿_ ~¿@ı~ÅÁI!Ş4‰ŠĞÈ´Š=Xˆ¸Ó—Kwúê717p±Ob$Á‰S;ì¡^\PğúÇ;>jñõÚÅÄ‚İ™’ =AV¹%ÏY%÷0*Iš0V’öO'
Çlò~yßGŸ^~ê9¶öT;Lµógç)™)Ë{%1ei!4ƒYk¸ğ ­PT>h«
³×êû¡g­™Ç`íãW	ı¼'©t(CARªâèJ#ÕvM#òËíõuşç«åË9Lx“ş{&Ã¬]8ŒÁ;5¡Æªåñß\ˆ!8+•à°ß¦Ù<Æ“×>¢Úf!ŸzòÒM¹–I¨/
Y½Ğ‹r öŞXS2ÌVé%Ş¡@]Ib8~ÿ
ÆˆöØ2éU´o¡~Nø$Öø%>+°²Ğ]ŸZ#ê‡X#’ ¢b°+Ç‹˜ö®ÊõU’ş²KyÓ¾½Z¾–}zûñ`Úù`åˆ=öŞ§NÒÇ55.0½¶Ì}Ú–wçN©G±¥GÜRIÜ¬7_âI±ÄoR‘fç¶¤¤Q‰,¶	ÆŠ^+n“QI¨†Úé`Ü"w’Ö=´è‚-¯¯T´L@ÛèÎé;®”ûePzå
ã,D^Åš{ôÄæ˜ ·Ş„P}¶¬»ğÀ²kËèÈ˜Ò¨¥Æ¨;ã¬-£ß±Ò²Cw[ò_¶ôdšö“ îÏÄà¥ˆ,Ä=!¦MŒA«&óÓåˆº¡û7U°÷Mı‹sf1±Ï)pÄP›ÀÔa‚l,zÑl’˜Ñ`›äG|8¸LX‚…¡ùÔ
Q£ø)&kLÛ´g›tdTÀz1Æ^TCVOH$vÆ©2B¡j0®‰3Ã=»?¼%ó]Œ,ØfnFğ;
8 a3#œÖç¬,şPê¼¥'‚öøË…Wµ7² »,¿dÿ•ğÿÁxpYL[²÷ç„zé "9/«_LÍ´ïf}÷Ü2ĞdVK^¿;/Ö~^N¿¸\°–Ÿ›½¿ğÆí¹‹qFğŸXsy- Zl¬?#Á¼~Y ì„õÒı³s—tÃöO§Ù@çbs—+ïœZ¤¥Ú¬¿„r}©¦²ª‡£g¬a÷Jo&â¶Kš´ë—`ğhnvF´‡“QN–Ó¢ß2%N²À=“\»›“÷ì/ìÜ3;Ä=3je™É<µÂL^	2«Â_³ãøkv£Èw_VlÕ÷%Í`Zq·/hV1%wÑ¶
–xß‚¤~¦ÂLôRĞó8I†jÑÒ^£:s{¤è/'kT%P é•ï¿Ÿ¹4\ç/šãâ{ïÒÏ¤/H}¸\¦/úk@îî²ï.ú™ÇşÀc~HÑ:e°4‡ G ½'ıƒ=é»g15G‚®˜ØG ú,q'X°¾ãN ò5²H2oÑzÍ­Z/ päCßX°‰$KøÀÌ–ä#i€÷\ab\*k¸\Ø1ü4£-1ıá›JÅkV#ÿ¥ZÏdi/ÍãôÑ"HßànŞªŒ›Û•qóĞQlé_Ó»…Ö»“Gº´Ì•Ä–—Úd3ˆ}DÒ²phÑsO3%†rµÉŞ†å¨Ÿ9H÷öH®
óöµ,# sV=”èÖë §U­ƒ
|Úşhyÿìíê*ÌÛU=Bö	ùİ¦I#¨è2`í/#ÄĞ±‡ê~g¤Òr}ùò¼şùâ…õpæ[¨ª›%Zè®OèwSh"æİõ¹Š‚ûCúï³Îyèîâ–u+„„Ô€‡DŠäĞ6ÕÈ
ĞdEtmd„³naÇ}&U‰Øñ\\‰˜[¯DìëÙ[‘-éî.¹ãèAÜ\¾ó>¯øHláÏw…ı	àM\(Ğë¯¹tõIHÈïé|€š>ˆš>@MU!şú #'s5C‚6(Õ2šÓ­ïï¡
hæ§WîÖºkïâı˜·„I÷Ø…%?§Ø¬–-Ïı@Q …duÂîÈ{Ø®ìÀï•Øÿ GR«Äb©}÷}ÿçˆHVÍ¥šğÁÕÜ5Õìá¶Ğx5ßÆ²¨oØq
ó]8 tù“‹¹;èÉ–Mİ­Üô®•oÛV.PbCÈóÃgsd€^á¯/øw¯tGáô‹´Ê… VœwïÏ;´ËNé‘»˜y/`Å[‹éwÓ/ÑÃä,–ç‚·mÀµ¼¥Æ ­%ØN‚©ì	êSÚË­¡¡½^Ğ‰y½¹ØQüaJ[Ûú;
úˆ)ë£¤3µ$ìÌi²ûò¥.ç\Œ_„øãîmJ«HçõĞöŸ²‰¢!â¹Œä¿ƒN¦ƒ‰‘K¥	3sòİ+¦Œü7
ï†çjúoÒğ‰=c—Í”"3…6n+Ş;ºØ¦ µ&;cb8Ë:mbø¥Ô_È·¬ˆÄbLğb9^Hø5VT³zÕºñ”È ì¼AÙÍ/H½¾J‹êÓ
†L—¾ÛËGĞ‰|w•¡/vœ9AÆzi÷¹±GŞòe­Çò°Ã\—«,¸f,º"Æ&¤hA	ÿA¤9ÄG˜6OğúŒ÷†E­(SĞ¬´ŠkX“º™Œgæ<%¸L	@fÌÌ‚ÏXIÊàLAWvB©LC®Zˆ~ÕÍ Èº-§ß™sDàXº¥ÊEwÆm«HµhßaÈ¦­:¿»ºqëÀù«öêÚäÁ~	6Ñ.·>üY^nğÏzrÛ/§Ï‡Ü$(¦ =QQÒD¥µ‹èœÄ>íò3È¾i¬mÕôj8 ¯Ùv‹$À?ã{ğkÏØ¿&AO¸ÎJ?œ(^±„uÔŞså›(s fI*ËÃİõ¦¹ğ¼J×)®o\İæxëŸ/èó/™,ó‡*78Ùæª¸±5é´›U/^ØmñS\%ÔõQ2®¨z½‰Xğº1¥Î‘•cˆ•bQ:p£Cm:­šfîñ
ç>`¤êŸ/T•Î¬ÔLdÔ]Gˆ&`§¹Ñ¦ã_9/¤Ç½–Äğé#qrå®	))Pf¡ÙÌEÏ7¸a¬)ráË×°¤GùÒ'¹§?â¶e\x>6f7¿wø½Ãï=A–¢]O¶å–×'_ìø„OšŸãÂ²Šï˜BZ» o„&ZH/º]Áı:×«G—2¬ÅƒõåfU¹RK~ ‚úÍ#0ú¯¶i&Ì~-´N-:{T™œ9¤¡ E`ˆÒ–äçŞ¸ZOÀğ¨3ÅXèZÜıºõ7ÙU ä;z®f
Å‰ ^fÀ$Dò3Ú4ê»W;Ú ¶7æt|•¾¯JÁãµxñô§¤yiMÜºzÕVÎàœæD,6w×¨øÉ· ¸~¨Ú‹®!ãw!+òzõ’ÿHİy3¹æsXâ 4³G~™ö/şjvÿÌ¯~ánÁÖ
0¢şLşÈÈT„aµï7+ö7§nÊ×qy1¤7À–¬¾/ÂWÙåè©vÁ1@£±±ï*·ûZ"¤È‘¶“Ããç€SkF¥Kr§Ü‘'ˆÆ¿‹—~©YHêq ‹D$,»4(f8¶Ó£³Ô‰(4h¡Qø¿f\GPÕÓ›Mº¾ı%÷ÿ©¤Yñ(\`?Ã—ëbé5ÒÃ0¥ë;‘²*”%ÿò¥Š½K£ÅÕí;Ó×Ÿº\È¿n‰—¤J»æF ]¹!~xıêGÍ\Oé|–1h ô!àET±ıı%9Øëc’]w&rš!èLÆøAÕïñß•i]­°ÿ„›RUHdWÖñ•Ä”3.øü}o€7'>*ô¢ëÛÛëBNÈCÌ´ü,FN‰ßR:Î\¤ƒ¯°±AfRo¯ôfSşñ¼şôOèOÿÈşôïO¿¥?³ôög«4e1 š
æ…İ}Çl ÙÕñ»¡ot™ÜêÜ£¾Ñ&Ì]Çï0ŞÂZ¬—ÊI[-­ãc¨×º!ë íß+CÅe$yŒ,­ f+¨­2**SCª·ûñïÜŸ“ŞøçÚ³h
¡„ÕëşX8MàûuŠçiãúK=IÃP%¤ºìVÃˆ«õû«Õí®ò¦èKê=©èUX®sØ1xä=Á?x¤ïë#;JÍ:™rª{üşE}ób¬t¡$Wøªá¬Hƒ„UW°€	!ŞğÃ*®İªÓÕ(“ß•@ÀÆ`İ[ÙA=·/¥ãOšÊ
zşâˆì„§¾^	Ìj«Øê"z“ÄHP‹5O©DÂi'|ïVár™&8“ìzîZ¾0:£-‰àq£ÁTº ;M¨èrVı•‡œ1´ƒù›Äµ%gÀÌ•j]ÈÙAò¨Û 
b%†(ƒÆHzÆÈ’°;Õ ‚¬
lidå%'ìÈ ©¬Ô†ği¨./„íÆˆ3ºTËOaB•±¡æTÂ»¯®ïzÈ!Wúô¬y‚Î3Ş7<‡{Ö¨µzR3´Eîh-ÖÖB$Í~*,—ÿŞ«İÀ%Œ×Ûñ>kfô%ßjy‡Ü¬GèU•±×p½^µ+öÕªq]KÖî`U×NjåÃG’	MÇ\f˜q©1Ë¯!¯›øøRé„¨[Zß®`aÏü!ò×+œ1óøH`ÓãIä%Rsí2†\F^Jgı¡¬oñ²Â°±¶Î.d¢6aPŞ#*È	«®3QÚŒ¨1„ğ}ùÑ‹p.#®ª|‰ömn]HäüZçB Ü„Zº|ş	Ò,&9¢)ò¬eÕ¤Å:5 ±é$Íµ}ø¾´šŸ¸Õfyè–•O±ºÓÎäGO¼°âYO?OØ<âÔx
ÉX¼IÆ@½ÊÔó¡£¬ZTßîÆQc7$S’Õc	x´Îâğ\ FPZ¤nÆF£ê	Uª¹‡”ŒFÕô%ı¦oorœÏŒÉQ5S)qxZôY-8M}µc,®îW¢GªS+“¯M†AĞÑ^Ïç³˜5¦ÔOHX‚JàjÓ¦´ï*©HY[.¿ Àå=K'ã¨L˜#Ğ¾ıKû_?0T¯"ÒóĞ«yï‡¨ÎŠ˜í¼ö~XÿÆ¤åG>üÓUŸ–ØĞ/
ûE¡şTÎ/ÖC½hX€©…æÍfÆaÅC Â`)iŠ\€vb1oYğg7äşÒØ…+©ài¹y·˜³Ş£Ó±ÊEÕ‹µŒ„)T÷tºD4ö4nOLŒ#é–"¬›!·ò]ËBıoûÙ…{ dÀYıĞó°»ğJ»–ËúUy+x•Õáxx2X1Mè@>Ø¯dujÇªö}+ZÌºª6Ø;YUõ9·Ç¤>BRASd2 <	mìŒÿşEY€D]#ˆW”ÊÙ4·?€qšåµ8±VE„ak€Ç˜FD„a]€Ç´›°*QH"0©D1Ó§#}ÃjŸUhò‚\J›>™¦å‚qdù$0%¶­sş#Û$çÊj o«GïYíÌÄå¼Ê‘%eÉ¼ ³°/xQÔ¯Ï!kÇ#İ’gşH¬¬î„Q-˜ôÅŞN€
dyyù²Ãóekb"mÙS¥u²-Çíî·[wœ4£'X„ŞCÔ©÷ŠïÓx¡j+y‹´fr àÍÈzÖıîVğF`¡'µâ ×LhˆÕ»¡¸P$¿&‰!ú£ÍÙ÷ AuùGÏ™7y óÁıÄşİÑş
+Û53½•taâáöXÛúU…­»$!åùÒó yãZN¥]Æ‡ÍÜ³Èƒ~³h—Êò63ï«
„û-£¨ŒŒÍ±/ÚƒŠÄÄ—eÎçAˆ°şÉÖ?-Ë‚º ı‚¥_t!²§Æ`ïÚ„¿ /¡´„ÂGY	SêÓ š¢?3S¥<{®A’©ò…'±5!™o6Sõ3`(âXödiy¢Gbu•Øğ7§7üÇ¢ášwXL*n[Ø<Ãj)Ğ<3 |võ/°sÀ/„}O9h°LsÄË,á‹_áÆa™A<3(èáÚPÊƒå¿üMèˆĞ¥™0f&•°hE¹”ŞZä/Ñ‚?"a¿O³p“ßşFj‹[µ=S“¢é¢…©ø¨á(ğKX´W¦|å%Ç‹b!6‹™²NnµÛV†EJVÚĞrkp–0ìŒ”B|éòhÒ7WŒZwÏKÛ´àıøqÌŒá5m’µÖäwYN[cš¤’[kQÂ´cg,ˆ5—	ûÉğ*øÕ]Üà›IRHÂf»ÅÏ‚äÒµÖœ,<RÒÏ… ø’ÈÓ°â`¶À?\ÊÍµ
ÓÏ|`‰˜œà†ààÚ¦ÑtæÊ¯Ö>§°ŠÂğ5)¬£†Y¹’¨ôÄ#
n· Lä^7·|jî²¡Ê lÑáôÆä
fPàÇB­i˜¼¼ŒåàëXàXİ¶º§üOĞ{ßD>EÔÖ¢ííeá[Â‚cÄ¦ºG‚y>ş

êÚ~“[/İPËŠ‡õ¾i]ï­1A;pÌ(Ñ…ÂHn	ì¼dÓÉK:cƒ‡ğ¡}ùòÔjCr²}
–¤s…Îs¶§1œÌ¯ï~Yò%
wAr% Lä
aÛQSÁi¨`Tûçƒ¸­RôS‘&]ÿ®]ÔÎó(9?İRàÀÖ
xáŠçPMmL£6*&51R’™˜‰›¨*Kœo(vøÆºßŒ‹>½ŸÃ
—"ÄGu9²tç
B™­ÆƒX‚áòeMˆÖË–pfŒ
]@Cô66÷ˆ3åò)ê«+™Ñ…]ÅÓKKÒFê:ô²!lC‘wKiÿ5P¼SbªĞfè\I½•eÌ€ÕÒjñó<…¡]ıw†.Ñj»SMIf.®•rpiEKÒw»(Î?LPÎQ5µ’ñ?ÄÍ‘­råàfã»šzã3S·U1ÓA`OçÑ§véræåô3ñ: á»>&KÎ÷rÈúº%¢‰ƒ½-‘;Î“U îì…Á­¾:íú)ëÃù
i] ä?¶@HL
±Lh6u»iË˜»°ÍG²¡î0é7µ71ìLSØË}½’”Ğuãz¥Òÿş¥
}acY#é([¬ÇªDÄr‘õ­Ï‡Æâªİ¨TƒíXúç_™<Qf“0ÉLiL×1GJ»ô¨?¤>gºsGÔhG"æU­ao4sOŞ®“šå×
¸*ºù:|úói0„é¤À	–Î%4(‚eXÈQ!°Ä«„ú¾=4g&y¸®Œÿ2!F*Óå	–W¹~ÃŸŠ;.OıZÒ#â·6ù²«!¦ä¥°¯ú±^/Ì}$²sŠê|’«c2çP¹
Å§´U8Ÿr¾4Ÿ2¡­+W4ñ£ñ†c1\üÅœÑ£à]q}åÀœšZqszdo¬ŞÑßÜ»gJtÄ$‚k ˆ¤OâƒmœÓ
6w A£Ã"Maâ¶²˜^å®Æã^ıÄ„eZØ8†ï[Ø2Yùzy#Om fõA~bÖÚì,Ùô©¥bÅSTpójd+°)”²"ººYñÁ¯Ôôf˜0æ«íÁEç6úˆ .Ûğè8`%È†æõ×13Š0í¸öëkˆF¿s‘Sñ–	ßvâ>t¡ÅšÕòˆi¢QÇÏ@Cı­Ëãø?=–çbÚ
dÙÒ*íÄGÇg‡´jÇ£gØ J„´Jƒ|sXöÈDûîcç˜˜§Î#d;O~ã¿±œ§ÍIqÚyRŒ‡ÁKv¸»<úp—C×a­õR~oª’&BPŞ xk€À¯şyØª?b£ş(Ú$©Øß‚ëWá4ÌŞHÌÂøè‹7EÙãÎhnj<ÄaK9:\¥¡œômõ-R*!·a¼H“ïDm"ğ7¢T~<XÕˆZúÖr‡ƒ¥h5Bcö¸w}L¸ºçqı{RqÊ+P‚°%àOJ¯ë‹é½ òí(Ô;óÎSJ† ¥ÈûİŸîØİÜ^s
Ì“‹`ş]ıjíá×o	áÌã:O_æ×3·÷—rQ^ß•Ï¾C
~†m8as•¿;°çhomL'Ñ1Ds4…pJ~ m@ûÎ¢•õÍÖ›ÕÖµh,Åç?¾ZÅyUGØºhî'–(.j£é$âÒhËàhµ ğööoÚkJÔjÏè¿|Aün[ïIÕT/Ù>«ç÷$±õnk.ø]ø»=áO”¥»5C2§MÂ%1Oô yğÊ&íJó¶Ê¼ÄÊ\oî÷öæ£o´û¾v Xç$G
ÌrÛJò^ånh-Ì»¼tdà‘–AüêÊxì}A½Ù4÷Ó ï§•=ûX¯j1nÀ·ŸÄèïdTa»#^†€Œ&ñËz:ğf£È@"¢hY[o¢ ˜%F1É¤¹9MléÒ÷±¥ğîz²|ñÿ,<Õüöà2ïC•Ğ­ËJâÆ}Ôúd Éğ}¤/ÈÀÒNmõ,‹Jm~yV~¦Qc£BŠ›ÆŒø‚¸“öÿ®½ƒzùÇ4†k7Ã±dÕË‘ÈMT-mWtMÊSi»”Rq/ıØ­¿±ƒÎ··è£<$» ½íìá« jœ¶
ÀÅRÙ¶
N[%,‚òøEP˜Õ~™àJ›a¶õsÃxÖ^xŸ×wW·ñœw›ßöŠñ‘_½üKìŠ"ĞÜ*y8îÈZ’w¶‘CŞ• –/¼¤ZôÀ‡ef–ŞÇ\2»|ğBãBdegNbÓ+]E4“ïk`—WI™Ö‰.µä€‘€¦#5`ŞŞãÎÛÆ|íóáv)F6hù{)Çâ6+Rr„¡Ÿ$öXµH)]ƒtæ şÖí	%Dpµ
x ø–ÜÒx:krcsÇÀÇEñÈÀ‚9e¸™PXÌ›‹ÁfT„•àKtåtÆø3ğæ ÷}¬pö\sÄ‘†ä0°TĞ1
ãzÆ7B“~êp£3ŒX†'À3Æ¯ÊÁÖØ½íGPü¹ËÓ]²®©åU½h”eÍåÇ	0‡2Ä²ì´°˜»¹(*S9ÁÀŞS0D tCvM?ëÜ`şù÷³Ù2zÔ‡¤$„ï=2¸¼ÁxŸ
±°Ô~·)"PŠ¹.Úpo^5d_ÿhàÃì‡×ØC"y­µ\…dsè¨n@>;>;CøŞXäÃkÔS’õ%­lƒ¯4ö1œÜLÖ¼÷˜:~‰#6¹m!ç 4$2¨ID¡E&`Óƒı„‘l¡?wB2­vßŒlv‘='ß‰^Ûr~ù¢í!~µ"'FbckûÖ;ká<t_éûÚki_S†å[6®'÷QÚ—/Õ¤°	àöınàOlö]Ã>´;–Êºëc‰¬,
A|ÛUè·¶B¿ÂéØÃàÃƒ|&p)%¯¤IL)QL)ÏSB†Û¬î†S4¹ÛHYÊÂXH1Öøßæq²!¿p¥ĞV×À˜oÑ_©£Ê0$©\Æê¨Šù ù & 
‚Å)î”_hßln¤o›œ’‰=éÖ¾y&ñMøÍZL¥ÜÎ×X>%… ÊˆEîXä‹E*]æ
¿aæ}^$`¥|óv­,j0SÛƒ¹JD[-F…"jÚ8¢
#[{kÓÀÿuİ?“í£iß¦ÌåÚPp£7/¡"îoC?ßÿÇòz}…Ù¾|Áûf¸ñ ~

M»*¡Îú€¾Yºü²ÀUz‡ÏØRn±)újàU‰?Q»B³
s’TÅ3ãÜÜ„o§Ö[“òıtH¯8ûãšH«8·Z\pFa?¾‚)ï¨½lØcKÿ+{ß @UoäªøiÔ%î¤å²«óÚBŠxYhÌá
K8~y_Ï4¾>räÏ™Õ7G–}ò¬j“:ºˆ:¦ĞÁécZ ¸ã£5˜´
á­z%®5bgÕÜ^Õmèâ
È÷×:yQæIıbå gPÿ„@ûİÀ–¡è`1^H#Üî°è~W¢ñ&E„u=HÁjÏQ¶ØmØY^iÎĞÅ÷Tı¬¡YYNBNå3X5eõñ6rÃ+Ê x“ÃÎœâ¬@O_AMˆ#î Ö×K¥õ‚ß’­€å
hïŞ}öµŞdğuÜıl>´æT5Ö¼ˆªÅ›·QE´y%UµßK­MÛ®ãÓÊ‡¼œ5
dúO:B’fY
[Û¶¾<È'˜1ÃÏ1µQ=îtÒÜÊó.T!wwzÏRgR’öEÂõÃ:šÁr±6ÎòĞS…àò
x?°„Ê&xÔP+£!i¯4şÌMÔUÌœS,ÃÕ:ıY~Şºnä+é%ùl’xÿË×Ìù×§Z½^¼ÎÿÂê5PğàĞz>bï…ìÅæ‹i×²$S5§»}êó.1ïß;5øŒõ^N³HÓ~8æòêÂrö¸0â.ªˆ;H"@F%<°‹5
‰Ÿ†<b¾N‰:lûV	è-Ìk˜Ãê†6¯æŸÁXnšƒ8L»yRõ°i]¡Œ5‘ªhˆøJ¸ßpäøï¯>¶¾ÕàŞşQ©Ñâ´6h\ıÜdË®Ó«¹=Oºşİøu;2ë8œÄL÷{c½ÍÜñÁ«C`^ó72MCéK¢Z5©\
ì1‹'5oEÅçoØğúo£
NTÇ›*cŒ9ÏçÉÑ¯;ƒql¥)$¢Ê ÆqÀö)"ìõ&-DÂ'¹¦’S§Z¢’S	¨$á2o¬wH[á4ùw“ÉlR²K‰oËÊl?Õr$­Ì\’-íÑ°båº¬µÆ5I±K†!Zwî´–µ#ÚåwÄs3'Ñ4ªlü\kÃ/Ï!U% \u1~æf^K	®BİÜÑeø3ùùRŠ*åÒ lT1 os©‚xSA¦U0êç—¡,„÷‡ƒ©°„övŒhfóœâd0ëÏ*·`R‹ÃŒÁÊMÔæâ¡H?¬æÂÏõXg¶	¯'¶àu0<ÂR œâıVvwÖÜÆÍğ
î¼z×}©oôÎûÉY¢5§-ªB”.€“ß2…1Å¿ÉÌ	—òÎ»ºO"½/¬Ù™Öìº±Íd@«½=‰Îí°7õÛÈâ¤ÏüÜìu¬W¦µ}ÖÕëXíµsJ·%6ÃÕ>× 	-ÿîºDÃ À¯ÆsRäD'eXÔ/süIÎ¢1ŞÎÖW²„wŠ¨Ÿï„Õ-r¾(ÿÌWæŸ‘£cMâùë`gbìPW‚=“´Ë£8BÅÁX­nda¸ÄÆ9ÑlïÒ‰t®Ù¸_e&ïeÁ&+$Ñ1¬/¡ø1ºë½ˆí½ˆí½ˆí½ˆëãèGnr5OG{«#÷­±wìımÛÆÿù)vKD²Iù‡4­ŸŸk¶¦éš¬k–eù=fYR%9¶êú»ï 	€%Úqºî‘‡M€Ã8à óğ7Í«„åè0ÒLùØ>V	äó´ĞÓÆ)Ãî„ÉÃè%ŠOCM<Müi€ÖŒÄ&Â&pÁ!lvgR>ätªwMEûE˜&·ŠÙ;êšZßİHKİH«z1 ³¢UgZü=à·6=|¶|^=ÜMÑ¶&ÌÜY$äHCZğYš¥
²‡<gÀ´K„;Æz“q‘arz“^÷rn{4mfÃ°yíë§fË€úÉ3:^¢µ3–lõÊXYL)V›]e˜
‰VB8*	Q²à"é—Ù
PÌZ€ÖkÜ)²[íÆÍR×k[Z·'Uó_Ùh€f¡ñp¸OJKğ§O·÷Œ`«	¹6;ÌPc«1·Ñß>ÈğÀ^gÆçR£á!Åçlt»Cúô7³ü¦íß_~éKk,ó[Ş—¦ŠUV©¢­ Õ/İ|”†ŠUIÔÂËÑaõé„8{2ôîAf¾/ÓpV±åÊ-ğ€¦c~Œ–ã(Mw·ŠéäÓßìFYİZ€©Ü`Ošk›L&84îqg†3Ü?ä3”¬Ğë1Š¥6êrËrxïI2µ›ª¢`0sA‚MS™Ş0SeS™°‹’¡2Öä ŞÌQ£ÿaÎwü¦!·l†•Hd:şš
=¨oáï;]X,İ€ù
\øü»„Ü%æÔª™Çy˜²ìÔ€¿…Äo %­Öï;+ºÎDÚàc?¬í²8Ûê0*ÂÚ Ì¶lĞ‘
GãÍ²5ä¤eµ¾k.?W`jµN>´wı]|ËCsÁ µÑ K€,IßèûàNeówYèí
¯]&a„šÛ’ÅìvÙÜŞ•zÕs‚Üé“t$š’ó/_Ú¦ËİĞg½®$6oâÊXó&nÙ’M,¹e'ã»¸2vµo°bw”7ÌInÂŠjáÒ™OWi.h;Ü”6[Œmë˜Êéä†®#ıF&/ë7<{ıòª˜¼Ú_fò²î9{µK³GY÷Tæ®ƒšJQQ5O]íê©«vIë¦®ÖoêòZŞãÌSÖoj¢úß›§Ê³_c>p%ùĞéÅzäùåÿÓË^–Êô²¬=½ˆ©(.O/(©­òìBâÏ_J2´ı@é_œûÚ»il>¼²Äj?pxté®Êp”%¹p/ïJHé¾Â¾²^¼séŞ~qùnıOøåÊ›,Ö*IŞ2÷™w	ÿÆÂ‡Šø:Şú¿ˆÿ/ñ­ºŞú,_>0÷+(Îºhí´-ÑzÉú%X­/$YÛ_F²–7àÊ{•åİ7Ã;ÈUüü¦)·&ò‡ß°‹&.ŸuÊØ©^ªø¯4%Z³+²Bì6£ns­ö^ÌŸ“ŒO¦-ï04”ÜöºuĞ§¿N¦œ––§RC¥7O\’'Ú–|
&@	Áø6ü@wø¿ãcï9ùØlèıÛú0~xFŞ…V\ëû0ANª·9ì±›Ò‹¨ÄÇ›ËBRu*,€ÕûöEçš…{Aà–¥â¸Èp²½JÜ·_{çˆ	ÓÅ£ .è3èü&=©aHÜn©PéD¬YŸ‰ÙkQ¯Ço'SõITš$gè&ít<	Š—†é eO½–egãÄ&ÙĞüì»é0‰k•[Ït˜Îï\Qİƒ2´,“3QlÄU4°22ˆ.ª^˜€BŒLØ§t]ª›ßHŠ1Œ]CÔ~Æı
<è‘˜„@Q{N$ÀM…Øu*Ur#Ã ¿hŠÜoÊH´)#bº-]k§¹âJbÔMX®Öá°\9u>Ã}A6rŞL#†Õ
ŞÆ{W¸VZôÏX†ğŠÉ×ïš_²?ÇìPÙŸ«)–ìPœŠ±;I$;a“ZÔİ
'¼¤01Ë‡‡ÂL.éâÜ–„
W	ù¬CWúvÓş…]KÖ`.)kJåŠ#Ë¼ÊÑØzsŞ=Õñú,äıWµ‰£ªÕi:Ä‚D²ƒ¹Ÿ%>ZŸ»Æ­OÊÇÆbiÌ¬î#²ªÈ£t¹wGÜ”;¢O´P%cEçi’²b­«4]EªšrÄïö®æ8³ôMı‰
~7™¶ó]:ûxÇ
`RX‘t–öRqÚŠ7šÔìOP,ÃŠözØñ½8l×£µØ:Ô·«©'Ø ƒ*s
é½ÈËâ=ùv‚ç«KÊíZt×ªkoÍ—œ®V­UR¡ë»ŒïÖbímâlÕkc­î8x€üZğ{t]ZğiÎuîtø~ àN=AK‚ıè½ÙCS_H§¦ˆ+X‹OºF?"òõ3Ä¥ÕAõá\«ßØgEot£°YT9Jn˜Š	JL¸ULQu¸³¹6!¸±€
œÖºBıJÑk _©V|cŸi¯M{ã­¯“c±õ/Chü ½ë‹^^hx«ñÆ9/šòÑÅ‚w‚VˆWYîP3X1^
óƒUS£Úğ›Z5»mÏ÷œè!Å•Ò%Ô±VØª©ùaÎVWÌóÛP±ø×¨ØÒ«²ƒ•27¤–5_4/ëæVÍ7{H„,\CŸĞáB½Êì÷!U“Ì
ö!ÍŸÁ*¥ç¥ğZœuw]÷PCÖİ÷s±¾GØgoí«¹µ†G™°2Ù¬q;÷@úAŸ»YÄqT˜ƒÃ9<¥Ñ4òˆc‚†¼D¨ÄNoŠØË…&hhebèMMØŒåãeòº& Ÿ;3E?K,ö;K‰¬LM·4#ã±„-ëÛì‚x¯}ÙUp¸ã›£HÒÂ{ªí°ïìñ V#;ãtØëuS3Ü÷€(ˆ……ƒô“ `ì4ôÈ=}ıAí˜İÒh¿xHÿX¿R
ççØ„i3³FHœ®Ñ•p´}$!Z,ÃÄo&÷êÓvÖ]U=‡.wí
üÂ§Û„Î~Áà¾à¤.0RÙ™±»ézJG:ÙuFñãÃ¤VÆvÌ³ºPxåõ}¨m0ÔÎ
0Dğ„™³šHá`Ä8$
×2®µŠoË\ëeèâÑU’ş-M>}¸C32’‹í^qùˆY« b¼^Ü¬NŒ¶¢˜nâ3µ›æz•0–Gaì›×½åô¶ä“o—my!íü	Z)%íKØÙÎSP+Ûñû[CÎNŒ»†Œ»u2z®!§çÖÉÚ1eíÔÊºëšè­•ÕsÍ×ÊÜ1fîÔÌ¼kÌ\‡l«¿µm,z»^Ñ;ÆÌ;õ2ï3ïÖËÜô6–›<|zÅwº6#w«h:µĞtÖ¡Ù­…fwÏ­…Çs×"ªGå­%©S¤ÎZ’¶ë!Ú^‹z'©«EzïçÙDÅj¡é¬C³[Íî:4[ç®ET Ë[KR§Iµ$m×C´½öü`r5»w¿c&Q©(:«Ql×@±½Å^
{«Q`[$tyß¦°lÈ$šb=SKH;ëì¬D€u¸NÓ‹ûVÂÆL¢5PtV£Ø®b»…Ipopïš°\¢*utÖ Ù6"±êTGÁ²W‡”½UH
iE-Sªó¼Ç*nŠé03ÅìøŠæRßãT¼ñ™(˜å,‘·
yMäbÛqßN·áê÷ãh’¢5{¶fçËÌQ0ì_½zÕ8=m¼ƒ?¯¿ö//mŸ×ˆ+5L³Û>ïåûåÄòyn6nîŸˆçùQ~|Nv¡÷¬õ` íÕxû2óéèÁÙ¹ó€ìş|Î1HEØŒ–¼•<Ğëõ]ÎŸÙğgc6ŒlX0—FC{>¬5ãÊÓ§Æ3Ø¯º_`<šl™lŒªÂ$ŞÒªWxØäñG³‰(6Â}é£.YM“[A
ZµÌ‡>‡ Në»b"³i¯ê§_ÊZ.ÙØ/mÈìÃÜÃ¤W|	¡ÄŸ÷Ø~‘Œ#¡Ğ«—‹i@Ñ¶†QüRmÃK£üRÚVõ"º2PÎô™Fnk½•»†¹ğÖÂzvê/Ùd•fçÿ~ó/šÍ­û°I=»ùãsÉ:Óï¥Ağ_>Ä†QFd´“Ç1Å{õ+ÂC
²>ùj(´ØDÂ/+VÏó¤D›à—7u¡än*))Ò©T j%vº9S×Kïr“ËVy´¹[4JñxQ½G£Ğ›{4Šà–®Õ®Û,·Ô&n‰wJºEQ¸¯Ğ%Ê­èN`Tìd»b5¾+" 7En,Çm„+Ş^zi‘_âA¯“~(N¾ëfª¤aa«Cu Q´,w³³¡gZ«?1¯3ª öWä«¯ÜÍ¯¾²I?|È©ï°Ïn8+ÕÉĞğÑ¤ßì;üDÎ7ß"Ó´˜å#rà8r¦ @È‰BÛ9ˆÄ“ø"GÔî°8Ì•hA-l8ì^Ğ>§ùYI¦¤ªÔ‘$¤[ùCÛ`Ûóófù“ÕQ®®âi£møÙñŸÃÏ]w"´s"x!ÜÙĞÊ×¼:nñôp™ÓB«thù¾Ä^-;3ªØ
2†9¯Êêyn‹:”­ô´5íÃšõîUKgÇ= ì}]‰gŞt€ÙÙğ7 IdÀiyìXu!“«\MY±Öçóº{ ¡î2Òáğb2FETH$®™*ét ­kIâøI÷"òk@ÎHÌ>–Å)”8İûRæšµciŒ¸Ï¬ c<Œå_²}yîçÖMWk+sJ—Hæ—®Zóy[ç<n=sŸe®©wSòªú
KÇºŠOÙ¼ÄÇëÔj(j2’¤ø‹U:“Tç í½‚°ê2$k/Hq½-åÍòo›#J,x^zDKº*.rM)D/ª/£(
C"9õü…È«´RÊA¾RÒú;zf'`£3Ÿ™Uµz2¥1(Á0•ªÁ ÚûGÌ®Ÿ–=yäÏpåQıÑ$BÓ
LÀ0N„U+á™SÂš
J"	Ôî?eĞµ× ¢òuWÙ¤ê¹]îVÆ;iØ_áô„*÷Cù7é]4,=20Gt
·CË””On›Ií…ƒ•¤Ê«ü›¤FŠn<Ò7Gt‚¢ó–”ôœ è·¥O ,ºh1óDÂxÿxÿN€QkÒø1İÍNÇ¸hKÄÑ¯=—@Ñ³0™ÄW—Ø(ü“³QŠ!˜”‡Ÿl'Ğ#-@Í@v4íxDçs›XvLÇŸèüŸó6«}{1™ŒÃ©!;‘Í©\EóÉ5(sB~Œ’ÁáI¢ÉÍ›M&×¡íMoø¿#şÏúmº„ıİôœ
?¿±u¹]×­H’çÓ]†ğ°ÚHeb- á³h¢KÚ
şìFI
8İ" :b[DîºÓ›àY@a‰€İŞÖÒÙ.rk@Jõ¿ˆÒ½ß ¦„>_Ú=îR¦q½Í†¤q4F ?¤@GIcÎ†=5Çµ(š¿§Æ°
ù
»Õ„GÙ‡À°«”%t””ÃŸ!¡·Ãh±ÌŸßøÊeVğ;iY'ùØAü¿ì ÿ‡}¤æ€‚ûĞ8¾˜¿ê³Î¾&şŒ.y$Ğ*rõ9êÎî.Éşo¾ ä~1šD+|8N`øJÓ_`IØãÅlµëjdµg4^ÍÕ®i_N~n_Í!nÒxá#ÿdqƒÅåH‹m¨Ñ×it1\TÇ_Î+ãLğlı²~Ø„ISÌd°ñÂ…ê5È•ş0ñO|yIûéÛÏ{À›¯†ñl2Ÿô›|Ü5aÕË.Õ‡Û¤q:œ¥Lî„Şö.i°Û¸á³¯öØŸgP„ÃøäÙ]Ã>l¼¡—ÓQÚxË…ÅÁŒ¦ÃgÅ8ÃÏ¯ß¾ú&¤2
ºætø),$í
góÅÉ`8JÌÃ˜÷Ó÷¬›Â.C’@}š¸?¾9ÉqÒéV\S/Î¹»ÓäòåzäÈş¯é8•,Ùmüùâ/S4yyÇ=Ì
:|ç¼]J
½Z‚…¦¬„'»bI°Åß§¬xG£µ¢@)Ztd£ X„%K‹Ñæ÷IÀÃ˜·DG)M’0-ÏÒO?‚\„½sÄI»JÊ 
•4|m¢D‡”(Ñ IÕ$üW
ï·~
GXE¡jØrÊÄ—üOª-tßhÌæMç¬X7Ë7×ÀXÛYº¿Ê½ÇûÜæŒÖ_{ôƒhk-1ÙmÍÇ¹«$ø\¯4äÉôl#J{]y¥Rà›´|}GÑºĞÍ>;ĞÃ-¦°·9DmVk=–ş
L»éÜ€…ˆ]JH–áÚ\>}šğg¯{|Ó™í2
¢2şO6çPŸ¦>0³¥ÉÅËçQşÉ^NKŞ»j½µ¦	VJRqÃWa¯{M_¼0ÆÀr4å”bf'àƒ‰?Ñj³›ëPlElc'ºšÁô!“0m›E5-oT5!‡ğ¶ÏW‡‘rM±´7ıÓOéXŞXL`ÖXÜà>kO;oğ$—`•™'Ñ?ÓBÓ÷½Î-‹zÍ@a­,âÎi&ğÆÄ\
‘WfYïW5ƒÌÅ9L‰V4³{PÊ)c»ÕQ~ÛãÂvî¶¬KbA¶ê+êåÜ&¥±S‘ØİWHtæ28Ldeæï«S~ ÚNˆÂ“aLÄH_Qéåc0Ô<×õ¹™M§ê4ÓähÈ§™$ÛÏ]ÓoJÀi)…µ[)#.@
ËàhÅi²
«#-
ÔÁ>CT†¾13ågşBnå“Á()%§£Ìâ2|Ë
ÚéÖºéÖ[†€“’
)¯³Äª¡ÕÒ(Ve
u“àGI¥I2vÆaÌ¬%Ì&ƒ[.ËQq‰‹)¤d×"@P”Ë(êê·Û~1ßa9_ùHW¿Õ
úFZ î°m°ÒlÂãòDKu®§÷éS-ËAX‡Ô¼P.¡$
w¬ÅÓœ<®ã@qÁ!çÍÔ!šE…ûj¶mÒÏ=o	¥øe¶ziŞ‹ M>LÈÙäßwn‹Ë¹Üé«âúx±k¥a®²Z@- ±KV[6"ô´ŠöšÙòÖ¼4’+g^œK¿XE «rÓJÜö-»¸ú¶ÉÊ%¶?_N®JöMÚ«‘J¦Pİ"ÀOAkR¸+f©Š@™R2LZ‚–Ó~dà7éâ=Æp±ñûÊD‚7?¬l-é5K ÇZ Tcº&`ËŞ€Õ¤?ÉúsÖè³±€ğâÊà®Ue%íbI±z7“›?ºÆ0ä!F¦êj!A·SÙ¼s%ÉR2èÛÂ0V…Cz‡æˆd¸[ûöS_UÒÁ4/B†»…pfò[…IîyÈ`Wú¹F}†ò.¦‹xĞ„‰ìvx˜+r<* %“«ş vªV$é]`­HÑYu,WZW%É¡º‰PY2§ƒÆá
ªÂÃĞí³Ç£!´2÷[ŞT±ÕRzZ÷È¤í5Rî¦}LÙaªUc>$•Ú±ã[{¨€pö•¡VX¬Õ¼jÚê¤‡ê²Ì˜B/VsÉÚ¬+êëè†(N‚4ô@	È´_~‘ö'¹(q‘¾0XdZC.ÊÑÅ%ÄÚ"V%*//¬õÉøjÃ<€~S£ù£â×”™í^ÂÎ¥ù¦ôïBî»»l³_«ÒgôÂøh§-Ï
@#7iîÖ©µc6m‡kµİŠİÈsetšSñ-ñk_·ÓÌ•öY¶€ï³É/³Œç®¶›/*X±¢†IÚ|â6Š‹“×NE0M>¡zğÍ¶+Àª(‘³vo_³Ë”'aoÂgOà#6£nödy¤s°ÕÍUÇ†XyÁƒn1ßÀÌß3±b|¬#Ã %‘=¢/”esl¢é”=ÉÖ1°¥*¯IV2‡¦fø€–LigC1”§ÃA¯ÆqJ)­a9êkF&LQ4-…EXğÄCs«ìïœ§°ë¥ˆ§O!Âœ£É'²IqÓE	8-§Å†²Ãi¢„ùÂ€¬¶¤X×#
â^’Æ¥2ô¡¼L“°3Stv‘Î¾›M¦à*z£Ù#)²\Š,¸j”à`¸™-§{|†ÃğÌ‡çB
mñ¨…€¸¯ÎÙ0—Pa¿¼“çÿaÓ[”ã?n&3zÍ+1o¾ïpˆÑ
Õé<}Z£Ò_¥­Ï¨5:.‹®"àå/ÒÇ)û!¾bãû¶¬ª´ƒ7îæ¶ŞB"¼Ï¨¯.Ç&~?Y#Ç‚¶vIÊúMC5Ø8ÂŠ¤t¿nF²1ñ«Ã¹(k—®à’¯ü-âø¸„Ó½\µIäsÊ°óG’àƒ—ÈqóT ŸãIs|˜é8aŸX¡Ïãfn6p|Õ°¬òK¡Sˆ>‰õ:Qç­ÎFZdZœù g¤
s}PPH¤ûÜÏwA«m·ÖnÇ®@ó‹$¢—;Cä,¸g>NeîRŞÖpfj*œõ±	/±xàƒŸ–³‰©eDJV°x†¡ÀÍû¡ÜøMv¶Zİ`£CGÁGÌ}ìè:&”[Ã(ĞÊĞÔF“	ZÓiH7…Eš©\Òë4)p	³m÷Ğˆ< Íl 5³§¾èK#^ò	·<ÀRß)Ä;·€*súà{À#ªÅ	t²ŒòâíÔ8+A
á]¦Ä8
oÙlàË‰!³:è·WIf§w$
ØºF(´¥¯F@Xn@gëùû É:dŠínnò8,4:ô—ŞÊ$e ®èò.Äƒè*ÑÀ¦­Ğ¨l”TdÏ†lŞ|è®ŠcßíÍMñÁV4;„ÏP[L±ÆJ—×0´ç.ì–[sJ“ÔÉ·I’Ã µFR“ã	qŞÏEÖÃHR[MÚr\Ö–ã¢f—4ãrÆXêqa²
Úx\©GÄ«ôˆ¸¬T€+2H²Ëp-‹Óo•zªk!~\LRøc¿Ä“"¿ğí˜³ÆâLî³¿ÛÏø–Ë-ûu äğvL/Ó;ÿ`“>GóiÀŞ.ïì|ôJtUÿÓêGàg¥Â™›Lï±nlÿ­u{e/5İ¸¨G—’ãÍÏÿ. ‹ÜÉŞ¥í
šµlTé~kpïf8ˆf[‡¯§)1/·‹üŒ*z¤l'‘ä8ÒnLĞ	NF“yZ*a›YÜ0ŠP%†ÙÙ	¸aXpõßŒjM™}1e¶""U…¶‡˜³É·¡¯¨u/|%lù\ê(›\3ú§­HxŒŠC‹êfŞ TÍ¤ª‰â¿¢<Ï—õ–Å<¯=°òÿÿÑfüÿŒqo·š	×L»ö-û}gûL9uZvã!ŠÀ„Ô_YíGV¬‚~ğ›j,h”ü][L jm¿ĞFÅh[ë×T)şíÍuOŞ²j)¦j4>S×øOkrë<¶ş!R<šR[G°¸’p'ß¿R,PÅ½NõFªqƒõ¯ìÂŞ3Ë®î6k¥Ù
àÆfgŞHé<mÃcD¤Áwk5`Å±²W“Ÿ×üÑP-îH· âôçuÀÓ§5;À²ëµm­V«ÑÅšâÎ¹fÜÔïn5kÜé­¼_Òö´+dêå2¸¡F*/¼Q°©­İz‡z\^êäGãäídAGŸAEël¦ÒâC	LDr­.édzèêIè’8„W'³]å»éø"qcˆ7ˆĞ&‰Ç76—Œ‚9óuWã&+
…×$8ÁŞå¾ºø
JâÂ¶Ç)©´¨>H 7|Ã¯ãP¹^È_Z¶Z/R}?ü àS@­°
TJê2Éu+¶•ü”,°r~r§uL¥Ôº‡?êÅ;‰Ÿ‡’ì‘)övZ\ÑiPŸà2Öó2ÿW¢2ˆ Ã*Üİm“iÉ Ñ¹‘¶ÌŒÍxRZÓM–´+~ûÒM<ÍvèœnÏÏA2¹ES6V9Î€ªÇ,gáŒy±ÓÌ3˜M.ä~u¾¡,gyò­½£9Òê8ÒÍ×…êæBÎEØÉ·AFÀ~£ƒ‹`Ì6åÎ¼hH3&PZ˜üµÙ#SÒ‡ã€W#`¤mùÀòZjŞ¬˜v€G_~(zëš€~îÿÁå6ì“Òûwv6;K’¶ş~»¹Ñıûİ/öû€s.û—gïÿñìÃÆ³­>)¼LúÌ~†l©75²€4| –|fç)à»˜ÀÉŸ†P´Gd$¶Óïš¦˜R²ZÙ$åG”z\æáM é%;M¼Õ„z9Ÿoüı=üÈ¶œ`€·3ò^GŠ€väÊ¾€TGœI¾€3Éƒ\¬r¬bYe"qº_üöcó°<ÑŸü>.İG¼Ñæ€Î__ÅA†%´¸3£\\ÆÆø˜ÇsB`@
ÂÁ{ú!È®AÅÒƒ™"É
£¼ÛçÛ3oƒıJ'ƒ3Úà#ÅenµLP?6%5ıœ’~vX±”¯2Æ·ÁC;woGÿ×*Š?“àÂH,l/y3LÜô.
Êü¬ğs­	èÇ¦” ¬A€U¤`pšÕ|A¡¾SÒ8Gt.1¾Ä9aò´ŞÌæÆOÃòøjDgß§}<]ù	•²«hÏ†Ü¼—§EMlîòËw˜V”ÁÇ0×%”çZa~ùN¦PÄ³3RsãĞ@öæ(Ñò«ñÅ¶@/é5+µæøê¯4¬­V©‘SÑ‘«aÙ“ßÉd)à¨®jÅ#XUKˆ87

{ıò’$xÍD¿¼Íiá7·a€˜İü;«®JË#˜ÉÜ­NÂ˜è-“ÒAË´tĞ21´LU…/1´,Â‚„³C~l9¼½ñ±fK«–'öûDç§ò¨€Îï)É8Dhs¤xô WtÅ	¾ÏÎWße1ãÄÍ"¼Ù€\Nòë\<×æÛù§Mò.÷•Şi¯ÈšŒ
|Á
wA$nğ;A©{ É‡rCY¿Õ–Jµ–’|¡&3µßıP.ó¹DNM–æÓy‰q»«Y?¾¹Wt“ß/vY±b»P«Á}:“˜;SËÉ[Sv®)ÖØÙ Ö_š;cŒ¥G è|’\R–İˆäÅ¥ÉëŒ5æÚv¼†Ëráä—DYdÂôD “Â0¬Æ÷>Æ$€J˜âWĞùŸš+s…¹©ãó«Ï«³8wÕÑ¡•*íiÕMFYİ”·C¼¾XS±2\Ñø€i¡%Q>uH5NŞ˜z¸8gv¨y"lÈòÌ‹#Ş”I¦ÄŒwwú/SŒl~§OŸFÙ5ZéxŞKQ¤_ l*ã(è£<5.Gp
"ÿÂGàG¸ì’Up›·ÛGû8Ÿ¤âë	ßø¡3P¸Y-OÒ4ÂÃ,§ãW$PÅ(ÔÌC’tÕlª-áZUerË¶®lPM,+E‚ÁåTØXN0»P³œ:‰xÃ<-øÄaîcŠşRûß'ZkVRÊÎ…}wÌ„KÂ(øyLÂ `ÇKé,€w/ôÛJ‚ÓoÙIk\ú&a­&íR=GŞ~Dr'PW¼ëïÇÄ‚ĞärŠ †3~‡¢|tôbóqÎyXŒœ†½EÓ!±ÙÀ9ÉaÌ,“i3?Ö·•xH›Ñí€Bïiá$Ì3%Äs7
%ªQÅ<+ ¢=|ñƒ
ñà ¦R34HuB²hS6‡£šNP¨qH+›¨«ƒ¿OºJç¸hRMÊˆıcóß5(T“k¢,.ú[‰‘íÜ9~yw:CÆè¼$Õ
êb…,èõ
ÊµÄÑ~¿ªhœ*ü|ı²¢^8~~o—obªlŠø%wx§Šf¦v`ÀNø˜ƒóäiDÓ=IC…é<
bv-„ùJl&ìZ\"Ö‰X2(m§”ÄßzIèFâI·^‚Œ 7ÿFZ9¥.V¢¶H«Å‰Y8ı\Zƒ8»‹èÀ\WIç•”j` /‘mèfPÎd–6‘ÄMÀ`ñx4ÆÚq|Z§Y¸¶AK„syîßrî§‡Üÿ[
´"–!}}µøóM*S·ã&İ
~µ;m¶X™¼E©vƒâ_øù¡W–ÚÈK¥2+°N–
Ê²A“ü1¼•×°JY‰p’Íz5vÄ‚Ä ^Fü¢	¥?ˆQ/¡ôº=-N^Et¾ÊÅp‹ëiİfœ]î@>"±bÂÅŒ,x÷:¿ÃßŞøî%ÚP(aœ$HÉÌÒİŒ&hHÓPã0î¢ÁûÌ:Ùv4¢¨J$…<Sv·nş´·$^'­oÀHmÄ~¦$Õ	µ~=JÁ 	–À‘™VÙìœÚütï,„¶ŒP¬‡Äx&‚áú·t„Æ(XYt«;g5t|}¢ò`ºµCV7E{eSpÌZ¶V1[©]-™E’rÒWò.¬Ëä­•¨ÕÊä*…UF ^¢dfE´NÄèèœğMó[šbS…Äòv&†Š×Á”	G4¼eFß´mJåUî
’+†7bãš¼0-€IW
*MïM’¾ÁS,÷Ø›	#BšË‰*Rõ˜Í?êã×~qƒ7³=TÈç[kÅ$'NÂŠÆÄÖq6¹¶ÿ2¾ Õã† ¢ñ-([v•ˆŠöŠò¬b3ÊKÌ7càOıBï‚#ºÉ:iS¸íOŞæş¦Û8NÔ¸ş·y"ü-‡GôÎ¹ÖÚÚ°ô†Ï”á¼KÓ¤±˜4æWStÑxy¶÷|¿q
1h$ğ{½h/§Ü™}ï¿í6Nxæ3Ül¼›\5b<ËE{éhÙ˜±U9X°Áİd4š )}Yd<Ipg®±„LÉdülÑ§:“Q’çCíçèÃ‚O&Ó%{€ Ñqİ½Æ&f—ãx³1X,¦skñnöYğúåÖt+½™?¥3^ğ ù¶HÇXß+dMFáÑ”Æƒ4‹!xk6:›®µ±eU9õç8m\Yekå_~QØ?ûlüïKÈ³pø#XY´0Wü‰
yö¿rNÊÖ­¯¸r~FÕœtò÷D²,²<Š¾µGËfDúXlË6‹ù(KÇAòÌ|Ó
 r¿û)ìlÛOé%çT 6ƒşt5Y Xâz¸(;0Ê|½ÃÏÇO—#¨·„1İ´yŒMl(ØŸCw\Òyû2óŞ†Şô!Ä%L_ığêÛ	
è'È'«QOz=è|ñ«\ˆE¹eåÍ MáMz#|˜c‚¶*ãM¤‰ï¾Àˆ…ÖÜ‚F8[æ³	d‚‡WĞX+øèVœ¢ò‡cöó" a­ÃÇ‡ƒYI:oşÌ™?aÛßúÙK	¾Œp§öÃÒ¿	Tdš‚ùõwéq•ÊwÆQ°€À¢°/n3Ì¶)Üİt”½='ˆx£pİFÙcBßÃpÄ=Páè%R¼ÊëY5T˜–Û!N	¯×*RH¤=r¡ÓÂabH‰™Ywvcare€¼cL­7$UáëBU¥¥ŠZIÕèÀÔjŸæcüı{×BÈ{´ÍğßğõáƒL¼@	"Š8„ÜÌSûö!¸¿}"‹I,
ÒVK&ï…°úbI`âVHÁWØ7ĞÎş>ıÄ†ßaï.[gÈÂ¿ã…GÊzÊoáíæ„NCš}	ØÁÆÒüSó‹Cå7À/‡ğW9„_!UÃŸÊ8]ÍBªòî¡‚*!÷º×ƒ÷C‹ê€B‚w!ÕÃ÷>T
Aœ¶ĞUC‡şBÊ~AıÇzHå·€£ñ› ¤Zba‘ÄŒ?~©PbŞaŒˆ†e!Œ‘Ù‰–"D9Õ´É6(¹*È¡…h1QsÍù ;›x—g™lv~lçIåÛlôgF™ÁéhÑÜvœT‡^6³E’”³l:QÒh)½/D„ª3èy–Å=ŒauÒjŞ~´Û~ïpo#îÒÖŞF3jSg#ö-ï° |ÜÖ¢š­m|E™Jüg(ûü:Óî¾ÆóD¬ÍH5¡a>Ÿbíá,\(+ìB…CšYÚúÇ¬mAÏÎñ<êØAB®üp]Ÿ¨Ãµ¶Á^£PvÆïm§+ß…D±Í)ÍÓóÑ4Lìly.î·0 ]~zÖì—ù‘…¶b<Û.	ÌG
ai˜“&£·2@¼½çşşƒ+ÂŒ¹èÒ8<kj©<^<Š+'H‹±5–»ğïC5Ó0
Syœ¤¼Ø™vÓ¦‡ïy§­>ØÛú$AWízŞLH¹rkJÉ‚@röÙÆ˜;Ö¸-ëÓûB‹õ­05#Ö`²½¢ğoÀ 
G„üvî à ÷cen9ÉO\_~Dğï7xõc˜[„eX=jëW	”ÂƒúŠú+ù<“êiRğÚLÊdLDÛ0¥.8LºŞÆOVğ©‘;/Å¡ğ!:·™KUB
5~0_B¥x³Y+E)\fÑ\]
)Z!WT|»U˜\¥BQ¥©´¤Xeïhùù3ZÄŠC¦Å¥³Ó•ÏzÅ|ŞÎº( Ú‹61²³‘ŒÓo'Ì3T
^C{–&vË öÄPè:v¡ˆH°JÊ)ûÆ,¬ÊuK¡¯‡q®ğ$~/l}Pt4î›]hTğí(ıy˜Î`GÍ6‰§Ş
~Ç%|,á£ÃLà?3qã÷!¸„ŸKØİÊqCé —a RHzŞ¨¶µ*7£“6à‹µÔ†6¯’T›Ô6TİÁ;LÑB´¦Nv"Å>àkŸ•‚|ğ¬‘µ¼ıšåü|Öø'ÖI”ZŠˆeƒc„ƒ£U¥D$€®‹é#÷>W|@VdE‘Œ?-†ÉRòlzÃ`¬²êC¢ÆÖá3e¦{+»›KSµHOSH¢iä;¡ı5Ææ‡¯%J]ûcöòH»æh Â>ü¼‚ÿ—¡Ç&´>º¡JÙ¶pÊOÛAˆ.}>nõ‚¾–ğ•Ü‚<J!Î…81.Ä8dÀÀã§·ïr/…â;ÍP7ê›Kø½t¶„õæ43Z!L6Nàµ÷8 ¯ª…ñ¢išS^[gë‚Œ „5F¬cr±ö6~"Öåğû2¼a:Å;äŠ9Pšµ—ä’{ğİ¾
z™»¥ùÇ ·òa™	SÛ‘ø¸ÃCc½Ìº7
{0yrLAØÈ‚,ÎÄâå)‘¹Â0ÆcŠ3ĞfI0ËÌˆÈ:ƒƒÏâøŠ jã²uÕ²áå:á–İ¹ÃãY6<¯ØÍÈŠ¢Ã3îOƒI"î5z =çìQÀßëü;…ä9 £.Şoâ@c:#‹ÓÆ" \ßûÎğ\ˆfñFÀ€8-™¬çcP“Q6’8Ã¨<o½ì^À­xĞ`
âëoJ2ÔÖÅFo£ÇĞ"Gm7’„/šk1¥,KHŞxğñ1#Áo¦(ää¸uˆ©ée3
¾ƒüjÛ¤&Ve¨ºñ<ÓiHAíª
uû	ôİ
¼ ÿZ1|yì‹‚^†ê]{F–J/Oã‰4¦Q”›Ÿ³‚ä›ğ9ĞaÂ$ˆ•\•SuÊ©8X Ö-„âñS[îĞfD3J6Ş¶ bÃÊÊvÔ&»ÎÔ4ÎôÙkz3OÌªËìã&û˜¹Y”ø@Y”ÛæÌª›,â¥|%nÀbO™ã-?„üòÕØjiAûÌdÃÌÄ
´5í·ï¾;ûøêå›WGoO¾şxöı÷6_oÄâôË	zL²=rQÈüòÛ¾yyúñÍÛ£·g<sf&Š2Ë˜ı@²}17>‡Ûü,F/ØˆøŠ´Ò#ó·á -¼ÌÂãI›ƒ#IØç|ø7ï¾}{ô£ úó²Åm5¼­™²şÁa\MD ÿº³òn8Ê{MË¬ç@…ú/ì•Ğ~Ò–í7N_¿jœİÄé”e³[y;±7ì¹€™„©zäğ5eáOá
¤š“ˆÂh„RŒùi¶ ?…Âú§­N0¦Ÿ†}
[ØìÔÙQ5QqMçÕ›—gæû¿'›ZNw‹ßêyÍft)Ÿğ‹AÁëffÊæéşŞâ@ñugvÀoY²€VÙ¼!Ll`6?ûÄà“1ã¨9rT<ÀùxM‹µñ‘à'[”.–‰¦=QÈüxù–óµRÜŠ½°¼ŒHÜÃr$H-)Å”å+¡ĞúÚ© ÷cuå‹1¶]®}fAÍêş£±…`âŞ9béB3%hŸ×Üg¾ø cI{Ã4éRİZj´®úÔdc"ÁÓˆ–•ñŠˆ0KQÂl¶Hæ·á`#ê/¬š²Ÿ>¡ªFCoOX
³˜c<øé½··‘´?0WÂ>âí9­c5ÈÛëoá-E6€0üåºçûè/—C8¸„®Oøèìøô9€A¾¤€ ÏÁ³îé ¾šñ¼Ü×naáİóİÓĞô£áü'ıülçr°Így~Ããx&tt9'<áñÉ)F\áõ° Ü?êŸu 86‚ğÑnç¨sá«Ùî½N0ãéÙñş>Ó$]ˆ:í¿8;rm~ì{–^Í3â]œÀLã3wö^xg ›ÌèˆQñü|×eá1®jÓ™À¸·ób÷ì”GÌ‡#¬
 ÛÇÊÂ
 ËùdŒØN¼m„,)]Ñ:	l)#Qııc©ú¸]7±zA­öÜR«ÿÿf 4åÙ÷v\7‡“]èÅ±?ßØ.)J>Ší{,É·‹?¥Öİİ½ã šfÌzê{‚Eq`<"™/^lwNN8–Ü)&³4gĞ³/öC×1`J³‚öÏOöEAsè”Œ+wö·O2	MĞ9ß¿<-Âa4ÁÚpÎüäìÔãğœ­^@‹n0M§Óá˜w¦·óB€æË¼»y/Eù{/ğ¯€¤d’ôsvñÎ^¸˜ONÃƒ8Œõ;ø`#d¶lœş£s <]•5K§³Œiûh8W0aÜ…†÷»òìû|ô"ç0l§Ï±íUF:=‚aƒ0Nï¾y0/SÜSF9=?ÇÀJc™¤×Ùàv´ÈiïÅ1f°‹é˜÷öÉéîÉî	‡õ'ØsÈS@º5ü4™-Y.‡³"â=ÛÛ‡#ú‰j@æØ;Û;?’ hj:Ë
Dì"üzœ5Íó“sÆ…£˜°†1Ñ(?˜×yìV©Óı³=Ë‡8¯?Š1xÆG*‡åm—7ôĞÑi‡Gç]ôÂ=ƒN–À%6õ6şå0ÙhÇ{'€åÃ¨uq8p¨÷¸s”Á%#î??9;ÏÀêxxş|ÿÅ="-G,Òt$P»';§g"BVşœ±Ú\æB öé6«ö˜…‘Q±9¥ü€îal~™‚ßëKuª€çµON±"SäöæBäøhwÛƒ§W3P°±‰·Ÿ»§ÇXi¥í“ãíç^¡ÊçÇ{ûggyÌg>)*ÏA0fqRJ ´9õPˆñ.'{?÷v÷w!f˜ŒÎò^x/»/P³»d“ò Â@€=ñlú;CB'qŒ&è0‚2Jÿ9‘bàôìxfJ9=ßÅÖfr9™Ñõxÿ¬í¤ˆä£]×Í H2Âv8[— hFÀ4……š*ÎÎÎö±‹s5äû¦¶ĞÑ9¤>ãpµ}`ZqAn|J—j3åU<?…*ZÓô¶éU¯Çkxt	êİ“û»ÛÀ:Ù(A}rÁÑÕ%¢==rOO!8¹qsîã?hÛe¦ÀìaK:Êæoï6úœ&É(å)qZÚÙõ€R9öİçŒ;G;{Ğxê<Û?Ş}Î@óA:âjôÍ€@‹Slw·Ózõ{R™sïh—É(m ƒ0B1"Ç®gcó«ÈÍ¨¬ØDÛ;{ûĞÊÔøFA‹Šı‚
(˜RÏO¡wÁO,ƒ¸DßŞºiƒšùJÏ§K`“Ööz KÆè sAK2Ş_N.2ÕE5—(9;1rG¬¯á%\ò
şø]xš: êA•±ç®Pd¿ aÈõVÈÓ	¥Cş¸Êx}r5ƒeÕG°G ›üüß-pbHÂNéÌşÚ"å.HäÁFŠò¦&æ~ræŒH^bõ® Gbåªä–­ı¥Ş!h‰4€Ìş| ÉçĞ ml„Vá@tŸ¤¤‡Ÿœ
¨F]N+Úáƒï³tğ…øaºIğúLœQ,Á¹]…¯÷PõÊ´`Kz£IÁ ­Ã¨¼VÇ<å²­Ã»ŒÎ>¹eÛ4­f\Æ·µÍwo ²ˆ#ïHŒ5Ä]…ĞÜlñFøSÀ/İõº6šxìkŠhhëOÍ>ì»ƒYqF­?Š@Ğg1)¤“.„}8oG°.Zxp¸³[ì‡‹,„¦{ÀÄCHÊJˆuãSÆ;ĞT„?¯áÇp‹ïDù#>qWëlœğ-ş±¼ÃF`§¿
]‹+‡Ü9%òtqlµú ©g¯±X¾k¥IâP©î‘z
:ø’T2€|®ª,şÕÛ‘ö6
C¿÷W”H¨K·¤Ü
•®À€1X;N¡)]RZH² ÿwØ±fBi4ï=û=ß±ı$X¼ãşÿµ¨ım5°˜VBŞ=%_“‡¬»¸Bx‹ùÕP£¹!©¬Ğ,„î‡°L!¿”Y!
¿ä¥ZTå$¤ùW—QNK¡±Óíõ)âIhLÂÄÃïH"†Bh§ŠœÅÇ^æåŞÌ‡	^C¯fKØ¹÷õõV›h};V%N´ZÎ°2‡"rªˆsx+ı’c-¹€[Œ—èW…(ìfÕ÷ÃO5
”Şl¡º->,i‰H½±ˆÅª°ñ¹ş×¼¼Š×k¼¦%¡-åv…”Ì–’ÛRf¶”±-Å,áu»„7ìŞ´Kxë=—‰oì{Y6Ï@İ ×»é$®ÏÈT¿æ"ƒÃ·~SóİçQd›…TÄÕ•:í'©
1¦Üä©ü”·çğêßd‚9X‘£‹ïù„¤KPeGÒğjï™Ö#Ã›"!+V@9#MvH‰:| 4ŒÑ ¤‘ZX²Ü‘5;áxWª	Z!0­R  X94aïğŸ¶¦ °üìJT.Q9¡d|)z`;Á>øjôÈvŒ»Mgğ”:sxò¾ÀßWrK9GR^r å@Ê=T¼İºˆâ]ôüº.v€sú![Ç´aÛıŒ{¯iå¡ ˜è±s L¼w"¸J>ß‚vÚdk\‡‘‚¤²ºMl¸¡#uÀª8ËùÆ@Í¢±RÛ.]è5hÔ»0®Ôèœ`©”ª—TQ^£jÜ}¾’0#Ï©«±ÈXÛ}€%#Ÿl7E.eDd¾»2™²ÙJ›YsæZ98è)QWÍ¼9veVTCîìšSë®³yÎ8KàËbñÇè`ú(¿s?Á»@Ø9Ş¢hf½%1_	:jÒ¦ÑÍ8Z$8—ñÅšÄXÂK—"»Å6g¢jÃŠ©Û ø‚¹ÿû£2±ğ\¢xÃB«;NaOÎAcrúóà5“;›ûN©ÊJ”=Æhsgƒ&ÖR;"³TÅªÓV{¨–Ä)ÎHtœs×µÔ¯°«±ó¤¿ÏCÛ#LF7äàV:}t²EœJ§‹@KA(7¡Ö¹í·E+4ÑxĞ[ÊsTíš%‹·+#ùİ<ƒw³d%w¥V$ÒŒ¶ÿ€Ñv™Ñ&>LyÖt˜J!—¾éå~/>ó kêô.®ğ'à9,¨±¤Ş—©°è"5¿ƒ«/ü	x6òJêİ¨1Sñ«iz…sÃèŞ€V~écÜîKÈ0¥Û5§õŸ­#C½íu—û"CŸ#.ù”„êo/<Ì³Û|fCot“çc$jß!H²<Wº¦
®d¤S)_¹Šf[èu!!”&ıÒ-&sb„[BçÉ©à'wfA±ñŠ®¼!ÿÆÕYnmz ½GŠ’z—.í|-«Vñ'Ø ‘xŒ?ß¡¿&0”üJÆg0EÊå+O1…å%†¦´HÕâBa¾nÜTD†Á³‘Å²Æ¼ˆ¿ ’çDVù3¶È´š'²’¨úVğÑ¯¢z1™zW½%nşQë>Ç¢°¼Æ	ı>]çşh³ùTÄ¿2jfË 
›#1–1]WÓ•™‰ï”¨Í	ğ°„¶I3hÒB&Ñl)©/2èlÙ*É¯0©ğJ.Ã#l¢}oM'i.±€†QùzÍ5{Sa­3Ğ"0…‹O¢—Fêß-Ş‹ş¦ïÂ”W
Y¡¢nX›šÉÒ3Â:|tqŠ L¸7¦ÁP\3ä£vÎ@.•lZ™"™ê‹+Õi.IĞ[â‚d‹¥!l×ß¹y½­r…üpîĞnß
 1ÆÜùdı9Ş‘ı(!î5	`64!€{',µ¼Õ˜a*l³0òxŠÆ
]xo†f©ÚİÀf·x¹ó·n”±G ¹Hà…ÑN…“.±3¦;1¨°iİS©™Ÿµy G”-[¦d«é|Úğ²0z-½á¹ *ApÊ%Çã„Ó^
n¼İ :Â*Ğt‚º§m	+[Ú™>3‰“9Üä,ÆÅ[|Ö”ÒZ;­ëkİÈVSÆ¸ˆ„_—H7<&ÈèçÖCuÜnûŞéöÒ
g%ëT¬}}”ññ¢Ã~ÙwÀ·¡ ”àÔK›o¹uøsJ»tÈÙ°Ï	lÁ­=9a~w2ô¡ i÷’Ü“û•™ÛÈ'¼û†çmíÕà9ƒGn¼5d#>‹Ã°}09ObpSÛv<g{ô.¨Fã9¼*õ&Ï#áP|Úâ‰’"°ÑÀgŸàê
—°á§£­tàfenD
Å‰ ìŠ]ótŠG™:[|˜Ù*)¥Qd”)éì×‡LÑaÜè/MÃE¹á¥âÚv á"ë;»ÆH¹ÛøËMálsSˆoÌ&o"ôUáÕ¶ƒQ9kí×yåkzJj¸ræJè'şªz
ıMœÊ÷Í–ÿÔE„W&á4Ê ³áƒz´Ñ?$…g“âá²$á/¿›Ó¨Ö,ÚåM#é,Ím²m(n²³•’•	ÎŠ7­Ş¸T%´]ä¾û€ô¤‘ë*ãuôUhn°mäšÏ“…¹ÿ^‡5R_
æ&Vß¯?§OÊÍD¥kŞ¨ïf~5¬o‹°&Ğw¥œC0õº–¸<œpIÛ‘'İ™ÌNƒ Ñ/ZDG‹|¯Š—øûÏöz¯OúûoÉŒ[€#åşàhÿÙCnúÑ~ï¨sÔ}ôæä¨÷â¸×å*P^Bâ½ÃîñAï£¯Z‰wu:İAïˆ(×òìğd¯3èœt>=|ÕÛ#ü
Æîí?Øïvû‡Ï,úM¢N?cÌ-‰é?~x4én“äã~ï¤3€ZÜ?ÈšùH°íÖ5f‹p†[:™]¤Ö‚«(´sĞë?ït%³®n·×ï3kJX?ÀZZ–÷Œ¾>Ä¥£¥D³èC’‰ãá#4ÃuTÚ·öDW’

ÎW‰Po?„^,,ÍEg­º¨(/õ/VI–×)0ğ®?OW°$Ô›%ƒ¤PÂg!¥^³âªWë£d6_LÎ1ğ‰v`’'òâŸeHD)n:ş¯—	n EŒPİT”‘£ÖĞºˆ7Ø^œâ¬ÎXØwT	›§˜¬Y|nÈq)è–£¨0È²ˆT´!74‚­¬å³Yš“ÑRÜ-ndOFXÔfõµŸPK    mFÚò¡r       license.txt•RËJC1İşÃ¬…&‚;wRq!UÄR\JšÌíæfê$iéß;IŸ`d“™9sÑW—W06qeÒã:
Ö	î‹	0ñcòqOä0€I0`Ì":˜£4*é
0:wÆ4ÈÖ ğ\W?é,	º##Æ¯âl¨@&X¶½‘&aªàÍçJ–'{ ÚWÛœ5±û,
peB1UH…[RxŠa£à% `ËÒ¹nË=î<2~6€®°TfãCRUC=}ÎË[­m#ÿ‘”ĞÑRûË¤Fl˜ÏO›ıîV½2eâ(ø åTq¨ËkÃÛ5]İW¢öcF1a…Í~Š	îrf?/Õ˜‘Ğ9as£®÷ª¶ÿ,£?'ÕŸÀ8‡noÙœr¦Ø/ú,i¶7I3¬{o{HW¨–-ò
‚×ÿ™.‰mÕ™°Sf·ÂñBïşCÒóÍ(Z-Š´CÙ‹ñ}6­ó»«¿PK    ½¥GG‚2{8h u    source/canvasjs.jsìÙvâÊñyrNşA!ËàÁ6ûfÏ$aµ±/Øqæ$@6 ,‰53çäWò˜·¼ç!ù“ü@~!U½¨µ™Éßdº–®î®®®®^ô×?ş)úáÃğAúåÔPMÕ˜«RIÌeó¬%¶ëiégÒ™<—[=C›ZRi(–)Hóøaî0&UK†·¡eM¢Ñ¡|6{ú8*!×’>]Ú`hI‰X<)õÕ‰>Õ– ‰şğ?üAs¶óãÌûúh¤/L©<“GÒ…ÖS'¦6Hu]QG’lJcubiúDU¤®
ˆ‡˜ùÿAĞ_ÕPU`iH—úä ¤ÇªÑÓ€ñ©¡s^U ˜ EOPLgÆT7USZé3	Š*ÍLU²†ªdê}k!4›>æ7›(ª!•U¶4¨QÌVŸ˜RÁ²­;Cé@‡4ÉÃ+ªz(5Õ>P[:2gµ0Ò&/4‹™CR òµ‘)é*†<VQvø³[„‰Ğ£êÆ :¢ù˜Ñîê`Ò‹BÖQEU•Cuòù¦µµ.…ÀTØÍU(0I-é}ÑÊ†ú:ÓZPH¬ÖŞP$Yñ¸Ó¬¡>³ IÔ?‡ºª_³H¨sy4“±^E+é“ÑêPjŒTäm|[•òjTlVEğKuXz6‡ÚÄ’îbù¼ô!*E£µÁD} ¥˜`6¡º¶umMå&O©-wÍ’‡û³IŞ“~ƒ)ïæ²!ifYíÎ¨óÒ'©/LõØ¤•ÙšM§ºa©
 üèGŠŞ›a×8$m®VF*¾…CTöĞŞá@µJúÄR—Ö10ŠFılDN¡¬öåÙÈ’°rU“Ô“<Ñn*1ş&Ô¨l‘öè‚
ª–Ô]a%cë‡v«_uŸÕuğ«)–Ö”FºşbJÚ„´‰fJ‹¡6",¨1ÂA¡ÙG‘Ó¼hĞå™,‡´&ŠÍóÖà»wDÀ#úün¡)ÖğHJÇbûä}¨‚9hŠ'¬u}\™Èİ‘ªÑò‹ôöjªI¡eˆ&uåŞËÀĞ¡w—ô‘n ¤¶T™ÇˆM~ã,Qhc¢˜î,<ÀòÌ ¿GR<ÁåRdKnèPAuyyG1™F $àJĞR-È?ò<{P%3EQ'<ÉPÍj«KÄç‚ÚÌàjÈ ˆsÍZÙ¢ZÆŒIª.QE¼e*4Ş¥LŠOj?ÄÅ4äÉ@-
á_hVV ’tLşÊèÚš5RyNeE!Ô¬fP…¬æªai=yTiƒ	6€>
íG£ğ³/õT,Ù¾ÔÕ-KS
Ğ
m
AP$¤©}K‘‘‹Ğô¿¥­A¤DĞ4°3Ğ¥G¦
¬Êcm´"•;Òº†Ú·AwLãB`Æò(´‚>¢X#…ş‹ùlR®fİhƒeËZT7G‰³Ô, ·/éİ‘ö:SY;tu²hµŞËD5MR—"=(ŸnLT£)+ÚÌF÷÷ Ñ
cÙ€6†F_†<ujĞ8P‹Áh½Ô`|WÔÆH·
`¹˜r(¶¡>jkSb·&¬Ñ£QÓ2ĞHHm­6c„&,Ü.ÖöœšÔšu­ÿXeŠ§ş¯L[•)ñŸ¥Lê@(\•&`ğüªã×„
ŠB¡ß¨½ÿL¥èÍÓİˆ04‚×	Ã·>W7 fV`ú(¼€äù²cƒ³!F…|Mçx¤<<í”T¢hçë~íôàD[QEºU¬:j>`¨£ZÉ•Jõ¾&Œ¨›<‡€±ºçÔog’Â†m¨§­İÓÕÕ Ø2$ö%§2ûmAš¨–Àğ÷7‚Os#¡ıæs_**î‰ªƒY‘÷%ğ(µşñ?¦ñB{EHÚÚSD³–šÉÛ|¬AsÎÆ´"1ë:M Ş.L[ˆo=Ô>×Cj®¸ßK:×ÔúnuWîn‹»ğ¹ÈQª±$2C° é%0ß/t¢304ê”ÁEµà0™»X·Ğl#ÍTA[¡Âù/TÎÌR÷%˜Š"¯ 	ª}¸/­TÙ`¦}ƒ
Ó‘_HJm½ UıĞ	>Ÿ;Yh˜ŒŠå"ò*“ì7­\Ö‘áŒÂd€0ÈÏN
ÎO@ı%@Ñ‹îd¿Œ(£pféUÍâ- ¶és&zŒg4Š?t&	|ŞË45`Ú·9˜æ¬/Ş™BõF3E}P
fí\˜NGĞÌ@ç;‡–+`LHÊı!c‚:{¡Nd¢¸o'¹ëU¤;Ì[œË*îÁ·Óø"µ,›C6¿4õ‘¦ØEÂ.ÃYbø€8Àét‰Ô ^¢¿8j
'&‚Ö|‹tìöÁxöéˆ™?>a:›™¤™bCb ¥²5?Ñ-i(ÏU°+Ií÷aòÏíÌ21°Gû<F†[b"$òçòŞy–`*…ÌLN&L7o½©à¥‰41gfµª“É'«U¢20éuR[ñk[ƒ	ı…4çkÑ(øq…ü…¾«cSyÿÙ={CÄÁãjÒÖ§¬Ë;›§1Š–j@_óûÄ(†i§úë¬Ö{\BQÈ€ëqsü§PxE]^Øì=i
PTâÜ
ŒóèFé™E$Ñ?ƒ+Cj«		ŸŞ—“ß.û1Dú`<p‰yÒ>ó(ö™«á”Ó§[ª[Ò;àĞëIŞ¥[ÕPä‰^’>ƒRA€\]„$lÍ¾‡›_­8;âIûßh“PÅÍó=„}ØkOıpGu"ùG%/Td^ˆ¿‡¿³É–ÈÓp‘#(¬Ø§èÊc£„ås8”q«İ³½m7½EQfã	Ñ/y_¢	àñÊĞ’0ó@¹GŠ
¦šÆŠÁ_‹€ÈŸˆïÆ‹ÇbNTú*°ÉûTƒŒ}6‚³G¤[ûÍ*!§¯†Emkc:·'ã;ÃŒ\+¬=ÆhÃ0G «­ĞõVèT5pŠïûMgmBƒ.óGRêà$«J½	FÔÁÄ	å&’¢˜—mG±Ö;è¡B=ÍèT6BÕ 	Ğ|¯3ÙÀwC7Í}	ŠPƒ(D2š=Wê6ÑÇ[„fŞÿ¶Ùp` "(øx`A‘à!yü)èÃ=Í]“(aÃĞæ²E±õŠ#ˆ\ğ!si»r+ûiárš¡—(Ä™u¬`øßÜˆƒ’tEEÉ úr&ş+ãYÿü 'VrV'±Ó°H³SkJt§6éë\Uµ§È-u*Ã‚àe®hÍ:Œ¦Nè~È±˜EÛôC\&,±!ó•"ÜÀŠšølRğ›fPÇÕM¶êÆ§fàíŸ5NBŞp­RğÆ¥)6˜ÚãÄ"Ô‚º’Á~c6ü©
‹~ìñNU&öK{83øsÕĞÈr‡ŠÃç'–7(°UìoÆ˜1eì'Æ†p <HÌ08“'`ıh–j×àÏ`\{C|(À4¢)p6›¨ôwDŞ³L›ğ	ZÊRÙÈºêY:{¼ÔçvrYí‘gWYêNa˜ L&;–=ËeÍ2e²¼BODáŸ¯|øÇ†:Àj¦¦½ÍÖíuW\ndšJVÁæá²±¡ë¹’Nõ†äîSRMN=ş˜ª{”YÀƒõıĞ‰âPz|t‚„æÃ“àTòìr
Uô1˜N«lkâS{Òşü{œ(úö<SçôiN6C6ÿü»®¬è¡'ÆÜ]ß0R{ªÜÓm\aíÀ×YC KÇš0LZ$ôãd&_)”Cûìµ”HeR	û5[ÍÄr)òJäÇùL)ğ\¦˜Š‰×B¢/Uèå\)“Šî¹b&)^3åb©Rt §
©|*cÃÓ‰t<U±_SÕ\¼X™Å2©‚`VÍæ3©,1–Oû®â&xqı<J±tÌ‘C¾X,¦sök"Y¬
ùà-ËˆÒ;%@é¥RÚ+ Îf…dÒN°k—·D2Îƒ
t W*ØÍ—K¥Åk,­äÍS*æË1Ñš±\)Ÿ¥Må’¹²7–Ëåã‚U2“)dÅk,—ÈŠ¢W*Ùl:+^ÓÅB² X%òùXQĞBÉ²â5›Kä³1ZP»¯Û…MaaE÷"šÃji(M¾HEiÕx9Ãäi¹b>VòÒ‚
äÜiébºÏ¸Ó
¥b¹ìá—ËrŞ<’ù|&_öĞVJ•²7-VL=²‹…J1ëÅ+eÒUwZ¥RÈ
|³¤^hÒ“·Óv5
ÑËEÛ\ª”LzŠ-æã¥¤;-•ÉÄ+H¥t&í4Ó_eĞiŠEO±c¹bÅ“–¬beo“¦é„«Ø¢SŠ4Ş/=òs¥R†W±€_Åv)Üƒƒ‚éàÄ¶èğ‡ï"ÏgÓüJpoTñ8¶şıU¿KRÄ{ÃTp¾öy<W©&ê~Myb•ªäu“]v2IÒ¼ëbÉşGñ½5úÏ¼åÃÄ®x·‹MwUü”<ù——Ü¹nç_(²å‰F}LÆ ÎçöÉÿöìl|h?Î¿à´aÙI"s­x¾šµAT±G’]3
ı­c£ø#åô11X)5õ±Q(’ ¹¹
Cèş¥…ñKzªæ*êH‹¡Zûİ#¥Pçœ ´b`¨+_fÁzíY½úq‘ü¹`¾h%[GÚ”¾‰—?ò)Ò½4®n$vÒlè‰t‹ÍhkbWóó7İÄ
¸Î¦Üwt$g³º„õ,sØm@V-ü';büFnÖ·
ØøÛÂFÚzk_rHíÓÛ/!wÿr§ÙnÑÅM+¹ ­!Qc[× XcÁm2ÇŸø1>ñ
c|HCë` ¸÷tŒ&9TÊYƒAã6Æú"Û'ÿÛmäïïÀpèş'(úwhûˆlÛ¤Çã]‡ÛİFËİ¬y·9o¿it{Ãxˆ¬ÿÁ£Xf·QìÆ0¤û‡`Œ‘¥6œßÿŠ¡‹¼ï0pıgN|¨ìü”ü!è0Í$cºäİ-·©Oûw™„%ÿòIØwM?ÿu5ò7-ı÷‚;ÍBÿ?CÜilıgÌÿy£«ŸÀ?êş¯Mÿk§…Nû(:é÷(úß?&ÿİ#rÂ‘Ù¿îõµMiØ˜4±ìMºÙÈq:“äûÎipø@ú eì)ø'™I.[6~™îX¨êË[¨YÀ$Kå[	n˜ß„EèÎz7Š€Òı÷.(8vé»k†IvÕ¿ƒ‚TaÙü£ôƒ¦[¸!³'ÕU84®˜paÁ{owÄZÖ>a
«ºĞôa…,Lã&Ø{±Gš¥N
İÒqch€6BªF4Ø;Ä?$ºcÌz°
´îÂE> r³CŒ¯.1í|	•O «aH‘ˆBW]Ò’g’Ÿ¡BeM¤‰º@ì€`çO[/³ısa…=ìã–ì}‰”‘/#ÃVĞ0åÿé“r4|ht,N‹»ëj†mÀÀ
 é#R\ú€yÑšTGP+î|6fÑ
àŞúÆTáƒd' 'c¶cìjlO!ÙÉ”¦ìÆµİÏ[ÍÁ&ìÄË71Ì¾ÁX¶ ºÄtK–²“hYXVaËT@®"ÑËØÑ8º¿ ©GÏ¢­_vê¾à F„G„AF!nòBO4Ë Ş°µ.Œçp?$9UBy²».Õ^É!îuàØú(Åú;'.q$I2ÅûğI:ˆcÍ'C%†@LòB THÿ{úTÖŒU¹{	pÈĞ>Ú²ÛŒc6gw59Ñ‘8°± òë¯"Ü1:¦;fÃ`5¡À¼~„¯ğb3‡w–<ğï¡¡’'áè¯eşÊüİ—Ş¿ß;æU¼Àá;ú+3j§hŒZyaB·ÂÅˆgÁ
h{{¶‘Rš#
òŒÁ~AT8nXıLÉZ†{ô¢
V0övH¶6á,Èc…—ûœi#;>÷%º¹s_¢û¸÷%÷.DHğì'ääeÏŞ|ıh‚7Œ£¦ús‘4ãÎèŸ“{iğ"‰ğÿÏ ™ÈPÚ~ M9‘pã9Ö_T	wXUğ«ÍQÆFğ%@	O~|‚«2H/úÄ·lÿ|Iuàc”`­¼D«ˆH…y	é6aéa[©i=o ?%À­ô´}6Ğ—A·rq·î&và­¬<záceƒ%ßA¬`>´GÔ©tJ»´Ì¡¤ô”•yˆJFöæB—ğ Rk÷ÕÉ‰dÀ…j)ç#Ğ&#nàØÓlv Gz½LHô wn[^–Ê9	>¬§Ÿ@Fï8XJ;dárã\˜è*À=ºpìÄë‚£;iÈ8Š‹TÜ¬ŞÖÃK)b›‹î¾ ™ãÁf~µ^ifÌ]Ä29ßì¬6å#ğh³óÜ9C›Tä,$wÂ7ˆàGÜµ'Ë7…‡¬İN…#µ¸±•z#¸®Šµí·ô@ßÖA¤ŸıÌ«RÒÏ¥XP¿qp‚¥1ôt•ºJfX†AÇí&ápİÍ„e~ğ>¬ğÇø¾d?'ÜÜÎá´Ãeàt	¼¸SuIJÍ|
°VŸİ†0¦ÁÔ0¶¬Vcğ·'ıüç§İ;´tF/¶Ã0pQÄb@C)rº$!1’ D†ğ´Ò/˜we€ÏDŠ0B Ê€ `¦İ ”. tİ>ZèÇ„=¡¶Uó¤ØÖaÆŸb@[˜—Ê…å3¤±Î¤/Rx€Ï9òØu{İˆ½©™ oÛ°OÇ»4Ö.í³K“óc9;´C4ºCKD£»µÅ û{Â<ùk_ök^½MéA“xÃW5]õÃ*l«~Ø'{í?DÕCìë\¶Ÿc
 ?†AH …Mƒ`qaF®uÁ q¿ *"2¤0ş’
±PÆ:Ø­Ãªˆ%Ñä>\ñfĞt6Çñ2 o‘O(%“ë‡%Š†éô9aeL´	)˜9aÏòD†b¨’‡]‹âÓ%HgP" T«ä¤*^0 ÑŠ•4z”İä‘RÌ–` ´	LOd¥àl½ûìœÛÀë!ãÌËãH’>¹•ëmM ê¬Ö&
<^E"—_'u¸ÿ²Ê xôèØ)/N£},Â"d¾/ñE-x²C¹ ;ï@T0‹µ¢@…L/_¾Ø°êf¬ Qd‹óìÏĞyl¾v‚`f÷ó¡‘¯$„5ÚŞ0U•/ÃÌ-àm 8ô‰24™‚{$5İ”»pz‚AÇv;ŠM—Ç¬É$bğ‡oü4¾Ğ:òHà#<<yLÎô¨ıÜkqŒ~Ä;ËG+å8„åÄbôi¨<Õr,	$ƒæŞjBitAY»k°ÀÊ§z˜˜BÉ`Î¯Â¤Ø´§2uu©¯,f\u›Ì¾sßÜ«u›.¦4ñèÍ^ Õ!9´Œ÷Ïb;pym¾„k1ıŒÛÕ§ƒ•¶‰µ<â$æÿJ˜3³Q±^AKÑX¯ôs&5x¨h&D'V¶à~4ÕâÁ‚¬„bÜvõS®ÕÔ”?0ìf£÷ûbdîNò ŠÆ'e5È‘W^Öñ´¬Í™ö|iö	®Ùeº²ÇAïìt¡CNE„õ¯ş•ügÉ{C)Ì#m¢¬b4Œ>HñÃ¸ÓÓõáÃéVÖ¡…µ²‹°Ñ& 5%ò›YÀt¹ä÷3vñß—\+ÎAØIÃ½:É!İõúå¿3  ¹.OùÕ;†…W²ìÓrDQ11¹/Åİ İÂô¸H ã4ğ¿
n$ªbóOØIL–”32ãÉÈC GúdÀó¦Âœ ô#¸q¦c-ğ·e<uüè|w#.:>2ï…cÇğóÑİøÌ	ˆíÑx„xÔ ´ëV%çìLRù}†ÁZ%´ØÊ%÷é–ä)†iÀ¿aÇ1åÑ¡Äîû5al£¡ikS™CßAŸf_Rñ‘j}6X KÆÑáî kÃ©.4Ó‚Õc{obŠ
´G{«½z`gcÁ}CÂçàI‡ô	Ú#G¼hNS„İdÇŒAgWíÈ;«'@õ&!¥ëBgÀ ÍIˆ¿ôÕæi‚#Ñ0à¢YV _ZW¸p¹7ªÌºİQ	®ı	ÀG#ÖTÜzÂ¯[ƒ¨dbâ«g]µ^	¹ÙÎŞŒé*+¿€Y¶èõî¶Ãø/Ç—ßO}ıR§?ú3„ŸÄ×/§ôgLLúÓ‡Ÿä×/}kÓŸó/kšzüuèéCèËûÇ_¿úğ>: ºÏ/…Æ³ŞÒ§ğÒó±#ƒÚCšË·)wËJVÇ€Ï¿ñd¹¯d\¦ÊsGñ-Xœ[ƒSBlºá_=6ê¥Jáé±Un<µ¿@B.¾ék½/uğ€àjöÉ—ßòèKE«aL¾¬‘<hÛØ-‹ìbQ¾@ÓÍ"_Ğ?áFwĞá=²
yÔÛ_nÚ¥=Ìï òô+å7©¯{¿ØûUÔÈ+Yi¤MQºÇ_D~¥’°³­Wˆ".ƒMôâ
>J°Š&ªã„K¿p¾„#®ËÇ6!YuİNÊP„r;r¦#ù[Ù¬#—º»ùÔß–Fà9yùäÂƒ÷@E½f;qfõ¸Íä¸
âÀ??ûü‹ëÀØª'$á?¿ è²6Gö+á*&İƒ‚¡/¤Ö
tkY1ˆW„4Ø1m!WHÖÙ¶b50µGcÿ QG"ìïÄÅ"øISÜi§…«_µÃÀ ãIPXÈö\‘GQMDTR+€O©Qö'×
çÁXÙB±\(¤ÜH¸>ïÂá‹ğn´!îrpábŠ'Cº¿Â%Ió Òí nÄIó :ö§xØ2€Ÿ„N¢ì*IG\«Xÿ¿""4OÕÔÓ¢ö‚4vN¿âEu8‡ïÌ…w*™™*´Gèˆ¾»6/»q¼Ht«"‚c»çAöc‹¾ÿêğäÃ’Aàz®{‘©áÒø±±(µí½î'qš›GBúä£	”Hàû‹Ğ	.‘Å8‹Ø£¾ï±şzØóÈÙ	b l õ³ó
ôI Ozé70 ”h—ü%zñYWı)\Ò^&ü{ìÆfà%Â²ù3;
ÎìØtº9ÆÖ…?ö¢s;rìF²e¸Áòš^nyİhf kŠ(sßGÀšØi°öÄˆ÷4t¿˜ãv&A×ÿ.N¶îyŠemP&X#"Ë2©¦¡c7Õ›dcJ7ö¶ß +²†—êM²:¥«‡ü%<÷Òò‘˜
Ã¬âĞ•8cT+ÌİF²vò
=íNõixÏ!œ~%8Äà`àMdÄ‡y€d·ğk_şa:`áJ.ÙkEd€Ûq®¹GZ3ì=)
›ziN8KtP£«,PiA?·Ä£Øn¾IÔ¦7Å|C˜`IşI¢P\?ÂOÁ%*¹Ğœº(oHÍ¤d7^y…€õ®ø>¾ğ¥¹Úó];×i‚MËÜäc±RÏ\6§ÛtfäsğKLï„ÄŞy,]rm½Ù«4b¢Ã[çÒGlâÆJGvÚ;ßM_[§>dré—-“¸lGvøä¦1‡|sÚËÅÔ¤Ş%ëú}STÈkxó8æ·“1¬N^üÓJŒ‡jÒdO½4Ø* Ó¾YTÁUË‰Æÿ°Ğ‡Éq l¢7†^ÒQñKûFî†¸ÏÛ”ºYbØN6$“¹Èˆëg‚ß‰“	­ĞªVïXÆYÿ¥N¯Zæs@	?:5$F‰ÉvBé™1z¢D_ÕÊÓcäàé¬ÂG¾<î?EŸ¾üå·ørì±•ü€e
Æ§ØDğËRXÏ%¤¢!ÅJ+$û‚ÂœÙÏ~†ñaşfÌ8
„†³Qıô	; póéËGÇn¿.iDfº7U›ØsO‰ÄU=ü*æµÿğ	Ï„l£ƒšİBÛIh*ÊlŸ’¦‘f“¡æeES}&‡X(—ÕİXKRÄ‡ı–Ø¹+!ôÜiXx³01Q˜
}Â2Àì·©ÇjNgæŠË«ÀÓ‚?ÂÛR±ÑÌgH"Æ#Höm:Öé›‹ÎH¸Ìzı£dt2seúU¬çU0¯4Òuaÿö ÍºÓËš3yÆ(ÌQê‘€CÂ†
ÛÛmí«Cà¸My÷mË·ç\·$cª "Vb³2 ,PÕ™îæ°u­Š_®{ëQ<rÄ’3ªCò†¸Åœ›'õJ
»LıdÎ9ä#$‚ùèâ~:Q-AYb‡J	Üj„aN­OÃD‹íé|(ŞÇûïç8¬pÕ°yı!œeı&†çm2çà
ëK=X[T2*	H="³ (ë¶~@“Ë°†‡+R.ˆÂñ(à„ëíÁŞuìÄ[/¬w Kï=˜tjE˜íf¸…q•ŸØaX\0¤ôwR›p9MÑüıyƒÎ8ÖlyæÁâ¢>G,Ó¨Ì²c$wucù'pbg\È¥kÈP” ×ïÀİàğfÅù+o#{Û$üÙMG8‹–¢Œp6¡}Krl	ÅÁMà–XŒ`‚µ+{O¶M‘¨€ÚÓt›w şñæ¶ë<XKêÖkfĞö3W?ÀT€0¿Ì,#!rĞEHî©ßìÉ[8ãµ©ÅÔQr§›
ŞuD²©¦]Z‰ìĞ®Æ'âúôß/IşGæşÃü3Ôà­Êşá¾]'ˆ°ÿ4OQ¢®ÙQ”œ‹c~—İ˜)÷@l_Â;S±c]ˆ!!.‘p@~âvğDE¼ˆQ"²séå'T§=‘N[ø}é'1çä‡Zğ?_ò¹²‚5kuæyt&x äÈÛFÉoèÁß¥T¹–àğé×¯BoOÁ ‡Ä>=¤ïß¦|Ú³MƒÒØá2ÿÔÍW&¡[¬l|ïL€•x´„{
œ£ğ8š"Tƒ›£ÊÀYx}ÂdW‡#
÷ò»|‡îlÈZ†EmŸáè
ºÏ{ÒĞøy›Èí°ÚÃF ôŒ0 ¶ØlV´á.ÃB å3úÏíA%|»KØ;|7•ÿŸ´øÏJ‚+öŸ8¨Ø5½C³îŞv¶ár‹á ²_HAQs²Hâ—dó´âb¼«Ş¯Wì´Ğ³±úªû‡Ğk
;.Ù³–¬®—Ü€ÌAÛÉn<É,[Pµ‰‘"Ğj',²¥†“Á,p§Gm,È	E–3YÍ>T Á“¦Ò‰ Hànß”À†šdˆÑ[b@ùT~ê	Ïm„æ¶Bã‰'[…x"L]8ñïâ”oNqe{ÚçyÆÅ#äìØIêæ£ÍQÆzÏ¹ßT]Â¾L:É'¸Àã†S3œ#w|<†îÛ×ğı§ävÜ(,h\Ë^êÜ±uéÓWKÃüãİøËk±÷ˆäxûä1£u¿r¦uœ5ÇøÂáÕ lÅcŠ*UÍ ŸoÉùÛH6{‘Ôqov55¿—ğ>ÇDº€#MŒ•@ì Â'@ı‡%@Æå95}5úÕ6şCf,
J>éø:QÀ}ÔØu¶Ò^Ä²i¼«eö÷¼l0e*ı‚=i‰,	Û$Âg‡¢¶²±±(ûÕfÄ¼-
àP&ìE°g¼¶2±±(û•V­ GµE>±Z~ôÔØ°İ !1G²·Áİ08¬Û)Á¤{ÀUPmc¿GÆŸãâŠZ¶åõƒ¾O`N+$ŞˆôÍ"c›Úo Ğ#zß 0Ğ¾YÁ>öB\øÏ§c’-µHrûA‚õîbÛ¤~Á·ğrÛgf}—b†‚Ø¹JÓ×Óª:‹)ğØ2 NŞc®uTº»?¾ú&è¯B|‘É›+%ø¤‰`:ÍØ£C^TÇ„,ğ\†X`Ÿ\Ã%pãÕ*<e—0”n±Ã¶æØ@9	aIŒ‘
•qÂŸ¤#Á2 ì’æà:ÚL%µ5.9ÕÊšÃùF½@ÛóáäNW¸€ÁFv/„laä'¦»^·‘ìäğó,úñüÿÂ/E4 ‡#’ƒ»½`¸ejÃ=òè¹#ÊuI_`/ùÑ¼"9{KÏBÇ€²F?¸D/©
‡
Ÿ&ùde^óBí¾h–£ÜÕ	´ì‘ÇúzWLsGD}G<§üşg]q{«îÔ„¼W³Ê\°}èï‡·§%œĞ>ØJŞ&µ˜WJ4R~9¹ÊØ9Ò#Â#Òûéòı±Ï+ŸÀ\Vå&<SÃÛÄŞßZ(;Äõ•şŠIğ5ğ2N?Í)€åœ³ll®míáğ~¿z;,=‚N;aØßOY—#à-Gâ)ë~ôÅs\¼7’Mò	I
}60bi8(‘vûñæ(Ë.¸
Ÿ|G^‡‹€xŒóGÁ×]ùQá(¿f±2Aö¦x§
DY2z~Ê
~!¨ŠÃ‰ó’
ŠƒüG<Ú˜ÙªsJûµªş!›«"üì
r=OÕAHú>Àï“Æ±	vó²#İ!
£Q`Á°DLa<æ×Ò1 qÓ¼sZÁ
?œ«88Ê>é²'Ò_¶¨”Ì´É‰~È_€ÎYr?â&€Âú`lrˆ…üÜ…3x/b:ƒŒ„rq5‚^w}ŠCÇ)<£…à0ÆíO»r¨ Z»æ°¶¨X» 1dsô(¬£Oñ–]¸‚Ù¾Ò¦î®,1S“-È“ñsäĞõûd·ÊEÎOIJXÛq>ç!‚ÊÈnà=GÂ”A
	¶Ä9g}r"ÓÅ
E…[+µ=ÿá1¬8 °+÷‘
‘œß¾}äWOIl8†Ğ~¥£/„“÷ªfo'ò\`L†oÄ'9!ş¾Kµx@”h3óå¶\
áQ5lZ0i¶ŞÎ²{‚w–})P»íd¡ËOt9ãıÑ{.ExŠĞYo¢,¼“’íÕ~DÊF
à¬+š
‰'ù»);›1,úÌL¸ !öSÀqĞğôfyjö™ÄûÂıÏ;şÇğ<?›& "İîÚã®[
®m±ÜgíÕ?6ó §ş÷6¬ü¸è`š¤nÊ×†‰<}´öE ´
í<íE_·Ò^„U+Tf0¾%2ÿX«Äù.—
aÏP­b# øĞÖƒ…¡á¸şÇÓè}"sGx!óÅŸŒÂãÏ?*Úüç‘
}€~a_"%€¯ş“ŞI:19œ ¯^à°Òg|Æò1ŠôÙ“Û= º¦aÔbŒœç›}"ğ 3GKB¬/5'ÓÉ€Û_í¶xÕ\ÄÎOzş.[7ÃÊÍ Jüë•
ò°0bşO/K­ÛëZ©0¨õÃ@G‹Vu´†‡‹Ê H—µbÌŠG¢„`kŞc7‰üX9U†½ñMáú®9ïŒoÍñhõp¯Ì{ck]«\¶/gZÎÔ@tŞlİ4‹·íÌP:Q­¯Vëıåz1y0Nj­›V3zvqRêÃèµÖ¼,^Ü-ëµ»ÊË¢;Ğ
zu ß%ÆÃQ'£¦DmÔ,6—ÅÖù°U8¯½ŒîÎšYıá¼0ÔVú´ ÉíN¶:oZã‡HTUòÑõióY]_,ÒóèU^Éez³‡“‡éø¦Yè+“´/÷•‡Ë‹ûéó:r±ÖƒUm”©k'±çFûlıPœ­ÊF#U¼ÇÑÂywôÜî¦Úz':8QBö|UEâİdù¦S¸œ/ºÚé"6(NšëâÕú¹]¸¯\Íb½Rª4ŒéeôÔ˜*Fïa<¯•«­Y¯nM:¥N)Éœ/Ë‹\õ¼ÜN¦*m£ŸIæ£òúÊHÏÍ—è İïª³BÑ”b©û»—üíõEO«7R•Óh²P]WŒæe)[¿]MÕlé§æI£’HÇ½xÉÄÏ3™Óú}u\«Ï/sã•6ºo%3ÍX|Öœ÷;óE*ùp¿è”ï#…S(k¡§¥¦Õ3}ÜQm8¾Ôû•–Y¬ÏN^²ãÑ¤gÔSéIú¬Ñ®c/…»©9<Ï–ò}"Ş©5Æ·g­Äìr}Voe.áÈ˜©eû7w÷ÕÕ:ñÒzMïóBk4~-ô£ÕûËû~²Z¨&ªÑøÅ¬ªõ#ğC‹¥9kÕµÅ©–­Ç÷ãifÙÌİwb}­6ÌNÍÂbIVgå—æéõíó("çF/÷Ïzìåâæü4{/ß¦õ«\¦1~ˆWÛëU#u½?åçÑõ¢ß½Ë
M›UÚ'¥Fº7Ìw{ù~>{ZÎ{ÕuIN”Jcp÷±¢©yì6“Ô+ñY55Œ•µêYötÒº«O§eeW––Ù˜Ÿ%½â%è†yv/ÇJ/i}ªÈÅ†Ù¼œÁİ/]9–×âç¦\¸]/¬¤9ÍçÙy¼İO-_ÔAm²\¬rƒó~V9¯ß&®›æmz}ßŒ–úÖj‘Ïåón÷ånÊ84Úë‹uïuıru
Üê‘lõTÑ^_ÕD´ÓN­«Q+×Šš±¼XÍKùljŞ#½¹us{Õ<O—:µÚ'ø
ÿš
Üö±)jSŠkubÄşu6åì–Ø”ªV?¨Y9Ş,Ôo£ËÄğ®–:›öÏK5­U<¿Ò¯J/µrtj]}­Õª/•X¢4¬i¥Üuù|ÔÒjÉÎk³hoO7—…E«AÙµÂúºV3gçgf_[›÷FÚÊ*‘ÜóxqQî¯O×ÉÉÅÕº—<,Û£“Uyğ İ]•fgùÅibPºYÍ^¯«ƒj´pÒ;?»4:/ÅNñ9+ÕT+2\kÑ|æ¥ºkeKÑö8}{3È.†gƒ\ñ¥ròRj¦ŠåNÖlå›A#³¨Wi­d™svÖM&†J÷~•{]_¤Û5e¼>Ó&§ÊƒşP+>ôZÕ—“QáÜŒ?$;¥Õzè-}6“¯/_Œî¨®§Ec8V³ãÂà&µ¨—æÓ^Õ,¿¼¦JéT¹zÛlŸæ‡-3UbFú¦®¥Ù0‘{.&rZÍÌk·¥+p†õ‡r&ÕHÍ…ç›öjpŞZ&ªæy¢][¼Ìı—üõK_‰V"«úİéuIm5_—Ñfrp5M^Èë¾ÜJ”RÅôà´<(goòËd%9+œfÏ/§¥dáô´°h_¤ª§ƒzşä:7/ÈBL)FİåëK":(^òõû®œ7â/Q%uÑ/$Ï¬ÅL-ªõtnÖkETå~R¸K$xì2)+óŠ–/İkëödu™ê6ZÙ‡IÊ<*¯I++tRj¼sÑi­’ƒhÏ|NÜNªæğ¡1»šB1ÏOÁ×¿©]ÎN³ÕªdÕxã6­_6Îò-ëòô\W–ÙI³«İ'§Å“û‚–.ßh¯ÖõÂšöîÎcgğÕ´\	–ûÓõÊm¼Ö_\e#·ı~cqÒ×äô8™*µSİûÙs­v»Èñhï¤~ùz]ÜœU½õ²œ+]§îÓ­QölmÕ.¥ò´û|Ş(6ë§%R±îS§w·éÖTé%¹—òõI£{š›®¢õûújPÏä£Õóuj›
XëúøßbÎ3 ™Ån^Ş
¾×Ô_m# ô»Ïùx»Z//×éìMæä¦RoÅåÎzU·J­Vyx÷\z¨×&ÓB-ù2¬D¯O­ÁZi¾ÜZ¥V®UiåÕéù…Ó›ç—•ösS6+¯‰óVÜ´`$z¶Ê
«[Èg'éµ2ÉGÒë³eû<ÿ’'W÷c+ŸO³F6©õdıdñ2l_ÕÔn½ùº¾*¶çµ“d'µnß7Ç¯-}µL÷`°¨Ÿ]Ö«g“úC.ú¼ªÊ÷«z3{’™tãòi"Ñ{5ï—kí$yrŞ_µkÍ|9Sìâç7ƒa£X*ÏÕê¨M¤
óœ6»é,RñÎ­¹NŸdgËóŞCJ®W¦‹+}ÙIŞF;İSó:cô
§W‹èKg©
Ô…‘.=,RıÎÉ²xŞ+]\U+uxoÔ•æĞH¯.*íåm«g^]\½œıI¼İ©7jó‹ªÑŞŒZ‰jùaœ»oJëján”l&–İW¸L¨öå¢T¸êTê°)­·îöÚóÙig¹Ìj«hU5›y53h-n¢Wz£sZ<œæZíü>Q½f_’©óá¸w;éjÑF)wvŸªê½e7Ï-Ê:-×Zfïu™½möôe¶n4®³Z¤kÕ
gFá¥Ÿtkù
Œùà%ÂúÚ­Ya¤\¼¦:ùH¡›Í7bĞŒ½ÅM2İ»¯—ãg¥ZõF?ÑÔáèµ°Î´/‹ñ~¼+ŸGbÃÈÄ¼l×¥„œê¾ŒGåüËÕIïÎŠ4ôÌôvP·–ı3¹õRUR7×Å¹^0‹nI/&åDTÏš£B¬™ÓVVÆ(TËj¹ÑçÔ«öôvqRÎ¿Ş¾f'İšü0¿˜›ø™e‚zŞ_§JsY•Í»Z{=ÌÜ?'/JkC_-{åÄõó©vr»V¦ı«æ¤şú é‰F¯šHŠÊY5~9MSk´jh™»u£S\OÏà2Æl!³¼Ë÷&«F®ıZˆF[•Z§y‘+.g£¬¡
ç‹u;Éæîz''÷rşôDI·Ë³çòéìJmÜ_j§Êùóİàá´È\^,£/Ök÷ùvİõoZ“y-
Nıèævš¹SÍ‡‡L3>lÓ×|¤rÛ>iåŸÛÏÂì¼¦ÏN¦İŞÌ¨¼Ô:à¦ãç—-y,¯Í^dyë¦Z±ÛIE‹>Ç†¯íF¤È^%Ò9up½x˜­Íì´–­÷Sw×÷µJ¹—6óælIGâU¢2nän®^3'ó»a­Õ[ö•ÎóM¥©¬ü™’KeäxfİÏUÎÛÉUiœÄo–Íy®TJMWÍáºŸİl30g›ı²è4…®Ö®ÿëdáN©Üv”Êåêá®“ïò³Zµ9íŞİêåŞ¼Ş¾ÿ·æü†íFlT¹¾mÖ45Ñª_ë…Z±\¾™ŸFï3™ì gåÏ¯†ÎÕË]ìõD¾‰×J)6?iuoãùJ¡¤'ÁFª§éâMñæÙ|íÓÛ{ërpRî/+å’EŠXUÛ/­Ùõ¸T
Ùó_ßj\qŸœ´,¼WŠDÜá†t’7·B¢3MÓ®¸=A
Ñğ§  íÈğÍ |Îüx3"òï=¾w¡²e›©8ä2Ô9J
À£“S°‡Àñÿ dv×b'+Å°SÁØ=Ó¬B,†D‹ñåĞ¶i¹—TóágÇqıG¬
”Ç»~CO®Âºî¦ñ’÷§÷ì’åxîF~oY\¡
Êùét#z‘ä‘EğvƒD:Ş¤@C8¾éZSWi|Ş{TÜ¶od

Û\l4rJÜ^dpÒdéCĞøoÖ&xeèÆ25Eı7–
¾©8İ]±=u·ÏŠ{0K¸æ&•qÅ‚ô£`8]¢:kÑX±£æ<°Â®Y=WWûìöUXÒ"ßŠŞÇ<ÀÉ¾ÑñYàc¹oP8‹Òœ>8AŸUç-«&=vÖñ¼°¢AåÑû_éåóô"yÂŞ°5U¸C•í¿Dc#Ú†OÌ‹|DóŠ”ƒ_?/Ö~†MGÌGòóäKxt”ê‰6l ó-T®ë6ú…ıt„rT4=Œ{ØEºP:ç®Uw›Š/1
†î¨ÛØºvrüˆŠÁ}:@÷ıÚgËğ]ØA]WH-^Õí
C3Fì³p‹ ÷J]±A„¡b9Ş”éØs2Ù+Kb6Ç¾»2@b%¡Èö×öd·!{÷Ş1àªO?_xsn¼Mù	
Q'
½ß˜tå˜ë[/§«lğÇÖøØug+^ëÎÏÜ:7ãK7S¼×à¡Ô$ß&.aõáØ6À‚4–®mSï2d5äRpéÛi~[øƒïÒXBDM
P¸ºÿ!MıE`ê‘DmqPjñæA…›¸Õ‘<ÄCÇ;U‚€Ë¹ü2i¡ßariÉ¾Ïğúhw}7Œ2pwzQ0X”ğÒíy.o÷y’G÷wxÏê¯@üälç~×W§æÄ³5¤‹:OI-O&İ*ib?ÃÕJ¼è¦yÊ®ıõ`ğîª@;¥T…~¨f²b=İÜÖ·	I‰à
^ÎM6lì4MH¿ån-+½R7Ô¢@‰C%"¿İmE-øù<Òü<Š`§óCÛÊ¢ÁU0=iÓZØ¥4vçõÊJäoòvüˆ.É]Ú ¶@^È¾K!‡²I3 ¶[1ÿ†V²™ş(üF;~ÚĞ’/‡	¦»”Şûı ÷Á„ĞÎäñ–Çaİ—ì/³Šz±qÉN1'zÀn1F™±' "…Ûâr?Ú9 N¿An|Ú½é7\”#şà.ô‘ëMúº‹K¿óÍõ»[µ’„7Š¶a£Şˆ£¾]‘Ç¦£6ÿtÔ§8
NE¢]ö—ş\$æ”œÎÕÄe®şãx»6Ba4ª¸ÊèıÔÂÖ™ŞmíÚ³µ•üüèGâ[`U¨êÚ€8™¤›™˜.>0F¿Õl¢!ÜY‚`„/_lóû}Êñ=Úñn£jĞon¸À¬’¼µçÚnÃ«¯²tUì#v×P_g°w	~È™l\”MôÇìóøÕ^ò)ö÷i@L>àDâää¡w3&T«Ò7ÌO<h´ˆÂğ¹œÛé¬J_Â—¦ÚWÁµê©¾’d¶ÄQC-˜‡3ÂBˆ\²u_S• ±HñD·	B‘>R2uó\ÊHH1¾Hf20ĞÃ8˜~`°}› „bz'¦
®ùÎg`Æu$‹"9êoÇ‡Û1kÕ‚O¬Å6c{úY|O¤M2F²¦Ğ–*`|&Ÿ4¼»êˆ[!QÙò®;f‚Å hZ8c:cvˆo aà~]_¦šY˜@üÏ›ûËa¨ ‘¸ÙC dB£*M‚à#DãˆÎL[×Gmmê€»‚o“Ê°ü(fI%¸tšáçSXGÁ¦#vøªX¤ß°-áG¤pä<\ÆpƒæŠş,ô
ØÎ~òDƒİğ(}u
V›Ğ2ªÊ•?¬]ü:C@ÜNø´‰Y
w ã.x±£u ò}şÅUM	¢<’|‰ÎC. Y7~ƒ.h›%·ùšÇµR‰ó¤áMøº^âñ‹ip´OZÈ4ÀĞ}a§¡„/"Œ¶‡ÜûÕBÑQù“˜ÿ«•±óBD‹Êé	y±'.¸W Ş‡ƒ;„Ò+²·b9øo”Š
NÅ¢Ï<_úfæÇğç{JÀT´í(G®<ìê÷Ş±“íŒıË8—gwÛ‚eÂ_Ç1á+¤SLX„è
¡Ÿ V-Gÿé±$‚â¯Oşƒ¿6áBá(Äã!Oïešoëú–C!°´zí®§8>á¶…ß›+‘ÛéĞİ€m˜ƒ	_?Ü…¨g[\yfé@±ñ°µ4oğ*"K¢ğ¹`üpF²ØĞ èª9yo‘Å>8YÂÜ3É.3äÍ&Ò‡Ô†ø-ˆëÓ£¤Ùs+?S¶íÚ±? =øGnEE|ßQ^YÑ(p°Ÿ˜‹/ØóÎãù¦=?¹çÚx/}İÖş
r)s¹,äqËéVL´«Î.bMX:ÿh 07kæÈ>¢gßûêÈÖ§†S]ÃéòŞQ¹c°k+{évmí@ªM6€£•ø‘Ãok0O.HîA4¢HÛÒšâ`çVVøÈÇo¿7»k»©v«àkÇÍwo»Óíøkg3‡
Šï<‘ƒœöq¸Š#	E¶Ğş@(;‹„ŞÄ[Nœ7h	ãá±|ş¯†ÊWõìX5TV‡4˜Ø*~V¶ƒø™ò£ËSäĞëó?;üÿ0S–=Ï &¼(ËˆI)v'»+AÄÜKâúì¸$¾;nP§>Î¾<NŸ¾QµxÂwÑ“P¶o†átéTÃé[}õ4|ÃÆ$rTé}àçVY£éé6IÖN»eH¨ì_Ílú/È®}_6ïÈ6†¥€‚¬ê°kğ;¤€O}Ÿ$—]ò	8CÚ ƒ$›Oã)ëz‹¥•¡(!
Á€iae›|íïh‹o“®ä(İ{’í›Úø¯îf*D«ğ$Y‰|ÈXH×#ï§€ÎpÄ;4Ï€r.ÎôÏûhv´û”`G&d @&ĞïpD>ÂlÇtSæQì½=0Øã’ ÃA\Tà°Ğx/gj^	uL¦G
l‹4`çü
|êÍ ßº Yá
B8dÅ!;úÚ'7
]ÌzğAdéÄ€
‡ .{mÉø¼™h=°ìa*LT÷I¹w)¹%wk0„ÂÄw'Âë€„_?°çÍ°©s]Úô…`İa
†I’YĞÕ3N*A1Gy©™÷©àÔ„s·ä–5pûóş$Ü³¶o¿v<¯	|'e·{ØÌ%LÂ_û˜úßDw±»J#{0É¹DôÙ¹ïÇ· …s‡CÄ€ÖÚ ¦ºKàYöq}ÑÃdJBÄüOŠÕ¸åôÌŠ¡XnæóÂø!$ª2èÊğÑFòß^hs¦l7³£\;œY)‰OáîmÎÖñ‘Y}gV^d˜Ë…¾òæ,
Ü;@v@lò{
¥²§î—*d+g0Bö^<æ¦q™ºjOÑİ€n è>¤Ã/[­İ‹ªNénü(İ9~@NëqA‰oÌ±Wè6fÌ'<®á
áôlsĞß2ÌÑ
ô¡=qïƒûÄ³˜^'v
z'6ş	ˆ ¥mãô$ü¼ÉÄ!pö(¦|ş
zGşÌ»0ccxVnÜwûÔÁgZ	Ÿ$ÅQ
"á—Æ™_·´ß'
ißG.üó`KÑ~İ"÷<åªå “nmÔ,C= Û;wS--’xµKàlW/Q[.âoÓ?\¶[r7ÜU¾WlÖ»¬EÚˆÂ¥d1;şÕ³#º¾ÚW½4±ı$â¹›Áï?1ÏÌQûÛĞqÿ¥¦.p|©k0ÍÆÜMûfrHä2”¢³[):»•¢ó÷•¢óİ¥HìXŒÄåHüI|KI¸UÄcDéW*ÓzŞİm«ĞÏ>o4>¢ÏñİUMæ‰9ò:*cç·ÕßÂPUüü¾
©ş®îıÕ;FˆÍn
´~[<V²7,ãv!LKEf›ÏcÒÍŸ}î/‘¥m/vù„ğ‹(Šğ†³Íã.÷¶mdO¸è¸»†2ZÎÁ{7æ›ÅÙ,–-“8|Bé5ü68÷v4ÓëEŞxÙd cd+&àFñXqv’áî"œ¨¥-Œ¸hîi ÷vvæ`Lü”â8ƒğá‚°„x2Ù6ãr	~;»„ãv‡Pp“†/„foĞ],B"|A±ÃLj"(šî=nú‰8µ}H?-†¯Kxİn£Â9vK½·‡ö	õ´‰Êôñ“”ÅXhÃ³;-áÕšPp{|ñVÍaw4ÃñgË>´±ö]¥G¯'9•õóÀªø.es2Ùié.€Î‰ÔìHäF¢İÖìşÆŞ±ö6R?ÿa	B´\š^ËCĞ”CP^ETô€VUuÚ&Ûv!/ínî ÿÛ³ãçÆ›ŞñšµgÆã±=Çö¼&{|Åt;$ĞI0k<ıÍŸ^ú’=Ir¶>HTLA_Û ûƒûïÃ¯q>ÙQ‘{ûèÒ%Ï2=]M1P`$Àq>LÊ|v{!ï=Ë
ÄQ~Uäİä§¬¦“Tw÷öÕ• Éûò2 ú+½Í€yòÁè>;®v¤_:yóúúº¼íP #2\.vÊÛ	@
ÿÛCÒo~(ş{ ±½]Ğ8¢rUˆJÇŠO‡4oÉIˆĞx®YEô­¡ÅqïràH÷VÜ@Ğ1ÜŞL
)Åı¾&÷ƒm=º†ŞHùÍÉWH94šñ3iŸîæ\¡·å.åóÌ'wU”¬œÏSúæâŸ!ÖÈ"çÕ:%VŒy>¿e©
”~?¶êdê–ly?µ4›ª¿ºkş;;ÛÉw›Îö·t¶Ùäåu6Ëh0´µ¥×ß¨M/´¼KLï’å“$Ş›&ı»ÉAvÀÕV»±k¼#È¿&ˆØ·Áæ[é
ûRïÜ›ÙÍÃò=¹ù'7^¿.²kX%7¬q»İmUÍvwÕ>8äNÇ»¾
McŸö%¬ãÆñ¡ºa>oêÙÓa0ıªxæ-Á\¹§Gğm6ñ¶§Ã¤ºEâ•ö1ûÙ·X|7±dp!3ã­S„abc(ıaêj¥Ø±ïµ‰öÔÙ7`i1…ÊR§#Ceqı½ı¬,TB
!†ŸG±ãÇ
à kQüDÌ>?Œ8ôıbb¼æ¤º˜ÍœÙËĞ9xˆÿ÷m÷s¥½×ÿWi1wücÏ·˜gM^éi3"_U:kÜ;C¨š›HzäcC²åí‡e˜¢ÿu?»Ÿıˆ.šÜ»¹–U‚sÏ÷x÷–º,'¯BÊ;ßÔ»fŞxë @l÷°„ånŠ“÷ã:e>§Åòñq[&GzA»Âè%GhJC&s<ÍŠ~Š3àP½)O÷ré Àİó|ˆ
K<ø[·A/ÁHüN>]äe"UâÉÔ!½€PÉÈîƒÄğ®]cPò‡u'9(XÅL£wUä'‘³oÜAéÉ¨@8	/°ä}]n¼—ÿ¼¼„Œ9ĞY»ÈJçxä,Ï>ŸÎon'óê-d{H;KJ@ x$o—Ñ^¦%P––ôòõÎÊêxÈRSW9Xù/ñ$µ<JLö!*Fh.`Ù…Àú^ƒ
è„L$_ñb0sÄM("ËBµß¹d<:¹3eiñ`oÉWN¸Kªßö¹
‰¡mğiÇ€®2Ø;I«[‘ñRBü"CGÌšQ±ï¸:Q
67]®¨V|:WFœáÉ(ÃK9®3ÎÄíD¨;ô¤iåğµ»+o„õ¥CXb…:`Ö
ÉÈÄÎ¬ÈQÍ@ê°Ö^"ş(]\JãDç–yÓ¹uå[=­¹õ»É¾mòá ¦Ít,Iú#C/øN1«^l±%XŠl‘C¿-©¨K(æáC>A#H)Ô|âÁesÒâçáÃ¾¾“JÛÁ½„/{Ø‚h<ÈğYI*¿eë÷Dïşşzk•íä1ª¾•°Ê'pe‹Ÿ*Aí…‹Ğ#w…‘ĞİäáCÏØ€yµ~{~›oe½‰ØWüXjÅ½“t´™Xb[, mu¡ß˜¼¾ïê
hëîIH‹—gÖ¡~ízAàÔpÉ[‰RvyIû?.×ÉË*ÃÚÊÇ/WTØ‰¤+B\T‹½Ò›ÓşìÛfˆY3…F~‡vÖšŠA±ª˜0•¸¡,hïÑ£•œa4ˆ*¶ä4‚¿0sÊ
,0Ğôv4P^¡uºä#ìcn˜Ä
j~b¼iô§&®ì~­˜¹óX˜º~Í
´dü£vë•vÙm°¸t ü)NÒ”ÁR‡‰f¾ï&{l‡¤TÖZkŒUò!µŒ#\?Ù«ùX˜C¯yò‹¥œŠ;ƒÆèrúœ’Ï¶­×g½­ÿ™Ø<}zƒb’•eİ•(Ê‹]WÓMöû
~G8×l˜¥¬Ğ¢+{
†0AõŸÔy1€fëkğwfØh’××1©zdéSİ,úZ¹©Å¯VF^‹,Ys¯±Deí}á¥2O eÀtĞçs/¯rc¢§#
±LPá×O]´ÅòôºR‡Ú¸ÒËFAŸOçxW^)ø
ÚR]jcU€®´Á‹o®ÒBº6:æ„Ån²¼d~`M½6?š5ö 	–[Ÿäæ¦[Ù-ZO÷’E…ƒµ› aÒÅåñ|<I¦Å½ø/nĞºmÚ´©¬ğ?¹5ï5<ÿ‰:£E“Š¶q
/£®*§šºzÜÀD%ÎArö&HÜ¬E5LÅ8¦+–~fMŸçÙ‹05Î åÚOOÒE#$äKÈe€&¦„Ÿ¦c­Õ¼Û|éŸs×´ZÑ'¹ºg½öæxåÑ‡; ö ½t8/V+ÏÀ…´5ºÊĞ¥ß3J•C ~É•W—WG_Ğá™‡]¶­„SŠ–JGDÑLÀÕ§}–æd›djø“a´¥‘JÁuü)XÄ§ˆ"ù	Öß¼"ãÔY.ê8Tgü
»
“lÔl¸?Ù·}§|±¾÷'êûy9¾ƒÏfNHŞòØâ×éÉO†;¶ì£Lvwë„jŠ×‘K–D*ó¡¼™”piÊmäDºÅÉÓÆØ¿Paˆ¤´Ä]	$0ÚøW™Š¡ë~ÙÜt/tm9	àbd%¬­ˆÉÍVó7ÃÖşP$éÏAjµ³”i11	Z×dıMß÷69“§İøíñÁ) è•â/vOğäã~¼¢=k°_WÓªš].ù¯Ó$X—x®¼©!KÑ•›rr^]KîG‰i_—FÿÕ¹›Õtv¶ÜçÆ´G+"¼O›ëzSÕ3UÓ3§ã¶4Æ¸%^sÖÈ¿3Åê6–ÀÅù¬²ãëä³iuÛ8%xvVB-»‰ÚÛMnŠ|ˆi)6Ê§`æN¯åŒ1ŸÀŒ]òÆ÷mZbTŸ|VC@_A4Gr'AƒĞ¨6PËeï
z "bt¢áÚ)É1¦‰ 6–ŒñÈ°±ì¬ÍŸl>jÀS¼“nW{q›M’çæÁÎİçæAMlOl²/J ğTáÓV=µw]5³S·|'³í£‰ª	ı&Sv_¬³ÇîlÕ*yƒ‚X°2]<$õ*³iÎOnT+ÖOÃ%‚˜ä¹^Á.=æt—XTóN=0GĞ+Ğ³
ö"¬›À¸»™y™ÉñÇkN1®é¢]EœÄ8‡RÆéB¤O¶PÏŞƒúòŠƒ2K$ÑÅ?ø›u˜ƒhì†jè½!:ë‰²Ui0uL—7.,Ó˜ô+c²Ø¼•*çW¬\İSm·Û2Ûd†¸¨Ñ†Y,·Süô‹É`¯†š¸ôU…é`ôù“›eü A\	³ˆ]»Eò Ñ
² H‘âÃSE‚3ï„j¿Ê ÛåñDí¬ ØC«¿p6¯
U9Fõz<¾¨ç1G2Ôù?Ø0ŒŞ2Ô.áÏxôô³ãƒä‡ìy^æwuûN.¦ëzı
«Îj‰Şˆl‚U†ºíŒ±uÖmj— ›ùºÈ`eÀĞÜnD
FñI|kÀ§ù¼ä·öÓ‰
¯Ò¬®fQè¿÷»MÌvW³€<´3

W°¸Ùz–h5I×_)]ˆ(JOÆâÑTlŒDãe½[_î2`¥ÍÒ¢îL[îË“ş[öÅ@£0"	2UÃN¿—Üg­2êØ6;ĞÊ‘£"M¹EÄ!ûöà¦x4[\êk¤n®¶zÃ"}ï[¹1qPı&…Æ}FÅtù
"Ä$  À¼ÈİgB‘åıåœ@øjÈEıbLbˆG0€îâ]ü"ÏjVä†Có$ áôäm‚²Ù(¡@ñÀ2ˆ±T@ø°˜:ÜLe>ã[€J›Î!IPœI–
•/L†©%+ûX€Év]-@Dö8o–Óõ|«dÂt¢T¡¶ìµHQt×øúÌx	+Ïq$ñS€m_À,–wğÒ¶%.=Ü1Ä¥Ï¸qp‰ÇP†EA+²è‹¡‹J¶aáÜ$MÙ¾ Ñ@ÑEèö…¨…è–=•k4°½‡Ñº4ÀY§ÀÏâ:–*ªmÿâBÚU	Ö¬Otàëv	ÄkW%Äh['¹,¤I f;ı%7Ùâzƒ m×f9WD#u’·ã’D/ƒ–¶»Së#oUn¾Júb[1^Gı€àkh(QL¤ºe´UX@´FÇÚ+t¹ÛjêøQœâ6›º¿
Sş²ÁeŸ`“÷W¶®NŠØû0á‹_//Ù„k¶<Ñ…jÔÙ„ZÑ@K¡‘¾}.FwáêË
†XÇìµ)°ÍË©
æ®[c­é™÷-O´¼ÖÈâ",°ÿ¡1ß/|ğÌ ]ÆÏÌctÔ[ûÑM5íÏç…ø«_üp]¤â×‘ZØğ*8Ó¢_\À>A™¼ÓÉä-xŠë™Ş¨Ï¬Våò“„Iğ
X_#5&sL–`£ÎÄv“•ü&Ö?’÷X¾Ÿ¤Õmïz4[ñUØ6ğZTg;¢>VI­6­ætdHVZl•‰R^Œ.õËuİô÷ôİ+ƒTß£dÅ |=[ù‚ÔñdR3E"Àša¹‹ƒ/¯bÙú”R¾ÎF3PÓYZ‚¨{8M¤…[úÎŠÂE«ìÁ¿+!¡
¥\ó½Šk#_ñü¥Ò5Ó¼“o_ñù
êR³êrâßËfÍËgoupÒı´FX”ŠX.ú‡ûü#üJr©tóÂÖ;ÿÕ\Ï.Î %XY~‰Fñ$*:L:{ÈA¥®®Çq]“nv¿sğYï ã|¶ÚA¸¶‹ğÁƒ–.Âf`¨ıumm‚>k>dîNwøŸ¤î>	3Œî´M€‡¨áu¸¿˜Û¸|ùP£ÁE¬û­I|ı^\ø{;ó«¸®`M|KÛú;?ÄJ‹ˆ}—BùÒ‚·Jm¯¿îÜ#üÇÔ)êºhRg‰£’Û…!óuÆ…¢ÃÊ
¶âY³¸–*¦–’Öt^mêˆ•vÇÑt¶ìĞÃĞ´cî[¹²gØØ`úE/²ªö%"6Æ
;çA bbù`'úV5×.xSÀÿ‚3*Š,ımAõºyèÒ €å¨´š›n¾é6Ş6£±.’MÕÕ·± ?6ÑÁZ
™Ö³XbŠg1wW­ js¯´¹ƒw4ëÃM%Ş…®ijÒ”ö­4¤Qš®Ò•—OÄHßRÇ¤ìåPÈ./)%ÏšêgéÍwÚ}‚ŸC†7Ÿy¡~œ1ŒØ2óB=	Gwâ:óÂ'bÿeG½GŠ/"µ‰å^ˆP\]Gé¬šÈM1WEËG4bŸ¤5à ‰âÛì–sï” ×å×
EÑÉq%å?^üÇEù^<ã:@šîui÷J0=ı	wC±Èss¾XäeU²)æÙM&d7Çì©ûæl©*	øĞDeß¤-6uê±÷'~g­a1tÌ^êf‰Ì
—ÃÜ!³6÷İ:wZ¥#îùøê¬m”‹»eˆbË_
å¢£Ïm÷û.(°Ş¾E„äÏå bWÊl«µ-qÍÄ…¹ÑñÍDÁÜRÂNÅæJvweLÆPO`R 1vÂîÚı—aë,¾3È¬çÂ¸gh@§kİÚÇ¾AìLË:«sŸ:vM”€¨+ÆJ1á,Ÿb7:±úëJ†»/~ÚÎzF°FæR
ºÿí‰:W"X}*Wşß!Dàş^‡Å¿”0"ÿx—Èaá0†rpóG	¿Ùô“§à‡O§õÕå°¦…€°A+˜[a(4ÜïD–B£!ÑÔ¸>åì£u<D	'¯¾ò)JØz,»Ï<Ã2|-b^1çÚz˜ÿ—¯ûœÈ‰ju˜Z‹¡H¯¦üc‡"­B¹)]vÔ–Ô\nÄUZ8Yîu6áÆŠ'°ôÈå×…Új_ÛTBš#~"2†ÆàóTÜŸGˆ„YÍæj TÓÈ,ä¯Å¯}-V(²óš£2Aìæ^òÕ"œÁí[ç¢/ŠwQ]Q2]>şFØZ
­‘ÀÁm3dœ–ÊÂ¤C-+÷™–È Š2§¯ÃŸ…àÏ\øz9ëòïó:;Ç‰‚Şoá#d»z7.ä—¨Ù9H²²¬xáÏòË¼(«ÏO'?©(˜oú6õÃøï5\qƒcOb·
à]P~ì›œêPŞ'mÌ#Y
·<ÉöÀíä5à"€[5®‹hÈF¢;Ğoá£ZöıbL-Ä˜.ZŠ1]¬Q·çŒİBŒk5®‹hÈF¢,E÷±d¯-‹ç´Xl8—ög¬á°WírH£R%ÂÀêÅğ Üé¦›‘^üçGAªõq(¶¢	'ÉíJá‘x˜º[o•Áê8ù8Bàâ4*ãÔÏ¶—x™HZ%
L;Ü4Œ–ğ¿¤ñÁ(ju4Õ¹¢sõøäù¤	{¢!G.åĞœÎPĞÌïd@ŒÙ÷’{l“KDÎÉ°Éy+şÎCü‡ø;Tû8t2\‚L2çÀ;R”‹Ïóëk£VÉN¨Q gR¡KÔCu É¿ïˆÇq¿ì?
sa$•· ÈóÊˆƒršLx,	iù÷«‰wKëå[¯Çº}ƒ¯³l®í²µ‚/–¶àÎW	nY»6—†äˆÒ²äjÑ{D·$Ñ-Ñù{¡ÎAè’‘;-.ñ)î—™4}Çé¯|Í‹Lj—YZ`ä(µ7Â2’—Yä“Áh>G*Å	3q-}>¹ñvÓ$Â 9Gµc¯Œ{•[3'“•0ÂøÇĞh\u‡©Yü+ £ğ²ÉĞ¯ÕHÉíÛ4X}ÌskoËqe!H'¶i¢¦ÉFè¶3—-2¯¼`†Ğ!ÖL)~Vy®øÂÚ; °Ö,Sc§‹ä#g¾Ğ”vì,å«¯Àµ¢æ,}ı yî,î9ï3Íœ™™ú‚õ¶8ÅÎ÷d>¾¿”ù²7s“r¿š]uÎ¶˜ÆvõP€¹£ÁÀd›ÀşúJç„rõü§÷sMX¸ç'â9ãçÙé|¬âK]˜ï²›Ô„Ù¸86.‹#¢nÇßçâ _ÈÊ‹¡¼l2Mj	$¿¢¶ñˆü+="QÖë?Â'²ñ7lü
ÃÆßğò7DLC¯Âã¡±ÿsş†Zt"DĞ–ŒF€O’G`³5l'å9àôªÔÛzÑY+q¦»4Ë q¶4yh{-È*hAC'Ñüb/Q#ùFĞûò4¢ùşëı6ÊjÎ'ş…¾õúx^~—~£"ÕÑH“¦^À^ü4­ˆA„
n ù÷Å&Ñ°åã¤{HäMÚ×*y„~ q¬¬«¹‚ùÄ«A0ÂWÌg‚½ ;îº½À×˜ê¦ü3ûÁ?Ó+Ëñ=®Cu9¯Ä©µ%gÑ›8œ’.`ÎŠ÷CàÆyìuS–:YZ’î?BV8ot@oœÊ§òÆ©Üªn§òÆ©¼q*oœÊ§òÆ©¼q*oœÊÿ§òÊIhãRş?¸”%¢·÷14/}Ğş"C^†ğøwıubc5
?‰¿<4|®¤Q58•Mãw•}ô’õ{âöôæ‚å½´âvD¦©æï_âÎ^D‰(Òf7ƒˆÍ~8‡9zxğ:N3¡¿qŞE:ïäÑÖÿ´ã®ÉmÇ¿…tOèu›Ãª§ÛÆé¶qºı{n/Ú¿Ê‹æZëØåøKµ2‹Ğ˜¾”Ú/ê-·p)ÔMt{ÛÅK5^ºXw÷ïrôÒYÿP- ‡È¦‹õÖòæt­ß1yñè²…o ãİ“¼³šàÆI¹qR¾<ámœ”k;)£f›ÿœ›rõìµöa[œÍbç²µÜÂ÷_îÚû':|$gP^~?š–YY)ä2™ŠëËß»¹ZŠ‡½o3°Iq™†“·+Ğ¶üä^ÏĞ£ü×,ŒòÁ¯İD\ú×ª«ŸcøİM²j ;ìùà6)Ä~{¦J’J_¤ƒ
´Zü*&‰İóø‰€íZlŸVgç†‡H`©²Á—Âu¬W œ˜üK$+ô©ÈJpEùã™rH
>ï¦Lbœ¹ûŒ(—I;;~÷J%¿Ô8²C®™¤#£&¹p¸¢¤„£ŠÈªÛmUó4Ú@’øÁ`‹2qAó­ºÄ‡_ÃmÉr,×‘z)Ëá•ãX­-Ë‹±~«ï~Ê@¾¬28…*DÖWQolŒÓâ×¬ÀÇ,d;)¦³¬¨–[Îét
âÔx]‘ÛÈÌ‡šÎÔ¡ò²JqÌ~¬—¼›ìóTê´
ÏÖÎ5ÕwşK…Û´šSLõM²|£nÊ@Ñ”±ÀØ”Q€Ü”á€á7ŒP‹×\ ³1ÔĞn…:'¾ n,åÖ6)†ğ7™¼b·µfÒ«µózÈÊÂñ†ók­õm
´Hj¢P#§ºƒØ€â,áè¾´wµòR=VCO!@°üúâ£‡\,‰¨ÛUhz/ë¤Z“wYÃ—²˜<zy•ı/z!æƒÀS¡b'/Ìî-Ä3~*ñ÷ëÄór¹Ç‰5ä’•JD¥æCÖ1şn‹l±ì&‡å|ŒwÂ?>JGƒùH<ëÿ%ŒÌDè¸«´´ÇË0-†˜*¬ìçèp—HI0ÄÒq2IÇÙÇ±ƒ¯BÚwÒª{|ªò’k,°DÒØ©"ş"‡)Ã[òe"õ$Tõ½Gf‹Ã]QL]¨²¸¬"‚áƒªw¸« ?ğÒOçÕ+ŒãT¯A7‘¼$ŠRÊ"°Ä_ ü¢’h	 êAÈOmĞ^+Nña¤/Á„›€eHëß×Uzö
|ze‹œƒÁa“w|…vì›EvƒUÿBX£^µ&úú^<ö³ÌÔk?îàôš‰Ç}"ˆ…„°Á|—0LËuäya5$¤ >—ÂõDíJ2^ÆGoDSMGÓB‘eº×ùhtZ-GØG}}<‹Õï+‰î`TZŒ@Å"k]eãÊÜ¦ıéj:GªüZ“A<{®ïJgÏ{ƒ[¼Èyø±Äf´zä&’L<dù<¯–êÕ"ÿ´T¢¢Dë:ŸJÅD§ æ:/p*®a?¡_èn< D“ÚÑ¼(  £é´æT¬jnŠPi@– 
·(ãÕ±©Ñ(â)ÑÎA"“œL…Tğ}©Îœ¬ºwh5‰–²ü"´”	µ'> ä€VƒœwŸ ¨V«-!—í0Z¯’»?ü$À²QlWYrkòD¦+|'~z0!»ä~œ9Ä¶,ÖEmébÆ®×l7 lU«óJ[,í;Øi8ùÒŠzmë QıØ~Q–¦¿úÉOYîm3’ÄôÉÕm@´jU,õEù B–°÷u—eŸñ
ø‹ şBÃÇñÚT?	Ì2Ö%Ö¶ÜFé¾/6
ŞxÃ‡[Šéh}K?Ä÷ëøÔèî®£QHª[„K²½ârÂE Ò/³‰C*A[å¾|LWÄ>[’POÃÙcª®/†`DI„¾²;UzxT$Jwñ|×(>àÊy¾NI‘çJpéÍ6Èk–ğ³­’+c/ï’€Õ…'^©~Y[†5ó)ó±0²‡"OT¾æ¯Ş’}R£Óü&bHlÿw±ĞÿUSw“=ıÉåDÎa(ã,›œuÏs¤zS@òçyW
Ï@PIÖŸG]1åÕM€dèaë]³†Ûúğƒ¾3+hA—Ï MmT¥`<€Ø<@šlü4¶¨O{Kû\*`Aœo—Á9[Ûqïê$~@ÃÃµ³ÉïÒ±hİüæ<PÓy¡ü²c	“´  JR¿Ó˜4sz,»v‘ÎæW0	~~È®³}Ó}–êÖÄˆF±`“F `¦ì.ÖüÀ˜ÈiıJWG¤‚pĞs/è¹tß»Àá¡Ğî‚ß®ñ€áğ¾ä'ä¬1ù~Z
ç†_¹ñk]‹PºhMH¢8 Ï£ÕÜ±¬ÔmèM&½Ğ{Í&=7}+ó$OùÍdZdße‹JDmãÍ\¥çÁsPVÓY2K'¸ã-\8åàïrš¼Èğ]øß°}ıµ]£Š5óõBx.’[”#²ƒõ“­ 
Šjµrğì²¿øp7¥Ê¤,êÉê$Ÿ”U–1ŠJéïätª§‚:øµæt@±Ès±¬rìd9XÚWY…ªš&rÊKÒ¤ ®¥b·¨ à†£Ûd…eÎ¶Î†öä2»²ô3[t*û)mZ^ik±ôÈØ•y¹gZ8®J®“
\më_·ƒpX¶Ùn_kh±Ù·­ Ø:=a¼+ù!/*æ]‰‡Ø-$Î@¬ıÆˆu¬xbgçq¢¢ĞËŞBF¨/Ô÷’‰PkÉö‘{—óªc¼Ön>/Ş“o~”×ä:ú=yV>Ë{—,7Ù%nMq&À <Ö¼Å³–b‘;ëÁ×$jé~Ïğ,ùXH¡¯ça‚L_ÚéØíÓåPø$ŠÙ]¤ xç¶œœÔãĞÃ/êQàN¢@0Ü,æÚ"¡®E†Ë•FíE,2ğÙÁ(—ÄhÔkËw`ŠLü«ép	ğè®œ~›ƒîœdÅ–æpŠs§Te\cI®íÊè·iùı‹I½5*4›ªC]`òeÕ®«^6ïŠ&îjc\ughİó'&¼©Â>óŠ¬†Bc'XwÑî\%í=kùN9€h•–iF—Áêã>ŒÌR{6"ñ÷UâRƒ\îQ"CÖ{6÷k@¶‡{ï°T&¢BI'•ß<r2{R‰>ß{™UÆˆÁáxŒ›pîHI‡Ãà0Á‡‘Üİ%2[õn²š‘Q7š•ÒıÔÍÚ
‡UN{¥)M‚?œÁ*=sÔpƒ²{ì¼(yÛƒ
¸^‰›*È:(uŠ—f|Ueåa="
Êz6*`ÍÖ†õÌ[æLÆ¾*@±îP¹ô­OrR«Ô  kĞc'–º¯R—:ìrRuØå¾êT>ƒË=-‹Š—ıc¸»â8à°ºîî:×ÕÍë9Š,gv†Îg"æO²Ù¨î²ç¨îş‡šm"¿Üf¦ä7ˆ
.§i=KÂö?:óõ,Xª®ªÉÎtÈ®2ßŞ‡ì&YÇXÈĞ)î6ˆ´¼4½„İµşVÒF­±"kûãÌW×¸JÙ'WÂ²ığò!XÍÏ³‘Ø‘zD^È:ñä’qsÁ#’ŞÒ?C8 ¾ pÉ^é§(2ñäı÷×[0ş¹ûùçÛ¬º•K\Ln§EşLçF®“;“[6ƒé Ê±"“1š³#Ú'×”vóà?ÚÊBÖ¦o×MÊ¬oK‘hîp¹H'JÛ`¿ñoøXçw8q^¦/ô§ò-S¿Û	¢d ‡9ÆÇ8bUİ|”…˜M
z¤V_GE€§"öòõ°–Q¿
Q€p‰b²K”Ér/åÈHÛ¨òÒ{¬Ä’."„g#ïÈ­jÙ,ºW!º¶¢“¿x qR-S˜ØåĞÃÅ™¬şpGs_Ìí
ò< y.!·ƒ›slş):Uöû8ÌñZ‚e;¨²á2üècmô-öU‹OüŠ:9él*i[_KB? /ô¥†¾Ø×J÷”´¯•´¯•ä¡º_·UŞŞb6¥ Õ€^a§í‹–Àv¡-=hK‰f 6¥ÛéäéôÔ@sê:„$”‰§x(º¹_{z¶÷!a²†öûÿ‰òî®¼—P;1,¢™€N³Ïb\D’^WYQï@ï˜&i}>lz-SÈ•²Ä…û¶ñ¶Ô÷QÔ0ø	“'çh¬ÌÊmèeCƒ :âñTLãÿL¸‚ÕêË¥àçslRü§¼¾Ø²1iñ(¬™¤­¾ë4jU&Á!ÑI¼‡Æå øêxÖéÎåòê7 ÖşÇåƒß&vÌUr«ŸVX-+ÛÖ6m95ÍnSµÂVIæˆã¼—oÁ¾LöÒP¤DG¾‡Yê³JıF©×&e=c¶„ÊÙIĞ¡n7‚à¥^¹àLŒ]ÇŸy˜|™q†2¤qñoÅµIâñÔ ñİ¼²–£Âf;ä?ÚØ!í„Ñ¸jp‡©•&;DwØ<ÔÇoKƒ„M“Îy¼eb[%&?ñf‹m²˜üÄÙ4¥Y!c°•ÛLŸj:†ğgc¢F˜~½ñ1è&˜•² '¶'šq7UÉŠÂ„âxˆ ”`Š$L#^‘<‹©¡G`ŒÌBkKöOö®½¹qˆÿÍ·0a˜I¨›4)å‘”–ã5¼á€+7ã&nkH“¤\ÃwgWÒzõ°ühú>Ã@ciµZ­¤•ôÓJŠÇy\ÿß1x6M–oR÷È†OÏQ³Éì$š"§)§†İw÷È-şÖ‡;‡GGïµ(:˜:ZÉĞu¬6[şX«ŸíªùˆÔÉ]'mW‹™²¤ÔJJë);
êGüHÕ™BRff¥Gª¡¸ÓÎ@îFÔ7³s8Ğ¥ì£8şc¼ZŠUÁèM¸69„IŸÚBš³’ŠRÑ¦g{¬A¦N78œÀbh’\$’­yzÊŠáÜ‹v1ƒÔI«Bf`— ô'#ôæy©&{	àŠğ&Ñ(^^N@İ¦³•)™ò@3çtºwü0¢`]ÎSüÖáÇ„?ãxêÀC†s4NS>¯•üÜĞÜÃ–×:‘¾Æy4\i•°rHjÇ÷2?IVç?ca”E„á<Éw°		çL¦ÉsºÌÒ{Óç:kVI8Ğ´Ä!#Y°+øsj .Ã¹¯Ñ±µ…T
OAFç"Aıš¨™>A~°¯õööÁg3qF[ìÒˆ6œ±Ë{%8ñ BâJ<‰yÚ-òşPpÉ[$a¸2[*#LÀ!ıœÅ9h}Š^è±ÔÊØº½¨cútğrGä²-rÁÍnğë7Ÿ“dƒËLä`é*b`ãÄÚ|Ğmğ²M!}6É-IFü+äŠÿ‡BGâ·¦[³¿yïæy=ß
!]n­xa ²Öw
2»ew;‚ÙÜÔ/´.tâ/o0ü½¢«†Dâ¶ ëJUÒohŒŞ“õZÁ¼ÈüŠWüï¬s[LSiïIÒCYpÍ~èCíc ;n:'ÕÅŠT›îàİTØ@y²"‚²¦Iáâ¬æ
ìÍO@èB=-ïÚçYjYfÍRpÑğ’¦dª{²bü“ÂøiÃ›~(³Î‰Ú7eIQ–¶Ÿ<!fNT±©W¥9K-ƒbQàCÉ¯¾J~•PÃ×¦´Åõ“¢__/,Œå¨…R›Óxúrk4;ÙnNÑµ§•‚¤WW1ŞÁ_œ¶áCağ'oBB^H'³8€®æğlöt6>Z^N“I6|.âøÇ9À†¤eXÎ.ùfˆxõ)QÀêĞí:Ì€Ïº1ãvÕšéS§;˜éıÕÁD2ÄS	L¦‚¤–Š,ÙJİ	
·%PÎ.­Û
8ÿ<zµİ0‰O)
#h­ùºµ_h5›­Òğœ§’Æo·
¼­¥vÆ-æa6-u6ö+=ÌkÙC½Ãé1ğ1è]/#'ƒZ¯şvÊƒ¢»WÁã¬ÒÀz¨|~h;ÚëNYècauÚé¦JCØ3)Gœªî	.ıà¿¼;'Ô¾Õ×°Ò™}wO ‰¸;æ+qá QNéîtípÔ-Ğd1ì‘¤Uş~­)ÃE2S,úNaÚÿ.¤­Ğhí†®si×¹´ s2•{AêãXÀr0øZ|ãš—1¬ñ'¨<ÁÄ—ò½€qœ~ 9ªæø”®LZÍT\€NÈG“l•¶¡ëuÀÄÌ.´’)T½\“ÎgKyà'Y©ÌèÎÌ_ø3âs²äŸã÷ÍI¸¾ı§o™’ÛéŒ“¸r×Ú_Í^ŠÎÊ„]ŠCk#¢?–btàœ°/„ ì³ILÁt‹¸‡Ã¾˜Œ¹J$­PÏ3S©Ê7”‘è|ILqH±QŸFÉ$-Ê„h6Ê†P_.Šd³²üB
Í›Ñ\9ë"^GáfÍ ºÔ±<9}­(®œÇÿ²ˆæyqlıL²l€ß(†É¦cñØß*b(÷±ƒÆÊ9ë•¼¸ˆğ`¡~	õyA®$İ•¸-åSÇ
vÃ¡"?ûÿÏ“¸U…n<»<;Ÿ^®è˜]j¾¢í;3&_î|uwÊË«µzR‰osË£UÒç*œ€
a@‡æûaÀ2O‘²œ‡EÉˆ?¿ŒÓ—0Q±[TW‡ìÆ«o_5«ÜAåY¼RYSÁAeÒ¶¥NÖó°Œ­ş Aï¥	Bp  ,I_«Û†²'úôŸÉ\½åT§­¡$Éd-I7¥¦`è±MÜÊèf|ì™nT+çM6§ä%ã7ØäHsõán¶H ¹8ºîÏæ[&ºrFbESD
'éguG
³Ù­¾¼Oğı¶p»i9Šò¶Œ‚4³—¥e Aµ<íJÄîÄÇ…ÄÇ†IáIµZ$>£ï6¬DB2£ëaæë•òOö‡<8àŸCí7€Ö»{œJN¶‡ö ~Í'~hŸı,½¨…¡YëØyC«¥^NÜ~Ÿ$ÅR­Ö«¢æÑx;Œ\*kö4´§SŠŒ³;œ$gøŠ‚­°×Ã¿a€F<^„òÈ»LBÅá‚5,›ä.(ÑĞT©èwÈ‘¿(İñoÜ“'\BØŒåÿ1ï	FÃN­ŠD?9JMm!Š~"Û€ø&PÎdË´“Iò×eÌZ=Š–1‚yP~X”µDmMp“knlİ‹8Â—
°h5C§©òú¦8–ûò•w¾€‡ÕœG
S¤të}å<RºÂŞyuJ•'÷jas½Çó=T£6Ùó‘á%¢ŠLÍq
ˆO.ON&U¸.Gb8S”šËãª¦ìSšÁ¿·W^¯,â/ƒ+
Åeèe ·£È^¨îÁ=0T&b„©¼eŒ»(
sv³÷3®ãi«ÎòQ½ö>¥{oéÓ—Vt¹šI<Ø¨£·÷-—0¯8¼¤s²"°˜KJbSqeI¦Ëd·Ê³œÈ
¬hêû¤Ó
ÙÑµ9Õ˜gŞÈF½÷¨İr9Ùùœ¸cî`1¡Æ/ôÑÁògòh°¦¹¥CÑÑÚVÙR¾<U3êIíR›´ÙÆ·	ö´8 ‘ÊÄc¶ş:U4”9¿‡Öv¥uÖ[,s:…3æ´…IÿË9°Uª-¯6>d´Ù¯Ã
ô”LóôÄ™vÜ\ëë­´ û±ÅtÛ±§Úé‚g»İmç¬
7¹¹sÉY¿}R¾°ºuzÍÓy²ÂÃöC½’[¦FÑ:‰kEÏ¤^yƒm7³ê¸¾8/Îª]¯@5$ë (•­R¡a QsZdÀ9c³!BXÍtùû¡@®üÎ~u‹D*ßL3•LÕ
é,WvV†Ñl\á
u¦~‰9x¿éÇì
¹D0î¯Òx±ô·Â¹¤t¤LC¿–(ûÿ¬ÙôMÍÎÊW<JëW˜Í=X³¹ú³µŠóœë˜®i;Ë¦ËEGk7Ú;]{’Æê“Nê!Ï­NË¸õ•gkëB“‡·c¹³µçUfÀ˜ÓrÒÚ³5r¶¼Úø÷û½*Ü@MÉÔ£&š¬9™Ö×šbU‡SáTM²®6Q[3<Q[W›¨.6è‘w}Ó´'µ¦iv9‚-g
ÇèŠ³4»°9ëD®4ß$|Ë'jn‘ê‡µ©À(Ğ|Ä¿(&è3µlÇŞà\«×+·(¤·
K¶¦|ºe”ûçK½ŞuÎ˜Œ6 î©Á£s4lM¡„pY\ÌŒ5>ÌÉúùMûa&Â_è»(¯¨Õ8bà¾Èw?r˜:q‰¬û›—ââué
†/Æ½Ä·Fñ¡Ñet!NhM!.¹*H¤šÕjÊA‹ãåëqJ1’ñ0À]*ÁÚ>Ÿ‡œöãh2Á}œapHAŸÇ“9ÕÓh1ÍBÃ –°ô©rãsÈxüé¾¿ŒÆZ6¸‚;I>Ï"Îº~Gûüİw…böÙíÑ,™×³RiŸA4ÜéÅcÑTLÿBEÏHGÛ
î†Â7á)?_Êœ´]DáîÈ‡˜È¡×NûÆ&ÏÛGôğ÷¿G»	Ü#Tôœ]Fƒƒ\uJL#ÿz/$¤04õUœdåV¶»1óM’9É£=šPì±»TĞ|ğ‡íth‘Öß‹?(wÏ£µò‚ƒù…DY.´}ë3•~v÷ÙLãå’÷¥ùÙcß;Üû†e5¯°Ñ?–ç™9´ÂÛgüûp±ˆÒ¶%
Fà*ôÊØa7j~E–xlÊJOæ´Yñä1|Í_PRí%‰R€e~­Ğ®¯¡`»–Çkòè•=›}®¾\-À$µ)oU"ê5İåj1û3&ïFbB§!$Y­­•Dø½ğàè£ƒ·ÁÅt®‰ÒÅ+“ıï¼oÅ¼Ø¡¦j–ŸHôLè}~”<•Ãt™/p(\nsÚösôõøiÉ7;ÉNßLğ°2=2çËğ…œ„¯}ÂÔÑJ`³šâİqéÒ)FQ0 GcÃüõL5ìâÖåç¾ÊïqôF×pß¶š.,erÏô,±c2©×º¼Ò$[¾NÉÀĞxA]â4ÓàiòÕäÎftFEîğ±A|r©¾¯&ã´£²ÄìñÍ™æºzã?\ûJ“1¡±ˆò5y_Lš¼g-:˜?
êŒÄ8çõ}ãµ4–§¡×ö].nbÙ[SÖ´#“RÃ±Óf8i%$[¸}gu¢šğ…OñX“îë¿”.i+ì_Sè%±ì-£ew.ÄÁ
âÉ†€gœYŞY$" kÇÉóñæi´/2!®†)¡¶‚h[•%MŞá˜ù.»üFÉVP…^¸Á<é‚·Œµ]‰AvÀy¼¸à¨4¬~IüÔú¸¦ĞÇ5…–m'Ø®Ä%OrR8?Wíy+šÏù	öò
ä!°
sØ'¾F}ÍÔ)‚$”ÇÕ)E™;W4‚[[f·ô{`C#Iİ!×ös8Şìşl–İ‚ÿVìcÔÅ\ÖëdÀ]~úKÄf>¿r¤‹ò„—3/+›-{qòàÍ`og'ø€à¼|“õš·r«àú¬œ·z*ÕV‡ŠNÙ‰i7N«¿ó,„NQrk·"»—e4ú›k‚e¶Ê_ÂÚI¨ÎS2¹’…º‘AãÇ*Î›‹‘'ìÓç(±–®»”Âæ› ˜‡á.¿^µáC·¬ œÙ®4É¶!Ù°v2{s+©hq“ŒYÛùD)wo‰b%»JÆês,¿Ï)^Ë°¼7S…ØMAë>|¹=¶ø¢N2Í
Ç£Ş0D#ÀjÚ«Œ„û®.¼yÓh-'É–\f^V$÷ßÜ=fo_eÖì§n'ò*>…atuûŒ¥SE´™–Ï¬—Lk.Î,ˆ>\sü\¦Îm¬H¦Ï¶¬åÓ=¸^Æ¶İW)¸êÅäš1«„¸3ŞÒá*w <Ç•6[Á¡ø"¡4£Ke—:ˆ¶\Í”¿;va¨_&ßÈópÀåõÇ€şÕÇ–±yFWŞAşqÏ‹PäCn0äG€!7rƒ 7rƒ ?¹Á_%üxô˜Zå±pøh@åzB7 òÃ•+v»‡)cZğM»:¨L|õ&¼Àº¬Àú~Ö{IW?¸z‰Èİ+Y—W>Àº«\Mh4bGñ?I¼«-š(>¸OÑJkõ	“•>¹0÷­¾©u™óµê”sÂ°.ı÷vˆlÖMğ$I6Ñ¦æÎ!8^à€$S'}øÖ#Qukô‡Ş,!’Bz&1m#ã™¿¿Q ¾ç‰J›~ëb¶ôÙ‡O8CuvÂ¤MMÚT£%-Ò67r¤T,#f¼%$ë®Ë.ä•K•UŠT”‹U…/èCS,­@
ÔCnåÜ—ŠÜzÅÊ+f[HVR1ŠêŠƒG‡*“SÑ~ÛwßoĞ“”îÍ'¯ÜŞX³ßÕìw5û]Í~W³ßu“û]TluÏ#±«n„5ÛLy›INFä*ˆGddÒhAr”o5û@•„nöœ} nv/Ä²/,#GŞm¤Ãñ8P¨K™7y™? È\ö^	R?l}şÈİ¾ùÓ?øï>aâÔ’#®¹J?'_lxXÊgÉx!|2w]Ç,±kn.Ø‚›{×¡ò/“?ÒzÌ˜ i>¤ÍeÜv!/‰Ù%qqQW_.(ƒ1F‘	¤ÙÇ@è1»Ã$\oYÊ[•kpè£°»ƒN
Œî»N
5<P*P>¸¸VWtXñJãZò<ò nú¹£İ-,ZX|îß€—Qnõôh¨
¥¡k¤¦€eìj6ÇÕjvò¹‰…|	â4™L¾G£dEO,ê+[=V^8u	v÷
8VWSj +mHXÒ@Œ‚ÃöÎ>‘ò$OûB’ÖÉj¦¥NeD˜·Å³[X$œ½ÉBáäMşÂ°`²Â ,'|-ğC7èd-÷jP•î` .O0{‚!¨Ùx|Ë?Ï3T]=ëŠsä=´ôª+~wxôÅÙäi<_+H‡¯£sãwº»{Á[|iåÑ	ƒ¶bßé*ˆÄË¡X¬He@‡Â·g'Q{°ÏUòÿºowZ&é®‡êwHç‚²ŸQ
Ubæ!ş:¿¡}ñ³¯åA)åïdÀ0™²q‹`ŞgàOllÆØ×ØMf'ø¶Êü<‚h­]É±S©lB~£—Ô¼ŸÏ¬¯MZì†Ìsz£r¯rü›ÁÀØìîå{¶»Ø¿Ë,w5{’xUË{/Ğ’·•ÌÍ¤Nƒ·(”e„2O¶÷lé9¡ÂÔìró¶Õô$QaR,$
M
ÅÃ?¹3±$Ür\—«T/Ã
î@d¸)PiuSXy&³eÌ‚ª
º"C"°Uü•b>[Dc¼-ª¤;µhÊl¹íxÊØv£ñX­¨góöO¼}E ÍÛ+!¥ *4ş±[‹ÕN¸q¿Có®7«×õ J]CUÖ¬ëòHtÍumKáÄß|]Sİ:•Êi
*™«ì¼¾d½¿sõ:ïwÊ«¼´³Öo$ık¨òÈéÏ)ÖqJuõÍ Í«|·sµî]»W‹iÙæZÑòZZÁ›õé*uI}u9¸õº¼AÖÜLrz ·ÚÃ‚ Á¡{è€À—Óûyê¼tPåô4pu×wOıö¶Ô³×EºâÓü‚¤Èòòì²é¯ñböl&ÎgŞÖ>ŞNÍ;}Ó²>ŠbšNúÏ÷5¿qé‰j‹>óíKXL†fuª¸Ë?è¥w£
aú÷QRëáş§Éé)éÛ7¿Y’.W»İ¶Å’G'K®§ü—ú¶A¦Ó·˜ÉÙéÔ/)u©Lğõê‘Š¥Çeô Ó“bXÕ$SGrÔªÌ‰Îv±¬ÒCÄ‘°ïzÜ•@ç~ï=âpy>³Täë¦ “GK1Ôw°²7`
ÿ¬Ì!*ø!_ ész’Â^Ô—Ë xYÊhvğnÀ¸¨íÅ2_Æ)Æ…ôˆÀrPì½{ÛÔ3Æ¶*
cBFŞbb3’mX‡®›¼Ù C'?‘P;ğ×
ê^Çòu3hD[	†ê(ë5¸YŞfUîÎU®gLxüĞ‚Ë=®ª{”Ù¼šÓû5…¾^¯­µØK ní*s ÍŠ
g›Sá‘ìdv¹dúÁR®€è–’dĞ$ hYbµDã¤}ıË~èÔõ-0_ìÓ% vkK7D fA/{_Ì!!ÉÂ¬ZÀ€)¨ƒØGâ‰Ò–ª›RYÒÑêÌT¥=È
æ:\¿€}èÜr£#h‹°p[p'ËÅĞ°é`Â=UºáO Biàé.®¾ch{Û:îyØE€w¡ßá‡ëñB‘Àœ@où$½0ÈÍ5ÌÏ“ôæÆñÖŠ7–7{ÊI†€WÈóíûŠ–7T­o¨Z |2×Nî$¥¾||D²†ïÙWéÔ‚İ?ı~ú{$p¯[ğ[Ëëu^G5°©Ø(®ÇËM¾Áf
ÄmQ{ŠTâïfË¤s2Ë"Õr£ã?ÿåowVqvó¶afsC'ÂÑ+E+M8C{ft¢–lØïÄûĞ·ä‚“ş8Š&q}ø{¹‚×¶+ÛÇü¬ê•ã9*_t•HóÍœ}0(³\æ~7[&«äïø˜pä7ñYÄ‘÷ ¡¶1éh4Š—ŒK÷zyÈ´èÒAZìißçô"®xqóX‡6]¬™¡Ğœ%Æ+
‹Û`ø£³)„úë½A³¯ R7@õÆÒÔ ªï’¾?€tGWJÖy¬À²ëÙzãí½w‡ï­ë@Ÿ¯÷…¶tn@çº s§:ÔìN'\¬ÙÜtºL¹:ª¬»KÛ‹‡\×¿…±|Ÿ#·™ó¾±fN\”
‰ˆjdwq›ö–×>nÙ8¶´l¢  	îÃ½™„s6•Ëv‡wƒq—`Ü=áòØ@Ü÷â®pß#ˆûAƒÜK…¼İÖİ@Û
´ıêBÛp}Uƒn7èvƒn7èö+ˆn7ÈöFÒ<dû>aÛ
ü|ïáç^¯  º> ­ƒ¦À}f‘=ß¸$l<¼¼Xˆjf'S	qqZ^§^…İ[x?-É€#cçêº5øœ¨9g»KÄÿŠ"7Põß¨ÿÀşõ7 v`_/€
Ãoƒa7vƒa_/†
˜Ï+[ßô\ùê^ï‹i0‚šF×;¬/Q“¡1ÉÁ$kÈf›0€×_iüØ¸4„Pùü[CTdåû)6»6¤×ó Ñ,ÉíÀÑ¥÷„Ü9kVÊ¢æ•…İ^ß`Hn ö`o öG°ß4¼ŞÜ.RgïõÖbm“Ñ"–Ç$ôIÙR@¾‚jy«\ãà
¸â¬/x™@{x.(å|rI íƒñå²ö¶f›ù‘Û´‹EHoñş–pg!½î_õ.0Y;7ƒPŒÄ¾÷]l—Ó­5b‡ûøM.Éã6a]­7>ÿ´*ã]uù=ıø“§»Õùßò«.™Ö½ôöûïZ›ƒÂª\u İÜ½WàîİC»W‚uÁ€İ<’ëaÁ>©æ€­Aßâk}³Ğn†I¬E•wô&É.ÅR­í>&@7ZºÏM@w}{€îúºÊ)¹ÁuwäÆùšàd
D¾Yä»EV±Còÿì]Ù®Ó0}‰<õ²·€”E,Bb!ñP l

‰glg2^âÄNÒ4iTİ6¶'ã}|ÎØn0ç1bÊˆi(bº[x)£¥‘h);#‡€¤ƒD1Ïœ$9$Ö8) _ä]oòea¹ñ%şãõ«µâäD}_buvCç¾ÄØĞœ…ûIWû«¼
Ş—¸lÌ 1ƒÆMAã4ƒµú‚3T\¹e¨x0P1^Áh1£ÅŒ3ZÜtÚc´˜ÑbF‹-f´xOÑâ8º¢3¼¸æ9Û„¸kª|08°™áf†›nf¸yßáæNÎ`Ä™ç}@œEf64w5c³ƒ7x¥¡™lhu‘¿¯Ÿ¿Ïµ%ğTOó²0ÍKouÓ@*Aê0<ıê;Ô…ú9êjñÚx+àÊc§JŠeb}~qªl*LªYV†=Eò*5£èš}&‘ßDÂ·ÛÕ(ìHzPÄ4é0’ìt“"òq~«Gi¢I¾°úivx¨xêy³œV¡¥Ã|(µãcáÈ±¤ó—Fÿ3˜,¨ŒPŒA9K±ÃÄú'üe£ÅVáË—ó÷Ç²ğwV[—b(ŒRº¡á d%%EÎİƒ·gé'Â
¬€ÑGú~c¹œ­G–x oíñ¾÷@33©LÅkÑ™@bÒ°Û-Ã¶Cm5i_é\BöTQTòÕïÚYÅİÛÌÅV×Ü¨pÿ¤#Ú™^‘TëÍ§?ÿŠ>[ŒÄÔDúJbèàÅ5>ÂùÜb`òRƒB}ı£÷”Î»È¹
Ûü§í4|Ğà‰*TæĞÊAyr17L.€A³vÇ¤<£¦ƒŞÒŸ!˜¿P÷Ã%êV8¥ß1w”Š­:2LôĞ'Bn«Ó×c¸ˆ£dbj¸Ÿ‡…ÏFŸ•5'o­Ó±’‘!Vš@lÚõzG=„2¨¬%<*m‹#‹,ÔC>ŠÚ8ª:Ï˜è nMİ
…W†&³âè9yª®áW¹j‘~‰c”²x¢Ç¥~Ù©ŒAxœ7=ô­ºÑ0 Nne™¯³e2Âüğ»3ôô®}2ñFÔÍ£ÂÚ~ÃÏ†/“îÌsOHÉé	Ïåœi6lÁU‰·† ç8#e†ê\–”)p>Šã[mÈ±Ş^6‰WSÒrI‰.
¿O4ôÚ3èV¹LµhB*QÍq®B¨8åİ”¨;†§aÂ²Œ\+ö"¦ødÇ’Q¦vÕÈé‚H²"ÑÄ#©¿.ŞÎ¾Şøúãkr„ˆ‡¾05zVî®UFÊRxH¾(*åÎ"±zìo×øE­D"Ğ5ØİIõû› \6Ä‘Ü¼6"Õ8[:äÈÙf„ÈÓB.Ó"L‹Ä3L‹0-Â´Ó"=¡ED TAÕİ†Ù’6˜’}bB˜ëh‹ë³¬
ôe—©Ìÿ~VN.:­u
Â`«uc$HéVxİCÁU£{-ÿ`?'¥hÇ:CèqÉBï„n÷WµRøõ öTá"»³­!é›ÀÒ]Eyârát{•U°*¯‘š„N&ûÃYx0MÔ„dÙ^Põ%Ã*† Baå/1;ÚæOÊÒ©äœxtâjr;åNÍ­ÕßÑ’±|ıXç?&zÈD9'CèÇ:xë‡ÊnGº¨¦N¦°)›£S||
vÕÄdTü”J 8“S©$UŒ‡µ¼
¯ñû:Ë&Õiˆ¡µ^¨v“¥åhŠIšh–F§i|éÇÑ?8«1ä—½ñĞ7´†y“¼É¯ùfM˜5‰'(˜5aÖ„YfMúÄš¹o’<á­&L°tC°`ó–K¬i#Ş…÷˜t5¶Í­ğ>“­í3`©Z§I&€÷±tÎà1	Ç$“p á†L³Œ¶$›œ=Úg×ÚçÖxŸ
ïSá}*¼O¥‡|‹<o‡(ıªˆt‡yEÄK;%Ôî‹ç	E™²ññûv§DÔ¥µXÁ’MTk\{À\]%W÷GöõG`ßAE©.½]
/šÀ‹¡ï²¸*Ó8EÎT¢1.îà|ˆ•l‹hù¡r]_«
è³A25ê£Ñb™F|µğRòEdaj¸şGÆ“)/…æ>z·øöc¶œ?Ãu:\¦¸FC!3óÈïVË%±°~Ì	¸Ï´óFHgøOjN6›°¯ê,6ñçdy	‡±°iêcŒYö]æå×Ğ6^l£²Ş8wHH—i¡„rv6ÇizÊTR’÷”ˆ*$­¨LúîÉÅ†Ä¢Ô} šêXt¡DñE%Hˆ¯ë#ì	_:¤§ğj‰„ î‚»R¬C¬Gàö—
#\2ÑŒ•1îôîK"~úğÈm9®£ysdƒ}As[àjÈ)˜ˆ'ª/y.ƒŠ	*PU®Š­á^ É–º¥{~eË¯núe@¬Æf²ƒºMi¿¡²mi¼ÑÄı«oÜÈ‚	#ÿåJC'ÚG`N
Û®di©/>oE.¸ Ò4Øÿ Ú÷€½"ŒÂ~x°çÁ–=¢½º÷8DR€ÓÁBm3Ç0‹¶Ê"L²0{,pç¨_–ÄööVî!}kìŞßµÕuq‘ß÷ó¯0ô–MÍ:üæÑRk›xG7lí÷Êí&“@š»dû¾1éÌ¥W¦óqéúUÿØ¶°¾Ú«®ûÔ8¢^Pçôø‚’_‹©Ïv{‘6£ÑËêg¨’Ly«Û©ÄKB¯qÔS>=}I•R]ç¦n ìÀ ìÀ ½rØ;šß»a`¹q¶„£¹JŸGõätM|Q"Ëãšb_Óå½¬ÄK£-‡ŞÇíÎ µb\ÀJë•äuÅ‹%—s~,h+:ûK°¿„å/±†eÁ;èş(]ßÂAEûòéê›Q°òTK(ET)†wˆ¨ã	,ÄŠr¥İ/N=%°ìbWzì&Ánì&±Q7	v’ğ8Iô×EÿÖ·gØEbG]$ØA"Øb	v˜ƒ¬LØG‚}$B­/ö‘hËG‚=$¶æ!qsõ²î÷ŒØyßˆm»-|X.¾IA"ãÄ°Rì?°Kşgìş`zÄ»¬	û~x@Êí:x_àúP;}Mâ´™ÏP©4@ûùóm“¾]P¾	‡×²æ6 iÊÏÜ%×ƒyÑÀQª¹Â†x21ËÜı›16+¨hO@zêkQìV|ÓşŠ†š[¿Y«u¢]Í–¢‰"šïJlèj–TÃÖ£»00]Ÿ©ÖGôğs$¿üXüV_@ÄÈêv•T“0NN&ø…o;‰
l½‹uÓÉÂü*æfr†ºœ¸×X¢ĞÏ¥E£]ˆñ0/	MVv¿ñ@,ïPj}*½’H—ë„Û
·0Æ’×Bã{4pgp»gˆç0g>¢35XÔ45)gä:Îb”O.ãÀïaÀ)|q–ş”J-òóè„úröşó*u&Ÿô'¸çÍäËp*Qy9	C©®†é_ÍÄÁÛ&©6°¯Cúr~•ŞˆNrµˆ>2ÊY…“.¦lcÈÖ¹T6iĞñÉ2HXä·ši¬ä¾úz6øÉ1x¬:í´ğèSŸ‰åò× ßeœjV9–‘N'u
Ì.‹uÓ®À dµ±Î!­QÓ?´í
üè·sëËĞczúv«’Ô#úErªˆœdİÅúg"Òğ¥…Ğµ'”Tà;¶£òéPÊÁæ³÷ó»ßãÑføé¯fïÛFœŸ¾“İg3›ñnf¸™áæ¦psí’Áæ°™a­†µ6@A€­‡»saW’Ow#Àtvê	|)c`l±X”HsÿlÒWPÖÒ{mşìPÁäãJ–9Jş@.…ßoq²—líK&ú&¾9F%'Òùßî¨÷-l<[X§Ç“ÂÇ'’Âª<^øXTq>º
ùÂA>rBS)šÀişÄµšağáCÃê;Üs×ö»·XåŞa¢LTP]Ì˜ÒbL>~ğİCÇM› ¤G¹_û†@¬JÃ
Ì’d”¸g—øekY
|ZîoMØVŞßóƒéÀqĞT!A„¶„fßSşÏ´(D]Íğé@àÓ[b²€Áh±I5ê8£ú˜ëv×1|DÇ;Ÿó¿ö
~™øëÙñ…ƒ!ƒ¯…‹FUÀP~Jƒ±¨®’[*tü*ÿaãf6l
÷nîõ`»bJ3³ÌŒöQbÁıdş~õfÉÄ|Ş®añùe•şÃåF8pKØë¦@˜ò¿¥ÉûÕ\.…uéÅömø(1ééL¼wa
|ê,7t0‡‘…ã$SÛ8ÂD‚Õmú`†g$–áTEFÜë¢­XàxÜ‰u™»¯P²
vŠùAXJâ¥G­À¬ìP0Äğ ÑPÃ&”Ä[qÄO"ÄŸ{³ã°ø¸+CÏ­äHË¯HûÉ¶´7Óõ?·-ı'ÍôWÚŸß–öçšiÿŸ½kon£â÷[f ›ÄIì”—ÓÆCúŞÍ@è0c’KâÖ‰$†éwgWº½Õkït¶“&Á0Ğú´Z­¤•´ÚßJ2ïúRú~sµn¥A×Vt-`D„V@;J¼ù[í¿v¤w‰-/¶×Î
J†­e]/zDÒÀZ(ù`G õÁ
fœÁ-<˜+/p¶Aœ€[˜xSuåÂ”!TÏËûÕ.œß†oŞgRw>ÙRä¤Dçâ0—îˆ‚%H]_ ÿu Ï!Ûne¾VæÒ#ç];wÎ]íjo#üŞ…«‡úçÃü·é¶OÇı°™¸¾=¾°üîËàvË¿Ó-Ô½€iMö$}Ø.|Ô.sÕïµ#vVÑ17ÿª©ü&lM’šÅ¶IëQ^œ‡¤àîÅ%Q½ˆKi±ó]± úŒpÄ¸½„tT_VT.›¿úk1ºÀ³l×+ã>º5´’©Ì¦ Q›–MîüÒÖ6ı!`Ğª¢ñ×à•>Öí^¢^;tåZ“VÕÊftlTÑn_F
2ß+:W)MSU¯tßƒ×Sm¸£ı?¬Ğü{Å><­jdG±È[Á²ôô½ª2†ËhcRiòø¹å#¨Tq—¸³å¥»}w}e?ôÒİ>°o#våw ™u†úõã³hÇC;cø‡¶•5`Û^±ÍL61ÛJ‰mfNJ­„º®ø Ê.])\ú#>İsçìüâ:áÒÅĞÏwŠ®qÏ[{ÂB«G½Ç|•éöö-I³ó(··İæŒğµ.n…ÑÜl7ZØk×'ƒ–9´F×èñ=^£Çkôx
ï.oÏ®á]–»btF«U=Æ´2Y©ó+œc­ûÃÙ„éŸÀ4¢×
#§ qZ§G2oY¿Ú×~F¼éfÌ! áû ‰óÆ4=%I^	´	%İRdùÔtqÂÒ‹“=PWi
áì¬õ>,•É¥b o6ŠtgGİH”WF´«ıJVÅAî¶ï¶6f×JOÖ¨â¿Mç— *à–[Ì¥˜Ø÷‡ğÏ.t\‚C¨Úc	E›­d1—±r—I.cºËø6ökëúûµ•D¸ö+0TcÜ¦~]˜j,…ôÖ×Qip@-š·öNªíí¯/’#èvôÛ`§©>İ´ÈrÅ4ÉñŞÿVÈg;m1ißd>ÜíMn,u3–ˆ<°$7ãç/õêß9+vÊÿXb]#Óõ]eÕ°‡{ÜC7Ô
jk,à^bÛÛWj×3Çëè5 gZ€ó!kE59Sû"ØıàŞ¸ ‰™\öAù~U¯´ñ:!¨áN{í¯î¸×~~Ç€Ëo­Ÿù
â> \ësH°Æûúí¯¿ıûí5.Òæß¾ßGeØõÌŒvÏÂDıLıS‹vÑVåğôÉ³§»ñüß†’U)+dn<üâÓvm¯ŠŸªòÔÇ;ìï9ò²Æ#n8è­öš¯j`Dg2Ìo™ÚtôœYŸ£¯{®|İ+tZG‚¹ûF{æ–z³³šRµ²W»5ì¶vjk…ÚÆNm]{§F"7Ğ©ï‡X£K X‡{CT¾;NÙØt—²my«CX†¿aÏÌó*˜ç•‡.#Å¿ı‡Ts7Şvßbğ\ÜÍİµJ"<|cë »ó¦}Õ¼9õDsqŒêş1Ğ”YÑ”Õ°¥-šùE˜ĞzM0%;#¸À(¦Ò.V{ò¸‹½Ì_¼R€QŸó˜£ÂLí|»êŒáJÜòI¨›C;qMR«#XéUî@é8˜›¤¯,-ŸÂ*§*C£«¼¢QèÉMœ0“~/µ>Ni~D
ï².¿œã(~ğÒŠe:ıö&gìœqê§ü÷/ÇãŞ¼n±×	êı@±Ü< ğmè5 iôÊNôgyÒs£¯=çÕ=çæŞNejZGæC]^İ»ƒ¿Â_JúÕøóqŒÈ‹5èµ5ë€îV¼˜£Å)æ2Ä|øFx.}ËÜ<ÃÒOÈ<#	3j'oãî÷Xø†
£Zo¹ B«‡ Rˆs¢ÙMÆªÅ2¬°5œÚ:%yùñ2±Ov`6%[Á›Îü[8î´+›¼BÛ_D?‚!®AÆ£×ïqû•ƒYf;†íDâ³Ô›Hmz‰YO\I!®íM{û*ñ.Ï¢Ï²DÌhvÇñwn³Î†Ÿş“+0êÔØ)xyå=Ê-=ÀBîP³rfjöhUqC_ÌC-äru'ç‹ˆVµq+úµõÿè×{uÇSmL>çkÄpv6£æ©zÈ'|?b‹qµ„äÖ¶Y+®ÍªÂVR›lU¡ÍÌŞ ¦¯zí¬_sşNSg°lrÓhLÈŞøšd“L|¥€ÖÊà¬ŒáÊğˆS6×¹ÛpyQG˜ä‹Q¶•ãT"‘œ§VM?8yÓÀ\@ÇÌ¾rl6•À¹:ÙyÈìµL}EœZp¸É†z)İ[^—WÕt¼ÅQ^6f¢Û8ñ/Š­üN&ùè¨4ééI®AŸÉ'®Š:9°eÑ>P`áRøÕ”ˆÃMR[t±Š„RÛgŞ<İ)>íë«;ı”êZŒ²QıÜ!À
&ÕÉ÷Ä‚_n.HõîÒE@JØw¹U¦úî º+¨úÕ ûªƒê¨½ñÂ€z1¤şÓØ¯õ5°^Ãşßëkğ¼Üi·Ï×àù; Ï1Q‰0yÕ¢.´?·ÕçkÛ×@ûjö5”¾B(=¹Nİp™ºø‡6:ÒúéØ£XcÖûÜ¶?¿-oš»»¯A÷%¤_t¿Ç (
¬ßè/´Êh	}73s°F åoä¿¿lEÄi
ÁFg»…ìÿª[zP¬ãÊ³İ›Añ?‰KğğkÓ>
„Şit{‚ßë†jï¼}#v'ğm^F¤½İÊ°êë@«=‰a ±Ã	®t@›NÖ­U'z3i7}}Ø(³‰«a‰²;€Ô_Ë˜°%O:§Â'c—\¥f²‹Ÿ6'»4Ópí°qÌÆT%-Uÿ˜ç?ÚfJÛLÙU)üc}·€®îµËÂªƒ&™ø®a‘bµY±lü×Ûƒqçè*Psú}MÌáIÿhÆõ5Î?æôƒÚ—~)»FÊêúz…²p_û±ZÔÊáN¼…p­aÉ¿åÏÃ°ZİYLynN{¢cè¯W^ı9 K’ˆªó¿
ã‡ëø×Ü;ŞE´4Ìûãô>ÂÀHUØ6˜ª.Ú.?¥§ç`fX¡ª>Gğ5…RÇ½ãşŒP!¨:íµ²?aš7f€)4zö. "Cå†®f›‡¼ïF†~XxÌ	Tö8»÷Í Ğ
]üìófòüë_;°uIÔ‰ª…%ªÚ%P –{<ıkÖ °˜‰+åÇ‡_o‘`ï‰*
•±ù~ˆîÔ>P¯ëo€~ÕÛt…ëá×\òõæãúç üØZ­(3ÀÖ"yhBĞ¿qºÚÚÙÙiQ˜€uš«Í	Şî(İ1 9†D…_i½Áy$ûÛÜ é¤d^ñ}HÅğ` W¼<ëOÓ%;Ø8!çˆoª¼g½ãáåz4«˜à•ÒE"°)³±œŸ\½ğÿıh¯(^Ò™jıU÷-ßÙkõÖñpvzv1›–wÙ²İ!å÷g€äc›iÛ`>O»%®±ßu$£ÜH	’F´–ÔˆV¬F$	tŒÓy&b]€?D3Ìß A³>E^ê®{9üã3êı‹Ñ.[Ï.õUëˆ¥Rárö\f{¯5š(¿M$ŠŒ\B`)%8ûÓ¢æmšAmf\¸F½ñ$}>ö¦šÌ™ßPİ¬í}ÔN§'õÚµ†
™NºN1àQmíì Û…ï8Jıó>>5¨¼ŸxëhÏX9~èıP×©‹lõ_Á;á2æ´}'æ/û®Êj_v¥Ğa?•b¹İş ã…‚µn>œ±R¨ÙÂ“UãÌ*™iRv”a˜Ç³ãÓô;UA=|Õ}z‚§OgcebAâ';;qqÖ›¾ÏÑAD±J¸«tî¡İ+pÕàLùÖé'§‚Ï^d±]0sä“gWÓôs%/J;IÒ3°& Æop°âT %»V3n…z06{ÇÇ}¬^o 
 ıô¦0j@3P%ùl©qŠæõQo6~GS´­˜Ä¹q÷|xÜ?é[/>«‡ î	”û ^¦é…vVÒDíô^G^õŸ?b'`míæ´£á ıòât0ôÆÄüöçÏwlba[iB´úMŠ/v’“ög;Pc}U0´âq
uUüó²À'ÙŸh=ø”µ [ië€®M#ş³
'ÿâ—tš¹Ec\V÷Ö(d2;·T¡?ù:o¦C˜E@>ì-„‰rOya¡ 7” 2~”Àp±¾æM*M~~ñ0ÍÑïäå…X{ÚÇL1ĞêÕ£ˆÈœãu¥÷UHJç¸xe‘õ”Ta°œô´ü«(åxš€%.¯°FóFgÏ˜Şs)¹Ş6Ey¿?œMÉ’tâ€YrœÇp¨ë«a‹Rë×MêùŒeaØ0mìl}ö‰ŠI§ZÆ­/Ú*u€İœÚ$ÖeUQ°Æ¼¬›fËèã™ó‚ùQgZMÇªÉ>Êûò#î)’:³‘tË…¤Œ¤I›4ùØüÈİÚ?<æ4Mq¶‘—Q7~¡Û«ax˜	>l¢W÷ˆ×Â	<ôNüqœîÅğéáàªù	Š<;„Õ‚fi;ù‡á8”|¢¢±ŸàşçåPñ("@.DÀGãfx¤w¬+²TÇøGEñi ×*Ñ‹`|À˜öÚ!Óş.ä2JÊğMãu´¥N_^¿DƒÊ,Kéè;™µ½¥…Qó@Ç88¡ÚürşÈŸĞ°“ŒAbTŞÌŠQrlŸØ;«?#ÁLÎ?†# ’€î&!\˜šÍmf}Õ}îğÓ³ßN€k÷½L¯,å6F·8½î74Oø§düuSe.g¸öäx>‚&=?×¦ÑFV+¾/éó®A°ŠzjN•+ª³ÅÕÔjÑ.Ãı4}dÀD£ƒİ8hn|İòTèµag€•]ƒáÿoà÷Ir–;êË67è÷üYgË¶õµµÏŞ°yşc.N\Şn Óòg®”>YpÅä~N¹™ìE9Øæ*5Ê6¼í~â>»Lï§{jí3(!0ÕÕô¡øÁ‡×qÇ`ä6`LTn¦éFĞ˜’JD¥bÑùY*&é–“ˆ21M¡HÏáŒD‘¶pz·8]„	JÅP^gANï§KbAykü¢¶’LĞ-!$aŠRQ0F]„’»…É‚”^ŞÏ{çı5±†	º%’ LQ(Ê@À§c|ÀWV™ªEeJVÊ¬”L¼…•¡ÇE…Zğ£¤…É’Üœ½$½ã™Æ
öîn¡ä¿Œ{¡äûoÏ²H´~58
dñ¥Q‡;Ñİ˜¢¢½3v]™=ÁÏ‡‰{høÏ(vc:ÖÀ •§\šº²á Ò.DäÅ_™­Éêî*ëùSÃj˜Wiq9f¬)d$
–å”f´QÄH»]Tıó4®ªI
_¢;NôWwƒéÓî'uîğ]5ƒnuryÙ9Ù7‚Ùµ›™äğİ&z„Ğ—”;à ùİ<(P-ö®¼æh+OŠ
+Øˆv¹İv¡C–l;d±pûG¨Bûõâí™¥öƒ$¿ıLµU
Ú…Ûâ±ß$‹)çYzŞŸŒ`ó¦ÀÿAz2­íqw•f£QS[t¹W°aätª“—øzvñ¦¶‡å–íÊÃ£7èmJ/“üwı?
-×‹“ÌZê$Å¶ÄtäæŒLK@M¶q±u’å„ÌX1 w24eb¢ şgÃqÿøŠ!ıÓ‹N¦”ü';Zì(krÓ¹+Ê&ÙE›ˆì~E’Ë†H·¤;@ã?I:åD­­OHÄ)èçğu‡èF í‚òñĞvÌ‹Á„$Ù2P…hôñ °hëépTcA˜¥äÇ,¢T|ëBWÆÖ‚ÃˆlQPy+KÙ Õx¶
îˆña€†§u—˜oc7ş‹“§‡ Dco¿8œıDõ]zD‚ËÿMš~?İS:âB°-âÓÉ‹‹ÿÑ$áÙãÁy÷]¡_}
Ÿr‡Q4@p|Ó¡¯t!Cøïb˜`í&0¡d¸¹¾‰
Ü?É"&F•äGo¶V‚1 &`/IõÀ²¬_7ıÀçMHƒd5À‰F\CŞ±Yc,Ì¢¦Àêæ‹Œ±ü÷<¥Ğ«}ìJ¦	ı¢yQö¯) gUæï	Ih´ğúSV÷›P.ƒQÊ¥ÏóæÁvnéƒ?aé}Cy]s,N1oØnô”')_?áãJôÓV¯àeµ»e	õ„ÿmo?ƒ“Ã±ó c¾KĞ7ÉÂ1¬µ?°¬ÖÄ(VŒ ­È/{ÖZŸšñÁ˜ )×¼ÑUòå¸ßÌ•XĞúíÉ~íŠ‰j©¯yw½Î¡æjOêGŒÓ¾=±¿'	ĞÖ59ÑvÅãâËˆtÔF¶gÉ¯toV–SRÆÇ¤íT“M9Rb‡¯Àéßz™ÜÚ¶!Æ1"×Œcu÷7½+©†$Ü‚²Åuû±‘Ä¥Ğ—Î¢‡x]¥Gf¹Jš\Š½ŠààxÈ‹ÅÑ¢.Ï!Ìp±Êl¡P˜)ÕÕy~D¤İˆ7¯¡€…†£î¥ımi¾Óõ?¯L…ÔûP*ö—‰sÒ¢v4´İyì4+.åU¸”y¸8k%”BÍàß`w“ïÄûE— ©”Ñ=@ê*—Ş”wU^1ª¸#ê¸½[±‡{Ñ§HC:¹Ô¡†uéŒ|µY:ÊæñM6"Ö\4äéV^&ª
ÍR¨Cœó;œp	Ü†—[ÙÃzùN»İšA¢/zÇJ}aÀİ|Şl¥§“qO}xÓí ba¢
6ã,XÀ?®â_Û ¤rç”Mº|¹TWtN€<_!c>ğ7·ı×âl@¶¥,ì©OH˜cZBu’Ìb6ĞdËï2bà§ ;XP;Qp[GÛSkÌYîS³îx,O$
·øòf„4½¡U%X'jvı§„C.g¯aõ*ëw³púr%.şNm
×øÜ‡­*ÍO£­»0Ğ‰Ÿ—ÃÓÓÁz6YåÈÆ¢8È¥a¡ÄZ
ÃNæg:ë¶¸µó™gpr™l6ö<n¯$ndXFrÃ“
/Ç=0¢mï˜|?n¦£ÇÎİ’Œ‚'nY’:İÔ( ,ïC`şNöO!Ä2VsƒÕ<gõÊeEê ÿ‘Ä‚*ûRV¢½2NsàääÄRqó.#ÿ…ÉDmŠc›™şªÚ#¶Aé¯*“jºÅÚ­Şf¡e|±Æ“ØAF´ }Ï³MšÕ‘ÇştRğG~«U%gE-O„CEõsÜÖ²³h³úNÑÈÓápğ²?Ú:ƒùp ¼êú\eı7•ñwg‡òîô;½`» ¿y¸€İïlì^p;0NŸæÍür8Tp€Æ )lFíµ\-Ö>¼˜X‘K{½9H¾GJ-ô¶À¤í">0²åTZ·çÄBòÿD‰Bo]X-Ò¶[D·œÜ$D!¶‰Nj"Z…“åf)g#Nj>(¦•Ïö>Êš	Œ«¤)û;a <­dŸòàÙà˜<s#Ï<6!Û¼H6ëh›i{Ğ7šÎıAŸŸñ&£Ş x¨»h¼ë„£p^¨Ø«„73‚æÅú¸ÊtÍºßû¹ªåë8wª©z¬’¼ïÒ ƒ”¯eäks>[-)“¤š?@uT½ÔQÂ:Ü§ ë†ñÅ¼çéÂ¢å#~şö§¹ıñ8úà@¶½şÄŒÀjç³äšŸüf—ö»á"T.z‹–åğÉ
¯†Ô$¼‹"%%s±=—ë6’Ø’öïH_/xŠDØ,kxRìou>¾áÀ­Eˆ4úb+´Èıò~
gì,RÚ£Kk4lO
w~”æ¼
d;ƒ4áÿßıál;¦G@¿Ú1Íå1İ\Ù˜ÆÒV<¦‘å
Æ4±‘Çt|UW¬
òFv×8_ ûw:_  ¥qáœt)mÑÙ)b¾ „ù"4cpqÆ§‡CåfğúX¿F“y8hp)ÂAÿ{sÇDSô]G~TÈövné½ú^aUí=?¡‡ÕRî`uıXM"v¹ø^eÎËÆ™eÕçNÈV°üX–KÅÔ–’F…’Ørp¦¢²¼]çV,ó2"§gõån0îíÏ¡	>>¬ĞæåÆ
Ú©á@òÖãXZæf2R— â¯O4gõã :ÿxÁ¶¡"†ÿDü œ>ztñzTÏÃ#Õ ååa^?5!ƒıXûÜ4qĞ˜×C{Ş’ì¿°‡-pµŸœ¥Go²Ë`³tÜß&Ée†Â…Qõ„ûe“%€K.0ÖpëŞ #l¨¼Ğvùa>
áãAo´•<Ãym6Ñ­ª@ñÉ”ŠVáØĞf=éÿ‰ğ¤Y…--5Í‰´E~Z£”ŠbôäSh³&#Ğ S”üÜ¬üR7RÚh…Ù3Ü'°Jã`2)UcÂÚg•‹S±JÜ7Ì>²Ô;l=lÖYœæÊ+k‰C0¡U›¹|B1J~Tµ™+q·êeNB3¯¼zvÃ&M– ìá‡CYš")­›ÛÜ÷l~åAiªÍFc\1ÒHä_àAW
/ëîŠ»©cÏót®RHÓiß\uñÜ<á)oÉxBa’\:~PšÆCÍÃ
ÙNìª¹6ÂÍ’é
Q
'q
Qb3™õÜöl4+4Òáh±qÀqó×†´¸},$
L_4·Ş¶ËY²JV"¢X¨\ÕfÕªÚ•ëê<9âVâ‘¼dÓ¦Ç›VyZ‹X–è&uT¯4†‘yÿ*÷ğE"Ûbñ‚8§6Í±•Á#‹mÖ›²Õà²û­ä§aØö$9ÎØú:EAÉ—jòU%ª‚óü<kšLÄ-³¬ˆ!£VMY­Fã‹å}ü8a>SÌÊywUÿAÉıÒ®‡‹ñ.ĞdnÂBÊ…ø‹Š#€)[>œJw½´˜„¸1?í„Xx´Æ£¹É}‰qnÙNüòNLÓó9}œM´ëDågz$G*³&ïïS‹£»¥ÇÂKı‘fR×·c_)•(ø­íªš[õê-²Û"èe¿Ù	•HÈ\Dk }ÈÙ(=;ölsİÌ±@ë/@±ç¸B'/."É—¾¿ä¶¸¤ìÄÇ®v¹9ŸtC*Ô	´",gB0¤²ƒ€L|©/É.ú³ø8“ïÏª©2Õ-Šfñæ¼E#÷ÈœL'tdÜ†¯|ä
l:o} ‰~ÙYVÈÉÅ»~	ÕnšíöH¼<ŸÌ9_û¸É™‡Q:>Õ
N*¾k=8&=IX-"uÍU6‡–£5mæ(-ËuŞŞ«˜»Qóÿ1$ÓÉ ’æã©´{÷å¥üşoŠÊ"sÓıJmJ;wndÜàd"–„a½ÂU 6ÍpÇ˜/¥5-šÖSL*
à¿Ùq½–jeSz`
ì¨yşÆ¦toú]rö­0áÁœ¼üTù{WŞÜV
Äÿî·x„lì\æv®C¹§-×0ãÄNû¨/|&ß]éíûéôÓsGZ?i%­V«Õjw%¥™QëXûşré{…ï"ğø¾ˆÀÚğÎäß:éW¦Ç©l
¿˜‚4|iËÓ rRXfwAiûNİ	Ô–Ñ”K`@İfoğ“|FÁböW˜Ş,Jİt=Ÿ×ñ H]†›Ó«oK®„Ï·æJø|WÂç[s%D›§ÖîÉ…˜Œ‰eAø:²ıgÓGİÈ2·jwÃo4(Gb°s÷Á=ı»&FEØD_ªCíL`c„o s*À¡9$rÆå²µe˜èo”²˜4¥5MÆxß€Æ±‚­‹úº2<:oÎ±İ·MÿŸ U\ÄH¦rÑÖ'@kƒ	 Ì¨¢ä¹»õ	`ÏİˆR…eqN‘m§¿é´Jß:d«,İÀèJ»ñçU¤£9‡‰‹;[ô3ãk»ZŸ3OÒ¢ÿ<„Á¨PWE$¢B§öŞ‰øªÖi~>Ühİ×v›ÛÜ¶t—[à¾6ÙÎ†‹ŞcèƒåºÔÒÇÃŞ39ª¹çóPM†ÿäCáR²Ø·2FŞ¸ãB—¼d®uÛ/Óˆízl)JÚ€GL!ˆºïÙRÀªü¤¨½,JW¿æ¿=ËÓW}|‡hüÔƒú7öUÁÊ}ÉÒ$Ñƒ Imh•î\
6TÙ'u¡Ò
ËÏ7İæ'^~îÁ#,N$œ> gÛ6yÕçÅ:Ü¢ÙÁO.ŞçË¡Xìó;Ì¸m
7PÙiŞùrdE½|ıÃ_êU\[Í4ºRíôµ jyEÁómĞ¹gøö]Ä5Ä¹k´
•ó·ÀáÎP”uùu
[YM$Ğ
Æíée¼˜¦<i'`z`#õ:D‰ê`ÕPù]Ó¬²æV–hTb³ÕÛ”Ş'µNØÍ$Ò¶j“6Ö{0H¬»Õ§ï+$seó	p#ÜGøß?§0;Åî€tg½ ÈøV6HT5İáw”¬^áè½*½¯J/ŒU	ô 2,çdRFdÌnKp¼Xw”ÓÈò¯
B
°¶ìÕöW¿qĞ4ñ ~wİ°¹hPÆ}@3ˆqF¬Äzcœ+™Ê¯9zF´Ú a¶æLİV+îs&1@¡b:/§ßõèAYñ¡DÄ	ÍWòTN[†×¬^å
W4µ\YÄìrØ¬n“®&Û­îR©ˆ˜ÜgK¿™^LÈ		˜©]Šàê˜M[Ú³é¸‹9oÇzàÜzM:aSæv§
”ß‘"Q›ßÏf†–ê›]¹ßstu=ı|]±
ò*öï¿*¬%-”‰zŞ-±I7…©ç]Êül1ÉF½ƒŒ_Ï)ˆY2ã×:¨ŠYdƒ_©c’@M“¢0a}öò’¸‰(Å–aNõ¨ õå‡¶°j9„Š‡¤ô‘™¬%CSQßIÖŠ™0Äù»
—mvƒ<%Låõ§šÏ*ŞÜ»W2ğÿ¼w[ŞóY¡&3CK¶l¡ÔÊûú
0)ş
›oDu/3Ô‹â4WOU8¹¾“uİ¤wıí}µ³Q9ÃÆG'©±Ú˜Ùkf¬Æjƒ¦e¤¥^Ô2µöWî 
<VvóìëœNH‘¿‚NQéSöúö=¨tRj³Áï§Y¦™ŒEB\óòœøø²§®¤Ò>vÃd„ö€´”U6WoÎÍùÕ#At¡OŒióïã×e>#"\Ñ®oà»~YÂñuãW,{ã•&ÍÜHaÜ+ŞôäD}¯!n—lğ`o»ÄæıÙ-ãƒÌªqµt'%>ë:Á!Zù®Í‘Èë¼êEÎÂGğ=LÃ·úHÆw·ßƒàÀéÔ»á%øÖ´—rF Ø#ïÊÔ0ec$:M¦Ü˜]£V5<iBfÄ¨Ë;ßÙi¤_gk`éNŠeK'‘FXê«‚ôklìÃ7+Q#ê%\‡SêØ1îşà•x×;>cİV}l®”%±HhÕh¼Z0¤4nê´¬Ã\ÛBp=®1NyñÒ\áiöÈ^4Aóp‡áµoØ(¤t9Œ[Ğ¹¶ŠÉñUDÇ:ƒxâ Çb-5$Ë*$=WIÒ¾æ ¶²· ÛWi²=Œ]’l¯Íï‚{¥ùê.d¹„©|±.òé0ğhokx­“à@6´Ç3Æ!€SºÈšıs'\œ¿‘¼2cƒÖJ=SV1)Àšt=)°‚°›ˆHU… |£ÈMäÈ´u³¿g¥	ü1]?ê
‡ÅÕïs}OÚWúv}[»liç†;2Ík¦¦¤A?şd
}<EµÔWMé‡®
¡ãŞ¢‰¶tXQ–İ×!ç51^{Óåü¹ûh‚ë
Vo
¡’…AGT<ŸĞFµ¤iƒïóç7QÔ¿A±e:ŸÅF²‡}P3rÃm­¶™êÍÌT÷ÌéXd¨^s˜Õ~Õ” ±b-nh­¬ƒDˆ.DÁŠÃ&AÄv`óñqÄÄˆ[2¹:ß‘`­(™bş"Ÿ"P“CnyRr|&«”A¯Ëó­ñsÖvk~[Ñi›¸-…‰U¦FD¼pÙò¥
ÿy<şÂ½n;ïñ‚GM–%jDzpK•!¨ô§Ÿ»¸‘pšp°ÚbˆG˜ˆP/È#
Ò¬ş.c9Ò 
ljDs$€™'0Ğ­ƒ6ã2H?‚RÙÄĞ5’I+Ò_¤[šeHä¾°U­àEò^9Ëıé‹i»
Ë§aÊl^KwƒtñıàˆyEél#høîıìB¸ßp”j_x#d;ä\ˆ‹~³bë–rQ9cı‰™/LPÑ[‘kˆì€ÜñÆuÀk¤[ÌPC¯öZi»ÕÛî°ˆÂaD?;¢.8ÎP0F"f«;ê¬Õ¶¡9ÁÏÙqíKà¢
>™Ñ“ÄÆ=ºD·Ï#«s´kê!]Ó+vó3²·?T7\?YN§¤ïøYööí}ßà¿DE44ÄğåÓ;Îa}}É„“Ø´œ(œÈ¹ôádùìùx¹x8¤g?éûCµ™7v`l1İ™|^ô~üLec'b¿…"›¯Á^ß½OÂõ–ÙP °^UãÆ)Ë¬½o{ÎĞN;'»<Góóà7b¨/zãŞ3Ú¨Oøñ4úšş˜÷¥ m¸ÂÓ†ºË~†­½²l‰BBT
Š|ÃŸ¾†yAn›Áœ7´—cÏtQJûjøÀ¾¾&p<\Ñ_ä	ÒSƒ ¾$?ÍËA+è l2ÛN;hK“.gŠ¡Ûà‰è»£ü§â…R
ÅtxN“ö£á€‘§·÷¾.Œd" =Fÿ¨ ƒšìÅœ”=®â
ÏşÖ|á„Ì»‡­nXN,Zzyú?Õïó™«HœŞœ#ßıÇŠ<$l©"ƒAÒá m@tÑğ@$
ƒ¢¡Ùêş9ÔWL€õìõs°¿Âuõ;šÈxi&†ŠˆÚRêgR³bC£D‰ìú¦€¹s¦oØ[M–¥PRK
ğ‚şy‘/ğÌ³—±×'¥ç‘:¼%M’£Öy>™å¿OÆ´N¼OÏGµëF›-ÕùWø7µ1–q"¼î¾AR¯óå¹sùÈC¾6dÄVÅe„ŠÚev¡Û–ô…8?:˜L™ì‘åA*ÃÁ3‘Îy´-˜JÔMàô-xéÿLõş¾‚ÃqS÷…gRKÖ¿òÌo_zÖMP/Së³Á3`¤¾¨ÙE9^^!P¾Ğs}vû)È½él²˜pt
d*ÇAæ¤/ài— øLCñôWú™Xcµ)El=‘ÆJÓ´ ºœ¿ÈS@G“ß“à&IP£ùz0tXcÈïxD$™æ£I«¦RŒ[¶OjlÉájôšf˜°¼E>®O^]0€½KÜ‡n><(œ<IÍ`ÕSì=…b>_?öæóLQ2­œÏÍÕƒò…ˆvFƒ[çÙwİ¡yÆõú}Qæ©K	ëmH
å¹çâÈW‘[lû â”éR·•{}ÈæCC%ZqÊÊL¹î0LÇ„é0LÇªi1™~uq±œæJ¥¶Ú6JOÁ È—C$€q|CâÊ"ºÁô<ds’°O¦tØÚÚn‰VÙæ˜*YŞóKdèQ ^KÔ“O¶şaZ¢Ëƒi^eš8N}:qm•Y¤>¦¡S'¹ui‰”ÑÆ‡2úO¥èMÎ|ÀQiSEè}Y¢†«hÃ~4F*Ötı–+Gv9~|·c»»ı±İİâØîŞ’À›ím[®Z2<üqÕXñ…õÇsR¡z´J
NË”åhÔ›­N«Åkõ~ëåCŞ0e—TY6WµıA¯W—£s~ò|…Ÿ×¤ÊÏ›ã}©RšØ7[ÅBYĞŠª.Ä“Ò¿ü1k+°U	¶1
EIeu‚qpk+áV€ÛP
N7k ÒYö„:ÚÍÀT›×ô
µyÜï÷UñCŠ'
(Ì	smÉ©f0fC›¬…{ÿ„õK¨zT@J‹»¡| ±¡^ûŸL9U®&…ƒ²÷x»Mæ’¶ğìTƒÙÎvJ°T`jT³~ÅĞèf>ÿ0Ÿ-V¾æjÖ›N}®SÔ~dò=6e<	ÏzÚIéoÚ¿ç×líQ€—”şqo”W…õFîÉ1>¿³v0¨="i£ìK;ÓàOŸ|ÅÖG
Xæ–¼&ÛF{9aş›ı6xHÍP	¬'v8¼±5ëı&¦d\ş#< ·ş€î
?i¦¡²âIy¿M0²†øX^iMPCë³Şx>$3‘¹Öäe¨´Ötšr>Á¥D²‚ Í]sĞÅ[jš-º”s¥à‹'*Ì¾ááLGãE>à½.æ<\ì¢Ã-Ø;7¸”ğ%$>L¥AÌM–/ œÍŞu4yÎ'3â¦§ÏÉæ?ÌçâB9*†“?’¨yo÷lÆoØ<¥²Ônÿ -ƒ¢‡I¯Çúw¡a“Yy‡'ùxµƒ·}<a¬Kç€ı}úOhØ:±g°â3€|^ÜMgp%ZPH+œÃF/OFíq‹‘“'ºƒ‘20~	a<Û‰‡°£Ô*–®P><
4Ò´G¿•Íê•[›.Ä“&`§ÉCfuFÇ÷ºHPµÎ0*!¥ŠqcírÖ¶e&
šCğP¬ã2¥¹iœ2iq4dU‰,4)ÙVPŒ…Bf	ğ?›/›q ŞzxÇ$r
fFA±¯‡TÓ c}«„%geVÄ·ğ$‚~ W§…¸³Èøİ×…£DCMµš(›†`+šD-|ç;z¦UõÂvVÔ1Ì§ßMfb	.FJ¯7
RwAÀ(O~²ÔFOŠ 8á#»cº^rïí’¿E›uåI=Ğš6zÅHÁCÆ;HÇˆ=_²ÿmuTA½z“ìlp{Ç'<öLÔ¬ÖW
œÌ
¦¥Aäşl</ğŒÎÒ0y¥¢JØ$‰kôT°´t©ª©¹ÀtË ì±&¥ÆTˆ%mQÄØåN­rBW.·ë”c DúføğÊ.hÆÌù;Ø
¯÷Ò›€g4èæÜenJAÁ[ûóç‰‹§ğƒ…íFYVXLÇ\ÏŸ?:p?éå"+V
£o’HÌ9¹’ğ¼š[Ä s‹W‹õ –³]<ÈœN¦Âá©M˜_ÈiÏõo°˜ñå„h™ö˜äªÜZ±.âÔê’†M°¿ã€<Ñ‡ÚDœÑß£â§¤Èê$gE¥ÅY€øŞ%ãX
j“·ßÜš±p‘RJ\Ûêö•¸Í…”ÁŒö-\¿qšK^XE92i=SJ!!T­J¡¿æëŒ`ĞVó@<ä†Â’ùú.Á”PÅéşYòrAE‹´-…©&¤!ÉJgğ„–Ú¡4ıKMUMËOZ‘¨+Ú;Ieƒ^ÌÎÀs×Ã"7¦ıJuuÍådsTC{€Z"¤”#ÇîpRFK:éÃFxºœ,µFÉóE%Vê0˜aû—–8Øñè-P‹Å° ëˆŸË†‘k‹!ÒìùÈZŒ¶±q»vª°‹}õ*G:§“ìyó,XœUa½b)H)ª¢="øh`8=;Qù¦F™‰$½ø<rŒ_¨@n†öœyšQ5 µçÛƒì²ÆÄnƒˆÿşr1‘X¨t
•Vò`jšfR¤ë3TywZğ·™Ñz}çÏ†œ³%H	û¸®,[•¿®;eZñËZaÇcüÃ6<ÎYo¿³œ­/)Ô\%İPÂ/xÿ›¹D‚œeu2¾«)ûæÚ™Úíğ#ËçÑ0bµÓF
ú½œšZY+d)Ã—¬ºî‡T`óEoöL)ÏSú‹à‹dæ,¬ )E•! ¡ÿ?S Öòƒ%™ÑÇJõEÎàšƒo%`WòQ1Ô3u¤½ÃQiŒÄkªÁ–M‰>Î¸Áì\µ¸gl¦Dî|b5ÊÎ‹ßË2iÆbµ7’ï:ÿâÛm1¢Ø™D±¦x#ó:ÛR,¢¿`³)îÀ¾l€Fe±åóƒo‰º3RÍúˆèüe»Ec4JšF	†2æ|EóJ[š"z
Õ#dÂtÚxşˆÕ İMVÃæ¶¾)7êšÁ±òĞÏ\Ë:ZÓa:ÑWó1”Æ6tXkE¢ú÷Şr>•kï-¥:¤6µÀ—ÅÎ.3YàÛÕ±\:N'hH”å:¨J»³äÉ·6Ôˆ’&µÊ7UE­ëjnº¬Ã*İàÜhg˜| ²Òtmb×ªFJ;s\b§êš¿€"İ—)`°5*ù¡‹Ÿºˆé¾è<ØlÃ_Ö6C¦ºÏ<¼]-à9E4²ğ§-¯TWue¥`ğ•€¬”;ˆ£ÏŠ:0y¤·`m·»	ExèHí‚QúúP¢ãëIQ:ÜÔõ{¬mŸğq¸ıFNMd‹"BtÕ¸­;Øt)JÔT5¸l°I5É8;… ;Ü±
¡€k3I*c™©|½JAyÚ}Õ'g2Úk9N½8™À_ÀyGé)kİŠrÂ1Ò;åÀ£9ĞM¾uÓ¡ş»o”bPúÚ®-E5´´ˆ§Rh§’Ó% `™!¬û)¹ïGv²rœN¦Nªp‰ú×Îó‡,ºM´ÊYö”#[y;æ±¨1'
  ¹[ŸPdfvfm2ü©Õ%ƒ¸¥gsT“P4kZcĞ›â†5zÚğC
j»bæ–åê]uT¾¤ÚæÚh ”©ĞÜ¸gT|S£o„|²<÷íœºˆ›"9·ÚÉPÿ$ÿ…IØ¨M’3cfÉ°½2z …ª
ñíçê„X‘øôƒGİìÑhªÏ>f45_æ*TCÀ„©¥ ÃÒíLs£¦‹YÏ×Æäê;æç"÷ÙóÉ|ñĞq—Jåä„w¦ÏOmñ¢Úü~Øiû¬u€4Z/¨U}FUóòp.\7»¼Í”¾å„NçZSøn~¹zG!ãµWùÌìâNt°æbg
K•:3Ñ³pwƒ'›9ÔrÎtœ¶ƒ	pŸ'xxZ•¾×ÌpÂ(º¬L‘éfùH«=ŒFÕ¼hÏ-[c'û8­P™Ao¯Zl™c¡	x¾ôÌÉè‚`h~G7YpëCTèšw7Ü„G¨#¥"´âİ
uŞÚ:u4½oâaÄ–È÷Â‡£7¬ Œ„f
÷‘‚—ä‘vœ3ûÅ
3q\ãÁ*LnÒfOêåäúÈ=[›ÛõpÖüÂ2_M·`.m”¦Ÿ¯‡˜VÔpÑ[CÆÎ—ççîeéØÈìÒ‡H'ùôáà²GacŸ]wûÜ<a‰$HÅ€3ÒÏ"éİ¬T\ø›nf©^fg‘ŒÆZŸ2W”vœ]ÍhÓ|êµ;‚ºz~ÜˆsÉÛÓYê#—}D8Ùgë³­VF±r£X‰Ÿ/8Ş›ùñà'?­òØÏP#‡Xãn¹·Ù¤Nğ]SPƒJñò¶‡ìäd©$)UV€|òºÙa$àé‰!â¥úùuÁ9xX8
•G©±cvšM*`Ç™	ã<¢á1ïl¥x6˜òİŸ
VW(Êa}ßö†ËAÚYğ(ª½mÍ¬\ä‚¨G² ?8]C·Í‰UdˆkN;»,`Å’­ƒêªÓæKT¬•vünƒfÑiÕ.PF¶ºeÌ0Ú%
BĞòØ®ë'Êv@†“åîL&n0É?›~87ÖpIµ »iÇÙº;¾\pã¼ïZ„WìÀ–ŞâŒº"ks,³{«e}ã50´G¬áäî?mÉ,bİ|`¤ªu3;shßü!êØa­Ã-‰ù/¸Yoã¹İ-,Öºî¯µ¿ !iİ"îPá• T1
e½÷üøz_pÑøz› ÓMY“k,ÜºµÑZ\F›-ú•«¾ª=aÑ¯†ë¦*5µôßƒ İì
¢ÜVt}-rX¦X7ÈúÊÃ½ÒO5È=]Àù¾;­ j{¿(¿¼öh¬1âSù·òxc)Å;j}CöøíÃ~#OşV ¦uîÆ2[ÍdD™óá©}>‹‘b’Í?ë8ZöqN˜M–ÅtåÃsî1ÎÉeáàDØ
¹ªŸŠÉšÃ{&vø¯ ©ÀÜ38J[:†4CÇ"L9å§ƒQf’¤¨âÎ/«¤X\‡ËÑØ{‘Td,m’àiÃPõ°Vëˆ_têog^]8÷£I”ĞÚ5{ÕíÖ{³)ö-À–ßßŞ‚ãKîg®Ò™)^	¿Qës×ª¹•E<Tµ„C‡yàl˜ğÜ½›ÂµÇ˜{":]ûA(s>d;Ö…ƒJt$(Ü¡å¡}	¦wlë¸x]²ğ+!Çs%”Õ¨WÔÌŒ:¢ğLG/ß¢|b[ÜÍ-–¢[zH/»Üø¦[ùXñ‡ò J
TÍ®”Œ0UÌSŠt&&.³|3O;+¼´â`SÕID’8Ö²W’î‡şê(Â]GVh«|[GùI¡H 3"—ÍTùÛ i˜H|²tpÌ«!ûúoFhÈÙƒ*Y½6Bš×
i%'Rää€>æ¿.… ±¸^¹i<³>˜7qñêŸrY°¶lâ
à]J’³5RB…óDŞ·{‰Vp®ş‘¸%SMÑ¡²£M¨Y–…v*„«h6ÿ~Be§X$ÁJû‘OQØºäù´.~õ…´ÚÈTÀ«VäÖ‰¥ï”0%Ã€ÀFÇLogÎâFàğ¬!M¼™Y+û©$ƒuNşŞ	×p8çÈ H`Ë`éqz£«rí“¯¤İÇõQö1îBéùù±¼'‹åÿËe¹l/—eQ¯Áòw³PÈ´·«fØeãıªÀVœ+‘9{…‹ÈŞÇî—¿…ŒÄõ‚˜Ó³10Ò?k––:Õ8ş_”şÂE)|¬KƒXÒdrØ1—&Sºàyø’'ÁF ã§SM¡‡N‘ïÂ¸II£Ş'jòå<)4%ßêÇk_¤"9ßƒ~ Ö<s¿|â°‰Ô‚a$ê0*Àå7Yİø³ÿ(µÌ
„Qƒ‘’JVôø'«€Æ.’”ÀVõoÉúş|Î=Êûs^ƒ(J¾p®<b¨µ1ƒA[#×76ÊR¨nåkµ¢Qğtz`¡ã™õ5å M×üô’œ\áEj;Ó€Ú/´ƒ>î´Ãëã{‚¸'Õs
‰ÅE‰òÀÜ€_ƒrÔ¾‡şËÉ"{,n…Şx5šÌAqC;åÈØ0T4ˆªHÜáØ—…2*Ÿº1›´=£€®R¹³á¾'@OkÉ™«ÕÄñsF7‰nvÖG¶@[uC°ùŞ²—¿TşcˆA~Úû-ŸçÀYH	{6œœ³4™>ïQõ{€î_Àí¤ÎøödµÔgÑwxeøÆÏFó–Ö~VÆ”9lœGÔ¾NÆµÖ:r9Çrğ\ò¡§øígï6½¢ç
æÿšÊ4ü<~'ôé¤¡™k7)’í‚#ZV.Î°úˆ¢ÆV¨ÆwjÖ¨édnKöÛ=	"ìºôcVŸ†S‹ıYïªp1I¸} ×a×Î/
hDK‚T‡øé%E¼ÛÑtx½ÑowêËü«±ƒù«™=‚²-À’FÑß*êr©?Û» ÕÎïí˜Z±—Ô.*%ïL¸Z"ıùàZB¥h…~:ù¤ø.îê‚ôÇ8·ç\Ó.õ!Šâ©{ğõ÷ˆºj‡Ø'¸«ß-©J¸ÊV/jÕĞ¥tİÂ‘QÏªn=\Àë¥Yãu§f\ •JêuR¼iÙŠs³
L}
¿[Ş†!0‘µL²¼²#™áµvgF~k‰h±çšáª_ ….èğÿÁ[Ò)ã-õÿ_q:ß½ ‡ƒGîå<¤y6YÒÂî%wİÁd)r‡çã£‚Qä ©d'!õ{¢áêó70À¸È†È4·ÌmË¬Ğ¶¶ßVR·âIoÑFğ8.W°ÓÃgÑÛYq —;ÂQbıÑtÀİÅñôŸ‰N¦}BÑ&>’Ç‰ò6'–¢	ÙŠ<¯²PkŸ«ä|Ú>^¶ğ²ƒw7ï})´Q—M÷´g>÷îiçsËßĞ«ŞûŞu>ÿ^"­Ô$Õ±Œ2‡~Å
ébå¾P ıàEoqñ¼±ß#"îçò|®_m!`6ŠÊâ ÿ5‡ğ¸–çŞ7³ÍÊÃùŠ¤êóoŞ0J¤Ù4#}3%æHDvÑ•«|uQ¼ë«o_ÕWåêû`mò°£—=#/‰Ñó÷2yŠ_Î'’ìhw$qÜÎõêÉ•ºÂ›?Æ”ÏG`‘#¹+Ceù‡êÍ–Óåkİ¡ëƒ5à«ÅäóÉmµzsó4½æ·I­“è9“äô“§Xæï@q–Áâ¡ŒİÃ8è?v^°qÍr¢ÔV1i¨¢ªæéÍâ8ÑL®•3ıfI ÷‡´?£ı¯Stò|xá$Í(~` ñåînúVDxIñsèğ<Ù›…{õÁšêmÊÑ8˜X`.­Gdš;Ã‰ãHvN‰£Lg‡ºä›ñ‹ñäªY±ä°Ú(‡Ã¤V,
xÍ§ò¸™5õ¹JÂÔ™ÏşTNŸ±Î—M‡YQcSoÃ	¦eÉO-êê–fÜü×%‰Ä£oMäŞv\ä³‹!fŠ_¯¾ğ–œ¨lô° SŒ
—Ú¹û	»¿Ï§NæÆùÇ+:íÄZB¡\g¿ñÑ§½ìÑevI ‡“9qV–Ïù1Úd„Š_h V-‰F1ôfÏ«W|
Í–©|É[Û¶î­h+Œñ:åBš}ñ½%Y®Û&²7p„—GÆI2ŞNbû E=ñFÙ½}İ¹„Ôs2ğ«öİòy¯bsÔÍ¾ì})ûoï´±ÛØ/öİ=ÖWŸ\fºÛ¬sTMëP)u—ü€>%´«SøVgNÛCÍ#Bj´}ÿa¨ù™ÀPQ.õE>Ÿ?¤AÒWiIeHvo23ˆÍ%OHGJêÌ8»r®U"t&FÏÁizM“¡•ç>¯³’÷
Í“Ú‘1ŞÍÉ–Fÿ¸ğ”ì<™©+WFcyõ2Ğ•F#ŞT3Û)&Ö,G'S#â3åoAºwØÿPï¸  ¦4om¾32S›Î>1B&Ë”AÛŒ^Ù~Ã„b‹·²ôÙAÆ³]ù.ÎüÉÔ"iÑõ“w³_ÌÑÌ³Óõ-;ÍcdE,²!›¼>ä¶[D°Cï|nŞdD®mwLYàØª{’
” :‚ÀH~†à`ş±|22³>Lë—ô
ğÇ'”—M@úJ9A«¿ªØå 	uet«Åå¥‚ÌXÀÿä	üSK3×HM1AL^_TÕ[JUˆC³cÅ“A¦&†ñ)Um5åQŠWòİÃ’‘~)»m/Š~ö.,MP&L•Hğƒ‚9kóÑ"ôÈÒ†“ê,´«+õU@h¤¢½š­2:½ö³óAVÆËï±q‰S–ó¾Š5ë]ò•ÚÎngÖõ:¨£ıà*i¤
È]©i¨šÚÅ‡ùò«ùz%l£Ğ¹Ú[Q¶TY­à–ä(_Öü7ib"+Ií·ÚœÌìğ½ºIáı]àB:0³@7[‘“ëß¢ÄPÏÿ2=Æ§UAçŸim¢
ıb@G|˜§#7WsÜFZî¶ˆF)VIêqD¯B·	.°ä4~É^ÇŒoıíZ¸ò&ynVÂ CæóeoÈÓ5Ñ×ß7KWêz¾¦'R*P şÄÏW9¹~_™ù€ßb.
{]3–²êLpN>ø"E>X—ãÕdË‚YE}:Gd2èA~[p
µS;œºr`W
våÀ®:¥*ƒG“‹#H·Ì¸®&”/¾C;·fñx™y0k@ˆNl÷”µâvÌì¬É\qÉU,³£2KİWÍá¥$«eŸîŒ‡ûqÏ‹£´b€µmÒt1NúéSZ[í4˜q#lX‘%,ê5í—ƒZ’ı+·XKúz6¡ÊÅª±ƒœë¾#æ†&kQoY5ÍÇ½©h/¶Æu–u¬;AÌqq7Œó_gÍNÓÉ•ÏNí¬Ã®Àç˜·Å<±°¼7ÓH~9¼+¿A­è^Ô'TQA­
iÚÔİ–Æw¦ë7§îş4¾E!bãêÄ÷ÒÈÖ™øñ©ÙîO)Ëç!Ù÷{r±¨ŞŞ,kßzÆv¤®ÿ§ìÿSv›SV{bãk¥PÍyÖü]’E…û£ÙÉ¯»R§¦¹£ÁYëŒš>5j˜N³Ed>.•­KÈ|fÖCÒ˜«zd}İÌŸ©4>d®²hÜö®=æ@Şª’/|$x'PæŸš½5wQ²7=¶·qKÒèQ †§Œ© íÀ°#2‹Úî4tÕí¢¸ğú ‹ÛòD'Ê1ı¯Y/›ï~¹fdM(êÙ7J¾{@÷¼ñö“”ÿ)¾ö(”Œ–ıÆ¡IPçUa]g»´šóşü}¯}c 4Ä­ñáÆÈzº¶)Êß¼!4…w×y¶gS5Eó9
Ú‚>ß+ù| .œ
8™í»êib)°>)!”OÙÒcŠ)ct
JÜ¸L
óXÊÙWx®”¹ñ ÒDKÚL‡ÑøŒ@0Ì×§¨H¡'Õ»J^)ÁÃ"<I†B›aˆïDùÍ$¨±Şš1G]K¦5´Ä[8ñí¾L­ÖÁ¦zØA™I³A«²(:ÁuxF•NuëªqÏîòF­¶ùnÚ¸åƒªòõ?b¤xı
§DÑ›Íæ½Ñ$şdïÚ{)bøß ñ–Jˆ„¾÷(–Ş	8^!´´éu!MJ’Bâ»cÏ¬÷7Ïìl²éPşàšyx<ÛãõxÆ›òåË|D÷‰ˆãë<à-0Ad‚{<›}gdš˜Í•?=#¢• ØaÑ:L-k2AÅâ ÷1¦çrmÎë«Nçõ„é(½ÑÛQû‘/
Ÿ	wöPÍƒ«‘ÿ#ÑˆøA	õ¬ã q„4®ôÃW4?Íã‚:•á™uêo«1v(?\ıxâÒU{Æ7¶f]“>@=s9%µ#qûº"Ÿër•ÎuK©hëìe5F±İ>@İ¿û'q\™Ãl2ë–ıÀÿëØ8ëã¡"ôÔÃJ°‰İQ'±H}C òR­,Rİ(Ô1#tiÏ¸z	‰ğ,iÔHş>…j8)N;õ={³şA¨¾ƒ<h6Ä³ØX]$g)Ss²4æX©±B«f:¥g8qhæ÷m“˜ˆ„Z6¢Ü2ùYc ÏLPF4’1
åşÆà@¨~°¼ÚÇP•E´’ßcşŸ¶EfNş]:
&)9ór¢èòŸãùGĞ&9ûÈß¡«ÒP[Î5i¾ÛˆÒRâ_æ©Õù:*ıE-®Ds‹Mg $ëöR	ÛÙVíâ’]‡Ô£L–GÕí&C¾×êŞ>ş©.…Ù@„¥-àl0å°ÃrtÁ×ô¸âgÉÂ\§|[¼ãM3McVñ´(‰†J»«;®Öh
ÃT×&ÆÉ9{œíÚe¿—ƒ?'³ÏĞÜ«²»	ô‡åÅºpœà×FÉ!–êcq|¡°üNq\ğ›ª¶³õN‰0DoŠIYĞùÆÔ
ğñj`XLpXXæÕf¬.a£ŒeKƒ›H5,áeã]A¶£¥¯c2ô' hğd«²Ã4ëBË·<³®é
øŒóø§ŞşV[\ü6Û‹PÇR¶£-ò¶‡`ğÄš&5ls¥}Øò6»jŸ8)´Å¤b0`†³fÌô§i'SË[‹½q¡ô$&\êëıåŠ"f2!ÒÓIy^o>‘ú Õ²Ò~PuŠZ@Ìzı$mEå¨˜
Ì^ä*Ù¢şk×eò—¼.Ã?´>Ùßÿ‹úªnª‡j,íşÖäÿÿå,±øë{=§,t ah¯ùıìmõ5ë”ó×Xş¦œ
¹•»§|Öa{2µYtdêLÓCæJSä<Q£­½TbÊ©órraiĞF¶ĞX¤(pÿQL¸ö=qš¯¤Ìß‰Áæ¸PË2ÙI}İ´ŠwéÛúR£ÔZòÀ6°]Ó/Nï_r<Îyo‹·çkŞud„N şr9¥K—½àÆ±G“şÆî¤ú¤6Æ},šƒDvšÍ¾»‘ÚkòóÈSÌ[§˜7’§˜'“§˜¯Bİ+ònÍ•³€õ´~_e…ëpøPıNfØw0ánLV!fíÒõë‰şe}HÌ&ämÒœ2
ÒÉò†`©Êáƒ‡kh¿=YCU¦3èl2 MğSù8=¸…¼—‘kÑ4¢Ü”"¥²½l„¨ÁÇQ%Ö0=ü¤îE©J1A
`‚Gœç‘ğ~TLŠ«µ¢9r“Gƒ‰zséµÌ²·OL3Ô5ğÌ·²±jÿz©™!ÏjÃ?d¦İ @ôİ	D¬6
K8sİUXb›F“Ñe<²ók¢oÓ­äi°@`ƒÑš£cl°Ùi’ªp°QÿÚÜ·	Nºà! &6J—õ{«G>NZ	|¼×9‹ÈÇW‰—á™Ä­˜Q£Ù)7Ş?†8à^Ü?%`³A~lÊ–V}ÂÅn*êë†HŒö¸¼ÂuEÙ&h–ÅùùãñÃª2‚ùGû;6¯9?y<¹<g‚dYò¼ƒÅjÊ¼Ç¾æà[& ‘¬ö®YÚ Së×`¨ËMUFŸÎÛñ3ğ“ÑgåpXNgcı"iÉ~ …Š4ÅÖ#·?JûóRziıŠ|Ú­·o“‹øƒDà£@#Ã?õˆózú³%Ø-“¨ºc]Ï;»’Ç|ÀÜ‹#ï6	àÌüoüM«Ôo¶#-ê¢8J3€±ôª+¨Ç0Hç~^K-MUF¿.á“o.Ğôæ‚
©õÊ™â(Î£Ÿ-ÎO‡Èç'ŒC»öYã4Îƒs'qZµÈç$»*ÏÏÕsSV´…å¤—°”Úyul
¼™†îdƒ‹ ø½zñ]Ÿû°6°&jÌı}ÄV]ÉŒèY
£¨¬ë˜÷›7,÷Rğû—’9£œá}„êõ>m 3†ìŒDüéx²P
J½‘µèkGgnà¿ê/`‹L]ƒ+¿¦½ºşDæàf…ÀNìjç2¢O|w1Ãàİá°şşÂ;Ø§œAàzr—‹k¶O­YÈô@
(iÔ½à`ÁëË™E‘1Ò3ğÜ‰ÙãÛÌcÏ@ ÅÉéQÈÉ§&\v]L¦ƒ‡c:Ì"N?¢ˆ›rÊıé®(ñmúNNôû¸<Ï(äfP%ù×å×Òg¯•%qj˜Ü˜ô¨û¶İİˆ4—ÈÒÿÔÅúw{øİş¯ÙÃ¼ìpĞvw_yOõ?ÀÁA<Zİ†ú:äÅ±v‚%r±J’ª4¡â½§*ù¨^y ¯›¿g×S¯fI\&ˆrÈ„1°ğô2ªZ*çô4àÓúgŞp„ÊŠ2È9‡˜‡:AÖQGÛUåâXî»4a;ÎÀ
†:@ƒÖ:!ªb
¡Q +µ¶ÒQ1ü;7¼K²Si{¥%&şÉ€ñä•êó ã„2a¢Öqj'ÎNncáİë»>èBàá+B˜WĞqÒEl#‡¢ÙcªC4–åı†èrq=¦ó™›iä6+3³”âB+ª%Én;’l‡Àìµê³d<Å¥¹ñ¸¯Nø_su[Ÿ|¿vÛ‚»êˆÈNµ¨À‡9á ^bÜc
ÀèÆ‹K{ƒ
Şä1S—
}^ w]¤Ã´µ¤fùG$çñ„,1iõ©‰í2ò ­³ea@àU˜@í®F@Tö€CYƒêJñ=÷ĞÄØ‘Tf¶¦;áŒ‚Ú!wíˆ6BàÖÙ¯Ÿ²ìsÉ‘·_N~¾yúÙøœƒöà|RÑKğ“sğşîî.°SÑUø)i®ş6#vQ}ÒV1ëI»š9¦—Ñ<¦˜›O{éwPçvs”ºªŞŞ€Î†Æ>/‹§ãQ1lÔ×Íºú6¨^oÕ1bXòí±›Ãv»Íó¡¸ÎöPC0ÈÖ°A õŠz=°C¬¸×XˆIğ;Aú	e¢rìÕ¼G4t÷ol5ì¾Şg]¬üs²ÃhÅÜ°± &¼³=¢ù¡ÎÆ»>ıy0ûc0YQµü´måıªŒl²)L³OU–;Ú¾ôsä™0ªò;•‘ªÎØ,æ‡¼Ê±«ºZ/„ÜsPpõç)ê¼Û\Sµ”-Š‘FDµS(ì4Óª?Ó;åF¯¼±Ûş~İ‘7vİ‹şÒíR…HÇ¥î·§t-Gm»âtÄéSÙ/¸]ó50Î×@9OÀÙÈ3¤Xe4~LâÁÉìdŞ~˜	Ê-töuM‚€órGaç>pÅk5Ö÷1Á"Ãº@³×0ÿí.•ahŞ­ÅÔ0¼;zlğĞØ¹[ŒSXÙÜœİf ½¤,«6\ÊŠÕÒîšA¸¹€ÈÃóhçp9ÀÇÙ¹:à—ÆqÜ Î>d7âLr)
¯‡ì•.öqIi­il ZXµk’ªwäf®L?q¾…ÈroR¯ÏVfëüPÀ(Ÿ­•tU˜V¾âRQï(ŞÜó”65ë<‚6±
âyq2¦­ï›[hMûğ {«8Îâà–O=ç©óo¤2_Gä!ˆ`}õÌşdğÛMÉçîƒb¢ª¢cõiIÆ&mp¥4V¿Åpshü]ÃwlÖ/¡ §§$]Ê×7útJÍß‹rÈçŠDÙ”i´“i®P–S9›Vi+pŠùŠ~ùŠMzMôE”[j•@ùÅ2	~]äÍı¥è•NZ³ãÊz;®,¸ãÊŠãßrÉ_èìï%ìÁ“¤Ş'ËšäÒtÆl:¥åäÉµîxa)Šyb…2t3A¨ƒ¥€|o
«0]¡‘@âq§=(^„‹b¡ä-wFFêr©ú;ÂÓOÖãiXĞjú‰jÔdÅ¥¼L5ï(õ$ªÒy7ñÂàpV(J–ŸúgP0%+_İ
ÏØ&(œœG9Y8ÒV±p0'$-]‰‹’Œöq‚ÀÄO >ú§/>~ñÅñyÒ,>OÚ‰OŞ‘üäQŠm¯‘Jf`1È¯‹Ôä.¥š8úpE±ÉoMnè/Ï¡¡CÜÇÊïô~àÒNü ¡
ä×”›òÖ Tg%cÅïµ„ÕÒ~Û#jó¶È Ï†å5f¢{h¿–6ùÛ”mÁÇäkspšÎÆ“A9ã°šÉ×ÔU5V³æØªk
|D—øáyn ïuUf;Éö¤ø$Dv›ğÒT)WùÁ„‡8 	³ªÑ¡jÄülRvuÂŠÔ·§_\Ôš‚¯2ô¶TÂVÒZ¬ Å^˜vp¼Y¨¨QşÖUÁ?Í™ÜËÆ²±ŸÇÄ>ªìNHC[¦¢„¶şˆì"%š&ŠUÕ:Y–ìö²o>¦`1<Ë¼GÿBh~œ| …p³º­©¶÷ñ5k²eÈMÚ0®
ZZ›q”p¼@||>«í¿Å×³jgëË Éªå-/ù¢BoÛ2>	Ø©ğˆ¹@4¹@¬t¸|Ğ&îA›®X®™fı}r{dÎ£tÎ[:O¡tBê|%Z».<mŒ®àyÔáÁ³ü‚ºr%Ç ÷¶>ø+·V*÷ĞÏè—€Àã5ëTh	tãÇRíÜÄg†é.HÿN´¦!°vk€v »¡Š7áˆƒ6
{âĞ&êŠÛ¨wÁX!K›mÚ¿•?~_C{¦p<¾õCLk‰YAay¬™7ófî.z"oææŒêxp'7ÚìG<ˆåÏgæŞò¼[›:èH1,ó™{^|1³DOWó)YŠµãè}ìõ1uyœ5ï
ßE÷†ïÚî
ŒfÒêšÎã¿ŸÁIË3;O	§<î¸®qûû¦_%qıDËtï µ’"Ézã ESÕ¢¤/æ¸İ4p´ónÎi÷|¸ìŸJ×ÎÀFfI‚²IG`#†]¹Ñû÷:™«k‡]#®‰Pâ÷æâ)~gnúkyí<  U´ª:ÿå¼Ù%±Ò%]Œü²  ’Gõ:]âè»1/™ÿ²ä©Tà)Wû½¼¸|8½:StÑS™êœy28§ÍÌ¯éf9PHÅA‡[NM}¡£Ë*„¸7«½·OÈ¬ÿl<©vF/ç&Q%ÑŞ˜¤¶ü¹îîÒºøJøªÚ^‹ÁmÿFÌ‰ñˆ*Ü«'øNğ­7¦„jˆKá}šà¹Z°³±
3n¿:åÖÃ:“)µ˜•£äIV\ù‡yñ—tšïéù÷P\bºã*G#àæJßö©Fõ$ğ’‰Ûöş²W_s„ë]€wWŒÇKÖ~ğÄ=zå×dŸÆ‹@·Ê=zJ«³Ú»’®ç	H÷¾¶ĞóÅ×¬ã¬µ"gIC¡¡{‚ yi¾,èV‘ş`å¿ñ6ï bßÏêÕ7¬„/;38ŸqîE«¹s´’ç6­µtb¡q±8xÅ	£F^BşÅŸb˜ ·5»>àÕ›
Òï1Psÿ‘©ø€ wêxue—ïRYú„|Ç×À¨¯d¹¢59Cd½ùbrºål›ù<6‹*ğÀågÊYCæÏúuWãßÉMĞSCïddá*hØã–ş¥³~°3Ü'¶²
.Gû2€Ç¡^˜;aeno3e`ùÅ™> ~ ï*ß7=Á«ŠÂ»c}•¦Î©K¨•`öNï+/¦T½©?8ØAÚ7–i˜“Ö¶|ôyc3òµ·!ŒÉúû_¶«®oõÁeê0_dªœ„«ºZv¿şÎêñ8‹ÇÅNhC+¯AúãEôzQp3fwÙ.¤|”¹>ˆÓOò!á!1îîøçØÅãßHeâ%ÅóEq+ÓUÌı:ï‹Ø/Š¡Wüí0ı’P«×ÃÄ6¯‡©	¯‡©ví_ÂsB&œÆ×ÃT«/¹Oñ7$‹³ªÿ,ß²cÙl{ùkôÂ—.L4©3»ßç*÷‚Pã¢öT:‘¶½!ë>‚¶’m{gÙnĞ²İmû¶nÿ½¶íî
¶íÿÂºÕÔI±O
Û¶mzs¶én;Ûô~G¶éömš`›²‘p¸sgiŞYšÏ¯¥¹²MÈL£Âf;°~E÷Îì{Ì¾©Ñ÷<˜|ORM¾…oò-V7ùjƒqGc5ùTË ­‡Îÿ.wfÌ¤Èv;1¨<R±ç(á½<Å
6
øµ¡mã\Rl²şsdE9áu0ƒ`)ù!°‰†’¶ÂW·”vß¾³•µ­d<šd6‰:
5Öß\¯K«¸?­f'¼-¹İ`FE1,laaQËÈ{+RóÂÊIÓ©pëDÂ‘¹	ŞàÔUz¶¨C¤ê²±C2
Üs’Õš!Ø9¼‚;YxÕ"åò2ìn|½0# àú6ä%Œ6V/|šÙ{gøŞ¾w†ïí¾Û«¾ÿ&Ó7ü8® ¾q+³#ËXÿ“`?·†-y^#ÃöÎ®}ævm’1»‘º{{Fª˜DÑø|ÿŠF4ÕıÙL<œÎ­ –³ê­\ı@¸d/ÀùÒ…“‡ĞoğÁèÜ®–1:„‘°32ìd˜ K(¢>Wt;¦´©=Å›ÓE9b›ö[¯tşÒ‹Í6Ğ²³·e0½Ç>Ö°ó[ š)†¢î©€é/J"¶²Íö¦ƒ¶ky
%û²û§!j°Ö–I¾à±P<\CšùH6µN‰ªé&Ná©#+}a…„Á¾[FTyÚâpİ{wşÔ=Xü/„˜
7x|?Z³xŠ!`¼ü½z´ÿ³“Ög-«/½Ø!w-«­µF{im=DKy…`X'Îqy[4ˆÛ<&nóÜ”Ô8|êÑ‹MÉ«–V¹õ5ş#Û:Ìïmq…H±÷±ˆ4 :[ÇÔ¼–Ëp)‘È(«?¹3e°x&LÓUEË–±œ$E0^ÖKDaø9B9şBù8^¶Á©é{æ;4Ä`©‹|Wé’Í%&åÉEİ+üaëNÂÓDÕ²~%©ÇÕçôµz‰c¸`­lÃ,§â±QyÈË—T—‘«„äCêOß_\QÜ¡ÅI`ôÅ¾ëëa9àAˆ*ƒŒ©İ^=‘¨sˆW«çd†\âQsZÆ\j5Â$¥‹G|1z<¾®•½a›ççÏ>-§³Áˆló­óbV¼KˆÌ‘Ÿ0©?H@·œR˜%Æ§±¥ëÜ,WbïŸÄ
~‘uù¾,Ø©˜À~©ñ™[Ò>­0GÜ°k|	˜.>¤¤çßVıü
¾´Ğ7Œëó© zy^94Ô¦è«šfŒÆÃbZ'ÙwŠ{Oñ÷»“I±ÀªpKÀN ™~ÍI7ÛÒîò&Ø;Ëİc)ß.	p§ËÊ>qg/jå+o¶‡˜ÏxMThé:Q¥²ğ¤*¨±¯ ËA+Ã6tÊİ±àO…ÆI;TI²Âÿjw¤Ò©8kùöŸlé
èg~yÁ-ó_FóéÅÇOø8tbåã˜ÕËíwô>[Äf§D>zÂğ:‡»9v¸©­«
®³™Tj½Ëo
âÚ{šê,áÜ‚cÂ“¬ÿ_· Ñ
-yKcğØÒ|l lr&7QœéwpØ3âJµ8¶¡UTâ<Ö +|]¶wÈÑ¡¡³N´ò-rÕóÁ:ß­Î:ó$Ö™·f…ÖÎRÏ?Ö¡±Cd„3è–a)Eşp²²d.ä©=şğ°ß¢ˆG>KÓ*¦%ÖV×v§@µ*·^ô9­°İ·SĞú)ıMn(jòƒBxŞm¾h#ï9é•ˆà%ü¨dÔ#<ƒÑÙ`ˆbÌ‹gİ;PTÁÕÓ,Òùòí®°~q:ĞÉßúÔ]¾~kŒç»\µ±r³ó‡yLƒhµy<şFİQág»tÿø£›áĞğ¨9X/~]g§k°Ò½ÒDÖãê/1Ğd¤8±¯4é”¨d»)«ÒÏöÛiM=ëyü†Vó­æ—?`ÙYçÌ…šşÚw8˜2Rß“’ßšîQ0Å76!‰X %¢4y’6 µvD1,æI.Ùç¾S¼ùî,Èé¼9çWØN¥´QË‰«ºõ¼oO_iE› a¯×&ş^R¯×Ø–U•H'qoÄà$ÍK 7égF	•Ò‹ÌÇ¢Í}æ‡mæáUl“İôGq£V—Âh2àœÜ€+ª/.›*çXqîNV©5ùY+/] ¦İf»¨¾+ îÌÂFå,¬
²?ÈvùYmb‘×º0 övøØ†E¯ÂöOŞ=KÚB× Ól—‰Ö‰İÖÕèc?şªaÏŒX¨¸Y
p9ÚGŸGÅsë¶iX,Æ7D­Qñt0á­íCi×ë‹âÍ|<ŸêUéxE«\b|ävYŒÿ1~HçWê,¹~µ;ùSõ`i¦Ÿ€>A#A­D“À-ÒW÷hŒáõ"š	ö©aÀÓüİ–¸0ğ;ÙÑÁ¿•Ã‚y£:Ñ¿¿9ö³7(À¦o6_ÒöõŠÈ±Ú¤5w2ª7–õï	ÛŒö¯GÅ9GÆVË…
~§Úæá¥-§ŸŸûÍpŠ1õ$\Eîé€¤ñ¬SÛˆå(DóÇóWPØ’Ğ£a¼\áÄ¡¢QøØ÷“ÑÅXÕ?Òõší@¾Qèh‡Îõæi5±Ëëï„w;kŞò¹`BjïuAÁk.ã«	nŸZüÅ3¯»ë×øà˜`ÅÃŠ2T@D-ªã©:uhb²=ŒSä~v(Œz;BCŞ­öÜsx¿ç¡:„“…‘b/m÷Õ,Gè—Wƒ-9ì‰k]„Üø>àà¡OOü„gd¥=Şu:=b*áAœíñí9Á´˜7cZÌÛbZÌ1¥á—9ù¨‡—Ëé‡,Iƒ³9‡¢„Æï‹x02+©‰]Õ¨¶€FÓlíb¨ñAsÂ*Ô!>êæë*ÄÙ1·UI—
¾UO‘³œC
Pús0[Jîíà<"šÇ££&Ôfª#«ŠlZò¥šé³+€Ê%%âÈ¦d:fO2¥VBÚ^šZµ™:Ni·NÁqÔ?YGq›SÕêUAÿkœ wT«jqŸ)HE ºêBQS`ƒlÛié+÷ğŞ;ğ1'áêQRƒ5Ñü?½qª&:|÷úšcGgÃ›óÁ÷•´avFIíšfj=p.nÉs$ZÚ®@¢"õ;6“ 	ÓßT9{K Ë¸l#¼Â–çvçc…%ÄtTxĞ±õ»İ›,q¦k{CŠI‰=ÎJØÁÍÈ!MÄı¬w˜½ÆŒıÎ©|ááPÚ‚u*.„ÉUIá«ÓùÎ·ìÇæ¼ñò´ñò®Æ;Jï¨«ñÒ<<èjÄ<qÄ¼³G<êlÄÃƒÄ!:3O3ïpÌTÒæİÑö^ê<ïu7Ï×SÇ|½»1RÇ<êfLªŸÎ
²Z÷tÛ‡7:¾+¥»¨áµ0èD1¯…AGªz=Ép¸A:t´¬…Ã½Dîu‡Yi7³A×R©¡®ˆA'R¹‰ìx´9:’ÊõpH$ÃáéĞ‘T®…CGRÙº{7éZ&æJ£w"+~/mô{›ı´ÑßèhôóbÑõ²ÈUÆîdÑWûõ´±_ïflÊAùk×Dg˜+Ş	ÙW½YKıŠî7]vMztµñ;!şãwBş5ÆïDÙµ1(:ßåf¢®¥–ïr+Ş‰ÊóG2cPŞë{ƒŸ—gƒÏo®~L€o…zĞcGD÷©8<‹~:nÖ{/]EœÄBNÔá‰Ã M]W'±ÈuÄãëù§U|ç‡ü„ÙŒ_´=µÎ"!`0&÷gŸ}–=|˜=¡ÿ²?>¾º
pe`Ne¥RÆ`àé`•^H‚Ë¸·ƒÍ[N2è‡[B'KbsÀÉ6L£öå%­böøq:hıÁ±!àÚÇüx:m_¹[rqqñêÕôÕz ;^‡»1ı4Rš¯ºçŠ#¶˜rÜÑ±HÎïÆGğV$`‚:øyiœ„ ê×R}Ÿt«y«xPÕ·TÎ8¼ö´w0ê^] ‘½”ızŞ]©şçmïmæmß…9”C>.îrÚ*&ÊÎñis\˜îŸÊvå½‚¸"è 9–+ì
tL?,¥mÃ›ô¸‰’Ø*¸="±Ñ$æûûïK4y&W&ŠÑyV…»2!GãYFÁç¿—çüÊÒB=w3L¬Ó÷«€Ìë
G(ôÔ"h­¹«pl*ı8D$L0>½Åƒbo-*öö®¼»ˆÿ
ïñ¨Mlçàv}Ğr„R”p<ÇvšÇ^‡Ú@¿;3’f:w×Iå¤±¥Ñh4¤ÑH“rùI»÷@r7uğiæáSéâ³‰3zÃÂ»N[6ñ^}"Å¨±óäã÷„›RìqîGâçèz:•J­‹¿ã†^zÇô¨LK4:åùx%ê’¾QïÇ&ş„>Ò$ŒâGÒ
Ë2êYß	?d“¾ùwéLú˜t¬uL<O/è‘
GÄĞ2¦hUœ^Q#‡.¾$Ö@Ş­d°–´ÇçWHˆ7äª½R<¯·HQrÏ© Æöô”·n¸·ëÁFÛ &,€ÎrÊ\cÇe?T˜ŞÍbÏ4Ş×•ãe¦õfu•+ÿZéØ¼#j7¢‘¸ú4*¥¸ä(éúa¸ºZ?˜Ãë«æ¡Eb,ª¡§‹áÈnGÏ’Pş¨q;ÛêóÇŸ’OG—ˆ¢°zˆñ«ÇŒƒwCZñä÷sZí,ç¿1ÍnîÖÏ»ôp·‚†ı‹}y¸*ğ¢L!¶âÂp7›2ó€¹A>„åã%e6Á óg¸zŒîé¡íQ¿á-×£ñ‚£
M„¾Ûèæá‰ò€d*Ğâ^7Hwa=
–Ç-ƒ[É–5{NS5@KO–Y`Â}æéFÇ"iûïî;ı7|î•ßPHpx÷¦µÊãÁ¯Gğg§w&£üœLÁ.ë¤R¨……¹eĞÉ¶¼©_+25ß¶À&3ÌÕ’ä¡ ŞÊö¤Qñ7Zƒ½lO?Ãª
¥{d‹»$0Æc¸‡±yP¹qËw83ú	Cblr˜Dº3ÏkT8ºt#\ÃU%oëĞ  Ä Lxœ/4":oCPL‡³rŞˆ˜¬.ñƒÔ­‰Ã[¼ÇXIÖÅüA{w§Ëh 1;µ´ ª4’tÊã¡ÿŠ‘‚¶,˜(ä%`/ğš
ğ
 l¼;îSC.”_CU\CÕœ #şc?bà%ˆC6vúËù{ùj2nïÑ8O¾êúôC "2‡³Op4†÷G–wçš$W;G&ô±™7h}£¤ç9e52R=åLvî*Ú
··­TB+50C	G*§Mèp¯µV?8Íi"™›—2¤K4øFİş–µ˜0~ıíÈ@ (Òx6)
E!÷ 6¦§È Ü­DóDu…f}¢ª°›…´D³PñÎch3åÑbŸ2´øQ³ãªİe§$YŠvşj>Á3lrhşR*ƒr:ü‹3|ç‰b-\ZÀ[«9kğçÉgzû5Z7ôwş)]Ï%ô…ßJ¶?Iñ	ÓlÑ))±ŞûÇŒø¨¡GÜ–‚{O~g½Gv¬{Ô"«HD—ÅûxçIïMkÑ,eì``7(ÃbrŸ¼¼:–T“TÆùRé²4Fr[™`º™1HñrwrNöœBÏ²9Æğ»„ïŸ‹‰Ú­‘oÅh9_ô9è‹•m•`­ £Æ¶ï<ÈA•¨&˜1”¦ş"9x$v<¾X¹Aˆt‰µï,œŞB(ÛSy´]š©ˆÃnâŠgPárË¡Z¹ßÊâ9<˜~Rù¨ØÃƒôr:Ø¢UFÉß&ˆÖõBP>à¢„(“%¼ú¥Èº„­-b@½~{8ûuX|xôÙÉOûO÷?¤)ˆ'’Ş¾!DËÅ`—ıº¸‡º@€X¾M+C_ø
æ
lê_§Î^ôØ6PÅfLãszF1_–M.¿âu¶ÊA45ÖúÖ˜·WZİËÍªİ
ËRéÊHûéŸƒ¦ã÷§óÕ}q6dRà>’KTÈA‡.yNw¥i°²™Ñ>ÿó]›ÚÚFuÀ?ÂEÖ»ô»4Ñ’$H•ë.°a¬At•xee˜*ä²îIQ@¥C˜!"\?6×j—
gTÎ 6sáz7#h½+{)ˆ½à¡¤nà­^ÀT?Ù^ÜkÊ‹ñT£¹]õ>XméjW öRà$Ö
˜ÂrÍQBqæÌ=v;Ó„R1ê¼qëÅTÄ"%\‘`¥rw>ŸŞÍ/°N±ã«Ó=¦zeb€‚u	7¬vù¡æ0I7_kW'’{¹`;š,òIqHs÷v€òzŠƒÀõçK–—K;Vê½ĞÌ£“=¼Ô{e*Òùô#Nóß¸;İ	Ûp'1]›\LÖ6®dXLY\ğ‰°±}ãèå0Ÿ©Ù~<]«©”x9yw:áoö3ÿµEÕ‡eXi¾½$:¡µv»5š‹¢E¬{å§¢§ú ·$š—ùE
OOˆ"Gó)®—GáËgÙ[…µ
òd¾::Ò¹ï^¬2şİ3¿‹û'ÃöNWı×ßíTáùM„¡E/í´Ä›hÚæ©ğ©™Íg•ÍçÅÅt¸högùRŞÑføŞƒÅğ¢eÏ²K-%,Ï§ò&õ`¦Ê|×ÒO½2æÛ¾ĞxuÚ¥¹[	Ã¶ÔAõÊÎÅ*Æ­×ßpAËAF¸ğ›Æ{¡å¨ò4Ì)1®w:$³øz@ÃišŸ,ònöö"ç³„÷'sªpHqjIœV¢x`ÈŸñ©à´TqyÀ‡c| ¨‡ğÑå?¨ÇÛ[ù’èí·2|*„4®iørº•jI7Ènì¨ŸÔr²"dj xè_LÿÏ£ QŸz‰'îÜ	m&D0É´³¼O‹(mÄú³)d'k›˜_ĞZêçIvøîë=RA³›Ë¬ĞË†<éóõ"VS”Á'âï¾:äè¶í½òJW~ûot˜õ”
¤ÛŸæ ’Ò°T	§¡½‚‡(K
Ï}ŒiØ(‹ŞDi‹ÿjÎöÃq~Y@ô
â;yÁ
>»KTfG“éDÍQD½óùo½Ë‚p
®²ÖŞÏgôÑÏªài¼œüœ/7(p^4&xkv ÔYişS0ü%‹+M©÷s‡;ßS$‚»äåPœÒí’ób~Jû\æ<Ï‰ï›z[ÇGíÔÕV†Ö<”tóÆË£Sõs³›Ñ¼ÏYƒ?¾#Ñ˜¬A·Ã5CûMC{éj1ØşLóãà]/ÌÀD#£•NÙ² İ¼ÜÍîä-m»/½ÒÍTcn•t³SVõbF4Ô³Wh)ŞË^Ë^ÜÖ9©N*²±&Â¥'“e6oÁKÉ¼ª~t?a9Öı0û®õVv4<¿à¨<onÓ¼ûŒMüùŒşıàî'S«,lŞ"W£ù¯â•>ÍI˜nŸåÓ±BŸ^Yh•ñ¥Ò‚ˆ#@† ,¡™…èí5Åºg‘æêÛn­V÷Äzõ|N#øÚ}@÷»¦¡KÈÚ‹ç.±~‹åWls³undØİH `zŠ€ƒKÈ0
ò©ö*ÇØv© MC…õt9MäösäKõ÷Ämß+Å.Ø:yëh]Oô/•ÒPÂò“²YõF}{G(ˆ¾;ï€ÜKŞ„—µùé0?õòè5Á`MK&0í[Y÷œ¬{2
caR°	ÓHÑ‰ØˆiœÒ¥E7t
zÃèåÈ ½­¯³[e%˜"Çßû¾äÅ¤Ÿø2•©rQÀ5‹“0hñ··sUœŸS¼cµ‰#k¹l-`ÜÜ´dÙõõ…”Ü¬ÖGHSØ÷LWeÀ´cÆiáh2Î2tı-
4ádD?â€pz€ˆ‹(Ş¬ßuÅ:øyü˜ˆøó‹a˜Ğ¬îÃsH÷û˜aŞ^~Ó^á1œ@Uyc¨Ÿ«ú[û¶ÎÁ(Ö&H•ŠHíı5ÎšÄSÔaGÿâ²8Ó¥à]ï›„İš!ÚÕœ‘ºê:¨  ®ic
QUívu«µ×+0d:—'åPUÕpeŠé]ÇØ?šÎéæ k1§æã·ŸÑÇ.\ĞÃè#{Œ]é“¡ÏNÛj¦"ât(˜î#÷lñÈ¶õwø†7°BsäÄ—Æ{Ş,ÙTŠÕE$ÕBœ|é¾j¤SD1ÙªÚ˜‰3]Xç«Æ‰oB0jÕQ1qD&Ç3ìÅ#ïjÛílN«ÖåJ†‰ªmÌGnx¼ ]zÎõÑ·‹ã|ü}öl°4ÙŞ.ÙÆŸdÀ+"<üYÓ4¬ÉSÀ`Àp´7Ü§eñárr+Jî°_ñT_1Ô G‚•Ï\ŠŠIº4²…$öõª$SX… U’Æ¸j¥8AœhíìVG]Å-FüÖ[ùX[áò1{®ïóÁ£Jˆ;Ò‰cÇyÍ§Ic5ÖØi0Šu](.`†5è*g¯ˆ­5ÑJ?tfÑÉá\j/’Aú©8¢=É)_ö} Ô(Ÿ]Üğ6]µy®PÈ*ª®¨'['ú+î6(Æ•*eìVû¨hn±œ\|\
qQÖÿÃjüo3„èêjŞ®AFÒÉ¸1ŠÔÖË÷†PmäHÑ×¨)#eD(–äf‘F:?›Z(ñìøw,Ö±DA—¶ºdmDx!­aI;D|Ã"A¸x{l:$§w ›¨‘êé
d?¢â<yŒgtgùx‚Àô*‹Ñ{‹%à<Šµ(‰Löğa*åárvÂ§wç¨O¤.Ì¥ĞãÒ\)´
¯Áø®§:{=P	Ÿ’h}oÕÖ7\ÕÖ·µ…ú¸¦  ‚3<3ğDV/UÀ¢d’ØLú2—f9ÍÖµĞg:ÃâoÖ×ükJµù€åQº
œmaş’2xÃ¾wF–)ıš¥c!%pùÕ›ÃQŞ¶Â²M^NÍñhD‹ëÍw‘¥ŒùíßÅö7ÙC×h`5€o¥Ï
Pœp_«7Ÿ­£9éşéúƒ|L§›
Tí· ó"¤4‚á_xBœLç4«8ü$2¨$~ ã]é+¤hÿÃ[ñäAüP9v¬Î‘ı³c
H‹µ°°Š'dàÇ“ÓFp6Œ“t+LbÑó¥F>‘–„š@Ñdnºì*›nÒ#ß¬êŸ¯+b4Â÷
¹.¢m‹%wÅE——±tyâV<w‹LW,{úcc	#9Y‹™$2%~"È³@Ã+ ª”g‚ubg•#òU‘!A7	hˆ“ŒFì¾ŒVTU9Ò"4x;‡©9‰ní×7â=å/$h‘"x‘Âˆ›yUVøµ¸²iôH¹å§Àg¨	^Çï	·¼BZá¨Ôrë,gôÑp9:£‰êşa`CÇíÒò‚×ÛÜ:¸ñüòş]åiLòÙdÚôd¸h§ö£ï46ÛáÍÁyó,œÄzƒUy˜É¯¨îĞ?Ş€MÙ
E¼ŞƒÅ"<G€¯İà8LoV·KÉ#Ù%Ó•s ŒN2«fh¶šl•»w§’cÊ	|?Îu‹¾f;Ûr3œmm^Ø»§’äÎæ˜ÍîşªŒğß;r¹
H¼uPUóV¶üIì[U(ŞrùQ˜N´“qùj§[£’ƒXâ{mÇ’ º1<ÜUo¯º§üõJ”„¾™U–ÇÆÀñ²=² 2M6V4×jô*ğJïv<U	wV–éw/îD°Iã¡ =[U<éåÔQ»Õ¯WºëMjÅª°­
ßu´ç½khÏ+5­ÄÄÚdyóD//6’òo6•òo®%åß4’òo6—òÕ¦¯%åOì¡”;o'G›?º`â$«ç¦lq4Pw:t R3ıJ†(÷·Ã
y¹²)º^¶SÓ
wOßËYÈ>ÎõóKïÃ§z‚C5ø‰0Õ!dáÍÁÒô]mí$uØø¼.ÅÉôm)ÚîÄ$Â)2™y%âG$8 ‘83±ÈYá+zñSÌœ“ı‚œzFgßèÓüı¶²•ş¢s¾œ—SÇ‰H{ ¬+ÖHN‡#°’¥yES((ıÑñ	{VjÛ/X†³1L;uŒÖ:]—ÎZ¹ÎImL‡ùXïçÉÓ†äÚğ%Õfîø$õ/
 zO®•Q{ªhñŞ– mX‘‚ZOXy»5lIA/ç›l¡@nÛÆïà‚ĞÓSª	.µ>òàªüMû^`çæ~¤Œw÷|7³`Î[×†»nKÛ_V<©&àœ,¹3œjB;‘ÍŠïì‹ø%ù\7T“ÈİØ¹*8m‚ÇÏ¸0¹¹rÑõˆ³+âçDã>YœÏÑ¾ceeâ¬Åú6Ÿ]Nì6UºŞT¸CÁ‚¢Şk&êôä£Ék}¨¢.†P:2pã•"öüXBÈƒ}bÃœÂ$XÇñüü›\d
²LÒrIG®éI“5p¡155ğ‘ÙÔ‘æúÑ`¶We?OŸ/æEàsñI™7Y,)­­¯ëÈİj×ùÎª¬Ró—K	«â>ßlµm0~GQ5kÓ.Vïô+‘ÃljİxOı´BZ‚CSxP„gãcdÓZ{±è±#x°¡ÿºô¥zxçƒÉ”xß/†tgíc«rrŞµ‚v¯ 9·×‰8ÓªbO`ö
Ì#’˜G$2•Ì4íÙ§®"5!xBÆí—'4<ÁZÆÆÃI!¨SËõíÖ~­¶ ákµxì	`-û_º¢B¨C¼»ß¬;‰—ç³Úéêö&`
æ5±šÕ›ÊšØÇÅšÌ³¦‘mîµ¡ò¹İ@|ü½@'ŠDñNM¹™Ğ¬ñ?$'DÌÉÊ3×ÊƒV¯¡G“ût¡¯¶­#ú8Y¸iú•´É¯×…V÷çß¦j^:
 NU­ushHpµ‡³Ò¢ÓT¼á4¬›»áğ©İ?:¬Á‹k5›H»X >^„ú(·³í
ty‹¯UĞï€Ãu¥Zê=ÂÛU¿D»SM‘/ÎÊVW!B„“ª´~¹ƒ*’ÛáÇŞhY\ƒVbGs¾¾´Q£7ÑVM¹îë±æ< m°ä÷ôKo­nÈwÃ¡T¥7š›é
¾;ÀJbcÄŸ’øï¨‰kŒ‹GÙ4ß°E»”ÿKòò†
ÙÛ |“†$Ç¬ç&Ş¬lV‰e=ù²GÌçÛ5ã“®_˜ôÍgB÷8oşîDâ©
XwÊ¥Vš½[Q")Lóîh[ÀáŒ¯Íˆëö¦–cÏ0wN$]Bp¤íŞ÷ÀJU'Ôó\?!Û×ÏáŞLS¢<ÛDÛ¶S¥VéæqéùV‡`èR´,î¸Fô>ÒÅ]Lµ™XÛ®ô1¹Ü,ĞíÒÍå)NLv+ŞVdéçˆ‘mRcwæ½‡I®øIú
Æçê—•-‹ws6*…ñ‹_¡
œ2F%A¥Ç—ÜxGĞÃ´>ëÈÎjlÚBpîĞ7’_a/­Ñï‹‰E“rì
üûêak¿œÖ›Û'‹·j!2çDğ‚å£Éú­lŠ¯óå™zü¼/Ü….´w—]­	;wÇNéÑÁLvóÃIÄ1ƒ<#éâ’ù¯ùørhíŞn«SÊç	‹k
:xc‰:mÁèOU"ïbxÇW”ø·Ã<Âó†¹’•ŠÌI×>'ºª¥+«7@5i`¤ºÊù’§O V<p“r}+5°ª
‹!/,×lª}Öj¡¬)ÚRÎÌ·7¿kİÔ¢ş®ş<Üç”·~Ÿ‘'ÕÃÁ›ÛúÖ³“âb_ÿûû—	õ¦4mïşŸ»™“ğ›fl“v3ë$ ¢w?ş…=â2¸9?-ãõuŒê×:kş·ôÁ5Gyb>ì–_v¿oŞ‰<oñ?ÓÕL)?[„àd±ıÖgôRé û#
ü¹µ¸ÀèµD‘é=íh½DÛüÈY@ÑK¿nìüÇèR—×Ãàé‹	»Û.;,5)<›­ÍMÿ×¬É³­ÔUt!4ÜÓe=	Œ§R¶IÜi•Íİzí½nãœ”/›=+@0qÆ%öÜI>†\DƒSîğT2µ½Ş	·×Ši.v×r÷nà´íQlu»#İÿ;¸ÚİY˜Ç¾ƒóÄêß;Ù³~Ç(4o‘=J}zØÛTG]	Híóºè
Şÿl®aó¦»À‡ñ&ğ_ÑkVoğz—;Ã,|m.sÇ$»-méÜ`H<	ÊE>òQ˜Ul;3kÓ¸«¯²íü¿kb]ƒ­é†ÛÒ
·¤ÖvT kw¥w¤jŸÑx?ºá[ji×Úì×^qÒïßnƒëU¼‹öµŠ€¤BÏä\¢FähT.312³ş^‘M†Å¤7¿¤ë› N"q8…ô“ùocñˆ.¯Š.Õy´=lÔ{Ï6ê†ëtß&³Ë3³’M|+×aMìN&Øå]G
¹+áh:ı <ŠæKgƒ,®*ª;Pylù³QüÎ¿ë²mbe6»Qkà6C¹ÎLŸk/ê·ùÅÒåpêÃ¸ åza‡ş¦¯ßşD\ÎO4ÎÙH–vŒõB›uèÑbÙØ¶:Îcã
)¨UÕRåıÂ¯ËWD]ç†×5q™|–Q…ìŠÂ¯&ô×ª"Ğ¨%sLÅñ¬ ’}Ûˆ*YwÜÇz5óà0€š€#Å0[!Ì¶5ùÚŞcŞE¹(Vq—sÑİT¥£?Xó1¶®ª&ã|€=8{Ç¬µK*âù>„	BhƒÛASW6«‚… “˜ˆkWcè?ªTrğ$—*Î"7GCô«Æ’R=f•b
ª2Š—ò,9aVúiû»ß¿+^<ö~{»÷í÷[ôù»‡´h}ÿbë›Ç?ÜüşÅ›Û÷Uã¼bıoU‚²¶;Ú*1 ÈRÚA^¨±µçp h
ûºqObº™ğvx‘ÏìÆ¦-”n¾êU“+CØÓV@Â|qœ @£
-P©Ìçˆ²+…¥"A_§ßJ¤iÕT¡%züøEÌ÷°Qù5V¡uâ8¨ãg`=Rêø”¨8‚xB¼E“ àF÷Æ¾Á¤RÇœŸLŸŞ™ŒòsÒéöİQ\ÆäOêe‘]û‰"aTG?ş”n”v³=é-'_“r%öçÙpÚŠ~ø;Î´>‘>öKP*<ìÙbşà|ÑÛÕé¨¤ô¯¨4k(uM}p¥“‚n&¯ç]NIÇNTp£Î~¢~
*±Ëâ°V:ÄiÇ­Dú@ºÿ†ù!ı aèöÙtr-MF<¹ŠçvlogúJ[y­°¾k©ó JynÇ:ñC®’§ÄÍh	äº3‚*¦91”®8%œø^?OxYLÜ:7!o’Å„sª—³zL1¨™¿ìºt®­ñf7®óó±½úÜŞnÓ¤Õá9î˜ş)¿|¿mÇŠR Ä]>í@*GSu)²|&nZbWA`„„¯ÜòjÀj(½(‰î¥°H`î–m|!¯eãã€ä©Rí×±Íê!{ÉÖØá
Š°Ÿ
‹ÏÌÌ-ë5S&Â£H't1kùX_¦°Ê˜6µœèó¿šÁSqCZ.K	ÿ`ZÀÕßcıŞK”Ÿ+ğ’Ó-We‰ˆ×ù7J6Ÿ‹C²òf¡å¹rºQ?Šˆ®ÚIDÔO";*_ÄáCÚñÜmˆ&•íwçNöÉ'Ÿd÷îµ¢ZØšFİ–kÕû×¶İSÕIŠa§v¤`Í½Wß„Øì‘H\{¶©hBØ€ßš5à·AH‡çôGĞ ‡^Eb¸¥r&wµéò<©°Èä¹½}ƒîsS&ÏšÆ%&õ]¾@–™·¢Tf%ËäèÑoô, ÙnL8ëY:w£~älÙ	8§R1N‘¾ T:•ºœ²}‡	UÄ]£E®<¼òŞ^uˆKhR`I	àbÌÂzJQl£Å„t˜1ø€¡™	v%Tm¡Ò¡#¯Ñ¡ ª‰ÅqÀ ¶EÊ¨¿Z¶[{´Ôåğ X,LøäW™	T/ê˜âïZĞıÑp:m«L¾“ÈHõEØæ6&}.t
}#Mép<Vu|œtA2Ø*‘´º±MqğmÌëâ “ø5PŒ¦tØç—‡ñÃ{°hƒ£o[O½¿o˜•àäjLÙ@HGV}Ê%¡¹ñ€vğ„·[Öt'ÅO'4{î.È>C³uß¿Ğù[[AG×ÊkrhÇøkY¾Ø‡¡Â‹&'K‹ox"=ârÉ\­u4ÛO¹ıl1S‚«µcÈ’€M¯Ö}šéß5Ş*0¨!ù¥OU¯“—|.±*B°HyMßííÃwßØBÕN”_§œu»ê´±ËÁPÉ‰ìÜ»x“Ï”Åz™¨08Û
<ˆå+;ù†ïAÊè“Wy’p!'…
Q
“%=GZ½Ò*˜ÎŠ³ùåtœÍæËÌ¬ex¯z9·›>ÎYQO×ıìË%çå¤MÅÏUã÷¨P_Q×A¹__
2-ë–4h€İà>ï æcÛõ¸1ğ¾Û¾ p¢aKMÁµl:¼<!-£¾Æ n¢Ñ²¸±š<R)Nó2Ò=‹Û‘ôr…1ÈœÕF©
U:V²àd,
”vˆ–¬¢Yâò9‰Ûız<ÎX³ŠgìP‘LFCªJ×­Å/›Ï,§>ÏÎ'ÃÁŸß2Zxg€´ú Ãú—¡Xi†/ Ò8™^Ã€úªAo¡¦ñÿäK¿Iì	–ş+Ë¿®İ aãş¶¡P)Pğ4²â¨7˜]h¯œ+ÿ|Ìa\ü
rYbj"–ÛÛõ’™2‰:şäRæXıÄfª ŒJ£h‘Iÿ€ü”„e"[IŒ¤5jÏã;jz½©
ÖĞZÖš
Ú”1³ñárr®%í±®dªV0ûf·®´äÉªô5Tø¿\…7SÖ¶ÇÇøÈ¨Õèé»–~¿‚v·k)ÄĞ‹ç'Æ\NÂ›wÈÇŠaü™äÆºßMÜJYß#I*«å9!M·d+«eaÊæÆâ0$`{M“ÏxEd²Ï‰©²áT…?»´(zw5š^	ï^“1¥m[á9nMxâ‰³€ü'ü'Bv¸ÆÈÖª8ş‰nñé;§iòsÂ9ÈÂƒNxÑÉô]pæ%¥J<:Öe¾Ğ‡veı]KaÃjèE3Iw–É	j`ŒLWVè nÄOÿÍ&¤¨Î?<e	[Óœ7^gãùìæRi7#3 çgdˆÉ˜KZ)]šYò#¯Ë¥fÙO—ÅRCN¤˜zºˆ†^>˜kZ‹¬§séæ&_ë$é>YYTÈ9LÇ«ÀX„Å…»ÙÈ©“ó¼‰œÿäÊ9Häá×PÌŸ•R)9)ëÚ‹Hw(€i)’Ş>€-n#Òt‘pĞù¸±ĞÚ?ŠÙu4²‰
fÇÌíÕbÌæwÕ«ÆóYK:a°•‹‘}sfäŠùzFÌQø¾’ªÔLŞ¨¦¾	¦ ‘/ëèòønc×«B|1Œûş{Íº&ú0È‚ìz¶RÎ69Ïá-ëSÏåÅ|¢TFÁâ;\T¢V«¬RzãÙÙA¤Ö“Ò(œåÙL‡t¶{ÛÂ4L©õ5²•mo[«èÙ<›Îg4@(í—Ë|A³^%*tH3Då²ê.ÎÒÿjŠfÂ“D¾êgŸN&4iÍéÍYC2>©W
×ü ÷4+Ó|F‰³áÔØ˜ÎôACÑw{ÙÓXÜ‰­Âşk‡ùäñM½ÍÈÌÑ†ts=¤Ò
÷a¡ C¥á¼=y²S÷ÛÓ!­!nãğß9y·3ÚÆCÀ¹0B>†’@§ 86ÌèµÊe!ÁeÕŞ?!Ã#+£‚&ËÑrn±´¼È+~|³2I‰%m´›é“4£	¼«äø§ïÍ™­`Òmw…:‡…ÑrgÆ9 2fˆF2¾¤Ew8qt±º0Ï™r÷ÈåB¡êfÄwvK!|d¼™_.Fô­¬é6õÁÉ×xôy~~Áº@K~ÃzÔãÿw&Ó!›¤Îü]¾FCı=ƒ„êKxvxQçòBå¯¹\l”ã&ğ´]^&3ñ84„z	y¸°ä> [ú=è:½Â23b»§Ño^Íß!.µ;ë†Ë–Í)2£X_9'k<ÂÀX©3º!‹
(ø<°x®çŸRÉàâÁ9ÙZˆo2É Æ×o:œ75;H"~™â,?]¶;pÀŸÍXœ]€:]©Ñ\vÙŞçã)üv¢/z ´_ö;‹#’_\È‡S0{ó€ÛR®
|Šylƒ@*— ¦!†98R,Ks,Í”Ô ˜Õ&õ‹Ëá¸}E¾]R0*Õu~úÁöİÀ\ßı0›§®DÕ»áÎ(€z“¨nÆÈqUDÄÛkÁÈ
	İ¯"ã-t‘iZË‚'I|&Š´¨ÔŒµ:à©ôæ^×É\Å{¼òÑ‹€´ œ?è¾*â%&3å&Ü¥¿î¢:>cÀ &ğ¿ñ‰nÄÁb§ô\•­}ê’ó9˜–`I¸´45~YÉ6iQ³uDö(\¬~]µÛùúˆÃ
íX\ˆ)üc‚k˜ØXcvQ«+[ŸW5˜,ôêF/	Pi¼èP†WG>,øÎ–'„£½Ç—*ØÓå_Ì’#˜¨VÑ¿ÏiíŞ¶)$Éÿƒj\.FüÓVêïfŒvd¡ÙkLŞt£ÉçjüíÿuDR=ù’Òõ	$šª¨AbM­3Vÿm	øæï‘ S9ŠuèæBq-	 -ğÅ•à	é D¨®˜v5YWìÑˆ„D;y#µl°lØÅÂöæŒ¶İï§Ã1m£ÿ¥?
ÂÏød>†QÍàWĞèW¼ÉÅ>z`ô³ŞÛİËo¹Pµ´Ï÷/ÆH6Uõ´Ï=aŒ‚ò)kƒÑUqµ	Ùåé½l¯Sx±Ü3á;Ğ´ª“L¸ürB´"’÷æ
ğè_&n@x€Q~9e;„Ë7êğ¤™^×ÉzÏ¤º‹=Ä.µÉe¯	%ƒ],–-­òù(ÿM>ëˆ«òåaE’ÍUÏRI•0D„(öi>J˜6‹€ì–ó¯Qí¨ŸÖ¾õb¼: @Z‘ó-ŞH òÒÊºa1@ƒYæî|1š:®g#Dã>éì#—`(Ù°áb¤ŠÚ½GdÕ’Ş’~Èñé\¿o!\Õ…nh‡éî–Xlİ—÷´´n[T{÷w_AnĞÅ­“))ÉV‚HO#Ud¸ÏÀ'0x‡Àpş
;¶ø…‚çShwmÖzg¤¥:©ì;Õ™3˜ñùÿş¿bÿgÉ¾'ÏEº9…aîÂZ‰ØŠIÔ’.¸uÅ‚u"7â×½ÿËÈ•d$èõ:É-æE±‰5Àb¾¡'>õ¸û27Ïö¯)µ½Â·±ÔÚ<ÉØº*›:‹Øƒ±è¶"Ãcy%­E?=OƒÄ£ç!†ÙeìN#4¤‚Ó›jÙ%Ö|Z—ŸFK¤.­µŠÉ({i‡˜ûA·»‚åi¯«ÿ0Y»+vév»Äqú]1çé×ÔHäáî] †H.ƒ*u©úB(Ğè<I—ØáZ:u­ÂæÊLì-Å?Wî»ÙÛŸšU¸jg2°•o¯Í…òıÄÃqW¼Ÿm×ĞåˆšrTéhmTÙ”‹¼ª51k¼Fk@´y[*GDKµt¡¤?k»b„aø•ªKìİ˜@EÄÆß9;6¾DaAj§&q.±ÓºMm]o×QÉ™r'[hîƒ1ĞÓ‡i7ŠÇ]&J)öl¬¶µøÄ¼ü8HûÀ^S!F@4×ª–dø›ˆR4ÊQàj
Ş›™kÉ1ª1\‚Xı8Ù3‡ûB†‹:}S;kCÌGÌ±ßOÄ¿Ù!İ õ »~Ñ\´u’Ë¬™j·wi+‰.²¥Î(Ïk'çYÁ1£©‚FUúËL›rO2ƒ¡üÈ¸a_«´NËn;>O:›$Jä:ütş¨ö72Æ{÷öPK    mFmºs©ş0  TÏ     source/excanvas.jsíívã:ñ?çğ¦H²MóÕï–i>ØÂv»´]–eYzœDI|×‰sm§IîeŸŒ<¯ÀÌH²lKvœe/p8d·mlÍŒF£Ñh$¤üíïõºÕñß™LC«ÕhœX¿ñ¼‰Ë¬›ù°öãÕëøc½r†l°‘µœ˜o…Sfµöşˆ”ªõæ7·Zµ†UF€=‘´W¹$oiÍì5÷Bk0 âÖØ¬ØzÈ¡åÌ­¡7[¸=2kå„S€‰r¨‘÷‚ˆ7m€·cOã8¤e‡ã–5
ÃÅE½¾Z­j6±\óüIİå AıÕM§÷ú¡w lGHoç.Ëgß.
=ØXöb(ö ¸uí•åù–=ñ¤…ò½òĞ™OªVàÃ•í3¢3r‚ĞwËP
.Á¥$ <(ÍÜÚk?X7{Öuûáæ¡JTŞİ<¾¼{ûh½kßß·_?Şô¬»{«s÷º{óxs÷úVûõ{ëw7¯»U‹9‡"]øPdÔA‘²—ßc	&Æg*X°¡3v†PºùdiO˜5ñ™?‡BYæÏœ +7 GDÇufNh‡øN/dÿìwso5·n‚`É‚‹H¾/¬7võ Jín¬`¹Xx~_0;¬	˜{{äØ®5ñá/›‡Hu‡ÊÃfğÊd=B®¸}e=síš s=ï¾İ59ã1ó‘ÎØ÷fÄíĞ?ÛÈ“Yv\g± "Ûá40åAz?
œïgaåŒÂ)
Çš2jIv(*ÖšÚÏğ^‚Œ¾ã¦l {{<pætô Ü€¦=Û.ÈÍZMáÔe^
Aİ}Ÿ
#½F"Ã3oÄÄÌ-•”gS—YL½¥;hŒ@(ÏC@:xkTøÛK7¬Y7=PpÁçï¡=|
(3 æºÖÈ·WJ–’Ô dÃ|¤T³z\‡Pà	CàË
ñ†áfÁ°½|¼}u,^—cíu5µÃÕ„Ú+êgP_±Á´Ä >\ú>2»òüOõŸB‚\Eñ|²1×P˜ç;dêšAM€øyı¿cƒş“Y"õñºÆlV›³°>š†3·e_}«aBEHöµ7ıw Í¬`h»%ƒJ›{Qe¹JbP«¾÷‰²Vî¡3“*ä“A°İ•½Ëã‹@›%aúŞ3Õ)"ú‹?şÑë×ØÆ™úí× ¯O²KQ³ºéœq-Ş’Íe/¤Ç_ÖÈÌA+°ÇØ÷ÙòÇŠ®\×[A1U–CÒ½1V.ĞGœ³$‹bà{+`‹@ìçt<dµ¨¤]›PB
:‡ú¢–Íõ|æóÌëHhÇî	PêÂ>İ¡ù±G#ìŒTAVLÊÉv}f6¼ÛBË#éqøãJù' €KŞPB&DY.qœR¥6aaÛØ:¬XßcşêŞx9"«,ßŠpê¹ŞŒY,@±ÎìOÌ*c_	½ç¨B|c{öÁ¦*Ï¶oÍ¬+ëlÙeêµïg5ßy¥“J‚vœNRÂĞR	ö€£ÀßTJğ­R~¹L%i+×õåÀZ8kæ‚™„Îk+IîO@«Ù¸L½lYWR·ZLºé=ı¡wÿ }$€ìÏ¡õOìĞók£ß`UÍìp8-×oÀÈ•?üyTû¸_ùU½ò¡ù1Éí‹êî#°5‚B­:ÇÉœTtï¼Îi1®!¿ÇÔ \©%ÈşšDò=¶H¡=Ÿ“é>—şÜú·Ö{†Ê-QkuŸğuõ)™Êœ«›ûêÈDmÈ¬¿şU©O9	rÍ}eeòDĞ•J¬Ú>§+*@oè´}ßŞÔÀÖ…Úò½Ï­‰kg>éª†zQŞà°»dWE±Ø(‚¡KXZáˆ²ÑÔ'Z]ô¯±i!¹ÏP…òô9Qu	ôŞÚFûp‘ ?(ì X/«H¼jÙUkPI•‡UkT¶B£I× qËJÕ"Ìœ~½°}{f}ßEÿlQ&qq(!4xe$qG©Ÿ
H(è©¹6<ÛoØ«)ê±¬Dñ@X62f÷â3jÆ“íOë¡ß–Ô–(K.‘#ëÁ3ePaNc:'…ªs¥¸0·4%¸6jy„Ç™˜BÆ´¡Tæ-m/QáQá¢V˜°¨Öo¼º#ş«V«ril´©^„§éP5Æl„ş`ÚaÙ”S¥’ÎèsFVY³9¶—àµ¥ó[²¬ÌCˆVÒkàô»ö•ë?¯Ãø©ôsh<—¥Øë=şúÛ¥Âû­\@gşÚ±`ÈĞ'W±7;ëªÙjÜÈ»6—8ÁÿÑ(È$h
2+ÇÈŸ?~óOaPRÒd¸óA{>zÀa@0e,Ä¢hée-MgîS	¾?¸@3;8˜9CßÃ¡é8
 ¬ åm!äÇ :â‘L¥ñf¸\ÈÁ„Õyx¨Y‘Ó…#/1Ò¡2â@Ó’nTF=øBJlıÄ{Ú§’V]ªsAïP…_ö(G2P€®y+õJWØz<'3Ò0¡¿CXø=ŒíAƒ7Îì`àzÃO—8¦ƒÿ|1uF#6¿,YûŠ\Rt‘Ğp”‰vê°ÑX7Ø/ı†
?y4^¼™Ùf%ì€l\“—ÃKş] ™Åú’/šÇğğ¹TPO©6T›j ÄB •G½ğdûPåª{ÌSjYÙÍwû
ê1÷)ní9ÌGøàh¤ª˜şEÌöy‹ğIo'Š(¤®M¤l†:Åy1R°Æ£ål¶‘øãÜúßô¤'*†‘ÇG=+3’çÖ›Ì¡RG5£É@\š¡a¦F:½g‚õæ4^	B À‡Ü¥*u<ÜgC=U©·ª"²nå«é6L(q!GÖK6†ŒPiakREËD—¸'@¯7öÕ%¯Ü4\(#
(4.áÏ/\ÍeóI8…çı}Á£ş‰!ˆœ¦l>orG•ïğf9€U:#PÍA4pÔTÈ	1%æÇÀ4QBŒæ®`N
Lg†!ÒAìeèÍ`DŠ 	BâCöNç9:Q×³G€µ½Ó„i@™§œÔIh%BËQ~š.KÌ=É¡GÎ—$,´_sş’# €F3%AÈ6&aAIwà’¤â™/(òr4õä¥1	“ÃÜHÑ´şŠ¹±Á^¦>*(Ş¨­?-l‡C/2m0#š#ô6š¹Ø#2¿+mu[÷|¢hõ=°‡Ÿä¤bl†kîÔ7È!tÌÂrÂ»”!€–Iù›eŠy(nb¦;zˆ5ë¨@$¥ÊÒ’`8V6eÅ5…ÕÔjCCÛGÙ‚‹úb(Vf:sê:¥<‰¼hA„{
±Úø^
x\f²fP“•uº?€Ñ4¸á&ê
¼ùñªC¯*—EI0œï8‰{úªTÁ`ßi
,<’5C¤·‚¯ñ©ğŸÿÜŠ=ÖÄêE­(Cšwİ»¦Ó33îî‘åŒ}`69A°ğ²ğTóƒÚò˜œ„—!@j’a¤`í[¥Åº”AÍæû¼\$}ü:ta©„sœEq[pÏ×€zşÏVÁKâá)Áá• Šu•(ÕW­‘ƒªÁönQ¯Ê­6=•+[İ5ÊNr<ûKÓT3eF®;oXĞZày§¨wVÁÊÉUè!kÒacÔ¡
Â-‘—.
ô’ ”!˜Bÿ
ù(®Pó‹Û¡›!håÍş3òhÔP›L`Ğ*mcv‡0vü ì`ŸÅ¹Êh´ùl|°ÿ—Yòãú÷NIp×&dAf‹Ù]
[gVD—µ‹:§Íc¢D¥Hw­ç]N²0
©iT®¤–fpÆ—põz¯ÑØCgm¯ßßKĞGløè½dk`ë.—äÍš'É1™û
‡ıFÀ~c¿Ey~p¬ åÿæ#`:µĞŠÍ“
¾¿Øynm °¾´aÅ>s¹äCšËÍªÕ€ÿ«Z
¼nf¦`âÇdÂÇ­³3bò¦‰œØùYË¨á` p2é*£tSFÕ¬yÕ¬¡jáO²ftğ
ßpğM\Ÿœ[Î>Ê=“ìwœìwœìw’¬ùCd÷aá±ùaıñÃwqLÚ‚¿6³;cc‚’Ù€¦!áó&E”¶Ö(Æ3=àôMÙƒÊô´Ê„W` \—¼*œÍjªÇK
{ApòÁõ[Ï™Xôd†#óE€êQ‡œ9°ıÊ?T=ë°ÁÔy«kwésXõœÛñ\O «™Ğwã1¸PŒàÕ«|Œ÷:Æ{ƒÇt¨Úˆ¿Ğ¡'®7°İ¶»˜Ú¡C½9—}ÓÓ±+oãü.©G3ä5x	XeX½Ñámø€!+|âĞê9ö½€UÏf
¢D«óÖ‡‡X½];´õ)`¯à}\ÀÚK¿Ñ?ë÷KÕ˜¸o—â_BÕî]wO5¨o—öÌ†.ƒ`Nûı~÷HƒùnéËŒúzFè”yòqÿ¸ÛÑ’à[Ág¿wÔ9ÒÒ]˜ZÀä}ÉsX…ÙîÌ›™ëNW‡[2ˆsrYˆ0gíÖu¯¥Áø0¥ƒÉíãV»ÕÖ’—¾»YyåÒí]ŸiâÂÔa(å~Ü?ïµÈV|¶"‰60T®Í+¦Û:9oö4Ï·]^ÜÓşqÃ<ÇæKnNÎ{]\à¸Ÿ8¥ş™^?Cß™Şœ8é4u€M©
cílÿ² kğìÚ!i`ºb‚ÁRsŸDÒ0ƒA¨Õà9ş3C0&ò:9j42@¶ù4µ?9ÄI÷úôÄÈÉÌ`(iÛuV¹=×yfGÇÇ'×­¾ÎÇA'¯¤³çZ‡É?Ïùùa«Ó1Á@Ø®dÈL$ v„0½óó“Ó¶†ÙËgıëÎYß…ú+kşèì°{v	&k­Õ?‚9`l¸°"îBİ:½nÓ¦Á9¨@÷Pƒa^E«h!‚O¥Ù×&İwf²d'çøÏÀò ¼ÑD5áfï¼¡çã"6ğn$¯[øÑ@\´‘©VÛ}­úqa$£šmµÎ®uJˆ¬
 Õãö ÿi S/U^g¦Î[3ç¤{ª+b¢­wÛ`5)¶³üÓR©†+Ô»ı¾Ş®¦°Î¾±UÔs5tˆPiÁÉùµÖ7ÁÂDå‹FÕéw;&	Ië­@KK†Ykƒ‰24œÃŞÉ™FİµŸ)´ŒìIï¤ß6CSöX[Í£ª?íô
6Æe`ÀÄŒÁë’Z¤÷³.À¥Â¶»İ³Ş‰Dõ_²uÙ+ôdÏ¢ƒDª¢jt»İm¡£7z½ss¦R³º‡øÏ¢”âú¤Ó4‚(;
Rjœ¶@qCÚj\·Ú`ÊÎœvz}3TÂŸçÁ±­p!c®Ì÷ºÑ9êöŒp1ÁÃ§gêLõpĞ/u
u3çÉh–t}‰õ¤ »8c#g9Kºª''°fÈ¸?ÒéšaTozİ>>îš¡Ká­óÃÓF÷Ú¯çÃÎõáiÓ—è2O¯OÎz½ÀNâÄ<™~û<£¬‰ñè¬ÛìtÌ€¼O”¶ì´y|v¬:£y¼y7Ï›ç§
jâlÊLøüĞ t˜Áƒˆ©Èíïéñ†CVØ%ÄµÆ
D.Ûßx±N­Ûkk•	æÆ Û?Ö•‹<0Ø¯1 ¥¹>ëµ´ª;_íãFÃœ’ã G¥Mİ6è‰ÆÅÆz‰^¯×ëµÛ&0eÃÀ÷:?3$ê¼İïÁÇ–¨qğcç‡:ØÂŞØ ã…¨‡~÷Xƒa°ºXÇ¢Ú×ç:ˆ¿ä]äÙñ¡Ö|•9í4:×Zª»œƒİv£ÛÕR½tnÊLõöm
í®;èè ;2vGÍ“s]!pYDçìúè¸©É+föÛgÓ–>)^úGí£MW½BïìúøÔ LÁì
£{¬Wo ³ás›ª¿qÜjibKu)=Mê	StÒ>6ôôÉúp½C•}MÈ<ê<Úº¡Ğ
]ÿT«¼DOutrÖÒµĞæXHÒœ(Z¼
¹‡AJ¿«µ)
 ò„xx¤ÕGÒÆ‚vµbª4ì–^a«)L?sƒ	3š^‘•fŞ§h"EwáxG¬ÌC›ºÚôÊ¦y÷Ãıdğ2p;<~£LË+|¡À4iÎƒqÚWÁÕp2×wãr©‘‡•KÜĞ,œ
àp¢ûVÓ„»€´ …
cúVP«˜	,
ÃÎÎøĞ‚äêu
°µi¢ÑS¨Åaøšf'Ãæ¬Ÿ\YG™È'qÚaù°‚©%»dœv'*q‚¼yYd.œ¶N…ƒ1R-E™êdÖ‡06‚©Ãæ ÆV¢CÌËÏUì½á—½Î NÛ¦j T˜*‚oeB{®lDŸî£êÆel^“©ZÚÅ1­¨ZéÅz˜f‘K¹ñKzxÒ°~†¿
ë”SX#iÂ¦ûû)hP4!.j™Góc×£t
u3Z
Açrµó¾ G{aàÇ½$­N}ÅƒÖ"0Ò‚üñ±ØµcëWğí…UnB3©_À|±è­Ô9­Õ~Ò]€ûöÒÌçtÉD}V­o¡Ê°bM˜–Ï'xÜÀD÷@§«´L×ÓÒO!ˆ\­Œ’¢Â4ˆç—}(Qëø¸òÑdnD˜ìŠ0Û*e)Å%ÊÃúş_Ñ]ıK«i‚>8 hşØ….ÍêMyÖ²àkà	'™7©"l ØÊB>È­¸A5àqJ¼HçĞÊ[bˆühÙªƒ;gq©Å"”€ÍëB±”ñt˜"ÒóÉÙ¯¤ˆQû˜×>TîWy/H}S$FÒù—D‰Jgè0qØM…A’zšq¥õ¿ø“A½PÒ7‰èf¸ùÙè_ÄuÕšŒ±?Ì­WÆÓ+Ÿçg%rš¹Kö¸†©,K¢¡ğ|ai¾8@éïKj»…ä¡ ö¯”ä=à{<nı¶‡À'RÃ}é.åéxÿ= H»*—Ù¼G¬í)µ€›hÀ)_³˜ç˜kĞhñÌ.bMÿB°ÿ9Ï vaºñí«Ç§‡Ç÷¯zHG³4pšÃA¶«
z`6–™3ÓW®•™L;¼.À{M½Û3ÇÅ%¦ƒƒ öUKæøM¡ˆGªØ.´‹}uCQ² J°‹™ï|1SQÖ+&ÏÊ#Ú¿`â)t/ëğ…‘ó\2³„t®¢ÇHèos,•‘§¹ vúš\¨ºš€&à†Ç]Âb•ÁÄ®–gˆi‘TjÅ<À*EÖ•Y'Â†æ˜l\4J)uuWşÀ_é4lDEoŠÈ;z£Ó HI"Õp’å€g¡"d½y)ô>½Ñ	pÈ]÷Cc¸-¢ÅÚOUîM1‡qÕ6ıòt…3oÒ²$©Š^ã_·6+PPÎ9í#)k¬Š
Y}!õäPUn6Çô<$*¨bª#^3r§‰npğØŞ¤ÀÈ
›ÃºóKÛ…"PbøÙ=²‚QÍb-=›âyQAwÎ‰ÍvÏ)U?/¾0ëŸís9™5Ÿ˜©|1‹pwÆ*ïÚéqao¥€ ´®<j,:jÀÂÌVZØıË&Èñä2zà{9i;âÏ“à[.5Â`Ó™ïãÁmŞFío¨°‰²™+Ò@%¿„/À½¯Ÿ5/ÍİKe«Õ,7nï²¦×xMãoÚ8 ÿöù;Ùc$ßò> z©UjÄb‚Bæ;Ïù‘±·öBï0K°Û!,6†9ş´çV¢#” U|Ùº½F8U¯x†e‘q–_ÄWršKH[Kñ"m=¯F-Aìèª óÄËAGrlI—`[äv|Ğ)ˆq¢¤uï^¶ßıF©XÖ&^Ñ†Ä£õ˜Ú‡K´ c~¤<O&Au€ÌŞĞÁ½ºt6ä–ãVr$J0“½Ü>{*)ÏBˆŞ|›!ôt;?]ö”o`¥Û¿(R$&±¯ÊaN0—ÌC J†Œ)x\ƒÒá±ßM¡xy‰Â½MÙ©€tŞ®L0Éàñ?Y/Œù%C© ÒS/5`Ô Ê”i"–º„Çe˜ ÒqÔ%X‚uw†Fp±iı*©ÿ—¦aLì ~NØ¯$Zzÿ:ÅÃdS¸ú¶!í,’…8Ør.à 7Ï]†Â¾è£­$i±;|‡X´±L•Y|S€zğì"hÌ´/
·İ¥ˆe‚CWz®Ü,¡o¸I¼<¶¡Ë7¬’½Åãb©Ã}P…Mı6nòEOvŸ}Y(÷$” Ì t™‹…m4<ÒŸ²ÛîÁ¶\5*¥Âˆhf$a_ŸHİL†ø7ó ŞgA$Ãùóæ—¥Íz#ÏvøL­N€S5j#J¥¢¦{Ël<—¢ç>]I\à:ú¸×¸Š·tµİ·9õ”>2 éIäÈaÀ&Îû\9¨Ù×>î#°D‡#vE'’EYÇğXœ˜’/i±ñÄ¬‘ã NğÆà¶á<LP+Ø½,ŠÿÑKÎş#Ìì½EÔWò&rÃt™t#À·u»µ–¿·0Wpèx¾09¾¾°5XŞàßõ96&„ÎyÏA6Å% ­ì?"È7[ÿfØwó;K_W†Î›&ğ†6èïüÌ'ĞúB_£2ÈH.šøxÍX-+^*
+!Lyã/X™] xö,óKæB{O„Â‰?tct`.‰~úræ6î×=ôàTlhE“¾ju&8‘AI¯[Ìm}¿kksê†§nŒ©-Âmeà¶6”jÂ
JO-,ñ››.­±é y-·­ÁàräcFFsãjµ‰4YïjR'E;ŒdÇ8pÃ¨Á „í ü\l:Ï*,Oì±gæâº€ï`”bÓAàl^ÇN¦Î½‡§½ÂY‘‹®oc^O°]sÁ£‡mjŒª8•Ë]›oVşŞTái¹'Qãb>ü~SfP‡ÖA
¨bÔ´%Õ)m%TI©”ÙŒ˜y—-CŒ\ò¼
¼ÊÖC˜:WSçí+™«´f£GkèFáïX;XÏûa{ç’zo>’_;xÎãÊ	´‰/™	Î·ıÉ àí‘;ÆŠ3•`ÒÉ[¶²KF•[#ˆõGólXqs®Q®pR¶!×M„şÑƒ<tsşPöxîğX8oBU9Ãc±|ëu:|‘š÷qü@Òƒkè>œ±\BÅƒJGrtÆ‘ ®ˆåš>JHàH?I×fê#0öqµÙ:¦ 6¾Q\$áE
ÍúYa³ùáæ5rÒ™îá4šãÕ¬§-„òÑ!ÿóŸH=€îÔßXİÍóX»:Š(GUè‰•jQG„×UªbD*æxftä²iìŞ‘|Ò«‹ì&/Š|!db¦ 1åCå¿ á˜)DÉÆî¾°EÃ~ÔlÒhşÒœyšSŒ­äh"c„Ï!¬}ArGPx,ä#€…æ0Ô—ò&ŸÏƒŞ©˜hRÉññµ®¸6ù€<bóTê©yærFn]II¯=œşİıPu‡Òı¡jÏã:—íÿ†_á”®Å– ı±‰ßšÆ
œ(\uÍ„$øT.Étm–Y&ÔÖ
, d—°á ï3ÖMN¡™I°ÆÓù#¸]¥ÇoÀÚ&½ûÆ~kú		ık5à·?d=øàşëW”Ê‚ÜµšDô7ö&ªÏÁ7[nÁÀt´Ÿüà‘5ülàg?SƒSŒñ ãè68š|EWÜ-¶b´
AGîî+3Î{:¿3Zõ#kòPOu¸İe27Nflu=3Z-Á~i;<§«tI¡·šRFŒÓJ0]R)™«!3uqTÁÖ2ˆ2§«a‡Â§ëÀA%/üˆö€áèçĞ|ôÓ
I:Ì&Ó2ÁH'@À†)%>Â_+SêSñ×ÔÒ“Y¤ã´HÄ¯‚94ÂL0G_(£T¾@ çæ
HP@ A¤*è¸@¨ ÓtV<Ä=œÂ6g«‡YåÒßåAˆ0îW4K[wt‘Õ×ÇÒ¢'0O9®Z¨4+~šn(u*Rõt8"…åŠœş_¹¦'¼	ºµë{>¿²\˜@.Ü”İ[0†9\/„­	Uq­ ğk„s9x›c‚àO”¬_ğÛm.pÅ}QÊñzJê¨é«½R•‚HŞÁU6Uñı%|ß+@€wW{jc8.ìC^"t£Š¹© 
|ñ’^èA—æ{snÆ·2Œƒ™«…Íï[Z;ìÖ¨ò8%ê×µ¹ô‘79`Jo©¥‹Wã˜h*ì`
’¢õeäÄÜ>L»
?Ñ‰ÈXƒöæŞø}~ŸØ*°ÊòŞIHæ,kyì
Qº‰Ö*oXXs³‚áL—ˆÒ‚í°ğ£C›{Ûühº».‚h"„ÂSo™7	qY¦Kª(¯=3İlÕ[Mhx/­íj°œ–TìÛfó
T$Q&ÒÖ-= ¶âˆÍâˆ­tÍ¢ˆÉ#v×ˆ7óË0æèO•bX›k#±J•,é_c ¿€vw—.o*eqU	nú¦+W-q;.IAáŠªŞ„¸
cŒ.V±®~Å‹[øÌnP3ª
î1G·åÒœ:l
>né]‘ÕÏÂ;Ìì(wš‰w”›ŸBÖĞ± 5,ÊŒ6ÂÓSø§ß‡ôû¨¶T#â&¸!Ä
!nQïŞô`a°z/)RRÊ´X«·BYòµ‹P—¼z/ æh×tÿHƒµGÃK}k·òÆ³-çê¬jÙß@(d¹TÎöª¿8§ü½ÑU	bñ Ät/zQ'#!‡Ğ[\$›ï\0l1JXÇ
¸‰vï—¹½ì‡×Â¡éØÉŠÁ<mï\½¥è“G+Îk>&ïP#œ)álÉ
*p¢!.”Ëj;‹ˆræ8(äi1ºÏ˜°Ê+ë ²Ã_«JñLày3NaŠÈü5­c¡¾¥æêqê—¤ùAiƒÕÀÑ7ö1:­\º¦›¥`å¢Tåj£”}çyùäœVßqÕuJéøüÈO5'ßAh$¤SœçWqe‘hÔ$"•§ğ‚\P€·]Q
şä'T¨¨Ş¶6	İ?ÜêR
Ê_Ç“ı×]g @u+$PX xå>`G98ñøÀ¾Õ¯ÖÉRàù÷¸ 8_b~ş…ÔĞĞ#gxş.x}~|ë½sbAVÇŒö¢ëı´ŞÆ.UYÔ°el¨ç‚DŒÙbÇhˆôyğÙmÀš‰–\É}“O›¨áëy_G6£Q áEaFÜˆZ/Ùp9ò2\ˆ0à‰'ı²›Œ†V©èº É"j¤0£›B^zšN+M§õ%t¾nÍÚ°…+/}eï Z`Š7@àpG)ƒ; …ß¿ j<,áÄ´I|Ÿ ø%îm÷¿2‡u‘Tzõ%´ÀIR‚_¤kŸÕ¡sÆ¸û~<r€äœz—!¶l].PøüÖ!Ä®/ê.ƒZF}g‚×ozKµO. B\°HqE#/ZÉ"o%0Q9‰ïúA/¹ÇÀ@ŒcEnÿpŠë½Î=F "ün§´P®öZÏõ—ØßççŠÿB®Àò&™ëF”u³µ¬€ˆğ_«½Öreİl-ëÎ¹¦^}Ö}åäğÑ¼aŸ;ƒFîøŞ¦òù¬„¤Z)<Ïi`I
ê°¿­ãà”×_»ı_6\¨áQ/6^’£¢¤\†á:"b(ÁVÈø9„ß
jÜ? v®Ù5úf€ûÓ†¥óÂÂñ-˜¬ØQ‚V›Åº0­eãşu4UpËî"àáâQ°'ÑRkÙc¥†7`ßš‹uMŸRçkÔáWÑWqA%§	Bû½á9ÀQTŸà‰¶f"FU	a'ˆ$÷âJ‰c'IúÜ¯T½³+É<qô%¿óá—ŠzÈÕÉoámíÍuø¡¨íºYHPkC›¦RÒûß)Kş½’…Íwş#v$ÃÌiŸ¯Iæß(NŠ$·ŸŞ©L	òh°$ÆæßLE‹
Í#r¯¬r·r€ß§€ß›€Eì€èÔx—j€“¡¼G€Ã‘wªX¨.°}N]IÇ<rœ	íSÎ¬ŠmüØØÔK;v«]Ætº!âú¹ªØ‰Èá}ƒÆö˜qÕOÉÅùñ(r;ã¬¼)ì_™êTèœ<ÍizÈ€ŸK‹­6yd‰#	3eN'ìèU¬[îzëĞ)ìª®´í2q“DÜ$ßç ®›É›…sL"nšEs\4â«¼‰®±²•<¬¦«	XÍ,…@` ßÚ:tÃA7šå_q–çÚĞ Ze±Ä‡œÁfôæ&¡ú:,§$ÎË°b+ûÁœM !=3…PËv"9ş/bÇófó»…ïz"våÖ­ƒ\Î)ØŒ–x¾® A{€Şä•êÚs¶ÁÕ¹,º8§üî_Ù³¡bÛ€;ª‡Ö\®‘ós³ ÉN
È ,À>³pTwSãDË­&Ûc†š*›§’
;%Ê‹†êhE‚ºÒlœ
á¨®pŒñ‚)Vÿˆ.©~ëõ^ğ]PúGd‡~OĞ™rTƒÜh‘‘MÊ·êâèg%gí"iÆUV\Ço&ğ­Ğ)Ôh@±ß1K.XÆ<Ô –¤˜°ƒ!ãkİ.ñ`#úœª‘¢$|ÜÇmœâ§üÀŞ"øs±®È7a«‰ŸàI/‡­!ãeµ¶3p¿^ºÎT°¸/ˆu€ğüÁ(<¬U3·2ÎM°Â	}ôÓ”°	ÁK–İŠ ‰2Øƒ¦Pñl
¤RLYç‘Ê)E@«işÍ^àĞõD°˜}Î®ÈŸpTÖø‹X«Ú§V£N#8B¬ìÒ’¦l.‹]]cEÛ¨RÃš1{í(€ö#¥L»Ş…”¹‰2vL"¼‡ÉÍ„ÛW±ùà6>ŞJ¹x[×Èø GDìAGÏö¸å¿Úƒö~V95:jÌ“«½Âkí‚(¼€f>èÂŠ‚ƒÙ¢™O¼§¨ãŠ–šº|Däß
bQÈe\Äæojkœe6r`jİÚ6ì‚ÅC<ì×8ê"\Şáşüç¢Ìm´#æ†ö+F]á,n~¤V~ Ç‹Û—Lâ
`«¹#n:~T!êÂÛx¡œø÷Â²¤‘Ó£ò>ş½bP¡DÛ—ÃˆĞjF–ì¯iÛßöAïù@´VˆpÉŠÖøWQøTxUš(òG2xóiööcÑ“r¡ÉÌ(/I~·éÌ/ŸÒÌWjã¼“n¼¶0“aŠİ¬äŸ¥6mò­vÙ¡Õñí'Må+$Ù­Ï&¿“C£¼ƒvfbblödÜ¸e>×Zp+ü‰Hâ}È€›ü¾µğ[…N"0mäÖ¨4“Tš•¦ ’ªÛâ€‡sé²×T[t¹¸FÊµ¯’}J¥¨03È,ÂßÈa©~„¦˜É»…a½³p7eó‰šQ8ñº((+xö›(—	DpÙR’ğ’AÉ±¤â[KkÃ[µ}Æåô!Hø˜e
ëH¡´èçS/›ôRã7Õ4¡6¡¶tT¡àÛ'ÖÁÏ¿å­y[@#±I˜zRcşDKÎeùîA¶B-«“¹Ü¨ù7,ŒVˆT‡«Ãu¸hà"áYÆŞXª
7k
{afË!MS:JØÜ…İBtÔ.¾7QMM•×¬¸2 ¦Õù‰Àp½£B‘é6Œ{ÓÓF¢@;MÃÿù*²‘Ê°H‹§L¦ŞHÒ‹WÀ,Ì
@€cèV¾¸¯CIĞ½‹EOÆ›5qÈ›æïC“.rZ
¼nšSx.ü1™¤m!}ç67mgMeøªØ¸Kg_´¢ß{·
`å
)İx&QraÁ
!2Ú,x?Ì”iã?)7l…4F‹Âå¹Ç¤r˜÷—…9g«Pú÷HpG/02@q!I¼×­Ù‚_­&şjÉİ(»4EIÅ\pA9#•çö}ü*²ù/Í6è§Ì3~³ÁˆÅI –ÃgZÆ6ÇBï7/ñs$Á¿™Ë}„¸s¦=ğZ¼K8Àƒf—‹L-	š0ú…
ƒ‰|ê[Îdx„7O‰jÈ9­FVE,{VEImá2×§hkA£aHvù|‹)ÉçËòœ‚.&úµ%îªy¼š»¿W]şs¥ßW£] ª^©˜È“ªä±¢îã‹_%%šq‰rT’dnr(š‡;ø=u|-ô^y+ˆ½¶~À‘)?‚6* U'‘•:d¸“Nê€É»D£rTX"Ê@Œ;!¾?›“¶ğ$üĞ/Y¿’LXòlü/á†n/şùñC÷+ğ3bcl~Vùí—¾4áôáí9µ½¤¿ëïUôÂqVæxÇ×¬4™'æ@Ü*`Ö2íòm›Âl54 l…‚•™h6-µ¼BG]ªÂK¸£œÅ>/”ßUƒe™©RÔkFZâZ†L8†Åƒ€šÅ4ˆoÆ+ ­M\­ZkqN}¹É5 ÁQo"2ÍêqµÆ.<±aŠƒd¿†Ú!«ÂgeÀöY/Ø•«§M¥à?|KÓ¼í2û
{0Ñ¯¨øŠÄµgßN®€?{©-yÖÖ-yñ…äĞbTrŸHÈ%´·m›a3Ú`H_3¹y^?X wlÙcÍiÑ'œhçİ/Ôv	ÿFGIÖ¤r–2?OÕÌáSmûóÖ(òg›q«fMÀ™èã™èx•ş>.AÑ¬p3#)“;1á’MNO‚-Ÿ¥Ë,ï¤/©öŒ+‚jƒyÑ¶ƒ$-\³÷ÄØ
•“ËTvkcám•pw„È[¥¨¹e»³Š–Æİ2ÔÏâïÓÕmŠ£KL(š@‘e['Ù|‡¼gn[=¯k¥Ï|`£õÇ
¿QW‹~‰ê
àÆÜS^ö6Fê¿üE]™ÅëãÚÚ¶ÚŒS9jĞgÄù‚‰$²p? C;N?Ìèò3Cæ‰õ¢×âÈ9ÂÒ/ˆÎÉîB2íXqĞjÀGRÑ¸Œó¸œÙ>4mø2 X¶ˆlÉ#¶šÂ2À°2d¿v¹:ŠŒıRºé_®Añë}’„]8†îeÒzİiñ†iôäZ@"?ûô]A7GÃøKıêJ

Äè[•…çóĞ¬tp.îh´ ú>-uªª•Úv~â7Y@Äy§˜Ş´Äu¶’±’kqWÅH—÷|nésÎÌ•øXo¯,ñ”;g„‡¶¼aéFŞ±X¸íâçŞFW„!Å3æa¬„¯2–£ƒ_Uä‘›{mLtˆmİ’Œ<„ËA ¯jÌÚxö»Ñ„Ê­š8s¶aJÚd'ùÙIëf6Áì$?3IÄÑê—bÅä—–Hm¡gÄ/{ ›\Ô®“Méiñ‰×é œÍgöIı¼å]X2c
BÜË/ræôP4t è)T(nd«ªjâ°c¸A¸›àx‚#GÊšõ‹HåÊÎø¢Œ8–V*wĞ›(Ÿ¼Ñt>‹kÈ.b“
1÷8Ğ<«§æ 
ÌÜáQœ½õ-t¹ôğşõcûO½ûûí'`!—¿&OôÅSK î'‚â&8> ÅóÖ ‰T´³¡9 YäîİmøT¶_Õ|bö!w•ÃŸÚúd´°t^¢|Ú“×öŒŞ•nnÃ÷¤m«Ç÷ozO·7·íÇÎKs½è¬`nx«Åçğ‡ö‚!+–ëÍë?´_İtá6ÿöcs-`'%—uFĞ›7’Ë‚Æ (0µü,ğ GÙH×Šc »¢”¬ÍÔQBI†T@‡´‹Óhcµ›×İŞŸnşDÀu©D2{x¼¿yı›8H+òò¦wß¾ï¼|ÿtßûıÛŞÃ£€:L@½»¿"İ»ÎÛÛŞk	r” ‘ÕÑyÙ¾ow{÷ê8õúî©Û~l?µ_½º{×ë
˜“4Ìí]÷¦Ói?ŞÜ½NÁ¦`Ÿúwo_ËÔ3-õáí›7w÷şyŠë·½§ö#Héúíc$ÅFHišIJšÛ$™Ö2¡'
%!“ü¶o{oÚ(³ˆÛNïáAÂ$L‰,’ÂM´U	ršvìpöh¹€ØÕÆÜ¹ßà¬ï‡oí9è<:úËX¸fö…äW™I:ºº-!õB<âäs0ÑÊ’.û\Wh|¦³lÇÿPK    mFrçí—I       source/jquery.canvasjs.js¥TÛnÓ@}n¥şÃ(êƒSÅëBßˆ*‚ú€ UÅBhcã-›]3»›Uù2ø$~Y_
HK¹xgæœ3gÆşñí{vvvr|OkB‡´AXH³‘îÅ5Ü¾
H;XT’¼2+x£ÃJH¡ò¾~’ey“xëDn×D…­w¤V•‡Çç. Dckõ•#ÙÉñÉq‰ø×Aiµ¶[ÏƒÔğRåh\${eÔ ¬Ñxe
°DN‘¨ù¤‡®+BdH‚×Ö¤»^#åŠoJï±®¸ÂpE>VÔjëĞÁÎàV!8_!8[ú­¤–¦Œ|ÁH° ”^±‘ÖÏ¼'µQ}Êrî©¹ç]«(à–\ímïÜˆhe>·8BP —J;°¦•!×(¢v¾†‰tòV°´ÊtËã²å.5yÆÔYX4Ÿn®ÿêå(¸ûgÇÌÆ%[S&üµ6r“ÑÖ¼’œ$A÷¼W¾²ÁóÑèıÅ~åGp#uÑ×qJÖèàÅˆMÿfioãÁÅ±~ƒ“2˜¼áMNgÀ˜…İÎ °yˆ[:k¡T¼«S¸‹ùG§¢4¢÷¢Yx¸„ÄÖñ×õÙGª|xv´‘§ü,\r7Ê‰R‘óÉt>Ärk¼dRê2>œ¼ì8
n‡™ˆFH2ÔÍ çœw”L'òJé‚Ğ$Ñû‘6héP8™ŠBz™Lú„˜÷y2k‰ÀæN0?(ÉpJè™Ftw´Ô<¿»ßÆ¾ÿO×´çá¯}ü»OÚ·ÜÃiN§óŸPK?     Æ¥GGÌo|rsÔ  ÷  $               canvasjs.min.js
         ~şóÑèÑèÑPK?     mFÆìÎèf   ‹    $            Ô  instruction.txt
         f£ŠkĞ“Ñ“ÑPK?     Æ¥GG**Uˆ
Õ  ‚   $           3Õ  jquery.canvasjs.min.js
         “Ñ~şóÑ~şóÑPK?     mFÚò¡r     $           qª license.txt
         <ÂeŠkĞ“Ñ“ÑPK?     ½¥GG‚2{8h u  $           ¬ source/canvasjs.js
         şNûÑH{cÑH{cÑPK?     mFmºs©ş0  TÏ   $           ¤Å source/excanvas.js
         ±ŠkĞ™İeÑ™İeÑPK?     mFrçí—I     $           Òö source/jquery.canvasjs.js
         Ÿ‘ŠkĞ™İeÑ™İeÑPK      º  Rù   
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






