import { Injectable } from '@angular/core';
import { CrudandFilterModel } from 'src/common/models/table.model';

@Injectable()
export class UserCheckInConfigService {
    public readonly toolbarHeading: string = 'Dashboard for Airline User';

    public readonly columHeaders = ['name', 'seatNo', 'ancillaryService', 'isCheckedIn',
                                        'isHavingInfant', 'wheelChair'];

    public readonly crudAndFilterData: CrudandFilterModel = {
        isAdd : false,
        isDelete: false,
        isEdit: true,
        isCheckIn: true,
        filterColumns: ['isCheckedIn', 'isHavingInfant', 'wheelChair']
    };
}
