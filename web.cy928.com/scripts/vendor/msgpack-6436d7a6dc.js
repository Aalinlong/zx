!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).msgpack=t()}}(function(){return function i(f,a,u){function s(e,t){if(!a[e]){if(!f[e]){var r="function"==typeof require&&require;if(!t&&r)return r(e,!0);if(c)return c(e,!0);var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}var o=a[e]={exports:{}};f[e][0].call(o.exports,function(t){var r=f[e][1][t];return s(r||t)},o,o.exports,i,f,a,u)}return a[e].exports}for(var c="function"==typeof require&&require,t=0;t<u.length;t++)s(u[t]);return s}({1:[function(t,r,e){e.encode=t("./encode").encode,e.decode=t("./decode").decode,e.Encoder=t("./encoder").Encoder,e.Decoder=t("./decoder").Decoder},{"./decode":5,"./decoder":6,"./encode":8,"./encoder":9}],2:[function(t,r,e){function n(t,r){for(var e=7;0<=e;e--)this[r+e]=255&t,t/=256}e.writeString=function(t,r){for(var e=this,n=r||0,o=t.length,i=0;i<o;i++){var f=t.charCodeAt(i);e[n++]=f<128?f:(e[n++]=f<2048?192|f>>6:(e[n++]=224|f>>12,128|f>>6&63),128|63&f)}return n-r},e.readString=function(t,r){var e=this,n=t-0||0;r||(r=e.length);var o=r-t;8192<o&&(o=8192);for(var i=[];n<r;){for(var f=new Array(o),a=0;a<o&&n<r;){var u=e[n++];u=u<128?u:u<224?(63&u)<<6|63&e[n++]:(63&u)<<12|(63&e[n++])<<6|63&e[n++],f[a++]=u}a<o&&(f=f.slice(0,a)),i.push(String.fromCharCode.apply("",f))}return 1<i.length?i.join(""):i.length?i.shift():""},e.byteLength=function(t){var e=0;return Array.prototype.forEach.call(t,function(t){var r=t.charCodeAt(0);e+=r<128?1:r<2048?2:3}),e},e.copy=function(t,r,e,n){var o;e||(e=0),n||0===n||(n=this.length),r||(r=0);var i=n-e;if(t===this&&e<r&&r<n)for(o=i-1;0<=o;o--)t[o+r]=this[o+e];else for(o=0;o<i;o++)t[o+r]=this[o+e];return i},e.writeUint64BE=n,e.writeInt64BE=function(t,r){if(0<t)return n.call(this,t,r);t++;for(var e=7;0<=e;e--)this[r+e]=255&-t^255,t/=256}},{}],3:[function(t,r,e){e.BUFFER_SHORTAGE=new Error("BUFFER_SHORTAGE")},{}],4:[function(t,r,o){(function(e){function r(t){return this instanceof r?void(this.options=t||n):new r(t)}o.DecodeBuffer=r;var n={};r.prototype.push=Array.prototype.push,r.prototype.read=Array.prototype.shift,r.prototype.append=function(t){var r=this.offset?this.buffer.slice(this.offset):this.buffer;this.buffer=r?e.concat([r,t]):t,this.offset=0}}).call(this,t("buffer").Buffer)},{buffer:20}],5:[function(t,r,e){function n(t,r){var e=new o(r);return e.append(t),n(e)}e.decode=n;var o=t("./decode-buffer").DecodeBuffer,n=t("./read-core").decode},{"./decode-buffer":4,"./read-core":13}],6:[function(t,r,e){function n(t){return this instanceof n?void i.call(this,t):new n(t)}e.Decoder=n;var o=t("event-lite"),i=t("./decode-buffer").DecodeBuffer,f=t("./read-core").decodeAsync;n.prototype=new i,o.mixin(n.prototype),n.prototype.decode=function(t){t&&this.append(t),f(this)},n.prototype.push=function(t){this.emit("data",t)},n.prototype.end=function(t){this.decode(t),this.emit("end")}},{"./decode-buffer":4,"./read-core":13,"event-lite":24}],7:[function(t,r,o){(function(e){function r(t){return this instanceof r?void(this.options=t||n):new r(t)}o.EncodeBuffer=r;var n={};r.prototype.push=function(t){(this.buffers||(this.buffers=[])).push(t)},r.prototype.read=function(){this.flush();var t=this.buffers;if(t){var r=1<t.length?e.concat(t):t[0];return t.length=0,r}},r.prototype.flush=function(){this.start<this.offset&&(this.push(this.buffer.slice(this.start,this.offset)),this.start=this.offset)},r.prototype.reserve=function(t){if(!this.buffer)return this.alloc(t);var r=this.buffer.length;this.offset+t<r||(this.offset&&this.flush(),this.alloc(Math.max(t,Math.min(2*r,65536))))},r.prototype.alloc=function(t){this.buffer=new e(2048<t?t:2048),this.start=0,this.offset=0},r.prototype.send=function(t){var r=this.offset+t.length;this.buffer&&r<this.buffer.length?(t.copy(this.buffer,this.offset),this.offset=r):(this.flush(),this.push(t))}}).call(this,t("buffer").Buffer)},{buffer:20}],8:[function(t,r,e){function n(t,r){var e=new o(r);return n(e,t),e.read()}e.encode=n;var n=t("./write-core").encode,o=t("./encode-buffer").EncodeBuffer},{"./encode-buffer":7,"./write-core":16}],9:[function(t,r,e){function n(t){return this instanceof n?void f.call(this,t):new n(t)}e.Encoder=n;var o=t("event-lite"),i=t("./write-core").encode,f=t("./encode-buffer").EncodeBuffer;n.prototype=new f,o.mixin(n.prototype),n.prototype.encode=function(t){i(this,t),this.emit("data",this.read())},n.prototype.end=function(t){arguments.length&&this.encode(t),this.flush(),this.emit("end")}},{"./encode-buffer":7,"./write-core":16,"event-lite":24}],10:[function(t,r,e){e.ExtBuffer=function t(r,e){return this instanceof t?(this.buffer=r,void(this.type=e)):new t(r,e)}},{}],11:[function(w,t,g){(function(r){function t(r){function e(t,r){return r(t)}return r=Array.prototype.slice.call(arguments),function(t){return r.reduce(e,t)}}function e(t){return new r(t)}function n(t){return t.valueOf()}function o(t){(t=RegExp.prototype.toString.call(t).split("/")).shift();var r=[t.pop()];return r.unshift(t.join("/")),r}function i(t){return RegExp.apply(null,t)}function f(t){var r={};for(var e in y)r[e]=t[e];return r}function a(n){return function(t){var r=new n;for(var e in y)r[e]=t[e];return r}}function u(r){return function(t){return new r(t)}}function s(t){return new r(new Uint8Array(t.buffer))}function c(t){return new r(new Uint8Array(t))}function h(t){return new Uint8Array(t).buffer}var p=w("./ext").Ext,d=g.preset=new p,l=w("./encode").encode,E=w("./decode").decode,y={name:1,message:1,stack:1,columnNumber:1,fileName:1,lineNumber:1};d.addExtPacker(14,Error,t(f,l)),d.addExtPacker(1,EvalError,t(f,l)),d.addExtPacker(2,RangeError,t(f,l)),d.addExtPacker(3,ReferenceError,t(f,l)),d.addExtPacker(4,SyntaxError,t(f,l)),d.addExtPacker(5,TypeError,t(f,l)),d.addExtPacker(6,URIError,t(f,l)),d.addExtUnpacker(14,t(E,a(Error))),d.addExtUnpacker(1,t(E,a(EvalError))),d.addExtUnpacker(2,t(E,a(RangeError))),d.addExtUnpacker(3,t(E,a(ReferenceError))),d.addExtUnpacker(4,t(E,a(SyntaxError))),d.addExtUnpacker(5,t(E,a(TypeError))),d.addExtUnpacker(6,t(E,a(URIError))),d.addExtPacker(10,RegExp,t(o,l)),d.addExtPacker(11,Boolean,t(n,l)),d.addExtPacker(12,String,t(n,l)),d.addExtPacker(13,Date,t(Number,l)),d.addExtPacker(15,Number,t(n,l)),d.addExtUnpacker(10,t(E,i)),d.addExtUnpacker(11,t(E,u(Boolean))),d.addExtUnpacker(12,t(E,u(String))),d.addExtUnpacker(13,t(E,u(Date))),d.addExtUnpacker(15,t(E,u(Number))),"undefined"!=typeof Uint8Array&&(d.addExtPacker(17,Int8Array,e),d.addExtPacker(18,Uint8Array,e),d.addExtPacker(19,Int16Array,s),d.addExtPacker(20,Uint16Array,s),d.addExtPacker(21,Int32Array,s),d.addExtPacker(22,Uint32Array,s),d.addExtPacker(23,Float32Array,s),d.addExtUnpacker(17,u(Int8Array)),d.addExtUnpacker(18,u(Uint8Array)),d.addExtUnpacker(19,t(h,u(Int16Array))),d.addExtUnpacker(20,t(h,u(Uint16Array))),d.addExtUnpacker(21,t(h,u(Int32Array))),d.addExtUnpacker(22,t(h,u(Uint32Array))),d.addExtUnpacker(23,t(h,u(Float32Array))),"undefined"!=typeof Float64Array&&(d.addExtPacker(24,Float64Array,s),d.addExtUnpacker(24,t(h,u(Float64Array)))),"undefined"!=typeof Uint8ClampedArray&&(d.addExtPacker(25,Uint8ClampedArray,e),d.addExtUnpacker(25,u(Uint8ClampedArray))),d.addExtPacker(26,ArrayBuffer,c),d.addExtPacker(29,DataView,s),d.addExtUnpacker(26,h),d.addExtUnpacker(29,t(h,u(DataView))))}).call(this,w("buffer").Buffer)},{"./decode":5,"./encode":8,"./ext":12,buffer:20}],12:[function(t,r,e){function n(){return this instanceof n?(this.extPackers={},void(this.extUnpackers=[])):new n}e.Ext=n;var i=t("./ext-buffer").ExtBuffer;n.prototype.addExtPacker=function(e,t,n){function r(t){var r=n(t);return new i(r,e)}var o=t.name;o&&"Object"!==o?this.extPackers[o]=r:(this.extEncoderList||(this.extEncoderList=[])).unshift([t,r])},n.prototype.addExtUnpacker=function(t,r){this.extUnpackers[t]=r},n.prototype.getExtPacker=function(t){var r=t.constructor,e=r&&r.name&&this.extPackers[r.name];if(e)return e;var n=this.extEncoderList;if(n)for(var o=n.length,i=0;i<o;i++){var f=n[i];if(r===f[0])return f[1]}},n.prototype.getExtUnpacker=function(r){return this.extUnpackers[r]||function(t){return new i(t,r)}}},{"./ext-buffer":10}],13:[function(t,r,e){function n(t){var r=o(t),e=i[r];if(!e)throw new Error("Invalid type: "+(r?"0x"+r.toString(16):r));return e(t)}e.decode=n,e.decodeAsync=function(r){for(;r.offset<r.buffer.length;){var t,e=r.offset;try{t=n(r)}catch(t){if(t!==f)throw t;r.offset=e;break}r.push(t)}};var o=t("./read-format").format.uint8,i=t("./read-token").token,f=t("./common").BUFFER_SHORTAGE},{"./common":3,"./read-format":14,"./read-token":15}],14:[function(e,t,n){(function(t){function r(e,n){return function(t){var r=t.offset;if((t.offset=r+e)>t.buffer.length)throw u;return n.call(t.buffer,r,s)}}n.format={map:function(t,r){var e,n={},o=new Array(r),i=new Array(r);for(e=0;e<r;e++)o[e]=f(t),i[e]=f(t);for(e=0;e<r;e++)n[o[e]]=i[e];return n},array:function(t,r){for(var e=new Array(r),n=0;n<r;n++)e[n]=f(t);return e},str:function(t,r){var e=t.offset,n=t.offset=e+r;if(n>t.buffer.length)throw u;return i?o.readString.call(t.buffer,e,n):t.buffer.toString("utf-8",e,n)},bin:function(t,r){var e=t.offset,n=t.offset=e+r;if(n>t.buffer.length)throw u;return t.buffer.slice(e,n)},ext:function(t,r){var e=t.offset,n=t.offset=e+r+1;if(n>t.buffer.length)throw u;var o=t.buffer[e],i=a.getExtUnpacker(o);if(!i)throw new Error("Invalid ext type: "+(o?"0x"+o.toString(16):o));return i(t.buffer.slice(e+1,n))},uint8:function(t){var r=t.buffer;if(t.offset>=r.length)throw u;return r[t.offset++]},uint16:function(t){var r=t.buffer;if(t.offset+2>r.length)throw u;return r[t.offset++]<<8|r[t.offset++]},uint32:r(4,t.prototype.readUInt32BE),uint64:r(8,function(t,r){var e=this.readUInt32BE(t,r),n=this.readUInt32BE(t+4,r);return e?4294967296*e+n:n}),int8:r(1,t.prototype.readInt8),int16:r(2,t.prototype.readInt16BE),int32:r(4,t.prototype.readInt32BE),int64:r(8,function(t,r){var e=this.readInt32BE(t,r),n=this.readUInt32BE(t+4,r);return e?4294967296*e+n:n}),float32:r(4,t.prototype.readFloatBE),float64:r(8,t.prototype.readDoubleBE)};var o=e("./buffer-lite"),f=e("./read-core").decode,a=e("./ext-preset").preset,u=e("./common").BUFFER_SHORTAGE,i="TYPED_ARRAY_SUPPORT"in t,s=!0}).call(this,e("buffer").Buffer)},{"./buffer-lite":2,"./common":3,"./ext-preset":11,"./read-core":13,buffer:20}],15:[function(t,r,e){function n(t){return function(){return t}}function o(e,n){return function(t){var r=e(t);return n(t,r)}}function i(r,e){return function(t){return e(t,r)}}var f=e.token=new Array(256),a=t("./read-format").format;!function(){var t;for(t=0;t<=127;t++)f[t]=n(t);for(t=128;t<=143;t++)f[t]=i(t-128,a.map);for(t=144;t<=159;t++)f[t]=i(t-144,a.array);for(t=160;t<=191;t++)f[t]=i(t-160,a.str);for(f[192]=n(null),f[193]=null,f[194]=n(!1),f[195]=n(!0),f[196]=o(a.uint8,a.bin),f[197]=o(a.uint16,a.bin),f[198]=o(a.uint32,a.bin),f[199]=o(a.uint8,a.ext),f[200]=o(a.uint16,a.ext),f[201]=o(a.uint32,a.ext),f[202]=a.float32,f[203]=a.float64,f[204]=a.uint8,f[205]=a.uint16,f[206]=a.uint32,f[207]=a.uint64,f[208]=a.int8,f[209]=a.int16,f[210]=a.int32,f[211]=a.int64,f[212]=i(1,a.ext),f[213]=i(2,a.ext),f[214]=i(4,a.ext),f[215]=i(8,a.ext),f[216]=i(16,a.ext),f[217]=o(a.uint8,a.str),f[218]=o(a.uint16,a.str),f[219]=o(a.uint32,a.str),f[220]=o(a.uint16,a.array),f[221]=o(a.uint32,a.array),f[222]=o(a.uint16,a.map),f[223]=o(a.uint32,a.map),t=224;t<=255;t++)f[t]=n(t-256)}()},{"./read-format":14}],16:[function(t,r,e){e.encode=function(t,r){var e=n[typeof r];if(!e)throw new Error('Unsupported type "'+typeof r+'": '+r);e(t,r)};var n=t("./write-type").type},{"./write-type":18}],17:[function(t,r,h){(function(r){function e(o){return function(t,r){t.reserve(2);var e=t.buffer,n=t.offset;e[n++]=o,e[n++]=r,t.offset=n}}function n(o){return function(t,r){t.reserve(3);var e=t.buffer,n=t.offset;e[n++]=o,e[n++]=r>>>8,e[n++]=r,t.offset=n}}function o(o){return function(t,r){t.reserve(5);var e=t.buffer,n=t.offset;e[n++]=o,e[n++]=r>>>24,e[n++]=r>>>16,e[n++]=r>>>8,e[n++]=r,t.offset=n}}function i(e,n,o){return function(t,r){t.reserve(n+1),t.buffer[t.offset++]=e,o.call(t.buffer,r,t.offset,s),t.offset+=n}}var f=h.token=new Array(256),a=t("./buffer-lite"),u=t("./write-uint8").uint8,s=!0,c="TYPED_ARRAY_SUPPORT"in r&&!r.TYPED_ARRAY_SUPPORT;!function(){for(var t=0;t<=255;t++)f[t]=u[t];f[223]=c?(f[196]=i(196,1,r.prototype.writeUInt8),f[197]=i(197,2,r.prototype.writeUInt16BE),f[198]=i(198,4,r.prototype.writeUInt32BE),f[199]=i(199,1,r.prototype.writeUInt8),f[200]=i(200,2,r.prototype.writeUInt16BE),f[201]=i(201,4,r.prototype.writeUInt32BE),f[202]=i(202,4,r.prototype.writeFloatBE),f[203]=i(203,8,r.prototype.writeDoubleBE),f[204]=i(204,1,r.prototype.writeUInt8),f[205]=i(205,2,r.prototype.writeUInt16BE),f[206]=i(206,4,r.prototype.writeUInt32BE),f[207]=i(207,8,a.writeUint64BE),f[208]=i(208,1,r.prototype.writeInt8),f[209]=i(209,2,r.prototype.writeInt16BE),f[210]=i(210,4,r.prototype.writeInt32BE),f[211]=i(211,8,a.writeUint64BE),f[217]=i(217,1,r.prototype.writeUInt8),f[218]=i(218,2,r.prototype.writeUInt16BE),f[219]=i(219,4,r.prototype.writeUInt32BE),f[220]=i(220,2,r.prototype.writeUInt16BE),f[221]=i(221,4,r.prototype.writeUInt32BE),f[222]=i(222,2,r.prototype.writeUInt16BE),i(223,4,r.prototype.writeUInt32BE)):(f[196]=e(196),f[197]=n(197),f[198]=o(198),f[199]=e(199),f[200]=n(200),f[201]=o(201),f[202]=i(202,4,r.prototype.writeFloatBE),f[203]=i(203,8,r.prototype.writeDoubleBE),f[204]=e(204),f[205]=n(205),f[206]=o(206),f[207]=i(207,8,a.writeUint64BE),f[208]=e(208),f[209]=n(209),f[210]=o(210),f[211]=i(211,8,a.writeUint64BE),f[217]=e(217),f[218]=n(218),f[219]=o(219),f[220]=n(220),f[221]=o(221),f[222]=n(222),o(223))}()}).call(this,t("buffer").Buffer)},{"./buffer-lite":2,"./write-uint8":19,buffer:20}],18:[function(t,r,e){(function(E){function y(t,r){w[192](t,r)}e.type={boolean:function(t,r){w[r?195:194](t,r)},function:y,number:function(t,r){var e=0|r;return r!==e?void w[203](t,r):void w[-32<=e&&e<=127?255&e:0<=e?e<=255?204:e<=65535?205:206:-128<=e?208:-32768<=e?209:210](t,e)},object:function(t,r){if(A(r))return function(t,r){var e=r.length;w[e<16?144+e:e<=65535?220:221](t,e);for(var n=0;n<e;n++)g(t,r[n])}(t,r);if(null===r)return y(t,r);var e,n,o,i,f,a,u,s,c,h,p,d,l=b.getExtPacker(r);return l&&(r=l(r)),r instanceof U?(s=t,h=(c=r).buffer,p=h.length,d=B[p]||(p<255?199:p<=65535?200:201),w[d](s,p),v[c.type](s),void s.send(h)):E.isBuffer(r)?(f=t,u=(a=r).length,w[u<255?196:u<=65535?197:198](f,u),void f.send(a)):(e=t,n=r,o=Object.keys(n),i=o.length,w[i<16?128+i:i<=65535?222:223](e,i),void o.forEach(function(t){g(e,t),g(e,n[t])}))},string:function(t,r){var e=r.length,n=5+3*e;t.reserve(n);var o=e<32?1:e<=255?2:e<=65535?3:5,i=t.offset+o,f=(e=s.writeString.call(t.buffer,r,i))<32?1:e<=255?2:e<=65535?3:5;if(o!==f){var a=t.offset+f,u=i+e;c?s.copy.call(t.buffer,t.buffer,a,i,u):t.buffer.copy(t.buffer,a,i,u)}w[1===f?160+e:f<=3?215+f:219](t,e),t.offset+=e},symbol:y,undefined:y};var s=t("./buffer-lite"),w=t("./write-token").token,g=t("./write-core").encode,v=t("./write-uint8").uint8,b=t("./ext-preset").preset,U=t("./ext-buffer").ExtBuffer,c="TYPED_ARRAY_SUPPORT"in E,A=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)},B=[];B[1]=212,B[2]=213,B[4]=214,B[8]=215,B[16]=216}).call(this,t("buffer").Buffer)},{"./buffer-lite":2,"./ext-buffer":10,"./ext-preset":11,"./write-core":16,"./write-token":17,"./write-uint8":19,buffer:20}],19:[function(t,r,e){function n(r){return function(t){t.reserve(1),t.buffer[t.offset++]=r}}for(var o=e.uint8=new Array(256),i=0;i<=255;i++)o[i]=n(i)},{}],20:[function(t,r,e){function n(){return a.TYPED_ARRAY_SUPPORT?2147483647:1073741823}function a(t){return this instanceof a?(this.length=0,this.parent=void 0,"number"==typeof t?function(t,r){if(t=s(t,r<0?0:0|c(r)),!a.TYPED_ARRAY_SUPPORT)for(var e=0;e<r;e++)t[e]=0;return t}(this,t):"string"==typeof t?function(t,r,e){("string"!=typeof e||""===e)&&(e="utf8");var n=0|o(r,e);return(t=s(t,n)).write(r,e),t}(this,t,1<arguments.length?arguments[1]:"utf8"):function(t,r){if(a.isBuffer(r))return e=t,n=r,o=0|c(n.length),e=s(e,o),n.copy(e,0,0,o),e;var e,n,o;if(P(r))return function(t,r){var e=0|c(r.length);t=s(t,e);for(var n=0;n<e;n+=1)t[n]=255&r[n];return t}(t,r);if(null==r)throw new TypeError("must start with number, buffer, array or string");if("undefined"!=typeof ArrayBuffer){if(r.buffer instanceof ArrayBuffer)return u(t,r);if(r instanceof ArrayBuffer)return i=t,f=r,i=a.TYPED_ARRAY_SUPPORT?(f.byteLength,a._augment(new Uint8Array(f))):u(i,new Uint8Array(f))}var i,f;return r.length?function(t,r){var e=0|c(r.length);t=s(t,e);for(var n=0;n<e;n+=1)t[n]=255&r[n];return t}(t,r):function(t,r){var e,n=0;"Buffer"===r.type&&P(r.data)&&(e=r.data,n=0|c(e.length)),t=s(t,n);for(var o=0;o<n;o+=1)t[o]=255&e[o];return t}(t,r)}(this,t)):1<arguments.length?new a(t,arguments[1]):new a(t)}function u(t,r){var e=0|c(r.length);t=s(t,e);for(var n=0;n<e;n+=1)t[n]=255&r[n];return t}function s(t,r){return a.TYPED_ARRAY_SUPPORT?t=a._augment(new Uint8Array(r)):(t.length=r,t._isBuffer=!0),0!==r&&r<=a.poolSize>>>1&&(t.parent=k),t}function c(t){if(t>=n())throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+n().toString(16)+" bytes");return 0|t}function o(t,r){"string"!=typeof t&&(t=""+t);var e=t.length;if(0===e)return 0;for(var n=!1;;)switch(r){case"ascii":case"binary":case"raw":case"raws":return e;case"utf8":case"utf-8":return B(t).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*e;case"hex":return e>>>1;case"base64":return I(t).length;default:if(n)return B(t).length;r=(""+r).toLowerCase(),n=!0}}function y(t,r,e,n){e=Number(e)||0;var o=t.length-e;n?o<(n=Number(n))&&(n=o):n=o;var i=r.length;if(i%2!=0)throw new Error("Invalid hex string");i/2<n&&(n=i/2);for(var f=0;f<n;f++){var a=parseInt(r.substr(2*f,2),16);if(isNaN(a))throw new Error("Invalid hex string");t[e+f]=a}return f}function w(t,r,e,n){return x(function(t){for(var r=[],e=0;e<t.length;e++)r.push(255&t.charCodeAt(e));return r}(r),t,e,n)}function h(t,r,e){e=Math.min(t.length,e);for(var n=[],o=r;o<e;){var i,f,a,u,s=t[o],c=null,h=239<s?4:223<s?3:191<s?2:1;if(o+h<=e)switch(h){case 1:s<128&&(c=s);break;case 2:128==(192&(i=t[o+1]))&&(127<(u=(31&s)<<6|63&i)&&(c=u));break;case 3:i=t[o+1],f=t[o+2],128==(192&i)&&128==(192&f)&&(2047<(u=(15&s)<<12|(63&i)<<6|63&f)&&(u<55296||57343<u)&&(c=u));break;case 4:i=t[o+1],f=t[o+2],a=t[o+3],128==(192&i)&&128==(192&f)&&128==(192&a)&&(65535<(u=(15&s)<<18|(63&i)<<12|(63&f)<<6|63&a)&&u<1114112&&(c=u))}null===c?(c=65533,h=1):65535<c&&(c-=65536,n.push(c>>>10&1023|55296),c=56320|1023&c),n.push(c),o+=h}return function(t){var r=t.length;if(r<=S)return String.fromCharCode.apply(String,t);for(var e="",n=0;n<r;)e+=String.fromCharCode.apply(String,t.slice(n,n+=S));return e}(n)}function p(t,r,e){var n="";e=Math.min(t.length,e);for(var o=r;o<e;o++)n+=String.fromCharCode(127&t[o]);return n}function d(t,r,e){var n="";e=Math.min(t.length,e);for(var o=r;o<e;o++)n+=String.fromCharCode(t[o]);return n}function l(t,r,e){var n,o=t.length;(!r||r<0)&&(r=0),(!e||e<0||o<e)&&(e=o);for(var i="",f=r;f<e;f++)i+=(n=t[f])<16?"0"+n.toString(16):n.toString(16);return i}function E(t,r,e){for(var n=t.slice(r,e),o="",i=0;i<n.length;i+=2)o+=String.fromCharCode(n[i]+256*n[i+1]);return o}function f(t,r,e){if(t%1!=0||t<0)throw new RangeError("offset is not uint");if(e<t+r)throw new RangeError("Trying to access beyond buffer length")}function g(t,r,e,n,o,i){if(!a.isBuffer(t))throw new TypeError("buffer must be a Buffer instance");if(o<r||r<i)throw new RangeError("value is out of bounds");if(e+n>t.length)throw new RangeError("index out of range")}function i(t,r,e,n){r<0&&(r=65535+r+1);for(var o=0,i=Math.min(t.length-e,2);o<i;o++)t[e+o]=(r&255<<8*(n?o:1-o))>>>8*(n?o:1-o)}function v(t,r,e,n){r<0&&(r=4294967295+r+1);for(var o=0,i=Math.min(t.length-e,4);o<i;o++)t[e+o]=r>>>8*(n?o:3-o)&255}function b(t,r,e,n,o,i){if(o<r||r<i)throw new RangeError("value is out of bounds");if(e+n>t.length)throw new RangeError("index out of range");if(e<0)throw new RangeError("index out of range")}function U(t,r,e,n,o){return o||b(t,r,e,4,34028234663852886e22,-34028234663852886e22),R.write(t,r,e,n,23,4),e+4}function A(t,r,e,n,o){return o||b(t,r,e,8,17976931348623157e292,-17976931348623157e292),R.write(t,r,e,n,52,8),e+8}function B(t,r){r=r||1/0;for(var e,n=t.length,o=null,i=[],f=0;f<n;f++){if(55295<(e=t.charCodeAt(f))&&e<57344){if(!o){if(56319<e){-1<(r-=3)&&i.push(239,191,189);continue}if(f+1===n){-1<(r-=3)&&i.push(239,191,189);continue}o=e;continue}if(e<56320){-1<(r-=3)&&i.push(239,191,189),o=e;continue}e=o-55296<<10|e-56320|65536}else o&&-1<(r-=3)&&i.push(239,191,189);if(o=null,e<128){if((r-=1)<0)break;i.push(e)}else if(e<2048){if((r-=2)<0)break;i.push(e>>6|192,63&e|128)}else if(e<65536){if((r-=3)<0)break;i.push(e>>12|224,e>>6&63|128,63&e|128)}else{if(!(e<1114112))throw new Error("Invalid code point");if((r-=4)<0)break;i.push(e>>18|240,e>>12&63|128,e>>6&63|128,63&e|128)}}return i}function I(t){return m.toByteArray(function(t){if((t=(r=t,r.trim?r.trim():r.replace(/^\s+|\s+$/g,"")).replace(_,"")).length<2)return"";for(var r;t.length%4!=0;)t+="=";return t}(t))}function x(t,r,e,n){for(var o=0;o<n&&!(o+e>=r.length||o>=t.length);o++)r[o+e]=t[o];return o}var m=t("base64-js"),R=t("ieee754"),P=t("is-array");e.Buffer=a,e.SlowBuffer=function t(r,e){if(!(this instanceof t))return new t(r,e);var n=new a(r,e);return delete n.parent,n},e.INSPECT_MAX_BYTES=50,a.poolSize=8192;var k={};a.TYPED_ARRAY_SUPPORT=function(){function t(){}try{var r=new Uint8Array(1);return r.foo=function(){return 42},r.constructor=t,42===r.foo()&&r.constructor===t&&"function"==typeof r.subarray&&0===r.subarray(1,1).byteLength}catch(t){return!1}}(),a.isBuffer=function(t){return!(null==t||!t._isBuffer)},a.compare=function(t,r){if(!a.isBuffer(t)||!a.isBuffer(r))throw new TypeError("Arguments must be Buffers");if(t===r)return 0;for(var e=t.length,n=r.length,o=0,i=Math.min(e,n);o<i&&t[o]===r[o];)++o;return o!==i&&(e=t[o],n=r[o]),e<n?-1:n<e?1:0},a.isEncoding=function(t){switch(String(t).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"binary":case"base64":case"raw":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},a.concat=function(t,r){if(!P(t))throw new TypeError("list argument must be an Array of Buffers.");if(0===t.length)return new a(0);var e;if(void 0===r)for(e=r=0;e<t.length;e++)r+=t[e].length;var n=new a(r),o=0;for(e=0;e<t.length;e++){var i=t[e];i.copy(n,o),o+=i.length}return n},a.byteLength=o,a.prototype.length=void 0,a.prototype.parent=void 0,a.prototype.toString=function(){var t=0|this.length;return 0===t?"":0===arguments.length?h(this,0,t):function(t,r,e){var n,o,i,f=!1;if(t||(t="utf8"),(r|=0)<0&&(r=0),(e=void 0===e||e===1/0?this.length:0|e)>this.length&&(e=this.length),e<=r)return"";for(;;)switch(t){case"hex":return l(this,r,e);case"utf8":case"utf-8":return h(this,r,e);case"ascii":return p(this,r,e);case"binary":return d(this,r,e);case"base64":return n=this,i=e,0===(o=r)&&i===n.length?m.fromByteArray(n):m.fromByteArray(n.slice(o,i));case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return E(this,r,e);default:if(f)throw new TypeError("Unknown encoding: "+t);t=(t+"").toLowerCase(),f=!0}}.apply(this,arguments)},a.prototype.equals=function(t){if(!a.isBuffer(t))throw new TypeError("Argument must be a Buffer");return this===t||0===a.compare(this,t)},a.prototype.inspect=function(){var t="",r=e.INSPECT_MAX_BYTES;return 0<this.length&&(t=this.toString("hex",0,r).match(/.{2}/g).join(" "),this.length>r&&(t+=" ... ")),"<Buffer "+t+">"},a.prototype.compare=function(t){if(!a.isBuffer(t))throw new TypeError("Argument must be a Buffer");return this===t?0:a.compare(this,t)},a.prototype.indexOf=function(t,r){function e(t,r,e){for(var n=-1,o=0;e+o<t.length;o++)if(t[e+o]===r[-1===n?0:o-n]){if(-1===n&&(n=o),o-n+1===r.length)return e+n}else n=-1;return-1}if(2147483647<r?r=2147483647:r<-2147483648&&(r=-2147483648),r>>=0,0===this.length)return-1;if(r>=this.length)return-1;if(r<0&&(r=Math.max(this.length+r,0)),"string"==typeof t)return 0===t.length?-1:String.prototype.indexOf.call(this,t,r);if(a.isBuffer(t))return e(this,t,r);if("number"==typeof t)return a.TYPED_ARRAY_SUPPORT&&"function"===Uint8Array.prototype.indexOf?Uint8Array.prototype.indexOf.call(this,t,r):e(this,[t],r);throw new TypeError("val must be string, number or Buffer")},a.prototype.get=function(t){return this.readUInt8(t)},a.prototype.set=function(t,r){return this.writeUInt8(t,r)},a.prototype.write=function(t,r,e,n){if(void 0===r)n="utf8",e=this.length,r=0;else if(void 0===e&&"string"==typeof r)n=r,e=this.length,r=0;else if(isFinite(r))r|=0,isFinite(e)?(e|=0,void 0===n&&(n="utf8")):(n=e,e=void 0);else{var o=n;n=r,r=0|e,e=o}var i,f,a,u,s,c,h,p,d,l=this.length-r;if((void 0===e||l<e)&&(e=l),0<t.length&&(e<0||r<0)||r>this.length)throw new RangeError("attempt to write outside buffer bounds");n||(n="utf8");for(var E=!1;;)switch(n){case"hex":return y(this,t,r,e);case"utf8":case"utf-8":return p=r,d=e,x(B(t,(h=this).length-p),h,p,d);case"ascii":return w(this,t,r,e);case"binary":return w(this,t,r,e);case"base64":return u=this,s=r,c=e,x(I(t),u,s,c);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return f=r,a=e,x(function(t,r){for(var e,n,o,i=[],f=0;f<t.length&&!((r-=2)<0);f++)e=t.charCodeAt(f),n=e>>8,o=e%256,i.push(o),i.push(n);return i}(t,(i=this).length-f),i,f,a);default:if(E)throw new TypeError("Unknown encoding: "+n);n=(""+n).toLowerCase(),E=!0}},a.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};var S=4096;a.prototype.slice=function(t,r){var e,n=this.length;if((t=~~t)<0?(t+=n)<0&&(t=0):n<t&&(t=n),(r=void 0===r?n:~~r)<0?(r+=n)<0&&(r=0):n<r&&(r=n),r<t&&(r=t),a.TYPED_ARRAY_SUPPORT)e=a._augment(this.subarray(t,r));else{var o=r-t;e=new a(o,void 0);for(var i=0;i<o;i++)e[i]=this[i+t]}return e.length&&(e.parent=this.parent||this),e},a.prototype.readUIntLE=function(t,r,e){t|=0,r|=0,e||f(t,r,this.length);for(var n=this[t],o=1,i=0;++i<r&&(o*=256);)n+=this[t+i]*o;return n},a.prototype.readUIntBE=function(t,r,e){t|=0,r|=0,e||f(t,r,this.length);for(var n=this[t+--r],o=1;0<r&&(o*=256);)n+=this[t+--r]*o;return n},a.prototype.readUInt8=function(t,r){return r||f(t,1,this.length),this[t]},a.prototype.readUInt16LE=function(t,r){return r||f(t,2,this.length),this[t]|this[t+1]<<8},a.prototype.readUInt16BE=function(t,r){return r||f(t,2,this.length),this[t]<<8|this[t+1]},a.prototype.readUInt32LE=function(t,r){return r||f(t,4,this.length),(this[t]|this[t+1]<<8|this[t+2]<<16)+16777216*this[t+3]},a.prototype.readUInt32BE=function(t,r){return r||f(t,4,this.length),16777216*this[t]+(this[t+1]<<16|this[t+2]<<8|this[t+3])},a.prototype.readIntLE=function(t,r,e){t|=0,r|=0,e||f(t,r,this.length);for(var n=this[t],o=1,i=0;++i<r&&(o*=256);)n+=this[t+i]*o;return(o*=128)<=n&&(n-=Math.pow(2,8*r)),n},a.prototype.readIntBE=function(t,r,e){t|=0,r|=0,e||f(t,r,this.length);for(var n=r,o=1,i=this[t+--n];0<n&&(o*=256);)i+=this[t+--n]*o;return(o*=128)<=i&&(i-=Math.pow(2,8*r)),i},a.prototype.readInt8=function(t,r){return r||f(t,1,this.length),128&this[t]?-1*(255-this[t]+1):this[t]},a.prototype.readInt16LE=function(t,r){r||f(t,2,this.length);var e=this[t]|this[t+1]<<8;return 32768&e?4294901760|e:e},a.prototype.readInt16BE=function(t,r){r||f(t,2,this.length);var e=this[t+1]|this[t]<<8;return 32768&e?4294901760|e:e},a.prototype.readInt32LE=function(t,r){return r||f(t,4,this.length),this[t]|this[t+1]<<8|this[t+2]<<16|this[t+3]<<24},a.prototype.readInt32BE=function(t,r){return r||f(t,4,this.length),this[t]<<24|this[t+1]<<16|this[t+2]<<8|this[t+3]},a.prototype.readFloatLE=function(t,r){return r||f(t,4,this.length),R.read(this,t,!0,23,4)},a.prototype.readFloatBE=function(t,r){return r||f(t,4,this.length),R.read(this,t,!1,23,4)},a.prototype.readDoubleLE=function(t,r){return r||f(t,8,this.length),R.read(this,t,!0,52,8)},a.prototype.readDoubleBE=function(t,r){return r||f(t,8,this.length),R.read(this,t,!1,52,8)},a.prototype.writeUIntLE=function(t,r,e,n){t=+t,r|=0,e|=0,n||g(this,t,r,e,Math.pow(2,8*e),0);var o=1,i=0;for(this[r]=255&t;++i<e&&(o*=256);)this[r+i]=t/o&255;return r+e},a.prototype.writeUIntBE=function(t,r,e,n){t=+t,r|=0,e|=0,n||g(this,t,r,e,Math.pow(2,8*e),0);var o=e-1,i=1;for(this[r+o]=255&t;0<=--o&&(i*=256);)this[r+o]=t/i&255;return r+e},a.prototype.writeUInt8=function(t,r,e){return t=+t,r|=0,e||g(this,t,r,1,255,0),a.TYPED_ARRAY_SUPPORT||(t=Math.floor(t)),this[r]=t,r+1},a.prototype.writeUInt16LE=function(t,r,e){return t=+t,r|=0,e||g(this,t,r,2,65535,0),a.TYPED_ARRAY_SUPPORT?(this[r]=t,this[r+1]=t>>>8):i(this,t,r,!0),r+2},a.prototype.writeUInt16BE=function(t,r,e){return t=+t,r|=0,e||g(this,t,r,2,65535,0),a.TYPED_ARRAY_SUPPORT?(this[r]=t>>>8,this[r+1]=t):i(this,t,r,!1),r+2},a.prototype.writeUInt32LE=function(t,r,e){return t=+t,r|=0,e||g(this,t,r,4,4294967295,0),a.TYPED_ARRAY_SUPPORT?(this[r+3]=t>>>24,this[r+2]=t>>>16,this[r+1]=t>>>8,this[r]=t):v(this,t,r,!0),r+4},a.prototype.writeUInt32BE=function(t,r,e){return t=+t,r|=0,e||g(this,t,r,4,4294967295,0),a.TYPED_ARRAY_SUPPORT?(this[r]=t>>>24,this[r+1]=t>>>16,this[r+2]=t>>>8,this[r+3]=t):v(this,t,r,!1),r+4},a.prototype.writeIntLE=function(t,r,e,n){if(t=+t,r|=0,!n){var o=Math.pow(2,8*e-1);g(this,t,r,e,o-1,-o)}var i=0,f=1,a=t<0?1:0;for(this[r]=255&t;++i<e&&(f*=256);)this[r+i]=(t/f>>0)-a&255;return r+e},a.prototype.writeIntBE=function(t,r,e,n){if(t=+t,r|=0,!n){var o=Math.pow(2,8*e-1);g(this,t,r,e,o-1,-o)}var i=e-1,f=1,a=t<0?1:0;for(this[r+i]=255&t;0<=--i&&(f*=256);)this[r+i]=(t/f>>0)-a&255;return r+e},a.prototype.writeInt8=function(t,r,e){return t=+t,r|=0,e||g(this,t,r,1,127,-128),a.TYPED_ARRAY_SUPPORT||(t=Math.floor(t)),t<0&&(t=255+t+1),this[r]=t,r+1},a.prototype.writeInt16LE=function(t,r,e){return t=+t,r|=0,e||g(this,t,r,2,32767,-32768),a.TYPED_ARRAY_SUPPORT?(this[r]=t,this[r+1]=t>>>8):i(this,t,r,!0),r+2},a.prototype.writeInt16BE=function(t,r,e){return t=+t,r|=0,e||g(this,t,r,2,32767,-32768),a.TYPED_ARRAY_SUPPORT?(this[r]=t>>>8,this[r+1]=t):i(this,t,r,!1),r+2},a.prototype.writeInt32LE=function(t,r,e){return t=+t,r|=0,e||g(this,t,r,4,2147483647,-2147483648),a.TYPED_ARRAY_SUPPORT?(this[r]=t,this[r+1]=t>>>8,this[r+2]=t>>>16,this[r+3]=t>>>24):v(this,t,r,!0),r+4},a.prototype.writeInt32BE=function(t,r,e){return t=+t,r|=0,e||g(this,t,r,4,2147483647,-2147483648),t<0&&(t=4294967295+t+1),a.TYPED_ARRAY_SUPPORT?(this[r]=t>>>24,this[r+1]=t>>>16,this[r+2]=t>>>8,this[r+3]=t):v(this,t,r,!1),r+4},a.prototype.writeFloatLE=function(t,r,e){return U(this,t,r,!0,e)},a.prototype.writeFloatBE=function(t,r,e){return U(this,t,r,!1,e)},a.prototype.writeDoubleLE=function(t,r,e){return A(this,t,r,!0,e)},a.prototype.writeDoubleBE=function(t,r,e){return A(this,t,r,!1,e)},a.prototype.copy=function(t,r,e,n){if(e||(e=0),n||0===n||(n=this.length),r>=t.length&&(r=t.length),r||(r=0),0<n&&n<e&&(n=e),n===e)return 0;if(0===t.length||0===this.length)return 0;if(r<0)throw new RangeError("targetStart out of bounds");if(e<0||e>=this.length)throw new RangeError("sourceStart out of bounds");if(n<0)throw new RangeError("sourceEnd out of bounds");n>this.length&&(n=this.length),t.length-r<n-e&&(n=t.length-r+e);var o,i=n-e;if(this===t&&e<r&&r<n)for(o=i-1;0<=o;o--)t[o+r]=this[o+e];else if(i<1e3||!a.TYPED_ARRAY_SUPPORT)for(o=0;o<i;o++)t[o+r]=this[o+e];else t._set(this.subarray(e,e+i),r);return i},a.prototype.fill=function(t,r,e){if(t||(t=0),r||(r=0),e||(e=this.length),e<r)throw new RangeError("end < start");if(e!==r&&0!==this.length){if(r<0||r>=this.length)throw new RangeError("start out of bounds");if(e<0||e>this.length)throw new RangeError("end out of bounds");var n;if("number"==typeof t)for(n=r;n<e;n++)this[n]=t;else{var o=B(t.toString()),i=o.length;for(n=r;n<e;n++)this[n]=o[n%i]}return this}},a.prototype.toArrayBuffer=function(){if("undefined"==typeof Uint8Array)throw new TypeError("Buffer.toArrayBuffer not supported in this browser");if(a.TYPED_ARRAY_SUPPORT)return new a(this).buffer;for(var t=new Uint8Array(this.length),r=0,e=t.length;r<e;r+=1)t[r]=this[r];return t.buffer};var T=a.prototype;a._augment=function(t){return t.constructor=a,t._isBuffer=!0,t._set=t.set,t.get=T.get,t.set=T.set,t.write=T.write,t.toString=T.toString,t.toLocaleString=T.toString,t.toJSON=T.toJSON,t.equals=T.equals,t.compare=T.compare,t.indexOf=T.indexOf,t.copy=T.copy,t.slice=T.slice,t.readUIntLE=T.readUIntLE,t.readUIntBE=T.readUIntBE,t.readUInt8=T.readUInt8,t.readUInt16LE=T.readUInt16LE,t.readUInt16BE=T.readUInt16BE,t.readUInt32LE=T.readUInt32LE,t.readUInt32BE=T.readUInt32BE,t.readIntLE=T.readIntLE,t.readIntBE=T.readIntBE,t.readInt8=T.readInt8,t.readInt16LE=T.readInt16LE,t.readInt16BE=T.readInt16BE,t.readInt32LE=T.readInt32LE,t.readInt32BE=T.readInt32BE,t.readFloatLE=T.readFloatLE,t.readFloatBE=T.readFloatBE,t.readDoubleLE=T.readDoubleLE,t.readDoubleBE=T.readDoubleBE,t.writeUInt8=T.writeUInt8,t.writeUIntLE=T.writeUIntLE,t.writeUIntBE=T.writeUIntBE,t.writeUInt16LE=T.writeUInt16LE,t.writeUInt16BE=T.writeUInt16BE,t.writeUInt32LE=T.writeUInt32LE,t.writeUInt32BE=T.writeUInt32BE,t.writeIntLE=T.writeIntLE,t.writeIntBE=T.writeIntBE,t.writeInt8=T.writeInt8,t.writeInt16LE=T.writeInt16LE,t.writeInt16BE=T.writeInt16BE,t.writeInt32LE=T.writeInt32LE,t.writeInt32BE=T.writeInt32BE,t.writeFloatLE=T.writeFloatLE,t.writeFloatBE=T.writeFloatBE,t.writeDoubleLE=T.writeDoubleLE,t.writeDoubleBE=T.writeDoubleBE,t.fill=T.fill,t.inspect=T.inspect,t.toArrayBuffer=T.toArrayBuffer,t};var _=/[^+\/0-9A-Za-z-_]/g},{"base64-js":21,ieee754:22,"is-array":23}],21:[function(t,r,e){!function(t){"use strict";function c(t){var r=t.charCodeAt(0);return r===e||r===a?62:r===n||r===u?63:r<o?-1:r<o+10?r-o+26+26:r<f+26?r-f:r<i+26?r-i+26:void 0}var h="undefined"!=typeof Uint8Array?Uint8Array:Array,e="+".charCodeAt(0),n="/".charCodeAt(0),o="0".charCodeAt(0),i="a".charCodeAt(0),f="A".charCodeAt(0),a="-".charCodeAt(0),u="_".charCodeAt(0);t.toByteArray=function(t){function r(t){a[s++]=t}var e,n,o,i,f,a;if(0<t.length%4)throw new Error("Invalid string. Length must be a multiple of 4");var u=t.length;f="="===t.charAt(u-2)?2:"="===t.charAt(u-1)?1:0,a=new h(3*t.length/4-f),o=0<f?t.length-4:t.length;var s=0;for(n=e=0;e<o;e+=4,n+=3)r((16711680&(i=c(t.charAt(e))<<18|c(t.charAt(e+1))<<12|c(t.charAt(e+2))<<6|c(t.charAt(e+3))))>>16),r((65280&i)>>8),r(255&i);return 2===f?r(255&(i=c(t.charAt(e))<<2|c(t.charAt(e+1))>>4)):1===f&&(r((i=c(t.charAt(e))<<10|c(t.charAt(e+1))<<4|c(t.charAt(e+2))>>2)>>8&255),r(255&i)),a},t.fromByteArray=function(t){function r(t){return"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(t)}var e,n,o,i,f=t.length%3,a="";for(e=0,o=t.length-f;e<o;e+=3)n=(t[e]<<16)+(t[e+1]<<8)+t[e+2],a+=r((i=n)>>18&63)+r(i>>12&63)+r(i>>6&63)+r(63&i);switch(f){case 1:a+=r((n=t[t.length-1])>>2),a+=r(n<<4&63),a+="==";break;case 2:a+=r((n=(t[t.length-2]<<8)+t[t.length-1])>>10),a+=r(n>>4&63),a+=r(n<<2&63),a+="="}return a}}(void 0===e?this.base64js={}:e)},{}],22:[function(t,r,e){e.read=function(t,r,e,n,o){var i,f,a=8*o-n-1,u=(1<<a)-1,s=u>>1,c=-7,h=e?o-1:0,p=e?-1:1,d=t[r+h];for(h+=p,i=d&(1<<-c)-1,d>>=-c,c+=a;0<c;i=256*i+t[r+h],h+=p,c-=8);for(f=i&(1<<-c)-1,i>>=-c,c+=n;0<c;f=256*f+t[r+h],h+=p,c-=8);if(0===i)i=1-s;else{if(i===u)return f?NaN:1/0*(d?-1:1);f+=Math.pow(2,n),i-=s}return(d?-1:1)*f*Math.pow(2,i-n)},e.write=function(t,r,e,n,o,i){var f,a,u,s=8*i-o-1,c=(1<<s)-1,h=c>>1,p=23===o?Math.pow(2,-24)-Math.pow(2,-77):0,d=n?0:i-1,l=n?1:-1,E=r<0||0===r&&1/r<0?1:0;for(r=Math.abs(r),isNaN(r)||r===1/0?(a=isNaN(r)?1:0,f=c):(f=Math.floor(Math.log(r)/Math.LN2),r*(u=Math.pow(2,-f))<1&&(f--,u*=2),2<=(r+=1<=f+h?p/u:p*Math.pow(2,1-h))*u&&(f++,u/=2),c<=f+h?(a=0,f=c):1<=f+h?(a=(r*u-1)*Math.pow(2,o),f+=h):(a=r*Math.pow(2,h-1)*Math.pow(2,o),f=0));8<=o;t[e+d]=255&a,d+=l,a/=256,o-=8);for(f=f<<o|a,s+=o;0<s;t[e+d]=255&f,d+=l,f/=256,s-=8);t[e+d-l]|=128*E}},{}],23:[function(t,r,e){var n=Array.isArray,o=Object.prototype.toString;r.exports=n||function(t){return!!t&&"[object Array]"==o.call(t)}},{}],24:[function(t,n,r){!function(t){function r(t){for(var r in e)t[r]=e[r];return t}function o(t,r){var e,n=this;if(t){if(r){if(e=f(n,t,!0)){if(!(e=e.filter(function(t){return t!==r})).length)return o.call(n,t);n[i][t]=e}}else if((e=n[i])&&(delete e[t],!Object.keys(e).length))return o.call(n)}else delete n[i];return n}function f(t,r,e){if(!e||t[i]){var n=t[i]||(t[i]={});return n[r]||(n[r]=[])}}void 0!==n&&(n.exports=t);var i="listeners",e={on:function(t,r){return f(this,t).push(r),this},once:function(r,e){var n=this;return f(n,r).push(function t(){o.call(n,r,t),e.apply(this,arguments)}),n},off:o,emit:function(t,r){var e=this,n=f(e,t,!0);if(!n)return!1;var o=arguments.length;if(1===o)n.forEach(function(t){t.call(e)});else if(2===o)n.forEach(function(t){t.call(e,r)});else{var i=Array.prototype.slice.call(arguments,1);n.forEach(function(t){t.apply(e,i)})}return!!n.length}};r(t.prototype),t.mixin=r}(function t(){return this instanceof t?void 0:new t})},{}]},{},[1])(1)});