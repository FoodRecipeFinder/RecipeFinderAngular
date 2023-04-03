import { Component } from '@angular/core';
import { LoginService } from '../login-service.service';
import { savedRecipesDTO } from './savedRecipesDTO';

@Component({
  selector: 'app-saved-recipes',
  templateUrl: './saved-recipes.component.html',
  styleUrls: ['./saved-recipes.component.css']
})
export class SavedRecipesComponent {
  savedRecipes : savedRecipesDTO[] = [];
  userId : number = 1008;

  mealId : Array<Object> = [];

  constructor(private service : LoginService){}

  ngOnInit():void{
    this.getAllRecipes();
  }
  
  getAllRecipes(){
    this.service.savedRecipes(this.userId).subscribe(
      recipe  =>{
        this.savedRecipes = recipe;

        recipe.forEach( (element) => {
          console.log( element.mealId);
      });
      
      console.log(JSON.stringify(this.savedRecipes));
      }
      
    )
      

  }


  
 
  

}
