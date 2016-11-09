import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Http, URLSearchParams, Headers} from '@angular/http';
import { Booking} from './booking';
import { BookingsDoc} from './bookings-doc';
import { BookingService} from './booking.service';
import { BookingStatusPipe} from './booking-status.pipe';

// 'node_modules/bootstrap/dist/css/bootstrap.css'

@Component({
    selector: 'flight-search', // <my-app></my-app>
    template: require('./flightsearch.component.html'),
    styles: [require('./flightsearch.component.css')],
    providers: [BookingService]

})
export class FlightSearchComponent implements OnInit {

    public bookings: Array<Booking> = [];

    constructor(
        private changeDetectionRef: ChangeDetectorRef,
        private bookingervice: BookingService) {
    }

    ngOnInit() {
        this.setupPushNotifications();
        this.syncData();
    }

    syncData() {
        let hasPendingRequest = true;
        let that = this;

        this.bookingervice.sync().then((b: Booking[]) => {
            hasPendingRequest = false;
            that.bookings = b;
            that.changeDetectionRef.detectChanges();
        });

        this.bookingervice.fetchLocal().then((b: BookingsDoc) => {
            if (!hasPendingRequest) return;
            if (!b) return;
            that.bookings = b.bookings;
            that.changeDetectionRef.detectChanges();
        });

    }

    requestUpload() {

        let nav:any = navigator;

        if ('serviceWorker' in nav && 'SyncManager' in window) {
            nav.serviceWorker
                .ready
                .then(reg => {
                    return reg.sync.register('upload');
                })
                .catch(_ => {
                    return this.bookingervice.upload();
                });
        }
        else {
            this.bookingervice.upload();
        }

    }

    setupPushNotifications() {

        let nav:any = navigator;

        if ('serviceWorker' in navigator) {
            console.log('Service Worker is supported');

            nav.serviceWorker.ready.then(function(reg) {

                reg.pushManager.subscribe({
                    userVisibleOnly: true
                }).then(function(sub) {
                    console.log('push endpoint:', sub.endpoint);
                }).catch(function(err) {
                    console.error(err);
                });
            }).catch(function(error) {
                console.log('Error:', error);
            });
        }

    }

    checkin(b: Booking) {
        b.buchungsStatus = 1;
        b.isDirty = true;
        this.bookingervice.save(this.bookings);
        this.requestUpload();
    }

    boarding(b: Booking) {
        b.buchungsStatus = 2;
        b.isDirty = true;
        this.bookingervice.save(this.bookings);
        this.requestUpload();
    }

    booked(b: Booking) {
        b.buchungsStatus = 0;
        b.isDirty = true;
        this.bookingervice.save(this.bookings);
        this.requestUpload();
    }

}
