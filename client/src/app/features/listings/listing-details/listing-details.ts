import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Motorbike } from '../../../models';
import { ListingService } from '../../../core/services/listings.service';
import { AsyncPipe } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
	selector: 'app-listing-details',
	imports: [RouterLink, AsyncPipe],
	templateUrl: './listing-details.html',
	styleUrl: './listing-details.css'
})
export class ListingDetails implements OnInit {
	$listing!: Observable<Motorbike>;
	isOwner = false;

	constructor(
		private listingsService: ListingService,
		private route: ActivatedRoute,
		private authService: AuthService
	) { }

	ngOnInit(): void {
		const listingId = this.route.snapshot.paramMap.get('listingId')!;
		this.$listing = this.listingsService.getOne(listingId);

		this.$listing.subscribe(listing => {
			const currentUser = this.authService.currentUser();
			this.isOwner = currentUser?._id === listing._ownerId;
		});
	}
}
