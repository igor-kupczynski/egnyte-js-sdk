(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function(target) {
	var undef;

	function isFunction(f) {
		return typeof f == 'function';
	}
	function isObject(f) {
		return typeof f == 'object';
	}
	function defer(callback) {
		if (typeof setImmediate != 'undefined')
			setImmediate(callback);
		else if (typeof process != 'undefined' && process['nextTick'])
			process['nextTick'](callback);
		else
			setTimeout(callback, 0);
	}

	target[0][target[1]] = function pinkySwear(extend) {
		var state;           // undefined/null = pending, true = fulfilled, false = rejected
		var values = [];     // an array of values as arguments for the then() handlers
		var deferred = [];   // functions to call when set() is invoked

		var set = function(newState, newValues) {
			if (state == null && newState != null) {
				state = newState;
				values = newValues;
				if (deferred.length)
					defer(function() {
						for (var i = 0; i < deferred.length; i++)
							deferred[i]();
					});
			}
			return state;
		};

		set['then'] = function (onFulfilled, onRejected) {
			var promise2 = pinkySwear(extend);
			var callCallbacks = function() {
	    		try {
	    			var f = (state ? onFulfilled : onRejected);
	    			if (isFunction(f)) {
		   				function resolve(x) {
						    var then, cbCalled = 0;
		   					try {
				   				if (x && (isObject(x) || isFunction(x)) && isFunction(then = x['then'])) {
										if (x === promise2)
											throw new TypeError();
										then['call'](x,
											function() { if (!cbCalled++) resolve.apply(undef,arguments); } ,
											function(value){ if (!cbCalled++) promise2(false,[value]);});
				   				}
				   				else
				   					promise2(true, arguments);
		   					}
		   					catch(e) {
		   						if (!cbCalled++)
		   							promise2(false, [e]);
		   					}
		   				}
		   				resolve(f.apply(undef, values || []));
		   			}
		   			else
		   				promise2(state, values);
				}
				catch (e) {
					promise2(false, [e]);
				}
			};
			if (state != null)
				defer(callCallbacks);
			else
				deferred.push(callCallbacks);
			return promise2;
		};
        if(extend){
            set = extend(set);
        }
		return set;
	};
})(typeof module == 'undefined' ? [window, 'pinkySwear'] : [module, 'exports']);
},{}],2:[function(require,module,exports){
var ua = typeof window !== 'undefined' ? window.navigator.userAgent : ''
  , isOSX = /OS X/.test(ua)
  , isOpera = /Opera/.test(ua)
  , maybeFirefox = !/like Gecko/.test(ua) && !isOpera

var i, output = module.exports = {
  0:  isOSX ? '<menu>' : '<UNK>'
, 1:  '<mouse 1>'
, 2:  '<mouse 2>'
, 3:  '<break>'
, 4:  '<mouse 3>'
, 5:  '<mouse 4>'
, 6:  '<mouse 5>'
, 8:  '<backspace>'
, 9:  '<tab>'
, 12: '<clear>'
, 13: '<enter>'
, 16: '<shift>'
, 17: '<control>'
, 18: '<alt>'
, 19: '<pause>'
, 20: '<caps-lock>'
, 21: '<ime-hangul>'
, 23: '<ime-junja>'
, 24: '<ime-final>'
, 25: '<ime-kanji>'
, 27: '<escape>'
, 28: '<ime-convert>'
, 29: '<ime-nonconvert>'
, 30: '<ime-accept>'
, 31: '<ime-mode-change>'
, 27: '<escape>'
, 32: '<space>'
, 33: '<page-up>'
, 34: '<page-down>'
, 35: '<end>'
, 36: '<home>'
, 37: '<left>'
, 38: '<up>'
, 39: '<right>'
, 40: '<down>'
, 41: '<select>'
, 42: '<print>'
, 43: '<execute>'
, 44: '<snapshot>'
, 45: '<insert>'
, 46: '<delete>'
, 47: '<help>'
, 91: '<meta>'  // meta-left -- no one handles left and right properly, so we coerce into one.
, 92: '<meta>'  // meta-right
, 93: isOSX ? '<meta>' : '<menu>'      // chrome,opera,safari all report this for meta-right (osx mbp).
, 95: '<sleep>'
, 106: '<num-*>'
, 107: '<num-+>'
, 108: '<num-enter>'
, 109: '<num-->'
, 110: '<num-.>'
, 111: '<num-/>'
, 144: '<num-lock>'
, 145: '<scroll-lock>'
, 160: '<shift-left>'
, 161: '<shift-right>'
, 162: '<control-left>'
, 163: '<control-right>'
, 164: '<alt-left>'
, 165: '<alt-right>'
, 166: '<browser-back>'
, 167: '<browser-forward>'
, 168: '<browser-refresh>'
, 169: '<browser-stop>'
, 170: '<browser-search>'
, 171: '<browser-favorites>'
, 172: '<browser-home>'

  // ff/osx reports '<volume-mute>' for '-'
, 173: isOSX && maybeFirefox ? '-' : '<volume-mute>'
, 174: '<volume-down>'
, 175: '<volume-up>'
, 176: '<next-track>'
, 177: '<prev-track>'
, 178: '<stop>'
, 179: '<play-pause>'
, 180: '<launch-mail>'
, 181: '<launch-media-select>'
, 182: '<launch-app 1>'
, 183: '<launch-app 2>'
, 186: ';'
, 187: '='
, 188: ','
, 189: '-'
, 190: '.'
, 191: '/'
, 192: '`'
, 219: '['
, 220: '\\'
, 221: ']'
, 222: "'"
, 223: '<meta>'
, 224: '<meta>'       // firefox reports meta here.
, 226: '<alt-gr>'
, 229: '<ime-process>'
, 231: isOpera ? '`' : '<unicode>'
, 246: '<attention>'
, 247: '<crsel>'
, 248: '<exsel>'
, 249: '<erase-eof>'
, 250: '<play>'
, 251: '<zoom>'
, 252: '<no-name>'
, 253: '<pa-1>'
, 254: '<clear>'
}

for(i = 58; i < 65; ++i) {
  output[i] = String.fromCharCode(i)
}

// 0-9
for(i = 48; i < 58; ++i) {
  output[i] = (i - 48)+''
}

// A-Z
for(i = 65; i < 91; ++i) {
  output[i] = String.fromCharCode(i)
}

// num0-9
for(i = 96; i < 106; ++i) {
  output[i] = '<num-'+(i - 96)+'>'
}

// F1-F24
for(i = 112; i < 136; ++i) {
  output[i] = 'F'+(i-111)
}
},{}],3:[function(require,module,exports){
var window = require(1)
var once = require(2)
var parseHeaders = require(3)

var messages = {
    "0": "Internal XMLHttpRequest Error",
    "4": "4xx Client Error",
    "5": "5xx Server Error"
}

var XHR = window.XMLHttpRequest || noop
var XDR = "withCredentials" in (new XHR()) ? XHR : window.XDomainRequest

module.exports = createXHR

function createXHR(options, callback) {
    if (typeof options === "string") {
        options = { uri: options }
    }

    options = options || {}
    callback = once(callback)

    var xhr = options.xhr || null

    if (!xhr) {
        if (options.cors || options.useXDR) {
            xhr = new XDR()
        }else{
            xhr = new XHR()
        }
    }

    var uri = xhr.url = options.uri || options.url
    var method = xhr.method = options.method || "GET"
    var body = options.body || options.data
    var headers = xhr.headers = options.headers || {}
    var sync = !!options.sync
    var isJson = false
    var key
    var load = options.response ? loadResponse : loadXhr

    if ("json" in options) {
        isJson = true
        headers["Accept"] = "application/json"
        if (method !== "GET" && method !== "HEAD") {
            headers["Content-Type"] = "application/json"
            body = JSON.stringify(options.json)
        }
    }

    xhr.onreadystatechange = readystatechange
    xhr.onload = load
    xhr.onerror = error
    // IE9 must have onprogress be set to a unique function.
    xhr.onprogress = function () {
        // IE must die
    }
    // hate IE
    xhr.ontimeout = noop
    xhr.open(method, uri, !sync)
                                    //backward compatibility
    if (options.withCredentials || (options.cors && options.withCredentials !== false)) {
        xhr.withCredentials = true
    }

    // Cannot set timeout with sync request
    if (!sync) {
        xhr.timeout = "timeout" in options ? options.timeout : 5000
    }

    if (xhr.setRequestHeader) {
        for(key in headers){
            if(headers.hasOwnProperty(key)){
                xhr.setRequestHeader(key, headers[key])
            }
        }
    } else if (options.headers) {
        throw new Error("Headers cannot be set on an XDomainRequest object")
    }

    if ("responseType" in options) {
        xhr.responseType = options.responseType
    }
    
    if ("beforeSend" in options && 
        typeof options.beforeSend === "function"
    ) {
        options.beforeSend(xhr)
    }

    xhr.send(body)

    return xhr

    function readystatechange() {
        if (xhr.readyState === 4) {
            load()
        }
    }

    function getBody() {
        // Chrome with requestType=blob throws errors arround when even testing access to responseText
        var body = null

        if (xhr.response) {
            body = xhr.response
        } else if (xhr.responseType === 'text' || !xhr.responseType) {
            body = xhr.responseText || xhr.responseXML
        }

        if (isJson) {
            try {
                body = JSON.parse(body)
            } catch (e) {}
        }

        return body
    }

    function getStatusCode() {
        return xhr.status === 1223 ? 204 : xhr.status
    }

    // if we're getting a none-ok statusCode, build & return an error
    function errorFromStatusCode(status) {
        var error = null
        if (status === 0 || (status >= 400 && status < 600)) {
            var message = (typeof body === "string" ? body : false) ||
                messages[String(status).charAt(0)]
            error = new Error(message)
            error.statusCode = status
        }

        return error
    }

    // will load the data & process the response in a special response object
    function loadResponse() {
        var status = getStatusCode()
        var error = errorFromStatusCode(status)
        var response = {
            body: getBody(),
            statusCode: status,
            statusText: xhr.statusText,
            raw: xhr
        }
        if(xhr.getAllResponseHeaders){ //remember xhr can in fact be XDR for CORS in IE
            response.headers = parseHeaders(xhr.getAllResponseHeaders())
        } else {
            response.headers = {}
        }

        callback(error, response, response.body)
    }

    // will load the data and add some response properties to the source xhr
    // and then respond with that
    function loadXhr() {
        var status = getStatusCode()
        var error = errorFromStatusCode(status)

        xhr.status = xhr.statusCode = status
        xhr.body = getBody()
        xhr.headers = parseHeaders(xhr.getAllResponseHeaders())

        callback(error, xhr, xhr.body)
    }

    function error(evt) {
        callback(evt, xhr)
    }
}


function noop() {}
},{"1":4,"2":5,"3":9}],4:[function(require,module,exports){
if (typeof window !== "undefined") {
    module.exports = window;
} else if (typeof global !== "undefined") {
    module.exports = global;
} else {
    module.exports = {};
}
},{}],5:[function(require,module,exports){
module.exports = once

once.proto = once(function () {
  Object.defineProperty(Function.prototype, 'once', {
    value: function () {
      return once(this)
    },
    configurable: true
  })
})

function once (fn) {
  var called = false
  return function () {
    if (called) return
    called = true
    return fn.apply(this, arguments)
  }
}
},{}],6:[function(require,module,exports){
var isFunction = require(1)

module.exports = forEach

var toString = Object.prototype.toString
var hasOwnProperty = Object.prototype.hasOwnProperty

function forEach(list, iterator, context) {
    if (!isFunction(iterator)) {
        throw new TypeError('iterator must be a function')
    }

    if (arguments.length < 3) {
        context = this
    }
    
    if (toString.call(list) === '[object Array]')
        forEachArray(list, iterator, context)
    else if (typeof list === 'string')
        forEachString(list, iterator, context)
    else
        forEachObject(list, iterator, context)
}

function forEachArray(array, iterator, context) {
    for (var i = 0, len = array.length; i < len; i++) {
        if (hasOwnProperty.call(array, i)) {
            iterator.call(context, array[i], i, array)
        }
    }
}

function forEachString(string, iterator, context) {
    for (var i = 0, len = string.length; i < len; i++) {
        // no such thing as a sparse string.
        iterator.call(context, string.charAt(i), i, string)
    }
}

function forEachObject(object, iterator, context) {
    for (var k in object) {
        if (hasOwnProperty.call(object, k)) {
            iterator.call(context, object[k], k, object)
        }
    }
}
},{"1":7}],7:[function(require,module,exports){
module.exports = isFunction

var toString = Object.prototype.toString

function isFunction (fn) {
  var string = toString.call(fn)
  return string === '[object Function]' ||
    (typeof fn === 'function' && string !== '[object RegExp]') ||
    (typeof window !== 'undefined' &&
     // IE8 and below
     (fn === window.setTimeout ||
      fn === window.alert ||
      fn === window.confirm ||
      fn === window.prompt))
};
},{}],8:[function(require,module,exports){
exports = module.exports = trim;

function trim(str){
  return str.replace(/^\s*|\s*$/g, '');
}

exports.left = function(str){
  return str.replace(/^\s*/, '');
};

exports.right = function(str){
  return str.replace(/\s*$/, '');
};
},{}],9:[function(require,module,exports){
var trim = require(2)
  , forEach = require(1)
  , isArray = function(arg) {
      return Object.prototype.toString.call(arg) === '[object Array]';
    }

module.exports = function (headers) {
  if (!headers)
    return {}

  var result = {}

  forEach(
      trim(headers).split('\n')
    , function (row) {
        var index = row.indexOf(':')
          , key = trim(row.slice(0, index)).toLowerCase()
          , value = trim(row.slice(index + 1))

        if (typeof(result[key]) === 'undefined') {
          result[key] = value
        } else if (isArray(result[key])) {
          result[key].push(value)
        } else {
          result[key] = [ result[key], value ]
        }
      }
  )

  return result
}

},{"1":6,"2":8}],10:[function(require,module,exports){
module.exports = {
    handleQuota: true,
    QPS: 2,
    forwarderAddress: "app/integ/forwarder/1.2/apiForwarder.html",
    channelMarker: "'E",
    httpRequest: null,
    oldIEForwarder: false
    
}

},{}],11:[function(require,module,exports){
(function () {
    "use strict";

    var helpers = require(4);
    var defaults = require(1);

    function init(egnyteDomainURL, opts) {
        var options = helpers.extend({},defaults, opts);
        options.egnyteDomainURL = helpers.normalizeURL(egnyteDomainURL);

        var api = require(2)(options);
      
        return {
            domain: options.egnyteDomainURL,
            filePicker: require(3)(api),
            API: api
        }

    }

    window.Egnyte = {
        init: init
    }

})();
},{"1":10,"2":12,"3":25,"4":33}],12:[function(require,module,exports){
var RequestEngine = require(4);
var AuthEngine = require(1);
var StorageFacade = require(5);
var LinkFacade = require(2);
var PermFacade = require(3);


module.exports = function (options) {
    var auth = new AuthEngine(options);
    var requestEngine = new RequestEngine(auth, options);

    var storage = new StorageFacade(requestEngine);
    var link = new LinkFacade(requestEngine);
    var perms = new PermFacade(requestEngine);
    var api = {
        auth: auth,
        storage: storage,
        link: link,
        perms: perms
    };

    //onlt in IE8 and IE9
    if (!("withCredentials" in (new window.XMLHttpRequest()))) {
        if (options.acceptForwarding) {
            //will handle incoming forwards
            var responder = require(6);
            responder(options, api);
        } else {
            //IE 8 and 9 forwarding
            if (options.oldIEForwarder) {
                var forwarder = require(7);
                forwarder(options, api);
            }
        }
    }

    api.manual = requestEngine;

    return api;
};
},{"1":13,"2":17,"3":19,"4":20,"5":21,"6":22,"7":23}],13:[function(require,module,exports){
var oauthRegex = /access_token=([^&]+)/;
var oauthDeniedRegex = /error=access_denied/;


var promises = require(6);
var helpers = require(3);
var dom = require(2);
var messages = require(4);
var errorify = require(5);


var ENDPOINTS_userinfo = require(1).userinfo;


function Auth(options) {
    this.options = options;
    if (this.options.token) {
        this.token = this.options.token;
    }
    this.userInfo = null;
    this.getUserInfo = helpers.bindThis(this, this.getUserInfo);

}

var authPrototypeMethods = {};

authPrototypeMethods._reloadForToken = function () {
    window.location.href = this.options.egnyteDomainURL + "/puboauth/token?client_id=" + this.options.key + "&mobile=" + ~~(this.options.mobile) + "&redirect_uri=" + window.location.href;
}

authPrototypeMethods._checkTokenResponse = function (success, denied, notoken, overrideWindow) {
    var win = overrideWindow || window;
    if (!this.token) {
        this.userInfo = null;
        var access = oauthRegex.exec(win.location.hash);
        if (access) {
            if (access.length > 1) {
                this.token = access[1];
                //overrideWindow || (window.location.hash = "");
                success && success();
            } else {
                //what now?
            }
        } else {
            if (oauthDeniedRegex.test(win.location.href)) {
                denied && denied();
            } else {
                notoken && notoken();
            }
        }
    } else {
        success && success();
    }
}

authPrototypeMethods.requestTokenReload = function (callback, denied) {
    this._checkTokenResponse(callback, denied, helpers.bindThis(this, this._reloadForToken));
}

authPrototypeMethods.requestTokenIframe = function (targetNode, callback, denied, emptyPageURL) {
    if (!this.token) {
        var self = this;
        var locationObject = window.location;
        emptyPageURL = (emptyPageURL) ? locationObject.protocol + "//" + locationObject.host + emptyPageURL : locationObject.href;
        var url = this.options.egnyteDomainURL + "/puboauth/token?client_id=" + this.options.key + "&mobile=" + ~~(this.options.mobile) + "&redirect_uri=" + emptyPageURL;
        var iframe = dom.createFrame(url, !!"scrollbars please");
        iframe.onload = function () {
            try {
                var location = iframe.contentWindow.location;
                var override = {
                    location: {
                        hash: "" + location.hash,
                        href: "" + location.href
                    }
                };

                self._checkTokenResponse(function () {
                    iframe.src = "";
                    targetNode.removeChild(iframe);
                    callback();
                }, function () {
                    iframe.src = "";
                    targetNode.removeChild(iframe);
                    denied();
                }, null, override);
            } catch (e) {}
        }
        targetNode.appendChild(iframe);
    } else {
        callback();
    }

}


authPrototypeMethods._postTokenUp = function () {
    var self = this;
    if (!this.token && window.name === this.options.channelMarker) {
        var channel = {
            marker: this.options.channelMarker,
            sourceOrigin: this.options.egnyteDomainURL
        };

        this._checkTokenResponse(function () {
            messages.sendMessage(window.opener, channel, "token", self.token);
        }, function () {
            messages.sendMessage(window.opener, channel, "denied", "");
        });

    }
}
authPrototypeMethods.requestTokenPopup = function (callback, denied, recvrURL) {
    var self = this;
    if (!this.token) {
        var url = this.options.egnyteDomainURL + "/puboauth/token?client_id=" + this.options.key + "&mobile=" + ~~(this.options.mobile) + "&redirect_uri=" + recvrURL;
        var win = window.open(url);
        win.name = this.options.channelMarker;
        var handler = messages.createMessageHandler(null, this.options.channelMarker, function (message) {
            listener.destroy();
            win.close();
            if (message.action === "token") {
                self.token = message.data;
                callback && callback();
            }
            if (message.action === "denied") {
                denied && denied();
            }
        });
        var listener = dom.addListener(window, "message", handler);
    } else {
        callback();
    }

}

authPrototypeMethods.requestTokenByPassword = function (username, password) {
    var self = this;

    return this.requestEngine.promiseRequest({
        method: "POST",
        url: this.options.egnyteDomainURL + "/puboauth/token",
        headers: {
            "content-type": "application/x-www-form-urlencoded"
        },
        body: [
            "client_id=" + this.options.key,
            "grant_type=password",
            "username=" + username,
            "password=" + password
        ].join("&")
    },null,!!"forceNoAuth").then(function (result) { //result.response result.body
        self.token = result.body.access_token
        return self.token;
    });
}

authPrototypeMethods.authorizeXHR = function (xhr) {
    //assuming token_type was bearer, no use for XHR otherwise, right?
    xhr.setRequestHeader("Authorization", "Bearer " + this.token);
}

authPrototypeMethods.getHeaders = function () {
    return {
        "Authorization": "Bearer " + this.token
    };
}


authPrototypeMethods.isAuthorized = function () {
    return !!this.token;
}

authPrototypeMethods.getToken = function () {
    return this.token;
}

authPrototypeMethods.setToken = function (externalToken) {
    this.token = externalToken;
}


authPrototypeMethods.dropToken = function (externalToken) {
    this.token = null;
}


//======================================================================
//api facade


authPrototypeMethods.addRequestEngine = function (requestEngine) {
    this.requestEngine = requestEngine;
}

authPrototypeMethods.getUserInfo = function () {
    var self = this;
    if (self.userInfo || !this.requestEngine) {
        return promises(true).then(function () {
            return self.userInfo;
        });
    } else {
        return this.requestEngine.promiseRequest({
            method: "GET",
            url: this.requestEngine.getEndpoint() + ENDPOINTS_userinfo,
        }).then(function (result) { //result.response result.body
            self.userInfo = result.body;
            return result.body;
        });
    }
}

Auth.prototype = authPrototypeMethods;

module.exports = Auth;
},{"1":24,"2":32,"3":33,"4":34,"5":16,"6":31}],14:[function(require,module,exports){
var promises = require(3);
var helpers = require(2);
var ENDPOINTS = require(1);


function genericUpload(requestEngine, decorate, pathFromRoot, headers, file) {
    pathFromRoot = helpers.encodeNameSafe(pathFromRoot) || "";

    var opts = {
        headers: headers,
        method: "POST",
        url: requestEngine.getEndpoint() + ENDPOINTS.fschunked + encodeURI(pathFromRoot),
        body: file,
    }

    return requestEngine.promiseRequest(decorate(opts));
}

function ChunkedUploader(storage, pathFromRoot, mimeType) {
    this.storage = storage;
    this.path = pathFromRoot;
    this.mime = mimeType;
    this.num = 1;
    this.successful = 1;
    this.chunksPromised = [];
}

var chunkedUploaderProto = {};

chunkedUploaderProto.setId = function (id) {
    this.id = id;
};

chunkedUploaderProto.sendChunk = function (content, num, verify) {
    var self = this;
    var requestEngine = this.storage.requestEngine;
    var decorate = this.storage.getDecorator();
    if (num) {
        self.num = num;
    } else {
        num = (++self.num);
    }
    var headers = {
        "x-egnyte-upload-id": self.id,
        "x-egnyte-chunk-num": self.num,

    };
    var promised = genericUpload(requestEngine, decorate, self.path, headers, content)
        .then(function (result) {
            verify && verify(result.response.headers["x-egnyte-chunk-sha512-checksum"]);
            self.successful++;
            return result;
        });
    self.chunksPromised.push(promised);
    return promised;

};


chunkedUploaderProto.sendLastChunk = function (content, verify) {
    var self = this;
    var requestEngine = this.storage.requestEngine;
    var decorate = this.storage.getDecorator();

    var headers = {
        "x-egnyte-upload-id": self.id,
        "x-egnyte-last-chunk": true,
        "x-egnyte-chunk-num": self.num + 1
    };
    if (self.mime) {
        headers["content-type"] = self.mime;
    }

    return promises.allSettled(this.chunksPromised)
        .then(function () {
            if (self.num === self.successful) {
                return genericUpload(requestEngine, decorate, self.path, headers, content)
                    .then(function (result) {
                        verify && verify(result.response.headers["x-egnyte-chunk-sha512-checksum"]);
                        return ({
                            id: result.response.headers["etag"],
                            path: self.path
                        });
                    });
            } else {
                throw new Error("Tried to commit a file with missing chunks (some uploads failed)");
            }
        });

};

ChunkedUploader.prototype = chunkedUploaderProto;

exports.startChunkedUpload = function (pathFromRoot, fileOrBlob, mimeType, verify) {
    var requestEngine = this.requestEngine;
    var decorate = this.getDecorator();
    var chunkedUploader = new ChunkedUploader(this, pathFromRoot, mimeType);
    return promises(true).then(function () {
        var file = fileOrBlob;
        var headers = {};
        if (mimeType) {
            headers["content-type"] = mimeType;
        }
        return genericUpload(requestEngine, decorate, pathFromRoot, headers, fileOrBlob);
    }).then(function (result) { //result.response result.body
        verify && verify(result.response.headers["x-egnyte-chunk-sha512-checksum"]);
        chunkedUploader.setId(result.response.headers["x-egnyte-upload-id"])
        return chunkedUploader;
    });

}

},{"1":24,"2":33,"3":31}],15:[function(require,module,exports){
var helpers = require(1);

var defaultDecorators = {

    "impersonate": function (opts, data) {
        if (!opts.headers) {
            opts.headers = {}
        }
        if (data.username) {
            opts.headers["X-Egnyte-Act-As"] = data.username;
        }
        if (data.email) {
            opts.headers["X-Egnyte-Act-As-Email"] = data.email;
        }
        return opts;
    }

}



function getDecorator() {
    var self = this;
    return function (opts) {
        helpers.each(self._decorators, function (decor, name) {
            if (self._decorations[name] !== undefined) {
                opts = decor(opts, self._decorations[name]);
            }
        });
        return opts;
    }
}

module.exports = {
    install: function (self) {

        function exposeDecorators(that) {
            helpers.each(that._decorators, function (decor, name) {
                that[name] = function (data) {
                    var Decorated = function () {};
                    Decorated.prototype = this;
                    var instance = new Decorated;
                    instance.getDecorator = getDecorator;
                    instance._decorations = helpers.extend({}, this._decorations)
                    instance._decorations[name] = data;
                    exposeDecorators(instance);
                    return instance;
                }
            });
        }

        self._decorators = helpers.extend({}, defaultDecorators);
        exposeDecorators(self);

        self.addDecorator = function (name, action) {
            this._decorators[name] = action;
            exposeDecorators(this);
        };
        self.getDecorator = function () {
            return helpers.id;
        }



    }
}

},{"1":33}],16:[function(require,module,exports){
var isMsg = {
    "msg": 1,
    "message": 1,
    "errorMessage": 1
};

var htmlMsgRegex = /^\s*<h1>([^<]*)<\/h1>\s*$/gi;

function findMessage(obj) {
    var result;
    for (var i in obj) {
        if (isMsg[i]) {
            return obj[i];
        }
        if (typeof obj[i] === "object") {
            result = findMessage(obj[i]);
            if (result) {
                return result;
            }
        }
    }
}
//this should understand all the message formats from the server and translate to a nice message
function psychicMessageParser(mess, statusCode) {
    var nice;
    if (typeof mess === "string") {
        try {
            nice = findMessage(JSON.parse(mess));
            if (!nice) {
                //fallback if nothing found - return raw JSON string anyway
                nice = mess;
            }
        } catch (e) {
            nice = mess ? mess.replace(htmlMsgRegex, "$1") : "Unknown error";
        }
        if (statusCode === 404 && mess.length > 300) {
            //server returned a dirty 404
            nice = "Not found";
        }
    } else {
        nice = findMessage(mess);
    }
    return nice;
}

module.exports = function (result) {
    var error, code;
    if (result.response) {
        code = ~~ (result.response.statusCode);
        error = result.error;
        error.statusCode = code;
        error.message = psychicMessageParser(result.body||result.error.message, code);
        error.response = result.response;
        error.body = result.body;
    } else {
        error = result.error;
        error.statusCode = 0;
    }
    return error;
}

},{}],17:[function(require,module,exports){
var promises = require(4);
var helpers = require(2);
var decorators = require(3);

var ENDPOINTS_links = require(1).links;

function Links(requestEngine) {
    this.requestEngine = requestEngine;
    decorators.install(this);
}

var linksProto = {};

linksProto.createLink = function (setup) {
    var requestEngine = this.requestEngine;
    var decorate = this.getDecorator();
    var defaults = {
        path: null,
        type: "file",
        accessibility: "domain"
    };
    return promises(true)
        .then(function () {
            setup = helpers.extend(defaults, setup);
            setup.path = helpers.encodeNameSafe(setup.path);

            if (!setup.path) {
                throw new Error("Path attribute missing or incorrect");
            }

            return requestEngine.promiseRequest(decorate({
                method: "POST",
                url: requestEngine.getEndpoint() + ENDPOINTS_links,
                json: setup
            }));
        }).then(function (result) { //result.response result.body
            return result.body;
        });
}


linksProto.removeLink = function (id) {
    var requestEngine = this.requestEngine;
    var decorate = this.getDecorator();
    return requestEngine.promiseRequest(decorate({
        method: "DELETE",
        url: requestEngine.getEndpoint() + ENDPOINTS_links + "/" + id
    })).then(function (result) { //result.response result.body
        return result.response.statusCode;
    });
}

linksProto.listLink = function (id) {
    var requestEngine = this.requestEngine;
    var decorate = this.getDecorator();
    return requestEngine.promiseRequest(decorate({
        method: "GET",
        url: requestEngine.getEndpoint() + ENDPOINTS_links + "/" + id
    })).then(function (result) { //result.response result.body
        return result.body;
    });
}


linksProto.listLinks = function (filters) {
    var requestEngine = this.requestEngine;
    var decorate = this.getDecorator();
    return promises(true)
        .then(function () {
            filters.path = filters.path && helpers.encodeNameSafe(filters.path);

            return requestEngine.promiseRequest(decorate({
                method: "get",
                url: requestEngine.getEndpoint() + ENDPOINTS_links,
                params: filters
            }));
        }).then(function (result) { //result.response result.body
            return result.body;
        });
}

linksProto.findOne = function (filters) {
    var self = this;
    return self.listLinks(filters).then(function (list) {
        if (list.ids && list.ids.length > 0) {
            return self.listLink(list.ids[0]);
        } else {
            return null;
        }
    });
}

Links.prototype = linksProto;

module.exports = Links;
},{"1":24,"2":33,"3":15,"4":31}],18:[function(require,module,exports){
var promises = require(3);
var helpers = require(2);

var ENDPOINTS_notes = require(1).notes;

exports.addNote = function (pathFromRoot, body) {
    var requestEngine = this.requestEngine;
    var decorate = this.getDecorator();
    return promises(true).then(function () {
        pathFromRoot = helpers.encodeNameSafe(pathFromRoot);
        var opts = {
            method: "POST",
            headers: {
                "content-type": "application/vnd.egnyte.annotations.request+json;v=1"
            },
            url: requestEngine.getEndpoint() + ENDPOINTS_notes,
            body: JSON.stringify({
                "path": pathFromRoot,
                "body": body,
            })
        };
        return requestEngine.promiseRequest(decorate(opts));
    }).then(function (result) { //result.response result.body
        return {
            id: result.body.id
        };
    });

}
exports.listNotes = function (pathFromRoot, params) {
    var requestEngine = this.requestEngine;
    var decorate = this.getDecorator();
    return promises(true).then(function () {
        pathFromRoot = helpers.encodeNameSafe(pathFromRoot);
        var opts = {
            method: "GET",
            url: requestEngine.getEndpoint() + ENDPOINTS_notes
        };

        //xhr and request differ here
        opts.params = helpers.extend({
            "file": encodeURI(pathFromRoot)
        }, params);

        return requestEngine.promiseRequest(decorate(opts)).then(function(result){
            return result.body;
        });
    });

}

exports.getNote = function (id) {
    var requestEngine = this.requestEngine;
    var decorate = this.getDecorator();
    return promises(true).then(function () {
        var opts = {
            method: "GET",
            url: requestEngine.getEndpoint() + ENDPOINTS_notes + "/" + encodeURI(id)
        };
        return requestEngine.promiseRequest(decorate(opts)).then(function (result) {
            return result.body;
        });
    });

}
exports.removeNote = function (id) {
    var requestEngine = this.requestEngine;
    var decorate = this.getDecorator();
    return promises(true).then(function () {
        var opts = {
            method: "DELETE",
            url: requestEngine.getEndpoint() + ENDPOINTS_notes + "/" + encodeURI(id)
        };
        return requestEngine.promiseRequest(decorate(opts));
    });

}





},{"1":24,"2":33,"3":31}],19:[function(require,module,exports){
var promises = require(4);
var helpers = require(2);
var decorators = require(3);

var ENDPOINTS_perms = require(1).perms;

function Perms(requestEngine) {
    this.requestEngine = requestEngine;
    decorators.install(this);

    this.addDecorator("users", enlist("users"))
    this.addDecorator("groups", enlist("groups"))

}

function enlist(what) {
    return function (opts, data) {
        switch (opts.method) {
        case 'GET':
            opts.params || (opts.params = {});
            opts.params[what] = data.join("|");
            break;
        case 'POST':
            opts.json[what] = data;
            break;
        }
        return opts;
    }
}


var permsProto = {};

permsProto.disallow = function (pathFromRoot) {
    return this.allow(pathFromRoot, "None");
}
permsProto.allowView = function (pathFromRoot) {
    return this.allow(pathFromRoot, "Viewer");
}
permsProto.allowEdit = function (pathFromRoot) {
    return this.allow(pathFromRoot, "Editor");
}
permsProto.allowFullAccess = function (pathFromRoot) {
    return this.allow(pathFromRoot, "Full");
}
permsProto.allowOwnership = function (pathFromRoot) {
    return this.allow(pathFromRoot, "Owner");
}

permsProto.allow = function (pathFromRoot, permission) {
    var requestEngine = this.requestEngine;
    var decorate = this.getDecorator();

    return promises(true)
        .then(function () {
            pathFromRoot = helpers.encodeNameSafe(pathFromRoot) || "";
            var opts = {
                method: "POST",
                url: requestEngine.getEndpoint() + ENDPOINTS_perms + pathFromRoot,
                json: {
                    "permission": permission
                }
            };
            return requestEngine.promiseRequest(decorate(opts));
        }).then(function (result) { //result.response result.body
            return result.response;
        });
};

permsProto.getPerms = function (pathFromRoot) {
    var requestEngine = this.requestEngine;
    var decorate = this.getDecorator();

    return promises(true)
        .then(function () {
            pathFromRoot = helpers.encodeNameSafe(pathFromRoot) || "";
            var opts = {
                method: "GET",
                url: requestEngine.getEndpoint() + ENDPOINTS_perms + pathFromRoot
            };
            return requestEngine.promiseRequest(decorate(opts));
        }).then(function (result) { //result.response result.body
            return result.body;
        });
};


Perms.prototype = permsProto;

module.exports = Perms;
},{"1":24,"2":33,"3":15,"4":31}],20:[function(require,module,exports){
var quotaRegex = /^<h1>Developer Over Qps/i;


var promises = require(5);
var helpers = require(2);
var dom = require(1);
var messages = require(3);
var errorify = require(4);
var request = require(6);



function Engine(auth, options) {
    this.auth = auth;
    this.options = options;

    this.requestHandler = (options.httpRequest) ? options.httpRequest : request;

    this.quota = {
        startOfTheSecond: 0,
        calls: 0,
        retrying: 0
    }
    this.queue = [];

    this.queueHandler = helpers.bindThis(this, _rollQueue);

    auth.addRequestEngine(this);

}

var enginePrototypeMethods = {};



//======================================================================
//request handling
function params(obj) {
    var str = [];
    //cachebuster for IE
    //    if (typeof window !== "undefined" && window.XDomainRequest) {
    //        str.push("random=" + (~~(Math.random() * 9999)));
    //    }
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    }
    if (str.length) {
        return "?" + str.join("&");
    } else {
        return "";
    }
}

enginePrototypeMethods.getEndpoint = function () {
    return this.options.egnyteDomainURL + "/pubapi/v1";
}

enginePrototypeMethods.promise = function (value) {
    return promises(value);
}

enginePrototypeMethods.sendRequest = function (opts, callback, forceNoAuth) {
    var self = this;
    var originalOpts = helpers.extend({}, opts);
    //IE8/9 
    if (typeof window !== "undefined" && window.XDomainRequest) {
        opts.response = true;
    }

    if (this.auth.isAuthorized() || forceNoAuth) {
        opts.url += params(opts.params);
        opts.headers = opts.headers || {};
        opts.headers["Authorization"] = "Bearer " + this.auth.getToken();
        if (!callback) {
            return self.requestHandler(opts);
        } else {
            var retry = function () {
                self.sendRequest(originalOpts, self.retryHandler(callback, retry));
            };
            return self.requestHandler(opts, self.retryHandler(callback, retry));
        }
    } else {
        callback.call(this, new Error("Not authorized"), {
            statusCode: 0
        }, null);
    }

}

enginePrototypeMethods.retryHandler = function (callback, retry) {
    var self = this;
    return function (error, response, body) {
        //emulating the default XHR behavior
        if (!error && response.statusCode >= 400 && response.statusCode < 600) {
            error = new Error(body);
        }
        try {
            //this shouldn't be required, but server sometimes responds with content-type text/plain
            body = JSON.parse(body);
        } catch (e) {}

        if(response){
        var retryAfter = response.headers["retry-after"];
        var masheryCode = response.headers["x-mashery-error-code"];
        //in case headers get returned as arrays, we only expect one value
        retryAfter = typeof retryAfter === "array" ? retryAfter[0] : retryAfter;
        masheryCode = typeof masheryCode === "array" ? masheryCode[0] : masheryCode;
        }

        if (
            response &&
            self.options.handleQuota &&
            response.statusCode === 403 &&
            retryAfter
        ) {
            if (masheryCode === "ERR_403_DEVELOPER_OVER_QPS") {
                //retry
                console && console.warn("developer over QPS, retrying");
                self.quota.retrying = 1000 * ~~(retryAfter);
                setTimeout(function () {
                    self.quota.retrying = 0;
                    retry();

                }, self.quota.retrying);

            }
            if (masheryCode === "ERR_403_DEVELOPER_OVER_RATE") {
                error.RATE = true;
                callback.call(this, error, response, body);
            }

        } else {

            if (
                response &&
                //Checking for failed auth responses
                //(ノಠ益ಠ)ノ彡┻━┻
                self.options.onInvalidToken &&
                (
                    response.statusCode === 401 ||
                    (
                        response.statusCode === 403 &&
                        masheryCode === "ERR_403_DEVELOPER_INACTIVE"
                    )
                )
            ) {
                self.auth.dropToken();
                self.options.onInvalidToken();
            }

            callback.call(this, error, response, body);
        }
    };
}

enginePrototypeMethods.retrieveStreamFromRequest = function (opts) {
    var defer = promises.defer();
    var self = this;
    var requestFunction = function () {

        try {
            var req = self.sendRequest(opts);
            defer.resolve(req);
        } catch (error) {
            defer.reject(errorify({
                error: error
            }));
        }
    }

    if (!this.options.handleQuota) {
        requestFunction();
    } else {
        //add to queue
        this.queue.push(requestFunction);
        //stop previous queue processing if any
        clearTimeout(this.quota.to);
        //start queue processing
        this.queueHandler();
    }
    return defer.promise;
}

enginePrototypeMethods.promiseRequest = function (opts, requestHandler, forceNoAuth) {
    var defer = promises.defer();
    var self = this;
    var requestFunction = function () {
        try {
            var req = self.sendRequest(opts, function (error, response, body) {
                if (error) {
                    defer.reject(errorify({
                        error: error,
                        response: response,
                        body: body
                    }));
                } else {
                    defer.resolve({
                        response: response,
                        body: body
                    });
                }
            }, forceNoAuth);
            requestHandler && requestHandler(req);
        } catch (error) {
            defer.reject(errorify({
                error: error
            }));
        }
    }
    if (!this.options.handleQuota) {
        requestFunction();
    } else {
        //add to queue
        this.queue.push(requestFunction);
        //stop previous queue processing if any
        clearTimeout(this.quota.to);
        //start queue processing
        this.queueHandler();
    }
    return defer.promise;
}


//gets bound to this in the constructor and saved as this.queueHandler
function _rollQueue() {
    if (this.queue.length) {
        var currentWait = _quotaWaitTime(this.quota, this.options.QPS);
        if (currentWait === 0) {
            var requestFunction = this.queue.shift();
            requestFunction();
            this.quota.calls++;
        }
        this.quota.to = setTimeout(this.queueHandler, currentWait);
    }

}

function _quotaWaitTime(quota, QPS) {
    var now = +new Date();
    var diff = now - quota.startOfTheSecond;
    //in the middle of retrying a denied call
    if (quota.retrying) {
        quota.startOfTheSecond = now + quota.retrying;
        return quota.retrying + 1;
    }
    //last call was over a second ago, can start
    if (diff > 1000) {
        quota.startOfTheSecond = now;
        quota.calls = 0;
        return 0;
    }
    //calls limit not reached
    if (quota.calls < QPS) {
        return 0;
    }
    //calls limit reached, delay to the next second
    return 1001 - diff;
}


Engine.prototype = enginePrototypeMethods;

module.exports = Engine;
},{"1":32,"2":33,"3":34,"4":16,"5":31,"6":3}],21:[function(require,module,exports){
var promises = require(6);
var helpers = require(2);
var decorators = require(4);
var notes = require(5);
var chunkedUpload = require(3);

var ENDPOINTS = require(1);


function Storage(requestEngine) {
    this.requestEngine = requestEngine;
    decorators.install(this);
}

var storageProto = {};
storageProto.exists = function (pathFromRoot, versionEntryId) {
    var requestEngine = this.requestEngine;
    var decorate = this.getDecorator();
    return promises(true).then(function () {
        pathFromRoot = helpers.encodeNameSafe(pathFromRoot);
        var opts = {
            method: "GET",
            url: requestEngine.getEndpoint() + ENDPOINTS.fsmeta + encodeURI(pathFromRoot),
        };

        if (versionEntryId) {
            opts.params = {
                "entry_id": versionEntryId
            };
        }

        return requestEngine.promiseRequest(decorate(opts));
    }).then(function (result) { //result.response result.body
        if (result.response.statusCode == 200) {
            return true;
        } else {
            return false;
        }
    }, function (result) { //result.error result.response, result.body
        if (result.response && result.response.statusCode == 404) {
            return false;
        } else {
            throw result;
        }
    });
}

storageProto.get = function (pathFromRoot, versionEntryId) {
    var requestEngine = this.requestEngine;
    var decorate = this.getDecorator();
    return promises(true).then(function () {
        pathFromRoot = helpers.encodeNameSafe(pathFromRoot);
        var opts = {
            method: "GET",
            url: requestEngine.getEndpoint() + ENDPOINTS.fsmeta + encodeURI(pathFromRoot),
        };

        if (versionEntryId) {
            opts.params = {
                "entry_id": versionEntryId
            };
        }

        return requestEngine.promiseRequest(decorate(opts));
    }).then(function (result) { //result.response result.body
        return result.body;
    });
}

storageProto.download = function (pathFromRoot, versionEntryId, isBinary) {
    var requestEngine = this.requestEngine;
    var decorate = this.getDecorator();
    return promises(true).then(function () {
        pathFromRoot = helpers.encodeNameSafe(pathFromRoot);

        var opts = {
            method: "GET",
            url: requestEngine.getEndpoint() + ENDPOINTS.fscontent + encodeURI(pathFromRoot),
        }
        if (versionEntryId) {
            opts.params = {
                "entry_id": versionEntryId
            };
        }

        if (isBinary) {
            opts.responseType = "arraybuffer";
        }

        return requestEngine.promiseRequest(decorate(opts));
    }).then(function (result) { //result.response result.body
        return result.response;
    });
}

storageProto.createFolder = function (pathFromRoot) {
    var requestEngine = this.requestEngine;
    var decorate = this.getDecorator();
    return promises(true).then(function () {
        pathFromRoot = helpers.encodeNameSafe(pathFromRoot);
        var opts = {
            method: "POST",
            url: requestEngine.getEndpoint() + ENDPOINTS.fsmeta + encodeURI(pathFromRoot),
            json: {
                "action": "add_folder"
            }
        };
        return requestEngine.promiseRequest(decorate(opts));
    }).then(function (result) { //result.response result.body
        if (result.response.statusCode == 201) {
            return {
                id: result.response.headers["etag"],
                path: pathFromRoot
            };
        }
    });
}

storageProto.move = storageProto.rename = function (pathFromRoot, newPath) {
    return transfer(this.requestEngine, this.getDecorator(), pathFromRoot, newPath, "move");
}

storageProto.copy = function (pathFromRoot, newPath) {
    return transfer(this.requestEngine, this.getDecorator(), pathFromRoot, newPath, "copy");
}

function transfer(requestEngine, decorate, pathFromRoot, newPath, action) {
    return promises(true).then(function () {
        if (!newPath) {
            throw new Error("Cannot move to empty path");
        }
        pathFromRoot = helpers.encodeNameSafe(pathFromRoot);
        newPath = helpers.encodeNameSafe(newPath);
        var opts = {
            method: "POST",
            url: requestEngine.getEndpoint() + ENDPOINTS.fsmeta + encodeURI(pathFromRoot),
            json: {
                "action": action,
                "destination": "/" + newPath,
            }
        };
        return requestEngine.promiseRequest(decorate(opts));
    }).then(function (result) { //result.response result.body
        if (result.response.statusCode == 200) {
            return {
                oldPath: pathFromRoot,
                path: newPath
            };
        }
    });
}



storageProto.storeFile = function (pathFromRoot, fileOrBlob, mimeType /* optional */ ) {
    var requestEngine = this.requestEngine;
    var decorate = this.getDecorator();
    return promises(true).then(function () {
        var file = fileOrBlob;
        pathFromRoot = helpers.encodeNameSafe(pathFromRoot) || "";

        var opts = {
            method: "POST",
            url: requestEngine.getEndpoint() + ENDPOINTS.fscontent + encodeURI(pathFromRoot),
            body: file,
        }

        opts.headers = {};
        if (mimeType) {
            opts.headers["Content-Type"] = mimeType;
        }

        return requestEngine.promiseRequest(decorate(opts));
    }).then(function (result) { //result.response result.body
        return ({
            id: result.response.headers["etag"],
            path: pathFromRoot
        });
    });
}


storageProto.storeFile = function (pathFromRoot, fileOrBlob, mimeType /* optional */ ) {
    var requestEngine = this.requestEngine;
    var decorate = this.getDecorator();
    return promises(true).then(function () {
        var file = fileOrBlob;
        pathFromRoot = helpers.encodeNameSafe(pathFromRoot) || "";

        var opts = {
            method: "POST",
            url: requestEngine.getEndpoint() + ENDPOINTS.fscontent + encodeURI(pathFromRoot),
            body: file,
        }

        opts.headers = {};
        if (mimeType) {
            opts.headers["Content-Type"] = mimeType;
        }

        return requestEngine.promiseRequest(decorate(opts));
    }).then(function (result) { //result.response result.body
        return ({
            id: result.response.headers["etag"],
            path: pathFromRoot
        });
    });
}

//currently not supported by back - end
//
//function storeFileMultipart(pathFromRoot, fileOrBlob) {
//    return promises(true).then(function () {
//        if (!window.FormData) {
//            throw new Error("Unsupported browser");
//        }
//        var file = fileOrBlob;
//        var formData = new window.FormData();
//        formData.append('file', file);
//        pathFromRoot = helpers.encodeNameSafe(pathFromRoot) || "";
//        var opts = {
//            method: "POST",
//            url: api.getEndpoint() + fscontent + encodeURI(pathFromRoot),
//            body: formData,
//        };
//        return api.promiseRequest(decorate(opts));
//    }).then(function (result) { //result.response result.body
//        return ({
//            id: result.response.getResponseHeader("etag"),
//            path: pathFromRoot
//        });
//    });
//}


//private
function remove(requestEngine, decorate, pathFromRoot, versionEntryId) {
    return promises(true).then(function () {
        pathFromRoot = helpers.encodeNameSafe(pathFromRoot) || "";
        var opts = {
            method: "DELETE",
            url: requestEngine.getEndpoint() + ENDPOINTS.fsmeta + encodeURI(pathFromRoot),
        };
        if (versionEntryId) {
            opts.params = {
                "entry_id": versionEntryId
            };
        }
        return requestEngine.promiseRequest(decorate(opts));

    }).then(function (result) { //result.response result.body
        return result.response.statusCode;
    });
}

storageProto.removeFileVersion = function (pathFromRoot, versionEntryId) {
    var requestEngine = this.requestEngine;
    var decorate = this.getDecorator();
    return promises(true).then(function () {
        if (!versionEntryId) {
            throw new Error("Version ID (second argument) is missing");
        }
        return remove(requestEngine, decorate, pathFromRoot, versionEntryId)
    });
}


storageProto.remove = function (pathFromRoot) {
    var decorate = this.getDecorator();
    return remove(this.requestEngine, decorate, pathFromRoot);
}

storageProto = helpers.extend(storageProto,notes);
storageProto = helpers.extend(storageProto,chunkedUpload);

Storage.prototype = storageProto;

module.exports = Storage;
},{"1":24,"2":33,"3":14,"4":15,"5":18,"6":31}],22:[function(require,module,exports){
var helpers = require(2);
var dom = require(1);
var messages = require(3);

function serializablifyXHR(res) {
    var resClone = {};
    for (var key in res) {
        //purposefully getting items from prototype too
        if (typeof res[key] !== "function" && key !== "headers") {
            resClone[key] = res[key];
        }
    };
    return resClone;
}

function init(options, api) {

    var channel;

    channel = {
        marker: options.channelMarker,
        sourceOrigin: options.egnyteDomainURL
    };

    function actionsHandler(message) {
        if (message.action && message.action === "call") {
            var data = message.data;
            if (api[data.ns] && api[data.ns][data.name]) {
                api.auth.setToken(data.token);
                api[data.ns][data.name].apply(api[data.ns], data.args).then(function (res) {
                    if (res instanceof XMLHttpRequest) {
                        res = serializablifyXHR(res);
                    }
                    messages.sendMessage(window.parent, channel, "result", {
                        status: true,
                        resolution: res,
                        uid: data.uid
                    });
                }, function (res) {
                    messages.sendMessage(window.parent, channel, "result", {
                        status: false,
                        resolution: res,
                        uid: data.uid
                    });
                })

            } else {
                //send something to clean up the caller
                messages.sendMessage(window.parent, channel, "nomethod", {
                    uid: data.uid
                });
            }
        }
    }

    channel.handler = messages.createMessageHandler(null, channel.marker, actionsHandler);
    channel._evListener = dom.addListener(window, "message", channel.handler);

}

module.exports = init;
},{"1":32,"2":33,"3":34}],23:[function(require,module,exports){
var promises = require(4);
var helpers = require(2);
var dom = require(1);
var messages = require(3);



var pending = {};
var origin = "";


function actionsHandler(message) {
    var data = message.data;
    if (message.action && message.data && pending[data.uid]) {
        if (message.action === "result") {
            pending[data.uid](data.status, data.resolution);
            pending[data.uid] = null;
        }
        if (message.action === "nomethod") {
            pending[data.uid] = null;
        }
    }
}

function guid() {
    return ("" + ~~(Math.random() * 9999999) + ~~(Math.random() * 9999999))
}


function remoteCall(channel, namespaceName, methodName, token, args, callback) {
    var uid = guid();
    pending[uid] = callback;
    messages.sendMessage(channel.iframe.contentWindow, channel, "call", {
        ns: namespaceName,
        name: methodName,
        args: args,
        token: token,
        uid: uid
    }, origin);

}

function forwardMethod(namespaceName, methodName, channel, getToken) {
    return function () {
        var args = Array.prototype.slice.call(arguments, 0);
        var defer = promises.defer();
        channel.ready.promise.then(function () {
            remoteCall(channel, namespaceName, methodName, getToken(), args, function (status, resolution) {
                if (status) {
                    defer.resolve(resolution);
                } else {
                    defer.reject(resolution);
                }

            });
        });
        return defer.promise;
    }

}

function setupForwarding(api, channel) {

    var mkForwarder = function (namespaceName, method) {
        api[namespaceName][method] = forwardMethod(namespaceName, method, channel, function () {
            return api.auth.getToken()
        });
    }

    //forwarding setup
    helpers.each(api, function (apiNamespace, namespaceName) {
        if (namespaceName !== "auth") {
            for (var method in apiNamespace) {
                mkForwarder(namespaceName, method);
            }
        }
    });
    //manual forwarder, leave other auth methods be
    mkForwarder("auth", "getUserInfo");

    var parentDestroy = api.destroy;
    api.destroy = function () {
        channel._evListener.destroy();
        channel.iframe.parentNode.removeChild(channel.iframe);
        if (parentDestroy) {
            return parentDestroy.apply(api, arguments)
        }
    }

    return api;
}


function init(options, api) {
    origin = options.egnyteDomainURL;
    //comm setup
    var iframe;
    var channel;

    channel = {
        marker: options.channelMarker,
        sourceOrigin: options.egnyteDomainURL,
        ready: promises.defer()
    };

    channel.handler = messages.createMessageHandler(channel.sourceOrigin, channel.marker, actionsHandler);
    channel._evListener = dom.addListener(window, "message", channel.handler);

    iframe = dom.createFrame(options.egnyteDomainURL + "/" + options.forwarderAddress);
    iframe.style.display = "none";

    //give IE time to get the iframe going
    var onIframeLoad = function () {
        setTimeout(function () {
            channel.ready.resolve();
        }, 50);
    }
  
    if (iframe.addEventListener) {
        iframe.addEventListener('load', onIframeLoad, false);
    } else if (iframe.attachEvent) {
        iframe.attachEvent('onload', onIframeLoad);
    }
    var body = document.body || document.getElementsByTagName("body")[0];
    body.appendChild(iframe);

    channel.iframe = iframe;

    return setupForwarding(api, channel);

}

module.exports = init;
},{"1":32,"2":33,"3":34,"4":31}],24:[function(require,module,exports){
module.exports={
    "fsmeta": "/fs",
    "fscontent": "/fs-content",
    "fschunked": "/fs-content-chunked",
    "notes": "/notes",
    "links": "/links",
    "perms":"/perms/folder",
    "userinfo":"/userinfo"
}

},{}],25:[function(require,module,exports){
(function () {

    var helpers = require(4);
    var dom = require(3);
    var View = require(2);
    var Model = require(1);

    function noGoog(ext, mime) {
        return mime !== "goog";
    }

    function init(API) {
        var filePicker;

        filePicker = function (node, setup) {
            if (!setup) {
                throw new Error("Setup required as a second argument");
            }
            var close, openPath, fpView, fpModel,
                defaults = {
                    folder: true,
                    file: true,
                    multiple: true,
                    forbidden: []
                };
            var selectOpts = helpers.extend(defaults, setup.select);

            close = function () {
                fpView.destroy();
                fpView = null;
                fpModel = null;
            };

            openPath = function (path) {
                fpModel.fetch(path || "/");
            }

            fpModel = new Model(API, {
                select: selectOpts,
                filterExtensions: (typeof setup.filterExtensions === "undefined") ? noGoog : setup.filterExtensions
            });

            fpView = new View({
                el: node,
                model: fpModel,
                barAlign: setup.barAlign,
                handlers: {
                    ready: setup.ready,
                    selection: function (items) {
                        close();
                        setup.selection && setup.selection(items);
                    },
                    close: function (e) {
                        close();
                        setup.cancel && setup.cancel(e);
                    },
                    error: setup.error
                },
                keys: setup.keys
            }, setup.texts);

            openPath(setup.path || "/");

            return {
                openPath: openPath,
                close: close,
            };
        };

        return filePicker;

    }

    module.exports = init;


})();
},{"1":28,"2":29,"3":32,"4":33}],26:[function(require,module,exports){
module.exports={
    "404": "This item doesn't exist (404)",
    "403": "Access denied (403)",
    "409": "Forbidden location (409)",
    "596": "Path contains an unexpected character (596)",
    "4XX": "Incorrect API request",
    "5XX": "API server error, try again later",
    "R": "API use limit reached",
    "0": "Browser error, try again",
    "?": "Unknown error"
}


},{}],27:[function(require,module,exports){
var helpers = require(1);
var mapping = {};
helpers.each({
    "audio": ["mp3", "wav", "wma", "aiff", "mid", "midi", "mp2"],
    "video": ["wmv", "avi", "mpg", "mpeg", "mp4", "webm", "ogv", "flv", "mov"],
    "pdf": ["pdf"],
    "word_processing": ["doc", "dot", "docx", "dotx", "docm", "dotm", "odt ", "ott", "oth", "odm", "sxw", "stw", "sxg", "sdw", "sgl", "rtf", "hwp", "uot", "wpd", "wps"],
    "spreadsheet": ["123", "xls", "xlt", "xla", "xlsx", "xltx", "xlsm", "xltm", "xlam", "xlsb", "ods", "fods", "ots", "sxc", "stc", "sdc", "csv", "uos"],
    "presentation": ["ppt", "pot", "pps", "ppa", "pptx", "potx", "ppsx", "ppam", "pptm", "potm", "ppsm", "odp", "fodp", "otp", "sxi", "sti", "sdd", "sdp"],
    "cad": ["dwg", "dwf", "dxf", "sldprt", "sldasm", "slddrw"],
    "text": ["txt", "log"],
    "image": ["odg", "otg", "odi", "sxd", "std", "sda", "svm", "jpg", "jpeg", "png", "gif", "bmp", "tif", "tiff", "psd", "eps", "tga", "wmf", "ai", "cgm", "fodg", "jfif", "pbm", "pcd", "pct", "pcx", "pgm", "ppm", "ras", "sgf", "svg"],
    "code": ["html", "htm", "sql", "xml", "java", "cpp", "c", "perl", "py", "rb", "php", "js", "css", "applescript", "as3", "as", "bash", "shell", "sh", "cfm", "cfml", "cs", "pas", "dcu", "diff", "patch", "ez", "erl", "groovy", "gvy", "gy", "gsh", "javafx", "jfx", "pl", "pm", "ps1", "ruby", "sass", "scss", "scala", "vb", "vbscript", "xhtml", "xslt"],
    "archive": ["zip", "rar", "tar", "gz", "7z", "bz2", "z", "xz", "ace", "sit", "sitx", "tgz", "apk"],
    "goog": ["gdoc", "gsheet", "gslides", "gdraw"]
    //    "email": ["msg", "olk14message", "pst", "emlx", "olk14event", "eml", "olk14msgattach", "olk14msgsource"],
}, function (list, mime) {
    helpers.each(list, function (ex) {
        mapping[ex] = mime;
    });
});


function _mime(ext) {
    return mapping[ext] || "unknown";
}

function getExt(name) {
    var splitted = name.split(".");
    if (splitted.length>1) {
        return splitted[splitted.length-1];
    } else {
        return "";
    }
}

function getMime(name) {
    return _mime(getExt(name));
}


function getExtensionFilter(filter) {
    return function (file) {
        var ext = getExt(file.name);
        return filter(ext, _mime(ext));
    }
}

module.exports = {
    getMime: getMime,
    getExt: getExt,
    getExtensionFilter: getExtensionFilter
}

},{"1":33}],28:[function(require,module,exports){
var helpers = require(1);
var exts = require(2);




//Item model
function Item(data, parent) {
    this.data = data;
    if (!this.data.is_folder) {
        this.ext = exts.getExt(data.name).substr(0, 3);
        this.mime = exts.getMime(data.name);
    } else {
        this.ext = "";
        this.mime = "unknown"
    }
    this.isSelectable = ((parent.opts.select.folder && data.is_folder) || (parent.opts.select.file && !data.is_folder)) && !parent.forbidSelection;
    this.parent = parent;
    this.isCurrent = false;
}

Item.prototype.defaultAction = function () {
    if (this.data.is_folder) {
        this.parent.fetch(this.data.path);
    } else {
        this.toggleSelect();
    }
};

Item.prototype.toggleSelect = function () {
    if (this.isSelectable) {
        if (!this.parent.opts.select.multiple) {
            this.parent.deselect();
        }
        this.selected = !this.selected;
        this.onchange();
        this.parent.onchange();
    }
};

//Collection
function Model(API, opts) {
    this.opts = opts;
    this.API = API;
    this.page = 1;
    this.pageSize = 200;

    if (opts.filterExtensions) {
        this.fileFilter = exts.getExtensionFilter(opts.filterExtensions);
    }
    // no defaults needed
    //    this.rawItems = [];
    //    this.hasPages = false;
}


Model.prototype.onloading = helpers.noop;
Model.prototype.onupdate = helpers.noop;
Model.prototype.onerror = helpers.noop;

Model.prototype._set = function (m) {
    var self = this;
    this.path = m.path;
    this.page = 1;

    this.rawItems = [];
    helpers.each(m.folders, function (f) {
        self.rawItems.push(f);
    });
    //ignore files if they're not selectable
    if (this.opts.select.file) {
        helpers.each(m.files, function (f) {
            if (!self.fileFilter || self.fileFilter(f)) {
                self.rawItems.push(f);
            }
        });
    }
    //force disabled selection on root
    this.forbidSelection = !(-1 === this.opts.select.forbidden.indexOf(this.path));
    this.totalPages = ~~ (this.rawItems.length / this.pageSize) + 1;
    this.isMultiselectable = (this.opts.select.multiple);
    this._buildItems();

};

Model.prototype._buildItems = function () {
    var self = this;
    this.currentItem = -1;
    this.items = [];
    this.hasPages = (this.rawItems.length > this.pageSize);
    if (this.rawItems.length === 0) {
        this.isEmpty = true;
    } else {
        this.isEmpty = false;
        var pageArr = this.rawItems.slice((this.page - 1) * this.pageSize, this.page * this.pageSize);
        helpers.each(pageArr, function (item) {
            self.items.push(new Item(item, self));
        });
    }

    this.onupdate();
    this.onchange();
}

Model.prototype.fetch = function (path) {
    var self = this;
    if (self.processing) {
        return;
    }
    self.processing = true;
    if (path) {
        self.path = path;
    }
    self.onloading();
    self.API.storage.get(self.path).then(function (m) {
        self.processing = false;
        self._set(m);
    }).fail(function (e) {
        self.processing = false;
        self.onerror(e);
    });
}

Model.prototype.switchPage = function (offset) {
    var newPage = this.page + offset;
    if (newPage <= this.totalPages && newPage > 0) {
        this.page = newPage;
        this._buildItems();
    }
}


Model.prototype.goUp = function () {
    var path = this.path.replace(/\/[^\/]+\/?$/i, "") || "/";

    if (path !== this.path) {
        this.fetch(path);
    }
}

Model.prototype.getSelected = function () {
    var selected = [];
    helpers.each(this.items, function (item) {
        if (item.selected) {
            selected.push(item.data);
        }
    });
    return selected;
}

Model.prototype.deselect = function () {
    helpers.each(this.items, function (item) {
        if (item.selected) {
            item.selected = false;
            item.onchange();
        }
    });
}
Model.prototype.setAllSelection = function (selected) {
    helpers.each(this.items, function (item) {
        item.selected = selected;
        item.onchange();
    });
    this.onchange();
}

Model.prototype.mvCurrent = function (offset) {
    if (this.currentItem + offset < this.items.length && this.currentItem + offset >= 0) {
        if (this.items[this.currentItem]) {
            this.items[this.currentItem].isCurrent = false;
            this.items[this.currentItem].onchange();
        }
        this.currentItem += offset;
        this.items[this.currentItem].isCurrent = true;
        this.items[this.currentItem].onchange();
    }
}

Model.prototype.getCurrent = function () {
    return this.items[this.currentItem];
}

module.exports = Model;
},{"1":33,"2":27}],29:[function(require,module,exports){
"use strict";

//template engine based upon JsonML
var dom = require(2);
var helpers = require(3);
var texts = require(4);
var jungle = require(1);

require(6);

var fontLoaded = false;

var currentGlobalKeyboadrFocus = "no";

function View(opts, txtOverride) {
    var self = this;
    this.uid = Math.random();
    currentGlobalKeyboadrFocus = this.uid;
    this.el = opts.el;
    this.evs = [];
    var myElements = this.els = {};

    if (!opts.noFont) {
        renderFont();
    }

    this.txt = texts(txtOverride);

    this.bottomBarClass = (opts.barAlign === "left") ? "" : ".eg-bar-right";

    this.handlers = helpers.extend({
        selection: helpers.noop,
        events: helpers.noop,
        close: helpers.noop,
        error: null
    }, opts.handlers);

    //action handlers
    //this.selection = helpers.extend(this.selection, opts.selection);
    this.model = opts.model;

    //bind to model events
    this.model.onloading = helpers.bindThis(self, self.renderLoading);
    this.model.onupdate = function () {
        self.handlers.events("beforeRender", self.model);
        self.render();
        self.handlers.events("render", self.model);
        if (self.handlers.ready) {
            var runReady = self.handlers.ready;
            self.handlers.ready = null;
            setTimeout(runReady, 0);
        }
    }
    this.model.onerror = helpers.bindThis(this, this.errorHandler);

    this.model.onchange = function () {
        if (self.model.getSelected().length > 0) {
            self.els.ok.removeAttribute("disabled");
        } else {
            self.els.ok.setAttribute("disabled", "");
        }
    }

    //create reusable view elements
    myElements.back = jungle([["a.eg-picker-back.eg-btn[title=back]"]]).childNodes[0];
    myElements.close = jungle([["a.eg-picker-close.eg-btn", this.txt("Cancel")]]).childNodes[0];
    myElements.ok = jungle([["span.eg-picker-ok.eg-btn", this.txt("Ok")]]).childNodes[0];
    myElements.pgup = jungle([["span.eg-picker-pgup.eg-btn", ">"]]).childNodes[0];
    myElements.pgdown = jungle([["span.eg-picker-pgup.eg-btn", "<"]]).childNodes[0];
    myElements.crumb = jungle([["span.eg-picker-path"]]).childNodes[0];
    myElements.selectAll = jungle([["input[type=checkbox]", {
        title: this.txt("Select all")
    }]]).childNodes[0];

    //bind events and store references to unbind later
    this.handleClick(this.el, self.focused); //maintains focus when multiple instances exist
    this.handleClick(myElements.back, self.goUp);
    this.handleClick(myElements.close, function () {
        self.handlers.close();
    });
    this.handleClick(myElements.ok, self.confirmSelection);
    this.handleClick(myElements.crumb, self.crumbNav);
    this.handleClick(myElements.selectAll, function (e) {
        self.model.setAllSelection(!!e.target.checked);
    });
    this.handleClick(myElements.pgup, function (e) {
        self.model.switchPage(1);
    });
    this.handleClick(myElements.pgdown, function (e) {
        self.model.switchPage(-1);
    });

    if (opts.keys !== false) {
        var keybinding = helpers.extend({
            "up": "<up>",
            "down": "<down>",
            "select": "<space>",
            "explore": "<right>",
            "back": "<left>",
            "confirm": "none",
            "close": "<escape>"
        }, opts.keys);
        var keys = {};
        keys[keybinding["up"]] = helpers.bindThis(self, self.kbNav_up);
        keys[keybinding["down"]] = helpers.bindThis(self, self.kbNav_down);
        keys[keybinding["select"]] = helpers.bindThis(self, self.kbNav_select);
        keys[keybinding["explore"]] = helpers.bindThis(self, self.kbNav_explore);
        keys[keybinding["back"]] = helpers.bindThis(self.model, self.model.goUp);
        keys[keybinding["confirm"]] = helpers.bindThis(self, self.confirmSelection);
        keys[keybinding["close"]] = helpers.bindThis(self, self.handlers.close);

        document.activeElement && document.activeElement.blur();
        this.evs.push(dom.onKeys(document, keys, helpers.bindThis(self, self.hasFocus)));
    }

}

var viewPrototypeMethods = {};

viewPrototypeMethods.destroy = function () {
    helpers.each(this.evs, function (ev) {
        ev.destroy();
    });
    this.evs = null;
    this.el.innerHTML = "";
    this.el = null;
    this.els = null;
    this.model = null;
    this.handlers = null;
}

viewPrototypeMethods.handleClick = function (el, method) {
    this.evs.push(dom.addListener(el, "click", helpers.bindThis(this, method)));
}

viewPrototypeMethods.errorHandler = function (e) {
    if (this.handlers.error) {
        var message = this.handlers.error(e);
        if (typeof message === "string") {
            this.renderProblem("*", message);
            return;
        } else {
            if (message === false) {
                return;
            }
        }
    }
    this.renderProblem((e.RATE) ? "R" : e.statusCode, e.message);
}


//================================================================= 
// rendering
//================================================================= 

//all this mess is because IE8 dies on @include in css
function renderFont() {
    if (!fontLoaded) {
        (document.getElementsByTagName("head")[0]).appendChild(jungle([
            ["link", {
                    href: "https://fonts.googleapis.com/css?family=Open+Sans:400,600",
                    type: "text/css",
                    rel: "stylesheet"
                }
            ]
        ]));
        fontLoaded = true;
    }
}

viewPrototypeMethods.render = function () {
    var self = this;
    var myElements = this.els;

    myElements.list = document.createElement("ul");

    var topbar = ["div.eg-picker-bar.eg-top"];
    if (this.model.isMultiselectable) {
        myElements.selectAll.checked = false;
        topbar.push(myElements.selectAll);
    }
    topbar.push(myElements.back);
    topbar.push(myElements.crumb);

    topbar = jungle([topbar]).childNodes[0];

    var layoutFragm = jungle([["div.eg-theme.eg-picker",
        topbar,
        myElements.list,
        ["div.eg-picker-bar" + this.bottomBarClass,
            myElements.ok,
            myElements.close,
            ["div.eg-picker-pager" + (this.model.hasPages ? "" : ".eg-not"),
                myElements.pgdown,
                ["span", this.model.page + "/" + this.model.totalPages],
                myElements.pgup
            ]
        ]
    ]]);

    this.el.innerHTML = "";
    this.el.appendChild(layoutFragm);
    //couldn't CSS it. blame old browsers
    myElements.list.style.height = (this.el.offsetHeight - 2 * topbar.offsetHeight) + "px";

    this.breadcrumbify(this.model.path);

    if (this.model.isEmpty) {
        this.renderEmpty();
    } else {
        helpers.each(this.model.items, function (item) {
            self.renderItem(item);
        });
    }


}


viewPrototypeMethods.renderItem = function (itemModel) {
    var self = this;

    var itemName = jungle([["a.eg-picker-name" + (itemModel.data.is_folder ? ".eg-folder" : ".eg-file"),
        {
            "title": itemModel.data.name,
        },
        ["span.eg-ico.eg-mime-" + itemModel.mime,
            {
                "data-ext": itemModel.ext
            },
            ["span", itemModel.ext]
        ], itemModel.data.name]]).childNodes[0];

    var itemCheckbox = jungle([["input[type=checkbox]" + (itemModel.isSelectable ? "" : ".eg-not")]]).childNodes[0];
    itemCheckbox.checked = itemModel.selected;



    var itemNode = jungle([["li.eg-picker-item",
        itemCheckbox,
        itemName
    ]]).childNodes[0];

    dom.addListener(itemName, "click", function (e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        }
        itemModel.defaultAction();
        return false;
    });

    dom.addListener(itemNode, "click", function (e) {
        itemModel.toggleSelect();
    });

    itemModel.onchange = function () {
        self.handlers.events("itemChange", itemModel);
        itemCheckbox.checked = itemModel.selected;
        itemNode.setAttribute("aria-selected", itemModel.isCurrent);
        if (itemModel.isCurrent) {
            try { //IE8 dies on this randomly :/
                self.els.list.scrollTop = itemNode.offsetTop - self.els.list.offsetHeight
            } catch (e) {};
            //itemNode.scrollIntoView(false);
        }
    };

    this.els.list.appendChild(itemNode);
}


viewPrototypeMethods.breadcrumbify = function (path) {
    var currentPath = "/";
    path = path || currentPath; //in case path was not provided, go for root
    
    var list = path.split("/");
    var crumbItems = [];
    var maxSpace = ~~ (100 / list.length); //assigns maximum space for text
    helpers.each(list, function (folder, num) {
        if (folder) {
            currentPath += folder + "/";
            num > 1 && (crumbItems.push(["span", "/"]));
            crumbItems.push(["a", {
                    "data-path": currentPath,
                    "title": folder,
                    "style": "max-width:" + maxSpace + "%"
                },
                folder]);

        } else {
            if (num === 0) {
                crumbItems.push(["a", {
                    "data-path": currentPath
                }, "/"]);
            }
        }
    });
    this.els.crumb.innerHTML = "";
    this.els.crumb.appendChild(jungle([crumbItems]));

}



viewPrototypeMethods.renderLoading = function () {
    if (this.els.list) {
        this.els.list.innerHTML = "";
        this.els.list.appendChild(jungle([["div.eg-placeholder", ["div.eg-spinner"], this.txt("Loading")]]));
    }
}


var msgs = require(5);

viewPrototypeMethods.renderProblem = function (code, message) {
    message = msgs["" + code] || msgs[~(code / 100) + "XX"] || message || msgs["?"];
    if (this.els.list) {
        this.els.list.innerHTML = "";
        this.els.list.appendChild(jungle([["div.eg-placeholder", ["div.eg-picker-error"], message]]));
    } else {
        this.handlers.close({
            message: message
        });
    }
}
viewPrototypeMethods.renderEmpty = function () {
    if (this.els.list) {
        this.els.list.innerHTML = "";
        this.els.list.appendChild(jungle([["div.eg-placeholder.eg-folder", ["div.eg-ico"], this.txt("This folder is empty")]]));
    }
}

//================================================================= 
// focus
//================================================================= 

viewPrototypeMethods.hasFocus = function () {
    return currentGlobalKeyboadrFocus === this.uid;
}
viewPrototypeMethods.focused = function () {
    currentGlobalKeyboadrFocus = this.uid;
}
//================================================================= 
// navigation
//================================================================= 

viewPrototypeMethods.goUp = function () {
    this.model.goUp();
}
viewPrototypeMethods.confirmSelection = function () {
    var selected = this.model.getSelected();
    if (selected && selected.length) {
        this.handlers.selection.call(this, this.model.getSelected());
    }
}

viewPrototypeMethods.crumbNav = function (e) {
    var path = e.target.getAttribute("data-path");
    if (path) {
        this.model.fetch(path);
    }
}

viewPrototypeMethods.kbNav_up = function () {
    this.model.mvCurrent(-1);
}

viewPrototypeMethods.kbNav_down = function () {
    this.model.mvCurrent(1);
}
viewPrototypeMethods.kbNav_select = function () {
    this.model.getCurrent().toggleSelect();
}
viewPrototypeMethods.kbNav_confirm = function () {
    this.model.getCurrent().toggleSelect();
}

viewPrototypeMethods.kbNav_explore = function () {
    var item = this.model.getCurrent();
    if (item.data.is_folder) {
        item.defaultAction();
    }
}

View.prototype = viewPrototypeMethods;

module.exports = View;
},{"1":36,"2":32,"3":33,"4":35,"5":26,"6":30}],30:[function(require,module,exports){
(function() { var head = document.getElementsByTagName('head')[0]; style = document.createElement('style'); style.type = 'text/css';var css = ".eg-btn{display:inline-block;line-height:20px;height:20px;text-align:center;margin:0 8px;cursor:pointer}span.eg-btn{padding:4px 15px;background:#fafafa;border:1px solid #ccc;border-radius:2px}span.eg-btn:hover{-webkit-box-shadow:inset 0 -20px 50px -60px #000;box-shadow:inset 0 -20px 50px -60px #000}span.eg-btn:active{-webkit-box-shadow:inset 0 1px 5px -4px #000;box-shadow:inset 0 1px 5px -4px #000}span.eg-btn[disabled]{opacity:.3}a.eg-btn{font-weight:600;padding:4px;border:1px solid transparent;text-decoration:underline}.eg-picker a{cursor:pointer}.eg-picker a:hover{text-decoration:underline}.eg-picker a.eg-file:hover{text-decoration:none}.eg-picker,.eg-picker-bar{-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;overflow:hidden}.eg-picker{background:#fff;border:1px solid #dbdbdb;height:100%;min-height:300px;padding:0;color:#5e5f60;font-size:12px;font-family:\'Open Sans\',sans-serif}.eg-picker *{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;vertical-align:middle}.eg-picker input{margin:10px 20px}.eg-picker ul{padding:0;margin:0;min-height:200px;overflow-y:scroll}.eg-picker-bar{z-index:1;height:50px;padding:10px;background:#f1f1f1;border:0 solid #dbdbdb;border-width:1px 0 0}.eg-picker-bar.eg-top{box-shadow:0 1px 3px 0 #f1f1f1;border-width:0 0 1px;padding-left:0;background:#fff}.eg-picker-bar>*{float:left}.eg-bar-right>*{float:right}.eg-not{visibility:hidden}.eg-picker-pager{float:right}.eg-bar-right>.eg-picker-pager{float:left}.eg-btn.eg-picker-ok{background:#3191f2;border-color:#2b82d9;color:#fff}.eg-picker-path{min-width:60%;width:calc(100% - 110px);line-height:30px;color:#777;font-size:14px}.eg-picker-path>a{margin:0 2px;white-space:nowrap;display:inline-block;overflow:hidden;text-overflow:ellipsis}.eg-picker-path>a:last-child{color:#5e5f60;font-size:16px}.eg-picker-item{line-height:40px;list-style:none;padding:4px 0;border-bottom:1px solid #f2f3f3}.eg-picker-item:hover{background:#f1f5f8;outline:1px solid #dbdbdb}.eg-picker-item[aria-selected=true]{background:#dde9f3}.eg-picker-item *{display:inline-block}.eg-picker-item>a{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:300px;max-width:calc(100% - 88px)}.eg-btn.eg-picker-back{padding:4px 10px;position:relative;color:#777}.eg-btn.eg-picker-back:hover{color:#4e4e4f}.eg-btn.eg-picker-back:before{content:\"\";display:block;left:4px;border-style:solid;border-width:0 0 3px 3px;transform:rotate(45deg);-ms-transform:rotate(45deg);-moz-transform:rotate(45deg);-webkit-transform:rotate(45deg);width:7px;height:7px;padding:0;position:absolute;bottom:10px}@-webkit-keyframes egspin{to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes egspin{to{transform:rotate(360deg)}}.eg-placeholder{margin:33%;margin:calc(50% - 88px);margin-bottom:0;text-align:center;color:#777}.eg-placeholder>div{margin:0 auto 5px}.eg-placeholder>.eg-spinner{content:\"\";-webkit-animation:egspin 1s infinite linear;animation:egspin 1s infinite linear;width:30px;height:30px;border:solid 7px;border-radius:50%;border-color:transparent transparent #dbdbdb}.eg-picker-error:before{content:\"?!\";font-size:32px;border:2px solid #5e5f60;padding:0 10px}.eg-ico{margin-right:10px;position:relative;top:-2px}.eg-mime-audio{background:#94cbff}.eg-mime-video{background:#8f6bd1}.eg-mime-pdf{background:#e64e40}.eg-mime-word_processing{background:#4ca0e6}.eg-mime-spreadsheet{background:#6bd17f}.eg-mime-presentation{background:#fa8639}.eg-mime-cad{background:#f2d725}.eg-mime-text{background:#9e9e9e}.eg-mime-image{background:#d16bd0}.eg-mime-code{background:#a5d16b}.eg-mime-archive{background:#d19b6b}.eg-mime-goog{background:#0266C8}.eg-mime-unknown{background:#dbdbdb}.eg-file .eg-ico{width:40px;height:40px;text-align:right}.eg-file .eg-ico>span{text-align:center;font-size:13.33333333px;line-height:18px;font-weight:300;margin:10px 0;height:20px;width:32px;background:rgba(0,0,0,.15);color:#fff}.eg-folder .eg-ico{border:1px #d4d8bd solid;border-top:4px #dfe4b9 solid;margin-top:8.8px;height:24.6px;background:#f3f7d3;overflow:visible;width:38px}.eg-folder .eg-ico:before{display:block;position:absolute;top:-8px;left:-1px;border:#d1dabc 1px solid;border-bottom:0;border-radius:2px;background:#dfe4b9;content:\" \";width:60%;height:4.4px}.eg-folder .eg-ico>span{display:none}";if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style);}())

},{}],31:[function(require,module,exports){
var pinkySwear = require(2);
var helpers = require(1);

//for pinkyswear starting versions above 2.10
var createErrorAlias = function (promObj) {
    promObj.fail = function (func) {
        return promObj.then(0, func);
    };
    return promObj;
}

var Promises = function (value) {
    var promise = pinkySwear(createErrorAlias);
    promise(value);
    return promise;
}

Promises.defer = function () {
    var promise = pinkySwear(createErrorAlias);
    return {
        promise: promise,
        resolve: function (a) {
            promise(true, [a]);
        },
        reject: function (a) {
            promise(false, [a]);
        }
    };
}

Promises.allSettled = function (array) {
    var collectiveDefere = Promises.defer();
    var results = [];
    var counter = array.length;
    var resolver = function (num, item) {
        results[num] = item;
        if (--counter === 0) {
            collectiveDefere.resolve(results);
        }
    }
    helpers.each(array, function (promise, num) {
        promise.then(function (result) {
            resolver(num, {
                state: "fulfilled",
                value: result
            });
        }, function (err) {
            resolver(num, {
                state: "rejected",
                reason: err
            });
        })
    });
    return collectiveDefere.promise;
}

module.exports = Promises;
},{"1":33,"2":1}],32:[function(require,module,exports){
var vkey = require(1);


function addListener(elem, type, callback) {
    var handler;
    if (elem.addEventListener) {
        handler = callback;
        elem.addEventListener(type, callback, false);

    } else {
        handler = function (e) {
            e = e || window.event; // get window.event if argument is falsy (in IE)
            e.target || (e.target = e.srcElement);
            var res = callback.call(this, e);
            if (res === false) {
                e.cancelBubble = true;
            }
            return res;
        };
        elem.attachEvent("on" + type, handler);
    }

    return {
        destroy: function () {
            removeListener(elem, type, handler);
        }
    }
}

function removeListener(elem, type, handler) {
    if (elem.removeEventListener) {
        elem.removeEventListener(type, handler, false);
    } else if (elem.detachEvent) {
        elem.detachEvent(type, handler);
    }
}



module.exports = {

    addListener: addListener,

    onKeys: function (elem, actions, hasFocus) {
        return addListener(elem, "keyup", function (ev) {
            ev.preventDefault && ev.preventDefault();
            if (hasFocus() && actions[vkey[ev.keyCode]]) {
                actions[vkey[ev.keyCode]]();
            }
            return false;
        });
    },

    createFrame: function (url,scrolling) {
        var iframe = document.createElement("iframe");
        if(!scrolling){
            iframe.setAttribute("scrolling", "no");
        }
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.style.minWidth = "400px";
        iframe.style.minHeight = "400px";
        iframe.style.border = "1px solid #dbdbdb";
        iframe.src = url;
        return iframe;
    }

}

},{"1":2}],33:[function(require,module,exports){
function each(collection, fun) {
    if (collection) {
        if (collection.length === +collection.length) {
            for (var i = 0; i < collection.length; i++) {
                fun.call(null, collection[i], i, collection);
            }
        } else {
            for (var i in collection) {
                if (collection.hasOwnProperty(i)) {
                    fun.call(null, collection[i], i, collection);
                }
            }
        }
    }
}
var disallowedChars = /[":<>|?*+&#\\]/;

module.exports = {
    //simple extend function
    extend: function extend(target) {
        var i, k;
        for (i = 1; i < arguments.length; i++) {
            if (arguments[i]) {
                for (k in arguments[i]) {
                    if (arguments[i].hasOwnProperty(k) && (typeof arguments[i][k] !== "undefined")) {
                        target[k] = arguments[i][k];
                    }
                }
            }
        }
        return target;
    },
    noop: function () {},
    id: function (a) {return a},
    bindThis: function (that, func) {
        return function () {
            return func.apply(that, arguments);
        }
    },
    each: each,
    normalizeURL: function (url) {
        return (url).replace(/\/*$/, "");
    },
    encodeNameSafe: function (name) {
        if (!name) {
            throw new Error("No name given");
        }
        if (disallowedChars.test(name)) {
            throw new Error("Disallowed characters in path");
        }

        name = name.replace(/^\/\//, "/");

        return (name);
    }
};
},{}],34:[function(require,module,exports){
var helpers = require(1);


//returns postMessage specific handler
function createMessageHandler(sourceOrigin, marker, callback) {
    return function (event) {
        if (!sourceOrigin || helpers.normalizeURL(event.origin) === helpers.normalizeURL(sourceOrigin)) {
            var message = event.data;
            if (message.substr(0, marker.length) === marker) {
                try {
                    message = JSON.parse(message.substring(marker.length));

                } catch (e) {
                    //broken? ignore
                }
                if (message) {
                    callback(message);
                }
            }
        }
    };
}

function sendMessage(targetWindow, channel, action, data, originOverride) {
    var targetOrigin = "*",
        pkg;

    if (typeof action !== "string") {
        throw new TypeError("only string is acceptable as action");
    }

    if (originOverride) {
        targetOrigin = originOverride;
    } else {
        try {
            targetOrigin = targetWindow.location.origin || targetWindow.location.protocol + "//" + targetWindow.location.hostname + (targetWindow.location.port ? ":" + targetWindow.location.port : "");
        } catch (E) {}
    }
    pkg = JSON.stringify({
        action: action,
        data: data
    });
    pkg = pkg.replace(/(\r\n|\n|\r)/gm, "");
    targetWindow.postMessage(channel.marker + pkg, targetOrigin);
}

module.exports = {
    sendMessage: sendMessage,
    createMessageHandler: createMessageHandler
}

},{"1":33}],35:[function(require,module,exports){
module.exports = function (overrides) {
    return function (txt) {
        if (overrides) {
            if (overrides[txt]) {
                return overrides[txt];
            } else if (overrides[txt.toLowerCase()]) {
                return overrides[txt.toLowerCase()];
            }
        }
        return txt;
    };
};
},{}],36:[function(require,module,exports){
var zenjungle = (function () {
    // helpers
    var is_object = function (object) {
            return (!!object && '[object Object]' == Object.prototype.toString.call(object) && !object.nodeType);
        },
        is_array = function (object) {
            return '[object Array]' == Object.prototype.toString.call(object);
        },
        each = function (object, callback) {
            var key;
            if (object) {
                if (object.length) {
                    for (key = 0; key < object.length; key++) {
                        callback(object[key], key);
                    }
                } else {
                    for (key in object) {
                        object.hasOwnProperty(key) && callback(object[key], key);
                    }
                }
            }
        },
        merge = function () {
            var merged = {}

            each(arguments, function (arg) {
                each(arg, function (value, key) {
                    merged[key] = value;
                })
            });

            return merged;
        }

    // converts some patterns to properties
    var zen = function (string) {
        var replace = {
                '\\[([a-z\\-]+)=([^\\]]+)\\]': function (match) {
                    var prop = {};
                    prop[match[1]] = match[2].replace(/^["']/, '').replace(/["']$/, '');

                    return prop;
                },
                '#([a-zA-Z][a-zA-Z0-9\\-_]*)': function (match) {
                    return {
                        'id': match[1]
                    };
                },
                '(\\.[a-zA-Z][a-zA-Z0-9\\-_]*)+': function (match) {
                    return {
                        'class': match[0].substr(1).split(".").join(" ")
                    };
                }
            },
            props = {};

        each(replace, function (parser, regex) {
            var match;

            regex = new RegExp(regex);

            while (regex.test(string)) {
                match = regex.exec(string);
                string = string.replace(match[0], '');

                props = merge(props, parser(match));
            }
        });

        return [string, props];
    }

    var monkeys = function (what, where) {
        where = where || document.createDocumentFragment();

        each(what, function (element) {
            var zenned,
                props,
                new_el;

            if (is_array(element)) {

                if ('string' === typeof element[0]) {
                    zenned = zen(element.shift());
                    props = is_object(element[0]) ? element.shift() : {};
                    new_el = document.createElement(zenned[0]);

                    each(merge(zenned[1], props), function (value, key) {
                        new_el.setAttribute(key, value);
                    });

                    where.appendChild(new_el);
                    monkeys(element, new_el);
                } else {
                    monkeys(element, where);
                }
            } else if (element.nodeType) {
                where.appendChild(element);
            } else if ('string' === typeof (element) || 'number' === typeof (element)) {
                where.appendChild(document.createTextNode(element));
            }
        });

        return where;
    }

    return monkeys;
})();

if (typeof module !== "undefined") {
    module.exports = zenjungle;
}
},{}]},{},[11]);
