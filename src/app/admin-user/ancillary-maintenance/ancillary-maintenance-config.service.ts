import { Injectable } from '@angular/core';

import { CrudandFilterModel } from 'src/common/models/table.model';

@Injectable()
export class AncillaryConfigService {
    public readonly toolbarHeading: string = 'Dashboard for Admins';

    public readonly columHeaders = ['name', 'description', 'type'];

    public readonly crudAndFilterData: CrudandFilterModel = {
        isAdd : true,
        isDelete: true,
        isEdit: true
    };
}
