"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var http_1 = require('@angular/http');
var flightsearch_component_1 = require('./flightsearch.component');
require('rxjs/add/operator/map');
require('rxjs/add/operator/toPromise');
var service = [
    http_1.HTTP_PROVIDERS
];
platform_browser_dynamic_1.bootstrap(flightsearch_component_1.FlightSearchComponent, service);
//# sourceMappingURL=main.js.map