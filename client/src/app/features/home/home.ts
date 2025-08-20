import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConditionType, Currency, FuelType, Location, Motorbike, TransmissionType } from '../../models/motorbike.model';
import { Observable } from 'rxjs';
import { ListingService } from '../../core/services/listings.service';
import { AsyncPipe } from '@angular/common';

@Component({
	selector: 'app-home',
	imports: [RouterLink, AsyncPipe],
	templateUrl: './home.html',
	styleUrl: './home.css'
})
export class Home {
	// listings$!: Observable<Motorbike[]>;
	latestListings$!: Observable<Motorbike[]>;

	constructor(private listingsService: ListingService) {
		this.latestListings$ = this.listingsService.getLatestListings();
		// this.latestListings$ = of([]);
	}
}