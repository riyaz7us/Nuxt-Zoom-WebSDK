const { ZoomMtg } = require("@zoomus/websdk");
// what variable you hook into Vue's prototype will be available on ANY vue component
import Vue from "vue";
console.log(JSON.stringify(ZoomMtg.checkSystemRequirements()));

// CDN version default

//ZoomMtg.setZoomJSLib("https://dmogdx0jrul3u.cloudfront.net/1.3.7/lib", "/av");
ZoomMtg.setZoomJSLib("https://source.zoom.us/1.9.1/lib", "/av");
//node_modules/@zoomus/websdk/dist/lib

ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();

Vue.prototype.$ZoomMtg = ZoomMtg;