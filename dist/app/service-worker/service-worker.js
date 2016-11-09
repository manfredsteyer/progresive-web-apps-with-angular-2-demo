"use strict";
//import { ReflectiveInjector } from '@angular/core';
// Polyfills for Service-Worker
require('core-js/es6/reflect');
require('core-js/es7/reflect');
// Imports
var booking_service_1 = require('../booking.service');
var toolbox = require('sw-toolbox');
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
//# sourceMappingURL=service-worker.js.map