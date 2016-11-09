/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	//import { ReflectiveInjector } from '@angular/core';
	// Polyfills for Service-Worker
	__webpack_require__(1);
	__webpack_require__(63);
	// Imports
	var booking_service_1 = __webpack_require__(101);
	var toolbox = __webpack_require__(138);
	console.debug("starting service-worker");
	/*
	const PROVIDERS = [
	    BookingService
	];
	
	let injector = ReflectiveInjector.resolveAndCreate(PROVIDERS);
	let bs:BookingService = injector.get(BookingService);
	*/
	var bs = new booking_service_1.BookingService();
	var context = self;
	context.addEventListener('sync', function (event) {
	    console.debug("Service Worker: sync, tag=" + event.tag);
	    if (event.tag == 'upload') {
	        event.waitUntil(bs.upload().then(function (_) { return console.debug('background-upload finished'); }));
	    }
	});
	context.addEventListener('push', function (event) {
	    console.log('Push message', event);
	    var title = 'Your flight is delayed';
	    /*
	    event.waitUntil(bs.sync().then(p => context.registration.showNotification(title, {
	          body: 'Your flight is delayed',
	          icon: '/images/touch/icon-128x128.png',
	          tag: 'my-tag'
	        })));
	    */
	    event.waitUntil(context.registration.showNotification(title, {
	        body: 'Your flight is delayed',
	        icon: '/images/touch/icon-128x128.png',
	        tag: 'my-tag'
	    }));
	});
	self.addEventListener('notificationclick', function (event) {
	    console.log('Notification click: tag ', event.notification.tag);
	    event.notification.close();
	    var url = 'http://127.0.0.1:8080';
	    event.waitUntil(clients.matchAll({
	        type: 'window'
	    })
	        .then(function (windowClients) {
	        console.debug("win-count: " + windowClients.length);
	        for (var i = 0; i < windowClients.length; i++) {
	            var client = windowClients[i];
	            console.debug(" > client-url: " + client.url + ", url: " + url);
	            var clientUrl = client.url;
	            if (clientUrl.startsWith(url) && 'focus' in client) {
	                return client.focus();
	            }
	        }
	        if (clients.openWindow) {
	            return clients.openWindow(url);
	        }
	    }));
	});
	var context = self;
	toolbox.options.debug = true;
	toolbox.precache([
	    '/',
	    '/index.html',
	    '/dist/app.js',
	    '/dist/vendor.js',
	    '/dist/sw.js'
	]);
	toolbox.router.get('/(.*)', toolbox.networkOnly, { origin: 'http://www.angular.at' });
	toolbox.router.default = toolbox.cacheFirst;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(2);
	__webpack_require__(21);
	__webpack_require__(40);
	__webpack_require__(41);
	__webpack_require__(44);
	__webpack_require__(48);
	__webpack_require__(51);
	__webpack_require__(52);
	__webpack_require__(53);
	__webpack_require__(54);
	__webpack_require__(55);
	__webpack_require__(59);
	__webpack_require__(60);
	__webpack_require__(61);
	module.exports = __webpack_require__(5).Reflect;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
	var $export   = __webpack_require__(3)
	  , aFunction = __webpack_require__(20)
	  , anObject  = __webpack_require__(8)
	  , rApply    = (__webpack_require__(4).Reflect || {}).apply
	  , fApply    = Function.apply;
	// MS Edge argumentsList argument is optional
	$export($export.S + $export.F * !__webpack_require__(12)(function(){
	  rApply(function(){});
	}), 'Reflect', {
	  apply: function apply(target, thisArgument, argumentsList){
	    var T = aFunction(target)
	      , L = anObject(argumentsList);
	    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
	  }
	});

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(4)
	  , core      = __webpack_require__(5)
	  , hide      = __webpack_require__(6)
	  , redefine  = __webpack_require__(16)
	  , ctx       = __webpack_require__(19)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
	    , key, own, out, exp;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // extend global
	    if(target)redefine(target, key, out, type & $export.U);
	    // export
	    if(exports[key] != out)hide(exports, key, exp);
	    if(IS_PROTO && expProto[key] != out)expProto[key] = out;
	  }
	};
	global.core = core;
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 4 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 5 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(7)
	  , createDesc = __webpack_require__(15);
	module.exports = __webpack_require__(11) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(8)
	  , IE8_DOM_DEFINE = __webpack_require__(10)
	  , toPrimitive    = __webpack_require__(14)
	  , dP             = Object.defineProperty;
	
	exports.f = __webpack_require__(11) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(9);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(11) && !__webpack_require__(12)(function(){
	  return Object.defineProperty(__webpack_require__(13)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(12)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(9)
	  , document = __webpack_require__(4).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(9);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(4)
	  , hide      = __webpack_require__(6)
	  , has       = __webpack_require__(17)
	  , SRC       = __webpack_require__(18)('src')
	  , TO_STRING = 'toString'
	  , $toString = Function[TO_STRING]
	  , TPL       = ('' + $toString).split(TO_STRING);
	
	__webpack_require__(5).inspectSource = function(it){
	  return $toString.call(it);
	};
	
	(module.exports = function(O, key, val, safe){
	  var isFunction = typeof val == 'function';
	  if(isFunction)has(val, 'name') || hide(val, 'name', key);
	  if(O[key] === val)return;
	  if(isFunction)has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	  if(O === global){
	    O[key] = val;
	  } else {
	    if(!safe){
	      delete O[key];
	      hide(O, key, val);
	    } else {
	      if(O[key])O[key] = val;
	      else hide(O, key, val);
	    }
	  }
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, TO_STRING, function toString(){
	  return typeof this == 'function' && this[SRC] || $toString.call(this);
	});

/***/ },
/* 17 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(20);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
	var $export    = __webpack_require__(3)
	  , create     = __webpack_require__(22)
	  , aFunction  = __webpack_require__(20)
	  , anObject   = __webpack_require__(8)
	  , isObject   = __webpack_require__(9)
	  , fails      = __webpack_require__(12)
	  , bind       = __webpack_require__(38)
	  , rConstruct = (__webpack_require__(4).Reflect || {}).construct;
	
	// MS Edge supports only 2 arguments and argumentsList argument is optional
	// FF Nightly sets third argument as `new.target`, but does not create `this` from it
	var NEW_TARGET_BUG = fails(function(){
	  function F(){}
	  return !(rConstruct(function(){}, [], F) instanceof F);
	});
	var ARGS_BUG = !fails(function(){
	  rConstruct(function(){});
	});
	
	$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
	  construct: function construct(Target, args /*, newTarget*/){
	    aFunction(Target);
	    anObject(args);
	    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
	    if(ARGS_BUG && !NEW_TARGET_BUG)return rConstruct(Target, args, newTarget);
	    if(Target == newTarget){
	      // w/o altered newTarget, optimization for 0-4 arguments
	      switch(args.length){
	        case 0: return new Target;
	        case 1: return new Target(args[0]);
	        case 2: return new Target(args[0], args[1]);
	        case 3: return new Target(args[0], args[1], args[2]);
	        case 4: return new Target(args[0], args[1], args[2], args[3]);
	      }
	      // w/o altered newTarget, lot of arguments case
	      var $args = [null];
	      $args.push.apply($args, args);
	      return new (bind.apply(Target, $args));
	    }
	    // with altered newTarget, not support built-in constructors
	    var proto    = newTarget.prototype
	      , instance = create(isObject(proto) ? proto : Object.prototype)
	      , result   = Function.apply.call(Target, instance, args);
	    return isObject(result) ? result : instance;
	  }
	});

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(8)
	  , dPs         = __webpack_require__(23)
	  , enumBugKeys = __webpack_require__(36)
	  , IE_PROTO    = __webpack_require__(34)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';
	
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(13)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(37).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};
	
	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(7)
	  , anObject = __webpack_require__(8)
	  , getKeys  = __webpack_require__(24);
	
	module.exports = __webpack_require__(11) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(25)
	  , enumBugKeys = __webpack_require__(36);
	
	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(17)
	  , toIObject    = __webpack_require__(26)
	  , arrayIndexOf = __webpack_require__(30)(false)
	  , IE_PROTO     = __webpack_require__(34)('IE_PROTO');
	
	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(27)
	  , defined = __webpack_require__(29);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(28);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 29 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(26)
	  , toLength  = __webpack_require__(31)
	  , toIndex   = __webpack_require__(33);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(32)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 32 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(32)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(35)('keys')
	  , uid    = __webpack_require__(18);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(4)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 36 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(4).document && document.documentElement;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var aFunction  = __webpack_require__(20)
	  , isObject   = __webpack_require__(9)
	  , invoke     = __webpack_require__(39)
	  , arraySlice = [].slice
	  , factories  = {};
	
	var construct = function(F, len, args){
	  if(!(len in factories)){
	    for(var n = [], i = 0; i < len; i++)n[i] = 'a[' + i + ']';
	    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
	  } return factories[len](F, args);
	};
	
	module.exports = Function.bind || function bind(that /*, args... */){
	  var fn       = aFunction(this)
	    , partArgs = arraySlice.call(arguments, 1);
	  var bound = function(/* args... */){
	    var args = partArgs.concat(arraySlice.call(arguments));
	    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
	  };
	  if(isObject(fn.prototype))bound.prototype = fn.prototype;
	  return bound;
	};

/***/ },
/* 39 */
/***/ function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return              fn.apply(that, args);
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
	var dP          = __webpack_require__(7)
	  , $export     = __webpack_require__(3)
	  , anObject    = __webpack_require__(8)
	  , toPrimitive = __webpack_require__(14);
	
	// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
	$export($export.S + $export.F * __webpack_require__(12)(function(){
	  Reflect.defineProperty(dP.f({}, 1, {value: 1}), 1, {value: 2});
	}), 'Reflect', {
	  defineProperty: function defineProperty(target, propertyKey, attributes){
	    anObject(target);
	    propertyKey = toPrimitive(propertyKey, true);
	    anObject(attributes);
	    try {
	      dP.f(target, propertyKey, attributes);
	      return true;
	    } catch(e){
	      return false;
	    }
	  }
	});

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.4 Reflect.deleteProperty(target, propertyKey)
	var $export  = __webpack_require__(3)
	  , gOPD     = __webpack_require__(42).f
	  , anObject = __webpack_require__(8);
	
	$export($export.S, 'Reflect', {
	  deleteProperty: function deleteProperty(target, propertyKey){
	    var desc = gOPD(anObject(target), propertyKey);
	    return desc && !desc.configurable ? false : delete target[propertyKey];
	  }
	});

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(43)
	  , createDesc     = __webpack_require__(15)
	  , toIObject      = __webpack_require__(26)
	  , toPrimitive    = __webpack_require__(14)
	  , has            = __webpack_require__(17)
	  , IE8_DOM_DEFINE = __webpack_require__(10)
	  , gOPD           = Object.getOwnPropertyDescriptor;
	
	exports.f = __webpack_require__(11) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 43 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 26.1.5 Reflect.enumerate(target)
	var $export  = __webpack_require__(3)
	  , anObject = __webpack_require__(8);
	var Enumerate = function(iterated){
	  this._t = anObject(iterated); // target
	  this._i = 0;                  // next index
	  var keys = this._k = []       // keys
	    , key;
	  for(key in iterated)keys.push(key);
	};
	__webpack_require__(45)(Enumerate, 'Object', function(){
	  var that = this
	    , keys = that._k
	    , key;
	  do {
	    if(that._i >= keys.length)return {value: undefined, done: true};
	  } while(!((key = keys[that._i++]) in that._t));
	  return {value: key, done: false};
	});
	
	$export($export.S, 'Reflect', {
	  enumerate: function enumerate(target){
	    return new Enumerate(target);
	  }
	});

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(22)
	  , descriptor     = __webpack_require__(15)
	  , setToStringTag = __webpack_require__(46)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(6)(IteratorPrototype, __webpack_require__(47)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(7).f
	  , has = __webpack_require__(17)
	  , TAG = __webpack_require__(47)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(35)('wks')
	  , uid        = __webpack_require__(18)
	  , Symbol     = __webpack_require__(4).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';
	
	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};
	
	$exports.store = store;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.6 Reflect.get(target, propertyKey [, receiver])
	var gOPD           = __webpack_require__(42)
	  , getPrototypeOf = __webpack_require__(49)
	  , has            = __webpack_require__(17)
	  , $export        = __webpack_require__(3)
	  , isObject       = __webpack_require__(9)
	  , anObject       = __webpack_require__(8);
	
	function get(target, propertyKey/*, receiver*/){
	  var receiver = arguments.length < 3 ? target : arguments[2]
	    , desc, proto;
	  if(anObject(target) === receiver)return target[propertyKey];
	  if(desc = gOPD.f(target, propertyKey))return has(desc, 'value')
	    ? desc.value
	    : desc.get !== undefined
	      ? desc.get.call(receiver)
	      : undefined;
	  if(isObject(proto = getPrototypeOf(target)))return get(proto, propertyKey, receiver);
	}
	
	$export($export.S, 'Reflect', {get: get});

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(17)
	  , toObject    = __webpack_require__(50)
	  , IE_PROTO    = __webpack_require__(34)('IE_PROTO')
	  , ObjectProto = Object.prototype;
	
	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(29);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
	var gOPD     = __webpack_require__(42)
	  , $export  = __webpack_require__(3)
	  , anObject = __webpack_require__(8);
	
	$export($export.S, 'Reflect', {
	  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey){
	    return gOPD.f(anObject(target), propertyKey);
	  }
	});

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.8 Reflect.getPrototypeOf(target)
	var $export  = __webpack_require__(3)
	  , getProto = __webpack_require__(49)
	  , anObject = __webpack_require__(8);
	
	$export($export.S, 'Reflect', {
	  getPrototypeOf: function getPrototypeOf(target){
	    return getProto(anObject(target));
	  }
	});

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.9 Reflect.has(target, propertyKey)
	var $export = __webpack_require__(3);
	
	$export($export.S, 'Reflect', {
	  has: function has(target, propertyKey){
	    return propertyKey in target;
	  }
	});

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.10 Reflect.isExtensible(target)
	var $export       = __webpack_require__(3)
	  , anObject      = __webpack_require__(8)
	  , $isExtensible = Object.isExtensible;
	
	$export($export.S, 'Reflect', {
	  isExtensible: function isExtensible(target){
	    anObject(target);
	    return $isExtensible ? $isExtensible(target) : true;
	  }
	});

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.11 Reflect.ownKeys(target)
	var $export = __webpack_require__(3);
	
	$export($export.S, 'Reflect', {ownKeys: __webpack_require__(56)});

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	// all object keys, includes non-enumerable and symbols
	var gOPN     = __webpack_require__(57)
	  , gOPS     = __webpack_require__(58)
	  , anObject = __webpack_require__(8)
	  , Reflect  = __webpack_require__(4).Reflect;
	module.exports = Reflect && Reflect.ownKeys || function ownKeys(it){
	  var keys       = gOPN.f(anObject(it))
	    , getSymbols = gOPS.f;
	  return getSymbols ? keys.concat(getSymbols(it)) : keys;
	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(25)
	  , hiddenKeys = __webpack_require__(36).concat('length', 'prototype');
	
	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 58 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.12 Reflect.preventExtensions(target)
	var $export            = __webpack_require__(3)
	  , anObject           = __webpack_require__(8)
	  , $preventExtensions = Object.preventExtensions;
	
	$export($export.S, 'Reflect', {
	  preventExtensions: function preventExtensions(target){
	    anObject(target);
	    try {
	      if($preventExtensions)$preventExtensions(target);
	      return true;
	    } catch(e){
	      return false;
	    }
	  }
	});

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
	var dP             = __webpack_require__(7)
	  , gOPD           = __webpack_require__(42)
	  , getPrototypeOf = __webpack_require__(49)
	  , has            = __webpack_require__(17)
	  , $export        = __webpack_require__(3)
	  , createDesc     = __webpack_require__(15)
	  , anObject       = __webpack_require__(8)
	  , isObject       = __webpack_require__(9);
	
	function set(target, propertyKey, V/*, receiver*/){
	  var receiver = arguments.length < 4 ? target : arguments[3]
	    , ownDesc  = gOPD.f(anObject(target), propertyKey)
	    , existingDescriptor, proto;
	  if(!ownDesc){
	    if(isObject(proto = getPrototypeOf(target))){
	      return set(proto, propertyKey, V, receiver);
	    }
	    ownDesc = createDesc(0);
	  }
	  if(has(ownDesc, 'value')){
	    if(ownDesc.writable === false || !isObject(receiver))return false;
	    existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
	    existingDescriptor.value = V;
	    dP.f(receiver, propertyKey, existingDescriptor);
	    return true;
	  }
	  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
	}
	
	$export($export.S, 'Reflect', {set: set});

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.14 Reflect.setPrototypeOf(target, proto)
	var $export  = __webpack_require__(3)
	  , setProto = __webpack_require__(62);
	
	if(setProto)$export($export.S, 'Reflect', {
	  setPrototypeOf: function setPrototypeOf(target, proto){
	    setProto.check(target, proto);
	    try {
	      setProto.set(target, proto);
	      return true;
	    } catch(e){
	      return false;
	    }
	  }
	});

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(9)
	  , anObject = __webpack_require__(8);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(19)(Function.call, __webpack_require__(42).f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(64);
	__webpack_require__(91);
	__webpack_require__(92);
	__webpack_require__(93);
	__webpack_require__(96);
	__webpack_require__(97);
	__webpack_require__(98);
	__webpack_require__(99);
	__webpack_require__(100);
	module.exports = __webpack_require__(5).Reflect;


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var metadata                  = __webpack_require__(65)
	  , anObject                  = __webpack_require__(8)
	  , toMetaKey                 = metadata.key
	  , ordinaryDefineOwnMetadata = metadata.set;
	
	metadata.exp({defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey){
	  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
	}});

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var Map     = __webpack_require__(66)
	  , $export = __webpack_require__(3)
	  , shared  = __webpack_require__(35)('metadata')
	  , store   = shared.store || (shared.store = new (__webpack_require__(84)));
	
	var getOrCreateMetadataMap = function(target, targetKey, create){
	  var targetMetadata = store.get(target);
	  if(!targetMetadata){
	    if(!create)return undefined;
	    store.set(target, targetMetadata = new Map);
	  }
	  var keyMetadata = targetMetadata.get(targetKey);
	  if(!keyMetadata){
	    if(!create)return undefined;
	    targetMetadata.set(targetKey, keyMetadata = new Map);
	  } return keyMetadata;
	};
	var ordinaryHasOwnMetadata = function(MetadataKey, O, P){
	  var metadataMap = getOrCreateMetadataMap(O, P, false);
	  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
	};
	var ordinaryGetOwnMetadata = function(MetadataKey, O, P){
	  var metadataMap = getOrCreateMetadataMap(O, P, false);
	  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
	};
	var ordinaryDefineOwnMetadata = function(MetadataKey, MetadataValue, O, P){
	  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
	};
	var ordinaryOwnMetadataKeys = function(target, targetKey){
	  var metadataMap = getOrCreateMetadataMap(target, targetKey, false)
	    , keys        = [];
	  if(metadataMap)metadataMap.forEach(function(_, key){ keys.push(key); });
	  return keys;
	};
	var toMetaKey = function(it){
	  return it === undefined || typeof it == 'symbol' ? it : String(it);
	};
	var exp = function(O){
	  $export($export.S, 'Reflect', O);
	};
	
	module.exports = {
	  store: store,
	  map: getOrCreateMetadataMap,
	  has: ordinaryHasOwnMetadata,
	  get: ordinaryGetOwnMetadata,
	  set: ordinaryDefineOwnMetadata,
	  keys: ordinaryOwnMetadataKeys,
	  key: toMetaKey,
	  exp: exp
	};

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(67);
	
	// 23.1 Map Objects
	module.exports = __webpack_require__(81)('Map', function(get){
	  return function Map(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.1.3.6 Map.prototype.get(key)
	  get: function get(key){
	    var entry = strong.getEntry(this, key);
	    return entry && entry.v;
	  },
	  // 23.1.3.9 Map.prototype.set(key, value)
	  set: function set(key, value){
	    return strong.def(this, key === 0 ? 0 : key, value);
	  }
	}, strong, true);

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var dP          = __webpack_require__(7).f
	  , create      = __webpack_require__(22)
	  , redefineAll = __webpack_require__(68)
	  , ctx         = __webpack_require__(19)
	  , anInstance  = __webpack_require__(69)
	  , defined     = __webpack_require__(29)
	  , forOf       = __webpack_require__(70)
	  , $iterDefine = __webpack_require__(76)
	  , step        = __webpack_require__(78)
	  , setSpecies  = __webpack_require__(79)
	  , DESCRIPTORS = __webpack_require__(11)
	  , fastKey     = __webpack_require__(80).fastKey
	  , SIZE        = DESCRIPTORS ? '_s' : 'size';
	
	var getEntry = function(that, key){
	  // fast case
	  var index = fastKey(key), entry;
	  if(index !== 'F')return that._i[index];
	  // frozen object case
	  for(entry = that._f; entry; entry = entry.n){
	    if(entry.k == key)return entry;
	  }
	};
	
	module.exports = {
	  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
	    var C = wrapper(function(that, iterable){
	      anInstance(that, C, NAME, '_i');
	      that._i = create(null); // index
	      that._f = undefined;    // first entry
	      that._l = undefined;    // last entry
	      that[SIZE] = 0;         // size
	      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear(){
	        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
	          entry.r = true;
	          if(entry.p)entry.p = entry.p.n = undefined;
	          delete data[entry.i];
	        }
	        that._f = that._l = undefined;
	        that[SIZE] = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function(key){
	        var that  = this
	          , entry = getEntry(that, key);
	        if(entry){
	          var next = entry.n
	            , prev = entry.p;
	          delete that._i[entry.i];
	          entry.r = true;
	          if(prev)prev.n = next;
	          if(next)next.p = prev;
	          if(that._f == entry)that._f = next;
	          if(that._l == entry)that._l = prev;
	          that[SIZE]--;
	        } return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /*, that = undefined */){
	        anInstance(this, C, 'forEach');
	        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
	          , entry;
	        while(entry = entry ? entry.n : this._f){
	          f(entry.v, entry.k, this);
	          // revert to the last existing entry
	          while(entry && entry.r)entry = entry.p;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key){
	        return !!getEntry(this, key);
	      }
	    });
	    if(DESCRIPTORS)dP(C.prototype, 'size', {
	      get: function(){
	        return defined(this[SIZE]);
	      }
	    });
	    return C;
	  },
	  def: function(that, key, value){
	    var entry = getEntry(that, key)
	      , prev, index;
	    // change existing entry
	    if(entry){
	      entry.v = value;
	    // create new entry
	    } else {
	      that._l = entry = {
	        i: index = fastKey(key, true), // <- index
	        k: key,                        // <- key
	        v: value,                      // <- value
	        p: prev = that._l,             // <- previous entry
	        n: undefined,                  // <- next entry
	        r: false                       // <- removed
	      };
	      if(!that._f)that._f = entry;
	      if(prev)prev.n = entry;
	      that[SIZE]++;
	      // add to index
	      if(index !== 'F')that._i[index] = entry;
	    } return that;
	  },
	  getEntry: getEntry,
	  setStrong: function(C, NAME, IS_MAP){
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    $iterDefine(C, NAME, function(iterated, kind){
	      this._t = iterated;  // target
	      this._k = kind;      // kind
	      this._l = undefined; // previous
	    }, function(){
	      var that  = this
	        , kind  = that._k
	        , entry = that._l;
	      // revert to the last existing entry
	      while(entry && entry.r)entry = entry.p;
	      // get next entry
	      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
	        // or finish the iteration
	        that._t = undefined;
	        return step(1);
	      }
	      // return step by kind
	      if(kind == 'keys'  )return step(0, entry.k);
	      if(kind == 'values')return step(0, entry.v);
	      return step(0, [entry.k, entry.v]);
	    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);
	
	    // add [@@species], 23.1.2.2, 23.2.2.2
	    setSpecies(NAME);
	  }
	};

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var redefine = __webpack_require__(16);
	module.exports = function(target, src, safe){
	  for(var key in src)redefine(target, key, src[key], safe);
	  return target;
	};

/***/ },
/* 69 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name, forbiddenField){
	  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(19)
	  , call        = __webpack_require__(71)
	  , isArrayIter = __webpack_require__(72)
	  , anObject    = __webpack_require__(8)
	  , toLength    = __webpack_require__(31)
	  , getIterFn   = __webpack_require__(74)
	  , BREAK       = {}
	  , RETURN      = {};
	var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
	  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator, result;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if(result === BREAK || result === RETURN)return result;
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    result = call(iterator, f, step.value, entries);
	    if(result === BREAK || result === RETURN)return result;
	  }
	};
	exports.BREAK  = BREAK;
	exports.RETURN = RETURN;

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(8);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(73)
	  , ITERATOR   = __webpack_require__(47)('iterator')
	  , ArrayProto = Array.prototype;
	
	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 73 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(75)
	  , ITERATOR  = __webpack_require__(47)('iterator')
	  , Iterators = __webpack_require__(73);
	module.exports = __webpack_require__(5).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(28)
	  , TAG = __webpack_require__(47)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';
	
	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};
	
	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(77)
	  , $export        = __webpack_require__(3)
	  , redefine       = __webpack_require__(16)
	  , hide           = __webpack_require__(6)
	  , has            = __webpack_require__(17)
	  , Iterators      = __webpack_require__(73)
	  , $iterCreate    = __webpack_require__(45)
	  , setToStringTag = __webpack_require__(46)
	  , getPrototypeOf = __webpack_require__(49)
	  , ITERATOR       = __webpack_require__(47)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';
	
	var returnThis = function(){ return this; };
	
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 77 */
/***/ function(module, exports) {

	module.exports = false;

/***/ },
/* 78 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global      = __webpack_require__(4)
	  , dP          = __webpack_require__(7)
	  , DESCRIPTORS = __webpack_require__(11)
	  , SPECIES     = __webpack_require__(47)('species');
	
	module.exports = function(KEY){
	  var C = global[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(18)('meta')
	  , isObject = __webpack_require__(9)
	  , has      = __webpack_require__(17)
	  , setDesc  = __webpack_require__(7).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(12)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global            = __webpack_require__(4)
	  , $export           = __webpack_require__(3)
	  , redefine          = __webpack_require__(16)
	  , redefineAll       = __webpack_require__(68)
	  , meta              = __webpack_require__(80)
	  , forOf             = __webpack_require__(70)
	  , anInstance        = __webpack_require__(69)
	  , isObject          = __webpack_require__(9)
	  , fails             = __webpack_require__(12)
	  , $iterDetect       = __webpack_require__(82)
	  , setToStringTag    = __webpack_require__(46)
	  , inheritIfRequired = __webpack_require__(83);
	
	module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
	  var Base  = global[NAME]
	    , C     = Base
	    , ADDER = IS_MAP ? 'set' : 'add'
	    , proto = C && C.prototype
	    , O     = {};
	  var fixMethod = function(KEY){
	    var fn = proto[KEY];
	    redefine(proto, KEY,
	      KEY == 'delete' ? function(a){
	        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'has' ? function has(a){
	        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'get' ? function get(a){
	        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'add' ? function add(a){ fn.call(this, a === 0 ? 0 : a); return this; }
	        : function set(a, b){ fn.call(this, a === 0 ? 0 : a, b); return this; }
	    );
	  };
	  if(typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
	    new C().entries().next();
	  }))){
	    // create collection constructor
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    redefineAll(C.prototype, methods);
	    meta.NEED = true;
	  } else {
	    var instance             = new C
	      // early implementations not supports chaining
	      , HASNT_CHAINING       = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance
	      // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
	      , THROWS_ON_PRIMITIVES = fails(function(){ instance.has(1); })
	      // most early implementations doesn't supports iterables, most modern - not close it correctly
	      , ACCEPT_ITERABLES     = $iterDetect(function(iter){ new C(iter); }) // eslint-disable-line no-new
	      // for early implementations -0 and +0 not the same
	      , BUGGY_ZERO = !IS_WEAK && fails(function(){
	        // V8 ~ Chromium 42- fails only with 5+ elements
	        var $instance = new C()
	          , index     = 5;
	        while(index--)$instance[ADDER](index, index);
	        return !$instance.has(-0);
	      });
	    if(!ACCEPT_ITERABLES){ 
	      C = wrapper(function(target, iterable){
	        anInstance(target, C, NAME);
	        var that = inheritIfRequired(new Base, target, C);
	        if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	        return that;
	      });
	      C.prototype = proto;
	      proto.constructor = C;
	    }
	    if(THROWS_ON_PRIMITIVES || BUGGY_ZERO){
	      fixMethod('delete');
	      fixMethod('has');
	      IS_MAP && fixMethod('get');
	    }
	    if(BUGGY_ZERO || HASNT_CHAINING)fixMethod(ADDER);
	    // weak collections should not contains .clear method
	    if(IS_WEAK && proto.clear)delete proto.clear;
	  }
	
	  setToStringTag(C, NAME);
	
	  O[NAME] = C;
	  $export($export.G + $export.W + $export.F * (C != Base), O);
	
	  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);
	
	  return C;
	};

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(47)('iterator')
	  , SAFE_CLOSING = false;
	
	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }
	
	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var isObject       = __webpack_require__(9)
	  , setPrototypeOf = __webpack_require__(62).set;
	module.exports = function(that, target, C){
	  var P, S = target.constructor;
	  if(S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf){
	    setPrototypeOf(that, P);
	  } return that;
	};

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var each         = __webpack_require__(85)(0)
	  , redefine     = __webpack_require__(16)
	  , meta         = __webpack_require__(80)
	  , assign       = __webpack_require__(89)
	  , weak         = __webpack_require__(90)
	  , isObject     = __webpack_require__(9)
	  , getWeak      = meta.getWeak
	  , isExtensible = Object.isExtensible
	  , uncaughtFrozenStore = weak.ufstore
	  , tmp          = {}
	  , InternalMap;
	
	var wrapper = function(get){
	  return function WeakMap(){
	    return get(this, arguments.length > 0 ? arguments[0] : undefined);
	  };
	};
	
	var methods = {
	  // 23.3.3.3 WeakMap.prototype.get(key)
	  get: function get(key){
	    if(isObject(key)){
	      var data = getWeak(key);
	      if(data === true)return uncaughtFrozenStore(this).get(key);
	      return data ? data[this._i] : undefined;
	    }
	  },
	  // 23.3.3.5 WeakMap.prototype.set(key, value)
	  set: function set(key, value){
	    return weak.def(this, key, value);
	  }
	};
	
	// 23.3 WeakMap Objects
	var $WeakMap = module.exports = __webpack_require__(81)('WeakMap', wrapper, methods, weak, true, true);
	
	// IE11 WeakMap frozen keys fix
	if(new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7){
	  InternalMap = weak.getConstructor(wrapper);
	  assign(InternalMap.prototype, methods);
	  meta.NEED = true;
	  each(['delete', 'has', 'get', 'set'], function(key){
	    var proto  = $WeakMap.prototype
	      , method = proto[key];
	    redefine(proto, key, function(a, b){
	      // store frozen objects on internal weakmap shim
	      if(isObject(a) && !isExtensible(a)){
	        if(!this._f)this._f = new InternalMap;
	        var result = this._f[key](a, b);
	        return key == 'set' ? this : result;
	      // store all the rest on native weakmap
	      } return method.call(this, a, b);
	    });
	  });
	}

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex
	var ctx      = __webpack_require__(19)
	  , IObject  = __webpack_require__(27)
	  , toObject = __webpack_require__(50)
	  , toLength = __webpack_require__(31)
	  , asc      = __webpack_require__(86);
	module.exports = function(TYPE, $create){
	  var IS_MAP        = TYPE == 1
	    , IS_FILTER     = TYPE == 2
	    , IS_SOME       = TYPE == 3
	    , IS_EVERY      = TYPE == 4
	    , IS_FIND_INDEX = TYPE == 6
	    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX
	    , create        = $create || asc;
	  return function($this, callbackfn, that){
	    var O      = toObject($this)
	      , self   = IObject(O)
	      , f      = ctx(callbackfn, that, 3)
	      , length = toLength(self.length)
	      , index  = 0
	      , result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined
	      , val, res;
	    for(;length > index; index++)if(NO_HOLES || index in self){
	      val = self[index];
	      res = f(val, index, O);
	      if(TYPE){
	        if(IS_MAP)result[index] = res;            // map
	        else if(res)switch(TYPE){
	          case 3: return true;                    // some
	          case 5: return val;                     // find
	          case 6: return index;                   // findIndex
	          case 2: result.push(val);               // filter
	        } else if(IS_EVERY)return false;          // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
	var speciesConstructor = __webpack_require__(87);
	
	module.exports = function(original, length){
	  return new (speciesConstructor(original))(length);
	};

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(9)
	  , isArray  = __webpack_require__(88)
	  , SPECIES  = __webpack_require__(47)('species');
	
	module.exports = function(original){
	  var C;
	  if(isArray(original)){
	    C = original.constructor;
	    // cross-realm fallback
	    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
	    if(isObject(C)){
	      C = C[SPECIES];
	      if(C === null)C = undefined;
	    }
	  } return C === undefined ? Array : C;
	};

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(28);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys  = __webpack_require__(24)
	  , gOPS     = __webpack_require__(58)
	  , pIE      = __webpack_require__(43)
	  , toObject = __webpack_require__(50)
	  , IObject  = __webpack_require__(27)
	  , $assign  = Object.assign;
	
	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(12)(function(){
	  var A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , aLen  = arguments.length
	    , index = 1
	    , getSymbols = gOPS.f
	    , isEnum     = pIE.f;
	  while(aLen > index){
	    var S      = IObject(arguments[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  } return T;
	} : $assign;

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var redefineAll       = __webpack_require__(68)
	  , getWeak           = __webpack_require__(80).getWeak
	  , anObject          = __webpack_require__(8)
	  , isObject          = __webpack_require__(9)
	  , anInstance        = __webpack_require__(69)
	  , forOf             = __webpack_require__(70)
	  , createArrayMethod = __webpack_require__(85)
	  , $has              = __webpack_require__(17)
	  , arrayFind         = createArrayMethod(5)
	  , arrayFindIndex    = createArrayMethod(6)
	  , id                = 0;
	
	// fallback for uncaught frozen keys
	var uncaughtFrozenStore = function(that){
	  return that._l || (that._l = new UncaughtFrozenStore);
	};
	var UncaughtFrozenStore = function(){
	  this.a = [];
	};
	var findUncaughtFrozen = function(store, key){
	  return arrayFind(store.a, function(it){
	    return it[0] === key;
	  });
	};
	UncaughtFrozenStore.prototype = {
	  get: function(key){
	    var entry = findUncaughtFrozen(this, key);
	    if(entry)return entry[1];
	  },
	  has: function(key){
	    return !!findUncaughtFrozen(this, key);
	  },
	  set: function(key, value){
	    var entry = findUncaughtFrozen(this, key);
	    if(entry)entry[1] = value;
	    else this.a.push([key, value]);
	  },
	  'delete': function(key){
	    var index = arrayFindIndex(this.a, function(it){
	      return it[0] === key;
	    });
	    if(~index)this.a.splice(index, 1);
	    return !!~index;
	  }
	};
	
	module.exports = {
	  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
	    var C = wrapper(function(that, iterable){
	      anInstance(that, C, NAME, '_i');
	      that._i = id++;      // collection id
	      that._l = undefined; // leak store for uncaught frozen objects
	      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.3.3.2 WeakMap.prototype.delete(key)
	      // 23.4.3.3 WeakSet.prototype.delete(value)
	      'delete': function(key){
	        if(!isObject(key))return false;
	        var data = getWeak(key);
	        if(data === true)return uncaughtFrozenStore(this)['delete'](key);
	        return data && $has(data, this._i) && delete data[this._i];
	      },
	      // 23.3.3.4 WeakMap.prototype.has(key)
	      // 23.4.3.4 WeakSet.prototype.has(value)
	      has: function has(key){
	        if(!isObject(key))return false;
	        var data = getWeak(key);
	        if(data === true)return uncaughtFrozenStore(this).has(key);
	        return data && $has(data, this._i);
	      }
	    });
	    return C;
	  },
	  def: function(that, key, value){
	    var data = getWeak(anObject(key), true);
	    if(data === true)uncaughtFrozenStore(that).set(key, value);
	    else data[that._i] = value;
	    return that;
	  },
	  ufstore: uncaughtFrozenStore
	};

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	var metadata               = __webpack_require__(65)
	  , anObject               = __webpack_require__(8)
	  , toMetaKey              = metadata.key
	  , getOrCreateMetadataMap = metadata.map
	  , store                  = metadata.store;
	
	metadata.exp({deleteMetadata: function deleteMetadata(metadataKey, target /*, targetKey */){
	  var targetKey   = arguments.length < 3 ? undefined : toMetaKey(arguments[2])
	    , metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
	  if(metadataMap === undefined || !metadataMap['delete'](metadataKey))return false;
	  if(metadataMap.size)return true;
	  var targetMetadata = store.get(target);
	  targetMetadata['delete'](targetKey);
	  return !!targetMetadata.size || store['delete'](target);
	}});

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var metadata               = __webpack_require__(65)
	  , anObject               = __webpack_require__(8)
	  , getPrototypeOf         = __webpack_require__(49)
	  , ordinaryHasOwnMetadata = metadata.has
	  , ordinaryGetOwnMetadata = metadata.get
	  , toMetaKey              = metadata.key;
	
	var ordinaryGetMetadata = function(MetadataKey, O, P){
	  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
	  if(hasOwn)return ordinaryGetOwnMetadata(MetadataKey, O, P);
	  var parent = getPrototypeOf(O);
	  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
	};
	
	metadata.exp({getMetadata: function getMetadata(metadataKey, target /*, targetKey */){
	  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
	}});

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	var Set                     = __webpack_require__(94)
	  , from                    = __webpack_require__(95)
	  , metadata                = __webpack_require__(65)
	  , anObject                = __webpack_require__(8)
	  , getPrototypeOf          = __webpack_require__(49)
	  , ordinaryOwnMetadataKeys = metadata.keys
	  , toMetaKey               = metadata.key;
	
	var ordinaryMetadataKeys = function(O, P){
	  var oKeys  = ordinaryOwnMetadataKeys(O, P)
	    , parent = getPrototypeOf(O);
	  if(parent === null)return oKeys;
	  var pKeys  = ordinaryMetadataKeys(parent, P);
	  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
	};
	
	metadata.exp({getMetadataKeys: function getMetadataKeys(target /*, targetKey */){
	  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
	}});

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(67);
	
	// 23.2 Set Objects
	module.exports = __webpack_require__(81)('Set', function(get){
	  return function Set(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.2.3.1 Set.prototype.add(value)
	  add: function add(value){
	    return strong.def(this, value = value === 0 ? 0 : value, value);
	  }
	}, strong);

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	var forOf = __webpack_require__(70);
	
	module.exports = function(iter, ITERATOR){
	  var result = [];
	  forOf(iter, false, result.push, result, ITERATOR);
	  return result;
	};


/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	var metadata               = __webpack_require__(65)
	  , anObject               = __webpack_require__(8)
	  , ordinaryGetOwnMetadata = metadata.get
	  , toMetaKey              = metadata.key;
	
	metadata.exp({getOwnMetadata: function getOwnMetadata(metadataKey, target /*, targetKey */){
	  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
	    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
	}});

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	var metadata                = __webpack_require__(65)
	  , anObject                = __webpack_require__(8)
	  , ordinaryOwnMetadataKeys = metadata.keys
	  , toMetaKey               = metadata.key;
	
	metadata.exp({getOwnMetadataKeys: function getOwnMetadataKeys(target /*, targetKey */){
	  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
	}});

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	var metadata               = __webpack_require__(65)
	  , anObject               = __webpack_require__(8)
	  , getPrototypeOf         = __webpack_require__(49)
	  , ordinaryHasOwnMetadata = metadata.has
	  , toMetaKey              = metadata.key;
	
	var ordinaryHasMetadata = function(MetadataKey, O, P){
	  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
	  if(hasOwn)return true;
	  var parent = getPrototypeOf(O);
	  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
	};
	
	metadata.exp({hasMetadata: function hasMetadata(metadataKey, target /*, targetKey */){
	  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
	}});

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	var metadata               = __webpack_require__(65)
	  , anObject               = __webpack_require__(8)
	  , ordinaryHasOwnMetadata = metadata.has
	  , toMetaKey              = metadata.key;
	
	metadata.exp({hasOwnMetadata: function hasOwnMetadata(metadataKey, target /*, targetKey */){
	  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
	    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
	}});

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	var metadata                  = __webpack_require__(65)
	  , anObject                  = __webpack_require__(8)
	  , aFunction                 = __webpack_require__(20)
	  , toMetaKey                 = metadata.key
	  , ordinaryDefineOwnMetadata = metadata.set;
	
	metadata.exp({metadata: function metadata(metadataKey, metadataValue){
	  return function decorator(target, targetKey){
	    ordinaryDefineOwnMetadata(
	      metadataKey, metadataValue,
	      (targetKey !== undefined ? anObject : aFunction)(target),
	      toMetaKey(targetKey)
	    );
	  };
	}});

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(102);
	var PouchDB = __webpack_require__(120);
	var PASSAGIER_ID = "3";
	var URL = "http://www.angular.at/api/buchung";
	var db = new PouchDB("bookingsDb");
	var BookingService = (function () {
	    function BookingService() {
	    }
	    BookingService.prototype.sync = function () {
	        var that = this;
	        return this.upload().then(function () {
	            return that.download();
	        });
	    };
	    BookingService.prototype.download = function () {
	        var _this = this;
	        return this.fetchOnline()
	            .then(function (bookings) {
	            return _this.save(bookings).then(function () { return bookings; });
	        });
	    };
	    BookingService.prototype.upload = function () {
	        var promises = [];
	        return this.fetchLocal().then(function (bookings) {
	            if (!bookings)
	                return Promise.resolve(null);
	            var method = "PUT";
	            var mode = "CORS";
	            var headers = new Headers();
	            headers.set('Content-Type', 'text/json');
	            console.debug('bookings', bookings);
	            var promises = bookings.bookings.filter(function (b) { return b.isDirty; })
	                .map(function (b) { return fetch(URL, { method: method, headers: headers, body: JSON.stringify(b) }); });
	            if (!promises)
	                return Promise.resolve(null);
	            return Promise.all(promises);
	        });
	    };
	    BookingService.prototype.fetchOnline = function () {
	        // let search = new URLSearchParams();
	        // search.set('passagierId', PASSAGIER_ID);
	        // let headers = new Headers();
	        // headers.set('Accept', 'text/json');
	        var url = URL + "?passagierId=" + encodeURIComponent(PASSAGIER_ID);
	        var headers = new Headers();
	        headers.set('Accept', 'text/json');
	        var method = "GET";
	        var mode = "CORS";
	        return fetch(url, { method: method, headers: headers /*, mode*/ })
	            .then(function (r) { return r.json(); });
	    };
	    BookingService.prototype.fetchLocal = function () {
	        return db.get('bookings').catch(function (err) {
	            if (err.status == 404)
	                return null;
	            return Promise.reject(err);
	        });
	    };
	    BookingService.prototype.save = function (bookings) {
	        return this.fetchLocal().then(function (entity) {
	            if (entity) {
	                entity.bookings = bookings;
	            }
	            else {
	                entity = {
	                    _id: "bookings",
	                    _rev: null,
	                    bookings: bookings
	                };
	            }
	            return db.put(entity);
	        });
	    };
	    BookingService = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], BookingService);
	    return BookingService;
	}());
	exports.BookingService = BookingService;


/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * @license Angular v2.0.0
	 * (c) 2010-2016 Google, Inc. https://angular.io/
	 * License: MIT
	 */
	(function (global, factory) {
	     true ? factory(exports, __webpack_require__(103), __webpack_require__(104)) :
	    typeof define === 'function' && define.amd ? define(['exports', 'rxjs/Subject', 'rxjs/Observable'], factory) :
	    (factory((global.ng = global.ng || {}, global.ng.core = global.ng.core || {}),global.Rx,global.Rx));
	}(this, function (exports,rxjs_Subject,rxjs_Observable) { 'use strict';
	
	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var globalScope;
	    if (typeof window === 'undefined') {
	        if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) {
	            // TODO: Replace any with WorkerGlobalScope from lib.webworker.d.ts #3492
	            globalScope = self;
	        }
	        else {
	            globalScope = global;
	        }
	    }
	    else {
	        globalScope = window;
	    }
	    function scheduleMicroTask(fn) {
	        Zone.current.scheduleMicroTask('scheduleMicrotask', fn);
	    }
	    // Need to declare a new variable for global here since TypeScript
	    // exports the original value of the symbol.
	    var global$1 = globalScope;
	    function getTypeNameForDebugging(type) {
	        if (type['name']) {
	            return type['name'];
	        }
	        return typeof type;
	    }
	    var Math = global$1.Math;
	    // TODO: remove calls to assert in production environment
	    // Note: Can't just export this and import in in other files
	    // as `assert` is a reserved keyword in Dart
	    global$1.assert = function assert(condition) {
	        // TODO: to be fixed properly via #2830, noop for now
	    };
	    function isPresent(obj) {
	        return obj !== undefined && obj !== null;
	    }
	    function isBlank(obj) {
	        return obj === undefined || obj === null;
	    }
	    function isString(obj) {
	        return typeof obj === 'string';
	    }
	    function isFunction(obj) {
	        return typeof obj === 'function';
	    }
	    function isPromise(obj) {
	        // allow any Promise/A+ compliant thenable.
	        // It's up to the caller to ensure that obj.then conforms to the spec
	        return isPresent(obj) && isFunction(obj.then);
	    }
	    function isArray(obj) {
	        return Array.isArray(obj);
	    }
	    function stringify(token) {
	        if (typeof token === 'string') {
	            return token;
	        }
	        if (token === undefined || token === null) {
	            return '' + token;
	        }
	        if (token.overriddenName) {
	            return token.overriddenName;
	        }
	        if (token.name) {
	            return token.name;
	        }
	        var res = token.toString();
	        var newLineIndex = res.indexOf('\n');
	        return (newLineIndex === -1) ? res : res.substring(0, newLineIndex);
	    }
	    var StringWrapper = (function () {
	        function StringWrapper() {
	        }
	        StringWrapper.fromCharCode = function (code) { return String.fromCharCode(code); };
	        StringWrapper.charCodeAt = function (s, index) { return s.charCodeAt(index); };
	        StringWrapper.split = function (s, regExp) { return s.split(regExp); };
	        StringWrapper.equals = function (s, s2) { return s === s2; };
	        StringWrapper.stripLeft = function (s, charVal) {
	            if (s && s.length) {
	                var pos = 0;
	                for (var i = 0; i < s.length; i++) {
	                    if (s[i] != charVal)
	                        break;
	                    pos++;
	                }
	                s = s.substring(pos);
	            }
	            return s;
	        };
	        StringWrapper.stripRight = function (s, charVal) {
	            if (s && s.length) {
	                var pos = s.length;
	                for (var i = s.length - 1; i >= 0; i--) {
	                    if (s[i] != charVal)
	                        break;
	                    pos--;
	                }
	                s = s.substring(0, pos);
	            }
	            return s;
	        };
	        StringWrapper.replace = function (s, from, replace) {
	            return s.replace(from, replace);
	        };
	        StringWrapper.replaceAll = function (s, from, replace) {
	            return s.replace(from, replace);
	        };
	        StringWrapper.slice = function (s, from, to) {
	            if (from === void 0) { from = 0; }
	            if (to === void 0) { to = null; }
	            return s.slice(from, to === null ? undefined : to);
	        };
	        StringWrapper.replaceAllMapped = function (s, from, cb) {
	            return s.replace(from, function () {
	                var matches = [];
	                for (var _i = 0; _i < arguments.length; _i++) {
	                    matches[_i - 0] = arguments[_i];
	                }
	                // Remove offset & string from the result array
	                matches.splice(-2, 2);
	                // The callback receives match, p1, ..., pn
	                return cb(matches);
	            });
	        };
	        StringWrapper.contains = function (s, substr) { return s.indexOf(substr) != -1; };
	        StringWrapper.compare = function (a, b) {
	            if (a < b) {
	                return -1;
	            }
	            else if (a > b) {
	                return 1;
	            }
	            else {
	                return 0;
	            }
	        };
	        return StringWrapper;
	    }());
	    var NumberWrapper = (function () {
	        function NumberWrapper() {
	        }
	        NumberWrapper.toFixed = function (n, fractionDigits) { return n.toFixed(fractionDigits); };
	        NumberWrapper.equal = function (a, b) { return a === b; };
	        NumberWrapper.parseIntAutoRadix = function (text) {
	            var result = parseInt(text);
	            if (isNaN(result)) {
	                throw new Error('Invalid integer literal when parsing ' + text);
	            }
	            return result;
	        };
	        NumberWrapper.parseInt = function (text, radix) {
	            if (radix == 10) {
	                if (/^(\-|\+)?[0-9]+$/.test(text)) {
	                    return parseInt(text, radix);
	                }
	            }
	            else if (radix == 16) {
	                if (/^(\-|\+)?[0-9ABCDEFabcdef]+$/.test(text)) {
	                    return parseInt(text, radix);
	                }
	            }
	            else {
	                var result = parseInt(text, radix);
	                if (!isNaN(result)) {
	                    return result;
	                }
	            }
	            throw new Error('Invalid integer literal when parsing ' + text + ' in base ' + radix);
	        };
	        Object.defineProperty(NumberWrapper, "NaN", {
	            get: function () { return NaN; },
	            enumerable: true,
	            configurable: true
	        });
	        NumberWrapper.isNumeric = function (value) { return !isNaN(value - parseFloat(value)); };
	        NumberWrapper.isNaN = function (value) { return isNaN(value); };
	        NumberWrapper.isInteger = function (value) { return Number.isInteger(value); };
	        return NumberWrapper;
	    }());
	    // JS has NaN !== NaN
	    function looseIdentical(a, b) {
	        return a === b || typeof a === 'number' && typeof b === 'number' && isNaN(a) && isNaN(b);
	    }
	    // JS considers NaN is the same as NaN for map Key (while NaN !== NaN otherwise)
	    // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
	    function getMapKey(value) {
	        return value;
	    }
	    function isJsObject(o) {
	        return o !== null && (typeof o === 'function' || typeof o === 'object');
	    }
	    function print(obj) {
	        console.log(obj);
	    }
	    function warn(obj) {
	        console.warn(obj);
	    }
	    var _symbolIterator = null;
	    function getSymbolIterator() {
	        if (isBlank(_symbolIterator)) {
	            if (isPresent(globalScope.Symbol) && isPresent(Symbol.iterator)) {
	                _symbolIterator = Symbol.iterator;
	            }
	            else {
	                // es6-shim specific logic
	                var keys = Object.getOwnPropertyNames(Map.prototype);
	                for (var i = 0; i < keys.length; ++i) {
	                    var key = keys[i];
	                    if (key !== 'entries' && key !== 'size' &&
	                        Map.prototype[key] === Map.prototype['entries']) {
	                        _symbolIterator = key;
	                    }
	                }
	            }
	        }
	        return _symbolIterator;
	    }
	    function isPrimitive(obj) {
	        return !isJsObject(obj);
	    }
	
	    var _nextClassId = 0;
	    function extractAnnotation(annotation) {
	        if (isFunction(annotation) && annotation.hasOwnProperty('annotation')) {
	            // it is a decorator, extract annotation
	            annotation = annotation.annotation;
	        }
	        return annotation;
	    }
	    function applyParams(fnOrArray, key) {
	        if (fnOrArray === Object || fnOrArray === String || fnOrArray === Function ||
	            fnOrArray === Number || fnOrArray === Array) {
	            throw new Error("Can not use native " + stringify(fnOrArray) + " as constructor");
	        }
	        if (isFunction(fnOrArray)) {
	            return fnOrArray;
	        }
	        else if (fnOrArray instanceof Array) {
	            var annotations = fnOrArray;
	            var annoLength = annotations.length - 1;
	            var fn = fnOrArray[annoLength];
	            if (!isFunction(fn)) {
	                throw new Error("Last position of Class method array must be Function in key " + key + " was '" + stringify(fn) + "'");
	            }
	            if (annoLength != fn.length) {
	                throw new Error("Number of annotations (" + annoLength + ") does not match number of arguments (" + fn.length + ") in the function: " + stringify(fn));
	            }
	            var paramsAnnotations = [];
	            for (var i = 0, ii = annotations.length - 1; i < ii; i++) {
	                var paramAnnotations = [];
	                paramsAnnotations.push(paramAnnotations);
	                var annotation = annotations[i];
	                if (annotation instanceof Array) {
	                    for (var j = 0; j < annotation.length; j++) {
	                        paramAnnotations.push(extractAnnotation(annotation[j]));
	                    }
	                }
	                else if (isFunction(annotation)) {
	                    paramAnnotations.push(extractAnnotation(annotation));
	                }
	                else {
	                    paramAnnotations.push(annotation);
	                }
	            }
	            Reflect.defineMetadata('parameters', paramsAnnotations, fn);
	            return fn;
	        }
	        else {
	            throw new Error("Only Function or Array is supported in Class definition for key '" + key + "' is '" + stringify(fnOrArray) + "'");
	        }
	    }
	    /**
	     * Provides a way for expressing ES6 classes with parameter annotations in ES5.
	     *
	     * ## Basic Example
	     *
	     * ```
	     * var Greeter = ng.Class({
	     *   constructor: function(name) {
	     *     this.name = name;
	     *   },
	     *
	     *   greet: function() {
	     *     alert('Hello ' + this.name + '!');
	     *   }
	     * });
	     * ```
	     *
	     * is equivalent to ES6:
	     *
	     * ```
	     * class Greeter {
	     *   constructor(name) {
	     *     this.name = name;
	     *   }
	     *
	     *   greet() {
	     *     alert('Hello ' + this.name + '!');
	     *   }
	     * }
	     * ```
	     *
	     * or equivalent to ES5:
	     *
	     * ```
	     * var Greeter = function (name) {
	     *   this.name = name;
	     * }
	     *
	     * Greeter.prototype.greet = function () {
	     *   alert('Hello ' + this.name + '!');
	     * }
	     * ```
	     *
	     * ### Example with parameter annotations
	     *
	     * ```
	     * var MyService = ng.Class({
	     *   constructor: [String, [new Query(), QueryList], function(name, queryList) {
	     *     ...
	     *   }]
	     * });
	     * ```
	     *
	     * is equivalent to ES6:
	     *
	     * ```
	     * class MyService {
	     *   constructor(name: string, @Query() queryList: QueryList) {
	     *     ...
	     *   }
	     * }
	     * ```
	     *
	     * ### Example with inheritance
	     *
	     * ```
	     * var Shape = ng.Class({
	     *   constructor: (color) {
	     *     this.color = color;
	     *   }
	     * });
	     *
	     * var Square = ng.Class({
	     *   extends: Shape,
	     *   constructor: function(color, size) {
	     *     Shape.call(this, color);
	     *     this.size = size;
	     *   }
	     * });
	     * ```
	     * @stable
	     */
	    function Class(clsDef) {
	        var constructor = applyParams(clsDef.hasOwnProperty('constructor') ? clsDef.constructor : undefined, 'constructor');
	        var proto = constructor.prototype;
	        if (clsDef.hasOwnProperty('extends')) {
	            if (isFunction(clsDef.extends)) {
	                constructor.prototype = proto =
	                    Object.create(clsDef.extends.prototype);
	            }
	            else {
	                throw new Error("Class definition 'extends' property must be a constructor function was: " + stringify(clsDef.extends));
	            }
	        }
	        for (var key in clsDef) {
	            if (key != 'extends' && key != 'prototype' && clsDef.hasOwnProperty(key)) {
	                proto[key] = applyParams(clsDef[key], key);
	            }
	        }
	        if (this && this.annotations instanceof Array) {
	            Reflect.defineMetadata('annotations', this.annotations, constructor);
	        }
	        var constructorName = constructor['name'];
	        if (!constructorName || constructorName === 'constructor') {
	            constructor['overriddenName'] = "class" + _nextClassId++;
	        }
	        return constructor;
	    }
	    var Reflect = global$1.Reflect;
	    function makeDecorator(name, props, parentClass, chainFn) {
	        if (chainFn === void 0) { chainFn = null; }
	        var metaCtor = makeMetadataCtor([props]);
	        function DecoratorFactory(objOrType) {
	            if (!(Reflect && Reflect.getMetadata)) {
	                throw 'reflect-metadata shim is required when using class decorators';
	            }
	            if (this instanceof DecoratorFactory) {
	                metaCtor.call(this, objOrType);
	                return this;
	            }
	            else {
	                var annotationInstance_1 = new DecoratorFactory(objOrType);
	                var chainAnnotation = isFunction(this) && this.annotations instanceof Array ? this.annotations : [];
	                chainAnnotation.push(annotationInstance_1);
	                var TypeDecorator = function TypeDecorator(cls) {
	                    var annotations = Reflect.getOwnMetadata('annotations', cls) || [];
	                    annotations.push(annotationInstance_1);
	                    Reflect.defineMetadata('annotations', annotations, cls);
	                    return cls;
	                };
	                TypeDecorator.annotations = chainAnnotation;
	                TypeDecorator.Class = Class;
	                if (chainFn)
	                    chainFn(TypeDecorator);
	                return TypeDecorator;
	            }
	        }
	        if (parentClass) {
	            DecoratorFactory.prototype = Object.create(parentClass.prototype);
	        }
	        DecoratorFactory.prototype.toString = function () { return ("@" + name); };
	        DecoratorFactory.annotationCls = DecoratorFactory;
	        return DecoratorFactory;
	    }
	    function makeMetadataCtor(props) {
	        function ctor() {
	            var _this = this;
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i - 0] = arguments[_i];
	            }
	            props.forEach(function (prop, i) {
	                var argVal = args[i];
	                if (Array.isArray(prop)) {
	                    // plain parameter
	                    var val = !argVal || argVal === undefined ? prop[1] : argVal;
	                    _this[prop[0]] = val;
	                }
	                else {
	                    for (var propName in prop) {
	                        var val = !argVal || argVal[propName] === undefined ? prop[propName] : argVal[propName];
	                        _this[propName] = val;
	                    }
	                }
	            });
	        }
	        return ctor;
	    }
	    function makeParamDecorator(name, props, parentClass) {
	        var metaCtor = makeMetadataCtor(props);
	        function ParamDecoratorFactory() {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i - 0] = arguments[_i];
	            }
	            if (this instanceof ParamDecoratorFactory) {
	                metaCtor.apply(this, args);
	                return this;
	            }
	            var annotationInstance = new ((_a = ParamDecoratorFactory).bind.apply(_a, [void 0].concat(args)))();
	            ParamDecorator.annotation = annotationInstance;
	            return ParamDecorator;
	            function ParamDecorator(cls, unusedKey, index) {
	                var parameters = Reflect.getMetadata('parameters', cls) || [];
	                // there might be gaps if some in between parameters do not have annotations.
	                // we pad with nulls.
	                while (parameters.length <= index) {
	                    parameters.push(null);
	                }
	                parameters[index] = parameters[index] || [];
	                var annotationsForParam = parameters[index];
	                annotationsForParam.push(annotationInstance);
	                Reflect.defineMetadata('parameters', parameters, cls);
	                return cls;
	            }
	            var _a;
	        }
	        if (parentClass) {
	            ParamDecoratorFactory.prototype = Object.create(parentClass.prototype);
	        }
	        ParamDecoratorFactory.prototype.toString = function () { return ("@" + name); };
	        ParamDecoratorFactory.annotationCls = ParamDecoratorFactory;
	        return ParamDecoratorFactory;
	    }
	    function makePropDecorator(name, props, parentClass) {
	        var metaCtor = makeMetadataCtor(props);
	        function PropDecoratorFactory() {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i - 0] = arguments[_i];
	            }
	            if (this instanceof PropDecoratorFactory) {
	                metaCtor.apply(this, args);
	                return this;
	            }
	            else {
	                var decoratorInstance = new ((_a = PropDecoratorFactory).bind.apply(_a, [void 0].concat(args)))();
	                return function PropDecorator(target, name) {
	                    var meta = Reflect.getOwnMetadata('propMetadata', target.constructor) || {};
	                    meta[name] = meta[name] || [];
	                    meta[name].unshift(decoratorInstance);
	                    Reflect.defineMetadata('propMetadata', meta, target.constructor);
	                };
	            }
	            var _a;
	        }
	        if (parentClass) {
	            PropDecoratorFactory.prototype = Object.create(parentClass.prototype);
	        }
	        PropDecoratorFactory.prototype.toString = function () { return ("@" + name); };
	        PropDecoratorFactory.annotationCls = PropDecoratorFactory;
	        return PropDecoratorFactory;
	    }
	
	    /**
	     * Inject decorator and metadata.
	     *
	     * @stable
	     * @Annotation
	     */
	    var Inject = makeParamDecorator('Inject', [['token', undefined]]);
	    /**
	     * Optional decorator and metadata.
	     *
	     * @stable
	     * @Annotation
	     */
	    var Optional = makeParamDecorator('Optional', []);
	    /**
	     * Injectable decorator and metadata.
	     *
	     * @stable
	     * @Annotation
	     */
	    var Injectable = makeParamDecorator('Injectable', []);
	    /**
	     * Self decorator and metadata.
	     *
	     * @stable
	     * @Annotation
	     */
	    var Self = makeParamDecorator('Self', []);
	    /**
	     * SkipSelf decorator and metadata.
	     *
	     * @stable
	     * @Annotation
	     */
	    var SkipSelf = makeParamDecorator('SkipSelf', []);
	    /**
	     * Host decorator and metadata.
	     *
	     * @stable
	     * @Annotation
	     */
	    var Host = makeParamDecorator('Host', []);
	
	    /**
	     * Creates a token that can be used in a DI Provider.
	     *
	     * ### Example ([live demo](http://plnkr.co/edit/Ys9ezXpj2Mnoy3Uc8KBp?p=preview))
	     *
	     * ```typescript
	     * var t = new OpaqueToken("value");
	     *
	     * var injector = Injector.resolveAndCreate([
	     *   {provide: t, useValue: "bindingValue"}
	     * ]);
	     *
	     * expect(injector.get(t)).toEqual("bindingValue");
	     * ```
	     *
	     * Using an `OpaqueToken` is preferable to using strings as tokens because of possible collisions
	     * caused by multiple providers using the same string as two different tokens.
	     *
	     * Using an `OpaqueToken` is preferable to using an `Object` as tokens because it provides better
	     * error messages.
	     * @stable
	     */
	    // so that metadata is gathered for this class
	    var OpaqueToken = (function () {
	        function OpaqueToken(_desc) {
	            this._desc = _desc;
	        }
	        OpaqueToken.prototype.toString = function () { return "Token " + this._desc; };
	        OpaqueToken.decorators = [
	            { type: Injectable },
	        ];
	        /** @nocollapse */
	        OpaqueToken.ctorParameters = [
	            null,
	        ];
	        return OpaqueToken;
	    }());
	
	    /**
	     * This token can be used to create a virtual provider that will populate the
	     * `entryComponents` fields of components and ng modules based on its `useValue`.
	     * All components that are referenced in the `useValue` value (either directly
	     * or in a nested array or map) will be added to the `entryComponents` property.
	     *
	     * ### Example
	     * The following example shows how the router can populate the `entryComponents`
	     * field of an NgModule based on the router configuration which refers
	     * to components.
	     *
	     * ```typescript
	     * // helper function inside the router
	     * function provideRoutes(routes) {
	     *   return [
	     *     {provide: ROUTES, useValue: routes},
	     *     {provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: routes, multi: true}
	     *   ];
	     * }
	     *
	     * // user code
	     * let routes = [
	     *   {path: '/root', component: RootComp},
	     *   {path: '/teams', component: TeamsComp}
	     * ];
	     *
	     * @NgModule({
	     *   providers: [provideRoutes(routes)]
	     * })
	     * class ModuleWithRoutes {}
	     * ```
	     *
	     * @experimental
	     */
	    var ANALYZE_FOR_ENTRY_COMPONENTS = new OpaqueToken('AnalyzeForEntryComponents');
	    /**
	     * Attribute decorator and metadata.
	     *
	     * @stable
	     * @Annotation
	     */
	    var Attribute = makeParamDecorator('Attribute', [['attributeName', undefined]]);
	    /**
	     * Base class for query metadata.
	     *
	     * See {@link ContentChildren}, {@link ContentChild}, {@link ViewChildren}, {@link ViewChild} for
	     * more information.
	     *
	     * @stable
	     */
	    var Query = (function () {
	        function Query() {
	        }
	        return Query;
	    }());
	    /**
	     * ContentChildren decorator and metadata.
	     *
	     *  @stable
	     *  @Annotation
	     */
	    var ContentChildren = makePropDecorator('ContentChildren', [
	        ['selector', undefined],
	        { first: false, isViewQuery: false, descendants: false, read: undefined }
	    ], Query);
	    /**
	     * @whatItDoes Configures a content query.
	     *
	     * @howToUse
	     *
	     * {@example core/di/ts/contentChild/content_child_howto.ts region='HowTo'}
	     *
	     * @description
	     *
	     * You can use ContentChild to get the first element or the directive matching the selector from the
	     * content DOM. If the content DOM changes, and a new child matches the selector,
	     * the property will be updated.
	     *
	     * Content queries are set before the `ngAfterContentInit` callback is called.
	     *
	     * **Metadata Properties**:
	     *
	     * * **selector** - the directive type or the name used for querying.
	     * * **read** - read a different token from the queried element.
	     *
	     * Let's look at an example:
	     *
	     * {@example core/di/ts/contentChild/content_child_example.ts region='Component'}
	     *
	     * **npm package**: `@angular/core`
	     *
	     * @stable
	     * @Annotation
	     */
	    var ContentChild = makePropDecorator('ContentChild', [
	        ['selector', undefined], {
	            first: true,
	            isViewQuery: false,
	            descendants: false,
	            read: undefined,
	        }
	    ], Query);
	    /**
	     * @whatItDoes Configures a view query.
	     *
	     * @howToUse
	     *
	     * {@example core/di/ts/viewChildren/view_children_howto.ts region='HowTo'}
	     *
	     * @description
	     *
	     * You can use ViewChildren to get the {@link QueryList} of elements or directives from the
	     * view DOM. Any time a child element is added, removed, or moved, the query list will be updated,
	     * and the changes observable of the query list will emit a new value.
	     *
	     * View queries are set before the `ngAfterViewInit` callback is called.
	     *
	     * **Metadata Properties**:
	     *
	     * * **selector** - the directive type or the name used for querying.
	     * * **read** - read a different token from the queried elements.
	     *
	     * Let's look at an example:
	     *
	     * {@example core/di/ts/viewChildren/view_children_example.ts region='Component'}
	     *
	     * **npm package**: `@angular/core`
	     *
	     * @stable
	     * @Annotation
	     */
	    var ViewChildren = makePropDecorator('ViewChildren', [
	        ['selector', undefined], {
	            first: false,
	            isViewQuery: true,
	            descendants: true,
	            read: undefined,
	        }
	    ], Query);
	    /**
	     * ViewChild decorator and metadata.
	     *
	     * @stable
	     * @Annotation
	     */
	    var ViewChild = makePropDecorator('ViewChild', [
	        ['selector', undefined], {
	            first: true,
	            isViewQuery: true,
	            descendants: true,
	            read: undefined,
	        }
	    ], Query);
	
	    /**
	     * Describes within the change detector which strategy will be used the next time change
	     * detection is triggered.
	     * @stable
	     */
	    exports.ChangeDetectionStrategy;
	    (function (ChangeDetectionStrategy) {
	        /**
	         * `OnPush` means that the change detector's mode will be set to `CheckOnce` during hydration.
	         */
	        ChangeDetectionStrategy[ChangeDetectionStrategy["OnPush"] = 0] = "OnPush";
	        /**
	         * `Default` means that the change detector's mode will be set to `CheckAlways` during hydration.
	         */
	        ChangeDetectionStrategy[ChangeDetectionStrategy["Default"] = 1] = "Default";
	    })(exports.ChangeDetectionStrategy || (exports.ChangeDetectionStrategy = {}));
	    /**
	     * Describes the status of the detector.
	     */
	    var ChangeDetectorStatus;
	    (function (ChangeDetectorStatus) {
	        /**
	         * `CheckedOnce` means that after calling detectChanges the mode of the change detector
	         * will become `Checked`.
	         */
	        ChangeDetectorStatus[ChangeDetectorStatus["CheckOnce"] = 0] = "CheckOnce";
	        /**
	         * `Checked` means that the change detector should be skipped until its mode changes to
	         * `CheckOnce`.
	         */
	        ChangeDetectorStatus[ChangeDetectorStatus["Checked"] = 1] = "Checked";
	        /**
	         * `CheckAlways` means that after calling detectChanges the mode of the change detector
	         * will remain `CheckAlways`.
	         */
	        ChangeDetectorStatus[ChangeDetectorStatus["CheckAlways"] = 2] = "CheckAlways";
	        /**
	         * `Detached` means that the change detector sub tree is not a part of the main tree and
	         * should be skipped.
	         */
	        ChangeDetectorStatus[ChangeDetectorStatus["Detached"] = 3] = "Detached";
	        /**
	         * `Errored` means that the change detector encountered an error checking a binding
	         * or calling a directive lifecycle method and is now in an inconsistent state. Change
	         * detectors in this state will no longer detect changes.
	         */
	        ChangeDetectorStatus[ChangeDetectorStatus["Errored"] = 4] = "Errored";
	        /**
	         * `Destroyed` means that the change detector is destroyed.
	         */
	        ChangeDetectorStatus[ChangeDetectorStatus["Destroyed"] = 5] = "Destroyed";
	    })(ChangeDetectorStatus || (ChangeDetectorStatus = {}));
	    /**
	     * List of possible {@link ChangeDetectionStrategy} values.
	     */
	    var CHANGE_DETECTION_STRATEGY_VALUES = [
	        exports.ChangeDetectionStrategy.OnPush,
	        exports.ChangeDetectionStrategy.Default,
	    ];
	    function isDefaultChangeDetectionStrategy(changeDetectionStrategy) {
	        return isBlank(changeDetectionStrategy) ||
	            changeDetectionStrategy === exports.ChangeDetectionStrategy.Default;
	    }
	
	    /**
	     * Directive decorator and metadata.
	     *
	     * @stable
	     * @Annotation
	     */
	    var Directive = makeDecorator('Directive', {
	        selector: undefined,
	        inputs: undefined,
	        outputs: undefined,
	        host: undefined,
	        providers: undefined,
	        exportAs: undefined,
	        queries: undefined
	    });
	    /**
	     * Component decorator and metadata.
	     *
	     * @stable
	     * @Annotation
	     */
	    var Component = makeDecorator('Component', {
	        selector: undefined,
	        inputs: undefined,
	        outputs: undefined,
	        host: undefined,
	        exportAs: undefined,
	        moduleId: undefined,
	        providers: undefined,
	        viewProviders: undefined,
	        changeDetection: exports.ChangeDetectionStrategy.Default,
	        queries: undefined,
	        templateUrl: undefined,
	        template: undefined,
	        styleUrls: undefined,
	        styles: undefined,
	        animations: undefined,
	        encapsulation: undefined,
	        interpolation: undefined,
	        entryComponents: undefined
	    }, Directive);
	    /**
	     * Pipe decorator and metadata.
	     *
	     * @stable
	     * @Annotation
	     */
	    var Pipe = makeDecorator('Pipe', {
	        name: undefined,
	        pure: true,
	    });
	    /**
	     * Input decorator and metadata.
	     *
	     * @stable
	     * @Annotation
	     */
	    var Input = makePropDecorator('Input', [['bindingPropertyName', undefined]]);
	    /**
	     * Output decorator and metadata.
	     *
	     * @stable
	     * @Annotation
	     */
	    var Output = makePropDecorator('Output', [['bindingPropertyName', undefined]]);
	    /**
	     * HostBinding decorator and metadata.
	     *
	     * @stable
	     * @Annotation
	     */
	    var HostBinding = makePropDecorator('HostBinding', [['hostPropertyName', undefined]]);
	    /**
	     * HostBinding decorator and metadata.
	     *
	     * @stable
	     * @Annotation
	     */
	    var HostListener = makePropDecorator('HostListener', [['eventName', undefined], ['args', []]]);
	
	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    /**
	     * @stable
	     */
	    var LifecycleHooks;
	    (function (LifecycleHooks) {
	        LifecycleHooks[LifecycleHooks["OnInit"] = 0] = "OnInit";
	        LifecycleHooks[LifecycleHooks["OnDestroy"] = 1] = "OnDestroy";
	        LifecycleHooks[LifecycleHooks["DoCheck"] = 2] = "DoCheck";
	        LifecycleHooks[LifecycleHooks["OnChanges"] = 3] = "OnChanges";
	        LifecycleHooks[LifecycleHooks["AfterContentInit"] = 4] = "AfterContentInit";
	        LifecycleHooks[LifecycleHooks["AfterContentChecked"] = 5] = "AfterContentChecked";
	        LifecycleHooks[LifecycleHooks["AfterViewInit"] = 6] = "AfterViewInit";
	        LifecycleHooks[LifecycleHooks["AfterViewChecked"] = 7] = "AfterViewChecked";
	    })(LifecycleHooks || (LifecycleHooks = {}));
	    var LIFECYCLE_HOOKS_VALUES = [
	        LifecycleHooks.OnInit, LifecycleHooks.OnDestroy, LifecycleHooks.DoCheck, LifecycleHooks.OnChanges,
	        LifecycleHooks.AfterContentInit, LifecycleHooks.AfterContentChecked, LifecycleHooks.AfterViewInit,
	        LifecycleHooks.AfterViewChecked
	    ];
	    /**
	     * @whatItDoes Lifecycle hook that is called when any data-bound property of a directive changes.
	     * @howToUse
	     * {@example core/ts/metadata/lifecycle_hooks_spec.ts region='OnChanges'}
	     *
	     * @description
	     * `ngOnChanges` is called right after the data-bound properties have been checked and before view
	     * and content children are checked if at least one of them has changed.
	     * The `changes` parameter contains the changed properties.
	     *
	     * See {@linkDocs guide/lifecycle-hooks#onchanges "Lifecycle Hooks Guide"}.
	     *
	     * @stable
	     */
	    var OnChanges = (function () {
	        function OnChanges() {
	        }
	        return OnChanges;
	    }());
	    /**
	     * @whatItDoes Lifecycle hook that is called after data-bound properties of a directive are
	     * initialized.
	     * @howToUse
	     * {@example core/ts/metadata/lifecycle_hooks_spec.ts region='OnInit'}
	     *
	     * @description
	     * `ngOnInit` is called right after the directive's data-bound properties have been checked for the
	     * first time, and before any of its children have been checked. It is invoked only once when the
	     * directive is instantiated.
	     *
	     * See {@linkDocs guide/lifecycle-hooks "Lifecycle Hooks Guide"}.
	     *
	     * @stable
	     */
	    var OnInit = (function () {
	        function OnInit() {
	        }
	        return OnInit;
	    }());
	    /**
	     * @whatItDoes Lifecycle hook that is called when Angular dirty checks a directive.
	     * @howToUse
	     * {@example core/ts/metadata/lifecycle_hooks_spec.ts region='DoCheck'}
	     *
	     * @description
	     * `ngDoCheck` gets called to check the changes in the directives in addition to the default
	     * algorithm. The default change detection algorithm looks for differences by comparing
	     * bound-property values by reference across change detection runs.
	     *
	     * Note that a directive typically should not use both `DoCheck` and {@link OnChanges} to respond to
	     * changes on the same input, as `ngOnChanges` will continue to be called when the default change
	     * detector detects changes.
	     *
	     * See {@link KeyValueDiffers} and {@link IterableDiffers} for implementing custom dirty checking
	     * for collections.
	     *
	     * See {@linkDocs guide/lifecycle-hooks#docheck "Lifecycle Hooks Guide"}.
	     *
	     * @stable
	     */
	    var DoCheck = (function () {
	        function DoCheck() {
	        }
	        return DoCheck;
	    }());
	    /**
	     * @whatItDoes Lifecycle hook that is called when a directive or pipe is destroyed.
	     * @howToUse
	     * {@example core/ts/metadata/lifecycle_hooks_spec.ts region='OnDestroy'}
	     *
	     * @description
	     * `ngOnDestroy` callback is typically used for any custom cleanup that needs to occur when the
	     * instance is destroyed.
	     *
	     * See {@linkDocs guide/lifecycle-hooks "Lifecycle Hooks Guide"}.
	     *
	     * @stable
	     */
	    var OnDestroy = (function () {
	        function OnDestroy() {
	        }
	        return OnDestroy;
	    }());
	    /**
	     *
	     * @whatItDoes Lifecycle hook that is called after a directive's content has been fully
	     * initialized.
	     * @howToUse
	     * {@example core/ts/metadata/lifecycle_hooks_spec.ts region='AfterContentInit'}
	     *
	     * @description
	     * See {@linkDocs guide/lifecycle-hooks#aftercontent "Lifecycle Hooks Guide"}.
	     *
	     * @stable
	     */
	    var AfterContentInit = (function () {
	        function AfterContentInit() {
	        }
	        return AfterContentInit;
	    }());
	    /**
	     * @whatItDoes Lifecycle hook that is called after every check of a directive's content.
	     * @howToUse
	     * {@example core/ts/metadata/lifecycle_hooks_spec.ts region='AfterContentChecked'}
	     *
	     * @description
	     * See {@linkDocs guide/lifecycle-hooks#aftercontent "Lifecycle Hooks Guide"}.
	     *
	     * @stable
	     */
	    var AfterContentChecked = (function () {
	        function AfterContentChecked() {
	        }
	        return AfterContentChecked;
	    }());
	    /**
	     * @whatItDoes Lifecycle hook that is called after a component's view has been fully
	     * initialized.
	     * @howToUse
	     * {@example core/ts/metadata/lifecycle_hooks_spec.ts region='AfterViewInit'}
	     *
	     * @description
	     * See {@linkDocs guide/lifecycle-hooks#afterview "Lifecycle Hooks Guide"}.
	     *
	     * @stable
	     */
	    var AfterViewInit = (function () {
	        function AfterViewInit() {
	        }
	        return AfterViewInit;
	    }());
	    /**
	     * @whatItDoes Lifecycle hook that is called after every check of a component's view.
	     * @howToUse
	     * {@example core/ts/metadata/lifecycle_hooks_spec.ts region='AfterViewChecked'}
	     *
	     * @description
	     * See {@linkDocs guide/lifecycle-hooks#afterview "Lifecycle Hooks Guide"}.
	     *
	     * @stable
	     */
	    var AfterViewChecked = (function () {
	        function AfterViewChecked() {
	        }
	        return AfterViewChecked;
	    }());
	
	    /**
	     * Defines a schema that will allow:
	     * - any non-angular elements with a `-` in their name,
	     * - any properties on elements with a `-` in their name which is the common rule for custom
	     * elements.
	     *
	     * @stable
	     */
	    var CUSTOM_ELEMENTS_SCHEMA = {
	        name: 'custom-elements'
	    };
	    /**
	     * Defines a schema that will allow any property on any element.
	     *
	     * @experimental
	     */
	    var NO_ERRORS_SCHEMA = {
	        name: 'no-errors-schema'
	    };
	    /**
	     * NgModule decorator and metadata
	     *
	     * @stable
	     * @Annotation
	     */
	    var NgModule = makeDecorator('NgModule', {
	        providers: undefined,
	        declarations: undefined,
	        imports: undefined,
	        exports: undefined,
	        entryComponents: undefined,
	        bootstrap: undefined,
	        schemas: undefined,
	        id: undefined,
	    });
	
	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    /**
	     * Defines template and style encapsulation options available for Component's {@link Component}.
	     *
	     * See {@link ViewMetadata#encapsulation}.
	     * @stable
	     */
	    exports.ViewEncapsulation;
	    (function (ViewEncapsulation) {
	        /**
	         * Emulate `Native` scoping of styles by adding an attribute containing surrogate id to the Host
	         * Element and pre-processing the style rules provided via
	         * {@link ViewMetadata#styles} or {@link ViewMetadata#stylesUrls}, and adding the new Host Element
	         * attribute to all selectors.
	         *
	         * This is the default option.
	         */
	        ViewEncapsulation[ViewEncapsulation["Emulated"] = 0] = "Emulated";
	        /**
	         * Use the native encapsulation mechanism of the renderer.
	         *
	         * For the DOM this means using [Shadow DOM](https://w3c.github.io/webcomponents/spec/shadow/) and
	         * creating a ShadowRoot for Component's Host Element.
	         */
	        ViewEncapsulation[ViewEncapsulation["Native"] = 1] = "Native";
	        /**
	         * Don't provide any template or style encapsulation.
	         */
	        ViewEncapsulation[ViewEncapsulation["None"] = 2] = "None";
	    })(exports.ViewEncapsulation || (exports.ViewEncapsulation = {}));
	    var VIEW_ENCAPSULATION_VALUES = [exports.ViewEncapsulation.Emulated, exports.ViewEncapsulation.Native, exports.ViewEncapsulation.None];
	    /**
	     * Metadata properties available for configuring Views.
	     *
	     * Each Angular component requires a single `@Component` and at least one `@View` annotation. The
	     * `@View` annotation specifies the HTML template to use, and lists the directives that are active
	     * within the template.
	     *
	     * When a component is instantiated, the template is loaded into the component's shadow root, and
	     * the expressions and statements in the template are evaluated against the component.
	     *
	     * For details on the `@Component` annotation, see {@link Component}.
	     *
	     * ### Example
	     *
	     * ```
	     * @Component({
	     *   selector: 'greet',
	     *   template: 'Hello {{name}}!',
	     *   directives: [GreetUser, Bold]
	     * })
	     * class Greet {
	     *   name: string;
	     *
	     *   constructor() {
	     *     this.name = 'World';
	     *   }
	     * }
	     * ```
	     *
	     * @deprecated Use Component instead.
	     */
	    var ViewMetadata = (function () {
	        function ViewMetadata(_a) {
	            var _b = _a === void 0 ? {} : _a, templateUrl = _b.templateUrl, template = _b.template, encapsulation = _b.encapsulation, styles = _b.styles, styleUrls = _b.styleUrls, animations = _b.animations, interpolation = _b.interpolation;
	            this.templateUrl = templateUrl;
	            this.template = template;
	            this.styleUrls = styleUrls;
	            this.styles = styles;
	            this.encapsulation = encapsulation;
	            this.animations = animations;
	            this.interpolation = interpolation;
	        }
	        return ViewMetadata;
	    }());
	
	    /**
	     * Allows to refer to references which are not yet defined.
	     *
	     * For instance, `forwardRef` is used when the `token` which we need to refer to for the purposes of
	     * DI is declared,
	     * but not yet defined. It is also used when the `token` which we use when creating a query is not
	     * yet defined.
	     *
	     * ### Example
	     * {@example core/di/ts/forward_ref/forward_ref_spec.ts region='forward_ref'}
	     * @experimental
	     */
	    function forwardRef(forwardRefFn) {
	        forwardRefFn.__forward_ref__ = forwardRef;
	        forwardRefFn.toString = function () { return stringify(this()); };
	        return forwardRefFn;
	    }
	    /**
	     * Lazily retrieves the reference value from a forwardRef.
	     *
	     * Acts as the identity function when given a non-forward-ref value.
	     *
	     * ### Example ([live demo](http://plnkr.co/edit/GU72mJrk1fiodChcmiDR?p=preview))
	     *
	     * {@example core/di/ts/forward_ref/forward_ref_spec.ts region='resolve_forward_ref'}
	     *
	     * See: {@link forwardRef}
	     * @experimental
	     */
	    function resolveForwardRef(type) {
	        if (isFunction(type) && type.hasOwnProperty('__forward_ref__') &&
	            type.__forward_ref__ === forwardRef) {
	            return type();
	        }
	        else {
	            return type;
	        }
	    }
	
	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var __extends = (this && this.__extends) || function (d, b) {
	        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	    function unimplemented() {
	        throw new Error('unimplemented');
	    }
	    /**
	     * @stable
	     */
	    var BaseError = (function (_super) {
	        __extends(BaseError, _super);
	        function BaseError(message) {
	            // Errors don't use current this, instead they create a new instance.
	            // We have to do forward all of our api to the nativeInstance.
	            var nativeError = _super.call(this, message);
	            this._nativeError = nativeError;
	        }
	        Object.defineProperty(BaseError.prototype, "message", {
	            get: function () { return this._nativeError.message; },
	            set: function (message) { this._nativeError.message = message; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(BaseError.prototype, "name", {
	            get: function () { return this._nativeError.name; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(BaseError.prototype, "stack", {
	            get: function () { return this._nativeError.stack; },
	            set: function (value) { this._nativeError.stack = value; },
	            enumerable: true,
	            configurable: true
	        });
	        BaseError.prototype.toString = function () { return this._nativeError.toString(); };
	        return BaseError;
	    }(Error));
	    /**
	     * @stable
	     */
	    var WrappedError = (function (_super) {
	        __extends(WrappedError, _super);
	        function WrappedError(message, error) {
	            _super.call(this, message + " caused by: " + (error instanceof Error ? error.message : error));
	            this.originalError = error;
	        }
	        Object.defineProperty(WrappedError.prototype, "stack", {
	            get: function () {
	                return (this.originalError instanceof Error ? this.originalError : this._nativeError)
	                    .stack;
	            },
	            enumerable: true,
	            configurable: true
	        });
	        return WrappedError;
	    }(BaseError));
	
	    var _THROW_IF_NOT_FOUND = new Object();
	    var THROW_IF_NOT_FOUND = _THROW_IF_NOT_FOUND;
	    var _NullInjector = (function () {
	        function _NullInjector() {
	        }
	        _NullInjector.prototype.get = function (token, notFoundValue) {
	            if (notFoundValue === void 0) { notFoundValue = _THROW_IF_NOT_FOUND; }
	            if (notFoundValue === _THROW_IF_NOT_FOUND) {
	                throw new Error("No provider for " + stringify(token) + "!");
	            }
	            return notFoundValue;
	        };
	        return _NullInjector;
	    }());
	    /**
	     * @whatItDoes Injector interface
	     * @howToUse
	     * ```
	     * const injector: Injector = ...;
	     * injector.get(...);
	     * ```
	     *
	     * @description
	     * For more details, see the {@linkDocs guide/dependency-injection "Dependency Injection Guide"}.
	     *
	     * ### Example
	     *
	     * {@example core/di/ts/injector_spec.ts region='Injector'}
	     *
	     * `Injector` returns itself when given `Injector` as a token:
	     * {@example core/di/ts/injector_spec.ts region='injectInjector'}
	     *
	     * @stable
	     */
	    var Injector = (function () {
	        function Injector() {
	        }
	        /**
	         * Retrieves an instance from the injector based on the provided token.
	         * If not found:
	         * - Throws {@link NoProviderError} if no `notFoundValue` that is not equal to
	         * Injector.THROW_IF_NOT_FOUND is given
	         * - Returns the `notFoundValue` otherwise
	         * ```
	         */
	        Injector.prototype.get = function (token, notFoundValue) { return unimplemented(); };
	        Injector.THROW_IF_NOT_FOUND = _THROW_IF_NOT_FOUND;
	        Injector.NULL = new _NullInjector();
	        return Injector;
	    }());
	
	    var Map$1 = global$1.Map;
	    var Set = global$1.Set;
	    // Safari and Internet Explorer do not support the iterable parameter to the
	    // Map constructor.  We work around that by manually adding the items.
	    var createMapFromPairs = (function () {
	        try {
	            if (new Map$1([[1, 2]]).size === 1) {
	                return function createMapFromPairs(pairs) { return new Map$1(pairs); };
	            }
	        }
	        catch (e) {
	        }
	        return function createMapAndPopulateFromPairs(pairs) {
	            var map = new Map$1();
	            for (var i = 0; i < pairs.length; i++) {
	                var pair = pairs[i];
	                map.set(pair[0], pair[1]);
	            }
	            return map;
	        };
	    })();
	    var createMapFromMap = (function () {
	        try {
	            if (new Map$1(new Map$1())) {
	                return function createMapFromMap(m) { return new Map$1(m); };
	            }
	        }
	        catch (e) {
	        }
	        return function createMapAndPopulateFromMap(m) {
	            var map = new Map$1();
	            m.forEach(function (v, k) { map.set(k, v); });
	            return map;
	        };
	    })();
	    var _clearValues = (function () {
	        if ((new Map$1()).keys().next) {
	            return function _clearValues(m) {
	                var keyIterator = m.keys();
	                var k;
	                while (!((k = keyIterator.next()).done)) {
	                    m.set(k.value, null);
	                }
	            };
	        }
	        else {
	            return function _clearValuesWithForeEach(m) {
	                m.forEach(function (v, k) { m.set(k, null); });
	            };
	        }
	    })();
	    // Safari doesn't implement MapIterator.next(), which is used is Traceur's polyfill of Array.from
	    // TODO(mlaval): remove the work around once we have a working polyfill of Array.from
	    var _arrayFromMap = (function () {
	        try {
	            if ((new Map$1()).values().next) {
	                return function createArrayFromMap(m, getValues) {
	                    return getValues ? Array.from(m.values()) : Array.from(m.keys());
	                };
	            }
	        }
	        catch (e) {
	        }
	        return function createArrayFromMapWithForeach(m, getValues) {
	            var res = ListWrapper.createFixedSize(m.size), i = 0;
	            m.forEach(function (v, k) {
	                res[i] = getValues ? v : k;
	                i++;
	            });
	            return res;
	        };
	    })();
	    var MapWrapper = (function () {
	        function MapWrapper() {
	        }
	        MapWrapper.clone = function (m) { return createMapFromMap(m); };
	        MapWrapper.createFromStringMap = function (stringMap) {
	            var result = new Map$1();
	            for (var prop in stringMap) {
	                result.set(prop, stringMap[prop]);
	            }
	            return result;
	        };
	        MapWrapper.toStringMap = function (m) {
	            var r = {};
	            m.forEach(function (v, k) { return r[k] = v; });
	            return r;
	        };
	        MapWrapper.createFromPairs = function (pairs) { return createMapFromPairs(pairs); };
	        MapWrapper.clearValues = function (m) { _clearValues(m); };
	        MapWrapper.iterable = function (m) { return m; };
	        MapWrapper.keys = function (m) { return _arrayFromMap(m, false); };
	        MapWrapper.values = function (m) { return _arrayFromMap(m, true); };
	        return MapWrapper;
	    }());
	    /**
	     * Wraps Javascript Objects
	     */
	    var StringMapWrapper = (function () {
	        function StringMapWrapper() {
	        }
	        StringMapWrapper.create = function () {
	            // Note: We are not using Object.create(null) here due to
	            // performance!
	            // http://jsperf.com/ng2-object-create-null
	            return {};
	        };
	        StringMapWrapper.contains = function (map, key) {
	            return map.hasOwnProperty(key);
	        };
	        StringMapWrapper.get = function (map, key) {
	            return map.hasOwnProperty(key) ? map[key] : undefined;
	        };
	        StringMapWrapper.set = function (map, key, value) { map[key] = value; };
	        StringMapWrapper.keys = function (map) { return Object.keys(map); };
	        StringMapWrapper.values = function (map) {
	            return Object.keys(map).map(function (k) { return map[k]; });
	        };
	        StringMapWrapper.isEmpty = function (map) {
	            for (var prop in map) {
	                return false;
	            }
	            return true;
	        };
	        StringMapWrapper.delete = function (map, key) { delete map[key]; };
	        StringMapWrapper.forEach = function (map, callback) {
	            for (var _i = 0, _a = Object.keys(map); _i < _a.length; _i++) {
	                var k = _a[_i];
	                callback(map[k], k);
	            }
	        };
	        StringMapWrapper.merge = function (m1, m2) {
	            var m = {};
	            for (var _i = 0, _a = Object.keys(m1); _i < _a.length; _i++) {
	                var k = _a[_i];
	                m[k] = m1[k];
	            }
	            for (var _b = 0, _c = Object.keys(m2); _b < _c.length; _b++) {
	                var k = _c[_b];
	                m[k] = m2[k];
	            }
	            return m;
	        };
	        StringMapWrapper.equals = function (m1, m2) {
	            var k1 = Object.keys(m1);
	            var k2 = Object.keys(m2);
	            if (k1.length != k2.length) {
	                return false;
	            }
	            for (var i = 0; i < k1.length; i++) {
	                var key = k1[i];
	                if (m1[key] !== m2[key]) {
	                    return false;
	                }
	            }
	            return true;
	        };
	        return StringMapWrapper;
	    }());
	    var ListWrapper = (function () {
	        function ListWrapper() {
	        }
	        // JS has no way to express a statically fixed size list, but dart does so we
	        // keep both methods.
	        ListWrapper.createFixedSize = function (size) { return new Array(size); };
	        ListWrapper.createGrowableSize = function (size) { return new Array(size); };
	        ListWrapper.clone = function (array) { return array.slice(0); };
	        ListWrapper.forEachWithIndex = function (array, fn) {
	            for (var i = 0; i < array.length; i++) {
	                fn(array[i], i);
	            }
	        };
	        ListWrapper.first = function (array) {
	            if (!array)
	                return null;
	            return array[0];
	        };
	        ListWrapper.last = function (array) {
	            if (!array || array.length == 0)
	                return null;
	            return array[array.length - 1];
	        };
	        ListWrapper.indexOf = function (array, value, startIndex) {
	            if (startIndex === void 0) { startIndex = 0; }
	            return array.indexOf(value, startIndex);
	        };
	        ListWrapper.contains = function (list, el) { return list.indexOf(el) !== -1; };
	        ListWrapper.reversed = function (array) {
	            var a = ListWrapper.clone(array);
	            return a.reverse();
	        };
	        ListWrapper.concat = function (a, b) { return a.concat(b); };
	        ListWrapper.insert = function (list, index, value) { list.splice(index, 0, value); };
	        ListWrapper.removeAt = function (list, index) {
	            var res = list[index];
	            list.splice(index, 1);
	            return res;
	        };
	        ListWrapper.removeAll = function (list, items) {
	            for (var i = 0; i < items.length; ++i) {
	                var index = list.indexOf(items[i]);
	                list.splice(index, 1);
	            }
	        };
	        ListWrapper.remove = function (list, el) {
	            var index = list.indexOf(el);
	            if (index > -1) {
	                list.splice(index, 1);
	                return true;
	            }
	            return false;
	        };
	        ListWrapper.clear = function (list) { list.length = 0; };
	        ListWrapper.isEmpty = function (list) { return list.length == 0; };
	        ListWrapper.fill = function (list, value, start, end) {
	            if (start === void 0) { start = 0; }
	            if (end === void 0) { end = null; }
	            list.fill(value, start, end === null ? list.length : end);
	        };
	        ListWrapper.equals = function (a, b) {
	            if (a.length != b.length)
	                return false;
	            for (var i = 0; i < a.length; ++i) {
	                if (a[i] !== b[i])
	                    return false;
	            }
	            return true;
	        };
	        ListWrapper.slice = function (l, from, to) {
	            if (from === void 0) { from = 0; }
	            if (to === void 0) { to = null; }
	            return l.slice(from, to === null ? undefined : to);
	        };
	        ListWrapper.splice = function (l, from, length) { return l.splice(from, length); };
	        ListWrapper.sort = function (l, compareFn) {
	            if (isPresent(compareFn)) {
	                l.sort(compareFn);
	            }
	            else {
	                l.sort();
	            }
	        };
	        ListWrapper.toString = function (l) { return l.toString(); };
	        ListWrapper.toJSON = function (l) { return JSON.stringify(l); };
	        ListWrapper.maximum = function (list, predicate) {
	            if (list.length == 0) {
	                return null;
	            }
	            var solution = null;
	            var maxValue = -Infinity;
	            for (var index = 0; index < list.length; index++) {
	                var candidate = list[index];
	                if (isBlank(candidate)) {
	                    continue;
	                }
	                var candidateValue = predicate(candidate);
	                if (candidateValue > maxValue) {
	                    solution = candidate;
	                    maxValue = candidateValue;
	                }
	            }
	            return solution;
	        };
	        ListWrapper.flatten = function (list) {
	            var target = [];
	            _flattenArray(list, target);
	            return target;
	        };
	        ListWrapper.addAll = function (list, source) {
	            for (var i = 0; i < source.length; i++) {
	                list.push(source[i]);
	            }
	        };
	        return ListWrapper;
	    }());
	    function _flattenArray(source, target) {
	        if (isPresent(source)) {
	            for (var i = 0; i < source.length; i++) {
	                var item = source[i];
	                if (isArray(item)) {
	                    _flattenArray(item, target);
	                }
	                else {
	                    target.push(item);
	                }
	            }
	        }
	        return target;
	    }
	    function isListLikeIterable(obj) {
	        if (!isJsObject(obj))
	            return false;
	        return isArray(obj) ||
	            (!(obj instanceof Map$1) &&
	                getSymbolIterator() in obj); // JS Iterable have a Symbol.iterator prop
	    }
	    function areIterablesEqual(a, b, comparator) {
	        var iterator1 = a[getSymbolIterator()]();
	        var iterator2 = b[getSymbolIterator()]();
	        while (true) {
	            var item1 = iterator1.next();
	            var item2 = iterator2.next();
	            if (item1.done && item2.done)
	                return true;
	            if (item1.done || item2.done)
	                return false;
	            if (!comparator(item1.value, item2.value))
	                return false;
	        }
	    }
	    function iterateListLike(obj, fn) {
	        if (isArray(obj)) {
	            for (var i = 0; i < obj.length; i++) {
	                fn(obj[i]);
	            }
	        }
	        else {
	            var iterator = obj[getSymbolIterator()]();
	            var item;
	            while (!((item = iterator.next()).done)) {
	                fn(item.value);
	            }
	        }
	    }
	    // Safari and Internet Explorer do not support the iterable parameter to the
	    // Set constructor.  We work around that by manually adding the items.
	    var createSetFromList = (function () {
	        var test = new Set([1, 2, 3]);
	        if (test.size === 3) {
	            return function createSetFromList(lst) { return new Set(lst); };
	        }
	        else {
	            return function createSetAndPopulateFromList(lst) {
	                var res = new Set(lst);
	                if (res.size !== lst.length) {
	                    for (var i = 0; i < lst.length; i++) {
	                        res.add(lst[i]);
	                    }
	                }
	                return res;
	            };
	        }
	    })();
	    var SetWrapper = (function () {
	        function SetWrapper() {
	        }
	        SetWrapper.createFromList = function (lst) { return createSetFromList(lst); };
	        SetWrapper.has = function (s, key) { return s.has(key); };
	        SetWrapper.delete = function (m, k) { m.delete(k); };
	        return SetWrapper;
	    }());
	
	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var __extends$1 = (this && this.__extends) || function (d, b) {
	        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	    function findFirstClosedCycle(keys) {
	        var res = [];
	        for (var i = 0; i < keys.length; ++i) {
	            if (ListWrapper.contains(res, keys[i])) {
	                res.push(keys[i]);
	                return res;
	            }
	            res.push(keys[i]);
	        }
	        return res;
	    }
	    function constructResolvingPath(keys) {
	        if (keys.length > 1) {
	            var reversed = findFirstClosedCycle(ListWrapper.reversed(keys));
	            var tokenStrs = reversed.map(function (k) { return stringify(k.token); });
	            return ' (' + tokenStrs.join(' -> ') + ')';
	        }
	        return '';
	    }
	    /**
	     * Base class for all errors arising from misconfigured providers.
	     * @stable
	     */
	    var AbstractProviderError = (function (_super) {
	        __extends$1(AbstractProviderError, _super);
	        function AbstractProviderError(injector, key, constructResolvingMessage) {
	            _super.call(this, 'DI Error');
	            this.keys = [key];
	            this.injectors = [injector];
	            this.constructResolvingMessage = constructResolvingMessage;
	            this.message = this.constructResolvingMessage(this.keys);
	        }
	        AbstractProviderError.prototype.addKey = function (injector, key) {
	            this.injectors.push(injector);
	            this.keys.push(key);
	            this.message = this.constructResolvingMessage(this.keys);
	        };
	        return AbstractProviderError;
	    }(BaseError));
	    /**
	     * Thrown when trying to retrieve a dependency by key from {@link Injector}, but the
	     * {@link Injector} does not have a {@link Provider} for the given key.
	     *
	     * ### Example ([live demo](http://plnkr.co/edit/vq8D3FRB9aGbnWJqtEPE?p=preview))
	     *
	     * ```typescript
	     * class A {
	     *   constructor(b:B) {}
	     * }
	     *
	     * expect(() => Injector.resolveAndCreate([A])).toThrowError();
	     * ```
	     * @stable
	     */
	    var NoProviderError = (function (_super) {
	        __extends$1(NoProviderError, _super);
	        function NoProviderError(injector, key) {
	            _super.call(this, injector, key, function (keys) {
	                var first = stringify(ListWrapper.first(keys).token);
	                return "No provider for " + first + "!" + constructResolvingPath(keys);
	            });
	        }
	        return NoProviderError;
	    }(AbstractProviderError));
	    /**
	     * Thrown when dependencies form a cycle.
	     *
	     * ### Example ([live demo](http://plnkr.co/edit/wYQdNos0Tzql3ei1EV9j?p=info))
	     *
	     * ```typescript
	     * var injector = Injector.resolveAndCreate([
	     *   {provide: "one", useFactory: (two) => "two", deps: [[new Inject("two")]]},
	     *   {provide: "two", useFactory: (one) => "one", deps: [[new Inject("one")]]}
	     * ]);
	     *
	     * expect(() => injector.get("one")).toThrowError();
	     * ```
	     *
	     * Retrieving `A` or `B` throws a `CyclicDependencyError` as the graph above cannot be constructed.
	     * @stable
	     */
	    var CyclicDependencyError = (function (_super) {
	        __extends$1(CyclicDependencyError, _super);
	        function CyclicDependencyError(injector, key) {
	            _super.call(this, injector, key, function (keys) {
	                return "Cannot instantiate cyclic dependency!" + constructResolvingPath(keys);
	            });
	        }
	        return CyclicDependencyError;
	    }(AbstractProviderError));
	    /**
	     * Thrown when a constructing type returns with an Error.
	     *
	     * The `InstantiationError` class contains the original error plus the dependency graph which caused
	     * this object to be instantiated.
	     *
	     * ### Example ([live demo](http://plnkr.co/edit/7aWYdcqTQsP0eNqEdUAf?p=preview))
	     *
	     * ```typescript
	     * class A {
	     *   constructor() {
	     *     throw new Error('message');
	     *   }
	     * }
	     *
	     * var injector = Injector.resolveAndCreate([A]);
	
	     * try {
	     *   injector.get(A);
	     * } catch (e) {
	     *   expect(e instanceof InstantiationError).toBe(true);
	     *   expect(e.originalException.message).toEqual("message");
	     *   expect(e.originalStack).toBeDefined();
	     * }
	     * ```
	     * @stable
	     */
	    var InstantiationError = (function (_super) {
	        __extends$1(InstantiationError, _super);
	        function InstantiationError(injector, originalException, originalStack, key) {
	            _super.call(this, 'DI Error', originalException);
	            this.keys = [key];
	            this.injectors = [injector];
	        }
	        InstantiationError.prototype.addKey = function (injector, key) {
	            this.injectors.push(injector);
	            this.keys.push(key);
	        };
	        Object.defineProperty(InstantiationError.prototype, "message", {
	            get: function () {
	                var first = stringify(ListWrapper.first(this.keys).token);
	                return this.originalError.message + ": Error during instantiation of " + first + "!" + constructResolvingPath(this.keys) + ".";
	            },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(InstantiationError.prototype, "causeKey", {
	            get: function () { return this.keys[0]; },
	            enumerable: true,
	            configurable: true
	        });
	        return InstantiationError;
	    }(WrappedError));
	    /**
	     * Thrown when an object other then {@link Provider} (or `Type`) is passed to {@link Injector}
	     * creation.
	     *
	     * ### Example ([live demo](http://plnkr.co/edit/YatCFbPAMCL0JSSQ4mvH?p=preview))
	     *
	     * ```typescript
	     * expect(() => Injector.resolveAndCreate(["not a type"])).toThrowError();
	     * ```
	     * @stable
	     */
	    var InvalidProviderError = (function (_super) {
	        __extends$1(InvalidProviderError, _super);
	        function InvalidProviderError(provider) {
	            _super.call(this, "Invalid provider - only instances of Provider and Type are allowed, got: " + provider);
	        }
	        return InvalidProviderError;
	    }(BaseError));
	    /**
	     * Thrown when the class has no annotation information.
	     *
	     * Lack of annotation information prevents the {@link Injector} from determining which dependencies
	     * need to be injected into the constructor.
	     *
	     * ### Example ([live demo](http://plnkr.co/edit/rHnZtlNS7vJOPQ6pcVkm?p=preview))
	     *
	     * ```typescript
	     * class A {
	     *   constructor(b) {}
	     * }
	     *
	     * expect(() => Injector.resolveAndCreate([A])).toThrowError();
	     * ```
	     *
	     * This error is also thrown when the class not marked with {@link Injectable} has parameter types.
	     *
	     * ```typescript
	     * class B {}
	     *
	     * class A {
	     *   constructor(b:B) {} // no information about the parameter types of A is available at runtime.
	     * }
	     *
	     * expect(() => Injector.resolveAndCreate([A,B])).toThrowError();
	     * ```
	     * @stable
	     */
	    var NoAnnotationError = (function (_super) {
	        __extends$1(NoAnnotationError, _super);
	        function NoAnnotationError(typeOrFunc, params) {
	            _super.call(this, NoAnnotationError._genMessage(typeOrFunc, params));
	        }
	        NoAnnotationError._genMessage = function (typeOrFunc, params) {
	            var signature = [];
	            for (var i = 0, ii = params.length; i < ii; i++) {
	                var parameter = params[i];
	                if (isBlank(parameter) || parameter.length == 0) {
	                    signature.push('?');
	                }
	                else {
	                    signature.push(parameter.map(stringify).join(' '));
	                }
	            }
	            return 'Cannot resolve all parameters for \'' + stringify(typeOrFunc) + '\'(' +
	                signature.join(', ') + '). ' +
	                'Make sure that all the parameters are decorated with Inject or have valid type annotations and that \'' +
	                stringify(typeOrFunc) + '\' is decorated with Injectable.';
	        };
	        return NoAnnotationError;
	    }(BaseError));
	    /**
	     * Thrown when getting an object by index.
	     *
	     * ### Example ([live demo](http://plnkr.co/edit/bRs0SX2OTQiJzqvjgl8P?p=preview))
	     *
	     * ```typescript
	     * class A {}
	     *
	     * var injector = Injector.resolveAndCreate([A]);
	     *
	     * expect(() => injector.getAt(100)).toThrowError();
	     * ```
	     * @stable
	     */
	    var OutOfBoundsError = (function (_super) {
	        __extends$1(OutOfBoundsError, _super);
	        function OutOfBoundsError(index) {
	            _super.call(this, "Index " + index + " is out-of-bounds.");
	        }
	        return OutOfBoundsError;
	    }(BaseError));
	    // TODO: add a working example after alpha38 is released
	    /**
	     * Thrown when a multi provider and a regular provider are bound to the same token.
	     *
	     * ### Example
	     *
	     * ```typescript
	     * expect(() => Injector.resolveAndCreate([
	     *   { provide: "Strings", useValue: "string1", multi: true},
	     *   { provide: "Strings", useValue: "string2", multi: false}
	     * ])).toThrowError();
	     * ```
	     */
	    var MixingMultiProvidersWithRegularProvidersError = (function (_super) {
	        __extends$1(MixingMultiProvidersWithRegularProvidersError, _super);
	        function MixingMultiProvidersWithRegularProvidersError(provider1, provider2) {
	            _super.call(this, 'Cannot mix multi providers and regular providers, got: ' + provider1.toString() + ' ' +
	                provider2.toString());
	        }
	        return MixingMultiProvidersWithRegularProvidersError;
	    }(BaseError));
	
	    /**
	     * A unique object used for retrieving items from the {@link ReflectiveInjector}.
	     *
	     * Keys have:
	     * - a system-wide unique `id`.
	     * - a `token`.
	     *
	     * `Key` is used internally by {@link ReflectiveInjector} because its system-wide unique `id` allows
	     * the
	     * injector to store created objects in a more efficient way.
	     *
	     * `Key` should not be created directly. {@link ReflectiveInjector} creates keys automatically when
	     * resolving
	     * providers.
	     * @experimental
	     */
	    var ReflectiveKey = (function () {
	        /**
	         * Private
	         */
	        function ReflectiveKey(token, id) {
	            this.token = token;
	            this.id = id;
	            if (isBlank(token)) {
	                throw new Error('Token must be defined!');
	            }
	        }
	        Object.defineProperty(ReflectiveKey.prototype, "displayName", {
	            /**
	             * Returns a stringified token.
	             */
	            get: function () { return stringify(this.token); },
	            enumerable: true,
	            configurable: true
	        });
	        /**
	         * Retrieves a `Key` for a token.
	         */
	        ReflectiveKey.get = function (token) {
	            return _globalKeyRegistry.get(resolveForwardRef(token));
	        };
	        Object.defineProperty(ReflectiveKey, "numberOfKeys", {
	            /**
	             * @returns the number of keys registered in the system.
	             */
	            get: function () { return _globalKeyRegistry.numberOfKeys; },
	            enumerable: true,
	            configurable: true
	        });
	        return ReflectiveKey;
	    }());
	    /**
	     * @internal
	     */
	    var KeyRegistry = (function () {
	        function KeyRegistry() {
	            this._allKeys = new Map();
	        }
	        KeyRegistry.prototype.get = function (token) {
	            if (token instanceof ReflectiveKey)
	                return token;
	            if (this._allKeys.has(token)) {
	                return this._allKeys.get(token);
	            }
	            var newKey = new ReflectiveKey(token, ReflectiveKey.numberOfKeys);
	            this._allKeys.set(token, newKey);
	            return newKey;
	        };
	        Object.defineProperty(KeyRegistry.prototype, "numberOfKeys", {
	            get: function () { return this._allKeys.size; },
	            enumerable: true,
	            configurable: true
	        });
	        return KeyRegistry;
	    }());
	    var _globalKeyRegistry = new KeyRegistry();
	
	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    /**
	     * @whatItDoes Represents a type that a Component or other object is instances of.
	     *
	     * @description
	     *
	     * An example of a `Type` is `MyCustomComponent` class, which in JavaScript is be represented by
	     * the `MyCustomComponent` constructor function.
	     *
	     * @stable
	     */
	    var Type = Function;
	
	    var ReflectionCapabilities = (function () {
	        function ReflectionCapabilities(reflect) {
	            this._reflect = reflect || global$1.Reflect;
	        }
	        ReflectionCapabilities.prototype.isReflectionEnabled = function () { return true; };
	        ReflectionCapabilities.prototype.factory = function (t) {
	            var prototype = t.prototype;
	            return function () {
	                var args = [];
	                for (var _i = 0; _i < arguments.length; _i++) {
	                    args[_i - 0] = arguments[_i];
	                }
	                var instance = Object.create(prototype);
	                t.apply(instance, args);
	                return instance;
	            };
	        };
	        /** @internal */
	        ReflectionCapabilities.prototype._zipTypesAndAnnotations = function (paramTypes /** TODO #9100 */, paramAnnotations /** TODO #9100 */) {
	            var result;
	            if (typeof paramTypes === 'undefined') {
	                result = new Array(paramAnnotations.length);
	            }
	            else {
	                result = new Array(paramTypes.length);
	            }
	            for (var i = 0; i < result.length; i++) {
	                // TS outputs Object for parameters without types, while Traceur omits
	                // the annotations. For now we preserve the Traceur behavior to aid
	                // migration, but this can be revisited.
	                if (typeof paramTypes === 'undefined') {
	                    result[i] = [];
	                }
	                else if (paramTypes[i] != Object) {
	                    result[i] = [paramTypes[i]];
	                }
	                else {
	                    result[i] = [];
	                }
	                if (isPresent(paramAnnotations) && isPresent(paramAnnotations[i])) {
	                    result[i] = result[i].concat(paramAnnotations[i]);
	                }
	            }
	            return result;
	        };
	        ReflectionCapabilities.prototype.parameters = function (typeOrFunc) {
	            // Prefer the direct API.
	            if (isPresent(typeOrFunc.parameters)) {
	                return typeOrFunc.parameters;
	            }
	            // API of tsickle for lowering decorators to properties on the class.
	            if (isPresent(typeOrFunc.ctorParameters)) {
	                var ctorParameters = typeOrFunc.ctorParameters;
	                var paramTypes_1 = ctorParameters.map(function (ctorParam /** TODO #9100 */) { return ctorParam && ctorParam.type; });
	                var paramAnnotations_1 = ctorParameters.map(function (ctorParam /** TODO #9100 */) {
	                    return ctorParam && convertTsickleDecoratorIntoMetadata(ctorParam.decorators);
	                });
	                return this._zipTypesAndAnnotations(paramTypes_1, paramAnnotations_1);
	            }
	            // API for metadata created by invoking the decorators.
	            if (isPresent(this._reflect) && isPresent(this._reflect.getMetadata)) {
	                var paramAnnotations = this._reflect.getMetadata('parameters', typeOrFunc);
	                var paramTypes = this._reflect.getMetadata('design:paramtypes', typeOrFunc);
	                if (isPresent(paramTypes) || isPresent(paramAnnotations)) {
	                    return this._zipTypesAndAnnotations(paramTypes, paramAnnotations);
	                }
	            }
	            // The array has to be filled with `undefined` because holes would be skipped by `some`
	            var parameters = new Array(typeOrFunc.length);
	            parameters.fill(undefined);
	            return parameters;
	        };
	        ReflectionCapabilities.prototype.annotations = function (typeOrFunc) {
	            // Prefer the direct API.
	            if (isPresent(typeOrFunc.annotations)) {
	                var annotations = typeOrFunc.annotations;
	                if (isFunction(annotations) && annotations.annotations) {
	                    annotations = annotations.annotations;
	                }
	                return annotations;
	            }
	            // API of tsickle for lowering decorators to properties on the class.
	            if (isPresent(typeOrFunc.decorators)) {
	                return convertTsickleDecoratorIntoMetadata(typeOrFunc.decorators);
	            }
	            // API for metadata created by invoking the decorators.
	            if (isPresent(this._reflect) && isPresent(this._reflect.getMetadata)) {
	                var annotations = this._reflect.getMetadata('annotations', typeOrFunc);
	                if (isPresent(annotations))
	                    return annotations;
	            }
	            return [];
	        };
	        ReflectionCapabilities.prototype.propMetadata = function (typeOrFunc) {
	            // Prefer the direct API.
	            if (isPresent(typeOrFunc.propMetadata)) {
	                var propMetadata = typeOrFunc.propMetadata;
	                if (isFunction(propMetadata) && propMetadata.propMetadata) {
	                    propMetadata = propMetadata.propMetadata;
	                }
	                return propMetadata;
	            }
	            // API of tsickle for lowering decorators to properties on the class.
	            if (isPresent(typeOrFunc.propDecorators)) {
	                var propDecorators_1 = typeOrFunc.propDecorators;
	                var propMetadata_1 = {};
	                Object.keys(propDecorators_1).forEach(function (prop) {
	                    propMetadata_1[prop] = convertTsickleDecoratorIntoMetadata(propDecorators_1[prop]);
	                });
	                return propMetadata_1;
	            }
	            // API for metadata created by invoking the decorators.
	            if (isPresent(this._reflect) && isPresent(this._reflect.getMetadata)) {
	                var propMetadata = this._reflect.getMetadata('propMetadata', typeOrFunc);
	                if (isPresent(propMetadata))
	                    return propMetadata;
	            }
	            return {};
	        };
	        // Note: JavaScript does not support to query for interfaces during runtime.
	        // However, we can't throw here as the reflector will always call this method
	        // when asked for a lifecycle interface as this is what we check in Dart.
	        ReflectionCapabilities.prototype.interfaces = function (type) { return []; };
	        ReflectionCapabilities.prototype.hasLifecycleHook = function (type, lcInterface, lcProperty) {
	            if (!(type instanceof Type))
	                return false;
	            var proto = type.prototype;
	            return !!proto[lcProperty];
	        };
	        ReflectionCapabilities.prototype.getter = function (name) { return new Function('o', 'return o.' + name + ';'); };
	        ReflectionCapabilities.prototype.setter = function (name) {
	            return new Function('o', 'v', 'return o.' + name + ' = v;');
	        };
	        ReflectionCapabilities.prototype.method = function (name) {
	            var functionBody = "if (!o." + name + ") throw new Error('\"" + name + "\" is undefined');\n        return o." + name + ".apply(o, args);";
	            return new Function('o', 'args', functionBody);
	        };
	        // There is not a concept of import uri in Js, but this is useful in developing Dart applications.
	        ReflectionCapabilities.prototype.importUri = function (type) {
	            // StaticSymbol
	            if (typeof type === 'object' && type['filePath']) {
	                return type['filePath'];
	            }
	            // Runtime type
	            return "./" + stringify(type);
	        };
	        ReflectionCapabilities.prototype.resolveIdentifier = function (name, moduleUrl, runtime) { return runtime; };
	        ReflectionCapabilities.prototype.resolveEnum = function (enumIdentifier, name) { return enumIdentifier[name]; };
	        return ReflectionCapabilities;
	    }());
	    function convertTsickleDecoratorIntoMetadata(decoratorInvocations) {
	        if (!decoratorInvocations) {
	            return [];
	        }
	        return decoratorInvocations.map(function (decoratorInvocation) {
	            var decoratorType = decoratorInvocation.type;
	            var annotationCls = decoratorType.annotationCls;
	            var annotationArgs = decoratorInvocation.args ? decoratorInvocation.args : [];
	            return new (annotationCls.bind.apply(annotationCls, [void 0].concat(annotationArgs)))();
	        });
	    }
	
	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    /**
	     * Provides read-only access to reflection data about symbols. Used internally by Angular
	     * to power dependency injection and compilation.
	     */
	    var ReflectorReader = (function () {
	        function ReflectorReader() {
	        }
	        return ReflectorReader;
	    }());
	
	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var __extends$2 = (this && this.__extends) || function (d, b) {
	        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	    /**
	     * Provides access to reflection data about symbols. Used internally by Angular
	     * to power dependency injection and compilation.
	     */
	    var Reflector = (function (_super) {
	        __extends$2(Reflector, _super);
	        function Reflector(reflectionCapabilities) {
	            _super.call(this);
	            /** @internal */
	            this._injectableInfo = new Map$1();
	            /** @internal */
	            this._getters = new Map$1();
	            /** @internal */
	            this._setters = new Map$1();
	            /** @internal */
	            this._methods = new Map$1();
	            this._usedKeys = null;
	            this.reflectionCapabilities = reflectionCapabilities;
	        }
	        Reflector.prototype.updateCapabilities = function (caps) { this.reflectionCapabilities = caps; };
	        Reflector.prototype.isReflectionEnabled = function () { return this.reflectionCapabilities.isReflectionEnabled(); };
	        /**
	         * Causes `this` reflector to track keys used to access
	         * {@link ReflectionInfo} objects.
	         */
	        Reflector.prototype.trackUsage = function () { this._usedKeys = new Set(); };
	        /**
	         * Lists types for which reflection information was not requested since
	         * {@link #trackUsage} was called. This list could later be audited as
	         * potential dead code.
	         */
	        Reflector.prototype.listUnusedKeys = function () {
	            var _this = this;
	            if (this._usedKeys == null) {
	                throw new Error('Usage tracking is disabled');
	            }
	            var allTypes = MapWrapper.keys(this._injectableInfo);
	            return allTypes.filter(function (key) { return !SetWrapper.has(_this._usedKeys, key); });
	        };
	        Reflector.prototype.registerFunction = function (func, funcInfo) {
	            this._injectableInfo.set(func, funcInfo);
	        };
	        Reflector.prototype.registerType = function (type, typeInfo) {
	            this._injectableInfo.set(type, typeInfo);
	        };
	        Reflector.prototype.registerGetters = function (getters) { _mergeMaps(this._getters, getters); };
	        Reflector.prototype.registerSetters = function (setters) { _mergeMaps(this._setters, setters); };
	        Reflector.prototype.registerMethods = function (methods) { _mergeMaps(this._methods, methods); };
	        Reflector.prototype.factory = function (type) {
	            if (this._containsReflectionInfo(type)) {
	                var res = this._getReflectionInfo(type).factory;
	                return isPresent(res) ? res : null;
	            }
	            else {
	                return this.reflectionCapabilities.factory(type);
	            }
	        };
	        Reflector.prototype.parameters = function (typeOrFunc) {
	            if (this._injectableInfo.has(typeOrFunc)) {
	                var res = this._getReflectionInfo(typeOrFunc).parameters;
	                return isPresent(res) ? res : [];
	            }
	            else {
	                return this.reflectionCapabilities.parameters(typeOrFunc);
	            }
	        };
	        Reflector.prototype.annotations = function (typeOrFunc) {
	            if (this._injectableInfo.has(typeOrFunc)) {
	                var res = this._getReflectionInfo(typeOrFunc).annotations;
	                return isPresent(res) ? res : [];
	            }
	            else {
	                return this.reflectionCapabilities.annotations(typeOrFunc);
	            }
	        };
	        Reflector.prototype.propMetadata = function (typeOrFunc) {
	            if (this._injectableInfo.has(typeOrFunc)) {
	                var res = this._getReflectionInfo(typeOrFunc).propMetadata;
	                return isPresent(res) ? res : {};
	            }
	            else {
	                return this.reflectionCapabilities.propMetadata(typeOrFunc);
	            }
	        };
	        Reflector.prototype.interfaces = function (type) {
	            if (this._injectableInfo.has(type)) {
	                var res = this._getReflectionInfo(type).interfaces;
	                return isPresent(res) ? res : [];
	            }
	            else {
	                return this.reflectionCapabilities.interfaces(type);
	            }
	        };
	        Reflector.prototype.hasLifecycleHook = function (type, lcInterface, lcProperty) {
	            var interfaces = this.interfaces(type);
	            if (interfaces.indexOf(lcInterface) !== -1) {
	                return true;
	            }
	            else {
	                return this.reflectionCapabilities.hasLifecycleHook(type, lcInterface, lcProperty);
	            }
	        };
	        Reflector.prototype.getter = function (name) {
	            if (this._getters.has(name)) {
	                return this._getters.get(name);
	            }
	            else {
	                return this.reflectionCapabilities.getter(name);
	            }
	        };
	        Reflector.prototype.setter = function (name) {
	            if (this._setters.has(name)) {
	                return this._setters.get(name);
	            }
	            else {
	                return this.reflectionCapabilities.setter(name);
	            }
	        };
	        Reflector.prototype.method = function (name) {
	            if (this._methods.has(name)) {
	                return this._methods.get(name);
	            }
	            else {
	                return this.reflectionCapabilities.method(name);
	            }
	        };
	        /** @internal */
	        Reflector.prototype._getReflectionInfo = function (typeOrFunc) {
	            if (isPresent(this._usedKeys)) {
	                this._usedKeys.add(typeOrFunc);
	            }
	            return this._injectableInfo.get(typeOrFunc);
	        };
	        /** @internal */
	        Reflector.prototype._containsReflectionInfo = function (typeOrFunc) { return this._injectableInfo.has(typeOrFunc); };
	        Reflector.prototype.importUri = function (type) { return this.reflectionCapabilities.importUri(type); };
	        Reflector.prototype.resolveIdentifier = function (name, moduleUrl, runtime) {
	            return this.reflectionCapabilities.resolveIdentifier(name, moduleUrl, runtime);
	        };
	        Reflector.prototype.resolveEnum = function (identifier, name) {
	            return this.reflectionCapabilities.resolveEnum(identifier, name);
	        };
	        return Reflector;
	    }(ReflectorReader));
	    function _mergeMaps(target, config) {
	        StringMapWrapper.forEach(config, function (v, k) { return target.set(k, v); });
	    }
	
	    /**
	     * The {@link Reflector} used internally in Angular to access metadata
	     * about symbols.
	     */
	    var reflector = new Reflector(new ReflectionCapabilities());
	
	    /**
	     * `Dependency` is used by the framework to extend DI.
	     * This is internal to Angular and should not be used directly.
	     */
	    var ReflectiveDependency = (function () {
	        function ReflectiveDependency(key, optional, lowerBoundVisibility, upperBoundVisibility, properties) {
	            this.key = key;
	            this.optional = optional;
	            this.lowerBoundVisibility = lowerBoundVisibility;
	            this.upperBoundVisibility = upperBoundVisibility;
	            this.properties = properties;
	        }
	        ReflectiveDependency.fromKey = function (key) {
	            return new ReflectiveDependency(key, false, null, null, []);
	        };
	        return ReflectiveDependency;
	    }());
	    var _EMPTY_LIST = [];
	    var ResolvedReflectiveProvider_ = (function () {
	        function ResolvedReflectiveProvider_(key, resolvedFactories, multiProvider) {
	            this.key = key;
	            this.resolvedFactories = resolvedFactories;
	            this.multiProvider = multiProvider;
	        }
	        Object.defineProperty(ResolvedReflectiveProvider_.prototype, "resolvedFactory", {
	            get: function () { return this.resolvedFactories[0]; },
	            enumerable: true,
	            configurable: true
	        });
	        return ResolvedReflectiveProvider_;
	    }());
	    /**
	     * An internal resolved representation of a factory function created by resolving {@link
	     * Provider}.
	     * @experimental
	     */
	    var ResolvedReflectiveFactory = (function () {
	        function ResolvedReflectiveFactory(
	            /**
	             * Factory function which can return an instance of an object represented by a key.
	             */
	            factory,
	            /**
	             * Arguments (dependencies) to the `factory` function.
	             */
	            dependencies) {
	            this.factory = factory;
	            this.dependencies = dependencies;
	        }
	        return ResolvedReflectiveFactory;
	    }());
	    /**
	     * Resolve a single provider.
	     */
	    function resolveReflectiveFactory(provider) {
	        var factoryFn;
	        var resolvedDeps;
	        if (isPresent(provider.useClass)) {
	            var useClass = resolveForwardRef(provider.useClass);
	            factoryFn = reflector.factory(useClass);
	            resolvedDeps = _dependenciesFor(useClass);
	        }
	        else if (isPresent(provider.useExisting)) {
	            factoryFn = function (aliasInstance) { return aliasInstance; };
	            resolvedDeps = [ReflectiveDependency.fromKey(ReflectiveKey.get(provider.useExisting))];
	        }
	        else if (isPresent(provider.useFactory)) {
	            factoryFn = provider.useFactory;
	            resolvedDeps = constructDependencies(provider.useFactory, provider.deps);
	        }
	        else {
	            factoryFn = function () { return provider.useValue; };
	            resolvedDeps = _EMPTY_LIST;
	        }
	        return new ResolvedReflectiveFactory(factoryFn, resolvedDeps);
	    }
	    /**
	     * Converts the {@link Provider} into {@link ResolvedProvider}.
	     *
	     * {@link Injector} internally only uses {@link ResolvedProvider}, {@link Provider} contains
	     * convenience provider syntax.
	     */
	    function resolveReflectiveProvider(provider) {
	        return new ResolvedReflectiveProvider_(ReflectiveKey.get(provider.provide), [resolveReflectiveFactory(provider)], provider.multi);
	    }
	    /**
	     * Resolve a list of Providers.
	     */
	    function resolveReflectiveProviders(providers) {
	        var normalized = _normalizeProviders(providers, []);
	        var resolved = normalized.map(resolveReflectiveProvider);
	        return MapWrapper.values(mergeResolvedReflectiveProviders(resolved, new Map()));
	    }
	    /**
	     * Merges a list of ResolvedProviders into a list where
	     * each key is contained exactly once and multi providers
	     * have been merged.
	     */
	    function mergeResolvedReflectiveProviders(providers, normalizedProvidersMap) {
	        for (var i = 0; i < providers.length; i++) {
	            var provider = providers[i];
	            var existing = normalizedProvidersMap.get(provider.key.id);
	            if (isPresent(existing)) {
	                if (provider.multiProvider !== existing.multiProvider) {
	                    throw new MixingMultiProvidersWithRegularProvidersError(existing, provider);
	                }
	                if (provider.multiProvider) {
	                    for (var j = 0; j < provider.resolvedFactories.length; j++) {
	                        existing.resolvedFactories.push(provider.resolvedFactories[j]);
	                    }
	                }
	                else {
	                    normalizedProvidersMap.set(provider.key.id, provider);
	                }
	            }
	            else {
	                var resolvedProvider;
	                if (provider.multiProvider) {
	                    resolvedProvider = new ResolvedReflectiveProvider_(provider.key, ListWrapper.clone(provider.resolvedFactories), provider.multiProvider);
	                }
	                else {
	                    resolvedProvider = provider;
	                }
	                normalizedProvidersMap.set(provider.key.id, resolvedProvider);
	            }
	        }
	        return normalizedProvidersMap;
	    }
	    function _normalizeProviders(providers, res) {
	        providers.forEach(function (b) {
	            if (b instanceof Type) {
	                res.push({ provide: b, useClass: b });
	            }
	            else if (b && typeof b == 'object' && b.provide !== undefined) {
	                res.push(b);
	            }
	            else if (b instanceof Array) {
	                _normalizeProviders(b, res);
	            }
	            else {
	                throw new InvalidProviderError(b);
	            }
	        });
	        return res;
	    }
	    function constructDependencies(typeOrFunc, dependencies) {
	        if (isBlank(dependencies)) {
	            return _dependenciesFor(typeOrFunc);
	        }
	        else {
	            var params = dependencies.map(function (t) { return [t]; });
	            return dependencies.map(function (t) { return _extractToken(typeOrFunc, t, params); });
	        }
	    }
	    function _dependenciesFor(typeOrFunc) {
	        var params = reflector.parameters(typeOrFunc);
	        if (isBlank(params))
	            return [];
	        if (params.some(isBlank)) {
	            throw new NoAnnotationError(typeOrFunc, params);
	        }
	        return params.map(function (p) { return _extractToken(typeOrFunc, p, params); });
	    }
	    function _extractToken(typeOrFunc /** TODO #9100 */, metadata /** TODO #9100 */ /*any[] | any*/, params) {
	        var depProps = [];
	        var token = null;
	        var optional = false;
	        if (!isArray(metadata)) {
	            if (metadata instanceof Inject) {
	                return _createDependency(metadata.token, optional, null, null, depProps);
	            }
	            else {
	                return _createDependency(metadata, optional, null, null, depProps);
	            }
	        }
	        var lowerBoundVisibility = null;
	        var upperBoundVisibility = null;
	        for (var i = 0; i < metadata.length; ++i) {
	            var paramMetadata = metadata[i];
	            if (paramMetadata instanceof Type) {
	                token = paramMetadata;
	            }
	            else if (paramMetadata instanceof Inject) {
	                token = paramMetadata.token;
	            }
	            else if (paramMetadata instanceof Optional) {
	                optional = true;
	            }
	            else if (paramMetadata instanceof Self) {
	                upperBoundVisibility = paramMetadata;
	            }
	            else if (paramMetadata instanceof Host) {
	                upperBoundVisibility = paramMetadata;
	            }
	            else if (paramMetadata instanceof SkipSelf) {
	                lowerBoundVisibility = paramMetadata;
	            }
	        }
	        token = resolveForwardRef(token);
	        if (isPresent(token)) {
	            return _createDependency(token, optional, lowerBoundVisibility, upperBoundVisibility, depProps);
	        }
	        else {
	            throw new NoAnnotationError(typeOrFunc, params);
	        }
	    }
	    function _createDependency(token /** TODO #9100 */, optional /** TODO #9100 */, lowerBoundVisibility /** TODO #9100 */, upperBoundVisibility /** TODO #9100 */, depProps /** TODO #9100 */) {
	        return new ReflectiveDependency(ReflectiveKey.get(token), optional, lowerBoundVisibility, upperBoundVisibility, depProps);
	    }
	
	    // avoid unused import when Type union types are erased
	    // Threshold for the dynamic version
	    var _MAX_CONSTRUCTION_COUNTER = 10;
	    var UNDEFINED = new Object();
	    var ReflectiveProtoInjectorInlineStrategy = (function () {
	        function ReflectiveProtoInjectorInlineStrategy(protoEI, providers) {
	            this.provider0 = null;
	            this.provider1 = null;
	            this.provider2 = null;
	            this.provider3 = null;
	            this.provider4 = null;
	            this.provider5 = null;
	            this.provider6 = null;
	            this.provider7 = null;
	            this.provider8 = null;
	            this.provider9 = null;
	            this.keyId0 = null;
	            this.keyId1 = null;
	            this.keyId2 = null;
	            this.keyId3 = null;
	            this.keyId4 = null;
	            this.keyId5 = null;
	            this.keyId6 = null;
	            this.keyId7 = null;
	            this.keyId8 = null;
	            this.keyId9 = null;
	            var length = providers.length;
	            if (length > 0) {
	                this.provider0 = providers[0];
	                this.keyId0 = providers[0].key.id;
	            }
	            if (length > 1) {
	                this.provider1 = providers[1];
	                this.keyId1 = providers[1].key.id;
	            }
	            if (length > 2) {
	                this.provider2 = providers[2];
	                this.keyId2 = providers[2].key.id;
	            }
	            if (length > 3) {
	                this.provider3 = providers[3];
	                this.keyId3 = providers[3].key.id;
	            }
	            if (length > 4) {
	                this.provider4 = providers[4];
	                this.keyId4 = providers[4].key.id;
	            }
	            if (length > 5) {
	                this.provider5 = providers[5];
	                this.keyId5 = providers[5].key.id;
	            }
	            if (length > 6) {
	                this.provider6 = providers[6];
	                this.keyId6 = providers[6].key.id;
	            }
	            if (length > 7) {
	                this.provider7 = providers[7];
	                this.keyId7 = providers[7].key.id;
	            }
	            if (length > 8) {
	                this.provider8 = providers[8];
	                this.keyId8 = providers[8].key.id;
	            }
	            if (length > 9) {
	                this.provider9 = providers[9];
	                this.keyId9 = providers[9].key.id;
	            }
	        }
	        ReflectiveProtoInjectorInlineStrategy.prototype.getProviderAtIndex = function (index) {
	            if (index == 0)
	                return this.provider0;
	            if (index == 1)
	                return this.provider1;
	            if (index == 2)
	                return this.provider2;
	            if (index == 3)
	                return this.provider3;
	            if (index == 4)
	                return this.provider4;
	            if (index == 5)
	                return this.provider5;
	            if (index == 6)
	                return this.provider6;
	            if (index == 7)
	                return this.provider7;
	            if (index == 8)
	                return this.provider8;
	            if (index == 9)
	                return this.provider9;
	            throw new OutOfBoundsError(index);
	        };
	        ReflectiveProtoInjectorInlineStrategy.prototype.createInjectorStrategy = function (injector) {
	            return new ReflectiveInjectorInlineStrategy(injector, this);
	        };
	        return ReflectiveProtoInjectorInlineStrategy;
	    }());
	    var ReflectiveProtoInjectorDynamicStrategy = (function () {
	        function ReflectiveProtoInjectorDynamicStrategy(protoInj, providers) {
	            this.providers = providers;
	            var len = providers.length;
	            this.keyIds = ListWrapper.createFixedSize(len);
	            for (var i = 0; i < len; i++) {
	                this.keyIds[i] = providers[i].key.id;
	            }
	        }
	        ReflectiveProtoInjectorDynamicStrategy.prototype.getProviderAtIndex = function (index) {
	            if (index < 0 || index >= this.providers.length) {
	                throw new OutOfBoundsError(index);
	            }
	            return this.providers[index];
	        };
	        ReflectiveProtoInjectorDynamicStrategy.prototype.createInjectorStrategy = function (ei) {
	            return new ReflectiveInjectorDynamicStrategy(this, ei);
	        };
	        return ReflectiveProtoInjectorDynamicStrategy;
	    }());
	    var ReflectiveProtoInjector = (function () {
	        function ReflectiveProtoInjector(providers) {
	            this.numberOfProviders = providers.length;
	            this._strategy = providers.length > _MAX_CONSTRUCTION_COUNTER ?
	                new ReflectiveProtoInjectorDynamicStrategy(this, providers) :
	                new ReflectiveProtoInjectorInlineStrategy(this, providers);
	        }
	        ReflectiveProtoInjector.fromResolvedProviders = function (providers) {
	            return new ReflectiveProtoInjector(providers);
	        };
	        ReflectiveProtoInjector.prototype.getProviderAtIndex = function (index) {
	            return this._strategy.getProviderAtIndex(index);
	        };
	        return ReflectiveProtoInjector;
	    }());
	    var ReflectiveInjectorInlineStrategy = (function () {
	        function ReflectiveInjectorInlineStrategy(injector, protoStrategy) {
	            this.injector = injector;
	            this.protoStrategy = protoStrategy;
	            this.obj0 = UNDEFINED;
	            this.obj1 = UNDEFINED;
	            this.obj2 = UNDEFINED;
	            this.obj3 = UNDEFINED;
	            this.obj4 = UNDEFINED;
	            this.obj5 = UNDEFINED;
	            this.obj6 = UNDEFINED;
	            this.obj7 = UNDEFINED;
	            this.obj8 = UNDEFINED;
	            this.obj9 = UNDEFINED;
	        }
	        ReflectiveInjectorInlineStrategy.prototype.resetConstructionCounter = function () { this.injector._constructionCounter = 0; };
	        ReflectiveInjectorInlineStrategy.prototype.instantiateProvider = function (provider) {
	            return this.injector._new(provider);
	        };
	        ReflectiveInjectorInlineStrategy.prototype.getObjByKeyId = function (keyId) {
	            var p = this.protoStrategy;
	            var inj = this.injector;
	            if (p.keyId0 === keyId) {
	                if (this.obj0 === UNDEFINED) {
	                    this.obj0 = inj._new(p.provider0);
	                }
	                return this.obj0;
	            }
	            if (p.keyId1 === keyId) {
	                if (this.obj1 === UNDEFINED) {
	                    this.obj1 = inj._new(p.provider1);
	                }
	                return this.obj1;
	            }
	            if (p.keyId2 === keyId) {
	                if (this.obj2 === UNDEFINED) {
	                    this.obj2 = inj._new(p.provider2);
	                }
	                return this.obj2;
	            }
	            if (p.keyId3 === keyId) {
	                if (this.obj3 === UNDEFINED) {
	                    this.obj3 = inj._new(p.provider3);
	                }
	                return this.obj3;
	            }
	            if (p.keyId4 === keyId) {
	                if (this.obj4 === UNDEFINED) {
	                    this.obj4 = inj._new(p.provider4);
	                }
	                return this.obj4;
	            }
	            if (p.keyId5 === keyId) {
	                if (this.obj5 === UNDEFINED) {
	                    this.obj5 = inj._new(p.provider5);
	                }
	                return this.obj5;
	            }
	            if (p.keyId6 === keyId) {
	                if (this.obj6 === UNDEFINED) {
	                    this.obj6 = inj._new(p.provider6);
	                }
	                return this.obj6;
	            }
	            if (p.keyId7 === keyId) {
	                if (this.obj7 === UNDEFINED) {
	                    this.obj7 = inj._new(p.provider7);
	                }
	                return this.obj7;
	            }
	            if (p.keyId8 === keyId) {
	                if (this.obj8 === UNDEFINED) {
	                    this.obj8 = inj._new(p.provider8);
	                }
	                return this.obj8;
	            }
	            if (p.keyId9 === keyId) {
	                if (this.obj9 === UNDEFINED) {
	                    this.obj9 = inj._new(p.provider9);
	                }
	                return this.obj9;
	            }
	            return UNDEFINED;
	        };
	        ReflectiveInjectorInlineStrategy.prototype.getObjAtIndex = function (index) {
	            if (index == 0)
	                return this.obj0;
	            if (index == 1)
	                return this.obj1;
	            if (index == 2)
	                return this.obj2;
	            if (index == 3)
	                return this.obj3;
	            if (index == 4)
	                return this.obj4;
	            if (index == 5)
	                return this.obj5;
	            if (index == 6)
	                return this.obj6;
	            if (index == 7)
	                return this.obj7;
	            if (index == 8)
	                return this.obj8;
	            if (index == 9)
	                return this.obj9;
	            throw new OutOfBoundsError(index);
	        };
	        ReflectiveInjectorInlineStrategy.prototype.getMaxNumberOfObjects = function () { return _MAX_CONSTRUCTION_COUNTER; };
	        return ReflectiveInjectorInlineStrategy;
	    }());
	    var ReflectiveInjectorDynamicStrategy = (function () {
	        function ReflectiveInjectorDynamicStrategy(protoStrategy, injector) {
	            this.protoStrategy = protoStrategy;
	            this.injector = injector;
	            this.objs = ListWrapper.createFixedSize(protoStrategy.providers.length);
	            ListWrapper.fill(this.objs, UNDEFINED);
	        }
	        ReflectiveInjectorDynamicStrategy.prototype.resetConstructionCounter = function () { this.injector._constructionCounter = 0; };
	        ReflectiveInjectorDynamicStrategy.prototype.instantiateProvider = function (provider) {
	            return this.injector._new(provider);
	        };
	        ReflectiveInjectorDynamicStrategy.prototype.getObjByKeyId = function (keyId) {
	            var p = this.protoStrategy;
	            for (var i = 0; i < p.keyIds.length; i++) {
	                if (p.keyIds[i] === keyId) {
	                    if (this.objs[i] === UNDEFINED) {
	                        this.objs[i] = this.injector._new(p.providers[i]);
	                    }
	                    return this.objs[i];
	                }
	            }
	            return UNDEFINED;
	        };
	        ReflectiveInjectorDynamicStrategy.prototype.getObjAtIndex = function (index) {
	            if (index < 0 || index >= this.objs.length) {
	                throw new OutOfBoundsError(index);
	            }
	            return this.objs[index];
	        };
	        ReflectiveInjectorDynamicStrategy.prototype.getMaxNumberOfObjects = function () { return this.objs.length; };
	        return ReflectiveInjectorDynamicStrategy;
	    }());
	    /**
	     * A ReflectiveDependency injection container used for instantiating objects and resolving
	     * dependencies.
	     *
	     * An `Injector` is a replacement for a `new` operator, which can automatically resolve the
	     * constructor dependencies.
	     *
	     * In typical use, application code asks for the dependencies in the constructor and they are
	     * resolved by the `Injector`.
	     *
	     * ### Example ([live demo](http://plnkr.co/edit/jzjec0?p=preview))
	     *
	     * The following example creates an `Injector` configured to create `Engine` and `Car`.
	     *
	     * ```typescript
	     * @Injectable()
	     * class Engine {
	     * }
	     *
	     * @Injectable()
	     * class Car {
	     *   constructor(public engine:Engine) {}
	     * }
	     *
	     * var injector = ReflectiveInjector.resolveAndCreate([Car, Engine]);
	     * var car = injector.get(Car);
	     * expect(car instanceof Car).toBe(true);
	     * expect(car.engine instanceof Engine).toBe(true);
	     * ```
	     *
	     * Notice, we don't use the `new` operator because we explicitly want to have the `Injector`
	     * resolve all of the object's dependencies automatically.
	     *
	     * @stable
	     */
	    var ReflectiveInjector = (function () {
	        function ReflectiveInjector() {
	        }
	        /**
	         * Turns an array of provider definitions into an array of resolved providers.
	         *
	         * A resolution is a process of flattening multiple nested arrays and converting individual
	         * providers into an array of {@link ResolvedReflectiveProvider}s.
	         *
	         * ### Example ([live demo](http://plnkr.co/edit/AiXTHi?p=preview))
	         *
	         * ```typescript
	         * @Injectable()
	         * class Engine {
	         * }
	         *
	         * @Injectable()
	         * class Car {
	         *   constructor(public engine:Engine) {}
	         * }
	         *
	         * var providers = ReflectiveInjector.resolve([Car, [[Engine]]]);
	         *
	         * expect(providers.length).toEqual(2);
	         *
	         * expect(providers[0] instanceof ResolvedReflectiveProvider).toBe(true);
	         * expect(providers[0].key.displayName).toBe("Car");
	         * expect(providers[0].dependencies.length).toEqual(1);
	         * expect(providers[0].factory).toBeDefined();
	         *
	         * expect(providers[1].key.displayName).toBe("Engine");
	         * });
	         * ```
	         *
	         * See {@link ReflectiveInjector#fromResolvedProviders} for more info.
	         */
	        ReflectiveInjector.resolve = function (providers) {
	            return resolveReflectiveProviders(providers);
	        };
	        /**
	         * Resolves an array of providers and creates an injector from those providers.
	         *
	         * The passed-in providers can be an array of `Type`, {@link Provider},
	         * or a recursive array of more providers.
	         *
	         * ### Example ([live demo](http://plnkr.co/edit/ePOccA?p=preview))
	         *
	         * ```typescript
	         * @Injectable()
	         * class Engine {
	         * }
	         *
	         * @Injectable()
	         * class Car {
	         *   constructor(public engine:Engine) {}
	         * }
	         *
	         * var injector = ReflectiveInjector.resolveAndCreate([Car, Engine]);
	         * expect(injector.get(Car) instanceof Car).toBe(true);
	         * ```
	         *
	         * This function is slower than the corresponding `fromResolvedProviders`
	         * because it needs to resolve the passed-in providers first.
	         * See {@link Injector#resolve} and {@link Injector#fromResolvedProviders}.
	         */
	        ReflectiveInjector.resolveAndCreate = function (providers, parent) {
	            if (parent === void 0) { parent = null; }
	            var ResolvedReflectiveProviders = ReflectiveInjector.resolve(providers);
	            return ReflectiveInjector.fromResolvedProviders(ResolvedReflectiveProviders, parent);
	        };
	        /**
	         * Creates an injector from previously resolved providers.
	         *
	         * This API is the recommended way to construct injectors in performance-sensitive parts.
	         *
	         * ### Example ([live demo](http://plnkr.co/edit/KrSMci?p=preview))
	         *
	         * ```typescript
	         * @Injectable()
	         * class Engine {
	         * }
	         *
	         * @Injectable()
	         * class Car {
	         *   constructor(public engine:Engine) {}
	         * }
	         *
	         * var providers = ReflectiveInjector.resolve([Car, Engine]);
	         * var injector = ReflectiveInjector.fromResolvedProviders(providers);
	         * expect(injector.get(Car) instanceof Car).toBe(true);
	         * ```
	         * @experimental
	         */
	        ReflectiveInjector.fromResolvedProviders = function (providers, parent) {
	            if (parent === void 0) { parent = null; }
	            return new ReflectiveInjector_(ReflectiveProtoInjector.fromResolvedProviders(providers), parent);
	        };
	        Object.defineProperty(ReflectiveInjector.prototype, "parent", {
	            /**
	             * Parent of this injector.
	             *
	             * <!-- TODO: Add a link to the section of the user guide talking about hierarchical injection.
	             * -->
	             *
	             * ### Example ([live demo](http://plnkr.co/edit/eosMGo?p=preview))
	             *
	             * ```typescript
	             * var parent = ReflectiveInjector.resolveAndCreate([]);
	             * var child = parent.resolveAndCreateChild([]);
	             * expect(child.parent).toBe(parent);
	             * ```
	             */
	            get: function () { return unimplemented(); },
	            enumerable: true,
	            configurable: true
	        });
	        /**
	         * Resolves an array of providers and creates a child injector from those providers.
	         *
	         * <!-- TODO: Add a link to the section of the user guide talking about hierarchical injection.
	         * -->
	         *
	         * The passed-in providers can be an array of `Type`, {@link Provider},
	         * or a recursive array of more providers.
	         *
	         * ### Example ([live demo](http://plnkr.co/edit/opB3T4?p=preview))
	         *
	         * ```typescript
	         * class ParentProvider {}
	         * class ChildProvider {}
	         *
	         * var parent = ReflectiveInjector.resolveAndCreate([ParentProvider]);
	         * var child = parent.resolveAndCreateChild([ChildProvider]);
	         *
	         * expect(child.get(ParentProvider) instanceof ParentProvider).toBe(true);
	         * expect(child.get(ChildProvider) instanceof ChildProvider).toBe(true);
	         * expect(child.get(ParentProvider)).toBe(parent.get(ParentProvider));
	         * ```
	         *
	         * This function is slower than the corresponding `createChildFromResolved`
	         * because it needs to resolve the passed-in providers first.
	         * See {@link Injector#resolve} and {@link Injector#createChildFromResolved}.
	         */
	        ReflectiveInjector.prototype.resolveAndCreateChild = function (providers) { return unimplemented(); };
	        /**
	         * Creates a child injector from previously resolved providers.
	         *
	         * <!-- TODO: Add a link to the section of the user guide talking about hierarchical injection.
	         * -->
	         *
	         * This API is the recommended way to construct injectors in performance-sensitive parts.
	         *
	         * ### Example ([live demo](http://plnkr.co/edit/VhyfjN?p=preview))
	         *
	         * ```typescript
	         * class ParentProvider {}
	         * class ChildProvider {}
	         *
	         * var parentProviders = ReflectiveInjector.resolve([ParentProvider]);
	         * var childProviders = ReflectiveInjector.resolve([ChildProvider]);
	         *
	         * var parent = ReflectiveInjector.fromResolvedProviders(parentProviders);
	         * var child = parent.createChildFromResolved(childProviders);
	         *
	         * expect(child.get(ParentProvider) instanceof ParentProvider).toBe(true);
	         * expect(child.get(ChildProvider) instanceof ChildProvider).toBe(true);
	         * expect(child.get(ParentProvider)).toBe(parent.get(ParentProvider));
	         * ```
	         */
	        ReflectiveInjector.prototype.createChildFromResolved = function (providers) {
	            return unimplemented();
	        };
	        /**
	         * Resolves a provider and instantiates an object in the context of the injector.
	         *
	         * The created object does not get cached by the injector.
	         *
	         * ### Example ([live demo](http://plnkr.co/edit/yvVXoB?p=preview))
	         *
	         * ```typescript
	         * @Injectable()
	         * class Engine {
	         * }
	         *
	         * @Injectable()
	         * class Car {
	         *   constructor(public engine:Engine) {}
	         * }
	         *
	         * var injector = ReflectiveInjector.resolveAndCreate([Engine]);
	         *
	         * var car = injector.resolveAndInstantiate(Car);
	         * expect(car.engine).toBe(injector.get(Engine));
	         * expect(car).not.toBe(injector.resolveAndInstantiate(Car));
	         * ```
	         */
	        ReflectiveInjector.prototype.resolveAndInstantiate = function (provider) { return unimplemented(); };
	        /**
	         * Instantiates an object using a resolved provider in the context of the injector.
	         *
	         * The created object does not get cached by the injector.
	         *
	         * ### Example ([live demo](http://plnkr.co/edit/ptCImQ?p=preview))
	         *
	         * ```typescript
	         * @Injectable()
	         * class Engine {
	         * }
	         *
	         * @Injectable()
	         * class Car {
	         *   constructor(public engine:Engine) {}
	         * }
	         *
	         * var injector = ReflectiveInjector.resolveAndCreate([Engine]);
	         * var carProvider = ReflectiveInjector.resolve([Car])[0];
	         * var car = injector.instantiateResolved(carProvider);
	         * expect(car.engine).toBe(injector.get(Engine));
	         * expect(car).not.toBe(injector.instantiateResolved(carProvider));
	         * ```
	         */
	        ReflectiveInjector.prototype.instantiateResolved = function (provider) { return unimplemented(); };
	        return ReflectiveInjector;
	    }());
	    var ReflectiveInjector_ = (function () {
	        /**
	         * Private
	         */
	        function ReflectiveInjector_(_proto /* ProtoInjector */, _parent) {
	            if (_parent === void 0) { _parent = null; }
	            /** @internal */
	            this._constructionCounter = 0;
	            this._proto = _proto;
	            this._parent = _parent;
	            this._strategy = _proto._strategy.createInjectorStrategy(this);
	        }
	        ReflectiveInjector_.prototype.get = function (token, notFoundValue) {
	            if (notFoundValue === void 0) { notFoundValue = THROW_IF_NOT_FOUND; }
	            return this._getByKey(ReflectiveKey.get(token), null, null, notFoundValue);
	        };
	        ReflectiveInjector_.prototype.getAt = function (index) { return this._strategy.getObjAtIndex(index); };
	        Object.defineProperty(ReflectiveInjector_.prototype, "parent", {
	            get: function () { return this._parent; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(ReflectiveInjector_.prototype, "internalStrategy", {
	            /**
	             * @internal
	             * Internal. Do not use.
	             * We return `any` not to export the InjectorStrategy type.
	             */
	            get: function () { return this._strategy; },
	            enumerable: true,
	            configurable: true
	        });
	        ReflectiveInjector_.prototype.resolveAndCreateChild = function (providers) {
	            var ResolvedReflectiveProviders = ReflectiveInjector.resolve(providers);
	            return this.createChildFromResolved(ResolvedReflectiveProviders);
	        };
	        ReflectiveInjector_.prototype.createChildFromResolved = function (providers) {
	            var proto = new ReflectiveProtoInjector(providers);
	            var inj = new ReflectiveInjector_(proto);
	            inj._parent = this;
	            return inj;
	        };
	        ReflectiveInjector_.prototype.resolveAndInstantiate = function (provider) {
	            return this.instantiateResolved(ReflectiveInjector.resolve([provider])[0]);
	        };
	        ReflectiveInjector_.prototype.instantiateResolved = function (provider) {
	            return this._instantiateProvider(provider);
	        };
	        /** @internal */
	        ReflectiveInjector_.prototype._new = function (provider) {
	            if (this._constructionCounter++ > this._strategy.getMaxNumberOfObjects()) {
	                throw new CyclicDependencyError(this, provider.key);
	            }
	            return this._instantiateProvider(provider);
	        };
	        ReflectiveInjector_.prototype._instantiateProvider = function (provider) {
	            if (provider.multiProvider) {
	                var res = ListWrapper.createFixedSize(provider.resolvedFactories.length);
	                for (var i = 0; i < provider.resolvedFactories.length; ++i) {
	                    res[i] = this._instantiate(provider, provider.resolvedFactories[i]);
	                }
	                return res;
	            }
	            else {
	                return this._instantiate(provider, provider.resolvedFactories[0]);
	            }
	        };
	        ReflectiveInjector_.prototype._instantiate = function (provider, ResolvedReflectiveFactory) {
	            var factory = ResolvedReflectiveFactory.factory;
	            var deps = ResolvedReflectiveFactory.dependencies;
	            var length = deps.length;
	            var d0;
	            var d1;
	            var d2;
	            var d3;
	            var d4;
	            var d5;
	            var d6;
	            var d7;
	            var d8;
	            var d9;
	            var d10;
	            var d11;
	            var d12;
	            var d13;
	            var d14;
	            var d15;
	            var d16;
	            var d17;
	            var d18;
	            var d19;
	            try {
	                d0 = length > 0 ? this._getByReflectiveDependency(provider, deps[0]) : null;
	                d1 = length > 1 ? this._getByReflectiveDependency(provider, deps[1]) : null;
	                d2 = length > 2 ? this._getByReflectiveDependency(provider, deps[2]) : null;
	                d3 = length > 3 ? this._getByReflectiveDependency(provider, deps[3]) : null;
	                d4 = length > 4 ? this._getByReflectiveDependency(provider, deps[4]) : null;
	                d5 = length > 5 ? this._getByReflectiveDependency(provider, deps[5]) : null;
	                d6 = length > 6 ? this._getByReflectiveDependency(provider, deps[6]) : null;
	                d7 = length > 7 ? this._getByReflectiveDependency(provider, deps[7]) : null;
	                d8 = length > 8 ? this._getByReflectiveDependency(provider, deps[8]) : null;
	                d9 = length > 9 ? this._getByReflectiveDependency(provider, deps[9]) : null;
	                d10 = length > 10 ? this._getByReflectiveDependency(provider, deps[10]) : null;
	                d11 = length > 11 ? this._getByReflectiveDependency(provider, deps[11]) : null;
	                d12 = length > 12 ? this._getByReflectiveDependency(provider, deps[12]) : null;
	                d13 = length > 13 ? this._getByReflectiveDependency(provider, deps[13]) : null;
	                d14 = length > 14 ? this._getByReflectiveDependency(provider, deps[14]) : null;
	                d15 = length > 15 ? this._getByReflectiveDependency(provider, deps[15]) : null;
	                d16 = length > 16 ? this._getByReflectiveDependency(provider, deps[16]) : null;
	                d17 = length > 17 ? this._getByReflectiveDependency(provider, deps[17]) : null;
	                d18 = length > 18 ? this._getByReflectiveDependency(provider, deps[18]) : null;
	                d19 = length > 19 ? this._getByReflectiveDependency(provider, deps[19]) : null;
	            }
	            catch (e) {
	                if (e instanceof AbstractProviderError || e instanceof InstantiationError) {
	                    e.addKey(this, provider.key);
	                }
	                throw e;
	            }
	            var obj;
	            try {
	                switch (length) {
	                    case 0:
	                        obj = factory();
	                        break;
	                    case 1:
	                        obj = factory(d0);
	                        break;
	                    case 2:
	                        obj = factory(d0, d1);
	                        break;
	                    case 3:
	                        obj = factory(d0, d1, d2);
	                        break;
	                    case 4:
	                        obj = factory(d0, d1, d2, d3);
	                        break;
	                    case 5:
	                        obj = factory(d0, d1, d2, d3, d4);
	                        break;
	                    case 6:
	                        obj = factory(d0, d1, d2, d3, d4, d5);
	                        break;
	                    case 7:
	                        obj = factory(d0, d1, d2, d3, d4, d5, d6);
	                        break;
	                    case 8:
	                        obj = factory(d0, d1, d2, d3, d4, d5, d6, d7);
	                        break;
	                    case 9:
	                        obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8);
	                        break;
	                    case 10:
	                        obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9);
	                        break;
	                    case 11:
	                        obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10);
	                        break;
	                    case 12:
	                        obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11);
	                        break;
	                    case 13:
	                        obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12);
	                        break;
	                    case 14:
	                        obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13);
	                        break;
	                    case 15:
	                        obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14);
	                        break;
	                    case 16:
	                        obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15);
	                        break;
	                    case 17:
	                        obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15, d16);
	                        break;
	                    case 18:
	                        obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15, d16, d17);
	                        break;
	                    case 19:
	                        obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15, d16, d17, d18);
	                        break;
	                    case 20:
	                        obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15, d16, d17, d18, d19);
	                        break;
	                    default:
	                        throw new Error("Cannot instantiate '" + provider.key.displayName + "' because it has more than 20 dependencies");
	                }
	            }
	            catch (e) {
	                throw new InstantiationError(this, e, e.stack, provider.key);
	            }
	            return obj;
	        };
	        ReflectiveInjector_.prototype._getByReflectiveDependency = function (provider, dep) {
	            return this._getByKey(dep.key, dep.lowerBoundVisibility, dep.upperBoundVisibility, dep.optional ? null : THROW_IF_NOT_FOUND);
	        };
	        ReflectiveInjector_.prototype._getByKey = function (key, lowerBoundVisibility, upperBoundVisibility, notFoundValue) {
	            if (key === INJECTOR_KEY) {
	                return this;
	            }
	            if (upperBoundVisibility instanceof Self) {
	                return this._getByKeySelf(key, notFoundValue);
	            }
	            else {
	                return this._getByKeyDefault(key, notFoundValue, lowerBoundVisibility);
	            }
	        };
	        /** @internal */
	        ReflectiveInjector_.prototype._throwOrNull = function (key, notFoundValue) {
	            if (notFoundValue !== THROW_IF_NOT_FOUND) {
	                return notFoundValue;
	            }
	            else {
	                throw new NoProviderError(this, key);
	            }
	        };
	        /** @internal */
	        ReflectiveInjector_.prototype._getByKeySelf = function (key, notFoundValue) {
	            var obj = this._strategy.getObjByKeyId(key.id);
	            return (obj !== UNDEFINED) ? obj : this._throwOrNull(key, notFoundValue);
	        };
	        /** @internal */
	        ReflectiveInjector_.prototype._getByKeyDefault = function (key, notFoundValue, lowerBoundVisibility) {
	            var inj;
	            if (lowerBoundVisibility instanceof SkipSelf) {
	                inj = this._parent;
	            }
	            else {
	                inj = this;
	            }
	            while (inj instanceof ReflectiveInjector_) {
	                var inj_ = inj;
	                var obj = inj_._strategy.getObjByKeyId(key.id);
	                if (obj !== UNDEFINED)
	                    return obj;
	                inj = inj_._parent;
	            }
	            if (inj !== null) {
	                return inj.get(key.token, notFoundValue);
	            }
	            else {
	                return this._throwOrNull(key, notFoundValue);
	            }
	        };
	        Object.defineProperty(ReflectiveInjector_.prototype, "displayName", {
	            get: function () {
	                var providers = _mapProviders(this, function (b) { return ' "' + b.key.displayName + '" '; })
	                    .join(', ');
	                return "ReflectiveInjector(providers: [" + providers + "])";
	            },
	            enumerable: true,
	            configurable: true
	        });
	        ReflectiveInjector_.prototype.toString = function () { return this.displayName; };
	        return ReflectiveInjector_;
	    }());
	    var INJECTOR_KEY = ReflectiveKey.get(Injector);
	    function _mapProviders(injector, fn) {
	        var res = new Array(injector._proto.numberOfProviders);
	        for (var i = 0; i < injector._proto.numberOfProviders; ++i) {
	            res[i] = fn(injector._proto.getProviderAtIndex(i));
	        }
	        return res;
	    }
	
	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    /**
	     * Provides a hook for centralized exception handling.
	     *
	     * The default implementation of `ErrorHandler` prints error messages to the `Console`. To
	     * intercept error handling,
	     * write a custom exception handler that replaces this default as appropriate for your app.
	     *
	     * ### Example
	     *
	     * ```javascript
	     *
	     * class MyErrorHandler implements ErrorHandler {
	     *   call(error, stackTrace = null, reason = null) {
	     *     // do something with the exception
	     *   }
	     * }
	     *
	     * @NgModule({
	     *   providers: [{provide: ErrorHandler, useClass: MyErrorHandler}]
	     * })
	     * class MyModule {}
	     * ```
	     * @stable
	     */
	    var ErrorHandler = (function () {
	        function ErrorHandler(rethrowError) {
	            if (rethrowError === void 0) { rethrowError = true; }
	            /**
	             * @internal
	             */
	            this._console = console;
	            this.rethrowError = rethrowError;
	        }
	        ErrorHandler.prototype.handleError = function (error) {
	            var originalError = this._findOriginalError(error);
	            var originalStack = this._findOriginalStack(error);
	            var context = this._findContext(error);
	            this._console.error("EXCEPTION: " + this._extractMessage(error));
	            if (originalError) {
	                this._console.error("ORIGINAL EXCEPTION: " + this._extractMessage(originalError));
	            }
	            if (originalStack) {
	                this._console.error('ORIGINAL STACKTRACE:');
	                this._console.error(originalStack);
	            }
	            if (context) {
	                this._console.error('ERROR CONTEXT:');
	                this._console.error(context);
	            }
	            // We rethrow exceptions, so operations like 'bootstrap' will result in an error
	            // when an error happens. If we do not rethrow, bootstrap will always succeed.
	            if (this.rethrowError)
	                throw error;
	        };
	        /** @internal */
	        ErrorHandler.prototype._extractMessage = function (error) {
	            return error instanceof Error ? error.message : error.toString();
	        };
	        /** @internal */
	        ErrorHandler.prototype._findContext = function (error) {
	            if (error) {
	                return error.context ? error.context :
	                    this._findContext(error.originalError);
	            }
	            else {
	                return null;
	            }
	        };
	        /** @internal */
	        ErrorHandler.prototype._findOriginalError = function (error) {
	            var e = error.originalError;
	            while (e && e.originalError) {
	                e = e.originalError;
	            }
	            return e;
	        };
	        /** @internal */
	        ErrorHandler.prototype._findOriginalStack = function (error) {
	            if (!(error instanceof Error))
	                return null;
	            var e = error;
	            var stack = e.stack;
	            while (e instanceof Error && e.originalError) {
	                e = e.originalError;
	                if (e instanceof Error && e.stack) {
	                    stack = e.stack;
	                }
	            }
	            return stack;
	        };
	        return ErrorHandler;
	    }());
	
	    /**
	     * A function that will be executed when an application is initialized.
	     * @experimental
	     */
	    var APP_INITIALIZER = new OpaqueToken('Application Initializer');
	    /**
	     * A class that reflects the state of running {@link APP_INITIALIZER}s.
	     *
	     * @experimental
	     */
	    var ApplicationInitStatus = (function () {
	        function ApplicationInitStatus(appInits) {
	            var _this = this;
	            this._done = false;
	            var asyncInitPromises = [];
	            if (appInits) {
	                for (var i = 0; i < appInits.length; i++) {
	                    var initResult = appInits[i]();
	                    if (isPromise(initResult)) {
	                        asyncInitPromises.push(initResult);
	                    }
	                }
	            }
	            this._donePromise = Promise.all(asyncInitPromises).then(function () { _this._done = true; });
	            if (asyncInitPromises.length === 0) {
	                this._done = true;
	            }
	        }
	        Object.defineProperty(ApplicationInitStatus.prototype, "done", {
	            get: function () { return this._done; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(ApplicationInitStatus.prototype, "donePromise", {
	            get: function () { return this._donePromise; },
	            enumerable: true,
	            configurable: true
	        });
	        ApplicationInitStatus.decorators = [
	            { type: Injectable },
	        ];
	        /** @nocollapse */
	        ApplicationInitStatus.ctorParameters = [
	            { type: Array, decorators: [{ type: Inject, args: [APP_INITIALIZER,] }, { type: Optional },] },
	        ];
	        return ApplicationInitStatus;
	    }());
	
	    /**
	     * A DI Token representing a unique string id assigned to the application by Angular and used
	     * primarily for prefixing application attributes and CSS styles when
	     * {@link ViewEncapsulation#Emulated} is being used.
	     *
	     * If you need to avoid randomly generated value to be used as an application id, you can provide
	     * a custom value via a DI provider <!-- TODO: provider --> configuring the root {@link Injector}
	     * using this token.
	     * @experimental
	     */
	    var APP_ID = new OpaqueToken('AppId');
	    function _appIdRandomProviderFactory() {
	        return "" + _randomChar() + _randomChar() + _randomChar();
	    }
	    /**
	     * Providers that will generate a random APP_ID_TOKEN.
	     * @experimental
	     */
	    var APP_ID_RANDOM_PROVIDER = {
	        provide: APP_ID,
	        useFactory: _appIdRandomProviderFactory,
	        deps: []
	    };
	    function _randomChar() {
	        return StringWrapper.fromCharCode(97 + Math.floor(Math.random() * 25));
	    }
	    /**
	     * A function that will be executed when a platform is initialized.
	     * @experimental
	     */
	    var PLATFORM_INITIALIZER = new OpaqueToken('Platform Initializer');
	    /**
	     * All callbacks provided via this token will be called for every component that is bootstrapped.
	     * Signature of the callback:
	     *
	     * `(componentRef: ComponentRef) => void`.
	     *
	     * @experimental
	     */
	    var APP_BOOTSTRAP_LISTENER = new OpaqueToken('appBootstrapListener');
	    /**
	     * A token which indicates the root directory of the application
	     * @experimental
	     */
	    var PACKAGE_ROOT_URL = new OpaqueToken('Application Packages Root URL');
	
	    var Console = (function () {
	        function Console() {
	        }
	        Console.prototype.log = function (message) { print(message); };
	        // Note: for reporting errors use `DOM.logError()` as it is platform specific
	        Console.prototype.warn = function (message) { warn(message); };
	        Console.decorators = [
	            { type: Injectable },
	        ];
	        /** @nocollapse */
	        Console.ctorParameters = [];
	        return Console;
	    }());
	
	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var __extends$4 = (this && this.__extends) || function (d, b) {
	        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	    /**
	     * Indicates that a component is still being loaded in a synchronous compile.
	     *
	     * @stable
	     */
	    var ComponentStillLoadingError = (function (_super) {
	        __extends$4(ComponentStillLoadingError, _super);
	        function ComponentStillLoadingError(compType) {
	            _super.call(this, "Can't compile synchronously as " + stringify(compType) + " is still being loaded!");
	            this.compType = compType;
	        }
	        return ComponentStillLoadingError;
	    }(BaseError));
	    /**
	     * Combination of NgModuleFactory and ComponentFactorys.
	     *
	     * @experimental
	     */
	    var ModuleWithComponentFactories = (function () {
	        function ModuleWithComponentFactories(ngModuleFactory, componentFactories) {
	            this.ngModuleFactory = ngModuleFactory;
	            this.componentFactories = componentFactories;
	        }
	        return ModuleWithComponentFactories;
	    }());
	    function _throwError() {
	        throw new Error("Runtime compiler is not loaded");
	    }
	    /**
	     * Low-level service for running the angular compiler during runtime
	     * to create {@link ComponentFactory}s, which
	     * can later be used to create and render a Component instance.
	     *
	     * Each `@NgModule` provides an own `Compiler` to its injector,
	     * that will use the directives/pipes of the ng module for compilation
	     * of components.
	     * @stable
	     */
	    var Compiler = (function () {
	        function Compiler() {
	        }
	        /**
	         * Compiles the given NgModule and all of its components. All templates of the components listed
	         * in `entryComponents`
	         * have to be inlined. Otherwise throws a {@link ComponentStillLoadingError}.
	         */
	        Compiler.prototype.compileModuleSync = function (moduleType) { throw _throwError(); };
	        /**
	         * Compiles the given NgModule and all of its components
	         */
	        Compiler.prototype.compileModuleAsync = function (moduleType) { throw _throwError(); };
	        /**
	         * Same as {@link compileModuleSync} but also creates ComponentFactories for all components.
	         */
	        Compiler.prototype.compileModuleAndAllComponentsSync = function (moduleType) {
	            throw _throwError();
	        };
	        /**
	         * Same as {@link compileModuleAsync} but also creates ComponentFactories for all components.
	         */
	        Compiler.prototype.compileModuleAndAllComponentsAsync = function (moduleType) {
	            throw _throwError();
	        };
	        /**
	         * Clears all caches.
	         */
	        Compiler.prototype.clearCache = function () { };
	        /**
	         * Clears the cache for the given component/ngModule.
	         */
	        Compiler.prototype.clearCacheFor = function (type) { };
	        return Compiler;
	    }());
	    /**
	     * Token to provide CompilerOptions in the platform injector.
	     *
	     * @experimental
	     */
	    var COMPILER_OPTIONS = new OpaqueToken('compilerOptions');
	    /**
	     * A factory for creating a Compiler
	     *
	     * @experimental
	     */
	    var CompilerFactory = (function () {
	        function CompilerFactory() {
	        }
	        return CompilerFactory;
	    }());
	
	    var DefaultIterableDifferFactory = (function () {
	        function DefaultIterableDifferFactory() {
	        }
	        DefaultIterableDifferFactory.prototype.supports = function (obj) { return isListLikeIterable(obj); };
	        DefaultIterableDifferFactory.prototype.create = function (cdRef, trackByFn) {
	            return new DefaultIterableDiffer(trackByFn);
	        };
	        return DefaultIterableDifferFactory;
	    }());
	    var trackByIdentity = function (index, item) { return item; };
	    /**
	     * @stable
	     */
	    var DefaultIterableDiffer = (function () {
	        function DefaultIterableDiffer(_trackByFn) {
	            this._trackByFn = _trackByFn;
	            this._length = null;
	            this._collection = null;
	            // Keeps track of the used records at any point in time (during & across `_check()` calls)
	            this._linkedRecords = null;
	            // Keeps track of the removed records at any point in time during `_check()` calls.
	            this._unlinkedRecords = null;
	            this._previousItHead = null;
	            this._itHead = null;
	            this._itTail = null;
	            this._additionsHead = null;
	            this._additionsTail = null;
	            this._movesHead = null;
	            this._movesTail = null;
	            this._removalsHead = null;
	            this._removalsTail = null;
	            // Keeps track of records where custom track by is the same, but item identity has changed
	            this._identityChangesHead = null;
	            this._identityChangesTail = null;
	            this._trackByFn = isPresent(this._trackByFn) ? this._trackByFn : trackByIdentity;
	        }
	        Object.defineProperty(DefaultIterableDiffer.prototype, "collection", {
	            get: function () { return this._collection; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(DefaultIterableDiffer.prototype, "length", {
	            get: function () { return this._length; },
	            enumerable: true,
	            configurable: true
	        });
	        DefaultIterableDiffer.prototype.forEachItem = function (fn) {
	            var record;
	            for (record = this._itHead; record !== null; record = record._next) {
	                fn(record);
	            }
	        };
	        DefaultIterableDiffer.prototype.forEachOperation = function (fn) {
	            var nextIt = this._itHead;
	            var nextRemove = this._removalsHead;
	            var addRemoveOffset = 0;
	            var moveOffsets = null;
	            while (nextIt || nextRemove) {
	                // Figure out which is the next record to process
	                // Order: remove, add, move
	                var record = !nextRemove ||
	                    nextIt &&
	                        nextIt.currentIndex < getPreviousIndex(nextRemove, addRemoveOffset, moveOffsets) ?
	                    nextIt :
	                    nextRemove;
	                var adjPreviousIndex = getPreviousIndex(record, addRemoveOffset, moveOffsets);
	                var currentIndex = record.currentIndex;
	                // consume the item, and adjust the addRemoveOffset and update moveDistance if necessary
	                if (record === nextRemove) {
	                    addRemoveOffset--;
	                    nextRemove = nextRemove._nextRemoved;
	                }
	                else {
	                    nextIt = nextIt._next;
	                    if (record.previousIndex == null) {
	                        addRemoveOffset++;
	                    }
	                    else {
	                        // INVARIANT:  currentIndex < previousIndex
	                        if (!moveOffsets)
	                            moveOffsets = [];
	                        var localMovePreviousIndex = adjPreviousIndex - addRemoveOffset;
	                        var localCurrentIndex = currentIndex - addRemoveOffset;
	                        if (localMovePreviousIndex != localCurrentIndex) {
	                            for (var i = 0; i < localMovePreviousIndex; i++) {
	                                var offset = i < moveOffsets.length ? moveOffsets[i] : (moveOffsets[i] = 0);
	                                var index = offset + i;
	                                if (localCurrentIndex <= index && index < localMovePreviousIndex) {
	                                    moveOffsets[i] = offset + 1;
	                                }
	                            }
	                            var previousIndex = record.previousIndex;
	                            moveOffsets[previousIndex] = localCurrentIndex - localMovePreviousIndex;
	                        }
	                    }
	                }
	                if (adjPreviousIndex !== currentIndex) {
	                    fn(record, adjPreviousIndex, currentIndex);
	                }
	            }
	        };
	        DefaultIterableDiffer.prototype.forEachPreviousItem = function (fn) {
	            var record;
	            for (record = this._previousItHead; record !== null; record = record._nextPrevious) {
	                fn(record);
	            }
	        };
	        DefaultIterableDiffer.prototype.forEachAddedItem = function (fn) {
	            var record;
	            for (record = this._additionsHead; record !== null; record = record._nextAdded) {
	                fn(record);
	            }
	        };
	        DefaultIterableDiffer.prototype.forEachMovedItem = function (fn) {
	            var record;
	            for (record = this._movesHead; record !== null; record = record._nextMoved) {
	                fn(record);
	            }
	        };
	        DefaultIterableDiffer.prototype.forEachRemovedItem = function (fn) {
	            var record;
	            for (record = this._removalsHead; record !== null; record = record._nextRemoved) {
	                fn(record);
	            }
	        };
	        DefaultIterableDiffer.prototype.forEachIdentityChange = function (fn) {
	            var record;
	            for (record = this._identityChangesHead; record !== null; record = record._nextIdentityChange) {
	                fn(record);
	            }
	        };
	        DefaultIterableDiffer.prototype.diff = function (collection) {
	            if (isBlank(collection))
	                collection = [];
	            if (!isListLikeIterable(collection)) {
	                throw new Error("Error trying to diff '" + collection + "'");
	            }
	            if (this.check(collection)) {
	                return this;
	            }
	            else {
	                return null;
	            }
	        };
	        DefaultIterableDiffer.prototype.onDestroy = function () { };
	        // todo(vicb): optim for UnmodifiableListView (frozen arrays)
	        DefaultIterableDiffer.prototype.check = function (collection) {
	            var _this = this;
	            this._reset();
	            var record = this._itHead;
	            var mayBeDirty = false;
	            var index;
	            var item;
	            var itemTrackBy;
	            if (isArray(collection)) {
	                var list = collection;
	                this._length = collection.length;
	                for (index = 0; index < this._length; index++) {
	                    item = list[index];
	                    itemTrackBy = this._trackByFn(index, item);
	                    if (record === null || !looseIdentical(record.trackById, itemTrackBy)) {
	                        record = this._mismatch(record, item, itemTrackBy, index);
	                        mayBeDirty = true;
	                    }
	                    else {
	                        if (mayBeDirty) {
	                            // TODO(misko): can we limit this to duplicates only?
	                            record = this._verifyReinsertion(record, item, itemTrackBy, index);
	                        }
	                        if (!looseIdentical(record.item, item))
	                            this._addIdentityChange(record, item);
	                    }
	                    record = record._next;
	                }
	            }
	            else {
	                index = 0;
	                iterateListLike(collection, function (item /** TODO #9100 */) {
	                    itemTrackBy = _this._trackByFn(index, item);
	                    if (record === null || !looseIdentical(record.trackById, itemTrackBy)) {
	                        record = _this._mismatch(record, item, itemTrackBy, index);
	                        mayBeDirty = true;
	                    }
	                    else {
	                        if (mayBeDirty) {
	                            // TODO(misko): can we limit this to duplicates only?
	                            record = _this._verifyReinsertion(record, item, itemTrackBy, index);
	                        }
	                        if (!looseIdentical(record.item, item))
	                            _this._addIdentityChange(record, item);
	                    }
	                    record = record._next;
	                    index++;
	                });
	                this._length = index;
	            }
	            this._truncate(record);
	            this._collection = collection;
	            return this.isDirty;
	        };
	        Object.defineProperty(DefaultIterableDiffer.prototype, "isDirty", {
	            /* CollectionChanges is considered dirty if it has any additions, moves, removals, or identity
	             * changes.
	             */
	            get: function () {
	                return this._additionsHead !== null || this._movesHead !== null ||
	                    this._removalsHead !== null || this._identityChangesHead !== null;
	            },
	            enumerable: true,
	            configurable: true
	        });
	        /**
	         * Reset the state of the change objects to show no changes. This means set previousKey to
	         * currentKey, and clear all of the queues (additions, moves, removals).
	         * Set the previousIndexes of moved and added items to their currentIndexes
	         * Reset the list of additions, moves and removals
	         *
	         * @internal
	         */
	        DefaultIterableDiffer.prototype._reset = function () {
	            if (this.isDirty) {
	                var record;
	                var nextRecord;
	                for (record = this._previousItHead = this._itHead; record !== null; record = record._next) {
	                    record._nextPrevious = record._next;
	                }
	                for (record = this._additionsHead; record !== null; record = record._nextAdded) {
	                    record.previousIndex = record.currentIndex;
	                }
	                this._additionsHead = this._additionsTail = null;
	                for (record = this._movesHead; record !== null; record = nextRecord) {
	                    record.previousIndex = record.currentIndex;
	                    nextRecord = record._nextMoved;
	                }
	                this._movesHead = this._movesTail = null;
	                this._removalsHead = this._removalsTail = null;
	                this._identityChangesHead = this._identityChangesTail = null;
	            }
	        };
	        /**
	         * This is the core function which handles differences between collections.
	         *
	         * - `record` is the record which we saw at this position last time. If null then it is a new
	         *   item.
	         * - `item` is the current item in the collection
	         * - `index` is the position of the item in the collection
	         *
	         * @internal
	         */
	        DefaultIterableDiffer.prototype._mismatch = function (record, item, itemTrackBy, index) {
	            // The previous record after which we will append the current one.
	            var previousRecord;
	            if (record === null) {
	                previousRecord = this._itTail;
	            }
	            else {
	                previousRecord = record._prev;
	                // Remove the record from the collection since we know it does not match the item.
	                this._remove(record);
	            }
	            // Attempt to see if we have seen the item before.
	            record = this._linkedRecords === null ? null : this._linkedRecords.get(itemTrackBy, index);
	            if (record !== null) {
	                // We have seen this before, we need to move it forward in the collection.
	                // But first we need to check if identity changed, so we can update in view if necessary
	                if (!looseIdentical(record.item, item))
	                    this._addIdentityChange(record, item);
	                this._moveAfter(record, previousRecord, index);
	            }
	            else {
	                // Never seen it, check evicted list.
	                record = this._unlinkedRecords === null ? null : this._unlinkedRecords.get(itemTrackBy);
	                if (record !== null) {
	                    // It is an item which we have evicted earlier: reinsert it back into the list.
	                    // But first we need to check if identity changed, so we can update in view if necessary
	                    if (!looseIdentical(record.item, item))
	                        this._addIdentityChange(record, item);
	                    this._reinsertAfter(record, previousRecord, index);
	                }
	                else {
	                    // It is a new item: add it.
	                    record =
	                        this._addAfter(new CollectionChangeRecord(item, itemTrackBy), previousRecord, index);
	                }
	            }
	            return record;
	        };
	        /**
	         * This check is only needed if an array contains duplicates. (Short circuit of nothing dirty)
	         *
	         * Use case: `[a, a]` => `[b, a, a]`
	         *
	         * If we did not have this check then the insertion of `b` would:
	         *   1) evict first `a`
	         *   2) insert `b` at `0` index.
	         *   3) leave `a` at index `1` as is. <-- this is wrong!
	         *   3) reinsert `a` at index 2. <-- this is wrong!
	         *
	         * The correct behavior is:
	         *   1) evict first `a`
	         *   2) insert `b` at `0` index.
	         *   3) reinsert `a` at index 1.
	         *   3) move `a` at from `1` to `2`.
	         *
	         *
	         * Double check that we have not evicted a duplicate item. We need to check if the item type may
	         * have already been removed:
	         * The insertion of b will evict the first 'a'. If we don't reinsert it now it will be reinserted
	         * at the end. Which will show up as the two 'a's switching position. This is incorrect, since a
	         * better way to think of it is as insert of 'b' rather then switch 'a' with 'b' and then add 'a'
	         * at the end.
	         *
	         * @internal
	         */
	        DefaultIterableDiffer.prototype._verifyReinsertion = function (record, item, itemTrackBy, index) {
	            var reinsertRecord = this._unlinkedRecords === null ? null : this._unlinkedRecords.get(itemTrackBy);
	            if (reinsertRecord !== null) {
	                record = this._reinsertAfter(reinsertRecord, record._prev, index);
	            }
	            else if (record.currentIndex != index) {
	                record.currentIndex = index;
	                this._addToMoves(record, index);
	            }
	            return record;
	        };
	        /**
	         * Get rid of any excess {@link CollectionChangeRecord}s from the previous collection
	         *
	         * - `record` The first excess {@link CollectionChangeRecord}.
	         *
	         * @internal
	         */
	        DefaultIterableDiffer.prototype._truncate = function (record) {
	            // Anything after that needs to be removed;
	            while (record !== null) {
	                var nextRecord = record._next;
	                this._addToRemovals(this._unlink(record));
	                record = nextRecord;
	            }
	            if (this._unlinkedRecords !== null) {
	                this._unlinkedRecords.clear();
	            }
	            if (this._additionsTail !== null) {
	                this._additionsTail._nextAdded = null;
	            }
	            if (this._movesTail !== null) {
	                this._movesTail._nextMoved = null;
	            }
	            if (this._itTail !== null) {
	                this._itTail._next = null;
	            }
	            if (this._removalsTail !== null) {
	                this._removalsTail._nextRemoved = null;
	            }
	            if (this._identityChangesTail !== null) {
	                this._identityChangesTail._nextIdentityChange = null;
	            }
	        };
	        /** @internal */
	        DefaultIterableDiffer.prototype._reinsertAfter = function (record, prevRecord, index) {
	            if (this._unlinkedRecords !== null) {
	                this._unlinkedRecords.remove(record);
	            }
	            var prev = record._prevRemoved;
	            var next = record._nextRemoved;
	            if (prev === null) {
	                this._removalsHead = next;
	            }
	            else {
	                prev._nextRemoved = next;
	            }
	            if (next === null) {
	                this._removalsTail = prev;
	            }
	            else {
	                next._prevRemoved = prev;
	            }
	            this._insertAfter(record, prevRecord, index);
	            this._addToMoves(record, index);
	            return record;
	        };
	        /** @internal */
	        DefaultIterableDiffer.prototype._moveAfter = function (record, prevRecord, index) {
	            this._unlink(record);
	            this._insertAfter(record, prevRecord, index);
	            this._addToMoves(record, index);
	            return record;
	        };
	        /** @internal */
	        DefaultIterableDiffer.prototype._addAfter = function (record, prevRecord, index) {
	            this._insertAfter(record, prevRecord, index);
	            if (this._additionsTail === null) {
	                // todo(vicb)
	                // assert(this._additionsHead === null);
	                this._additionsTail = this._additionsHead = record;
	            }
	            else {
	                // todo(vicb)
	                // assert(_additionsTail._nextAdded === null);
	                // assert(record._nextAdded === null);
	                this._additionsTail = this._additionsTail._nextAdded = record;
	            }
	            return record;
	        };
	        /** @internal */
	        DefaultIterableDiffer.prototype._insertAfter = function (record, prevRecord, index) {
	            // todo(vicb)
	            // assert(record != prevRecord);
	            // assert(record._next === null);
	            // assert(record._prev === null);
	            var next = prevRecord === null ? this._itHead : prevRecord._next;
	            // todo(vicb)
	            // assert(next != record);
	            // assert(prevRecord != record);
	            record._next = next;
	            record._prev = prevRecord;
	            if (next === null) {
	                this._itTail = record;
	            }
	            else {
	                next._prev = record;
	            }
	            if (prevRecord === null) {
	                this._itHead = record;
	            }
	            else {
	                prevRecord._next = record;
	            }
	            if (this._linkedRecords === null) {
	                this._linkedRecords = new _DuplicateMap();
	            }
	            this._linkedRecords.put(record);
	            record.currentIndex = index;
	            return record;
	        };
	        /** @internal */
	        DefaultIterableDiffer.prototype._remove = function (record) {
	            return this._addToRemovals(this._unlink(record));
	        };
	        /** @internal */
	        DefaultIterableDiffer.prototype._unlink = function (record) {
	            if (this._linkedRecords !== null) {
	                this._linkedRecords.remove(record);
	            }
	            var prev = record._prev;
	            var next = record._next;
	            // todo(vicb)
	            // assert((record._prev = null) === null);
	            // assert((record._next = null) === null);
	            if (prev === null) {
	                this._itHead = next;
	            }
	            else {
	                prev._next = next;
	            }
	            if (next === null) {
	                this._itTail = prev;
	            }
	            else {
	                next._prev = prev;
	            }
	            return record;
	        };
	        /** @internal */
	        DefaultIterableDiffer.prototype._addToMoves = function (record, toIndex) {
	            // todo(vicb)
	            // assert(record._nextMoved === null);
	            if (record.previousIndex === toIndex) {
	                return record;
	            }
	            if (this._movesTail === null) {
	                // todo(vicb)
	                // assert(_movesHead === null);
	                this._movesTail = this._movesHead = record;
	            }
	            else {
	                // todo(vicb)
	                // assert(_movesTail._nextMoved === null);
	                this._movesTail = this._movesTail._nextMoved = record;
	            }
	            return record;
	        };
	        /** @internal */
	        DefaultIterableDiffer.prototype._addToRemovals = function (record) {
	            if (this._unlinkedRecords === null) {
	                this._unlinkedRecords = new _DuplicateMap();
	            }
	            this._unlinkedRecords.put(record);
	            record.currentIndex = null;
	            record._nextRemoved = null;
	            if (this._removalsTail === null) {
	                // todo(vicb)
	                // assert(_removalsHead === null);
	                this._removalsTail = this._removalsHead = record;
	                record._prevRemoved = null;
	            }
	            else {
	                // todo(vicb)
	                // assert(_removalsTail._nextRemoved === null);
	                // assert(record._nextRemoved === null);
	                record._prevRemoved = this._removalsTail;
	                this._removalsTail = this._removalsTail._nextRemoved = record;
	            }
	            return record;
	        };
	        /** @internal */
	        DefaultIterableDiffer.prototype._addIdentityChange = function (record, item) {
	            record.item = item;
	            if (this._identityChangesTail === null) {
	                this._identityChangesTail = this._identityChangesHead = record;
	            }
	            else {
	                this._identityChangesTail = this._identityChangesTail._nextIdentityChange = record;
	            }
	            return record;
	        };
	        DefaultIterableDiffer.prototype.toString = function () {
	            var list = [];
	            this.forEachItem(function (record /** TODO #9100 */) { return list.push(record); });
	            var previous = [];
	            this.forEachPreviousItem(function (record /** TODO #9100 */) { return previous.push(record); });
	            var additions = [];
	            this.forEachAddedItem(function (record /** TODO #9100 */) { return additions.push(record); });
	            var moves = [];
	            this.forEachMovedItem(function (record /** TODO #9100 */) { return moves.push(record); });
	            var removals = [];
	            this.forEachRemovedItem(function (record /** TODO #9100 */) { return removals.push(record); });
	            var identityChanges = [];
	            this.forEachIdentityChange(function (record /** TODO #9100 */) { return identityChanges.push(record); });
	            return 'collection: ' + list.join(', ') + '\n' +
	                'previous: ' + previous.join(', ') + '\n' +
	                'additions: ' + additions.join(', ') + '\n' +
	                'moves: ' + moves.join(', ') + '\n' +
	                'removals: ' + removals.join(', ') + '\n' +
	                'identityChanges: ' + identityChanges.join(', ') + '\n';
	        };
	        return DefaultIterableDiffer;
	    }());
	    /**
	     * @stable
	     */
	    var CollectionChangeRecord = (function () {
	        function CollectionChangeRecord(item, trackById) {
	            this.item = item;
	            this.trackById = trackById;
	            this.currentIndex = null;
	            this.previousIndex = null;
	            /** @internal */
	            this._nextPrevious = null;
	            /** @internal */
	            this._prev = null;
	            /** @internal */
	            this._next = null;
	            /** @internal */
	            this._prevDup = null;
	            /** @internal */
	            this._nextDup = null;
	            /** @internal */
	            this._prevRemoved = null;
	            /** @internal */
	            this._nextRemoved = null;
	            /** @internal */
	            this._nextAdded = null;
	            /** @internal */
	            this._nextMoved = null;
	            /** @internal */
	            this._nextIdentityChange = null;
	        }
	        CollectionChangeRecord.prototype.toString = function () {
	            return this.previousIndex === this.currentIndex ? stringify(this.item) :
	                stringify(this.item) + '[' +
	                    stringify(this.previousIndex) + '->' + stringify(this.currentIndex) + ']';
	        };
	        return CollectionChangeRecord;
	    }());
	    // A linked list of CollectionChangeRecords with the same CollectionChangeRecord.item
	    var _DuplicateItemRecordList = (function () {
	        function _DuplicateItemRecordList() {
	            /** @internal */
	            this._head = null;
	            /** @internal */
	            this._tail = null;
	        }
	        /**
	         * Append the record to the list of duplicates.
	         *
	         * Note: by design all records in the list of duplicates hold the same value in record.item.
	         */
	        _DuplicateItemRecordList.prototype.add = function (record) {
	            if (this._head === null) {
	                this._head = this._tail = record;
	                record._nextDup = null;
	                record._prevDup = null;
	            }
	            else {
	                // todo(vicb)
	                // assert(record.item ==  _head.item ||
	                //       record.item is num && record.item.isNaN && _head.item is num && _head.item.isNaN);
	                this._tail._nextDup = record;
	                record._prevDup = this._tail;
	                record._nextDup = null;
	                this._tail = record;
	            }
	        };
	        // Returns a CollectionChangeRecord having CollectionChangeRecord.trackById == trackById and
	        // CollectionChangeRecord.currentIndex >= afterIndex
	        _DuplicateItemRecordList.prototype.get = function (trackById, afterIndex) {
	            var record;
	            for (record = this._head; record !== null; record = record._nextDup) {
	                if ((afterIndex === null || afterIndex < record.currentIndex) &&
	                    looseIdentical(record.trackById, trackById)) {
	                    return record;
	                }
	            }
	            return null;
	        };
	        /**
	         * Remove one {@link CollectionChangeRecord} from the list of duplicates.
	         *
	         * Returns whether the list of duplicates is empty.
	         */
	        _DuplicateItemRecordList.prototype.remove = function (record) {
	            // todo(vicb)
	            // assert(() {
	            //  // verify that the record being removed is in the list.
	            //  for (CollectionChangeRecord cursor = _head; cursor != null; cursor = cursor._nextDup) {
	            //    if (identical(cursor, record)) return true;
	            //  }
	            //  return false;
	            //});
	            var prev = record._prevDup;
	            var next = record._nextDup;
	            if (prev === null) {
	                this._head = next;
	            }
	            else {
	                prev._nextDup = next;
	            }
	            if (next === null) {
	                this._tail = prev;
	            }
	            else {
	                next._prevDup = prev;
	            }
	            return this._head === null;
	        };
	        return _DuplicateItemRecordList;
	    }());
	    var _DuplicateMap = (function () {
	        function _DuplicateMap() {
	            this.map = new Map();
	        }
	        _DuplicateMap.prototype.put = function (record) {
	            // todo(vicb) handle corner cases
	            var key = getMapKey(record.trackById);
	            var duplicates = this.map.get(key);
	            if (!isPresent(duplicates)) {
	                duplicates = new _DuplicateItemRecordList();
	                this.map.set(key, duplicates);
	            }
	            duplicates.add(record);
	        };
	        /**
	         * Retrieve the `value` using key. Because the CollectionChangeRecord value may be one which we
	         * have already iterated over, we use the afterIndex to pretend it is not there.
	         *
	         * Use case: `[a, b, c, a, a]` if we are at index `3` which is the second `a` then asking if we
	         * have any more `a`s needs to return the last `a` not the first or second.
	         */
	        _DuplicateMap.prototype.get = function (trackById, afterIndex) {
	            if (afterIndex === void 0) { afterIndex = null; }
	            var key = getMapKey(trackById);
	            var recordList = this.map.get(key);
	            return isBlank(recordList) ? null : recordList.get(trackById, afterIndex);
	        };
	        /**
	         * Removes a {@link CollectionChangeRecord} from the list of duplicates.
	         *
	         * The list of duplicates also is removed from the map if it gets empty.
	         */
	        _DuplicateMap.prototype.remove = function (record) {
	            var key = getMapKey(record.trackById);
	            // todo(vicb)
	            // assert(this.map.containsKey(key));
	            var recordList = this.map.get(key);
	            // Remove the list of duplicates when it gets empty
	            if (recordList.remove(record)) {
	                this.map.delete(key);
	            }
	            return record;
	        };
	        Object.defineProperty(_DuplicateMap.prototype, "isEmpty", {
	            get: function () { return this.map.size === 0; },
	            enumerable: true,
	            configurable: true
	        });
	        _DuplicateMap.prototype.clear = function () { this.map.clear(); };
	        _DuplicateMap.prototype.toString = function () { return '_DuplicateMap(' + stringify(this.map) + ')'; };
	        return _DuplicateMap;
	    }());
	    function getPreviousIndex(item, addRemoveOffset, moveOffsets) {
	        var previousIndex = item.previousIndex;
	        if (previousIndex === null)
	            return previousIndex;
	        var moveOffset = 0;
	        if (moveOffsets && previousIndex < moveOffsets.length) {
	            moveOffset = moveOffsets[previousIndex];
	        }
	        return previousIndex + addRemoveOffset + moveOffset;
	    }
	
	    var DefaultKeyValueDifferFactory = (function () {
	        function DefaultKeyValueDifferFactory() {
	        }
	        DefaultKeyValueDifferFactory.prototype.supports = function (obj) { return obj instanceof Map || isJsObject(obj); };
	        DefaultKeyValueDifferFactory.prototype.create = function (cdRef) { return new DefaultKeyValueDiffer(); };
	        return DefaultKeyValueDifferFactory;
	    }());
	    var DefaultKeyValueDiffer = (function () {
	        function DefaultKeyValueDiffer() {
	            this._records = new Map();
	            this._mapHead = null;
	            this._previousMapHead = null;
	            this._changesHead = null;
	            this._changesTail = null;
	            this._additionsHead = null;
	            this._additionsTail = null;
	            this._removalsHead = null;
	            this._removalsTail = null;
	        }
	        Object.defineProperty(DefaultKeyValueDiffer.prototype, "isDirty", {
	            get: function () {
	                return this._additionsHead !== null || this._changesHead !== null ||
	                    this._removalsHead !== null;
	            },
	            enumerable: true,
	            configurable: true
	        });
	        DefaultKeyValueDiffer.prototype.forEachItem = function (fn) {
	            var record;
	            for (record = this._mapHead; record !== null; record = record._next) {
	                fn(record);
	            }
	        };
	        DefaultKeyValueDiffer.prototype.forEachPreviousItem = function (fn) {
	            var record;
	            for (record = this._previousMapHead; record !== null; record = record._nextPrevious) {
	                fn(record);
	            }
	        };
	        DefaultKeyValueDiffer.prototype.forEachChangedItem = function (fn) {
	            var record;
	            for (record = this._changesHead; record !== null; record = record._nextChanged) {
	                fn(record);
	            }
	        };
	        DefaultKeyValueDiffer.prototype.forEachAddedItem = function (fn) {
	            var record;
	            for (record = this._additionsHead; record !== null; record = record._nextAdded) {
	                fn(record);
	            }
	        };
	        DefaultKeyValueDiffer.prototype.forEachRemovedItem = function (fn) {
	            var record;
	            for (record = this._removalsHead; record !== null; record = record._nextRemoved) {
	                fn(record);
	            }
	        };
	        DefaultKeyValueDiffer.prototype.diff = function (map) {
	            if (!map) {
	                map = new Map();
	            }
	            else if (!(map instanceof Map || isJsObject(map))) {
	                throw new Error("Error trying to diff '" + map + "'");
	            }
	            return this.check(map) ? this : null;
	        };
	        DefaultKeyValueDiffer.prototype.onDestroy = function () { };
	        DefaultKeyValueDiffer.prototype.check = function (map) {
	            var _this = this;
	            this._reset();
	            var records = this._records;
	            var oldSeqRecord = this._mapHead;
	            var lastOldSeqRecord = null;
	            var lastNewSeqRecord = null;
	            var seqChanged = false;
	            this._forEach(map, function (value, key) {
	                var newSeqRecord;
	                if (oldSeqRecord && key === oldSeqRecord.key) {
	                    newSeqRecord = oldSeqRecord;
	                    _this._maybeAddToChanges(newSeqRecord, value);
	                }
	                else {
	                    seqChanged = true;
	                    if (oldSeqRecord !== null) {
	                        _this._removeFromSeq(lastOldSeqRecord, oldSeqRecord);
	                        _this._addToRemovals(oldSeqRecord);
	                    }
	                    if (records.has(key)) {
	                        newSeqRecord = records.get(key);
	                        _this._maybeAddToChanges(newSeqRecord, value);
	                    }
	                    else {
	                        newSeqRecord = new KeyValueChangeRecord(key);
	                        records.set(key, newSeqRecord);
	                        newSeqRecord.currentValue = value;
	                        _this._addToAdditions(newSeqRecord);
	                    }
	                }
	                if (seqChanged) {
	                    if (_this._isInRemovals(newSeqRecord)) {
	                        _this._removeFromRemovals(newSeqRecord);
	                    }
	                    if (lastNewSeqRecord == null) {
	                        _this._mapHead = newSeqRecord;
	                    }
	                    else {
	                        lastNewSeqRecord._next = newSeqRecord;
	                    }
	                }
	                lastOldSeqRecord = oldSeqRecord;
	                lastNewSeqRecord = newSeqRecord;
	                oldSeqRecord = oldSeqRecord && oldSeqRecord._next;
	            });
	            this._truncate(lastOldSeqRecord, oldSeqRecord);
	            return this.isDirty;
	        };
	        /** @internal */
	        DefaultKeyValueDiffer.prototype._reset = function () {
	            if (this.isDirty) {
	                var record = void 0;
	                // Record the state of the mapping
	                for (record = this._previousMapHead = this._mapHead; record !== null; record = record._next) {
	                    record._nextPrevious = record._next;
	                }
	                for (record = this._changesHead; record !== null; record = record._nextChanged) {
	                    record.previousValue = record.currentValue;
	                }
	                for (record = this._additionsHead; record != null; record = record._nextAdded) {
	                    record.previousValue = record.currentValue;
	                }
	                this._changesHead = this._changesTail = null;
	                this._additionsHead = this._additionsTail = null;
	                this._removalsHead = this._removalsTail = null;
	            }
	        };
	        /** @internal */
	        DefaultKeyValueDiffer.prototype._truncate = function (lastRecord, record) {
	            while (record !== null) {
	                if (lastRecord === null) {
	                    this._mapHead = null;
	                }
	                else {
	                    lastRecord._next = null;
	                }
	                var nextRecord = record._next;
	                this._addToRemovals(record);
	                lastRecord = record;
	                record = nextRecord;
	            }
	            for (var rec = this._removalsHead; rec !== null; rec = rec._nextRemoved) {
	                rec.previousValue = rec.currentValue;
	                rec.currentValue = null;
	                this._records.delete(rec.key);
	            }
	        };
	        DefaultKeyValueDiffer.prototype._maybeAddToChanges = function (record, newValue) {
	            if (!looseIdentical(newValue, record.currentValue)) {
	                record.previousValue = record.currentValue;
	                record.currentValue = newValue;
	                this._addToChanges(record);
	            }
	        };
	        /** @internal */
	        DefaultKeyValueDiffer.prototype._isInRemovals = function (record) {
	            return record === this._removalsHead || record._nextRemoved !== null ||
	                record._prevRemoved !== null;
	        };
	        /** @internal */
	        DefaultKeyValueDiffer.prototype._addToRemovals = function (record) {
	            if (this._removalsHead === null) {
	                this._removalsHead = this._removalsTail = record;
	            }
	            else {
	                this._removalsTail._nextRemoved = record;
	                record._prevRemoved = this._removalsTail;
	                this._removalsTail = record;
	            }
	        };
	        /** @internal */
	        DefaultKeyValueDiffer.prototype._removeFromSeq = function (prev, record) {
	            var next = record._next;
	            if (prev === null) {
	                this._mapHead = next;
	            }
	            else {
	                prev._next = next;
	            }
	            record._next = null;
	        };
	        /** @internal */
	        DefaultKeyValueDiffer.prototype._removeFromRemovals = function (record) {
	            var prev = record._prevRemoved;
	            var next = record._nextRemoved;
	            if (prev === null) {
	                this._removalsHead = next;
	            }
	            else {
	                prev._nextRemoved = next;
	            }
	            if (next === null) {
	                this._removalsTail = prev;
	            }
	            else {
	                next._prevRemoved = prev;
	            }
	            record._prevRemoved = record._nextRemoved = null;
	        };
	        /** @internal */
	        DefaultKeyValueDiffer.prototype._addToAdditions = function (record) {
	            if (this._additionsHead === null) {
	                this._additionsHead = this._additionsTail = record;
	            }
	            else {
	                this._additionsTail._nextAdded = record;
	                this._additionsTail = record;
	            }
	        };
	        /** @internal */
	        DefaultKeyValueDiffer.prototype._addToChanges = function (record) {
	            if (this._changesHead === null) {
	                this._changesHead = this._changesTail = record;
	            }
	            else {
	                this._changesTail._nextChanged = record;
	                this._changesTail = record;
	            }
	        };
	        DefaultKeyValueDiffer.prototype.toString = function () {
	            var items = [];
	            var previous = [];
	            var changes = [];
	            var additions = [];
	            var removals = [];
	            var record;
	            for (record = this._mapHead; record !== null; record = record._next) {
	                items.push(stringify(record));
	            }
	            for (record = this._previousMapHead; record !== null; record = record._nextPrevious) {
	                previous.push(stringify(record));
	            }
	            for (record = this._changesHead; record !== null; record = record._nextChanged) {
	                changes.push(stringify(record));
	            }
	            for (record = this._additionsHead; record !== null; record = record._nextAdded) {
	                additions.push(stringify(record));
	            }
	            for (record = this._removalsHead; record !== null; record = record._nextRemoved) {
	                removals.push(stringify(record));
	            }
	            return 'map: ' + items.join(', ') + '\n' +
	                'previous: ' + previous.join(', ') + '\n' +
	                'additions: ' + additions.join(', ') + '\n' +
	                'changes: ' + changes.join(', ') + '\n' +
	                'removals: ' + removals.join(', ') + '\n';
	        };
	        /** @internal */
	        DefaultKeyValueDiffer.prototype._forEach = function (obj, fn) {
	            if (obj instanceof Map) {
	                obj.forEach(fn);
	            }
	            else {
	                StringMapWrapper.forEach(obj, fn);
	            }
	        };
	        return DefaultKeyValueDiffer;
	    }());
	    /**
	     * @stable
	     */
	    var KeyValueChangeRecord = (function () {
	        function KeyValueChangeRecord(key) {
	            this.key = key;
	            this.previousValue = null;
	            this.currentValue = null;
	            /** @internal */
	            this._nextPrevious = null;
	            /** @internal */
	            this._next = null;
	            /** @internal */
	            this._nextAdded = null;
	            /** @internal */
	            this._nextRemoved = null;
	            /** @internal */
	            this._prevRemoved = null;
	            /** @internal */
	            this._nextChanged = null;
	        }
	        KeyValueChangeRecord.prototype.toString = function () {
	            return looseIdentical(this.previousValue, this.currentValue) ?
	                stringify(this.key) :
	                (stringify(this.key) + '[' + stringify(this.previousValue) + '->' +
	                    stringify(this.currentValue) + ']');
	        };
	        return KeyValueChangeRecord;
	    }());
	
	    /**
	     * A repository of different iterable diffing strategies used by NgFor, NgClass, and others.
	     * @stable
	     */
	    var IterableDiffers = (function () {
	        function IterableDiffers(factories) {
	            this.factories = factories;
	        }
	        IterableDiffers.create = function (factories, parent) {
	            if (isPresent(parent)) {
	                var copied = ListWrapper.clone(parent.factories);
	                factories = factories.concat(copied);
	                return new IterableDiffers(factories);
	            }
	            else {
	                return new IterableDiffers(factories);
	            }
	        };
	        /**
	         * Takes an array of {@link IterableDifferFactory} and returns a provider used to extend the
	         * inherited {@link IterableDiffers} instance with the provided factories and return a new
	         * {@link IterableDiffers} instance.
	         *
	         * The following example shows how to extend an existing list of factories,
	               * which will only be applied to the injector for this component and its children.
	               * This step is all that's required to make a new {@link IterableDiffer} available.
	         *
	         * ### Example
	         *
	         * ```
	         * @Component({
	         *   viewProviders: [
	         *     IterableDiffers.extend([new ImmutableListDiffer()])
	         *   ]
	         * })
	         * ```
	         */
	        IterableDiffers.extend = function (factories) {
	            return {
	                provide: IterableDiffers,
	                useFactory: function (parent) {
	                    if (isBlank(parent)) {
	                        // Typically would occur when calling IterableDiffers.extend inside of dependencies passed
	                        // to
	                        // bootstrap(), which would override default pipes instead of extending them.
	                        throw new Error('Cannot extend IterableDiffers without a parent injector');
	                    }
	                    return IterableDiffers.create(factories, parent);
	                },
	                // Dependency technically isn't optional, but we can provide a better error message this way.
	                deps: [[IterableDiffers, new SkipSelf(), new Optional()]]
	            };
	        };
	        IterableDiffers.prototype.find = function (iterable) {
	            var factory = this.factories.find(function (f) { return f.supports(iterable); });
	            if (isPresent(factory)) {
	                return factory;
	            }
	            else {
	                throw new Error("Cannot find a differ supporting object '" + iterable + "' of type '" + getTypeNameForDebugging(iterable) + "'");
	            }
	        };
	        return IterableDiffers;
	    }());
	
	    /**
	     * A repository of different Map diffing strategies used by NgClass, NgStyle, and others.
	     * @stable
	     */
	    var KeyValueDiffers = (function () {
	        function KeyValueDiffers(factories) {
	            this.factories = factories;
	        }
	        KeyValueDiffers.create = function (factories, parent) {
	            if (isPresent(parent)) {
	                var copied = ListWrapper.clone(parent.factories);
	                factories = factories.concat(copied);
	                return new KeyValueDiffers(factories);
	            }
	            else {
	                return new KeyValueDiffers(factories);
	            }
	        };
	        /**
	         * Takes an array of {@link KeyValueDifferFactory} and returns a provider used to extend the
	         * inherited {@link KeyValueDiffers} instance with the provided factories and return a new
	         * {@link KeyValueDiffers} instance.
	         *
	         * The following example shows how to extend an existing list of factories,
	               * which will only be applied to the injector for this component and its children.
	               * This step is all that's required to make a new {@link KeyValueDiffer} available.
	         *
	         * ### Example
	         *
	         * ```
	         * @Component({
	         *   viewProviders: [
	         *     KeyValueDiffers.extend([new ImmutableMapDiffer()])
	         *   ]
	         * })
	         * ```
	         */
	        KeyValueDiffers.extend = function (factories) {
	            return {
	                provide: KeyValueDiffers,
	                useFactory: function (parent) {
	                    if (isBlank(parent)) {
	                        // Typically would occur when calling KeyValueDiffers.extend inside of dependencies passed
	                        // to
	                        // bootstrap(), which would override default pipes instead of extending them.
	                        throw new Error('Cannot extend KeyValueDiffers without a parent injector');
	                    }
	                    return KeyValueDiffers.create(factories, parent);
	                },
	                // Dependency technically isn't optional, but we can provide a better error message this way.
	                deps: [[KeyValueDiffers, new SkipSelf(), new Optional()]]
	            };
	        };
	        KeyValueDiffers.prototype.find = function (kv) {
	            var factory = this.factories.find(function (f) { return f.supports(kv); });
	            if (isPresent(factory)) {
	                return factory;
	            }
	            else {
	                throw new Error("Cannot find a differ supporting object '" + kv + "'");
	            }
	        };
	        return KeyValueDiffers;
	    }());
	
	    var UNINITIALIZED = {
	        toString: function () { return 'CD_INIT_VALUE'; }
	    };
	    function devModeEqual(a, b) {
	        if (isListLikeIterable(a) && isListLikeIterable(b)) {
	            return areIterablesEqual(a, b, devModeEqual);
	        }
	        else if (!isListLikeIterable(a) && !isPrimitive(a) && !isListLikeIterable(b) && !isPrimitive(b)) {
	            return true;
	        }
	        else {
	            return looseIdentical(a, b);
	        }
	    }
	    /**
	     * Indicates that the result of a {@link Pipe} transformation has changed even though the
	     * reference
	     * has not changed.
	     *
	     * The wrapped value will be unwrapped by change detection, and the unwrapped value will be stored.
	     *
	     * Example:
	     *
	     * ```
	     * if (this._latestValue === this._latestReturnedValue) {
	     *    return this._latestReturnedValue;
	     *  } else {
	     *    this._latestReturnedValue = this._latestValue;
	     *    return WrappedValue.wrap(this._latestValue); // this will force update
	     *  }
	     * ```
	     * @stable
	     */
	    var WrappedValue = (function () {
	        function WrappedValue(wrapped) {
	            this.wrapped = wrapped;
	        }
	        WrappedValue.wrap = function (value) { return new WrappedValue(value); };
	        return WrappedValue;
	    }());
	    /**
	     * Helper class for unwrapping WrappedValue s
	     */
	    var ValueUnwrapper = (function () {
	        function ValueUnwrapper() {
	            this.hasWrappedValue = false;
	        }
	        ValueUnwrapper.prototype.unwrap = function (value) {
	            if (value instanceof WrappedValue) {
	                this.hasWrappedValue = true;
	                return value.wrapped;
	            }
	            return value;
	        };
	        ValueUnwrapper.prototype.reset = function () { this.hasWrappedValue = false; };
	        return ValueUnwrapper;
	    }());
	    /**
	     * Represents a basic change from a previous to a new value.
	     * @stable
	     */
	    var SimpleChange = (function () {
	        function SimpleChange(previousValue, currentValue) {
	            this.previousValue = previousValue;
	            this.currentValue = currentValue;
	        }
	        /**
	         * Check whether the new value is the first value assigned.
	         */
	        SimpleChange.prototype.isFirstChange = function () { return this.previousValue === UNINITIALIZED; };
	        return SimpleChange;
	    }());
	
	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    /**
	     * @stable
	     */
	    var ChangeDetectorRef = (function () {
	        function ChangeDetectorRef() {
	        }
	        return ChangeDetectorRef;
	    }());
	
	    /**
	     * Structural diffing for `Object`s and `Map`s.
	     */
	    var keyValDiff = [new DefaultKeyValueDifferFactory()];
	    /**
	     * Structural diffing for `Iterable` types such as `Array`s.
	     */
	    var iterableDiff = [new DefaultIterableDifferFactory()];
	    var defaultIterableDiffers = new IterableDiffers(iterableDiff);
	    var defaultKeyValueDiffers = new KeyValueDiffers(keyValDiff);
	
	    /**
	     * @experimental
	     */
	    // TODO (matsko): add typing for the animation function
	    var RenderComponentType = (function () {
	        function RenderComponentType(id, templateUrl, slotCount, encapsulation, styles, animations) {
	            this.id = id;
	            this.templateUrl = templateUrl;
	            this.slotCount = slotCount;
	            this.encapsulation = encapsulation;
	            this.styles = styles;
	            this.animations = animations;
	        }
	        return RenderComponentType;
	    }());
	    var RenderDebugInfo = (function () {
	        function RenderDebugInfo() {
	        }
	        Object.defineProperty(RenderDebugInfo.prototype, "injector", {
	            get: function () { return unimplemented(); },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(RenderDebugInfo.prototype, "component", {
	            get: function () { return unimplemented(); },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(RenderDebugInfo.prototype, "providerTokens", {
	            get: function () { return unimplemented(); },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(RenderDebugInfo.prototype, "references", {
	            get: function () { return unimplemented(); },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(RenderDebugInfo.prototype, "context", {
	            get: function () { return unimplemented(); },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(RenderDebugInfo.prototype, "source", {
	            get: function () { return unimplemented(); },
	            enumerable: true,
	            configurable: true
	        });
	        return RenderDebugInfo;
	    }());
	    /**
	     * @experimental
	     */
	    var Renderer = (function () {
	        function Renderer() {
	        }
	        return Renderer;
	    }());
	    /**
	     * Injectable service that provides a low-level interface for modifying the UI.
	     *
	     * Use this service to bypass Angular's templating and make custom UI changes that can't be
	     * expressed declaratively. For example if you need to set a property or an attribute whose name is
	     * not statically known, use {@link #setElementProperty} or {@link #setElementAttribute}
	     * respectively.
	     *
	     * If you are implementing a custom renderer, you must implement this interface.
	     *
	     * The default Renderer implementation is `DomRenderer`. Also available is `WebWorkerRenderer`.
	     * @experimental
	     */
	    var RootRenderer = (function () {
	        function RootRenderer() {
	        }
	        return RootRenderer;
	    }());
	
	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    /**
	     * A SecurityContext marks a location that has dangerous security implications, e.g. a DOM property
	     * like `innerHTML` that could cause Cross Site Scripting (XSS) security bugs when improperly
	     * handled.
	     *
	     * See DomSanitizer for more details on security in Angular applications.
	     *
	     * @stable
	     */
	    exports.SecurityContext;
	    (function (SecurityContext) {
	        SecurityContext[SecurityContext["NONE"] = 0] = "NONE";
	        SecurityContext[SecurityContext["HTML"] = 1] = "HTML";
	        SecurityContext[SecurityContext["STYLE"] = 2] = "STYLE";
	        SecurityContext[SecurityContext["SCRIPT"] = 3] = "SCRIPT";
	        SecurityContext[SecurityContext["URL"] = 4] = "URL";
	        SecurityContext[SecurityContext["RESOURCE_URL"] = 5] = "RESOURCE_URL";
	    })(exports.SecurityContext || (exports.SecurityContext = {}));
	    /**
	     * Sanitizer is used by the views to sanitize potentially dangerous values.
	     *
	     * @stable
	     */
	    var Sanitizer = (function () {
	        function Sanitizer() {
	        }
	        return Sanitizer;
	    }());
	
	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    /**
	     * A wrapper around a native element inside of a View.
	     *
	     * An `ElementRef` is backed by a render-specific element. In the browser, this is usually a DOM
	     * element.
	     *
	     * @security Permitting direct access to the DOM can make your application more vulnerable to
	     * XSS attacks. Carefully review any use of `ElementRef` in your code. For more detail, see the
	     * [Security Guide](http://g.co/ng/security).
	     *
	     * @stable
	     */
	    // Note: We don't expose things like `Injector`, `ViewContainer`, ... here,
	    // i.e. users have to ask for what they need. With that, we can build better analysis tools
	    // and could do better codegen in the future.
	    var ElementRef = (function () {
	        function ElementRef(nativeElement) {
	            this.nativeElement = nativeElement;
	        }
	        return ElementRef;
	    }());
	
	    var trace;
	    var events;
	    function detectWTF() {
	        var wtf = global$1['wtf'];
	        if (wtf) {
	            trace = wtf['trace'];
	            if (trace) {
	                events = trace['events'];
	                return true;
	            }
	        }
	        return false;
	    }
	    function createScope(signature, flags) {
	        if (flags === void 0) { flags = null; }
	        return events.createScope(signature, flags);
	    }
	    function leave(scope, returnValue) {
	        trace.leaveScope(scope, returnValue);
	        return returnValue;
	    }
	    function startTimeRange(rangeType, action) {
	        return trace.beginTimeRange(rangeType, action);
	    }
	    function endTimeRange(range) {
	        trace.endTimeRange(range);
	    }
	
	    /**
	     * True if WTF is enabled.
	     */
	    var wtfEnabled = detectWTF();
	    function noopScope(arg0, arg1) {
	        return null;
	    }
	    /**
	     * Create trace scope.
	     *
	     * Scopes must be strictly nested and are analogous to stack frames, but
	     * do not have to follow the stack frames. Instead it is recommended that they follow logical
	     * nesting. You may want to use
	     * [Event
	     * Signatures](http://google.github.io/tracing-framework/instrumenting-code.html#custom-events)
	     * as they are defined in WTF.
	     *
	     * Used to mark scope entry. The return value is used to leave the scope.
	     *
	     *     var myScope = wtfCreateScope('MyClass#myMethod(ascii someVal)');
	     *
	     *     someMethod() {
	     *        var s = myScope('Foo'); // 'Foo' gets stored in tracing UI
	     *        // DO SOME WORK HERE
	     *        return wtfLeave(s, 123); // Return value 123
	     *     }
	     *
	     * Note, adding try-finally block around the work to ensure that `wtfLeave` gets called can
	     * negatively impact the performance of your application. For this reason we recommend that
	     * you don't add them to ensure that `wtfLeave` gets called. In production `wtfLeave` is a noop and
	     * so try-finally block has no value. When debugging perf issues, skipping `wtfLeave`, do to
	     * exception, will produce incorrect trace, but presence of exception signifies logic error which
	     * needs to be fixed before the app should be profiled. Add try-finally only when you expect that
	     * an exception is expected during normal execution while profiling.
	     *
	     * @experimental
	     */
	    var wtfCreateScope = wtfEnabled ? createScope : function (signature, flags) { return noopScope; };
	    /**
	     * Used to mark end of Scope.
	     *
	     * - `scope` to end.
	     * - `returnValue` (optional) to be passed to the WTF.
	     *
	     * Returns the `returnValue for easy chaining.
	     * @experimental
	     */
	    var wtfLeave = wtfEnabled ? leave : function (s, r) { return r; };
	    /**
	     * Used to mark Async start. Async are similar to scope but they don't have to be strictly nested.
	     * The return value is used in the call to [endAsync]. Async ranges only work if WTF has been
	     * enabled.
	     *
	     *     someMethod() {
	     *        var s = wtfStartTimeRange('HTTP:GET', 'some.url');
	     *        var future = new Future.delay(5).then((_) {
	     *          wtfEndTimeRange(s);
	     *        });
	     *     }
	     * @experimental
	     */
	    var wtfStartTimeRange = wtfEnabled ? startTimeRange : function (rangeType, action) { return null; };
	    /**
	     * Ends a async time range operation.
	     * [range] is the return value from [wtfStartTimeRange] Async ranges only work if WTF has been
	     * enabled.
	     * @experimental
	     */
	    var wtfEndTimeRange = wtfEnabled ? endTimeRange : function (r) { return null; };
	
	    /**
	     * Represents a container where one or more Views can be attached.
	     *
	     * The container can contain two kinds of Views. Host Views, created by instantiating a
	     * {@link Component} via {@link #createComponent}, and Embedded Views, created by instantiating an
	     * {@link TemplateRef Embedded Template} via {@link #createEmbeddedView}.
	     *
	     * The location of the View Container within the containing View is specified by the Anchor
	     * `element`. Each View Container can have only one Anchor Element and each Anchor Element can only
	     * have a single View Container.
	     *
	     * Root elements of Views attached to this container become siblings of the Anchor Element in
	     * the Rendered View.
	     *
	     * To access a `ViewContainerRef` of an Element, you can either place a {@link Directive} injected
	     * with `ViewContainerRef` on the Element, or you obtain it via a {@link ViewChild} query.
	     * @stable
	     */
	    var ViewContainerRef = (function () {
	        function ViewContainerRef() {
	        }
	        Object.defineProperty(ViewContainerRef.prototype, "element", {
	            /**
	             * Anchor element that specifies the location of this container in the containing View.
	             * <!-- TODO: rename to anchorElement -->
	             */
	            get: function () { return unimplemented(); },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(ViewContainerRef.prototype, "injector", {
	            get: function () { return unimplemented(); },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(ViewContainerRef.prototype, "parentInjector", {
	            get: function () { return unimplemented(); },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(ViewContainerRef.prototype, "length", {
	            /**
	             * Returns the number of Views currently attached to this container.
	             */
	            get: function () { return unimplemented(); },
	            enumerable: true,
	            configurable: true
	        });
	        ;
	        return ViewContainerRef;
	    }());
	    var ViewContainerRef_ = (function () {
	        function ViewContainerRef_(_element) {
	            this._element = _element;
	            /** @internal */
	            this._createComponentInContainerScope = wtfCreateScope('ViewContainerRef#createComponent()');
	            /** @internal */
	            this._insertScope = wtfCreateScope('ViewContainerRef#insert()');
	            /** @internal */
	            this._removeScope = wtfCreateScope('ViewContainerRef#remove()');
	            /** @internal */
	            this._detachScope = wtfCreateScope('ViewContainerRef#detach()');
	        }
	        ViewContainerRef_.prototype.get = function (index) { return this._element.nestedViews[index].ref; };
	        Object.defineProperty(ViewContainerRef_.prototype, "length", {
	            get: function () {
	                var views = this._element.nestedViews;
	                return isPresent(views) ? views.length : 0;
	            },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(ViewContainerRef_.prototype, "element", {
	            get: function () { return this._element.elementRef; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(ViewContainerRef_.prototype, "injector", {
	            get: function () { return this._element.injector; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(ViewContainerRef_.prototype, "parentInjector", {
	            get: function () { return this._element.parentInjector; },
	            enumerable: true,
	            configurable: true
	        });
	        // TODO(rado): profile and decide whether bounds checks should be added
	        // to the methods below.
	        ViewContainerRef_.prototype.createEmbeddedView = function (templateRef, context, index) {
	            if (context === void 0) { context = null; }
	            if (index === void 0) { index = -1; }
	            var viewRef = templateRef.createEmbeddedView(context);
	            this.insert(viewRef, index);
	            return viewRef;
	        };
	        ViewContainerRef_.prototype.createComponent = function (componentFactory, index, injector, projectableNodes) {
	            if (index === void 0) { index = -1; }
	            if (injector === void 0) { injector = null; }
	            if (projectableNodes === void 0) { projectableNodes = null; }
	            var s = this._createComponentInContainerScope();
	            var contextInjector = isPresent(injector) ? injector : this._element.parentInjector;
	            var componentRef = componentFactory.create(contextInjector, projectableNodes);
	            this.insert(componentRef.hostView, index);
	            return wtfLeave(s, componentRef);
	        };
	        // TODO(i): refactor insert+remove into move
	        ViewContainerRef_.prototype.insert = function (viewRef, index) {
	            if (index === void 0) { index = -1; }
	            var s = this._insertScope();
	            if (index == -1)
	                index = this.length;
	            var viewRef_ = viewRef;
	            this._element.attachView(viewRef_.internalView, index);
	            return wtfLeave(s, viewRef_);
	        };
	        ViewContainerRef_.prototype.move = function (viewRef, currentIndex) {
	            var s = this._insertScope();
	            if (currentIndex == -1)
	                return;
	            var viewRef_ = viewRef;
	            this._element.moveView(viewRef_.internalView, currentIndex);
	            return wtfLeave(s, viewRef_);
	        };
	        ViewContainerRef_.prototype.indexOf = function (viewRef) {
	            return ListWrapper.indexOf(this._element.nestedViews, viewRef.internalView);
	        };
	        // TODO(i): rename to destroy
	        ViewContainerRef_.prototype.remove = function (index) {
	            if (index === void 0) { index = -1; }
	            var s = this._removeScope();
	            if (index == -1)
	                index = this.length - 1;
	            var view = this._element.detachView(index);
	            view.destroy();
	            // view is intentionally not returned to the client.
	            wtfLeave(s);
	        };
	        // TODO(i): refactor insert+remove into move
	        ViewContainerRef_.prototype.detach = function (index) {
	            if (index === void 0) { index = -1; }
	            var s = this._detachScope();
	            if (index == -1)
	                index = this.length - 1;
	            var view = this._element.detachView(index);
	            return wtfLeave(s, view.ref);
	        };
	        ViewContainerRef_.prototype.clear = function () {
	            for (var i = this.length - 1; i >= 0; i--) {
	                this.remove(i);
	            }
	        };
	        return ViewContainerRef_;
	    }());
	
	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var ViewType;
	    (function (ViewType) {
	        // A view that contains the host element with bound component directive.
	        // Contains a COMPONENT view
	        ViewType[ViewType["HOST"] = 0] = "HOST";
	        // The view of the component
	        // Can contain 0 to n EMBEDDED views
	        ViewType[ViewType["COMPONENT"] = 1] = "COMPONENT";
	        // A view that is embedded into another View via a <template> element
	        // inside of a COMPONENT view
	        ViewType[ViewType["EMBEDDED"] = 2] = "EMBEDDED";
	    })(ViewType || (ViewType = {}));
	
	    /**
	     * An AppElement is created for elements that have a ViewContainerRef,
	     * a nested component or a <template> element to keep data around
	     * that is needed for later instantiations.
	     */
	    var AppElement = (function () {
	        function AppElement(index, parentIndex, parentView, nativeElement) {
	            this.index = index;
	            this.parentIndex = parentIndex;
	            this.parentView = parentView;
	            this.nativeElement = nativeElement;
	            this.nestedViews = null;
	            this.componentView = null;
	        }
	        Object.defineProperty(AppElement.prototype, "elementRef", {
	            get: function () { return new ElementRef(this.nativeElement); },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AppElement.prototype, "vcRef", {
	            get: function () { return new ViewContainerRef_(this); },
	            enumerable: true,
	            configurable: true
	        });
	        AppElement.prototype.initComponent = function (component, componentConstructorViewQueries, view) {
	            this.component = component;
	            this.componentConstructorViewQueries = componentConstructorViewQueries;
	            this.componentView = view;
	        };
	        Object.defineProperty(AppElement.prototype, "parentInjector", {
	            get: function () { return this.parentView.injector(this.parentIndex); },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AppElement.prototype, "injector", {
	            get: function () { return this.parentView.injector(this.index); },
	            enumerable: true,
	            configurable: true
	        });
	        AppElement.prototype.mapNestedViews = function (nestedViewClass, callback) {
	            var result = [];
	            if (isPresent(this.nestedViews)) {
	                this.nestedViews.forEach(function (nestedView) {
	                    if (nestedView.clazz === nestedViewClass) {
	                        result.push(callback(nestedView));
	                    }
	                });
	            }
	            return result;
	        };
	        AppElement.prototype.moveView = function (view, currentIndex) {
	            var previousIndex = this.nestedViews.indexOf(view);
	            if (view.type === ViewType.COMPONENT) {
	                throw new Error("Component views can't be moved!");
	            }
	            var nestedViews = this.nestedViews;
	            if (nestedViews == null) {
	                nestedViews = [];
	                this.nestedViews = nestedViews;
	            }
	            ListWrapper.removeAt(nestedViews, previousIndex);
	            ListWrapper.insert(nestedViews, currentIndex, view);
	            var refRenderNode;
	            if (currentIndex > 0) {
	                var prevView = nestedViews[currentIndex - 1];
	                refRenderNode = prevView.lastRootNode;
	            }
	            else {
	                refRenderNode = this.nativeElement;
	            }
	            if (isPresent(refRenderNode)) {
	                view.renderer.attachViewAfter(refRenderNode, view.flatRootNodes);
	            }
	            view.markContentChildAsMoved(this);
	        };
	        AppElement.prototype.attachView = function (view, viewIndex) {
	            if (view.type === ViewType.COMPONENT) {
	                throw new Error("Component views can't be moved!");
	            }
	            var nestedViews = this.nestedViews;
	            if (nestedViews == null) {
	                nestedViews = [];
	                this.nestedViews = nestedViews;
	            }
	            ListWrapper.insert(nestedViews, viewIndex, view);
	            var refRenderNode;
	            if (viewIndex > 0) {
	                var prevView = nestedViews[viewIndex - 1];
	                refRenderNode = prevView.lastRootNode;
	            }
	            else {
	                refRenderNode = this.nativeElement;
	            }
	            if (isPresent(refRenderNode)) {
	                view.renderer.attachViewAfter(refRenderNode, view.flatRootNodes);
	            }
	            view.addToContentChildren(this);
	        };
	        AppElement.prototype.detachView = function (viewIndex) {
	            var view = ListWrapper.removeAt(this.nestedViews, viewIndex);
	            if (view.type === ViewType.COMPONENT) {
	                throw new Error("Component views can't be moved!");
	            }
	            view.detach();
	            view.removeFromContentChildren(this);
	            return view;
	        };
	        return AppElement;
	    }());
	
	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var __extends$6 = (this && this.__extends) || function (d, b) {
	        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	    /**
	     * An error thrown if application changes model breaking the top-down data flow.
	     *
	     * This exception is only thrown in dev mode.
	     *
	     * <!-- TODO: Add a link once the dev mode option is configurable -->
	     *
	     * ### Example
	     *
	     * ```typescript
	     * @Component({
	     *   selector: 'parent',
	     *   template: `
	     *     <child [prop]="parentProp"></child>
	     *   `,
	     *   directives: [forwardRef(() => Child)]
	     * })
	     * class Parent {
	     *   parentProp = "init";
	     * }
	     *
	     * @Directive({selector: 'child', inputs: ['prop']})
	     * class Child {
	     *   constructor(public parent: Parent) {}
	     *
	     *   set prop(v) {
	     *     // this updates the parent property, which is disallowed during change detection
	     *     // this will result in ExpressionChangedAfterItHasBeenCheckedError
	     *     this.parent.parentProp = "updated";
	     *   }
	     * }
	     * ```
	     * @stable
	     */
	    var ExpressionChangedAfterItHasBeenCheckedError = (function (_super) {
	        __extends$6(ExpressionChangedAfterItHasBeenCheckedError, _super);
	        function ExpressionChangedAfterItHasBeenCheckedError(oldValue, currValue) {
	            var msg = "Expression has changed after it was checked. Previous value: '" + oldValue + "'. Current value: '" + currValue + "'.";
	            if (oldValue === UNINITIALIZED) {
	                msg +=
	                    " It seems like the view has been created after its parent and its children have been dirty checked." +
	                        " Has it been created in a change detection hook ?";
	            }
	            _super.call(this, msg);
	        }
	        return ExpressionChangedAfterItHasBeenCheckedError;
	    }(BaseError));
	    /**
	     * Thrown when an exception was raised during view creation, change detection or destruction.
	     *
	     * This error wraps the original exception to attach additional contextual information that can
	     * be useful for debugging.
	     * @stable
	     */
	    var ViewWrappedError = (function (_super) {
	        __extends$6(ViewWrappedError, _super);
	        function ViewWrappedError(originalError, context) {
	            _super.call(this, "Error in " + context.source, originalError);
	            this.context = context;
	        }
	        return ViewWrappedError;
	    }(WrappedError));
	    /**
	     * Thrown when a destroyed view is used.
	     *
	     * This error indicates a bug in the framework.
	     *
	     * This is an internal Angular error.
	     * @stable
	     */
	    var ViewDestroyedError = (function (_super) {
	        __extends$6(ViewDestroyedError, _super);
	        function ViewDestroyedError(details) {
	            _super.call(this, "Attempt to use a destroyed view: " + details);
	        }
	        return ViewDestroyedError;
	    }(BaseError));
	
	    var ViewUtils = (function () {
	        function ViewUtils(_renderer, _appId, sanitizer) {
	            this._renderer = _renderer;
	            this._appId = _appId;
	            this._nextCompTypeId = 0;
	            this.sanitizer = sanitizer;
	        }
	        /**
	         * Used by the generated code
	         */
	        // TODO (matsko): add typing for the animation function
	        ViewUtils.prototype.createRenderComponentType = function (templateUrl, slotCount, encapsulation, styles, animations) {
	            return new RenderComponentType(this._appId + "-" + this._nextCompTypeId++, templateUrl, slotCount, encapsulation, styles, animations);
	        };
	        /** @internal */
	        ViewUtils.prototype.renderComponent = function (renderComponentType) {
	            return this._renderer.renderComponent(renderComponentType);
	        };
	        ViewUtils.decorators = [
	            { type: Injectable },
	        ];
	        /** @nocollapse */
	        ViewUtils.ctorParameters = [
	            { type: RootRenderer, },
	            { type: undefined, decorators: [{ type: Inject, args: [APP_ID,] },] },
	            { type: Sanitizer, },
	        ];
	        return ViewUtils;
	    }());
	    function flattenNestedViewRenderNodes(nodes) {
	        return _flattenNestedViewRenderNodes(nodes, []);
	    }
	    function _flattenNestedViewRenderNodes(nodes, renderNodes) {
	        for (var i = 0; i < nodes.length; i++) {
	            var node = nodes[i];
	            if (node instanceof AppElement) {
	                var appEl = node;
	                renderNodes.push(appEl.nativeElement);
	                if (isPresent(appEl.nestedViews)) {
	                    for (var k = 0; k < appEl.nestedViews.length; k++) {
	                        _flattenNestedViewRenderNodes(appEl.nestedViews[k].rootNodesOrAppElements, renderNodes);
	                    }
	                }
	            }
	            else {
	                renderNodes.push(node);
	            }
	        }
	        return renderNodes;
	    }
	    var EMPTY_ARR = [];
	    function ensureSlotCount(projectableNodes, expectedSlotCount) {
	        var res;
	        if (isBlank(projectableNodes)) {
	            res = EMPTY_ARR;
	        }
	        else if (projectableNodes.length < expectedSlotCount) {
	            var givenSlotCount = projectableNodes.length;
	            res = ListWrapper.createFixedSize(expectedSlotCount);
	            for (var i = 0; i < expectedSlotCount; i++) {
	                res[i] = (i < givenSlotCount) ? projectableNodes[i] : EMPTY_ARR;
	            }
	        }
	        else {
	            res = projectableNodes;
	        }
	        return res;
	    }
	    var MAX_INTERPOLATION_VALUES = 9;
	    function interpolate(valueCount, c0, a1, c1, a2, c2, a3, c3, a4, c4, a5, c5, a6, c6, a7, c7, a8, c8, a9, c9) {
	        switch (valueCount) {
	            case 1:
	                return c0 + _toStringWithNull(a1) + c1;
	            case 2:
	                return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2;
	            case 3:
	                return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) +
	                    c3;
	            case 4:
	                return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) +
	                    c3 + _toStringWithNull(a4) + c4;
	            case 5:
	                return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) +
	                    c3 + _toStringWithNull(a4) + c4 + _toStringWithNull(a5) + c5;
	            case 6:
	                return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) +
	                    c3 + _toStringWithNull(a4) + c4 + _toStringWithNull(a5) + c5 + _toStringWithNull(a6) + c6;
	            case 7:
	                return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) +
	                    c3 + _toStringWithNull(a4) + c4 + _toStringWithNull(a5) + c5 + _toStringWithNull(a6) +
	                    c6 + _toStringWithNull(a7) + c7;
	            case 8:
	                return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) +
	                    c3 + _toStringWithNull(a4) + c4 + _toStringWithNull(a5) + c5 + _toStringWithNull(a6) +
	                    c6 + _toStringWithNull(a7) + c7 + _toStringWithNull(a8) + c8;
	            case 9:
	                return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) +
	                    c3 + _toStringWithNull(a4) + c4 + _toStringWithNull(a5) + c5 + _toStringWithNull(a6) +
	                    c6 + _toStringWithNull(a7) + c7 + _toStringWithNull(a8) + c8 + _toStringWithNull(a9) + c9;
	            default:
	                throw new Error("Does not support more than 9 expressions");
	        }
	    }
	    function _toStringWithNull(v) {
	        return v != null ? v.toString() : '';
	    }
	    function checkBinding(throwOnChange, oldValue, newValue) {
	        if (throwOnChange) {
	            if (!devModeEqual(oldValue, newValue)) {
	                throw new ExpressionChangedAfterItHasBeenCheckedError(oldValue, newValue);
	            }
	            return false;
	        }
	        else {
	            return !looseIdentical(oldValue, newValue);
	        }
	    }
	    function castByValue(input, value) {
	        return input;
	    }
	    var EMPTY_ARRAY = [];
	    var EMPTY_MAP = {};
	    function pureProxy1(fn) {
	        var result;
	        var v0 = UNINITIALIZED;
	        return function (p0) {
	            if (!looseIdentical(v0, p0)) {
	                v0 = p0;
	                result = fn(p0);
	            }
	            return result;
	        };
	    }
	    function pureProxy2(fn) {
	        var result;
	        var v0 = UNINITIALIZED;
	        var v1 = UNINITIALIZED;
	        return function (p0, p1) {
	            if (!looseIdentical(v0, p0) || !looseIdentical(v1, p1)) {
	                v0 = p0;
	                v1 = p1;
	                result = fn(p0, p1);
	            }
	            return result;
	        };
	    }
	    function pureProxy3(fn) {
	        var result;
	        var v0 = UNINITIALIZED;
	        var v1 = UNINITIALIZED;
	        var v2 = UNINITIALIZED;
	        return function (p0, p1, p2) {
	            if (!looseIdentical(v0, p0) || !looseIdentical(v1, p1) || !looseIdentical(v2, p2)) {
	                v0 = p0;
	                v1 = p1;
	                v2 = p2;
	                result = fn(p0, p1, p2);
	            }
	            return result;
	        };
	    }
	    function pureProxy4(fn) {
	        var result;
	        var v0, v1, v2, v3;
	        v0 = v1 = v2 = v3 = UNINITIALIZED;
	        return function (p0, p1, p2, p3) {
	            if (!looseIdentical(v0, p0) || !looseIdentical(v1, p1) || !looseIdentical(v2, p2) ||
	                !looseIdentical(v3, p3)) {
	                v0 = p0;
	                v1 = p1;
	                v2 = p2;
	                v3 = p3;
	                result = fn(p0, p1, p2, p3);
	            }
	            return result;
	        };
	    }
	    function pureProxy5(fn) {
	        var result;
	        var v0, v1, v2, v3, v4;
	        v0 = v1 = v2 = v3 = v4 = UNINITIALIZED;
	        return function (p0, p1, p2, p3, p4) {
	            if (!looseIdentical(v0, p0) || !looseIdentical(v1, p1) || !looseIdentical(v2, p2) ||
	                !looseIdentical(v3, p3) || !looseIdentical(v4, p4)) {
	                v0 = p0;
	                v1 = p1;
	                v2 = p2;
	                v3 = p3;
	                v4 = p4;
	                result = fn(p0, p1, p2, p3, p4);
	            }
	            return result;
	        };
	    }
	    function pureProxy6(fn) {
	        var result;
	        var v0, v1, v2, v3, v4, v5;
	        v0 = v1 = v2 = v3 = v4 = v5 = UNINITIALIZED;
	        return function (p0, p1, p2, p3, p4, p5) {
	            if (!looseIdentical(v0, p0) || !looseIdentical(v1, p1) || !looseIdentical(v2, p2) ||
	                !looseIdentical(v3, p3) || !looseIdentical(v4, p4) || !looseIdentical(v5, p5)) {
	                v0 = p0;
	                v1 = p1;
	                v2 = p2;
	                v3 = p3;
	                v4 = p4;
	                v5 = p5;
	                result = fn(p0, p1, p2, p3, p4, p5);
	            }
	            return result;
	        };
	    }
	    function pureProxy7(fn) {
	        var result;
	        var v0, v1, v2, v3, v4, v5, v6;
	        v0 = v1 = v2 = v3 = v4 = v5 = v6 = UNINITIALIZED;
	        return function (p0, p1, p2, p3, p4, p5, p6) {
	            if (!looseIdentical(v0, p0) || !looseIdentical(v1, p1) || !looseIdentical(v2, p2) ||
	                !looseIdentical(v3, p3) || !looseIdentical(v4, p4) || !looseIdentical(v5, p5) ||
	                !looseIdentical(v6, p6)) {
	                v0 = p0;
	                v1 = p1;
	                v2 = p2;
	                v3 = p3;
	                v4 = p4;
	                v5 = p5;
	                v6 = p6;
	                result = fn(p0, p1, p2, p3, p4, p5, p6);
	            }
	            return result;
	        };
	    }
	    function pureProxy8(fn) {
	        var result;
	        var v0, v1, v2, v3, v4, v5, v6, v7;
	        v0 = v1 = v2 = v3 = v4 = v5 = v6 = v7 = UNINITIALIZED;
	        return function (p0, p1, p2, p3, p4, p5, p6, p7) {
	            if (!looseIdentical(v0, p0) || !looseIdentical(v1, p1) || !looseIdentical(v2, p2) ||
	                !looseIdentical(v3, p3) || !looseIdentical(v4, p4) || !looseIdentical(v5, p5) ||
	                !looseIdentical(v6, p6) || !looseIdentical(v7, p7)) {
	                v0 = p0;
	                v1 = p1;
	                v2 = p2;
	                v3 = p3;
	                v4 = p4;
	                v5 = p5;
	                v6 = p6;
	                v7 = p7;
	                result = fn(p0, p1, p2, p3, p4, p5, p6, p7);
	            }
	            return result;
	        };
	    }
	    function pureProxy9(fn) {
	        var result;
	        var v0, v1, v2, v3, v4, v5, v6, v7, v8;
	        v0 = v1 = v2 = v3 = v4 = v5 = v6 = v7 = v8 = UNINITIALIZED;
	        return function (p0, p1, p2, p3, p4, p5, p6, p7, p8) {
	            if (!looseIdentical(v0, p0) || !looseIdentical(v1, p1) || !looseIdentical(v2, p2) ||
	                !looseIdentical(v3, p3) || !looseIdentical(v4, p4) || !looseIdentical(v5, p5) ||
	                !looseIdentical(v6, p6) || !looseIdentical(v7, p7) || !looseIdentical(v8, p8)) {
	                v0 = p0;
	                v1 = p1;
	                v2 = p2;
	                v3 = p3;
	                v4 = p4;
	                v5 = p5;
	                v6 = p6;
	                v7 = p7;
	                v8 = p8;
	                result = fn(p0, p1, p2, p3, p4, p5, p6, p7, p8);
	            }
	            return result;
	        };
	    }
	    function pureProxy10(fn) {
	        var result;
	        var v0, v1, v2, v3, v4, v5, v6, v7, v8, v9;
	        v0 = v1 = v2 = v3 = v4 = v5 = v6 = v7 = v8 = v9 = UNINITIALIZED;
	        return function (p0, p1, p2, p3, p4, p5, p6, p7, p8, p9) {
	            if (!looseIdentical(v0, p0) || !looseIdentical(v1, p1) || !looseIdentical(v2, p2) ||
	                !looseIdentical(v3, p3) || !looseIdentical(v4, p4) || !looseIdentical(v5, p5) ||
	                !looseIdentical(v6, p6) || !looseIdentical(v7, p7) || !looseIdentical(v8, p8) ||
	                !looseIdentical(v9, p9)) {
	                v0 = p0;
	                v1 = p1;
	                v2 = p2;
	                v3 = p3;
	                v4 = p4;
	                v5 = p5;
	                v6 = p6;
	                v7 = p7;
	                v8 = p8;
	                v9 = p9;
	                result = fn(p0, p1, p2, p3, p4, p5, p6, p7, p8, p9);
	            }
	            return result;
	        };
	    }
	
	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var __extends$5 = (this && this.__extends) || function (d, b) {
	        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	    /**
	     * Represents an instance of a Component created via a {@link ComponentFactory}.
	     *
	     * `ComponentRef` provides access to the Component Instance as well other objects related to this
	     * Component Instance and allows you to destroy the Component Instance via the {@link #destroy}
	     * method.
	     * @stable
	     */
	    var ComponentRef = (function () {
	        function ComponentRef() {
	        }
	        Object.defineProperty(ComponentRef.prototype, "location", {
	            /**
	             * Location of the Host Element of this Component Instance.
	             */
	            get: function () { return unimplemented(); },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(ComponentRef.prototype, "injector", {
	            /**
	             * The injector on which the component instance exists.
	             */
	            get: function () { return unimplemented(); },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(ComponentRef.prototype, "instance", {
	            /**
	             * The instance of the Component.
	             */
	            get: function () { return unimplemented(); },
	            enumerable: true,
	            configurable: true
	        });
	        ;
	        Object.defineProperty(ComponentRef.prototype, "hostView", {
	            /**
	             * The {@link ViewRef} of the Host View of this Component instance.
	             */
	            get: function () { return unimplemented(); },
	            enumerable: true,
	            configurable: true
	        });
	        ;
	        Object.defineProperty(ComponentRef.prototype, "changeDetectorRef", {
	            /**
	             * The {@link ChangeDetectorRef} of the Component instance.
	             */
	            get: function () { return unimplemented(); },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(ComponentRef.prototype, "componentType", {
	            /**
	             * The component type.
	             */
	            get: function () { return unimplemented(); },
	            enumerable: true,
	            configurable: true
	        });
	        return ComponentRef;
	    }());
	    var ComponentRef_ = (function (_super) {
	        __extends$5(ComponentRef_, _super);
	        function ComponentRef_(_hostElement, _componentType) {
	            _super.call(this);
	            this._hostElement = _hostElement;
	            this._componentType = _componentType;
	        }
	        Object.defineProperty(ComponentRef_.prototype, "location", {
	            get: function () { return this._hostElement.elementRef; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(ComponentRef_.prototype, "injector", {
	            get: function () { return this._hostElement.injector; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(ComponentRef_.prototype, "instance", {
	            get: function () { return this._hostElement.component; },
	            enumerable: true,
	            configurable: true
	        });
	        ;
	        Object.defineProperty(ComponentRef_.prototype, "hostView", {
	            get: function () { return this._hostElement.parentView.ref; },
	            enumerable: true,
	            configurable: true
	        });
	        ;
	        Object.defineProperty(ComponentRef_.prototype, "changeDetectorRef", {
	            get: function () { return this._hostElement.parentView.ref; },
	            enumerable: true,
	            configurable: true
	        });
	        ;
	        Object.defineProperty(ComponentRef_.prototype, "componentType", {
	            get: function () { return this._componentType; },
	            enumerable: true,
	            configurable: true
	        });
	        ComponentRef_.prototype.destroy = function () { this._hostElement.parentView.destroy(); };
	        ComponentRef_.prototype.onDestroy = function (callback) { this.hostView.onDestroy(callback); };
	        return ComponentRef_;
	    }(ComponentRef));
	    /**
	     * @experimental
	     */
	    var EMPTY_CONTEXT = new Object();
	    /**
	     * @stable
	     */
	    var ComponentFactory = (function () {
	        function ComponentFactory(selector, _viewFactory, _componentType) {
	            this.selector = selector;
	            this._viewFactory = _viewFactory;
	            this._componentType = _componentType;
	        }
	        Object.defineProperty(ComponentFactory.prototype, "componentType", {
	            get: function () { return this._componentType; },
	            enumerable: true,
	            configurable: true
	        });
	        /**
	         * Creates a new component.
	         */
	        ComponentFactory.prototype.create = function (injector, projectableNodes, rootSelectorOrNode) {
	            if (projectableNodes === void 0) { projectableNodes = null; }
	            if (rootSelectorOrNode === void 0) { rootSelectorOrNode = null; }
	            var vu = injector.get(ViewUtils);
	            if (isBlank(projectableNodes)) {
	                projectableNodes = [];
	            }
	            // Note: Host views don't need a declarationAppElement!
	            var hostView = this._viewFactory(vu, injector, null);
	            var hostElement = hostView.create(EMPTY_CONTEXT, projectableNodes, rootSelectorOrNode);
	            return new ComponentRef_(hostElement, this._componentType);
	        };
	        return ComponentFactory;
	    }());
	
	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var __extends$7 = (this && this.__extends) || function (d, b) {
	        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	    /**
	     * @stable
	     */
	    var NoComponentFactoryError = (function (_super) {
	        __extends$7(NoComponentFactoryError, _super);
	        function NoComponentFactoryError(component) {
	            _super.call(this, "No component factory found for " + stringify(component));
	            this.component = component;
	        }
	        return NoComponentFactoryError;
	    }(BaseError));
	    var _NullComponentFactoryResolver = (function () {
	        function _NullComponentFactoryResolver() {
	        }
	        _NullComponentFactoryResolver.prototype.resolveComponentFactory = function (component) {
	            throw new NoComponentFactoryError(component);
	        };
	        return _NullComponentFactoryResolver;
	    }());
	    /**
	     * @stable
	     */
	    var ComponentFactoryResolver = (function () {
	        function ComponentFactoryResolver() {
	        }
	        ComponentFactoryResolver.NULL = new _NullComponentFactoryResolver();
	        return ComponentFactoryResolver;
	    }());
	    var CodegenComponentFactoryResolver = (function () {
	        function CodegenComponentFactoryResolver(factories, _parent) {
	            this._parent = _parent;
	            this._factories = new Map();
	            for (var i = 0; i < factories.length; i++) {
	                var factory = factories[i];
	                this._factories.set(factory.componentType, factory);
	            }
	        }
	        CodegenComponentFactoryResolver.prototype.resolveComponentFactory = function (component) {
	            var result = this._factories.get(component);
	            if (!result) {
	                result = this._parent.resolveComponentFactory(component);
	            }
	            return result;
	        };
	        return CodegenComponentFactoryResolver;
	    }());
	
	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var __extends$8 = (this && this.__extends) || function (d, b) {
	        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	    /**
	     * Use by directives and components to emit custom Events.
	     *
	     * ### Examples
	     *
	     * In the following example, `Zippy` alternatively emits `open` and `close` events when its
	     * title gets clicked:
	     *
	     * ```
	     * @Component({
	     *   selector: 'zippy',
	     *   template: `
	     *   <div class="zippy">
	     *     <div (click)="toggle()">Toggle</div>
	     *     <div [hidden]="!visible">
	     *       <ng-content></ng-content>
	     *     </div>
	     *  </div>`})
	     * export class Zippy {
	     *   visible: boolean = true;
	     *   @Output() open: EventEmitter<any> = new EventEmitter();
	     *   @Output() close: EventEmitter<any> = new EventEmitter();
	     *
	     *   toggle() {
	     *     this.visible = !this.visible;
	     *     if (this.visible) {
	     *       this.open.emit(null);
	     *     } else {
	     *       this.close.emit(null);
	     *     }
	     *   }
	     * }
	     * ```
	     *
	     * The events payload can be accessed by the parameter `$event` on the components output event
	     * handler:
	     *
	     * ```
	     * <zippy (open)="onOpen($event)" (close)="onClose($event)"></zippy>
	     * ```
	     *
	     * Uses Rx.Observable but provides an adapter to make it work as specified here:
	     * https://github.com/jhusain/observable-spec
	     *
	     * Once a reference implementation of the spec is available, switch to it.
	     * @stable
	     */
	    var EventEmitter = (function (_super) {
	        __extends$8(EventEmitter, _super);
	        /**
	         * Creates an instance of [EventEmitter], which depending on [isAsync],
	         * delivers events synchronously or asynchronously.
	         */
	        function EventEmitter(isAsync) {
	            if (isAsync === void 0) { isAsync = false; }
	            _super.call(this);
	            this.__isAsync = isAsync;
	        }
	        EventEmitter.prototype.emit = function (value) { _super.prototype.next.call(this, value); };
	        EventEmitter.prototype.subscribe = function (generatorOrNext, error, complete) {
	            var schedulerFn;
	            var errorFn = function (err) { return null; };
	            var completeFn = function () { return null; };
	            if (generatorOrNext && typeof generatorOrNext === 'object') {
	                schedulerFn = this.__isAsync ? function (value /** TODO #9100 */) {
	                    setTimeout(function () { return generatorOrNext.next(value); });
	                } : function (value /** TODO #9100 */) { generatorOrNext.next(value); };
	                if (generatorOrNext.error) {
	                    errorFn = this.__isAsync ? function (err) { setTimeout(function () { return generatorOrNext.error(err); }); } :
	                        function (err) { generatorOrNext.error(err); };
	                }
	                if (generatorOrNext.complete) {
	                    completeFn = this.__isAsync ? function () { setTimeout(function () { return generatorOrNext.complete(); }); } :
	                        function () { generatorOrNext.complete(); };
	                }
	            }
	            else {
	                schedulerFn = this.__isAsync ? function (value /** TODO #9100 */) {
	                    setTimeout(function () { return generatorOrNext(value); });
	                } : function (value /** TODO #9100 */) { generatorOrNext(value); };
	                if (error) {
	                    errorFn =
	                        this.__isAsync ? function (err) { setTimeout(function () { return error(err); }); } : function (err) { error(err); };
	                }
	                if (complete) {
	                    completeFn =
	                        this.__isAsync ? function () { setTimeout(function () { return complete(); }); } : function () { complete(); };
	                }
	            }
	            return _super.prototype.subscribe.call(this, schedulerFn, errorFn, completeFn);
	        };
	        return EventEmitter;
	    }(rxjs_Subject.Subject));
	
	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var NgZoneImpl = (function () {
	        function NgZoneImpl(_a) {
	            var _this = this;
	            var trace = _a.trace, onEnter = _a.onEnter, onLeave = _a.onLeave, setMicrotask = _a.setMicrotask, setMacrotask = _a.setMacrotask, onError = _a.onError;
	            this.onEnter = onEnter;
	            this.onLeave = onLeave;
	            this.setMicrotask = setMicrotask;
	            this.setMacrotask = setMacrotask;
	            this.onError = onError;
	            if (typeof Zone == 'undefined') {
	                throw new Error('Angular requires Zone.js prolyfill.');
	            }
	            Zone.assertZonePatched();
	            this.outer = this.inner = Zone.current;
	            if (Zone['wtfZoneSpec']) {
	                this.inner = this.inner.fork(Zone['wtfZoneSpec']);
	            }
	            if (trace && Zone['longStackTraceZoneSpec']) {
	                this.inner = this.inner.fork(Zone['longStackTraceZoneSpec']);
	            }
	            this.inner = this.inner.fork({
	                name: 'angular',
	                properties: { 'isAngularZone': true },
	                onInvokeTask: function (delegate, current, target, task, applyThis, applyArgs) {
	                    try {
	                        _this.onEnter();
	                        return delegate.invokeTask(target, task, applyThis, applyArgs);
	                    }
	                    finally {
	                        _this.onLeave();
	                    }
	                },
	                onInvoke: function (delegate, current, target, callback, applyThis, applyArgs, source) {
	                    try {
	                        _this.onEnter();
	                        return delegate.invoke(target, callback, applyThis, applyArgs, source);
	                    }
	                    finally {
	                        _this.onLeave();
	                    }
	                },
	                onHasTask: function (delegate, current, target, hasTaskState) {
	                    delegate.hasTask(target, hasTaskState);
	                    if (current === target) {
	                        // We are only interested in hasTask events which originate from our zone
	                        // (A child hasTask event is not interesting to us)
	                        if (hasTaskState.change == 'microTask') {
	                            _this.setMicrotask(hasTaskState.microTask);
	                        }
	                        else if (hasTaskState.change == 'macroTask') {
	                            _this.setMacrotask(hasTaskState.macroTask);
	                        }
	                    }
	                },
	                onHandleError: function (delegate, current, target, error) {
	                    delegate.handleError(target, error);
	                    _this.onError(error);
	                    return false;
	                }
	            });
	        }
	        NgZoneImpl.isInAngularZone = function () { return Zone.current.get('isAngularZone') === true; };
	        NgZoneImpl.prototype.runInner = function (fn) { return this.inner.run(fn); };
	        ;
	        NgZoneImpl.prototype.runInnerGuarded = function (fn) { return this.inner.runGuarded(fn); };
	        ;
	        NgZoneImpl.prototype.runOuter = function (fn) { return this.outer.run(fn); };
	        ;
	        return NgZoneImpl;
	    }());
	
	    /**
	     * An injectable service for executing work inside or outside of the Angular zone.
	     *
	     * The most common use of this service is to optimize performance when starting a work consisting of
	     * one or more asynchronous tasks that don't require UI updates or error handling to be handled by
	     * Angular. Such tasks can be kicked off via {@link #runOutsideAngular} and if needed, these tasks
	     * can reenter the Angular zone via {@link #run}.
	     *
	     * <!-- TODO: add/fix links to:
	     *   - docs explaining zones and the use of zones in Angular and change-detection
	     *   - link to runOutsideAngular/run (throughout this file!)
	     *   -->
	     *
	     * ### Example ([live demo](http://plnkr.co/edit/lY9m8HLy7z06vDoUaSN2?p=preview))
	     * ```
	     * import {Component, View, NgZone} from '@angular/core';
	     * import {NgIf} from '@angular/common';
	     *
	     * @Component({
	     *   selector: 'ng-zone-demo'.
	     *   template: `
	     *     <h2>Demo: NgZone</h2>
	     *
	     *     <p>Progress: {{progress}}%</p>
	     *     <p *ngIf="progress >= 100">Done processing {{label}} of Angular zone!</p>
	     *
	     *     <button (click)="processWithinAngularZone()">Process within Angular zone</button>
	     *     <button (click)="processOutsideOfAngularZone()">Process outside of Angular zone</button>
	     *   `,
	     *   directives: [NgIf]
	     * })
	     * export class NgZoneDemo {
	     *   progress: number = 0;
	     *   label: string;
	     *
	     *   constructor(private _ngZone: NgZone) {}
	     *
	     *   // Loop inside the Angular zone
	     *   // so the UI DOES refresh after each setTimeout cycle
	     *   processWithinAngularZone() {
	     *     this.label = 'inside';
	     *     this.progress = 0;
	     *     this._increaseProgress(() => console.log('Inside Done!'));
	     *   }
	     *
	     *   // Loop outside of the Angular zone
	     *   // so the UI DOES NOT refresh after each setTimeout cycle
	     *   processOutsideOfAngularZone() {
	     *     this.label = 'outside';
	     *     this.progress = 0;
	     *     this._ngZone.runOutsideAngular(() => {
	     *       this._increaseProgress(() => {
	     *       // reenter the Angular zone and display done
	     *       this._ngZone.run(() => {console.log('Outside Done!') });
	     *     }}));
	     *   }
	     *
	     *
	     *   _increaseProgress(doneCallback: () => void) {
	     *     this.progress += 1;
	     *     console.log(`Current progress: ${this.progress}%`);
	     *
	     *     if (this.progress < 100) {
	     *       window.setTimeout(() => this._increaseProgress(doneCallback)), 10)
	     *     } else {
	     *       doneCallback();
	     *     }
	     *   }
	     * }
	     * ```
	     * @experimental
	     */
	    var NgZone = (function () {
	        function NgZone(_a) {
	            var _this = this;
	            var _b = _a.enableLongStackTrace, enableLongStackTrace = _b === void 0 ? false : _b;
	            this._hasPendingMicrotasks = false;
	            this._hasPendingMacrotasks = false;
	            /** @internal */
	            this._isStable = true;
	            /** @internal */
	            this._nesting = 0;
	            /** @internal */
	            this._onUnstable = new EventEmitter(false);
	            /** @internal */
	            this._onMicrotaskEmpty = new EventEmitter(false);
	            /** @internal */
	            this._onStable = new EventEmitter(false);
	            /** @internal */
	            this._onErrorEvents = new EventEmitter(false);
	            this._zoneImpl = new NgZoneImpl({
	                trace: enableLongStackTrace,
	                onEnter: function () {
	                    // console.log('ZONE.enter', this._nesting, this._isStable);
	                    _this._nesting++;
	                    if (_this._isStable) {
	                        _this._isStable = false;
	                        _this._onUnstable.emit(null);
	                    }
	                },
	                onLeave: function () {
	                    _this._nesting--;
	                    // console.log('ZONE.leave', this._nesting, this._isStable);
	                    _this._checkStable();
	                },
	                setMicrotask: function (hasMicrotasks) {
	                    _this._hasPendingMicrotasks = hasMicrotasks;
	                    _this._checkStable();
	                },
	                setMacrotask: function (hasMacrotasks) { _this._hasPendingMacrotasks = hasMacrotasks; },
	                onError: function (error) { return _this._onErrorEvents.emit(error); }
	            });
	        }
	        NgZone.isInAngularZone = function () { return NgZoneImpl.isInAngularZone(); };
	        NgZone.assertInAngularZone = function () {
	            if (!NgZoneImpl.isInAngularZone()) {
	                throw new Error('Expected to be in Angular Zone, but it is not!');
	            }
	        };
	        NgZone.assertNotInAngularZone = function () {
	            if (NgZoneImpl.isInAngularZone()) {
	                throw new Error('Expected to not be in Angular Zone, but it is!');
	            }
	        };
	        NgZone.prototype._checkStable = function () {
	            var _this = this;
	            if (this._nesting == 0) {
	                if (!this._hasPendingMicrotasks && !this._isStable) {
	                    try {
	                        // console.log('ZONE.microtaskEmpty');
	                        this._nesting++;
	                        this._onMicrotaskEmpty.emit(null);
	                    }
	                    finally {
	                        this._nesting--;
	                        if (!this._hasPendingMicrotasks) {
	                            try {
	                                // console.log('ZONE.stable', this._nesting, this._isStable);
	                                this.runOutsideAngular(function () { return _this._onStable.emit(null); });
	                            }
	                            finally {
	                                this._isStable = true;
	                            }
	                        }
	                    }
	                }
	            }
	        };
	        ;
	        Object.defineProperty(NgZone.prototype, "onUnstable", {
	            /**
	             * Notifies when code enters Angular Zone. This gets fired first on VM Turn.
	             */
	            get: function () { return this._onUnstable; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(NgZone.prototype, "onMicrotaskEmpty", {
	            /**
	             * Notifies when there is no more microtasks enqueue in the current VM Turn.
	             * This is a hint for Angular to do change detection, which may enqueue more microtasks.
	             * For this reason this event can fire multiple times per VM Turn.
	             */
	            get: function () { return this._onMicrotaskEmpty; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(NgZone.prototype, "onStable", {
	            /**
	             * Notifies when the last `onMicrotaskEmpty` has run and there are no more microtasks, which
	             * implies we are about to relinquish VM turn.
	             * This event gets called just once.
	             */
	            get: function () { return this._onStable; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(NgZone.prototype, "onError", {
	            /**
	             * Notify that an error has been delivered.
	             */
	            get: function () { return this._onErrorEvents; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(NgZone.prototype, "isStable", {
	            /**
	             * Whether there are no outstanding microtasks or microtasks.
	             */
	            get: function () { return this._isStable; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(NgZone.prototype, "hasPendingMicrotasks", {
	            /**
	             * Whether there are any outstanding microtasks.
	             */
	            get: function () { return this._hasPendingMicrotasks; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(NgZone.prototype, "hasPendingMacrotasks", {
	            /**
	             * Whether there are any outstanding microtasks.
	             */
	            get: function () { return this._hasPendingMacrotasks; },
	            enumerable: true,
	            configurable: true
	        });
	        /**
	         * Executes the `fn` function synchronously within the Angular zone and returns value returned by
	         * the function.
	         *
	         * Running functions via `run` allows you to reenter Angular zone from a task that was executed
	         * outside of the Angular zone (typically started via {@link #runOutsideAngular}).
	         *
	         * Any future tasks or microtasks scheduled from within this function will continue executing from
	         * within the Angular zone.
	         *
	         * If a synchronous error happens it will be rethrown and not reported via `onError`.
	         */
	        NgZone.prototype.run = function (fn) { return this._zoneImpl.runInner(fn); };
	        /**
	         * Same as #run, except that synchronous errors are caught and forwarded
	         * via `onError` and not rethrown.
	         */
	        NgZone.prototype.runGuarded = function (fn) { return this._zoneImpl.runInnerGuarded(fn); };
	        /**
	         * Executes the `fn` function synchronously in Angular's parent zone and returns value returned by
	         * the function.
	         *
	         * Running functions via `runOutsideAngular` allows you to escape Angular's zone and do work that
	         * doesn't trigger Angular change-detection or is subject to Angular's error handling.
	         *
	         * Any future tasks or microtasks scheduled from within this function will continue executing from
	         * outside of the Angular zone.
	         *
	         * Use {@link #run} to reenter the Angular zone and do work that updates the application model.
	         */
	        NgZone.prototype.runOutsideAngular = function (fn) { return this._zoneImpl.runOuter(fn); };
	        return NgZone;
	    }());
	
	    /**
	     * The Testability service provides testing hooks that can be accessed from
	     * the browser and by services such as Protractor. Each bootstrapped Angular
	     * application on the page will have an instance of Testability.
	     * @experimental
	     */
	    var Testability = (function () {
	        function Testability(_ngZone) {
	            this._ngZone = _ngZone;
	            /** @internal */
	            this._pendingCount = 0;
	            /** @internal */
	            this._isZoneStable = true;
	            /**
	             * Whether any work was done since the last 'whenStable' callback. This is
	             * useful to detect if this could have potentially destabilized another
	             * component while it is stabilizing.
	             * @internal
	             */
	            this._didWork = false;
	            /** @internal */
	            this._callbacks = [];
	            this._watchAngularEvents();
	        }
	        /** @internal */
	        Testability.prototype._watchAngularEvents = function () {
	            var _this = this;
	            this._ngZone.onUnstable.subscribe({
	                next: function () {
	                    _this._didWork = true;
	                    _this._isZoneStable = false;
	                }
	            });
	            this._ngZone.runOutsideAngular(function () {
	                _this._ngZone.onStable.subscribe({
	                    next: function () {
	                        NgZone.assertNotInAngularZone();
	                        scheduleMicroTask(function () {
	                            _this._isZoneStable = true;
	                            _this._runCallbacksIfReady();
	                        });
	                    }
	                });
	            });
	        };
	        Testability.prototype.increasePendingRequestCount = function () {
	            this._pendingCount += 1;
	            this._didWork = true;
	            return this._pendingCount;
	        };
	        Testability.prototype.decreasePendingRequestCount = function () {
	            this._pendingCount -= 1;
	            if (this._pendingCount < 0) {
	                throw new Error('pending async requests below zero');
	            }
	            this._runCallbacksIfReady();
	            return this._pendingCount;
	        };
	        Testability.prototype.isStable = function () {
	            return this._isZoneStable && this._pendingCount == 0 && !this._ngZone.hasPendingMacrotasks;
	        };
	        /** @internal */
	        Testability.prototype._runCallbacksIfReady = function () {
	            var _this = this;
	            if (this.isStable()) {
	                // Schedules the call backs in a new frame so that it is always async.
	                scheduleMicroTask(function () {
	                    while (_this._callbacks.length !== 0) {
	                        (_this._callbacks.pop())(_this._didWork);
	                    }
	                    _this._didWork = false;
	                });
	            }
	            else {
	                // Not Ready
	                this._didWork = true;
	            }
	        };
	        Testability.prototype.whenStable = function (callback) {
	            this._callbacks.push(callback);
	            this._runCallbacksIfReady();
	        };
	        Testability.prototype.getPendingRequestCount = function () { return this._pendingCount; };
	        Testability.prototype.findBindings = function (using, provider, exactMatch) {
	            // TODO(juliemr): implement.
	            return [];
	        };
	        Testability.prototype.findProviders = function (using, provider, exactMatch) {
	            // TODO(juliemr): implement.
	            return [];
	        };
	        Testability.decorators = [
	            { type: Injectable },
	        ];
	        /** @nocollapse */
	        Testability.ctorParameters = [
	            { type: NgZone, },
	        ];
	        return Testability;
	    }());
	    /**
	     * A global registry of {@link Testability} instances for specific elements.
	     * @experimental
	     */
	    var TestabilityRegistry = (function () {
	        function TestabilityRegistry() {
	            /** @internal */
	            this._applications = new Map$1();
	            _testabilityGetter.addToWindow(this);
	        }
	        TestabilityRegistry.prototype.registerApplication = function (token, testability) {
	            this._applications.set(token, testability);
	        };
	        TestabilityRegistry.prototype.getTestability = function (elem) { return this._applications.get(elem); };
	        TestabilityRegistry.prototype.getAllTestabilities = function () { return MapWrapper.values(this._applications); };
	        TestabilityRegistry.prototype.getAllRootElements = function () { return MapWrapper.keys(this._applications); };
	        TestabilityRegistry.prototype.findTestabilityInTree = function (elem, findInAncestors) {
	            if (findInAncestors === void 0) { findInAncestors = true; }
	            return _testabilityGetter.findTestabilityInTree(this, elem, findInAncestors);
	        };
	        TestabilityRegistry.decorators = [
	            { type: Injectable },
	        ];
	        /** @nocollapse */
	        TestabilityRegistry.ctorParameters = [];
	        return TestabilityRegistry;
	    }());
	    var _NoopGetTestability = (function () {
	        function _NoopGetTestability() {
	        }
	        _NoopGetTestability.prototype.addToWindow = function (registry) { };
	        _NoopGetTestability.prototype.findTestabilityInTree = function (registry, elem, findInAncestors) {
	            return null;
	        };
	        return _NoopGetTestability;
	    }());
	    /**
	     * Set the {@link GetTestability} implementation used by the Angular testing framework.
	     * @experimental
	     */
	    function setTestabilityGetter(getter) {
	        _testabilityGetter = getter;
	    }
	    var _testabilityGetter = new _NoopGetTestability();
	
	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var __extends$3 = (this && this.__extends) || function (d, b) {
	        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	    var _devMode = true;
	    var _runModeLocked = false;
	    var _platform;
	    /**
	     * Disable Angular's development mode, which turns off assertions and other
	     * checks within the framework.
	     *
	     * One important assertion this disables verifies that a change detection pass
	     * does not result in additional changes to any bindings (also known as
	     * unidirectional data flow).
	     *
	     * @stable
	     */
	    function enableProdMode() {
	        if (_runModeLocked) {
	            throw new Error('Cannot enable prod mode after platform setup.');
	        }
	        _devMode = false;
	    }
	    /**
	     * Returns whether Angular is in development mode. After called once,
	     * the value is locked and won't change any more.
	     *
	     * By default, this is true, unless a user calls `enableProdMode` before calling this.
	     *
	     * @experimental APIs related to application bootstrap are currently under review.
	     */
	    function isDevMode() {
	        _runModeLocked = true;
	        return _devMode;
	    }
	    /**
	     * Creates a platform.
	     * Platforms have to be eagerly created via this function.
	     *
	     * @experimental APIs related to application bootstrap are currently under review.
	     */
	    function createPlatform(injector) {
	        if (isPresent(_platform) && !_platform.destroyed) {
	            throw new Error('There can be only one platform. Destroy the previous one to create a new one.');
	        }
	        _platform = injector.get(PlatformRef);
	        var inits = injector.get(PLATFORM_INITIALIZER, null);
	        if (isPresent(inits))
	            inits.forEach(function (init) { return init(); });
	        return _platform;
	    }
	    /**
	     * Creates a factory for a platform
	     *
	     * @experimental APIs related to application bootstrap are currently under review.
	     */
	    function createPlatformFactory(parentPlaformFactory, name, providers) {
	        if (providers === void 0) { providers = []; }
	        var marker = new OpaqueToken("Platform: " + name);
	        return function (extraProviders) {
	            if (extraProviders === void 0) { extraProviders = []; }
	            if (!getPlatform()) {
	                if (parentPlaformFactory) {
	                    parentPlaformFactory(providers.concat(extraProviders).concat({ provide: marker, useValue: true }));
	                }
	                else {
	                    createPlatform(ReflectiveInjector.resolveAndCreate(providers.concat(extraProviders).concat({ provide: marker, useValue: true })));
	                }
	            }
	            return assertPlatform(marker);
	        };
	    }
	    /**
	     * Checks that there currently is a platform
	     * which contains the given token as a provider.
	     *
	     * @experimental APIs related to application bootstrap are currently under review.
	     */
	    function assertPlatform(requiredToken) {
	        var platform = getPlatform();
	        if (isBlank(platform)) {
	            throw new Error('No platform exists!');
	        }
	        if (isPresent(platform) && isBlank(platform.injector.get(requiredToken, null))) {
	            throw new Error('A platform with a different configuration has been created. Please destroy it first.');
	        }
	        return platform;
	    }
	    /**
	     * Destroy the existing platform.
	     *
	     * @experimental APIs related to application bootstrap are currently under review.
	     */
	    function destroyPlatform() {
	        if (isPresent(_platform) && !_platform.destroyed) {
	            _platform.destroy();
	        }
	    }
	    /**
	     * Returns the current platform.
	     *
	     * @experimental APIs related to application bootstrap are currently under review.
	     */
	    function getPlatform() {
	        return isPresent(_platform) && !_platform.destroyed ? _platform : null;
	    }
	    /**
	     * The Angular platform is the entry point for Angular on a web page. Each page
	     * has exactly one platform, and services (such as reflection) which are common
	     * to every Angular application running on the page are bound in its scope.
	     *
	     * A page's platform is initialized implicitly when {@link bootstrap}() is called, or
	     * explicitly by calling {@link createPlatform}().
	     *
	     * @stable
	     */
	    var PlatformRef = (function () {
	        function PlatformRef() {
	        }
	        /**
	         * Creates an instance of an `@NgModule` for the given platform
	         * for offline compilation.
	         *
	         * ## Simple Example
	         *
	         * ```typescript
	         * my_module.ts:
	         *
	         * @NgModule({
	         *   imports: [BrowserModule]
	         * })
	         * class MyModule {}
	         *
	         * main.ts:
	         * import {MyModuleNgFactory} from './my_module.ngfactory';
	         * import {platformBrowser} from '@angular/platform-browser';
	         *
	         * let moduleRef = platformBrowser().bootstrapModuleFactory(MyModuleNgFactory);
	         * ```
	         *
	         * @experimental APIs related to application bootstrap are currently under review.
	         */
	        PlatformRef.prototype.bootstrapModuleFactory = function (moduleFactory) {
	            throw unimplemented();
	        };
	        /**
	         * Creates an instance of an `@NgModule` for a given platform using the given runtime compiler.
	         *
	         * ## Simple Example
	         *
	         * ```typescript
	         * @NgModule({
	         *   imports: [BrowserModule]
	         * })
	         * class MyModule {}
	         *
	         * let moduleRef = platformBrowser().bootstrapModule(MyModule);
	         * ```
	         * @stable
	         */
	        PlatformRef.prototype.bootstrapModule = function (moduleType, compilerOptions) {
	            if (compilerOptions === void 0) { compilerOptions = []; }
	            throw unimplemented();
	        };
	        Object.defineProperty(PlatformRef.prototype, "injector", {
	            /**
	             * Retrieve the platform {@link Injector}, which is the parent injector for
	             * every Angular application on the page and provides singleton providers.
	             */
	            get: function () { throw unimplemented(); },
	            enumerable: true,
	            configurable: true
	        });
	        ;
	        Object.defineProperty(PlatformRef.prototype, "destroyed", {
	            get: function () { throw unimplemented(); },
	            enumerable: true,
	            configurable: true
	        });
	        return PlatformRef;
	    }());
	    function _callAndReportToErrorHandler(errorHandler, callback) {
	        try {
	            var result = callback();
	            if (isPromise(result)) {
	                return result.catch(function (e) {
	                    errorHandler.handleError(e);
	                    // rethrow as the exception handler might not do it
	                    throw e;
	                });
	            }
	            else {
	                return result;
	            }
	        }
	        catch (e) {
	            errorHandler.handleError(e);
	            // rethrow as the exception handler might not do it
	            throw e;
	        }
	    }
	    var PlatformRef_ = (function (_super) {
	        __extends$3(PlatformRef_, _super);
	        function PlatformRef_(_injector) {
	            _super.call(this);
	            this._injector = _injector;
	            this._modules = [];
	            this._destroyListeners = [];
	            this._destroyed = false;
	        }
	        PlatformRef_.prototype.onDestroy = function (callback) { this._destroyListeners.push(callback); };
	        Object.defineProperty(PlatformRef_.prototype, "injector", {
	            get: function () { return this._injector; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(PlatformRef_.prototype, "destroyed", {
	            get: function () { return this._destroyed; },
	            enumerable: true,
	            configurable: true
	        });
	        PlatformRef_.prototype.destroy = function () {
	            if (this._destroyed) {
	                throw new Error('The platform has already been destroyed!');
	            }
	            ListWrapper.clone(this._modules).forEach(function (app) { return app.destroy(); });
	            this._destroyListeners.forEach(function (dispose) { return dispose(); });
	            this._destroyed = true;
	        };
	        PlatformRef_.prototype.bootstrapModuleFactory = function (moduleFactory) {
	            return this._bootstrapModuleFactoryWithZone(moduleFactory, null);
	        };
	        PlatformRef_.prototype._bootstrapModuleFactoryWithZone = function (moduleFactory, ngZone) {
	            var _this = this;
	            // Note: We need to create the NgZone _before_ we instantiate the module,
	            // as instantiating the module creates some providers eagerly.
	            // So we create a mini parent injector that just contains the new NgZone and
	            // pass that as parent to the NgModuleFactory.
	            if (!ngZone)
	                ngZone = new NgZone({ enableLongStackTrace: isDevMode() });
	            // Attention: Don't use ApplicationRef.run here,
	            // as we want to be sure that all possible constructor calls are inside `ngZone.run`!
	            return ngZone.run(function () {
	                var ngZoneInjector = ReflectiveInjector.resolveAndCreate([{ provide: NgZone, useValue: ngZone }], _this.injector);
	                var moduleRef = moduleFactory.create(ngZoneInjector);
	                var exceptionHandler = moduleRef.injector.get(ErrorHandler, null);
	                if (!exceptionHandler) {
	                    throw new Error('No ErrorHandler. Is platform module (BrowserModule) included?');
	                }
	                moduleRef.onDestroy(function () { return ListWrapper.remove(_this._modules, moduleRef); });
	                ngZone.onError.subscribe({ next: function (error) { exceptionHandler.handleError(error); } });
	                return _callAndReportToErrorHandler(exceptionHandler, function () {
	                    var initStatus = moduleRef.injector.get(ApplicationInitStatus);
	                    return initStatus.donePromise.then(function () {
	                        _this._moduleDoBootstrap(moduleRef);
	                        return moduleRef;
	                    });
	                });
	            });
	        };
	        PlatformRef_.prototype.bootstrapModule = function (moduleType, compilerOptions) {
	            if (compilerOptions === void 0) { compilerOptions = []; }
	            return this._bootstrapModuleWithZone(moduleType, compilerOptions, null);
	        };
	        PlatformRef_.prototype._bootstrapModuleWithZone = function (moduleType, compilerOptions, ngZone, componentFactoryCallback) {
	            var _this = this;
	            if (compilerOptions === void 0) { compilerOptions = []; }
	            var compilerFactory = this.injector.get(CompilerFactory);
	            var compiler = compilerFactory.createCompiler(compilerOptions instanceof Array ? compilerOptions : [compilerOptions]);
	            // ugly internal api hack: generate host component factories for all declared components and
	            // pass the factories into the callback - this is used by UpdateAdapter to get hold of all
	            // factories.
	            if (componentFactoryCallback) {
	                return compiler.compileModuleAndAllComponentsAsync(moduleType)
	                    .then(function (_a) {
	                    var ngModuleFactory = _a.ngModuleFactory, componentFactories = _a.componentFactories;
	                    componentFactoryCallback(componentFactories);
	                    return _this._bootstrapModuleFactoryWithZone(ngModuleFactory, ngZone);
	                });
	            }
	            return compiler.compileModuleAsync(moduleType)
	                .then(function (moduleFactory) { return _this._bootstrapModuleFactoryWithZone(moduleFactory, ngZone); });
	        };
	        PlatformRef_.prototype._moduleDoBootstrap = function (moduleRef) {
	            var appRef = moduleRef.injector.get(ApplicationRef);
	            if (moduleRef.bootstrapFactories.length > 0) {
	                moduleRef.bootstrapFactories.forEach(function (compFactory) { return appRef.bootstrap(compFactory); });
	            }
	            else if (moduleRef.instance.ngDoBootstrap) {
	                moduleRef.instance.ngDoBootstrap(appRef);
	            }
	            else {
	                throw new Error(("The module " + stringify(moduleRef.instance.constructor) + " was bootstrapped, but it does not declare \"@NgModule.bootstrap\" components nor a \"ngDoBootstrap\" method. ") +
	                    "Please define one of these.");
	            }
	        };
	        PlatformRef_.decorators = [
	            { type: Injectable },
	        ];
	        /** @nocollapse */
	        PlatformRef_.ctorParameters = [
	            { type: Injector, },
	        ];
	        return PlatformRef_;
	    }(PlatformRef));
	    /**
	     * A reference to an Angular application running on a page.
	     *
	     * For more about Angular applications, see the documentation for {@link bootstrap}.
	     *
	     * @stable
	     */
	    var ApplicationRef = (function () {
	        function ApplicationRef() {
	        }
	        Object.defineProperty(ApplicationRef.prototype, "componentTypes", {
	            /**
	             * Get a list of component types registered to this application.
	             * This list is populated even before the component is created.
	             */
	            get: function () { return unimplemented(); },
	            enumerable: true,
	            configurable: true
	        });
	        ;
	        Object.defineProperty(ApplicationRef.prototype, "components", {
	            /**
	             * Get a list of components registered to this application.
	             */
	            get: function () { return unimplemented(); },
	            enumerable: true,
	            configurable: true
	        });
	        ;
	        return ApplicationRef;
	    }());
	    var ApplicationRef_ = (function (_super) {
	        __extends$3(ApplicationRef_, _super);
	        function ApplicationRef_(_zone, _console, _injector, _exceptionHandler, _componentFactoryResolver, _initStatus, _testabilityRegistry, _testability) {
	            var _this = this;
	            _super.call(this);
	            this._zone = _zone;
	            this._console = _console;
	            this._injector = _injector;
	            this._exceptionHandler = _exceptionHandler;
	            this._componentFactoryResolver = _componentFactoryResolver;
	            this._initStatus = _initStatus;
	            this._testabilityRegistry = _testabilityRegistry;
	            this._testability = _testability;
	            this._bootstrapListeners = [];
	            this._rootComponents = [];
	            this._rootComponentTypes = [];
	            this._changeDetectorRefs = [];
	            this._runningTick = false;
	            this._enforceNoNewChanges = false;
	            this._enforceNoNewChanges = isDevMode();
	            this._zone.onMicrotaskEmpty.subscribe({ next: function () { _this._zone.run(function () { _this.tick(); }); } });
	        }
	        ApplicationRef_.prototype.registerChangeDetector = function (changeDetector) {
	            this._changeDetectorRefs.push(changeDetector);
	        };
	        ApplicationRef_.prototype.unregisterChangeDetector = function (changeDetector) {
	            ListWrapper.remove(this._changeDetectorRefs, changeDetector);
	        };
	        ApplicationRef_.prototype.bootstrap = function (componentOrFactory) {
	            var _this = this;
	            if (!this._initStatus.done) {
	                throw new Error('Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module.');
	            }
	            var componentFactory;
	            if (componentOrFactory instanceof ComponentFactory) {
	                componentFactory = componentOrFactory;
	            }
	            else {
	                componentFactory = this._componentFactoryResolver.resolveComponentFactory(componentOrFactory);
	            }
	            this._rootComponentTypes.push(componentFactory.componentType);
	            var compRef = componentFactory.create(this._injector, [], componentFactory.selector);
	            compRef.onDestroy(function () { _this._unloadComponent(compRef); });
	            var testability = compRef.injector.get(Testability, null);
	            if (isPresent(testability)) {
	                compRef.injector.get(TestabilityRegistry)
	                    .registerApplication(compRef.location.nativeElement, testability);
	            }
	            this._loadComponent(compRef);
	            if (isDevMode()) {
	                this._console.log("Angular 2 is running in the development mode. Call enableProdMode() to enable the production mode.");
	            }
	            return compRef;
	        };
	        /** @internal */
	        ApplicationRef_.prototype._loadComponent = function (componentRef) {
	            this._changeDetectorRefs.push(componentRef.changeDetectorRef);
	            this.tick();
	            this._rootComponents.push(componentRef);
	            // Get the listeners lazily to prevent DI cycles.
	            var listeners = this._injector.get(APP_BOOTSTRAP_LISTENER, [])
	                .concat(this._bootstrapListeners);
	            listeners.forEach(function (listener) { return listener(componentRef); });
	        };
	        /** @internal */
	        ApplicationRef_.prototype._unloadComponent = function (componentRef) {
	            if (!ListWrapper.contains(this._rootComponents, componentRef)) {
	                return;
	            }
	            this.unregisterChangeDetector(componentRef.changeDetectorRef);
	            ListWrapper.remove(this._rootComponents, componentRef);
	        };
	        ApplicationRef_.prototype.tick = function () {
	            if (this._runningTick) {
	                throw new Error('ApplicationRef.tick is called recursively');
	            }
	            var s = ApplicationRef_._tickScope();
	            try {
	                this._runningTick = true;
	                this._changeDetectorRefs.forEach(function (detector) { return detector.detectChanges(); });
	                if (this._enforceNoNewChanges) {
	                    this._changeDetectorRefs.forEach(function (detector) { return detector.checkNoChanges(); });
	                }
	            }
	            finally {
	                this._runningTick = false;
	                wtfLeave(s);
	            }
	        };
	        ApplicationRef_.prototype.ngOnDestroy = function () {
	            // TODO(alxhub): Dispose of the NgZone.
	            ListWrapper.clone(this._rootComponents).forEach(function (ref) { return ref.destroy(); });
	        };
	        Object.defineProperty(ApplicationRef_.prototype, "componentTypes", {
	            get: function () { return this._rootComponentTypes; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(ApplicationRef_.prototype, "components", {
	            get: function () { return this._rootComponents; },
	            enumerable: true,
	            configurable: true
	        });
	        /** @internal */
	        ApplicationRef_._tickScope = wtfCreateScope('ApplicationRef#tick()');
	        ApplicationRef_.decorators = [
	            { type: Injectable },
	        ];
	        /** @nocollapse */
	        ApplicationRef_.ctorParameters = [
	            { type: NgZone, },
	            { type: Console, },
	            { type: Injector, },
	            { type: ErrorHandler, },
	            { type: ComponentFactoryResolver, },
	            { type: ApplicationInitStatus, },
	            { type: TestabilityRegistry, decorators: [{ type: Optional },] },
	            { type: Testability, decorators: [{ type: Optional },] },
	        ];
	        return ApplicationRef_;
	    }(ApplicationRef));
	
	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var __extends$9 = (this && this.__extends) || function (d, b) {
	        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	    /**
	     * Represents an instance of an NgModule created via a {@link NgModuleFactory}.
	     *
	     * `NgModuleRef` provides access to the NgModule Instance as well other objects related to this
	     * NgModule Instance.
	     *
	     * @stable
	     */
	    var NgModuleRef = (function () {
	        function NgModuleRef() {
	        }
	        Object.defineProperty(NgModuleRef.prototype, "injector", {
	            /**
	             * The injector that contains all of the providers of the NgModule.
	             */
	            get: function () { return unimplemented(); },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(NgModuleRef.prototype, "componentFactoryResolver", {
	            /**
	             * The ComponentFactoryResolver to get hold of the ComponentFactories
	             * declared in the `entryComponents` property of the module.
	             */
	            get: function () { return unimplemented(); },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(NgModuleRef.prototype, "instance", {
	            /**
	             * The NgModule instance.
	             */
	            get: function () { return unimplemented(); },
	            enumerable: true,
	            configurable: true
	        });
	        return NgModuleRef;
	    }());
	    /**
	     * @experimental
	     */
	    var NgModuleFactory = (function () {
	        function NgModuleFactory(_injectorClass, _moduleType) {
	            this._injectorClass = _injectorClass;
	            this._moduleType = _moduleType;
	        }
	        Object.defineProperty(NgModuleFactory.prototype, "moduleType", {
	            get: function () { return this._moduleType; },
	            enumerable: true,
	            configurable: true
	        });
	        NgModuleFactory.prototype.create = function (parentInjector) {
	            if (!parentInjector) {
	                parentInjector = Injector.NULL;
	            }
	            var instance = new this._injectorClass(parentInjector);
	            instance.create();
	            return instance;
	        };
	        return NgModuleFactory;
	    }());
	    var _UNDEFINED = new Object();
	    var NgModuleInjector = (function (_super) {
	        __extends$9(NgModuleInjector, _super);
	        function NgModuleInjector(parent, factories, bootstrapFactories) {
	            _super.call(this, factories, parent.get(ComponentFactoryResolver, ComponentFactoryResolver.NULL));
	            this.parent = parent;
	            this.bootstrapFactories = bootstrapFactories;
	            this._destroyListeners = [];
	            this._destroyed = false;
	        }
	        NgModuleInjector.prototype.create = function () { this.instance = this.createInternal(); };
	        NgModuleInjector.prototype.get = function (token, notFoundValue) {
	            if (notFoundValue === void 0) { notFoundValue = THROW_IF_NOT_FOUND; }
	            if (token === Injector || token === ComponentFactoryResolver) {
	                return this;
	            }
	            var result = this.getInternal(token, _UNDEFINED);
	            return result === _UNDEFINED ? this.parent.get(token, notFoundValue) : result;
	        };
	        Object.defineProperty(NgModuleInjector.prototype, "injector", {
	            get: function () { return this; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(NgModuleInjector.prototype, "componentFactoryResolver", {
	            get: function () { return this; },
	            enumerable: true,
	            configurable: true
	        });
	        NgModuleInjector.prototype.destroy = function () {
	            if (this._destroyed) {
	                throw new Error("The ng module " + stringify(this.instance.constructor) + " has already been destroyed.");
	            }
	            this._destroyed = true;
	            this.destroyInternal();
	            this._destroyListeners.forEach(function (listener) { return listener(); });
	        };
	        NgModuleInjector.prototype.onDestroy = function (callback) { this._destroyListeners.push(callback); };
	        return NgModuleInjector;
	    }(CodegenComponentFactoryResolver));
	
	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    /**
	     * Used to load ng module factories.
	     * @stable
	     */
	    var NgModuleFactoryLoader = (function () {
	        function NgModuleFactoryLoader() {
	        }
	        return NgModuleFactoryLoader;
	    }());
	    var moduleFactories = new Map();
	    /**
	     * Registers a loaded module. Should only be called from generated NgModuleFactory code.
	     * @experimental
	     */
	    function registerModuleFactory(id, factory) {
	        var existing = moduleFactories.get(id);
	        if (existing) {
	            throw new Error("Duplicate module registered for " + id + " - " + existing.moduleType.name + " vs " + factory.moduleType.name);
	        }
	        moduleFactories.set(id, factory);
	    }
	    /**
	     * Returns the NgModuleFactory with the given id, if it exists and has been loaded.
	     * Factories for modules that do not specify an `id` cannot be retrieved. Throws if the module
	     * cannot be found.
	     * @experimental
	     */
	    function getModuleFactory(id) {
	        var factory = moduleFactories.get(id);
	        if (!factory)
	            throw new Error("No module with ID " + id + " loaded");
	        return factory;
	    }
	
	    /**
	     * An unmodifiable list of items that Angular keeps up to date when the state
	     * of the application changes.
	     *
	     * The type of object that {@link Query} and {@link ViewQueryMetadata} provide.
	     *
	     * Implements an iterable interface, therefore it can be used in both ES6
	     * javascript `for (var i of items)` loops as well as in Angular templates with
	     * `*ngFor="let i of myList"`.
	     *
	     * Changes can be observed by subscribing to the changes `Observable`.
	     *
	     * NOTE: In the future this class will implement an `Observable` interface.
	     *
	     * ### Example ([live demo](http://plnkr.co/edit/RX8sJnQYl9FWuSCWme5z?p=preview))
	     * ```typescript
	     * @Component({...})
	     * class Container {
	     *   @ViewChildren(Item) items:QueryList<Item>;
	     * }
	     * ```
	     * @stable
	     */
	    var QueryList = (function () {
	        function QueryList() {
	            this._dirty = true;
	            this._results = [];
	            this._emitter = new EventEmitter();
	        }
	        Object.defineProperty(QueryList.prototype, "changes", {
	            get: function () { return this._emitter; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(QueryList.prototype, "length", {
	            get: function () { return this._results.length; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(QueryList.prototype, "first", {
	            get: function () { return this._results[0]; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(QueryList.prototype, "last", {
	            get: function () { return this._results[this.length - 1]; },
	            enumerable: true,
	            configurable: true
	        });
	        /**
	         * See
	         * [Array.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
	         */
	        QueryList.prototype.map = function (fn) { return this._results.map(fn); };
	        /**
	         * See
	         * [Array.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
	         */
	        QueryList.prototype.filter = function (fn) {
	            return this._results.filter(fn);
	        };
	        /**
	         * See
	         * [Array.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
	         */
	        QueryList.prototype.reduce = function (fn, init) {
	            return this._results.reduce(fn, init);
	        };
	        /**
	         * See
	         * [Array.forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
	         */
	        QueryList.prototype.forEach = function (fn) { this._results.forEach(fn); };
	        /**
	         * See
	         * [Array.some](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
	         */
	        QueryList.prototype.some = function (fn) {
	            return this._results.some(fn);
	        };
	        QueryList.prototype.toArray = function () { return this._results.slice(); };
	        QueryList.prototype[getSymbolIterator()] = function () { return this._results[getSymbolIterator()](); };
	        QueryList.prototype.toString = function () { return this._results.toString(); };
	        QueryList.prototype.reset = function (res) {
	            this._results = ListWrapper.flatten(res);
	            this._dirty = false;
	        };
	        QueryList.prototype.notifyOnChanges = function () { this._emitter.emit(this); };
	        /** internal */
	        QueryList.prototype.setDirty = function () { this._dirty = true; };
	        Object.defineProperty(QueryList.prototype, "dirty", {
	            /** internal */
	            get: function () { return this._dirty; },
	            enumerable: true,
	            configurable: true
	        });
	        return QueryList;
	    }());
	
	    var _SEPARATOR = '#';
	    var FACTORY_CLASS_SUFFIX = 'NgFactory';
	    /**
	     * Configuration for SystemJsNgModuleLoader.
	     * token.
	     *
	     * @experimental
	     */
	    var SystemJsNgModuleLoaderConfig = (function () {
	        function SystemJsNgModuleLoaderConfig() {
	        }
	        return SystemJsNgModuleLoaderConfig;
	    }());
	    var DEFAULT_CONFIG = {
	        factoryPathPrefix: '',
	        factoryPathSuffix: '.ngfactory',
	    };
	    /**
	     * NgModuleFactoryLoader that uses SystemJS to load NgModuleFactory
	     * @experimental
	     */
	    var SystemJsNgModuleLoader = (function () {
	        function SystemJsNgModuleLoader(_compiler, config) {
	            this._compiler = _compiler;
	            this._config = config || DEFAULT_CONFIG;
	        }
	        SystemJsNgModuleLoader.prototype.load = function (path) {
	            var offlineMode = this._compiler instanceof Compiler;
	            return offlineMode ? this.loadFactory(path) : this.loadAndCompile(path);
	        };
	        SystemJsNgModuleLoader.prototype.loadAndCompile = function (path) {
	            var _this = this;
	            var _a = path.split(_SEPARATOR), module = _a[0], exportName = _a[1];
	            if (exportName === undefined)
	                exportName = 'default';
	            return System.import(module)
	                .then(function (module) { return module[exportName]; })
	                .then(function (type) { return checkNotEmpty(type, module, exportName); })
	                .then(function (type) { return _this._compiler.compileModuleAsync(type); });
	        };
	        SystemJsNgModuleLoader.prototype.loadFactory = function (path) {
	            var _a = path.split(_SEPARATOR), module = _a[0], exportName = _a[1];
	            var factoryClassSuffix = FACTORY_CLASS_SUFFIX;
	            if (exportName === undefined) {
	                exportName = 'default';
	                factoryClassSuffix = '';
	            }
	            return System.import(this._config.factoryPathPrefix + module + this._config.factoryPathSuffix)
	                .then(function (module) { return module[exportName + factoryClassSuffix]; })
	                .then(function (factory) { return checkNotEmpty(factory, module, exportName); });
	        };
	        SystemJsNgModuleLoader.decorators = [
	            { type: Injectable },
	        ];
	        /** @nocollapse */
	        SystemJsNgModuleLoader.ctorParameters = [
	            { type: Compiler, },
	            { type: SystemJsNgModuleLoaderConfig, decorators: [{ type: Optional },] },
	        ];
	        return SystemJsNgModuleLoader;
	    }());
	    function checkNotEmpty(value, modulePath, exportName) {
	        if (!value) {
	            throw new Error("Cannot find '" + exportName + "' in '" + modulePath + "'");
	        }
	        return value;
	    }
	
	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var __extends$10 = (this && this.__extends) || function (d, b) {
	        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	    /**
	     * Represents an Embedded Template that can be used to instantiate Embedded Views.
	     *
	     * You can access a `TemplateRef`, in two ways. Via a directive placed on a `<template>` element (or
	     * directive prefixed with `*`) and have the `TemplateRef` for this Embedded View injected into the
	     * constructor of the directive using the `TemplateRef` Token. Alternatively you can query for the
	     * `TemplateRef` from a Component or a Directive via {@link Query}.
	     *
	     * To instantiate Embedded Views based on a Template, use
	     * {@link ViewContainerRef#createEmbeddedView}, which will create the View and attach it to the
	     * View Container.
	     * @stable
	     */
	    var TemplateRef = (function () {
	        function TemplateRef() {
	        }
	        Object.defineProperty(TemplateRef.prototype, "elementRef", {
	            /**
	             * The location in the View where the Embedded View logically belongs to.
	             *
	             * The data-binding and injection contexts of Embedded Views created from this `TemplateRef`
	             * inherit from the contexts of this location.
	             *
	             * Typically new Embedded Views are attached to the View Container of this location, but in
	             * advanced use-cases, the View can be attached to a different container while keeping the
	             * data-binding and injection context from the original location.
	             *
	             */
	            // TODO(i): rename to anchor or location
	            get: function () { return null; },
	            enumerable: true,
	            configurable: true
	        });
	        return TemplateRef;
	    }());
	    var TemplateRef_ = (function (_super) {
	        __extends$10(TemplateRef_, _super);
	        function TemplateRef_(_appElement, _viewFactory) {
	            _super.call(this);
	            this._appElement = _appElement;
	            this._viewFactory = _viewFactory;
	        }
	        TemplateRef_.prototype.createEmbeddedView = function (context) {
	            var view = this._viewFactory(this._appElement.parentView.viewUtils, this._appElement.parentInjector, this._appElement);
	            view.create(context || {}, null, null);
	            return view.ref;
	        };
	        Object.defineProperty(TemplateRef_.prototype, "elementRef", {
	            get: function () { return this._appElement.elementRef; },
	            enumerable: true,
	            configurable: true
	        });
	        return TemplateRef_;
	    }(TemplateRef));
	
	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var _queuedAnimations = [];
	    /** @internal */
	    function queueAnimation(player) {
	        _queuedAnimations.push(player);
	    }
	    /** @internal */
	    function triggerQueuedAnimations() {
	        for (var i = 0; i < _queuedAnimations.length; i++) {
	            var player = _queuedAnimations[i];
	            player.play();
	        }
	        _queuedAnimations = [];
	    }
	
	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var __extends$11 = (this && this.__extends) || function (d, b) {
	        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	    /**
	     * @stable
	     */
	    var ViewRef = (function () {
	        function ViewRef() {
	        }
	        Object.defineProperty(ViewRef.prototype, "destroyed", {
	            get: function () { return unimplemented(); },
	            enumerable: true,
	            configurable: true
	        });
	        return ViewRef;
	    }());
	    /**
	     * Represents an Angular View.
	     *
	     * <!-- TODO: move the next two paragraphs to the dev guide -->
	     * A View is a fundamental building block of the application UI. It is the smallest grouping of
	     * Elements which are created and destroyed together.
	     *
	     * Properties of elements in a View can change, but the structure (number and order) of elements in
	     * a View cannot. Changing the structure of Elements can only be done by inserting, moving or
	     * removing nested Views via a {@link ViewContainerRef}. Each View can contain many View Containers.
	     * <!-- /TODO -->
	     *
	     * ### Example
	     *
	     * Given this template...
	     *
	     * ```
	     * Count: {{items.length}}
	     * <ul>
	     *   <li *ngFor="let  item of items">{{item}}</li>
	     * </ul>
	     * ```
	     *
	     * We have two {@link TemplateRef}s:
	     *
	     * Outer {@link TemplateRef}:
	     * ```
	     * Count: {{items.length}}
	     * <ul>
	     *   <template ngFor let-item [ngForOf]="items"></template>
	     * </ul>
	     * ```
	     *
	     * Inner {@link TemplateRef}:
	     * ```
	     *   <li>{{item}}</li>
	     * ```
	     *
	     * Notice that the original template is broken down into two separate {@link TemplateRef}s.
	     *
	     * The outer/inner {@link TemplateRef}s are then assembled into views like so:
	     *
	     * ```
	     * <!-- ViewRef: outer-0 -->
	     * Count: 2
	     * <ul>
	     *   <template view-container-ref></template>
	     *   <!-- ViewRef: inner-1 --><li>first</li><!-- /ViewRef: inner-1 -->
	     *   <!-- ViewRef: inner-2 --><li>second</li><!-- /ViewRef: inner-2 -->
	     * </ul>
	     * <!-- /ViewRef: outer-0 -->
	     * ```
	     * @experimental
	     */
	    var EmbeddedViewRef = (function (_super) {
	        __extends$11(EmbeddedViewRef, _super);
	        function EmbeddedViewRef() {
	            _super.apply(this, arguments);
	        }
	        Object.defineProperty(EmbeddedViewRef.prototype, "context", {
	            get: function () { return unimplemented(); },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(EmbeddedViewRef.prototype, "rootNodes", {
	            get: function () { return unimplemented(); },
	            enumerable: true,
	            configurable: true
	        });
	        ;
	        return EmbeddedViewRef;
	    }(ViewRef));
	    var ViewRef_ = (function () {
	        function ViewRef_(_view) {
	            this._view = _view;
	            this._view = _view;
	            this._originalMode = this._view.cdMode;
	        }
	        Object.defineProperty(ViewRef_.prototype, "internalView", {
	            get: function () { return this._view; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(ViewRef_.prototype, "rootNodes", {
	            get: function () { return this._view.flatRootNodes; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(ViewRef_.prototype, "context", {
	            get: function () { return this._view.context; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(ViewRef_.prototype, "destroyed", {
	            get: function () { return this._view.destroyed; },
	            enumerable: true,
	            configurable: true
	        });
	        ViewRef_.prototype.markForCheck = function () { this._view.markPathToRootAsCheckOnce(); };
	        ViewRef_.prototype.detach = function () { this._view.cdMode = ChangeDetectorStatus.Detached; };
	        ViewRef_.prototype.detectChanges = function () {
	            this._view.detectChanges(false);
	            triggerQueuedAnimations();
	        };
	        ViewRef_.prototype.checkNoChanges = function () { this._view.detectChanges(true); };
	        ViewRef_.prototype.reattach = function () {
	            this._view.cdMode = this._originalMode;
	            this.markForCheck();
	        };
	        ViewRef_.prototype.onDestroy = function (callback) { this._view.disposables.push(callback); };
	        ViewRef_.prototype.destroy = function () { this._view.destroy(); };
	        return ViewRef_;
	    }());
	
	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var __extends$12 = (this && this.__extends) || function (d, b) {
	        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	    var EventListener = (function () {
	        function EventListener(name, callback) {
	            this.name = name;
	            this.callback = callback;
	        }
	        ;
	        return EventListener;
	    }());
	    /**
	     * @experimental All debugging apis are currently experimental.
	     */
	    var DebugNode = (function () {
	        function DebugNode(nativeNode, parent, _debugInfo) {
	            this._debugInfo = _debugInfo;
	            this.nativeNode = nativeNode;
	            if (isPresent(parent) && parent instanceof DebugElement) {
	                parent.addChild(this);
	            }
	            else {
	                this.parent = null;
	            }
	            this.listeners = [];
	        }
	        Object.defineProperty(DebugNode.prototype, "injector", {
	            get: function () { return isPresent(this._debugInfo) ? this._debugInfo.injector : null; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(DebugNode.prototype, "componentInstance", {
	            get: function () {
	                return isPresent(this._debugInfo) ? this._debugInfo.component : null;
	            },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(DebugNode.prototype, "context", {
	            get: function () { return isPresent(this._debugInfo) ? this._debugInfo.context : null; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(DebugNode.prototype, "references", {
	            get: function () {
	                return isPresent(this._debugInfo) ? this._debugInfo.references : null;
	            },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(DebugNode.prototype, "providerTokens", {
	            get: function () {
	                return isPresent(this._debugInfo) ? this._debugInfo.providerTokens : null;
	            },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(DebugNode.prototype, "source", {
	            get: function () { return isPresent(this._debugInfo) ? this._debugInfo.source : null; },
	            enumerable: true,
	            configurable: true
	        });
	        return DebugNode;
	    }());
	    /**
	     * @experimental All debugging apis are currently experimental.
	     */
	    var DebugElement = (function (_super) {
	        __extends$12(DebugElement, _super);
	        function DebugElement(nativeNode, parent, _debugInfo) {
	            _super.call(this, nativeNode, parent, _debugInfo);
	            this.properties = {};
	            this.attributes = {};
	            this.classes = {};
	            this.styles = {};
	            this.childNodes = [];
	            this.nativeElement = nativeNode;
	        }
	        DebugElement.prototype.addChild = function (child) {
	            if (isPresent(child)) {
	                this.childNodes.push(child);
	                child.parent = this;
	            }
	        };
	        DebugElement.prototype.removeChild = function (child) {
	            var childIndex = this.childNodes.indexOf(child);
	            if (childIndex !== -1) {
	                child.parent = null;
	                this.childNodes.splice(childIndex, 1);
	            }
	        };
	        DebugElement.prototype.insertChildrenAfter = function (child, newChildren) {
	            var siblingIndex = this.childNodes.indexOf(child);
	            if (siblingIndex !== -1) {
	                var previousChildren = this.childNodes.slice(0, siblingIndex + 1);
	                var nextChildren = this.childNodes.slice(siblingIndex + 1);
	                this.childNodes =
	                    ListWrapper.concat(ListWrapper.concat(previousChildren, newChildren), nextChildren);
	                for (var i = 0; i < newChildren.length; ++i) {
	                    var newChild = newChildren[i];
	                    if (isPresent(newChild.parent)) {
	                        newChild.parent.removeChild(newChild);
	                    }
	                    newChild.parent = this;
	                }
	            }
	        };
	        DebugElement.prototype.query = function (predicate) {
	            var results = this.queryAll(predicate);
	            return results.length > 0 ? results[0] : null;
	        };
	        DebugElement.prototype.queryAll = function (predicate) {
	            var matches = [];
	            _queryElementChildren(this, predicate, matches);
	            return matches;
	        };
	        DebugElement.prototype.queryAllNodes = function (predicate) {
	            var matches = [];
	            _queryNodeChildren(this, predicate, matches);
	            return matches;
	        };
	        Object.defineProperty(DebugElement.prototype, "children", {
	            get: function () {
	                var children = [];
	                this.childNodes.forEach(function (node) {
	                    if (node instanceof DebugElement) {
	                        children.push(node);
	                    }
	                });
	                return children;
	            },
	            enumerable: true,
	            configurable: true
	        });
	        DebugElement.prototype.triggerEventHandler = function (eventName, eventObj) {
	            this.listeners.forEach(function (listener) {
	                if (listener.name == eventName) {
	                    listener.callback(eventObj);
	                }
	            });
	        };
	        return DebugElement;
	    }(DebugNode));
	    /**
	     * @experimental
	     */
	    function asNativeElements(debugEls) {
	        return debugEls.map(function (el) { return el.nativeElement; });
	    }
	    function _queryElementChildren(element, predicate, matches) {
	        element.childNodes.forEach(function (node) {
	            if (node instanceof DebugElement) {
	                if (predicate(node)) {
	                    matches.push(node);
	                }
	                _queryElementChildren(node, predicate, matches);
	            }
	        });
	    }
	    function _queryNodeChildren(parentNode, predicate, matches) {
	        if (parentNode instanceof DebugElement) {
	            parentNode.childNodes.forEach(function (node) {
	                if (predicate(node)) {
	                    matches.push(node);
	                }
	                if (node instanceof DebugElement) {
	                    _queryNodeChildren(node, predicate, matches);
	                }
	            });
	        }
	    }
	    // Need to keep the nodes in a global Map so that multiple angular apps are supported.
	    var _nativeNodeToDebugNode = new Map();
	    /**
	     * @experimental
	     */
	    function getDebugNode(nativeNode) {
	        return _nativeNodeToDebugNode.get(nativeNode);
	    }
	    function indexDebugNode(node) {
	        _nativeNodeToDebugNode.set(node.nativeNode, node);
	    }
	    function removeDebugNodeFromIndex(node) {
	        _nativeNodeToDebugNode.delete(node.nativeNode);
	    }
	
	    function _reflector() {
	        return reflector;
	    }
	    var _CORE_PLATFORM_PROVIDERS = [
	        PlatformRef_, { provide: PlatformRef, useExisting: PlatformRef_ },
	        { provide: Reflector, useFactory: _reflector, deps: [] },
	        { provide: ReflectorReader, useExisting: Reflector }, TestabilityRegistry, Console
	    ];
	    /**
	     * This platform has to be included in any other platform
	     *
	     * @experimental
	     */
	    var platformCore = createPlatformFactory(null, 'core', _CORE_PLATFORM_PROVIDERS);
	
	    /**
	     * @experimental i18n support is experimental.
	     */
	    var LOCALE_ID = new OpaqueToken('LocaleId');
	    /**
	     * @experimental i18n support is experimental.
	     */
	    var TRANSLATIONS = new OpaqueToken('Translations');
	    /**
	     * @experimental i18n support is experimental.
	     */
	    var TRANSLATIONS_FORMAT = new OpaqueToken('TranslationsFormat');
	
	    function _iterableDiffersFactory() {
	        return defaultIterableDiffers;
	    }
	    function _keyValueDiffersFactory() {
	        return defaultKeyValueDiffers;
	    }
	    /**
	     * This module includes the providers of @angular/core that are needed
	     * to bootstrap components via `ApplicationRef`.
	     *
	     * @experimental
	     */
	    var ApplicationModule = (function () {
	        function ApplicationModule() {
	        }
	        ApplicationModule.decorators = [
	            { type: NgModule, args: [{
	                        providers: [
	                            ApplicationRef_,
	                            { provide: ApplicationRef, useExisting: ApplicationRef_ },
	                            ApplicationInitStatus,
	                            Compiler,
	                            APP_ID_RANDOM_PROVIDER,
	                            ViewUtils,
	                            { provide: IterableDiffers, useFactory: _iterableDiffersFactory },
	                            { provide: KeyValueDiffers, useFactory: _keyValueDiffersFactory },
	                            { provide: LOCALE_ID, useValue: 'en-US' },
	                        ]
	                    },] },
	        ];
	        /** @nocollapse */
	        ApplicationModule.ctorParameters = [];
	        return ApplicationModule;
	    }());
	
	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var FILL_STYLE_FLAG = 'true'; // TODO (matsko): change to boolean
	    var ANY_STATE = '*';
	    var DEFAULT_STATE = '*';
	    var EMPTY_STATE = 'void';
	
	    var Math$1 = global$1.Math;
	
	    var AnimationGroupPlayer = (function () {
	        function AnimationGroupPlayer(_players) {
	            var _this = this;
	            this._players = _players;
	            this._onDoneFns = [];
	            this._onStartFns = [];
	            this._finished = false;
	            this._started = false;
	            this.parentPlayer = null;
	            var count = 0;
	            var total = this._players.length;
	            if (total == 0) {
	                scheduleMicroTask(function () { return _this._onFinish(); });
	            }
	            else {
	                this._players.forEach(function (player) {
	                    player.parentPlayer = _this;
	                    player.onDone(function () {
	                        if (++count >= total) {
	                            _this._onFinish();
	                        }
	                    });
	                });
	            }
	        }
	        AnimationGroupPlayer.prototype._onFinish = function () {
	            if (!this._finished) {
	                this._finished = true;
	                if (!isPresent(this.parentPlayer)) {
	                    this.destroy();
	                }
	                this._onDoneFns.forEach(function (fn) { return fn(); });
	                this._onDoneFns = [];
	            }
	        };
	        AnimationGroupPlayer.prototype.init = function () { this._players.forEach(function (player) { return player.init(); }); };
	        AnimationGroupPlayer.prototype.onStart = function (fn) { this._onStartFns.push(fn); };
	        AnimationGroupPlayer.prototype.onDone = function (fn) { this._onDoneFns.push(fn); };
	        AnimationGroupPlayer.prototype.hasStarted = function () { return this._started; };
	        AnimationGroupPlayer.prototype.play = function () {
	            if (!isPresent(this.parentPlayer)) {
	                this.init();
	            }
	            if (!this.hasStarted()) {
	                this._onStartFns.forEach(function (fn) { return fn(); });
	                this._onStartFns = [];
	                this._started = true;
	            }
	            this._players.forEach(function (player) { return player.play(); });
	        };
	        AnimationGroupPlayer.prototype.pause = function () { this._players.forEach(function (player) { return player.pause(); }); };
	        AnimationGroupPlayer.prototype.restart = function () { this._players.forEach(function (player) { return player.restart(); }); };
	        AnimationGroupPlayer.prototype.finish = function () {
	            this._onFinish();
	            this._players.forEach(function (player) { return player.finish(); });
	        };
	        AnimationGroupPlayer.prototype.destroy = function () {
	            this._onFinish();
	            this._players.forEach(function (player) { return player.destroy(); });
	        };
	        AnimationGroupPlayer.prototype.reset = function () { this._players.forEach(function (player) { return player.reset(); }); };
	        AnimationGroupPlayer.prototype.setPosition = function (p /** TODO #9100 */) {
	            this._players.forEach(function (player) { player.setPosition(p); });
	        };
	        AnimationGroupPlayer.prototype.getPosition = function () {
	            var min = 0;
	            this._players.forEach(function (player) {
	                var p = player.getPosition();
	                min = Math$1.min(p, min);
	            });
	            return min;
	        };
	        return AnimationGroupPlayer;
	    }());
	
	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var AnimationKeyframe = (function () {
	        function AnimationKeyframe(offset, styles) {
	            this.offset = offset;
	            this.styles = styles;
	        }
	        return AnimationKeyframe;
	    }());
	
	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var AnimationOutput = (function () {
	        function AnimationOutput(name, phase, fullPropertyName) {
	            this.name = name;
	            this.phase = phase;
	            this.fullPropertyName = fullPropertyName;
	        }
	        return AnimationOutput;
	    }());
	
	    /**
	     * @experimental Animation support is experimental.
	     */
	    var AnimationPlayer = (function () {
	        function AnimationPlayer() {
	        }
	        Object.defineProperty(AnimationPlayer.prototype, "parentPlayer", {
	            get: function () { throw new Error('NOT IMPLEMENTED: Base Class'); },
	            set: function (player) { throw new Error('NOT IMPLEMENTED: Base Class'); },
	            enumerable: true,
	            configurable: true
	        });
	        return AnimationPlayer;
	    }());
	    var NoOpAnimationPlayer = (function () {
	        function NoOpAnimationPlayer() {
	            var _this = this;
	            this._onDoneFns = [];
	            this._onStartFns = [];
	            this._started = false;
	            this.parentPlayer = null;
	            scheduleMicroTask(function () { return _this._onFinish(); });
	        }
	        /** @internal */
	        NoOpAnimationPlayer.prototype._onFinish = function () {
	            this._onDoneFns.forEach(function (fn) { return fn(); });
	            this._onDoneFns = [];
	        };
	        NoOpAnimationPlayer.prototype.onStart = function (fn) { this._onStartFns.push(fn); };
	        NoOpAnimationPlayer.prototype.onDone = function (fn) { this._onDoneFns.push(fn); };
	        NoOpAnimationPlayer.prototype.hasStarted = function () { return this._started; };
	        NoOpAnimationPlayer.prototype.init = function () { };
	        NoOpAnimationPlayer.prototype.play = function () {
	            if (!this.hasStarted()) {
	                this._onStartFns.forEach(function (fn) { return fn(); });
	                this._onStartFns = [];
	            }
	            this._started = true;
	        };
	        NoOpAnimationPlayer.prototype.pause = function () { };
	        NoOpAnimationPlayer.prototype.restart = function () { };
	        NoOpAnimationPlayer.prototype.finish = function () { this._onFinish(); };
	        NoOpAnimationPlayer.prototype.destroy = function () { };
	        NoOpAnimationPlayer.prototype.reset = function () { };
	        NoOpAnimationPlayer.prototype.setPosition = function (p /** TODO #9100 */) { };
	        NoOpAnimationPlayer.prototype.getPosition = function () { return 0; };
	        return NoOpAnimationPlayer;
	    }());
	
	    var AnimationSequencePlayer = (function () {
	        function AnimationSequencePlayer(_players) {
	            var _this = this;
	            this._players = _players;
	            this._currentIndex = 0;
	            this._onDoneFns = [];
	            this._onStartFns = [];
	            this._finished = false;
	            this._started = false;
	            this.parentPlayer = null;
	            this._players.forEach(function (player) { player.parentPlayer = _this; });
	            this._onNext(false);
	        }
	        AnimationSequencePlayer.prototype._onNext = function (start) {
	            var _this = this;
	            if (this._finished)
	                return;
	            if (this._players.length == 0) {
	                this._activePlayer = new NoOpAnimationPlayer();
	                scheduleMicroTask(function () { return _this._onFinish(); });
	            }
	            else if (this._currentIndex >= this._players.length) {
	                this._activePlayer = new NoOpAnimationPlayer();
	                this._onFinish();
	            }
	            else {
	                var player = this._players[this._currentIndex++];
	                player.onDone(function () { return _this._onNext(true); });
	                this._activePlayer = player;
	                if (start) {
	                    player.play();
	                }
	            }
	        };
	        AnimationSequencePlayer.prototype._onFinish = function () {
	            if (!this._finished) {
	                this._finished = true;
	                if (!isPresent(this.parentPlayer)) {
	                    this.destroy();
	                }
	                this._onDoneFns.forEach(function (fn) { return fn(); });
	                this._onDoneFns = [];
	            }
	        };
	        AnimationSequencePlayer.prototype.init = function () { this._players.forEach(function (player) { return player.init(); }); };
	        AnimationSequencePlayer.prototype.onStart = function (fn) { this._onStartFns.push(fn); };
	        AnimationSequencePlayer.prototype.onDone = function (fn) { this._onDoneFns.push(fn); };
	        AnimationSequencePlayer.prototype.hasStarted = function () { return this._started; };
	        AnimationSequencePlayer.prototype.play = function () {
	            if (!isPresent(this.parentPlayer)) {
	                this.init();
	            }
	            if (!this.hasStarted()) {
	                this._onStartFns.forEach(function (fn) { return fn(); });
	                this._onStartFns = [];
	                this._started = true;
	            }
	            this._activePlayer.play();
	        };
	        AnimationSequencePlayer.prototype.pause = function () { this._activePlayer.pause(); };
	        AnimationSequencePlayer.prototype.restart = function () {
	            if (this._players.length > 0) {
	                this.reset();
	                this._players[0].restart();
	            }
	        };
	        AnimationSequencePlayer.prototype.reset = function () { this._players.forEach(function (player) { return player.reset(); }); };
	        AnimationSequencePlayer.prototype.finish = function () {
	            this._onFinish();
	            this._players.forEach(function (player) { return player.finish(); });
	        };
	        AnimationSequencePlayer.prototype.destroy = function () {
	            this._onFinish();
	            this._players.forEach(function (player) { return player.destroy(); });
	        };
	        AnimationSequencePlayer.prototype.setPosition = function (p /** TODO #9100 */) { this._players[0].setPosition(p); };
	        AnimationSequencePlayer.prototype.getPosition = function () { return this._players[0].getPosition(); };
	        return AnimationSequencePlayer;
	    }());
	
	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var __extends$13 = (this && this.__extends) || function (d, b) {
	        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	    /**
	     * @experimental Animation support is experimental.
	     */
	    var AUTO_STYLE = '*';
	    /**
	     * Metadata representing the entry of animations.
	     * Instances of this class are provided via the animation DSL when the {@link trigger trigger
	     * animation function} is called.
	     *
	     * @experimental Animation support is experimental.
	     */
	    var AnimationEntryMetadata = (function () {
	        function AnimationEntryMetadata(name, definitions) {
	            this.name = name;
	            this.definitions = definitions;
	        }
	        return AnimationEntryMetadata;
	    }());
	    /**
	     * @experimental Animation support is experimental.
	     */
	    var AnimationStateMetadata = (function () {
	        function AnimationStateMetadata() {
	        }
	        return AnimationStateMetadata;
	    }());
	    /**
	     * Metadata representing the entry of animations.
	     * Instances of this class are provided via the animation DSL when the {@link state state animation
	     * function} is called.
	     *
	     * @experimental Animation support is experimental.
	     */
	    var AnimationStateDeclarationMetadata = (function (_super) {
	        __extends$13(AnimationStateDeclarationMetadata, _super);
	        function AnimationStateDeclarationMetadata(stateNameExpr, styles) {
	            _super.call(this);
	            this.stateNameExpr = stateNameExpr;
	            this.styles = styles;
	        }
	        return AnimationStateDeclarationMetadata;
	    }(AnimationStateMetadata));
	    /**
	     * Metadata representing the entry of animations.
	     * Instances of this class are provided via the animation DSL when the
	     * {@link transition transition animation function} is called.
	     *
	     * @experimental Animation support is experimental.
	     */
	    var AnimationStateTransitionMetadata = (function (_super) {
	        __extends$13(AnimationStateTransitionMetadata, _super);
	        function AnimationStateTransitionMetadata(stateChangeExpr, steps) {
	            _super.call(this);
	            this.stateChangeExpr = stateChangeExpr;
	            this.steps = steps;
	        }
	        return AnimationStateTransitionMetadata;
	    }(AnimationStateMetadata));
	    /**
	     * @experimental Animation support is experimental.
	     */
	    var AnimationMetadata = (function () {
	        function AnimationMetadata() {
	        }
	        return AnimationMetadata;
	    }());
	    /**
	     * Metadata representing the entry of animations.
	     * Instances of this class are provided via the animation DSL when the {@link keyframes keyframes
	     * animation function} is called.
	     *
	     * @experimental Animation support is experimental.
	     */
	    var AnimationKeyframesSequenceMetadata = (function (_super) {
	        __extends$13(AnimationKeyframesSequenceMetadata, _super);
	        function AnimationKeyframesSequenceMetadata(steps) {
	            _super.call(this);
	            this.steps = steps;
	        }
	        return AnimationKeyframesSequenceMetadata;
	    }(AnimationMetadata));
	    /**
	     * Metadata representing the entry of animations.
	     * Instances of this class are provided via the animation DSL when the {@link style style animation
	     * function} is called.
	     *
	     * @experimental Animation support is experimental.
	     */
	    var AnimationStyleMetadata = (function (_super) {
	        __extends$13(AnimationStyleMetadata, _super);
	        function AnimationStyleMetadata(styles, offset) {
	            if (offset === void 0) { offset = null; }
	            _super.call(this);
	            this.styles = styles;
	            this.offset = offset;
	        }
	        return AnimationStyleMetadata;
	    }(AnimationMetadata));
	    /**
	     * Metadata representing the entry of animations.
	     * Instances of this class are provided via the animation DSL when the {@link animate animate
	     * animation function} is called.
	     *
	     * @experimental Animation support is experimental.
	     */
	    var AnimationAnimateMetadata = (function (_super) {
	        __extends$13(AnimationAnimateMetadata, _super);
	        function AnimationAnimateMetadata(timings, styles) {
	            _super.call(this);
	            this.timings = timings;
	            this.styles = styles;
	        }
	        return AnimationAnimateMetadata;
	    }(AnimationMetadata));
	    /**
	     * @experimental Animation support is experimental.
	     */
	    var AnimationWithStepsMetadata = (function (_super) {
	        __extends$13(AnimationWithStepsMetadata, _super);
	        function AnimationWithStepsMetadata() {
	            _super.call(this);
	        }
	        Object.defineProperty(AnimationWithStepsMetadata.prototype, "steps", {
	            get: function () { throw new Error('NOT IMPLEMENTED: Base Class'); },
	            enumerable: true,
	            configurable: true
	        });
	        return AnimationWithStepsMetadata;
	    }(AnimationMetadata));
	    /**
	     * Metadata representing the entry of animations.
	     * Instances of this class are provided via the animation DSL when the {@link sequence sequence
	     * animation function} is called.
	     *
	     * @experimental Animation support is experimental.
	     */
	    var AnimationSequenceMetadata = (function (_super) {
	        __extends$13(AnimationSequenceMetadata, _super);
	        function AnimationSequenceMetadata(_steps) {
	            _super.call(this);
	            this._steps = _steps;
	        }
	        Object.defineProperty(AnimationSequenceMetadata.prototype, "steps", {
	            get: function () { return this._steps; },
	            enumerable: true,
	            configurable: true
	        });
	        return AnimationSequenceMetadata;
	    }(AnimationWithStepsMetadata));
	    /**
	     * Metadata representing the entry of animations.
	     * Instances of this class are provided via the animation DSL when the {@link group group animation
	     * function} is called.
	     *
	     * @experimental Animation support is experimental.
	     */
	    var AnimationGroupMetadata = (function (_super) {
	        __extends$13(AnimationGroupMetadata, _super);
	        function AnimationGroupMetadata(_steps) {
	            _super.call(this);
	            this._steps = _steps;
	        }
	        Object.defineProperty(AnimationGroupMetadata.prototype, "steps", {
	            get: function () { return this._steps; },
	            enumerable: true,
	            configurable: true
	        });
	        return AnimationGroupMetadata;
	    }(AnimationWithStepsMetadata));
	    /**
	     * `animate` is an animation-specific function that is designed to be used inside of Angular2's
	     * animation
	     * DSL language. If this information is new, please navigate to the
	     * {@link Component#animations-anchor component animations metadata
	     * page} to gain a better understanding of how animations in Angular2 are used.
	     *
	     * `animate` specifies an animation step that will apply the provided `styles` data for a given
	     * amount of
	     * time based on the provided `timing` expression value. Calls to `animate` are expected to be
	     * used within {@link sequence an animation sequence}, {@link group group}, or {@link transition
	     * transition}.
	     *
	     * ### Usage
	     *
	     * The `animate` function accepts two input parameters: `timing` and `styles`:
	     *
	     * - `timing` is a string based value that can be a combination of a duration with optional
	     * delay and easing values. The format for the expression breaks down to `duration delay easing`
	     * (therefore a value such as `1s 100ms ease-out` will be parse itself into `duration=1000,
	     * delay=100, easing=ease-out`.
	     * If a numeric value is provided then that will be used as the `duration` value in millisecond
	     * form.
	     * - `styles` is the style input data which can either be a call to {@link style style} or {@link
	     * keyframes keyframes}.
	     * If left empty then the styles from the destination state will be collected and used (this is
	     * useful when
	     * describing an animation step that will complete an animation by {@link
	     * transition#the-final-animate-call animating to the final state}).
	     *
	     * ```typescript
	     * // various functions for specifying timing data
	     * animate(500, style(...))
	     * animate("1s", style(...))
	     * animate("100ms 0.5s", style(...))
	     * animate("5s ease", style(...))
	     * animate("5s 10ms cubic-bezier(.17,.67,.88,.1)", style(...))
	     *
	     * // either style() of keyframes() can be used
	     * animate(500, style({ background: "red" }))
	     * animate(500, keyframes([
	     *   style({ background: "blue" })),
	     *   style({ background: "red" }))
	     * ])
	     * ```
	     *
	     * ### Example ([live demo](http://plnkr.co/edit/Kez8XGWBxWue7qP7nNvF?p=preview))
	     *
	     * {@example core/animation/ts/dsl/animation_example.ts region='Component'}
	     *
	     * @experimental Animation support is experimental.
	     */
	    function animate(timing, styles) {
	        if (styles === void 0) { styles = null; }
	        var stylesEntry = styles;
	        if (!isPresent(stylesEntry)) {
	            var EMPTY_STYLE = {};
	            stylesEntry = new AnimationStyleMetadata([EMPTY_STYLE], 1);
	        }
	        return new AnimationAnimateMetadata(timing, stylesEntry);
	    }
	    /**
	     * `group` is an animation-specific function that is designed to be used inside of Angular2's
	     * animation
	     * DSL language. If this information is new, please navigate to the
	     * {@link Component#animations-anchor component animations metadata
	     * page} to gain a better understanding of how animations in Angular2 are used.
	     *
	     * `group` specifies a list of animation steps that are all run in parallel. Grouped animations
	     * are useful when a series of styles must be animated/closed off
	     * at different statrting/ending times.
	     *
	     * The `group` function can either be used within a {@link sequence sequence} or a {@link transition
	     * transition}
	     * and it will only continue to the next instruction once all of the inner animation steps
	     * have completed.
	     *
	     * ### Usage
	     *
	     * The `steps` data that is passed into the `group` animation function can either consist
	     * of {@link style style} or {@link animate animate} function calls. Each call to `style()` or
	     * `animate()`
	     * within a group will be executed instantly (use {@link keyframes keyframes} or a
	     * {@link animate#usage animate() with a delay value} to offset styles to be applied at a later
	     * time).
	     *
	     * ```typescript
	     * group([
	     *   animate("1s", { background: "black" }))
	     *   animate("2s", { color: "white" }))
	     * ])
	     * ```
	     *
	     * ### Example ([live demo](http://plnkr.co/edit/Kez8XGWBxWue7qP7nNvF?p=preview))
	     *
	     * {@example core/animation/ts/dsl/animation_example.ts region='Component'}
	     *
	     * @experimental Animation support is experimental.
	     */
	    function group(steps) {
	        return new AnimationGroupMetadata(steps);
	    }
	    /**
	     * `sequence` is an animation-specific function that is designed to be used inside of Angular2's
	     * animation
	     * DSL language. If this information is new, please navigate to the
	     * {@link Component#animations-anchor component animations metadata
	     * page} to gain a better understanding of how animations in Angular2 are used.
	     *
	     * `sequence` Specifies a list of animation steps that are run one by one. (`sequence` is used
	     * by default when an array is passed as animation data into {@link transition transition}.)
	     *
	     * The `sequence` function can either be used within a {@link group group} or a {@link transition
	     * transition}
	     * and it will only continue to the next instruction once each of the inner animation steps
	     * have completed.
	     *
	     * To perform animation styling in parallel with other animation steps then
	     * have a look at the {@link group group} animation function.
	     *
	     * ### Usage
	     *
	     * The `steps` data that is passed into the `sequence` animation function can either consist
	     * of {@link style style} or {@link animate animate} function calls. A call to `style()` will apply
	     * the
	     * provided styling data immediately while a call to `animate()` will apply its styling
	     * data over a given time depending on its timing data.
	     *
	     * ```typescript
	     * sequence([
	     *   style({ opacity: 0 })),
	     *   animate("1s", { opacity: 1 }))
	     * ])
	     * ```
	     *
	     * ### Example ([live demo](http://plnkr.co/edit/Kez8XGWBxWue7qP7nNvF?p=preview))
	     *
	     * {@example core/animation/ts/dsl/animation_example.ts region='Component'}
	     *
	     * @experimental Animation support is experimental.
	     */
	    function sequence(steps) {
	        return new AnimationSequenceMetadata(steps);
	    }
	    /**
	     * `style` is an animation-specific function that is designed to be used inside of Angular2's
	     * animation
	     * DSL language. If this information is new, please navigate to the
	     * {@link Component#animations-anchor component animations metadata
	     * page} to gain a better understanding of how animations in Angular2 are used.
	     *
	     * `style` declares a key/value object containing CSS properties/styles that can then
	     * be used for {@link state animation states}, within an {@link sequence animation sequence}, or as
	     * styling data for both {@link animate animate} and {@link keyframes keyframes}.
	     *
	     * ### Usage
	     *
	     * `style` takes in a key/value string map as data and expects one or more CSS property/value
	     * pairs to be defined.
	     *
	     * ```typescript
	     * // string values are used for css properties
	     * style({ background: "red", color: "blue" })
	     *
	     * // numerical (pixel) values are also supported
	     * style({ width: 100, height: 0 })
	     * ```
	     *
	     * #### Auto-styles (using `*`)
	     *
	     * When an asterix (`*`) character is used as a value then it will be detected from the element
	     * being animated
	     * and applied as animation data when the animation starts.
	     *
	     * This feature proves useful for a state depending on layout and/or environment factors; in such
	     * cases
	     * the styles are calculated just before the animation starts.
	     *
	     * ```typescript
	     * // the steps below will animate from 0 to the
	     * // actual height of the element
	     * style({ height: 0 }),
	     * animate("1s", style({ height: "*" }))
	     * ```
	     *
	     * ### Example ([live demo](http://plnkr.co/edit/Kez8XGWBxWue7qP7nNvF?p=preview))
	     *
	     * {@example core/animation/ts/dsl/animation_example.ts region='Component'}
	     *
	     * @experimental Animation support is experimental.
	     */
	    function style(tokens) {
	        var input;
	        var offset = null;
	        if (isString(tokens)) {
	            input = [tokens];
	        }
	        else {
	            if (isArray(tokens)) {
	                input = tokens;
	            }
	            else {
	                input = [tokens];
	            }
	            input.forEach(function (entry) {
	                var entryOffset = entry['offset'];
	                if (isPresent(entryOffset)) {
	                    offset = offset == null ? parseFloat(entryOffset) : offset;
	                }
	            });
	        }
	        return new AnimationStyleMetadata(input, offset);
	    }
	    /**
	     * `state` is an animation-specific function that is designed to be used inside of Angular2's
	     * animation
	     * DSL language. If this information is new, please navigate to the
	     * {@link Component#animations-anchor component animations metadata
	     * page} to gain a better understanding of how animations in Angular2 are used.
	     *
	     * `state` declares an animation state within the given trigger. When a state is
	     * active within a component then its associated styles will persist on
	     * the element that the trigger is attached to (even when the animation ends).
	     *
	     * To animate between states, have a look at the animation {@link transition transition}
	     * DSL function. To register states to an animation trigger please have a look
	     * at the {@link trigger trigger} function.
	     *
	     * #### The `void` state
	     *
	     * The `void` state value is a reserved word that angular uses to determine when the element is not
	     * apart
	     * of the application anymore (e.g. when an `ngIf` evaluates to false then the state of the
	     * associated element
	     * is void).
	     *
	     * #### The `*` (default) state
	     *
	     * The `*` state (when styled) is a fallback state that will be used if
	     * the state that is being animated is not declared within the trigger.
	     *
	     * ### Usage
	     *
	     * `state` will declare an animation state with its associated styles
	     * within the given trigger.
	     *
	     * - `stateNameExpr` can be one or more state names separated by commas.
	     * - `styles` refers to the {@link style styling data} that will be persisted on the element once
	     * the state
	     * has been reached.
	     *
	     * ```typescript
	     * // "void" is a reserved name for a state and is used to represent
	     * // the state in which an element is detached from from the application.
	     * state("void", style({ height: 0 }))
	     *
	     * // user-defined states
	     * state("closed", style({ height: 0 }))
	     * state("open, visible", style({ height: "*" }))
	     * ```
	     *
	     * ### Example ([live demo](http://plnkr.co/edit/Kez8XGWBxWue7qP7nNvF?p=preview))
	     *
	     * {@example core/animation/ts/dsl/animation_example.ts region='Component'}
	     *
	     * @experimental Animation support is experimental.
	     */
	    function state(stateNameExpr, styles) {
	        return new AnimationStateDeclarationMetadata(stateNameExpr, styles);
	    }
	    /**
	     * `keyframes` is an animation-specific function that is designed to be used inside of Angular2's
	     * animation
	     * DSL language. If this information is new, please navigate to the
	     * {@link Component#animations-anchor component animations metadata
	     * page} to gain a better understanding of how animations in Angular2 are used.
	     *
	     * `keyframes` specifies a collection of {@link style style} entries each optionally characterized
	     * by an `offset` value.
	     *
	     * ### Usage
	     *
	     * The `keyframes` animation function is designed to be used alongside the {@link animate animate}
	     * animation function. Instead of applying animations from where they are
	     * currently to their destination, keyframes can describe how each style entry is applied
	     * and at what point within the animation arc (much like CSS Keyframe Animations do).
	     *
	     * For each `style()` entry an `offset` value can be set. Doing so allows to specifiy at
	     * what percentage of the animate time the styles will be applied.
	     *
	     * ```typescript
	     * // the provided offset values describe when each backgroundColor value is applied.
	     * animate("5s", keyframes([
	     *   style({ backgroundColor: "red", offset: 0 }),
	     *   style({ backgroundColor: "blue", offset: 0.2 }),
	     *   style({ backgroundColor: "orange", offset: 0.3 }),
	     *   style({ backgroundColor: "black", offset: 1 })
	     * ]))
	     * ```
	     *
	     * Alternatively, if there are no `offset` values used within the style entries then the offsets
	     * will
	     * be calculated automatically.
	     *
	     * ```typescript
	     * animate("5s", keyframes([
	     *   style({ backgroundColor: "red" }) // offset = 0
	     *   style({ backgroundColor: "blue" }) // offset = 0.33
	     *   style({ backgroundColor: "orange" }) // offset = 0.66
	     *   style({ backgroundColor: "black" }) // offset = 1
	     * ]))
	     * ```
	     *
	     * ### Example ([live demo](http://plnkr.co/edit/Kez8XGWBxWue7qP7nNvF?p=preview))
	     *
	     * {@example core/animation/ts/dsl/animation_example.ts region='Component'}
	     *
	     * @experimental Animation support is experimental.
	     */
	    function keyframes(steps) {
	        return new AnimationKeyframesSequenceMetadata(steps);
	    }
	    /**
	     * `transition` is an animation-specific function that is designed to be used inside of Angular2's
	     * animation
	     * DSL language. If this information is new, please navigate to the
	     * {@link Component#animations-anchor component animations metadata
	     * page} to gain a better understanding of how animations in Angular2 are used.
	     *
	     * `transition` declares the {@link sequence sequence of animation steps} that will be run when the
	     * provided
	     * `stateChangeExpr` value is satisfied. The `stateChangeExpr` consists of a `state1 => state2`
	     * which consists
	     * of two known states (use an asterix (`*`) to refer to a dynamic starting and/or ending state).
	     *
	     * Animation transitions are placed within an {@link trigger animation trigger}. For an transition
	     * to animate to
	     * a state value and persist its styles then one or more {@link state animation states} is expected
	     * to be defined.
	     *
	     * ### Usage
	     *
	     * An animation transition is kicked off the `stateChangeExpr` predicate evaluates to true based on
	     * what the
	     * previous state is and what the current state has become. In other words, if a transition is
	     * defined that
	     * matches the old/current state criteria then the associated animation will be triggered.
	     *
	     * ```typescript
	     * // all transition/state changes are defined within an animation trigger
	     * trigger("myAnimationTrigger", [
	     *   // if a state is defined then its styles will be persisted when the
	     *   // animation has fully completed itself
	     *   state("on", style({ background: "green" })),
	     *   state("off", style({ background: "grey" })),
	     *
	     *   // a transition animation that will be kicked off when the state value
	     *   // bound to "myAnimationTrigger" changes from "on" to "off"
	     *   transition("on => off", animate(500)),
	     *
	     *   // it is also possible to do run the same animation for both directions
	     *   transition("on <=> off", animate(500)),
	     *
	     *   // or to define multiple states pairs separated by commas
	     *   transition("on => off, off => void", animate(500)),
	     *
	     *   // this is a catch-all state change for when an element is inserted into
	     *   // the page and the destination state is unknown
	     *   transition("void => *", [
	     *     style({ opacity: 0 }),
	     *     animate(500)
	     *   ]),
	     *
	     *   // this will capture a state change between any states
	     *   transition("* => *", animate("1s 0s")),
	     * ])
	     * ```
	     *
	     * The template associated with this component will make use of the `myAnimationTrigger`
	     * animation trigger by binding to an element within its template code.
	     *
	     * ```html
	     * <!-- somewhere inside of my-component-tpl.html -->
	     * <div [@myAnimationTrigger]="myStatusExp">...</div>
	     * ```
	     *
	     * #### The final `animate` call
	     *
	     * If the final step within the transition steps is a call to `animate()` that **only**
	     * uses a timing value with **no style data** then it will be automatically used as the final
	     * animation
	     * arc for the element to animate itself to the final state. This involves an automatic mix of
	     * adding/removing CSS styles so that the element will be in the exact state it should be for the
	     * applied state to be presented correctly.
	     *
	     * ```
	     * // start off by hiding the element, but make sure that it animates properly to whatever state
	     * // is currently active for "myAnimationTrigger"
	     * transition("void => *", [
	     *   style({ opacity: 0 }),
	     *   animate(500)
	     * ])
	     * ```
	     *
	     * ### Example ([live demo](http://plnkr.co/edit/Kez8XGWBxWue7qP7nNvF?p=preview))
	     *
	     * {@example core/animation/ts/dsl/animation_example.ts region='Component'}
	     *
	     * @experimental Animation support is experimental.
	     */
	    function transition(stateChangeExpr, steps) {
	        var animationData = isArray(steps) ? new AnimationSequenceMetadata(steps) :
	            steps;
	        return new AnimationStateTransitionMetadata(stateChangeExpr, animationData);
	    }
	    /**
	     * `trigger` is an animation-specific function that is designed to be used inside of Angular2's
	     * animation
	     * DSL language. If this information is new, please navigate to the
	     * {@link Component#animations-anchor component animations metadata
	     * page} to gain a better understanding of how animations in Angular2 are used.
	     *
	     * `trigger` Creates an animation trigger which will a list of {@link state state} and {@link
	     * transition transition}
	     * entries that will be evaluated when the expression bound to the trigger changes.
	     *
	     * Triggers are registered within the component annotation data under the
	     * {@link Component#animations-anchor animations section}. An animation trigger can
	     * be placed on an element within a template by referencing the name of the
	     * trigger followed by the expression value that the trigger is bound to
	     * (in the form of `[@triggerName]="expression"`.
	     *
	     * ### Usage
	     *
	     * `trigger` will create an animation trigger reference based on the provided `name` value.
	     * The provided `animation` value is expected to be an array consisting of {@link state state} and
	     * {@link transition transition}
	     * declarations.
	     *
	     * ```typescript
	     * @Component({
	     *   selector: 'my-component',
	     *   templateUrl: 'my-component-tpl.html',
	     *   animations: [
	     *     trigger("myAnimationTrigger", [
	     *       state(...),
	     *       state(...),
	     *       transition(...),
	     *       transition(...)
	     *     ])
	     *   ]
	     * })
	     * class MyComponent {
	     *   myStatusExp = "something";
	     * }
	     * ```
	     *
	     * The template associated with this component will make use of the `myAnimationTrigger`
	     * animation trigger by binding to an element within its template code.
	     *
	     * ```html
	     * <!-- somewhere inside of my-component-tpl.html -->
	     * <div [@myAnimationTrigger]="myStatusExp">...</div>
	     * ```
	     *
	     * ### Example ([live demo](http://plnkr.co/edit/Kez8XGWBxWue7qP7nNvF?p=preview))
	     *
	     * {@example core/animation/ts/dsl/animation_example.ts region='Component'}
	     *
	     * @experimental Animation support is experimental.
	     */
	    function trigger(name, animation) {
	        return new AnimationEntryMetadata(name, animation);
	    }
	
	    function prepareFinalAnimationStyles(previousStyles, newStyles, nullValue) {
	        if (nullValue === void 0) { nullValue = null; }
	        var finalStyles = {};
	        StringMapWrapper.forEach(newStyles, function (value, prop) {
	            finalStyles[prop] = value == AUTO_STYLE ? nullValue : value.toString();
	        });
	        StringMapWrapper.forEach(previousStyles, function (value, prop) {
	            if (!isPresent(finalStyles[prop])) {
	                finalStyles[prop] = nullValue;
	            }
	        });
	        return finalStyles;
	    }
	    function balanceAnimationKeyframes(collectedStyles, finalStateStyles, keyframes) {
	        var limit = keyframes.length - 1;
	        var firstKeyframe = keyframes[0];
	        // phase 1: copy all the styles from the first keyframe into the lookup map
	        var flatenedFirstKeyframeStyles = flattenStyles(firstKeyframe.styles.styles);
	        var extraFirstKeyframeStyles = {};
	        var hasExtraFirstStyles = false;
	        StringMapWrapper.forEach(collectedStyles, function (value, prop) {
	            // if the style is already defined in the first keyframe then
	            // we do not replace it.
	            if (!flatenedFirstKeyframeStyles[prop]) {
	                flatenedFirstKeyframeStyles[prop] = value;
	                extraFirstKeyframeStyles[prop] = value;
	                hasExtraFirstStyles = true;
	            }
	        });
	        var keyframeCollectedStyles = StringMapWrapper.merge({}, flatenedFirstKeyframeStyles);
	        // phase 2: normalize the final keyframe
	        var finalKeyframe = keyframes[limit];
	        ListWrapper.insert(finalKeyframe.styles.styles, 0, finalStateStyles);
	        var flatenedFinalKeyframeStyles = flattenStyles(finalKeyframe.styles.styles);
	        var extraFinalKeyframeStyles = {};
	        var hasExtraFinalStyles = false;
	        StringMapWrapper.forEach(keyframeCollectedStyles, function (value, prop) {
	            if (!isPresent(flatenedFinalKeyframeStyles[prop])) {
	                extraFinalKeyframeStyles[prop] = AUTO_STYLE;
	                hasExtraFinalStyles = true;
	            }
	        });
	        if (hasExtraFinalStyles) {
	            finalKeyframe.styles.styles.push(extraFinalKeyframeStyles);
	        }
	        StringMapWrapper.forEach(flatenedFinalKeyframeStyles, function (value, prop) {
	            if (!isPresent(flatenedFirstKeyframeStyles[prop])) {
	                extraFirstKeyframeStyles[prop] = AUTO_STYLE;
	                hasExtraFirstStyles = true;
	            }
	        });
	        if (hasExtraFirstStyles) {
	            firstKeyframe.styles.styles.push(extraFirstKeyframeStyles);
	        }
	        return keyframes;
	    }
	    function clearStyles(styles) {
	        var finalStyles = {};
	        StringMapWrapper.keys(styles).forEach(function (key) { finalStyles[key] = null; });
	        return finalStyles;
	    }
	    function collectAndResolveStyles(collection, styles) {
	        return styles.map(function (entry) {
	            var stylesObj = {};
	            StringMapWrapper.forEach(entry, function (value, prop) {
	                if (value == FILL_STYLE_FLAG) {
	                    value = collection[prop];
	                    if (!isPresent(value)) {
	                        value = AUTO_STYLE;
	                    }
	                }
	                collection[prop] = value;
	                stylesObj[prop] = value;
	            });
	            return stylesObj;
	        });
	    }
	    function renderStyles(element, renderer, styles) {
	        StringMapWrapper.forEach(styles, function (value, prop) { renderer.setElementStyle(element, prop, value); });
	    }
	    function flattenStyles(styles) {
	        var finalStyles = {};
	        styles.forEach(function (entry) {
	            StringMapWrapper.forEach(entry, function (value, prop) { finalStyles[prop] = value; });
	        });
	        return finalStyles;
	    }
	
	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var AnimationStyles = (function () {
	        function AnimationStyles(styles) {
	            this.styles = styles;
	        }
	        return AnimationStyles;
	    }());
	
	    var DebugDomRootRenderer = (function () {
	        function DebugDomRootRenderer(_delegate) {
	            this._delegate = _delegate;
	        }
	        DebugDomRootRenderer.prototype.renderComponent = function (componentProto) {
	            return new DebugDomRenderer(this._delegate.renderComponent(componentProto));
	        };
	        return DebugDomRootRenderer;
	    }());
	    var DebugDomRenderer = (function () {
	        function DebugDomRenderer(_delegate) {
	            this._delegate = _delegate;
	        }
	        DebugDomRenderer.prototype.selectRootElement = function (selectorOrNode, debugInfo) {
	            var nativeEl = this._delegate.selectRootElement(selectorOrNode, debugInfo);
	            var debugEl = new DebugElement(nativeEl, null, debugInfo);
	            indexDebugNode(debugEl);
	            return nativeEl;
	        };
	        DebugDomRenderer.prototype.createElement = function (parentElement, name, debugInfo) {
	            var nativeEl = this._delegate.createElement(parentElement, name, debugInfo);
	            var debugEl = new DebugElement(nativeEl, getDebugNode(parentElement), debugInfo);
	            debugEl.name = name;
	            indexDebugNode(debugEl);
	            return nativeEl;
	        };
	        DebugDomRenderer.prototype.createViewRoot = function (hostElement) { return this._delegate.createViewRoot(hostElement); };
	        DebugDomRenderer.prototype.createTemplateAnchor = function (parentElement, debugInfo) {
	            var comment = this._delegate.createTemplateAnchor(parentElement, debugInfo);
	            var debugEl = new DebugNode(comment, getDebugNode(parentElement), debugInfo);
	            indexDebugNode(debugEl);
	            return comment;
	        };
	        DebugDomRenderer.prototype.createText = function (parentElement, value, debugInfo) {
	            var text = this._delegate.createText(parentElement, value, debugInfo);
	            var debugEl = new DebugNode(text, getDebugNode(parentElement), debugInfo);
	            indexDebugNode(debugEl);
	            return text;
	        };
	        DebugDomRenderer.prototype.projectNodes = function (parentElement, nodes) {
	            var debugParent = getDebugNode(parentElement);
	            if (isPresent(debugParent) && debugParent instanceof DebugElement) {
	                var debugElement_1 = debugParent;
	                nodes.forEach(function (node) { debugElement_1.addChild(getDebugNode(node)); });
	            }
	            this._delegate.projectNodes(parentElement, nodes);
	        };
	        DebugDomRenderer.prototype.attachViewAfter = function (node, viewRootNodes) {
	            var debugNode = getDebugNode(node);
	            if (isPresent(debugNode)) {
	                var debugParent = debugNode.parent;
	                if (viewRootNodes.length > 0 && isPresent(debugParent)) {
	                    var debugViewRootNodes = [];
	                    viewRootNodes.forEach(function (rootNode) { return debugViewRootNodes.push(getDebugNode(rootNode)); });
	                    debugParent.insertChildrenAfter(debugNode, debugViewRootNodes);
	                }
	            }
	            this._delegate.attachViewAfter(node, viewRootNodes);
	        };
	        DebugDomRenderer.prototype.detachView = function (viewRootNodes) {
	            viewRootNodes.forEach(function (node) {
	                var debugNode = getDebugNode(node);
	                if (isPresent(debugNode) && isPresent(debugNode.parent)) {
	                    debugNode.parent.removeChild(debugNode);
	                }
	            });
	            this._delegate.detachView(viewRootNodes);
	        };
	        DebugDomRenderer.prototype.destroyView = function (hostElement, viewAllNodes) {
	            viewAllNodes.forEach(function (node) { removeDebugNodeFromIndex(getDebugNode(node)); });
	            this._delegate.destroyView(hostElement, viewAllNodes);
	        };
	        DebugDomRenderer.prototype.listen = function (renderElement, name, callback) {
	            var debugEl = getDebugNode(renderElement);
	            if (isPresent(debugEl)) {
	                debugEl.listeners.push(new EventListener(name, callback));
	            }
	            return this._delegate.listen(renderElement, name, callback);
	        };
	        DebugDomRenderer.prototype.listenGlobal = function (target, name, callback) {
	            return this._delegate.listenGlobal(target, name, callback);
	        };
	        DebugDomRenderer.prototype.setElementProperty = function (renderElement, propertyName, propertyValue) {
	            var debugEl = getDebugNode(renderElement);
	            if (isPresent(debugEl) && debugEl instanceof DebugElement) {
	                debugEl.properties[propertyName] = propertyValue;
	            }
	            this._delegate.setElementProperty(renderElement, propertyName, propertyValue);
	        };
	        DebugDomRenderer.prototype.setElementAttribute = function (renderElement, attributeName, attributeValue) {
	            var debugEl = getDebugNode(renderElement);
	            if (isPresent(debugEl) && debugEl instanceof DebugElement) {
	                debugEl.attributes[attributeName] = attributeValue;
	            }
	            this._delegate.setElementAttribute(renderElement, attributeName, attributeValue);
	        };
	        DebugDomRenderer.prototype.setBindingDebugInfo = function (renderElement, propertyName, propertyValue) {
	            this._delegate.setBindingDebugInfo(renderElement, propertyName, propertyValue);
	        };
	        DebugDomRenderer.prototype.setElementClass = function (renderElement, className, isAdd) {
	            var debugEl = getDebugNode(renderElement);
	            if (isPresent(debugEl) && debugEl instanceof DebugElement) {
	                debugEl.classes[className] = isAdd;
	            }
	            this._delegate.setElementClass(renderElement, className, isAdd);
	        };
	        DebugDomRenderer.prototype.setElementStyle = function (renderElement, styleName, styleValue) {
	            var debugEl = getDebugNode(renderElement);
	            if (isPresent(debugEl) && debugEl instanceof DebugElement) {
	                debugEl.styles[styleName] = styleValue;
	            }
	            this._delegate.setElementStyle(renderElement, styleName, styleValue);
	        };
	        DebugDomRenderer.prototype.invokeElementMethod = function (renderElement, methodName, args) {
	            this._delegate.invokeElementMethod(renderElement, methodName, args);
	        };
	        DebugDomRenderer.prototype.setText = function (renderNode, text) { this._delegate.setText(renderNode, text); };
	        DebugDomRenderer.prototype.animate = function (element, startingStyles, keyframes, duration, delay, easing) {
	            return this._delegate.animate(element, startingStyles, keyframes, duration, delay, easing);
	        };
	        return DebugDomRenderer;
	    }());
	
	    var StaticNodeDebugInfo = (function () {
	        function StaticNodeDebugInfo(providerTokens, componentToken, refTokens) {
	            this.providerTokens = providerTokens;
	            this.componentToken = componentToken;
	            this.refTokens = refTokens;
	        }
	        return StaticNodeDebugInfo;
	    }());
	    var DebugContext = (function () {
	        function DebugContext(_view, _nodeIndex, _tplRow, _tplCol) {
	            this._view = _view;
	            this._nodeIndex = _nodeIndex;
	            this._tplRow = _tplRow;
	            this._tplCol = _tplCol;
	        }
	        Object.defineProperty(DebugContext.prototype, "_staticNodeInfo", {
	            get: function () {
	                return isPresent(this._nodeIndex) ? this._view.staticNodeDebugInfos[this._nodeIndex] : null;
	            },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(DebugContext.prototype, "context", {
	            get: function () { return this._view.context; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(DebugContext.prototype, "component", {
	            get: function () {
	                var staticNodeInfo = this._staticNodeInfo;
	                if (isPresent(staticNodeInfo) && isPresent(staticNodeInfo.componentToken)) {
	                    return this.injector.get(staticNodeInfo.componentToken);
	                }
	                return null;
	            },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(DebugContext.prototype, "componentRenderElement", {
	            get: function () {
	                var componentView = this._view;
	                while (isPresent(componentView.declarationAppElement) &&
	                    componentView.type !== ViewType.COMPONENT) {
	                    componentView = componentView.declarationAppElement.parentView;
	                }
	                return isPresent(componentView.declarationAppElement) ?
	                    componentView.declarationAppElement.nativeElement :
	                    null;
	            },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(DebugContext.prototype, "injector", {
	            get: function () { return this._view.injector(this._nodeIndex); },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(DebugContext.prototype, "renderNode", {
	            get: function () {
	                if (isPresent(this._nodeIndex) && this._view.allNodes) {
	                    return this._view.allNodes[this._nodeIndex];
	                }
	                else {
	                    return null;
	                }
	            },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(DebugContext.prototype, "providerTokens", {
	            get: function () {
	                var staticNodeInfo = this._staticNodeInfo;
	                return isPresent(staticNodeInfo) ? staticNodeInfo.providerTokens : null;
	            },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(DebugContext.prototype, "source", {
	            get: function () {
	                return this._view.componentType.templateUrl + ":" + this._tplRow + ":" + this._tplCol;
	            },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(DebugContext.prototype, "references", {
	            get: function () {
	                var _this = this;
	                var varValues = {};
	                var staticNodeInfo = this._staticNodeInfo;
	                if (isPresent(staticNodeInfo)) {
	                    var refs = staticNodeInfo.refTokens;
	                    StringMapWrapper.forEach(refs, function (refToken, refName) {
	                        var varValue;
	                        if (isBlank(refToken)) {
	                            varValue = _this._view.allNodes ? _this._view.allNodes[_this._nodeIndex] : null;
	                        }
	                        else {
	                            varValue = _this._view.injectorGet(refToken, _this._nodeIndex, null);
	                        }
	                        varValues[refName] = varValue;
	                    });
	                }
	                return varValues;
	            },
	            enumerable: true,
	            configurable: true
	        });
	        return DebugContext;
	    }());
	
	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    /**
	     * An instance of this class is returned as an event parameter when an animation
	     * callback is captured for an animation either during the start or done phase.
	     *
	     * ```typescript
	     * @Component({
	     *   host: {
	     *     '[@myAnimationTrigger]': 'someExpression',
	     *     '(@myAnimationTrigger.start)': 'captureStartEvent($event)',
	     *     '(@myAnimationTrigger.done)': 'captureDoneEvent($event)',
	     *   },
	     *   animations: [
	     *     trigger("myAnimationTrigger", [
	     *        // ...
	     *     ])
	     *   ]
	     * })
	     * class MyComponent {
	     *   someExpression: any = false;
	     *   captureStartEvent(event: AnimationTransitionEvent) {
	     *     // the toState, fromState and totalTime data is accessible from the event variable
	     *   }
	     *
	     *   captureDoneEvent(event: AnimationTransitionEvent) {
	     *     // the toState, fromState and totalTime data is accessible from the event variable
	     *   }
	     * }
	     * ```
	     *
	     * @experimental Animation support is experimental.
	     */
	    var AnimationTransitionEvent = (function () {
	        function AnimationTransitionEvent(_a) {
	            var fromState = _a.fromState, toState = _a.toState, totalTime = _a.totalTime;
	            this.fromState = fromState;
	            this.toState = toState;
	            this.totalTime = totalTime;
	        }
	        return AnimationTransitionEvent;
	    }());
	
	    var ViewAnimationMap = (function () {
	        function ViewAnimationMap() {
	            this._map = new Map$1();
	            this._allPlayers = [];
	        }
	        Object.defineProperty(ViewAnimationMap.prototype, "length", {
	            get: function () { return this.getAllPlayers().length; },
	            enumerable: true,
	            configurable: true
	        });
	        ViewAnimationMap.prototype.find = function (element, animationName) {
	            var playersByAnimation = this._map.get(element);
	            if (isPresent(playersByAnimation)) {
	                return playersByAnimation[animationName];
	            }
	        };
	        ViewAnimationMap.prototype.findAllPlayersByElement = function (element) {
	            var el = this._map.get(element);
	            return el ? StringMapWrapper.values(el) : [];
	        };
	        ViewAnimationMap.prototype.set = function (element, animationName, player) {
	            var playersByAnimation = this._map.get(element);
	            if (!isPresent(playersByAnimation)) {
	                playersByAnimation = {};
	            }
	            var existingEntry = playersByAnimation[animationName];
	            if (isPresent(existingEntry)) {
	                this.remove(element, animationName);
	            }
	            playersByAnimation[animationName] = player;
	            this._allPlayers.push(player);
	            this._map.set(element, playersByAnimation);
	        };
	        ViewAnimationMap.prototype.getAllPlayers = function () { return this._allPlayers; };
	        ViewAnimationMap.prototype.remove = function (element, animationName) {
	            var playersByAnimation = this._map.get(element);
	            if (isPresent(playersByAnimation)) {
	                var player = playersByAnimation[animationName];
	                delete playersByAnimation[animationName];
	                var index = this._allPlayers.indexOf(player);
	                ListWrapper.removeAt(this._allPlayers, index);
	                if (StringMapWrapper.isEmpty(playersByAnimation)) {
	                    this._map.delete(element);
	                }
	            }
	        };
	        return ViewAnimationMap;
	    }());
	
	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var __extends$15 = (this && this.__extends) || function (d, b) {
	        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	    var _UNDEFINED$1 = new Object();
	    var ElementInjector = (function (_super) {
	        __extends$15(ElementInjector, _super);
	        function ElementInjector(_view, _nodeIndex) {
	            _super.call(this);
	            this._view = _view;
	            this._nodeIndex = _nodeIndex;
	        }
	        ElementInjector.prototype.get = function (token, notFoundValue) {
	            if (notFoundValue === void 0) { notFoundValue = THROW_IF_NOT_FOUND; }
	            var result = _UNDEFINED$1;
	            if (result === _UNDEFINED$1) {
	                result = this._view.injectorGet(token, this._nodeIndex, _UNDEFINED$1);
	            }
	            if (result === _UNDEFINED$1) {
	                result = this._view.parentInjector.get(token, notFoundValue);
	            }
	            return result;
	        };
	        return ElementInjector;
	    }(Injector));
	
	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var __extends$14 = (this && this.__extends) || function (d, b) {
	        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	    var _scope_check = wtfCreateScope("AppView#check(ascii id)");
	    /**
	     * Cost of making objects: http://jsperf.com/instantiate-size-of-object
	     *
	     */
	    var AppView = (function () {
	        function AppView(clazz, componentType, type, viewUtils, parentInjector, declarationAppElement, cdMode) {
	            this.clazz = clazz;
	            this.componentType = componentType;
	            this.type = type;
	            this.viewUtils = viewUtils;
	            this.parentInjector = parentInjector;
	            this.declarationAppElement = declarationAppElement;
	            this.cdMode = cdMode;
	            this.contentChildren = [];
	            this.viewChildren = [];
	            this.viewContainerElement = null;
	            this.numberOfChecks = 0;
	            this.animationPlayers = new ViewAnimationMap();
	            this._animationListeners = new Map();
	            this.ref = new ViewRef_(this);
	            if (type === ViewType.COMPONENT || type === ViewType.HOST) {
	                this.renderer = viewUtils.renderComponent(componentType);
	            }
	            else {
	                this.renderer = declarationAppElement.parentView.renderer;
	            }
	        }
	        Object.defineProperty(AppView.prototype, "destroyed", {
	            get: function () { return this.cdMode === ChangeDetectorStatus.Destroyed; },
	            enumerable: true,
	            configurable: true
	        });
	        AppView.prototype.cancelActiveAnimation = function (element, animationName, removeAllAnimations) {
	            if (removeAllAnimations === void 0) { removeAllAnimations = false; }
	            if (removeAllAnimations) {
	                this.animationPlayers.findAllPlayersByElement(element).forEach(function (player) { return player.destroy(); });
	            }
	            else {
	                var player = this.animationPlayers.find(element, animationName);
	                if (isPresent(player)) {
	                    player.destroy();
	                }
	            }
	        };
	        AppView.prototype.queueAnimation = function (element, animationName, player, totalTime, fromState, toState) {
	            var _this = this;
	            queueAnimation(player);
	            var event = new AnimationTransitionEvent({ 'fromState': fromState, 'toState': toState, 'totalTime': totalTime });
	            this.animationPlayers.set(element, animationName, player);
	            player.onDone(function () {
	                // TODO: make this into a datastructure for done|start
	                _this.triggerAnimationOutput(element, animationName, 'done', event);
	                _this.animationPlayers.remove(element, animationName);
	            });
	            player.onStart(function () { _this.triggerAnimationOutput(element, animationName, 'start', event); });
	        };
	        AppView.prototype.triggerAnimationOutput = function (element, animationName, phase, event) {
	            var listeners = this._animationListeners.get(element);
	            if (isPresent(listeners) && listeners.length) {
	                for (var i = 0; i < listeners.length; i++) {
	                    var listener = listeners[i];
	                    // we check for both the name in addition to the phase in the event
	                    // that there may be more than one @trigger on the same element
	                    if (listener.output.name == animationName && listener.output.phase == phase) {
	                        listener.handler(event);
	                        break;
	                    }
	                }
	            }
	        };
	        AppView.prototype.registerAnimationOutput = function (element, outputEvent, eventHandler) {
	            var entry = new _AnimationOutputWithHandler(outputEvent, eventHandler);
	            var animations = this._animationListeners.get(element);
	            if (!isPresent(animations)) {
	                this._animationListeners.set(element, animations = []);
	            }
	            animations.push(entry);
	        };
	        AppView.prototype.create = function (context, givenProjectableNodes, rootSelectorOrNode) {
	            this.context = context;
	            var projectableNodes;
	            switch (this.type) {
	                case ViewType.COMPONENT:
	                    projectableNodes = ensureSlotCount(givenProjectableNodes, this.componentType.slotCount);
	                    break;
	                case ViewType.EMBEDDED:
	                    projectableNodes = this.declarationAppElement.parentView.projectableNodes;
	                    break;
	                case ViewType.HOST:
	                    // Note: Don't ensure the slot count for the projectableNodes as we store
	                    // them only for the contained component view (which will later check the slot count...)
	                    projectableNodes = givenProjectableNodes;
	                    break;
	            }
	            this._hasExternalHostElement = isPresent(rootSelectorOrNode);
	            this.projectableNodes = projectableNodes;
	            return this.createInternal(rootSelectorOrNode);
	        };
	        /**
	         * Overwritten by implementations.
	         * Returns the AppElement for the host element for ViewType.HOST.
	         */
	        AppView.prototype.createInternal = function (rootSelectorOrNode) { return null; };
	        AppView.prototype.init = function (rootNodesOrAppElements, allNodes, disposables, subscriptions) {
	            this.rootNodesOrAppElements = rootNodesOrAppElements;
	            this.allNodes = allNodes;
	            this.disposables = disposables;
	            this.subscriptions = subscriptions;
	            if (this.type === ViewType.COMPONENT) {
	                // Note: the render nodes have been attached to their host element
	                // in the ViewFactory already.
	                this.declarationAppElement.parentView.viewChildren.push(this);
	                this.dirtyParentQueriesInternal();
	            }
	        };
	        AppView.prototype.selectOrCreateHostElement = function (elementName, rootSelectorOrNode, debugInfo) {
	            var hostElement;
	            if (isPresent(rootSelectorOrNode)) {
	                hostElement = this.renderer.selectRootElement(rootSelectorOrNode, debugInfo);
	            }
	            else {
	                hostElement = this.renderer.createElement(null, elementName, debugInfo);
	            }
	            return hostElement;
	        };
	        AppView.prototype.injectorGet = function (token, nodeIndex, notFoundResult) {
	            return this.injectorGetInternal(token, nodeIndex, notFoundResult);
	        };
	        /**
	         * Overwritten by implementations
	         */
	        AppView.prototype.injectorGetInternal = function (token, nodeIndex, notFoundResult) {
	            return notFoundResult;
	        };
	        AppView.prototype.injector = function (nodeIndex) {
	            if (isPresent(nodeIndex)) {
	                return new ElementInjector(this, nodeIndex);
	            }
	            else {
	                return this.parentInjector;
	            }
	        };
	        AppView.prototype.destroy = function () {
	            if (this._hasExternalHostElement) {
	                this.renderer.detachView(this.flatRootNodes);
	            }
	            else if (isPresent(this.viewContainerElement)) {
	                this.viewContainerElement.detachView(this.viewContainerElement.nestedViews.indexOf(this));
	            }
	            this._destroyRecurse();
	        };
	        AppView.prototype._destroyRecurse = function () {
	            if (this.cdMode === ChangeDetectorStatus.Destroyed) {
	                return;
	            }
	            var children = this.contentChildren;
	            for (var i = 0; i < children.length; i++) {
	                children[i]._destroyRecurse();
	            }
	            children = this.viewChildren;
	            for (var i = 0; i < children.length; i++) {
	                children[i]._destroyRecurse();
	            }
	            this.destroyLocal();
	            this.cdMode = ChangeDetectorStatus.Destroyed;
	        };
	        AppView.prototype.destroyLocal = function () {
	            var _this = this;
	            var hostElement = this.type === ViewType.COMPONENT ? this.declarationAppElement.nativeElement : null;
	            for (var i = 0; i < this.disposables.length; i++) {
	                this.disposables[i]();
	            }
	            for (var i = 0; i < this.subscriptions.length; i++) {
	                this.subscriptions[i].unsubscribe();
	            }
	            this.destroyInternal();
	            this.dirtyParentQueriesInternal();
	            if (this.animationPlayers.length == 0) {
	                this.renderer.destroyView(hostElement, this.allNodes);
	            }
	            else {
	                var player = new AnimationGroupPlayer(this.animationPlayers.getAllPlayers());
	                player.onDone(function () { _this.renderer.destroyView(hostElement, _this.allNodes); });
	            }
	        };
	        /**
	         * Overwritten by implementations
	         */
	        AppView.prototype.destroyInternal = function () { };
	        /**
	         * Overwritten by implementations
	         */
	        AppView.prototype.detachInternal = function () { };
	        AppView.prototype.detach = function () {
	            var _this = this;
	            this.detachInternal();
	            if (this.animationPlayers.length == 0) {
	                this.renderer.detachView(this.flatRootNodes);
	            }
	            else {
	                var player = new AnimationGroupPlayer(this.animationPlayers.getAllPlayers());
	                player.onDone(function () { _this.renderer.detachView(_this.flatRootNodes); });
	            }
	        };
	        Object.defineProperty(AppView.prototype, "changeDetectorRef", {
	            get: function () { return this.ref; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AppView.prototype, "parent", {
	            get: function () {
	                return isPresent(this.declarationAppElement) ? this.declarationAppElement.parentView : null;
	            },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AppView.prototype, "flatRootNodes", {
	            get: function () { return flattenNestedViewRenderNodes(this.rootNodesOrAppElements); },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(AppView.prototype, "lastRootNode", {
	            get: function () {
	                var lastNode = this.rootNodesOrAppElements.length > 0 ?
	                    this.rootNodesOrAppElements[this.rootNodesOrAppElements.length - 1] :
	                    null;
	                return _findLastRenderNode(lastNode);
	            },
	            enumerable: true,
	            configurable: true
	        });
	        /**
	         * Overwritten by implementations
	         */
	        AppView.prototype.dirtyParentQueriesInternal = function () { };
	        AppView.prototype.detectChanges = function (throwOnChange) {
	            var s = _scope_check(this.clazz);
	            if (this.cdMode === ChangeDetectorStatus.Checked ||
	                this.cdMode === ChangeDetectorStatus.Errored)
	                return;
	            if (this.cdMode === ChangeDetectorStatus.Destroyed) {
	                this.throwDestroyedError('detectChanges');
	            }
	            this.detectChangesInternal(throwOnChange);
	            if (this.cdMode === ChangeDetectorStatus.CheckOnce)
	                this.cdMode = ChangeDetectorStatus.Checked;
	            this.numberOfChecks++;
	            wtfLeave(s);
	        };
	        /**
	         * Overwritten by implementations
	         */
	        AppView.prototype.detectChangesInternal = function (throwOnChange) {
	            this.detectContentChildrenChanges(throwOnChange);
	            this.detectViewChildrenChanges(throwOnChange);
	        };
	        AppView.prototype.detectContentChildrenChanges = function (throwOnChange) {
	            for (var i = 0; i < this.contentChildren.length; ++i) {
	                var child = this.contentChildren[i];
	                if (child.cdMode === ChangeDetectorStatus.Detached)
	                    continue;
	                child.detectChanges(throwOnChange);
	            }
	        };
	        AppView.prototype.detectViewChildrenChanges = function (throwOnChange) {
	            for (var i = 0; i < this.viewChildren.length; ++i) {
	                var child = this.viewChildren[i];
	                if (child.cdMode === ChangeDetectorStatus.Detached)
	                    continue;
	                child.detectChanges(throwOnChange);
	            }
	        };
	        AppView.prototype.markContentChildAsMoved = function (renderAppElement) { this.dirtyParentQueriesInternal(); };
	        AppView.prototype.addToContentChildren = function (renderAppElement) {
	            renderAppElement.parentView.contentChildren.push(this);
	            this.viewContainerElement = renderAppElement;
	            this.dirtyParentQueriesInternal();
	        };
	        AppView.prototype.removeFromContentChildren = function (renderAppElement) {
	            ListWrapper.remove(renderAppElement.parentView.contentChildren, this);
	            this.dirtyParentQueriesInternal();
	            this.viewContainerElement = null;
	        };
	        AppView.prototype.markAsCheckOnce = function () { this.cdMode = ChangeDetectorStatus.CheckOnce; };
	        AppView.prototype.markPathToRootAsCheckOnce = function () {
	            var c = this;
	            while (isPresent(c) && c.cdMode !== ChangeDetectorStatus.Detached) {
	                if (c.cdMode === ChangeDetectorStatus.Checked) {
	                    c.cdMode = ChangeDetectorStatus.CheckOnce;
	                }
	                var parentEl = c.type === ViewType.COMPONENT ? c.declarationAppElement : c.viewContainerElement;
	                c = isPresent(parentEl) ? parentEl.parentView : null;
	            }
	        };
	        AppView.prototype.eventHandler = function (cb) { return cb; };
	        AppView.prototype.throwDestroyedError = function (details) { throw new ViewDestroyedError(details); };
	        return AppView;
	    }());
	    var DebugAppView = (function (_super) {
	        __extends$14(DebugAppView, _super);
	        function DebugAppView(clazz, componentType, type, viewUtils, parentInjector, declarationAppElement, cdMode, staticNodeDebugInfos) {
	            _super.call(this, clazz, componentType, type, viewUtils, parentInjector, declarationAppElement, cdMode);
	            this.staticNodeDebugInfos = staticNodeDebugInfos;
	            this._currentDebugContext = null;
	        }
	        DebugAppView.prototype.create = function (context, givenProjectableNodes, rootSelectorOrNode) {
	            this._resetDebug();
	            try {
	                return _super.prototype.create.call(this, context, givenProjectableNodes, rootSelectorOrNode);
	            }
	            catch (e) {
	                this._rethrowWithContext(e);
	                throw e;
	            }
	        };
	        DebugAppView.prototype.injectorGet = function (token, nodeIndex, notFoundResult) {
	            this._resetDebug();
	            try {
	                return _super.prototype.injectorGet.call(this, token, nodeIndex, notFoundResult);
	            }
	            catch (e) {
	                this._rethrowWithContext(e);
	                throw e;
	            }
	        };
	        DebugAppView.prototype.detach = function () {
	            this._resetDebug();
	            try {
	                _super.prototype.detach.call(this);
	            }
	            catch (e) {
	                this._rethrowWithContext(e);
	                throw e;
	            }
	        };
	        DebugAppView.prototype.destroyLocal = function () {
	            this._resetDebug();
	            try {
	                _super.prototype.destroyLocal.call(this);
	            }
	            catch (e) {
	                this._rethrowWithContext(e);
	                throw e;
	            }
	        };
	        DebugAppView.prototype.detectChanges = function (throwOnChange) {
	            this._resetDebug();
	            try {
	                _super.prototype.detectChanges.call(this, throwOnChange);
	            }
	            catch (e) {
	                this._rethrowWithContext(e);
	                throw e;
	            }
	        };
	        DebugAppView.prototype._resetDebug = function () { this._currentDebugContext = null; };
	        DebugAppView.prototype.debug = function (nodeIndex, rowNum, colNum) {
	            return this._currentDebugContext = new DebugContext(this, nodeIndex, rowNum, colNum);
	        };
	        DebugAppView.prototype._rethrowWithContext = function (e) {
	            if (!(e instanceof ViewWrappedError)) {
	                if (!(e instanceof ExpressionChangedAfterItHasBeenCheckedError)) {
	                    this.cdMode = ChangeDetectorStatus.Errored;
	                }
	                if (isPresent(this._currentDebugContext)) {
	                    throw new ViewWrappedError(e, this._currentDebugContext);
	                }
	            }
	        };
	        DebugAppView.prototype.eventHandler = function (cb) {
	            var _this = this;
	            var superHandler = _super.prototype.eventHandler.call(this, cb);
	            return function (event) {
	                _this._resetDebug();
	                try {
	                    return superHandler(event);
	                }
	                catch (e) {
	                    _this._rethrowWithContext(e);
	                    throw e;
	                }
	            };
	        };
	        return DebugAppView;
	    }(AppView));
	    function _findLastRenderNode(node) {
	        var lastNode;
	        if (node instanceof AppElement) {
	            var appEl = node;
	            lastNode = appEl.nativeElement;
	            if (isPresent(appEl.nestedViews)) {
	                // Note: Views might have no root nodes at all!
	                for (var i = appEl.nestedViews.length - 1; i >= 0; i--) {
	                    var nestedView = appEl.nestedViews[i];
	                    if (nestedView.rootNodesOrAppElements.length > 0) {
	                        lastNode = _findLastRenderNode(nestedView.rootNodesOrAppElements[nestedView.rootNodesOrAppElements.length - 1]);
	                    }
	                }
	            }
	        }
	        else {
	            lastNode = node;
	        }
	        return lastNode;
	    }
	    var _AnimationOutputWithHandler = (function () {
	        function _AnimationOutputWithHandler(output, handler) {
	            this.output = output;
	            this.handler = handler;
	        }
	        return _AnimationOutputWithHandler;
	    }());
	
	    var __core_private__ = {
	        isDefaultChangeDetectionStrategy: isDefaultChangeDetectionStrategy,
	        ChangeDetectorStatus: ChangeDetectorStatus,
	        CHANGE_DETECTION_STRATEGY_VALUES: CHANGE_DETECTION_STRATEGY_VALUES,
	        constructDependencies: constructDependencies,
	        LifecycleHooks: LifecycleHooks,
	        LIFECYCLE_HOOKS_VALUES: LIFECYCLE_HOOKS_VALUES,
	        ReflectorReader: ReflectorReader,
	        CodegenComponentFactoryResolver: CodegenComponentFactoryResolver,
	        AppElement: AppElement,
	        AppView: AppView,
	        DebugAppView: DebugAppView,
	        NgModuleInjector: NgModuleInjector,
	        registerModuleFactory: registerModuleFactory,
	        ViewType: ViewType,
	        MAX_INTERPOLATION_VALUES: MAX_INTERPOLATION_VALUES,
	        checkBinding: checkBinding,
	        flattenNestedViewRenderNodes: flattenNestedViewRenderNodes,
	        interpolate: interpolate,
	        ViewUtils: ViewUtils,
	        VIEW_ENCAPSULATION_VALUES: VIEW_ENCAPSULATION_VALUES,
	        ViewMetadata: ViewMetadata,
	        DebugContext: DebugContext,
	        StaticNodeDebugInfo: StaticNodeDebugInfo,
	        devModeEqual: devModeEqual,
	        UNINITIALIZED: UNINITIALIZED,
	        ValueUnwrapper: ValueUnwrapper,
	        RenderDebugInfo: RenderDebugInfo,
	        TemplateRef_: TemplateRef_,
	        ReflectionCapabilities: ReflectionCapabilities,
	        makeDecorator: makeDecorator,
	        DebugDomRootRenderer: DebugDomRootRenderer,
	        EMPTY_ARRAY: EMPTY_ARRAY,
	        EMPTY_MAP: EMPTY_MAP,
	        pureProxy1: pureProxy1,
	        pureProxy2: pureProxy2,
	        pureProxy3: pureProxy3,
	        pureProxy4: pureProxy4,
	        pureProxy5: pureProxy5,
	        pureProxy6: pureProxy6,
	        pureProxy7: pureProxy7,
	        pureProxy8: pureProxy8,
	        pureProxy9: pureProxy9,
	        pureProxy10: pureProxy10,
	        castByValue: castByValue,
	        Console: Console,
	        reflector: reflector,
	        Reflector: Reflector,
	        NoOpAnimationPlayer: NoOpAnimationPlayer,
	        AnimationPlayer: AnimationPlayer,
	        AnimationSequencePlayer: AnimationSequencePlayer,
	        AnimationGroupPlayer: AnimationGroupPlayer,
	        AnimationKeyframe: AnimationKeyframe,
	        prepareFinalAnimationStyles: prepareFinalAnimationStyles,
	        balanceAnimationKeyframes: balanceAnimationKeyframes,
	        flattenStyles: flattenStyles,
	        clearStyles: clearStyles,
	        renderStyles: renderStyles,
	        collectAndResolveStyles: collectAndResolveStyles,
	        AnimationStyles: AnimationStyles,
	        AnimationOutput: AnimationOutput,
	        ANY_STATE: ANY_STATE,
	        DEFAULT_STATE: DEFAULT_STATE,
	        EMPTY_STATE: EMPTY_STATE,
	        FILL_STYLE_FLAG: FILL_STYLE_FLAG,
	        ComponentStillLoadingError: ComponentStillLoadingError
	    };
	
	    exports.createPlatform = createPlatform;
	    exports.assertPlatform = assertPlatform;
	    exports.destroyPlatform = destroyPlatform;
	    exports.getPlatform = getPlatform;
	    exports.PlatformRef = PlatformRef;
	    exports.ApplicationRef = ApplicationRef;
	    exports.enableProdMode = enableProdMode;
	    exports.isDevMode = isDevMode;
	    exports.createPlatformFactory = createPlatformFactory;
	    exports.APP_ID = APP_ID;
	    exports.PACKAGE_ROOT_URL = PACKAGE_ROOT_URL;
	    exports.PLATFORM_INITIALIZER = PLATFORM_INITIALIZER;
	    exports.APP_BOOTSTRAP_LISTENER = APP_BOOTSTRAP_LISTENER;
	    exports.APP_INITIALIZER = APP_INITIALIZER;
	    exports.ApplicationInitStatus = ApplicationInitStatus;
	    exports.DebugElement = DebugElement;
	    exports.DebugNode = DebugNode;
	    exports.asNativeElements = asNativeElements;
	    exports.getDebugNode = getDebugNode;
	    exports.Testability = Testability;
	    exports.TestabilityRegistry = TestabilityRegistry;
	    exports.setTestabilityGetter = setTestabilityGetter;
	    exports.TRANSLATIONS = TRANSLATIONS;
	    exports.TRANSLATIONS_FORMAT = TRANSLATIONS_FORMAT;
	    exports.LOCALE_ID = LOCALE_ID;
	    exports.ApplicationModule = ApplicationModule;
	    exports.wtfCreateScope = wtfCreateScope;
	    exports.wtfLeave = wtfLeave;
	    exports.wtfStartTimeRange = wtfStartTimeRange;
	    exports.wtfEndTimeRange = wtfEndTimeRange;
	    exports.Type = Type;
	    exports.EventEmitter = EventEmitter;
	    exports.ErrorHandler = ErrorHandler;
	    exports.AnimationTransitionEvent = AnimationTransitionEvent;
	    exports.AnimationPlayer = AnimationPlayer;
	    exports.Sanitizer = Sanitizer;
	    exports.ANALYZE_FOR_ENTRY_COMPONENTS = ANALYZE_FOR_ENTRY_COMPONENTS;
	    exports.Attribute = Attribute;
	    exports.ContentChild = ContentChild;
	    exports.ContentChildren = ContentChildren;
	    exports.Query = Query;
	    exports.ViewChild = ViewChild;
	    exports.ViewChildren = ViewChildren;
	    exports.Component = Component;
	    exports.Directive = Directive;
	    exports.HostBinding = HostBinding;
	    exports.HostListener = HostListener;
	    exports.Input = Input;
	    exports.Output = Output;
	    exports.Pipe = Pipe;
	    exports.AfterContentChecked = AfterContentChecked;
	    exports.AfterContentInit = AfterContentInit;
	    exports.AfterViewChecked = AfterViewChecked;
	    exports.AfterViewInit = AfterViewInit;
	    exports.DoCheck = DoCheck;
	    exports.OnChanges = OnChanges;
	    exports.OnDestroy = OnDestroy;
	    exports.OnInit = OnInit;
	    exports.CUSTOM_ELEMENTS_SCHEMA = CUSTOM_ELEMENTS_SCHEMA;
	    exports.NO_ERRORS_SCHEMA = NO_ERRORS_SCHEMA;
	    exports.NgModule = NgModule;
	    exports.Class = Class;
	    exports.forwardRef = forwardRef;
	    exports.resolveForwardRef = resolveForwardRef;
	    exports.Injector = Injector;
	    exports.ReflectiveInjector = ReflectiveInjector;
	    exports.ResolvedReflectiveFactory = ResolvedReflectiveFactory;
	    exports.ReflectiveKey = ReflectiveKey;
	    exports.OpaqueToken = OpaqueToken;
	    exports.Inject = Inject;
	    exports.Optional = Optional;
	    exports.Injectable = Injectable;
	    exports.Self = Self;
	    exports.SkipSelf = SkipSelf;
	    exports.Host = Host;
	    exports.NgZone = NgZone;
	    exports.RenderComponentType = RenderComponentType;
	    exports.Renderer = Renderer;
	    exports.RootRenderer = RootRenderer;
	    exports.COMPILER_OPTIONS = COMPILER_OPTIONS;
	    exports.Compiler = Compiler;
	    exports.CompilerFactory = CompilerFactory;
	    exports.ModuleWithComponentFactories = ModuleWithComponentFactories;
	    exports.ComponentFactory = ComponentFactory;
	    exports.ComponentRef = ComponentRef;
	    exports.ComponentFactoryResolver = ComponentFactoryResolver;
	    exports.ElementRef = ElementRef;
	    exports.NgModuleFactory = NgModuleFactory;
	    exports.NgModuleRef = NgModuleRef;
	    exports.NgModuleFactoryLoader = NgModuleFactoryLoader;
	    exports.getModuleFactory = getModuleFactory;
	    exports.QueryList = QueryList;
	    exports.SystemJsNgModuleLoader = SystemJsNgModuleLoader;
	    exports.SystemJsNgModuleLoaderConfig = SystemJsNgModuleLoaderConfig;
	    exports.TemplateRef = TemplateRef;
	    exports.ViewContainerRef = ViewContainerRef;
	    exports.EmbeddedViewRef = EmbeddedViewRef;
	    exports.ViewRef = ViewRef;
	    exports.ChangeDetectorRef = ChangeDetectorRef;
	    exports.CollectionChangeRecord = CollectionChangeRecord;
	    exports.DefaultIterableDiffer = DefaultIterableDiffer;
	    exports.IterableDiffers = IterableDiffers;
	    exports.KeyValueChangeRecord = KeyValueChangeRecord;
	    exports.KeyValueDiffers = KeyValueDiffers;
	    exports.SimpleChange = SimpleChange;
	    exports.WrappedValue = WrappedValue;
	    exports.platformCore = platformCore;
	    exports.__core_private__ = __core_private__;
	    exports.AUTO_STYLE = AUTO_STYLE;
	    exports.AnimationEntryMetadata = AnimationEntryMetadata;
	    exports.AnimationStateMetadata = AnimationStateMetadata;
	    exports.AnimationStateDeclarationMetadata = AnimationStateDeclarationMetadata;
	    exports.AnimationStateTransitionMetadata = AnimationStateTransitionMetadata;
	    exports.AnimationMetadata = AnimationMetadata;
	    exports.AnimationKeyframesSequenceMetadata = AnimationKeyframesSequenceMetadata;
	    exports.AnimationStyleMetadata = AnimationStyleMetadata;
	    exports.AnimationAnimateMetadata = AnimationAnimateMetadata;
	    exports.AnimationWithStepsMetadata = AnimationWithStepsMetadata;
	    exports.AnimationSequenceMetadata = AnimationSequenceMetadata;
	    exports.AnimationGroupMetadata = AnimationGroupMetadata;
	    exports.animate = animate;
	    exports.group = group;
	    exports.sequence = sequence;
	    exports.style = style;
	    exports.state = state;
	    exports.keyframes = keyframes;
	    exports.transition = transition;
	    exports.trigger = trigger;
	
	}));
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1 = __webpack_require__(104);
	var Subscriber_1 = __webpack_require__(107);
	var Subscription_1 = __webpack_require__(109);
	var ObjectUnsubscribedError_1 = __webpack_require__(118);
	var SubjectSubscription_1 = __webpack_require__(119);
	var rxSubscriber_1 = __webpack_require__(116);
	/**
	 * @class SubjectSubscriber<T>
	 */
	var SubjectSubscriber = (function (_super) {
	    __extends(SubjectSubscriber, _super);
	    function SubjectSubscriber(destination) {
	        _super.call(this, destination);
	        this.destination = destination;
	    }
	    return SubjectSubscriber;
	}(Subscriber_1.Subscriber));
	exports.SubjectSubscriber = SubjectSubscriber;
	/**
	 * @class Subject<T>
	 */
	var Subject = (function (_super) {
	    __extends(Subject, _super);
	    function Subject() {
	        _super.call(this);
	        this.observers = [];
	        this.closed = false;
	        this.isStopped = false;
	        this.hasError = false;
	        this.thrownError = null;
	    }
	    Subject.prototype[rxSubscriber_1.$$rxSubscriber] = function () {
	        return new SubjectSubscriber(this);
	    };
	    Subject.prototype.lift = function (operator) {
	        var subject = new AnonymousSubject(this, this);
	        subject.operator = operator;
	        return subject;
	    };
	    Subject.prototype.next = function (value) {
	        if (this.closed) {
	            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
	        }
	        if (!this.isStopped) {
	            var observers = this.observers;
	            var len = observers.length;
	            var copy = observers.slice();
	            for (var i = 0; i < len; i++) {
	                copy[i].next(value);
	            }
	        }
	    };
	    Subject.prototype.error = function (err) {
	        if (this.closed) {
	            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
	        }
	        this.hasError = true;
	        this.thrownError = err;
	        this.isStopped = true;
	        var observers = this.observers;
	        var len = observers.length;
	        var copy = observers.slice();
	        for (var i = 0; i < len; i++) {
	            copy[i].error(err);
	        }
	        this.observers.length = 0;
	    };
	    Subject.prototype.complete = function () {
	        if (this.closed) {
	            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
	        }
	        this.isStopped = true;
	        var observers = this.observers;
	        var len = observers.length;
	        var copy = observers.slice();
	        for (var i = 0; i < len; i++) {
	            copy[i].complete();
	        }
	        this.observers.length = 0;
	    };
	    Subject.prototype.unsubscribe = function () {
	        this.isStopped = true;
	        this.closed = true;
	        this.observers = null;
	    };
	    Subject.prototype._subscribe = function (subscriber) {
	        if (this.closed) {
	            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
	        }
	        else if (this.hasError) {
	            subscriber.error(this.thrownError);
	            return Subscription_1.Subscription.EMPTY;
	        }
	        else if (this.isStopped) {
	            subscriber.complete();
	            return Subscription_1.Subscription.EMPTY;
	        }
	        else {
	            this.observers.push(subscriber);
	            return new SubjectSubscription_1.SubjectSubscription(this, subscriber);
	        }
	    };
	    Subject.prototype.asObservable = function () {
	        var observable = new Observable_1.Observable();
	        observable.source = this;
	        return observable;
	    };
	    Subject.create = function (destination, source) {
	        return new AnonymousSubject(destination, source);
	    };
	    return Subject;
	}(Observable_1.Observable));
	exports.Subject = Subject;
	/**
	 * @class AnonymousSubject<T>
	 */
	var AnonymousSubject = (function (_super) {
	    __extends(AnonymousSubject, _super);
	    function AnonymousSubject(destination, source) {
	        _super.call(this);
	        this.destination = destination;
	        this.source = source;
	    }
	    AnonymousSubject.prototype.next = function (value) {
	        var destination = this.destination;
	        if (destination && destination.next) {
	            destination.next(value);
	        }
	    };
	    AnonymousSubject.prototype.error = function (err) {
	        var destination = this.destination;
	        if (destination && destination.error) {
	            this.destination.error(err);
	        }
	    };
	    AnonymousSubject.prototype.complete = function () {
	        var destination = this.destination;
	        if (destination && destination.complete) {
	            this.destination.complete();
	        }
	    };
	    AnonymousSubject.prototype._subscribe = function (subscriber) {
	        var source = this.source;
	        if (source) {
	            return this.source.subscribe(subscriber);
	        }
	        else {
	            return Subscription_1.Subscription.EMPTY;
	        }
	    };
	    return AnonymousSubject;
	}(Subject));
	exports.AnonymousSubject = AnonymousSubject;
	//# sourceMappingURL=Subject.js.map

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var root_1 = __webpack_require__(105);
	var toSubscriber_1 = __webpack_require__(106);
	var observable_1 = __webpack_require__(117);
	/**
	 * A representation of any set of values over any amount of time. This the most basic building block
	 * of RxJS.
	 *
	 * @class Observable<T>
	 */
	var Observable = (function () {
	    /**
	     * @constructor
	     * @param {Function} subscribe the function that is  called when the Observable is
	     * initially subscribed to. This function is given a Subscriber, to which new values
	     * can be `next`ed, or an `error` method can be called to raise an error, or
	     * `complete` can be called to notify of a successful completion.
	     */
	    function Observable(subscribe) {
	        this._isScalar = false;
	        if (subscribe) {
	            this._subscribe = subscribe;
	        }
	    }
	    /**
	     * Creates a new Observable, with this Observable as the source, and the passed
	     * operator defined as the new observable's operator.
	     * @method lift
	     * @param {Operator} operator the operator defining the operation to take on the observable
	     * @return {Observable} a new observable with the Operator applied
	     */
	    Observable.prototype.lift = function (operator) {
	        var observable = new Observable();
	        observable.source = this;
	        observable.operator = operator;
	        return observable;
	    };
	    /**
	     * Registers handlers for handling emitted values, error and completions from the observable, and
	     *  executes the observable's subscriber function, which will take action to set up the underlying data stream
	     * @method subscribe
	     * @param {PartialObserver|Function} observerOrNext (optional) either an observer defining all functions to be called,
	     *  or the first of three possible handlers, which is the handler for each value emitted from the observable.
	     * @param {Function} error (optional) a handler for a terminal event resulting from an error. If no error handler is provided,
	     *  the error will be thrown as unhandled
	     * @param {Function} complete (optional) a handler for a terminal event resulting from successful completion.
	     * @return {ISubscription} a subscription reference to the registered handlers
	     */
	    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
	        var operator = this.operator;
	        var sink = toSubscriber_1.toSubscriber(observerOrNext, error, complete);
	        if (operator) {
	            operator.call(sink, this);
	        }
	        else {
	            sink.add(this._subscribe(sink));
	        }
	        if (sink.syncErrorThrowable) {
	            sink.syncErrorThrowable = false;
	            if (sink.syncErrorThrown) {
	                throw sink.syncErrorValue;
	            }
	        }
	        return sink;
	    };
	    /**
	     * @method forEach
	     * @param {Function} next a handler for each value emitted by the observable
	     * @param {PromiseConstructor} [PromiseCtor] a constructor function used to instantiate the Promise
	     * @return {Promise} a promise that either resolves on observable completion or
	     *  rejects with the handled error
	     */
	    Observable.prototype.forEach = function (next, PromiseCtor) {
	        var _this = this;
	        if (!PromiseCtor) {
	            if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
	                PromiseCtor = root_1.root.Rx.config.Promise;
	            }
	            else if (root_1.root.Promise) {
	                PromiseCtor = root_1.root.Promise;
	            }
	        }
	        if (!PromiseCtor) {
	            throw new Error('no Promise impl found');
	        }
	        return new PromiseCtor(function (resolve, reject) {
	            var subscription = _this.subscribe(function (value) {
	                if (subscription) {
	                    // if there is a subscription, then we can surmise
	                    // the next handling is asynchronous. Any errors thrown
	                    // need to be rejected explicitly and unsubscribe must be
	                    // called manually
	                    try {
	                        next(value);
	                    }
	                    catch (err) {
	                        reject(err);
	                        subscription.unsubscribe();
	                    }
	                }
	                else {
	                    // if there is NO subscription, then we're getting a nexted
	                    // value synchronously during subscription. We can just call it.
	                    // If it errors, Observable's `subscribe` will ensure the
	                    // unsubscription logic is called, then synchronously rethrow the error.
	                    // After that, Promise will trap the error and send it
	                    // down the rejection path.
	                    next(value);
	                }
	            }, reject, resolve);
	        });
	    };
	    Observable.prototype._subscribe = function (subscriber) {
	        return this.source.subscribe(subscriber);
	    };
	    /**
	     * An interop point defined by the es7-observable spec https://github.com/zenparsing/es-observable
	     * @method Symbol.observable
	     * @return {Observable} this instance of the observable
	     */
	    Observable.prototype[observable_1.$$observable] = function () {
	        return this;
	    };
	    // HACK: Since TypeScript inherits static properties too, we have to
	    // fight against TypeScript here so Subject can have a different static create signature
	    /**
	     * Creates a new cold Observable by calling the Observable constructor
	     * @static true
	     * @owner Observable
	     * @method create
	     * @param {Function} subscribe? the subscriber function to be passed to the Observable constructor
	     * @return {Observable} a new cold observable
	     */
	    Observable.create = function (subscribe) {
	        return new Observable(subscribe);
	    };
	    return Observable;
	}());
	exports.Observable = Observable;
	//# sourceMappingURL=Observable.js.map

/***/ },
/* 105 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	var objectTypes = {
	    'boolean': false,
	    'function': true,
	    'object': true,
	    'number': false,
	    'string': false,
	    'undefined': false
	};
	exports.root = (objectTypes[typeof self] && self) || (objectTypes[typeof window] && window);
	var freeGlobal = objectTypes[typeof global] && global;
	if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal)) {
	    exports.root = freeGlobal;
	}
	//# sourceMappingURL=root.js.map
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Subscriber_1 = __webpack_require__(107);
	var rxSubscriber_1 = __webpack_require__(116);
	function toSubscriber(nextOrObserver, error, complete) {
	    if (nextOrObserver) {
	        if (nextOrObserver instanceof Subscriber_1.Subscriber) {
	            return nextOrObserver;
	        }
	        if (nextOrObserver[rxSubscriber_1.$$rxSubscriber]) {
	            return nextOrObserver[rxSubscriber_1.$$rxSubscriber]();
	        }
	    }
	    if (!nextOrObserver && !error && !complete) {
	        return new Subscriber_1.Subscriber();
	    }
	    return new Subscriber_1.Subscriber(nextOrObserver, error, complete);
	}
	exports.toSubscriber = toSubscriber;
	//# sourceMappingURL=toSubscriber.js.map

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var isFunction_1 = __webpack_require__(108);
	var Subscription_1 = __webpack_require__(109);
	var Observer_1 = __webpack_require__(115);
	var rxSubscriber_1 = __webpack_require__(116);
	/**
	 * Implements the {@link Observer} interface and extends the
	 * {@link Subscription} class. While the {@link Observer} is the public API for
	 * consuming the values of an {@link Observable}, all Observers get converted to
	 * a Subscriber, in order to provide Subscription-like capabilities such as
	 * `unsubscribe`. Subscriber is a common type in RxJS, and crucial for
	 * implementing operators, but it is rarely used as a public API.
	 *
	 * @class Subscriber<T>
	 */
	var Subscriber = (function (_super) {
	    __extends(Subscriber, _super);
	    /**
	     * @param {Observer|function(value: T): void} [destinationOrNext] A partially
	     * defined Observer or a `next` callback function.
	     * @param {function(e: ?any): void} [error] The `error` callback of an
	     * Observer.
	     * @param {function(): void} [complete] The `complete` callback of an
	     * Observer.
	     */
	    function Subscriber(destinationOrNext, error, complete) {
	        _super.call(this);
	        this.syncErrorValue = null;
	        this.syncErrorThrown = false;
	        this.syncErrorThrowable = false;
	        this.isStopped = false;
	        switch (arguments.length) {
	            case 0:
	                this.destination = Observer_1.empty;
	                break;
	            case 1:
	                if (!destinationOrNext) {
	                    this.destination = Observer_1.empty;
	                    break;
	                }
	                if (typeof destinationOrNext === 'object') {
	                    if (destinationOrNext instanceof Subscriber) {
	                        this.destination = destinationOrNext;
	                        this.destination.add(this);
	                    }
	                    else {
	                        this.syncErrorThrowable = true;
	                        this.destination = new SafeSubscriber(this, destinationOrNext);
	                    }
	                    break;
	                }
	            default:
	                this.syncErrorThrowable = true;
	                this.destination = new SafeSubscriber(this, destinationOrNext, error, complete);
	                break;
	        }
	    }
	    Subscriber.prototype[rxSubscriber_1.$$rxSubscriber] = function () { return this; };
	    /**
	     * A static factory for a Subscriber, given a (potentially partial) definition
	     * of an Observer.
	     * @param {function(x: ?T): void} [next] The `next` callback of an Observer.
	     * @param {function(e: ?any): void} [error] The `error` callback of an
	     * Observer.
	     * @param {function(): void} [complete] The `complete` callback of an
	     * Observer.
	     * @return {Subscriber<T>} A Subscriber wrapping the (partially defined)
	     * Observer represented by the given arguments.
	     */
	    Subscriber.create = function (next, error, complete) {
	        var subscriber = new Subscriber(next, error, complete);
	        subscriber.syncErrorThrowable = false;
	        return subscriber;
	    };
	    /**
	     * The {@link Observer} callback to receive notifications of type `next` from
	     * the Observable, with a value. The Observable may call this method 0 or more
	     * times.
	     * @param {T} [value] The `next` value.
	     * @return {void}
	     */
	    Subscriber.prototype.next = function (value) {
	        if (!this.isStopped) {
	            this._next(value);
	        }
	    };
	    /**
	     * The {@link Observer} callback to receive notifications of type `error` from
	     * the Observable, with an attached {@link Error}. Notifies the Observer that
	     * the Observable has experienced an error condition.
	     * @param {any} [err] The `error` exception.
	     * @return {void}
	     */
	    Subscriber.prototype.error = function (err) {
	        if (!this.isStopped) {
	            this.isStopped = true;
	            this._error(err);
	        }
	    };
	    /**
	     * The {@link Observer} callback to receive a valueless notification of type
	     * `complete` from the Observable. Notifies the Observer that the Observable
	     * has finished sending push-based notifications.
	     * @return {void}
	     */
	    Subscriber.prototype.complete = function () {
	        if (!this.isStopped) {
	            this.isStopped = true;
	            this._complete();
	        }
	    };
	    Subscriber.prototype.unsubscribe = function () {
	        if (this.closed) {
	            return;
	        }
	        this.isStopped = true;
	        _super.prototype.unsubscribe.call(this);
	    };
	    Subscriber.prototype._next = function (value) {
	        this.destination.next(value);
	    };
	    Subscriber.prototype._error = function (err) {
	        this.destination.error(err);
	        this.unsubscribe();
	    };
	    Subscriber.prototype._complete = function () {
	        this.destination.complete();
	        this.unsubscribe();
	    };
	    return Subscriber;
	}(Subscription_1.Subscription));
	exports.Subscriber = Subscriber;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var SafeSubscriber = (function (_super) {
	    __extends(SafeSubscriber, _super);
	    function SafeSubscriber(_parent, observerOrNext, error, complete) {
	        _super.call(this);
	        this._parent = _parent;
	        var next;
	        var context = this;
	        if (isFunction_1.isFunction(observerOrNext)) {
	            next = observerOrNext;
	        }
	        else if (observerOrNext) {
	            context = observerOrNext;
	            next = observerOrNext.next;
	            error = observerOrNext.error;
	            complete = observerOrNext.complete;
	            if (isFunction_1.isFunction(context.unsubscribe)) {
	                this.add(context.unsubscribe.bind(context));
	            }
	            context.unsubscribe = this.unsubscribe.bind(this);
	        }
	        this._context = context;
	        this._next = next;
	        this._error = error;
	        this._complete = complete;
	    }
	    SafeSubscriber.prototype.next = function (value) {
	        if (!this.isStopped && this._next) {
	            var _parent = this._parent;
	            if (!_parent.syncErrorThrowable) {
	                this.__tryOrUnsub(this._next, value);
	            }
	            else if (this.__tryOrSetError(_parent, this._next, value)) {
	                this.unsubscribe();
	            }
	        }
	    };
	    SafeSubscriber.prototype.error = function (err) {
	        if (!this.isStopped) {
	            var _parent = this._parent;
	            if (this._error) {
	                if (!_parent.syncErrorThrowable) {
	                    this.__tryOrUnsub(this._error, err);
	                    this.unsubscribe();
	                }
	                else {
	                    this.__tryOrSetError(_parent, this._error, err);
	                    this.unsubscribe();
	                }
	            }
	            else if (!_parent.syncErrorThrowable) {
	                this.unsubscribe();
	                throw err;
	            }
	            else {
	                _parent.syncErrorValue = err;
	                _parent.syncErrorThrown = true;
	                this.unsubscribe();
	            }
	        }
	    };
	    SafeSubscriber.prototype.complete = function () {
	        if (!this.isStopped) {
	            var _parent = this._parent;
	            if (this._complete) {
	                if (!_parent.syncErrorThrowable) {
	                    this.__tryOrUnsub(this._complete);
	                    this.unsubscribe();
	                }
	                else {
	                    this.__tryOrSetError(_parent, this._complete);
	                    this.unsubscribe();
	                }
	            }
	            else {
	                this.unsubscribe();
	            }
	        }
	    };
	    SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
	        try {
	            fn.call(this._context, value);
	        }
	        catch (err) {
	            this.unsubscribe();
	            throw err;
	        }
	    };
	    SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
	        try {
	            fn.call(this._context, value);
	        }
	        catch (err) {
	            parent.syncErrorValue = err;
	            parent.syncErrorThrown = true;
	            return true;
	        }
	        return false;
	    };
	    SafeSubscriber.prototype._unsubscribe = function () {
	        var _parent = this._parent;
	        this._context = null;
	        this._parent = null;
	        _parent.unsubscribe();
	    };
	    return SafeSubscriber;
	}(Subscriber));
	//# sourceMappingURL=Subscriber.js.map

/***/ },
/* 108 */
/***/ function(module, exports) {

	"use strict";
	function isFunction(x) {
	    return typeof x === 'function';
	}
	exports.isFunction = isFunction;
	//# sourceMappingURL=isFunction.js.map

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var isArray_1 = __webpack_require__(110);
	var isObject_1 = __webpack_require__(111);
	var isFunction_1 = __webpack_require__(108);
	var tryCatch_1 = __webpack_require__(112);
	var errorObject_1 = __webpack_require__(113);
	var UnsubscriptionError_1 = __webpack_require__(114);
	/**
	 * Represents a disposable resource, such as the execution of an Observable. A
	 * Subscription has one important method, `unsubscribe`, that takes no argument
	 * and just disposes the resource held by the subscription.
	 *
	 * Additionally, subscriptions may be grouped together through the `add()`
	 * method, which will attach a child Subscription to the current Subscription.
	 * When a Subscription is unsubscribed, all its children (and its grandchildren)
	 * will be unsubscribed as well.
	 *
	 * @class Subscription
	 */
	var Subscription = (function () {
	    /**
	     * @param {function(): void} [unsubscribe] A function describing how to
	     * perform the disposal of resources when the `unsubscribe` method is called.
	     */
	    function Subscription(unsubscribe) {
	        /**
	         * A flag to indicate whether this Subscription has already been unsubscribed.
	         * @type {boolean}
	         */
	        this.closed = false;
	        if (unsubscribe) {
	            this._unsubscribe = unsubscribe;
	        }
	    }
	    /**
	     * Disposes the resources held by the subscription. May, for instance, cancel
	     * an ongoing Observable execution or cancel any other type of work that
	     * started when the Subscription was created.
	     * @return {void}
	     */
	    Subscription.prototype.unsubscribe = function () {
	        var hasErrors = false;
	        var errors;
	        if (this.closed) {
	            return;
	        }
	        this.closed = true;
	        var _a = this, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;
	        this._subscriptions = null;
	        if (isFunction_1.isFunction(_unsubscribe)) {
	            var trial = tryCatch_1.tryCatch(_unsubscribe).call(this);
	            if (trial === errorObject_1.errorObject) {
	                hasErrors = true;
	                (errors = errors || []).push(errorObject_1.errorObject.e);
	            }
	        }
	        if (isArray_1.isArray(_subscriptions)) {
	            var index = -1;
	            var len = _subscriptions.length;
	            while (++index < len) {
	                var sub = _subscriptions[index];
	                if (isObject_1.isObject(sub)) {
	                    var trial = tryCatch_1.tryCatch(sub.unsubscribe).call(sub);
	                    if (trial === errorObject_1.errorObject) {
	                        hasErrors = true;
	                        errors = errors || [];
	                        var err = errorObject_1.errorObject.e;
	                        if (err instanceof UnsubscriptionError_1.UnsubscriptionError) {
	                            errors = errors.concat(err.errors);
	                        }
	                        else {
	                            errors.push(err);
	                        }
	                    }
	                }
	            }
	        }
	        if (hasErrors) {
	            throw new UnsubscriptionError_1.UnsubscriptionError(errors);
	        }
	    };
	    /**
	     * Adds a tear down to be called during the unsubscribe() of this
	     * Subscription.
	     *
	     * If the tear down being added is a subscription that is already
	     * unsubscribed, is the same reference `add` is being called on, or is
	     * `Subscription.EMPTY`, it will not be added.
	     *
	     * If this subscription is already in an `closed` state, the passed
	     * tear down logic will be executed immediately.
	     *
	     * @param {TeardownLogic} teardown The additional logic to execute on
	     * teardown.
	     * @return {Subscription} Returns the Subscription used or created to be
	     * added to the inner subscriptions list. This Subscription can be used with
	     * `remove()` to remove the passed teardown logic from the inner subscriptions
	     * list.
	     */
	    Subscription.prototype.add = function (teardown) {
	        if (!teardown || (teardown === Subscription.EMPTY)) {
	            return Subscription.EMPTY;
	        }
	        if (teardown === this) {
	            return this;
	        }
	        var sub = teardown;
	        switch (typeof teardown) {
	            case 'function':
	                sub = new Subscription(teardown);
	            case 'object':
	                if (sub.closed || typeof sub.unsubscribe !== 'function') {
	                    break;
	                }
	                else if (this.closed) {
	                    sub.unsubscribe();
	                }
	                else {
	                    (this._subscriptions || (this._subscriptions = [])).push(sub);
	                }
	                break;
	            default:
	                throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
	        }
	        return sub;
	    };
	    /**
	     * Removes a Subscription from the internal list of subscriptions that will
	     * unsubscribe during the unsubscribe process of this Subscription.
	     * @param {Subscription} subscription The subscription to remove.
	     * @return {void}
	     */
	    Subscription.prototype.remove = function (subscription) {
	        // HACK: This might be redundant because of the logic in `add()`
	        if (subscription == null || (subscription === this) || (subscription === Subscription.EMPTY)) {
	            return;
	        }
	        var subscriptions = this._subscriptions;
	        if (subscriptions) {
	            var subscriptionIndex = subscriptions.indexOf(subscription);
	            if (subscriptionIndex !== -1) {
	                subscriptions.splice(subscriptionIndex, 1);
	            }
	        }
	    };
	    Subscription.EMPTY = (function (empty) {
	        empty.closed = true;
	        return empty;
	    }(new Subscription()));
	    return Subscription;
	}());
	exports.Subscription = Subscription;
	//# sourceMappingURL=Subscription.js.map

/***/ },
/* 110 */
/***/ function(module, exports) {

	"use strict";
	exports.isArray = Array.isArray || (function (x) { return x && typeof x.length === 'number'; });
	//# sourceMappingURL=isArray.js.map

/***/ },
/* 111 */
/***/ function(module, exports) {

	"use strict";
	function isObject(x) {
	    return x != null && typeof x === 'object';
	}
	exports.isObject = isObject;
	//# sourceMappingURL=isObject.js.map

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var errorObject_1 = __webpack_require__(113);
	var tryCatchTarget;
	function tryCatcher() {
	    try {
	        return tryCatchTarget.apply(this, arguments);
	    }
	    catch (e) {
	        errorObject_1.errorObject.e = e;
	        return errorObject_1.errorObject;
	    }
	}
	function tryCatch(fn) {
	    tryCatchTarget = fn;
	    return tryCatcher;
	}
	exports.tryCatch = tryCatch;
	;
	//# sourceMappingURL=tryCatch.js.map

/***/ },
/* 113 */
/***/ function(module, exports) {

	"use strict";
	// typeof any so that it we don't have to cast when comparing a result to the error object
	exports.errorObject = { e: {} };
	//# sourceMappingURL=errorObject.js.map

/***/ },
/* 114 */
/***/ function(module, exports) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/**
	 * An error thrown when one or more errors have occurred during the
	 * `unsubscribe` of a {@link Subscription}.
	 */
	var UnsubscriptionError = (function (_super) {
	    __extends(UnsubscriptionError, _super);
	    function UnsubscriptionError(errors) {
	        _super.call(this);
	        this.errors = errors;
	        var err = Error.call(this, errors ?
	            errors.length + " errors occurred during unsubscription:\n  " + errors.map(function (err, i) { return ((i + 1) + ") " + err.toString()); }).join('\n  ') : '');
	        this.name = err.name = 'UnsubscriptionError';
	        this.stack = err.stack;
	        this.message = err.message;
	    }
	    return UnsubscriptionError;
	}(Error));
	exports.UnsubscriptionError = UnsubscriptionError;
	//# sourceMappingURL=UnsubscriptionError.js.map

/***/ },
/* 115 */
/***/ function(module, exports) {

	"use strict";
	exports.empty = {
	    closed: true,
	    next: function (value) { },
	    error: function (err) { throw err; },
	    complete: function () { }
	};
	//# sourceMappingURL=Observer.js.map

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var root_1 = __webpack_require__(105);
	var Symbol = root_1.root.Symbol;
	exports.$$rxSubscriber = (typeof Symbol === 'function' && typeof Symbol.for === 'function') ?
	    Symbol.for('rxSubscriber') : '@@rxSubscriber';
	//# sourceMappingURL=rxSubscriber.js.map

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var root_1 = __webpack_require__(105);
	function getSymbolObservable(context) {
	    var $$observable;
	    var Symbol = context.Symbol;
	    if (typeof Symbol === 'function') {
	        if (Symbol.observable) {
	            $$observable = Symbol.observable;
	        }
	        else {
	            $$observable = Symbol('observable');
	            Symbol.observable = $$observable;
	        }
	    }
	    else {
	        $$observable = '@@observable';
	    }
	    return $$observable;
	}
	exports.getSymbolObservable = getSymbolObservable;
	exports.$$observable = getSymbolObservable(root_1.root);
	//# sourceMappingURL=observable.js.map

/***/ },
/* 118 */
/***/ function(module, exports) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/**
	 * An error thrown when an action is invalid because the object has been
	 * unsubscribed.
	 *
	 * @see {@link Subject}
	 * @see {@link BehaviorSubject}
	 *
	 * @class ObjectUnsubscribedError
	 */
	var ObjectUnsubscribedError = (function (_super) {
	    __extends(ObjectUnsubscribedError, _super);
	    function ObjectUnsubscribedError() {
	        var err = _super.call(this, 'object unsubscribed');
	        this.name = err.name = 'ObjectUnsubscribedError';
	        this.stack = err.stack;
	        this.message = err.message;
	    }
	    return ObjectUnsubscribedError;
	}(Error));
	exports.ObjectUnsubscribedError = ObjectUnsubscribedError;
	//# sourceMappingURL=ObjectUnsubscribedError.js.map

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscription_1 = __webpack_require__(109);
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var SubjectSubscription = (function (_super) {
	    __extends(SubjectSubscription, _super);
	    function SubjectSubscription(subject, subscriber) {
	        _super.call(this);
	        this.subject = subject;
	        this.subscriber = subscriber;
	        this.closed = false;
	    }
	    SubjectSubscription.prototype.unsubscribe = function () {
	        if (this.closed) {
	            return;
	        }
	        this.closed = true;
	        var subject = this.subject;
	        var observers = subject.observers;
	        this.subject = null;
	        if (!observers || observers.length === 0 || subject.isStopped || subject.closed) {
	            return;
	        }
	        var subscriberIndex = observers.indexOf(this.subscriber);
	        if (subscriberIndex !== -1) {
	            observers.splice(subscriberIndex, 1);
	        }
	    };
	    return SubjectSubscription;
	}(Subscription_1.Subscription));
	exports.SubjectSubscription = SubjectSubscription;
	//# sourceMappingURL=SubjectSubscription.js.map

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, global) {'use strict';
	
	function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }
	
	var jsExtend = __webpack_require__(122);
	var debug = _interopDefault(__webpack_require__(123));
	var inherits = _interopDefault(__webpack_require__(126));
	var lie = _interopDefault(__webpack_require__(127));
	var pouchdbCollections = __webpack_require__(129);
	var getArguments = _interopDefault(__webpack_require__(130));
	var events = __webpack_require__(131);
	var scopedEval = _interopDefault(__webpack_require__(132));
	var Md5 = _interopDefault(__webpack_require__(133));
	var vuvuzela = _interopDefault(__webpack_require__(134));
	var PromisePool = _interopDefault(__webpack_require__(135));
	var pouchdbCollate = __webpack_require__(136);
	
	/* istanbul ignore next */
	var PouchPromise = typeof Promise === 'function' ? Promise : lie;
	
	function isBinaryObject(object) {
	  return object instanceof ArrayBuffer ||
	    (typeof Blob !== 'undefined' && object instanceof Blob);
	}
	
	function cloneArrayBuffer(buff) {
	  if (typeof buff.slice === 'function') {
	    return buff.slice(0);
	  }
	  // IE10-11 slice() polyfill
	  var target = new ArrayBuffer(buff.byteLength);
	  var targetArray = new Uint8Array(target);
	  var sourceArray = new Uint8Array(buff);
	  targetArray.set(sourceArray);
	  return target;
	}
	
	function cloneBinaryObject(object) {
	  if (object instanceof ArrayBuffer) {
	    return cloneArrayBuffer(object);
	  }
	  var size = object.size;
	  var type = object.type;
	  // Blob
	  if (typeof object.slice === 'function') {
	    return object.slice(0, size, type);
	  }
	  // PhantomJS slice() replacement
	  return object.webkitSlice(0, size, type);
	}
	
	// most of this is borrowed from lodash.isPlainObject:
	// https://github.com/fis-components/lodash.isplainobject/
	// blob/29c358140a74f252aeb08c9eb28bef86f2217d4a/index.js
	
	var funcToString = Function.prototype.toString;
	var objectCtorString = funcToString.call(Object);
	
	function isPlainObject(value) {
	  var proto = Object.getPrototypeOf(value);
	  /* istanbul ignore if */
	  if (proto === null) { // not sure when this happens, but I guess it can
	    return true;
	  }
	  var Ctor = proto.constructor;
	  return (typeof Ctor == 'function' &&
	    Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString);
	}
	
	function clone(object) {
	  var newObject;
	  var i;
	  var len;
	
	  if (!object || typeof object !== 'object') {
	    return object;
	  }
	
	  if (Array.isArray(object)) {
	    newObject = [];
	    for (i = 0, len = object.length; i < len; i++) {
	      newObject[i] = clone(object[i]);
	    }
	    return newObject;
	  }
	
	  // special case: to avoid inconsistencies between IndexedDB
	  // and other backends, we automatically stringify Dates
	  if (object instanceof Date) {
	    return object.toISOString();
	  }
	
	  if (isBinaryObject(object)) {
	    return cloneBinaryObject(object);
	  }
	
	  if (!isPlainObject(object)) {
	    return object; // don't clone objects like Workers
	  }
	
	  newObject = {};
	  for (i in object) {
	    if (Object.prototype.hasOwnProperty.call(object, i)) {
	      var value = clone(object[i]);
	      if (typeof value !== 'undefined') {
	        newObject[i] = value;
	      }
	    }
	  }
	  return newObject;
	}
	
	function once(fun) {
	  var called = false;
	  return getArguments(function (args) {
	    /* istanbul ignore if */
	    if (called) {
	      // this is a smoke test and should never actually happen
	      throw new Error('once called more than once');
	    } else {
	      called = true;
	      fun.apply(this, args);
	    }
	  });
	}
	
	function toPromise(func) {
	  //create the function we will be returning
	  return getArguments(function (args) {
	    // Clone arguments
	    args = clone(args);
	    var self = this;
	    var tempCB =
	      (typeof args[args.length - 1] === 'function') ? args.pop() : false;
	    // if the last argument is a function, assume its a callback
	    var usedCB;
	    if (tempCB) {
	      // if it was a callback, create a new callback which calls it,
	      // but do so async so we don't trap any errors
	      usedCB = function (err, resp) {
	        process.nextTick(function () {
	          tempCB(err, resp);
	        });
	      };
	    }
	    var promise = new PouchPromise(function (fulfill, reject) {
	      var resp;
	      try {
	        var callback = once(function (err, mesg) {
	          if (err) {
	            reject(err);
	          } else {
	            fulfill(mesg);
	          }
	        });
	        // create a callback for this invocation
	        // apply the function in the orig context
	        args.push(callback);
	        resp = func.apply(self, args);
	        if (resp && typeof resp.then === 'function') {
	          fulfill(resp);
	        }
	      } catch (e) {
	        reject(e);
	      }
	    });
	    // if there is a callback, call it back
	    if (usedCB) {
	      promise.then(function (result) {
	        usedCB(null, result);
	      }, usedCB);
	    }
	    return promise;
	  });
	}
	
	var log = debug('pouchdb:api');
	
	function adapterFun(name, callback) {
	  function logApiCall(self, name, args) {
	    /* istanbul ignore if */
	    if (log.enabled) {
	      var logArgs = [self._db_name, name];
	      for (var i = 0; i < args.length - 1; i++) {
	        logArgs.push(args[i]);
	      }
	      log.apply(null, logArgs);
	
	      // override the callback itself to log the response
	      var origCallback = args[args.length - 1];
	      args[args.length - 1] = function (err, res) {
	        var responseArgs = [self._db_name, name];
	        responseArgs = responseArgs.concat(
	          err ? ['error', err] : ['success', res]
	        );
	        log.apply(null, responseArgs);
	        origCallback(err, res);
	      };
	    }
	  }
	
	  return toPromise(getArguments(function (args) {
	    if (this._closed) {
	      return PouchPromise.reject(new Error('database is closed'));
	    }
	    if (this._destroyed) {
	      return PouchPromise.reject(new Error('database is destroyed'));
	    }
	    var self = this;
	    logApiCall(self, name, args);
	    if (!this.taskqueue.isReady) {
	      return new PouchPromise(function (fulfill, reject) {
	        self.taskqueue.addTask(function (failed) {
	          if (failed) {
	            reject(failed);
	          } else {
	            fulfill(self[name].apply(self, args));
	          }
	        });
	      });
	    }
	    return callback.apply(this, args);
	  }));
	}
	
	// like underscore/lodash _.pick()
	function pick(obj, arr) {
	  var res = {};
	  for (var i = 0, len = arr.length; i < len; i++) {
	    var prop = arr[i];
	    if (prop in obj) {
	      res[prop] = obj[prop];
	    }
	  }
	  return res;
	}
	
	// Most browsers throttle concurrent requests at 6, so it's silly
	// to shim _bulk_get by trying to launch potentially hundreds of requests
	// and then letting the majority time out. We can handle this ourselves.
	var MAX_NUM_CONCURRENT_REQUESTS = 6;
	
	function identityFunction(x) {
	  return x;
	}
	
	function formatResultForOpenRevsGet(result) {
	  return [{
	    ok: result
	  }];
	}
	
	// shim for P/CouchDB adapters that don't directly implement _bulk_get
	function bulkGet(db, opts, callback) {
	  var requests = opts.docs;
	
	  // consolidate into one request per doc if possible
	  var requestsById = {};
	  requests.forEach(function (request) {
	    if (request.id in requestsById) {
	      requestsById[request.id].push(request);
	    } else {
	      requestsById[request.id] = [request];
	    }
	  });
	
	  var numDocs = Object.keys(requestsById).length;
	  var numDone = 0;
	  var perDocResults = new Array(numDocs);
	
	  function collapseResultsAndFinish() {
	    var results = [];
	    perDocResults.forEach(function (res) {
	      res.docs.forEach(function (info) {
	        results.push({
	          id: res.id,
	          docs: [info]
	        });
	      });
	    });
	    callback(null, {results: results});
	  }
	
	  function checkDone() {
	    if (++numDone === numDocs) {
	      collapseResultsAndFinish();
	    }
	  }
	
	  function gotResult(docIndex, id, docs) {
	    perDocResults[docIndex] = {id: id, docs: docs};
	    checkDone();
	  }
	
	  var allRequests = Object.keys(requestsById);
	
	  var i = 0;
	
	  function nextBatch() {
	
	    if (i >= allRequests.length) {
	      return;
	    }
	
	    var upTo = Math.min(i + MAX_NUM_CONCURRENT_REQUESTS, allRequests.length);
	    var batch = allRequests.slice(i, upTo);
	    processBatch(batch, i);
	    i += batch.length;
	  }
	
	  function processBatch(batch, offset) {
	    batch.forEach(function (docId, j) {
	      var docIdx = offset + j;
	      var docRequests = requestsById[docId];
	
	      // just use the first request as the "template"
	      // TODO: The _bulk_get API allows for more subtle use cases than this,
	      // but for now it is unlikely that there will be a mix of different
	      // "atts_since" or "attachments" in the same request, since it's just
	      // replicate.js that is using this for the moment.
	      // Also, atts_since is aspirational, since we don't support it yet.
	      var docOpts = pick(docRequests[0], ['atts_since', 'attachments']);
	      docOpts.open_revs = docRequests.map(function (request) {
	        // rev is optional, open_revs disallowed
	        return request.rev;
	      });
	
	      // remove falsey / undefined revisions
	      docOpts.open_revs = docOpts.open_revs.filter(identityFunction);
	
	      var formatResult = identityFunction;
	
	      if (docOpts.open_revs.length === 0) {
	        delete docOpts.open_revs;
	
	        // when fetching only the "winning" leaf,
	        // transform the result so it looks like an open_revs
	        // request
	        formatResult = formatResultForOpenRevsGet;
	      }
	
	      // globally-supplied options
	      ['revs', 'attachments', 'binary', 'ajax'].forEach(function (param) {
	        if (param in opts) {
	          docOpts[param] = opts[param];
	        }
	      });
	      db.get(docId, docOpts, function (err, res) {
	        var result;
	        /* istanbul ignore if */
	        if (err) {
	          result = [{error: err}];
	        } else {
	          result = formatResult(res);
	        }
	        gotResult(docIdx, docId, result);
	        nextBatch();
	      });
	    });
	  }
	
	  nextBatch();
	
	}
	
	function isChromeApp() {
	  return (typeof chrome !== "undefined" &&
	    typeof chrome.storage !== "undefined" &&
	    typeof chrome.storage.local !== "undefined");
	}
	
	var hasLocal;
	
	if (isChromeApp()) {
	  hasLocal = false;
	} else {
	  try {
	    localStorage.setItem('_pouch_check_localstorage', 1);
	    hasLocal = !!localStorage.getItem('_pouch_check_localstorage');
	  } catch (e) {
	    hasLocal = false;
	  }
	}
	
	function hasLocalStorage() {
	  return hasLocal;
	}
	
	inherits(Changes$1, events.EventEmitter);
	
	/* istanbul ignore next */
	function attachBrowserEvents(self) {
	  if (isChromeApp()) {
	    chrome.storage.onChanged.addListener(function (e) {
	      // make sure it's event addressed to us
	      if (e.db_name != null) {
	        //object only has oldValue, newValue members
	        self.emit(e.dbName.newValue);
	      }
	    });
	  } else if (hasLocalStorage()) {
	    if (typeof addEventListener !== 'undefined') {
	      addEventListener("storage", function (e) {
	        self.emit(e.key);
	      });
	    } else { // old IE
	      window.attachEvent("storage", function (e) {
	        self.emit(e.key);
	      });
	    }
	  }
	}
	
	function Changes$1() {
	  events.EventEmitter.call(this);
	  this._listeners = {};
	
	  attachBrowserEvents(this);
	}
	Changes$1.prototype.addListener = function (dbName, id, db, opts) {
	  /* istanbul ignore if */
	  if (this._listeners[id]) {
	    return;
	  }
	  var self = this;
	  var inprogress = false;
	  function eventFunction() {
	    /* istanbul ignore if */
	    if (!self._listeners[id]) {
	      return;
	    }
	    if (inprogress) {
	      inprogress = 'waiting';
	      return;
	    }
	    inprogress = true;
	    var changesOpts = pick(opts, [
	      'style', 'include_docs', 'attachments', 'conflicts', 'filter',
	      'doc_ids', 'view', 'since', 'query_params', 'binary'
	    ]);
	
	    /* istanbul ignore next */
	    function onError() {
	      inprogress = false;
	    }
	
	    db.changes(changesOpts).on('change', function (c) {
	      if (c.seq > opts.since && !opts.cancelled) {
	        opts.since = c.seq;
	        opts.onChange(c);
	      }
	    }).on('complete', function () {
	      if (inprogress === 'waiting') {
	        setTimeout(function (){
	          eventFunction();
	        },0);
	      }
	      inprogress = false;
	    }).on('error', onError);
	  }
	  this._listeners[id] = eventFunction;
	  this.on(dbName, eventFunction);
	};
	
	Changes$1.prototype.removeListener = function (dbName, id) {
	  /* istanbul ignore if */
	  if (!(id in this._listeners)) {
	    return;
	  }
	  events.EventEmitter.prototype.removeListener.call(this, dbName,
	    this._listeners[id]);
	};
	
	
	/* istanbul ignore next */
	Changes$1.prototype.notifyLocalWindows = function (dbName) {
	  //do a useless change on a storage thing
	  //in order to get other windows's listeners to activate
	  if (isChromeApp()) {
	    chrome.storage.local.set({dbName: dbName});
	  } else if (hasLocalStorage()) {
	    localStorage[dbName] = (localStorage[dbName] === "a") ? "b" : "a";
	  }
	};
	
	Changes$1.prototype.notify = function (dbName) {
	  this.emit(dbName);
	  this.notifyLocalWindows(dbName);
	};
	
	function guardedConsole(method) {
	  if (console !== 'undefined' && method in console) {
	    var args = Array.prototype.slice.call(arguments, 1);
	    console[method].apply(console, args);
	  }
	}
	
	function randomNumber(min, max) {
	  var maxTimeout = 600000; // Hard-coded default of 10 minutes
	  min = parseInt(min, 10) || 0;
	  max = parseInt(max, 10);
	  if (max !== max || max <= min) {
	    max = (min || 1) << 1; //doubling
	  } else {
	    max = max + 1;
	  }
	  // In order to not exceed maxTimeout, pick a random value between half of maxTimeout and maxTimeout
	  if(max > maxTimeout) {
	    min = maxTimeout >> 1; // divide by two
	    max = maxTimeout;
	  }
	  var ratio = Math.random();
	  var range = max - min;
	
	  return ~~(range * ratio + min); // ~~ coerces to an int, but fast.
	}
	
	function defaultBackOff(min) {
	  var max = 0;
	  if (!min) {
	    max = 2000;
	  }
	  return randomNumber(min, max);
	}
	
	// designed to give info to browser users, who are disturbed
	// when they see http errors in the console
	function explainError(status, str) {
	  guardedConsole('info', 'The above ' + status + ' is totally normal. ' + str);
	}
	
	inherits(PouchError, Error);
	
	function PouchError(opts) {
	  Error.call(this, opts.reason);
	  this.status = opts.status;
	  this.name = opts.error;
	  this.message = opts.reason;
	  this.error = true;
	}
	
	PouchError.prototype.toString = function () {
	  return JSON.stringify({
	    status: this.status,
	    name: this.name,
	    message: this.message,
	    reason: this.reason
	  });
	};
	
	var UNAUTHORIZED = new PouchError({
	  status: 401,
	  error: 'unauthorized',
	  reason: "Name or password is incorrect."
	});
	
	var MISSING_BULK_DOCS = new PouchError({
	  status: 400,
	  error: 'bad_request',
	  reason: "Missing JSON list of 'docs'"
	});
	
	var MISSING_DOC = new PouchError({
	  status: 404,
	  error: 'not_found',
	  reason: 'missing'
	});
	
	var REV_CONFLICT = new PouchError({
	  status: 409,
	  error: 'conflict',
	  reason: 'Document update conflict'
	});
	
	var INVALID_ID = new PouchError({
	  status: 400,
	  error: 'bad_request',
	  reason: '_id field must contain a string'
	});
	
	var MISSING_ID = new PouchError({
	  status: 412,
	  error: 'missing_id',
	  reason: '_id is required for puts'
	});
	
	var RESERVED_ID = new PouchError({
	  status: 400,
	  error: 'bad_request',
	  reason: 'Only reserved document ids may start with underscore.'
	});
	
	var NOT_OPEN = new PouchError({
	  status: 412,
	  error: 'precondition_failed',
	  reason: 'Database not open'
	});
	
	var UNKNOWN_ERROR = new PouchError({
	  status: 500,
	  error: 'unknown_error',
	  reason: 'Database encountered an unknown error'
	});
	
	var BAD_ARG = new PouchError({
	  status: 500,
	  error: 'badarg',
	  reason: 'Some query argument is invalid'
	});
	
	var INVALID_REQUEST = new PouchError({
	  status: 400,
	  error: 'invalid_request',
	  reason: 'Request was invalid'
	});
	
	var QUERY_PARSE_ERROR = new PouchError({
	  status: 400,
	  error: 'query_parse_error',
	  reason: 'Some query parameter is invalid'
	});
	
	var DOC_VALIDATION = new PouchError({
	  status: 500,
	  error: 'doc_validation',
	  reason: 'Bad special document member'
	});
	
	var BAD_REQUEST = new PouchError({
	  status: 400,
	  error: 'bad_request',
	  reason: 'Something wrong with the request'
	});
	
	var NOT_AN_OBJECT = new PouchError({
	  status: 400,
	  error: 'bad_request',
	  reason: 'Document must be a JSON object'
	});
	
	var DB_MISSING = new PouchError({
	  status: 404,
	  error: 'not_found',
	  reason: 'Database not found'
	});
	
	var IDB_ERROR = new PouchError({
	  status: 500,
	  error: 'indexed_db_went_bad',
	  reason: 'unknown'
	});
	
	var WSQ_ERROR = new PouchError({
	  status: 500,
	  error: 'web_sql_went_bad',
	  reason: 'unknown'
	});
	
	var LDB_ERROR = new PouchError({
	  status: 500,
	  error: 'levelDB_went_went_bad',
	  reason: 'unknown'
	});
	
	var FORBIDDEN = new PouchError({
	  status: 403,
	  error: 'forbidden',
	  reason: 'Forbidden by design doc validate_doc_update function'
	});
	
	var INVALID_REV = new PouchError({
	  status: 400,
	  error: 'bad_request',
	  reason: 'Invalid rev format'
	});
	
	var FILE_EXISTS = new PouchError({
	  status: 412,
	  error: 'file_exists',
	  reason: 'The database could not be created, the file already exists.'
	});
	
	var MISSING_STUB = new PouchError({
	  status: 412,
	  error: 'missing_stub'
	});
	
	var INVALID_URL = new PouchError({
	  status: 413,
	  error: 'invalid_url',
	  reason: 'Provided URL is invalid'
	});
	
	function createError(error, reason) {
	  function CustomPouchError(reason) {
	    // inherit error properties from our parent error manually
	    // so as to allow proper JSON parsing.
	    /* jshint ignore:start */
	    for (var p in error) {
	      if (typeof error[p] !== 'function') {
	        this[p] = error[p];
	      }
	    }
	    /* jshint ignore:end */
	    if (reason !== undefined) {
	      this.reason = reason;
	    }
	  }
	  CustomPouchError.prototype = PouchError.prototype;
	  return new CustomPouchError(reason);
	}
	
	function generateErrorFromResponse(err) {
	
	  if (typeof err !== 'object') {
	    var data = err;
	    err = UNKNOWN_ERROR;
	    err.data = data;
	  }
	
	  if ('error' in err && err.error === 'conflict') {
	    err.name = 'conflict';
	    err.status = 409;
	  }
	
	  if (!('name' in err)) {
	    err.name = err.error || 'unknown';
	  }
	
	  if (!('status' in err)) {
	    err.status = 500;
	  }
	
	  if (!('message' in err)) {
	    err.message = err.message || err.reason;
	  }
	
	  return err;
	}
	
	function tryFilter(filter, doc, req) {
	  try {
	    return !filter(doc, req);
	  } catch (err) {
	    var msg = 'Filter function threw: ' + err.toString();
	    return createError(BAD_REQUEST, msg);
	  }
	}
	
	function filterChange(opts) {
	  var req = {};
	  var hasFilter = opts.filter && typeof opts.filter === 'function';
	  req.query = opts.query_params;
	
	  return function filter(change) {
	    if (!change.doc) {
	      // CSG sends events on the changes feed that don't have documents,
	      // this hack makes a whole lot of existing code robust.
	      change.doc = {};
	    }
	
	    var filterReturn = hasFilter && tryFilter(opts.filter, change.doc, req);
	
	    if (typeof filterReturn === 'object') {
	      return filterReturn;
	    }
	
	    if (filterReturn) {
	      return false;
	    }
	
	    if (!opts.include_docs) {
	      delete change.doc;
	    } else if (!opts.attachments) {
	      for (var att in change.doc._attachments) {
	        /* istanbul ignore else */
	        if (change.doc._attachments.hasOwnProperty(att)) {
	          change.doc._attachments[att].stub = true;
	        }
	      }
	    }
	    return true;
	  };
	}
	
	function flatten(arrs) {
	  var res = [];
	  for (var i = 0, len = arrs.length; i < len; i++) {
	    res = res.concat(arrs[i]);
	  }
	  return res;
	}
	
	// Determine id an ID is valid
	//   - invalid IDs begin with an underescore that does not begin '_design' or
	//     '_local'
	//   - any other string value is a valid id
	// Returns the specific error object for each case
	function invalidIdError(id) {
	  var err;
	  if (!id) {
	    err = createError(MISSING_ID);
	  } else if (typeof id !== 'string') {
	    err = createError(INVALID_ID);
	  } else if (/^_/.test(id) && !(/^_(design|local)/).test(id)) {
	    err = createError(RESERVED_ID);
	  }
	  if (err) {
	    throw err;
	  }
	}
	
	function listenerCount(ee, type) {
	  return 'listenerCount' in ee ? ee.listenerCount(type) :
	                                 events.EventEmitter.listenerCount(ee, type);
	}
	
	function parseDesignDocFunctionName(s) {
	  if (!s) {
	    return null;
	  }
	  var parts = s.split('/');
	  if (parts.length === 2) {
	    return parts;
	  }
	  if (parts.length === 1) {
	    return [s, s];
	  }
	  return null;
	}
	
	function normalizeDesignDocFunctionName(s) {
	  var normalized = parseDesignDocFunctionName(s);
	  return normalized ? normalized.join('/') : null;
	}
	
	// originally parseUri 1.2.2, now patched by us
	// (c) Steven Levithan <stevenlevithan.com>
	// MIT License
	var keys = ["source", "protocol", "authority", "userInfo", "user", "password",
	    "host", "port", "relative", "path", "directory", "file", "query", "anchor"];
	var qName ="queryKey";
	var qParser = /(?:^|&)([^&=]*)=?([^&]*)/g;
	
	// use the "loose" parser
	/* jshint maxlen: false */
	var parser = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
	
	function parseUri(str) {
	  var m = parser.exec(str);
	  var uri = {};
	  var i = 14;
	
	  while (i--) {
	    var key = keys[i];
	    var value = m[i] || "";
	    var encoded = ['user', 'password'].indexOf(key) !== -1;
	    uri[key] = encoded ? decodeURIComponent(value) : value;
	  }
	
	  uri[qName] = {};
	  uri[keys[12]].replace(qParser, function ($0, $1, $2) {
	    if ($1) {
	      uri[qName][$1] = $2;
	    }
	  });
	
	  return uri;
	}
	
	// this is essentially the "update sugar" function from daleharvey/pouchdb#1388
	// the diffFun tells us what delta to apply to the doc.  it either returns
	// the doc, or false if it doesn't need to do an update after all
	function upsert(db, docId, diffFun) {
	  return new PouchPromise(function (fulfill, reject) {
	    db.get(docId, function (err, doc) {
	      if (err) {
	        /* istanbul ignore next */
	        if (err.status !== 404) {
	          return reject(err);
	        }
	        doc = {};
	      }
	
	      // the user might change the _rev, so save it for posterity
	      var docRev = doc._rev;
	      var newDoc = diffFun(doc);
	
	      if (!newDoc) {
	        // if the diffFun returns falsy, we short-circuit as
	        // an optimization
	        return fulfill({updated: false, rev: docRev});
	      }
	
	      // users aren't allowed to modify these values,
	      // so reset them here
	      newDoc._id = docId;
	      newDoc._rev = docRev;
	      fulfill(tryAndPut(db, newDoc, diffFun));
	    });
	  });
	}
	
	function tryAndPut(db, doc, diffFun) {
	  return db.put(doc).then(function (res) {
	    return {
	      updated: true,
	      rev: res.rev
	    };
	  }, function (err) {
	    /* istanbul ignore next */
	    if (err.status !== 409) {
	      throw err;
	    }
	    return upsert(db, doc._id, diffFun);
	  });
	}
	
	// BEGIN Math.uuid.js
	
	/*!
	Math.uuid.js (v1.4)
	http://www.broofa.com
	mailto:robert@broofa.com
	
	Copyright (c) 2010 Robert Kieffer
	Dual licensed under the MIT and GPL licenses.
	*/
	
	/*
	 * Generate a random uuid.
	 *
	 * USAGE: Math.uuid(length, radix)
	 *   length - the desired number of characters
	 *   radix  - the number of allowable values for each character.
	 *
	 * EXAMPLES:
	 *   // No arguments  - returns RFC4122, version 4 ID
	 *   >>> Math.uuid()
	 *   "92329D39-6F5C-4520-ABFC-AAB64544E172"
	 *
	 *   // One argument - returns ID of the specified length
	 *   >>> Math.uuid(15)     // 15 character ID (default base=62)
	 *   "VcydxgltxrVZSTV"
	 *
	 *   // Two arguments - returns ID of the specified length, and radix. 
	 *   // (Radix must be <= 62)
	 *   >>> Math.uuid(8, 2)  // 8 character ID (base=2)
	 *   "01001010"
	 *   >>> Math.uuid(8, 10) // 8 character ID (base=10)
	 *   "47473046"
	 *   >>> Math.uuid(8, 16) // 8 character ID (base=16)
	 *   "098F4D35"
	 */
	var chars = (
	  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
	  'abcdefghijklmnopqrstuvwxyz'
	).split('');
	function getValue(radix) {
	  return 0 | Math.random() * radix;
	}
	function uuid(len, radix) {
	  radix = radix || chars.length;
	  var out = '';
	  var i = -1;
	
	  if (len) {
	    // Compact form
	    while (++i < len) {
	      out += chars[getValue(radix)];
	    }
	    return out;
	  }
	    // rfc4122, version 4 form
	    // Fill in random data.  At i==19 set the high bits of clock sequence as
	    // per rfc4122, sec. 4.1.5
	  while (++i < 36) {
	    switch (i) {
	      case 8:
	      case 13:
	      case 18:
	      case 23:
	        out += '-';
	        break;
	      case 19:
	        out += chars[(getValue(16) & 0x3) | 0x8];
	        break;
	      default:
	        out += chars[getValue(16)];
	    }
	  }
	
	  return out;
	}
	
	// We fetch all leafs of the revision tree, and sort them based on tree length
	// and whether they were deleted, undeleted documents with the longest revision
	// tree (most edits) win
	// The final sort algorithm is slightly documented in a sidebar here:
	// http://guide.couchdb.org/draft/conflicts.html
	function winningRev(metadata) {
	  var winningId;
	  var winningPos;
	  var winningDeleted;
	  var toVisit = metadata.rev_tree.slice();
	  var node;
	  while ((node = toVisit.pop())) {
	    var tree = node.ids;
	    var branches = tree[2];
	    var pos = node.pos;
	    if (branches.length) { // non-leaf
	      for (var i = 0, len = branches.length; i < len; i++) {
	        toVisit.push({pos: pos + 1, ids: branches[i]});
	      }
	      continue;
	    }
	    var deleted = !!tree[1].deleted;
	    var id = tree[0];
	    // sort by deleted, then pos, then id
	    if (!winningId || (winningDeleted !== deleted ? winningDeleted :
	        winningPos !== pos ? winningPos < pos : winningId < id)) {
	      winningId = id;
	      winningPos = pos;
	      winningDeleted = deleted;
	    }
	  }
	
	  return winningPos + '-' + winningId;
	}
	
	// Pretty much all below can be combined into a higher order function to
	// traverse revisions
	// The return value from the callback will be passed as context to all
	// children of that node
	function traverseRevTree(revs, callback) {
	  var toVisit = revs.slice();
	
	  var node;
	  while ((node = toVisit.pop())) {
	    var pos = node.pos;
	    var tree = node.ids;
	    var branches = tree[2];
	    var newCtx =
	      callback(branches.length === 0, pos, tree[0], node.ctx, tree[1]);
	    for (var i = 0, len = branches.length; i < len; i++) {
	      toVisit.push({pos: pos + 1, ids: branches[i], ctx: newCtx});
	    }
	  }
	}
	
	function sortByPos(a, b) {
	  return a.pos - b.pos;
	}
	
	function collectLeaves(revs) {
	  var leaves = [];
	  traverseRevTree(revs, function (isLeaf, pos, id, acc, opts) {
	    if (isLeaf) {
	      leaves.push({rev: pos + "-" + id, pos: pos, opts: opts});
	    }
	  });
	  leaves.sort(sortByPos).reverse();
	  for (var i = 0, len = leaves.length; i < len; i++) {
	    delete leaves[i].pos;
	  }
	  return leaves;
	}
	
	// returns revs of all conflicts that is leaves such that
	// 1. are not deleted and
	// 2. are different than winning revision
	function collectConflicts(metadata) {
	  var win = winningRev(metadata);
	  var leaves = collectLeaves(metadata.rev_tree);
	  var conflicts = [];
	  for (var i = 0, len = leaves.length; i < len; i++) {
	    var leaf = leaves[i];
	    if (leaf.rev !== win && !leaf.opts.deleted) {
	      conflicts.push(leaf.rev);
	    }
	  }
	  return conflicts;
	}
	
	// compact a tree by marking its non-leafs as missing,
	// and return a list of revs to delete
	function compactTree(metadata) {
	  var revs = [];
	  traverseRevTree(metadata.rev_tree, function (isLeaf, pos,
	                                               revHash, ctx, opts) {
	    if (opts.status === 'available' && !isLeaf) {
	      revs.push(pos + '-' + revHash);
	      opts.status = 'missing';
	    }
	  });
	  return revs;
	}
	
	// build up a list of all the paths to the leafs in this revision tree
	function rootToLeaf(revs) {
	  var paths = [];
	  var toVisit = revs.slice();
	  var node;
	  while ((node = toVisit.pop())) {
	    var pos = node.pos;
	    var tree = node.ids;
	    var id = tree[0];
	    var opts = tree[1];
	    var branches = tree[2];
	    var isLeaf = branches.length === 0;
	
	    var history = node.history ? node.history.slice() : [];
	    history.push({id: id, opts: opts});
	    if (isLeaf) {
	      paths.push({pos: (pos + 1 - history.length), ids: history});
	    }
	    for (var i = 0, len = branches.length; i < len; i++) {
	      toVisit.push({pos: pos + 1, ids: branches[i], history: history});
	    }
	  }
	  return paths.reverse();
	}
	
	function sortByPos$1(a, b) {
	  return a.pos - b.pos;
	}
	
	// classic binary search
	function binarySearch(arr, item, comparator) {
	  var low = 0;
	  var high = arr.length;
	  var mid;
	  while (low < high) {
	    mid = (low + high) >>> 1;
	    if (comparator(arr[mid], item) < 0) {
	      low = mid + 1;
	    } else {
	      high = mid;
	    }
	  }
	  return low;
	}
	
	// assuming the arr is sorted, insert the item in the proper place
	function insertSorted(arr, item, comparator) {
	  var idx = binarySearch(arr, item, comparator);
	  arr.splice(idx, 0, item);
	}
	
	// Turn a path as a flat array into a tree with a single branch.
	// If any should be stemmed from the beginning of the array, that's passed
	// in as the second argument
	function pathToTree(path, numStemmed) {
	  var root;
	  var leaf;
	  for (var i = numStemmed, len = path.length; i < len; i++) {
	    var node = path[i];
	    var currentLeaf = [node.id, node.opts, []];
	    if (leaf) {
	      leaf[2].push(currentLeaf);
	      leaf = currentLeaf;
	    } else {
	      root = leaf = currentLeaf;
	    }
	  }
	  return root;
	}
	
	// compare the IDs of two trees
	function compareTree(a, b) {
	  return a[0] < b[0] ? -1 : 1;
	}
	
	// Merge two trees together
	// The roots of tree1 and tree2 must be the same revision
	function mergeTree(in_tree1, in_tree2) {
	  var queue = [{tree1: in_tree1, tree2: in_tree2}];
	  var conflicts = false;
	  while (queue.length > 0) {
	    var item = queue.pop();
	    var tree1 = item.tree1;
	    var tree2 = item.tree2;
	
	    if (tree1[1].status || tree2[1].status) {
	      tree1[1].status =
	        (tree1[1].status ===  'available' ||
	        tree2[1].status === 'available') ? 'available' : 'missing';
	    }
	
	    for (var i = 0; i < tree2[2].length; i++) {
	      if (!tree1[2][0]) {
	        conflicts = 'new_leaf';
	        tree1[2][0] = tree2[2][i];
	        continue;
	      }
	
	      var merged = false;
	      for (var j = 0; j < tree1[2].length; j++) {
	        if (tree1[2][j][0] === tree2[2][i][0]) {
	          queue.push({tree1: tree1[2][j], tree2: tree2[2][i]});
	          merged = true;
	        }
	      }
	      if (!merged) {
	        conflicts = 'new_branch';
	        insertSorted(tree1[2], tree2[2][i], compareTree);
	      }
	    }
	  }
	  return {conflicts: conflicts, tree: in_tree1};
	}
	
	function doMerge(tree, path, dontExpand) {
	  var restree = [];
	  var conflicts = false;
	  var merged = false;
	  var res;
	
	  if (!tree.length) {
	    return {tree: [path], conflicts: 'new_leaf'};
	  }
	
	  for (var i = 0, len = tree.length; i < len; i++) {
	    var branch = tree[i];
	    if (branch.pos === path.pos && branch.ids[0] === path.ids[0]) {
	      // Paths start at the same position and have the same root, so they need
	      // merged
	      res = mergeTree(branch.ids, path.ids);
	      restree.push({pos: branch.pos, ids: res.tree});
	      conflicts = conflicts || res.conflicts;
	      merged = true;
	    } else if (dontExpand !== true) {
	      // The paths start at a different position, take the earliest path and
	      // traverse up until it as at the same point from root as the path we
	      // want to merge.  If the keys match we return the longer path with the
	      // other merged After stemming we dont want to expand the trees
	
	      var t1 = branch.pos < path.pos ? branch : path;
	      var t2 = branch.pos < path.pos ? path : branch;
	      var diff = t2.pos - t1.pos;
	
	      var candidateParents = [];
	
	      var trees = [];
	      trees.push({ids: t1.ids, diff: diff, parent: null, parentIdx: null});
	      while (trees.length > 0) {
	        var item = trees.pop();
	        if (item.diff === 0) {
	          if (item.ids[0] === t2.ids[0]) {
	            candidateParents.push(item);
	          }
	          continue;
	        }
	        var elements = item.ids[2];
	        for (var j = 0, elementsLen = elements.length; j < elementsLen; j++) {
	          trees.push({
	            ids: elements[j],
	            diff: item.diff - 1,
	            parent: item.ids,
	            parentIdx: j
	          });
	        }
	      }
	
	      var el = candidateParents[0];
	
	      if (!el) {
	        restree.push(branch);
	      } else {
	        res = mergeTree(el.ids, t2.ids);
	        el.parent[2][el.parentIdx] = res.tree;
	        restree.push({pos: t1.pos, ids: t1.ids});
	        conflicts = conflicts || res.conflicts;
	        merged = true;
	      }
	    } else {
	      restree.push(branch);
	    }
	  }
	
	  // We didnt find
	  if (!merged) {
	    restree.push(path);
	  }
	
	  restree.sort(sortByPos$1);
	
	  return {
	    tree: restree,
	    conflicts: conflicts || 'internal_node'
	  };
	}
	
	// To ensure we dont grow the revision tree infinitely, we stem old revisions
	function stem(tree, depth) {
	  // First we break out the tree into a complete list of root to leaf paths
	  var paths = rootToLeaf(tree);
	  var maybeStem = {};
	
	  var result;
	  for (var i = 0, len = paths.length; i < len; i++) {
	    // Then for each path, we cut off the start of the path based on the
	    // `depth` to stem to, and generate a new set of flat trees
	    var path = paths[i];
	    var stemmed = path.ids;
	    var numStemmed = Math.max(0, stemmed.length - depth);
	    var stemmedNode = {
	      pos: path.pos + numStemmed,
	      ids: pathToTree(stemmed, numStemmed)
	    };
	
	    for (var s = 0; s < numStemmed; s++) {
	      var rev = (path.pos + s) + '-' + stemmed[s].id;
	      maybeStem[rev] = true;
	    }
	
	    // Then we remerge all those flat trees together, ensuring that we dont
	    // connect trees that would go beyond the depth limit
	    if (result) {
	      result = doMerge(result, stemmedNode, true).tree;
	    } else {
	      result = [stemmedNode];
	    }
	  }
	
	  traverseRevTree(result, function (isLeaf, pos, revHash) {
	    // some revisions may have been removed in a branch but not in another
	    delete maybeStem[pos + '-' + revHash];
	  });
	
	  return {
	    tree: result,
	    revs: Object.keys(maybeStem)
	  };
	}
	
	function merge(tree, path, depth) {
	  var newTree = doMerge(tree, path);
	  var stemmed = stem(newTree.tree, depth);
	  return {
	    tree: stemmed.tree,
	    stemmedRevs: stemmed.revs,
	    conflicts: newTree.conflicts
	  };
	}
	
	// return true if a rev exists in the rev tree, false otherwise
	function revExists(revs, rev) {
	  var toVisit = revs.slice();
	  var splitRev = rev.split('-');
	  var targetPos = parseInt(splitRev[0], 10);
	  var targetId = splitRev[1];
	
	  var node;
	  while ((node = toVisit.pop())) {
	    if (node.pos === targetPos && node.ids[0] === targetId) {
	      return true;
	    }
	    var branches = node.ids[2];
	    for (var i = 0, len = branches.length; i < len; i++) {
	      toVisit.push({pos: node.pos + 1, ids: branches[i]});
	    }
	  }
	  return false;
	}
	
	function getTrees(node) {
	  return node.ids;
	}
	
	// check if a specific revision of a doc has been deleted
	//  - metadata: the metadata object from the doc store
	//  - rev: (optional) the revision to check. defaults to winning revision
	function isDeleted(metadata, rev) {
	  if (!rev) {
	    rev = winningRev(metadata);
	  }
	  var id = rev.substring(rev.indexOf('-') + 1);
	  var toVisit = metadata.rev_tree.map(getTrees);
	
	  var tree;
	  while ((tree = toVisit.pop())) {
	    if (tree[0] === id) {
	      return !!tree[1].deleted;
	    }
	    toVisit = toVisit.concat(tree[2]);
	  }
	}
	
	function isLocalId(id) {
	  return (/^_local/).test(id);
	}
	
	function evalFilter(input) {
	  return scopedEval('return ' + input + ';', {});
	}
	
	function evalView(input) {
	  /* jshint evil:true */
	  return new Function('doc', [
	    'var emitted = false;',
	    'var emit = function (a, b) {',
	    '  emitted = true;',
	    '};',
	    'var view = ' + input + ';',
	    'view(doc);',
	    'if (emitted) {',
	    '  return true;',
	    '}'
	  ].join('\n'));
	}
	
	inherits(Changes, events.EventEmitter);
	
	function tryCatchInChangeListener(self, change) {
	  // isolate try/catches to avoid V8 deoptimizations
	  try {
	    self.emit('change', change);
	  } catch (e) {
	    guardedConsole('error', 'Error in .on("change", function):', e);
	  }
	}
	
	function Changes(db, opts, callback) {
	  events.EventEmitter.call(this);
	  var self = this;
	  this.db = db;
	  opts = opts ? clone(opts) : {};
	  var complete = opts.complete = once(function (err, resp) {
	    if (err) {
	      if (listenerCount(self, 'error') > 0) {
	        self.emit('error', err);
	      }
	    } else {
	      self.emit('complete', resp);
	    }
	    self.removeAllListeners();
	    db.removeListener('destroyed', onDestroy);
	  });
	  if (callback) {
	    self.on('complete', function (resp) {
	      callback(null, resp);
	    });
	    self.on('error', callback);
	  }
	  function onDestroy() {
	    self.cancel();
	  }
	  db.once('destroyed', onDestroy);
	
	  opts.onChange = function (change) {
	    /* istanbul ignore if */
	    if (opts.isCancelled) {
	      return;
	    }
	    tryCatchInChangeListener(self, change);
	    if (self.startSeq && self.startSeq <= change.seq) {
	      self.startSeq = false;
	    }
	  };
	
	  var promise = new PouchPromise(function (fulfill, reject) {
	    opts.complete = function (err, res) {
	      if (err) {
	        reject(err);
	      } else {
	        fulfill(res);
	      }
	    };
	  });
	  self.once('cancel', function () {
	    db.removeListener('destroyed', onDestroy);
	    opts.complete(null, {status: 'cancelled'});
	  });
	  this.then = promise.then.bind(promise);
	  this['catch'] = promise['catch'].bind(promise);
	  this.then(function (result) {
	    complete(null, result);
	  }, complete);
	
	
	
	  if (!db.taskqueue.isReady) {
	    db.taskqueue.addTask(function () {
	      if (self.isCancelled) {
	        self.emit('cancel');
	      } else {
	        self.doChanges(opts);
	      }
	    });
	  } else {
	    self.doChanges(opts);
	  }
	}
	Changes.prototype.cancel = function () {
	  this.isCancelled = true;
	  if (this.db.taskqueue.isReady) {
	    this.emit('cancel');
	  }
	};
	function processChange(doc, metadata, opts) {
	  var changeList = [{rev: doc._rev}];
	  if (opts.style === 'all_docs') {
	    changeList = collectLeaves(metadata.rev_tree)
	    .map(function (x) { return {rev: x.rev}; });
	  }
	  var change = {
	    id: metadata.id,
	    changes: changeList,
	    doc: doc
	  };
	
	  if (isDeleted(metadata, doc._rev)) {
	    change.deleted = true;
	  }
	  if (opts.conflicts) {
	    change.doc._conflicts = collectConflicts(metadata);
	    if (!change.doc._conflicts.length) {
	      delete change.doc._conflicts;
	    }
	  }
	  return change;
	}
	
	Changes.prototype.doChanges = function (opts) {
	  var self = this;
	  var callback = opts.complete;
	
	  opts = clone(opts);
	  if ('live' in opts && !('continuous' in opts)) {
	    opts.continuous = opts.live;
	  }
	  opts.processChange = processChange;
	
	  if (opts.since === 'latest') {
	    opts.since = 'now';
	  }
	  if (!opts.since) {
	    opts.since = 0;
	  }
	  if (opts.since === 'now') {
	    this.db.info().then(function (info) {
	      /* istanbul ignore if */
	      if (self.isCancelled) {
	        callback(null, {status: 'cancelled'});
	        return;
	      }
	      opts.since = info.update_seq;
	      self.doChanges(opts);
	    }, callback);
	    return;
	  }
	
	  if (opts.continuous && opts.since !== 'now') {
	    this.db.info().then(function (info) {
	      self.startSeq = info.update_seq;
	    /* istanbul ignore next */
	    }, function (err) {
	      if (err.id === 'idbNull') {
	        // db closed before this returned thats ok
	        return;
	      }
	      throw err;
	    });
	  }
	
	  if (opts.view && !opts.filter) {
	    opts.filter = '_view';
	  }
	
	  if (opts.filter && typeof opts.filter === 'string') {
	    if (opts.filter === '_view') {
	      opts.view = normalizeDesignDocFunctionName(opts.view);
	    } else {
	      opts.filter = normalizeDesignDocFunctionName(opts.filter);
	    }
	
	    if (this.db.type() !== 'http' && !opts.doc_ids) {
	      return this.filterChanges(opts);
	    }
	  }
	
	  if (!('descending' in opts)) {
	    opts.descending = false;
	  }
	
	  // 0 and 1 should return 1 document
	  opts.limit = opts.limit === 0 ? 1 : opts.limit;
	  opts.complete = callback;
	  var newPromise = this.db._changes(opts);
	  if (newPromise && typeof newPromise.cancel === 'function') {
	    var cancel = self.cancel;
	    self.cancel = getArguments(function (args) {
	      newPromise.cancel();
	      cancel.apply(this, args);
	    });
	  }
	};
	
	Changes.prototype.filterChanges = function (opts) {
	  var self = this;
	  var callback = opts.complete;
	  if (opts.filter === '_view') {
	    if (!opts.view || typeof opts.view !== 'string') {
	      var err = createError(BAD_REQUEST,
	        '`view` filter parameter not found or invalid.');
	      return callback(err);
	    }
	    // fetch a view from a design doc, make it behave like a filter
	    var viewName = parseDesignDocFunctionName(opts.view);
	    this.db.get('_design/' + viewName[0], function (err, ddoc) {
	      /* istanbul ignore if */
	      if (self.isCancelled) {
	        return callback(null, {status: 'cancelled'});
	      }
	      /* istanbul ignore next */
	      if (err) {
	        return callback(generateErrorFromResponse(err));
	      }
	      var mapFun = ddoc && ddoc.views && ddoc.views[viewName[1]] &&
	        ddoc.views[viewName[1]].map;
	      if (!mapFun) {
	        return callback(createError(MISSING_DOC,
	          (ddoc.views ? 'missing json key: ' + viewName[1] :
	            'missing json key: views')));
	      }
	      opts.filter = evalView(mapFun);
	      self.doChanges(opts);
	    });
	  } else {
	    // fetch a filter from a design doc
	    var filterName = parseDesignDocFunctionName(opts.filter);
	    if (!filterName) {
	      return self.doChanges(opts);
	    }
	    this.db.get('_design/' + filterName[0], function (err, ddoc) {
	      /* istanbul ignore if */
	      if (self.isCancelled) {
	        return callback(null, {status: 'cancelled'});
	      }
	      /* istanbul ignore next */
	      if (err) {
	        return callback(generateErrorFromResponse(err));
	      }
	      var filterFun = ddoc && ddoc.filters && ddoc.filters[filterName[1]];
	      if (!filterFun) {
	        return callback(createError(MISSING_DOC,
	          ((ddoc && ddoc.filters) ? 'missing json key: ' + filterName[1]
	            : 'missing json key: filters')));
	      }
	      opts.filter = evalFilter(filterFun);
	      self.doChanges(opts);
	    });
	  }
	};
	
	/*
	 * A generic pouch adapter
	 */
	
	function compare(left, right) {
	  return left < right ? -1 : left > right ? 1 : 0;
	}
	
	// returns first element of arr satisfying callback predicate
	function arrayFirst(arr, callback) {
	  for (var i = 0; i < arr.length; i++) {
	    if (callback(arr[i], i) === true) {
	      return arr[i];
	    }
	  }
	}
	
	// Wrapper for functions that call the bulkdocs api with a single doc,
	// if the first result is an error, return an error
	function yankError(callback) {
	  return function (err, results) {
	    if (err || (results[0] && results[0].error)) {
	      callback(err || results[0]);
	    } else {
	      callback(null, results.length ? results[0]  : results);
	    }
	  };
	}
	
	// clean docs given to us by the user
	function cleanDocs(docs) {
	  for (var i = 0; i < docs.length; i++) {
	    var doc = docs[i];
	    if (doc._deleted) {
	      delete doc._attachments; // ignore atts for deleted docs
	    } else if (doc._attachments) {
	      // filter out extraneous keys from _attachments
	      var atts = Object.keys(doc._attachments);
	      for (var j = 0; j < atts.length; j++) {
	        var att = atts[j];
	        doc._attachments[att] = pick(doc._attachments[att],
	          ['data', 'digest', 'content_type', 'length', 'revpos', 'stub']);
	      }
	    }
	  }
	}
	
	// compare two docs, first by _id then by _rev
	function compareByIdThenRev(a, b) {
	  var idCompare = compare(a._id, b._id);
	  if (idCompare !== 0) {
	    return idCompare;
	  }
	  var aStart = a._revisions ? a._revisions.start : 0;
	  var bStart = b._revisions ? b._revisions.start : 0;
	  return compare(aStart, bStart);
	}
	
	// for every node in a revision tree computes its distance from the closest
	// leaf
	function computeHeight(revs) {
	  var height = {};
	  var edges = [];
	  traverseRevTree(revs, function (isLeaf, pos, id, prnt) {
	    var rev = pos + "-" + id;
	    if (isLeaf) {
	      height[rev] = 0;
	    }
	    if (prnt !== undefined) {
	      edges.push({from: prnt, to: rev});
	    }
	    return rev;
	  });
	
	  edges.reverse();
	  edges.forEach(function (edge) {
	    if (height[edge.from] === undefined) {
	      height[edge.from] = 1 + height[edge.to];
	    } else {
	      height[edge.from] = Math.min(height[edge.from], 1 + height[edge.to]);
	    }
	  });
	  return height;
	}
	
	function allDocsKeysQuery(api, opts, callback) {
	  var keys =  ('limit' in opts) ?
	      opts.keys.slice(opts.skip, opts.limit + opts.skip) :
	      (opts.skip > 0) ? opts.keys.slice(opts.skip) : opts.keys;
	  if (opts.descending) {
	    keys.reverse();
	  }
	  if (!keys.length) {
	    return api._allDocs({limit: 0}, callback);
	  }
	  var finalResults = {
	    offset: opts.skip
	  };
	  return PouchPromise.all(keys.map(function (key) {
	    var subOpts = jsExtend.extend({key: key, deleted: 'ok'}, opts);
	    ['limit', 'skip', 'keys'].forEach(function (optKey) {
	      delete subOpts[optKey];
	    });
	    return new PouchPromise(function (resolve, reject) {
	      api._allDocs(subOpts, function (err, res) {
	        /* istanbul ignore if */
	        if (err) {
	          return reject(err);
	        }
	        finalResults.total_rows = res.total_rows;
	        resolve(res.rows[0] || {key: key, error: 'not_found'});
	      });
	    });
	  })).then(function (results) {
	    finalResults.rows = results;
	    return finalResults;
	  });
	}
	
	// all compaction is done in a queue, to avoid attaching
	// too many listeners at once
	function doNextCompaction(self) {
	  var task = self._compactionQueue[0];
	  var opts = task.opts;
	  var callback = task.callback;
	  self.get('_local/compaction').catch(function () {
	    return false;
	  }).then(function (doc) {
	    if (doc && doc.last_seq) {
	      opts.last_seq = doc.last_seq;
	    }
	    self._compact(opts, function (err, res) {
	      /* istanbul ignore if */
	      if (err) {
	        callback(err);
	      } else {
	        callback(null, res);
	      }
	      process.nextTick(function () {
	        self._compactionQueue.shift();
	        if (self._compactionQueue.length) {
	          doNextCompaction(self);
	        }
	      });
	    });
	  });
	}
	
	function attachmentNameError(name) {
	  if (name.charAt(0) === '_') {
	    return name + 'is not a valid attachment name, attachment ' +
	      'names cannot start with \'_\'';
	  }
	  return false;
	}
	
	inherits(AbstractPouchDB, events.EventEmitter);
	
	function AbstractPouchDB() {
	  events.EventEmitter.call(this);
	}
	
	AbstractPouchDB.prototype.post =
	  adapterFun('post', function (doc, opts, callback) {
	  if (typeof opts === 'function') {
	    callback = opts;
	    opts = {};
	  }
	  if (typeof doc !== 'object' || Array.isArray(doc)) {
	    return callback(createError(NOT_AN_OBJECT));
	  }
	  this.bulkDocs({docs: [doc]}, opts, yankError(callback));
	});
	
	AbstractPouchDB.prototype.put =
	  adapterFun('put', getArguments(function (args) {
	  var temp, temptype, opts, callback;
	  var warned = false;
	  var doc = args.shift();
	  var id = '_id' in doc;
	  if (typeof doc !== 'object' || Array.isArray(doc)) {
	    callback = args.pop();
	    return callback(createError(NOT_AN_OBJECT));
	  }
	
	  function warn() {
	    if (warned) {
	      return;
	    }
	    guardedConsole('warn', 'db.put(doc, id, rev) has been deprecated and will be ' +
	                 'removed in a future release, please use ' +
	                 'db.put({_id: id, _rev: rev}) instead');
	    warned = true;
	  }
	
	  /* eslint no-constant-condition: 0 */
	  while (true) {
	    temp = args.shift();
	    temptype = typeof temp;
	    if (temptype === "string" && !id) {
	      warn();
	      doc._id = temp;
	      id = true;
	    } else if (temptype === "string" && id && !('_rev' in doc)) {
	      warn();
	      doc._rev = temp;
	    } else if (temptype === "object") {
	      opts = temp;
	    } else if (temptype === "function") {
	      callback = temp;
	    }
	    if (!args.length) {
	      break;
	    }
	  }
	  opts = opts || {};
	  invalidIdError(doc._id);
	  if (isLocalId(doc._id) && typeof this._putLocal === 'function') {
	    if (doc._deleted) {
	      return this._removeLocal(doc, callback);
	    } else {
	      return this._putLocal(doc, callback);
	    }
	  }
	  this.bulkDocs({docs: [doc]}, opts, yankError(callback));
	}));
	
	AbstractPouchDB.prototype.putAttachment =
	  adapterFun('putAttachment', function (docId, attachmentId, rev,
	                                              blob, type) {
	  var api = this;
	  if (typeof type === 'function') {
	    type = blob;
	    blob = rev;
	    rev = null;
	  }
	  // Lets fix in https://github.com/pouchdb/pouchdb/issues/3267
	  /* istanbul ignore if */
	  if (typeof type === 'undefined') {
	    type = blob;
	    blob = rev;
	    rev = null;
	  }
	
	  function createAttachment(doc) {
	    var prevrevpos = '_rev' in doc ? parseInt(doc._rev, 10) : 0;
	    doc._attachments = doc._attachments || {};
	    doc._attachments[attachmentId] = {
	      content_type: type,
	      data: blob,
	      revpos: ++prevrevpos
	    };
	    return api.put(doc);
	  }
	
	  return api.get(docId).then(function (doc) {
	    if (doc._rev !== rev) {
	      throw createError(REV_CONFLICT);
	    }
	
	    return createAttachment(doc);
	  }, function (err) {
	     // create new doc
	    /* istanbul ignore else */
	    if (err.reason === MISSING_DOC.message) {
	      return createAttachment({_id: docId});
	    } else {
	      throw err;
	    }
	  });
	});
	
	AbstractPouchDB.prototype.removeAttachment =
	  adapterFun('removeAttachment', function (docId, attachmentId, rev,
	                                                 callback) {
	  var self = this;
	  self.get(docId, function (err, obj) {
	    /* istanbul ignore if */
	    if (err) {
	      callback(err);
	      return;
	    }
	    if (obj._rev !== rev) {
	      callback(createError(REV_CONFLICT));
	      return;
	    }
	    /* istanbul ignore if */
	    if (!obj._attachments) {
	      return callback();
	    }
	    delete obj._attachments[attachmentId];
	    if (Object.keys(obj._attachments).length === 0) {
	      delete obj._attachments;
	    }
	    self.put(obj, callback);
	  });
	});
	
	AbstractPouchDB.prototype.remove =
	  adapterFun('remove', function (docOrId, optsOrRev, opts, callback) {
	  var doc;
	  if (typeof optsOrRev === 'string') {
	    // id, rev, opts, callback style
	    doc = {
	      _id: docOrId,
	      _rev: optsOrRev
	    };
	    if (typeof opts === 'function') {
	      callback = opts;
	      opts = {};
	    }
	  } else {
	    // doc, opts, callback style
	    doc = docOrId;
	    if (typeof optsOrRev === 'function') {
	      callback = optsOrRev;
	      opts = {};
	    } else {
	      callback = opts;
	      opts = optsOrRev;
	    }
	  }
	  opts = opts || {};
	  opts.was_delete = true;
	  var newDoc = {_id: doc._id, _rev: (doc._rev || opts.rev)};
	  newDoc._deleted = true;
	  if (isLocalId(newDoc._id) && typeof this._removeLocal === 'function') {
	    return this._removeLocal(doc, callback);
	  }
	  this.bulkDocs({docs: [newDoc]}, opts, yankError(callback));
	});
	
	AbstractPouchDB.prototype.revsDiff =
	  adapterFun('revsDiff', function (req, opts, callback) {
	  if (typeof opts === 'function') {
	    callback = opts;
	    opts = {};
	  }
	  var ids = Object.keys(req);
	
	  if (!ids.length) {
	    return callback(null, {});
	  }
	
	  var count = 0;
	  var missing = new pouchdbCollections.Map();
	
	  function addToMissing(id, revId) {
	    if (!missing.has(id)) {
	      missing.set(id, {missing: []});
	    }
	    missing.get(id).missing.push(revId);
	  }
	
	  function processDoc(id, rev_tree) {
	    // Is this fast enough? Maybe we should switch to a set simulated by a map
	    var missingForId = req[id].slice(0);
	    traverseRevTree(rev_tree, function (isLeaf, pos, revHash, ctx,
	      opts) {
	        var rev = pos + '-' + revHash;
	        var idx = missingForId.indexOf(rev);
	        if (idx === -1) {
	          return;
	        }
	
	        missingForId.splice(idx, 1);
	        /* istanbul ignore if */
	        if (opts.status !== 'available') {
	          addToMissing(id, rev);
	        }
	      });
	
	    // Traversing the tree is synchronous, so now `missingForId` contains
	    // revisions that were not found in the tree
	    missingForId.forEach(function (rev) {
	      addToMissing(id, rev);
	    });
	  }
	
	  ids.map(function (id) {
	    this._getRevisionTree(id, function (err, rev_tree) {
	      if (err && err.status === 404 && err.message === 'missing') {
	        missing.set(id, {missing: req[id]});
	      } else if (err) {
	        /* istanbul ignore next */
	        return callback(err);
	      } else {
	        processDoc(id, rev_tree);
	      }
	
	      if (++count === ids.length) {
	        // convert LazyMap to object
	        var missingObj = {};
	        missing.forEach(function (value, key) {
	          missingObj[key] = value;
	        });
	        return callback(null, missingObj);
	      }
	    });
	  }, this);
	});
	
	// _bulk_get API for faster replication, as described in
	// https://github.com/apache/couchdb-chttpd/pull/33
	// At the "abstract" level, it will just run multiple get()s in
	// parallel, because this isn't much of a performance cost
	// for local databases (except the cost of multiple transactions, which is
	// small). The http adapter overrides this in order
	// to do a more efficient single HTTP request.
	AbstractPouchDB.prototype.bulkGet =
	  adapterFun('bulkGet', function (opts, callback) {
	  bulkGet(this, opts, callback);
	});
	
	// compact one document and fire callback
	// by compacting we mean removing all revisions which
	// are further from the leaf in revision tree than max_height
	AbstractPouchDB.prototype.compactDocument =
	  adapterFun('compactDocument', function (docId, maxHeight, callback) {
	  var self = this;
	  this._getRevisionTree(docId, function (err, revTree) {
	    /* istanbul ignore if */
	    if (err) {
	      return callback(err);
	    }
	    var height = computeHeight(revTree);
	    var candidates = [];
	    var revs = [];
	    Object.keys(height).forEach(function (rev) {
	      if (height[rev] > maxHeight) {
	        candidates.push(rev);
	      }
	    });
	
	    traverseRevTree(revTree, function (isLeaf, pos, revHash, ctx, opts) {
	      var rev = pos + '-' + revHash;
	      if (opts.status === 'available' && candidates.indexOf(rev) !== -1) {
	        revs.push(rev);
	      }
	    });
	    self._doCompaction(docId, revs, callback);
	  });
	});
	
	// compact the whole database using single document
	// compaction
	AbstractPouchDB.prototype.compact =
	  adapterFun('compact', function (opts, callback) {
	  if (typeof opts === 'function') {
	    callback = opts;
	    opts = {};
	  }
	
	  var self = this;
	  opts = opts || {};
	
	  self._compactionQueue = self._compactionQueue || [];
	  self._compactionQueue.push({opts: opts, callback: callback});
	  if (self._compactionQueue.length === 1) {
	    doNextCompaction(self);
	  }
	});
	AbstractPouchDB.prototype._compact = function (opts, callback) {
	  var self = this;
	  var changesOpts = {
	    return_docs: false,
	    last_seq: opts.last_seq || 0
	  };
	  var promises = [];
	
	  function onChange(row) {
	    promises.push(self.compactDocument(row.id, 0));
	  }
	  function onComplete(resp) {
	    var lastSeq = resp.last_seq;
	    PouchPromise.all(promises).then(function () {
	      return upsert(self, '_local/compaction', function deltaFunc(doc) {
	        if (!doc.last_seq || doc.last_seq < lastSeq) {
	          doc.last_seq = lastSeq;
	          return doc;
	        }
	        return false; // somebody else got here first, don't update
	      });
	    }).then(function () {
	      callback(null, {ok: true});
	    }).catch(callback);
	  }
	  self.changes(changesOpts)
	    .on('change', onChange)
	    .on('complete', onComplete)
	    .on('error', callback);
	};
	/* Begin api wrappers. Specific functionality to storage belongs in the
	   _[method] */
	AbstractPouchDB.prototype.get =
	  adapterFun('get', function (id, opts, callback) {
	  if (typeof opts === 'function') {
	    callback = opts;
	    opts = {};
	  }
	  if (typeof id !== 'string') {
	    return callback(createError(INVALID_ID));
	  }
	  if (isLocalId(id) && typeof this._getLocal === 'function') {
	    return this._getLocal(id, callback);
	  }
	  var leaves = [], self = this;
	
	  function finishOpenRevs() {
	    var result = [];
	    var count = leaves.length;
	    /* istanbul ignore if */
	    if (!count) {
	      return callback(null, result);
	    }
	    // order with open_revs is unspecified
	    leaves.forEach(function (leaf) {
	      self.get(id, {
	        rev: leaf,
	        revs: opts.revs,
	        attachments: opts.attachments
	      }, function (err, doc) {
	        if (!err) {
	          result.push({ok: doc});
	        } else {
	          result.push({missing: leaf});
	        }
	        count--;
	        if (!count) {
	          callback(null, result);
	        }
	      });
	    });
	  }
	
	  if (opts.open_revs) {
	    if (opts.open_revs === "all") {
	      this._getRevisionTree(id, function (err, rev_tree) {
	        if (err) {
	          return callback(err);
	        }
	        leaves = collectLeaves(rev_tree).map(function (leaf) {
	          return leaf.rev;
	        });
	        finishOpenRevs();
	      });
	    } else {
	      if (Array.isArray(opts.open_revs)) {
	        leaves = opts.open_revs;
	        for (var i = 0; i < leaves.length; i++) {
	          var l = leaves[i];
	          // looks like it's the only thing couchdb checks
	          if (!(typeof (l) === "string" && /^\d+-/.test(l))) {
	            return callback(createError(INVALID_REV));
	          }
	        }
	        finishOpenRevs();
	      } else {
	        return callback(createError(UNKNOWN_ERROR,
	          'function_clause'));
	      }
	    }
	    return; // open_revs does not like other options
	  }
	
	  return this._get(id, opts, function (err, result) {
	    if (err) {
	      return callback(err);
	    }
	
	    var doc = result.doc;
	    var metadata = result.metadata;
	    var ctx = result.ctx;
	
	    if (opts.conflicts) {
	      var conflicts = collectConflicts(metadata);
	      if (conflicts.length) {
	        doc._conflicts = conflicts;
	      }
	    }
	
	    if (isDeleted(metadata, doc._rev)) {
	      doc._deleted = true;
	    }
	
	    if (opts.revs || opts.revs_info) {
	      var paths = rootToLeaf(metadata.rev_tree);
	      var path = arrayFirst(paths, function (arr) {
	        return arr.ids.map(function (x) { return x.id; })
	          .indexOf(doc._rev.split('-')[1]) !== -1;
	      });
	
	      var indexOfRev = path.ids.map(function (x) {return x.id; })
	        .indexOf(doc._rev.split('-')[1]) + 1;
	      var howMany = path.ids.length - indexOfRev;
	      path.ids.splice(indexOfRev, howMany);
	      path.ids.reverse();
	
	      if (opts.revs) {
	        doc._revisions = {
	          start: (path.pos + path.ids.length) - 1,
	          ids: path.ids.map(function (rev) {
	            return rev.id;
	          })
	        };
	      }
	      if (opts.revs_info) {
	        var pos =  path.pos + path.ids.length;
	        doc._revs_info = path.ids.map(function (rev) {
	          pos--;
	          return {
	            rev: pos + '-' + rev.id,
	            status: rev.opts.status
	          };
	        });
	      }
	    }
	
	    if (opts.attachments && doc._attachments) {
	      var attachments = doc._attachments;
	      var count = Object.keys(attachments).length;
	      if (count === 0) {
	        return callback(null, doc);
	      }
	      Object.keys(attachments).forEach(function (key) {
	        this._getAttachment(doc._id, key, attachments[key], {
	          // Previously the revision handling was done in adapter.js
	          // getAttachment, however since idb-next doesnt we need to
	          // pass the rev through
	          rev: doc._rev,
	          binary: opts.binary,
	          ctx: ctx
	        }, function (err, data) {
	          var att = doc._attachments[key];
	          att.data = data;
	          delete att.stub;
	          delete att.length;
	          if (!--count) {
	            callback(null, doc);
	          }
	        });
	      }, self);
	    } else {
	      if (doc._attachments) {
	        for (var key in doc._attachments) {
	          /* istanbul ignore else */
	          if (doc._attachments.hasOwnProperty(key)) {
	            doc._attachments[key].stub = true;
	          }
	        }
	      }
	      callback(null, doc);
	    }
	  });
	});
	
	// TODO: I dont like this, it forces an extra read for every
	// attachment read and enforces a confusing api between
	// adapter.js and the adapter implementation
	AbstractPouchDB.prototype.getAttachment =
	  adapterFun('getAttachment', function (docId, attachmentId, opts,
	                                              callback) {
	  var self = this;
	  if (opts instanceof Function) {
	    callback = opts;
	    opts = {};
	  }
	  this._get(docId, opts, function (err, res) {
	    if (err) {
	      return callback(err);
	    }
	    if (res.doc._attachments && res.doc._attachments[attachmentId]) {
	      opts.ctx = res.ctx;
	      opts.binary = true;
	      self._getAttachment(docId, attachmentId,
	                          res.doc._attachments[attachmentId], opts, callback);
	    } else {
	      return callback(createError(MISSING_DOC));
	    }
	  });
	});
	
	AbstractPouchDB.prototype.allDocs =
	  adapterFun('allDocs', function (opts, callback) {
	  if (typeof opts === 'function') {
	    callback = opts;
	    opts = {};
	  }
	  opts.skip = typeof opts.skip !== 'undefined' ? opts.skip : 0;
	  if (opts.start_key) {
	    opts.startkey = opts.start_key;
	  }
	  if (opts.end_key) {
	    opts.endkey = opts.end_key;
	  }
	  if ('keys' in opts) {
	    if (!Array.isArray(opts.keys)) {
	      return callback(new TypeError('options.keys must be an array'));
	    }
	    var incompatibleOpt =
	      ['startkey', 'endkey', 'key'].filter(function (incompatibleOpt) {
	      return incompatibleOpt in opts;
	    })[0];
	    if (incompatibleOpt) {
	      callback(createError(QUERY_PARSE_ERROR,
	        'Query parameter `' + incompatibleOpt +
	        '` is not compatible with multi-get'
	      ));
	      return;
	    }
	    if (this.type() !== 'http') {
	      return allDocsKeysQuery(this, opts, callback);
	    }
	  }
	
	  return this._allDocs(opts, callback);
	});
	
	AbstractPouchDB.prototype.changes = function (opts, callback) {
	  if (typeof opts === 'function') {
	    callback = opts;
	    opts = {};
	  }
	  return new Changes(this, opts, callback);
	};
	
	AbstractPouchDB.prototype.close =
	  adapterFun('close', function (callback) {
	  this._closed = true;
	  return this._close(callback);
	});
	
	AbstractPouchDB.prototype.info = adapterFun('info', function (callback) {
	  var self = this;
	  this._info(function (err, info) {
	    if (err) {
	      return callback(err);
	    }
	    // assume we know better than the adapter, unless it informs us
	    info.db_name = info.db_name || self._db_name;
	    info.auto_compaction = !!(self.auto_compaction && self.type() !== 'http');
	    info.adapter = self.type();
	    callback(null, info);
	  });
	});
	
	AbstractPouchDB.prototype.id = adapterFun('id', function (callback) {
	  return this._id(callback);
	});
	
	AbstractPouchDB.prototype.type = function () {
	  /* istanbul ignore next */
	  return (typeof this._type === 'function') ? this._type() : this.adapter;
	};
	
	AbstractPouchDB.prototype.bulkDocs =
	  adapterFun('bulkDocs', function (req, opts, callback) {
	  if (typeof opts === 'function') {
	    callback = opts;
	    opts = {};
	  }
	
	  opts = opts || {};
	
	  if (Array.isArray(req)) {
	    req = {
	      docs: req
	    };
	  }
	
	  if (!req || !req.docs || !Array.isArray(req.docs)) {
	    return callback(createError(MISSING_BULK_DOCS));
	  }
	
	  for (var i = 0; i < req.docs.length; ++i) {
	    if (typeof req.docs[i] !== 'object' || Array.isArray(req.docs[i])) {
	      return callback(createError(NOT_AN_OBJECT));
	    }
	  }
	
	  var attachmentError;
	  req.docs.forEach(function (doc) {
	    if (doc._attachments) {
	      Object.keys(doc._attachments).forEach(function (name) {
	        attachmentError = attachmentError || attachmentNameError(name);
	      });
	    }
	  });
	
	  if (attachmentError) {
	    return callback(createError(BAD_REQUEST, attachmentError));
	  }
	
	  if (!('new_edits' in opts)) {
	    if ('new_edits' in req) {
	      opts.new_edits = req.new_edits;
	    } else {
	      opts.new_edits = true;
	    }
	  }
	
	  if (!opts.new_edits && this.type() !== 'http') {
	    // ensure revisions of the same doc are sorted, so that
	    // the local adapter processes them correctly (#2935)
	    req.docs.sort(compareByIdThenRev);
	  }
	
	  cleanDocs(req.docs);
	
	  return this._bulkDocs(req, opts, function (err, res) {
	    if (err) {
	      return callback(err);
	    }
	    if (!opts.new_edits) {
	      // this is what couch does when new_edits is false
	      res = res.filter(function (x) {
	        return x.error;
	      });
	    }
	    callback(null, res);
	  });
	});
	
	AbstractPouchDB.prototype.registerDependentDatabase =
	  adapterFun('registerDependentDatabase', function (dependentDb,
	                                                          callback) {
	  var depDB = new this.constructor(dependentDb, this.__opts);
	
	  function diffFun(doc) {
	    doc.dependentDbs = doc.dependentDbs || {};
	    if (doc.dependentDbs[dependentDb]) {
	      return false; // no update required
	    }
	    doc.dependentDbs[dependentDb] = true;
	    return doc;
	  }
	  upsert(this, '_local/_pouch_dependentDbs', diffFun)
	    .then(function () {
	      callback(null, {db: depDB});
	    }).catch(callback);
	});
	
	AbstractPouchDB.prototype.destroy =
	  adapterFun('destroy', function (opts, callback) {
	
	  if (typeof opts === 'function') {
	    callback = opts;
	    opts = {};
	  }
	
	  var self = this;
	  var usePrefix = 'use_prefix' in self ? self.use_prefix : true;
	
	  function destroyDb() {
	    // call destroy method of the particular adaptor
	    self._destroy(opts, function (err, resp) {
	      if (err) {
	        return callback(err);
	      }
	      self._destroyed = true;
	      self.emit('destroyed');
	      callback(null, resp || { 'ok': true });
	    });
	  }
	
	  if (self.type() === 'http') {
	    // no need to check for dependent DBs if it's a remote DB
	    return destroyDb();
	  }
	
	  self.get('_local/_pouch_dependentDbs', function (err, localDoc) {
	    if (err) {
	      /* istanbul ignore if */
	      if (err.status !== 404) {
	        return callback(err);
	      } else { // no dependencies
	        return destroyDb();
	      }
	    }
	    var dependentDbs = localDoc.dependentDbs;
	    var PouchDB = self.constructor;
	    var deletedMap = Object.keys(dependentDbs).map(function (name) {
	      // use_prefix is only false in the browser
	      /* istanbul ignore next */
	      var trueName = usePrefix ?
	        name.replace(new RegExp('^' + PouchDB.prefix), '') : name;
	      return new PouchDB(trueName, self.__opts).destroy();
	    });
	    PouchPromise.all(deletedMap).then(destroyDb, callback);
	  });
	});
	
	function TaskQueue() {
	  this.isReady = false;
	  this.failed = false;
	  this.queue = [];
	}
	
	TaskQueue.prototype.execute = function () {
	  var fun;
	  if (this.failed) {
	    while ((fun = this.queue.shift())) {
	      fun(this.failed);
	    }
	  } else {
	    while ((fun = this.queue.shift())) {
	      fun();
	    }
	  }
	};
	
	TaskQueue.prototype.fail = function (err) {
	  this.failed = err;
	  this.execute();
	};
	
	TaskQueue.prototype.ready = function (db) {
	  this.isReady = true;
	  this.db = db;
	  this.execute();
	};
	
	TaskQueue.prototype.addTask = function (fun) {
	  this.queue.push(fun);
	  if (this.failed) {
	    this.execute();
	  }
	};
	
	function defaultCallback(err) {
	  /* istanbul ignore next */
	  if (err && global.debug) {
	    guardedConsole('error', err);
	  }
	}
	
	// OK, so here's the deal. Consider this code:
	//     var db1 = new PouchDB('foo');
	//     var db2 = new PouchDB('foo');
	//     db1.destroy();
	// ^ these two both need to emit 'destroyed' events,
	// as well as the PouchDB constructor itself.
	// So we have one db object (whichever one got destroy() called on it)
	// responsible for emitting the initial event, which then gets emitted
	// by the constructor, which then broadcasts it to any other dbs
	// that may have been created with the same name.
	function prepareForDestruction(self, opts) {
	  var name = opts.originalName;
	  var ctor = self.constructor;
	  var destructionListeners = ctor._destructionListeners;
	
	  function onDestroyed() {
	    ctor.emit('destroyed', name);
	  }
	
	  function onConstructorDestroyed() {
	    self.removeListener('destroyed', onDestroyed);
	    self.emit('destroyed', self);
	  }
	
	  self.once('destroyed', onDestroyed);
	
	  // in setup.js, the constructor is primed to listen for destroy events
	  if (!destructionListeners.has(name)) {
	    destructionListeners.set(name, []);
	  }
	  destructionListeners.get(name).push(onConstructorDestroyed);
	}
	
	inherits(PouchDB, AbstractPouchDB);
	function PouchDB(name, opts, callback) {
	
	  /* istanbul ignore if */
	  if (!(this instanceof PouchDB)) {
	    return new PouchDB(name, opts, callback);
	  }
	
	  var self = this;
	  if (typeof opts === 'function' || typeof opts === 'undefined') {
	    callback = opts;
	    opts = {};
	  }
	
	  if (name && typeof name === 'object') {
	    opts = name;
	    name = undefined;
	  }
	
	  if (typeof callback === 'undefined') {
	    callback = defaultCallback;
	  } else {
	    var oldCallback = callback;
	    callback = function () {
	      guardedConsole('warn', 'Using a callback for new PouchDB()' +
	                     'is deprecated.');
	      return oldCallback.apply(null, arguments);
	    };
	  }
	
	  name = name || opts.name;
	  opts = clone(opts);
	  // if name was specified via opts, ignore for the sake of dependentDbs
	  delete opts.name;
	  this.__opts = opts;
	  var oldCB = callback;
	  self.auto_compaction = opts.auto_compaction;
	  self.prefix = PouchDB.prefix;
	  AbstractPouchDB.call(self);
	  self.taskqueue = new TaskQueue();
	  var promise = new PouchPromise(function (fulfill, reject) {
	    callback = function (err, resp) {
	      /* istanbul ignore if */
	      if (err) {
	        return reject(err);
	      }
	      delete resp.then;
	      fulfill(resp);
	    };
	
	    opts = clone(opts);
	    var backend, error;
	    (function () {
	      try {
	
	        if (typeof name !== 'string') {
	          error = new Error('Missing/invalid DB name');
	          error.code = 400;
	          throw error;
	        }
	
	        var prefixedName = (opts.prefix || '') + name;
	        backend = PouchDB.parseAdapter(prefixedName, opts);
	
	        opts.originalName = name;
	        opts.name = backend.name;
	        opts.adapter = opts.adapter || backend.adapter;
	        self._adapter = opts.adapter;
	        debug('pouchdb:adapter')('Picked adapter: ' + opts.adapter);
	
	        self._db_name = name;
	        if (!PouchDB.adapters[opts.adapter]) {
	          error = new Error('Adapter is missing');
	          error.code = 404;
	          throw error;
	        }
	
	        /* istanbul ignore if */
	        if (!PouchDB.adapters[opts.adapter].valid()) {
	          error = new Error('Invalid Adapter');
	          error.code = 404;
	          throw error;
	        }
	      } catch (err) {
	        self.taskqueue.fail(err);
	      }
	    }());
	    if (error) {
	      return reject(error); // constructor error, see above
	    }
	    self.adapter = opts.adapter;
	
	    // needs access to PouchDB;
	    self.replicate = {};
	
	    self.replicate.from = function (url, opts, callback) {
	      return self.constructor.replicate(url, self, opts, callback);
	    };
	
	    self.replicate.to = function (url, opts, callback) {
	      return self.constructor.replicate(self, url, opts, callback);
	    };
	
	    self.sync = function (dbName, opts, callback) {
	      return self.constructor.sync(self, dbName, opts, callback);
	    };
	
	    self.replicate.sync = self.sync;
	
	    PouchDB.adapters[opts.adapter].call(self, opts, function (err) {
	      /* istanbul ignore if */
	      if (err) {
	        self.taskqueue.fail(err);
	        callback(err);
	        return;
	      }
	      prepareForDestruction(self, opts);
	
	      self.emit('created', self);
	      PouchDB.emit('created', opts.originalName);
	      self.taskqueue.ready(self);
	      callback(null, self);
	    });
	
	  });
	  promise.then(function (resp) {
	    oldCB(null, resp);
	  }, oldCB);
	  self.then = promise.then.bind(promise);
	  self.catch = promise.catch.bind(promise);
	}
	
	PouchDB.debug = debug;
	
	PouchDB.adapters = {};
	PouchDB.preferredAdapters = [];
	
	PouchDB.prefix = '_pouch_';
	
	var eventEmitter = new events.EventEmitter();
	
	function setUpEventEmitter(Pouch) {
	  Object.keys(events.EventEmitter.prototype).forEach(function (key) {
	    if (typeof events.EventEmitter.prototype[key] === 'function') {
	      Pouch[key] = eventEmitter[key].bind(eventEmitter);
	    }
	  });
	
	  // these are created in constructor.js, and allow us to notify each DB with
	  // the same name that it was destroyed, via the constructor object
	  var destructListeners = Pouch._destructionListeners = new pouchdbCollections.Map();
	  Pouch.on('destroyed', function onConstructorDestroyed(name) {
	    destructListeners.get(name).forEach(function (callback) {
	      callback();
	    });
	    destructListeners.delete(name);
	  });
	}
	
	setUpEventEmitter(PouchDB);
	
	PouchDB.parseAdapter = function (name, opts) {
	  var match = name.match(/([a-z\-]*):\/\/(.*)/);
	  var adapter, adapterName;
	  if (match) {
	    // the http adapter expects the fully qualified name
	    name = /http(s?)/.test(match[1]) ? match[1] + '://' + match[2] : match[2];
	    adapter = match[1];
	    /* istanbul ignore if */
	    if (!PouchDB.adapters[adapter].valid()) {
	      throw 'Invalid adapter';
	    }
	    return {name: name, adapter: match[1]};
	  }
	
	  // check for browsers that have been upgraded from websql-only to websql+idb
	  var skipIdb = 'idb' in PouchDB.adapters && 'websql' in PouchDB.adapters &&
	    hasLocalStorage() &&
	    localStorage['_pouch__websqldb_' + PouchDB.prefix + name];
	
	
	  if (opts.adapter) {
	    adapterName = opts.adapter;
	  } else if (typeof opts !== 'undefined' && opts.db) {
	    adapterName = 'leveldb';
	  } else { // automatically determine adapter
	    for (var i = 0; i < PouchDB.preferredAdapters.length; ++i) {
	      adapterName = PouchDB.preferredAdapters[i];
	      if (adapterName in PouchDB.adapters) {
	        /* istanbul ignore if */
	        if (skipIdb && adapterName === 'idb') {
	          // log it, because this can be confusing during development
	          guardedConsole('log', 'PouchDB is downgrading "' + name + '" to WebSQL to' +
	            ' avoid data loss, because it was already opened with WebSQL.');
	          continue; // keep using websql to avoid user data loss
	        }
	        break;
	      }
	    }
	  }
	
	  adapter = PouchDB.adapters[adapterName];
	
	  // if adapter is invalid, then an error will be thrown later
	  var usePrefix = (adapter && 'use_prefix' in adapter) ?
	      adapter.use_prefix : true;
	
	  return {
	    name: usePrefix ? (PouchDB.prefix + name) : name,
	    adapter: adapterName
	  };
	};
	
	PouchDB.adapter = function (id, obj, addToPreferredAdapters) {
	  if (obj.valid()) {
	    PouchDB.adapters[id] = obj;
	    if (addToPreferredAdapters) {
	      PouchDB.preferredAdapters.push(id);
	    }
	  }
	};
	
	PouchDB.plugin = function (obj) {
	  if (typeof obj === 'function') { // function style for plugins
	    obj(PouchDB);
	  } else {
	    Object.keys(obj).forEach(function (id) { // object style for plugins
	      PouchDB.prototype[id] = obj[id];
	    });
	  }
	  return PouchDB;
	};
	
	PouchDB.defaults = function (defaultOpts) {
	  function PouchAlt(name, opts, callback) {
	    if (!(this instanceof PouchAlt)) {
	      return new PouchAlt(name, opts, callback);
	    }
	
	    if (typeof opts === 'function' || typeof opts === 'undefined') {
	      callback = opts;
	      opts = {};
	    }
	    if (name && typeof name === 'object') {
	      opts = name;
	      name = undefined;
	    }
	
	    opts = jsExtend.extend({}, defaultOpts, opts);
	    PouchDB.call(this, name, opts, callback);
	  }
	
	  inherits(PouchAlt, PouchDB);
	
	  PouchAlt.preferredAdapters = PouchDB.preferredAdapters.slice();
	  Object.keys(PouchDB).forEach(function (key) {
	    if (!(key in PouchAlt)) {
	      PouchAlt[key] = PouchDB[key];
	    }
	  });
	
	  return PouchAlt;
	};
	
	// managed automatically by set-version.js
	var version = "5.4.5";
	
	PouchDB.version = version;
	
	function toObject(array) {
	  return array.reduce(function (obj, item) {
	    obj[item] = true;
	    return obj;
	  }, {});
	}
	// List of top level reserved words for doc
	var reservedWords = toObject([
	  '_id',
	  '_rev',
	  '_attachments',
	  '_deleted',
	  '_revisions',
	  '_revs_info',
	  '_conflicts',
	  '_deleted_conflicts',
	  '_local_seq',
	  '_rev_tree',
	  //replication documents
	  '_replication_id',
	  '_replication_state',
	  '_replication_state_time',
	  '_replication_state_reason',
	  '_replication_stats',
	  // Specific to Couchbase Sync Gateway
	  '_removed'
	]);
	
	// List of reserved words that should end up the document
	var dataWords = toObject([
	  '_attachments',
	  //replication documents
	  '_replication_id',
	  '_replication_state',
	  '_replication_state_time',
	  '_replication_state_reason',
	  '_replication_stats'
	]);
	
	function parseRevisionInfo(rev) {
	  if (!/^\d+\-./.test(rev)) {
	    return createError(INVALID_REV);
	  }
	  var idx = rev.indexOf('-');
	  var left = rev.substring(0, idx);
	  var right = rev.substring(idx + 1);
	  return {
	    prefix: parseInt(left, 10),
	    id: right
	  };
	}
	
	function makeRevTreeFromRevisions(revisions, opts) {
	  var pos = revisions.start - revisions.ids.length + 1;
	
	  var revisionIds = revisions.ids;
	  var ids = [revisionIds[0], opts, []];
	
	  for (var i = 1, len = revisionIds.length; i < len; i++) {
	    ids = [revisionIds[i], {status: 'missing'}, [ids]];
	  }
	
	  return [{
	    pos: pos,
	    ids: ids
	  }];
	}
	
	// Preprocess documents, parse their revisions, assign an id and a
	// revision for new writes that are missing them, etc
	function parseDoc(doc, newEdits) {
	
	  var nRevNum;
	  var newRevId;
	  var revInfo;
	  var opts = {status: 'available'};
	  if (doc._deleted) {
	    opts.deleted = true;
	  }
	
	  if (newEdits) {
	    if (!doc._id) {
	      doc._id = uuid();
	    }
	    newRevId = uuid(32, 16).toLowerCase();
	    if (doc._rev) {
	      revInfo = parseRevisionInfo(doc._rev);
	      if (revInfo.error) {
	        return revInfo;
	      }
	      doc._rev_tree = [{
	        pos: revInfo.prefix,
	        ids: [revInfo.id, {status: 'missing'}, [[newRevId, opts, []]]]
	      }];
	      nRevNum = revInfo.prefix + 1;
	    } else {
	      doc._rev_tree = [{
	        pos: 1,
	        ids : [newRevId, opts, []]
	      }];
	      nRevNum = 1;
	    }
	  } else {
	    if (doc._revisions) {
	      doc._rev_tree = makeRevTreeFromRevisions(doc._revisions, opts);
	      nRevNum = doc._revisions.start;
	      newRevId = doc._revisions.ids[0];
	    }
	    if (!doc._rev_tree) {
	      revInfo = parseRevisionInfo(doc._rev);
	      if (revInfo.error) {
	        return revInfo;
	      }
	      nRevNum = revInfo.prefix;
	      newRevId = revInfo.id;
	      doc._rev_tree = [{
	        pos: nRevNum,
	        ids: [newRevId, opts, []]
	      }];
	    }
	  }
	
	  invalidIdError(doc._id);
	
	  doc._rev = nRevNum + '-' + newRevId;
	
	  var result = {metadata : {}, data : {}};
	  for (var key in doc) {
	    /* istanbul ignore else */
	    if (Object.prototype.hasOwnProperty.call(doc, key)) {
	      var specialKey = key[0] === '_';
	      if (specialKey && !reservedWords[key]) {
	        var error = createError(DOC_VALIDATION, key);
	        error.message = DOC_VALIDATION.message + ': ' + key;
	        throw error;
	      } else if (specialKey && !dataWords[key]) {
	        result.metadata[key.slice(1)] = doc[key];
	      } else {
	        result.data[key] = doc[key];
	      }
	    }
	  }
	  return result;
	}
	
	var atob$1 = function (str) {
	  return atob(str);
	};
	
	var btoa$1 = function (str) {
	  return btoa(str);
	};
	
	// Abstracts constructing a Blob object, so it also works in older
	// browsers that don't support the native Blob constructor (e.g.
	// old QtWebKit versions, Android < 4.4).
	function createBlob(parts, properties) {
	  /* global BlobBuilder,MSBlobBuilder,MozBlobBuilder,WebKitBlobBuilder */
	  parts = parts || [];
	  properties = properties || {};
	  try {
	    return new Blob(parts, properties);
	  } catch (e) {
	    if (e.name !== "TypeError") {
	      throw e;
	    }
	    var Builder = typeof BlobBuilder !== 'undefined' ? BlobBuilder :
	                  typeof MSBlobBuilder !== 'undefined' ? MSBlobBuilder :
	                  typeof MozBlobBuilder !== 'undefined' ? MozBlobBuilder :
	                  WebKitBlobBuilder;
	    var builder = new Builder();
	    for (var i = 0; i < parts.length; i += 1) {
	      builder.append(parts[i]);
	    }
	    return builder.getBlob(properties.type);
	  }
	}
	
	// From http://stackoverflow.com/questions/14967647/ (continues on next line)
	// encode-decode-image-with-base64-breaks-image (2013-04-21)
	function binaryStringToArrayBuffer(bin) {
	  var length = bin.length;
	  var buf = new ArrayBuffer(length);
	  var arr = new Uint8Array(buf);
	  for (var i = 0; i < length; i++) {
	    arr[i] = bin.charCodeAt(i);
	  }
	  return buf;
	}
	
	function binStringToBluffer(binString, type) {
	  return createBlob([binaryStringToArrayBuffer(binString)], {type: type});
	}
	
	function b64ToBluffer(b64, type) {
	  return binStringToBluffer(atob$1(b64), type);
	}
	
	//Can't find original post, but this is close
	//http://stackoverflow.com/questions/6965107/ (continues on next line)
	//converting-between-strings-and-arraybuffers
	function arrayBufferToBinaryString(buffer) {
	  var binary = '';
	  var bytes = new Uint8Array(buffer);
	  var length = bytes.byteLength;
	  for (var i = 0; i < length; i++) {
	    binary += String.fromCharCode(bytes[i]);
	  }
	  return binary;
	}
	
	// shim for browsers that don't support it
	function readAsBinaryString(blob, callback) {
	  if (typeof FileReader === 'undefined') {
	    // fix for Firefox in a web worker
	    // https://bugzilla.mozilla.org/show_bug.cgi?id=901097
	    return callback(arrayBufferToBinaryString(
	      new FileReaderSync().readAsArrayBuffer(blob)));
	  }
	
	  var reader = new FileReader();
	  var hasBinaryString = typeof reader.readAsBinaryString === 'function';
	  reader.onloadend = function (e) {
	    var result = e.target.result || '';
	    if (hasBinaryString) {
	      return callback(result);
	    }
	    callback(arrayBufferToBinaryString(result));
	  };
	  if (hasBinaryString) {
	    reader.readAsBinaryString(blob);
	  } else {
	    reader.readAsArrayBuffer(blob);
	  }
	}
	
	function blobToBinaryString(blobOrBuffer, callback) {
	  readAsBinaryString(blobOrBuffer, function (bin) {
	    callback(bin);
	  });
	}
	
	function blobToBase64(blobOrBuffer, callback) {
	  blobToBinaryString(blobOrBuffer, function (base64) {
	    callback(btoa$1(base64));
	  });
	}
	
	// simplified API. universal browser support is assumed
	function readAsArrayBuffer(blob, callback) {
	  if (typeof FileReader === 'undefined') {
	    // fix for Firefox in a web worker:
	    // https://bugzilla.mozilla.org/show_bug.cgi?id=901097
	    return callback(new FileReaderSync().readAsArrayBuffer(blob));
	  }
	
	  var reader = new FileReader();
	  reader.onloadend = function (e) {
	    var result = e.target.result || new ArrayBuffer(0);
	    callback(result);
	  };
	  reader.readAsArrayBuffer(blob);
	}
	
	var setImmediateShim = global.setImmediate || global.setTimeout;
	var MD5_CHUNK_SIZE = 32768;
	
	function rawToBase64(raw) {
	  return btoa$1(raw);
	}
	
	function sliceBlob(blob, start, end) {
	  if (blob.webkitSlice) {
	    return blob.webkitSlice(start, end);
	  }
	  return blob.slice(start, end);
	}
	
	function appendBlob(buffer, blob, start, end, callback) {
	  if (start > 0 || end < blob.size) {
	    // only slice blob if we really need to
	    blob = sliceBlob(blob, start, end);
	  }
	  readAsArrayBuffer(blob, function (arrayBuffer) {
	    buffer.append(arrayBuffer);
	    callback();
	  });
	}
	
	function appendString(buffer, string, start, end, callback) {
	  if (start > 0 || end < string.length) {
	    // only create a substring if we really need to
	    string = string.substring(start, end);
	  }
	  buffer.appendBinary(string);
	  callback();
	}
	
	function binaryMd5(data, callback) {
	  var inputIsString = typeof data === 'string';
	  var len = inputIsString ? data.length : data.size;
	  var chunkSize = Math.min(MD5_CHUNK_SIZE, len);
	  var chunks = Math.ceil(len / chunkSize);
	  var currentChunk = 0;
	  var buffer = inputIsString ? new Md5() : new Md5.ArrayBuffer();
	
	  var append = inputIsString ? appendString : appendBlob;
	
	  function next() {
	    setImmediateShim(loadNextChunk);
	  }
	
	  function done() {
	    var raw = buffer.end(true);
	    var base64 = rawToBase64(raw);
	    callback(base64);
	    buffer.destroy();
	  }
	
	  function loadNextChunk() {
	    var start = currentChunk * chunkSize;
	    var end = start + chunkSize;
	    currentChunk++;
	    if (currentChunk < chunks) {
	      append(buffer, data, start, end, next);
	    } else {
	      append(buffer, data, start, end, done);
	    }
	  }
	  loadNextChunk();
	}
	
	function stringMd5(string) {
	  return Md5.hash(string);
	}
	
	function parseBase64(data) {
	  try {
	    return atob$1(data);
	  } catch (e) {
	    var err = createError(BAD_ARG,
	      'Attachment is not a valid base64 string');
	    return {error: err};
	  }
	}
	
	function preprocessString(att, blobType, callback) {
	  var asBinary = parseBase64(att.data);
	  if (asBinary.error) {
	    return callback(asBinary.error);
	  }
	
	  att.length = asBinary.length;
	  if (blobType === 'blob') {
	    att.data = binStringToBluffer(asBinary, att.content_type);
	  } else if (blobType === 'base64') {
	    att.data = btoa$1(asBinary);
	  } else { // binary
	    att.data = asBinary;
	  }
	  binaryMd5(asBinary, function (result) {
	    att.digest = 'md5-' + result;
	    callback();
	  });
	}
	
	function preprocessBlob(att, blobType, callback) {
	  binaryMd5(att.data, function (md5) {
	    att.digest = 'md5-' + md5;
	    // size is for blobs (browser), length is for buffers (node)
	    att.length = att.data.size || att.data.length || 0;
	    if (blobType === 'binary') {
	      blobToBinaryString(att.data, function (binString) {
	        att.data = binString;
	        callback();
	      });
	    } else if (blobType === 'base64') {
	      blobToBase64(att.data, function (b64) {
	        att.data = b64;
	        callback();
	      });
	    } else {
	      callback();
	    }
	  });
	}
	
	function preprocessAttachment(att, blobType, callback) {
	  if (att.stub) {
	    return callback();
	  }
	  if (typeof att.data === 'string') { // input is a base64 string
	    preprocessString(att, blobType, callback);
	  } else { // input is a blob
	    preprocessBlob(att, blobType, callback);
	  }
	}
	
	function preprocessAttachments(docInfos, blobType, callback) {
	
	  if (!docInfos.length) {
	    return callback();
	  }
	
	  var docv = 0;
	  var overallErr;
	
	  docInfos.forEach(function (docInfo) {
	    var attachments = docInfo.data && docInfo.data._attachments ?
	      Object.keys(docInfo.data._attachments) : [];
	    var recv = 0;
	
	    if (!attachments.length) {
	      return done();
	    }
	
	    function processedAttachment(err) {
	      overallErr = err;
	      recv++;
	      if (recv === attachments.length) {
	        done();
	      }
	    }
	
	    for (var key in docInfo.data._attachments) {
	      if (docInfo.data._attachments.hasOwnProperty(key)) {
	        preprocessAttachment(docInfo.data._attachments[key],
	          blobType, processedAttachment);
	      }
	    }
	  });
	
	  function done() {
	    docv++;
	    if (docInfos.length === docv) {
	      if (overallErr) {
	        callback(overallErr);
	      } else {
	        callback();
	      }
	    }
	  }
	}
	
	function updateDoc(revLimit, prev, docInfo, results,
	                   i, cb, writeDoc, newEdits) {
	
	  if (revExists(prev.rev_tree, docInfo.metadata.rev)) {
	    results[i] = docInfo;
	    return cb();
	  }
	
	  // sometimes this is pre-calculated. historically not always
	  var previousWinningRev = prev.winningRev || winningRev(prev);
	  var previouslyDeleted = 'deleted' in prev ? prev.deleted :
	    isDeleted(prev, previousWinningRev);
	  var deleted = 'deleted' in docInfo.metadata ? docInfo.metadata.deleted :
	    isDeleted(docInfo.metadata);
	  var isRoot = /^1-/.test(docInfo.metadata.rev);
	
	  if (previouslyDeleted && !deleted && newEdits && isRoot) {
	    var newDoc = docInfo.data;
	    newDoc._rev = previousWinningRev;
	    newDoc._id = docInfo.metadata.id;
	    docInfo = parseDoc(newDoc, newEdits);
	  }
	
	  var merged = merge(prev.rev_tree, docInfo.metadata.rev_tree[0], revLimit);
	
	  var inConflict = newEdits && (((previouslyDeleted && deleted) ||
	    (!previouslyDeleted && merged.conflicts !== 'new_leaf') ||
	    (previouslyDeleted && !deleted && merged.conflicts === 'new_branch')));
	
	  if (inConflict) {
	    var err = createError(REV_CONFLICT);
	    results[i] = err;
	    return cb();
	  }
	
	  var newRev = docInfo.metadata.rev;
	  docInfo.metadata.rev_tree = merged.tree;
	  docInfo.stemmedRevs = merged.stemmedRevs || [];
	  /* istanbul ignore else */
	  if (prev.rev_map) {
	    docInfo.metadata.rev_map = prev.rev_map; // used only by leveldb
	  }
	
	  // recalculate
	  var winningRev$$ = winningRev(docInfo.metadata);
	  var winningRevIsDeleted = isDeleted(docInfo.metadata, winningRev$$);
	
	  // calculate the total number of documents that were added/removed,
	  // from the perspective of total_rows/doc_count
	  var delta = (previouslyDeleted === winningRevIsDeleted) ? 0 :
	    previouslyDeleted < winningRevIsDeleted ? -1 : 1;
	
	  var newRevIsDeleted;
	  if (newRev === winningRev$$) {
	    // if the new rev is the same as the winning rev, we can reuse that value
	    newRevIsDeleted = winningRevIsDeleted;
	  } else {
	    // if they're not the same, then we need to recalculate
	    newRevIsDeleted = isDeleted(docInfo.metadata, newRev);
	  }
	
	  writeDoc(docInfo, winningRev$$, winningRevIsDeleted, newRevIsDeleted,
	    true, delta, i, cb);
	}
	
	function rootIsMissing(docInfo) {
	  return docInfo.metadata.rev_tree[0].ids[1].status === 'missing';
	}
	
	function processDocs(revLimit, docInfos, api, fetchedDocs, tx, results,
	                     writeDoc, opts, overallCallback) {
	
	  // Default to 1000 locally
	  revLimit = revLimit || 1000;
	
	  function insertDoc(docInfo, resultsIdx, callback) {
	    // Cant insert new deleted documents
	    var winningRev$$ = winningRev(docInfo.metadata);
	    var deleted = isDeleted(docInfo.metadata, winningRev$$);
	    if ('was_delete' in opts && deleted) {
	      results[resultsIdx] = createError(MISSING_DOC, 'deleted');
	      return callback();
	    }
	
	    // 4712 - detect whether a new document was inserted with a _rev
	    var inConflict = newEdits && rootIsMissing(docInfo);
	
	    if (inConflict) {
	      var err = createError(REV_CONFLICT);
	      results[resultsIdx] = err;
	      return callback();
	    }
	
	    var delta = deleted ? 0 : 1;
	
	    writeDoc(docInfo, winningRev$$, deleted, deleted, false,
	      delta, resultsIdx, callback);
	  }
	
	  var newEdits = opts.new_edits;
	  var idsToDocs = new pouchdbCollections.Map();
	
	  var docsDone = 0;
	  var docsToDo = docInfos.length;
	
	  function checkAllDocsDone() {
	    if (++docsDone === docsToDo && overallCallback) {
	      overallCallback();
	    }
	  }
	
	  docInfos.forEach(function (currentDoc, resultsIdx) {
	
	    if (currentDoc._id && isLocalId(currentDoc._id)) {
	      var fun = currentDoc._deleted ? '_removeLocal' : '_putLocal';
	      api[fun](currentDoc, {ctx: tx}, function (err, res) {
	        results[resultsIdx] = err || res;
	        checkAllDocsDone();
	      });
	      return;
	    }
	
	    var id = currentDoc.metadata.id;
	    if (idsToDocs.has(id)) {
	      docsToDo--; // duplicate
	      idsToDocs.get(id).push([currentDoc, resultsIdx]);
	    } else {
	      idsToDocs.set(id, [[currentDoc, resultsIdx]]);
	    }
	  });
	
	  // in the case of new_edits, the user can provide multiple docs
	  // with the same id. these need to be processed sequentially
	  idsToDocs.forEach(function (docs, id) {
	    var numDone = 0;
	
	    function docWritten() {
	      if (++numDone < docs.length) {
	        nextDoc();
	      } else {
	        checkAllDocsDone();
	      }
	    }
	    function nextDoc() {
	      var value = docs[numDone];
	      var currentDoc = value[0];
	      var resultsIdx = value[1];
	
	      if (fetchedDocs.has(id)) {
	        updateDoc(revLimit, fetchedDocs.get(id), currentDoc, results,
	          resultsIdx, docWritten, writeDoc, newEdits);
	      } else {
	        // Ensure stemming applies to new writes as well
	        var merged = merge([], currentDoc.metadata.rev_tree[0], revLimit);
	        currentDoc.metadata.rev_tree = merged.tree;
	        currentDoc.stemmedRevs = merged.stemmedRevs || [];
	        insertDoc(currentDoc, resultsIdx, docWritten);
	      }
	    }
	    nextDoc();
	  });
	}
	
	// IndexedDB requires a versioned database structure, so we use the
	// version here to manage migrations.
	var ADAPTER_VERSION = 5;
	
	// The object stores created for each database
	// DOC_STORE stores the document meta data, its revision history and state
	// Keyed by document id
	var DOC_STORE = 'document-store';
	// BY_SEQ_STORE stores a particular version of a document, keyed by its
	// sequence id
	var BY_SEQ_STORE = 'by-sequence';
	// Where we store attachments
	var ATTACH_STORE = 'attach-store';
	// Where we store many-to-many relations
	// between attachment digests and seqs
	var ATTACH_AND_SEQ_STORE = 'attach-seq-store';
	
	// Where we store database-wide meta data in a single record
	// keyed by id: META_STORE
	var META_STORE = 'meta-store';
	// Where we store local documents
	var LOCAL_STORE = 'local-store';
	// Where we detect blob support
	var DETECT_BLOB_SUPPORT_STORE = 'detect-blob-support';
	
	function slowJsonParse(str) {
	  try {
	    return JSON.parse(str);
	  } catch (e) {
	    /* istanbul ignore next */
	    return vuvuzela.parse(str);
	  }
	}
	
	function safeJsonParse(str) {
	  // try/catch is deoptimized in V8, leading to slower
	  // times than we'd like to have. Most documents are _not_
	  // huge, and do not require a slower code path just to parse them.
	  // We can be pretty sure that a document under 50000 characters
	  // will not be so deeply nested as to throw a stack overflow error
	  // (depends on the engine and available memory, though, so this is
	  // just a hunch). 50000 was chosen based on the average length
	  // of this string in our test suite, to try to find a number that covers
	  // most of our test cases (26 over this size, 26378 under it).
	  if (str.length < 50000) {
	    return JSON.parse(str);
	  }
	  return slowJsonParse(str);
	}
	
	function safeJsonStringify(json) {
	  try {
	    return JSON.stringify(json);
	  } catch (e) {
	    /* istanbul ignore next */
	    return vuvuzela.stringify(json);
	  }
	}
	
	function tryCode(fun, that, args, PouchDB) {
	  try {
	    fun.apply(that, args);
	  } catch (err) {
	    // Shouldn't happen, but in some odd cases
	    // IndexedDB implementations might throw a sync
	    // error, in which case this will at least log it.
	    PouchDB.emit('error', err);
	  }
	}
	
	var taskQueue = {
	  running: false,
	  queue: []
	};
	
	function applyNext(PouchDB) {
	  if (taskQueue.running || !taskQueue.queue.length) {
	    return;
	  }
	  taskQueue.running = true;
	  var item = taskQueue.queue.shift();
	  item.action(function (err, res) {
	    tryCode(item.callback, this, [err, res], PouchDB);
	    taskQueue.running = false;
	    process.nextTick(function () {
	      applyNext(PouchDB);
	    });
	  });
	}
	
	function idbError(callback) {
	  return function (evt) {
	    var message = 'unknown_error';
	    if (evt.target && evt.target.error) {
	      message = evt.target.error.name || evt.target.error.message;
	    }
	    callback(createError(IDB_ERROR, message, evt.type));
	  };
	}
	
	// Unfortunately, the metadata has to be stringified
	// when it is put into the database, because otherwise
	// IndexedDB can throw errors for deeply-nested objects.
	// Originally we just used JSON.parse/JSON.stringify; now
	// we use this custom vuvuzela library that avoids recursion.
	// If we could do it all over again, we'd probably use a
	// format for the revision trees other than JSON.
	function encodeMetadata(metadata, winningRev, deleted) {
	  return {
	    data: safeJsonStringify(metadata),
	    winningRev: winningRev,
	    deletedOrLocal: deleted ? '1' : '0',
	    seq: metadata.seq, // highest seq for this doc
	    id: metadata.id
	  };
	}
	
	function decodeMetadata(storedObject) {
	  if (!storedObject) {
	    return null;
	  }
	  var metadata = safeJsonParse(storedObject.data);
	  metadata.winningRev = storedObject.winningRev;
	  metadata.deleted = storedObject.deletedOrLocal === '1';
	  metadata.seq = storedObject.seq;
	  return metadata;
	}
	
	// read the doc back out from the database. we don't store the
	// _id or _rev because we already have _doc_id_rev.
	function decodeDoc(doc) {
	  if (!doc) {
	    return doc;
	  }
	  var idx = doc._doc_id_rev.lastIndexOf(':');
	  doc._id = doc._doc_id_rev.substring(0, idx - 1);
	  doc._rev = doc._doc_id_rev.substring(idx + 1);
	  delete doc._doc_id_rev;
	  return doc;
	}
	
	// Read a blob from the database, encoding as necessary
	// and translating from base64 if the IDB doesn't support
	// native Blobs
	function readBlobData(body, type, asBlob, callback) {
	  if (asBlob) {
	    if (!body) {
	      callback(createBlob([''], {type: type}));
	    } else if (typeof body !== 'string') { // we have blob support
	      callback(body);
	    } else { // no blob support
	      callback(b64ToBluffer(body, type));
	    }
	  } else { // as base64 string
	    if (!body) {
	      callback('');
	    } else if (typeof body !== 'string') { // we have blob support
	      readAsBinaryString(body, function (binary) {
	        callback(btoa$1(binary));
	      });
	    } else { // no blob support
	      callback(body);
	    }
	  }
	}
	
	function fetchAttachmentsIfNecessary(doc, opts, txn, cb) {
	  var attachments = Object.keys(doc._attachments || {});
	  if (!attachments.length) {
	    return cb && cb();
	  }
	  var numDone = 0;
	
	  function checkDone() {
	    if (++numDone === attachments.length && cb) {
	      cb();
	    }
	  }
	
	  function fetchAttachment(doc, att) {
	    var attObj = doc._attachments[att];
	    var digest = attObj.digest;
	    var req = txn.objectStore(ATTACH_STORE).get(digest);
	    req.onsuccess = function (e) {
	      attObj.body = e.target.result.body;
	      checkDone();
	    };
	  }
	
	  attachments.forEach(function (att) {
	    if (opts.attachments && opts.include_docs) {
	      fetchAttachment(doc, att);
	    } else {
	      doc._attachments[att].stub = true;
	      checkDone();
	    }
	  });
	}
	
	// IDB-specific postprocessing necessary because
	// we don't know whether we stored a true Blob or
	// a base64-encoded string, and if it's a Blob it
	// needs to be read outside of the transaction context
	function postProcessAttachments(results, asBlob) {
	  return PouchPromise.all(results.map(function (row) {
	    if (row.doc && row.doc._attachments) {
	      var attNames = Object.keys(row.doc._attachments);
	      return PouchPromise.all(attNames.map(function (att) {
	        var attObj = row.doc._attachments[att];
	        if (!('body' in attObj)) { // already processed
	          return;
	        }
	        var body = attObj.body;
	        var type = attObj.content_type;
	        return new PouchPromise(function (resolve) {
	          readBlobData(body, type, asBlob, function (data) {
	            row.doc._attachments[att] = jsExtend.extend(
	              pick(attObj, ['digest', 'content_type']),
	              {data: data}
	            );
	            resolve();
	          });
	        });
	      }));
	    }
	  }));
	}
	
	function compactRevs(revs, docId, txn) {
	
	  var possiblyOrphanedDigests = [];
	  var seqStore = txn.objectStore(BY_SEQ_STORE);
	  var attStore = txn.objectStore(ATTACH_STORE);
	  var attAndSeqStore = txn.objectStore(ATTACH_AND_SEQ_STORE);
	  var count = revs.length;
	
	  function checkDone() {
	    count--;
	    if (!count) { // done processing all revs
	      deleteOrphanedAttachments();
	    }
	  }
	
	  function deleteOrphanedAttachments() {
	    if (!possiblyOrphanedDigests.length) {
	      return;
	    }
	    possiblyOrphanedDigests.forEach(function (digest) {
	      var countReq = attAndSeqStore.index('digestSeq').count(
	        IDBKeyRange.bound(
	          digest + '::', digest + '::\uffff', false, false));
	      countReq.onsuccess = function (e) {
	        var count = e.target.result;
	        if (!count) {
	          // orphaned
	          attStore.delete(digest);
	        }
	      };
	    });
	  }
	
	  revs.forEach(function (rev) {
	    var index = seqStore.index('_doc_id_rev');
	    var key = docId + "::" + rev;
	    index.getKey(key).onsuccess = function (e) {
	      var seq = e.target.result;
	      if (typeof seq !== 'number') {
	        return checkDone();
	      }
	      seqStore.delete(seq);
	
	      var cursor = attAndSeqStore.index('seq')
	        .openCursor(IDBKeyRange.only(seq));
	
	      cursor.onsuccess = function (event) {
	        var cursor = event.target.result;
	        if (cursor) {
	          var digest = cursor.value.digestSeq.split('::')[0];
	          possiblyOrphanedDigests.push(digest);
	          attAndSeqStore.delete(cursor.primaryKey);
	          cursor.continue();
	        } else { // done
	          checkDone();
	        }
	      };
	    };
	  });
	}
	
	function openTransactionSafely(idb, stores, mode) {
	  try {
	    return {
	      txn: idb.transaction(stores, mode)
	    };
	  } catch (err) {
	    return {
	      error: err
	    };
	  }
	}
	
	function idbBulkDocs(dbOpts, req, opts, api, idb, idbChanges, callback) {
	  var docInfos = req.docs;
	  var txn;
	  var docStore;
	  var bySeqStore;
	  var attachStore;
	  var attachAndSeqStore;
	  var docInfoError;
	  var docCountDelta = 0;
	
	  for (var i = 0, len = docInfos.length; i < len; i++) {
	    var doc = docInfos[i];
	    if (doc._id && isLocalId(doc._id)) {
	      continue;
	    }
	    doc = docInfos[i] = parseDoc(doc, opts.new_edits);
	    if (doc.error && !docInfoError) {
	      docInfoError = doc;
	    }
	  }
	
	  if (docInfoError) {
	    return callback(docInfoError);
	  }
	
	  var results = new Array(docInfos.length);
	  var fetchedDocs = new pouchdbCollections.Map();
	  var preconditionErrored = false;
	  var blobType = api._meta.blobSupport ? 'blob' : 'base64';
	
	  preprocessAttachments(docInfos, blobType, function (err) {
	    if (err) {
	      return callback(err);
	    }
	    startTransaction();
	  });
	
	  function startTransaction() {
	
	    var stores = [
	      DOC_STORE, BY_SEQ_STORE,
	      ATTACH_STORE,
	      LOCAL_STORE, ATTACH_AND_SEQ_STORE
	    ];
	    var txnResult = openTransactionSafely(idb, stores, 'readwrite');
	    if (txnResult.error) {
	      return callback(txnResult.error);
	    }
	    txn = txnResult.txn;
	    txn.onabort = idbError(callback);
	    txn.ontimeout = idbError(callback);
	    txn.oncomplete = complete;
	    docStore = txn.objectStore(DOC_STORE);
	    bySeqStore = txn.objectStore(BY_SEQ_STORE);
	    attachStore = txn.objectStore(ATTACH_STORE);
	    attachAndSeqStore = txn.objectStore(ATTACH_AND_SEQ_STORE);
	
	    verifyAttachments(function (err) {
	      if (err) {
	        preconditionErrored = true;
	        return callback(err);
	      }
	      fetchExistingDocs();
	    });
	  }
	
	  function idbProcessDocs() {
	    processDocs(dbOpts.revs_limit, docInfos, api, fetchedDocs,
	                txn, results, writeDoc, opts);
	  }
	
	  function fetchExistingDocs() {
	
	    if (!docInfos.length) {
	      return;
	    }
	
	    var numFetched = 0;
	
	    function checkDone() {
	      if (++numFetched === docInfos.length) {
	        idbProcessDocs();
	      }
	    }
	
	    function readMetadata(event) {
	      var metadata = decodeMetadata(event.target.result);
	
	      if (metadata) {
	        fetchedDocs.set(metadata.id, metadata);
	      }
	      checkDone();
	    }
	
	    for (var i = 0, len = docInfos.length; i < len; i++) {
	      var docInfo = docInfos[i];
	      if (docInfo._id && isLocalId(docInfo._id)) {
	        checkDone(); // skip local docs
	        continue;
	      }
	      var req = docStore.get(docInfo.metadata.id);
	      req.onsuccess = readMetadata;
	    }
	  }
	
	  function complete() {
	    if (preconditionErrored) {
	      return;
	    }
	
	    idbChanges.notify(api._meta.name);
	    api._meta.docCount += docCountDelta;
	    callback(null, results);
	  }
	
	  function verifyAttachment(digest, callback) {
	
	    var req = attachStore.get(digest);
	    req.onsuccess = function (e) {
	      if (!e.target.result) {
	        var err = createError(MISSING_STUB,
	          'unknown stub attachment with digest ' +
	          digest);
	        err.status = 412;
	        callback(err);
	      } else {
	        callback();
	      }
	    };
	  }
	
	  function verifyAttachments(finish) {
	
	
	    var digests = [];
	    docInfos.forEach(function (docInfo) {
	      if (docInfo.data && docInfo.data._attachments) {
	        Object.keys(docInfo.data._attachments).forEach(function (filename) {
	          var att = docInfo.data._attachments[filename];
	          if (att.stub) {
	            digests.push(att.digest);
	          }
	        });
	      }
	    });
	    if (!digests.length) {
	      return finish();
	    }
	    var numDone = 0;
	    var err;
	
	    function checkDone() {
	      if (++numDone === digests.length) {
	        finish(err);
	      }
	    }
	    digests.forEach(function (digest) {
	      verifyAttachment(digest, function (attErr) {
	        if (attErr && !err) {
	          err = attErr;
	        }
	        checkDone();
	      });
	    });
	  }
	
	  function writeDoc(docInfo, winningRev, winningRevIsDeleted, newRevIsDeleted,
	                    isUpdate, delta, resultsIdx, callback) {
	
	    docCountDelta += delta;
	
	    docInfo.metadata.winningRev = winningRev;
	    docInfo.metadata.deleted = winningRevIsDeleted;
	
	    var doc = docInfo.data;
	    doc._id = docInfo.metadata.id;
	    doc._rev = docInfo.metadata.rev;
	
	    if (newRevIsDeleted) {
	      doc._deleted = true;
	    }
	
	    var hasAttachments = doc._attachments &&
	      Object.keys(doc._attachments).length;
	    if (hasAttachments) {
	      return writeAttachments(docInfo, winningRev, winningRevIsDeleted,
	        isUpdate, resultsIdx, callback);
	    }
	
	    finishDoc(docInfo, winningRev, winningRevIsDeleted,
	      isUpdate, resultsIdx, callback);
	  }
	
	  function finishDoc(docInfo, winningRev, winningRevIsDeleted,
	                     isUpdate, resultsIdx, callback) {
	
	    var doc = docInfo.data;
	    var metadata = docInfo.metadata;
	
	    doc._doc_id_rev = metadata.id + '::' + metadata.rev;
	    delete doc._id;
	    delete doc._rev;
	
	    function afterPutDoc(e) {
	      var revsToDelete = docInfo.stemmedRevs || [];
	
	      if (isUpdate && api.auto_compaction) {
	        revsToDelete = revsToDelete.concat(compactTree(docInfo.metadata));
	      }
	
	      if (revsToDelete && revsToDelete.length) {
	        compactRevs(revsToDelete, docInfo.metadata.id, txn);
	      }
	
	      metadata.seq = e.target.result;
	      // Current _rev is calculated from _rev_tree on read
	      delete metadata.rev;
	      var metadataToStore = encodeMetadata(metadata, winningRev,
	        winningRevIsDeleted);
	      var metaDataReq = docStore.put(metadataToStore);
	      metaDataReq.onsuccess = afterPutMetadata;
	    }
	
	    function afterPutDocError(e) {
	      // ConstraintError, need to update, not put (see #1638 for details)
	      e.preventDefault(); // avoid transaction abort
	      e.stopPropagation(); // avoid transaction onerror
	      var index = bySeqStore.index('_doc_id_rev');
	      var getKeyReq = index.getKey(doc._doc_id_rev);
	      getKeyReq.onsuccess = function (e) {
	        var putReq = bySeqStore.put(doc, e.target.result);
	        putReq.onsuccess = afterPutDoc;
	      };
	    }
	
	    function afterPutMetadata() {
	      results[resultsIdx] = {
	        ok: true,
	        id: metadata.id,
	        rev: winningRev
	      };
	      fetchedDocs.set(docInfo.metadata.id, docInfo.metadata);
	      insertAttachmentMappings(docInfo, metadata.seq, callback);
	    }
	
	    var putReq = bySeqStore.put(doc);
	
	    putReq.onsuccess = afterPutDoc;
	    putReq.onerror = afterPutDocError;
	  }
	
	  function writeAttachments(docInfo, winningRev, winningRevIsDeleted,
	                            isUpdate, resultsIdx, callback) {
	
	
	    var doc = docInfo.data;
	
	    var numDone = 0;
	    var attachments = Object.keys(doc._attachments);
	
	    function collectResults() {
	      if (numDone === attachments.length) {
	        finishDoc(docInfo, winningRev, winningRevIsDeleted,
	          isUpdate, resultsIdx, callback);
	      }
	    }
	
	    function attachmentSaved() {
	      numDone++;
	      collectResults();
	    }
	
	    attachments.forEach(function (key) {
	      var att = docInfo.data._attachments[key];
	      if (!att.stub) {
	        var data = att.data;
	        delete att.data;
	        att.revpos = parseInt(winningRev, 10);
	        var digest = att.digest;
	        saveAttachment(digest, data, attachmentSaved);
	      } else {
	        numDone++;
	        collectResults();
	      }
	    });
	  }
	
	  // map seqs to attachment digests, which
	  // we will need later during compaction
	  function insertAttachmentMappings(docInfo, seq, callback) {
	
	    var attsAdded = 0;
	    var attsToAdd = Object.keys(docInfo.data._attachments || {});
	
	    if (!attsToAdd.length) {
	      return callback();
	    }
	
	    function checkDone() {
	      if (++attsAdded === attsToAdd.length) {
	        callback();
	      }
	    }
	
	    function add(att) {
	      var digest = docInfo.data._attachments[att].digest;
	      var req = attachAndSeqStore.put({
	        seq: seq,
	        digestSeq: digest + '::' + seq
	      });
	
	      req.onsuccess = checkDone;
	      req.onerror = function (e) {
	        // this callback is for a constaint error, which we ignore
	        // because this docid/rev has already been associated with
	        // the digest (e.g. when new_edits == false)
	        e.preventDefault(); // avoid transaction abort
	        e.stopPropagation(); // avoid transaction onerror
	        checkDone();
	      };
	    }
	    for (var i = 0; i < attsToAdd.length; i++) {
	      add(attsToAdd[i]); // do in parallel
	    }
	  }
	
	  function saveAttachment(digest, data, callback) {
	
	
	    var getKeyReq = attachStore.count(digest);
	    getKeyReq.onsuccess = function (e) {
	      var count = e.target.result;
	      if (count) {
	        return callback(); // already exists
	      }
	      var newAtt = {
	        digest: digest,
	        body: data
	      };
	      var putReq = attachStore.put(newAtt);
	      putReq.onsuccess = callback;
	    };
	  }
	}
	
	function createKeyRange(start, end, inclusiveEnd, key, descending) {
	  try {
	    if (start && end) {
	      if (descending) {
	        return IDBKeyRange.bound(end, start, !inclusiveEnd, false);
	      } else {
	        return IDBKeyRange.bound(start, end, false, !inclusiveEnd);
	      }
	    } else if (start) {
	      if (descending) {
	        return IDBKeyRange.upperBound(start);
	      } else {
	        return IDBKeyRange.lowerBound(start);
	      }
	    } else if (end) {
	      if (descending) {
	        return IDBKeyRange.lowerBound(end, !inclusiveEnd);
	      } else {
	        return IDBKeyRange.upperBound(end, !inclusiveEnd);
	      }
	    } else if (key) {
	      return IDBKeyRange.only(key);
	    }
	  } catch (e) {
	    return {error: e};
	  }
	  return null;
	}
	
	function handleKeyRangeError(api, opts, err, callback) {
	  if (err.name === "DataError" && err.code === 0) {
	    // data error, start is less than end
	    return callback(null, {
	      total_rows: api._meta.docCount,
	      offset: opts.skip,
	      rows: []
	    });
	  }
	  callback(createError(IDB_ERROR, err.name, err.message));
	}
	
	function idbAllDocs(opts, api, idb, callback) {
	
	  function allDocsQuery(opts, callback) {
	    var start = 'startkey' in opts ? opts.startkey : false;
	    var end = 'endkey' in opts ? opts.endkey : false;
	    var key = 'key' in opts ? opts.key : false;
	    var skip = opts.skip || 0;
	    var limit = typeof opts.limit === 'number' ? opts.limit : -1;
	    var inclusiveEnd = opts.inclusive_end !== false;
	    var descending = 'descending' in opts && opts.descending ? 'prev' : null;
	
	    var keyRange = createKeyRange(start, end, inclusiveEnd, key, descending);
	    if (keyRange && keyRange.error) {
	      return handleKeyRangeError(api, opts, keyRange.error, callback);
	    }
	
	    var stores = [DOC_STORE, BY_SEQ_STORE];
	
	    if (opts.attachments) {
	      stores.push(ATTACH_STORE);
	    }
	    var txnResult = openTransactionSafely(idb, stores, 'readonly');
	    if (txnResult.error) {
	      return callback(txnResult.error);
	    }
	    var txn = txnResult.txn;
	    var docStore = txn.objectStore(DOC_STORE);
	    var seqStore = txn.objectStore(BY_SEQ_STORE);
	    var cursor = descending ?
	      docStore.openCursor(keyRange, descending) :
	      docStore.openCursor(keyRange);
	    var docIdRevIndex = seqStore.index('_doc_id_rev');
	    var results = [];
	    var docCount = 0;
	
	    // if the user specifies include_docs=true, then we don't
	    // want to block the main cursor while we're fetching the doc
	    function fetchDocAsynchronously(metadata, row, winningRev) {
	      var key = metadata.id + "::" + winningRev;
	      docIdRevIndex.get(key).onsuccess =  function onGetDoc(e) {
	        row.doc = decodeDoc(e.target.result);
	        if (opts.conflicts) {
	          row.doc._conflicts = collectConflicts(metadata);
	        }
	        fetchAttachmentsIfNecessary(row.doc, opts, txn);
	      };
	    }
	
	    function allDocsInner(cursor, winningRev, metadata) {
	      var row = {
	        id: metadata.id,
	        key: metadata.id,
	        value: {
	          rev: winningRev
	        }
	      };
	      var deleted = metadata.deleted;
	      if (opts.deleted === 'ok') {
	        results.push(row);
	        // deleted docs are okay with "keys" requests
	        if (deleted) {
	          row.value.deleted = true;
	          row.doc = null;
	        } else if (opts.include_docs) {
	          fetchDocAsynchronously(metadata, row, winningRev);
	        }
	      } else if (!deleted && skip-- <= 0) {
	        results.push(row);
	        if (opts.include_docs) {
	          fetchDocAsynchronously(metadata, row, winningRev);
	        }
	        if (--limit === 0) {
	          return;
	        }
	      }
	      cursor.continue();
	    }
	
	    function onGetCursor(e) {
	      docCount = api._meta.docCount; // do this within the txn for consistency
	      var cursor = e.target.result;
	      if (!cursor) {
	        return;
	      }
	      var metadata = decodeMetadata(cursor.value);
	      var winningRev = metadata.winningRev;
	
	      allDocsInner(cursor, winningRev, metadata);
	    }
	
	    function onResultsReady() {
	      callback(null, {
	        total_rows: docCount,
	        offset: opts.skip,
	        rows: results
	      });
	    }
	
	    function onTxnComplete() {
	      if (opts.attachments) {
	        postProcessAttachments(results, opts.binary).then(onResultsReady);
	      } else {
	        onResultsReady();
	      }
	    }
	
	    txn.oncomplete = onTxnComplete;
	    cursor.onsuccess = onGetCursor;
	  }
	
	  function allDocs(opts, callback) {
	
	    if (opts.limit === 0) {
	      return callback(null, {
	        total_rows: api._meta.docCount,
	        offset: opts.skip,
	        rows: []
	      });
	    }
	    allDocsQuery(opts, callback);
	  }
	
	  allDocs(opts, callback);
	}
	
	//
	// Blobs are not supported in all versions of IndexedDB, notably
	// Chrome <37 and Android <5. In those versions, storing a blob will throw.
	//
	// Various other blob bugs exist in Chrome v37-42 (inclusive).
	// Detecting them is expensive and confusing to users, and Chrome 37-42
	// is at very low usage worldwide, so we do a hacky userAgent check instead.
	//
	// content-type bug: https://code.google.com/p/chromium/issues/detail?id=408120
	// 404 bug: https://code.google.com/p/chromium/issues/detail?id=447916
	// FileReader bug: https://code.google.com/p/chromium/issues/detail?id=447836
	//
	function checkBlobSupport(txn) {
	  return new PouchPromise(function (resolve) {
	    var blob = createBlob(['']);
	    txn.objectStore(DETECT_BLOB_SUPPORT_STORE).put(blob, 'key');
	
	    txn.onabort = function (e) {
	      // If the transaction aborts now its due to not being able to
	      // write to the database, likely due to the disk being full
	      e.preventDefault();
	      e.stopPropagation();
	      resolve(false);
	    };
	
	    txn.oncomplete = function () {
	      var matchedChrome = navigator.userAgent.match(/Chrome\/(\d+)/);
	      var matchedEdge = navigator.userAgent.match(/Edge\//);
	      // MS Edge pretends to be Chrome 42:
	      // https://msdn.microsoft.com/en-us/library/hh869301%28v=vs.85%29.aspx
	      resolve(matchedEdge || !matchedChrome ||
	        parseInt(matchedChrome[1], 10) >= 43);
	    };
	  }).catch(function () {
	    return false; // error, so assume unsupported
	  });
	}
	
	var cachedDBs = new pouchdbCollections.Map();
	var blobSupportPromise;
	var idbChanges = new Changes$1();
	var openReqList = new pouchdbCollections.Map();
	
	function IdbPouch(opts, callback) {
	  var api = this;
	
	  taskQueue.queue.push({
	    action: function (thisCallback) {
	      init(api, opts, thisCallback);
	    },
	    callback: callback
	  });
	  applyNext(api.constructor);
	}
	
	function init(api, opts, callback) {
	
	  var dbName = opts.name;
	
	  var idb = null;
	  api._meta = null;
	
	  // called when creating a fresh new database
	  function createSchema(db) {
	    var docStore = db.createObjectStore(DOC_STORE, {keyPath : 'id'});
	    db.createObjectStore(BY_SEQ_STORE, {autoIncrement: true})
	      .createIndex('_doc_id_rev', '_doc_id_rev', {unique: true});
	    db.createObjectStore(ATTACH_STORE, {keyPath: 'digest'});
	    db.createObjectStore(META_STORE, {keyPath: 'id', autoIncrement: false});
	    db.createObjectStore(DETECT_BLOB_SUPPORT_STORE);
	
	    // added in v2
	    docStore.createIndex('deletedOrLocal', 'deletedOrLocal', {unique : false});
	
	    // added in v3
	    db.createObjectStore(LOCAL_STORE, {keyPath: '_id'});
	
	    // added in v4
	    var attAndSeqStore = db.createObjectStore(ATTACH_AND_SEQ_STORE,
	      {autoIncrement: true});
	    attAndSeqStore.createIndex('seq', 'seq');
	    attAndSeqStore.createIndex('digestSeq', 'digestSeq', {unique: true});
	  }
	
	  // migration to version 2
	  // unfortunately "deletedOrLocal" is a misnomer now that we no longer
	  // store local docs in the main doc-store, but whaddyagonnado
	  function addDeletedOrLocalIndex(txn, callback) {
	    var docStore = txn.objectStore(DOC_STORE);
	    docStore.createIndex('deletedOrLocal', 'deletedOrLocal', {unique : false});
	
	    docStore.openCursor().onsuccess = function (event) {
	      var cursor = event.target.result;
	      if (cursor) {
	        var metadata = cursor.value;
	        var deleted = isDeleted(metadata);
	        metadata.deletedOrLocal = deleted ? "1" : "0";
	        docStore.put(metadata);
	        cursor.continue();
	      } else {
	        callback();
	      }
	    };
	  }
	
	  // migration to version 3 (part 1)
	  function createLocalStoreSchema(db) {
	    db.createObjectStore(LOCAL_STORE, {keyPath: '_id'})
	      .createIndex('_doc_id_rev', '_doc_id_rev', {unique: true});
	  }
	
	  // migration to version 3 (part 2)
	  function migrateLocalStore(txn, cb) {
	    var localStore = txn.objectStore(LOCAL_STORE);
	    var docStore = txn.objectStore(DOC_STORE);
	    var seqStore = txn.objectStore(BY_SEQ_STORE);
	
	    var cursor = docStore.openCursor();
	    cursor.onsuccess = function (event) {
	      var cursor = event.target.result;
	      if (cursor) {
	        var metadata = cursor.value;
	        var docId = metadata.id;
	        var local = isLocalId(docId);
	        var rev = winningRev(metadata);
	        if (local) {
	          var docIdRev = docId + "::" + rev;
	          // remove all seq entries
	          // associated with this docId
	          var start = docId + "::";
	          var end = docId + "::~";
	          var index = seqStore.index('_doc_id_rev');
	          var range = IDBKeyRange.bound(start, end, false, false);
	          var seqCursor = index.openCursor(range);
	          seqCursor.onsuccess = function (e) {
	            seqCursor = e.target.result;
	            if (!seqCursor) {
	              // done
	              docStore.delete(cursor.primaryKey);
	              cursor.continue();
	            } else {
	              var data = seqCursor.value;
	              if (data._doc_id_rev === docIdRev) {
	                localStore.put(data);
	              }
	              seqStore.delete(seqCursor.primaryKey);
	              seqCursor.continue();
	            }
	          };
	        } else {
	          cursor.continue();
	        }
	      } else if (cb) {
	        cb();
	      }
	    };
	  }
	
	  // migration to version 4 (part 1)
	  function addAttachAndSeqStore(db) {
	    var attAndSeqStore = db.createObjectStore(ATTACH_AND_SEQ_STORE,
	      {autoIncrement: true});
	    attAndSeqStore.createIndex('seq', 'seq');
	    attAndSeqStore.createIndex('digestSeq', 'digestSeq', {unique: true});
	  }
	
	  // migration to version 4 (part 2)
	  function migrateAttsAndSeqs(txn, callback) {
	    var seqStore = txn.objectStore(BY_SEQ_STORE);
	    var attStore = txn.objectStore(ATTACH_STORE);
	    var attAndSeqStore = txn.objectStore(ATTACH_AND_SEQ_STORE);
	
	    // need to actually populate the table. this is the expensive part,
	    // so as an optimization, check first that this database even
	    // contains attachments
	    var req = attStore.count();
	    req.onsuccess = function (e) {
	      var count = e.target.result;
	      if (!count) {
	        return callback(); // done
	      }
	
	      seqStore.openCursor().onsuccess = function (e) {
	        var cursor = e.target.result;
	        if (!cursor) {
	          return callback(); // done
	        }
	        var doc = cursor.value;
	        var seq = cursor.primaryKey;
	        var atts = Object.keys(doc._attachments || {});
	        var digestMap = {};
	        for (var j = 0; j < atts.length; j++) {
	          var att = doc._attachments[atts[j]];
	          digestMap[att.digest] = true; // uniq digests, just in case
	        }
	        var digests = Object.keys(digestMap);
	        for (j = 0; j < digests.length; j++) {
	          var digest = digests[j];
	          attAndSeqStore.put({
	            seq: seq,
	            digestSeq: digest + '::' + seq
	          });
	        }
	        cursor.continue();
	      };
	    };
	  }
	
	  // migration to version 5
	  // Instead of relying on on-the-fly migration of metadata,
	  // this brings the doc-store to its modern form:
	  // - metadata.winningrev
	  // - metadata.seq
	  // - stringify the metadata when storing it
	  function migrateMetadata(txn) {
	
	    function decodeMetadataCompat(storedObject) {
	      if (!storedObject.data) {
	        // old format, when we didn't store it stringified
	        storedObject.deleted = storedObject.deletedOrLocal === '1';
	        return storedObject;
	      }
	      return decodeMetadata(storedObject);
	    }
	
	    // ensure that every metadata has a winningRev and seq,
	    // which was previously created on-the-fly but better to migrate
	    var bySeqStore = txn.objectStore(BY_SEQ_STORE);
	    var docStore = txn.objectStore(DOC_STORE);
	    var cursor = docStore.openCursor();
	    cursor.onsuccess = function (e) {
	      var cursor = e.target.result;
	      if (!cursor) {
	        return; // done
	      }
	      var metadata = decodeMetadataCompat(cursor.value);
	
	      metadata.winningRev = metadata.winningRev ||
	        winningRev(metadata);
	
	      function fetchMetadataSeq() {
	        // metadata.seq was added post-3.2.0, so if it's missing,
	        // we need to fetch it manually
	        var start = metadata.id + '::';
	        var end = metadata.id + '::\uffff';
	        var req = bySeqStore.index('_doc_id_rev').openCursor(
	          IDBKeyRange.bound(start, end));
	
	        var metadataSeq = 0;
	        req.onsuccess = function (e) {
	          var cursor = e.target.result;
	          if (!cursor) {
	            metadata.seq = metadataSeq;
	            return onGetMetadataSeq();
	          }
	          var seq = cursor.primaryKey;
	          if (seq > metadataSeq) {
	            metadataSeq = seq;
	          }
	          cursor.continue();
	        };
	      }
	
	      function onGetMetadataSeq() {
	        var metadataToStore = encodeMetadata(metadata,
	          metadata.winningRev, metadata.deleted);
	
	        var req = docStore.put(metadataToStore);
	        req.onsuccess = function () {
	          cursor.continue();
	        };
	      }
	
	      if (metadata.seq) {
	        return onGetMetadataSeq();
	      }
	
	      fetchMetadataSeq();
	    };
	
	  }
	
	  api.type = function () {
	    return 'idb';
	  };
	
	  api._id = toPromise(function (callback) {
	    callback(null, api._meta.instanceId);
	  });
	
	  api._bulkDocs = function idb_bulkDocs(req, reqOpts, callback) {
	    idbBulkDocs(opts, req, reqOpts, api, idb, idbChanges, callback);
	  };
	
	  // First we look up the metadata in the ids database, then we fetch the
	  // current revision(s) from the by sequence store
	  api._get = function idb_get(id, opts, callback) {
	    var doc;
	    var metadata;
	    var err;
	    var txn = opts.ctx;
	    if (!txn) {
	      var txnResult = openTransactionSafely(idb,
	        [DOC_STORE, BY_SEQ_STORE, ATTACH_STORE], 'readonly');
	      if (txnResult.error) {
	        return callback(txnResult.error);
	      }
	      txn = txnResult.txn;
	    }
	
	    function finish() {
	      callback(err, {doc: doc, metadata: metadata, ctx: txn});
	    }
	
	    txn.objectStore(DOC_STORE).get(id).onsuccess = function (e) {
	      metadata = decodeMetadata(e.target.result);
	      // we can determine the result here if:
	      // 1. there is no such document
	      // 2. the document is deleted and we don't ask about specific rev
	      // When we ask with opts.rev we expect the answer to be either
	      // doc (possibly with _deleted=true) or missing error
	      if (!metadata) {
	        err = createError(MISSING_DOC, 'missing');
	        return finish();
	      }
	      if (isDeleted(metadata) && !opts.rev) {
	        err = createError(MISSING_DOC, "deleted");
	        return finish();
	      }
	      var objectStore = txn.objectStore(BY_SEQ_STORE);
	
	      var rev = opts.rev || metadata.winningRev;
	      var key = metadata.id + '::' + rev;
	
	      objectStore.index('_doc_id_rev').get(key).onsuccess = function (e) {
	        doc = e.target.result;
	        if (doc) {
	          doc = decodeDoc(doc);
	        }
	        if (!doc) {
	          err = createError(MISSING_DOC, 'missing');
	          return finish();
	        }
	        finish();
	      };
	    };
	  };
	
	  api._getAttachment = function (docId, attachId, attachment, opts, callback) {
	    var txn;
	    if (opts.ctx) {
	      txn = opts.ctx;
	    } else {
	      var txnResult = openTransactionSafely(idb,
	        [DOC_STORE, BY_SEQ_STORE, ATTACH_STORE], 'readonly');
	      if (txnResult.error) {
	        return callback(txnResult.error);
	      }
	      txn = txnResult.txn;
	    }
	    var digest = attachment.digest;
	    var type = attachment.content_type;
	
	    txn.objectStore(ATTACH_STORE).get(digest).onsuccess = function (e) {
	      var body = e.target.result.body;
	      readBlobData(body, type, opts.binary, function (blobData) {
	        callback(null, blobData);
	      });
	    };
	  };
	
	  api._info = function idb_info(callback) {
	
	    if (idb === null || !cachedDBs.has(dbName)) {
	      var error = new Error('db isn\'t open');
	      error.id = 'idbNull';
	      return callback(error);
	    }
	    var updateSeq;
	    var docCount;
	
	    var txnResult = openTransactionSafely(idb, [BY_SEQ_STORE], 'readonly');
	    if (txnResult.error) {
	      return callback(txnResult.error);
	    }
	    var txn = txnResult.txn;
	    var cursor = txn.objectStore(BY_SEQ_STORE).openCursor(null, 'prev');
	    cursor.onsuccess = function (event) {
	      var cursor = event.target.result;
	      updateSeq = cursor ? cursor.key : 0;
	      // count within the same txn for consistency
	      docCount = api._meta.docCount;
	    };
	
	    txn.oncomplete = function () {
	      callback(null, {
	        doc_count: docCount,
	        update_seq: updateSeq,
	        // for debugging
	        idb_attachment_format: (api._meta.blobSupport ? 'binary' : 'base64')
	      });
	    };
	  };
	
	  api._allDocs = function idb_allDocs(opts, callback) {
	    idbAllDocs(opts, api, idb, callback);
	  };
	
	  api._changes = function (opts) {
	    opts = clone(opts);
	
	    if (opts.continuous) {
	      var id = dbName + ':' + uuid();
	      idbChanges.addListener(dbName, id, api, opts);
	      idbChanges.notify(dbName);
	      return {
	        cancel: function () {
	          idbChanges.removeListener(dbName, id);
	        }
	      };
	    }
	
	    var docIds = opts.doc_ids && new pouchdbCollections.Set(opts.doc_ids);
	
	    opts.since = opts.since || 0;
	    var lastSeq = opts.since;
	
	    var limit = 'limit' in opts ? opts.limit : -1;
	    if (limit === 0) {
	      limit = 1; // per CouchDB _changes spec
	    }
	    var returnDocs;
	    if ('return_docs' in opts) {
	      returnDocs = opts.return_docs;
	    } else if ('returnDocs' in opts) {
	      // TODO: Remove 'returnDocs' in favor of 'return_docs' in a future release
	      returnDocs = opts.returnDocs;
	    } else {
	      returnDocs = true;
	    }
	
	    var results = [];
	    var numResults = 0;
	    var filter = filterChange(opts);
	    var docIdsToMetadata = new pouchdbCollections.Map();
	
	    var txn;
	    var bySeqStore;
	    var docStore;
	    var docIdRevIndex;
	
	    function onGetCursor(cursor) {
	
	      var doc = decodeDoc(cursor.value);
	      var seq = cursor.key;
	
	      if (docIds && !docIds.has(doc._id)) {
	        return cursor.continue();
	      }
	
	      var metadata;
	
	      function onGetMetadata() {
	        if (metadata.seq !== seq) {
	          // some other seq is later
	          return cursor.continue();
	        }
	
	        lastSeq = seq;
	
	        if (metadata.winningRev === doc._rev) {
	          return onGetWinningDoc(doc);
	        }
	
	        fetchWinningDoc();
	      }
	
	      function fetchWinningDoc() {
	        var docIdRev = doc._id + '::' + metadata.winningRev;
	        var req = docIdRevIndex.get(docIdRev);
	        req.onsuccess = function (e) {
	          onGetWinningDoc(decodeDoc(e.target.result));
	        };
	      }
	
	      function onGetWinningDoc(winningDoc) {
	
	        var change = opts.processChange(winningDoc, metadata, opts);
	        change.seq = metadata.seq;
	
	        var filtered = filter(change);
	        if (typeof filtered === 'object') {
	          return opts.complete(filtered);
	        }
	
	        if (filtered) {
	          numResults++;
	          if (returnDocs) {
	            results.push(change);
	          }
	          // process the attachment immediately
	          // for the benefit of live listeners
	          if (opts.attachments && opts.include_docs) {
	            fetchAttachmentsIfNecessary(winningDoc, opts, txn, function () {
	              postProcessAttachments([change], opts.binary).then(function () {
	                opts.onChange(change);
	              });
	            });
	          } else {
	            opts.onChange(change);
	          }
	        }
	        if (numResults !== limit) {
	          cursor.continue();
	        }
	      }
	
	      metadata = docIdsToMetadata.get(doc._id);
	      if (metadata) { // cached
	        return onGetMetadata();
	      }
	      // metadata not cached, have to go fetch it
	      docStore.get(doc._id).onsuccess = function (event) {
	        metadata = decodeMetadata(event.target.result);
	        docIdsToMetadata.set(doc._id, metadata);
	        onGetMetadata();
	      };
	    }
	
	    function onsuccess(event) {
	      var cursor = event.target.result;
	
	      if (!cursor) {
	        return;
	      }
	      onGetCursor(cursor);
	    }
	
	    function fetchChanges() {
	      var objectStores = [DOC_STORE, BY_SEQ_STORE];
	      if (opts.attachments) {
	        objectStores.push(ATTACH_STORE);
	      }
	      var txnResult = openTransactionSafely(idb, objectStores, 'readonly');
	      if (txnResult.error) {
	        return opts.complete(txnResult.error);
	      }
	      txn = txnResult.txn;
	      txn.onabort = idbError(opts.complete);
	      txn.oncomplete = onTxnComplete;
	
	      bySeqStore = txn.objectStore(BY_SEQ_STORE);
	      docStore = txn.objectStore(DOC_STORE);
	      docIdRevIndex = bySeqStore.index('_doc_id_rev');
	
	      var req;
	
	      if (opts.descending) {
	        req = bySeqStore.openCursor(null, 'prev');
	      } else {
	        req = bySeqStore.openCursor(IDBKeyRange.lowerBound(opts.since, true));
	      }
	
	      req.onsuccess = onsuccess;
	    }
	
	    fetchChanges();
	
	    function onTxnComplete() {
	
	      function finish() {
	        opts.complete(null, {
	          results: results,
	          last_seq: lastSeq
	        });
	      }
	
	      if (!opts.continuous && opts.attachments) {
	        // cannot guarantee that postProcessing was already done,
	        // so do it again
	        postProcessAttachments(results).then(finish);
	      } else {
	        finish();
	      }
	    }
	  };
	
	  api._close = function (callback) {
	    if (idb === null) {
	      return callback(createError(NOT_OPEN));
	    }
	
	    // https://developer.mozilla.org/en-US/docs/IndexedDB/IDBDatabase#close
	    // "Returns immediately and closes the connection in a separate thread..."
	    idb.close();
	    cachedDBs.delete(dbName);
	    idb = null;
	    callback();
	  };
	
	  api._getRevisionTree = function (docId, callback) {
	    var txnResult = openTransactionSafely(idb, [DOC_STORE], 'readonly');
	    if (txnResult.error) {
	      return callback(txnResult.error);
	    }
	    var txn = txnResult.txn;
	    var req = txn.objectStore(DOC_STORE).get(docId);
	    req.onsuccess = function (event) {
	      var doc = decodeMetadata(event.target.result);
	      if (!doc) {
	        callback(createError(MISSING_DOC));
	      } else {
	        callback(null, doc.rev_tree);
	      }
	    };
	  };
	
	  // This function removes revisions of document docId
	  // which are listed in revs and sets this document
	  // revision to to rev_tree
	  api._doCompaction = function (docId, revs, callback) {
	    var stores = [
	      DOC_STORE,
	      BY_SEQ_STORE,
	      ATTACH_STORE,
	      ATTACH_AND_SEQ_STORE
	    ];
	    var txnResult = openTransactionSafely(idb, stores, 'readwrite');
	    if (txnResult.error) {
	      return callback(txnResult.error);
	    }
	    var txn = txnResult.txn;
	
	    var docStore = txn.objectStore(DOC_STORE);
	
	    docStore.get(docId).onsuccess = function (event) {
	      var metadata = decodeMetadata(event.target.result);
	      traverseRevTree(metadata.rev_tree, function (isLeaf, pos,
	                                                         revHash, ctx, opts) {
	        var rev = pos + '-' + revHash;
	        if (revs.indexOf(rev) !== -1) {
	          opts.status = 'missing';
	        }
	      });
	      compactRevs(revs, docId, txn);
	      var winningRev = metadata.winningRev;
	      var deleted = metadata.deleted;
	      txn.objectStore(DOC_STORE).put(
	        encodeMetadata(metadata, winningRev, deleted));
	    };
	    txn.onabort = idbError(callback);
	    txn.oncomplete = function () {
	      callback();
	    };
	  };
	
	
	  api._getLocal = function (id, callback) {
	    var txnResult = openTransactionSafely(idb, [LOCAL_STORE], 'readonly');
	    if (txnResult.error) {
	      return callback(txnResult.error);
	    }
	    var tx = txnResult.txn;
	    var req = tx.objectStore(LOCAL_STORE).get(id);
	
	    req.onerror = idbError(callback);
	    req.onsuccess = function (e) {
	      var doc = e.target.result;
	      if (!doc) {
	        callback(createError(MISSING_DOC));
	      } else {
	        delete doc['_doc_id_rev']; // for backwards compat
	        callback(null, doc);
	      }
	    };
	  };
	
	  api._putLocal = function (doc, opts, callback) {
	    if (typeof opts === 'function') {
	      callback = opts;
	      opts = {};
	    }
	    delete doc._revisions; // ignore this, trust the rev
	    var oldRev = doc._rev;
	    var id = doc._id;
	    if (!oldRev) {
	      doc._rev = '0-1';
	    } else {
	      doc._rev = '0-' + (parseInt(oldRev.split('-')[1], 10) + 1);
	    }
	
	    var tx = opts.ctx;
	    var ret;
	    if (!tx) {
	      var txnResult = openTransactionSafely(idb, [LOCAL_STORE], 'readwrite');
	      if (txnResult.error) {
	        return callback(txnResult.error);
	      }
	      tx = txnResult.txn;
	      tx.onerror = idbError(callback);
	      tx.oncomplete = function () {
	        if (ret) {
	          callback(null, ret);
	        }
	      };
	    }
	
	    var oStore = tx.objectStore(LOCAL_STORE);
	    var req;
	    if (oldRev) {
	      req = oStore.get(id);
	      req.onsuccess = function (e) {
	        var oldDoc = e.target.result;
	        if (!oldDoc || oldDoc._rev !== oldRev) {
	          callback(createError(REV_CONFLICT));
	        } else { // update
	          var req = oStore.put(doc);
	          req.onsuccess = function () {
	            ret = {ok: true, id: doc._id, rev: doc._rev};
	            if (opts.ctx) { // return immediately
	              callback(null, ret);
	            }
	          };
	        }
	      };
	    } else { // new doc
	      req = oStore.add(doc);
	      req.onerror = function (e) {
	        // constraint error, already exists
	        callback(createError(REV_CONFLICT));
	        e.preventDefault(); // avoid transaction abort
	        e.stopPropagation(); // avoid transaction onerror
	      };
	      req.onsuccess = function () {
	        ret = {ok: true, id: doc._id, rev: doc._rev};
	        if (opts.ctx) { // return immediately
	          callback(null, ret);
	        }
	      };
	    }
	  };
	
	  api._removeLocal = function (doc, opts, callback) {
	    if (typeof opts === 'function') {
	      callback = opts;
	      opts = {};
	    }
	    var tx = opts.ctx;
	    if (!tx) {
	      var txnResult = openTransactionSafely(idb, [LOCAL_STORE], 'readwrite');
	      if (txnResult.error) {
	        return callback(txnResult.error);
	      }
	      tx = txnResult.txn;
	      tx.oncomplete = function () {
	        if (ret) {
	          callback(null, ret);
	        }
	      };
	    }
	    var ret;
	    var id = doc._id;
	    var oStore = tx.objectStore(LOCAL_STORE);
	    var req = oStore.get(id);
	
	    req.onerror = idbError(callback);
	    req.onsuccess = function (e) {
	      var oldDoc = e.target.result;
	      if (!oldDoc || oldDoc._rev !== doc._rev) {
	        callback(createError(MISSING_DOC));
	      } else {
	        oStore.delete(id);
	        ret = {ok: true, id: id, rev: '0-0'};
	        if (opts.ctx) { // return immediately
	          callback(null, ret);
	        }
	      }
	    };
	  };
	
	  api._destroy = function (opts, callback) {
	    idbChanges.removeAllListeners(dbName);
	
	    //Close open request for "dbName" database to fix ie delay.
	    var openReq = openReqList.get(dbName);
	    if (openReq && openReq.result) {
	      openReq.result.close();
	      cachedDBs.delete(dbName);
	    }
	    var req = indexedDB.deleteDatabase(dbName);
	
	    req.onsuccess = function () {
	      //Remove open request from the list.
	      openReqList.delete(dbName);
	      if (hasLocalStorage() && (dbName in localStorage)) {
	        delete localStorage[dbName];
	      }
	      callback(null, { 'ok': true });
	    };
	
	    req.onerror = idbError(callback);
	  };
	
	  var cached = cachedDBs.get(dbName);
	
	  if (cached) {
	    idb = cached.idb;
	    api._meta = cached.global;
	    process.nextTick(function () {
	      callback(null, api);
	    });
	    return;
	  }
	
	  var req;
	  if (opts.storage) {
	    req = tryStorageOption(dbName, opts.storage);
	  } else {
	    req = indexedDB.open(dbName, ADAPTER_VERSION);
	  }
	
	  openReqList.set(dbName, req);
	
	  req.onupgradeneeded = function (e) {
	    var db = e.target.result;
	    if (e.oldVersion < 1) {
	      return createSchema(db); // new db, initial schema
	    }
	    // do migrations
	
	    var txn = e.currentTarget.transaction;
	    // these migrations have to be done in this function, before
	    // control is returned to the event loop, because IndexedDB
	
	    if (e.oldVersion < 3) {
	      createLocalStoreSchema(db); // v2 -> v3
	    }
	    if (e.oldVersion < 4) {
	      addAttachAndSeqStore(db); // v3 -> v4
	    }
	
	    var migrations = [
	      addDeletedOrLocalIndex, // v1 -> v2
	      migrateLocalStore,      // v2 -> v3
	      migrateAttsAndSeqs,     // v3 -> v4
	      migrateMetadata         // v4 -> v5
	    ];
	
	    var i = e.oldVersion;
	
	    function next() {
	      var migration = migrations[i - 1];
	      i++;
	      if (migration) {
	        migration(txn, next);
	      }
	    }
	
	    next();
	  };
	
	  req.onsuccess = function (e) {
	
	    idb = e.target.result;
	
	    idb.onversionchange = function () {
	      idb.close();
	      cachedDBs.delete(dbName);
	    };
	
	    idb.onabort = function (e) {
	      guardedConsole('error', 'Database has a global failure', e.target.error);
	      idb.close();
	      cachedDBs.delete(dbName);
	    };
	
	    var txn = idb.transaction([
	      META_STORE,
	      DETECT_BLOB_SUPPORT_STORE,
	      DOC_STORE
	    ], 'readwrite');
	
	    var req = txn.objectStore(META_STORE).get(META_STORE);
	
	    var blobSupport = null;
	    var docCount = null;
	    var instanceId = null;
	
	    req.onsuccess = function (e) {
	
	      var checkSetupComplete = function () {
	        if (blobSupport === null || docCount === null ||
	            instanceId === null) {
	          return;
	        } else {
	          api._meta = {
	            name: dbName,
	            instanceId: instanceId,
	            blobSupport: blobSupport,
	            docCount: docCount
	          };
	
	          cachedDBs.set(dbName, {
	            idb: idb,
	            global: api._meta
	          });
	          callback(null, api);
	        }
	      };
	
	      //
	      // fetch/store the id
	      //
	
	      var meta = e.target.result || {id: META_STORE};
	      if (dbName  + '_id' in meta) {
	        instanceId = meta[dbName + '_id'];
	        checkSetupComplete();
	      } else {
	        instanceId = uuid();
	        meta[dbName + '_id'] = instanceId;
	        txn.objectStore(META_STORE).put(meta).onsuccess = function () {
	          checkSetupComplete();
	        };
	      }
	
	      //
	      // check blob support
	      //
	
	      if (!blobSupportPromise) {
	        // make sure blob support is only checked once
	        blobSupportPromise = checkBlobSupport(txn);
	      }
	
	      blobSupportPromise.then(function (val) {
	        blobSupport = val;
	        checkSetupComplete();
	      });
	
	      //
	      // count docs
	      //
	
	      var index = txn.objectStore(DOC_STORE).index('deletedOrLocal');
	      index.count(IDBKeyRange.only('0')).onsuccess = function (e) {
	        docCount = e.target.result;
	        checkSetupComplete();
	      };
	
	    };
	  };
	
	  req.onerror = function () {
	    var msg = 'Failed to open indexedDB, are you in private browsing mode?';
	    guardedConsole('error', msg);
	    callback(createError(IDB_ERROR, msg));
	  };
	}
	
	IdbPouch.valid = function () {
	  // Issue #2533, we finally gave up on doing bug
	  // detection instead of browser sniffing. Safari brought us
	  // to our knees.
	  var isSafari = typeof openDatabase !== 'undefined' &&
	    /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) &&
	    !/Chrome/.test(navigator.userAgent) &&
	    !/BlackBerry/.test(navigator.platform);
	
	  // some outdated implementations of IDB that appear on Samsung
	  // and HTC Android devices <4.4 are missing IDBKeyRange
	  return !isSafari && typeof indexedDB !== 'undefined' &&
	    typeof IDBKeyRange !== 'undefined';
	};
	
	function tryStorageOption(dbName, storage) {
	  try { // option only available in Firefox 26+
	    return indexedDB.open(dbName, {
	      version: ADAPTER_VERSION,
	      storage: storage
	    });
	  } catch(err) {
	      return indexedDB.open(dbName, ADAPTER_VERSION);
	  }
	}
	
	function IDBPouch (PouchDB) {
	  PouchDB.adapter('idb', IdbPouch, true);
	}
	
	//
	// Parsing hex strings. Yeah.
	//
	// So basically we need this because of a bug in WebSQL:
	// https://code.google.com/p/chromium/issues/detail?id=422690
	// https://bugs.webkit.org/show_bug.cgi?id=137637
	//
	// UTF-8 and UTF-16 are provided as separate functions
	// for meager performance improvements
	//
	
	function decodeUtf8(str) {
	  return decodeURIComponent(escape(str));
	}
	
	function hexToInt(charCode) {
	  // '0'-'9' is 48-57
	  // 'A'-'F' is 65-70
	  // SQLite will only give us uppercase hex
	  return charCode < 65 ? (charCode - 48) : (charCode - 55);
	}
	
	
	// Example:
	// pragma encoding=utf8;
	// select hex('A');
	// returns '41'
	function parseHexUtf8(str, start, end) {
	  var result = '';
	  while (start < end) {
	    result += String.fromCharCode(
	      (hexToInt(str.charCodeAt(start++)) << 4) |
	        hexToInt(str.charCodeAt(start++)));
	  }
	  return result;
	}
	
	// Example:
	// pragma encoding=utf16;
	// select hex('A');
	// returns '4100'
	// notice that the 00 comes after the 41 (i.e. it's swizzled)
	function parseHexUtf16(str, start, end) {
	  var result = '';
	  while (start < end) {
	    // UTF-16, so swizzle the bytes
	    result += String.fromCharCode(
	      (hexToInt(str.charCodeAt(start + 2)) << 12) |
	        (hexToInt(str.charCodeAt(start + 3)) << 8) |
	        (hexToInt(str.charCodeAt(start)) << 4) |
	        hexToInt(str.charCodeAt(start + 1)));
	    start += 4;
	  }
	  return result;
	}
	
	function parseHexString(str, encoding) {
	  if (encoding === 'UTF-8') {
	    return decodeUtf8(parseHexUtf8(str, 0, str.length));
	  } else {
	    return parseHexUtf16(str, 0, str.length);
	  }
	}
	
	function quote(str) {
	  return "'" + str + "'";
	}
	
	var ADAPTER_VERSION$1 = 7; // used to manage migrations
	
	// The object stores created for each database
	// DOC_STORE stores the document meta data, its revision history and state
	var DOC_STORE$1 = quote('document-store');
	// BY_SEQ_STORE stores a particular version of a document, keyed by its
	// sequence id
	var BY_SEQ_STORE$1 = quote('by-sequence');
	// Where we store attachments
	var ATTACH_STORE$1 = quote('attach-store');
	var LOCAL_STORE$1 = quote('local-store');
	var META_STORE$1 = quote('metadata-store');
	// where we store many-to-many relations between attachment
	// digests and seqs
	var ATTACH_AND_SEQ_STORE$1 = quote('attach-seq-store');
	
	// escapeBlob and unescapeBlob are workarounds for a websql bug:
	// https://code.google.com/p/chromium/issues/detail?id=422690
	// https://bugs.webkit.org/show_bug.cgi?id=137637
	// The goal is to never actually insert the \u0000 character
	// in the database.
	function escapeBlob(str) {
	  return str
	    .replace(/\u0002/g, '\u0002\u0002')
	    .replace(/\u0001/g, '\u0001\u0002')
	    .replace(/\u0000/g, '\u0001\u0001');
	}
	
	function unescapeBlob(str) {
	  return str
	    .replace(/\u0001\u0001/g, '\u0000')
	    .replace(/\u0001\u0002/g, '\u0001')
	    .replace(/\u0002\u0002/g, '\u0002');
	}
	
	function stringifyDoc(doc) {
	  // don't bother storing the id/rev. it uses lots of space,
	  // in persistent map/reduce especially
	  delete doc._id;
	  delete doc._rev;
	  return JSON.stringify(doc);
	}
	
	function unstringifyDoc(doc, id, rev) {
	  doc = JSON.parse(doc);
	  doc._id = id;
	  doc._rev = rev;
	  return doc;
	}
	
	// question mark groups IN queries, e.g. 3 -> '(?,?,?)'
	function qMarks(num) {
	  var s = '(';
	  while (num--) {
	    s += '?';
	    if (num) {
	      s += ',';
	    }
	  }
	  return s + ')';
	}
	
	function select(selector, table, joiner, where, orderBy) {
	  return 'SELECT ' + selector + ' FROM ' +
	    (typeof table === 'string' ? table : table.join(' JOIN ')) +
	    (joiner ? (' ON ' + joiner) : '') +
	    (where ? (' WHERE ' +
	    (typeof where === 'string' ? where : where.join(' AND '))) : '') +
	    (orderBy ? (' ORDER BY ' + orderBy) : '');
	}
	
	function compactRevs$1(revs, docId, tx) {
	
	  if (!revs.length) {
	    return;
	  }
	
	  var numDone = 0;
	  var seqs = [];
	
	  function checkDone() {
	    if (++numDone === revs.length) { // done
	      deleteOrphans();
	    }
	  }
	
	  function deleteOrphans() {
	    // find orphaned attachment digests
	
	    if (!seqs.length) {
	      return;
	    }
	
	    var sql = 'SELECT DISTINCT digest AS digest FROM ' +
	      ATTACH_AND_SEQ_STORE$1 + ' WHERE seq IN ' + qMarks(seqs.length);
	
	    tx.executeSql(sql, seqs, function (tx, res) {
	
	      var digestsToCheck = [];
	      for (var i = 0; i < res.rows.length; i++) {
	        digestsToCheck.push(res.rows.item(i).digest);
	      }
	      if (!digestsToCheck.length) {
	        return;
	      }
	
	      var sql = 'DELETE FROM ' + ATTACH_AND_SEQ_STORE$1 +
	        ' WHERE seq IN (' +
	        seqs.map(function () { return '?'; }).join(',') +
	        ')';
	      tx.executeSql(sql, seqs, function (tx) {
	
	        var sql = 'SELECT digest FROM ' + ATTACH_AND_SEQ_STORE$1 +
	          ' WHERE digest IN (' +
	          digestsToCheck.map(function () { return '?'; }).join(',') +
	          ')';
	        tx.executeSql(sql, digestsToCheck, function (tx, res) {
	          var nonOrphanedDigests = new pouchdbCollections.Set();
	          for (var i = 0; i < res.rows.length; i++) {
	            nonOrphanedDigests.add(res.rows.item(i).digest);
	          }
	          digestsToCheck.forEach(function (digest) {
	            if (nonOrphanedDigests.has(digest)) {
	              return;
	            }
	            tx.executeSql(
	              'DELETE FROM ' + ATTACH_AND_SEQ_STORE$1 + ' WHERE digest=?',
	              [digest]);
	            tx.executeSql(
	              'DELETE FROM ' + ATTACH_STORE$1 + ' WHERE digest=?', [digest]);
	          });
	        });
	      });
	    });
	  }
	
	  // update by-seq and attach stores in parallel
	  revs.forEach(function (rev) {
	    var sql = 'SELECT seq FROM ' + BY_SEQ_STORE$1 +
	      ' WHERE doc_id=? AND rev=?';
	
	    tx.executeSql(sql, [docId, rev], function (tx, res) {
	      if (!res.rows.length) { // already deleted
	        return checkDone();
	      }
	      var seq = res.rows.item(0).seq;
	      seqs.push(seq);
	
	      tx.executeSql(
	        'DELETE FROM ' + BY_SEQ_STORE$1 + ' WHERE seq=?', [seq], checkDone);
	    });
	  });
	}
	
	function websqlError(callback) {
	  return function (event) {
	    guardedConsole('error', 'WebSQL threw an error', event);
	    // event may actually be a SQLError object, so report is as such
	    var errorNameMatch = event && event.constructor.toString()
	        .match(/function ([^\(]+)/);
	    var errorName = (errorNameMatch && errorNameMatch[1]) || event.type;
	    var errorReason = event.target || event.message;
	    callback(createError(WSQ_ERROR, errorReason, errorName));
	  };
	}
	
	function getSize(opts) {
	  if ('size' in opts) {
	    // triggers immediate popup in iOS, fixes #2347
	    // e.g. 5000001 asks for 5 MB, 10000001 asks for 10 MB,
	    return opts.size * 1000000;
	  }
	  // In iOS, doesn't matter as long as it's <= 5000000.
	  // Except that if you request too much, our tests fail
	  // because of the native "do you accept?" popup.
	  // In Android <=4.3, this value is actually used as an
	  // honest-to-god ceiling for data, so we need to
	  // set it to a decently high number.
	  var isAndroid = typeof navigator !== 'undefined' &&
	    /Android/.test(navigator.userAgent);
	  return isAndroid ? 5000000 : 1; // in PhantomJS, if you use 0 it will crash
	}
	
	function websqlBulkDocs(dbOpts, req, opts, api, db, websqlChanges, callback) {
	  var newEdits = opts.new_edits;
	  var userDocs = req.docs;
	
	  // Parse the docs, give them a sequence number for the result
	  var docInfos = userDocs.map(function (doc) {
	    if (doc._id && isLocalId(doc._id)) {
	      return doc;
	    }
	    var newDoc = parseDoc(doc, newEdits);
	    return newDoc;
	  });
	
	  var docInfoErrors = docInfos.filter(function (docInfo) {
	    return docInfo.error;
	  });
	  if (docInfoErrors.length) {
	    return callback(docInfoErrors[0]);
	  }
	
	  var tx;
	  var results = new Array(docInfos.length);
	  var fetchedDocs = new pouchdbCollections.Map();
	
	  var preconditionErrored;
	  function complete() {
	    if (preconditionErrored) {
	      return callback(preconditionErrored);
	    }
	    websqlChanges.notify(api._name);
	    api._docCount = -1; // invalidate
	    callback(null, results);
	  }
	
	  function verifyAttachment(digest, callback) {
	    var sql = 'SELECT count(*) as cnt FROM ' + ATTACH_STORE$1 +
	      ' WHERE digest=?';
	    tx.executeSql(sql, [digest], function (tx, result) {
	      if (result.rows.item(0).cnt === 0) {
	        var err = createError(MISSING_STUB,
	          'unknown stub attachment with digest ' +
	          digest);
	        callback(err);
	      } else {
	        callback();
	      }
	    });
	  }
	
	  function verifyAttachments(finish) {
	    var digests = [];
	    docInfos.forEach(function (docInfo) {
	      if (docInfo.data && docInfo.data._attachments) {
	        Object.keys(docInfo.data._attachments).forEach(function (filename) {
	          var att = docInfo.data._attachments[filename];
	          if (att.stub) {
	            digests.push(att.digest);
	          }
	        });
	      }
	    });
	    if (!digests.length) {
	      return finish();
	    }
	    var numDone = 0;
	    var err;
	
	    function checkDone() {
	      if (++numDone === digests.length) {
	        finish(err);
	      }
	    }
	    digests.forEach(function (digest) {
	      verifyAttachment(digest, function (attErr) {
	        if (attErr && !err) {
	          err = attErr;
	        }
	        checkDone();
	      });
	    });
	  }
	
	  function writeDoc(docInfo, winningRev, winningRevIsDeleted, newRevIsDeleted,
	                    isUpdate, delta, resultsIdx, callback) {
	
	    function finish() {
	      var data = docInfo.data;
	      var deletedInt = newRevIsDeleted ? 1 : 0;
	
	      var id = data._id;
	      var rev = data._rev;
	      var json = stringifyDoc(data);
	      var sql = 'INSERT INTO ' + BY_SEQ_STORE$1 +
	        ' (doc_id, rev, json, deleted) VALUES (?, ?, ?, ?);';
	      var sqlArgs = [id, rev, json, deletedInt];
	
	      // map seqs to attachment digests, which
	      // we will need later during compaction
	      function insertAttachmentMappings(seq, callback) {
	        var attsAdded = 0;
	        var attsToAdd = Object.keys(data._attachments || {});
	
	        if (!attsToAdd.length) {
	          return callback();
	        }
	        function checkDone() {
	          if (++attsAdded === attsToAdd.length) {
	            callback();
	          }
	          return false; // ack handling a constraint error
	        }
	        function add(att) {
	          var sql = 'INSERT INTO ' + ATTACH_AND_SEQ_STORE$1 +
	            ' (digest, seq) VALUES (?,?)';
	          var sqlArgs = [data._attachments[att].digest, seq];
	          tx.executeSql(sql, sqlArgs, checkDone, checkDone);
	          // second callback is for a constaint error, which we ignore
	          // because this docid/rev has already been associated with
	          // the digest (e.g. when new_edits == false)
	        }
	        for (var i = 0; i < attsToAdd.length; i++) {
	          add(attsToAdd[i]); // do in parallel
	        }
	      }
	
	      tx.executeSql(sql, sqlArgs, function (tx, result) {
	        var seq = result.insertId;
	        insertAttachmentMappings(seq, function () {
	          dataWritten(tx, seq);
	        });
	      }, function () {
	        // constraint error, recover by updating instead (see #1638)
	        var fetchSql = select('seq', BY_SEQ_STORE$1, null,
	          'doc_id=? AND rev=?');
	        tx.executeSql(fetchSql, [id, rev], function (tx, res) {
	          var seq = res.rows.item(0).seq;
	          var sql = 'UPDATE ' + BY_SEQ_STORE$1 +
	            ' SET json=?, deleted=? WHERE doc_id=? AND rev=?;';
	          var sqlArgs = [json, deletedInt, id, rev];
	          tx.executeSql(sql, sqlArgs, function (tx) {
	            insertAttachmentMappings(seq, function () {
	              dataWritten(tx, seq);
	            });
	          });
	        });
	        return false; // ack that we've handled the error
	      });
	    }
	
	    function collectResults(attachmentErr) {
	      if (!err) {
	        if (attachmentErr) {
	          err = attachmentErr;
	          callback(err);
	        } else if (recv === attachments.length) {
	          finish();
	        }
	      }
	    }
	
	    var err = null;
	    var recv = 0;
	
	    docInfo.data._id = docInfo.metadata.id;
	    docInfo.data._rev = docInfo.metadata.rev;
	    var attachments = Object.keys(docInfo.data._attachments || {});
	
	
	    if (newRevIsDeleted) {
	      docInfo.data._deleted = true;
	    }
	
	    function attachmentSaved(err) {
	      recv++;
	      collectResults(err);
	    }
	
	    attachments.forEach(function (key) {
	      var att = docInfo.data._attachments[key];
	      if (!att.stub) {
	        var data = att.data;
	        delete att.data;
	        att.revpos = parseInt(winningRev, 10);
	        var digest = att.digest;
	        saveAttachment(digest, data, attachmentSaved);
	      } else {
	        recv++;
	        collectResults();
	      }
	    });
	
	    if (!attachments.length) {
	      finish();
	    }
	
	    function dataWritten(tx, seq) {
	      var id = docInfo.metadata.id;
	
	      var revsToCompact = docInfo.stemmedRevs || [];
	      if (isUpdate && api.auto_compaction) {
	        revsToCompact = compactTree(docInfo.metadata).concat(revsToCompact);
	      }
	      if (revsToCompact.length) {
	        compactRevs$1(revsToCompact, id, tx);
	      }
	
	      docInfo.metadata.seq = seq;
	      delete docInfo.metadata.rev;
	
	      var sql = isUpdate ?
	      'UPDATE ' + DOC_STORE$1 +
	      ' SET json=?, max_seq=?, winningseq=' +
	      '(SELECT seq FROM ' + BY_SEQ_STORE$1 +
	      ' WHERE doc_id=' + DOC_STORE$1 + '.id AND rev=?) WHERE id=?'
	        : 'INSERT INTO ' + DOC_STORE$1 +
	      ' (id, winningseq, max_seq, json) VALUES (?,?,?,?);';
	      var metadataStr = safeJsonStringify(docInfo.metadata);
	      var params = isUpdate ?
	        [metadataStr, seq, winningRev, id] :
	        [id, seq, seq, metadataStr];
	      tx.executeSql(sql, params, function () {
	        results[resultsIdx] = {
	          ok: true,
	          id: docInfo.metadata.id,
	          rev: winningRev
	        };
	        fetchedDocs.set(id, docInfo.metadata);
	        callback();
	      });
	    }
	  }
	
	  function websqlProcessDocs() {
	    processDocs(dbOpts.revs_limit, docInfos, api, fetchedDocs, tx,
	                results, writeDoc, opts);
	  }
	
	  function fetchExistingDocs(callback) {
	    if (!docInfos.length) {
	      return callback();
	    }
	
	    var numFetched = 0;
	
	    function checkDone() {
	      if (++numFetched === docInfos.length) {
	        callback();
	      }
	    }
	
	    docInfos.forEach(function (docInfo) {
	      if (docInfo._id && isLocalId(docInfo._id)) {
	        return checkDone(); // skip local docs
	      }
	      var id = docInfo.metadata.id;
	      tx.executeSql('SELECT json FROM ' + DOC_STORE$1 +
	      ' WHERE id = ?', [id], function (tx, result) {
	        if (result.rows.length) {
	          var metadata = safeJsonParse(result.rows.item(0).json);
	          fetchedDocs.set(id, metadata);
	        }
	        checkDone();
	      });
	    });
	  }
	
	  function saveAttachment(digest, data, callback) {
	    var sql = 'SELECT digest FROM ' + ATTACH_STORE$1 + ' WHERE digest=?';
	    tx.executeSql(sql, [digest], function (tx, result) {
	      if (result.rows.length) { // attachment already exists
	        return callback();
	      }
	      // we could just insert before selecting and catch the error,
	      // but my hunch is that it's cheaper not to serialize the blob
	      // from JS to C if we don't have to (TODO: confirm this)
	      sql = 'INSERT INTO ' + ATTACH_STORE$1 +
	      ' (digest, body, escaped) VALUES (?,?,1)';
	      tx.executeSql(sql, [digest, escapeBlob(data)], function () {
	        callback();
	      }, function () {
	        // ignore constaint errors, means it already exists
	        callback();
	        return false; // ack we handled the error
	      });
	    });
	  }
	
	  preprocessAttachments(docInfos, 'binary', function (err) {
	    if (err) {
	      return callback(err);
	    }
	    db.transaction(function (txn) {
	      tx = txn;
	      verifyAttachments(function (err) {
	        if (err) {
	          preconditionErrored = err;
	        } else {
	          fetchExistingDocs(websqlProcessDocs);
	        }
	      });
	    }, websqlError(callback), complete);
	  });
	}
	
	var cachedDatabases = new pouchdbCollections.Map();
	
	// openDatabase passed in through opts (e.g. for node-websql)
	function openDatabaseWithOpts(opts) {
	  return opts.websql(opts.name, opts.version, opts.description, opts.size);
	}
	
	function openDBSafely(opts) {
	  try {
	    return {
	      db: openDatabaseWithOpts(opts)
	    };
	  } catch (err) {
	    return {
	      error: err
	    };
	  }
	}
	
	function openDB(opts) {
	  var cachedResult = cachedDatabases.get(opts.name);
	  if (!cachedResult) {
	    cachedResult = openDBSafely(opts);
	    cachedDatabases.set(opts.name, cachedResult);
	    if (cachedResult.db) {
	      cachedResult.db._sqlitePlugin = typeof sqlitePlugin !== 'undefined';
	    }
	  }
	  return cachedResult;
	}
	
	var websqlChanges = new Changes$1();
	
	function fetchAttachmentsIfNecessary$1(doc, opts, api, txn, cb) {
	  var attachments = Object.keys(doc._attachments || {});
	  if (!attachments.length) {
	    return cb && cb();
	  }
	  var numDone = 0;
	
	  function checkDone() {
	    if (++numDone === attachments.length && cb) {
	      cb();
	    }
	  }
	
	  function fetchAttachment(doc, att) {
	    var attObj = doc._attachments[att];
	    var attOpts = {binary: opts.binary, ctx: txn};
	    api._getAttachment(doc._id, att, attObj, attOpts, function (_, data) {
	      doc._attachments[att] = jsExtend.extend(
	        pick(attObj, ['digest', 'content_type']),
	        { data: data }
	      );
	      checkDone();
	    });
	  }
	
	  attachments.forEach(function (att) {
	    if (opts.attachments && opts.include_docs) {
	      fetchAttachment(doc, att);
	    } else {
	      doc._attachments[att].stub = true;
	      checkDone();
	    }
	  });
	}
	
	var POUCH_VERSION = 1;
	
	// these indexes cover the ground for most allDocs queries
	var BY_SEQ_STORE_DELETED_INDEX_SQL =
	  'CREATE INDEX IF NOT EXISTS \'by-seq-deleted-idx\' ON ' +
	  BY_SEQ_STORE$1 + ' (seq, deleted)';
	var BY_SEQ_STORE_DOC_ID_REV_INDEX_SQL =
	  'CREATE UNIQUE INDEX IF NOT EXISTS \'by-seq-doc-id-rev\' ON ' +
	    BY_SEQ_STORE$1 + ' (doc_id, rev)';
	var DOC_STORE_WINNINGSEQ_INDEX_SQL =
	  'CREATE INDEX IF NOT EXISTS \'doc-winningseq-idx\' ON ' +
	  DOC_STORE$1 + ' (winningseq)';
	var ATTACH_AND_SEQ_STORE_SEQ_INDEX_SQL =
	  'CREATE INDEX IF NOT EXISTS \'attach-seq-seq-idx\' ON ' +
	    ATTACH_AND_SEQ_STORE$1 + ' (seq)';
	var ATTACH_AND_SEQ_STORE_ATTACH_INDEX_SQL =
	  'CREATE UNIQUE INDEX IF NOT EXISTS \'attach-seq-digest-idx\' ON ' +
	    ATTACH_AND_SEQ_STORE$1 + ' (digest, seq)';
	
	var DOC_STORE_AND_BY_SEQ_JOINER = BY_SEQ_STORE$1 +
	  '.seq = ' + DOC_STORE$1 + '.winningseq';
	
	var SELECT_DOCS = BY_SEQ_STORE$1 + '.seq AS seq, ' +
	  BY_SEQ_STORE$1 + '.deleted AS deleted, ' +
	  BY_SEQ_STORE$1 + '.json AS data, ' +
	  BY_SEQ_STORE$1 + '.rev AS rev, ' +
	  DOC_STORE$1 + '.json AS metadata';
	
	function WebSqlPouch$1(opts, callback) {
	  var api = this;
	  var instanceId = null;
	  var size = getSize(opts);
	  var idRequests = [];
	  var encoding;
	
	  api._docCount = -1; // cache sqlite count(*) for performance
	  api._name = opts.name;
	
	  // extend the options here, because sqlite plugin has a ton of options
	  // and they are constantly changing, so it's more prudent to allow anything
	  var websqlOpts = jsExtend.extend({}, opts, {
	    version: POUCH_VERSION,
	    description: opts.name,
	    size: size
	  });
	  var openDBResult = openDB(websqlOpts);
	  if (openDBResult.error) {
	    return websqlError(callback)(openDBResult.error);
	  }
	  var db = openDBResult.db;
	  if (typeof db.readTransaction !== 'function') {
	    // doesn't exist in sqlite plugin
	    db.readTransaction = db.transaction;
	  }
	
	  function dbCreated() {
	    // note the db name in case the browser upgrades to idb
	    if (hasLocalStorage()) {
	      window.localStorage['_pouch__websqldb_' + api._name] = true;
	    }
	    callback(null, api);
	  }
	
	  // In this migration, we added the 'deleted' and 'local' columns to the
	  // by-seq and doc store tables.
	  // To preserve existing user data, we re-process all the existing JSON
	  // and add these values.
	  // Called migration2 because it corresponds to adapter version (db_version) #2
	  function runMigration2(tx, callback) {
	    // index used for the join in the allDocs query
	    tx.executeSql(DOC_STORE_WINNINGSEQ_INDEX_SQL);
	
	    tx.executeSql('ALTER TABLE ' + BY_SEQ_STORE$1 +
	      ' ADD COLUMN deleted TINYINT(1) DEFAULT 0', [], function () {
	      tx.executeSql(BY_SEQ_STORE_DELETED_INDEX_SQL);
	      tx.executeSql('ALTER TABLE ' + DOC_STORE$1 +
	        ' ADD COLUMN local TINYINT(1) DEFAULT 0', [], function () {
	        tx.executeSql('CREATE INDEX IF NOT EXISTS \'doc-store-local-idx\' ON ' +
	          DOC_STORE$1 + ' (local, id)');
	
	        var sql = 'SELECT ' + DOC_STORE$1 + '.winningseq AS seq, ' + DOC_STORE$1 +
	          '.json AS metadata FROM ' + BY_SEQ_STORE$1 + ' JOIN ' + DOC_STORE$1 +
	          ' ON ' + BY_SEQ_STORE$1 + '.seq = ' + DOC_STORE$1 + '.winningseq';
	
	        tx.executeSql(sql, [], function (tx, result) {
	
	          var deleted = [];
	          var local = [];
	
	          for (var i = 0; i < result.rows.length; i++) {
	            var item = result.rows.item(i);
	            var seq = item.seq;
	            var metadata = JSON.parse(item.metadata);
	            if (isDeleted(metadata)) {
	              deleted.push(seq);
	            }
	            if (isLocalId(metadata.id)) {
	              local.push(metadata.id);
	            }
	          }
	          tx.executeSql('UPDATE ' + DOC_STORE$1 + 'SET local = 1 WHERE id IN ' +
	            qMarks(local.length), local, function () {
	            tx.executeSql('UPDATE ' + BY_SEQ_STORE$1 +
	              ' SET deleted = 1 WHERE seq IN ' +
	              qMarks(deleted.length), deleted, callback);
	          });
	        });
	      });
	    });
	  }
	
	  // in this migration, we make all the local docs unversioned
	  function runMigration3(tx, callback) {
	    var local = 'CREATE TABLE IF NOT EXISTS ' + LOCAL_STORE$1 +
	      ' (id UNIQUE, rev, json)';
	    tx.executeSql(local, [], function () {
	      var sql = 'SELECT ' + DOC_STORE$1 + '.id AS id, ' +
	        BY_SEQ_STORE$1 + '.json AS data ' +
	        'FROM ' + BY_SEQ_STORE$1 + ' JOIN ' +
	        DOC_STORE$1 + ' ON ' + BY_SEQ_STORE$1 + '.seq = ' +
	        DOC_STORE$1 + '.winningseq WHERE local = 1';
	      tx.executeSql(sql, [], function (tx, res) {
	        var rows = [];
	        for (var i = 0; i < res.rows.length; i++) {
	          rows.push(res.rows.item(i));
	        }
	        function doNext() {
	          if (!rows.length) {
	            return callback(tx);
	          }
	          var row = rows.shift();
	          var rev = JSON.parse(row.data)._rev;
	          tx.executeSql('INSERT INTO ' + LOCAL_STORE$1 +
	              ' (id, rev, json) VALUES (?,?,?)',
	              [row.id, rev, row.data], function (tx) {
	            tx.executeSql('DELETE FROM ' + DOC_STORE$1 + ' WHERE id=?',
	                [row.id], function (tx) {
	              tx.executeSql('DELETE FROM ' + BY_SEQ_STORE$1 + ' WHERE seq=?',
	                  [row.seq], function () {
	                doNext();
	              });
	            });
	          });
	        }
	        doNext();
	      });
	    });
	  }
	
	  // in this migration, we remove doc_id_rev and just use rev
	  function runMigration4(tx, callback) {
	
	    function updateRows(rows) {
	      function doNext() {
	        if (!rows.length) {
	          return callback(tx);
	        }
	        var row = rows.shift();
	        var doc_id_rev = parseHexString(row.hex, encoding);
	        var idx = doc_id_rev.lastIndexOf('::');
	        var doc_id = doc_id_rev.substring(0, idx);
	        var rev = doc_id_rev.substring(idx + 2);
	        var sql = 'UPDATE ' + BY_SEQ_STORE$1 +
	          ' SET doc_id=?, rev=? WHERE doc_id_rev=?';
	        tx.executeSql(sql, [doc_id, rev, doc_id_rev], function () {
	          doNext();
	        });
	      }
	      doNext();
	    }
	
	    var sql = 'ALTER TABLE ' + BY_SEQ_STORE$1 + ' ADD COLUMN doc_id';
	    tx.executeSql(sql, [], function (tx) {
	      var sql = 'ALTER TABLE ' + BY_SEQ_STORE$1 + ' ADD COLUMN rev';
	      tx.executeSql(sql, [], function (tx) {
	        tx.executeSql(BY_SEQ_STORE_DOC_ID_REV_INDEX_SQL, [], function (tx) {
	          var sql = 'SELECT hex(doc_id_rev) as hex FROM ' + BY_SEQ_STORE$1;
	          tx.executeSql(sql, [], function (tx, res) {
	            var rows = [];
	            for (var i = 0; i < res.rows.length; i++) {
	              rows.push(res.rows.item(i));
	            }
	            updateRows(rows);
	          });
	        });
	      });
	    });
	  }
	
	  // in this migration, we add the attach_and_seq table
	  // for issue #2818
	  function runMigration5(tx, callback) {
	
	    function migrateAttsAndSeqs(tx) {
	      // need to actually populate the table. this is the expensive part,
	      // so as an optimization, check first that this database even
	      // contains attachments
	      var sql = 'SELECT COUNT(*) AS cnt FROM ' + ATTACH_STORE$1;
	      tx.executeSql(sql, [], function (tx, res) {
	        var count = res.rows.item(0).cnt;
	        if (!count) {
	          return callback(tx);
	        }
	
	        var offset = 0;
	        var pageSize = 10;
	        function nextPage() {
	          var sql = select(
	            SELECT_DOCS + ', ' + DOC_STORE$1 + '.id AS id',
	            [DOC_STORE$1, BY_SEQ_STORE$1],
	            DOC_STORE_AND_BY_SEQ_JOINER,
	            null,
	            DOC_STORE$1 + '.id '
	          );
	          sql += ' LIMIT ' + pageSize + ' OFFSET ' + offset;
	          offset += pageSize;
	          tx.executeSql(sql, [], function (tx, res) {
	            if (!res.rows.length) {
	              return callback(tx);
	            }
	            var digestSeqs = {};
	            function addDigestSeq(digest, seq) {
	              // uniq digest/seq pairs, just in case there are dups
	              var seqs = digestSeqs[digest] = (digestSeqs[digest] || []);
	              if (seqs.indexOf(seq) === -1) {
	                seqs.push(seq);
	              }
	            }
	            for (var i = 0; i < res.rows.length; i++) {
	              var row = res.rows.item(i);
	              var doc = unstringifyDoc(row.data, row.id, row.rev);
	              var atts = Object.keys(doc._attachments || {});
	              for (var j = 0; j < atts.length; j++) {
	                var att = doc._attachments[atts[j]];
	                addDigestSeq(att.digest, row.seq);
	              }
	            }
	            var digestSeqPairs = [];
	            Object.keys(digestSeqs).forEach(function (digest) {
	              var seqs = digestSeqs[digest];
	              seqs.forEach(function (seq) {
	                digestSeqPairs.push([digest, seq]);
	              });
	            });
	            if (!digestSeqPairs.length) {
	              return nextPage();
	            }
	            var numDone = 0;
	            digestSeqPairs.forEach(function (pair) {
	              var sql = 'INSERT INTO ' + ATTACH_AND_SEQ_STORE$1 +
	                ' (digest, seq) VALUES (?,?)';
	              tx.executeSql(sql, pair, function () {
	                if (++numDone === digestSeqPairs.length) {
	                  nextPage();
	                }
	              });
	            });
	          });
	        }
	        nextPage();
	      });
	    }
	
	    var attachAndRev = 'CREATE TABLE IF NOT EXISTS ' +
	      ATTACH_AND_SEQ_STORE$1 + ' (digest, seq INTEGER)';
	    tx.executeSql(attachAndRev, [], function (tx) {
	      tx.executeSql(
	        ATTACH_AND_SEQ_STORE_ATTACH_INDEX_SQL, [], function (tx) {
	          tx.executeSql(
	            ATTACH_AND_SEQ_STORE_SEQ_INDEX_SQL, [],
	            migrateAttsAndSeqs);
	        });
	    });
	  }
	
	  // in this migration, we use escapeBlob() and unescapeBlob()
	  // instead of reading out the binary as HEX, which is slow
	  function runMigration6(tx, callback) {
	    var sql = 'ALTER TABLE ' + ATTACH_STORE$1 +
	      ' ADD COLUMN escaped TINYINT(1) DEFAULT 0';
	    tx.executeSql(sql, [], callback);
	  }
	
	  // issue #3136, in this migration we need a "latest seq" as well
	  // as the "winning seq" in the doc store
	  function runMigration7(tx, callback) {
	    var sql = 'ALTER TABLE ' + DOC_STORE$1 +
	      ' ADD COLUMN max_seq INTEGER';
	    tx.executeSql(sql, [], function (tx) {
	      var sql = 'UPDATE ' + DOC_STORE$1 + ' SET max_seq=(SELECT MAX(seq) FROM ' +
	        BY_SEQ_STORE$1 + ' WHERE doc_id=id)';
	      tx.executeSql(sql, [], function (tx) {
	        // add unique index after filling, else we'll get a constraint
	        // error when we do the ALTER TABLE
	        var sql =
	          'CREATE UNIQUE INDEX IF NOT EXISTS \'doc-max-seq-idx\' ON ' +
	          DOC_STORE$1 + ' (max_seq)';
	        tx.executeSql(sql, [], callback);
	      });
	    });
	  }
	
	  function checkEncoding(tx, cb) {
	    // UTF-8 on chrome/android, UTF-16 on safari < 7.1
	    tx.executeSql('SELECT HEX("a") AS hex', [], function (tx, res) {
	        var hex = res.rows.item(0).hex;
	        encoding = hex.length === 2 ? 'UTF-8' : 'UTF-16';
	        cb();
	      }
	    );
	  }
	
	  function onGetInstanceId() {
	    while (idRequests.length > 0) {
	      var idCallback = idRequests.pop();
	      idCallback(null, instanceId);
	    }
	  }
	
	  function onGetVersion(tx, dbVersion) {
	    if (dbVersion === 0) {
	      // initial schema
	
	      var meta = 'CREATE TABLE IF NOT EXISTS ' + META_STORE$1 +
	        ' (dbid, db_version INTEGER)';
	      var attach = 'CREATE TABLE IF NOT EXISTS ' + ATTACH_STORE$1 +
	        ' (digest UNIQUE, escaped TINYINT(1), body BLOB)';
	      var attachAndRev = 'CREATE TABLE IF NOT EXISTS ' +
	        ATTACH_AND_SEQ_STORE$1 + ' (digest, seq INTEGER)';
	      // TODO: migrate winningseq to INTEGER
	      var doc = 'CREATE TABLE IF NOT EXISTS ' + DOC_STORE$1 +
	        ' (id unique, json, winningseq, max_seq INTEGER UNIQUE)';
	      var seq = 'CREATE TABLE IF NOT EXISTS ' + BY_SEQ_STORE$1 +
	        ' (seq INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ' +
	        'json, deleted TINYINT(1), doc_id, rev)';
	      var local = 'CREATE TABLE IF NOT EXISTS ' + LOCAL_STORE$1 +
	        ' (id UNIQUE, rev, json)';
	
	      // creates
	      tx.executeSql(attach);
	      tx.executeSql(local);
	      tx.executeSql(attachAndRev, [], function () {
	        tx.executeSql(ATTACH_AND_SEQ_STORE_SEQ_INDEX_SQL);
	        tx.executeSql(ATTACH_AND_SEQ_STORE_ATTACH_INDEX_SQL);
	      });
	      tx.executeSql(doc, [], function () {
	        tx.executeSql(DOC_STORE_WINNINGSEQ_INDEX_SQL);
	        tx.executeSql(seq, [], function () {
	          tx.executeSql(BY_SEQ_STORE_DELETED_INDEX_SQL);
	          tx.executeSql(BY_SEQ_STORE_DOC_ID_REV_INDEX_SQL);
	          tx.executeSql(meta, [], function () {
	            // mark the db version, and new dbid
	            var initSeq = 'INSERT INTO ' + META_STORE$1 +
	              ' (db_version, dbid) VALUES (?,?)';
	            instanceId = uuid();
	            var initSeqArgs = [ADAPTER_VERSION$1, instanceId];
	            tx.executeSql(initSeq, initSeqArgs, function () {
	              onGetInstanceId();
	            });
	          });
	        });
	      });
	    } else { // version > 0
	
	      var setupDone = function () {
	        var migrated = dbVersion < ADAPTER_VERSION$1;
	        if (migrated) {
	          // update the db version within this transaction
	          tx.executeSql('UPDATE ' + META_STORE$1 + ' SET db_version = ' +
	            ADAPTER_VERSION$1);
	        }
	        // notify db.id() callers
	        var sql = 'SELECT dbid FROM ' + META_STORE$1;
	        tx.executeSql(sql, [], function (tx, result) {
	          instanceId = result.rows.item(0).dbid;
	          onGetInstanceId();
	        });
	      };
	
	      // would love to use promises here, but then websql
	      // ends the transaction early
	      var tasks = [
	        runMigration2,
	        runMigration3,
	        runMigration4,
	        runMigration5,
	        runMigration6,
	        runMigration7,
	        setupDone
	      ];
	
	      // run each migration sequentially
	      var i = dbVersion;
	      var nextMigration = function (tx) {
	        tasks[i - 1](tx, nextMigration);
	        i++;
	      };
	      nextMigration(tx);
	    }
	  }
	
	  function setup() {
	    db.transaction(function (tx) {
	      // first check the encoding
	      checkEncoding(tx, function () {
	        // then get the version
	        fetchVersion(tx);
	      });
	    }, websqlError(callback), dbCreated);
	  }
	
	  function fetchVersion(tx) {
	    var sql = 'SELECT sql FROM sqlite_master WHERE tbl_name = ' + META_STORE$1;
	    tx.executeSql(sql, [], function (tx, result) {
	      if (!result.rows.length) {
	        // database hasn't even been created yet (version 0)
	        onGetVersion(tx, 0);
	      } else if (!/db_version/.test(result.rows.item(0).sql)) {
	        // table was created, but without the new db_version column,
	        // so add it.
	        tx.executeSql('ALTER TABLE ' + META_STORE$1 +
	          ' ADD COLUMN db_version INTEGER', [], function () {
	          // before version 2, this column didn't even exist
	          onGetVersion(tx, 1);
	        });
	      } else { // column exists, we can safely get it
	        tx.executeSql('SELECT db_version FROM ' + META_STORE$1,
	          [], function (tx, result) {
	          var dbVersion = result.rows.item(0).db_version;
	          onGetVersion(tx, dbVersion);
	        });
	      }
	    });
	  }
	
	  setup();
	
	  api.type = function () {
	    return 'websql';
	  };
	
	  api._id = toPromise(function (callback) {
	    callback(null, instanceId);
	  });
	
	  api._info = function (callback) {
	    db.readTransaction(function (tx) {
	      countDocs(tx, function (docCount) {
	        var sql = 'SELECT MAX(seq) AS seq FROM ' + BY_SEQ_STORE$1;
	        tx.executeSql(sql, [], function (tx, res) {
	          var updateSeq = res.rows.item(0).seq || 0;
	          callback(null, {
	            doc_count: docCount,
	            update_seq: updateSeq,
	            // for debugging
	            sqlite_plugin: db._sqlitePlugin,
	            websql_encoding: encoding
	          });
	        });
	      });
	    }, websqlError(callback));
	  };
	
	  api._bulkDocs = function (req, reqOpts, callback) {
	    websqlBulkDocs(opts, req, reqOpts, api, db, websqlChanges, callback);
	  };
	
	  api._get = function (id, opts, callback) {
	    var doc;
	    var metadata;
	    var err;
	    var tx = opts.ctx;
	    if (!tx) {
	      return db.readTransaction(function (txn) {
	        api._get(id, jsExtend.extend({ctx: txn}, opts), callback);
	      });
	    }
	
	    function finish() {
	      callback(err, {doc: doc, metadata: metadata, ctx: tx});
	    }
	
	    var sql;
	    var sqlArgs;
	    if (opts.rev) {
	      sql = select(
	        SELECT_DOCS,
	        [DOC_STORE$1, BY_SEQ_STORE$1],
	        DOC_STORE$1 + '.id=' + BY_SEQ_STORE$1 + '.doc_id',
	        [BY_SEQ_STORE$1 + '.doc_id=?', BY_SEQ_STORE$1 + '.rev=?']);
	      sqlArgs = [id, opts.rev];
	    } else {
	      sql = select(
	        SELECT_DOCS,
	        [DOC_STORE$1, BY_SEQ_STORE$1],
	        DOC_STORE_AND_BY_SEQ_JOINER,
	        DOC_STORE$1 + '.id=?');
	      sqlArgs = [id];
	    }
	    tx.executeSql(sql, sqlArgs, function (a, results) {
	      if (!results.rows.length) {
	        err = createError(MISSING_DOC, 'missing');
	        return finish();
	      }
	      var item = results.rows.item(0);
	      metadata = safeJsonParse(item.metadata);
	      if (item.deleted && !opts.rev) {
	        err = createError(MISSING_DOC, 'deleted');
	        return finish();
	      }
	      doc = unstringifyDoc(item.data, metadata.id, item.rev);
	      finish();
	    });
	  };
	
	  function countDocs(tx, callback) {
	
	    if (api._docCount !== -1) {
	      return callback(api._docCount);
	    }
	
	    // count the total rows
	    var sql = select(
	      'COUNT(' + DOC_STORE$1 + '.id) AS \'num\'',
	      [DOC_STORE$1, BY_SEQ_STORE$1],
	      DOC_STORE_AND_BY_SEQ_JOINER,
	      BY_SEQ_STORE$1 + '.deleted=0');
	
	    tx.executeSql(sql, [], function (tx, result) {
	      api._docCount = result.rows.item(0).num;
	      callback(api._docCount);
	    });
	  }
	
	  api._allDocs = function (opts, callback) {
	    var results = [];
	    var totalRows;
	
	    var start = 'startkey' in opts ? opts.startkey : false;
	    var end = 'endkey' in opts ? opts.endkey : false;
	    var key = 'key' in opts ? opts.key : false;
	    var descending = 'descending' in opts ? opts.descending : false;
	    var limit = 'limit' in opts ? opts.limit : -1;
	    var offset = 'skip' in opts ? opts.skip : 0;
	    var inclusiveEnd = opts.inclusive_end !== false;
	
	    var sqlArgs = [];
	    var criteria = [];
	
	    if (key !== false) {
	      criteria.push(DOC_STORE$1 + '.id = ?');
	      sqlArgs.push(key);
	    } else if (start !== false || end !== false) {
	      if (start !== false) {
	        criteria.push(DOC_STORE$1 + '.id ' + (descending ? '<=' : '>=') + ' ?');
	        sqlArgs.push(start);
	      }
	      if (end !== false) {
	        var comparator = descending ? '>' : '<';
	        if (inclusiveEnd) {
	          comparator += '=';
	        }
	        criteria.push(DOC_STORE$1 + '.id ' + comparator + ' ?');
	        sqlArgs.push(end);
	      }
	      if (key !== false) {
	        criteria.push(DOC_STORE$1 + '.id = ?');
	        sqlArgs.push(key);
	      }
	    }
	
	    if (opts.deleted !== 'ok') {
	      // report deleted if keys are specified
	      criteria.push(BY_SEQ_STORE$1 + '.deleted = 0');
	    }
	
	    db.readTransaction(function (tx) {
	
	      // first count up the total rows
	      countDocs(tx, function (count) {
	        totalRows = count;
	
	        if (limit === 0) {
	          return;
	        }
	
	        // then actually fetch the documents
	        var sql = select(
	          SELECT_DOCS,
	          [DOC_STORE$1, BY_SEQ_STORE$1],
	          DOC_STORE_AND_BY_SEQ_JOINER,
	          criteria,
	          DOC_STORE$1 + '.id ' + (descending ? 'DESC' : 'ASC')
	          );
	        sql += ' LIMIT ' + limit + ' OFFSET ' + offset;
	
	        tx.executeSql(sql, sqlArgs, function (tx, result) {
	          for (var i = 0, l = result.rows.length; i < l; i++) {
	            var item = result.rows.item(i);
	            var metadata = safeJsonParse(item.metadata);
	            var id = metadata.id;
	            var data = unstringifyDoc(item.data, id, item.rev);
	            var winningRev = data._rev;
	            var doc = {
	              id: id,
	              key: id,
	              value: {rev: winningRev}
	            };
	            if (opts.include_docs) {
	              doc.doc = data;
	              doc.doc._rev = winningRev;
	              if (opts.conflicts) {
	                doc.doc._conflicts = collectConflicts(metadata);
	              }
	              fetchAttachmentsIfNecessary$1(doc.doc, opts, api, tx);
	            }
	            if (item.deleted) {
	              if (opts.deleted === 'ok') {
	                doc.value.deleted = true;
	                doc.doc = null;
	              } else {
	                continue;
	              }
	            }
	            results.push(doc);
	          }
	        });
	      });
	    }, websqlError(callback), function () {
	      callback(null, {
	        total_rows: totalRows,
	        offset: opts.skip,
	        rows: results
	      });
	    });
	  };
	
	  api._changes = function (opts) {
	    opts = clone(opts);
	
	    if (opts.continuous) {
	      var id = api._name + ':' + uuid();
	      websqlChanges.addListener(api._name, id, api, opts);
	      websqlChanges.notify(api._name);
	      return {
	        cancel: function () {
	          websqlChanges.removeListener(api._name, id);
	        }
	      };
	    }
	
	    var descending = opts.descending;
	
	    // Ignore the `since` parameter when `descending` is true
	    opts.since = opts.since && !descending ? opts.since : 0;
	
	    var limit = 'limit' in opts ? opts.limit : -1;
	    if (limit === 0) {
	      limit = 1; // per CouchDB _changes spec
	    }
	
	    var returnDocs;
	    if ('return_docs' in opts) {
	      returnDocs = opts.return_docs;
	    } else if ('returnDocs' in opts) {
	      // TODO: Remove 'returnDocs' in favor of 'return_docs' in a future release
	      returnDocs = opts.returnDocs;
	    } else {
	      returnDocs = true;
	    }
	    var results = [];
	    var numResults = 0;
	
	    function fetchChanges() {
	
	      var selectStmt =
	        DOC_STORE$1 + '.json AS metadata, ' +
	        DOC_STORE$1 + '.max_seq AS maxSeq, ' +
	        BY_SEQ_STORE$1 + '.json AS winningDoc, ' +
	        BY_SEQ_STORE$1 + '.rev AS winningRev ';
	
	      var from = DOC_STORE$1 + ' JOIN ' + BY_SEQ_STORE$1;
	
	      var joiner = DOC_STORE$1 + '.id=' + BY_SEQ_STORE$1 + '.doc_id' +
	        ' AND ' + DOC_STORE$1 + '.winningseq=' + BY_SEQ_STORE$1 + '.seq';
	
	      var criteria = ['maxSeq > ?'];
	      var sqlArgs = [opts.since];
	
	      if (opts.doc_ids) {
	        criteria.push(DOC_STORE$1 + '.id IN ' + qMarks(opts.doc_ids.length));
	        sqlArgs = sqlArgs.concat(opts.doc_ids);
	      }
	
	      var orderBy = 'maxSeq ' + (descending ? 'DESC' : 'ASC');
	
	      var sql = select(selectStmt, from, joiner, criteria, orderBy);
	
	      var filter = filterChange(opts);
	      if (!opts.view && !opts.filter) {
	        // we can just limit in the query
	        sql += ' LIMIT ' + limit;
	      }
	
	      var lastSeq = opts.since || 0;
	      db.readTransaction(function (tx) {
	        tx.executeSql(sql, sqlArgs, function (tx, result) {
	          function reportChange(change) {
	            return function () {
	              opts.onChange(change);
	            };
	          }
	          for (var i = 0, l = result.rows.length; i < l; i++) {
	            var item = result.rows.item(i);
	            var metadata = safeJsonParse(item.metadata);
	            lastSeq = item.maxSeq;
	
	            var doc = unstringifyDoc(item.winningDoc, metadata.id,
	              item.winningRev);
	            var change = opts.processChange(doc, metadata, opts);
	            change.seq = item.maxSeq;
	
	            var filtered = filter(change);
	            if (typeof filtered === 'object') {
	              return opts.complete(filtered);
	            }
	
	            if (filtered) {
	              numResults++;
	              if (returnDocs) {
	                results.push(change);
	              }
	              // process the attachment immediately
	              // for the benefit of live listeners
	              if (opts.attachments && opts.include_docs) {
	                fetchAttachmentsIfNecessary$1(doc, opts, api, tx,
	                  reportChange(change));
	              } else {
	                reportChange(change)();
	              }
	            }
	            if (numResults === limit) {
	              break;
	            }
	          }
	        });
	      }, websqlError(opts.complete), function () {
	        if (!opts.continuous) {
	          opts.complete(null, {
	            results: results,
	            last_seq: lastSeq
	          });
	        }
	      });
	    }
	
	    fetchChanges();
	  };
	
	  api._close = function (callback) {
	    //WebSQL databases do not need to be closed
	    callback();
	  };
	
	  api._getAttachment = function (docId, attachId, attachment, opts, callback) {
	    var res;
	    var tx = opts.ctx;
	    var digest = attachment.digest;
	    var type = attachment.content_type;
	    var sql = 'SELECT escaped, ' +
	      'CASE WHEN escaped = 1 THEN body ELSE HEX(body) END AS body FROM ' +
	      ATTACH_STORE$1 + ' WHERE digest=?';
	    tx.executeSql(sql, [digest], function (tx, result) {
	      // websql has a bug where \u0000 causes early truncation in strings
	      // and blobs. to work around this, we used to use the hex() function,
	      // but that's not performant. after migration 6, we remove \u0000
	      // and add it back in afterwards
	      var item = result.rows.item(0);
	      var data = item.escaped ? unescapeBlob(item.body) :
	        parseHexString(item.body, encoding);
	      if (opts.binary) {
	        res = binStringToBluffer(data, type);
	      } else {
	        res = btoa$1(data);
	      }
	      callback(null, res);
	    });
	  };
	
	  api._getRevisionTree = function (docId, callback) {
	    db.readTransaction(function (tx) {
	      var sql = 'SELECT json AS metadata FROM ' + DOC_STORE$1 + ' WHERE id = ?';
	      tx.executeSql(sql, [docId], function (tx, result) {
	        if (!result.rows.length) {
	          callback(createError(MISSING_DOC));
	        } else {
	          var data = safeJsonParse(result.rows.item(0).metadata);
	          callback(null, data.rev_tree);
	        }
	      });
	    });
	  };
	
	  api._doCompaction = function (docId, revs, callback) {
	    if (!revs.length) {
	      return callback();
	    }
	    db.transaction(function (tx) {
	
	      // update doc store
	      var sql = 'SELECT json AS metadata FROM ' + DOC_STORE$1 + ' WHERE id = ?';
	      tx.executeSql(sql, [docId], function (tx, result) {
	        var metadata = safeJsonParse(result.rows.item(0).metadata);
	        traverseRevTree(metadata.rev_tree, function (isLeaf, pos,
	                                                           revHash, ctx, opts) {
	          var rev = pos + '-' + revHash;
	          if (revs.indexOf(rev) !== -1) {
	            opts.status = 'missing';
	          }
	        });
	
	        var sql = 'UPDATE ' + DOC_STORE$1 + ' SET json = ? WHERE id = ?';
	        tx.executeSql(sql, [safeJsonStringify(metadata), docId]);
	      });
	
	      compactRevs$1(revs, docId, tx);
	    }, websqlError(callback), function () {
	      callback();
	    });
	  };
	
	  api._getLocal = function (id, callback) {
	    db.readTransaction(function (tx) {
	      var sql = 'SELECT json, rev FROM ' + LOCAL_STORE$1 + ' WHERE id=?';
	      tx.executeSql(sql, [id], function (tx, res) {
	        if (res.rows.length) {
	          var item = res.rows.item(0);
	          var doc = unstringifyDoc(item.json, id, item.rev);
	          callback(null, doc);
	        } else {
	          callback(createError(MISSING_DOC));
	        }
	      });
	    });
	  };
	
	  api._putLocal = function (doc, opts, callback) {
	    if (typeof opts === 'function') {
	      callback = opts;
	      opts = {};
	    }
	    delete doc._revisions; // ignore this, trust the rev
	    var oldRev = doc._rev;
	    var id = doc._id;
	    var newRev;
	    if (!oldRev) {
	      newRev = doc._rev = '0-1';
	    } else {
	      newRev = doc._rev = '0-' + (parseInt(oldRev.split('-')[1], 10) + 1);
	    }
	    var json = stringifyDoc(doc);
	
	    var ret;
	    function putLocal(tx) {
	      var sql;
	      var values;
	      if (oldRev) {
	        sql = 'UPDATE ' + LOCAL_STORE$1 + ' SET rev=?, json=? ' +
	          'WHERE id=? AND rev=?';
	        values = [newRev, json, id, oldRev];
	      } else {
	        sql = 'INSERT INTO ' + LOCAL_STORE$1 + ' (id, rev, json) VALUES (?,?,?)';
	        values = [id, newRev, json];
	      }
	      tx.executeSql(sql, values, function (tx, res) {
	        if (res.rowsAffected) {
	          ret = {ok: true, id: id, rev: newRev};
	          if (opts.ctx) { // return immediately
	            callback(null, ret);
	          }
	        } else {
	          callback(createError(REV_CONFLICT));
	        }
	      }, function () {
	        callback(createError(REV_CONFLICT));
	        return false; // ack that we handled the error
	      });
	    }
	
	    if (opts.ctx) {
	      putLocal(opts.ctx);
	    } else {
	      db.transaction(putLocal, websqlError(callback), function () {
	        if (ret) {
	          callback(null, ret);
	        }
	      });
	    }
	  };
	
	  api._removeLocal = function (doc, opts, callback) {
	    if (typeof opts === 'function') {
	      callback = opts;
	      opts = {};
	    }
	    var ret;
	
	    function removeLocal(tx) {
	      var sql = 'DELETE FROM ' + LOCAL_STORE$1 + ' WHERE id=? AND rev=?';
	      var params = [doc._id, doc._rev];
	      tx.executeSql(sql, params, function (tx, res) {
	        if (!res.rowsAffected) {
	          return callback(createError(MISSING_DOC));
	        }
	        ret = {ok: true, id: doc._id, rev: '0-0'};
	        if (opts.ctx) { // return immediately
	          callback(null, ret);
	        }
	      });
	    }
	
	    if (opts.ctx) {
	      removeLocal(opts.ctx);
	    } else {
	      db.transaction(removeLocal, websqlError(callback), function () {
	        if (ret) {
	          callback(null, ret);
	        }
	      });
	    }
	  };
	
	  api._destroy = function (opts, callback) {
	    websqlChanges.removeAllListeners(api._name);
	    db.transaction(function (tx) {
	      var stores = [DOC_STORE$1, BY_SEQ_STORE$1, ATTACH_STORE$1, META_STORE$1,
	        LOCAL_STORE$1, ATTACH_AND_SEQ_STORE$1];
	      stores.forEach(function (store) {
	        tx.executeSql('DROP TABLE IF EXISTS ' + store, []);
	      });
	    }, websqlError(callback), function () {
	      if (hasLocalStorage()) {
	        delete window.localStorage['_pouch__websqldb_' + api._name];
	        delete window.localStorage[api._name];
	      }
	      callback(null, {'ok': true});
	    });
	  };
	}
	
	function canOpenTestDB() {
	  try {
	    openDatabase('_pouch_validate_websql', 1, '', 1);
	    return true;
	  } catch (err) {
	    return false;
	  }
	}
	
	// WKWebView had a bug where WebSQL would throw a DOM Exception 18
	// (see https://bugs.webkit.org/show_bug.cgi?id=137760 and
	// https://github.com/pouchdb/pouchdb/issues/5079)
	// This has been fixed in latest WebKit, so we try to detect it here.
	function isValidWebSQL() {
	  // WKWebView UA:
	  //   Mozilla/5.0 (iPhone; CPU iPhone OS 9_2 like Mac OS X)
	  //   AppleWebKit/601.1.46 (KHTML, like Gecko) Mobile/13C75
	  // Chrome for iOS UA:
	  //   Mozilla/5.0 (iPhone; U; CPU iPhone OS 5_1_1 like Mac OS X; en)
	  //   AppleWebKit/534.46.0 (KHTML, like Gecko) CriOS/19.0.1084.60
	  //   Mobile/9B206 Safari/7534.48.3
	  // Firefox for iOS UA:
	  //   Mozilla/5.0 (iPhone; CPU iPhone OS 8_3 like Mac OS X) AppleWebKit/600.1.4
	  //   (KHTML, like Gecko) FxiOS/1.0 Mobile/12F69 Safari/600.1.4
	
	  // indexedDB is null on some UIWebViews and undefined in others
	  // see: https://bugs.webkit.org/show_bug.cgi?id=137034
	  if (typeof indexedDB === 'undefined' || indexedDB === null ||
	      !/iP(hone|od|ad)/.test(navigator.userAgent)) {
	    // definitely not WKWebView, avoid creating an unnecessary database
	    return true;
	  }
	  // Cache the result in LocalStorage. Reason we do this is because if we
	  // call openDatabase() too many times, Safari craps out in SauceLabs and
	  // starts throwing DOM Exception 14s.
	  var hasLS = hasLocalStorage();
	  // Include user agent in the hash, so that if Safari is upgraded, we don't
	  // continually think it's broken.
	  var localStorageKey = '_pouch__websqldb_valid_' + navigator.userAgent;
	  if (hasLS && localStorage[localStorageKey]) {
	    return localStorage[localStorageKey] === '1';
	  }
	  var openedTestDB = canOpenTestDB();
	  if (hasLS) {
	    localStorage[localStorageKey] = openedTestDB ? '1' : '0';
	  }
	  return openedTestDB;
	}
	
	function validWithoutCheckingCordova() {
	  if (typeof openDatabase === 'undefined') {
	    return false;
	  }
	  if (typeof sqlitePlugin !== 'undefined') {
	    // Both sqlite-storage and SQLite Plugin 2 create this global object,
	    // which we can check for to determine validity. It should be defined
	    // after the 'deviceready' event.
	    return true;
	  }
	  return isValidWebSQL();
	}
	
	function valid() {
	  // The Cordova SQLite Plugin and SQLite Plugin 2 can be used in cordova apps,
	  // and we can't know whether or not the plugin was loaded until after the
	  // 'deviceready' event. Since it's impractical for us to wait for that event
	  // before returning true/false for valid(), we just return true here
	  // and notify the user that they may need a plugin.
	  if (typeof cordova !== 'undefined') {
	    return true;
	  }
	  return validWithoutCheckingCordova();
	}
	
	function createOpenDBFunction(opts) {
	  return function (name, version, description, size) {
	    if (typeof sqlitePlugin !== 'undefined') {
	      // The SQLite Plugin started deviating pretty heavily from the
	      // standard openDatabase() function, as they started adding more features.
	      // It's better to just use their "new" format and pass in a big ol'
	      // options object. Also there are many options here that may come from
	      // the PouchDB constructor, so we have to grab those.
	      var sqlitePluginOpts = jsExtend.extend({}, opts, {
	        name: name,
	        version: version,
	        description: description,
	        size: size
	      });
	      return sqlitePlugin.openDatabase(sqlitePluginOpts);
	    }
	
	    // Traditional WebSQL API
	    return openDatabase(name, version, description, size);
	  };
	}
	
	function WebSQLPouch(opts, callback) {
	  var websql = createOpenDBFunction(opts);
	  var _opts = jsExtend.extend({
	    websql: websql
	  }, opts);
	
	  if (typeof cordova !== 'undefined' && !validWithoutCheckingCordova()) {
	    guardedConsole('error',
	      'PouchDB error: you must install a SQLite plugin ' +
	      'in order for PouchDB to work on this platform. Options:' +
	      '\n - https://github.com/nolanlawson/cordova-plugin-sqlite-2' +
	      '\n - https://github.com/litehelpers/Cordova-sqlite-storage' +
	      '\n - https://github.com/Microsoft/cordova-plugin-websql');
	  }
	
	  WebSqlPouch$1.call(this, _opts, callback);
	}
	
	WebSQLPouch.valid = valid;
	
	WebSQLPouch.use_prefix = true;
	
	function WebSqlPouch (PouchDB) {
	  PouchDB.adapter('websql', WebSQLPouch, true);
	}
	
	function wrappedFetch() {
	  var wrappedPromise = {};
	
	  var promise = new PouchPromise(function (resolve, reject) {
	    wrappedPromise.resolve = resolve;
	    wrappedPromise.reject = reject;
	  });
	
	  var args = new Array(arguments.length);
	
	  for (var i = 0; i < args.length; i++) {
	    args[i] = arguments[i];
	  }
	
	  wrappedPromise.promise = promise;
	
	  PouchPromise.resolve().then(function () {
	    return fetch.apply(null, args);
	  }).then(function (response) {
	    wrappedPromise.resolve(response);
	  }).catch(function (error) {
	    wrappedPromise.reject(error);
	  });
	
	  return wrappedPromise;
	}
	
	function fetchRequest(options, callback) {
	  var wrappedPromise, timer, response;
	
	  var headers = new Headers();
	
	  var fetchOptions = {
	    method: options.method,
	    credentials: 'include',
	    headers: headers
	  };
	
	  if (options.json) {
	    headers.set('Accept', 'application/json');
	    headers.set('Content-Type', options.headers['Content-Type'] ||
	      'application/json');
	  }
	
	  if (options.body && (options.body instanceof Blob)) {
	    readAsArrayBuffer(options.body, function (arrayBuffer) {
	      fetchOptions.body = arrayBuffer;
	    });
	  } else if (options.body &&
	             options.processData &&
	             typeof options.body !== 'string') {
	    fetchOptions.body = JSON.stringify(options.body);
	  } else if ('body' in options) {
	    fetchOptions.body = options.body;
	  } else {
	    fetchOptions.body = null;
	  }
	
	  Object.keys(options.headers).forEach(function (key) {
	    if (options.headers.hasOwnProperty(key)) {
	      headers.set(key, options.headers[key]);
	    }
	  });
	
	  wrappedPromise = wrappedFetch(options.url, fetchOptions);
	
	  if (options.timeout > 0) {
	    timer = setTimeout(function () {
	      wrappedPromise.reject(new Error('Load timeout for resource: ' +
	        options.url));
	    }, options.timeout);
	  }
	
	  wrappedPromise.promise.then(function (fetchResponse) {
	    response = {
	      statusCode: fetchResponse.status
	    };
	
	    if (options.timeout > 0) {
	      clearTimeout(timer);
	    }
	
	    if (response.statusCode >= 200 && response.statusCode < 300) {
	      return options.binary ? fetchResponse.blob() : fetchResponse.text();
	    }
	
	    return fetchResponse.json();
	  }).then(function (result) {
	    if (response.statusCode >= 200 && response.statusCode < 300) {
	      callback(null, response, result);
	    } else {
	      callback(result, response);
	    }
	  }).catch(function (error) {
	    callback(error, response);
	  });
	
	  return {abort: wrappedPromise.reject};
	}
	
	function xhRequest(options, callback) {
	
	  var xhr, timer;
	  var timedout = false;
	
	  var abortReq = function () {
	    xhr.abort();
	  };
	
	  var timeoutReq = function () {
	    timedout = true;
	    xhr.abort();
	  };
	
	  if (options.xhr) {
	    xhr = new options.xhr();
	  } else {
	    xhr = new XMLHttpRequest();
	  }
	
	  try {
	    xhr.open(options.method, options.url);
	  } catch (exception) {
	    return callback(new Error(exception.name || 'Url is invalid'));
	  }
	
	  xhr.withCredentials = ('withCredentials' in options) ?
	    options.withCredentials : true;
	
	  if (options.method === 'GET') {
	    delete options.headers['Content-Type'];
	  } else if (options.json) {
	    options.headers.Accept = 'application/json';
	    options.headers['Content-Type'] = options.headers['Content-Type'] ||
	      'application/json';
	    if (options.body &&
	        options.processData &&
	        typeof options.body !== "string") {
	      options.body = JSON.stringify(options.body);
	    }
	  }
	
	  if (options.binary) {
	    xhr.responseType = 'arraybuffer';
	  }
	
	  if (!('body' in options)) {
	    options.body = null;
	  }
	
	  for (var key in options.headers) {
	    if (options.headers.hasOwnProperty(key)) {
	      xhr.setRequestHeader(key, options.headers[key]);
	    }
	  }
	
	  if (options.timeout > 0) {
	    timer = setTimeout(timeoutReq, options.timeout);
	    xhr.onprogress = function () {
	      clearTimeout(timer);
	      if(xhr.readyState !== 4) {
	        timer = setTimeout(timeoutReq, options.timeout);
	      }
	    };
	    if (typeof xhr.upload !== 'undefined') { // does not exist in ie9
	      xhr.upload.onprogress = xhr.onprogress;
	    }
	  }
	
	  xhr.onreadystatechange = function () {
	    if (xhr.readyState !== 4) {
	      return;
	    }
	
	    var response = {
	      statusCode: xhr.status
	    };
	
	    if (xhr.status >= 200 && xhr.status < 300) {
	      var data;
	      if (options.binary) {
	        data = createBlob([xhr.response || ''], {
	          type: xhr.getResponseHeader('Content-Type')
	        });
	      } else {
	        data = xhr.responseText;
	      }
	      callback(null, response, data);
	    } else {
	      var err = {};
	      if (timedout) {
	        err = new Error('ETIMEDOUT');
	        err.code = 'ETIMEDOUT';
	      } else {
	        try {
	          err = JSON.parse(xhr.response);
	        } catch(e) {}
	      }
	      err.status = xhr.status;
	      callback(err);
	    }
	  };
	
	  if (options.body && (options.body instanceof Blob)) {
	    readAsArrayBuffer(options.body, function (arrayBuffer) {
	      xhr.send(arrayBuffer);
	    });
	  } else {
	    xhr.send(options.body);
	  }
	
	  return {abort: abortReq};
	}
	
	function testXhr() {
	  try {
	    new XMLHttpRequest();
	    return true;
	  } catch (err) {
	    return false;
	  }
	}
	
	var hasXhr = testXhr();
	
	function ajax$1(options, callback) {
	  if (hasXhr || options.xhr) {
	    return xhRequest(options, callback);
	  } else {
	    return fetchRequest(options, callback);
	  }
	}
	
	// the blob already has a type; do nothing
	var res$2 = function () {};
	
	function defaultBody() {
	  return '';
	}
	
	function ajaxCore(options, callback) {
	
	  options = clone(options);
	
	  var defaultOptions = {
	    method : "GET",
	    headers: {},
	    json: true,
	    processData: true,
	    timeout: 10000,
	    cache: false
	  };
	
	  options = jsExtend.extend(defaultOptions, options);
	
	  function onSuccess(obj, resp, cb) {
	    if (!options.binary && options.json && typeof obj === 'string') {
	      /* istanbul ignore next */
	      try {
	        obj = JSON.parse(obj);
	      } catch (e) {
	        // Probably a malformed JSON from server
	        return cb(e);
	      }
	    }
	    if (Array.isArray(obj)) {
	      obj = obj.map(function (v) {
	        if (v.error || v.missing) {
	          return generateErrorFromResponse(v);
	        } else {
	          return v;
	        }
	      });
	    }
	    if (options.binary) {
	      res$2(obj, resp);
	    }
	    cb(null, obj, resp);
	  }
	
	  if (options.json) {
	    if (!options.binary) {
	      options.headers.Accept = 'application/json';
	    }
	    options.headers['Content-Type'] = options.headers['Content-Type'] ||
	      'application/json';
	  }
	
	  if (options.binary) {
	    options.encoding = null;
	    options.json = false;
	  }
	
	  if (!options.processData) {
	    options.json = false;
	  }
	
	  return ajax$1(options, function (err, response, body) {
	
	    if (err) {
	      return callback(generateErrorFromResponse(err));
	    }
	
	    var error;
	    var content_type = response.headers && response.headers['content-type'];
	    var data = body || defaultBody();
	
	    // CouchDB doesn't always return the right content-type for JSON data, so
	    // we check for ^{ and }$ (ignoring leading/trailing whitespace)
	    if (!options.binary && (options.json || !options.processData) &&
	        typeof data !== 'object' &&
	        (/json/.test(content_type) ||
	         (/^[\s]*\{/.test(data) && /\}[\s]*$/.test(data)))) {
	      try {
	        data = JSON.parse(data.toString());
	      } catch (e) {}
	    }
	
	    if (response.statusCode >= 200 && response.statusCode < 300) {
	      onSuccess(data, response, callback);
	    } else {
	      error = generateErrorFromResponse(data);
	      error.status = response.statusCode;
	      callback(error);
	    }
	  });
	}
	
	function ajax(opts, callback) {
	
	  // cache-buster, specifically designed to work around IE's aggressive caching
	  // see http://www.dashbay.com/2011/05/internet-explorer-caches-ajax/
	  // Also Safari caches POSTs, so we need to cache-bust those too.
	  var ua = (navigator && navigator.userAgent) ?
	    navigator.userAgent.toLowerCase() : '';
	
	  var isSafari = ua.indexOf('safari') !== -1 && ua.indexOf('chrome') === -1;
	  var isIE = ua.indexOf('msie') !== -1;
	  var isEdge = ua.indexOf('edge') !== -1;
	
	  // it appears the new version of safari also caches GETs,
	  // see https://github.com/pouchdb/pouchdb/issues/5010
	  var shouldCacheBust = (isSafari ||
	    ((isIE || isEdge) && opts.method === 'GET'));
	
	  var cache = 'cache' in opts ? opts.cache : true;
	
	  var isBlobUrl = /^blob:/.test(opts.url); // don't append nonces for blob URLs
	
	  if (!isBlobUrl && (shouldCacheBust || !cache)) {
	    var hasArgs = opts.url.indexOf('?') !== -1;
	    opts.url += (hasArgs ? '&' : '?') + '_nonce=' + Date.now();
	  }
	
	  return ajaxCore(opts, callback);
	}
	
	var CHANGES_BATCH_SIZE = 25;
	var MAX_SIMULTANEOUS_REVS = 50;
	
	var supportsBulkGetMap = {};
	
	// according to http://stackoverflow.com/a/417184/680742,
	// the de facto URL length limit is 2000 characters.
	// but since most of our measurements don't take the full
	// URL into account, we fudge it a bit.
	// TODO: we could measure the full URL to enforce exactly 2000 chars
	var MAX_URL_LENGTH = 1800;
	
	var log$1 = debug('pouchdb:http');
	
	function readAttachmentsAsBlobOrBuffer(row) {
	  var atts = row.doc && row.doc._attachments;
	  if (!atts) {
	    return;
	  }
	  Object.keys(atts).forEach(function (filename) {
	    var att = atts[filename];
	    att.data = b64ToBluffer(att.data, att.content_type);
	  });
	}
	
	function encodeDocId(id) {
	  if (/^_design/.test(id)) {
	    return '_design/' + encodeURIComponent(id.slice(8));
	  }
	  if (/^_local/.test(id)) {
	    return '_local/' + encodeURIComponent(id.slice(7));
	  }
	  return encodeURIComponent(id);
	}
	
	function preprocessAttachments$1(doc) {
	  if (!doc._attachments || !Object.keys(doc._attachments)) {
	    return PouchPromise.resolve();
	  }
	
	  return PouchPromise.all(Object.keys(doc._attachments).map(function (key) {
	    var attachment = doc._attachments[key];
	    if (attachment.data && typeof attachment.data !== 'string') {
	      return new PouchPromise(function (resolve) {
	        blobToBase64(attachment.data, resolve);
	      }).then(function (b64) {
	        attachment.data = b64;
	      });
	    }
	  }));
	}
	
	// Get all the information you possibly can about the URI given by name and
	// return it as a suitable object.
	function getHost(name) {
	  // Prase the URI into all its little bits
	  var uri = parseUri(name);
	
	  // Store the user and password as a separate auth object
	  if (uri.user || uri.password) {
	    uri.auth = {username: uri.user, password: uri.password};
	  }
	
	  // Split the path part of the URI into parts using '/' as the delimiter
	  // after removing any leading '/' and any trailing '/'
	  var parts = uri.path.replace(/(^\/|\/$)/g, '').split('/');
	
	  // Store the first part as the database name and remove it from the parts
	  // array
	  uri.db = parts.pop();
	  // Prevent double encoding of URI component
	  if (uri.db.indexOf('%') === -1) {
	    uri.db = encodeURIComponent(uri.db);
	  }
	
	  // Restore the path by joining all the remaining parts (all the parts
	  // except for the database name) with '/'s
	  uri.path = parts.join('/');
	
	  return uri;
	}
	
	// Generate a URL with the host data given by opts and the given path
	function genDBUrl(opts, path) {
	  return genUrl(opts, opts.db + '/' + path);
	}
	
	// Generate a URL with the host data given by opts and the given path
	function genUrl(opts, path) {
	  // If the host already has a path, then we need to have a path delimiter
	  // Otherwise, the path delimiter is the empty string
	  var pathDel = !opts.path ? '' : '/';
	
	  // If the host already has a path, then we need to have a path delimiter
	  // Otherwise, the path delimiter is the empty string
	  return opts.protocol + '://' + opts.host +
	         (opts.port ? (':' + opts.port) : '') +
	         '/' + opts.path + pathDel + path;
	}
	
	function paramsToStr(params) {
	  return '?' + Object.keys(params).map(function (k) {
	    return k + '=' + encodeURIComponent(params[k]);
	  }).join('&');
	}
	
	// Implements the PouchDB API for dealing with CouchDB instances over HTTP
	function HttpPouch(opts, callback) {
	  // The functions that will be publicly available for HttpPouch
	  var api = this;
	
	  // Parse the URI given by opts.name into an easy-to-use object
	  var getHostFun = getHost;
	
	  // TODO: this seems to only be used by yarong for the Thali project.
	  // Verify whether or not it's still needed.
	  /* istanbul ignore if */
	  if (opts.getHost) {
	    getHostFun = opts.getHost;
	  }
	
	  var host = getHostFun(opts.name, opts);
	  var dbUrl = genDBUrl(host, '');
	
	  opts = clone(opts);
	  var ajaxOpts = opts.ajax || {};
	
	  api.getUrl = function () { return dbUrl; };
	  api.getHeaders = function () { return ajaxOpts.headers || {}; };
	
	  if (opts.auth || host.auth) {
	    var nAuth = opts.auth || host.auth;
	    var str = nAuth.username + ':' + nAuth.password;
	    var token = btoa$1(unescape(encodeURIComponent(str)));
	    ajaxOpts.headers = ajaxOpts.headers || {};
	    ajaxOpts.headers.Authorization = 'Basic ' + token;
	  }
	
	  // Not strictly necessary, but we do this because numerous tests
	  // rely on swapping ajax in and out.
	  api._ajax = ajax;
	
	  function ajax$$(userOpts, options, callback) {
	    var reqAjax = userOpts.ajax || {};
	    var reqOpts = jsExtend.extend(clone(ajaxOpts), reqAjax, options);
	    log$1(reqOpts.method + ' ' + reqOpts.url);
	    return api._ajax(reqOpts, callback);
	  }
	
	  function ajaxPromise(userOpts, opts) {
	    return new PouchPromise(function (resolve, reject) {
	      ajax$$(userOpts, opts, function (err, res) {
	        if (err) {
	          return reject(err);
	        }
	        resolve(res);
	      });
	    });
	  }
	
	  function adapterFun$$(name, fun) {
	    return adapterFun(name, getArguments(function (args) {
	      setup().then(function () {
	        return fun.apply(this, args);
	      }).catch(function (e) {
	        var callback = args.pop();
	        callback(e);
	      });
	    }));
	  }
	
	  var setupPromise;
	
	  function setup() {
	    // TODO: Remove `skipSetup` in favor of `skip_setup` in a future release
	    if (opts.skipSetup || opts.skip_setup) {
	      return PouchPromise.resolve();
	    }
	
	    // If there is a setup in process or previous successful setup
	    // done then we will use that
	    // If previous setups have been rejected we will try again
	    if (setupPromise) {
	      return setupPromise;
	    }
	
	    var checkExists = {method: 'GET', url: dbUrl};
	    setupPromise = ajaxPromise({}, checkExists).catch(function (err) {
	      if (err && err.status && err.status === 404) {
	        // Doesnt exist, create it
	        explainError(404, 'PouchDB is just detecting if the remote exists.');
	        return ajaxPromise({}, {method: 'PUT', url: dbUrl});
	      } else {
	        return PouchPromise.reject(err);
	      }
	    }).catch(function (err) {
	      // If we try to create a database that already exists, skipped in
	      // istanbul since its catching a race condition.
	      /* istanbul ignore if */
	      if (err && err.status && err.status === 412) {
	        return true;
	      }
	      return PouchPromise.reject(err);
	    });
	
	    setupPromise.catch(function () {
	      setupPromise = null;
	    });
	
	    return setupPromise;
	  }
	
	  setTimeout(function () {
	    callback(null, api);
	  });
	
	  api.type = function () {
	    return 'http';
	  };
	
	  api.id = adapterFun$$('id', function (callback) {
	    ajax$$({}, {method: 'GET', url: genUrl(host, '')}, function (err, result) {
	      var uuid = (result && result.uuid) ?
	        (result.uuid + host.db) : genDBUrl(host, '');
	      callback(null, uuid);
	    });
	  });
	
	  api.request = adapterFun$$('request', function (options, callback) {
	    options.url = genDBUrl(host, options.url);
	    ajax$$({}, options, callback);
	  });
	
	  // Sends a POST request to the host calling the couchdb _compact function
	  //    version: The version of CouchDB it is running
	  api.compact = adapterFun$$('compact', function (opts, callback) {
	    if (typeof opts === 'function') {
	      callback = opts;
	      opts = {};
	    }
	    opts = clone(opts);
	    ajax$$(opts, {
	      url: genDBUrl(host, '_compact'),
	      method: 'POST'
	    }, function () {
	      function ping() {
	        api.info(function (err, res) {
	          if (res && !res.compact_running) {
	            callback(null, {ok: true});
	          } else {
	            setTimeout(ping, opts.interval || 200);
	          }
	        });
	      }
	      // Ping the http if it's finished compaction
	      ping();
	    });
	  });
	
	  api.bulkGet = adapterFun('bulkGet', function (opts, callback) {
	    var self = this;
	
	    function doBulkGet(cb) {
	      var params = {};
	      if (opts.revs) {
	        params.revs = true;
	      }
	      if (opts.attachments) {
	        /* istanbul ignore next */
	        params.attachments = true;
	      }
	      ajax$$({}, {
	        url: genDBUrl(host, '_bulk_get' + paramsToStr(params)),
	        method: 'POST',
	        body: { docs: opts.docs}
	      }, cb);
	    }
	
	    function doBulkGetShim() {
	      // avoid "url too long error" by splitting up into multiple requests
	      var batchSize = MAX_SIMULTANEOUS_REVS;
	      var numBatches = Math.ceil(opts.docs.length / batchSize);
	      var numDone = 0;
	      var results = new Array(numBatches);
	
	      function onResult(batchNum) {
	        return function (err, res) {
	          // err is impossible because shim returns a list of errs in that case
	          results[batchNum] = res.results;
	          if (++numDone === numBatches) {
	            callback(null, {results: flatten(results)});
	          }
	        };
	      }
	
	      for (var i = 0; i < numBatches; i++) {
	        var subOpts = pick(opts, ['revs', 'attachments']);
	        subOpts.ajax = ajaxOpts;
	        subOpts.docs = opts.docs.slice(i * batchSize,
	          Math.min(opts.docs.length, (i + 1) * batchSize));
	        bulkGet(self, subOpts, onResult(i));
	      }
	    }
	
	    // mark the whole database as either supporting or not supporting _bulk_get
	    var dbUrl = genUrl(host, '');
	    var supportsBulkGet = supportsBulkGetMap[dbUrl];
	
	    if (typeof supportsBulkGet !== 'boolean') {
	      // check if this database supports _bulk_get
	      doBulkGet(function (err, res) {
	        /* istanbul ignore else */
	        if (err) {
	          var status = Math.floor(err.status / 100);
	          /* istanbul ignore else */
	          if (status === 4 || status === 5) { // 40x or 50x
	            supportsBulkGetMap[dbUrl] = false;
	            explainError(
	              err.status,
	              'PouchDB is just detecting if the remote ' +
	              'supports the _bulk_get API.'
	            );
	            doBulkGetShim();
	          } else {
	            callback(err);
	          }
	        } else {
	          supportsBulkGetMap[dbUrl] = true;
	          callback(null, res);
	        }
	      });
	    } else if (supportsBulkGet) {
	      /* istanbul ignore next */
	      doBulkGet(callback);
	    } else {
	      doBulkGetShim();
	    }
	  });
	
	  // Calls GET on the host, which gets back a JSON string containing
	  //    couchdb: A welcome string
	  //    version: The version of CouchDB it is running
	  api._info = function (callback) {
	    setup().then(function () {
	      ajax$$({}, {
	        method: 'GET',
	        url: genDBUrl(host, '')
	      }, function (err, res) {
	        /* istanbul ignore next */
	        if (err) {
	        return callback(err);
	        }
	        res.host = genDBUrl(host, '');
	        callback(null, res);
	      });
	    }).catch(callback);
	  };
	
	  // Get the document with the given id from the database given by host.
	  // The id could be solely the _id in the database, or it may be a
	  // _design/ID or _local/ID path
	  api.get = adapterFun$$('get', function (id, opts, callback) {
	    // If no options were given, set the callback to the second parameter
	    if (typeof opts === 'function') {
	      callback = opts;
	      opts = {};
	    }
	    opts = clone(opts);
	
	    // List of parameters to add to the GET request
	    var params = {};
	
	    if (opts.revs) {
	      params.revs = true;
	    }
	
	    if (opts.revs_info) {
	      params.revs_info = true;
	    }
	
	    if (opts.open_revs) {
	      if (opts.open_revs !== "all") {
	        opts.open_revs = JSON.stringify(opts.open_revs);
	      }
	      params.open_revs = opts.open_revs;
	    }
	
	    if (opts.rev) {
	      params.rev = opts.rev;
	    }
	
	    if (opts.conflicts) {
	      params.conflicts = opts.conflicts;
	    }
	
	    id = encodeDocId(id);
	
	    // Set the options for the ajax call
	    var options = {
	      method: 'GET',
	      url: genDBUrl(host, id + paramsToStr(params))
	    };
	
	    function fetchAttachments(doc) {
	      var atts = doc._attachments;
	      var filenames = atts && Object.keys(atts);
	      if (!atts || !filenames.length) {
	        return;
	      }
	      // we fetch these manually in separate XHRs, because
	      // Sync Gateway would normally send it back as multipart/mixed,
	      // which we cannot parse. Also, this is more efficient than
	      // receiving attachments as base64-encoded strings.
	      function fetch() {
	
	        if (!filenames.length) {
	          return null;
	        }
	
	        var filename = filenames.pop();
	        var att = atts[filename];
	        var path = encodeDocId(doc._id) + '/' + encodeAttachmentId(filename) +
	          '?rev=' + doc._rev;
	        return ajaxPromise(opts, {
	          method: 'GET',
	          url: genDBUrl(host, path),
	          binary: true
	        }).then(function (blob) {
	          if (opts.binary) {
	            return blob;
	          }
	          return new PouchPromise(function (resolve) {
	            blobToBase64(blob, resolve);
	          });
	        }).then(function (data) {
	          delete att.stub;
	          delete att.length;
	          att.data = data;
	        });
	      }
	
	      // This limits the number of parallel xhr requests to 5 any time
	      // to avoid issues with maximum browser request limits
	      return new PromisePool(fetch, 5, {promise: PouchPromise}).start();
	    }
	
	    function fetchAllAttachments(docOrDocs) {
	      if (Array.isArray(docOrDocs)) {
	        return PouchPromise.all(docOrDocs.map(function (doc) {
	          if (doc.ok) {
	            return fetchAttachments(doc.ok);
	          }
	        }));
	      }
	      return fetchAttachments(docOrDocs);
	    }
	
	    ajaxPromise(opts, options).then(function (res) {
	      return PouchPromise.resolve().then(function () {
	        if (opts.attachments) {
	          return fetchAllAttachments(res);
	        }
	      }).then(function () {
	        callback(null, res);
	      });
	    }).catch(callback);
	  });
	
	  // Delete the document given by doc from the database given by host.
	  api.remove = adapterFun$$('remove',
	      function (docOrId, optsOrRev, opts, callback) {
	    var doc;
	    if (typeof optsOrRev === 'string') {
	      // id, rev, opts, callback style
	      doc = {
	        _id: docOrId,
	        _rev: optsOrRev
	      };
	      if (typeof opts === 'function') {
	        callback = opts;
	        opts = {};
	      }
	    } else {
	      // doc, opts, callback style
	      doc = docOrId;
	      if (typeof optsOrRev === 'function') {
	        callback = optsOrRev;
	        opts = {};
	      } else {
	        callback = opts;
	        opts = optsOrRev;
	      }
	    }
	
	    var rev = (doc._rev || opts.rev);
	
	    // Delete the document
	    ajax$$(opts, {
	      method: 'DELETE',
	      url: genDBUrl(host, encodeDocId(doc._id)) + '?rev=' + rev
	    }, callback);
	  });
	
	  function encodeAttachmentId(attachmentId) {
	    return attachmentId.split("/").map(encodeURIComponent).join("/");
	  }
	
	  // Get the attachment
	  api.getAttachment =
	    adapterFun$$('getAttachment', function (docId, attachmentId, opts,
	                                                callback) {
	    if (typeof opts === 'function') {
	      callback = opts;
	      opts = {};
	    }
	    var params = opts.rev ? ('?rev=' + opts.rev) : '';
	    var url = genDBUrl(host, encodeDocId(docId)) + '/' +
	      encodeAttachmentId(attachmentId) + params;
	    ajax$$(opts, {
	      method: 'GET',
	      url: url,
	      binary: true
	    }, callback);
	  });
	
	  // Remove the attachment given by the id and rev
	  api.removeAttachment =
	    adapterFun$$('removeAttachment', function (docId, attachmentId, rev,
	                                                   callback) {
	
	    var url = genDBUrl(host, encodeDocId(docId) + '/' +
	      encodeAttachmentId(attachmentId)) + '?rev=' + rev;
	
	    ajax$$({}, {
	      method: 'DELETE',
	      url: url
	    }, callback);
	  });
	
	  // Add the attachment given by blob and its contentType property
	  // to the document with the given id, the revision given by rev, and
	  // add it to the database given by host.
	  api.putAttachment =
	    adapterFun$$('putAttachment', function (docId, attachmentId, rev, blob,
	                                                type, callback) {
	    if (typeof type === 'function') {
	      callback = type;
	      type = blob;
	      blob = rev;
	      rev = null;
	    }
	    var id = encodeDocId(docId) + '/' + encodeAttachmentId(attachmentId);
	    var url = genDBUrl(host, id);
	    if (rev) {
	      url += '?rev=' + rev;
	    }
	
	    if (typeof blob === 'string') {
	      // input is assumed to be a base64 string
	      var binary;
	      try {
	        binary = atob$1(blob);
	      } catch (err) {
	        return callback(createError(BAD_ARG,
	                        'Attachment is not a valid base64 string'));
	      }
	      blob = binary ? binStringToBluffer(binary, type) : '';
	    }
	
	    var opts = {
	      headers: {'Content-Type': type},
	      method: 'PUT',
	      url: url,
	      processData: false,
	      body: blob,
	      timeout: ajaxOpts.timeout || 60000
	    };
	    // Add the attachment
	    ajax$$({}, opts, callback);
	  });
	
	  // Update/create multiple documents given by req in the database
	  // given by host.
	  api._bulkDocs = function (req, opts, callback) {
	    // If new_edits=false then it prevents the database from creating
	    // new revision numbers for the documents. Instead it just uses
	    // the old ones. This is used in database replication.
	    req.new_edits = opts.new_edits;
	
	    setup().then(function () {
	      return PouchPromise.all(req.docs.map(preprocessAttachments$1));
	    }).then(function () {
	      // Update/create the documents
	      ajax$$(opts, {
	        method: 'POST',
	        url: genDBUrl(host, '_bulk_docs'),
	        body: req
	      }, function (err, results) {
	        if (err) {
	          return callback(err);
	        }
	        results.forEach(function (result) {
	          result.ok = true; // smooths out cloudant not adding this
	        });
	        callback(null, results);
	      });
	    }).catch(callback);
	  };
	
	  // Get a listing of the documents in the database given
	  // by host and ordered by increasing id.
	  api.allDocs = adapterFun$$('allDocs', function (opts, callback) {
	    if (typeof opts === 'function') {
	      callback = opts;
	      opts = {};
	    }
	    opts = clone(opts);
	
	    // List of parameters to add to the GET request
	    var params = {};
	    var body;
	    var method = 'GET';
	
	    if (opts.conflicts) {
	      params.conflicts = true;
	    }
	
	    if (opts.descending) {
	      params.descending = true;
	    }
	
	    if (opts.include_docs) {
	      params.include_docs = true;
	    }
	
	    // added in CouchDB 1.6.0
	    if (opts.attachments) {
	      params.attachments = true;
	    }
	
	    if (opts.key) {
	      params.key = JSON.stringify(opts.key);
	    }
	
	    if (opts.start_key) {
	      opts.startkey = opts.start_key;
	    }
	
	    if (opts.startkey) {
	      params.startkey = JSON.stringify(opts.startkey);
	    }
	
	    if (opts.end_key) {
	      opts.endkey = opts.end_key;
	    }
	
	    if (opts.endkey) {
	      params.endkey = JSON.stringify(opts.endkey);
	    }
	
	    if (typeof opts.inclusive_end !== 'undefined') {
	      params.inclusive_end = !!opts.inclusive_end;
	    }
	
	    if (typeof opts.limit !== 'undefined') {
	      params.limit = opts.limit;
	    }
	
	    if (typeof opts.skip !== 'undefined') {
	      params.skip = opts.skip;
	    }
	
	    var paramStr = paramsToStr(params);
	
	    if (typeof opts.keys !== 'undefined') {
	
	      var keysAsString =
	        'keys=' + encodeURIComponent(JSON.stringify(opts.keys));
	      if (keysAsString.length + paramStr.length + 1 <= MAX_URL_LENGTH) {
	        // If the keys are short enough, do a GET. we do this to work around
	        // Safari not understanding 304s on POSTs (see issue #1239)
	        paramStr += '&' + keysAsString;
	      } else {
	        // If keys are too long, issue a POST request to circumvent GET
	        // query string limits
	        // see http://wiki.apache.org/couchdb/HTTP_view_API#Querying_Options
	        method = 'POST';
	        body = {keys: opts.keys};
	      }
	    }
	
	    // Get the document listing
	    ajaxPromise(opts, {
	      method: method,
	      url: genDBUrl(host, '_all_docs' + paramStr),
	      body: body
	    }).then(function (res) {
	      if (opts.include_docs && opts.attachments && opts.binary) {
	        res.rows.forEach(readAttachmentsAsBlobOrBuffer);
	      }
	      callback(null, res);
	    }).catch(callback);
	  });
	
	  // Get a list of changes made to documents in the database given by host.
	  // TODO According to the README, there should be two other methods here,
	  // api.changes.addListener and api.changes.removeListener.
	  api._changes = function (opts) {
	
	    // We internally page the results of a changes request, this means
	    // if there is a large set of changes to be returned we can start
	    // processing them quicker instead of waiting on the entire
	    // set of changes to return and attempting to process them at once
	    var batchSize = 'batch_size' in opts ? opts.batch_size : CHANGES_BATCH_SIZE;
	
	    opts = clone(opts);
	    opts.timeout = ('timeout' in opts) ? opts.timeout :
	      ('timeout' in ajaxOpts) ? ajaxOpts.timeout :
	      30 * 1000;
	
	    // We give a 5 second buffer for CouchDB changes to respond with
	    // an ok timeout (if a timeout it set)
	    var params = opts.timeout ? {timeout: opts.timeout - (5 * 1000)} : {};
	    var limit = (typeof opts.limit !== 'undefined') ? opts.limit : false;
	    var returnDocs;
	    if ('return_docs' in opts) {
	      returnDocs = opts.return_docs;
	    } else if ('returnDocs' in opts) {
	      // TODO: Remove 'returnDocs' in favor of 'return_docs' in a future release
	      returnDocs = opts.returnDocs;
	    } else {
	      returnDocs = true;
	    }
	    //
	    var leftToFetch = limit;
	
	    if (opts.style) {
	      params.style = opts.style;
	    }
	
	    if (opts.include_docs || opts.filter && typeof opts.filter === 'function') {
	      params.include_docs = true;
	    }
	
	    if (opts.attachments) {
	      params.attachments = true;
	    }
	
	    if (opts.continuous) {
	      params.feed = 'longpoll';
	    }
	
	    if (opts.conflicts) {
	      params.conflicts = true;
	    }
	
	    if (opts.descending) {
	      params.descending = true;
	    }
	
	    if ('heartbeat' in opts) {
	      // If the heartbeat value is false, it disables the default heartbeat
	      if (opts.heartbeat) {
	        params.heartbeat = opts.heartbeat;
	      }
	    } else {
	      // Default heartbeat to 10 seconds
	      params.heartbeat = 10000;
	    }
	
	    if (opts.filter && typeof opts.filter === 'string') {
	      params.filter = opts.filter;
	    }
	
	    if (opts.view && typeof opts.view === 'string') {
	      params.filter = '_view';
	      params.view = opts.view;
	    }
	
	    // If opts.query_params exists, pass it through to the changes request.
	    // These parameters may be used by the filter on the source database.
	    if (opts.query_params && typeof opts.query_params === 'object') {
	      for (var param_name in opts.query_params) {
	        /* istanbul ignore else */
	        if (opts.query_params.hasOwnProperty(param_name)) {
	          params[param_name] = opts.query_params[param_name];
	        }
	      }
	    }
	
	    var method = 'GET';
	    var body;
	
	    if (opts.doc_ids) {
	      // set this automagically for the user; it's annoying that couchdb
	      // requires both a "filter" and a "doc_ids" param.
	      params.filter = '_doc_ids';
	
	      var docIdsJson = JSON.stringify(opts.doc_ids);
	
	      if (docIdsJson.length < MAX_URL_LENGTH) {
	        params.doc_ids = docIdsJson;
	      } else {
	        // anything greater than ~2000 is unsafe for gets, so
	        // use POST instead
	        method = 'POST';
	        body = {doc_ids: opts.doc_ids };
	      }
	    }
	
	    var xhr;
	    var lastFetchedSeq;
	
	    // Get all the changes starting wtih the one immediately after the
	    // sequence number given by since.
	    var fetch = function (since, callback) {
	      if (opts.aborted) {
	        return;
	      }
	      params.since = since;
	      // "since" can be any kind of json object in Coudant/CouchDB 2.x
	      /* istanbul ignore next */
	      if (typeof params.since === "object") {
	        params.since = JSON.stringify(params.since);
	      }
	
	      if (opts.descending) {
	        if (limit) {
	          params.limit = leftToFetch;
	        }
	      } else {
	        params.limit = (!limit || leftToFetch > batchSize) ?
	          batchSize : leftToFetch;
	      }
	
	      // Set the options for the ajax call
	      var xhrOpts = {
	        method: method,
	        url: genDBUrl(host, '_changes' + paramsToStr(params)),
	        timeout: opts.timeout,
	        body: body
	      };
	      lastFetchedSeq = since;
	
	      /* istanbul ignore if */
	      if (opts.aborted) {
	        return;
	      }
	
	      // Get the changes
	      setup().then(function () {
	        xhr = ajax$$(opts, xhrOpts, callback);
	      }).catch(callback);
	    };
	
	    // If opts.since exists, get all the changes from the sequence
	    // number given by opts.since. Otherwise, get all the changes
	    // from the sequence number 0.
	    var results = {results: []};
	
	    var fetched = function (err, res) {
	      if (opts.aborted) {
	        return;
	      }
	      var raw_results_length = 0;
	      // If the result of the ajax call (res) contains changes (res.results)
	      if (res && res.results) {
	        raw_results_length = res.results.length;
	        results.last_seq = res.last_seq;
	        // For each change
	        var req = {};
	        req.query = opts.query_params;
	        res.results = res.results.filter(function (c) {
	          leftToFetch--;
	          var ret = filterChange(opts)(c);
	          if (ret) {
	            if (opts.include_docs && opts.attachments && opts.binary) {
	              readAttachmentsAsBlobOrBuffer(c);
	            }
	            if (returnDocs) {
	              results.results.push(c);
	            }
	            opts.onChange(c);
	          }
	          return ret;
	        });
	      } else if (err) {
	        // In case of an error, stop listening for changes and call
	        // opts.complete
	        opts.aborted = true;
	        opts.complete(err);
	        return;
	      }
	
	      // The changes feed may have timed out with no results
	      // if so reuse last update sequence
	      if (res && res.last_seq) {
	        lastFetchedSeq = res.last_seq;
	      }
	
	      var finished = (limit && leftToFetch <= 0) ||
	        (res && raw_results_length < batchSize) ||
	        (opts.descending);
	
	      if ((opts.continuous && !(limit && leftToFetch <= 0)) || !finished) {
	        // Queue a call to fetch again with the newest sequence number
	        setTimeout(function () { fetch(lastFetchedSeq, fetched); }, 0);
	      } else {
	        // We're done, call the callback
	        opts.complete(null, results);
	      }
	    };
	
	    fetch(opts.since || 0, fetched);
	
	    // Return a method to cancel this method from processing any more
	    return {
	      cancel: function () {
	        opts.aborted = true;
	        if (xhr) {
	          xhr.abort();
	        }
	      }
	    };
	  };
	
	  // Given a set of document/revision IDs (given by req), tets the subset of
	  // those that do NOT correspond to revisions stored in the database.
	  // See http://wiki.apache.org/couchdb/HttpPostRevsDiff
	  api.revsDiff = adapterFun$$('revsDiff', function (req, opts, callback) {
	    // If no options were given, set the callback to be the second parameter
	    if (typeof opts === 'function') {
	      callback = opts;
	      opts = {};
	    }
	
	    // Get the missing document/revision IDs
	    ajax$$(opts, {
	      method: 'POST',
	      url: genDBUrl(host, '_revs_diff'),
	      body: req
	    }, callback);
	  });
	
	  api._close = function (callback) {
	    callback();
	  };
	
	  api._destroy = function (options, callback) {
	    ajax$$(options, {
	      url: genDBUrl(host, ''),
	      method: 'DELETE'
	    }, function (err, resp) {
	      if (err && err.status && err.status !== 404) {
	        return callback(err);
	      }
	      callback(null, resp);
	    });
	  };
	}
	
	// HttpPouch is a valid adapter.
	HttpPouch.valid = function () {
	  return true;
	};
	
	function HttpPouch$1 (PouchDB) {
	  PouchDB.adapter('http', HttpPouch, false);
	  PouchDB.adapter('https', HttpPouch, false);
	}
	
	function TaskQueue$1() {
	  this.promise = new PouchPromise(function (fulfill) {fulfill(); });
	}
	TaskQueue$1.prototype.add = function (promiseFactory) {
	  this.promise = this.promise.catch(function () {
	    // just recover
	  }).then(function () {
	    return promiseFactory();
	  });
	  return this.promise;
	};
	TaskQueue$1.prototype.finish = function () {
	  return this.promise;
	};
	
	function createView(opts) {
	  var sourceDB = opts.db;
	  var viewName = opts.viewName;
	  var mapFun = opts.map;
	  var reduceFun = opts.reduce;
	  var temporary = opts.temporary;
	
	  // the "undefined" part is for backwards compatibility
	  var viewSignature = mapFun.toString() + (reduceFun && reduceFun.toString()) +
	    'undefined';
	
	  var cachedViews;
	  if (!temporary) {
	    // cache this to ensure we don't try to update the same view twice
	    cachedViews = sourceDB._cachedViews = sourceDB._cachedViews || {};
	    if (cachedViews[viewSignature]) {
	      return cachedViews[viewSignature];
	    }
	  }
	
	  var promiseForView = sourceDB.info().then(function (info) {
	
	    var depDbName = info.db_name + '-mrview-' +
	      (temporary ? 'temp' : stringMd5(viewSignature));
	
	    // save the view name in the source db so it can be cleaned up if necessary
	    // (e.g. when the _design doc is deleted, remove all associated view data)
	    function diffFunction(doc) {
	      doc.views = doc.views || {};
	      var fullViewName = viewName;
	      if (fullViewName.indexOf('/') === -1) {
	        fullViewName = viewName + '/' + viewName;
	      }
	      var depDbs = doc.views[fullViewName] = doc.views[fullViewName] || {};
	      /* istanbul ignore if */
	      if (depDbs[depDbName]) {
	        return; // no update necessary
	      }
	      depDbs[depDbName] = true;
	      return doc;
	    }
	    return upsert(sourceDB, '_local/mrviews', diffFunction).then(function () {
	      return sourceDB.registerDependentDatabase(depDbName).then(function (res) {
	        var db = res.db;
	        db.auto_compaction = true;
	        var view = {
	          name: depDbName,
	          db: db,
	          sourceDB: sourceDB,
	          adapter: sourceDB.adapter,
	          mapFun: mapFun,
	          reduceFun: reduceFun
	        };
	        return view.db.get('_local/lastSeq').catch(function (err) {
	          /* istanbul ignore if */
	          if (err.status !== 404) {
	            throw err;
	          }
	        }).then(function (lastSeqDoc) {
	          view.seq = lastSeqDoc ? lastSeqDoc.seq : 0;
	          if (cachedViews) {
	            view.db.once('destroyed', function () {
	              delete cachedViews[viewSignature];
	            });
	          }
	          return view;
	        });
	      });
	    });
	  });
	
	  if (cachedViews) {
	    cachedViews[viewSignature] = promiseForView;
	  }
	  return promiseForView;
	}
	
	function evalfunc(func, emit, sum, log, isArray, toJSON) {
	  return scopedEval(
	    "return (" + func.replace(/;\s*$/, "") + ");",
	    {
	      emit: emit,
	      sum: sum,
	      log: log,
	      isArray: isArray,
	      toJSON: toJSON
	    }
	  );
	}
	
	var promisedCallback = function (promise, callback) {
	  if (callback) {
	    promise.then(function (res) {
	      process.nextTick(function () {
	        callback(null, res);
	      });
	    }, function (reason) {
	      process.nextTick(function () {
	        callback(reason);
	      });
	    });
	  }
	  return promise;
	};
	
	var callbackify = function (fun) {
	  return getArguments(function (args) {
	    var cb = args.pop();
	    var promise = fun.apply(this, args);
	    if (typeof cb === 'function') {
	      promisedCallback(promise, cb);
	    }
	    return promise;
	  });
	};
	
	// Promise finally util similar to Q.finally
	var fin = function (promise, finalPromiseFactory) {
	  return promise.then(function (res) {
	    return finalPromiseFactory().then(function () {
	      return res;
	    });
	  }, function (reason) {
	    return finalPromiseFactory().then(function () {
	      throw reason;
	    });
	  });
	};
	
	var sequentialize = function (queue, promiseFactory) {
	  return function () {
	    var args = arguments;
	    var that = this;
	    return queue.add(function () {
	      return promiseFactory.apply(that, args);
	    });
	  };
	};
	
	// uniq an array of strings, order not guaranteed
	// similar to underscore/lodash _.uniq
	var uniq = function (arr) {
	  var map = {};
	
	  for (var i = 0, len = arr.length; i < len; i++) {
	    map['$' + arr[i]] = true;
	  }
	
	  var keys = Object.keys(map);
	  var output = new Array(keys.length);
	
	  for (i = 0, len = keys.length; i < len; i++) {
	    output[i] = keys[i].substring(1);
	  }
	  return output;
	};
	
	var persistentQueues = {};
	var tempViewQueue = new TaskQueue$1();
	var CHANGES_BATCH_SIZE$1 = 50;
	
	var log$2 = guardedConsole.bind(null, 'log');
	
	function parseViewName(name) {
	  // can be either 'ddocname/viewname' or just 'viewname'
	  // (where the ddoc name is the same)
	  return name.indexOf('/') === -1 ? [name, name] : name.split('/');
	}
	
	function isGenOne(changes) {
	  // only return true if the current change is 1-
	  // and there are no other leafs
	  return changes.length === 1 && /^1-/.test(changes[0].rev);
	}
	
	function emitError(db, e) {
	  try {
	    db.emit('error', e);
	  } catch (err) {
	    guardedConsole('error',
	      'The user\'s map/reduce function threw an uncaught error.\n' +
	      'You can debug this error by doing:\n' +
	      'myDatabase.on(\'error\', function (err) { debugger; });\n' +
	      'Please double-check your map/reduce function.');
	    guardedConsole('error', e);
	  }
	}
	
	function tryCode$1(db, fun, args) {
	  // emit an event if there was an error thrown by a map/reduce function.
	  // putting try/catches in a single function also avoids deoptimizations.
	  try {
	    return {
	      output : fun.apply(null, args)
	    };
	  } catch (e) {
	    emitError(db, e);
	    return {error: e};
	  }
	}
	
	function sortByKeyThenValue(x, y) {
	  var keyCompare = pouchdbCollate.collate(x.key, y.key);
	  return keyCompare !== 0 ? keyCompare : pouchdbCollate.collate(x.value, y.value);
	}
	
	function sliceResults(results, limit, skip) {
	  skip = skip || 0;
	  if (typeof limit === 'number') {
	    return results.slice(skip, limit + skip);
	  } else if (skip > 0) {
	    return results.slice(skip);
	  }
	  return results;
	}
	
	function rowToDocId(row) {
	  var val = row.value;
	  // Users can explicitly specify a joined doc _id, or it
	  // defaults to the doc _id that emitted the key/value.
	  var docId = (val && typeof val === 'object' && val._id) || row.id;
	  return docId;
	}
	
	function readAttachmentsAsBlobOrBuffer$1(res) {
	  res.rows.forEach(function (row) {
	    var atts = row.doc && row.doc._attachments;
	    if (!atts) {
	      return;
	    }
	    Object.keys(atts).forEach(function (filename) {
	      var att = atts[filename];
	      atts[filename].data = b64ToBluffer(att.data, att.content_type);
	    });
	  });
	}
	
	function postprocessAttachments(opts) {
	  return function (res) {
	    if (opts.include_docs && opts.attachments && opts.binary) {
	      readAttachmentsAsBlobOrBuffer$1(res);
	    }
	    return res;
	  };
	}
	
	function createBuiltInError(name) {
	  var message = 'builtin ' + name +
	    ' function requires map values to be numbers' +
	    ' or number arrays';
	  return new BuiltInError(message);
	}
	
	function sum(values) {
	  var result = 0;
	  for (var i = 0, len = values.length; i < len; i++) {
	    var num = values[i];
	    if (typeof num !== 'number') {
	      if (Array.isArray(num)) {
	        // lists of numbers are also allowed, sum them separately
	        result = typeof result === 'number' ? [result] : result;
	        for (var j = 0, jLen = num.length; j < jLen; j++) {
	          var jNum = num[j];
	          if (typeof jNum !== 'number') {
	            throw createBuiltInError('_sum');
	          } else if (typeof result[j] === 'undefined') {
	            result.push(jNum);
	          } else {
	            result[j] += jNum;
	          }
	        }
	      } else { // not array/number
	        throw createBuiltInError('_sum');
	      }
	    } else if (typeof result === 'number') {
	      result += num;
	    } else { // add number to array
	      result[0] += num;
	    }
	  }
	  return result;
	}
	
	var builtInReduce = {
	  _sum: function (keys, values) {
	    return sum(values);
	  },
	
	  _count: function (keys, values) {
	    return values.length;
	  },
	
	  _stats: function (keys, values) {
	    // no need to implement rereduce=true, because Pouch
	    // will never call it
	    function sumsqr(values) {
	      var _sumsqr = 0;
	      for (var i = 0, len = values.length; i < len; i++) {
	        var num = values[i];
	        _sumsqr += (num * num);
	      }
	      return _sumsqr;
	    }
	    return {
	      sum     : sum(values),
	      min     : Math.min.apply(null, values),
	      max     : Math.max.apply(null, values),
	      count   : values.length,
	      sumsqr : sumsqr(values)
	    };
	  }
	};
	
	function addHttpParam(paramName, opts, params, asJson) {
	  // add an http param from opts to params, optionally json-encoded
	  var val = opts[paramName];
	  if (typeof val !== 'undefined') {
	    if (asJson) {
	      val = encodeURIComponent(JSON.stringify(val));
	    }
	    params.push(paramName + '=' + val);
	  }
	}
	
	function coerceInteger(integerCandidate) {
	  if (typeof integerCandidate !== 'undefined') {
	    var asNumber = Number(integerCandidate);
	    // prevents e.g. '1foo' or '1.1' being coerced to 1
	    if (!isNaN(asNumber) && asNumber === parseInt(integerCandidate, 10)) {
	      return asNumber;
	    } else {
	      return integerCandidate;
	    }
	  }
	}
	
	function coerceOptions(opts) {
	  opts.group_level = coerceInteger(opts.group_level);
	  opts.limit = coerceInteger(opts.limit);
	  opts.skip = coerceInteger(opts.skip);
	  return opts;
	}
	
	function checkPositiveInteger(number) {
	  if (number) {
	    if (typeof number !== 'number') {
	      return  new QueryParseError('Invalid value for integer: "' +
	      number + '"');
	    }
	    if (number < 0) {
	      return new QueryParseError('Invalid value for positive integer: ' +
	        '"' + number + '"');
	    }
	  }
	}
	
	function checkQueryParseError(options, fun) {
	  var startkeyName = options.descending ? 'endkey' : 'startkey';
	  var endkeyName = options.descending ? 'startkey' : 'endkey';
	
	  if (typeof options[startkeyName] !== 'undefined' &&
	    typeof options[endkeyName] !== 'undefined' &&
	    pouchdbCollate.collate(options[startkeyName], options[endkeyName]) > 0) {
	    throw new QueryParseError('No rows can match your key range, ' +
	    'reverse your start_key and end_key or set {descending : true}');
	  } else if (fun.reduce && options.reduce !== false) {
	    if (options.include_docs) {
	      throw new QueryParseError('{include_docs:true} is invalid for reduce');
	    } else if (options.keys && options.keys.length > 1 &&
	        !options.group && !options.group_level) {
	      throw new QueryParseError('Multi-key fetches for reduce views must use ' +
	      '{group: true}');
	    }
	  }
	  ['group_level', 'limit', 'skip'].forEach(function (optionName) {
	    var error = checkPositiveInteger(options[optionName]);
	    if (error) {
	      throw error;
	    }
	  });
	}
	
	function httpQuery(db, fun, opts) {
	  // List of parameters to add to the PUT request
	  var params = [];
	  var body;
	  var method = 'GET';
	
	  // If opts.reduce exists and is defined, then add it to the list
	  // of parameters.
	  // If reduce=false then the results are that of only the map function
	  // not the final result of map and reduce.
	  addHttpParam('reduce', opts, params);
	  addHttpParam('include_docs', opts, params);
	  addHttpParam('attachments', opts, params);
	  addHttpParam('limit', opts, params);
	  addHttpParam('descending', opts, params);
	  addHttpParam('group', opts, params);
	  addHttpParam('group_level', opts, params);
	  addHttpParam('skip', opts, params);
	  addHttpParam('stale', opts, params);
	  addHttpParam('conflicts', opts, params);
	  addHttpParam('startkey', opts, params, true);
	  addHttpParam('start_key', opts, params, true);
	  addHttpParam('endkey', opts, params, true);
	  addHttpParam('end_key', opts, params, true);
	  addHttpParam('inclusive_end', opts, params);
	  addHttpParam('key', opts, params, true);
	
	  // Format the list of parameters into a valid URI query string
	  params = params.join('&');
	  params = params === '' ? '' : '?' + params;
	
	  // If keys are supplied, issue a POST to circumvent GET query string limits
	  // see http://wiki.apache.org/couchdb/HTTP_view_API#Querying_Options
	  if (typeof opts.keys !== 'undefined') {
	    var MAX_URL_LENGTH = 2000;
	    // according to http://stackoverflow.com/a/417184/680742,
	    // the de facto URL length limit is 2000 characters
	
	    var keysAsString =
	      'keys=' + encodeURIComponent(JSON.stringify(opts.keys));
	    if (keysAsString.length + params.length + 1 <= MAX_URL_LENGTH) {
	      // If the keys are short enough, do a GET. we do this to work around
	      // Safari not understanding 304s on POSTs (see pouchdb/pouchdb#1239)
	      params += (params[0] === '?' ? '&' : '?') + keysAsString;
	    } else {
	      method = 'POST';
	      if (typeof fun === 'string') {
	        body = {keys: opts.keys};
	      } else { // fun is {map : mapfun}, so append to this
	        fun.keys = opts.keys;
	      }
	    }
	  }
	
	  // We are referencing a query defined in the design doc
	  if (typeof fun === 'string') {
	    var parts = parseViewName(fun);
	    return db.request({
	      method: method,
	      url: '_design/' + parts[0] + '/_view/' + parts[1] + params,
	      body: body
	    }).then(postprocessAttachments(opts));
	  }
	
	  // We are using a temporary view, terrible for performance, good for testing
	  body = body || {};
	  Object.keys(fun).forEach(function (key) {
	    if (Array.isArray(fun[key])) {
	      body[key] = fun[key];
	    } else {
	      body[key] = fun[key].toString();
	    }
	  });
	  return db.request({
	    method: 'POST',
	    url: '_temp_view' + params,
	    body: body
	  }).then(postprocessAttachments(opts));
	}
	
	// custom adapters can define their own api._query
	// and override the default behavior
	/* istanbul ignore next */
	function customQuery(db, fun, opts) {
	  return new PouchPromise(function (resolve, reject) {
	    db._query(fun, opts, function (err, res) {
	      if (err) {
	        return reject(err);
	      }
	      resolve(res);
	    });
	  });
	}
	
	// custom adapters can define their own api._viewCleanup
	// and override the default behavior
	/* istanbul ignore next */
	function customViewCleanup(db) {
	  return new PouchPromise(function (resolve, reject) {
	    db._viewCleanup(function (err, res) {
	      if (err) {
	        return reject(err);
	      }
	      resolve(res);
	    });
	  });
	}
	
	function defaultsTo(value) {
	  return function (reason) {
	    /* istanbul ignore else */
	    if (reason.status === 404) {
	      return value;
	    } else {
	      throw reason;
	    }
	  };
	}
	
	// returns a promise for a list of docs to update, based on the input docId.
	// the order doesn't matter, because post-3.2.0, bulkDocs
	// is an atomic operation in all three adapters.
	function getDocsToPersist(docId, view, docIdsToChangesAndEmits) {
	  var metaDocId = '_local/doc_' + docId;
	  var defaultMetaDoc = {_id: metaDocId, keys: []};
	  var docData = docIdsToChangesAndEmits[docId];
	  var indexableKeysToKeyValues = docData.indexableKeysToKeyValues;
	  var changes = docData.changes;
	
	  function getMetaDoc() {
	    if (isGenOne(changes)) {
	      // generation 1, so we can safely assume initial state
	      // for performance reasons (avoids unnecessary GETs)
	      return PouchPromise.resolve(defaultMetaDoc);
	    }
	    return view.db.get(metaDocId).catch(defaultsTo(defaultMetaDoc));
	  }
	
	  function getKeyValueDocs(metaDoc) {
	    if (!metaDoc.keys.length) {
	      // no keys, no need for a lookup
	      return PouchPromise.resolve({rows: []});
	    }
	    return view.db.allDocs({
	      keys: metaDoc.keys,
	      include_docs: true
	    });
	  }
	
	  function processKvDocs(metaDoc, kvDocsRes) {
	    var kvDocs = [];
	    var oldKeysMap = {};
	
	    for (var i = 0, len = kvDocsRes.rows.length; i < len; i++) {
	      var row = kvDocsRes.rows[i];
	      var doc = row.doc;
	      if (!doc) { // deleted
	        continue;
	      }
	      kvDocs.push(doc);
	      oldKeysMap[doc._id] = true;
	      doc._deleted = !indexableKeysToKeyValues[doc._id];
	      if (!doc._deleted) {
	        var keyValue = indexableKeysToKeyValues[doc._id];
	        if ('value' in keyValue) {
	          doc.value = keyValue.value;
	        }
	      }
	    }
	
	    var newKeys = Object.keys(indexableKeysToKeyValues);
	    newKeys.forEach(function (key) {
	      if (!oldKeysMap[key]) {
	        // new doc
	        var kvDoc = {
	          _id: key
	        };
	        var keyValue = indexableKeysToKeyValues[key];
	        if ('value' in keyValue) {
	          kvDoc.value = keyValue.value;
	        }
	        kvDocs.push(kvDoc);
	      }
	    });
	    metaDoc.keys = uniq(newKeys.concat(metaDoc.keys));
	    kvDocs.push(metaDoc);
	
	    return kvDocs;
	  }
	
	  return getMetaDoc().then(function (metaDoc) {
	    return getKeyValueDocs(metaDoc).then(function (kvDocsRes) {
	      return processKvDocs(metaDoc, kvDocsRes);
	    });
	  });
	}
	
	// updates all emitted key/value docs and metaDocs in the mrview database
	// for the given batch of documents from the source database
	function saveKeyValues(view, docIdsToChangesAndEmits, seq) {
	  var seqDocId = '_local/lastSeq';
	  return view.db.get(seqDocId)
	  .catch(defaultsTo({_id: seqDocId, seq: 0}))
	  .then(function (lastSeqDoc) {
	    var docIds = Object.keys(docIdsToChangesAndEmits);
	    return PouchPromise.all(docIds.map(function (docId) {
	      return getDocsToPersist(docId, view, docIdsToChangesAndEmits);
	    })).then(function (listOfDocsToPersist) {
	      var docsToPersist = flatten(listOfDocsToPersist);
	      lastSeqDoc.seq = seq;
	      docsToPersist.push(lastSeqDoc);
	      // write all docs in a single operation, update the seq once
	      return view.db.bulkDocs({docs : docsToPersist});
	    });
	  });
	}
	
	function getQueue(view) {
	  var viewName = typeof view === 'string' ? view : view.name;
	  var queue = persistentQueues[viewName];
	  if (!queue) {
	    queue = persistentQueues[viewName] = new TaskQueue$1();
	  }
	  return queue;
	}
	
	function updateView(view) {
	  return sequentialize(getQueue(view), function () {
	    return updateViewInQueue(view);
	  })();
	}
	
	function updateViewInQueue(view) {
	  // bind the emit function once
	  var mapResults;
	  var doc;
	
	  function emit(key, value) {
	    var output = {id: doc._id, key: pouchdbCollate.normalizeKey(key)};
	    // Don't explicitly store the value unless it's defined and non-null.
	    // This saves on storage space, because often people don't use it.
	    if (typeof value !== 'undefined' && value !== null) {
	      output.value = pouchdbCollate.normalizeKey(value);
	    }
	    mapResults.push(output);
	  }
	
	  var mapFun;
	  // for temp_views one can use emit(doc, emit), see #38
	  if (typeof view.mapFun === "function" && view.mapFun.length === 2) {
	    var origMap = view.mapFun;
	    mapFun = function (doc) {
	      return origMap(doc, emit);
	    };
	  } else {
	    mapFun = evalfunc(view.mapFun.toString(), emit, sum, log$2, Array.isArray,
	      JSON.parse);
	  }
	
	  var currentSeq = view.seq || 0;
	
	  function processChange(docIdsToChangesAndEmits, seq) {
	    return function () {
	      return saveKeyValues(view, docIdsToChangesAndEmits, seq);
	    };
	  }
	
	  var queue = new TaskQueue$1();
	  // TODO(neojski): https://github.com/daleharvey/pouchdb/issues/1521
	
	  return new PouchPromise(function (resolve, reject) {
	
	    function complete() {
	      queue.finish().then(function () {
	        view.seq = currentSeq;
	        resolve();
	      });
	    }
	
	    function processNextBatch() {
	      view.sourceDB.changes({
	        conflicts: true,
	        include_docs: true,
	        style: 'all_docs',
	        since: currentSeq,
	        limit: CHANGES_BATCH_SIZE$1
	      }).on('complete', function (response) {
	        var results = response.results;
	        if (!results.length) {
	          return complete();
	        }
	        var docIdsToChangesAndEmits = {};
	        for (var i = 0, l = results.length; i < l; i++) {
	          var change = results[i];
	          if (change.doc._id[0] !== '_') {
	            mapResults = [];
	            doc = change.doc;
	
	            if (!doc._deleted) {
	              tryCode$1(view.sourceDB, mapFun, [doc]);
	            }
	            mapResults.sort(sortByKeyThenValue);
	
	            var indexableKeysToKeyValues = {};
	            var lastKey;
	            for (var j = 0, jl = mapResults.length; j < jl; j++) {
	              var obj = mapResults[j];
	              var complexKey = [obj.key, obj.id];
	              if (pouchdbCollate.collate(obj.key, lastKey) === 0) {
	                complexKey.push(j); // dup key+id, so make it unique
	              }
	              var indexableKey = pouchdbCollate.toIndexableString(complexKey);
	              indexableKeysToKeyValues[indexableKey] = obj;
	              lastKey = obj.key;
	            }
	            docIdsToChangesAndEmits[change.doc._id] = {
	              indexableKeysToKeyValues: indexableKeysToKeyValues,
	              changes: change.changes
	            };
	          }
	          currentSeq = change.seq;
	        }
	        queue.add(processChange(docIdsToChangesAndEmits, currentSeq));
	        if (results.length < CHANGES_BATCH_SIZE$1) {
	          return complete();
	        }
	        return processNextBatch();
	      }).on('error', onError);
	      /* istanbul ignore next */
	      function onError(err) {
	        reject(err);
	      }
	    }
	
	    processNextBatch();
	  });
	}
	
	function reduceView(view, results, options) {
	  if (options.group_level === 0) {
	    delete options.group_level;
	  }
	
	  var shouldGroup = options.group || options.group_level;
	
	  var reduceFun;
	  if (builtInReduce[view.reduceFun]) {
	    reduceFun = builtInReduce[view.reduceFun];
	  } else {
	    reduceFun = evalfunc(
	      view.reduceFun.toString(), null, sum, log$2, Array.isArray, JSON.parse);
	  }
	
	  var groups = [];
	  var lvl = isNaN(options.group_level) ? Number.POSITIVE_INFINITY :
	    options.group_level;
	  results.forEach(function (e) {
	    var last = groups[groups.length - 1];
	    var groupKey = shouldGroup ? e.key : null;
	
	    // only set group_level for array keys
	    if (shouldGroup && Array.isArray(groupKey)) {
	      groupKey = groupKey.slice(0, lvl);
	    }
	
	    if (last && pouchdbCollate.collate(last.groupKey, groupKey) === 0) {
	      last.keys.push([e.key, e.id]);
	      last.values.push(e.value);
	      return;
	    }
	    groups.push({
	      keys: [[e.key, e.id]],
	      values: [e.value],
	      groupKey: groupKey
	    });
	  });
	  results = [];
	  for (var i = 0, len = groups.length; i < len; i++) {
	    var e = groups[i];
	    var reduceTry = tryCode$1(view.sourceDB, reduceFun,
	      [e.keys, e.values, false]);
	    if (reduceTry.error && reduceTry.error instanceof BuiltInError) {
	      // CouchDB returns an error if a built-in errors out
	      throw reduceTry.error;
	    }
	    results.push({
	      // CouchDB just sets the value to null if a non-built-in errors out
	      value: reduceTry.error ? null : reduceTry.output,
	      key: e.groupKey
	    });
	  }
	  // no total_rows/offset when reducing
	  return {rows: sliceResults(results, options.limit, options.skip)};
	}
	
	function queryView(view, opts) {
	  return sequentialize(getQueue(view), function () {
	    return queryViewInQueue(view, opts);
	  })();
	}
	
	function queryViewInQueue(view, opts) {
	  var totalRows;
	  var shouldReduce = view.reduceFun && opts.reduce !== false;
	  var skip = opts.skip || 0;
	  if (typeof opts.keys !== 'undefined' && !opts.keys.length) {
	    // equivalent query
	    opts.limit = 0;
	    delete opts.keys;
	  }
	
	  function fetchFromView(viewOpts) {
	    viewOpts.include_docs = true;
	    return view.db.allDocs(viewOpts).then(function (res) {
	      totalRows = res.total_rows;
	      return res.rows.map(function (result) {
	
	        // implicit migration - in older versions of PouchDB,
	        // we explicitly stored the doc as {id: ..., key: ..., value: ...}
	        // this is tested in a migration test
	        /* istanbul ignore next */
	        if ('value' in result.doc && typeof result.doc.value === 'object' &&
	            result.doc.value !== null) {
	          var keys = Object.keys(result.doc.value).sort();
	          // this detection method is not perfect, but it's unlikely the user
	          // emitted a value which was an object with these 3 exact keys
	          var expectedKeys = ['id', 'key', 'value'];
	          if (!(keys < expectedKeys || keys > expectedKeys)) {
	            return result.doc.value;
	          }
	        }
	
	        var parsedKeyAndDocId = pouchdbCollate.parseIndexableString(result.doc._id);
	        return {
	          key: parsedKeyAndDocId[0],
	          id: parsedKeyAndDocId[1],
	          value: ('value' in result.doc ? result.doc.value : null)
	        };
	      });
	    });
	  }
	
	  function onMapResultsReady(rows) {
	    var finalResults;
	    if (shouldReduce) {
	      finalResults = reduceView(view, rows, opts);
	    } else {
	      finalResults = {
	        total_rows: totalRows,
	        offset: skip,
	        rows: rows
	      };
	    }
	    if (opts.include_docs) {
	      var docIds = uniq(rows.map(rowToDocId));
	
	      return view.sourceDB.allDocs({
	        keys: docIds,
	        include_docs: true,
	        conflicts: opts.conflicts,
	        attachments: opts.attachments,
	        binary: opts.binary
	      }).then(function (allDocsRes) {
	        var docIdsToDocs = {};
	        allDocsRes.rows.forEach(function (row) {
	          if (row.doc) {
	            docIdsToDocs['$' + row.id] = row.doc;
	          }
	        });
	        rows.forEach(function (row) {
	          var docId = rowToDocId(row);
	          var doc = docIdsToDocs['$' + docId];
	          if (doc) {
	            row.doc = doc;
	          }
	        });
	        return finalResults;
	      });
	    } else {
	      return finalResults;
	    }
	  }
	
	  if (typeof opts.keys !== 'undefined') {
	    var keys = opts.keys;
	    var fetchPromises = keys.map(function (key) {
	      var viewOpts = {
	        startkey : pouchdbCollate.toIndexableString([key]),
	        endkey   : pouchdbCollate.toIndexableString([key, {}])
	      };
	      return fetchFromView(viewOpts);
	    });
	    return PouchPromise.all(fetchPromises).then(flatten).then(onMapResultsReady);
	  } else { // normal query, no 'keys'
	    var viewOpts = {
	      descending : opts.descending
	    };
	    if (opts.start_key) {
	        opts.startkey = opts.start_key;
	    }
	    if (opts.end_key) {
	        opts.endkey = opts.end_key;
	    }
	    if (typeof opts.startkey !== 'undefined') {
	      viewOpts.startkey = opts.descending ?
	        pouchdbCollate.toIndexableString([opts.startkey, {}]) :
	        pouchdbCollate.toIndexableString([opts.startkey]);
	    }
	    if (typeof opts.endkey !== 'undefined') {
	      var inclusiveEnd = opts.inclusive_end !== false;
	      if (opts.descending) {
	        inclusiveEnd = !inclusiveEnd;
	      }
	
	      viewOpts.endkey = pouchdbCollate.toIndexableString(
	        inclusiveEnd ? [opts.endkey, {}] : [opts.endkey]);
	    }
	    if (typeof opts.key !== 'undefined') {
	      var keyStart = pouchdbCollate.toIndexableString([opts.key]);
	      var keyEnd = pouchdbCollate.toIndexableString([opts.key, {}]);
	      if (viewOpts.descending) {
	        viewOpts.endkey = keyStart;
	        viewOpts.startkey = keyEnd;
	      } else {
	        viewOpts.startkey = keyStart;
	        viewOpts.endkey = keyEnd;
	      }
	    }
	    if (!shouldReduce) {
	      if (typeof opts.limit === 'number') {
	        viewOpts.limit = opts.limit;
	      }
	      viewOpts.skip = skip;
	    }
	    return fetchFromView(viewOpts).then(onMapResultsReady);
	  }
	}
	
	function httpViewCleanup(db) {
	  return db.request({
	    method: 'POST',
	    url: '_view_cleanup'
	  });
	}
	
	function localViewCleanup(db) {
	  return db.get('_local/mrviews').then(function (metaDoc) {
	    var docsToViews = {};
	    Object.keys(metaDoc.views).forEach(function (fullViewName) {
	      var parts = parseViewName(fullViewName);
	      var designDocName = '_design/' + parts[0];
	      var viewName = parts[1];
	      docsToViews[designDocName] = docsToViews[designDocName] || {};
	      docsToViews[designDocName][viewName] = true;
	    });
	    var opts = {
	      keys : Object.keys(docsToViews),
	      include_docs : true
	    };
	    return db.allDocs(opts).then(function (res) {
	      var viewsToStatus = {};
	      res.rows.forEach(function (row) {
	        var ddocName = row.key.substring(8);
	        Object.keys(docsToViews[row.key]).forEach(function (viewName) {
	          var fullViewName = ddocName + '/' + viewName;
	          /* istanbul ignore if */
	          if (!metaDoc.views[fullViewName]) {
	            // new format, without slashes, to support PouchDB 2.2.0
	            // migration test in pouchdb's browser.migration.js verifies this
	            fullViewName = viewName;
	          }
	          var viewDBNames = Object.keys(metaDoc.views[fullViewName]);
	          // design doc deleted, or view function nonexistent
	          var statusIsGood = row.doc && row.doc.views &&
	            row.doc.views[viewName];
	          viewDBNames.forEach(function (viewDBName) {
	            viewsToStatus[viewDBName] =
	              viewsToStatus[viewDBName] || statusIsGood;
	          });
	        });
	      });
	      var dbsToDelete = Object.keys(viewsToStatus).filter(
	        function (viewDBName) { return !viewsToStatus[viewDBName]; });
	      var destroyPromises = dbsToDelete.map(function (viewDBName) {
	        return sequentialize(getQueue(viewDBName), function () {
	          return new db.constructor(viewDBName, db.__opts).destroy();
	        })();
	      });
	      return PouchPromise.all(destroyPromises).then(function () {
	        return {ok: true};
	      });
	    });
	  }, defaultsTo({ok: true}));
	}
	
	var viewCleanup = callbackify(function () {
	  var db = this;
	  if (db.type() === 'http') {
	    return httpViewCleanup(db);
	  }
	  /* istanbul ignore next */
	  if (typeof db._viewCleanup === 'function') {
	    return customViewCleanup(db);
	  }
	  return localViewCleanup(db);
	});
	
	function queryPromised(db, fun, opts) {
	  if (db.type() === 'http') {
	    return httpQuery(db, fun, opts);
	  }
	
	  /* istanbul ignore next */
	  if (typeof db._query === 'function') {
	    return customQuery(db, fun, opts);
	  }
	
	  if (typeof fun !== 'string') {
	    // temp_view
	    checkQueryParseError(opts, fun);
	
	    var createViewOpts = {
	      db : db,
	      viewName : 'temp_view/temp_view',
	      map : fun.map,
	      reduce : fun.reduce,
	      temporary : true
	    };
	    tempViewQueue.add(function () {
	      return createView(createViewOpts).then(function (view) {
	        function cleanup() {
	          return view.db.destroy();
	        }
	        return fin(updateView(view).then(function () {
	          return queryView(view, opts);
	        }), cleanup);
	      });
	    });
	    return tempViewQueue.finish();
	  } else {
	    // persistent view
	    var fullViewName = fun;
	    var parts = parseViewName(fullViewName);
	    var designDocName = parts[0];
	    var viewName = parts[1];
	    return db.get('_design/' + designDocName).then(function (doc) {
	      var fun = doc.views && doc.views[viewName];
	
	      if (!fun || typeof fun.map !== 'string') {
	        throw new NotFoundError('ddoc ' + designDocName +
	        ' has no view named ' + viewName);
	      }
	      checkQueryParseError(opts, fun);
	
	      var createViewOpts = {
	        db : db,
	        viewName : fullViewName,
	        map : fun.map,
	        reduce : fun.reduce
	      };
	      return createView(createViewOpts).then(function (view) {
	        if (opts.stale === 'ok' || opts.stale === 'update_after') {
	          if (opts.stale === 'update_after') {
	            process.nextTick(function () {
	              updateView(view);
	            });
	          }
	          return queryView(view, opts);
	        } else { // stale not ok
	          return updateView(view).then(function () {
	            return queryView(view, opts);
	          });
	        }
	      });
	    });
	  }
	}
	
	var query = function (fun, opts, callback) {
	  if (typeof opts === 'function') {
	    callback = opts;
	    opts = {};
	  }
	  opts = opts ? coerceOptions(opts) : {};
	
	  if (typeof fun === 'function') {
	    fun = {map : fun};
	  }
	
	  var db = this;
	  var promise = PouchPromise.resolve().then(function () {
	    return queryPromised(db, fun, opts);
	  });
	  promisedCallback(promise, callback);
	  return promise;
	};
	
	function QueryParseError(message) {
	  this.status = 400;
	  this.name = 'query_parse_error';
	  this.message = message;
	  this.error = true;
	  try {
	    Error.captureStackTrace(this, QueryParseError);
	  } catch (e) {}
	}
	
	inherits(QueryParseError, Error);
	
	function NotFoundError(message) {
	  this.status = 404;
	  this.name = 'not_found';
	  this.message = message;
	  this.error = true;
	  try {
	    Error.captureStackTrace(this, NotFoundError);
	  } catch (e) {}
	}
	
	inherits(NotFoundError, Error);
	
	function BuiltInError(message) {
	  this.status = 500;
	  this.name = 'invalid_value';
	  this.message = message;
	  this.error = true;
	  try {
	    Error.captureStackTrace(this, BuiltInError);
	  } catch (e) {}
	}
	
	inherits(BuiltInError, Error);
	
	var mapreduce = {
	  query: query,
	  viewCleanup: viewCleanup
	};
	
	function isGenOne$1(rev) {
	  return /^1-/.test(rev);
	}
	
	function fileHasChanged(localDoc, remoteDoc, filename) {
	  return !localDoc._attachments ||
	         !localDoc._attachments[filename] ||
	         localDoc._attachments[filename].digest !== remoteDoc._attachments[filename].digest;
	}
	
	function getDocAttachments(db, doc) {
	  var filenames = Object.keys(doc._attachments);
	  return PouchPromise.all(filenames.map(function (filename) {
	    return db.getAttachment(doc._id, filename, {rev: doc._rev});
	  }));
	}
	
	function getDocAttachmentsFromTargetOrSource(target, src, doc) {
	  var doCheckForLocalAttachments = src.type() === 'http' && target.type() !== 'http';
	  var filenames = Object.keys(doc._attachments);
	
	  if (!doCheckForLocalAttachments) {
	    return getDocAttachments(src, doc);
	  }
	
	  return target.get(doc._id).then(function (localDoc) {
	    return PouchPromise.all(filenames.map(function (filename) {
	      if (fileHasChanged(localDoc, doc, filename)) {
	        return src.getAttachment(doc._id, filename);
	      }
	
	      return target.getAttachment(localDoc._id, filename);
	    }));
	  }).catch(function (error) {
	    /* istanbul ignore if */
	    if (error.status !== 404) {
	      throw error;
	    }
	
	    return getDocAttachments(src, doc);
	  });
	}
	
	function createBulkGetOpts(diffs) {
	  var requests = [];
	  Object.keys(diffs).forEach(function (id) {
	    var missingRevs = diffs[id].missing;
	    missingRevs.forEach(function (missingRev) {
	      requests.push({
	        id: id,
	        rev: missingRev
	      });
	    });
	  });
	
	  return {
	    docs: requests,
	    revs: true
	  };
	}
	
	//
	// Fetch all the documents from the src as described in the "diffs",
	// which is a mapping of docs IDs to revisions. If the state ever
	// changes to "cancelled", then the returned promise will be rejected.
	// Else it will be resolved with a list of fetched documents.
	//
	function getDocs(src, target, diffs, state) {
	  diffs = clone(diffs); // we do not need to modify this
	
	  var resultDocs = [],
	      ok = true;
	
	  function getAllDocs() {
	
	    var bulkGetOpts = createBulkGetOpts(diffs);
	
	    if (!bulkGetOpts.docs.length) { // optimization: skip empty requests
	      return;
	    }
	
	    return src.bulkGet(bulkGetOpts).then(function (bulkGetResponse) {
	      /* istanbul ignore if */
	      if (state.cancelled) {
	        throw new Error('cancelled');
	      }
	      return PouchPromise.all(bulkGetResponse.results.map(function (bulkGetInfo) {
	        return PouchPromise.all(bulkGetInfo.docs.map(function (doc) {
	          var remoteDoc = doc.ok;
	
	          if (doc.error) {
	            // when AUTO_COMPACTION is set, docs can be returned which look
	            // like this: {"missing":"1-7c3ac256b693c462af8442f992b83696"}
	            ok = false;
	          }
	
	          if (!remoteDoc || !remoteDoc._attachments) {
	            return remoteDoc;
	          }
	
	          return getDocAttachmentsFromTargetOrSource(target, src, remoteDoc).then(function (attachments) {
	            var filenames = Object.keys(remoteDoc._attachments);
	            attachments.forEach(function (attachment, i) {
	              var att = remoteDoc._attachments[filenames[i]];
	              delete att.stub;
	              delete att.length;
	              att.data = attachment;
	            });
	
	            return remoteDoc;
	          });
	        }));
	      }))
	
	      .then(function (results) {
	        resultDocs = resultDocs.concat(flatten(results).filter(Boolean));
	      });
	    });
	  }
	
	  function hasAttachments(doc) {
	    return doc._attachments && Object.keys(doc._attachments).length > 0;
	  }
	
	  function fetchRevisionOneDocs(ids) {
	    // Optimization: fetch gen-1 docs and attachments in
	    // a single request using _all_docs
	    return src.allDocs({
	      keys: ids,
	      include_docs: true
	    }).then(function (res) {
	      if (state.cancelled) {
	        throw new Error('cancelled');
	      }
	      res.rows.forEach(function (row) {
	        if (row.deleted || !row.doc || !isGenOne$1(row.value.rev) ||
	            hasAttachments(row.doc)) {
	          // if any of these conditions apply, we need to fetch using get()
	          return;
	        }
	
	        // the doc we got back from allDocs() is sufficient
	        resultDocs.push(row.doc);
	        delete diffs[row.id];
	      });
	    });
	  }
	
	  function getRevisionOneDocs() {
	    // filter out the generation 1 docs and get them
	    // leaving the non-generation one docs to be got otherwise
	    var ids = Object.keys(diffs).filter(function (id) {
	      var missing = diffs[id].missing;
	      return missing.length === 1 && isGenOne$1(missing[0]);
	    });
	    if (ids.length > 0) {
	      return fetchRevisionOneDocs(ids);
	    }
	  }
	
	  function returnResult() {
	    return { ok:ok, docs:resultDocs };
	  }
	
	  return PouchPromise.resolve()
	    .then(getRevisionOneDocs)
	    .then(getAllDocs)
	    .then(returnResult);
	}
	
	var CHECKPOINT_VERSION = 1;
	var REPLICATOR = "pouchdb";
	// This is an arbitrary number to limit the
	// amount of replication history we save in the checkpoint.
	// If we save too much, the checkpoing docs will become very big,
	// if we save fewer, we'll run a greater risk of having to
	// read all the changes from 0 when checkpoint PUTs fail
	// CouchDB 2.0 has a more involved history pruning,
	// but let's go for the simple version for now.
	var CHECKPOINT_HISTORY_SIZE = 5;
	var LOWEST_SEQ = 0;
	
	function updateCheckpoint(db, id, checkpoint, session, returnValue) {
	  return db.get(id).catch(function (err) {
	    if (err.status === 404) {
	      if (db.type() === 'http') {
	        explainError(
	          404, 'PouchDB is just checking if a remote checkpoint exists.'
	        );
	      }
	      return {
	        session_id: session,
	        _id: id,
	        history: [],
	        replicator: REPLICATOR,
	        version: CHECKPOINT_VERSION
	      };
	    }
	    throw err;
	  }).then(function (doc) {
	    if (returnValue.cancelled) {
	      return;
	    }
	    // Filter out current entry for this replication
	    doc.history = (doc.history || []).filter(function (item) {
	      return item.session_id !== session;
	    });
	
	    // Add the latest checkpoint to history
	    doc.history.unshift({
	      last_seq: checkpoint,
	      session_id: session
	    });
	
	    // Just take the last pieces in history, to
	    // avoid really big checkpoint docs.
	    // see comment on history size above
	    doc.history = doc.history.slice(0, CHECKPOINT_HISTORY_SIZE);
	
	    doc.version = CHECKPOINT_VERSION;
	    doc.replicator = REPLICATOR;
	
	    doc.session_id = session;
	    doc.last_seq = checkpoint;
	
	    return db.put(doc).catch(function (err) {
	      if (err.status === 409) {
	        // retry; someone is trying to write a checkpoint simultaneously
	        return updateCheckpoint(db, id, checkpoint, session, returnValue);
	      }
	      throw err;
	    });
	  });
	}
	
	function Checkpointer(src, target, id, returnValue) {
	  this.src = src;
	  this.target = target;
	  this.id = id;
	  this.returnValue = returnValue;
	}
	
	Checkpointer.prototype.writeCheckpoint = function (checkpoint, session) {
	  var self = this;
	  return this.updateTarget(checkpoint, session).then(function () {
	    return self.updateSource(checkpoint, session);
	  });
	};
	
	Checkpointer.prototype.updateTarget = function (checkpoint, session) {
	  return updateCheckpoint(this.target, this.id, checkpoint,
	    session, this.returnValue);
	};
	
	Checkpointer.prototype.updateSource = function (checkpoint, session) {
	  var self = this;
	  if (this.readOnlySource) {
	    return PouchPromise.resolve(true);
	  }
	  return updateCheckpoint(this.src, this.id, checkpoint,
	    session, this.returnValue)
	    .catch(function (err) {
	      if (isForbiddenError(err)) {
	        self.readOnlySource = true;
	        return true;
	      }
	      throw err;
	    });
	};
	
	var comparisons = {
	  "undefined": function (targetDoc, sourceDoc) {
	    // This is the previous comparison function
	    if (pouchdbCollate.collate(targetDoc.last_seq, sourceDoc.last_seq) === 0) {
	      return sourceDoc.last_seq;
	    }
	    /* istanbul ignore next */
	    return 0;
	  },
	  "1": function (targetDoc, sourceDoc) {
	    // This is the comparison function ported from CouchDB
	    return compareReplicationLogs(sourceDoc, targetDoc).last_seq;
	  }
	};
	
	Checkpointer.prototype.getCheckpoint = function () {
	  var self = this;
	  return self.target.get(self.id).then(function (targetDoc) {
	    if (self.readOnlySource) {
	      return PouchPromise.resolve(targetDoc.last_seq);
	    }
	
	    return self.src.get(self.id).then(function (sourceDoc) {
	      // Since we can't migrate an old version doc to a new one
	      // (no session id), we just go with the lowest seq in this case
	      /* istanbul ignore if */
	      if (targetDoc.version !== sourceDoc.version) {
	        return LOWEST_SEQ;
	      }
	
	      var version;
	      if (targetDoc.version) {
	        version = targetDoc.version.toString();
	      } else {
	        version = "undefined";
	      }
	
	      if (version in comparisons) {
	        return comparisons[version](targetDoc, sourceDoc);
	      }
	      /* istanbul ignore next */
	      return LOWEST_SEQ;
	    }, function (err) {
	      if (err.status === 404 && targetDoc.last_seq) {
	        return self.src.put({
	          _id: self.id,
	          last_seq: LOWEST_SEQ
	        }).then(function () {
	          return LOWEST_SEQ;
	        }, function (err) {
	          if (isForbiddenError(err)) {
	            self.readOnlySource = true;
	            return targetDoc.last_seq;
	          }
	          /* istanbul ignore next */
	          return LOWEST_SEQ;
	        });
	      }
	      throw err;
	    });
	  }).catch(function (err) {
	    if (err.status !== 404) {
	      throw err;
	    }
	    return LOWEST_SEQ;
	  });
	};
	// This checkpoint comparison is ported from CouchDBs source
	// they come from here:
	// https://github.com/apache/couchdb-couch-replicator/blob/master/src/couch_replicator.erl#L863-L906
	
	function compareReplicationLogs(srcDoc, tgtDoc) {
	  if (srcDoc.session_id === tgtDoc.session_id) {
	    return {
	      last_seq: srcDoc.last_seq,
	      history: srcDoc.history
	    };
	  }
	
	  return compareReplicationHistory(srcDoc.history, tgtDoc.history);
	}
	
	function compareReplicationHistory(sourceHistory, targetHistory) {
	  // the erlang loop via function arguments is not so easy to repeat in JS
	  // therefore, doing this as recursion
	  var S = sourceHistory[0];
	  var sourceRest = sourceHistory.slice(1);
	  var T = targetHistory[0];
	  var targetRest = targetHistory.slice(1);
	
	  if (!S || targetHistory.length === 0) {
	    return {
	      last_seq: LOWEST_SEQ,
	      history: []
	    };
	  }
	
	  var sourceId = S.session_id;
	  /* istanbul ignore if */
	  if (hasSessionId(sourceId, targetHistory)) {
	    return {
	      last_seq: S.last_seq,
	      history: sourceHistory
	    };
	  }
	
	  var targetId = T.session_id;
	  if (hasSessionId(targetId, sourceRest)) {
	    return {
	      last_seq: T.last_seq,
	      history: targetRest
	    };
	  }
	
	  return compareReplicationHistory(sourceRest, targetRest);
	}
	
	function hasSessionId(sessionId, history) {
	  var props = history[0];
	  var rest = history.slice(1);
	
	  if (!sessionId || history.length === 0) {
	    return false;
	  }
	
	  if (sessionId === props.session_id) {
	    return true;
	  }
	
	  return hasSessionId(sessionId, rest);
	}
	
	function isForbiddenError(err) {
	  return typeof err.status === 'number' && Math.floor(err.status / 100) === 4;
	}
	
	var STARTING_BACK_OFF = 0;
	
	function backOff(opts, returnValue, error, callback) {
	  if (opts.retry === false) {
	    returnValue.emit('error', error);
	    returnValue.removeAllListeners();
	    return;
	  }
	  if (typeof opts.back_off_function !== 'function') {
	    opts.back_off_function = defaultBackOff;
	  }
	  returnValue.emit('requestError', error);
	  if (returnValue.state === 'active' || returnValue.state === 'pending') {
	    returnValue.emit('paused', error);
	    returnValue.state = 'stopped';
	    var backOffSet = function backoffTimeSet() {
	      opts.current_back_off = STARTING_BACK_OFF;
	    };
	    var removeBackOffSetter = function removeBackOffTimeSet() {
	      returnValue.removeListener('active', backOffSet);
	    };
	    returnValue.once('paused', removeBackOffSetter);
	    returnValue.once('active', backOffSet);
	  }
	
	  opts.current_back_off = opts.current_back_off || STARTING_BACK_OFF;
	  opts.current_back_off = opts.back_off_function(opts.current_back_off);
	  setTimeout(callback, opts.current_back_off);
	}
	
	function sortObjectPropertiesByKey(queryParams) {
	  return Object.keys(queryParams).sort(pouchdbCollate.collate).reduce(function (result, key) {
	    result[key] = queryParams[key];
	    return result;
	  }, {});
	}
	
	// Generate a unique id particular to this replication.
	// Not guaranteed to align perfectly with CouchDB's rep ids.
	function generateReplicationId(src, target, opts) {
	  var docIds = opts.doc_ids ? opts.doc_ids.sort(pouchdbCollate.collate) : '';
	  var filterFun = opts.filter ? opts.filter.toString() : '';
	  var queryParams = '';
	  var filterViewName =  '';
	
	  if (opts.filter && opts.query_params) {
	    queryParams = JSON.stringify(sortObjectPropertiesByKey(opts.query_params));
	  }
	
	  if (opts.filter && opts.filter === '_view') {
	    filterViewName = opts.view.toString();
	  }
	
	  return PouchPromise.all([src.id(), target.id()]).then(function (res) {
	    var queryData = res[0] + res[1] + filterFun + filterViewName +
	      queryParams + docIds;
	    return new PouchPromise(function (resolve) {
	      binaryMd5(queryData, resolve);
	    });
	  }).then(function (md5sum) {
	    // can't use straight-up md5 alphabet, because
	    // the char '/' is interpreted as being for attachments,
	    // and + is also not url-safe
	    md5sum = md5sum.replace(/\//g, '.').replace(/\+/g, '_');
	    return '_local/' + md5sum;
	  });
	}
	
	function replicate$1(src, target, opts, returnValue, result) {
	  var batches = [];               // list of batches to be processed
	  var currentBatch;               // the batch currently being processed
	  var pendingBatch = {
	    seq: 0,
	    changes: [],
	    docs: []
	  }; // next batch, not yet ready to be processed
	  var writingCheckpoint = false;  // true while checkpoint is being written
	  var changesCompleted = false;   // true when all changes received
	  var replicationCompleted = false; // true when replication has completed
	  var last_seq = 0;
	  var continuous = opts.continuous || opts.live || false;
	  var batch_size = opts.batch_size || 100;
	  var batches_limit = opts.batches_limit || 10;
	  var changesPending = false;     // true while src.changes is running
	  var doc_ids = opts.doc_ids;
	  var repId;
	  var checkpointer;
	  var allErrors = [];
	  var changedDocs = [];
	  // Like couchdb, every replication gets a unique session id
	  var session = uuid();
	
	  result = result || {
	    ok: true,
	    start_time: new Date(),
	    docs_read: 0,
	    docs_written: 0,
	    doc_write_failures: 0,
	    errors: []
	  };
	
	  var changesOpts = {};
	  returnValue.ready(src, target);
	
	  function initCheckpointer() {
	    if (checkpointer) {
	      return PouchPromise.resolve();
	    }
	    return generateReplicationId(src, target, opts).then(function (res) {
	      repId = res;
	      checkpointer = new Checkpointer(src, target, repId, returnValue);
	    });
	  }
	
	  function writeDocs() {
	    changedDocs = [];
	
	    if (currentBatch.docs.length === 0) {
	      return;
	    }
	    var docs = currentBatch.docs;
	    return target.bulkDocs({docs: docs, new_edits: false}).then(function (res) {
	      /* istanbul ignore if */
	      if (returnValue.cancelled) {
	        completeReplication();
	        throw new Error('cancelled');
	      }
	      var errors = [];
	      var errorsById = {};
	      res.forEach(function (res) {
	        if (res.error) {
	          result.doc_write_failures++;
	          errors.push(res);
	          errorsById[res.id] = res;
	        }
	      });
	      allErrors = allErrors.concat(errors);
	      result.docs_written += currentBatch.docs.length - errors.length;
	      var non403s = errors.filter(function (error) {
	        return error.name !== 'unauthorized' && error.name !== 'forbidden';
	      });
	
	      docs.forEach(function (doc) {
	        var error = errorsById[doc._id];
	        if (error) {
	          returnValue.emit('denied', clone(error));
	        } else {
	          changedDocs.push(doc);
	        }
	      });
	
	      if (non403s.length > 0) {
	        var error = new Error('bulkDocs error');
	        error.other_errors = errors;
	        abortReplication('target.bulkDocs failed to write docs', error);
	        throw new Error('bulkWrite partial failure');
	      }
	    }, function (err) {
	      result.doc_write_failures += docs.length;
	      throw err;
	    });
	  }
	
	  function finishBatch() {
	    if (currentBatch.error) {
	      throw new Error('There was a problem getting docs.');
	    }
	    result.last_seq = last_seq = currentBatch.seq;
	    var outResult = clone(result);
	    if (changedDocs.length) {
	      outResult.docs = changedDocs;
	      returnValue.emit('change', outResult);
	    }
	    writingCheckpoint = true;
	    return checkpointer.writeCheckpoint(currentBatch.seq,
	        session).then(function () {
	      writingCheckpoint = false;
	      /* istanbul ignore if */
	      if (returnValue.cancelled) {
	        completeReplication();
	        throw new Error('cancelled');
	      }
	      currentBatch = undefined;
	      getChanges();
	    }).catch(onCheckpointError);
	  }
	
	  function getDiffs() {
	    var diff = {};
	    currentBatch.changes.forEach(function (change) {
	      // Couchbase Sync Gateway emits these, but we can ignore them
	      /* istanbul ignore if */
	      if (change.id === "_user/") {
	        return;
	      }
	      diff[change.id] = change.changes.map(function (x) {
	        return x.rev;
	      });
	    });
	    return target.revsDiff(diff).then(function (diffs) {
	      /* istanbul ignore if */
	      if (returnValue.cancelled) {
	        completeReplication();
	        throw new Error('cancelled');
	      }
	      // currentBatch.diffs elements are deleted as the documents are written
	      currentBatch.diffs = diffs;
	    });
	  }
	
	  function getBatchDocs() {
	    return getDocs(src, target, currentBatch.diffs, returnValue).then(function (got) {
	      currentBatch.error = !got.ok;
	      got.docs.forEach(function (doc) {
	        delete currentBatch.diffs[doc._id];
	        result.docs_read++;
	        currentBatch.docs.push(doc);
	      });
	    });
	  }
	
	  function startNextBatch() {
	    if (returnValue.cancelled || currentBatch) {
	      return;
	    }
	    if (batches.length === 0) {
	      processPendingBatch(true);
	      return;
	    }
	    currentBatch = batches.shift();
	    getDiffs()
	      .then(getBatchDocs)
	      .then(writeDocs)
	      .then(finishBatch)
	      .then(startNextBatch)
	      .catch(function (err) {
	        abortReplication('batch processing terminated with error', err);
	      });
	  }
	
	
	  function processPendingBatch(immediate) {
	    if (pendingBatch.changes.length === 0) {
	      if (batches.length === 0 && !currentBatch) {
	        if ((continuous && changesOpts.live) || changesCompleted) {
	          returnValue.state = 'pending';
	          returnValue.emit('paused');
	        }
	        if (changesCompleted) {
	          completeReplication();
	        }
	      }
	      return;
	    }
	    if (
	      immediate ||
	      changesCompleted ||
	      pendingBatch.changes.length >= batch_size
	    ) {
	      batches.push(pendingBatch);
	      pendingBatch = {
	        seq: 0,
	        changes: [],
	        docs: []
	      };
	      if (returnValue.state === 'pending' || returnValue.state === 'stopped') {
	        returnValue.state = 'active';
	        returnValue.emit('active');
	      }
	      startNextBatch();
	    }
	  }
	
	
	  function abortReplication(reason, err) {
	    if (replicationCompleted) {
	      return;
	    }
	    if (!err.message) {
	      err.message = reason;
	    }
	    result.ok = false;
	    result.status = 'aborting';
	    result.errors.push(err);
	    allErrors = allErrors.concat(err);
	    batches = [];
	    pendingBatch = {
	      seq: 0,
	      changes: [],
	      docs: []
	    };
	    completeReplication();
	  }
	
	
	  function completeReplication() {
	    if (replicationCompleted) {
	      return;
	    }
	    /* istanbul ignore if */
	    if (returnValue.cancelled) {
	      result.status = 'cancelled';
	      if (writingCheckpoint) {
	        return;
	      }
	    }
	    result.status = result.status || 'complete';
	    result.end_time = new Date();
	    result.last_seq = last_seq;
	    replicationCompleted = true;
	    var non403s = allErrors.filter(function (error) {
	      return error.name !== 'unauthorized' && error.name !== 'forbidden';
	    });
	    if (non403s.length > 0) {
	      var error = allErrors.pop();
	      if (allErrors.length > 0) {
	        error.other_errors = allErrors;
	      }
	      error.result = result;
	      backOff(opts, returnValue, error, function () {
	        replicate$1(src, target, opts, returnValue);
	      });
	    } else {
	      result.errors = allErrors;
	      returnValue.emit('complete', result);
	      returnValue.removeAllListeners();
	    }
	  }
	
	
	  function onChange(change) {
	    /* istanbul ignore if */
	    if (returnValue.cancelled) {
	      return completeReplication();
	    }
	    var filter = filterChange(opts)(change);
	    if (!filter) {
	      return;
	    }
	    pendingBatch.seq = change.seq;
	    pendingBatch.changes.push(change);
	    processPendingBatch(batches.length === 0 && changesOpts.live);
	  }
	
	
	  function onChangesComplete(changes) {
	    changesPending = false;
	    /* istanbul ignore if */
	    if (returnValue.cancelled) {
	      return completeReplication();
	    }
	
	    // if no results were returned then we're done,
	    // else fetch more
	    if (changes.results.length > 0) {
	      changesOpts.since = changes.last_seq;
	      getChanges();
	      processPendingBatch(true);
	    } else {
	
	      var complete = function () {
	        if (continuous) {
	          changesOpts.live = true;
	          getChanges();
	        } else {
	          changesCompleted = true;
	        }
	        processPendingBatch(true);
	      };
	
	      // update the checkpoint so we start from the right seq next time
	      if (!currentBatch && changes.results.length === 0) {
	        writingCheckpoint = true;
	        checkpointer.writeCheckpoint(changes.last_seq,
	            session).then(function () {
	          writingCheckpoint = false;
	          result.last_seq = last_seq = changes.last_seq;
	          complete();
	        })
	        .catch(onCheckpointError);
	      } else {
	        complete();
	      }
	    }
	  }
	
	
	  function onChangesError(err) {
	    changesPending = false;
	    /* istanbul ignore if */
	    if (returnValue.cancelled) {
	      return completeReplication();
	    }
	    abortReplication('changes rejected', err);
	  }
	
	
	  function getChanges() {
	    if (!(
	      !changesPending &&
	      !changesCompleted &&
	      batches.length < batches_limit
	      )) {
	      return;
	    }
	    changesPending = true;
	    function abortChanges() {
	      changes.cancel();
	    }
	    function removeListener() {
	      returnValue.removeListener('cancel', abortChanges);
	    }
	
	    if (returnValue._changes) { // remove old changes() and listeners
	      returnValue.removeListener('cancel', returnValue._abortChanges);
	      returnValue._changes.cancel();
	    }
	    returnValue.once('cancel', abortChanges);
	
	    var changes = src.changes(changesOpts)
	      .on('change', onChange);
	    changes.then(removeListener, removeListener);
	    changes.then(onChangesComplete)
	      .catch(onChangesError);
	
	    if (opts.retry) {
	      // save for later so we can cancel if necessary
	      returnValue._changes = changes;
	      returnValue._abortChanges = abortChanges;
	    }
	  }
	
	
	  function startChanges() {
	    initCheckpointer().then(function () {
	      /* istanbul ignore if */
	      if (returnValue.cancelled) {
	        completeReplication();
	        return;
	      }
	      return checkpointer.getCheckpoint().then(function (checkpoint) {
	        last_seq = checkpoint;
	        changesOpts = {
	          since: last_seq,
	          limit: batch_size,
	          batch_size: batch_size,
	          style: 'all_docs',
	          doc_ids: doc_ids,
	          return_docs: true // required so we know when we're done
	        };
	        if (opts.filter) {
	          if (typeof opts.filter !== 'string') {
	            // required for the client-side filter in onChange
	            changesOpts.include_docs = true;
	          } else { // ddoc filter
	            changesOpts.filter = opts.filter;
	          }
	        }
	        if ('heartbeat' in opts) {
	          changesOpts.heartbeat = opts.heartbeat;
	        }
	        if ('timeout' in opts) {
	          changesOpts.timeout = opts.timeout;
	        }
	        if (opts.query_params) {
	          changesOpts.query_params = opts.query_params;
	        }
	        if (opts.view) {
	          changesOpts.view = opts.view;
	        }
	        getChanges();
	      });
	    }).catch(function (err) {
	      abortReplication('getCheckpoint rejected with ', err);
	    });
	  }
	
	  /* istanbul ignore next */
	  function onCheckpointError(err) {
	    writingCheckpoint = false;
	    abortReplication('writeCheckpoint completed with error', err);
	    throw err;
	  }
	
	  /* istanbul ignore if */
	  if (returnValue.cancelled) { // cancelled immediately
	    completeReplication();
	    return;
	  }
	
	  if (!returnValue._addedListeners) {
	    returnValue.once('cancel', completeReplication);
	
	    if (typeof opts.complete === 'function') {
	      returnValue.once('error', opts.complete);
	      returnValue.once('complete', function (result) {
	        opts.complete(null, result);
	      });
	    }
	    returnValue._addedListeners = true;
	  }
	
	  if (typeof opts.since === 'undefined') {
	    startChanges();
	  } else {
	    initCheckpointer().then(function () {
	      writingCheckpoint = true;
	      return checkpointer.writeCheckpoint(opts.since, session);
	    }).then(function () {
	      writingCheckpoint = false;
	      /* istanbul ignore if */
	      if (returnValue.cancelled) {
	        completeReplication();
	        return;
	      }
	      last_seq = opts.since;
	      startChanges();
	    }).catch(onCheckpointError);
	  }
	}
	
	// We create a basic promise so the caller can cancel the replication possibly
	// before we have actually started listening to changes etc
	inherits(Replication, events.EventEmitter);
	function Replication() {
	  events.EventEmitter.call(this);
	  this.cancelled = false;
	  this.state = 'pending';
	  var self = this;
	  var promise = new PouchPromise(function (fulfill, reject) {
	    self.once('complete', fulfill);
	    self.once('error', reject);
	  });
	  self.then = function (resolve, reject) {
	    return promise.then(resolve, reject);
	  };
	  self.catch = function (reject) {
	    return promise.catch(reject);
	  };
	  // As we allow error handling via "error" event as well,
	  // put a stub in here so that rejecting never throws UnhandledError.
	  self.catch(function () {});
	}
	
	Replication.prototype.cancel = function () {
	  this.cancelled = true;
	  this.state = 'cancelled';
	  this.emit('cancel');
	};
	
	Replication.prototype.ready = function (src, target) {
	  var self = this;
	  if (self._readyCalled) {
	    return;
	  }
	  self._readyCalled = true;
	
	  function onDestroy() {
	    self.cancel();
	  }
	  src.once('destroyed', onDestroy);
	  target.once('destroyed', onDestroy);
	  function cleanup() {
	    src.removeListener('destroyed', onDestroy);
	    target.removeListener('destroyed', onDestroy);
	  }
	  self.once('complete', cleanup);
	};
	
	function toPouch(db, opts) {
	  var PouchConstructor = opts.PouchConstructor;
	  if (typeof db === 'string') {
	    return new PouchConstructor(db, opts);
	  } else {
	    return db;
	  }
	}
	
	function replicate(src, target, opts, callback) {
	
	  if (typeof opts === 'function') {
	    callback = opts;
	    opts = {};
	  }
	  if (typeof opts === 'undefined') {
	    opts = {};
	  }
	
	  if (opts.doc_ids && !Array.isArray(opts.doc_ids)) {
	    throw createError(BAD_REQUEST,
	                       "`doc_ids` filter parameter is not a list.");
	  }
	
	  opts.complete = callback;
	  opts = clone(opts);
	  opts.continuous = opts.continuous || opts.live;
	  opts.retry = ('retry' in opts) ? opts.retry : false;
	  /*jshint validthis:true */
	  opts.PouchConstructor = opts.PouchConstructor || this;
	  var replicateRet = new Replication(opts);
	  var srcPouch = toPouch(src, opts);
	  var targetPouch = toPouch(target, opts);
	  replicate$1(srcPouch, targetPouch, opts, replicateRet);
	  return replicateRet;
	}
	
	inherits(Sync, events.EventEmitter);
	function sync(src, target, opts, callback) {
	  if (typeof opts === 'function') {
	    callback = opts;
	    opts = {};
	  }
	  if (typeof opts === 'undefined') {
	    opts = {};
	  }
	  opts = clone(opts);
	  /*jshint validthis:true */
	  opts.PouchConstructor = opts.PouchConstructor || this;
	  src = toPouch(src, opts);
	  target = toPouch(target, opts);
	  return new Sync(src, target, opts, callback);
	}
	
	function Sync(src, target, opts, callback) {
	  var self = this;
	  this.canceled = false;
	
	  var optsPush = opts.push ? jsExtend.extend({}, opts, opts.push) : opts;
	  var optsPull = opts.pull ? jsExtend.extend({}, opts, opts.pull) : opts;
	
	  this.push = replicate(src, target, optsPush);
	  this.pull = replicate(target, src, optsPull);
	
	  this.pushPaused = true;
	  this.pullPaused = true;
	
	  function pullChange(change) {
	    self.emit('change', {
	      direction: 'pull',
	      change: change
	    });
	  }
	  function pushChange(change) {
	    self.emit('change', {
	      direction: 'push',
	      change: change
	    });
	  }
	  function pushDenied(doc) {
	    self.emit('denied', {
	      direction: 'push',
	      doc: doc
	    });
	  }
	  function pullDenied(doc) {
	    self.emit('denied', {
	      direction: 'pull',
	      doc: doc
	    });
	  }
	  function pushPaused() {
	    self.pushPaused = true;
	    /* istanbul ignore if */
	    if (self.pullPaused) {
	      self.emit('paused');
	    }
	  }
	  function pullPaused() {
	    self.pullPaused = true;
	    /* istanbul ignore if */
	    if (self.pushPaused) {
	      self.emit('paused');
	    }
	  }
	  function pushActive() {
	    self.pushPaused = false;
	    /* istanbul ignore if */
	    if (self.pullPaused) {
	      self.emit('active', {
	        direction: 'push'
	      });
	    }
	  }
	  function pullActive() {
	    self.pullPaused = false;
	    /* istanbul ignore if */
	    if (self.pushPaused) {
	      self.emit('active', {
	        direction: 'pull'
	      });
	    }
	  }
	
	  var removed = {};
	
	  function removeAll(type) { // type is 'push' or 'pull'
	    return function (event, func) {
	      var isChange = event === 'change' &&
	        (func === pullChange || func === pushChange);
	      var isDenied = event === 'denied' &&
	        (func === pullDenied || func === pushDenied);
	      var isPaused = event === 'paused' &&
	        (func === pullPaused || func === pushPaused);
	      var isActive = event === 'active' &&
	        (func === pullActive || func === pushActive);
	
	      if (isChange || isDenied || isPaused || isActive) {
	        if (!(event in removed)) {
	          removed[event] = {};
	        }
	        removed[event][type] = true;
	        if (Object.keys(removed[event]).length === 2) {
	          // both push and pull have asked to be removed
	          self.removeAllListeners(event);
	        }
	      }
	    };
	  }
	
	  if (opts.live) {
	    this.push.on('complete', self.pull.cancel.bind(self.pull));
	    this.pull.on('complete', self.push.cancel.bind(self.push));
	  }
	
	  this.on('newListener', function (event) {
	    if (event === 'change') {
	      self.pull.on('change', pullChange);
	      self.push.on('change', pushChange);
	    } else if (event === 'denied') {
	      self.pull.on('denied', pullDenied);
	      self.push.on('denied', pushDenied);
	    } else if (event === 'active') {
	      self.pull.on('active', pullActive);
	      self.push.on('active', pushActive);
	    } else if (event === 'paused') {
	      self.pull.on('paused', pullPaused);
	      self.push.on('paused', pushPaused);
	    }
	  });
	
	  this.on('removeListener', function (event) {
	    if (event === 'change') {
	      self.pull.removeListener('change', pullChange);
	      self.push.removeListener('change', pushChange);
	    } else if (event === 'denied') {
	      self.pull.removeListener('denied', pullDenied);
	      self.push.removeListener('denied', pushDenied);
	    } else if (event === 'active') {
	      self.pull.removeListener('active', pullActive);
	      self.push.removeListener('active', pushActive);
	    } else if (event === 'paused') {
	      self.pull.removeListener('paused', pullPaused);
	      self.push.removeListener('paused', pushPaused);
	    }
	  });
	
	  this.pull.on('removeListener', removeAll('pull'));
	  this.push.on('removeListener', removeAll('push'));
	
	  var promise = PouchPromise.all([
	    this.push,
	    this.pull
	  ]).then(function (resp) {
	    var out = {
	      push: resp[0],
	      pull: resp[1]
	    };
	    self.emit('complete', out);
	    if (callback) {
	      callback(null, out);
	    }
	    self.removeAllListeners();
	    return out;
	  }, function (err) {
	    self.cancel();
	    if (callback) {
	      // if there's a callback, then the callback can receive
	      // the error event
	      callback(err);
	    } else {
	      // if there's no callback, then we're safe to emit an error
	      // event, which would otherwise throw an unhandled error
	      // due to 'error' being a special event in EventEmitters
	      self.emit('error', err);
	    }
	    self.removeAllListeners();
	    if (callback) {
	      // no sense throwing if we're already emitting an 'error' event
	      throw err;
	    }
	  });
	
	  this.then = function (success, err) {
	    return promise.then(success, err);
	  };
	
	  this.catch = function (err) {
	    return promise.catch(err);
	  };
	}
	
	Sync.prototype.cancel = function () {
	  if (!this.canceled) {
	    this.canceled = true;
	    this.push.cancel();
	    this.pull.cancel();
	  }
	};
	
	function replication(PouchDB) {
	  PouchDB.replicate = replicate;
	  PouchDB.sync = sync;
	}
	
	PouchDB.plugin(IDBPouch)
	  .plugin(WebSqlPouch)
	  .plugin(HttpPouch$1)
	  .plugin(mapreduce)
	  .plugin(replication);
	
	module.exports = PouchDB;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(121), (function() { return this; }())))

/***/ },
/* 121 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 122 */
/***/ function(module, exports) {

	(function() { 
	
	  var slice   = Array.prototype.slice,
	      each    = Array.prototype.forEach;
	
	  var extend = function(obj) {
	    if(typeof obj !== 'object') throw obj + ' is not an object' ;
	
	    var sources = slice.call(arguments, 1); 
	
	    each.call(sources, function(source) {
	      if(source) {
	        for(var prop in source) {
	          if(typeof source[prop] === 'object' && obj[prop]) {
	            extend.call(obj, obj[prop], source[prop]);
	          } else {
	            obj[prop] = source[prop];
	          }
	        } 
	      }
	    });
	
	    return obj;
	  }
	
	  this.extend = extend;
	
	}).call(this);

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * This is the web browser implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */
	
	exports = module.exports = __webpack_require__(124);
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.storage = 'undefined' != typeof chrome
	               && 'undefined' != typeof chrome.storage
	                  ? chrome.storage.local
	                  : localstorage();
	
	/**
	 * Colors.
	 */
	
	exports.colors = [
	  'lightseagreen',
	  'forestgreen',
	  'goldenrod',
	  'dodgerblue',
	  'darkorchid',
	  'crimson'
	];
	
	/**
	 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
	 * and the Firebug extension (any Firefox version) are known
	 * to support "%c" CSS customizations.
	 *
	 * TODO: add a `localStorage` variable to explicitly enable/disable colors
	 */
	
	function useColors() {
	  // is webkit? http://stackoverflow.com/a/16459606/376773
	  return ('WebkitAppearance' in document.documentElement.style) ||
	    // is firebug? http://stackoverflow.com/a/398120/376773
	    (window.console && (console.firebug || (console.exception && console.table))) ||
	    // is firefox >= v31?
	    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
	    (navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31);
	}
	
	/**
	 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	 */
	
	exports.formatters.j = function(v) {
	  return JSON.stringify(v);
	};
	
	
	/**
	 * Colorize log arguments if enabled.
	 *
	 * @api public
	 */
	
	function formatArgs() {
	  var args = arguments;
	  var useColors = this.useColors;
	
	  args[0] = (useColors ? '%c' : '')
	    + this.namespace
	    + (useColors ? ' %c' : ' ')
	    + args[0]
	    + (useColors ? '%c ' : ' ')
	    + '+' + exports.humanize(this.diff);
	
	  if (!useColors) return args;
	
	  var c = 'color: ' + this.color;
	  args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));
	
	  // the final "%c" is somewhat tricky, because there could be other
	  // arguments passed either before or after the %c, so we need to
	  // figure out the correct index to insert the CSS into
	  var index = 0;
	  var lastC = 0;
	  args[0].replace(/%[a-z%]/g, function(match) {
	    if ('%%' === match) return;
	    index++;
	    if ('%c' === match) {
	      // we only are interested in the *last* %c
	      // (the user may have provided their own)
	      lastC = index;
	    }
	  });
	
	  args.splice(lastC, 0, c);
	  return args;
	}
	
	/**
	 * Invokes `console.log()` when available.
	 * No-op when `console.log` is not a "function".
	 *
	 * @api public
	 */
	
	function log() {
	  // this hackery is required for IE8/9, where
	  // the `console.log` function doesn't have 'apply'
	  return 'object' === typeof console
	    && console.log
	    && Function.prototype.apply.call(console.log, console, arguments);
	}
	
	/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */
	
	function save(namespaces) {
	  try {
	    if (null == namespaces) {
	      exports.storage.removeItem('debug');
	    } else {
	      exports.storage.debug = namespaces;
	    }
	  } catch(e) {}
	}
	
	/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */
	
	function load() {
	  var r;
	  try {
	    r = exports.storage.debug;
	  } catch(e) {}
	  return r;
	}
	
	/**
	 * Enable namespaces listed in `localStorage.debug` initially.
	 */
	
	exports.enable(load());
	
	/**
	 * Localstorage attempts to return the localstorage.
	 *
	 * This is necessary because safari throws
	 * when a user disables cookies/localstorage
	 * and you attempt to access it.
	 *
	 * @return {LocalStorage}
	 * @api private
	 */
	
	function localstorage(){
	  try {
	    return window.localStorage;
	  } catch (e) {}
	}


/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */
	
	exports = module.exports = debug;
	exports.coerce = coerce;
	exports.disable = disable;
	exports.enable = enable;
	exports.enabled = enabled;
	exports.humanize = __webpack_require__(125);
	
	/**
	 * The currently active debug mode names, and names to skip.
	 */
	
	exports.names = [];
	exports.skips = [];
	
	/**
	 * Map of special "%n" handling functions, for the debug "format" argument.
	 *
	 * Valid key names are a single, lowercased letter, i.e. "n".
	 */
	
	exports.formatters = {};
	
	/**
	 * Previously assigned color.
	 */
	
	var prevColor = 0;
	
	/**
	 * Previous log timestamp.
	 */
	
	var prevTime;
	
	/**
	 * Select a color.
	 *
	 * @return {Number}
	 * @api private
	 */
	
	function selectColor() {
	  return exports.colors[prevColor++ % exports.colors.length];
	}
	
	/**
	 * Create a debugger with the given `namespace`.
	 *
	 * @param {String} namespace
	 * @return {Function}
	 * @api public
	 */
	
	function debug(namespace) {
	
	  // define the `disabled` version
	  function disabled() {
	  }
	  disabled.enabled = false;
	
	  // define the `enabled` version
	  function enabled() {
	
	    var self = enabled;
	
	    // set `diff` timestamp
	    var curr = +new Date();
	    var ms = curr - (prevTime || curr);
	    self.diff = ms;
	    self.prev = prevTime;
	    self.curr = curr;
	    prevTime = curr;
	
	    // add the `color` if not set
	    if (null == self.useColors) self.useColors = exports.useColors();
	    if (null == self.color && self.useColors) self.color = selectColor();
	
	    var args = Array.prototype.slice.call(arguments);
	
	    args[0] = exports.coerce(args[0]);
	
	    if ('string' !== typeof args[0]) {
	      // anything else let's inspect with %o
	      args = ['%o'].concat(args);
	    }
	
	    // apply any `formatters` transformations
	    var index = 0;
	    args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
	      // if we encounter an escaped % then don't increase the array index
	      if (match === '%%') return match;
	      index++;
	      var formatter = exports.formatters[format];
	      if ('function' === typeof formatter) {
	        var val = args[index];
	        match = formatter.call(self, val);
	
	        // now we need to remove `args[index]` since it's inlined in the `format`
	        args.splice(index, 1);
	        index--;
	      }
	      return match;
	    });
	
	    if ('function' === typeof exports.formatArgs) {
	      args = exports.formatArgs.apply(self, args);
	    }
	    var logFn = enabled.log || exports.log || console.log.bind(console);
	    logFn.apply(self, args);
	  }
	  enabled.enabled = true;
	
	  var fn = exports.enabled(namespace) ? enabled : disabled;
	
	  fn.namespace = namespace;
	
	  return fn;
	}
	
	/**
	 * Enables a debug mode by namespaces. This can include modes
	 * separated by a colon and wildcards.
	 *
	 * @param {String} namespaces
	 * @api public
	 */
	
	function enable(namespaces) {
	  exports.save(namespaces);
	
	  var split = (namespaces || '').split(/[\s,]+/);
	  var len = split.length;
	
	  for (var i = 0; i < len; i++) {
	    if (!split[i]) continue; // ignore empty strings
	    namespaces = split[i].replace(/\*/g, '.*?');
	    if (namespaces[0] === '-') {
	      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
	    } else {
	      exports.names.push(new RegExp('^' + namespaces + '$'));
	    }
	  }
	}
	
	/**
	 * Disable debug output.
	 *
	 * @api public
	 */
	
	function disable() {
	  exports.enable('');
	}
	
	/**
	 * Returns true if the given mode name is enabled, false otherwise.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */
	
	function enabled(name) {
	  var i, len;
	  for (i = 0, len = exports.skips.length; i < len; i++) {
	    if (exports.skips[i].test(name)) {
	      return false;
	    }
	  }
	  for (i = 0, len = exports.names.length; i < len; i++) {
	    if (exports.names[i].test(name)) {
	      return true;
	    }
	  }
	  return false;
	}
	
	/**
	 * Coerce `val`.
	 *
	 * @param {Mixed} val
	 * @return {Mixed}
	 * @api private
	 */
	
	function coerce(val) {
	  if (val instanceof Error) return val.stack || val.message;
	  return val;
	}


/***/ },
/* 125 */
/***/ function(module, exports) {

	/**
	 * Helpers.
	 */
	
	var s = 1000;
	var m = s * 60;
	var h = m * 60;
	var d = h * 24;
	var y = d * 365.25;
	
	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} options
	 * @return {String|Number}
	 * @api public
	 */
	
	module.exports = function(val, options){
	  options = options || {};
	  if ('string' == typeof val) return parse(val);
	  return options.long
	    ? long(val)
	    : short(val);
	};
	
	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */
	
	function parse(str) {
	  str = '' + str;
	  if (str.length > 10000) return;
	  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
	  if (!match) return;
	  var n = parseFloat(match[1]);
	  var type = (match[2] || 'ms').toLowerCase();
	  switch (type) {
	    case 'years':
	    case 'year':
	    case 'yrs':
	    case 'yr':
	    case 'y':
	      return n * y;
	    case 'days':
	    case 'day':
	    case 'd':
	      return n * d;
	    case 'hours':
	    case 'hour':
	    case 'hrs':
	    case 'hr':
	    case 'h':
	      return n * h;
	    case 'minutes':
	    case 'minute':
	    case 'mins':
	    case 'min':
	    case 'm':
	      return n * m;
	    case 'seconds':
	    case 'second':
	    case 'secs':
	    case 'sec':
	    case 's':
	      return n * s;
	    case 'milliseconds':
	    case 'millisecond':
	    case 'msecs':
	    case 'msec':
	    case 'ms':
	      return n;
	  }
	}
	
	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */
	
	function short(ms) {
	  if (ms >= d) return Math.round(ms / d) + 'd';
	  if (ms >= h) return Math.round(ms / h) + 'h';
	  if (ms >= m) return Math.round(ms / m) + 'm';
	  if (ms >= s) return Math.round(ms / s) + 's';
	  return ms + 'ms';
	}
	
	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */
	
	function long(ms) {
	  return plural(ms, d, 'day')
	    || plural(ms, h, 'hour')
	    || plural(ms, m, 'minute')
	    || plural(ms, s, 'second')
	    || ms + ' ms';
	}
	
	/**
	 * Pluralization helper.
	 */
	
	function plural(ms, n, name) {
	  if (ms < n) return;
	  if (ms < n * 1.5) return Math.floor(ms / n) + ' ' + name;
	  return Math.ceil(ms / n) + ' ' + name + 's';
	}


/***/ },
/* 126 */
/***/ function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	var immediate = __webpack_require__(128);
	
	/* istanbul ignore next */
	function INTERNAL() {}
	
	var handlers = {};
	
	var REJECTED = ['REJECTED'];
	var FULFILLED = ['FULFILLED'];
	var PENDING = ['PENDING'];
	/* istanbul ignore else */
	if (!process.browser) {
	  // in which we actually take advantage of JS scoping
	  var UNHANDLED = ['UNHANDLED'];
	}
	
	module.exports = Promise;
	
	function Promise(resolver) {
	  if (typeof resolver !== 'function') {
	    throw new TypeError('resolver must be a function');
	  }
	  this.state = PENDING;
	  this.queue = [];
	  this.outcome = void 0;
	  /* istanbul ignore else */
	  if (!process.browser) {
	    this.handled = UNHANDLED;
	  }
	  if (resolver !== INTERNAL) {
	    safelyResolveThenable(this, resolver);
	  }
	}
	
	Promise.prototype.catch = function (onRejected) {
	  return this.then(null, onRejected);
	};
	Promise.prototype.then = function (onFulfilled, onRejected) {
	  if (typeof onFulfilled !== 'function' && this.state === FULFILLED ||
	    typeof onRejected !== 'function' && this.state === REJECTED) {
	    return this;
	  }
	  var promise = new this.constructor(INTERNAL);
	  /* istanbul ignore else */
	  if (!process.browser) {
	    if (this.handled === UNHANDLED) {
	      this.handled = null;
	    }
	  }
	  if (this.state !== PENDING) {
	    var resolver = this.state === FULFILLED ? onFulfilled : onRejected;
	    unwrap(promise, resolver, this.outcome);
	  } else {
	    this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
	  }
	
	  return promise;
	};
	function QueueItem(promise, onFulfilled, onRejected) {
	  this.promise = promise;
	  if (typeof onFulfilled === 'function') {
	    this.onFulfilled = onFulfilled;
	    this.callFulfilled = this.otherCallFulfilled;
	  }
	  if (typeof onRejected === 'function') {
	    this.onRejected = onRejected;
	    this.callRejected = this.otherCallRejected;
	  }
	}
	QueueItem.prototype.callFulfilled = function (value) {
	  handlers.resolve(this.promise, value);
	};
	QueueItem.prototype.otherCallFulfilled = function (value) {
	  unwrap(this.promise, this.onFulfilled, value);
	};
	QueueItem.prototype.callRejected = function (value) {
	  handlers.reject(this.promise, value);
	};
	QueueItem.prototype.otherCallRejected = function (value) {
	  unwrap(this.promise, this.onRejected, value);
	};
	
	function unwrap(promise, func, value) {
	  immediate(function () {
	    var returnValue;
	    try {
	      returnValue = func(value);
	    } catch (e) {
	      return handlers.reject(promise, e);
	    }
	    if (returnValue === promise) {
	      handlers.reject(promise, new TypeError('Cannot resolve promise with itself'));
	    } else {
	      handlers.resolve(promise, returnValue);
	    }
	  });
	}
	
	handlers.resolve = function (self, value) {
	  var result = tryCatch(getThen, value);
	  if (result.status === 'error') {
	    return handlers.reject(self, result.value);
	  }
	  var thenable = result.value;
	
	  if (thenable) {
	    safelyResolveThenable(self, thenable);
	  } else {
	    self.state = FULFILLED;
	    self.outcome = value;
	    var i = -1;
	    var len = self.queue.length;
	    while (++i < len) {
	      self.queue[i].callFulfilled(value);
	    }
	  }
	  return self;
	};
	handlers.reject = function (self, error) {
	  self.state = REJECTED;
	  self.outcome = error;
	  /* istanbul ignore else */
	  if (!process.browser) {
	    if (self.handled === UNHANDLED) {
	      immediate(function () {
	        if (self.handled === UNHANDLED) {
	          process.emit('unhandledRejection', error, self);
	        }
	      });
	    }
	  }
	  var i = -1;
	  var len = self.queue.length;
	  while (++i < len) {
	    self.queue[i].callRejected(error);
	  }
	  return self;
	};
	
	function getThen(obj) {
	  // Make sure we only access the accessor once as required by the spec
	  var then = obj && obj.then;
	  if (obj && typeof obj === 'object' && typeof then === 'function') {
	    return function appyThen() {
	      then.apply(obj, arguments);
	    };
	  }
	}
	
	function safelyResolveThenable(self, thenable) {
	  // Either fulfill, reject or reject with error
	  var called = false;
	  function onError(value) {
	    if (called) {
	      return;
	    }
	    called = true;
	    handlers.reject(self, value);
	  }
	
	  function onSuccess(value) {
	    if (called) {
	      return;
	    }
	    called = true;
	    handlers.resolve(self, value);
	  }
	
	  function tryToUnwrap() {
	    thenable(onSuccess, onError);
	  }
	
	  var result = tryCatch(tryToUnwrap);
	  if (result.status === 'error') {
	    onError(result.value);
	  }
	}
	
	function tryCatch(func, value) {
	  var out = {};
	  try {
	    out.value = func(value);
	    out.status = 'success';
	  } catch (e) {
	    out.status = 'error';
	    out.value = e;
	  }
	  return out;
	}
	
	Promise.resolve = resolve;
	function resolve(value) {
	  if (value instanceof this) {
	    return value;
	  }
	  return handlers.resolve(new this(INTERNAL), value);
	}
	
	Promise.reject = reject;
	function reject(reason) {
	  var promise = new this(INTERNAL);
	  return handlers.reject(promise, reason);
	}
	
	Promise.all = all;
	function all(iterable) {
	  var self = this;
	  if (Object.prototype.toString.call(iterable) !== '[object Array]') {
	    return this.reject(new TypeError('must be an array'));
	  }
	
	  var len = iterable.length;
	  var called = false;
	  if (!len) {
	    return this.resolve([]);
	  }
	
	  var values = new Array(len);
	  var resolved = 0;
	  var i = -1;
	  var promise = new this(INTERNAL);
	
	  while (++i < len) {
	    allResolver(iterable[i], i);
	  }
	  return promise;
	  function allResolver(value, i) {
	    self.resolve(value).then(resolveFromAll, function (error) {
	      if (!called) {
	        called = true;
	        handlers.reject(promise, error);
	      }
	    });
	    function resolveFromAll(outValue) {
	      values[i] = outValue;
	      if (++resolved === len && !called) {
	        called = true;
	        handlers.resolve(promise, values);
	      }
	    }
	  }
	}
	
	Promise.race = race;
	function race(iterable) {
	  var self = this;
	  if (Object.prototype.toString.call(iterable) !== '[object Array]') {
	    return this.reject(new TypeError('must be an array'));
	  }
	
	  var len = iterable.length;
	  var called = false;
	  if (!len) {
	    return this.resolve([]);
	  }
	
	  var i = -1;
	  var promise = new this(INTERNAL);
	
	  while (++i < len) {
	    resolver(iterable[i]);
	  }
	  return promise;
	  function resolver(value) {
	    self.resolve(value).then(function (response) {
	      if (!called) {
	        called = true;
	        handlers.resolve(promise, response);
	      }
	    }, function (error) {
	      if (!called) {
	        called = true;
	        handlers.reject(promise, error);
	      }
	    });
	  }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(121)))

/***/ },
/* 128 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	var Mutation = global.MutationObserver || global.WebKitMutationObserver;
	
	var scheduleDrain;
	
	{
	  if (Mutation) {
	    var called = 0;
	    var observer = new Mutation(nextTick);
	    var element = global.document.createTextNode('');
	    observer.observe(element, {
	      characterData: true
	    });
	    scheduleDrain = function () {
	      element.data = (called = ++called % 2);
	    };
	  } else if (!global.setImmediate && typeof global.MessageChannel !== 'undefined') {
	    var channel = new global.MessageChannel();
	    channel.port1.onmessage = nextTick;
	    scheduleDrain = function () {
	      channel.port2.postMessage(0);
	    };
	  } else if ('document' in global && 'onreadystatechange' in global.document.createElement('script')) {
	    scheduleDrain = function () {
	
	      // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
	      // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
	      var scriptEl = global.document.createElement('script');
	      scriptEl.onreadystatechange = function () {
	        nextTick();
	
	        scriptEl.onreadystatechange = null;
	        scriptEl.parentNode.removeChild(scriptEl);
	        scriptEl = null;
	      };
	      global.document.documentElement.appendChild(scriptEl);
	    };
	  } else {
	    scheduleDrain = function () {
	      setTimeout(nextTick, 0);
	    };
	  }
	}
	
	var draining;
	var queue = [];
	//named nextTick for less confusing stack traces
	function nextTick() {
	  draining = true;
	  var i, oldQueue;
	  var len = queue.length;
	  while (len) {
	    oldQueue = queue;
	    queue = [];
	    i = -1;
	    while (++i < len) {
	      oldQueue[i]();
	    }
	    len = queue.length;
	  }
	  draining = false;
	}
	
	module.exports = immediate;
	function immediate(task) {
	  if (queue.push(task) === 1 && !draining) {
	    scheduleDrain();
	  }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 129 */
/***/ function(module, exports) {

	'use strict';
	exports.Map = LazyMap; // TODO: use ES6 map
	exports.Set = LazySet; // TODO: use ES6 set
	// based on https://github.com/montagejs/collections
	function LazyMap() {
	  this.store = {};
	}
	LazyMap.prototype.mangle = function (key) {
	  if (typeof key !== "string") {
	    throw new TypeError("key must be a string but Got " + key);
	  }
	  return '$' + key;
	};
	LazyMap.prototype.unmangle = function (key) {
	  return key.substring(1);
	};
	LazyMap.prototype.get = function (key) {
	  var mangled = this.mangle(key);
	  if (mangled in this.store) {
	    return this.store[mangled];
	  }
	  return void 0;
	};
	LazyMap.prototype.set = function (key, value) {
	  var mangled = this.mangle(key);
	  this.store[mangled] = value;
	  return true;
	};
	LazyMap.prototype.has = function (key) {
	  var mangled = this.mangle(key);
	  return mangled in this.store;
	};
	LazyMap.prototype.delete = function (key) {
	  var mangled = this.mangle(key);
	  if (mangled in this.store) {
	    delete this.store[mangled];
	    return true;
	  }
	  return false;
	};
	LazyMap.prototype.forEach = function (cb) {
	  var keys = Object.keys(this.store);
	  for (var i = 0, len = keys.length; i < len; i++) {
	    var key = keys[i];
	    var value = this.store[key];
	    key = this.unmangle(key);
	    cb(value, key);
	  }
	};
	
	function LazySet(array) {
	  this.store = new LazyMap();
	
	  // init with an array
	  if (array && Array.isArray(array)) {
	    for (var i = 0, len = array.length; i < len; i++) {
	      this.add(array[i]);
	    }
	  }
	}
	LazySet.prototype.add = function (key) {
	  return this.store.set(key, true);
	};
	LazySet.prototype.has = function (key) {
	  return this.store.has(key);
	};
	LazySet.prototype.delete = function (key) {
	  return this.store.delete(key);
	};


/***/ },
/* 130 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = argsArray;
	
	function argsArray(fun) {
	  return function () {
	    var len = arguments.length;
	    if (len) {
	      var args = [];
	      var i = -1;
	      while (++i < len) {
	        args[i] = arguments[i];
	      }
	      return fun.call(this, args);
	    } else {
	      return fun.call(this, []);
	    }
	  };
	}

/***/ },
/* 131 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;
	
	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;
	
	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;
	
	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;
	
	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};
	
	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;
	
	  if (!this._events)
	    this._events = {};
	
	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      } else {
	        // At least give some kind of context to the user
	        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
	        err.context = er;
	        throw err;
	      }
	    }
	  }
	
	  handler = this._events[type];
	
	  if (isUndefined(handler))
	    return false;
	
	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }
	
	  return true;
	};
	
	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events)
	    this._events = {};
	
	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);
	
	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];
	
	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }
	
	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.on = EventEmitter.prototype.addListener;
	
	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  var fired = false;
	
	  function g() {
	    this.removeListener(type, g);
	
	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }
	
	  g.listener = listener;
	  this.on(type, g);
	
	  return this;
	};
	
	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events || !this._events[type])
	    return this;
	
	  list = this._events[type];
	  length = list.length;
	  position = -1;
	
	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	
	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }
	
	    if (position < 0)
	      return this;
	
	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }
	
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;
	
	  if (!this._events)
	    return this;
	
	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }
	
	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }
	
	  listeners = this._events[type];
	
	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];
	
	  return this;
	};
	
	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};
	
	EventEmitter.prototype.listenerCount = function(type) {
	  if (this._events) {
	    var evlistener = this._events[type];
	
	    if (isFunction(evlistener))
	      return 1;
	    else if (evlistener)
	      return evlistener.length;
	  }
	  return 0;
	};
	
	EventEmitter.listenerCount = function(emitter, type) {
	  return emitter.listenerCount(type);
	};
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	
	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 132 */
/***/ function(module, exports) {

	// Generated by CoffeeScript 1.9.2
	(function() {
	  var hasProp = {}.hasOwnProperty,
	    slice = [].slice;
	
	  module.exports = function(source, scope) {
	    var key, keys, value, values;
	    keys = [];
	    values = [];
	    for (key in scope) {
	      if (!hasProp.call(scope, key)) continue;
	      value = scope[key];
	      if (key === 'this') {
	        continue;
	      }
	      keys.push(key);
	      values.push(value);
	    }
	    return Function.apply(null, slice.call(keys).concat([source])).apply(scope["this"], values);
	  };
	
	}).call(this);


/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	(function (factory) {
	    if (true) {
	        // Node/CommonJS
	        module.exports = factory();
	    } else if (typeof define === 'function' && define.amd) {
	        // AMD
	        define(factory);
	    } else {
	        // Browser globals (with support for web workers)
	        var glob;
	
	        try {
	            glob = window;
	        } catch (e) {
	            glob = self;
	        }
	
	        glob.SparkMD5 = factory();
	    }
	}(function (undefined) {
	
	    'use strict';
	
	    /*
	     * Fastest md5 implementation around (JKM md5).
	     * Credits: Joseph Myers
	     *
	     * @see http://www.myersdaily.org/joseph/javascript/md5-text.html
	     * @see http://jsperf.com/md5-shootout/7
	     */
	
	    /* this function is much faster,
	      so if possible we use it. Some IEs
	      are the only ones I know of that
	      need the idiotic second function,
	      generated by an if clause.  */
	    var add32 = function (a, b) {
	        return (a + b) & 0xFFFFFFFF;
	    },
	        hex_chr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
	
	
	    function cmn(q, a, b, x, s, t) {
	        a = add32(add32(a, q), add32(x, t));
	        return add32((a << s) | (a >>> (32 - s)), b);
	    }
	
	    function ff(a, b, c, d, x, s, t) {
	        return cmn((b & c) | ((~b) & d), a, b, x, s, t);
	    }
	
	    function gg(a, b, c, d, x, s, t) {
	        return cmn((b & d) | (c & (~d)), a, b, x, s, t);
	    }
	
	    function hh(a, b, c, d, x, s, t) {
	        return cmn(b ^ c ^ d, a, b, x, s, t);
	    }
	
	    function ii(a, b, c, d, x, s, t) {
	        return cmn(c ^ (b | (~d)), a, b, x, s, t);
	    }
	
	    function md5cycle(x, k) {
	        var a = x[0],
	            b = x[1],
	            c = x[2],
	            d = x[3];
	
	        a = ff(a, b, c, d, k[0], 7, -680876936);
	        d = ff(d, a, b, c, k[1], 12, -389564586);
	        c = ff(c, d, a, b, k[2], 17, 606105819);
	        b = ff(b, c, d, a, k[3], 22, -1044525330);
	        a = ff(a, b, c, d, k[4], 7, -176418897);
	        d = ff(d, a, b, c, k[5], 12, 1200080426);
	        c = ff(c, d, a, b, k[6], 17, -1473231341);
	        b = ff(b, c, d, a, k[7], 22, -45705983);
	        a = ff(a, b, c, d, k[8], 7, 1770035416);
	        d = ff(d, a, b, c, k[9], 12, -1958414417);
	        c = ff(c, d, a, b, k[10], 17, -42063);
	        b = ff(b, c, d, a, k[11], 22, -1990404162);
	        a = ff(a, b, c, d, k[12], 7, 1804603682);
	        d = ff(d, a, b, c, k[13], 12, -40341101);
	        c = ff(c, d, a, b, k[14], 17, -1502002290);
	        b = ff(b, c, d, a, k[15], 22, 1236535329);
	
	        a = gg(a, b, c, d, k[1], 5, -165796510);
	        d = gg(d, a, b, c, k[6], 9, -1069501632);
	        c = gg(c, d, a, b, k[11], 14, 643717713);
	        b = gg(b, c, d, a, k[0], 20, -373897302);
	        a = gg(a, b, c, d, k[5], 5, -701558691);
	        d = gg(d, a, b, c, k[10], 9, 38016083);
	        c = gg(c, d, a, b, k[15], 14, -660478335);
	        b = gg(b, c, d, a, k[4], 20, -405537848);
	        a = gg(a, b, c, d, k[9], 5, 568446438);
	        d = gg(d, a, b, c, k[14], 9, -1019803690);
	        c = gg(c, d, a, b, k[3], 14, -187363961);
	        b = gg(b, c, d, a, k[8], 20, 1163531501);
	        a = gg(a, b, c, d, k[13], 5, -1444681467);
	        d = gg(d, a, b, c, k[2], 9, -51403784);
	        c = gg(c, d, a, b, k[7], 14, 1735328473);
	        b = gg(b, c, d, a, k[12], 20, -1926607734);
	
	        a = hh(a, b, c, d, k[5], 4, -378558);
	        d = hh(d, a, b, c, k[8], 11, -2022574463);
	        c = hh(c, d, a, b, k[11], 16, 1839030562);
	        b = hh(b, c, d, a, k[14], 23, -35309556);
	        a = hh(a, b, c, d, k[1], 4, -1530992060);
	        d = hh(d, a, b, c, k[4], 11, 1272893353);
	        c = hh(c, d, a, b, k[7], 16, -155497632);
	        b = hh(b, c, d, a, k[10], 23, -1094730640);
	        a = hh(a, b, c, d, k[13], 4, 681279174);
	        d = hh(d, a, b, c, k[0], 11, -358537222);
	        c = hh(c, d, a, b, k[3], 16, -722521979);
	        b = hh(b, c, d, a, k[6], 23, 76029189);
	        a = hh(a, b, c, d, k[9], 4, -640364487);
	        d = hh(d, a, b, c, k[12], 11, -421815835);
	        c = hh(c, d, a, b, k[15], 16, 530742520);
	        b = hh(b, c, d, a, k[2], 23, -995338651);
	
	        a = ii(a, b, c, d, k[0], 6, -198630844);
	        d = ii(d, a, b, c, k[7], 10, 1126891415);
	        c = ii(c, d, a, b, k[14], 15, -1416354905);
	        b = ii(b, c, d, a, k[5], 21, -57434055);
	        a = ii(a, b, c, d, k[12], 6, 1700485571);
	        d = ii(d, a, b, c, k[3], 10, -1894986606);
	        c = ii(c, d, a, b, k[10], 15, -1051523);
	        b = ii(b, c, d, a, k[1], 21, -2054922799);
	        a = ii(a, b, c, d, k[8], 6, 1873313359);
	        d = ii(d, a, b, c, k[15], 10, -30611744);
	        c = ii(c, d, a, b, k[6], 15, -1560198380);
	        b = ii(b, c, d, a, k[13], 21, 1309151649);
	        a = ii(a, b, c, d, k[4], 6, -145523070);
	        d = ii(d, a, b, c, k[11], 10, -1120210379);
	        c = ii(c, d, a, b, k[2], 15, 718787259);
	        b = ii(b, c, d, a, k[9], 21, -343485551);
	
	        x[0] = add32(a, x[0]);
	        x[1] = add32(b, x[1]);
	        x[2] = add32(c, x[2]);
	        x[3] = add32(d, x[3]);
	    }
	
	    function md5blk(s) {
	        var md5blks = [],
	            i; /* Andy King said do it this way. */
	
	        for (i = 0; i < 64; i += 4) {
	            md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24);
	        }
	        return md5blks;
	    }
	
	    function md5blk_array(a) {
	        var md5blks = [],
	            i; /* Andy King said do it this way. */
	
	        for (i = 0; i < 64; i += 4) {
	            md5blks[i >> 2] = a[i] + (a[i + 1] << 8) + (a[i + 2] << 16) + (a[i + 3] << 24);
	        }
	        return md5blks;
	    }
	
	    function md51(s) {
	        var n = s.length,
	            state = [1732584193, -271733879, -1732584194, 271733878],
	            i,
	            length,
	            tail,
	            tmp,
	            lo,
	            hi;
	
	        for (i = 64; i <= n; i += 64) {
	            md5cycle(state, md5blk(s.substring(i - 64, i)));
	        }
	        s = s.substring(i - 64);
	        length = s.length;
	        tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	        for (i = 0; i < length; i += 1) {
	            tail[i >> 2] |= s.charCodeAt(i) << ((i % 4) << 3);
	        }
	        tail[i >> 2] |= 0x80 << ((i % 4) << 3);
	        if (i > 55) {
	            md5cycle(state, tail);
	            for (i = 0; i < 16; i += 1) {
	                tail[i] = 0;
	            }
	        }
	
	        // Beware that the final length might not fit in 32 bits so we take care of that
	        tmp = n * 8;
	        tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
	        lo = parseInt(tmp[2], 16);
	        hi = parseInt(tmp[1], 16) || 0;
	
	        tail[14] = lo;
	        tail[15] = hi;
	
	        md5cycle(state, tail);
	        return state;
	    }
	
	    function md51_array(a) {
	        var n = a.length,
	            state = [1732584193, -271733879, -1732584194, 271733878],
	            i,
	            length,
	            tail,
	            tmp,
	            lo,
	            hi;
	
	        for (i = 64; i <= n; i += 64) {
	            md5cycle(state, md5blk_array(a.subarray(i - 64, i)));
	        }
	
	        // Not sure if it is a bug, however IE10 will always produce a sub array of length 1
	        // containing the last element of the parent array if the sub array specified starts
	        // beyond the length of the parent array - weird.
	        // https://connect.microsoft.com/IE/feedback/details/771452/typed-array-subarray-issue
	        a = (i - 64) < n ? a.subarray(i - 64) : new Uint8Array(0);
	
	        length = a.length;
	        tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	        for (i = 0; i < length; i += 1) {
	            tail[i >> 2] |= a[i] << ((i % 4) << 3);
	        }
	
	        tail[i >> 2] |= 0x80 << ((i % 4) << 3);
	        if (i > 55) {
	            md5cycle(state, tail);
	            for (i = 0; i < 16; i += 1) {
	                tail[i] = 0;
	            }
	        }
	
	        // Beware that the final length might not fit in 32 bits so we take care of that
	        tmp = n * 8;
	        tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
	        lo = parseInt(tmp[2], 16);
	        hi = parseInt(tmp[1], 16) || 0;
	
	        tail[14] = lo;
	        tail[15] = hi;
	
	        md5cycle(state, tail);
	
	        return state;
	    }
	
	    function rhex(n) {
	        var s = '',
	            j;
	        for (j = 0; j < 4; j += 1) {
	            s += hex_chr[(n >> (j * 8 + 4)) & 0x0F] + hex_chr[(n >> (j * 8)) & 0x0F];
	        }
	        return s;
	    }
	
	    function hex(x) {
	        var i;
	        for (i = 0; i < x.length; i += 1) {
	            x[i] = rhex(x[i]);
	        }
	        return x.join('');
	    }
	
	    // In some cases the fast add32 function cannot be used..
	    if (hex(md51('hello')) !== '5d41402abc4b2a76b9719d911017c592') {
	        add32 = function (x, y) {
	            var lsw = (x & 0xFFFF) + (y & 0xFFFF),
	                msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	            return (msw << 16) | (lsw & 0xFFFF);
	        };
	    }
	
	    // ---------------------------------------------------
	
	    /**
	     * ArrayBuffer slice polyfill.
	     *
	     * @see https://github.com/ttaubert/node-arraybuffer-slice
	     */
	
	    if (typeof ArrayBuffer !== 'undefined' && !ArrayBuffer.prototype.slice) {
	        (function () {
	            function clamp(val, length) {
	                val = (val | 0) || 0;
	
	                if (val < 0) {
	                    return Math.max(val + length, 0);
	                }
	
	                return Math.min(val, length);
	            }
	
	            ArrayBuffer.prototype.slice = function (from, to) {
	                var length = this.byteLength,
	                    begin = clamp(from, length),
	                    end = length,
	                    num,
	                    target,
	                    targetArray,
	                    sourceArray;
	
	                if (to !== undefined) {
	                    end = clamp(to, length);
	                }
	
	                if (begin > end) {
	                    return new ArrayBuffer(0);
	                }
	
	                num = end - begin;
	                target = new ArrayBuffer(num);
	                targetArray = new Uint8Array(target);
	
	                sourceArray = new Uint8Array(this, begin, num);
	                targetArray.set(sourceArray);
	
	                return target;
	            };
	        })();
	    }
	
	    // ---------------------------------------------------
	
	    /**
	     * Helpers.
	     */
	
	    function toUtf8(str) {
	        if (/[\u0080-\uFFFF]/.test(str)) {
	            str = unescape(encodeURIComponent(str));
	        }
	
	        return str;
	    }
	
	    function utf8Str2ArrayBuffer(str, returnUInt8Array) {
	        var length = str.length,
	           buff = new ArrayBuffer(length),
	           arr = new Uint8Array(buff),
	           i;
	
	        for (i = 0; i < length; i += 1) {
	            arr[i] = str.charCodeAt(i);
	        }
	
	        return returnUInt8Array ? arr : buff;
	    }
	
	    function arrayBuffer2Utf8Str(buff) {
	        return String.fromCharCode.apply(null, new Uint8Array(buff));
	    }
	
	    function concatenateArrayBuffers(first, second, returnUInt8Array) {
	        var result = new Uint8Array(first.byteLength + second.byteLength);
	
	        result.set(new Uint8Array(first));
	        result.set(new Uint8Array(second), first.byteLength);
	
	        return returnUInt8Array ? result : result.buffer;
	    }
	
	    function hexToBinaryString(hex) {
	        var bytes = [],
	            length = hex.length,
	            x;
	
	        for (x = 0; x < length - 1; x += 2) {
	            bytes.push(parseInt(hex.substr(x, 2), 16));
	        }
	
	        return String.fromCharCode.apply(String, bytes);
	    }
	
	    // ---------------------------------------------------
	
	    /**
	     * SparkMD5 OOP implementation.
	     *
	     * Use this class to perform an incremental md5, otherwise use the
	     * static methods instead.
	     */
	
	    function SparkMD5() {
	        // call reset to init the instance
	        this.reset();
	    }
	
	    /**
	     * Appends a string.
	     * A conversion will be applied if an utf8 string is detected.
	     *
	     * @param {String} str The string to be appended
	     *
	     * @return {SparkMD5} The instance itself
	     */
	    SparkMD5.prototype.append = function (str) {
	        // Converts the string to utf8 bytes if necessary
	        // Then append as binary
	        this.appendBinary(toUtf8(str));
	
	        return this;
	    };
	
	    /**
	     * Appends a binary string.
	     *
	     * @param {String} contents The binary string to be appended
	     *
	     * @return {SparkMD5} The instance itself
	     */
	    SparkMD5.prototype.appendBinary = function (contents) {
	        this._buff += contents;
	        this._length += contents.length;
	
	        var length = this._buff.length,
	            i;
	
	        for (i = 64; i <= length; i += 64) {
	            md5cycle(this._hash, md5blk(this._buff.substring(i - 64, i)));
	        }
	
	        this._buff = this._buff.substring(i - 64);
	
	        return this;
	    };
	
	    /**
	     * Finishes the incremental computation, reseting the internal state and
	     * returning the result.
	     *
	     * @param {Boolean} raw True to get the raw string, false to get the hex string
	     *
	     * @return {String} The result
	     */
	    SparkMD5.prototype.end = function (raw) {
	        var buff = this._buff,
	            length = buff.length,
	            i,
	            tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	            ret;
	
	        for (i = 0; i < length; i += 1) {
	            tail[i >> 2] |= buff.charCodeAt(i) << ((i % 4) << 3);
	        }
	
	        this._finish(tail, length);
	        ret = hex(this._hash);
	
	        if (raw) {
	            ret = hexToBinaryString(ret);
	        }
	
	        this.reset();
	
	        return ret;
	    };
	
	    /**
	     * Resets the internal state of the computation.
	     *
	     * @return {SparkMD5} The instance itself
	     */
	    SparkMD5.prototype.reset = function () {
	        this._buff = '';
	        this._length = 0;
	        this._hash = [1732584193, -271733879, -1732584194, 271733878];
	
	        return this;
	    };
	
	    /**
	     * Gets the internal state of the computation.
	     *
	     * @return {Object} The state
	     */
	    SparkMD5.prototype.getState = function () {
	        return {
	            buff: this._buff,
	            length: this._length,
	            hash: this._hash
	        };
	    };
	
	    /**
	     * Gets the internal state of the computation.
	     *
	     * @param {Object} state The state
	     *
	     * @return {SparkMD5} The instance itself
	     */
	    SparkMD5.prototype.setState = function (state) {
	        this._buff = state.buff;
	        this._length = state.length;
	        this._hash = state.hash;
	
	        return this;
	    };
	
	    /**
	     * Releases memory used by the incremental buffer and other additional
	     * resources. If you plan to use the instance again, use reset instead.
	     */
	    SparkMD5.prototype.destroy = function () {
	        delete this._hash;
	        delete this._buff;
	        delete this._length;
	    };
	
	    /**
	     * Finish the final calculation based on the tail.
	     *
	     * @param {Array}  tail   The tail (will be modified)
	     * @param {Number} length The length of the remaining buffer
	     */
	    SparkMD5.prototype._finish = function (tail, length) {
	        var i = length,
	            tmp,
	            lo,
	            hi;
	
	        tail[i >> 2] |= 0x80 << ((i % 4) << 3);
	        if (i > 55) {
	            md5cycle(this._hash, tail);
	            for (i = 0; i < 16; i += 1) {
	                tail[i] = 0;
	            }
	        }
	
	        // Do the final computation based on the tail and length
	        // Beware that the final length may not fit in 32 bits so we take care of that
	        tmp = this._length * 8;
	        tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
	        lo = parseInt(tmp[2], 16);
	        hi = parseInt(tmp[1], 16) || 0;
	
	        tail[14] = lo;
	        tail[15] = hi;
	        md5cycle(this._hash, tail);
	    };
	
	    /**
	     * Performs the md5 hash on a string.
	     * A conversion will be applied if utf8 string is detected.
	     *
	     * @param {String}  str The string
	     * @param {Boolean} raw True to get the raw string, false to get the hex string
	     *
	     * @return {String} The result
	     */
	    SparkMD5.hash = function (str, raw) {
	        // Converts the string to utf8 bytes if necessary
	        // Then compute it using the binary function
	        return SparkMD5.hashBinary(toUtf8(str), raw);
	    };
	
	    /**
	     * Performs the md5 hash on a binary string.
	     *
	     * @param {String}  content The binary string
	     * @param {Boolean} raw     True to get the raw string, false to get the hex string
	     *
	     * @return {String} The result
	     */
	    SparkMD5.hashBinary = function (content, raw) {
	        var hash = md51(content),
	            ret = hex(hash);
	
	        return raw ? hexToBinaryString(ret) : ret;
	    };
	
	    // ---------------------------------------------------
	
	    /**
	     * SparkMD5 OOP implementation for array buffers.
	     *
	     * Use this class to perform an incremental md5 ONLY for array buffers.
	     */
	    SparkMD5.ArrayBuffer = function () {
	        // call reset to init the instance
	        this.reset();
	    };
	
	    /**
	     * Appends an array buffer.
	     *
	     * @param {ArrayBuffer} arr The array to be appended
	     *
	     * @return {SparkMD5.ArrayBuffer} The instance itself
	     */
	    SparkMD5.ArrayBuffer.prototype.append = function (arr) {
	        var buff = concatenateArrayBuffers(this._buff.buffer, arr, true),
	            length = buff.length,
	            i;
	
	        this._length += arr.byteLength;
	
	        for (i = 64; i <= length; i += 64) {
	            md5cycle(this._hash, md5blk_array(buff.subarray(i - 64, i)));
	        }
	
	        this._buff = (i - 64) < length ? new Uint8Array(buff.buffer.slice(i - 64)) : new Uint8Array(0);
	
	        return this;
	    };
	
	    /**
	     * Finishes the incremental computation, reseting the internal state and
	     * returning the result.
	     *
	     * @param {Boolean} raw True to get the raw string, false to get the hex string
	     *
	     * @return {String} The result
	     */
	    SparkMD5.ArrayBuffer.prototype.end = function (raw) {
	        var buff = this._buff,
	            length = buff.length,
	            tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	            i,
	            ret;
	
	        for (i = 0; i < length; i += 1) {
	            tail[i >> 2] |= buff[i] << ((i % 4) << 3);
	        }
	
	        this._finish(tail, length);
	        ret = hex(this._hash);
	
	        if (raw) {
	            ret = hexToBinaryString(ret);
	        }
	
	        this.reset();
	
	        return ret;
	    };
	
	    /**
	     * Resets the internal state of the computation.
	     *
	     * @return {SparkMD5.ArrayBuffer} The instance itself
	     */
	    SparkMD5.ArrayBuffer.prototype.reset = function () {
	        this._buff = new Uint8Array(0);
	        this._length = 0;
	        this._hash = [1732584193, -271733879, -1732584194, 271733878];
	
	        return this;
	    };
	
	    /**
	     * Gets the internal state of the computation.
	     *
	     * @return {Object} The state
	     */
	    SparkMD5.ArrayBuffer.prototype.getState = function () {
	        var state = SparkMD5.prototype.getState.call(this);
	
	        // Convert buffer to a string
	        state.buff = arrayBuffer2Utf8Str(state.buff);
	
	        return state;
	    };
	
	    /**
	     * Gets the internal state of the computation.
	     *
	     * @param {Object} state The state
	     *
	     * @return {SparkMD5.ArrayBuffer} The instance itself
	     */
	    SparkMD5.ArrayBuffer.prototype.setState = function (state) {
	        // Convert string to buffer
	        state.buff = utf8Str2ArrayBuffer(state.buff, true);
	
	        return SparkMD5.prototype.setState.call(this, state);
	    };
	
	    SparkMD5.ArrayBuffer.prototype.destroy = SparkMD5.prototype.destroy;
	
	    SparkMD5.ArrayBuffer.prototype._finish = SparkMD5.prototype._finish;
	
	    /**
	     * Performs the md5 hash on an array buffer.
	     *
	     * @param {ArrayBuffer} arr The array buffer
	     * @param {Boolean}     raw True to get the raw string, false to get the hex one
	     *
	     * @return {String} The result
	     */
	    SparkMD5.ArrayBuffer.hash = function (arr, raw) {
	        var hash = md51_array(new Uint8Array(arr)),
	            ret = hex(hash);
	
	        return raw ? hexToBinaryString(ret) : ret;
	    };
	
	    return SparkMD5;
	}));


/***/ },
/* 134 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Stringify/parse functions that don't operate
	 * recursively, so they avoid call stack exceeded
	 * errors.
	 */
	exports.stringify = function stringify(input) {
	  var queue = [];
	  queue.push({obj: input});
	
	  var res = '';
	  var next, obj, prefix, val, i, arrayPrefix, keys, k, key, value, objPrefix;
	  while ((next = queue.pop())) {
	    obj = next.obj;
	    prefix = next.prefix || '';
	    val = next.val || '';
	    res += prefix;
	    if (val) {
	      res += val;
	    } else if (typeof obj !== 'object') {
	      res += typeof obj === 'undefined' ? null : JSON.stringify(obj);
	    } else if (obj === null) {
	      res += 'null';
	    } else if (Array.isArray(obj)) {
	      queue.push({val: ']'});
	      for (i = obj.length - 1; i >= 0; i--) {
	        arrayPrefix = i === 0 ? '' : ',';
	        queue.push({obj: obj[i], prefix: arrayPrefix});
	      }
	      queue.push({val: '['});
	    } else { // object
	      keys = [];
	      for (k in obj) {
	        if (obj.hasOwnProperty(k)) {
	          keys.push(k);
	        }
	      }
	      queue.push({val: '}'});
	      for (i = keys.length - 1; i >= 0; i--) {
	        key = keys[i];
	        value = obj[key];
	        objPrefix = (i > 0 ? ',' : '');
	        objPrefix += JSON.stringify(key) + ':';
	        queue.push({obj: value, prefix: objPrefix});
	      }
	      queue.push({val: '{'});
	    }
	  }
	  return res;
	};
	
	// Convenience function for the parse function.
	// This pop function is basically copied from
	// pouchCollate.parseIndexableString
	function pop(obj, stack, metaStack) {
	  var lastMetaElement = metaStack[metaStack.length - 1];
	  if (obj === lastMetaElement.element) {
	    // popping a meta-element, e.g. an object whose value is another object
	    metaStack.pop();
	    lastMetaElement = metaStack[metaStack.length - 1];
	  }
	  var element = lastMetaElement.element;
	  var lastElementIndex = lastMetaElement.index;
	  if (Array.isArray(element)) {
	    element.push(obj);
	  } else if (lastElementIndex === stack.length - 2) { // obj with key+value
	    var key = stack.pop();
	    element[key] = obj;
	  } else {
	    stack.push(obj); // obj with key only
	  }
	}
	
	exports.parse = function (str) {
	  var stack = [];
	  var metaStack = []; // stack for arrays and objects
	  var i = 0;
	  var collationIndex,parsedNum,numChar;
	  var parsedString,lastCh,numConsecutiveSlashes,ch;
	  var arrayElement, objElement;
	  while (true) {
	    collationIndex = str[i++];
	    if (collationIndex === '}' ||
	        collationIndex === ']' ||
	        typeof collationIndex === 'undefined') {
	      if (stack.length === 1) {
	        return stack.pop();
	      } else {
	        pop(stack.pop(), stack, metaStack);
	        continue;
	      }
	    }
	    switch (collationIndex) {
	      case ' ':
	      case '\t':
	      case '\n':
	      case ':':
	      case ',':
	        break;
	      case 'n':
	        i += 3; // 'ull'
	        pop(null, stack, metaStack);
	        break;
	      case 't':
	        i += 3; // 'rue'
	        pop(true, stack, metaStack);
	        break;
	      case 'f':
	        i += 4; // 'alse'
	        pop(false, stack, metaStack);
	        break;
	      case '0':
	      case '1':
	      case '2':
	      case '3':
	      case '4':
	      case '5':
	      case '6':
	      case '7':
	      case '8':
	      case '9':
	      case '-':
	        parsedNum = '';
	        i--;
	        while (true) {
	          numChar = str[i++];
	          if (/[\d\.\-e\+]/.test(numChar)) {
	            parsedNum += numChar;
	          } else {
	            i--;
	            break;
	          }
	        }
	        pop(parseFloat(parsedNum), stack, metaStack);
	        break;
	      case '"':
	        parsedString = '';
	        lastCh = void 0;
	        numConsecutiveSlashes = 0;
	        while (true) {
	          ch = str[i++];
	          if (ch !== '"' || (lastCh === '\\' &&
	              numConsecutiveSlashes % 2 === 1)) {
	            parsedString += ch;
	            lastCh = ch;
	            if (lastCh === '\\') {
	              numConsecutiveSlashes++;
	            } else {
	              numConsecutiveSlashes = 0;
	            }
	          } else {
	            break;
	          }
	        }
	        pop(JSON.parse('"' + parsedString + '"'), stack, metaStack);
	        break;
	      case '[':
	        arrayElement = { element: [], index: stack.length };
	        stack.push(arrayElement.element);
	        metaStack.push(arrayElement);
	        break;
	      case '{':
	        objElement = { element: {}, index: stack.length };
	        stack.push(objElement.element);
	        metaStack.push(objElement);
	        break;
	      default:
	        throw new Error(
	          'unexpectedly reached end of input: ' + collationIndex);
	    }
	  }
	};


/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) {
	  /* istanbul ignore next */
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
	  } else if (typeof exports === 'object') {
	    module.exports = factory()
	  } else {
	    root.PromisePool = factory()
	    // Legacy API
	    root.promisePool = root.PromisePool
	  }
	})(this, function () {
	  'use strict'
	
	  var EventTarget = function () {
	    this._listeners = {}
	  }
	
	  EventTarget.prototype.addEventListener = function (type, listener) {
	    this._listeners[type] = this._listeners[type] || []
	    if (this._listeners[type].indexOf(listener) < 0) {
	      this._listeners[type].push(listener)
	    }
	  }
	
	  EventTarget.prototype.removeEventListener = function (type, listener) {
	    if (this._listeners[type]) {
	      var p = this._listeners[type].indexOf(listener)
	      if (p >= 0) {
	        this._listeners[type].splice(p, 1)
	      }
	    }
	  }
	
	  EventTarget.prototype.dispatchEvent = function (evt) {
	    if (this._listeners[evt.type] && this._listeners[evt.type].length) {
	      var listeners = this._listeners[evt.type].slice()
	      for (var i = 0, l = listeners.length; i < l; ++i) {
	        listeners[i].call(this, evt)
	      }
	    }
	  }
	
	  var isGenerator = function (func) {
	    return (typeof func.constructor === 'function' &&
	      func.constructor.name === 'GeneratorFunction')
	  }
	
	  var functionToIterator = function (func) {
	    return {
	      next: function () {
	        var promise = func()
	        return promise ? {value: promise} : {done: true}
	      }
	    }
	  }
	
	  var promiseToIterator = function (promise) {
	    var called = false
	    return {
	      next: function () {
	        if (called) {
	          return {done: true}
	        }
	        called = true
	        return {value: promise}
	      }
	    }
	  }
	
	  var toIterator = function (obj, Promise) {
	    var type = typeof obj
	    if (type === 'object') {
	      if (typeof obj.next === 'function') {
	        return obj
	      }
	      /* istanbul ignore else */
	      if (typeof obj.then === 'function') {
	        return promiseToIterator(obj)
	      }
	    }
	    if (type === 'function') {
	      return isGenerator(obj) ? obj() : functionToIterator(obj)
	    }
	    return promiseToIterator(Promise.resolve(obj))
	  }
	
	  var PromisePoolEvent = function (target, type, data) {
	    this.target = target
	    this.type = type
	    this.data = data
	  }
	
	  var PromisePool = function (source, concurrency, options) {
	    EventTarget.call(this)
	    if (typeof concurrency !== 'number' ||
	        Math.floor(concurrency) !== concurrency ||
	        concurrency < 1) {
	      throw new Error('Invalid concurrency')
	    }
	    this._concurrency = concurrency
	    this._options = options || {}
	    this._options.promise = this._options.promise || Promise
	    this._iterator = toIterator(source, this._options.promise)
	    this._done = false
	    this._size = 0
	    this._promise = null
	    this._callbacks = null
	  }
	  PromisePool.prototype = new EventTarget()
	  PromisePool.prototype.constructor = PromisePool
	
	  PromisePool.prototype.concurrency = function (value) {
	    if (typeof value !== 'undefined') {
	      this._concurrency = value
	      if (this.active()) {
	        this._proceed()
	      }
	    }
	    return this._concurrency
	  }
	
	  PromisePool.prototype.size = function () {
	    return this._size
	  }
	
	  PromisePool.prototype.active = function () {
	    return !!this._promise
	  }
	
	  PromisePool.prototype.promise = function () {
	    return this._promise
	  }
	
	  PromisePool.prototype.start = function () {
	    var that = this
	    var Promise = this._options.promise
	    this._promise = new Promise(function (resolve, reject) {
	      that._callbacks = {
	        reject: reject,
	        resolve: resolve
	      }
	      that._proceed()
	    })
	    return this._promise
	  }
	
	  PromisePool.prototype._fireEvent = function (type, data) {
	    this.dispatchEvent(new PromisePoolEvent(this, type, data))
	  }
	
	  PromisePool.prototype._settle = function (error) {
	    if (error) {
	      this._callbacks.reject(error)
	    } else {
	      this._callbacks.resolve()
	    }
	    this._promise = null
	    this._callbacks = null
	  }
	
	  PromisePool.prototype._onPooledPromiseFulfilled = function (promise, result) {
	    this._size--
	    if (this.active()) {
	      this._fireEvent('fulfilled', {
	        promise: promise,
	        result: result
	      })
	      this._proceed()
	    }
	  }
	
	  PromisePool.prototype._onPooledPromiseRejected = function (promise, error) {
	    this._size--
	    if (this.active()) {
	      this._fireEvent('rejected', {
	        promise: promise,
	        error: error
	      })
	      this._settle(error || new Error('Unknown error'))
	    }
	  }
	
	  PromisePool.prototype._trackPromise = function (promise) {
	    var that = this
	    promise
	      .then(function (result) {
	        that._onPooledPromiseFulfilled(promise, result)
	      }, function (error) {
	        that._onPooledPromiseRejected(promise, error)
	      })['catch'](function (err) {
	        that._settle(new Error('Promise processing failed: ' + err))
	      })
	  }
	
	  PromisePool.prototype._proceed = function () {
	    if (!this._done) {
	      var result = null
	      while (this._size < this._concurrency &&
	          !(result = this._iterator.next()).done) {
	        this._size++
	        this._trackPromise(result.value)
	      }
	      this._done = (result === null || !!result.done)
	    }
	    if (this._done && this._size === 0) {
	      this._settle()
	    }
	  }
	
	  PromisePool.PromisePoolEvent = PromisePoolEvent
	  // Legacy API
	  PromisePool.PromisePool = PromisePool
	
	  return PromisePool
	})


/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var MIN_MAGNITUDE = -324; // verified by -Number.MIN_VALUE
	var MAGNITUDE_DIGITS = 3; // ditto
	var SEP = ''; // set to '_' for easier debugging 
	
	var utils = __webpack_require__(137);
	
	exports.collate = function (a, b) {
	
	  if (a === b) {
	    return 0;
	  }
	
	  a = exports.normalizeKey(a);
	  b = exports.normalizeKey(b);
	
	  var ai = collationIndex(a);
	  var bi = collationIndex(b);
	  if ((ai - bi) !== 0) {
	    return ai - bi;
	  }
	  if (a === null) {
	    return 0;
	  }
	  switch (typeof a) {
	    case 'number':
	      return a - b;
	    case 'boolean':
	      return a === b ? 0 : (a < b ? -1 : 1);
	    case 'string':
	      return stringCollate(a, b);
	  }
	  return Array.isArray(a) ? arrayCollate(a, b) : objectCollate(a, b);
	};
	
	// couch considers null/NaN/Infinity/-Infinity === undefined,
	// for the purposes of mapreduce indexes. also, dates get stringified.
	exports.normalizeKey = function (key) {
	  switch (typeof key) {
	    case 'undefined':
	      return null;
	    case 'number':
	      if (key === Infinity || key === -Infinity || isNaN(key)) {
	        return null;
	      }
	      return key;
	    case 'object':
	      var origKey = key;
	      if (Array.isArray(key)) {
	        var len = key.length;
	        key = new Array(len);
	        for (var i = 0; i < len; i++) {
	          key[i] = exports.normalizeKey(origKey[i]);
	        }
	      } else if (key instanceof Date) {
	        return key.toJSON();
	      } else if (key !== null) { // generic object
	        key = {};
	        for (var k in origKey) {
	          if (origKey.hasOwnProperty(k)) {
	            var val = origKey[k];
	            if (typeof val !== 'undefined') {
	              key[k] = exports.normalizeKey(val);
	            }
	          }
	        }
	      }
	  }
	  return key;
	};
	
	function indexify(key) {
	  if (key !== null) {
	    switch (typeof key) {
	      case 'boolean':
	        return key ? 1 : 0;
	      case 'number':
	        return numToIndexableString(key);
	      case 'string':
	        // We've to be sure that key does not contain \u0000
	        // Do order-preserving replacements:
	        // 0 -> 1, 1
	        // 1 -> 1, 2
	        // 2 -> 2, 2
	        return key
	          .replace(/\u0002/g, '\u0002\u0002')
	          .replace(/\u0001/g, '\u0001\u0002')
	          .replace(/\u0000/g, '\u0001\u0001');
	      case 'object':
	        var isArray = Array.isArray(key);
	        var arr = isArray ? key : Object.keys(key);
	        var i = -1;
	        var len = arr.length;
	        var result = '';
	        if (isArray) {
	          while (++i < len) {
	            result += exports.toIndexableString(arr[i]);
	          }
	        } else {
	          while (++i < len) {
	            var objKey = arr[i];
	            result += exports.toIndexableString(objKey) +
	                exports.toIndexableString(key[objKey]);
	          }
	        }
	        return result;
	    }
	  }
	  return '';
	}
	
	// convert the given key to a string that would be appropriate
	// for lexical sorting, e.g. within a database, where the
	// sorting is the same given by the collate() function.
	exports.toIndexableString = function (key) {
	  var zero = '\u0000';
	  key = exports.normalizeKey(key);
	  return collationIndex(key) + SEP + indexify(key) + zero;
	};
	
	function parseNumber(str, i) {
	  var originalIdx = i;
	  var num;
	  var zero = str[i] === '1';
	  if (zero) {
	    num = 0;
	    i++;
	  } else {
	    var neg = str[i] === '0';
	    i++;
	    var numAsString = '';
	    var magAsString = str.substring(i, i + MAGNITUDE_DIGITS);
	    var magnitude = parseInt(magAsString, 10) + MIN_MAGNITUDE;
	    if (neg) {
	      magnitude = -magnitude;
	    }
	    i += MAGNITUDE_DIGITS;
	    while (true) {
	      var ch = str[i];
	      if (ch === '\u0000') {
	        break;
	      } else {
	        numAsString += ch;
	      }
	      i++;
	    }
	    numAsString = numAsString.split('.');
	    if (numAsString.length === 1) {
	      num = parseInt(numAsString, 10);
	    } else {
	      num = parseFloat(numAsString[0] + '.' + numAsString[1]);
	    }
	    if (neg) {
	      num = num - 10;
	    }
	    if (magnitude !== 0) {
	      // parseFloat is more reliable than pow due to rounding errors
	      // e.g. Number.MAX_VALUE would return Infinity if we did
	      // num * Math.pow(10, magnitude);
	      num = parseFloat(num + 'e' + magnitude);
	    }
	  }
	  return {num: num, length : i - originalIdx};
	}
	
	// move up the stack while parsing
	// this function moved outside of parseIndexableString for performance
	function pop(stack, metaStack) {
	  var obj = stack.pop();
	
	  if (metaStack.length) {
	    var lastMetaElement = metaStack[metaStack.length - 1];
	    if (obj === lastMetaElement.element) {
	      // popping a meta-element, e.g. an object whose value is another object
	      metaStack.pop();
	      lastMetaElement = metaStack[metaStack.length - 1];
	    }
	    var element = lastMetaElement.element;
	    var lastElementIndex = lastMetaElement.index;
	    if (Array.isArray(element)) {
	      element.push(obj);
	    } else if (lastElementIndex === stack.length - 2) { // obj with key+value
	      var key = stack.pop();
	      element[key] = obj;
	    } else {
	      stack.push(obj); // obj with key only
	    }
	  }
	}
	
	exports.parseIndexableString = function (str) {
	  var stack = [];
	  var metaStack = []; // stack for arrays and objects
	  var i = 0;
	
	  while (true) {
	    var collationIndex = str[i++];
	    if (collationIndex === '\u0000') {
	      if (stack.length === 1) {
	        return stack.pop();
	      } else {
	        pop(stack, metaStack);
	        continue;
	      }
	    }
	    switch (collationIndex) {
	      case '1':
	        stack.push(null);
	        break;
	      case '2':
	        stack.push(str[i] === '1');
	        i++;
	        break;
	      case '3':
	        var parsedNum = parseNumber(str, i);
	        stack.push(parsedNum.num);
	        i += parsedNum.length;
	        break;
	      case '4':
	        var parsedStr = '';
	        while (true) {
	          var ch = str[i];
	          if (ch === '\u0000') {
	            break;
	          }
	          parsedStr += ch;
	          i++;
	        }
	        // perform the reverse of the order-preserving replacement
	        // algorithm (see above)
	        parsedStr = parsedStr.replace(/\u0001\u0001/g, '\u0000')
	          .replace(/\u0001\u0002/g, '\u0001')
	          .replace(/\u0002\u0002/g, '\u0002');
	        stack.push(parsedStr);
	        break;
	      case '5':
	        var arrayElement = { element: [], index: stack.length };
	        stack.push(arrayElement.element);
	        metaStack.push(arrayElement);
	        break;
	      case '6':
	        var objElement = { element: {}, index: stack.length };
	        stack.push(objElement.element);
	        metaStack.push(objElement);
	        break;
	      default:
	        throw new Error(
	          'bad collationIndex or unexpectedly reached end of input: ' + collationIndex);
	    }
	  }
	};
	
	function arrayCollate(a, b) {
	  var len = Math.min(a.length, b.length);
	  for (var i = 0; i < len; i++) {
	    var sort = exports.collate(a[i], b[i]);
	    if (sort !== 0) {
	      return sort;
	    }
	  }
	  return (a.length === b.length) ? 0 :
	    (a.length > b.length) ? 1 : -1;
	}
	function stringCollate(a, b) {
	  // See: https://github.com/daleharvey/pouchdb/issues/40
	  // This is incompatible with the CouchDB implementation, but its the
	  // best we can do for now
	  return (a === b) ? 0 : ((a > b) ? 1 : -1);
	}
	function objectCollate(a, b) {
	  var ak = Object.keys(a), bk = Object.keys(b);
	  var len = Math.min(ak.length, bk.length);
	  for (var i = 0; i < len; i++) {
	    // First sort the keys
	    var sort = exports.collate(ak[i], bk[i]);
	    if (sort !== 0) {
	      return sort;
	    }
	    // if the keys are equal sort the values
	    sort = exports.collate(a[ak[i]], b[bk[i]]);
	    if (sort !== 0) {
	      return sort;
	    }
	
	  }
	  return (ak.length === bk.length) ? 0 :
	    (ak.length > bk.length) ? 1 : -1;
	}
	// The collation is defined by erlangs ordered terms
	// the atoms null, true, false come first, then numbers, strings,
	// arrays, then objects
	// null/undefined/NaN/Infinity/-Infinity are all considered null
	function collationIndex(x) {
	  var id = ['boolean', 'number', 'string', 'object'];
	  var idx = id.indexOf(typeof x);
	  //false if -1 otherwise true, but fast!!!!1
	  if (~idx) {
	    if (x === null) {
	      return 1;
	    }
	    if (Array.isArray(x)) {
	      return 5;
	    }
	    return idx < 3 ? (idx + 2) : (idx + 3);
	  }
	  if (Array.isArray(x)) {
	    return 5;
	  }
	}
	
	// conversion:
	// x yyy zz...zz
	// x = 0 for negative, 1 for 0, 2 for positive
	// y = exponent (for negative numbers negated) moved so that it's >= 0
	// z = mantisse
	function numToIndexableString(num) {
	
	  if (num === 0) {
	    return '1';
	  }
	
	  // convert number to exponential format for easier and
	  // more succinct string sorting
	  var expFormat = num.toExponential().split(/e\+?/);
	  var magnitude = parseInt(expFormat[1], 10);
	
	  var neg = num < 0;
	
	  var result = neg ? '0' : '2';
	
	  // first sort by magnitude
	  // it's easier if all magnitudes are positive
	  var magForComparison = ((neg ? -magnitude : magnitude) - MIN_MAGNITUDE);
	  var magString = utils.padLeft((magForComparison).toString(), '0', MAGNITUDE_DIGITS);
	
	  result += SEP + magString;
	
	  // then sort by the factor
	  var factor = Math.abs(parseFloat(expFormat[0])); // [1..10)
	  if (neg) { // for negative reverse ordering
	    factor = 10 - factor;
	  }
	
	  var factorStr = factor.toFixed(20);
	
	  // strip zeros from the end
	  factorStr = factorStr.replace(/\.?0+$/, '');
	
	  result += SEP + factorStr;
	
	  return result;
	}


/***/ },
/* 137 */
/***/ function(module, exports) {

	'use strict';
	
	function pad(str, padWith, upToLength) {
	  var padding = '';
	  var targetLength = upToLength - str.length;
	  while (padding.length < targetLength) {
	    padding += padWith;
	  }
	  return padding;
	}
	
	exports.padLeft = function (str, padWith, upToLength) {
	  var padding = pad(str, padWith, upToLength);
	  return padding + str;
	};
	
	exports.padRight = function (str, padWith, upToLength) {
	  var padding = pad(str, padWith, upToLength);
	  return str + padding;
	};
	
	exports.stringLexCompare = function (a, b) {
	
	  var aLen = a.length;
	  var bLen = b.length;
	
	  var i;
	  for (i = 0; i < aLen; i++) {
	    if (i === bLen) {
	      // b is shorter substring of a
	      return 1;
	    }
	    var aChar = a.charAt(i);
	    var bChar = b.charAt(i);
	    if (aChar !== bChar) {
	      return aChar < bChar ? -1 : 1;
	    }
	  }
	
	  if (aLen < bLen) {
	    // a is shorter substring of b
	    return -1;
	  }
	
	  return 0;
	};
	
	/*
	 * returns the decimal form for the given integer, i.e. writes
	 * out all the digits (in base-10) instead of using scientific notation
	 */
	exports.intToDecimalForm = function (int) {
	
	  var isNeg = int < 0;
	  var result = '';
	
	  do {
	    var remainder = isNeg ? -Math.ceil(int % 10) : Math.floor(int % 10);
	
	    result = remainder + result;
	    int = isNeg ? Math.ceil(int / 10) : Math.floor(int / 10);
	  } while (int);
	
	
	  if (isNeg && result !== '0') {
	    result = '-' + result;
	  }
	
	  return result;
	};

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	/*
	  Copyright 2014 Google Inc. All Rights Reserved.
	
	  Licensed under the Apache License, Version 2.0 (the "License");
	  you may not use this file except in compliance with the License.
	  You may obtain a copy of the License at
	
	      http://www.apache.org/licenses/LICENSE-2.0
	
	  Unless required by applicable law or agreed to in writing, software
	  distributed under the License is distributed on an "AS IS" BASIS,
	  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	  See the License for the specific language governing permissions and
	  limitations under the License.
	*/
	'use strict';
	
	__webpack_require__(139);
	var options = __webpack_require__(140);
	var router = __webpack_require__(141);
	var helpers = __webpack_require__(145);
	var strategies = __webpack_require__(147);
	
	helpers.debug('Service Worker Toolbox is loading');
	
	// Install
	var flatten = function(items) {
	  return items.reduce(function(a, b) {
	    return a.concat(b);
	  }, []);
	};
	
	var validatePrecacheInput = function(items) {
	  var isValid = Array.isArray(items);
	  if (isValid) {
	    items.forEach(function(item) {
	      if (!(typeof item === 'string' || (item instanceof Request))) {
	        isValid = false;
	      }
	    });
	  }
	
	  if (!isValid) {
	    throw new TypeError('The precache method expects either an array of ' +
	    'strings and/or Requests or a Promise that resolves to an array of ' +
	    'strings and/or Requests.');
	  }
	
	  return items;
	};
	
	self.addEventListener('install', function(event) {
	  var inactiveCache = options.cache.name + '$$$inactive$$$';
	  helpers.debug('install event fired');
	  helpers.debug('creating cache [' + inactiveCache + ']');
	  event.waitUntil(
	    helpers.openCache({cache: {name: inactiveCache}})
	    .then(function(cache) {
	      return Promise.all(options.preCacheItems)
	      .then(flatten)
	      .then(validatePrecacheInput)
	      .then(function(preCacheItems) {
	        helpers.debug('preCache list: ' +
	            (preCacheItems.join(', ') || '(none)'));
	        return cache.addAll(preCacheItems);
	      });
	    })
	  );
	});
	
	// Activate
	
	self.addEventListener('activate', function(event) {
	  helpers.debug('activate event fired');
	  var inactiveCache = options.cache.name + '$$$inactive$$$';
	  event.waitUntil(helpers.renameCache(inactiveCache, options.cache.name));
	});
	
	// Fetch
	
	self.addEventListener('fetch', function(event) {
	  var handler = router.match(event.request);
	
	  if (handler) {
	    event.respondWith(handler(event.request));
	  } else if (router.default && event.request.method === 'GET') {
	    event.respondWith(router.default(event.request));
	  }
	});
	
	// Caching
	
	function cache(url, options) {
	  return helpers.openCache(options).then(function(cache) {
	    return cache.add(url);
	  });
	}
	
	function uncache(url, options) {
	  return helpers.openCache(options).then(function(cache) {
	    return cache.delete(url);
	  });
	}
	
	function precache(items) {
	  if (!(items instanceof Promise)) {
	    validatePrecacheInput(items);
	  }
	
	  options.preCacheItems = options.preCacheItems.concat(items);
	}
	
	module.exports = {
	  networkOnly: strategies.networkOnly,
	  networkFirst: strategies.networkFirst,
	  cacheOnly: strategies.cacheOnly,
	  cacheFirst: strategies.cacheFirst,
	  fastest: strategies.fastest,
	  router: router,
	  options: options,
	  cache: cache,
	  uncache: uncache,
	  precache: precache
	};


/***/ },
/* 139 */
/***/ function(module, exports) {

	/**
	 * Copyright 2015 Google Inc. All rights reserved.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 */
	
	(function() {
	  var nativeAddAll = Cache.prototype.addAll;
	  var userAgent = navigator.userAgent.match(/(Firefox|Chrome)\/(\d+\.)/);
	
	  // Has nice behavior of `var` which everyone hates
	  if (userAgent) {
	    var agent = userAgent[1];
	    var version = parseInt(userAgent[2]);
	  }
	
	  if (
	    nativeAddAll && (!userAgent ||
	      (agent === 'Firefox' && version >= 46) ||
	      (agent === 'Chrome'  && version >= 50)
	    )
	  ) {
	    return;
	  }
	
	  Cache.prototype.addAll = function addAll(requests) {
	    var cache = this;
	
	    // Since DOMExceptions are not constructable:
	    function NetworkError(message) {
	      this.name = 'NetworkError';
	      this.code = 19;
	      this.message = message;
	    }
	
	    NetworkError.prototype = Object.create(Error.prototype);
	
	    return Promise.resolve().then(function() {
	      if (arguments.length < 1) throw new TypeError();
	
	      // Simulate sequence<(Request or USVString)> binding:
	      var sequence = [];
	
	      requests = requests.map(function(request) {
	        if (request instanceof Request) {
	          return request;
	        }
	        else {
	          return String(request); // may throw TypeError
	        }
	      });
	
	      return Promise.all(
	        requests.map(function(request) {
	          if (typeof request === 'string') {
	            request = new Request(request);
	          }
	
	          var scheme = new URL(request.url).protocol;
	
	          if (scheme !== 'http:' && scheme !== 'https:') {
	            throw new NetworkError("Invalid scheme");
	          }
	
	          return fetch(request.clone());
	        })
	      );
	    }).then(function(responses) {
	      // If some of the responses has not OK-eish status,
	      // then whole operation should reject
	      if (responses.some(function(response) {
	        return !response.ok;
	      })) {
	        throw new NetworkError('Incorrect response status');
	      }
	
	      // TODO: check that requests don't overwrite one another
	      // (don't think this is possible to polyfill due to opaque responses)
	      return Promise.all(
	        responses.map(function(response, i) {
	          return cache.put(requests[i], response);
	        })
	      );
	    }).then(function() {
	      return undefined;
	    });
	  };
	
	  Cache.prototype.add = function add(request) {
	    return this.addAll([request]);
	  };
	}());

/***/ },
/* 140 */
/***/ function(module, exports) {

	/*
		Copyright 2015 Google Inc. All Rights Reserved.
	
		Licensed under the Apache License, Version 2.0 (the "License");
		you may not use this file except in compliance with the License.
		You may obtain a copy of the License at
	
	      http://www.apache.org/licenses/LICENSE-2.0
	
		Unless required by applicable law or agreed to in writing, software
		distributed under the License is distributed on an "AS IS" BASIS,
		WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
		See the License for the specific language governing permissions and
		limitations under the License.
	*/
	'use strict';
	
	// TODO: This is necessary to handle different implementations in the wild
	// The spec defines self.registration, but it was not implemented in Chrome 40.
	var scope;
	if (self.registration) {
	  scope = self.registration.scope;
	} else {
	  scope = self.scope || new URL('./', self.location).href;
	}
	
	module.exports = {
	  cache: {
	    name: '$$$toolbox-cache$$$' + scope + '$$$',
	    maxAgeSeconds: null,
	    maxEntries: null
	  },
	  debug: false,
	  networkTimeoutSeconds: null,
	  preCacheItems: [],
	  // A regular expression to apply to HTTP response codes. Codes that match
	  // will be considered successes, while others will not, and will not be
	  // cached.
	  successResponses: /^0|([123]\d\d)|(40[14567])|410$/
	};


/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	/*
	  Copyright 2014 Google Inc. All Rights Reserved.
	
	  Licensed under the Apache License, Version 2.0 (the "License");
	  you may not use this file except in compliance with the License.
	  You may obtain a copy of the License at
	
	      http://www.apache.org/licenses/LICENSE-2.0
	
	  Unless required by applicable law or agreed to in writing, software
	  distributed under the License is distributed on an "AS IS" BASIS,
	  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	  See the License for the specific language governing permissions and
	  limitations under the License.
	*/
	'use strict';
	
	var Route = __webpack_require__(142);
	var helpers = __webpack_require__(145);
	
	function regexEscape(s) {
	  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
	}
	
	var keyMatch = function(map, string) {
	  // This would be better written as a for..of loop, but that would break the
	  // minifyify process in the build.
	  var entriesIterator = map.entries();
	  var item = entriesIterator.next();
	  var matches = [];
	  while (!item.done) {
	    var pattern = new RegExp(item.value[0]);
	    if (pattern.test(string)) {
	      matches.push(item.value[1]);
	    }
	    item = entriesIterator.next();
	  }
	  return matches;
	};
	
	var Router = function() {
	  this.routes = new Map();
	  // Create the dummy origin for RegExp-based routes
	  this.routes.set(RegExp, new Map());
	  this.default = null;
	};
	
	['get', 'post', 'put', 'delete', 'head', 'any'].forEach(function(method) {
	  Router.prototype[method] = function(path, handler, options) {
	    return this.add(method, path, handler, options);
	  };
	});
	
	Router.prototype.add = function(method, path, handler, options) {
	  options = options || {};
	  var origin;
	
	  if (path instanceof RegExp) {
	    // We need a unique key to use in the Map to distinguish RegExp paths
	    // from Express-style paths + origins. Since we can use any object as the
	    // key in a Map, let's use the RegExp constructor!
	    origin = RegExp;
	  } else {
	    origin = options.origin || self.location.origin;
	    if (origin instanceof RegExp) {
	      origin = origin.source;
	    } else {
	      origin = regexEscape(origin);
	    }
	  }
	
	  method = method.toLowerCase();
	
	  var route = new Route(method, path, handler, options);
	
	  if (!this.routes.has(origin)) {
	    this.routes.set(origin, new Map());
	  }
	
	  var methodMap = this.routes.get(origin);
	  if (!methodMap.has(method)) {
	    methodMap.set(method, new Map());
	  }
	
	  var routeMap = methodMap.get(method);
	  var regExp = route.regexp || route.fullUrlRegExp;
	
	  if (routeMap.has(regExp.source)) {
	    helpers.debug('"' + path + '" resolves to same regex as existing route.');
	  }
	
	  routeMap.set(regExp.source, route);
	};
	
	Router.prototype.matchMethod = function(method, url) {
	  var urlObject = new URL(url);
	  var origin = urlObject.origin;
	  var path = urlObject.pathname;
	
	  // We want to first check to see if there's a match against any
	  // "Express-style" routes (string for the path, RegExp for the origin).
	  // Checking for Express-style matches first maintains the legacy behavior.
	  // If there's no match, we next check for a match against any RegExp routes,
	  // where the RegExp in question matches the full URL (both origin and path).
	  return this._match(method, keyMatch(this.routes, origin), path) ||
	    this._match(method, [this.routes.get(RegExp)], url);
	};
	
	Router.prototype._match = function(method, methodMaps, pathOrUrl) {
	  if (methodMaps.length === 0) {
	    return null;
	  }
	
	  for (var i = 0; i < methodMaps.length; i++) {
	    var methodMap = methodMaps[i];
	    var routeMap = methodMap && methodMap.get(method.toLowerCase());
	    if (routeMap) {
	      var routes = keyMatch(routeMap, pathOrUrl);
	      if (routes.length > 0) {
	        return routes[0].makeHandler(pathOrUrl);
	      }
	    }
	  }
	
	  return null;
	};
	
	Router.prototype.match = function(request) {
	  return this.matchMethod(request.method, request.url) ||
	      this.matchMethod('any', request.url);
	};
	
	module.exports = new Router();


/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	/*
	  Copyright 2014 Google Inc. All Rights Reserved.
	
	  Licensed under the Apache License, Version 2.0 (the "License");
	  you may not use this file except in compliance with the License.
	  You may obtain a copy of the License at
	
	      http://www.apache.org/licenses/LICENSE-2.0
	
	  Unless required by applicable law or agreed to in writing, software
	  distributed under the License is distributed on an "AS IS" BASIS,
	  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	  See the License for the specific language governing permissions and
	  limitations under the License.
	*/
	'use strict';
	
	// TODO: Use self.registration.scope instead of self.location
	var url = new URL('./', self.location);
	var basePath = url.pathname;
	var pathRegexp = __webpack_require__(143);
	
	var Route = function(method, path, handler, options) {
	  if (path instanceof RegExp) {
	    this.fullUrlRegExp = path;
	  } else {
	    // The URL() constructor can't parse express-style routes as they are not
	    // valid urls. This means we have to manually manipulate relative urls into
	    // absolute ones. This check is extremely naive but implementing a tweaked
	    // version of the full algorithm seems like overkill
	    // (https://url.spec.whatwg.org/#concept-basic-url-parser)
	    if (path.indexOf('/') !== 0) {
	      path = basePath + path;
	    }
	
	    this.keys = [];
	    this.regexp = pathRegexp(path, this.keys);
	  }
	
	  this.method = method;
	  this.options = options;
	  this.handler = handler;
	};
	
	Route.prototype.makeHandler = function(url) {
	  var values;
	  if (this.regexp) {
	    var match = this.regexp.exec(url);
	    values = {};
	    this.keys.forEach(function(key, index) {
	      values[key.name] = match[index + 1];
	    });
	  }
	
	  return function(request) {
	    return this.handler(request, values, this.options);
	  }.bind(this);
	};
	
	module.exports = Route;


/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	var isarray = __webpack_require__(144)
	
	/**
	 * Expose `pathToRegexp`.
	 */
	module.exports = pathToRegexp
	module.exports.parse = parse
	module.exports.compile = compile
	module.exports.tokensToFunction = tokensToFunction
	module.exports.tokensToRegExp = tokensToRegExp
	
	/**
	 * The main path matching regexp utility.
	 *
	 * @type {RegExp}
	 */
	var PATH_REGEXP = new RegExp([
	  // Match escaped characters that would otherwise appear in future matches.
	  // This allows the user to escape special characters that won't transform.
	  '(\\\\.)',
	  // Match Express-style parameters and un-named parameters with a prefix
	  // and optional suffixes. Matches appear as:
	  //
	  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
	  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
	  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
	  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
	].join('|'), 'g')
	
	/**
	 * Parse a string for the raw tokens.
	 *
	 * @param  {string} str
	 * @return {!Array}
	 */
	function parse (str) {
	  var tokens = []
	  var key = 0
	  var index = 0
	  var path = ''
	  var res
	
	  while ((res = PATH_REGEXP.exec(str)) != null) {
	    var m = res[0]
	    var escaped = res[1]
	    var offset = res.index
	    path += str.slice(index, offset)
	    index = offset + m.length
	
	    // Ignore already escaped sequences.
	    if (escaped) {
	      path += escaped[1]
	      continue
	    }
	
	    var next = str[index]
	    var prefix = res[2]
	    var name = res[3]
	    var capture = res[4]
	    var group = res[5]
	    var modifier = res[6]
	    var asterisk = res[7]
	
	    // Push the current path onto the tokens.
	    if (path) {
	      tokens.push(path)
	      path = ''
	    }
	
	    var partial = prefix != null && next != null && next !== prefix
	    var repeat = modifier === '+' || modifier === '*'
	    var optional = modifier === '?' || modifier === '*'
	    var delimiter = res[2] || '/'
	    var pattern = capture || group || (asterisk ? '.*' : '[^' + delimiter + ']+?')
	
	    tokens.push({
	      name: name || key++,
	      prefix: prefix || '',
	      delimiter: delimiter,
	      optional: optional,
	      repeat: repeat,
	      partial: partial,
	      asterisk: !!asterisk,
	      pattern: escapeGroup(pattern)
	    })
	  }
	
	  // Match any characters still remaining.
	  if (index < str.length) {
	    path += str.substr(index)
	  }
	
	  // If the path exists, push it onto the end.
	  if (path) {
	    tokens.push(path)
	  }
	
	  return tokens
	}
	
	/**
	 * Compile a string to a template function for the path.
	 *
	 * @param  {string}             str
	 * @return {!function(Object=, Object=)}
	 */
	function compile (str) {
	  return tokensToFunction(parse(str))
	}
	
	/**
	 * Prettier encoding of URI path segments.
	 *
	 * @param  {string}
	 * @return {string}
	 */
	function encodeURIComponentPretty (str) {
	  return encodeURI(str).replace(/[\/?#]/g, function (c) {
	    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
	  })
	}
	
	/**
	 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
	 *
	 * @param  {string}
	 * @return {string}
	 */
	function encodeAsterisk (str) {
	  return encodeURI(str).replace(/[?#]/g, function (c) {
	    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
	  })
	}
	
	/**
	 * Expose a method for transforming tokens into the path function.
	 */
	function tokensToFunction (tokens) {
	  // Compile all the tokens into regexps.
	  var matches = new Array(tokens.length)
	
	  // Compile all the patterns before compilation.
	  for (var i = 0; i < tokens.length; i++) {
	    if (typeof tokens[i] === 'object') {
	      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$')
	    }
	  }
	
	  return function (obj, opts) {
	    var path = ''
	    var data = obj || {}
	    var options = opts || {}
	    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent
	
	    for (var i = 0; i < tokens.length; i++) {
	      var token = tokens[i]
	
	      if (typeof token === 'string') {
	        path += token
	
	        continue
	      }
	
	      var value = data[token.name]
	      var segment
	
	      if (value == null) {
	        if (token.optional) {
	          // Prepend partial segment prefixes.
	          if (token.partial) {
	            path += token.prefix
	          }
	
	          continue
	        } else {
	          throw new TypeError('Expected "' + token.name + '" to be defined')
	        }
	      }
	
	      if (isarray(value)) {
	        if (!token.repeat) {
	          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
	        }
	
	        if (value.length === 0) {
	          if (token.optional) {
	            continue
	          } else {
	            throw new TypeError('Expected "' + token.name + '" to not be empty')
	          }
	        }
	
	        for (var j = 0; j < value.length; j++) {
	          segment = encode(value[j])
	
	          if (!matches[i].test(segment)) {
	            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
	          }
	
	          path += (j === 0 ? token.prefix : token.delimiter) + segment
	        }
	
	        continue
	      }
	
	      segment = token.asterisk ? encodeAsterisk(value) : encode(value)
	
	      if (!matches[i].test(segment)) {
	        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
	      }
	
	      path += token.prefix + segment
	    }
	
	    return path
	  }
	}
	
	/**
	 * Escape a regular expression string.
	 *
	 * @param  {string} str
	 * @return {string}
	 */
	function escapeString (str) {
	  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
	}
	
	/**
	 * Escape the capturing group by escaping special characters and meaning.
	 *
	 * @param  {string} group
	 * @return {string}
	 */
	function escapeGroup (group) {
	  return group.replace(/([=!:$\/()])/g, '\\$1')
	}
	
	/**
	 * Attach the keys as a property of the regexp.
	 *
	 * @param  {!RegExp} re
	 * @param  {Array}   keys
	 * @return {!RegExp}
	 */
	function attachKeys (re, keys) {
	  re.keys = keys
	  return re
	}
	
	/**
	 * Get the flags for a regexp from the options.
	 *
	 * @param  {Object} options
	 * @return {string}
	 */
	function flags (options) {
	  return options.sensitive ? '' : 'i'
	}
	
	/**
	 * Pull out keys from a regexp.
	 *
	 * @param  {!RegExp} path
	 * @param  {!Array}  keys
	 * @return {!RegExp}
	 */
	function regexpToRegexp (path, keys) {
	  // Use a negative lookahead to match only capturing groups.
	  var groups = path.source.match(/\((?!\?)/g)
	
	  if (groups) {
	    for (var i = 0; i < groups.length; i++) {
	      keys.push({
	        name: i,
	        prefix: null,
	        delimiter: null,
	        optional: false,
	        repeat: false,
	        partial: false,
	        asterisk: false,
	        pattern: null
	      })
	    }
	  }
	
	  return attachKeys(path, keys)
	}
	
	/**
	 * Transform an array into a regexp.
	 *
	 * @param  {!Array}  path
	 * @param  {Array}   keys
	 * @param  {!Object} options
	 * @return {!RegExp}
	 */
	function arrayToRegexp (path, keys, options) {
	  var parts = []
	
	  for (var i = 0; i < path.length; i++) {
	    parts.push(pathToRegexp(path[i], keys, options).source)
	  }
	
	  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options))
	
	  return attachKeys(regexp, keys)
	}
	
	/**
	 * Create a path regexp from string input.
	 *
	 * @param  {string}  path
	 * @param  {!Array}  keys
	 * @param  {!Object} options
	 * @return {!RegExp}
	 */
	function stringToRegexp (path, keys, options) {
	  var tokens = parse(path)
	  var re = tokensToRegExp(tokens, options)
	
	  // Attach keys back to the regexp.
	  for (var i = 0; i < tokens.length; i++) {
	    if (typeof tokens[i] !== 'string') {
	      keys.push(tokens[i])
	    }
	  }
	
	  return attachKeys(re, keys)
	}
	
	/**
	 * Expose a function for taking tokens and returning a RegExp.
	 *
	 * @param  {!Array}  tokens
	 * @param  {Object=} options
	 * @return {!RegExp}
	 */
	function tokensToRegExp (tokens, options) {
	  options = options || {}
	
	  var strict = options.strict
	  var end = options.end !== false
	  var route = ''
	  var lastToken = tokens[tokens.length - 1]
	  var endsWithSlash = typeof lastToken === 'string' && /\/$/.test(lastToken)
	
	  // Iterate over the tokens and create our regexp string.
	  for (var i = 0; i < tokens.length; i++) {
	    var token = tokens[i]
	
	    if (typeof token === 'string') {
	      route += escapeString(token)
	    } else {
	      var prefix = escapeString(token.prefix)
	      var capture = '(?:' + token.pattern + ')'
	
	      if (token.repeat) {
	        capture += '(?:' + prefix + capture + ')*'
	      }
	
	      if (token.optional) {
	        if (!token.partial) {
	          capture = '(?:' + prefix + '(' + capture + '))?'
	        } else {
	          capture = prefix + '(' + capture + ')?'
	        }
	      } else {
	        capture = prefix + '(' + capture + ')'
	      }
	
	      route += capture
	    }
	  }
	
	  // In non-strict mode we allow a slash at the end of match. If the path to
	  // match already ends with a slash, we remove it for consistency. The slash
	  // is valid at the end of a path match, not in the middle. This is important
	  // in non-ending mode, where "/test/" shouldn't match "/test//route".
	  if (!strict) {
	    route = (endsWithSlash ? route.slice(0, -2) : route) + '(?:\\/(?=$))?'
	  }
	
	  if (end) {
	    route += '$'
	  } else {
	    // In non-ending mode, we need the capturing groups to match as much as
	    // possible by using a positive lookahead to the end or next path segment.
	    route += strict && endsWithSlash ? '' : '(?=\\/|$)'
	  }
	
	  return new RegExp('^' + route, flags(options))
	}
	
	/**
	 * Normalize the given path string, returning a regular expression.
	 *
	 * An empty array can be passed in for the keys, which will hold the
	 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
	 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
	 *
	 * @param  {(string|RegExp|Array)} path
	 * @param  {(Array|Object)=}       keys
	 * @param  {Object=}               options
	 * @return {!RegExp}
	 */
	function pathToRegexp (path, keys, options) {
	  keys = keys || []
	
	  if (!isarray(keys)) {
	    options = /** @type {!Object} */ (keys)
	    keys = []
	  } else if (!options) {
	    options = {}
	  }
	
	  if (path instanceof RegExp) {
	    return regexpToRegexp(path, /** @type {!Array} */ (keys))
	  }
	
	  if (isarray(path)) {
	    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
	  }
	
	  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
	}


/***/ },
/* 144 */
/***/ function(module, exports) {

	module.exports = Array.isArray || function (arr) {
	  return Object.prototype.toString.call(arr) == '[object Array]';
	};


/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	/*
	  Copyright 2014 Google Inc. All Rights Reserved.
	
	  Licensed under the Apache License, Version 2.0 (the "License");
	  you may not use this file except in compliance with the License.
	  You may obtain a copy of the License at
	
	      http://www.apache.org/licenses/LICENSE-2.0
	
	  Unless required by applicable law or agreed to in writing, software
	  distributed under the License is distributed on an "AS IS" BASIS,
	  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	  See the License for the specific language governing permissions and
	  limitations under the License.
	*/
	'use strict';
	
	var globalOptions = __webpack_require__(140);
	var idbCacheExpiration = __webpack_require__(146);
	
	function debug(message, options) {
	  options = options || {};
	  var flag = options.debug || globalOptions.debug;
	  if (flag) {
	    console.log('[sw-toolbox] ' + message);
	  }
	}
	
	function openCache(options) {
	  var cacheName;
	  if (options && options.cache) {
	    cacheName = options.cache.name;
	  }
	  cacheName = cacheName || globalOptions.cache.name;
	
	  return caches.open(cacheName);
	}
	
	function fetchAndCache(request, options) {
	  options = options || {};
	  var successResponses = options.successResponses ||
	      globalOptions.successResponses;
	
	  return fetch(request.clone()).then(function(response) {
	    // Only cache GET requests with successful responses.
	    // Since this is not part of the promise chain, it will be done
	    // asynchronously and will not block the response from being returned to the
	    // page.
	    if (request.method === 'GET' && successResponses.test(response.status)) {
	      openCache(options).then(function(cache) {
	        cache.put(request, response).then(function() {
	          // If any of the options are provided in options.cache then use them.
	          // Do not fallback to the global options for any that are missing
	          // unless they are all missing.
	          var cacheOptions = options.cache || globalOptions.cache;
	
	          // Only run the cache expiration logic if at least one of the maximums
	          // is set, and if we have a name for the cache that the options are
	          // being applied to.
	          if ((cacheOptions.maxEntries || cacheOptions.maxAgeSeconds) &&
	              cacheOptions.name) {
	            queueCacheExpiration(request, cache, cacheOptions);
	          }
	        });
	      });
	    }
	
	    return response.clone();
	  });
	}
	
	var cleanupQueue;
	function queueCacheExpiration(request, cache, cacheOptions) {
	  var cleanup = cleanupCache.bind(null, request, cache, cacheOptions);
	
	  if (cleanupQueue) {
	    cleanupQueue = cleanupQueue.then(cleanup);
	  } else {
	    cleanupQueue = cleanup();
	  }
	}
	
	function cleanupCache(request, cache, cacheOptions) {
	  var requestUrl = request.url;
	  var maxAgeSeconds = cacheOptions.maxAgeSeconds;
	  var maxEntries = cacheOptions.maxEntries;
	  var cacheName = cacheOptions.name;
	
	  var now = Date.now();
	  debug('Updating LRU order for ' + requestUrl + '. Max entries is ' +
	    maxEntries + ', max age is ' + maxAgeSeconds);
	
	  return idbCacheExpiration.getDb(cacheName).then(function(db) {
	    return idbCacheExpiration.setTimestampForUrl(db, requestUrl, now);
	  }).then(function(db) {
	    return idbCacheExpiration.expireEntries(db, maxEntries, maxAgeSeconds, now);
	  }).then(function(urlsToDelete) {
	    debug('Successfully updated IDB.');
	
	    var deletionPromises = urlsToDelete.map(function(urlToDelete) {
	      return cache.delete(urlToDelete);
	    });
	
	    return Promise.all(deletionPromises).then(function() {
	      debug('Done with cache cleanup.');
	    });
	  }).catch(function(error) {
	    debug(error);
	  });
	}
	
	function renameCache(source, destination, options) {
	  debug('Renaming cache: [' + source + '] to [' + destination + ']', options);
	  return caches.delete(destination).then(function() {
	    return Promise.all([
	      caches.open(source),
	      caches.open(destination)
	    ]).then(function(results) {
	      var sourceCache = results[0];
	      var destCache = results[1];
	
	      return sourceCache.keys().then(function(requests) {
	        return Promise.all(requests.map(function(request) {
	          return sourceCache.match(request).then(function(response) {
	            return destCache.put(request, response);
	          });
	        }));
	      }).then(function() {
	        return caches.delete(source);
	      });
	    });
	  });
	}
	
	module.exports = {
	  debug: debug,
	  fetchAndCache: fetchAndCache,
	  openCache: openCache,
	  renameCache: renameCache
	};


/***/ },
/* 146 */
/***/ function(module, exports) {

	/*
	 Copyright 2015 Google Inc. All Rights Reserved.
	
	 Licensed under the Apache License, Version 2.0 (the "License");
	 you may not use this file except in compliance with the License.
	 You may obtain a copy of the License at
	
	     http://www.apache.org/licenses/LICENSE-2.0
	
	 Unless required by applicable law or agreed to in writing, software
	 distributed under the License is distributed on an "AS IS" BASIS,
	 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 See the License for the specific language governing permissions and
	 limitations under the License.
	*/
	'use strict';
	
	var DB_PREFIX = 'sw-toolbox-';
	var DB_VERSION = 1;
	var STORE_NAME = 'store';
	var URL_PROPERTY = 'url';
	var TIMESTAMP_PROPERTY = 'timestamp';
	var cacheNameToDbPromise = {};
	
	function openDb(cacheName) {
	  return new Promise(function(resolve, reject) {
	    var request = indexedDB.open(DB_PREFIX + cacheName, DB_VERSION);
	
	    request.onupgradeneeded = function() {
	      var objectStore = request.result.createObjectStore(STORE_NAME,
	          {keyPath: URL_PROPERTY});
	      objectStore.createIndex(TIMESTAMP_PROPERTY, TIMESTAMP_PROPERTY,
	          {unique: false});
	    };
	
	    request.onsuccess = function() {
	      resolve(request.result);
	    };
	
	    request.onerror = function() {
	      reject(request.error);
	    };
	  });
	}
	
	function getDb(cacheName) {
	  if (!(cacheName in cacheNameToDbPromise)) {
	    cacheNameToDbPromise[cacheName] = openDb(cacheName);
	  }
	
	  return cacheNameToDbPromise[cacheName];
	}
	
	function setTimestampForUrl(db, url, now) {
	  return new Promise(function(resolve, reject) {
	    var transaction = db.transaction(STORE_NAME, 'readwrite');
	    var objectStore = transaction.objectStore(STORE_NAME);
	    objectStore.put({url: url, timestamp: now});
	
	    transaction.oncomplete = function() {
	      resolve(db);
	    };
	
	    transaction.onabort = function() {
	      reject(transaction.error);
	    };
	  });
	}
	
	function expireOldEntries(db, maxAgeSeconds, now) {
	  // Bail out early by resolving with an empty array if we're not using
	  // maxAgeSeconds.
	  if (!maxAgeSeconds) {
	    return Promise.resolve([]);
	  }
	
	  return new Promise(function(resolve, reject) {
	    var maxAgeMillis = maxAgeSeconds * 1000;
	    var urls = [];
	
	    var transaction = db.transaction(STORE_NAME, 'readwrite');
	    var objectStore = transaction.objectStore(STORE_NAME);
	    var index = objectStore.index(TIMESTAMP_PROPERTY);
	
	    index.openCursor().onsuccess = function(cursorEvent) {
	      var cursor = cursorEvent.target.result;
	      if (cursor) {
	        if (now - maxAgeMillis > cursor.value[TIMESTAMP_PROPERTY]) {
	          var url = cursor.value[URL_PROPERTY];
	          urls.push(url);
	          objectStore.delete(url);
	          cursor.continue();
	        }
	      }
	    };
	
	    transaction.oncomplete = function() {
	      resolve(urls);
	    };
	
	    transaction.onabort = reject;
	  });
	}
	
	function expireExtraEntries(db, maxEntries) {
	  // Bail out early by resolving with an empty array if we're not using
	  // maxEntries.
	  if (!maxEntries) {
	    return Promise.resolve([]);
	  }
	
	  return new Promise(function(resolve, reject) {
	    var urls = [];
	
	    var transaction = db.transaction(STORE_NAME, 'readwrite');
	    var objectStore = transaction.objectStore(STORE_NAME);
	    var index = objectStore.index(TIMESTAMP_PROPERTY);
	
	    var countRequest = index.count();
	    index.count().onsuccess = function() {
	      var initialCount = countRequest.result;
	
	      if (initialCount > maxEntries) {
	        index.openCursor().onsuccess = function(cursorEvent) {
	          var cursor = cursorEvent.target.result;
	          if (cursor) {
	            var url = cursor.value[URL_PROPERTY];
	            urls.push(url);
	            objectStore.delete(url);
	            if (initialCount - urls.length > maxEntries) {
	              cursor.continue();
	            }
	          }
	        };
	      }
	    };
	
	    transaction.oncomplete = function() {
	      resolve(urls);
	    };
	
	    transaction.onabort = reject;
	  });
	}
	
	function expireEntries(db, maxEntries, maxAgeSeconds, now) {
	  return expireOldEntries(db, maxAgeSeconds, now).then(function(oldUrls) {
	    return expireExtraEntries(db, maxEntries).then(function(extraUrls) {
	      return oldUrls.concat(extraUrls);
	    });
	  });
	}
	
	module.exports = {
	  getDb: getDb,
	  setTimestampForUrl: setTimestampForUrl,
	  expireEntries: expireEntries
	};


/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	/*
		Copyright 2014 Google Inc. All Rights Reserved.
	
		Licensed under the Apache License, Version 2.0 (the "License");
		you may not use this file except in compliance with the License.
		You may obtain a copy of the License at
	
	      http://www.apache.org/licenses/LICENSE-2.0
	
		Unless required by applicable law or agreed to in writing, software
		distributed under the License is distributed on an "AS IS" BASIS,
		WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
		See the License for the specific language governing permissions and
		limitations under the License.
	*/
	module.exports = {
	  networkOnly: __webpack_require__(148),
	  networkFirst: __webpack_require__(149),
	  cacheOnly: __webpack_require__(150),
	  cacheFirst: __webpack_require__(151),
	  fastest: __webpack_require__(152)
	};


/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	/*
		Copyright 2014 Google Inc. All Rights Reserved.
	
		Licensed under the Apache License, Version 2.0 (the "License");
		you may not use this file except in compliance with the License.
		You may obtain a copy of the License at
	
	      http://www.apache.org/licenses/LICENSE-2.0
	
		Unless required by applicable law or agreed to in writing, software
		distributed under the License is distributed on an "AS IS" BASIS,
		WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
		See the License for the specific language governing permissions and
		limitations under the License.
	*/
	'use strict';
	var helpers = __webpack_require__(145);
	
	function networkOnly(request, values, options) {
	  helpers.debug('Strategy: network only [' + request.url + ']', options);
	  return fetch(request);
	}
	
	module.exports = networkOnly;


/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 Copyright 2015 Google Inc. All Rights Reserved.
	
	 Licensed under the Apache License, Version 2.0 (the "License");
	 you may not use this file except in compliance with the License.
	 You may obtain a copy of the License at
	
	     http://www.apache.org/licenses/LICENSE-2.0
	
	 Unless required by applicable law or agreed to in writing, software
	 distributed under the License is distributed on an "AS IS" BASIS,
	 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 See the License for the specific language governing permissions and
	 limitations under the License.
	*/
	'use strict';
	var globalOptions = __webpack_require__(140);
	var helpers = __webpack_require__(145);
	
	function networkFirst(request, values, options) {
	  options = options || {};
	  var successResponses = options.successResponses ||
	      globalOptions.successResponses;
	  // This will bypass options.networkTimeout if it's set to a false-y value like
	  // 0, but that's the sane thing to do anyway.
	  var networkTimeoutSeconds = options.networkTimeoutSeconds ||
	      globalOptions.networkTimeoutSeconds;
	  helpers.debug('Strategy: network first [' + request.url + ']', options);
	
	  return helpers.openCache(options).then(function(cache) {
	    var timeoutId;
	    var promises = [];
	    var originalResponse;
	
	    if (networkTimeoutSeconds) {
	      var cacheWhenTimedOutPromise = new Promise(function(resolve) {
	        timeoutId = setTimeout(function() {
	          cache.match(request).then(function(response) {
	            if (response) {
	              // Only resolve this promise if there's a valid response in the
	              // cache. This ensures that we won't time out a network request
	              // unless there's a cached entry to fallback on, which is arguably
	              // the preferable behavior.
	              resolve(response);
	            }
	          });
	        }, networkTimeoutSeconds * 1000);
	      });
	      promises.push(cacheWhenTimedOutPromise);
	    }
	
	    var networkPromise = helpers.fetchAndCache(request, options)
	      .then(function(response) {
	        // We've got a response, so clear the network timeout if there is one.
	        if (timeoutId) {
	          clearTimeout(timeoutId);
	        }
	
	        if (successResponses.test(response.status)) {
	          return response;
	        }
	
	        helpers.debug('Response was an HTTP error: ' + response.statusText,
	            options);
	        originalResponse = response;
	        throw new Error('Bad response');
	      }).catch(function(error) {
	        helpers.debug('Network or response error, fallback to cache [' +
	            request.url + ']', options);
	        return cache.match(request).then(function(response) {
	          // If there's a match in the cache, resolve with that.
	          if (response) {
	            return response;
	          }
	
	          // If we have a Response object from the previous fetch, then resolve
	          // with that, even though it corresponds to an error status code.
	          if (originalResponse) {
	            return originalResponse;
	          }
	
	          // If we don't have a Response object from the previous fetch, likely
	          // due to a network failure, then reject with the failure error.
	          throw error;
	        });
	      });
	
	    promises.push(networkPromise);
	
	    return Promise.race(promises);
	  });
	}
	
	module.exports = networkFirst;


/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	/*
		Copyright 2014 Google Inc. All Rights Reserved.
	
		Licensed under the Apache License, Version 2.0 (the "License");
		you may not use this file except in compliance with the License.
		You may obtain a copy of the License at
	
	      http://www.apache.org/licenses/LICENSE-2.0
	
		Unless required by applicable law or agreed to in writing, software
		distributed under the License is distributed on an "AS IS" BASIS,
		WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
		See the License for the specific language governing permissions and
		limitations under the License.
	*/
	'use strict';
	var helpers = __webpack_require__(145);
	
	function cacheOnly(request, values, options) {
	  helpers.debug('Strategy: cache only [' + request.url + ']', options);
	  return helpers.openCache(options).then(function(cache) {
	    return cache.match(request);
	  });
	}
	
	module.exports = cacheOnly;


/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	/*
		Copyright 2014 Google Inc. All Rights Reserved.
	
		Licensed under the Apache License, Version 2.0 (the "License");
		you may not use this file except in compliance with the License.
		You may obtain a copy of the License at
	
	      http://www.apache.org/licenses/LICENSE-2.0
	
		Unless required by applicable law or agreed to in writing, software
		distributed under the License is distributed on an "AS IS" BASIS,
		WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
		See the License for the specific language governing permissions and
		limitations under the License.
	*/
	'use strict';
	var helpers = __webpack_require__(145);
	
	function cacheFirst(request, values, options) {
	  helpers.debug('Strategy: cache first [' + request.url + ']', options);
	  return helpers.openCache(options).then(function(cache) {
	    return cache.match(request).then(function(response) {
	      if (response) {
	        return response;
	      }
	
	      return helpers.fetchAndCache(request, options);
	    });
	  });
	}
	
	module.exports = cacheFirst;


/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	/*
	  Copyright 2014 Google Inc. All Rights Reserved.
	
	  Licensed under the Apache License, Version 2.0 (the "License");
	  you may not use this file except in compliance with the License.
	  You may obtain a copy of the License at
	
	      http://www.apache.org/licenses/LICENSE-2.0
	
	  Unless required by applicable law or agreed to in writing, software
	  distributed under the License is distributed on an "AS IS" BASIS,
	  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	  See the License for the specific language governing permissions and
	  limitations under the License.
	*/
	'use strict';
	var helpers = __webpack_require__(145);
	var cacheOnly = __webpack_require__(150);
	
	function fastest(request, values, options) {
	  helpers.debug('Strategy: fastest [' + request.url + ']', options);
	
	  return new Promise(function(resolve, reject) {
	    var rejected = false;
	    var reasons = [];
	
	    var maybeReject = function(reason) {
	      reasons.push(reason.toString());
	      if (rejected) {
	        reject(new Error('Both cache and network failed: "' +
	            reasons.join('", "') + '"'));
	      } else {
	        rejected = true;
	      }
	    };
	
	    var maybeResolve = function(result) {
	      if (result instanceof Response) {
	        resolve(result);
	      } else {
	        maybeReject('No result returned');
	      }
	    };
	
	    helpers.fetchAndCache(request.clone(), options)
	      .then(maybeResolve, maybeReject);
	
	    cacheOnly(request, values, options)
	      .then(maybeResolve, maybeReject);
	  });
	}
	
	module.exports = fastest;


/***/ }
/******/ ]);
//# sourceMappingURL=sw.js.map