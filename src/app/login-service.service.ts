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
}
