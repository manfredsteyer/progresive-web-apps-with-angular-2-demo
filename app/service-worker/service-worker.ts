//import { ReflectiveInjector } from '@angular/core';
// Polyfills for Service-Worker
import 'core-js/es6/reflect';
import 'core-js/es7/reflect';

// Imports
import { BookingService } from '../booking.service';
var toolbox = require('sw-toolbox');

console.debug("starting service-worker");

/*
const PROVIDERS = [
    BookingService
];

let injector = ReflectiveInjector.resolveAndCreate(PROVIDERS);
let bs:BookingService = injector.get(BookingService);
*/

let bs = new BookingService();

var context:any = self;

context.addEventListener('sync', function(event) {
  console.debug("Service Worker: sync, tag=" + event.tag);
  if (event.tag == 'upload') {
    event.waitUntil(bs.upload().then(_ => console.debug('background-upload finished')));
  }
});

context.addEventListener('push', function(event: any) {
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

declare var clients: any;

self.addEventListener('notificationclick', function(event: any) {
    console.log('Notification click: tag ', event.notification.tag);
    event.notification.close();
    var url = 'http://127.0.0.1:8080';
    event.waitUntil(
        clients.matchAll({
            type: 'window'
        })
        .then(function(windowClients) {
            console.debug("win-count: " + windowClients.length);
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                console.debug(" > client-url: " + client.url + ", url: " + url);
                let clientUrl: string = client.url;
                if ( clientUrl.startsWith(url) && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
});


var context: any = self;

toolbox.options.debug = true;

toolbox.precache([
    '/',
    '/index.html',
    '/dist/app.js',
    '/dist/vendor.js',
    '/dist/sw.js'
]);

toolbox.router.get('/(.*)', toolbox.networkOnly, {origin: 'http://www.angular.at'});
toolbox.router.default = toolbox.cacheFirst;
