import { Component } from '@angular/core';
import { Motorbike } from '../../../models';
import { CatalogItem } from '../catalog-item/catalog-item';
import { Observable, of } from 'rxjs';
import { ListingService } from '../../../core/services/listings.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-catalog',
  imports: [CatalogItem, AsyncPipe],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css'
})
export class Catalog {
  listings$!: Observable<Motorbike[]>;

  constructor(private listingsService: ListingService) {
    this.listings$ = this.listingsService.getAll();
    // this.listings$ = of([]);
  }
}
