export type Id = string;

export enum FuelType {
    Petrol = 'Petrol',
    Electric = 'Electric',
}

export enum TransmissionType {
    Manual = 'Manual',
    Automatic = 'Automatic',
}

export enum ConditionType {
    Used = 'Used',
    New = 'New',
}

export enum Currency {
    BGN = 'bgn',
    EUR = 'eur',
    USD = 'usd',
}

export enum Location {
    Sofia = 'Sofia',
    Varna = 'Varna',
    Pleven = 'Pleven'
}

export interface Motorbike {
    _id: Id;
    make: string;
    model: string;
    year: number;
    color: string;
    fuel: FuelType;
    mileage: number;
    cubicCapacity: number;
    hp: number;
    transmission: TransmissionType;
    condition: ConditionType;
    location: Location;
    price: number;
    currency: Currency;
    imageUrl1: string;
    imageUrl2: string;
    imageUrl3: string;
    information?: string;

    _ownerId?: Id;
    _createdOn?: number
}
