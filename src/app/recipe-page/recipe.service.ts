import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, tap, throwError } from "rxjs";
import { ProgressBarService } from "../shared/progress-bar.service";
import { meals } from "./meal";
import { recipe } from "./recipe";

@Injectable({
    providedIn:'root'
})
export class RecipeService{
    private url = 'http://localhost:8080/api/mealDB';
    constructor(private http:HttpClient, private progressBarService: ProgressBarService){}

    getRecipes(): Observable<meals>{
        return this.http.get<meals>(this.url+"/random").pipe(
            tap( data => console.log('ALL',JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    //search
    getRecipesByName(name:string): Observable<meals>{
        this.progressBarService.startLoading();
        return this.http.get<meals>(this.url+"/search?name="+name).pipe(
            tap( data => {
                console.log('search for '+name,JSON.stringify(data));
                this.progressBarService.stopLoading();
                this.progressBarService.setSuccess();
            }),
            catchError(this.handleError)
            
        );
        
    }

    getRecipeById(id:number): Observable<meals>{
        return this.http.get<meals>(this.url+"/lookup?id="+id).pipe(
            tap( data => console.log('lookup for '+id,JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    private handleError( err:HttpErrorResponse ){
        this.progressBarService.stopLoading();
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