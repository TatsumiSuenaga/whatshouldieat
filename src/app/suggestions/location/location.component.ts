import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  criteriaTitle = 'Location';
  longitude;
  latitude;

  constructor() { }

  getLocation(): void {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.longitude = position.coords.longitude;
          this.latitude = position.coords.latitude;
        });
    } else {
       console.log('No support for geolocation');
    }
  }

  ngOnInit() {
    this.getLocation();
  }

}
