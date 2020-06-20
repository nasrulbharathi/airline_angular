import { MatDialogRef } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { PassengerDataService } from 'src/common/services/passenger-data.service';

@Component({
  selector: 'ar-delete.dialog',
  templateUrl: './delete.dialog.html',
  styleUrls: ['./delete.dialog.css']
})
export class DeleteDialogComponent {

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
              public dataService: PassengerDataService) { }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmDelete(): void {
    // this.dataService.deleteIssue(this.data.id);
  }
}
