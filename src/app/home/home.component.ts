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
  imageMargin: number = 0;
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
  randomRecipe!:recipe;
  recipes:recipe[] = [];
  searchRecipes:recipe[] = [];

  areas:Area[]=[];
  categories:Category[]=[];
  ingredients:Ingredient[]=[];
  trivia='';
  showSpinner = true;
  showSearchSpinner = true;

  selectedData:{[index: string]:string}={
    'a':'',
    'c':'',
    'i':''
  }

  ngOnInit(): void {
    //for saved
    this.sub = this.recipeService.getRecipes().subscribe({
      next : recipes => {
        this.recipes = recipes.meals;
        this.filteredRecipes = this.recipes;
      },
      error: err => this.errorMessage = err
    });

    //for title card
    this.sub = this.recipeService.getRecipes().subscribe({
      next : recipes => {
        this.randomRecipe = recipes.meals[0];
        this.showSpinner = false;
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

    this.sub = this.dataService.getTrivia().subscribe({
      next: spoon =>{
        this.trivia = spoon.text;
        console.log("hello");
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
        this.showSearchSpinner = false;
      },
      error: err => this.errorMessage = err
    });
  }

  getRecipeByData(type:string){
    this.showSearchSpinner = true;
    this.sub = this.recipeService.getRecipesByData(type,this.selectedData[type]).subscribe({
      next : recipes => {
        this.setOtherDataEmpty(type);
        this.searchRecipes = recipes.meals;
        // this.filteredRecipes = this.recipes;
        this.showSearchSpinner = false;
      },
      error: err => this.errorMessage = err
    });
  }

  setOtherDataEmpty(key:string){
    for(let k in this.selectedData){
      if(k!=key){
        this.selectedData[k]='';
      }
    }
  }

  imgLoad: boolean = false;

  loadImage() {
    this.imgLoad = true;
  }
}
