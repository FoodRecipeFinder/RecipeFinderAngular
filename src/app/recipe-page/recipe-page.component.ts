import { Component, InjectFlags, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { nutrition, recipe } from './recipe';
import { RecipeService } from './recipe.service';
import { LoginService } from '../login-service.service';

@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.css']
})
export class RecipePageComponent implements OnInit , OnDestroy{
  recipe!: recipe;
  recommendRecipes: recipe[] =[];
  nutritionRecipe: nutrition | undefined;
  sub!: Subscription;
  nestedSub!: Subscription;
  errorMessage = '';
  mealId : number | undefined;
  userId : number = 1008;
  value : boolean | undefined;
  btnText : String='';
  saveButton:boolean | undefined;
  
  constructor(private route: ActivatedRoute, private router: Router, private recipeService: RecipeService,private service : LoginService){}
  
  ngOnInit(): void{
    const id = Number(this.route.snapshot.paramMap.get('id'));  
    // this.recipe = history.state;
    this.sub = this.recipeService.getRecipeById(id).subscribe({
      next : recipes => {
        this.recipe = recipes.meals[0];
        let search = this.recipe.strTags.split(',')[0]
        if(!search){
          search = this.recipe.strCategory;
        }
        this.nestedSub = this.recipeService.getRecipesByName(search).subscribe({
          next : meal => {
            this.recommendRecipes = meal.meals.slice(0,5);
          },
          error: err => this.errorMessage = err
        });
        this.nestedSub = this.recipeService.getNutritionByName(this.recipe.strMeal).subscribe({
          next : nut => {
            
            this.nutritionRecipe = nut;
            console.log("nutr",nut)
          },
          error: err => this.errorMessage = err
        });
        this.checkIfSaved();
      },
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.nestedSub.unsubscribe();
  }
  
  checkIfSaved(){
     this.service.checkIfSaved(this.userId,this.recipe?.idMeal!).subscribe(
      res => {
        console.log(this.mealId," ",res," ",this.recipe?.idMeal);
        this.saveButton=res;
        if (this.saveButton) {
          document.getElementById("saveButton")?.setAttribute('disabled','');
          this.btnText="Already Saved"
        } else {
          this.btnText="Save for later"
        }
      }
    )
  }

  saveRecipe():void{
    
    this.service.saveRecipe(this.userId,this.recipe?.idMeal!).subscribe(
      res=>{
        this.value=res;
        console.log(this.mealId," ",res," ",this.recipe?.idMeal);
        if(this.value){
          alert("Recipe saved");
          window.location.reload();
        }
        else{
          alert('Something went wrong!!! Try again');
        }
      }
    )
  }

  // onBack(): void{
  //   this.router.navigate(['/home']);
  // }
}
