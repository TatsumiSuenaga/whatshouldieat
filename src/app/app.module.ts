import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SuggestionsComponent } from './suggestions/suggestions.component';
import { LocationComponent } from './suggestions/location/location.component';
import { CuisineComponent } from './suggestions/cuisine/cuisine.component';
import { RatingComponent } from './suggestions/rating/rating.component';
import { PriceComponent } from './suggestions/price/price.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SuggestionsComponent,
    LocationComponent,
    CuisineComponent,
    RatingComponent,
    PriceComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
