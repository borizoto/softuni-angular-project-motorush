import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Motorbike } from '../../../models';
import { ListingService } from '../../../core/services/listings.service';
import { AsyncPipe } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../models/user.model';
import { WatchlistService } from '../../../core/services/watchlist.service';
import { CommentSection } from "../../comments/comment-section/comment-section";
import { CommentCreate } from "../../comments/comment-create/comment-create";

@Component({
	selector: 'app-listing-details',
	standalone: true,
	imports: [RouterLink, AsyncPipe, CommentSection, CommentCreate],
	templateUrl: './listing-details.html',
	styleUrl: './listing-details.css'
})
export class ListingDetails implements OnInit {
	$listing!: Observable<Motorbike>;
	listingId!: string;
	listing!: Motorbike;
	isOwner = false;
	currentUser: User | null = null;

	hasAddedToWatchlist = signal(false);
	watchlistedCount = signal(0);

	constructor(
		private listingsService: ListingService,
		private watchlistService: WatchlistService,
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

			if (this.currentUser?._id) {
				this.watchlistService.getOwnWatchlist(this.listingId, this.currentUser._id)
					.subscribe(entries => {
						this.hasAddedToWatchlist.set(entries.length > 0);
					});
			}
		});

		this.watchlistService.getWatchlistedCount(this.listingId)
			.subscribe(entries => {
				this.watchlistedCount.set(entries.length);
			});
	}

	onDelete(): void {
		if (!confirm(`Are you sure you want to delete ${this.listing.make} ${this.listing.model} listing?`)) {
			return;
		}

		this.listingsService.delete(this.listingId).subscribe({
			next: () => this.router.navigate(['/listings']),
			error: err => console.error('Delete failed:', err)
		});
	}

	onAddToWatchlist(): void {
		this.watchlistService
			.addToWatchlist(this.listing._id, this.listing.make, this.listing.model, this.listing.imageUrl1)
			.subscribe({
				next: () => {
					this.hasAddedToWatchlist.set(true);
					this.watchlistedCount.update(v => v + 1);
				},
				error: err => console.error('Adding to watchlist failed', err)
			});
	}
}
