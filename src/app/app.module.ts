import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RecipePageComponent } from './recipe-page/recipe-page.component';
import { RouterModule } from '@angular/router';
import { RecipePageGuard } from './recipe-page/recipe-page.guard';
import { NgProgressModule } from 'ngx-progressbar';
import { HeaderComponent } from './header/header.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { SavedRecipesComponent } from './saved-recipes/saved-recipes.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RecipePageComponent,
    HeaderComponent,
    UserLoginComponent,
    SavedRecipesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgProgressModule,
    RouterModule.forRoot([
      {path: 'home',component: HomeComponent},
      {path: 'recipe/:id',canActivate: [RecipePageGuard],component: RecipePageComponent},
      {path: 'login',component:UserLoginComponent},
      {path: 'savedRecipes',component:SavedRecipesComponent},
      {path: '**', redirectTo:'/home',pathMatch:'full'}
    ])

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
