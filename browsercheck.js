(function () {
        var plivocheck;

	plivocheck = (function () {
		function plivocheck() {
		}
		// return the version
		plivocheck.prototype.version = function() {
			return "2.0";
		};
		// verify the browser supports Websocket with a function checkWebSocket
		plivocheck.prototype.checkWebSocket = function() {
			if ("WebSocket" in window) {
				if (typeof(WebSocket) == "function") {
					return true;
				}
			}
			return false;
		};
		// verify the browser supports Flash with a function checkFlash
		plivocheck.prototype.checkFlash = function() {
			console.log("checkFlash function is deprecated.");
			return false;
		};
		// get the Flash version with a function getFlashVer
		plivocheck.prototype.getFlashVer= function() {
			console.log("getFlashVer function is deprecated.");
			return "0.0.0";
		};
		// verify the browser with a function checkBrowser
		plivocheck.prototype.checkBrowser= function() {
			var browser = BrowserDetect.browser;
			var ver = BrowserDetect.fullVersion;
			return [browser, ver];
		};
		// verify the OS with a function checkOS
		plivocheck.prototype.checkOS = function() {
			return BrowserDetect.fullOS;
		};
		// verify the browser suports the microphone with a function checkMic
		plivocheck.prototype.checkMic = function() {
			console.log("checkMic function is deprecated.");
			return true;
		};
		// verify the browser supports WebRTC with a function checkWebRTC
		plivocheck.prototype.checkWebRTC = function() {
			return BrowserDetect.isWebrtcSupported();
		};
		return plivocheck;
		})();
	window.PlivoCheck = plivocheck;
}).call(this);


var BrowserDetect = {
	init: function() {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent) ||
			this.searchVersion(navigator.appVersion) ||
			"an unknown version";
		this.fullVersion = this.searchFullVersion(navigator.userAgent) ||
			this.searchVersion(navigator.appVersion) ||
			"an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
		this.fullOS = this.searchOSVersion() || undefined;
	},
	searchString: function(data) {
		for (var i=0;i<data.length;i++) {
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchOSVersion: function() {
		var colonIndex,endIndex,closeIndex;
		var osIndex = navigator.userAgent.indexOf(this.OS);
		endIndex = closeIndex = navigator.userAgent.indexOf(')', osIndex);
		if (this.OS == 'Windows') {
			colonIndex = navigator.userAgent.indexOf(';', osIndex);
			if (colonIndex > 0) {
				endIndex = colonIndex < closeIndex ? colonIndex:closeIndex;
			}
		}
		return navigator.userAgent.substring(osIndex, endIndex);
	},
	searchVersion: function(dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	searchFullVersion: function(dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		var temp = dataString.substring(index+this.versionSearchString.length+1);
		var spaceIndex = temp.indexOf(' ');
		if (spaceIndex <= 0) {
			return temp;
		}
		var fullVersion = temp.substring(0, spaceIndex);
		return fullVersion;
	},
	dataBrowser: [
		{
			string: navigator.userAgent,
			subString: "Chrome",
			identity: "Chrome"
		},
		{
			string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb"
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari",
			versionSearch: "Version"
		},
		{
			prop: window.opera,
			identity: "Opera",
			versionSearch: "Version"
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{
			string: navigator.vendor,
			subString: "Camino",
			identity: "Camino"
		},
		{		// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{
			// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}
	],
	dataOS : [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			string: navigator.userAgent,
			subString: "iPhone",
			identity: "iPhone/iPod"
		},
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	],
	/**
	 * Check if this browser version supported by plivo webrtc engine
	 * @public
	 */
	isWebrtcSupported: function() {
		var webrtc_support = navigator.mediaDevices.getUserMedia || navigator.getUserMedia ||  navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || window.RTCPeerConnection || window.PeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection
		if (!webrtc_support) {
			return false;
		}
		return true;
	}
};

BrowserDetect.init();

