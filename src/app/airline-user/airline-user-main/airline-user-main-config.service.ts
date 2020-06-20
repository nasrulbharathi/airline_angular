import { Injectable } from '@angular/core';

@Injectable()
export class AirlineUserMainConfigService {
    public readonly toolbarHeading: string = 'Dashboard for Airline Users';

    public readonly sideNavItems = [
        { link: 'checkin', icon: 'people', name: 'Passenger Details' },
        { link: 'inflight', icon: 'flight_takeoff', name: 'In Flight' }
    ];
}
