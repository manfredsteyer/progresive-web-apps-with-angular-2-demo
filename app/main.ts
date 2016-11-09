import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from "./app.module";
/*
let runtime = require('serviceworker-webpack-plugin/lib/runtime');

if ('serviceWorker' in navigator) {
  console.debug('registering service-worker');
  runtime.register().then(() => console.debug('ok')).catch((err) => console.error('error service worker start', err));

}
*/

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));


