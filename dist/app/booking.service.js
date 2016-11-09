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
var core_1 = require('@angular/core');
var PouchDB = require("pouchdb");
var PASSAGIER_ID = "3";
var URL = "http://www.angular.at/api/buchung";
var db = new PouchDB("bookingsDb");
var BookingService = (function () {
    function BookingService() {
    }
    BookingService.prototype.sync = function () {
        var that = this;
        return this.upload().then(function () {
            return that.download();
        });
    };
    BookingService.prototype.download = function () {
        var _this = this;
        return this.fetchOnline()
            .then(function (bookings) {
            return _this.save(bookings).then(function () { return bookings; });
        });
    };
    BookingService.prototype.upload = function () {
        var promises = [];
        return this.fetchLocal().then(function (bookings) {
            if (!bookings)
                return Promise.resolve(null);
            var method = "PUT";
            var mode = "CORS";
            var headers = new Headers();
            headers.set('Content-Type', 'text/json');
            console.debug('bookings', bookings);
            var promises = bookings.bookings.filter(function (b) { return b.isDirty; })
                .map(function (b) { return fetch(URL, { method: method, headers: headers, body: JSON.stringify(b) }); });
            if (!promises)
                return Promise.resolve(null);
            return Promise.all(promises);
        });
    };
    BookingService.prototype.fetchOnline = function () {
        // let search = new URLSearchParams();
        // search.set('passagierId', PASSAGIER_ID);
        // let headers = new Headers();
        // headers.set('Accept', 'text/json');
        var url = URL + "?passagierId=" + encodeURIComponent(PASSAGIER_ID);
        var headers = new Headers();
        headers.set('Accept', 'text/json');
        var method = "GET";
        var mode = "CORS";
        return fetch(url, { method: method, headers: headers /*, mode*/ })
            .then(function (r) { return r.json(); });
    };
    BookingService.prototype.fetchLocal = function () {
        return db.get('bookings').catch(function (err) {
            if (err.status == 404)
                return null;
            return Promise.reject(err);
        });
    };
    BookingService.prototype.save = function (bookings) {
        return this.fetchLocal().then(function (entity) {
            if (entity) {
                entity.bookings = bookings;
            }
            else {
                entity = {
                    _id: "bookings",
                    _rev: null,
                    bookings: bookings
                };
            }
            return db.put(entity);
        });
    };
    BookingService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], BookingService);
    return BookingService;
}());
exports.BookingService = BookingService;
//# sourceMappingURL=booking.service.js.map