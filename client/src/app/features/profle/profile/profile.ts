import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { ListingService } from '../../../core/services/listings.service';
import { User } from '../../../models/user.model';
import { Observable } from 'rxjs';
import { ProfileListingItem } from '../profile-listing-item/profile-listing-item';
import { AsyncPipe } from '@angular/common';
import { WatchlistService } from '../../../core/services/watchlist.service';
import { WatchlistEntry } from '../../../models/watchlistEntry.model';

@Component({
  selector: 'app-profile',
  imports: [ProfileListingItem, AsyncPipe],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  currentUser!: User | null;
  ownListings$!: Observable<WatchlistEntry[]>;
  watchlistedBikes$!: Observable<WatchlistEntry[]>;

  constructor(
    private authService: AuthService,
    private listingService: ListingService,
    private watchlistService: WatchlistService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser();

    if (this.currentUser?._id) {
      this.ownListings$ = this.listingService.getByOwner(this.currentUser._id);
      this.watchlistedBikes$ = this.watchlistService.getWatchlist(this.currentUser._id);
    }
  }
}
