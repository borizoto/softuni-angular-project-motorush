import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Motorbike } from '../../../models';
import { ListingService } from '../../../core/services/listings.service';
import { AsyncPipe } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../models/user.model';

@Component({
	selector: 'app-listing-details',
	imports: [RouterLink, AsyncPipe],
	templateUrl: './listing-details.html',
	styleUrl: './listing-details.css'
})
export class ListingDetails implements OnInit {
	$listing!: Observable<Motorbike>;
	listingId!: string;
	listing!: Motorbike;
	isOwner = false;
	currentUser: User | null = null;

	constructor(
		private listingsService: ListingService,
		private route: ActivatedRoute,
		private authService: AuthService,
		private router: Router
	) {
		this.listingId = this.route.snapshot.paramMap.get('listingId')!;
	}

	ngOnInit(): void {
		this.$listing = this.listingsService.getOne(this.listingId);

		this.$listing.subscribe(listing => {
			this.listing = listing;
			this.currentUser = this.authService.currentUser();
			this.isOwner = this.currentUser?._id === listing._ownerId;
		});
	}

	onDelete(): void {
		const isConfirmed = confirm(`Are you sure you want to delete ${this.listing.make} ${this.listing.model} listing?`);

		if (!isConfirmed) {
			return;
		}

		this.listingsService.delete(this.listingId).subscribe({
			next: () => {
				console.log('Deleted successfully');
				this.router.navigate(['/listings']);
			},
			error: err => {
				console.error('Delete failed:', err);
			}
		});
	}
}
