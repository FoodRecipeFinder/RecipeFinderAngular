import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModelPopupComponent } from '../model-popup/model-popup.component';

@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.css']
})
export class DialogboxComponent {

  constructor(private dialogRef:MatDialog){}
  
  openDialog(){
    this.dialogRef.open(ModelPopupComponent,{
      
      data : {
        name:'harshala'
      }
    },
    );

  }
}
