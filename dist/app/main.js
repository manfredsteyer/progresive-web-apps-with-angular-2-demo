"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var app_module_1 = require("./app.module");
/*
let runtime = require('serviceworker-webpack-plugin/lib/runtime');

if ('serviceWorker' in navigator) {
  console.debug('registering service-worker');
  runtime.register().then(() => console.debug('ok')).catch((err) => console.error('error service worker start', err));

}
*/
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule)
    .catch(function (err) { return console.error(err); });
//# sourceMappingURL=main.js.map