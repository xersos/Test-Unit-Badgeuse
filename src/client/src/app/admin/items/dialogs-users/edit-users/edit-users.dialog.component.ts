import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject } from '@angular/core';
import { CrudUserService } from '../../../../services/cruduser.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-baza.dialog',
  templateUrl: '../../dialogs-users/edit-users/edit-users.dialog.html',
  styleUrls: ['../../dialogs-users/edit-users/edit-users.dialog.css']
})
export class EditDialogUsersComponent {

  constructor(public dialogRef: MatDialogRef<EditDialogUsersComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dataService: CrudUserService) { }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  stopEdit(): void {
    this.dataService.updateUser(this.data);
  }
}
