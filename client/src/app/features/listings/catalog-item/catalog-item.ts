import { Component, Input } from '@angular/core';
import { Motorbike } from '../../../models';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-catalog-item',
  imports: [RouterLink],
  templateUrl: './catalog-item.html',
  styleUrl: './catalog-item.css'
})
export class CatalogItem {
  @Input() listing!: Motorbike;
}
