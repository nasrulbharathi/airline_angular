import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Passenger } from 'src/common/models/passanger.model';

@Component({
  selector: 'ar-createmodify-passanger-dialog',
  templateUrl: './create-modify-passanger.dialog.html',
  styleUrls: ['./create-modify-passanger.dialog.css']
})
export class CreateModifyPassangerDialogComponent implements OnInit {

  public dialogHeading = 'Add Passanger Details';

  public result: Passenger;

  constructor(public dialogRef: MatDialogRef<CreateModifyPassangerDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {}

  public formControl = new FormControl('', [
    Validators.required
  ]);

  public ngOnInit(): void {
    this.result = this.data.formData;
    if (this.data.config === 'edit') {
      this.dialogHeading = 'Modify Passanger Details';
    }

  }

  public getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' : '';
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }
}
