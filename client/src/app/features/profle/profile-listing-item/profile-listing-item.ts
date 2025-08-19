import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WatchlistEntry } from '../../../models/watchlistEntry.model';

@Component({
  selector: 'app-profile-listing-item',
  imports: [RouterLink],
  templateUrl: './profile-listing-item.html',
  styleUrl: './profile-listing-item.css'
})
export class ProfileListingItem {
  @Input() bike!: WatchlistEntry;
}
