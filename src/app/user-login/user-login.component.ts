import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { LoginService } from '../login-service.service';
import { User } from '../shared/Dto';
import { JsonPipe } from '@angular/common';
import { savedRecipesDTO } from '../saved-recipes/savedRecipesDTO';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit{
  emailId : string='';
  password: string ='';

  isValid: boolean | undefined;
  userId:string='';
  user:User | undefined;  

  
  constructor(private service : LoginService,private route:Router){}
  ngOnInit():void{
    this.userId=JSON.stringify(sessionStorage.getItem("userId"));
    console.log("userId : "+this.userId);
  }

  displayForm:string = 'loginwithpassword';

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
                  sessionStorage.setItem("userId",JSON.stringify(data.userId));
                  sessionStorage.setItem("user",JSON.stringify(data));
                  console.log("User : ",sessionStorage.getItem("userId"));
                }
              )

              window.location.reload();
              alert('Login Successful');
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

  signupForm(){
    this.displayForm = "signup";
  }

  loginwithotpForm(){
    this.displayForm ="loginwithotp";
  }

  loginwithpasswordForm(){
    this.displayForm = 'loginwithpassword';
  }

  

}
