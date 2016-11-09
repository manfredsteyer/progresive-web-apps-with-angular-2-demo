import {Booking} from './booking';
import {BookingsDoc} from './bookings-doc';
import {Injectable } from '@angular/core';


var PouchDB = require("pouchdb");


const PASSAGIER_ID = "3";
const URL = "http://www.angular.at/api/buchung";

const db = new PouchDB("bookingsDb");


@Injectable()
export class BookingService {


    public sync(): Promise<Booking[]> {
        var that = this;
        return this.upload().then(() => {
            return that.download();
        });
    }

    public download(): Promise<Booking[]> {

        return this.fetchOnline()
                    .then(bookings => {
                        return this.save(bookings).then(() => bookings);
                    });
    }

    public upload(): Promise<any> {

        let promises = [];

        return this.fetchLocal().then( (bookings) => {

            if (!bookings) return Promise.resolve(null);

            let method = "PUT";
            let mode = "CORS";
            let headers = new Headers();
            headers.set('Content-Type', 'text/json');
           console.debug('bookings', bookings);
           var promises = bookings.bookings.filter(b => b.isDirty)
                                   .map(b => fetch(URL, {method, headers, /*mode,*/ body: JSON.stringify(b)}));

           if (!promises) return Promise.resolve(null);

           return Promise.all(promises);

        });

    }

    public fetchOnline(): Promise<Booking[]> {

        // let search = new URLSearchParams();
        // search.set('passagierId', PASSAGIER_ID);

        // let headers = new Headers();
        // headers.set('Accept', 'text/json');

        let url = URL + "?passagierId=" + encodeURIComponent(PASSAGIER_ID);

        let headers = new Headers();
        headers.set('Accept', 'text/json');

        let method = "GET";
        let mode = "CORS";

        return fetch(url, {method, headers/*, mode*/ })
                .then(r => r.json());

    }

    public fetchLocal(): Promise<BookingsDoc> {

        return db.get('bookings').catch(err => {
            if (err.status == 404) return null;
            return Promise.reject(err);
        });
    }

    public save(bookings: Array<Booking>): Promise<any> {


        return this.fetchLocal().then( (entity: BookingsDoc) => {

            if (entity) {
                entity.bookings = bookings;
            }
            else {
                entity = {
                    _id: "bookings",
                    _rev: null,
                    bookings: bookings
                }
            }
            return db.put(entity);
        });

    }

}
