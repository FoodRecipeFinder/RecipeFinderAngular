import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { Area, Category, Ingredient, SpoonText } from './Dto';
import { ProgressBarService } from './progress-bar.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private url = 'http://localhost:8080/api/mealDB';
  constructor(private http:HttpClient, private progressBarService: ProgressBarService) { }

  getArea(): Observable<Area[]>{
    this.progressBarService.startLoading();
    return this.http.get<Area[]>(this.url+"/list/a").pipe(
        tap( data => console.log('Area',JSON.stringify(data))),
        // catchError(this.handleError)
    );
  }

  getCategory(): Observable<Category[]>{
    return this.http.get<Category[]>(this.url+"/list/c").pipe(
        tap( data => console.log('Area',JSON.stringify(data))),
        // catchError(this.handleError)
    );
  }

  getIngredients(): Observable<Ingredient[]>{
    return this.http.get<Ingredient[]>(this.url+"/list/i").pipe(
        tap( data => {
          console.log('Area',JSON.stringify(data));
          this.progressBarService.stopLoading();
        }),
        // catchError(this.handleError)
    );  
  }

  getTrivia(): Observable<SpoonText>{
    return this.http.get<SpoonText>("http://localhost:8080/api/spoonacular/trivia").pipe(
        tap( data => {
          console.log('Area',JSON.stringify(data));
          this.progressBarService.stopLoading();
          this.progressBarService.setSuccess();
        }),
        // catchError(this.handleError)
    );  
  }

}
