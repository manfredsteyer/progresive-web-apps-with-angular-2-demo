//import "./app/service-worker/service-worker";

if(typeof window != "object") self.window = self;

var context = self;
context.addEventListener('install', function(event) { event.waitUntil(context.skipWaiting()) });
context.addEventListener('activate', function(event) { event.waitUntil(context.clients.claim())});

importScripts("dist/sw.js");

// v8
