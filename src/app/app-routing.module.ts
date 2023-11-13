import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RecipePageGuard } from './recipe-page/recipe-page.guard';
import { RecipePageComponent } from './recipe-page/recipe-page.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { SavedRecipesComponent } from './saved-recipes/saved-recipes.component';

const routes: Routes = [
  {path: 'home',component: HomeComponent},
  {path: 'recipe/:id',canActivate: [RecipePageGuard],component: RecipePageComponent},
  {path: 'login',component:UserLoginComponent},
  {path: 'savedRecipes',component:SavedRecipesComponent},
  {path: '**', redirectTo:'/home',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
