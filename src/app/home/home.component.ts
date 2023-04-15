import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { recipe } from '../recipe-page/recipe';
import { RecipeService } from '../recipe-page/recipe.service';
import { DataService } from '../shared/data.service';
import { Area, Category, Ingredient, User } from '../shared/Dto';
import { LoginService } from '../login-service.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  searchRecipes!:recipe[];

  areas:Area[]=[];
  categories:Category[]=[];
  ingredients:Ingredient[]=[];
  trivia='';
  joke='';
  showSpinner = true;
  showSearchSpinner = true;
  showStartPage = true;
  selectedData:{[index: string]:string}={
    'a':'',
    'c':'',
    'i':''
  }

  emailId : string='';
  password: string ='';
  otp:number|undefined;

  isValid: boolean | undefined;
  userId:string='';
  displayForm:string = 'loginwithpassword';
  loginStatus:boolean=false;
  

  ngOnInit(): void {
    this.userId= JSON.parse(localStorage.getItem("userId")!);
    console.log('userId : '+this.userId);
    localStorage.setItem("userId",this.userId);
    if(this.userId!=null){
      this.loginStatus=true;
    }

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
      },
      error: err => this.errorMessage = err
    });
    this.sub = this.dataService.getJoke().subscribe({
      next: spoon =>{
        this.joke = spoon.text;
      },
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }

  constructor(private recipeService: RecipeService, private dataService:DataService , private service:LoginService,private route:Router){}

  performFilter(filterBy: string) :recipe[]{
    filterBy = filterBy.toLowerCase();
    return this.recipes.filter((recipe : recipe )=>recipe.strMeal.toLowerCase().includes(filterBy));
  }

  searchRecipe(): void{
    this.showStartPage = false;
    this.showSearchSpinner = true;
    this.sub = this.recipeService.getRecipesByName(this.search).subscribe({
      next : recipes => {
        if(recipes.meals){
          this.searchRecipes = recipes.meals;
        // this.filteredRecipes = this.recipes;
          this.showSearchSpinner = false;
        }
        else{
          console.log("elo")
          this.showSearchSpinner = false;
          this.searchRecipes = [];
        }
      },
      error: err => this.errorMessage = err
    });
    if(!this.searchRecipes.length) console.log("empltafdsdf")
    
  }

  getRecipeByData(type:string){
    this.showStartPage = false;
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
  signupForm(){
    this.displayForm = "signupForm";
  }

  loginwithotpForm(){
    this.displayForm ="loginwithotp";
  }

  loginwithpasswordForm(){
    this.displayForm = 'loginwithpassword';
  }

  userLoginByPassword(){
    let result = this.service.userLoginByPassword(this.emailId,this.password);

    this.service.emailExists(this.emailId).subscribe(
      res=>{
        if(res){
          result.subscribe( msg=>{
            this.isValid = msg;
            if(this.isValid){
              this.service.searchUserByEmail(this.emailId).subscribe(
                data=>{
                  this.userId=JSON.stringify(data.userId);
                  localStorage.setItem("userId",JSON.stringify(data.userId));
                  // sessionStorage.setItem("user",JSON.stringify(data));
                  // console.log("User : ",sessionStorage.getItem("userId"));
                }
              )
              alert('Login Successful');
              window.location.reload();
            }
            else{
              console.log("failed  "+this.isValid);
              alert('Invalid Credentials')
            }
      
          });
        }
        else{
          alert('User Does Not Exists...')
        }
      }
    )
    
   
  }

  
  sendOtpButtonVar :string='Send OTP';
  sendOtpFunction(){
    this.service.emailExists(this.emailId).subscribe(
      result=>{
        if(result){
          this.service.sendOtp(this.emailId).subscribe(
            status=>{
              if(status){
                this.sendOtpButtonVar = "Resend OTP";
                alert('Otp send to '+this.emailId);
              }
              else{
                alert("Something went wrong");
              }
            }
          )
        }
        else{
          console.log("otp not sent");
          alert('User Does Not Exists...\nPlease enter registered emailId')
        }
      }

    );
    
  }

  checkOtpLogin(){
      this.service.userLoginByOtp(this.emailId,this.otp!).subscribe(
        res=>{
          if(res){
            this.service.searchUserByEmail(this.emailId).subscribe(
              data=>{
                this.userId=JSON.stringify(data.userId);
                localStorage.setItem("userId",JSON.stringify(data.userId));
                // sessionStorage.setItem("user",JSON.stringify(data));
                // console.log("User : ",sessionStorage.getItem("userId"));
              }
            )
            alert('Login Successful');
            window.location.reload();
          }
          else{
            alert('Invalid Otp');
          }
        }
      )
  }

  userData :User= new User();
  confirmPassword:string='';
  
  userSignUp(){
    this.service.emailExists(this.userData.email).subscribe(
      res=>{
        if(res){
          alert('EmailId already registered\nPlease use another emailId or login');
        }
        else{
            console.log("user : "+JSON.stringify(this.userData));
            // alert(JSON.stringify(this.userData));
            this.service.signUp(this.userData).subscribe(
              data=>{
                if(data){
                  alert('Signup successful');
                  window.location.reload()
                }
                else{
                  alert('Something went wrong!!! Please try again')
                }
              }
            )
        }
      }
    )
  }



}
