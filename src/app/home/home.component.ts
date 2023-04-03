import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { recipe } from '../recipe-page/recipe';
import { RecipeService } from '../recipe-page/recipe.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit , OnDestroy{
  imageWidth: number = 100;
  imageMargin: number = 2;
  filteredRecipes: recipe[]=[];
  errorMessage: string = '';
  sub!: Subscription;

  search:string='';

  private _listFilter:string = '';
  get listFilter(): string{
    return this._listFilter;
  }
  set listFilter(value: string){
    this._listFilter = value;
    this.filteredRecipes = this.performFilter(value);
  }
  recipes:recipe[] = []
  searchRecipes:recipe[] = [];

  ngOnInit(): void {
    this.sub = this.recipeService.getRecipes().subscribe({
      next : recipes => {
        this.recipes = recipes.meals;
        this.filteredRecipes = this.recipes;
      },
      error: err => this.errorMessage = err
    });
      // this.recipes = this.recipeService.getRecipes();
      // this.filteredRecipes = this.recipes;
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }

  constructor(private recipeService: RecipeService){}

  performFilter(filterBy: string) :recipe[]{
    filterBy = filterBy.toLowerCase();
    return this.recipes.filter((recipe : recipe )=>recipe.strMeal.toLowerCase().includes(filterBy));
  }

  searchRecipe(): void{
    this.sub = this.recipeService.getRecipesByName(this.search).subscribe({
      next : recipes => {
        this.searchRecipes = recipes.meals;
        // this.filteredRecipes = this.recipes;
      },
      error: err => this.errorMessage = err
    });
  }
}
