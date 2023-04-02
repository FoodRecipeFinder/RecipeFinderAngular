import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { recipe } from './recipe';

@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.css']
})
export class RecipePageComponent implements OnInit {
  recipe: recipe | undefined;
  constructor(private route: ActivatedRoute, private router: Router){}
  
  ngOnInit(): void{
    const id = Number(this.route.snapshot.paramMap.get('id'));  
    this.recipe = history.state;
  }

  onBack(): void{
    this.router.navigate(['/home']);
  }
}
