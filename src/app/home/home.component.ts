import { Component, OnInit } from '@angular/core';
import { recipe } from '../recipe-page/recipe';
import { RecipeService } from '../recipe-page/recipe.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  imageWidth:number = 100;
  imageMargin:number = 2;
  filteredRecipes:recipe[]=[];
  private _listFilter:string = '';
  get listFilter(): string{
    return this._listFilter;
  }
  set listFilter(value: string){
    this._listFilter = value;
    this.filteredRecipes = this.performFilter(value);
  }
  recipes:recipe[] = []

  ngOnInit(): void {
      console.log("ngOnInit");
      this.recipes = this.recipeService.getRecipes();
      this.filteredRecipes = this.recipes;
  }

  constructor(private recipeService: RecipeService){}

  performFilter(filterBy: string) :recipe[]{
    filterBy = filterBy.toLowerCase();
    return this.recipes.filter((recipe : recipe )=>recipe.strMeal.toLowerCase().includes(filterBy));
  }
}
