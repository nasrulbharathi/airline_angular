import { Injectable } from '@angular/core';
import { CrudandFilterModel } from 'src/common/models/table.model';

@Injectable()
export class AdminPassengerConfigService {
    public readonly toolbarHeading: string = 'Dashboard for Admins';

    public readonly columHeaders = ['name', 'dateOfBirth', 'passportNumber', 'address',
                                    'seatNo', 'ancillaryService'];

    public readonly crudAndFilterData: CrudandFilterModel = {
        isAdd : true,
        isDelete: true,
        isEdit: true,
        filterColumns: ['dateOfBirth', 'passportNumber', 'address']
    };
}
