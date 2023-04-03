import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { recipe } from './recipe';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.css']
})
export class RecipePageComponent implements OnInit {
  recipe: recipe | undefined;
  sub!: Subscription;
  errorMessage = '';
  constructor(private route: ActivatedRoute, private router: Router, private recipeService: RecipeService){}
  
  ngOnInit(): void{
    const id = Number(this.route.snapshot.paramMap.get('id'));  
    // this.recipe = history.state;
    this.sub = this.recipeService.getRecipeById(id).subscribe({
      next : recipes => {
        this.recipe = recipes.meals[0];
      },
      error: err => this.errorMessage = err
    });
  }

  onBack(): void{
    this.router.navigate(['/home']);
  }
}
