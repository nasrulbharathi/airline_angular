import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Ancillary } from 'src/common/models/ancillary.model';

@Component({
  selector: 'ar-createmodify-ancillary-dialog',
  templateUrl: './create-modify-ancillary.dialog.html',
  styleUrls: ['./create-modify-ancillary.dialog.css']
})
export class CreateModifyAncillaryDialogComponent implements OnInit {

  public dialogHeading = 'Add Ancillary Details';

  public ancillaryCombobox: string[] = ['specialMeal', 'shoppingItem', 'others'];
  public comboBoxSeletedValue: string;

  public result: Ancillary;

  constructor(public dialogRef: MatDialogRef<CreateModifyAncillaryDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {}

  public formControl = new FormControl('', [
    Validators.required
  ]);

  public ngOnInit(): void {
    this.result = this.data.formData;
    if (this.data.config === 'edit') {
      this.comboBoxSeletedValue = Object.keys(this.data.formData.type)[0];
      this.dialogHeading = 'Modify Ancillary Details';
    }

  }

  public getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' : '';
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public onSubmit(): void {
    if ( this.comboBoxSeletedValue === 'shoppingItem') {
      this.result.type = { shoppingItem:  true };
    } else if ( this.comboBoxSeletedValue === 'specialMeal') {
      this.result.type = { specialMeal:  true };
    } else {
      this.result.type = { others:  true };
    }
  }
}
