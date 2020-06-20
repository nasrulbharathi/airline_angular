export interface Flight {
    name: string;
    ancillaryService?: string[];
    totalSeats?: number;
    shoppingItems?: string[];
    destination?: string;
    departureTime?: string;
    meals?: string[];
    isCheckedInComplete?: boolean;
  }

export interface FlightLayout {
    name: string;
    totalSeats?: number ;
    businessLayout?: string;
    economyLayout?: string;
    businessRows?: number;
    economyRows?: number;
  }

const flight: Flight[] = [
    { name: 'Air Asia', ancillaryService: [], totalSeats: 180, shoppingItems: [], destination: '', departureTime: '' },
    { name: 'Indigo', ancillaryService: [], totalSeats: 200, shoppingItems: [], destination: '', departureTime: '' },
    { name: 'Jet Airways', ancillaryService: [], totalSeats: 210, shoppingItems: [], destination: '', departureTime: '' },
    { name: 'Go Air', ancillaryService: [], totalSeats: 170, shoppingItems: [], destination: '', departureTime: '' },
    { name: 'Vistara', ancillaryService: [], totalSeats: 210, shoppingItems: [], destination: '', departureTime: '' },
  ];
