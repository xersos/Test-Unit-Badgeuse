import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject } from '@angular/core';
import { CrudUserService } from '../../../../services/cruduser.service';


@Component({
  selector: 'app-delete.dialog',
  templateUrl: '../../dialogs-users/delete-users/delete-users.dialog.html',
  styleUrls: ['../../dialogs-users/delete-users/delete-users.dialog.css']
})
export class DeleteDialogUsersComponent {

  constructor(public dialogRef: MatDialogRef<DeleteDialogUsersComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dataService: CrudUserService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(){
    this.dataService.deleteUser(this.data);
  }
}
