import { Injectable } from "@angular/core";
import { recipe } from "./recipe";

@Injectable({
    providedIn:'root'
})
export class RecipeService{
    getRecipes(): recipe[]{
        return [
            {
                "idMeal": 52879,
                "strMeal": "Chicken Parmentier",
                "strCategory": "Chicken",
                "strArea": "French",
                "strMealThumb": "https://www.themealdb.com/images/media/meals/uwvxpv1511557015.jpg",
              },
              {
                "idMeal": 52835,
                "strMeal": "Fettucine alfredo",
                "strCategory": "Pasta",
                "strArea": "Italian",
                "strMealThumb": "https://www.themealdb.com/images/media/meals/uquqtu1511178042.jpg",
              }
        ]
    }
}