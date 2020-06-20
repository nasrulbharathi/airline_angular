export interface Passenger {
    name: string;
    age?: number;
    dateOfBirth?: string;
    passportNumber?: string;
    address?: string;
    flightName?: string;
    seatNo?: string;
    travelDate?: string;
    ancillaryService?: string[];
    wheelChair?: boolean;
    isCheckedIn?: boolean;
    isHavingInfant?: boolean;
    meals?: string;
    isSpecialMeals?: boolean;
    shoppingItems?: string[];
}
