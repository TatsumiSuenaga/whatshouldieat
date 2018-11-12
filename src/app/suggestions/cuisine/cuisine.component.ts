import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cuisine',
  templateUrl: './cuisine.component.html',
  styleUrls: ['./cuisine.component.css']
})
export class CuisineComponent implements OnInit {
  cuisineList = ['Japanese', 'Korean', 'Vietnamese', 'Chinese',
   'Thai', 'Filipino', 'Mexican', 'Puerto Rican', 'Cuban', 'Greek',
   'African', 'Italian', 'American'];
  criteriaTitle = 'Cuisine';

  constructor() { }

  ngOnInit() {
  }

}
