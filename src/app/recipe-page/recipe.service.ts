import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, tap, throwError } from "rxjs";
import { meals } from "./meal";
import { recipe } from "./recipe";

@Injectable({
    providedIn:'root'
})
export class RecipeService{
    private url = 'http://localhost:8080/api/mealDB/random';
    constructor(private http:HttpClient){}

    getRecipes(): Observable<meals>{
    //     return [
    //         {
    //             "idMeal": 52879,
    //             "strMeal": "Chicken Parmentier",
    //             "strCategory": "Chicken",
    //             "strArea": "French",
    //             "strMealThumb": "https://www.themealdb.com/images/media/meals/uwvxpv1511557015.jpg",
    //           },
    //           {
    //             "idMeal": 52835,
    //             "strMeal": "Fettucine alfredo",
    //             "strCategory": "Pasta",
    //             "strArea": "Italian",
    //             "strMealThumb": "https://www.themealdb.com/images/media/meals/uquqtu1511178042.jpg",
    //           }
    //     ]
    // }
        return this.http.get<meals>(this.url).pipe(
            tap( data => console.log('ALL',JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    private handleError( err:HttpErrorResponse ){
        let errorMessage = '';
        if(err.error instanceof ErrorEvent){
            //client side error
            errorMessage = `An error occured: ${err.message}`;
        }
        else{
            //server side error
            errorMessage = `Server return code: ${err.status}, error message is ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(()=>errorMessage);
    }
}