import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'ar-checkin-checkout-dialog',
  templateUrl: './checkin-checkout.dialog.html',
  styleUrls: ['./checkin-checkout.dialog.css']
})
export class CheckInCheckOutDialogComponent implements OnInit {

  public dialogHeading: string;
  public checkInButton = false;
  public checkOutButton = false;
  public editButton = false;
  public result: any;

  constructor(public dialogRef: MatDialogRef<CheckInCheckOutDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {}

  public formControl = new FormControl('', [
    Validators.required
  ]);

  public ngOnInit(): void {
    if (this.data.config === 'checkOut') {
      this.dialogHeading = 'Check Out Passanger ' +
        this.data.formData.selectedPassangerData.name + ' From the Seat '
          + this.data.formData.selectedPassangerData.seatNo;
    } else if (this.data.config === 'checkIn') {
      this.dialogHeading = 'Check In the Passanger ' +
        this.data.formData.selectedPassangerData.name;
    } else if (this.data.config === 'edit') {
      this.data.formData.passangerDataofFlight.forEach(element => {
         // tslint:disable-next-line: triple-equals
         if (element.seatNo == this.data.formData.selectedPassangerData.seatNo) {
           element.seatNo = '';
         }
      });
      this.dialogHeading = 'Select the new seat for the passanger ' +
        this.data.formData.selectedPassangerData.name;
    }
  }

  public emitSeats(seatObj): void {
    if (this.data.config === 'checkOut') {
      this.checkOutButton = true;
    } else if (this.data.config === 'checkIn') {
      this.checkInButton = true;
    } else if (this.data.config === 'edit') {
      this.editButton = true;
    }
    this.result = seatObj;
  }

  public getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' : '';
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }
}
