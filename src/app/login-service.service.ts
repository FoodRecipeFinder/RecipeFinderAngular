import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { savedRecipesDTO } from './saved-recipes/savedRecipesDTO';
import { environment } from '../environments/environment.development';
import { User } from './shared/Dto';
import { ReturnStatement } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = environment.envVar.springUrl+'/RecipeFinder/';
  constructor(private http:HttpClient) { }

  signUp(user:User):Observable<boolean>{
    return this.http.post<boolean>(this.url+"signup",user);
  }
  emailExists(email:string):Observable<boolean>{
    return this.http.get<boolean>(this.url+"isEmailExists/"+email)
  }

  searchUserByEmail(email:string):Observable<User>{
    return this.http.get<User>(this.url+"searchUserByEmail/"+email)
  }

  userLoginByPassword(email:string,password:string):Observable<boolean>{
    return this.http.get<boolean>(this.url+"loginByPassword?email="+email+"&password="+password);
  }

  userLoginByOtp(email:string,otp:number):Observable<boolean>{
    return this.http.get<boolean>(this.url+"loginByOtp?email="+email+"&otp="+otp)
  }

  sendOtp(email:string):Observable<boolean>{
    return this.http.put<boolean>(this.url+"sendOtp?email="+email,Boolean)
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
