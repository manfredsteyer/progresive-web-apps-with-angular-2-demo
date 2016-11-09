"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var booking_status_pipe_1 = require("./booking-status.pipe");
var flightsearch_component_1 = require("./flightsearch.component");
var card_1 = require("@angular2-material/card");
var button_1 = require("@angular2-material/button");
var icon_1 = require("@angular2-material/icon");
var toolbar_1 = require("@angular2-material/toolbar");
var sidenav_1 = require("@angular2-material/sidenav");
var list_1 = require("@angular2-material/list");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpModule,
                forms_1.FormsModule,
                button_1.MdButtonModule.forRoot(),
                card_1.MdCardModule.forRoot(),
                icon_1.MdIconModule.forRoot(),
                list_1.MdListModule.forRoot(),
                sidenav_1.MdSidenavModule.forRoot(),
                toolbar_1.MdToolbarModule.forRoot()
            ],
            declarations: [
                booking_status_pipe_1.BookingStatusPipe, flightsearch_component_1.FlightSearchComponent
            ],
            providers: [],
            bootstrap: [
                flightsearch_component_1.FlightSearchComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map