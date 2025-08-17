import { Component } from '@angular/core';
import { ConditionType, Currency, FuelType, Location, Motorbike, TransmissionType } from '../../../models';
import { CatalogItem } from '../catalog-item/catalog-item';

@Component({
  selector: 'app-catalog',
  imports: [CatalogItem],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css'
})
export class Catalog {
  listings: Motorbike[] = [
    {
      make: 'Honda',
      model: 'CBR500R',
      year: 2007,
      color: 'blue',
      fuel: FuelType.Petrol,
      mileage: 200,
      cubicCapacity: 700,
      hp: 78,
      transmission: TransmissionType.Manual,
      condition: ConditionType.New,
      location: Location.Sofia, currency: Currency.BGN,
      images: [{ url: 'assets/moto1.jpg', alt: 'Honda CBR500R' }],
      price: 7500,
      _id: '1'
    },
    {
      make: 'Yamaha',
      model: 'MT-07',
      year: 2019,
      color: 'black',
      fuel: FuelType.Petrol,
      mileage: 8500,
      cubicCapacity: 689,
      hp: 74,
      transmission: TransmissionType.Manual,
      condition: ConditionType.Used,
      location: Location.Varna,
      currency: Currency.EUR,
      images: [{ url: 'assets/moto2.jpg', alt: 'Yamaha MT-07' }],
      price: 8200,
      _id: '2',
    },
    {
      make: 'BMW',
      model: 'R1250GS',
      year: 2021,
      color: 'red',
      fuel: FuelType.Petrol,
      mileage: 5000,
      cubicCapacity: 1254,
      hp: 136,
      transmission: TransmissionType.Manual,
      condition: ConditionType.Used,
      location: Location.Varna,
      currency: Currency.USD,
      images: [{ url: 'assets/moto3.jpg', alt: 'BMW R1250GS' }],
      price: 15000,
      _id: '3',
    }
  ];
}