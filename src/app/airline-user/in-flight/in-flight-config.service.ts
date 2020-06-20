import { Injectable } from '@angular/core';
import { CrudandFilterModel } from 'src/common/models/table.model';

@Injectable()
export class InFlightConfigService {
    public readonly toolbarHeading: string = 'Dashboard for Airline User';

    public readonly columHeaders = [ 'name', 'seatNo', 'ancillaryService', 'shoppingItems',
                                        'meals'];

    public readonly crudAndFilterData: CrudandFilterModel = {
        isAdd : false,
        isDelete: false,
        isEdit: true,
        isCheckIn: false
    };
}
