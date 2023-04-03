import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { LoginService } from '../login-service.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit{
  email : string='';
  password: string ='';
  isValid: boolean | undefined;

  constructor(private service : LoginService,private route:Router){}
  ngOnInit():void{}


  userLogin(){
    let res = this.service.userLogin(this.email,this.password);
    
    res.subscribe( msg=>{
      this.isValid = msg;
      if(this.isValid){
        console.log("email : "+this.email+" "+this.password);
        alert('Login Successful');
      }
      else{
        console.log("failed  "+this.isValid);
        alert('Invalid Credentials')
      }

    });
  }


}
