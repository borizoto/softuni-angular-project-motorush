import { Component, Input } from '@angular/core';
import { Motorbike } from '../../../models';
import { Router, RouterLink } from '@angular/router';
import { ListingService } from '../../../core/services/listings.service';

@Component({
  selector: 'app-search-results',
  imports: [RouterLink],
  templateUrl: './search-results.html',
  styleUrl: './search-results.css'
})
export class SearchResults {
  filteredListings: Motorbike[] = [];

  constructor(
    private router: Router,
    private listingService: ListingService
  ) { }

  ngOnInit(): void {
    const filters = history.state;
    this.listingService.getAll().subscribe(listings => {
      this.filteredListings = listings.filter(bike => {
        return (
          (!filters.make || bike.make === filters.make) &&
          (!filters.model || bike.model === filters.model) &&
          (!filters.year || bike.year === +filters.year) &&
          (!filters.color || bike.color === filters.color) &&
          (!filters.fuel || bike.fuel === filters.fuel) &&
          (!filters.mileage || bike.mileage <= +filters.mileage) &&
          (!filters.cubicCapacity || bike.cubicCapacity === +filters.cubicCapacity) &&
          (!filters.hp || bike.hp === +filters.hp) &&
          (!filters.transmission || bike.transmission === filters.transmission) &&
          (!filters.condition || bike.condition === filters.condition) &&
          (!filters.location || bike.location === filters.location) &&
          (!filters.price || bike.price <= +filters.price) &&
          (!filters.currency || bike.currency === filters.currency)
        );
      });
    });
  }
}