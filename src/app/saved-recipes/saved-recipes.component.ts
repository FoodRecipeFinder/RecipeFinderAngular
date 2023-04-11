import { Component } from '@angular/core';
import { LoginService } from '../login-service.service';
import { savedRecipesDTO } from './savedRecipesDTO';
import { RecipeService } from '../recipe-page/recipe.service';
import { recipe } from '../recipe-page/recipe';
import { Observable } from 'rxjs';
import { meals } from '../recipe-page/meal';

@Component({
  selector: 'app-saved-recipes',
  templateUrl: './saved-recipes.component.html',
  styleUrls: ['./saved-recipes.component.css']
})
export class SavedRecipesComponent {
  getMealId : savedRecipesDTO[] = [];
  userId : number |undefined;
  mealId : number |undefined;
  recipeDetails: recipe[] = [];
  savedRecipeId : number | undefined;
  loginStatus:boolean=false;

  filteredRecipes: recipe[]=[];
  private _listFilter:string = '';
  get listFilter(): string{
    return this._listFilter;
  }
  set listFilter(value: string){
    this._listFilter = value;
    this.filteredRecipes = this.performFilter(value);
  }

  performFilter(filterBy: string) :recipe[]{
    filterBy = filterBy.toLowerCase();
    return this.recipeDetails.filter((recipe : recipe )=>recipe.strMeal.toLowerCase().includes(filterBy));
  }

  constructor(private recipeService: RecipeService,private service : LoginService){}

  ngOnInit():void{
    this.userId=JSON.parse(localStorage.getItem("userId")!);
    if(this.userId!=null) {this.loginStatus=true;}   
    else{
      alert('Session timeout. Please login again!!!');
    }  
    this.getAllRecipes();
  }
  
  getAllRecipes(){
    this.service.savedRecipes(this.userId!).subscribe(
      recipe  =>{
        this.getMealId = recipe;
        recipe.forEach( (element) => {
          // this.savedRecipeId = element.id;
          this.mealId=element.mealId;
          // console.log( this.mealId , " ",this.savedRecipeId," ",this.userId);
          this.getRecipeDetails(this.mealId);
      });
      // console.log(JSON.stringify(this.getMealId));
      } 
    )
  }

  getRecipeDetails(mealID:number){
    this.recipeService.getRecipeById(mealID).subscribe({
      next : data =>{
        this.recipeDetails.push(data.meals[0]);
        this.filteredRecipes = this.recipeDetails;
      }
    });
  }
  
  removeRecipe(mealID:number){
    this.service.getSavedRecipeId(this.userId!,mealID).subscribe(
      id=>{
        this.savedRecipeId=id;
        console.log(this.savedRecipeId," kjke ",mealID);
        this.service.removeRecipe(this.savedRecipeId).subscribe(
          res=>{
            if(res){
              alert('Recipe removed');
              window.location.reload();
            }
            else{
              alert('Something went wrong!!! Try again')
            }
          }
        );
        
      }
    )
  }

}
