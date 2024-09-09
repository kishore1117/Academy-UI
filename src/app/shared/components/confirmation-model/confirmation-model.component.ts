import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-model',
  templateUrl: './confirmation-model.component.html',
  styleUrls: ['./confirmation-model.component.scss']
})
export class ConfirmationModelComponent {
constructor(
  public dialog: MatDialogRef<any>,
){

}

delete(){
  console.log('called')
  this.dialog.close(true)
}
close(){
this.dialog.close(false)
}
}
