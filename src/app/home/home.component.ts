import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { recipe } from '../recipe-page/recipe';
import { RecipeService } from '../recipe-page/recipe.service';
import { DataService } from '../shared/data.service';
import { Area, Category, Ingredient } from '../shared/Dto';

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
  recipes:recipe[] = [];
  searchRecipes:recipe[] = [];

  areas:Area[]=[];
  categories:Category[]=[];
  ingredients:Ingredient[]=[];

  selectedData='';

  ngOnInit(): void {
    this.sub = this.recipeService.getRecipes().subscribe({
      next : recipes => {
        this.recipes = recipes.meals;
        this.filteredRecipes = this.recipes;
      },
      error: err => this.errorMessage = err
    });

    this.sub = this.dataService.getCategory().subscribe({
      next: category =>{
        this.categories = category;
      },
      error: err => this.errorMessage = err
    });

    this.sub = this.dataService.getIngredients().subscribe({
      next: ingredient =>{
        this.ingredients = ingredient;
      },
      error: err => this.errorMessage = err
    });

    this.sub = this.dataService.getArea().subscribe({
      next: area =>{
        this.areas = area;
      },
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }

  constructor(private recipeService: RecipeService, private dataService:DataService){}

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

  field(type:string){
    this.sub = this.recipeService.getRecipesByData(type,this.selectedData).subscribe({
      next : recipes => {
        this.searchRecipes = recipes.meals;
        // this.filteredRecipes = this.recipes;
      },
      error: err => this.errorMessage = err
    });
  }
}
