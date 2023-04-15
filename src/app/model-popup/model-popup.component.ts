   import { Component, OnInit ,Inject} from '@angular/core';
import {MatDialogRef,  MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-model-popup',
  templateUrl: './model-popup.component.html',
  styleUrls: ['./model-popup.component.css']
})
export class ModelPopupComponent implements OnInit{

  text;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, 
    private dialogRef : MatDialogRef<ModelPopupComponent>){
    this.text=data.text
  }

  ngOnInit():void{
    this.dialogRef.updateSize('400px','120px');
    this.dialogRef.updatePosition({top:'0px'});
  }

  close(){
    this.dialogRef.close();
  }
}
