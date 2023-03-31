import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  imageWidth:number = 100;
  imageMargin:number = 2;
  listFilter:string = 'cart';
  recipes:any[] = [
    {
      "idMeal": "52879",
      "strMeal": "Chicken Parmentier",
      "strCategory": "Chicken",
      "strArea": "French",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/uwvxpv1511557015.jpg",
    },
    {
      "idMeal": "52835",
      "strMeal": "Fettucine alfredo",
      "strDrinkAlternate": null,
      "strCategory": "Pasta",
      "strArea": "Italian",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/uquqtu1511178042.jpg",
    }
  ]
}
