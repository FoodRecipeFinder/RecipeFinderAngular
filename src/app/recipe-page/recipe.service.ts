import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, tap, throwError } from "rxjs";
import { meals } from "./meal";
import { recipe } from "./recipe";

@Injectable({
    providedIn:'root'
})
export class RecipeService{
    private url = 'http://localhost:8080/api/mealDB';
    constructor(private http:HttpClient){}

    getRecipes(): Observable<meals>{
        return this.http.get<meals>(this.url+"/search?name=chicken").pipe(
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