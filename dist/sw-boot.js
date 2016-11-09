//import "./app/service-worker/service-worker";
var context = self;
context.addEventListener('install', function (event) { event.waitUntil(context.skipWaiting()); });
context.addEventListener('activate', function (event) { event.waitUntil(context.clients.claim()); });
//importScripts("dist/vendor.js");
importScripts("dist/sw.js");
// v7
//# sourceMappingURL=sw-boot.js.map