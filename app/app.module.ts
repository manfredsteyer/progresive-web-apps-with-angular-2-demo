import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {BookingStatusPipe} from "./booking-status.pipe";
import {FlightSearchComponent} from "./flightsearch.component";
import {MdCardModule} from "@angular2-material/card";
import {MdButtonModule} from "@angular2-material/button";
import {MdIconModule} from "@angular2-material/icon";
import {MdToolbarModule} from "@angular2-material/toolbar";
import {MdSidenavModule} from "@angular2-material/sidenav";
import {MdListModule} from "@angular2-material/list";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        MdButtonModule.forRoot(),
        MdCardModule.forRoot(),
        MdIconModule.forRoot(),
        MdListModule.forRoot(),
        MdSidenavModule.forRoot(),
        MdToolbarModule.forRoot()
    ],
    declarations: [
        BookingStatusPipe, FlightSearchComponent
    ],
    providers: [
    ],
    bootstrap: [
      FlightSearchComponent
    ]
})
export class AppModule {
}

