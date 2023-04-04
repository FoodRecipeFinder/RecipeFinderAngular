import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { savedRecipesDTO } from './saved-recipes/savedRecipesDTO';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = "http://localhost:9090/RecipeFinder/";
  constructor(private http:HttpClient) { }

  userLogin(email:string,password:string):Observable<boolean>{
    return this.http.get<boolean>(this.url+"login?email="+email+"&password="+password);
  }

  savedRecipes(userId : number):Observable<savedRecipesDTO[]>{
    return this.http.get<savedRecipesDTO[]>(this.url+"getSavedRecipes/"+userId);
  }


  saveRecipe(userId:number,mealID:number):Observable<boolean>{
     return this.http.post<boolean>(this.url + "saveRecipe?userId=" + userId + "&mealId=" + mealID,Boolean);
  }

  checkIfSaved(userId:number,mealID:number):Observable<boolean>{
    return this.http.get<boolean>(this.url + "checkIfSaved?userId="+userId+"&mealId="+mealID);
  }

  getSavedRecipeId(userId:number,mealID:number):Observable<number>{
    return this.http.get<number>(this.url+"getSavedRecipeId?userId="+userId + "&mealId=" + mealID);
  }

  removeRecipe(recipeId:number):Observable<boolean>{
    return this.http.delete<boolean>(this.url+"removeRecipe/"+recipeId);
  }
  
}
