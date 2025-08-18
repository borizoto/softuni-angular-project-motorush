import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Motorbike } from '../../../models';
import { ListingService } from '../../../core/services/listings.service';
import { AsyncPipe } from '@angular/common';

@Component({
	selector: 'app-listing-details',
	imports: [RouterLink, AsyncPipe],
	templateUrl: './listing-details.html',
	styleUrl: './listing-details.css'
})
export class ListingDetails {
	$listing!: Observable<Motorbike>;

	constructor(private listingsService: ListingService, private route: ActivatedRoute) {
		const listingId = this.route.snapshot.paramMap.get('listingId')!;
		this.$listing = this.listingsService.getOne(listingId);
	}
}
