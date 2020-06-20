import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'ar-modify-passanger-inflight-dialog',
  templateUrl: './modify-passanger-inflight.dialog.html',
  styleUrls: ['./modify-passanger-inflight.dialog.css']
})
export class ModifyPassangerInFlightDialogComponent implements OnInit {

  public dialogHeading: string;
  public result: any = {};
  public shoppingList: any = [];
  public mealList: any = [];
  public ancillaryList: any = [];
  public selectedAncItem: any = [];
  public selectedMeals: any;
  public selectedShoppingItem: any = [];
  public comboBoxSeletedValue: any;

  constructor(public dialogRef: MatDialogRef<ModifyPassangerInFlightDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {}

  public formControl = new FormControl('', [
    Validators.required
  ]);

  public ngOnInit(): void {
    this.shoppingList = this.data.formData.shoppingList;
    this.mealList = this.data.formData.mealList;
    this.ancillaryList = this.data.formData.ancillaryServiceList;
  }

  public addResult(): void {
    this.result.ancillaryService = this.selectedAncItem;
    this.result.shoppingItems = this.selectedShoppingItem;
    this.result.meals = this.selectedMeals;
  }

  public getErrorMessage(): string {
    return this.formControl.hasError('required') ? 'Required field' : '';
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }
}
