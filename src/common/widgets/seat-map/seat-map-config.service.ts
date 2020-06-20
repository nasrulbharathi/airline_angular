import { Injectable } from '@angular/core';
import { FlightLayout } from 'src/common/models/flight.model';

@Injectable()
export class SeatMapConfigService {

    public flightLayout: FlightLayout[] = [
        { name: 'Air Asia', totalSeats: 80, businessLayout: 'g_g__g_g', businessRows: 5,
            economyLayout: 'ggg__ggg', economyRows: 10},
        { name: 'Indigo', totalSeats: 120, businessLayout: 'g_g_g_g_g_g', businessRows: 5,
        economyLayout: 'ggg_ggg_ggg', economyRows: 10},
        { name: 'Jet Airways', totalSeats: 68, businessLayout: 'g__g', businessRows: 4,
        economyLayout: 'gg__gg', economyRows: 15},
        { name: 'Go Air', totalSeats: 110, businessLayout: 'g_g__g_g', businessRows: 5,
        economyLayout: 'ggg__ggg', economyRows: 15},
        { name: 'Vistara', totalSeats: 210, businessLayout: 'g_g__g_g__g_g', businessRows: 5,
        economyLayout: 'ggg__ggg__ggg', economyRows: 20}
    ];

    public seatChartConfig = {
        showRowsLabel: true,
        showRowWisePricing: true,
        newSeatNoForRow: true
      };
}
