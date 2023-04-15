import { Component, InjectFlags, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { nutrition, recipe } from './recipe';
import { RecipeService } from './recipe.service';
import { LoginService } from '../login-service.service';
import { state } from '@angular/animations';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { ModelPopupComponent } from '../model-popup/model-popup.component';

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
  userId : number | undefined;
  value : boolean | undefined;
  // btnText : String='';
  saveButton:boolean | undefined;
  showSpinner = true;
  constructor(private route: ActivatedRoute, private router: Router, private recipeService: RecipeService,private service : LoginService,
    private titleService: Title,private dialogRef:MatDialog){}
  
  ngOnInit(): void{
    this.userId=JSON.parse(localStorage.getItem("userId")!);
    if(this.userId==null){
      document.getElementById("saveButton")?.setAttribute('hidden','');
    }

    const id = Number(this.route.snapshot.paramMap.get('id'));  
    // this.recipe = history.state;
    this.sub = this.recipeService.getRecipeById(id).subscribe({
      next : recipes => {
        this.recipe = recipes.meals[0];
        this.titleService.setTitle(this.recipe.strMeal)
        this.showSpinner=false;
        this.checkIfSaved();
        let search: string;
        if(this.recipe.strTags === null || !this.recipe.strTags.split(',')[0]){
          console.log("catyegory recommend");
          search = this.recipe.strCategory;
          this.nestedSub = this.recipeService.getRecipesByData('c',search).subscribe({
            next : meal => {
              this.recommendRecipes = meal.meals.slice(0,5);
            },
            error: err => this.errorMessage = err
          });
        }
        else{
          console.log("tag recommend");
          search = this.recipe.strTags.split(',')[0];
          this.nestedSub = this.recipeService.getRecipesByName(search).subscribe({
            next : meal => {
              this.recommendRecipes = meal.meals.slice(0,5);
            },
            error: err => this.errorMessage = err
          });
        }
        
        this.nestedSub = this.recipeService.getNutritionByName(this.recipe.strMeal).subscribe({
          next : nut => {
            
            this.nutritionRecipe = nut;
            console.log("nutr",nut)
          },
          error: err => this.errorMessage = err
        });
        
      },
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.nestedSub.unsubscribe();
  }
  
  checkIfSaved(){
    // console.log('checkIfSaved : ',this.userId," ",this.recipe?.idMeal);
     this.service.checkIfSaved(this.userId!,this.recipe?.idMeal).subscribe(
      res => {
        this.saveButton=res;
        if (this.saveButton) {
          document.getElementById("saveButton")?.setAttribute('disabled','');
        } 
        // else {
        //   this.btnText="Save for later"
        // }
      }
    )
  }
  
  saveRecipe():void{
    
    console.log("uid :",this.userId,"mid : ",this.recipe.idMeal)

    this.service.saveRecipe(this.userId!,this.recipe.idMeal).subscribe(
      state=>{
        // this.value=state;
        console.log(this.userId," ",state," ",this.recipe.idMeal);
        if(state){
          
      console.log("uid :",this.userId,"mid : ",this.recipe.idMeal)

      this.dialogRef.open(ModelPopupComponent,{
        data : {
          text:'Recipe Saved Successfully'
        }
      },
      );
          // alert("Recipe saved");

          // window.location.reload();
          this.ngOnInit();
        }
        else{
          this.dialogRef.open(ModelPopupComponent,{
            data : {
              text:'Something went wrong!!! Try again'
            }
          },
          );
          // alert('Something went wrong!!! Try again');
        }
      }
    )
  }

  // onBack(): void{
  //   this.router.navigate(['/home']);
  // }
}
