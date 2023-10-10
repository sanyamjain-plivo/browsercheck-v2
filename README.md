# browsercheck-v2
Browsercheck javascript library

## Exposed functions
- version: retrieve the Browsercheck library version
- checkWebSocket: verify the browser supports Websocket
- checkFlash: deprecated function, always return false
- getFlashVer: deprecated function, always return "0.0.0"
- checkBrowser: retrieve the browser details 
- checkOS: retrieve the OS details
- checkMic: deprecated function, always return true
- checkWebRTC: verify the browser supports WebRTC

## Flash deprecation
The following functions are deprecated but still present:
- checkFlash
- getFlashVer
- checkMic

Those three functions were only used for Flash. Adobe and the main browsers have deprecated Flash.

## Usage
Please refer to the [example](./example.html)

## Minified version of the Browsercheck library
You can use the minified version of the library [browsercheck.min.js](./browsercheck.min.js)
