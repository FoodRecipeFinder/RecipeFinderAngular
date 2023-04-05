import { Component, InjectFlags, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { recipe } from './recipe';
import { RecipeService } from './recipe.service';
import { LoginService } from '../login-service.service';

@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.css']
})
export class RecipePageComponent implements OnInit {
  recipe: recipe | undefined;
  sub!: Subscription;
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
        this.checkIfSaved();
      },
      error: err => this.errorMessage = err

    });

   
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
