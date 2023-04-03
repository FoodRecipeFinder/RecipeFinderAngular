import { Injectable } from '@angular/core';
import { NgProgressRef} from 'ngx-progressbar';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {

  progressRef!: NgProgressRef;
  color: string = '#1B95E0';
  defaultColor = '#1B95E0';
  successColor: string = '#42A948';
  errorColor: string = '#A94442';


  constructor(){}
  

  startLoading(){
    this.color = this.defaultColor;
    this.progressRef.start();
  }

  stopLoading(){
    this.progressRef.complete();
  }

  setSuccess(){
    this.color = this.successColor;
  }
  
  setError(){
    this.color = this.errorColor;
  }

}
