import {Booking} from './booking';

export class BookingsDoc {
    _id: string;
    _rev: string;

    bookings: Array<Booking>;    
}

