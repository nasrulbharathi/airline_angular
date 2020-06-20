import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { Passenger } from '../models/passanger.model';

@Injectable( {providedIn: 'root'} )
export class CrudOperationService {

    public currentPassengerData: Passenger;

    constructor(private snackBar: MatSnackBar) {}

    public addData(oldData: any[], newData: any,
                   message: string = 'The Data has been successfully modified'): any {
        oldData.push(newData);
        this.snackBar.open(message, 'post');
        return oldData;
    }

    public editData(oldData: any[], newData: any,
                    index, message: string = 'The Data has been successfully modified'): any {
        oldData[index] = newData;
        this.snackBar.open(message, 'edit');
        return oldData;
    }

    public deleteData(oldData: any[], rowData: any): any {
        this.snackBar.open('The Data has been successfully deleted', 'delete');
        return oldData.filter(obj => obj !== rowData);
    }
}
