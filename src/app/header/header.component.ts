import { Component, OnInit, TestabilityRegistry } from '@angular/core';
import { Route, Router } from '@angular/router';
import { NgProgress } from 'ngx-progressbar';
import { ProgressBarService } from '../shared/progress-bar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  userId:string='';
  status:boolean=false;

  constructor(private progress: NgProgress, public progressBarService: ProgressBarService, private route:Router){}

  ngOnInit(): void {
      this.progressBarService.progressRef = this.progress.ref("progressBar");
      this.userId=JSON.parse(localStorage.getItem("userId")!);
      console.log("userid : "+this.userId);
      if(this.userId!=null){
        this.status=true;
      }
  }

  logout(){
    localStorage.clear();
    alert('Logged out successfully')
    window.location.assign('/home');
  }

}
