import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SuggestionsComponent } from './suggestions/suggestions.component';
import { LocationComponent } from './suggestions/location/location.component';
import { CuisineComponent } from './suggestions/cuisine/cuisine.component';
import { RatingComponent } from './suggestions/rating/rating.component';
import { PriceComponent } from './suggestions/price/price.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: '', component: AppComponent},
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SuggestionsComponent,
    LocationComponent,
    CuisineComponent,
    RatingComponent,
    PriceComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
