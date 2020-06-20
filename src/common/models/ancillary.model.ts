export interface Ancillary {
    name: string;
    description?: string;
    type?: AncillaryType;
}

export interface AncillaryType {
    specialMeal?: boolean;
    shoppingItem?: boolean;
    others?: boolean;
}
