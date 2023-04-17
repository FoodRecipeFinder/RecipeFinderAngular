   import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, OnInit ,Inject} from '@angular/core';
import {MatDialogRef,  MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-model-popup',
  templateUrl: './model-popup.component.html',
  styleUrls: ['./model-popup.component.css']
})
export class ModelPopupComponent implements OnInit{

  text;path;reload=true;
  constructor(@Inject(MAT_DIALOG_DATA) public data:any, 
    private dialogRef : MatDialogRef<ModelPopupComponent>){
    this.text=data.text;
    this.path= data.path;
    this.reload=data.reload;

  }

  ngOnInit():void{
    this.dialogRef.updateSize('400px','130px');
    this.dialogRef.updatePosition({top:'0px'});
    
  }

  close(){
    
    if(this.reload){
      window.location.assign(this.path);
    }
    this.dialogRef.close();
  }
}
