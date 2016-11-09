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
var booking_service_1 = require('./booking.service');
// 'node_modules/bootstrap/dist/css/bootstrap.css'
var FlightSearchComponent = (function () {
    function FlightSearchComponent(changeDetectionRef, bookingervice) {
        this.changeDetectionRef = changeDetectionRef;
        this.bookingervice = bookingervice;
        this.bookings = [];
    }
    FlightSearchComponent.prototype.ngOnInit = function () {
        this.setupPushNotifications();
        this.syncData();
    };
    FlightSearchComponent.prototype.syncData = function () {
        var hasPendingRequest = true;
        var that = this;
        this.bookingervice.sync().then(function (b) {
            hasPendingRequest = false;
            that.bookings = b;
            that.changeDetectionRef.detectChanges();
        });
        this.bookingervice.fetchLocal().then(function (b) {
            if (!hasPendingRequest)
                return;
            if (!b)
                return;
            that.bookings = b.bookings;
            that.changeDetectionRef.detectChanges();
        });
    };
    FlightSearchComponent.prototype.requestUpload = function () {
        var _this = this;
        var nav = navigator;
        if ('serviceWorker' in nav && 'SyncManager' in window) {
            nav.serviceWorker
                .ready
                .then(function (reg) {
                return reg.sync.register('upload');
            })
                .catch(function (_) {
                return _this.bookingervice.upload();
            });
        }
        else {
            this.bookingervice.upload();
        }
    };
    FlightSearchComponent.prototype.setupPushNotifications = function () {
        var nav = navigator;
        if ('serviceWorker' in navigator) {
            console.log('Service Worker is supported');
            nav.serviceWorker.ready.then(function (reg) {
                reg.pushManager.subscribe({
                    userVisibleOnly: true
                }).then(function (sub) {
                    console.log('push endpoint:', sub.endpoint);
                }).catch(function (err) {
                    console.error(err);
                });
            }).catch(function (error) {
                console.log('Error:', error);
            });
        }
    };
    FlightSearchComponent.prototype.checkin = function (b) {
        b.buchungsStatus = 1;
        b.isDirty = true;
        this.bookingervice.save(this.bookings);
        this.requestUpload();
    };
    FlightSearchComponent.prototype.boarding = function (b) {
        b.buchungsStatus = 2;
        b.isDirty = true;
        this.bookingervice.save(this.bookings);
        this.requestUpload();
    };
    FlightSearchComponent.prototype.booked = function (b) {
        b.buchungsStatus = 0;
        b.isDirty = true;
        this.bookingervice.save(this.bookings);
        this.requestUpload();
    };
    FlightSearchComponent = __decorate([
        core_1.Component({
            selector: 'flight-search',
            template: require('./flightsearch.component.html'),
            styles: [require('./flightsearch.component.css')],
            providers: [booking_service_1.BookingService]
        }), 
        __metadata('design:paramtypes', [core_1.ChangeDetectorRef, booking_service_1.BookingService])
    ], FlightSearchComponent);
    return FlightSearchComponent;
}());
exports.FlightSearchComponent = FlightSearchComponent;
//# sourceMappingURL=flightsearch.component.js.map