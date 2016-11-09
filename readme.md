#Progressive Web Apps (PWA) with Angular 2 Show Case

This sample shows:

- PWA with Angular 2
- Bundling Service Worker and App with webpack
- Caching with Service Worker and the Service Worker Toolbox
- Storing data with PouchDB (which uses IndexedDb, WebDb or LocalStorage)
- AppShell Pattern with Caching to quickly provide value to the user
- Web App Manifest and a Fallback using Meta-Tags to install the App to the Home Screen
- Background Synchronisation with Service Workers
- Push Notifications with Service Worksers

## Prerequisites

- NodeJS (nodejs.org)

## Installation

```
npm install
```

## Bundling

```
npm run webpack
```

## Starting

After Bundling run:

```
npm run http-server
```

This starts a http-server at localhost:8080

## Trying out Sample

1. Go to http://localhost:8080
2. Stop http-server and refresh browser
3. Web-Site should still load due to its service-worker based offline capabilities
4. Disconnect from the web
5. Alter the state of some bookings in the browser (check in/ check out).
6. Open F12-Dev-Tools
7. Reconnect to the web
8. Some time after reconnecting, you should see that the app is syncing the booking states with the server
9. Start http-server again (``npm run http-server``)
10. In chrome, go to F12-Dev-Tools (F12) | Application | Service Worker
11. Press 'Push' to simulate a push-message
12. You should see a push-message

## Sending push messages via HTTP

1. Start app and go to F12-Dev-Tools
2. The console should display a "push endpoint"
3. Send the following HTTP message to this push-endpoint to notify chrome. The auth key can be created within the google api console. See [this post](https://developers.google.com/web/updates/2015/03/push-notifications-on-the-open-web) for [further infos](https://developers.google.com/web/updates/2015/03/push-notifications-on-the-open-web). 

```
POST https://android.googleapis.com/gcm/send/dt1JdJT[...]
Content-Length: 0
Authorization: key=AIzaSyDGFJo7_qMFJRa5tVjHAfyPWjFEQBOe47o
TTL: 10
```

*Note:* To notify firefox, you don't need an auth key. The rest of the message is the same.

## Credits

- Google Web Starter Sit, https://github.com/google/web-starter-kit
- sw-toolbox, https://github.com/GoogleChrome/sw-toolbox 
- PouchDB, https://pouchdb.com/
