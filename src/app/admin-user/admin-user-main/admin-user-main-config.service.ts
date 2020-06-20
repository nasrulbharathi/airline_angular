import { Injectable } from '@angular/core';

@Injectable()
export class AdminUserMainConfigService {
    public readonly toolbarHeading: string = 'Dashboard for Admins';

    public readonly adminItems = [
        { link: 'passenger', icon: 'people', name: 'Passenger Details' },
        { link: 'flightancillary', icon: 'flight', name: 'Flight Ancillary Management' },
        { link: 'ancillarymaintanence', icon: 'whatshot', name: 'Ancillary Maintanence' }
    ];
}
