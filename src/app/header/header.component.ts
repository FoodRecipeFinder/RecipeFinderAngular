import { Component, OnInit, TestabilityRegistry } from '@angular/core';
import { Route, Router } from '@angular/router';
import { NgProgress } from 'ngx-progressbar';
import { ProgressBarService } from '../shared/progress-bar.service';
import { MatDialog } from '@angular/material/dialog';
import { ModelPopupComponent } from '../model-popup/model-popup.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  userId:string='';
  status:boolean=false;

  constructor(private progress: NgProgress, public progressBarService: ProgressBarService, private route:Router,private dialogRef:MatDialog){}

  ngOnInit(): void {
      this.progressBarService.progressRef = this.progress.ref("progressBar");
      this.userId=JSON.parse(localStorage.getItem("userId")!);
      console.log("userid : "+this.userId);
      if(this.userId!=null){
        this.status=true;
      }
      setInterval(() => this.ngOnInit(), 10000);
  }
  
  logout(){
    localStorage.clear();
    this.dialogRef.open(ModelPopupComponent,{data : {text : 'Logged out successfully'}})
    // alert('Logged out successfully')
    // this.route.navigate(['/home']);
    window.location.assign('/home');
  }

}
